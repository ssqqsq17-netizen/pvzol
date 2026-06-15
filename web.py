#!/usr/bin/env python3
import datetime
import mimetypes
import os
import sys
import threading
import urllib.error
import urllib.parse
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import hashlib


def append_env_flag(name, flag):
    current = os.environ.get(name, "").strip()
    if not current:
        os.environ[name] = flag
        return
    if flag in current.split():
        return
    os.environ[name] = f"{current} {flag}"


os.environ.setdefault("QTWEBENGINE_DISABLE_SANDBOX", "1")
# if sys.platform == "darwin":
#     # Older QtWebEngine builds on macOS may not enable wasm reference types
#     # by default, but current Ruffle builds require `externref`.
#     append_env_flag(
#         "QTWEBENGINE_CHROMIUM_FLAGS",
#         "--js-flags=--experimental-wasm-reftypes",
#     )

try:
    from PyQt6.QtCore import QUrl
    from PyQt6.QtWebEngineCore import (
        QWebEnginePage,
        QWebEngineProfile,
        QWebEngineScript,
        QWebEngineSettings,
    )
    from PyQt6.QtWebEngineWidgets import QWebEngineView
    from PyQt6.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget
except ImportError as exc:
    print(f"[ERROR] 导入 PyQt6 失败: {exc}")
    print("[INFO] 请确保已安装: pip install pyqt6 pyqt6-webengine")
    sys.exit(1)


RUFFLE_DIR = os.path.join(os.path.dirname(__file__), "ruffle")
RUFFLE_JS_PATH = os.path.join(RUFFLE_DIR, "ruffle.js")
RUFFLE_BOOTSTRAP_PATH = os.path.join(RUFFLE_DIR, "bootstrap.js")


def _scan_existing_cache():
    """扫描现有的缓存文件并报告状态"""
    cache_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "swf_cache")
    
    if not os.path.exists(cache_dir):
        print(f"[CACHE] 缓存目录不存在: {cache_dir}")
        return
    
    swf_files = [f for f in os.listdir(cache_dir) if f.endswith(".swf")]
    print(f"\n[CACHE STATUS] 缓存目录: {cache_dir}")
    print(f"[CACHE STATUS] 缓存文件数量: {len(swf_files)}")
    
    total_size = 0
    for swf_file in swf_files:
        file_path = os.path.join(cache_dir, swf_file)
        try:
            file_size = os.path.getsize(file_path)
            total_size += file_size
            # 只显示大于100KB的文件
            if file_size > 100 * 1024:
                print(f"[CACHE STATUS]   {swf_file}: {file_size / 1024:.1f} KB")
        except Exception:
            print(f"[CACHE STATUS]   {swf_file}: 无法读取")
    
    print(f"[CACHE STATUS] 缓存总大小: {total_size / (1024 * 1024):.2f} MB\n")


def escape_js_string(value):
    return value.replace("\\", "\\\\").replace("'", "\\'")


def make_proxy_url_js_expression(var_name, proxy_root):
    safe_proxy_root = escape_js_string(proxy_root)
    return f"""
    (function(rawUrl) {{
        if (!rawUrl) {{
            return rawUrl;
        }}
        try {{
            var parsed = new URL(rawUrl, window.location.href);
            if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {{
                return parsed.toString();
            }}
            if (parsed.origin === window.location.origin) {{
                return parsed.toString();
            }}
            if (parsed.href.indexOf('{safe_proxy_root}') === 0) {{
                return parsed.toString();
            }}
            return '{safe_proxy_root}'
                + parsed.protocol.replace(':', '')
                + '/'
                + parsed.host
                + parsed.pathname
                + parsed.search;
        }} catch (error) {{
            return rawUrl;
        }}
    }})({var_name})
"""


def guess_content_type(path):
    ext = os.path.splitext(path)[1].lower()
    if ext == ".wasm":
        return "application/wasm"
    if ext == ".js":
        return "application/javascript; charset=utf-8"
    content_type, _ = mimetypes.guess_type(path)
    return content_type or "application/octet-stream"


def read_text_file(path):
    with open(path, "r", encoding="utf-8") as handle:
        return handle.read()


class LocalRuffleRequestHandler(BaseHTTPRequestHandler):
    server_version = "LocalRuffle/1.0"

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_common_cors_headers()
        self.send_header("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Max-Age", "86400")
        self.end_headers()

    def do_HEAD(self):
        self.handle_request(send_body=False)

    def do_GET(self):
        self.handle_request(send_body=True)

    def do_POST(self):
        self.handle_request(send_body=True)

    def log_message(self, format_string, *args):
        return

    def send_common_cors_headers(self):
        origin = self.headers.get("Origin") or "*"
        self.send_header("Access-Control-Allow-Origin", origin)
        self.send_header("Vary", "Origin")
        self.send_header("Access-Control-Allow-Credentials", "true")
        self.send_header("Access-Control-Allow-Private-Network", "true")
        self.send_header("Cross-Origin-Resource-Policy", "cross-origin")
        self.send_header("Timing-Allow-Origin", "*")

    def handle_request(self, send_body):
        parsed = urllib.parse.urlsplit(self.path)
        path = parsed.path or "/"
        
        # 记录所有请求（除了频繁的favicon请求）
        if not path.endswith("/favicon.ico"):
            print(f"[REQUEST] 路径: {path}, 查询: {parsed.query}")

        if path.startswith("/__ruffle__/"):
            self.serve_ruffle_asset(path, send_body)
            return

        if path.startswith("/__proxy__/"):
            self.serve_proxy_resource(path, parsed.query, send_body)
            return

        if path.startswith("/__swf__/"):
            self.serve_swf_page(path, parsed.query, send_body)
            return

        self.send_error(404, "Not Found")

    def serve_ruffle_asset(self, path, send_body):
        relative_path = path[len("/__ruffle__/") :]
        if not relative_path:
            self.send_error(404, "Missing asset path")
            return

        if relative_path == "bootstrap.js":
            data = self.server.bootstrap_source.encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/javascript; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.send_common_cors_headers()
            self.end_headers()
            if send_body:
                self.wfile.write(data)
            return

        full_path = os.path.normpath(os.path.join(self.server.ruffle_dir, relative_path))
        if not full_path.startswith(os.path.abspath(self.server.ruffle_dir)):
            self.send_error(403, "Forbidden")
            return

        if not os.path.isfile(full_path):
            print(f"[DEBUG] Asset not found: {full_path}")
            self.send_error(404, "Asset not found")
            return

        with open(full_path, "rb") as handle:
            data = handle.read()

        print(f"[DEBUG] Serving asset: {relative_path}, size: {len(data)} bytes")
        self.send_response(200)
        self.send_header("Content-Type", guess_content_type(full_path))
        self.send_header("Content-Length", str(len(data)))
        self.send_common_cors_headers()
        self.end_headers()
        if send_body:
            self.wfile.write(data)

    def _get_swf_cache_path(self, url):
        """获取SWF文件的本地缓存路径"""
        # 使用绝对路径作为缓存目录，确保不同用户/会话都能共享缓存
        cache_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "swf_cache")
        
        # 确保缓存目录存在且有正确权限
        try:
            os.makedirs(cache_dir, exist_ok=True)
            # 设置目录权限为所有人可读写
            os.chmod(cache_dir, 0o755)
            print(f"[CACHE DEBUG] 缓存目录: {cache_dir}, 存在: {os.path.exists(cache_dir)}")
        except Exception as e:
            print(f"[CACHE ERROR] 创建缓存目录失败: {e}")
            return None
        
        # 移除URL中的查询参数，只使用基础URL进行哈希，确保相同SWF文件使用相同缓存
        parsed_url = urllib.parse.urlsplit(url)
        base_url = f"{parsed_url.scheme}://{parsed_url.hostname}{parsed_url.path}"
        
        print(f"[CACHE DEBUG] 原始URL: {url}")
        print(f"[CACHE DEBUG] 基础URL(去参数): {base_url}")
        
        url_hash = hashlib.md5(base_url.encode("utf-8")).hexdigest()
        cache_path = os.path.join(cache_dir, f"{url_hash}.swf")
        print(f"[CACHE DEBUG] 缓存文件路径: {cache_path}")
        
        return cache_path

    def _is_swf_file(self, url):
        """判断URL是否为SWF文件"""
        # 移除查询参数后再判断，避免 tou.swf?path=xxx 这种情况
        parsed = urllib.parse.urlsplit(url)
        path = parsed.path.lower()
        return path.endswith(".swf")

    def serve_proxy_resource(self, path, query, send_body):
        target_url = self.decode_proxy_target(path, query)
        if not target_url:
            self.send_error(400, "Invalid proxy request")
            return

        # SWF文件缓存处理
        is_swf = self._is_swf_file(target_url)
        swf_cache_path = self._get_swf_cache_path(target_url) if is_swf else None

        # 调试日志：记录请求的URL和缓存路径
        if is_swf:
            print(f"[CACHE DEBUG] ===== SWF请求开始 =====")
            print(f"[CACHE DEBUG] 请求SWF文件: {target_url}")
            print(f"[CACHE DEBUG] 缓存路径: {swf_cache_path}")
            print(f"[CACHE DEBUG] 缓存文件存在: {os.path.exists(swf_cache_path) if swf_cache_path else False}")
            if swf_cache_path and os.path.exists(swf_cache_path):
                print(f"[CACHE DEBUG] 缓存文件大小: {os.path.getsize(swf_cache_path)} bytes")
            print(f"[CACHE DEBUG] ====================")

        # 如果是SWF文件且已缓存，直接返回本地文件
        if is_swf and swf_cache_path and os.path.exists(swf_cache_path):
            try:
                # 获取文件大小
                file_size = os.path.getsize(swf_cache_path)
                
                # 验证缓存文件是否完整（至少100字节）
                if file_size < 100:
                    print(f"[CACHE] 缓存文件太小({file_size} bytes)，可能不完整，重新下载")
                else:
                    with open(swf_cache_path, "rb") as handle:
                        data = handle.read()
                    
                    self.send_response(200)
                    self.send_header("Content-Type", "application/x-shockwave-flash")
                    self.send_header("Content-Length", str(len(data)))
                    self.send_common_cors_headers()
                    self.send_header("X-Cache", "HIT")
                    # 添加强缓存头，防止浏览器重新请求
                    self.send_header("Cache-Control", "public, max-age=31536000, immutable")
                    self.send_header("Expires", "Thu, 31 Dec 2035 23:59:59 GMT")
                    self.end_headers()
                    if send_body:
                        self.wfile.write(data)
                    print(f"[CACHE HIT] 使用本地缓存: {os.path.basename(swf_cache_path)}, 大小: {len(data)} bytes")
                    return
            except Exception as exc:
                print(f"[CACHE] 读取缓存失败，回退到网络请求: {exc}")

        body = b""
        content_length = self.headers.get("Content-Length")
        if content_length:
            try:
                body = self.rfile.read(int(content_length))
            except Exception:
                body = b""

        request_headers = {}
        for header in (
            "User-Agent",
            "Accept",
            "Accept-Language",
            "Range",
            "Referer",
            "Content-Type",
            "Origin",
            "X-Requested-With",
        ):
            value = self.headers.get(header)
            if value:
                request_headers[header] = value

        page_cookie = self.headers.get("X-FlashBrowser-Page-Cookie")
        if page_cookie:
            request_headers["Cookie"] = page_cookie

        request = urllib.request.Request(
            target_url,
            data=body if self.command in ("POST", "PUT", "PATCH") else None,
            headers=request_headers,
            method=self.command,
        )

        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                data = response.read() if send_body else b""
                
                # 如果是SWF文件，保存到本地缓存
                if is_swf and send_body and data:
                    try:
                        print(f"[CACHE MISS] 正在缓存SWF文件: {os.path.basename(swf_cache_path)}, 大小: {len(data)} bytes")
                        with open(swf_cache_path, "wb") as handle:
                            handle.write(data)
                        # 设置文件权限
                        os.chmod(swf_cache_path, 0o644)
                        print(f"[CACHE SAVED] 成功缓存SWF文件: {os.path.basename(swf_cache_path)}, 大小: {len(data)} bytes")
                        
                        # 更新缓存索引
                        cache_dir = os.path.dirname(swf_cache_path)
                        index_file = os.path.join(cache_dir, "cache_index.json")
                        cache_index = {}
                        if os.path.exists(index_file):
                            try:
                                import json
                                with open(index_file, "r", encoding="utf-8") as f:
                                    cache_index = json.load(f)
                            except:
                                pass
                        
                        parsed_url = urllib.parse.urlsplit(target_url)
                        base_url = f"{parsed_url.scheme}://{parsed_url.hostname}{parsed_url.path}"
                        cache_index[base_url] = {
                            "hash": os.path.basename(swf_cache_path).replace(".swf", ""),
                            "size": len(data),
                            "saved_at": str(datetime.datetime.now())
                        }
                        
                        try:
                            import json
                            with open(index_file, "w", encoding="utf-8") as f:
                                json.dump(cache_index, f, indent=2)
                        except:
                            pass
                    except Exception as exc:
                        print(f"[CACHE ERROR] 保存缓存失败: {exc}")
                
                self.send_response(response.getcode())
                for header in (
                    "Content-Type",
                    "Content-Length",
                    "Content-Range",
                    "Accept-Ranges",
                    "Cache-Control",
                    "ETag",
                    "Last-Modified",
                ):
                    value = response.headers.get(header)
                    if value:
                        self.send_header(header, value)
                self.send_common_cors_headers()
                if is_swf:
                    self.send_header("X-Cache", "MISS")
                self.end_headers()
                if send_body:
                    self.wfile.write(data)
        except urllib.error.HTTPError as exc:
            data = exc.read() if send_body else b""
            self.send_response(exc.code)
            for header in ("Content-Type", "Content-Length", "Content-Range", "Accept-Ranges"):
                value = exc.headers.get(header)
                if value:
                    self.send_header(header, value)
            self.send_common_cors_headers()
            self.end_headers()
            if send_body and data:
                self.wfile.write(data)
        except Exception as exc:
            self.send_error(502, f"Proxy error: {exc}")

    def serve_swf_page(self, _path, query, send_body):
        """为SWF文件生成HTML包装页面"""
        # 从query参数中获取SWF URL
        swf_url = ""
        if query:
            params = urllib.parse.parse_qs(query)
            if "url" in params:
                swf_url = params["url"][0]
            elif "path" in params:
                swf_url = params["path"][0]

        if not swf_url:
            self.send_error(400, "Missing SWF URL")
            return

        # 将SWF URL转换为代理URL，避免跨域问题
        parsed_url = urllib.parse.urlsplit(swf_url)
        proxy_path = f"/__proxy__/{parsed_url.scheme}/{parsed_url.hostname}{parsed_url.path}"
        if parsed_url.query:
            proxy_path += f"?{parsed_url.query}"

        # 使用代理后的URL
        swf_proxy_url = f"{self.server.base_url}{proxy_path}"

        html_content = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>SWF Player</title>
    <style>
        html, body {{ margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }}
    </style>
</head>
<body>
    <script src="__ruffle__/ruffle.js"></script>
    <embed id="ruffle" width="100%" height="100%" allowfullscreen allow="fullscreen" src="{swf_proxy_url}" type="application/x-shockwave-flash">
</body>
</html>"""

        data = html_content.encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.send_common_cors_headers()
        self.end_headers()
        if send_body:
            self.wfile.write(data)

    def decode_proxy_target(self, path, query):
        payload = path[len("/__proxy__/") :].lstrip("/")
        parts = payload.split("/", 2)
        if len(parts) < 2:
            return ""

        scheme = parts[0].lower()
        host = parts[1]
        raw_path = "/" + parts[2] if len(parts) == 3 else "/"

        if scheme not in ("http", "https") or not host:
            return ""

        target = f"{scheme}://{host}{raw_path}"
        if query:
            target += "?" + query
        return target


class LocalRuffleServer:
    def __init__(self, ruffle_dir):
        self.ruffle_dir = os.path.abspath(ruffle_dir)
        self.base_url = ""
        self.ruffle_root = ""
        self.proxy_root = ""
        self.bootstrap_source = ""
        self._server = None
        self._thread = None

    def start(self):
        if self._server is not None:
            return

        self._server = ThreadingHTTPServer(("127.0.0.1", 0), LocalRuffleRequestHandler)
        self._server.ruffle_dir = self.ruffle_dir
        # 增加超时时间以处理大文件（如WASM）
        self._server.timeout = 60
        self._server.request_queue_size = 10

        host, port = self._server.server_address
        self.base_url = f"http://{host}:{port}"
        # 同时设置到server对象上，供request handler使用
        self._server.base_url = self.base_url
        self.ruffle_root = self.base_url + "/__ruffle__/"
        self.proxy_root = self.base_url + "/__proxy__/"
        self.bootstrap_source = self._build_bootstrap_source()
        self._server.bootstrap_source = self.bootstrap_source

        self._thread = threading.Thread(target=self._server.serve_forever, daemon=True)
        self._thread.start()
        
        # 打印缓存状态报告
        _scan_existing_cache()

    def stop(self):
        if self._server is None:
            return

        self._server.shutdown()
        self._server.server_close()
        self._server = None
        self._thread = None

    def _build_bootstrap_source(self):
        bootstrap = read_text_file(RUFFLE_BOOTSTRAP_PATH)
        bootstrap = bootstrap.replace(
            'var RUFFLE_SCRIPT_URL = ROOT + "ruffle.js";',
            f"var RUFFLE_SCRIPT_URL = '{escape_js_string(self.ruffle_root)}ruffle.js';",
        )
        bootstrap = bootstrap.replace(
            "return window.location.origin",
            f"return '{escape_js_string(self.base_url)}'",
        )
        return bootstrap


class BrowserWindow(QMainWindow):
    def __init__(self, url, title="游戏浏览器", cookie_file=""):
        super().__init__()
        self.url = url
        self.cookie_file = cookie_file
        self.cookies = ""
        self.cookies_set = False
        self.initial_load = True
        self.local_server = None

        self.setWindowTitle(title)
        # 增大窗口尺寸以确保头像更换SWF控件完整显示
        self.setGeometry(100, 100, 1200, 900)

        self._ensure_ruffle_assets()
        self.local_server = LocalRuffleServer(RUFFLE_DIR)
        self.local_server.start()

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

        # 如果URL是头像更换的SWF，则使用Ruffle包装播放
        if url.startswith("http://www.youkia.com/swf/tou.swf?path="):
            swf_url = url
            # URL编码SWF路径
            encoded_swf_url = urllib.parse.quote(swf_url, safe="")
            # 使用本地服务器的__swf__路由
            url = f"{self.local_server.base_url}/__swf__/?url={encoded_swf_url}"
            print(f"[INFO] 头像更换SWF检测到，使用Ruffle包装: {url}")

        self.browser.load(QUrl(url))

    def closeEvent(self, event):
        if self.local_server is not None:
            self.local_server.stop()
        super().closeEvent(event)

    def _ensure_ruffle_assets(self):
        missing = []
        for path in (RUFFLE_DIR, RUFFLE_JS_PATH, RUFFLE_BOOTSTRAP_PATH):
            if not os.path.exists(path):
                missing.append(path)

        if missing:
            for path in missing:
                print(f"[ERROR] 缺少 Ruffle 资源: {path}")
            raise FileNotFoundError("Ruffle assets not found")

    def _configure_browser_settings(self):
        settings = self.browser.settings()
        web_attribute = QWebEngineSettings.WebAttribute
        settings.setAttribute(web_attribute.JavascriptEnabled, True)
        settings.setAttribute(web_attribute.PluginsEnabled, False)
        settings.setAttribute(web_attribute.FullScreenSupportEnabled, True)
        settings.setAttribute(web_attribute.LocalStorageEnabled, True)
        settings.setAttribute(web_attribute.AllowRunningInsecureContent, True)
        settings.setAttribute(web_attribute.WebGLEnabled, True)
        # 启用缓存
        settings.setAttribute(web_attribute.LocalContentCanAccessRemoteUrls, True)
        settings.setAttribute(web_attribute.LocalContentCanAccessFileUrls, True)

    def _install_preload_script(self):
        ruffle_runtime = read_text_file(RUFFLE_JS_PATH)
        bootstrap = self.local_server.bootstrap_source
        preload_script = self._build_preload_script(ruffle_runtime, bootstrap)

        script = QWebEngineScript()
        script.setName("ruffle-preload")
        script.setInjectionPoint(QWebEngineScript.InjectionPoint.DocumentCreation)
        script.setRunsOnSubFrames(True)
        script.setWorldId(QWebEngineScript.ScriptWorldId.MainWorld)
        script.setSourceCode(preload_script)
        self.page.scripts().insert(script)

    def _build_preload_script(self, ruffle_runtime, bootstrap):
        proxy_expr = make_proxy_url_js_expression("inputUrl", self.local_server.proxy_root)
        config_script = f"""
(function() {{
    if (window.__flashBrowserRufflePreloaded) {{
        return;
    }}
    window.__flashBrowserRufflePreloaded = true;

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
    c.favorFlash = false;
    c.unmuteOverlay = 'hidden';
    c.allowFullscreen = true;
    c.allowScriptAccess = true;
    c.allowNetworking = 'all';
    c.openUrlMode = 'allow';
    c.polyfills = true;
    c.publicPath = '{escape_js_string(self.local_server.ruffle_root)}';
    // 启用缓存
    c.cache = true;
    c.cacheDirectory = '/tmp/ruffle_cache';
    c.warnOnUnsupportedContent = false;
    c.logLevel = 'error';
    c.deviceFontRenderer = 'canvas';
    c.speed = 1;
    c.scale = 'showAll';
    c.preserveAspectRatio = true;
    c.defaultFonts = {{
        sans: ['Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', 'Noto Sans CJK SC', 'Source Han Sans SC', 'SimHei', 'Arial Unicode MS', 'sans-serif'],
        serif: ['SimSun', 'Songti SC', 'STSong', 'Noto Serif CJK SC', 'Source Han Serif SC', 'Times New Roman', 'serif'],
        typewriter: ['Consolas', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
        japaneseGothic: ['Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', 'Noto Sans CJK SC', 'Source Han Sans SC', 'sans-serif'],
        japaneseGothicMono: ['Consolas', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
        japaneseMincho: ['SimSun', 'Songti SC', 'STSong', 'Noto Serif CJK SC', 'Source Han Serif SC', 'serif']
    }};

    if (window.navigator && ('gpu' in navigator)) {{
        c.preferredRenderer = 'webgpu';
    }} else if (window.WebGLRenderingContext || window.WebGL2RenderingContext) {{
        c.preferredRenderer = 'wgpu-webgl';
    }} else {{
        c.preferredRenderer = 'canvas';
    }}

    c.renderer = 'auto';

    try {{
        var nativeFetch = window.fetch ? window.fetch.bind(window) : null;
        if (nativeFetch && !window.__flashBrowserFetchPatched) {{
            window.__flashBrowserFetchPatched = true;
            window.fetch = async function(input, init) {{
                var inputUrl = '';
                var method = 'GET';
                var headers = new Headers();
                var inputRequest = null;

                if (typeof input === 'string') {{
                    inputUrl = input;
                }} else if (input && typeof input.url === 'string') {{
                    inputRequest = input;
                    inputUrl = input.url;
                    if (input.method) {{
                        method = String(input.method);
                    }}
                    try {{
                        headers = new Headers(input.headers || undefined);
                    }} catch (e) {{}}
                }}
                if (init && init.method) {{
                    method = String(init.method);
                }}
                if (init && init.headers) {{
                    try {{
                        headers = new Headers(init.headers);
                    }} catch (e) {{}}
                }}

                var contentType = String(headers.get('Content-Type') || headers.get('content-type') || '').toLowerCase();
                var isAmfLike = contentType.indexOf('application/x-amf') !== -1
                    || contentType.indexOf('application/octet-stream') !== -1;
                var upperMethod = method.toUpperCase();
                var isNonGet = upperMethod !== 'GET' && upperMethod !== 'HEAD';
                var shouldForceProxy = isNonGet && isAmfLike;

                if (shouldForceProxy) {{
                    headers.set('X-FlashBrowser-Page-Cookie', document.cookie || '');
                }}

                var rewrittenUrl = {proxy_expr};
                if (shouldForceProxy) {{
                    rewrittenUrl = (function(rawUrl) {{
                        if (!rawUrl) {{
                            return rawUrl;
                        }}
                        try {{
                            var parsed = new URL(rawUrl, window.location.href);
                            return '{escape_js_string(self.local_server.proxy_root)}'
                                + parsed.protocol.replace(':', '')
                                + '/'
                                + parsed.host
                                + parsed.pathname
                                + parsed.search;
                        }} catch (error) {{
                            return rawUrl;
                        }}
                    }})(inputUrl);
                }}

                if (rewrittenUrl && rewrittenUrl !== inputUrl) {{
                    if (typeof input === 'string') {{
                        init = init || {{}};
                        init.headers = headers;
                        return nativeFetch(rewrittenUrl, init);
                    }}

                    if (inputRequest && typeof Request !== 'undefined' && inputRequest instanceof Request) {{
                        var finalInit = init ? Object.assign({{}}, init) : {{}};
                        finalInit.method = finalInit.method || inputRequest.method;
                        finalInit.headers = headers;
                        finalInit.credentials = finalInit.credentials || inputRequest.credentials;
                        finalInit.cache = finalInit.cache || inputRequest.cache;
                        finalInit.redirect = finalInit.redirect || inputRequest.redirect;
                        finalInit.referrer = finalInit.referrer || inputRequest.referrer;
                        finalInit.referrerPolicy = finalInit.referrerPolicy || inputRequest.referrerPolicy;
                        finalInit.integrity = finalInit.integrity || inputRequest.integrity;
                        finalInit.keepalive = typeof finalInit.keepalive === 'boolean' ? finalInit.keepalive : inputRequest.keepalive;
                        finalInit.mode = 'cors';
                        finalInit.signal = finalInit.signal || inputRequest.signal;

                        if (typeof finalInit.body === 'undefined' && isNonGet) {{
                            try {{
                                finalInit.body = await inputRequest.clone().arrayBuffer();
                            }} catch (e) {{}}
                        }}

                        return nativeFetch(rewrittenUrl, finalInit);
                    }}
                }}

                return nativeFetch(input, init);
            }};
        }}
    }} catch (e) {{}}
}})();
"""
        return config_script + "\n" + ruffle_runtime + "\n" + bootstrap

    def _load_cookie_file(self):
        if not self.cookie_file or not os.path.exists(self.cookie_file):
            return

        try:
            with open(self.cookie_file, "r", encoding="utf-8") as handle:
                self.cookies = handle.read().strip()
            os.remove(self.cookie_file)
        except Exception as exc:
            print(f"[DEBUG] Error loading cookies: {exc}")

    def on_load_finished(self, ok):
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

        js_lines.extend(["return document.cookie;", "})();"])
        self.browser.page().runJavaScript("\n".join(js_lines), lambda _result: self.browser.reload())


def open_browser(url, title="植物大战僵尸", cookie_file=""):
    app = QApplication(sys.argv)
    window = BrowserWindow(url, title, cookie_file)
    window.show()
    sys.exit(app.exec())


if __name__ == "__main__":
    if len(sys.argv) > 1:
        target_url = sys.argv[1]
        window_title = sys.argv[2] if len(sys.argv) > 2 else "游戏浏览器"
        cookies_path = sys.argv[3] if len(sys.argv) > 3 else ""
        open_browser(target_url, window_title, cookies_path)
    else:
        print("用法: python web.py <URL> [窗口标题] [cookie文件路径]")
