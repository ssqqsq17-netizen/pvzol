#!/usr/bin/env python3
import os
import sys

os.environ.setdefault("QTWEBENGINE_DISABLE_SANDBOX", "1")
if sys.platform == "darwin":
    current = os.environ.get("QTWEBENGINE_CHROMIUM_FLAGS", "").strip()
    flag = "--js-flags=--experimental-wasm-reftypes"
    if flag not in current.split():
        os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = f"{current} {flag}".strip()

try:
    from PyQt5.QtCore import QUrl
    from PyQt5.QtWebEngineWidgets import (
        QWebEnginePage,
        QWebEngineProfile,
        QWebEngineScript,
        QWebEngineSettings,
        QWebEngineView,
    )
    from PyQt5.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget
except ImportError as exc:
    print(f"[ERROR] 导入 PyQt5 失败: {exc}")
    print("[INFO] 请确保已安装: pip install pyqt5 pyqtwebengine")
    sys.exit(1)


# 使用 CDN 上的 ruffle
RUFFLE_CDN_URL = "https://unpkg.com/ruffle@latest/web/ruffle.js"
RUFFLE_CDN_PUBLIC_PATH = "https://unpkg.com/ruffle@latest/web/"


def escape_js_string(value):
    return value.replace("\\", "\\\\").replace("'", "\\'")


class BrowserWindow(QMainWindow):
    def __init__(self, url, title="游戏浏览器", cookie_file=""):
        super().__init__()
        self.url = url
        self.cookie_file = cookie_file
        self.cookies = ""
        self.cookies_set = False
        self.initial_load = True

        self.setWindowTitle(title)
        self.setGeometry(100, 100, 1024, 768)

        self._ensure_ruffle_assets()

        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)
        layout.setContentsMargins(0, 0, 0, 0)

        self.profile = QWebEngineProfile(self)
        self.page = QWebEnginePage(self.profile, self)
        self.browser = QWebEngineView(self)
        self.browser.setPage(self.page)
        layout.addWidget(self.browser)

        self._configure_browser_settings()
        self._install_preload_script()
        self._load_cookie_file()

        self.browser.loadFinished.connect(self.on_load_finished)
        try:
            self.page.fullScreenRequested.connect(lambda request: request.accept())
        except Exception:
            pass

        self.browser.load(QUrl(url))

    def closeEvent(self, event):
        super().closeEvent(event)

    def _ensure_ruffle_assets(self):
        # 使用 CDN 上的 ruffle，不需要本地文件
        pass

    def _configure_browser_settings(self):
        settings = self.browser.settings()
        settings.setAttribute(QWebEngineSettings.JavascriptEnabled, True)
        settings.setAttribute(QWebEngineSettings.PluginsEnabled, True)
        settings.setAttribute(QWebEngineSettings.FullScreenSupportEnabled, True)
        settings.setAttribute(QWebEngineSettings.LocalStorageEnabled, True)
        settings.setAttribute(QWebEngineSettings.AllowRunningInsecureContent, True)
        settings.setAttribute(QWebEngineSettings.WebGLEnabled, True)

    def _install_preload_script(self):
        preload_script = self._build_preload_script()

        script = QWebEngineScript()
        script.setName("ruffle-preload")
        script.setInjectionPoint(QWebEngineScript.DocumentCreation)
        script.setRunsOnSubFrames(False)
        script.setWorldId(QWebEngineScript.MainWorld)
        script.setSourceCode(preload_script)
        self.page.scripts().insert(script)

    def _build_preload_script(self):
        config_script = f"""
(function() {{
    if (window.__flashBrowserRufflePreloaded) {{
        return;
    }}
    window.__flashBrowserRufflePreloaded = true;

    if (window !== window.top) {{
        return;
    }}

    var ieUa = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)';
    try {{ Object.defineProperty(navigator, 'userAgent', {{ get: function() {{ return ieUa; }}, configurable: true }}); }} catch (e) {{}}
    try {{ Object.defineProperty(navigator, 'appVersion', {{ get: function() {{ return ieUa; }}, configurable: true }}); }} catch (e) {{}}
    try {{ Object.defineProperty(navigator, 'appName', {{ get: function() {{ return 'Microsoft Internet Explorer'; }}, configurable: true }}); }} catch (e) {{}}
    try {{ Object.defineProperty(navigator, 'platform', {{ get: function() {{ return 'Win32'; }}, configurable: true }}); }} catch (e) {{}}
    try {{ Object.defineProperty(navigator, 'vendor', {{ get: function() {{ return ''; }}, configurable: true }}); }} catch (e) {{}}
    try {{ Object.defineProperty(document, 'documentMode', {{ get: function() {{ return 10; }}, configurable: true }}); }} catch (e) {{}}

    window.RufflePlayer = window.RufflePlayer || {{}};
    window.RufflePlayer.config = window.RufflePlayer.config || {{}};

    var c = window.RufflePlayer.config;
    c.autoplay = 'on';
    c.allowFullscreen = true;
    c.allowScriptAccess = true;
    c.allowNetworking = 'all';
    c.openUrlMode = 'allow';
    c.polyfills = true;
    c.publicPath = '{escape_js_string(RUFFLE_CDN_PUBLIC_PATH)}';
    c.warnOnUnsupportedContent = false;
    c.logLevel = 'error';
    c.preferredRenderer = 'webgl';

    var script = document.createElement('script');
    script.src = '{escape_js_string(RUFFLE_CDN_URL)}';
    script.async = false;
    document.head.appendChild(script);
}})();
"""
        return config_script

    def _load_cookie_file(self):
        if not self.cookie_file or not os.path.exists(self.cookie_file):
            return

        try:
            with open(self.cookie_file, "r", encoding="utf-8") as handle:
                self.cookies = handle.read().strip()
            os.remove(self.cookie_file)
            print(f"[DEBUG] Loaded cookies from {self.cookie_file}")
        except Exception as exc:
            print(f"[DEBUG] Error loading cookies: {exc}")

    def on_load_finished(self, ok):
        print(f"[DEBUG] Page load finished, ok={ok}")
        if not ok:
            return

        if self.cookies and not self.cookies_set and self.initial_load:
            self.initial_load = False
            self.cookies_set = True
            self.set_cookies_and_reload()

    def set_cookies_and_reload(self):
        cookie_pairs = []
        for part in self.cookies.split(";"):
            part = part.strip()
            if "=" not in part:
                continue
            name, value = part.split("=", 1)
            cookie_pairs.append((name.strip(), value.strip()))

        js_lines = [
            "(function(){",
            "var existing = document.cookie ? document.cookie.split(';') : [];",
            "for (var i = 0; i < existing.length; i += 1) {",
            "  var entry = existing[i].trim();",
            "  if (!entry) { continue; }",
            "  var name = entry.split('=')[0];",
            "  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';",
            "}",
        ]

        for name, value in cookie_pairs:
            safe_name = escape_js_string(name)
            safe_value = escape_js_string(value)
            js_lines.append(f"document.cookie = '{safe_name}={safe_value}; path=/';")

        js_lines.extend(
            [
                "return document.cookie;",
                "})();",
            ]
        )

        def on_js_done(_result):
            print("[DEBUG] Cookies set, reloading page")
            self.browser.reload()

        self.browser.page().runJavaScript("\n".join(js_lines), on_js_done)


def open_browser(url, title="植物大战僵尸", cookie_file=""):
    app = QApplication(sys.argv)
    window = BrowserWindow(url, title, cookie_file)
    window.show()
    sys.exit(app.exec_())


if __name__ == "__main__":
    if len(sys.argv) > 1:
        target_url = sys.argv[1]
        window_title = sys.argv[2] if len(sys.argv) > 2 else "游戏浏览器"
        cookies_path = sys.argv[3] if len(sys.argv) > 3 else ""
        open_browser(target_url, window_title, cookies_path)
    else:
        print("用法: python browser.py <URL> [窗口标题] [cookie文件路径]")
        print("示例: python browser.py http://www.example.com 游戏页面 /tmp/cookies.txt")