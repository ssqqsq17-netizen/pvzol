/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 48
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 269
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 460
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 778
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 125
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 65
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.classnames = classnames;
const classListFromObject = (record) => Object.entries(record).map(([key, value]) => value && key);
const isTruthy = (v) => !!v;
const isUnique = (v, i, a) => a.indexOf(v) === i;
const emptyArray = [];
function classnamesToArray(value) {
    if (!value)
        return emptyArray;
    if (typeof value === "string")
        return [value];
    if (Array.isArray(value))
        return value.flatMap(classnamesToArray).filter(isTruthy);
    return classListFromObject(value).filter(isTruthy);
}
function classnames(value) {
    const list = classnamesToArray(value).filter(isUnique);
    return list.length > 0 ? list.join(" ") : undefined;
}


/***/ },

/***/ 665
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(48), exports);
__exportStar(__webpack_require__(269), exports);
__exportStar(__webpack_require__(125), exports);
__exportStar(__webpack_require__(778), exports);
__exportStar(__webpack_require__(460), exports);
__exportStar(__webpack_require__(65), exports);


/***/ },

/***/ 53
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createRef = exports.h = void 0;
exports.createElement = createElement;
const setAttributes_1 = __webpack_require__(136);
const utils_1 = __webpack_require__(56);
function createElement(tag, attrs, ...children) {
    if (typeof tag === "function")
        return tag({ ...attrs, children });
    const { finalTag, finalAttrs } = (0, utils_1.applyTsxTag)(tag, attrs);
    const element = (0, utils_1.createDomElement)(finalTag, finalAttrs);
    if (finalAttrs)
        (0, setAttributes_1.setAttributes)(element, finalAttrs);
    (0, utils_1.applyChildren)(element, children);
    return element;
}
exports.h = createElement;
const createRef = () => ({ current: null });
exports.createRef = createRef;


/***/ },

/***/ 325
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defineCustomElement = defineCustomElement;
const jsx_runtime_1 = __webpack_require__(553);
function defineCustomElement(name, constructor, options) {
    customElements.define(name, constructor, options);
    return (props) => (0, jsx_runtime_1.jsx)(name, props);
}


/***/ },

/***/ 29
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(53), exports);
__exportStar(__webpack_require__(325), exports);
__exportStar(__webpack_require__(553), exports);
__exportStar(__webpack_require__(836), exports);


/***/ },

/***/ 553
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jsx = jsx;
exports.jsxs = jsx;
exports.jsxDEV = jsx;
const setAttributes_1 = __webpack_require__(136);
const utils_1 = __webpack_require__(56);
function jsx(tag, props) {
    if (typeof tag === "function")
        return tag(props);
    const { children, ...attrs } = props;
    const { finalTag, finalAttrs } = (0, utils_1.applyTsxTag)(tag, attrs);
    const element = (0, utils_1.createDomElement)(finalTag, finalAttrs);
    (0, setAttributes_1.setAttributes)(element, finalAttrs);
    (0, utils_1.applyChildren)(element, [children]);
    return element;
}


/***/ },

/***/ 136
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setAttributes = setAttributes;
const tsx_dom_types_1 = __webpack_require__(665);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transferKnownProperties(source, target) {
    for (const key of Object.keys(source)) {
        if (key in target)
            target[key] = source[key];
    }
}
/** "on" followed by an uppercase character. Not sure if there are any events with anything other than A-Z. Checking unicode just to be safe */
const eventAttributeName = /^on\p{Lu}/u;
function setAttributes(element, attrs) {
    for (const name of Object.keys(attrs)) {
        // Ignore some debug props that might be added by bundlers
        if (name === "__source" || name === "__self" || name === "tsxTag")
            continue;
        const value = attrs[name];
        if (name === "class") {
            const finalValue = (0, tsx_dom_types_1.classnames)(value);
            if (finalValue)
                element.setAttribute(name, finalValue);
        }
        else if (name === "ref") {
            value.current = element;
        }
        else if (eventAttributeName.test(name)) {
            const finalName = name.replace(/Capture$/, "");
            const useCapture = name !== finalName;
            const eventName = finalName.toLowerCase().substring(2);
            element.addEventListener(eventName, value, useCapture);
        }
        else if (name === "style" && typeof value !== "string") {
            // Special handler for style with a value of type CSSStyleDeclaration
            transferKnownProperties(value, element.style);
        }
        else if (name === "dangerouslySetInnerHTML")
            element.innerHTML = value;
        else if (value === true)
            element.setAttribute(name, name);
        else if (value || value === 0 || value === "")
            element.setAttribute(name, value.toString());
    }
}


/***/ },

/***/ 836
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ 56
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.applyChildren = applyChildren;
exports.createDomElement = createDomElement;
exports.applyTsxTag = applyTsxTag;
function applyChild(element, child) {
    if (child instanceof Element)
        element.appendChild(child);
    else if (typeof child === "string" || typeof child === "number")
        element.appendChild(document.createTextNode(child.toString()));
    else
        console.warn("Unknown type to append: ", child);
}
function applyChildren(element, children) {
    for (const child of children) {
        if (!child && child !== 0)
            continue;
        if (Array.isArray(child))
            applyChildren(element, child);
        else
            applyChild(element, child);
    }
}
function createDomElement(tag, attrs) {
    const options = attrs?.is ? { is: attrs.is } : undefined;
    if (attrs?.xmlns)
        return document.createElementNS(attrs.xmlns, tag, options);
    return document.createElement(tag, options);
}
function applyTsxTag(tag, attrs) {
    let finalTag = tag;
    let finalAttrs = attrs;
    if (finalAttrs && "tsxTag" in finalAttrs) {
        finalTag = finalAttrs.tsxTag;
        if (!finalAttrs.is && tag.includes("-")) {
            finalAttrs = { ...finalAttrs, is: tag };
        }
    }
    return { finalTag, finalAttrs };
}


/***/ },

/***/ 124
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/ruffle_web-wasm_mvp_bg.wasm";

/***/ },

/***/ 797
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/ruffle_web_bg.wasm";

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "ruffle-extension:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/dist/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = (typeof document !== 'undefined' && document.baseURI) || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			88: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkruffle_extension"] = self["webpackChunkruffle_extension"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// ../core/dist/public/config/load-options.js
/**
 * Represents the various types of auto-play behaviours that are supported.
 */
var AutoPlay;
(function (AutoPlay) {
    /**
     * The player should automatically play the movie as soon as it is loaded.
     *
     * If the browser does not support automatic audio, the movie will begin
     * muted.
     */
    AutoPlay["On"] = "on";
    /**
     * The player should not attempt to automatically play the movie.
     *
     * This will leave it to the user or API to actually play when appropriate.
     */
    AutoPlay["Off"] = "off";
    /**
     * The player should automatically play the movie as soon as it is deemed
     * "appropriate" to do so.
     *
     * The exact behaviour depends on the browser, but commonly requires some
     * form of user interaction on the page in order to allow auto playing videos
     * with sound.
     */
    AutoPlay["Auto"] = "auto";
})(AutoPlay || (AutoPlay = {}));
/**
 * Controls whether the content is letterboxed or pillarboxed when the
 * player's aspect ratio does not match the movie's aspect ratio.
 *
 * When letterboxed, black bars will be rendered around the exterior
 * margins of the content.
 */
var Letterbox;
(function (Letterbox) {
    /**
     * The content will never be letterboxed.
     */
    Letterbox["Off"] = "off";
    /**
     * The content will only be letterboxed if the content is running fullscreen.
     */
    Letterbox["Fullscreen"] = "fullscreen";
    /**
     * The content will always be letterboxed.
     */
    Letterbox["On"] = "on";
})(Letterbox || (Letterbox = {}));
/**
 * When the player is muted, this controls whether or not Ruffle will show a
 * "click to unmute" overlay on top of the movie.
 */
var UnmuteOverlay;
(function (UnmuteOverlay) {
    /**
     * Show an overlay explaining that the movie is muted.
     */
    UnmuteOverlay["Visible"] = "visible";
    /**
     * Don't show an overlay and pretend that everything is fine.
     */
    UnmuteOverlay["Hidden"] = "hidden";
})(UnmuteOverlay || (UnmuteOverlay = {}));
/**
 * Console logging level.
 */
var LogLevel;
(function (LogLevel) {
    LogLevel["Error"] = "error";
    LogLevel["Warn"] = "warn";
    LogLevel["Info"] = "info";
    LogLevel["Debug"] = "debug";
    LogLevel["Trace"] = "trace";
})(LogLevel || (LogLevel = {}));
/**
 * The window mode of a Ruffle player.
 */
var WindowMode;
(function (WindowMode) {
    /**
     * The Flash content is rendered in its own window and layering is done with the browser's
     * default behavior.
     *
     * In Ruffle, this mode functions like `WindowMode::Opaque` and will layer the Flash content
     * together with other HTML elements.
     */
    WindowMode["Window"] = "window";
    /**
     * The Flash content is layered together with other HTML elements, and the stage color is
     * opaque. Content can render above or below Ruffle based on CSS rendering order.
     */
    WindowMode["Opaque"] = "opaque";
    /**
     * The Flash content is layered together with other HTML elements, and the SWF stage color is
     * transparent. Content beneath Ruffle will be visible through transparent areas.
     */
    WindowMode["Transparent"] = "transparent";
    /**
     * Request compositing with hardware acceleration when possible.
     * This mode has no effect in Ruffle and will function like `WindowMode.Opaque`.
     */
    WindowMode["Direct"] = "direct";
    /**
     * Request a direct rendering path, bypassing browser compositing when possible.
     * This mode has no effect in Ruffle and will function like `WindowMode::Opaque`.
     */
    WindowMode["Gpu"] = "gpu";
})(WindowMode || (WindowMode = {}));
/**
 * The render backend of a Ruffle player.
 *
 * The available backends may change in future releases.
 */
var RenderBackend;
(function (RenderBackend) {
    /**
     * An [in-development API](https://caniuse.com/webgpu) that will be preferred if available in the future.
     * Should behave the same as wgpu-webgl, except with lower overhead and thus better performance.
     */
    RenderBackend["WebGpu"] = "webgpu";
    /**
     * The most featureful and currently preferred backend.
     * Rendering is done the same way as in the desktop app, then translated to WebGL on-the-fly.
     */
    RenderBackend["WgpuWebgl"] = "wgpu-webgl";
    /**
     * A vanilla WebGL backend. Was the default backend until the start of 2023,
     * but is now used as a fallback for devices that do not support WebGL 2.
     * Supports fewer features and has a faster initialization time;
     * may be useful for content that does not need advanced features like bitmap drawing or blend modes.
     */
    RenderBackend["Webgl"] = "webgl";
    /**
     * The slowest and most basic backend, used as a fallback when all else fails.
     * However, this is currently the only backend that accurately scales hairline strokes.
     * If you notice excessively thick strokes in specific content,
     * you may want to use the canvas renderer for that content until the issue is resolved.
     */
    RenderBackend["Canvas"] = "canvas";
})(RenderBackend || (RenderBackend = {}));
/**
 * Represents the various context menu options that are supported.
 */
var ContextMenu;
(function (ContextMenu) {
    /**
     * The context menu should appear when right-clicking or long-pressing
     * the Ruffle instance.
     */
    ContextMenu["On"] = "on";
    /**
     * The context menu should only appear when right-clicking
     * the Ruffle instance.
     */
    ContextMenu["RightClickOnly"] = "rightClickOnly";
    /**
     * The context menu should not appear when right-clicking or long-pressing
     * the Ruffle instance.
     */
    ContextMenu["Off"] = "off";
})(ContextMenu || (ContextMenu = {}));
/**
 * Represents the player runtime to emulate.
 */
var PlayerRuntime;
(function (PlayerRuntime) {
    /**
     * Emulate Adobe AIR.
     */
    PlayerRuntime["AIR"] = "air";
    /**
     * Emulate Adobe Flash Player.
     */
    PlayerRuntime["FlashPlayer"] = "flashPlayer";
})(PlayerRuntime || (PlayerRuntime = {}));
/**
 * The handling mode of links opening a new website.
 */
var OpenURLMode;
(function (OpenURLMode) {
    /**
     * Allow all links to open a new website.
     */
    OpenURLMode["Allow"] = "allow";
    /**
     * A confirmation dialog opens with every link trying to open a new website.
     */
    OpenURLMode["Confirm"] = "confirm";
    /**
     * Deny all links to open a new website.
     */
    OpenURLMode["Deny"] = "deny";
})(OpenURLMode || (OpenURLMode = {}));
/**
 * The networking API access mode of the Ruffle player.
 */
var NetworkingAccessMode;
(function (NetworkingAccessMode) {
    /**
     * All networking APIs are permitted in the SWF file.
     */
    NetworkingAccessMode["All"] = "all";
    /**
     * The SWF file may not call browser navigation or browser interaction APIs.
     *
     * The APIs navigateToURL(), fscommand() and ExternalInterface.call() are
     * prevented in this mode.
     */
    NetworkingAccessMode["Internal"] = "internal";
    /**
     * The SWF file may not call browser navigation or browser interaction APIs
     * and it cannot use any SWF-to-SWF communication APIs.
     *
     * Additionally to the ones in internal mode, the APIs sendToURL(),
     * FileReference.download(), FileReference.upload(), Loader.load(),
     * LocalConnection.connect(), LocalConnection.send(), NetConnection.connect(),
     * NetStream.play(), Security.loadPolicyFile(), SharedObject.getLocal(),
     * SharedObject.getRemote(), Socket.connect(), Sound.load(), URLLoader.load(),
     * URLStream.load() and XMLSocket.connect() are prevented in this mode.
     *
     * This mode is not implemented yet.
     */
    NetworkingAccessMode["None"] = "none";
})(NetworkingAccessMode || (NetworkingAccessMode = {}));
/**
 * The behavior of scrolling the web page.
 */
var ScrollingBehavior;
(function (ScrollingBehavior) {
    /**
     * Always scroll the page.
     */
    ScrollingBehavior["Always"] = "always";
    /**
     * Never scroll the page.
     */
    ScrollingBehavior["Never"] = "never";
    /**
     * Scroll the page only when the Flash content hasn't handled the scroll.
     */
    ScrollingBehavior["Smart"] = "smart";
})(ScrollingBehavior || (ScrollingBehavior = {}));
/**
 * Specifies how device fonts should be rendered.
 */
var DeviceFontRenderer;
(function (DeviceFontRenderer) {
    /**
     * Use Ruffle's embedded text rendering engine.
     *
     * It cannot access device fonts and uses fonts provided in the
     * configuration and the default Noto Sans font as a fallback.
     *
     * This is the default method.
     */
    DeviceFontRenderer["Embedded"] = "embedded";
    /**
     * Use an offscreen canvas for text rendering.
     *
     * It can access and render device fonts, glyphs are rendered as bitmaps.
     *
     * This is an experimental method and some features might not work properly.
     */
    DeviceFontRenderer["Canvas"] = "canvas";
})(DeviceFontRenderer || (DeviceFontRenderer = {}));
/**
 * @experimental
 */
var GamepadButton;
(function (GamepadButton) {
    GamepadButton["South"] = "south";
    GamepadButton["East"] = "east";
    GamepadButton["North"] = "north";
    GamepadButton["West"] = "west";
    GamepadButton["LeftTrigger"] = "left-trigger";
    GamepadButton["LeftTrigger2"] = "left-trigger-2";
    GamepadButton["RightTrigger"] = "right-trigger";
    GamepadButton["RightTrigger2"] = "right-trigger-2";
    GamepadButton["Select"] = "select";
    GamepadButton["Start"] = "start";
    GamepadButton["DPadUp"] = "dpad-up";
    GamepadButton["DPadDown"] = "dpad-down";
    GamepadButton["DPadLeft"] = "dpad-left";
    GamepadButton["DPadRight"] = "dpad-right";
})(GamepadButton || (GamepadButton = {}));

;// ../core/dist/public/config/default.js

const DEFAULT_CONFIG = {
    allowScriptAccess: false,
    parameters: {},
    autoplay: AutoPlay.Auto,
    backgroundColor: null,
    letterbox: Letterbox.Fullscreen,
    unmuteOverlay: UnmuteOverlay.Visible,
    upgradeToHttps: true,
    compatibilityRules: true,
    favorFlash: true,
    warnOnUnsupportedContent: true,
    logLevel: LogLevel.Error,
    showSwfDownload: false,
    contextMenu: ContextMenu.On,
    // Backwards-compatibility option
    preloader: true,
    splashScreen: true,
    maxExecutionDuration: 15,
    base: null,
    menu: true,
    allowFullscreen: false,
    salign: "",
    fullScreenAspectRatio: "",
    forceAlign: false,
    quality: null,
    scale: "showAll",
    forceScale: false,
    frameRate: null,
    wmode: WindowMode.Window,
    publicPath: null,
    polyfills: true,
    playerVersion: null,
    preferredRenderer: null,
    openUrlMode: OpenURLMode.Allow,
    allowNetworking: NetworkingAccessMode.All,
    openInNewTab: null,
    socketProxy: [],
    fontSources: [],
    defaultFonts: {},
    credentialAllowList: [],
    playerRuntime: PlayerRuntime.FlashPlayer,
    gamepadButtonMapping: {},
    urlRewriteRules: [],
    scrollingBehavior: ScrollingBehavior.Smart,
    deviceFontRenderer: DeviceFontRenderer.Embedded,
};

;// ./src/utils.ts

const DEFAULT_OPTIONS = {
    ...DEFAULT_CONFIG,
    ruffleEnable: true,
    ignoreOptout: false,
    autostart: false,
    showReloadButton: false,
    swfTakeover: true,
};
// TODO: Once https://crbug.com/798169 is addressed, just use browser.
// We have to wait until whatever version of Chromium supports that
// is old enough to be the oldest version we want to support.
let i18n;
let scripting;
let storage;
let tabs;
let runtime;
let permissions;
let declarativeNetRequest;
function promisify(func) {
    return new Promise((resolve, reject) => {
        func((result) => {
            const error = chrome.runtime.lastError;
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
}
if (typeof browser !== "undefined") {
    i18n = browser.i18n;
    scripting = browser.scripting;
    storage = browser.storage;
    tabs = browser.tabs;
    runtime = browser.runtime;
    permissions = browser.permissions;
    declarativeNetRequest = browser.declarativeNetRequest;
}
else if (typeof chrome !== "undefined") {
    i18n = chrome.i18n;
    scripting = chrome.scripting;
    storage = chrome.storage;
    tabs = chrome.tabs;
    runtime = chrome.runtime;
    permissions = chrome.permissions;
    declarativeNetRequest = chrome.declarativeNetRequest;
}
else {
    throw new Error("Extension API not found.");
}
const openOptionsPage = () => runtime.openOptionsPage();
const openPlayerPage = () => promisify((cb) => tabs.create({ url: "/player.html" }, cb));
const openOnboardPage = () => promisify((cb) => tabs.create({ url: "/onboard.html" }, cb));
async function getOptions() {
    const options = await storage.sync.get();
    // Copy over default options if they don't exist yet.
    return { ...DEFAULT_OPTIONS, ...options };
}
/**
 * Gets the options that are explicitly different from the defaults.
 *
 * In the future we should just not store options we don't want to set.
 */
async function getExplicitOptions() {
    const options = await getOptions();
    const defaultOptions = DEFAULT_OPTIONS;
    for (const key in defaultOptions) {
        // @ts-expect-error: Element implicitly has an any type
        if (key in options && defaultOptions[key] === options[key]) {
            // @ts-expect-error: Element implicitly has an any type
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete options[key];
        }
    }
    // This value is specific to the internal extension pages, and is always "default"
    if ("responseHeadersUnsupported" in options) {
        delete options["responseHeadersUnsupported"];
    }
    return options;
}
const hasAllUrlsPermission = async () => {
    const allPermissions = await permissions.getAll();
    return allPermissions.origins?.includes("<all_urls>") ?? false;
};
async function hasHostPermissionForSpecifiedTab(origin) {
    try {
        return origin
            ? await permissions.contains({
                origins: [origin],
            })
            : await hasAllUrlsPermission();
    }
    catch {
        // catch error that occurs for special urls like about:
        return false;
    }
}
async function hasHostPermissionForActiveTab() {
    const [activeTab] = await tabs.query({
        active: true,
        currentWindow: true,
    });
    return await hasHostPermissionForSpecifiedTab(activeTab?.url);
}

;// ../core/dist/version.js
/**
 * A representation of a semver 2 compliant version string
 */
class Version {
    /**
     * Construct a Version from specific components.
     *
     * If you wish to parse a string into a Version then please use {@link fromSemver}.
     *
     * @param major The major version component.
     * @param minor The minor version component.
     * @param patch The patch version component.
     * @param prIdent A list of pre-release identifiers, if any
     * @param buildIdent A list of build identifiers, if any
     */
    constructor(major, minor, patch, prIdent, buildIdent) {
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.prIdent = prIdent;
        this.buildIdent = buildIdent;
    }
    /**
     * Construct a version from a semver 2 compliant string.
     *
     * This function is intended for use with semver 2 compliant strings.
     * Malformed strings may still parse correctly, but this result is not
     * guaranteed.
     *
     * @param versionString A semver 2.0.0 compliant version string
     * @returns A version object
     */
    static fromSemver(versionString) {
        const buildSplit = versionString.split("+"), prSplit = buildSplit[0].split("-"), versionSplit = prSplit[0].split(".");
        const major = parseInt(versionSplit[0], 10);
        let minor = 0;
        let patch = 0;
        let prIdent = null;
        let buildIdent = null;
        if (versionSplit[1] !== undefined) {
            minor = parseInt(versionSplit[1], 10);
        }
        if (versionSplit[2] !== undefined) {
            patch = parseInt(versionSplit[2], 10);
        }
        if (prSplit[1] !== undefined) {
            prIdent = prSplit[1].split(".");
        }
        if (buildSplit[1] !== undefined) {
            buildIdent = buildSplit[1].split(".");
        }
        return new Version(major, minor, patch, prIdent, buildIdent);
    }
    /**
     * Returns true if a given version is compatible with this one.
     *
     * Compatibility is defined as having the same nonzero major version
     * number, or if both major versions are zero, the same nonzero minor
     * version number, or if both minor versions are zero, the same nonzero
     * patch version number.
     *
     * This implements the ^ operator in npm's semver package, with the
     * exception of the prerelease exclusion rule.
     *
     * @param other The other version to test against
     * @returns True if compatible
     */
    isCompatibleWith(other) {
        return ((this.major !== 0 && this.major === other.major) ||
            (this.major === 0 &&
                other.major === 0 &&
                this.minor !== 0 &&
                this.minor === other.minor) ||
            (this.major === 0 &&
                other.major === 0 &&
                this.minor === 0 &&
                other.minor === 0 &&
                this.patch !== 0 &&
                this.patch === other.patch));
    }
    /**
     * Returns true if this version has precedence over (is newer than) another
     * version.
     *
     * Precedence is defined as in the Semver 2 spec. This implements the >
     * operator in npm's semver package, with the exception of the prerelease
     * exclusion rule.
     *
     * @param other The other version to test against
     * @returns True if this version has precedence over the other one
     */
    hasPrecedenceOver(other) {
        if (this.major > other.major) {
            return true;
        }
        else if (this.major < other.major) {
            return false;
        }
        if (this.minor > other.minor) {
            return true;
        }
        else if (this.minor < other.minor) {
            return false;
        }
        if (this.patch > other.patch) {
            return true;
        }
        else if (this.patch < other.patch) {
            return false;
        }
        if (this.prIdent === null && other.prIdent !== null) {
            return true;
        }
        else if (this.prIdent !== null && other.prIdent === null) {
            return false;
        }
        else if (this.prIdent !== null && other.prIdent !== null) {
            const isNumeric = /^[0-9]*$/;
            for (let i = 0; i < this.prIdent.length && i < other.prIdent.length; i += 1) {
                const numericThis = isNumeric.test(other.prIdent[i]);
                const numericOther = isNumeric.test(this.prIdent[i]);
                if (!numericOther && numericThis) {
                    return true;
                }
                else if (numericOther && numericThis) {
                    const intThis = parseInt(this.prIdent[i], 10);
                    const intOther = parseInt(other.prIdent[i], 10);
                    if (intThis > intOther) {
                        return true;
                    }
                    else if (intThis < intOther) {
                        return false;
                    }
                }
                else if (numericOther && !numericThis) {
                    return false;
                }
                else if (!numericOther && !numericThis) {
                    if (this.prIdent[i] > other.prIdent[i]) {
                        return true;
                    }
                    else if (this.prIdent[i] < other.prIdent[i]) {
                        return false;
                    }
                }
            }
            if (this.prIdent.length > other.prIdent.length) {
                return true;
            }
            else if (this.prIdent.length < other.prIdent.length) {
                return false;
            }
        }
        // Unlike prerelease, we prefer to have a build ident than to not
        if (this.buildIdent !== null && other.buildIdent === null) {
            return true;
        }
        else if (this.buildIdent === null && other.buildIdent !== null) {
            return false;
        }
        else if (this.buildIdent !== null && other.buildIdent !== null) {
            const isNumeric = /^[0-9]*$/;
            for (let i = 0; i < this.buildIdent.length && i < other.buildIdent.length; i += 1) {
                const numricThis = isNumeric.test(this.buildIdent[i]);
                const numericOther = isNumeric.test(other.buildIdent[i]);
                if (!numricThis && numericOther) {
                    return true;
                }
                else if (numricThis && numericOther) {
                    const intThis = parseInt(this.buildIdent[i], 10);
                    const intOther = parseInt(other.buildIdent[i], 10);
                    if (intThis > intOther) {
                        return true;
                    }
                    else if (intThis < intOther) {
                        return false;
                    }
                }
                else if (numricThis && !numericOther) {
                    return false;
                }
                else if (!numricThis && !numericOther) {
                    if (this.buildIdent[i] > other.buildIdent[i]) {
                        return true;
                    }
                    else if (this.buildIdent[i] < other.buildIdent[i]) {
                        return false;
                    }
                }
            }
            return this.buildIdent.length > other.buildIdent.length;
        }
        return false;
    }
    /**
     * Tests if a given version is equivalent to this one.
     *
     * Build and prerelease tags are ignored.
     *
     * @param other The other version to test against
     * @returns True if the given version is equivalent
     */
    isEqual(other) {
        return (this.major === other.major &&
            this.minor === other.minor &&
            this.patch === other.patch);
    }
    /**
     * Tests if a given version is stable or a compatible prerelease for this
     * version.
     *
     * This implements the prerelease exclusion rule of NPM semver: a
     * prerelease version can only pass this check if the major/minor/patch
     * components of both versions are the same. Otherwise, the prerelease
     * version always fails.
     *
     * @param other The other version to test against
     * @returns True if the given version is either stable, or a
     * prerelease in the same series as this one.
     */
    isStableOrCompatiblePrerelease(other) {
        if (other.prIdent === null) {
            return true;
        }
        else {
            return (this.major === other.major &&
                this.minor === other.minor &&
                this.patch === other.patch);
        }
    }
}

;// ../core/dist/version-range.js

/**
 * Represents a set of version requirements.
 */
class VersionRange {
    /**
     * Constructs a range of versions as specified by the given requirements.
     *
     * If you wish to construct this object from a string representation,
     * then use {@link fromRequirementString}.
     *
     * @param requirements Requirements to set this range by
     */
    constructor(requirements) {
        this.requirements = requirements;
    }
    /**
     * Determine if a given version satisfies this range.
     *
     * @param fver A version object to test against.
     * @returns Whether or not the given version matches this range
     */
    satisfiedBy(fver) {
        for (const requirement of this.requirements) {
            let matches = true;
            for (const { comparator, version } of requirement) {
                matches =
                    matches && version.isStableOrCompatiblePrerelease(fver);
                if (comparator === "" || comparator === "=") {
                    matches = matches && version.isEqual(fver);
                }
                else if (comparator === ">") {
                    matches = matches && fver.hasPrecedenceOver(version);
                }
                else if (comparator === ">=") {
                    matches =
                        matches &&
                            (fver.hasPrecedenceOver(version) ||
                                version.isEqual(fver));
                }
                else if (comparator === "<") {
                    matches = matches && version.hasPrecedenceOver(fver);
                }
                else if (comparator === "<=") {
                    matches =
                        matches &&
                            (version.hasPrecedenceOver(fver) ||
                                version.isEqual(fver));
                }
                else if (comparator === "^") {
                    matches = matches && version.isCompatibleWith(fver);
                }
            }
            if (matches) {
                return true;
            }
        }
        return false;
    }
    /**
     * Parse a requirement string into a version range.
     *
     * @param requirement The version requirements, consisting of a
     * series of space-separated strings, each one being a semver version
     * optionally prefixed by a comparator or a separator.
     *
     * Valid comparators are:
     * - `""` or `"="`: Precisely this version
     * - `">`": A version newer than this one
     * - `">`=": A version newer or equal to this one
     * - `"<"`: A version older than this one
     * - `"<="`: A version older or equal to this one
     * - `"^"`: A version that is compatible with this one
     *
     * A separator is `"||`" which splits the requirement string into
     * left OR right.
     * @returns A version range object.
     */
    static fromRequirementString(requirement) {
        const components = requirement.split(" ");
        let set = [];
        const requirements = [];
        for (const component of components) {
            if (component === "||") {
                if (set.length > 0) {
                    requirements.push(set);
                    set = [];
                }
            }
            else if (component.length > 0) {
                const match = /[0-9]/.exec(component);
                if (match) {
                    const comparator = component.slice(0, match.index).trim();
                    const version = Version.fromSemver(component.slice(match.index).trim());
                    set.push({ comparator, version });
                }
            }
        }
        if (set.length > 0) {
            requirements.push(set);
        }
        return new VersionRange(requirements);
    }
}

;// ../core/dist/public/setup/public-api.js


/**
 * Represents the Ruffle public API.
 *
 * The public API exists primarily to allow multiple installations of Ruffle on a
 * page (e.g. an extension install and a local one) to cooperate. In an ideal
 * situation, all Ruffle sources on the page install themselves into a single
 * public API, and then the public API picks the newest version by default.
 *
 * This API *is* versioned, in case we need to upgrade it. However, it must be
 * backwards- and forwards-compatible with all known sources.
 */
class PublicAPI {
    /**
     * Construct the Ruffle public API.
     *
     * Do not use this function to negotiate a public API. Instead, use
     * `public_api` to register your Ruffle source with an existing public API
     * if it exists.
     *
     * Constructing a Public API will also trigger it to initialize Ruffle once
     * the page loads, if the API has not already been superseded.
     *
     * @param prev What used to be in the public API slot.
     *
     * This is used to upgrade from a prior version of the public API, or from
     * a user-defined configuration object placed in the public API slot.
     */
    constructor(prev) {
        this.sources = prev?.sources || {};
        this.config = prev?.config || {};
        this.invoked = prev?.invoked || false;
        this.newestName = prev?.newestName || null;
        prev?.superseded?.();
        if (document.readyState === "loading") {
            // Cloudflare Rocket Loader interferes with the DOMContentLoaded event,
            // so we listen for readystatechange instead
            document.addEventListener("readystatechange", this.init.bind(this));
        }
        else {
            window.setTimeout(this.init.bind(this), 0);
        }
    }
    /**
     * The version of the public API.
     *
     * This is *not* the version of Ruffle itself.
     *
     * This allows a page with an old version of the Public API to be upgraded
     * to a new version of the API. The public API is intended to be changed
     * very infrequently, if at all, but this provides an escape mechanism for
     * newer Ruffle sources to upgrade older installations.
     *
     * @returns The version of this public API.
     */
    get version() {
        return "0.1.0";
    }
    /**
     * Determine the name of the newest registered source in the Public API.
     *
     * @returns The name of the source, or `null` if no source
     * has yet to be registered.
     */
    newestSourceName() {
        let newestName = null, newestVersion = Version.fromSemver("0.0.0");
        for (const k in this.sources) {
            if (Object.prototype.hasOwnProperty.call(this.sources, k)) {
                const kVersion = Version.fromSemver(this.sources[k].version);
                if (kVersion.hasPrecedenceOver(newestVersion)) {
                    newestName = k;
                    newestVersion = kVersion;
                }
            }
        }
        return newestName;
    }
    /**
     * Negotiate and start Ruffle.
     *
     * This function reads the config parameter to determine which polyfills
     * should be enabled. If the configuration parameter is missing, then we
     * use a built-in set of defaults sufficient to fool sites with static
     * content and weak plugin detection.
     */
    init() {
        if (!this.invoked) {
            this.invoked = true;
            this.newestName = this.newestSourceName();
            if (this.newestName === null) {
                throw new Error("No registered Ruffle source!");
            }
            const polyfills = "polyfills" in this.config ? this.config.polyfills : true;
            if (polyfills !== false) {
                this.sources[this.newestName].polyfill();
            }
        }
    }
    /**
     * Look up the newest Ruffle source and return it's API.
     *
     * @returns An instance of the Source API.
     */
    newest() {
        const name = this.newestSourceName();
        return name !== null ? this.sources[name] : null;
    }
    /**
     * Look up a specific Ruffle version (or any version satisfying a given set
     * of requirements) and return it's API.
     *
     * @param requirementString A set of semantic version requirement
     * strings that the player version must satisfy.
     * @returns An instance of the Source API, if one or more
     * sources satisfied the requirement.
     */
    satisfying(requirementString) {
        const requirement = VersionRange.fromRequirementString(requirementString);
        let valid = null;
        for (const k in this.sources) {
            if (Object.prototype.hasOwnProperty.call(this.sources, k)) {
                const version = Version.fromSemver(this.sources[k].version);
                if (requirement.satisfiedBy(version)) {
                    valid = this.sources[k];
                }
            }
        }
        return valid;
    }
    /**
     * Look up the newest Ruffle version compatible with the `local` source, if
     * it's installed. Otherwise, use the latest version.
     *
     * @returns An instance of the Source API
     */
    localCompatible() {
        if (this.sources["local"] !== undefined) {
            return this.satisfying("^" + this.sources["local"].version);
        }
        else {
            return this.newest();
        }
    }
    /**
     * Look up the newest Ruffle version with the exact same version as the
     * `local` source, if it's installed. Otherwise, use the latest version.
     *
     * @returns An instance of the Source API
     */
    local() {
        if (this.sources["local"] !== undefined) {
            return this.satisfying("=" + this.sources["local"].version);
        }
        else {
            return this.newest();
        }
    }
    /**
     * Indicates that this version of the public API has been superseded by a
     * newer version.
     *
     * This should only be called by a newer version of the Public API.
     * Identical versions of the Public API should not supersede older versions
     * of that same API.
     *
     * Unfortunately, we can't disable polyfills after-the-fact, so this
     * only lets you disable the init event...
     */
    superseded() {
        this.invoked = true;
    }
}

;// ../core/dist/build-info.js
/**
 * Stores build information about <b>this specific version of the `ruffle-core` library</b>.
 *
 * It does not represent the version of Ruffle that may be in use by the page (for example, if a browser extension overrides it).
 *
 * @privateRemarks
 * This is generated at build time via `set_version.ts`.
 */
const buildInfo = {
    versionNumber: "0.2.0-nightly.2026.4.6",
    versionName: "0.2.0-nightly.2026.4.6",
    versionChannel: "nightly",
    buildDate: "2026-04-06T00:13:29.307Z",
    commitHash: "dbfcb9ab0e815189eef155bdfa1fc9c36c2bbdfd",
};

;// ../core/dist/public/player/index.js
/**
 * The Player module contains the actual {@link PlayerElement} and the various interfaces that exist to interact with the player.
 *
 * @module
 */





/**
 * Describes the loading state of an SWF movie.
 */
var ReadyState;
(function (ReadyState) {
    /**
     * No movie is loaded, or no information is yet available about the movie.
     */
    ReadyState[ReadyState["HaveNothing"] = 0] = "HaveNothing";
    /**
     * The movie is still loading, but it has started playback, and metadata is available.
     */
    ReadyState[ReadyState["Loading"] = 1] = "Loading";
    /**
     * The movie has completely loaded.
     */
    ReadyState[ReadyState["Loaded"] = 2] = "Loaded";
})(ReadyState || (ReadyState = {}));

// EXTERNAL MODULE: ../../node_modules/tsx-dom/dist/jsx-runtime.js
var jsx_runtime = __webpack_require__(553);
;// ../core/dist/internal/ui/static-styles.js

// This is automatically populated by `tools/bundle_css.ts` via a postbuild script
const CSS = ":host{all:initial;pointer-events:inherit;--ruffle-blue:#37528c;--ruffle-orange:#ffad33;display:inline-block;font-family:Arial,sans-serif;height:400px;letter-spacing:.4px;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:550px;-webkit-tap-highlight-color:transparent}:host(:-webkit-full-screen){display:block;height:100%!important;width:100%!important}.hidden{display:none!important}#container,#message-overlay,#panic,#play-button,#splash-screen,#unmute-overlay,#unmute-overlay .background{inset:0;position:absolute}#container{outline:none;overflow:hidden}#container canvas{height:100%;width:100%}#play-button,#unmute-overlay{cursor:pointer;display:none}#unmute-overlay .background{background:#000;opacity:.7}#play-button .icon,#unmute-overlay .icon{height:50%;left:50%;max-height:384px;max-width:384px;opacity:.8;position:absolute;top:50%;transform:translate(-50%,-50%);width:50%}#play-button:hover .icon,#unmute-overlay:hover .icon{opacity:1}#unmute-overlay-svg{scale:.8}#panic{background:linear-gradient(180deg,#fd3a40,#fda138);color:#fff;display:flex;flex-flow:column;font-size:20px;justify-content:space-around;overflow:auto;text-align:center}#panic a{color:var(--ruffle-blue);font-weight:700}#panic-title{font-size:xxx-large;font-weight:700}#panic-body.details{flex:0.9;margin:0 10px}#panic-body textarea{height:100%;resize:none;width:100%}#panic ul{display:flex;justify-content:space-evenly;list-style-type:none;padding:0}#message-overlay{align-items:center;background:var(--ruffle-blue);color:var(--ruffle-orange);display:flex;justify-content:center;opacity:1;overflow:auto;position:absolute;z-index:2}#message-overlay .message{font-size:20px;max-height:100%;max-width:100%;padding:5%;text-align:center}#message-overlay p{margin:.5em 0}#message-overlay .message div{-moz-column-gap:1em;column-gap:1em;display:flex;flex-wrap:wrap;justify-content:center}#message-overlay a,#message-overlay button{background:var(--ruffle-blue);border:2px solid var(--ruffle-orange);border-radius:.6em;color:var(--ruffle-orange);cursor:pointer;font-size:1.25em;font-weight:700;margin:2% 0;padding:10px;text-decoration:none}#message-overlay a:hover,#message-overlay button:hover{background:#ffffff4c}#continue-btn{background:var(--ruffle-blue);border:2px solid var(--ruffle-orange);border-radius:20px;color:var(--ruffle-orange);cursor:pointer;font-size:20px;font-weight:700;padding:10px}#continue-btn:hover{background:#ffffff4c}#context-menu-overlay,.modal{height:100%;position:absolute;width:100%;z-index:1}#context-menu{background-color:var(--modal-background);border:1px solid gray;box-shadow:0 5px 10px -5px #000;color:rgb(var(--modal-foreground-rgb));font-size:14px;list-style:none;margin:0;padding:3px 0;position:absolute;text-align:start;white-space:nowrap}#context-menu .menu-item{color:rgb(var(--modal-foreground-rgb));padding:5px 10px}#context-menu .menu-item.disabled{color:rgb(var(--modal-foreground-rgb),.5);cursor:default}#context-menu .menu-item:not(.disabled):hover{background-color:rgb(var(--modal-foreground-rgb),.15)}#context-menu .menu-separator hr{border:none;border-bottom:1px solid rgb(var(--modal-foreground-rgb),.2);margin:3px}#splash-screen{align-items:center;background:var(\n        --splash-screen-background,var(--preloader-background,var(--ruffle-blue))\n    );display:flex;flex-direction:column;justify-content:center}.loadbar{background:#253559;height:20%;max-height:10px;max-width:316px;width:100%}.loadbar-inner{background:var(--ruffle-orange);height:100%;max-width:100%;width:0}.logo{display:var(--logo-display,block);max-height:150px;max-width:380px}.loading-animation{aspect-ratio:1;margin-bottom:2%;max-height:28px;max-width:28px;width:10%}.spinner{stroke-dasharray:180;stroke-dashoffset:135;stroke:var(--ruffle-orange);animation:a 1.5s linear infinite;transform-origin:50% 50%}@keyframes a{to{transform:rotate(1turn)}}#virtual-keyboard{height:1px;opacity:0;position:absolute;top:-100px;width:1px}.modal{background-color:#0008}.modal-area{background-color:var(--modal-background);border-radius:12px;box-shadow:0 2px 6px 0 #0008;color:rgb(var(--modal-foreground-rgb));left:50%;padding:8px 12px;position:relative;transform:translateX(-50%);width:-moz-fit-content;width:fit-content}#modal-area{height:300px;width:450px}.close-modal{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 -960 960 960'%3E%3Cpath d='M480-392 300-212q-18 18-44 18t-44-18-18-44 18-44l180-180-180-180q-18-18-18-44t18-44 44-18 44 18l180 180 180-180q18-18 44-18t44 18 18 44-18 44L568-480l180 180q18 18 18 44t-18 44-44 18-44-18z'/%3E%3C/svg%3E\");cursor:pointer;filter:var(--modal-foreground-filter);height:16px;width:16px}.modal-button{background-color:rgb(var(--modal-foreground-rgb),.2);border-radius:6px;color:rgb(var(--modal-foreground-rgb));cursor:pointer;display:inline-block;padding:4px 8px;text-decoration:none}:not(#volume-controls)>.close-modal{position:absolute;right:16px;top:14px}.general-save-options{border-bottom:2px solid rgb(var(--modal-foreground-rgb),.3);padding-bottom:8px;text-align:center}#local-saves{border-collapse:collapse;color:inherit;display:block;height:calc(100% - 45px);min-height:30px;overflow-y:auto}#local-saves td{border-bottom:2px solid rgb(var(--modal-foreground-rgb),.15);height:30px}#local-saves td:first-child{width:100%;word-break:break-all}.save-option{cursor:pointer;display:inline-block;filter:var(--modal-foreground-filter);height:24px;opacity:.4;vertical-align:middle;width:24px}#local-saves>tr:hover .save-option{opacity:1}#download-save{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 -960 960 960'%3E%3Cpath d='M480-337q-8 0-15-2.5t-13-8.5L308-492q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T365-549l75 75v-286q0-17 11.5-28.5T480-800t28.5 11.5T520-760v286l75-75q12-12 28.5-11.5T652-548q11 12 11.5 28T652-492L508-348q-6 6-13 8.5t-15 2.5M240-160q-33 0-56.5-23.5T160-240v-80q0-17 11.5-28.5T200-360t28.5 11.5T240-320v80h480v-80q0-17 11.5-28.5T760-360t28.5 11.5T800-320v80q0 33-23.5 56.5T720-160z'/%3E%3C/svg%3E\")}#replace-save{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 -1080 960 1200'%3E%3Cpath d='M440-367v127q0 17 11.5 28.5T480-200t28.5-11.5T520-240v-127l36 36q6 6 13.5 9t15 2.5T599-323t13-9q11-12 11.5-28T612-388L508-492q-6-6-13-8.5t-15-2.5-15 2.5-13 8.5L348-388q-12 12-11.5 28t12.5 28q12 11 28 11.5t28-11.5zM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h287q16 0 30.5 6t25.5 17l194 194q11 11 17 25.5t6 30.5v447q0 33-23.5 56.5T720-80zm280-560q0 17 11.5 28.5T560-600h160L520-800z'/%3E%3C/svg%3E\")}#delete-save{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 -1020 960 1080'%3E%3Cpath d='M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760t11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760t-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120zm120-160q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640t-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280m160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640t-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280'/%3E%3C/svg%3E\")}.replace-save{display:none}#video-modal .modal-area{box-sizing:border-box;height:95%;width:95%}#video-holder{box-sizing:border-box;height:100%;padding:36px 4px 6px}#video-holder video{background-color:#000;height:100%;width:100%}#volume-controls{align-items:center;display:flex;gap:6px}#mute-checkbox{display:none}label[for=mute-checkbox]{cursor:pointer;filter:var(--modal-foreground-filter);height:24px;line-height:0;width:24px}#volume-mute{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 -960 960 960'%3E%3Cpath d='m719.13-419.35-71.67 71.68Q634.78-335 617.13-335t-30.33-12.67q-12.67-12.68-12.67-30.33t12.67-30.33L658.48-480l-71.68-71.67q-12.67-12.68-12.67-30.33t12.67-30.33Q599.48-625 617.13-625t30.33 12.67l71.67 71.68 71.67-71.68Q803.48-625 821.13-625t30.33 12.67q12.67 12.68 12.67 30.33t-12.67 30.33L779.78-480l71.68 71.67q12.67 12.68 12.67 30.33t-12.67 30.33Q838.78-335 821.13-335t-30.33-12.67zM278-357.87H161.22q-17.66 0-30.33-12.67-12.67-12.68-12.67-30.33v-158.26q0-17.65 12.67-30.33 12.67-12.67 30.33-12.67H278l130.15-129.91q20.63-20.63 46.98-9.45 26.35 11.19 26.35 39.77v443.44q0 28.58-26.35 39.77-26.35 11.18-46.98-9.45z'/%3E%3C/svg%3E\")}#volume-min{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='161 -960 960 960'%3E%3Cpath d='M438.65-357.87H321.87q-17.65 0-30.33-12.67-12.67-12.68-12.67-30.33v-158.26q0-17.65 12.67-30.33 12.68-12.67 30.33-12.67h116.78L568.8-732.04q20.63-20.63 46.98-9.45 26.35 11.19 26.35 39.77v443.44q0 28.58-26.35 39.77-26.35 11.18-46.98-9.45z'/%3E%3C/svg%3E\")}#volume-mid{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='80 -960 960 960'%3E%3Cpath d='M357.98-357.87H241.2q-17.66 0-30.33-12.67-12.67-12.68-12.67-30.33v-158.26q0-17.65 12.67-30.33 12.67-12.67 30.33-12.67h116.78L487.65-731.8q20.63-20.64 47.1-9.57t26.47 39.65v443.44q0 28.58-26.47 39.65t-47.1-9.57zM741.8-480q0 42.48-20.47 80.09-20.48 37.61-54.94 60.82-10.22 5.98-20.19.25-9.98-5.73-9.98-17.44v-248.44q0-11.71 9.98-17.32 9.97-5.61 20.19.37 34.46 23.71 54.94 61.45Q741.8-522.48 741.8-480'/%3E%3C/svg%3E\")}#volume-max{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='9 -960 960 960'%3E%3Cpath d='M754.22-480.5q0-78.52-41.88-143.9t-111.91-98.62q-14.47-6.74-20.47-20.96t-.53-28.93q5.74-15.72 20.34-22.46t29.58 0q92.48 42.46 147.97 127.05 55.48 84.6 55.48 187.82t-55.48 187.82q-55.49 84.59-147.97 127.05-14.98 6.74-29.58 0t-20.34-22.46q-5.47-14.71.53-28.93t20.47-20.96q70.03-33.24 111.91-98.62t41.88-143.9M286.98-357.87H170.2q-17.66 0-30.33-12.67-12.67-12.68-12.67-30.33v-158.26q0-17.65 12.67-30.33 12.67-12.67 30.33-12.67h116.78L416.65-731.8q20.63-20.64 47.1-9.57t26.47 39.65v443.44q0 28.58-26.47 39.65t-47.1-9.57zM670.8-480q0 42.48-20.47 80.09-20.48 37.61-54.94 60.82-10.22 5.98-20.19.25-9.98-5.73-9.98-17.44v-248.44q0-11.71 9.98-17.32 9.97-5.61 20.19.37 34.46 23.71 54.94 61.45Q670.8-522.48 670.8-480'/%3E%3C/svg%3E\")}#volume-slider-text{text-align:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:4.8ch}#hardware-acceleration-modal .modal-area{box-sizing:border-box;padding:16px 48px;text-align:center;width:95%}#acceleration-text{display:block;margin-bottom:8px}#clipboard-modal h2{margin-right:36px;margin-top:4px}#clipboard-modal p:last-child{margin-bottom:2px}@media (prefers-color-scheme:light){:host{--modal-background:#fafafa;--modal-foreground-rgb:0,0,0;--modal-foreground-filter:none}}@media (prefers-color-scheme:dark){:host{--modal-background:#282828;--modal-foreground-rgb:221,221,221;--modal-foreground-filter:invert(90%)}}";
/**
 * @returns The HTMLElement containing the static styles for the Ruffle elements
 */
function StaticStyles() {
    return (0,jsx_runtime.jsx)("style", { children: CSS });
}

;// ../core/dist/internal/ui/dynamic-styles.js

/**
 * @returns The HTMLElement containing the CSS styles that change dynamically
 */
function DynamicStyles() {
    return (0,jsx_runtime.jsx)("style", { id: "dynamic-styles" });
}

;// ../core/dist/internal/ui/container.js

/**
 * @returns The HTMLElement representing the outer container
 */
function MainContainer() {
    return ((0,jsx_runtime.jsxs)("div", { id: "container", children: [(0,jsx_runtime.jsx)("div", { id: "play-button", children: (0,jsx_runtime.jsx)("div", { class: "icon", children: (0,jsx_runtime.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", preserveAspectRatio: "xMidYMid", viewBox: "0 0 250 250", width: "100%", height: "100%", children: [(0,jsx_runtime.jsxs)("defs", { xmlns: "http://www.w3.org/2000/svg", children: [(0,jsx_runtime.jsxs)("linearGradient", { xmlns: "http://www.w3.org/2000/svg", id: "a", gradientUnits: "userSpaceOnUse", x1: "125", y1: "0", x2: "125", y2: "250", spreadMethod: "pad", children: [(0,jsx_runtime.jsx)("stop", { xmlns: "http://www.w3.org/2000/svg", offset: "0%", "stop-color": "#FDA138" }), (0,jsx_runtime.jsx)("stop", { xmlns: "http://www.w3.org/2000/svg", offset: "100%", "stop-color": "#FD3A40" })] }), (0,jsx_runtime.jsxs)("g", { xmlns: "http://www.w3.org/2000/svg", id: "b", children: [(0,jsx_runtime.jsx)("path", { xmlns: "http://www.w3.org/2000/svg", fill: "url(#a)", d: "M250 125q0-52-37-88-36-37-88-37T37 37Q0 73 0 125t37 88q36 37 88 37t88-37q37-36 37-88M87 195V55l100 70-100 70z" }), (0,jsx_runtime.jsx)("path", { xmlns: "http://www.w3.org/2000/svg", fill: "#FFF", d: "M87 55v140l100-70L87 55z" })] })] }), (0,jsx_runtime.jsx)("use", { xmlns: "http://www.w3.org/2000/svg", href: "#b" })] }) }) }), (0,jsx_runtime.jsxs)("div", { id: "unmute-overlay", children: [(0,jsx_runtime.jsx)("div", { class: "background" }), (0,jsx_runtime.jsx)("div", { class: "icon", children: (0,jsx_runtime.jsxs)("svg", { id: "unmute-overlay-svg", xmlns: "http://www.w3.org/2000/svg", preserveAspectRatio: "xMidYMid", viewBox: "0 0 512 584", width: "100%", height: "100%", children: [(0,jsx_runtime.jsx)("path", { xmlns: "http://www.w3.org/2000/svg", fill: "#FFF", stroke: "#FFF", d: "m457.941 256 47.029-47.029c9.372-9.373 9.372-24.568 0-33.941-9.373-9.373-24.568-9.373-33.941 0l-47.029 47.029-47.029-47.029c-9.373-9.373-24.568-9.373-33.941 0-9.372 9.373-9.372 24.568 0 33.941l47.029 47.029-47.029 47.029c-9.372 9.373-9.372 24.568 0 33.941 4.686 4.687 10.827 7.03 16.97 7.03s12.284-2.343 16.971-7.029l47.029-47.03 47.029 47.029c4.687 4.687 10.828 7.03 16.971 7.03s12.284-2.343 16.971-7.029c9.372-9.373 9.372-24.568 0-33.941z" }), (0,jsx_runtime.jsx)("path", { xmlns: "http://www.w3.org/2000/svg", fill: "#FFF", stroke: "#FFF", d: "m99 160h-55c-24.301 0-44 19.699-44 44v104c0 24.301 19.699 44 44 44h55c2.761 0 5-2.239 5-5v-182c0-2.761-2.239-5-5-5z" }), (0,jsx_runtime.jsx)("path", { xmlns: "http://www.w3.org/2000/svg", fill: "#FFF", stroke: "#FFF", d: "m280 56h-24c-5.269 0-10.392 1.734-14.578 4.935l-103.459 79.116c-1.237.946-1.963 2.414-1.963 3.972v223.955c0 1.557.726 3.026 1.963 3.972l103.459 79.115c4.186 3.201 9.309 4.936 14.579 4.936h23.999c13.255 0 24-10.745 24-24v-352.001c0-13.255-10.745-24-24-24z" }), (0,jsx_runtime.jsx)("text", { xmlns: "http://www.w3.org/2000/svg", id: "unmute-text", x: "256", y: "560", "text-anchor": "middle", "font-size": "60px", fill: "#FFF", stroke: "#FFF", children: "Click to unmute" })] }) })] }), (0,jsx_runtime.jsx)("input", { "aria-hidden": "true", id: "virtual-keyboard", type: "text", autocomplete: "off", autocorrect: "off", autocapitalize: "none" })] }));
}

;// ../core/dist/internal/ui/splash-screen.js

/**
 * @returns The HTMLElement containing the splash screen
 */
function SplashScreen() {
    return ((0,jsx_runtime.jsxs)("div", { id: "splash-screen", class: "hidden", children: [(0,jsx_runtime.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", class: "logo", preserveAspectRatio: "xMidYMid", viewBox: "0 0 380 150", children: (0,jsx_runtime.jsxs)("g", { xmlns: "http://www.w3.org/2000/svg", children: [(0,jsx_runtime.jsx)("path", { xmlns: "http://www.w3.org/2000/svg", fill: "#966214", d: "M58.75 85.6q.75-.1 1.5-.35.85-.25 1.65-.75.55-.35 1.05-.8.5-.45.95-1 .5-.5.75-1.2-.05.05-.15.1-.1.15-.25.25l-.1.2q-.15.05-.25.1-.4 0-.8.05-.5-.25-.9-.5-.3-.1-.55-.3l-.6-.6-4.25-6.45-1.5 11.25h3.45m83.15-.2h3.45q.75-.1 1.5-.35.25-.05.45-.15.35-.15.65-.3l.5-.3q.25-.15.5-.35.45-.35.9-.75.45-.35.75-.85l.1-.1q.1-.2.2-.35.2-.3.35-.6l-.3.4-.15.15q-.5.15-1.1.1-.25 0-.4-.05-.5-.15-.8-.4-.15-.1-.25-.25-.3-.3-.55-.6l-.05-.05v-.05l-4.25-6.4-1.5 11.25m-21.15-3.95q-.3-.3-.55-.6l-.05-.05v-.05l-4.25-6.4-1.5 11.25h3.45q.75-.1 1.5-.35.85-.25 1.6-.75.75-.5 1.4-1.1.45-.35.75-.85.35-.5.65-1.05l-.45.55q-.5.15-1.1.1-.9 0-1.45-.7m59.15.3q-.75-.5-1.4-1-3.15-2.55-3.5-6.4l-1.5 11.25h21q-3.1-.25-5.7-.75-5.6-1.05-8.9-3.1m94.2 3.85h3.45q.6-.1 1.2-.3.4-.1.75-.2.35-.15.65-.3.7-.35 1.35-.8.75-.55 1.3-1.25.1-.15.25-.3-2.55-.25-3.25-1.8l-4.2-6.3-1.5 11.25m-45.3-4.85q-.5-.4-.9-.8-2.3-2.35-2.6-5.6l-1.5 11.25h21q-11.25-.95-16-4.85m97.7 4.85q-.3-.05-.6-.05-10.8-1-15.4-4.8-3.15-2.55-3.5-6.35l-1.5 11.2h21Z" }), (0,jsx_runtime.jsx)("path", { xmlns: "http://www.w3.org/2000/svg", fill: "var(--ruffle-orange)", d: "M92.6 54.8q-1.95-1.4-4.5-1.4H60.35q-1.35 0-2.6.45-1.65.55-3.15 1.8-2.75 2.25-3.25 5.25l-1.65 12h.05v.3l5.85 1.15h-9.5q-.5.05-1 .15-.5.15-1 .35-.5.2-.95.45-.5.3-.95.7-.45.35-.85.8-.35.4-.65.85-.3.45-.5.9-.15.45-.3.95l-5.85 41.6H50.3l5-35.5 1.5-11.25 4.25 6.45.6.6q.25.2.55.3.4.25.9.5.4-.05.8-.05.1-.05.25-.1l.1-.2q.15-.1.25-.25.1-.05.15-.1l.3-1.05 1.75-12.3h11.15L75.8 82.6h16.5l2.3-16.25h-.05l.8-5.7q.4-2.45-1-4.2-.35-.4-.75-.8-.25-.25-.55-.5-.2-.2-.45-.35m16.2 18.1h.05l-.05.3 5.85 1.15H105.2q-.5.05-1 .15-.5.15-1 .35-.5.2-.95.45-.5.3-1 .65-.4.4-.8.85-.25.3-.55.65-.05.1-.15.2-.25.45-.4.9-.2.45-.3.95-.1.65-.2 1.25-.2 1.15-.4 2.25l-4.3 30.6q-.25 3 1.75 5.25 1.6 1.8 4 2.15.6.1 1.25.1h27.35q3.25 0 6-2.25.35-.35.7-.55l.3-.2q2-2 2.25-4.5l1.65-11.6q.05-.05.1-.05l1.65-11.35h.05l.7-5.2 1.5-11.25 4.25 6.4v.05l.05.05q.25.3.55.6.1.15.25.25.3.25.8.4.15.05.4.05.6.05 1.1-.1l.15-.15.3-.4.3-1.05 1.3-9.05h-.05l.7-5.05h-.05l.15-1.25h-.05l1.65-11.7h-16.25l-2.65 19.5h.05v.2l-.05.1h.05l5.8 1.15H132.7q-.5.05-1 .15-.5.15-1 .35-.15.05-.3.15-.3.1-.55.25-.05 0-.1.05-.5.3-1 .65-.4.35-.7.7-.55.7-.95 1.45-.35.65-.55 1.4-.15.7-.25 1.4v.05q-.15 1.05-.35 2.05l-1.2 8.75v.1l-2.1 14.7H111.4l2.25-15.55h.05l.7-5.2 1.5-11.25 4.25 6.4v.05l.05.05q.25.3.55.6.55.7 1.45.7.6.05 1.1-.1l.45-.55.3-1.05 1.3-9.05h-.05l.7-5.05h-.05l.15-1.25h-.05l1.65-11.7h-16.25l-2.65 19.5m106.5-41.75q-2.25-2.25-5.5-2.25h-27.75q-3 0-5.75 2.25-1.3.95-2.05 2.1-.45.6-.7 1.2-.2.5-.35 1-.1.45-.15.95l-4.15 29.95h-.05l-.7 5.2h-.05l-.2 1.35h.05l-.05.3 5.85 1.15h-9.45q-2.1.05-3.95 1.6-1.9 1.55-2.25 3.55l-.5 3.5h-.05l-5.3 38.1h16.25l5-35.5 1.5-11.25q.35 3.85 3.5 6.4.65.5 1.4 1 3.3 2.05 8.9 3.1 2.6.5 5.7.75l1.75-11.25h-12.2l.4-2.95h-.05l.7-5.05h-.05q.1-.9.3-1.9.1-.75.2-1.6.85-5.9 2.15-14.9 0-.15.05-.25l.1-.9q.2-1.55.45-3.15h11.25l-3.1 20.8h16.5l4.1-28.05q.15-1.7-.4-3.15-.5-1.1-1.35-2.1m46.65 44.15q-.5.3-1 .65-.4.4-.8.85-.35.4-.7.85-.25.45-.45.9-.15.45-.3.95l-5.85 41.6h16.25l5-35.5 1.5-11.25 4.2 6.3q.7 1.55 3.25 1.8l.05-.1q.25-.4.35-.85l.3-1.05 1.8-14.05v-.05l5.35-37.45h-16.25l-6.15 44.3 5.85 1.15h-9.45q-.5.05-1 .15-.5.15-1 .35-.5.2-.95.45m5.4-38.9q.15-1.7-.4-3.15-.5-1.1-1.35-2.1-2.25-2.25-5.5-2.25h-27.75q-2.3 0-4.45 1.35-.65.35-1.3.9-1.3.95-2.05 2.1-.45.6-.7 1.2-.4.9-.5 1.95l-4.15 29.95h-.05l-.7 5.2h-.05l-.2 1.35h.05l-.05.3 5.85 1.15h-9.45q-2.1.05-3.95 1.6-1.9 1.55-2.25 3.55l-.5 3.5h-.05l-1.2 8.75v.1l-4.1 29.25h16.25l5-35.5 1.5-11.25q.3 3.25 2.6 5.6.4.4.9.8 4.75 3.9 16 4.85l1.75-11.25h-12.2l.4-2.95h-.05l.7-5.05h-.05q.15-.9.3-1.9.1-.75.25-1.6.15-1.25.35-2.65v-.05q.95-6.7 2.35-16.5h11.25l-3.1 20.8h16.5l4.1-28.05M345 66.35h-.05l1.15-8.2q.5-3-1.75-5.25-1.25-1.25-3-1.75-1-.5-2.25-.5h-27.95q-.65 0-1.3.1-2.5.35-4.7 2.15-2.75 2.25-3.25 5.25l-1.95 14.7v.05l-.05.3 5.85 1.15h-9.45q-1.9.05-3.6 1.35-.2.1-.35.25-1.9 1.55-2.25 3.55l-4.85 34.1q-.25 3 1.75 5.25 1.25 1.4 3 1.95 1.05.3 2.25.3H320q3.25 0 6-2.25 2.75-2 3.25-5l2.75-18.5h-16.5l-1.75 11H302.5l2.1-14.75h.05l.85-6 1.5-11.2q.35 3.8 3.5 6.35 4.6 3.8 15.4 4.8.3 0 .6.05h15.75L345 66.35m-16.4-.95-1.25 8.95h-11.3l.4-2.95h-.05l.7-5.05h-.1l.15-.95h11.45Z" })] }) }), (0,jsx_runtime.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", class: "loading-animation", viewBox: "0 0 66 66", children: (0,jsx_runtime.jsx)("circle", { xmlns: "http://www.w3.org/2000/svg", class: "spinner", fill: "none", "stroke-width": "6", "stroke-linecap": "round", cx: "33", cy: "33", r: "30" }) }), (0,jsx_runtime.jsx)("div", { class: "loadbar", children: (0,jsx_runtime.jsx)("div", { class: "loadbar-inner" }) })] }));
}

;// ../core/dist/internal/ui/save-manager.js

/**
 * @returns The HTMLElement containing the list of save files
 */
function SaveManager() {
    return ((0,jsx_runtime.jsx)("div", { id: "save-manager", class: "modal hidden", children: (0,jsx_runtime.jsxs)("div", { id: "modal-area", class: "modal-area", children: [(0,jsx_runtime.jsx)("span", { class: "close-modal" }), (0,jsx_runtime.jsx)("div", { class: "general-save-options", children: (0,jsx_runtime.jsx)("span", { class: "modal-button" }) }), (0,jsx_runtime.jsx)("table", { id: "local-saves" })] }) }));
}

;// ../../node_modules/@fluent/bundle/esm/types.js
/**
 * The `FluentType` class is the base of Fluent's type system.
 *
 * Fluent types wrap JavaScript values and store additional configuration for
 * them, which can then be used in the `toString` method together with a proper
 * `Intl` formatter.
 */
class FluentType {
    /**
     * Create a `FluentType` instance.
     *
     * @param value The JavaScript value to wrap.
     */
    constructor(value) {
        this.value = value;
    }
    /**
     * Unwrap the raw value stored by this `FluentType`.
     */
    valueOf() {
        return this.value;
    }
}
/**
 * A {@link FluentType} representing no correct value.
 */
class FluentNone extends FluentType {
    /**
     * Create an instance of `FluentNone` with an optional fallback value.
     * @param value The fallback value of this `FluentNone`.
     */
    constructor(value = "???") {
        super(value);
    }
    /**
     * Format this `FluentNone` to the fallback string.
     */
    toString(scope) {
        return `{${this.value}}`;
    }
}
/**
 * A {@link FluentType} representing a number.
 *
 * A `FluentNumber` instance stores the number value of the number it
 * represents. It may also store an option bag of options which will be passed
 * to `Intl.NumerFormat` when the `FluentNumber` is formatted to a string.
 */
class FluentNumber extends FluentType {
    /**
     * Create an instance of `FluentNumber` with options to the
     * `Intl.NumberFormat` constructor.
     *
     * @param value The number value of this `FluentNumber`.
     * @param opts Options which will be passed to `Intl.NumberFormat`.
     */
    constructor(value, opts = {}) {
        super(value);
        this.opts = opts;
    }
    /**
     * Format this `FluentNumber` to a string.
     */
    toString(scope) {
        if (scope) {
            try {
                const nf = scope.memoizeIntlObject(Intl.NumberFormat, this.opts);
                return nf.format(this.value);
            }
            catch (err) {
                scope.reportError(err);
            }
        }
        return this.value.toString(10);
    }
}
/**
 * A {@link FluentType} representing a date and time.
 *
 * A `FluentDateTime` instance stores a Date object, Temporal object, or a number
 * as a numerical timestamp in milliseconds. It may also store an
 * option bag of options which will be passed to `Intl.DateTimeFormat` when the
 * `FluentDateTime` is formatted to a string.
 */
class FluentDateTime extends FluentType {
    static supportsValue(value) {
        if (typeof value === "number")
            return true;
        if (value instanceof Date)
            return true;
        if (value instanceof FluentType)
            return FluentDateTime.supportsValue(value.valueOf());
        // Temporary workaround to support environments without Temporal
        if ("Temporal" in globalThis) {
            // for TypeScript, which doesn't know about Temporal yet
            const _Temporal = globalThis.Temporal;
            if (value instanceof _Temporal.Instant ||
                value instanceof _Temporal.PlainDateTime ||
                value instanceof _Temporal.PlainDate ||
                value instanceof _Temporal.PlainMonthDay ||
                value instanceof _Temporal.PlainTime ||
                value instanceof _Temporal.PlainYearMonth) {
                return true;
            }
        }
        return false;
    }
    /**
     * Create an instance of `FluentDateTime` with options to the
     * `Intl.DateTimeFormat` constructor.
     *
     * @param value The number value of this `FluentDateTime`, in milliseconds.
     * @param opts Options which will be passed to `Intl.DateTimeFormat`.
     */
    constructor(value, opts = {}) {
        // unwrap any FluentType value, but only retain the opts from FluentDateTime
        if (value instanceof FluentDateTime) {
            opts = { ...value.opts, ...opts };
            value = value.value;
        }
        else if (value instanceof FluentType) {
            value = value.valueOf();
        }
        // Intl.DateTimeFormat defaults to gregorian calendar, but Temporal defaults to iso8601
        if (typeof value === "object" &&
            "calendarId" in value &&
            opts.calendar === undefined) {
            opts = { ...opts, calendar: value.calendarId };
        }
        super(value);
        this.opts = opts;
    }
    [Symbol.toPrimitive](hint) {
        return hint === "string" ? this.toString() : this.toNumber();
    }
    /**
     * Convert this `FluentDateTime` to a number.
     * Note that this isn't always possible due to the nature of Temporal objects.
     * In such cases, a TypeError will be thrown.
     */
    toNumber() {
        const value = this.value;
        if (typeof value === "number")
            return value;
        if (value instanceof Date)
            return value.getTime();
        if ("epochMilliseconds" in value) {
            return value.epochMilliseconds;
        }
        if ("toZonedDateTime" in value) {
            return value.toZonedDateTime("UTC").epochMilliseconds;
        }
        throw new TypeError("Unwrapping a non-number value as a number");
    }
    /**
     * Format this `FluentDateTime` to a string.
     */
    toString(scope) {
        if (scope) {
            try {
                const dtf = scope.memoizeIntlObject(Intl.DateTimeFormat, this.opts);
                return dtf.format(this.value);
            }
            catch (err) {
                scope.reportError(err);
            }
        }
        if (typeof this.value === "number" || this.value instanceof Date) {
            return new Date(this.value).toISOString();
        }
        return this.value.toString();
    }
}

;// ../../node_modules/@fluent/bundle/esm/resolver.js
/**
 * The role of the Fluent resolver is to format a `Pattern` to an instance of
 * `FluentValue`. For performance reasons, primitive strings are considered
 * such instances, too.
 *
 * Translations can contain references to other messages or variables,
 * conditional logic in form of select expressions, traits which describe their
 * grammatical features, and can use Fluent builtins which make use of the
 * `Intl` formatters to format numbers and dates into the bundle's languages.
 * See the documentation of the Fluent syntax for more information.
 *
 * In case of errors the resolver will try to salvage as much of the
 * translation as possible. In rare situations where the resolver didn't know
 * how to recover from an error it will return an instance of `FluentNone`.
 *
 * All expressions resolve to an instance of `FluentValue`. The caller should
 * use the `toString` method to convert the instance to a native value.
 *
 * Functions in this file pass around an instance of the `Scope` class, which
 * stores the data required for successful resolution and error recovery.
 */

/**
 * The maximum number of placeables which can be expanded in a single call to
 * `formatPattern`. The limit protects against the Billion Laughs and Quadratic
 * Blowup attacks. See https://msdn.microsoft.com/en-us/magazine/ee335713.aspx.
 */
const MAX_PLACEABLES = 100;
/** Unicode bidi isolation characters. */
const FSI = "\u2068";
const PDI = "\u2069";
/** Helper: match a variant key to the given selector. */
function match(scope, selector, key) {
    if (key === selector) {
        // Both are strings.
        return true;
    }
    // XXX Consider comparing options too, e.g. minimumFractionDigits.
    if (key instanceof FluentNumber &&
        selector instanceof FluentNumber &&
        key.value === selector.value) {
        return true;
    }
    if (selector instanceof FluentNumber && typeof key === "string") {
        let category = scope
            .memoizeIntlObject(Intl.PluralRules, selector.opts)
            .select(selector.value);
        if (key === category) {
            return true;
        }
    }
    return false;
}
/** Helper: resolve the default variant from a list of variants. */
function getDefault(scope, variants, star) {
    if (variants[star]) {
        return resolvePattern(scope, variants[star].value);
    }
    scope.reportError(new RangeError("No default"));
    return new FluentNone();
}
/** Helper: resolve arguments to a call expression. */
function getArguments(scope, args) {
    const positional = [];
    const named = Object.create(null);
    for (const arg of args) {
        if (arg.type === "narg") {
            named[arg.name] = resolveExpression(scope, arg.value);
        }
        else {
            positional.push(resolveExpression(scope, arg));
        }
    }
    return { positional, named };
}
/** Resolve an expression to a Fluent type. */
function resolveExpression(scope, expr) {
    switch (expr.type) {
        case "str":
            return expr.value;
        case "num":
            return new FluentNumber(expr.value, {
                minimumFractionDigits: expr.precision,
            });
        case "var":
            return resolveVariableReference(scope, expr);
        case "mesg":
            return resolveMessageReference(scope, expr);
        case "term":
            return resolveTermReference(scope, expr);
        case "func":
            return resolveFunctionReference(scope, expr);
        case "select":
            return resolveSelectExpression(scope, expr);
        default:
            return new FluentNone();
    }
}
/** Resolve a reference to a variable. */
function resolveVariableReference(scope, { name }) {
    let arg;
    if (scope.params) {
        // We're inside a TermReference. It's OK to reference undefined parameters.
        if (Object.prototype.hasOwnProperty.call(scope.params, name)) {
            arg = scope.params[name];
        }
        else {
            return new FluentNone(`$${name}`);
        }
    }
    else if (scope.args &&
        Object.prototype.hasOwnProperty.call(scope.args, name)) {
        // We're in the top-level Pattern or inside a MessageReference. Missing
        // variables references produce ReferenceErrors.
        arg = scope.args[name];
    }
    else {
        scope.reportError(new ReferenceError(`Unknown variable: $${name}`));
        return new FluentNone(`$${name}`);
    }
    // Return early if the argument already is an instance of FluentType.
    if (arg instanceof FluentType) {
        return arg;
    }
    // Convert the argument to a Fluent type.
    switch (typeof arg) {
        case "string":
            return arg;
        case "number":
            return new FluentNumber(arg);
        case "object":
            if (FluentDateTime.supportsValue(arg)) {
                return new FluentDateTime(arg);
            }
        // eslint-disable-next-line no-fallthrough
        default:
            scope.reportError(new TypeError(`Variable type not supported: $${name}, ${typeof arg}`));
            return new FluentNone(`$${name}`);
    }
}
/** Resolve a reference to another message. */
function resolveMessageReference(scope, { name, attr }) {
    const message = scope.bundle._messages.get(name);
    if (!message) {
        scope.reportError(new ReferenceError(`Unknown message: ${name}`));
        return new FluentNone(name);
    }
    if (attr) {
        const attribute = message.attributes[attr];
        if (attribute) {
            return resolvePattern(scope, attribute);
        }
        scope.reportError(new ReferenceError(`Unknown attribute: ${attr}`));
        return new FluentNone(`${name}.${attr}`);
    }
    if (message.value) {
        return resolvePattern(scope, message.value);
    }
    scope.reportError(new ReferenceError(`No value: ${name}`));
    return new FluentNone(name);
}
/** Resolve a call to a Term with key-value arguments. */
function resolveTermReference(scope, { name, attr, args }) {
    const id = `-${name}`;
    const term = scope.bundle._terms.get(id);
    if (!term) {
        scope.reportError(new ReferenceError(`Unknown term: ${id}`));
        return new FluentNone(id);
    }
    if (attr) {
        const attribute = term.attributes[attr];
        if (attribute) {
            // Every TermReference has its own variables.
            scope.params = getArguments(scope, args).named;
            const resolved = resolvePattern(scope, attribute);
            scope.params = null;
            return resolved;
        }
        scope.reportError(new ReferenceError(`Unknown attribute: ${attr}`));
        return new FluentNone(`${id}.${attr}`);
    }
    scope.params = getArguments(scope, args).named;
    const resolved = resolvePattern(scope, term.value);
    scope.params = null;
    return resolved;
}
/** Resolve a call to a Function with positional and key-value arguments. */
function resolveFunctionReference(scope, { name, args }) {
    // Some functions are built-in. Others may be provided by the runtime via
    // the `FluentBundle` constructor.
    let func = scope.bundle._functions[name];
    if (!func) {
        scope.reportError(new ReferenceError(`Unknown function: ${name}()`));
        return new FluentNone(`${name}()`);
    }
    if (typeof func !== "function") {
        scope.reportError(new TypeError(`Function ${name}() is not callable`));
        return new FluentNone(`${name}()`);
    }
    try {
        let resolved = getArguments(scope, args);
        return func(resolved.positional, resolved.named);
    }
    catch (err) {
        scope.reportError(err);
        return new FluentNone(`${name}()`);
    }
}
/** Resolve a select expression to the member object. */
function resolveSelectExpression(scope, { selector, variants, star }) {
    let sel = resolveExpression(scope, selector);
    if (sel instanceof FluentNone) {
        return getDefault(scope, variants, star);
    }
    // Match the selector against keys of each variant, in order.
    for (const variant of variants) {
        const key = resolveExpression(scope, variant.key);
        if (match(scope, sel, key)) {
            return resolvePattern(scope, variant.value);
        }
    }
    return getDefault(scope, variants, star);
}
/** Resolve a pattern (a complex string with placeables). */
function resolveComplexPattern(scope, ptn) {
    if (scope.dirty.has(ptn)) {
        scope.reportError(new RangeError("Cyclic reference"));
        return new FluentNone();
    }
    // Tag the pattern as dirty for the purpose of the current resolution.
    scope.dirty.add(ptn);
    const result = [];
    // Wrap interpolations with Directional Isolate Formatting characters
    // only when the pattern has more than one element.
    const useIsolating = scope.bundle._useIsolating && ptn.length > 1;
    for (const elem of ptn) {
        if (typeof elem === "string") {
            result.push(scope.bundle._transform(elem));
            continue;
        }
        scope.placeables++;
        if (scope.placeables > MAX_PLACEABLES) {
            scope.dirty.delete(ptn);
            // This is a fatal error which causes the resolver to instantly bail out
            // on this pattern. The length check protects against excessive memory
            // usage, and throwing protects against eating up the CPU when long
            // placeables are deeply nested.
            throw new RangeError(`Too many placeables expanded: ${scope.placeables}, ` +
                `max allowed is ${MAX_PLACEABLES}`);
        }
        if (useIsolating) {
            result.push(FSI);
        }
        result.push(resolveExpression(scope, elem).toString(scope));
        if (useIsolating) {
            result.push(PDI);
        }
    }
    scope.dirty.delete(ptn);
    return result.join("");
}
/**
 * Resolve a simple or a complex Pattern to a FluentString
 * (which is really the string primitive).
 */
function resolvePattern(scope, value) {
    // Resolve a simple pattern.
    if (typeof value === "string") {
        return scope.bundle._transform(value);
    }
    return resolveComplexPattern(scope, value);
}

;// ../../node_modules/@fluent/bundle/esm/scope.js
class Scope {
    constructor(bundle, errors, args) {
        /**
         * The Set of patterns already encountered during this resolution.
         * Used to detect and prevent cyclic resolutions.
         * @ignore
         */
        this.dirty = new WeakSet();
        /** A dict of parameters passed to a TermReference. */
        this.params = null;
        /**
         * The running count of placeables resolved so far.
         * Used to detect the Billion Laughs and Quadratic Blowup attacks.
         * @ignore
         */
        this.placeables = 0;
        this.bundle = bundle;
        this.errors = errors;
        this.args = args;
    }
    reportError(error) {
        if (!this.errors || !(error instanceof Error)) {
            throw error;
        }
        this.errors.push(error);
    }
    memoizeIntlObject(ctor, opts) {
        let cache = this.bundle._intls.get(ctor);
        if (!cache) {
            cache = {};
            this.bundle._intls.set(ctor, cache);
        }
        let id = JSON.stringify(opts);
        if (!cache[id]) {
            // @ts-expect-error This is fine.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            cache[id] = new ctor(this.bundle.locales, opts);
        }
        return cache[id];
    }
}

;// ../../node_modules/@fluent/bundle/esm/builtins.js
/**
 * @overview
 *
 * The FTL resolver ships with a number of functions built-in.
 *
 * Each function take two arguments:
 *   - args - an array of positional args
 *   - opts - an object of key-value args
 *
 * Arguments to functions are guaranteed to already be instances of
 * `FluentValue`.  Functions must return `FluentValues` as well.
 */

function values(opts, allowed) {
    const unwrapped = Object.create(null);
    for (const [name, opt] of Object.entries(opts)) {
        if (allowed.includes(name)) {
            unwrapped[name] = opt.valueOf();
        }
    }
    return unwrapped;
}
const NUMBER_ALLOWED = [
    "unitDisplay",
    "currencyDisplay",
    "useGrouping",
    "minimumIntegerDigits",
    "minimumFractionDigits",
    "maximumFractionDigits",
    "minimumSignificantDigits",
    "maximumSignificantDigits",
];
/**
 * The implementation of the `NUMBER()` builtin available to translations.
 *
 * Translations may call the `NUMBER()` builtin in order to specify formatting
 * options of a number. For example:
 *
 *     pi = The value of π is {NUMBER($pi, maximumFractionDigits: 2)}.
 *
 * The implementation expects an array of {@link FluentValue | FluentValues} representing the
 * positional arguments, and an object of named {@link FluentValue | FluentValues} representing the
 * named parameters.
 *
 * The following options are recognized:
 *
 *     unitDisplay
 *     currencyDisplay
 *     useGrouping
 *     minimumIntegerDigits
 *     minimumFractionDigits
 *     maximumFractionDigits
 *     minimumSignificantDigits
 *     maximumSignificantDigits
 *
 * Other options are ignored.
 *
 * @param args The positional arguments passed to this `NUMBER()`.
 * @param opts The named argments passed to this `NUMBER()`.
 */
function NUMBER(args, opts) {
    let arg = args[0];
    if (arg instanceof FluentNone) {
        return new FluentNone(`NUMBER(${arg.valueOf()})`);
    }
    if (arg instanceof FluentNumber) {
        return new FluentNumber(arg.valueOf(), {
            ...arg.opts,
            ...values(opts, NUMBER_ALLOWED),
        });
    }
    if (arg instanceof FluentDateTime) {
        return new FluentNumber(arg.toNumber(), {
            ...values(opts, NUMBER_ALLOWED),
        });
    }
    throw new TypeError("Invalid argument to NUMBER");
}
const DATETIME_ALLOWED = [
    "dateStyle",
    "timeStyle",
    "fractionalSecondDigits",
    "dayPeriod",
    "hour12",
    "weekday",
    "era",
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "timeZoneName",
];
/**
 * The implementation of the `DATETIME()` builtin available to translations.
 *
 * Translations may call the `DATETIME()` builtin in order to specify
 * formatting options of a number. For example:
 *
 *     now = It's {DATETIME($today, month: "long")}.
 *
 * The implementation expects an array of {@link FluentValue | FluentValues} representing the
 * positional arguments, and an object of named {@link FluentValue | FluentValues} representing the
 * named parameters.
 *
 * The following options are recognized:
 *
 *     dateStyle
 *     timeStyle
 *     fractionalSecondDigits
 *     dayPeriod
 *     hour12
 *     weekday
 *     era
 *     year
 *     month
 *     day
 *     hour
 *     minute
 *     second
 *     timeZoneName
 *
 * Other options are ignored.
 *
 * @param args The positional arguments passed to this `DATETIME()`.
 * @param opts The named argments passed to this `DATETIME()`.
 */
function DATETIME(args, opts) {
    let arg = args[0];
    if (arg instanceof FluentNone) {
        return new FluentNone(`DATETIME(${arg.valueOf()})`);
    }
    if (arg instanceof FluentDateTime || arg instanceof FluentNumber) {
        return new FluentDateTime(arg, values(opts, DATETIME_ALLOWED));
    }
    throw new TypeError("Invalid argument to DATETIME");
}

;// ../../node_modules/@fluent/bundle/esm/memoizer.js
const cache = new Map();
function getMemoizerForLocale(locales) {
    const stringLocale = Array.isArray(locales) ? locales.join(" ") : locales;
    let memoizer = cache.get(stringLocale);
    if (memoizer === undefined) {
        memoizer = new Map();
        cache.set(stringLocale, memoizer);
    }
    return memoizer;
}

;// ../../node_modules/@fluent/bundle/esm/bundle.js





/**
 * Message bundles are single-language stores of translation resources. They are
 * responsible for formatting message values and attributes to strings.
 */
class FluentBundle {
    /**
     * Create an instance of `FluentBundle`.
     *
     * @example
     * ```js
     * let bundle = new FluentBundle(["en-US", "en"]);
     *
     * let bundle = new FluentBundle(locales, {useIsolating: false});
     *
     * let bundle = new FluentBundle(locales, {
     *   useIsolating: true,
     *   functions: {
     *     NODE_ENV: () => process.env.NODE_ENV
     *   }
     * });
     * ```
     *
     * @param locales - Used to instantiate `Intl` formatters used by translations.
     * @param options - Optional configuration for the bundle.
     */
    constructor(locales, { functions, useIsolating = true, transform = (v) => v, } = {}) {
        /** @ignore */
        this._terms = new Map();
        /** @ignore */
        this._messages = new Map();
        this.locales = Array.isArray(locales) ? locales : [locales];
        this._functions = {
            NUMBER: NUMBER,
            DATETIME: DATETIME,
            ...functions,
        };
        this._useIsolating = useIsolating;
        this._transform = transform;
        this._intls = getMemoizerForLocale(locales);
    }
    /**
     * Check if a message is present in the bundle.
     *
     * @param id - The identifier of the message to check.
     */
    hasMessage(id) {
        return this._messages.has(id);
    }
    /**
     * Return a raw unformatted message object from the bundle.
     *
     * Raw messages are `{value, attributes}` shapes containing translation units
     * called `Patterns`. `Patterns` are implementation-specific; they should be
     * treated as black boxes and formatted with `FluentBundle.formatPattern`.
     *
     * @param id - The identifier of the message to check.
     */
    getMessage(id) {
        return this._messages.get(id);
    }
    /**
     * Add a translation resource to the bundle.
     *
     * @example
     * ```js
     * let res = new FluentResource("foo = Foo");
     * bundle.addResource(res);
     * bundle.getMessage("foo");
     * // → {value: .., attributes: {..}}
     * ```
     *
     * @param res
     * @param options
     */
    addResource(res, { allowOverrides = false, } = {}) {
        const errors = [];
        for (let i = 0; i < res.body.length; i++) {
            let entry = res.body[i];
            if (entry.id.startsWith("-")) {
                // Identifiers starting with a dash (-) define terms. Terms are private
                // and cannot be retrieved from FluentBundle.
                if (allowOverrides === false && this._terms.has(entry.id)) {
                    errors.push(new Error(`Attempt to override an existing term: "${entry.id}"`));
                    continue;
                }
                this._terms.set(entry.id, entry);
            }
            else {
                if (allowOverrides === false && this._messages.has(entry.id)) {
                    errors.push(new Error(`Attempt to override an existing message: "${entry.id}"`));
                    continue;
                }
                this._messages.set(entry.id, entry);
            }
        }
        return errors;
    }
    /**
     * Format a `Pattern` to a string.
     *
     * Format a raw `Pattern` into a string. `args` will be used to resolve
     * references to variables passed as arguments to the translation.
     *
     * In case of errors `formatPattern` will try to salvage as much of the
     * translation as possible and will still return a string. For performance
     * reasons, the encountered errors are not returned but instead are appended
     * to the `errors` array passed as the third argument.
     *
     * If `errors` is omitted, the first encountered error will be thrown.
     *
     * @example
     * ```js
     * let errors = [];
     * bundle.addResource(
     *     new FluentResource("hello = Hello, {$name}!"));
     *
     * let hello = bundle.getMessage("hello");
     * if (hello.value) {
     *     bundle.formatPattern(hello.value, {name: "Jane"}, errors);
     *     // Returns "Hello, Jane!" and `errors` is empty.
     *
     *     bundle.formatPattern(hello.value, undefined, errors);
     *     // Returns "Hello, {$name}!" and `errors` is now:
     *     // [<ReferenceError: Unknown variable: name>]
     * }
     * ```
     */
    formatPattern(pattern, args = null, errors = null) {
        // Resolve a simple pattern without creating a scope. No error handling is
        // required; by definition simple patterns don't have placeables.
        if (typeof pattern === "string") {
            return this._transform(pattern);
        }
        // Resolve a complex pattern.
        let scope = new Scope(this, errors, args);
        try {
            let value = resolveComplexPattern(scope, pattern);
            return value.toString(scope);
        }
        catch (err) {
            if (scope.errors && err instanceof Error) {
                scope.errors.push(err);
                return new FluentNone().toString(scope);
            }
            throw err;
        }
    }
}

;// ../../node_modules/@fluent/bundle/esm/resource.js
// This regex is used to iterate through the beginnings of messages and terms.
// With the /m flag, the ^ matches at the beginning of every line.
const RE_MESSAGE_START = /^(-?[a-zA-Z][\w-]*) *= */gm;
// Both Attributes and Variants are parsed in while loops. These regexes are
// used to break out of them.
const RE_ATTRIBUTE_START = /\.([a-zA-Z][\w-]*) *= */y;
const RE_VARIANT_START = /\*?\[/y;
const RE_NUMBER_LITERAL = /(-?[0-9]+(?:\.([0-9]+))?)/y;
const RE_IDENTIFIER = /([a-zA-Z][\w-]*)/y;
const RE_REFERENCE = /([$-])?([a-zA-Z][\w-]*)(?:\.([a-zA-Z][\w-]*))?/y;
const RE_FUNCTION_NAME = /^[A-Z][A-Z0-9_-]*$/;
// A "run" is a sequence of text or string literal characters which don't
// require any special handling. For TextElements such special characters are: {
// (starts a placeable), and line breaks which require additional logic to check
// if the next line is indented. For StringLiterals they are: \ (starts an
// escape sequence), " (ends the literal), and line breaks which are not allowed
// in StringLiterals. Note that string runs may be empty; text runs may not.
const RE_TEXT_RUN = /([^{}\n\r]+)/y;
const RE_STRING_RUN = /([^\\"\n\r]*)/y;
// Escape sequences.
const RE_STRING_ESCAPE = /\\([\\"])/y;
const RE_UNICODE_ESCAPE = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{6})/y;
// Used for trimming TextElements and indents.
const RE_LEADING_NEWLINES = /^\n+/;
const RE_TRAILING_SPACES = / +$/;
// Used in makeIndent to strip spaces from blank lines and normalize CRLF to LF.
const RE_BLANK_LINES = / *\r?\n/g;
// Used in makeIndent to measure the indentation.
const RE_INDENT = /( *)$/;
// Common tokens.
const TOKEN_BRACE_OPEN = /{\s*/y;
const TOKEN_BRACE_CLOSE = /\s*}/y;
const TOKEN_BRACKET_OPEN = /\[\s*/y;
const TOKEN_BRACKET_CLOSE = /\s*] */y;
const TOKEN_PAREN_OPEN = /\s*\(\s*/y;
const TOKEN_ARROW = /\s*->\s*/y;
const TOKEN_COLON = /\s*:\s*/y;
// Note the optional comma. As a deviation from the Fluent EBNF, the parser
// doesn't enforce commas between call arguments.
const TOKEN_COMMA = /\s*,?\s*/y;
const TOKEN_BLANK = /\s+/y;
/**
 * Fluent Resource is a structure storing parsed localization entries.
 */
class FluentResource {
    constructor(source) {
        this.body = [];
        RE_MESSAGE_START.lastIndex = 0;
        let cursor = 0;
        // Iterate over the beginnings of messages and terms to efficiently skip
        // comments and recover from errors.
        while (true) {
            let next = RE_MESSAGE_START.exec(source);
            if (next === null) {
                break;
            }
            cursor = RE_MESSAGE_START.lastIndex;
            try {
                this.body.push(parseMessage(next[1]));
            }
            catch (err) {
                if (err instanceof SyntaxError) {
                    // Don't report any Fluent syntax errors. Skip directly to the
                    // beginning of the next message or term.
                    continue;
                }
                throw err;
            }
        }
        // The parser implementation is inlined below for performance reasons,
        // as well as for convenience of accessing `source` and `cursor`.
        // The parser focuses on minimizing the number of false negatives at the
        // expense of increasing the risk of false positives. In other words, it
        // aims at parsing valid Fluent messages with a success rate of 100%, but it
        // may also parse a few invalid messages which the reference parser would
        // reject. The parser doesn't perform any validation and may produce entries
        // which wouldn't make sense in the real world. For best results users are
        // advised to validate translations with the fluent-syntax parser
        // pre-runtime.
        // The parser makes an extensive use of sticky regexes which can be anchored
        // to any offset of the source string without slicing it. Errors are thrown
        // to bail out of parsing of ill-formed messages.
        function test(re) {
            re.lastIndex = cursor;
            return re.test(source);
        }
        // Advance the cursor by the char if it matches. May be used as a predicate
        // (was the match found?) or, if errorClass is passed, as an assertion.
        function consumeChar(char, errorClass) {
            if (source[cursor] === char) {
                cursor++;
                return true;
            }
            if (errorClass) {
                throw new errorClass(`Expected ${char}`);
            }
            return false;
        }
        // Advance the cursor by the token if it matches. May be used as a predicate
        // (was the match found?) or, if errorClass is passed, as an assertion.
        function consumeToken(re, errorClass) {
            if (test(re)) {
                cursor = re.lastIndex;
                return true;
            }
            if (errorClass) {
                throw new errorClass(`Expected ${re.toString()}`);
            }
            return false;
        }
        // Execute a regex, advance the cursor, and return all capture groups.
        function match(re) {
            re.lastIndex = cursor;
            let result = re.exec(source);
            if (result === null) {
                throw new SyntaxError(`Expected ${re.toString()}`);
            }
            cursor = re.lastIndex;
            return result;
        }
        // Execute a regex, advance the cursor, and return the capture group.
        function match1(re) {
            return match(re)[1];
        }
        function parseMessage(id) {
            let value = parsePattern();
            let attributes = parseAttributes();
            if (value === null && Object.keys(attributes).length === 0) {
                throw new SyntaxError("Expected message value or attributes");
            }
            return { id, value, attributes };
        }
        function parseAttributes() {
            let attrs = Object.create(null);
            while (test(RE_ATTRIBUTE_START)) {
                let name = match1(RE_ATTRIBUTE_START);
                let value = parsePattern();
                if (value === null) {
                    throw new SyntaxError("Expected attribute value");
                }
                attrs[name] = value;
            }
            return attrs;
        }
        function parsePattern() {
            let first;
            // First try to parse any simple text on the same line as the id.
            if (test(RE_TEXT_RUN)) {
                first = match1(RE_TEXT_RUN);
            }
            // If there's a placeable on the first line, parse a complex pattern.
            if (source[cursor] === "{" || source[cursor] === "}") {
                // Re-use the text parsed above, if possible.
                return parsePatternElements(first ? [first] : [], Infinity);
            }
            // RE_TEXT_VALUE stops at newlines. Only continue parsing the pattern if
            // what comes after the newline is indented.
            let indent = parseIndent();
            if (indent) {
                if (first) {
                    // If there's text on the first line, the blank block is part of the
                    // translation content in its entirety.
                    return parsePatternElements([first, indent], indent.length);
                }
                // Otherwise, we're dealing with a block pattern, i.e. a pattern which
                // starts on a new line. Discrad the leading newlines but keep the
                // inline indent; it will be used by the dedentation logic.
                indent.value = trim(indent.value, RE_LEADING_NEWLINES);
                return parsePatternElements([indent], indent.length);
            }
            if (first) {
                // It was just a simple inline text after all.
                return trim(first, RE_TRAILING_SPACES);
            }
            return null;
        }
        // Parse a complex pattern as an array of elements.
        function parsePatternElements(elements = [], commonIndent) {
            while (true) {
                if (test(RE_TEXT_RUN)) {
                    elements.push(match1(RE_TEXT_RUN));
                    continue;
                }
                if (source[cursor] === "{") {
                    elements.push(parsePlaceable());
                    continue;
                }
                if (source[cursor] === "}") {
                    throw new SyntaxError("Unbalanced closing brace");
                }
                let indent = parseIndent();
                if (indent) {
                    elements.push(indent);
                    commonIndent = Math.min(commonIndent, indent.length);
                    continue;
                }
                break;
            }
            let lastIndex = elements.length - 1;
            let lastElement = elements[lastIndex];
            // Trim the trailing spaces in the last element if it's a TextElement.
            if (typeof lastElement === "string") {
                elements[lastIndex] = trim(lastElement, RE_TRAILING_SPACES);
            }
            let baked = [];
            for (let element of elements) {
                if (element instanceof Indent) {
                    // Dedent indented lines by the maximum common indent.
                    element = element.value.slice(0, element.value.length - commonIndent);
                }
                if (element) {
                    baked.push(element);
                }
            }
            return baked;
        }
        function parsePlaceable() {
            consumeToken(TOKEN_BRACE_OPEN, SyntaxError);
            let selector = parseInlineExpression();
            if (consumeToken(TOKEN_BRACE_CLOSE)) {
                return selector;
            }
            if (consumeToken(TOKEN_ARROW)) {
                let variants = parseVariants();
                consumeToken(TOKEN_BRACE_CLOSE, SyntaxError);
                return {
                    type: "select",
                    selector,
                    ...variants,
                };
            }
            throw new SyntaxError("Unclosed placeable");
        }
        function parseInlineExpression() {
            if (source[cursor] === "{") {
                // It's a nested placeable.
                return parsePlaceable();
            }
            if (test(RE_REFERENCE)) {
                let [, sigil, name, attr = null] = match(RE_REFERENCE);
                if (sigil === "$") {
                    return { type: "var", name };
                }
                if (consumeToken(TOKEN_PAREN_OPEN)) {
                    let args = parseArguments();
                    if (sigil === "-") {
                        // A parameterized term: -term(...).
                        return { type: "term", name, attr, args };
                    }
                    if (RE_FUNCTION_NAME.test(name)) {
                        return { type: "func", name, args };
                    }
                    throw new SyntaxError("Function names must be all upper-case");
                }
                if (sigil === "-") {
                    // A non-parameterized term: -term.
                    return {
                        type: "term",
                        name,
                        attr,
                        args: [],
                    };
                }
                return { type: "mesg", name, attr };
            }
            return parseLiteral();
        }
        function parseArguments() {
            let args = [];
            while (true) {
                switch (source[cursor]) {
                    case ")": // End of the argument list.
                        cursor++;
                        return args;
                    case undefined: // EOF
                        throw new SyntaxError("Unclosed argument list");
                }
                args.push(parseArgument());
                // Commas between arguments are treated as whitespace.
                consumeToken(TOKEN_COMMA);
            }
        }
        function parseArgument() {
            let expr = parseInlineExpression();
            if (expr.type !== "mesg") {
                return expr;
            }
            if (consumeToken(TOKEN_COLON)) {
                // The reference is the beginning of a named argument.
                return {
                    type: "narg",
                    name: expr.name,
                    value: parseLiteral(),
                };
            }
            // It's a regular message reference.
            return expr;
        }
        function parseVariants() {
            let variants = [];
            let count = 0;
            let star;
            while (test(RE_VARIANT_START)) {
                if (consumeChar("*")) {
                    star = count;
                }
                let key = parseVariantKey();
                let value = parsePattern();
                if (value === null) {
                    throw new SyntaxError("Expected variant value");
                }
                variants[count++] = { key, value };
            }
            if (count === 0) {
                return null;
            }
            if (star === undefined) {
                throw new SyntaxError("Expected default variant");
            }
            return { variants, star };
        }
        function parseVariantKey() {
            consumeToken(TOKEN_BRACKET_OPEN, SyntaxError);
            let key;
            if (test(RE_NUMBER_LITERAL)) {
                key = parseNumberLiteral();
            }
            else {
                key = {
                    type: "str",
                    value: match1(RE_IDENTIFIER),
                };
            }
            consumeToken(TOKEN_BRACKET_CLOSE, SyntaxError);
            return key;
        }
        function parseLiteral() {
            if (test(RE_NUMBER_LITERAL)) {
                return parseNumberLiteral();
            }
            if (source[cursor] === '"') {
                return parseStringLiteral();
            }
            throw new SyntaxError("Invalid expression");
        }
        function parseNumberLiteral() {
            let [, value, fraction = ""] = match(RE_NUMBER_LITERAL);
            let precision = fraction.length;
            return {
                type: "num",
                value: parseFloat(value),
                precision,
            };
        }
        function parseStringLiteral() {
            consumeChar('"', SyntaxError);
            let value = "";
            while (true) {
                value += match1(RE_STRING_RUN);
                if (source[cursor] === "\\") {
                    value += parseEscapeSequence();
                    continue;
                }
                if (consumeChar('"')) {
                    return { type: "str", value };
                }
                // We've reached an EOL of EOF.
                throw new SyntaxError("Unclosed string literal");
            }
        }
        // Unescape known escape sequences.
        function parseEscapeSequence() {
            if (test(RE_STRING_ESCAPE)) {
                return match1(RE_STRING_ESCAPE);
            }
            if (test(RE_UNICODE_ESCAPE)) {
                let [, codepoint4, codepoint6] = match(RE_UNICODE_ESCAPE);
                let codepoint = parseInt(codepoint4 || codepoint6, 16);
                return codepoint <= 0xd7ff || 0xe000 <= codepoint
                    ? // It's a Unicode scalar value.
                        String.fromCodePoint(codepoint)
                    : // Lonely surrogates can cause trouble when the parsing result is
                        // saved using UTF-8. Use U+FFFD REPLACEMENT CHARACTER instead.
                        "�";
            }
            throw new SyntaxError("Unknown escape sequence");
        }
        // Parse blank space. Return it if it looks like indent before a pattern
        // line. Skip it othwerwise.
        function parseIndent() {
            let start = cursor;
            consumeToken(TOKEN_BLANK);
            // Check the first non-blank character after the indent.
            switch (source[cursor]) {
                case ".":
                case "[":
                case "*":
                case "}":
                case undefined: // EOF
                    // A special character. End the Pattern.
                    return false;
                case "{":
                    // Placeables don't require indentation (in EBNF: block-placeable).
                    // Continue the Pattern.
                    return makeIndent(source.slice(start, cursor));
            }
            // If the first character on the line is not one of the special characters
            // listed above, it's a regular text character. Check if there's at least
            // one space of indent before it.
            if (source[cursor - 1] === " ") {
                // It's an indented text character (in EBNF: indented-char). Continue
                // the Pattern.
                return makeIndent(source.slice(start, cursor));
            }
            // A not-indented text character is likely the identifier of the next
            // message. End the Pattern.
            return false;
        }
        // Trim blanks in text according to the given regex.
        function trim(text, re) {
            return text.replace(re, "");
        }
        // Normalize a blank block and extract the indent details.
        function makeIndent(blank) {
            let value = blank.replace(RE_BLANK_LINES, "\n");
            let length = RE_INDENT.exec(blank)[1].length;
            return new Indent(value, length);
        }
    }
}
class Indent {
    constructor(value, length) {
        this.value = value;
        this.length = length;
    }
}

;// ../../node_modules/@fluent/bundle/esm/index.js
/**
 * A JavaScript implementation of Project Fluent, a localization
 * framework designed to unleash the expressive power of the natural language.
 *
 * @module
 */




;// ../../node_modules/@fluent/langneg/esm/locale.js
/* eslint no-magic-numbers: 0 */
const languageCodeRe = "([a-z]{2,3}|\\*)";
const scriptCodeRe = "(?:-([a-z]{4}|\\*))";
const regionCodeRe = "(?:-([a-z]{2}|\\*))";
const variantCodeRe = "(?:-(([0-9][a-z0-9]{3}|[a-z0-9]{5,8})|\\*))";
/**
 * Regular expression splitting locale id into four pieces:
 *
 * Example: `en-Latn-US-macos`
 *
 * language: en
 * script:   Latn
 * region:   US
 * variant:  macos
 *
 * It can also accept a range `*` character on any position.
 */
const localeRe = new RegExp(`^${languageCodeRe}${scriptCodeRe}?${regionCodeRe}?${variantCodeRe}?$`, "i");
class Locale {
    /**
     * Parses a locale id using the localeRe into an array with four elements.
     *
     * If the second argument `range` is set to true, it places range `*` char
     * in place of any missing piece.
     *
     * It also allows skipping the script section of the id, so `en-US` is
     * properly parsed as `en-*-US-*`.
     */
    constructor(locale) {
        const result = localeRe.exec(locale.replace(/_/g, "-"));
        if (!result) {
            this.isWellFormed = false;
            return;
        }
        let [, language, script, region, variant] = result;
        if (language) {
            this.language = language.toLowerCase();
        }
        if (script) {
            this.script = script[0].toUpperCase() + script.slice(1);
        }
        if (region) {
            this.region = region.toUpperCase();
        }
        this.variant = variant;
        this.isWellFormed = true;
    }
    isEqual(other) {
        return (this.language === other.language &&
            this.script === other.script &&
            this.region === other.region &&
            this.variant === other.variant);
    }
    matches(other, thisRange = false, otherRange = false) {
        return ((this.language === other.language ||
            (thisRange && this.language === undefined) ||
            (otherRange && other.language === undefined)) &&
            (this.script === other.script ||
                (thisRange && this.script === undefined) ||
                (otherRange && other.script === undefined)) &&
            (this.region === other.region ||
                (thisRange && this.region === undefined) ||
                (otherRange && other.region === undefined)) &&
            (this.variant === other.variant ||
                (thisRange && this.variant === undefined) ||
                (otherRange && other.variant === undefined)));
    }
    toString() {
        return [this.language, this.script, this.region, this.variant]
            .filter(part => part !== undefined)
            .join("-");
    }
    clearVariants() {
        this.variant = undefined;
    }
    clearRegion() {
        this.region = undefined;
    }
    addLikelySubtags() {
        const newLocale = getLikelySubtagsMin(this.toString().toLowerCase());
        if (newLocale) {
            this.language = newLocale.language;
            this.script = newLocale.script;
            this.region = newLocale.region;
            this.variant = newLocale.variant;
            return true;
        }
        return false;
    }
}
/**
 * Below is a manually a list of likely subtags corresponding to Unicode
 * CLDR likelySubtags list.
 * This list is curated by the maintainers of Project Fluent and is
 * intended to be used in place of the full likelySubtags list in use cases
 * where full list cannot be (for example, due to the size).
 *
 * This version of the list is based on CLDR 30.0.3.
 */
const likelySubtagsMin = {
    ar: "ar-arab-eg",
    "az-arab": "az-arab-ir",
    "az-ir": "az-arab-ir",
    be: "be-cyrl-by",
    da: "da-latn-dk",
    el: "el-grek-gr",
    en: "en-latn-us",
    fa: "fa-arab-ir",
    ja: "ja-jpan-jp",
    ko: "ko-kore-kr",
    pt: "pt-latn-br",
    sr: "sr-cyrl-rs",
    "sr-ru": "sr-latn-ru",
    sv: "sv-latn-se",
    ta: "ta-taml-in",
    uk: "uk-cyrl-ua",
    zh: "zh-hans-cn",
    "zh-hant": "zh-hant-tw",
    "zh-hk": "zh-hant-hk",
    "zh-mo": "zh-hant-mo",
    "zh-tw": "zh-hant-tw",
    "zh-gb": "zh-hant-gb",
    "zh-us": "zh-hant-us",
};
const regionMatchingLangs = [
    "az",
    "bg",
    "cs",
    "de",
    "es",
    "fi",
    "fr",
    "hu",
    "it",
    "lt",
    "lv",
    "nl",
    "pl",
    "ro",
    "ru",
];
function getLikelySubtagsMin(loc) {
    if (Object.prototype.hasOwnProperty.call(likelySubtagsMin, loc)) {
        return new Locale(likelySubtagsMin[loc]);
    }
    const locale = new Locale(loc);
    if (locale.language && regionMatchingLangs.includes(locale.language)) {
        locale.region = locale.language.toUpperCase();
        return locale;
    }
    return null;
}

;// ../../node_modules/@fluent/langneg/esm/matches.js
/* eslint no-magic-numbers: 0 */

/**
 * Negotiates the languages between the list of requested locales against
 * a list of available locales.
 *
 * The algorithm is based on the BCP4647 3.3.2 Extended Filtering algorithm,
 * with several modifications:
 *
 *  1) available locales are treated as ranges
 *
 *    This change allows us to match a more specific request against
 *    more generic available locale.
 *
 *    For example, if the available locale list provides locale `en`,
 *    and the requested locale is `en-US`, we treat the available locale as
 *    a locale that matches all possible english requests.
 *
 *    This means that we expect available locale ID to be as precize as
 *    the matches they want to cover.
 *
 *    For example, if there is only `sr` available, it's ok to list
 *    it in available locales. But once the available locales has both,
 *    Cyrl and Latn variants, the locale IDs should be `sr-Cyrl` and `sr-Latn`
 *    to avoid any `sr-*` request to match against whole `sr` range.
 *
 *    What it does ([requested] * [available] = [supported]):
 *
 *    ['en-US'] * ['en'] = ['en']
 *
 *  2) likely subtags from LDML 4.3 Likely Subtags has been added
 *
 *    The most obvious likely subtag that can be computed is a duplication
 *    of the language field onto region field (`fr` => `fr-FR`).
 *
 *    On top of that, likely subtags may use a list of mappings, that
 *    allow the algorithm to handle non-obvious matches.
 *    For example, making sure that we match `en` to `en-US` or `sr` to
 *    `sr-Cyrl`, while `sr-RU` to `sr-Latn-RU`.
 *
 *    This list can be taken directly from CLDR Supplemental Data.
 *
 *    What it does ([requested] * [available] = [supported]):
 *
 *    ['fr'] * ['fr-FR'] = ['fr-FR']
 *    ['en'] * ['en-US'] = ['en-US']
 *    ['sr'] * ['sr-Latn', 'sr-Cyrl'] = ['sr-Cyrl']
 *
 *  3) variant/region range check has been added
 *
 *    Lastly, the last form of check is against the requested locale ID
 *    but with the variant/region field replaced with a `*` range.
 *
 *    The rationale here laid out in LDML 4.4 Language Matching:
 *      "(...) normally the fall-off between the user's languages is
 *      substantially greated than regional variants."
 *
 *    In other words, if we can't match for the given region, maybe
 *    we can match for the same language/script but other region, and
 *    it will in most cases be preferred over falling back on the next
 *    language.
 *
 *    What it does ([requested] * [available] = [supported]):
 *
 *    ['en-AU'] * ['en-US'] = ['en-US']
 *    ['sr-RU'] * ['sr-Latn-RO'] = ['sr-Latn-RO'] // sr-RU -> sr-Latn-RU
 *
 *    It works similarly to getParentLocales algo, except that we stop
 *    after matching against variant/region ranges and don't try to match
 *    ignoring script ranges. That means that `sr-Cyrl` will never match
 *    against `sr-Latn`.
 */
function filterMatches(requestedLocales, availableLocales, strategy) {
    const supportedLocales = new Set();
    const availableLocalesMap = new Map();
    for (let locale of availableLocales) {
        let newLocale = new Locale(locale);
        if (newLocale.isWellFormed) {
            availableLocalesMap.set(locale, new Locale(locale));
        }
    }
    outer: for (const reqLocStr of requestedLocales) {
        const reqLocStrLC = reqLocStr.toLowerCase();
        const requestedLocale = new Locale(reqLocStrLC);
        if (requestedLocale.language === undefined) {
            continue;
        }
        // 1) Attempt to make an exact match
        // Example: `en-US` === `en-US`
        for (const key of availableLocalesMap.keys()) {
            if (reqLocStrLC === key.toLowerCase()) {
                supportedLocales.add(key);
                availableLocalesMap.delete(key);
                if (strategy === "lookup") {
                    return Array.from(supportedLocales);
                }
                else if (strategy === "filtering") {
                    continue;
                }
                else {
                    continue outer;
                }
            }
        }
        // 2) Attempt to match against the available range
        // This turns `en` into `en-*-*-*` and `en-US` into `en-*-US-*`
        // Example: ['en-US'] * ['en'] = ['en']
        for (const [key, availableLocale] of availableLocalesMap.entries()) {
            if (availableLocale.matches(requestedLocale, true, false)) {
                supportedLocales.add(key);
                availableLocalesMap.delete(key);
                if (strategy === "lookup") {
                    return Array.from(supportedLocales);
                }
                else if (strategy === "filtering") {
                    continue;
                }
                else {
                    continue outer;
                }
            }
        }
        // 3) Attempt to retrieve a maximal version of the requested locale ID
        // If data is available, it'll expand `en` into `en-Latn-US` and
        // `zh` into `zh-Hans-CN`.
        // Example: ['en'] * ['en-GB', 'en-US'] = ['en-US']
        if (requestedLocale.addLikelySubtags()) {
            for (const [key, availableLocale] of availableLocalesMap.entries()) {
                if (availableLocale.matches(requestedLocale, true, false)) {
                    supportedLocales.add(key);
                    availableLocalesMap.delete(key);
                    if (strategy === "lookup") {
                        return Array.from(supportedLocales);
                    }
                    else if (strategy === "filtering") {
                        continue;
                    }
                    else {
                        continue outer;
                    }
                }
            }
        }
        // 4) Attempt to look up for a different variant for the same locale ID
        // Example: ['en-US-mac'] * ['en-US-win'] = ['en-US-win']
        requestedLocale.clearVariants();
        for (const [key, availableLocale] of availableLocalesMap.entries()) {
            if (availableLocale.matches(requestedLocale, true, true)) {
                supportedLocales.add(key);
                availableLocalesMap.delete(key);
                if (strategy === "lookup") {
                    return Array.from(supportedLocales);
                }
                else if (strategy === "filtering") {
                    continue;
                }
                else {
                    continue outer;
                }
            }
        }
        // 5) Attempt to match against the likely subtag without region
        // In the example below, addLikelySubtags will turn
        // `zh-Hant` into `zh-Hant-TW` giving `zh-TW` priority match
        // over `zh-CN`.
        //
        // Example: ['zh-Hant-HK'] * ['zh-TW', 'zh-CN'] = ['zh-TW']
        requestedLocale.clearRegion();
        if (requestedLocale.addLikelySubtags()) {
            for (const [key, availableLocale] of availableLocalesMap.entries()) {
                if (availableLocale.matches(requestedLocale, true, false)) {
                    supportedLocales.add(key);
                    availableLocalesMap.delete(key);
                    if (strategy === "lookup") {
                        return Array.from(supportedLocales);
                    }
                    else if (strategy === "filtering") {
                        continue;
                    }
                    else {
                        continue outer;
                    }
                }
            }
        }
        // 6) Attempt to look up for a different region for the same locale ID
        // Example: ['en-US'] * ['en-AU'] = ['en-AU']
        requestedLocale.clearRegion();
        for (const [key, availableLocale] of availableLocalesMap.entries()) {
            if (availableLocale.matches(requestedLocale, true, true)) {
                supportedLocales.add(key);
                availableLocalesMap.delete(key);
                if (strategy === "lookup") {
                    return Array.from(supportedLocales);
                }
                else if (strategy === "filtering") {
                    continue;
                }
                else {
                    continue outer;
                }
            }
        }
    }
    return Array.from(supportedLocales);
}

;// ../../node_modules/@fluent/langneg/esm/negotiate_languages.js

/**
 * Negotiates the languages between the list of requested locales against
 * a list of available locales.
 *
 * It accepts three arguments:
 *
 *   requestedLocales:
 *     an Array of strings with BCP47 locale IDs sorted
 *     according to user preferences.
 *
 *   availableLocales:
 *     an Array of strings with BCP47 locale IDs of locale for which
 *     resources are available. Unsorted.
 *
 *   options:
 *     An object with the following, optional keys:
 *
 *       strategy: 'filtering' (default) | 'matching' | 'lookup'
 *
 *       defaultLocale:
 *         a string with BCP47 locale ID to be used
 *         as a last resort locale.
 *
 *
 * It returns an Array of strings with BCP47 locale IDs sorted according to the
 * user preferences.
 *
 * The exact list will be selected differently depending on the strategy:
 *
 *   'filtering': (default)
 *     In the filtering strategy, the algorithm will attempt to match
 *     as many keys in the available locales in order of the requested locales.
 *
 *   'matching':
 *     In the matching strategy, the algorithm will attempt to find the
 *     best possible match for each element of the requestedLocales list.
 *
 *   'lookup':
 *     In the lookup strategy, the algorithm will attempt to find a single
 *     best available locale based on the requested locales list.
 *
 *     This strategy requires defaultLocale option to be set.
 */
function negotiateLanguages(requestedLocales, availableLocales, { strategy = "filtering", defaultLocale } = {}) {
    const supportedLocales = filterMatches(Array.from(requestedLocales !== null && requestedLocales !== void 0 ? requestedLocales : []).map(String), Array.from(availableLocales !== null && availableLocales !== void 0 ? availableLocales : []).map(String), strategy);
    if (strategy === "lookup") {
        if (defaultLocale === undefined) {
            throw new Error("defaultLocale cannot be undefined for strategy `lookup`");
        }
        if (supportedLocales.length === 0) {
            supportedLocales.push(defaultLocale);
        }
    }
    else if (defaultLocale && !supportedLocales.includes(defaultLocale)) {
        supportedLocales.push(defaultLocale);
    }
    return supportedLocales;
}

;// ../../node_modules/@fluent/langneg/esm/index.js
/*
 * @module fluent-langneg
 * @overview
 *
 * `fluent-langneg` provides language negotiation API that fits into
 * Project Fluent localization composition and fallbacking strategy.
 *
 */




;// ../core/dist/js-polyfills.js
/**
 * Polyfills the `Array.prototype.reduce` method.
 *
 * Production steps of ECMA-262, Edition 5, 15.4.4.21
 * Reference: https://es5.github.io/#x15.4.4.21
 * https://tc39.github.io/ecma262/#sec-array.prototype.reduce
 */
function polyfillArrayPrototypeReduce() {
    Object.defineProperty(Array.prototype, "reduce", {
        value(...args) {
            if (args.length === 0 &&
                window.Prototype &&
                window.Prototype.Version &&
                window.Prototype.Version < "1.6.1") {
                // Off-spec: compatibility with prototype.js
                return this.length > 1 ? this : this[0];
            }
            const callback = args[0];
            if (this === null) {
                throw new TypeError("Array.prototype.reduce called on null or undefined");
            }
            if (typeof callback !== "function") {
                throw new TypeError(`${callback} is not a function`);
            }
            const o = Object(this);
            const len = o.length >>> 0;
            let k = 0;
            let value;
            if (args.length >= 2) {
                value = args[1];
            }
            else {
                while (k < len && !(k in o)) {
                    k++;
                }
                if (k >= len) {
                    throw new TypeError("Reduce of empty array with no initial value");
                }
                value = o[k++];
            }
            while (k < len) {
                if (k in o) {
                    value = callback(value, o[k], k, o);
                }
                k++;
            }
            return value;
        },
    });
}
/**
 * Polyfills the `Window` function.
 */
function polyfillWindow() {
    if (typeof window.constructor !== "function" ||
        !isNativeFunction(window.constructor)) {
        // Don't polyfill `Window` if `window.constructor` has been overridden.
        return;
    }
    // @ts-expect-error: `Function not assignable to { new (): Window; prototype: Window; }`
    window.Window = window.constructor;
}
/**
 * Polyfills the `Reflect` object and members.
 *
 * This is a partial implementation, just enough to match our needs.
 */
function tryPolyfillReflect() {
    if (window.Reflect === undefined || window.Reflect === null) {
        // @ts-expect-error: {} indeed doesn't implement Reflect's interface.
        window.Reflect = {};
    }
    if (typeof Reflect.get !== "function") {
        Object.defineProperty(Reflect, "get", {
            value(target, key) {
                return target[key];
            },
        });
    }
    if (typeof Reflect.set !== "function") {
        Object.defineProperty(Reflect, "set", {
            value(target, key, value) {
                target[key] = value;
            },
        });
    }
    if (typeof Reflect.has !== "function") {
        Object.defineProperty(Reflect, "has", {
            value(target, key) {
                // @ts-expect-error: Type 'T' is not assignable to type 'object'.
                return key in target;
            },
        });
    }
    if (typeof Reflect.ownKeys !== "function") {
        Object.defineProperty(Reflect, "ownKeys", {
            value(target) {
                return [
                    ...Object.getOwnPropertyNames(target),
                    ...Object.getOwnPropertySymbols(target),
                ];
            },
        });
    }
}
/**
 * Replaces a `Map` object missing standard methods with an unchanged `Map` object from a fresh global.
 *
 * @returns The custom `Map` object that exists on the page, or undefined if the page uses the standard `Map`.
 */
function resetCustomMap() {
    if (typeof Map.prototype.set !== "function") {
        const currentMap = Map;
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.documentElement.append(iframe);
        // eslint-disable-next-line no-global-assign
        Map = iframe.contentWindow.Map;
        iframe.remove();
        return currentMap;
    }
    return undefined;
}
/**
 * Restores a custom map object to the global namespace if one was defined, as in https://github.com/ruffle-rs/ruffle/discussions/19758.
 *
 * @param customMap The custom `Map` object that existed on the page, or undefined if the page used the standard `Map`.
 */
function restoreCustomMap(customMap) {
    if (customMap) {
        // eslint-disable-next-line no-global-assign
        Map = customMap;
    }
}
/**
 * Determines whether a function is native or not.
 *
 * @param func The function to test.
 * @returns True if the function hasn't been overridden.
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function isNativeFunction(func) {
    const val = typeof Function.prototype.toString === "function"
        ? Function.prototype.toString()
        : null;
    if (typeof val === "string" && val.indexOf("[native code]") >= 0) {
        return (Function.prototype.toString.call(func).indexOf("[native code]") >= 0);
    }
    return false;
}
/**
 * Checks and applies the polyfills to the current window, if needed.
 */
function setPolyfillsOnLoad() {
    if (typeof Array.prototype.reduce !== "function" ||
        !isNativeFunction(Array.prototype.reduce)) {
        // Some external libraries override the `Array.prototype.reduce` method in a way
        // that causes Webpack to crash (#1507, #1865), so we need to override it again.
        polyfillArrayPrototypeReduce();
    }
    if (typeof Window !== "function" || !isNativeFunction(Window)) {
        // Overriding the native `Window` function causes issues in wasm-bindgen, as a
        // code like `window instanceof Window` will no longer work.
        polyfillWindow();
    }
    // Some pages override the native `Reflect` object, which causes various issues:
    // 1- wasm-bindgen's stdlib may crash (#3173).
    // 2- FlashVars may be ignored (#8537).
    tryPolyfillReflect();
}

;// ../core/dist/internal/i18n.js



// This is automatically populated by `tools/bundle_texts.ts` via a postbuild script
const BUNDLED_TEXTS = {
  "ar-SA": {
    "context_menu.ftl": "context-menu-download-swf = حمِّل .swf\ncontext-menu-copy-debug-info = انسخ معلومات التنقيح\ncontext-menu-open-save-manager = افتح مدير الحفظ\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] عن ملحق رَفل ({ $version })\n       *[other] عن رَفل ({ $version })\n    }\ncontext-menu-hide = أخفِ هذه القائمة\ncontext-menu-exit-fullscreen = اخرج من وضعية الشاشة الكاملة\ncontext-menu-enter-fullscreen = ادخل وضعية الشاشة الكاملة\ncontext-menu-volume-controls = عناصر التحكم بالصوت\n",
    "messages.ftl": "message-cant-embed =\n    لم يكن رفل قادرًا على تشغيل الفلاش المضمنة في هذه الصفحة.\n    يمكنك محاولة فتح الملف في علامة تبويب منفصلة لتجاوز هذه المشكلة.\nmessage-restored-from-bfcache =\n    استعاد متصفحك محتوى الفلاش هذا من جلسة سابقة.\n    للبدء من جديد، أعد تحميل الصفحة.\npanic-title = لقد حدث خطأ ما :(\nmore-info = معلومات أكثر\nrun-anyway = شغِّل على أي حال\ncontinue = استمر\nreport-bug = بلِّغ عن علة\nupdate-ruffle = تحديث رفل\nruffle-demo = العرض التجريبي\nruffle-desktop = برنامج سطح المكتب\nruffle-wiki = اعرض ويكي رفل\nenable-hardware-acceleration = يبدو أن تسريع الجهاز معطل. على الرغم من أن رفل قد يعمل، إلا أنه قد يكون بطيئًا جدًا. يمكنك معرفة كيفية تمكين تسريع الأجهزة بالنقر على الرابط أدناه:\nenable-hardware-acceleration-link = الأسئلة الشائعة - تسريع أجهزة كروم\nview-error-details = إعرض تفاصيل الخطأ\nopen-in-new-tab = إفتح في علامة تبويب جديدة\nclick-to-unmute = إنقر لإلغاء الكتم\nclipboard-message-title = النسخ واللصق في رفل\nclipboard-message-description =\n    {$variant ->\n       *[unsupported] متصفحك لا يدعم الوصول للحافظة الكاملة،\n        [access-denied] تم رفض الوصول للحافظة،\n    } لكن يمكنك إستخدام هذه الاختصارات دائمًا:\nclipboard-message-copy = { \" \" } للنسخ\nclipboard-message-cut = { \" \" } للقص\nclipboard-message-paste = { \" \" } للصق\nerror-canvas-reload = تعذر إعادة التحميل مع مُصَير اللوحة عندما استُخدِم مُصَير اللوحة مسبقًا.\nerror-file-protocol =\n    يبدو أنك تشغِّل رفل على البروتوكول \"file:\".\n    لا يعمل هذا إذ تمنع المتصفحات الكثير من الميزات من العمل لأسباب أمنية.\n    بدلًا من ذلك، ندعوك إلى إعداد خادوم محلي أو استخدام عارض الويب أو تطبيق سطح المكتب.\nerror-javascript-config =\n    تعرض رفل إلى مشكلة كبيرة بسبب الإعدادات الخاطئة لجافا سكرِبت.\n    إذا كنت مسؤول الخادوم، نحن ندعوك إلى التحقق من تفاصيل الخطأ لمعرفة سبب المشكلة.\n    يمكنك أيضًا الرجوع إلى ويكي رفل للحصول على المساعدة.\nerror-wasm-not-found =\n    فشل رفل في تحميل مكون الملف \".wasm\" المطلوب.\n    إذا كنت مسؤول الخادوم، يرجى التأكد من أن الملف قد رُفِع بشكل صحيح.\n    إذا استمرت المشكلة، قد تحتاج إلى استخدام إعداد \"publicPath\": رجاءً راجع ويكي رفل للحصول على المساعدة.\nerror-wasm-mime-type =\n    واجه رفل مشكلة كبيرة أثناء محاولة التهيئة.\n    خادوم الويب هذا لا يخدم ملفات \". wasm\" مع نوع MIME الصحيح.\n    إذا كنت مسؤول الخادم، يرجى مراجعة ويكي رفل للحصول على المساعدة.\nerror-invalid-swf =\n    لا يمكن لرفل تحليل الملف المطلوب.\n    السبب الأكثر إحتمالاً هو أن الملف المطلوب ليس صالحًا.\nerror-swf-fetch =\n    فشل رفل في تحميل ملف فلاش SWF.\n    السبب الأكثر احتمالًا هو أن الملف لم يعد موجودًا، لذلك لا يوجد شيء ليحمله رفل.\n    حاول الاتصال بمسؤول الموقع للحصول على المساعدة.\nerror-swf-cors =\n    فشل رفل في تحميل ملف فلاش SWF.\n    من المحتمل أن إحضار الملف قد حُظِر بواسطة سياسة CORS.\n    إذا كنت مسؤول الخادم، يرجى مراجعة رفل ويكي للحصول على المساعدة.\nerror-wasm-cors =\n    فشل رفل في تحميل مكون ملف \".wasm\" المطلوب.\n    من المحتمل أن إحضار الملف قد حُظِر بواسطة سياسة CORS.\n    إذا كنت مسؤول الخادم، يرجى مراجعة رفل ويكي للحصول على المساعدة.\nerror-wasm-invalid =\n    واجه رفل مشكلة كبيرة أثناء محاولة التهيئة.\n    يبدو أن هذه الصفحة تحتوي على ملفات مفقودة أو غير صالحة لتشغيل رفل.\n    إذا كنت مسؤول الخادم، يرجى مراجعة ويكي رفل للحصول على المساعدة.\nerror-wasm-download =\n    واجه رفل مشكلة كبيرة أثناء محاولتها التهيئة.\n    هذا يمكن أن يحل نفسه في كثير من الأحيان، لذلك يمكنك محاولة إعادة تحميل الصفحة.\n    وإلا يرجى الاتصال بمدير الموقع.\nerror-wasm-disabled-on-edge =\n    فشل Ruffle في تحميل مكون الملف \".wasm\" المطلوب.\n    لإصلاح هذه المشكلة، حاول فتح إعدادات متصفحك، ثم إنقر فوق \"الخصوصية، البحث، الخدمات\"، والتمرير لأسفل، وإيقاف \"تعزيز أمانك على الويب\".\n    هذا سيسمح لمتصفحك بتحميل الملفات \".wasm\" المطلوبة.\n    إذا إستمرت المشكلة، قد تحتاج إلى إستخدام متصفح أخر.\nerror-wasm-unsupported-browser =\n    لا يدعم المتصفح الذي تستخدمه امتدادات WebAssembly الذي يتطلبه رفل لتشغيله.\n    رجاءً انتقل لمتصفح داعم.\n    يمكنك إيجاد لائحة للمتصفحات الداعمة في الويكي.\nerror-javascript-conflict =\n    واجه رفل مشكلة كبيرة أثناء محاولة التهيئة.\n    يبدو أن هذه الصفحة تستخدم كود جافا سكريبت الذي يتعارض مع رفل.\n    إذا كنت مسؤول الخادم، فإننا ندعوك إلى محاولة تحميل الملف على صفحة فارغة.\nerror-javascript-conflict-outdated = يمكنك أيضًا محاولة تحميل نسخة أحدث من رفل التي قد تحل المشكلة (النسخة الحالية قديمة: { $buildDate }).\nerror-csp-conflict =\n    واجه Ruffle مشكلة كبيرة أثناء محاولة التهيئة.\n    لا تسمح سياسة أمان المحتوى لخادم الويب هذا بتشغيل مكون \".wasm\" المطلوب.\n    إذا كنت مسؤول الخادم، يرجى الرجوع إلى ويكي Ruffle للحصول على المساعدة.\nerror-unknown =\n    واجه رفل مشكلة كبيرة أثناء محاولة عرض محتوى الفلاش هذا.\n    { $outdated ->\n        [true] إذا كنت مسؤول الخادم، يرجى محاولة تحميل إصدار أحدث من رفل (النسخة الحالية قديمة: { $buildDate }).\n       *[false] ليس من المفترض أن يحدث هذا، لذلك نحن نقدر حقًا إذا بلغت عن الخطأ!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = هل أنت متأكد أنك تريد حذف ملف الحفظ هذا؟\nsave-reload-prompt =\n    الطريقة الوحيدة لـ { $action ->\n        [delete] حذف\n       *[replace] إستبدال\n    } ملف الحفظ هذا دون تعارض محتمل هي إعادة تحميل هذه الصفحة. هل ترغب في المتابعة على أي حال؟\nsave-download = حمّل\nsave-replace = إستبدل\nsave-delete = إحذف\nsave-backup-all = حمّل جميع ملفات الحفظ\n",
    "volume-controls.ftl": "volume-controls-mute = إكتم\nvolume-controls-unmute = ألغِ الكتم\n"
  },
  "bs-BA": {
    "context_menu.ftl": "context-menu-download-swf = Preuzmite .swf datoteku\ncontext-menu-copy-debug-info = Kopiraj informacije o otklanjanju grešaka\ncontext-menu-open-save-manager = Otvori upravitelj spremanja\ncontext-menu-about-ruffle =\n    { $flavor ->\n    [extension] O ekstenziji Ruffle-a ({ $version })\n    *[other] O Ruffle-u ({ $version })\n    }\ncontext-menu-hide = Sakrij ovaj meni\ncontext-menu-exit-fullscreen = Izlaz iz režima punog ekrana\ncontext-menu-enter-fullscreen = Pređi na cijeli ekran\ncontext-menu-volume-controls = Kontrole jačine zvuka\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle nije mogao pokrenuti Flash ugrađen na ovoj stranici.\n    Možete pokušati otvoriti datoteku u zasebnoj kartici kako biste izbjegli ovaj problem.\nmessage-restored-from-bfcache =\n    Vaš preglednik je vratio ovaj Flash sadržaj iz prethodne sesije.\n    Molimo vas da ponovo učitate stranicu za novi početak.\npanic-title = Nešto je pošlo po zlu :(\nmore-info = Dodatne informacije\nrun-anyway = Ipak pokreni\ncontinue = Nastavi\nreport-bug = Prijavi grešku\nupdate-ruffle = Ažuriraj Ruffle\nruffle-demo = Web probna verzija\nruffle-desktop = Desktop aplikacija\nruffle-wiki = Pogledaj Ruffle Wiki\nenable-hardware-acceleration = Izgleda da je hardversko ubrzanje onemogućeno. Iako Ruffle možda radi, moguće je da je vrlo spor. Možete saznati kako omogućiti hardversko ubrzanje slijedeći link ispod:\nenable-hardware-acceleration-link = Često postavljana pitanja - Hardversko ubrzanje u Chromeu\nview-error-details = Prikaži detalje greške\nopen-in-new-tab = Otvori u novoj kartici\nclick-to-unmute = Kliknite da biste uključili zvuk\nclipboard-message-title = Kopiranje i naljepljivanje u Ruffle-u\nclipboard-message-description =\n    { $variant ->\n    *[unsupported] Vaš preglednik ne podržava potpuni pristup međuspremniku,\n    [access-denied] Pristup međuspremniku je odbijen,\n    } ali uvijek možete koristiti ove prečice:\nclipboard-message-copy = { \" \" } za kopiranje\nclipboard-message-cut = { \" \" } za isijecanje\nclipboard-message-paste = { \" \" } za lijepljenje\nerror-canvas-reload = Nije moguće ponovo učitati renderer kada je renderer već u upotrebi.\nerror-file-protocol =\n    Izgleda da koristite Ruffle na protokolu \"file:\".\n    Ovo ne funkcioniše jer preglednici blokiraju mnoge funkcije iz sigurnosnih razloga.\n    Umjesto toga, preporučujemo vam da postavite lokalni server ili koristite web probnu verziju ili aplikaciju.\nerror-javascript-config =\n    Ruffle je naišao na ozbiljan problem zbog pogrešne konfiguracije JavaScript-a.\n    Ako ste administrator servera, preporučujemo vam da provjerite detalje greške kako biste saznali koji parametar uzrokuje problem. Također možete konsultovati Ruffle wiki za pomoć.\nerror-wasm-not-found =\n    Ruffle nije uspio učitati potrebnu komponentu datoteke \".wasm\".\n    Ako ste administrator servera, provjerite je li datoteka ispravno otpremljena.\n    Ako problem i dalje postoji, možda ćete morati koristiti postavku \"publicPath\": obratite se Ruffle wiki stranici za pomoć.\nerror-wasm-mime-type =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja inicijalizacije.\n    Ovaj web server ne poslužuje \".wasm\" datoteke s ispravnim MIME tipom.\n    Ako ste administrator servera, molimo vas da se obratite Ruffle wiki stranici za pomoć.\nerror-invalid-swf =\n    Ruffle ne može analizirati traženu datoteku.\n    Najvjerovatniji razlog je taj što tražena datoteka nije važeći SWF.\nerror-swf-fetch =\n    Ruffle nije uspio učitati Flash SWF datoteku.\n    Najvjerovatniji razlog je taj što datoteka više ne postoji, tako da Ruffle nema šta učitati.\n    Pokušajte kontaktirati administratora web stranice za pomoć.\nerror-swf-cors =\n    Ruffle nije uspio učitati Flash SWF datoteku.\n    Pristup za preuzimanje je vjerovatno blokiran CORS politikom.\n    Ako ste administrator servera, obratite se Ruffle wiki stranici za pomoć.\nerror-wasm-cors =\n    Ruffle nije uspio učitati potrebnu komponentu datoteke \".wasm\".\n    Pristup dohvatu je vjerovatno blokiran CORS politikom.\n    Ako ste administrator servera, obratite se Ruffle wiki stranici za pomoć.\nerror-wasm-invalid =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja inicijalizacije.\n    Izgleda da ovoj stranici nedostaju ili su datoteke nevažeće za pokretanje Rufflea.\n    Ako ste administrator servera, pogledajte Ruffle wiki za pomoć.\nerror-wasm-download =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja inicijalizacije.\n    Ovo se često može riješiti jednostavnim ponovnim učitavanjem stranice.\n    U suprotnom, kontaktirajte administratora stranice.\nerror-wasm-disabled-on-edge =\n    Ruffle nije uspio učitati potrebnu komponentu datoteke \".wasm\".\n    Da biste riješili ovaj problem, pokušajte otvoriti postavke preglednika, kliknuti na \"Privatnost, pretraga i usluge\", pomaknuti se prema dolje i isključiti \"Poboljšanje web sigurnosti\".\n    Ovo će omogućiti vašem pregledniku da učita potrebne datoteke \".wasm\".\n    Ako problem i dalje postoji, možda ćete morati koristiti drugi preglednik.\nerror-wasm-unsupported-browser =\n    Preglednik koji koristite ne podržava WebAssembly ekstenzije potrebne za rad Ruffle-a.\n    Molimo vas da pređete na podržani preglednik.\n    Popis podržanih preglednika možete pronaći na Wiki stranici.\nerror-javascript-conflict =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja inicijalizacije.\n    Izgleda da ova stranica koristi JavaScript kod koji je u sukobu sa Ruffleom.\n    Ako ste administrator servera, pozivamo vas da pokušate otpremiti datoteku na praznu stranicu.\nerror-javascript-conflict-outdated = Također možete pokušati prenijeti noviju verziju Rufflea koja bi mogla riješiti problem (trenutna verzija je zastarjela: { $buildDate }).\nerror-csp-conflict =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja inicijalizacije.\n    Politike sigurnosti sadržaja ovog web servera ne dozvoljavaju pokretanje potrebne komponente \".wasm\".\n    Ako ste administrator servera, obratite se Ruffle wiki stranici za pomoć.\nerror-unknown =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja prikazivanja ovog Flash sadržaja.\n    { $outdated ->\n    [true] Ako ste administrator servera, pokušajte prenijeti noviju verziju Rufflea (trenutna verzija je zastarjela: { $buildDate }).\n    *[false] Ovo se ne bi trebalo dogoditi, pa bismo vam bili jako zahvalni ako biste prijavili grešku!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Jeste li sigurni da želite izbrisati ovu sačuvanu datoteku?\nsave-reload-prompt =\n    Jedini način da { $action ->\n    [delete] izbrišete\n    *[replace] zamijenite\n    } ovu sačuvanu datoteku bez potencijalnog konflikta je da ponovo učitate ovaj sadržaj. Želite li ipak nastaviti?\nsave-download = Preuzmite\nsave-replace = Zamijeni\nsave-delete = Izbriši\nsave-backup-all = Preuzmi sve sačuvane datoteke\n",
    "volume-controls.ftl": "volume-controls-mute = Isključi zvuk\nvolume-controls-unmute = Uključi zvuk\n"
  },
  "ca-ES": {
    "context_menu.ftl": "context-menu-download-swf = Baixa el fitxer .swf\ncontext-menu-copy-debug-info = Copia la informació de depuració\ncontext-menu-open-save-manager = Obre el gestor d'emmagatzematge\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Quant a l'extensió de Ruffle ({ $version })\n       *[other] Quant a Ruffle ({ $version })\n    }\ncontext-menu-hide = Amaga aquest menú\ncontext-menu-exit-fullscreen = Surt de la pantalla completa\ncontext-menu-enter-fullscreen = Pantalla completa\ncontext-menu-volume-controls = Controls de volum\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle no ha pogut executar el contingut Flash incrustat en aquesta pàgina.\n    Podeu provar d'obrir el fitxer en una pestanya a part per evitar aquest problema.\npanic-title = Alguna cosa ha fallat :(\nmore-info = Més informació\nrun-anyway = Reprodueix igualment\ncontinue = Continua\nreport-bug = Informa d'un error\nupdate-ruffle = Actualitza Ruffle\nruffle-demo = Demostració web\nruffle-desktop = Aplicació d'escriptori\nruffle-wiki = Obre la wiki de Ruffle\nenable-hardware-acceleration-link = FAQ - Acceleració per Hardware a Chrome\nview-error-details = Mostra detalls de l'error\nopen-in-new-tab = Obre en una pestanya nova\nclick-to-unmute = Feu clic per activar el so\nclipboard-message-title = Copiar i enganxar en Ruffle\nerror-file-protocol =\n    Sembla que esteu executant Ruffle al protocol \"file:\".\n    Això no funcionarà perquè els navegadors bloquegen moltes característiques per raons de seguretat. En comptes d'això, us suggerim que configureu un servidor local o bé utilitzeu la demostració web o l'aplicació d'escriptori.\nerror-javascript-config =\n    Ruffle ha topat amb un problema greu a causa d'una configuració JavaScript errònia.\n    Si sou l'administrador del servidor, us suggerim que comproveu els detalls de l'error per determinar el paràmetre culpable.\n    També podeu consultar la wiki del Ruffle per obtenir ajuda.\nerror-wasm-not-found =\n    Ruffle no ha pogut carregar el component de fitxer \".wasm\" necessari.\n    Si sou l'administrador del servidor, si us plau, comproveu que el fitxer ha estat carregat correctament.\n    Si el problema continua, és possible que hàgiu d'utilitzar el parámetre \"publicPath\": us preguem que consulteu la wiki de Ruffle per obtenir ajuda.\nerror-wasm-mime-type =\n    Ruffle ha topat amb un problema greu mentre provava d'inicialitzar-se.\n    Aquest servidor no està servint els fitxers \".wasm\" amb el tipus MIME adequat.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki de Ruffle per obtenir ajuda.\nerror-invalid-swf =\n    Ruffle no ha pogut llegir el fitxer sol·licitat.\n    La raó més probable és que no sigui un fitxer SWF vàlid.\nerror-swf-fetch =\n    Ruffle no ha pogut carregar el fitxer SWF Flash.\n    La raó més probable és que el fitxer ja no existeixi, així que no hi ha res que el Ruffle pugui carregar.\n    Proveu de contactar a l'administrador del lloc per obtenir ajuda.\nerror-swf-cors =\n    Ruffle no ha pogut carregar el fitxer SWF Flash.\n    És probable que l'accés a la càrrega hagi estat denegat per una política CORS.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki del Ruffle per obtenir ajuda.\nerror-wasm-cors =\n    Ruffle no ha pogut carregar el component de fitxer \".wasm\" necessari.\n    És probable que l'accés a la càrrega hagi estat denegat per una política CORS.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki del Ruffle per obtenir ajuda.\nerror-wasm-invalid =\n    Ruffle ha topat amb un problema greu mentre provava d'inicialitzar-se.\n    Sembla que a aquest lloc li manquen fitxers o aquests no són vàlids per a l'execució de Ruffle.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki de Ruffle per obtenir ajuda.\nerror-wasm-download =\n    Ruffle ha topat amb un problema greu mentre provava d'inicialitzar-se.\n    Això sovint això pot resoldre's sol, així que podeu provar de recarregar la pàgina.\n    En cas contrari, us preguem que contacteu l'administrador del lloc.\nerror-wasm-disabled-on-edge =\n    Ruffle no ha pogut carregar el component de fitxer \".wasm\" necessari.\n    Per a arreglar-ho, proveu d'obrir els paràmetres del navegador, feu clic sobre \"Privadesa, cerca i serveis\", i desactiveu \"Prevenció de seguiment\".\n    Això permetrà que el vostre navegador carregui els fitxers \".wasm\" necessaris.\n    Si el problema continua, possiblement haureu d'utilitzar un altre navegador.\nerror-javascript-conflict =\n    Ruffle ha topat amb un problema greu mentre provava d'inicialitzar-se.\n    Sembla que aquest lloc fa servir codi JavaScript que entra en conflicte amb Ruffle.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki de Ruffle per obtenir ajuda.\nerror-javascript-conflict-outdated = També podeu provar de carregar una versió més recent de Ruffle que podria resoldre el problema (la compilació actual està desactualitzada: { $buildDate }).\nerror-csp-conflict =\n    Ruffle ha topat amb un problema greu mentre provava d'inicialitzar-se.\n    La política de seguretat del contingut (CSP) no permet l'execució del component \".wasm\" necessari.\n    Si sou l'administrador del servidor, us preguem que consulteu la wiki de Ruffle per obtenir ajuda.\nerror-unknown =\n    Ruffle ha topat amb un problema greu mentre provava de mostrar aquest contingut Flash.\n    { $outdated ->\n        [true] Si sou l'administrador del servidor, us preguem que proveu de carregar una versió més recent de Ruffle (la compilació actual està desactualitzada: { $buildDate }).\n       *[false] Això no hauria d'haver passat, així que us agrairíem molt que n'informéssiu l'error!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Segur que vols esborrar aquest fitxer desat?\nsave-reload-prompt =\n    L'única forma d{ $action ->\n        [delete] 'eliminar\n       *[replace] e substituir\n    } aquest fitxer desat sense crear un potencial conflicte és recarregant el contingut. Voleu continuar igualment?\nsave-download = Baixa\nsave-replace = Substitueix\nsave-delete = Elimina\nsave-backup-all = Baixa tots els fitxers desats\n",
    "volume-controls.ftl": "volume-controls-mute = Silenci\n"
  },
  "cs-CZ": {
    "context_menu.ftl": "context-menu-download-swf = Stáhnout .swf\ncontext-menu-copy-debug-info = Zkopírovat debug info\ncontext-menu-open-save-manager = Otevřít správce uložení\ncontext-menu-about-ruffle =\n    { $flavor ->\n         [extension] O Ruffle rozšíření ({ $version })\n        *[other] O Ruffle ({ $version })\n    }\ncontext-menu-hide = Skrýt menu\ncontext-menu-exit-fullscreen = Ukončit režim celé obrazovky\ncontext-menu-enter-fullscreen = Přejít do režimu celé obrazovky\ncontext-menu-volume-controls = Ovládání hlasitosti\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle nemohl spustit Flash vložený na této stránce.\n    Můžete se pokusit otevřít soubor na samostatné kartě, abyste se vyhnuli tomuto problému.\nmessage-restored-from-bfcache =\n    Váš prohlížeč obnovil tento Flash obsah z předchozí relace.\n    Chcete-li začít znovu, znovu načtěte stránku.\npanic-title = Něco se pokazilo :(\nmore-info = Další informace\nrun-anyway = Přesto spustit\ncontinue = Pokračovat\nreport-bug = Nahlásit chybu\nupdate-ruffle = Aktualizovat Ruffle\nruffle-demo = Web Demo\nruffle-desktop = Desktopová aplikace\nruffle-wiki = Zobrazit Ruffle Wiki\nenable-hardware-acceleration = Zdá se, že hardwarová akcelerace je vypnutá. I když Ruffle funguje správně, může být nepřiměřeně pomalý. Jak povolit hardwarovou akceleraci zjistíte na tomto odkazu:\nenable-hardware-acceleration-link = Časté dotazy - Hardwarová akcelerace Chrome\nview-error-details = Zobrazit podrobnosti o chybě\nopen-in-new-tab = Otevřít na nové kartě\nclick-to-unmute = Kliknutím zrušíte ztlumení\nclipboard-message-title = Kopírování a vkládání v Ruffle\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] Váš prohlížeč nepodporuje plný přístup ke schránce,\n        [access-denied] Přístup ke schránce byl odepřen,\n    } ale místo toho můžete vždy použít tyto zkratky:\nclipboard-message-copy = { \" \" } pro kopírování\nclipboard-message-cut = { \" \" } pro vystřihování\nclipboard-message-paste = { \" \" } pro vkládání\nerror-canvas-reload = Nelze znovu načíst pomocí vykreslovače plátna, pokud je vykreslovač plátna již používán.\nerror-file-protocol =\n    Zdá se, že používáte Ruffle na protokolu \"file:\".\n    To není možné, protože prohlížeče blokují fungování mnoha funkcí z bezpečnostních důvodů.\n    Namísto toho vám doporučujeme nastavit lokální server nebo použít web demo či desktopovou aplikaci.\nerror-javascript-config =\n    Ruffle narazil na problém v důsledku nesprávné konfigurace JavaScriptu.\n    Pokud jste správcem serveru, doporučujeme vám zkontrolovat podrobnosti o chybě, abyste zjistili, který parametr je vadný.\n    Pomoc můžete získat také na wiki Ruffle.\nerror-wasm-not-found =\n    Ruffle se nepodařilo načíst požadovanou komponentu souboru „.wasm“.\n    Pokud jste správcem serveru, zkontrolujte, zda byl soubor správně nahrán.\n    Pokud problém přetrvává, možná budete muset použít nastavení „publicPath“: pomoc naleznete na wiki Ruffle.\nerror-wasm-mime-type =\n    Ruffle narazil na problém při pokusu o inicializaci.\n    Tento webový server neposkytuje soubory „.wasm“ se správným typem MIME.\n    Pokud jste správcem serveru, nápovědu najdete na Ruffle wiki.\nerror-invalid-swf =\n    Ruffle nemůže zpracovat požadovaný soubor.\n    Nejpravděpodobnějším důvodem je, že požadovaný soubor není platným souborem SWF.\nerror-swf-fetch =\n    Ruffle se nepodařilo načíst SWF soubor Flash.\n    Nejpravděpodobnějším důvodem je, že soubor již neexistuje, takže Ruffle nemá co načíst.\n    Zkuste požádat o pomoc správce webu.\nerror-swf-cors =\n    Ruffle se nepodařilo načíst SWF soubor Flash.\n    Přístup k načítání byl pravděpodobně zablokován politikou CORS.\n    Pokud jste správcem serveru, nápovědu najdete na Ruffle wiki.\nerror-wasm-cors =\n    Ruffle se nepodařilo načíst požadovanou komponentu souboru „.wasm“.\n    Přístup k načítání byl pravděpodobně zablokován politikou CORS.\n    Pokud jste správcem serveru, nápovědu najdete na Ruffle wiki.\nerror-wasm-invalid =\n    Ruffle narazil na problém při pokusu o inicializaci.\n    Zdá se, že na této stránce chybí nebo jsou neplatné soubory ke spuštění Ruffle.\n    Pokud jste správcem serveru, nápovědu najdete na Ruffle wiki.\nerror-wasm-download =\n    Ruffle narazil na problém při pokusu o inicializaci.\n    Problém se může vyřešit i sám, takže můžete zkusit stránku načíst znovu.\n    V opačném případě kontaktujte administrátora stránky.\nerror-wasm-disabled-on-edge =\n    Ruffle se nepodařilo načíst požadovanou komponentu souboru „.wasm“.\n    Chcete-li tento problém vyřešit, zkuste otevřít nastavení prohlížeče, klikněte na položku „Ochrana osobních údajů, vyhledávání a služby“, přejděte dolů a vypněte možnost „Zvyšte svou bezpečnost na webu“.\n    Vašemu prohlížeči to umožní načíst požadované soubory „.wasm“.\n    Pokud problém přetrvává, budete možná muset použít jiný prohlížeč.\nerror-wasm-unsupported-browser =\n    Prohlížeč, který používáte, nepodporuje rozšíření WebAssembly, které Ruffle vyžaduje ke spuštění.\n    Přejděte na podporovaný prohlížeč.\n    Seznam podporovaných prohlížečů naleznete na Wiki.\nerror-javascript-conflict =\n    Ruffle narazil na problém při pokusu o inicializaci.\n    Zdá se, že tato stránka používá kód JavaScript, který je v konfliktu s Ruffle.\n    Pokud jste správcem serveru, doporučujeme vám zkusit načíst soubor na prázdnou stránku.\nerror-javascript-conflict-outdated = Můžete se také pokusit nahrát novější verzi Ruffle, která může daný problém vyřešit (aktuální build je zastaralý: { $buildDate }).\nerror-csp-conflict =\n    Ruffle narazil na problém při pokusu o inicializaci.\n    Zásady zabezpečení obsahu tohoto webového serveru nepovolují spuštění požadované komponenty „.wasm“.\n    Pokud jste správcem serveru, nápovědu najdete na Ruffle wiki.\nerror-unknown =\n    Ruffle narazil na problém při pokusu zobrazit tento Flash obsah.\n    { $outdated ->\n          [true] Pokud jste správcem serveru, zkuste nahrát novější verzi Ruffle (aktuální build je zastaralý: { $buildDate }).\n         *[false] Toto by se nemělo stát, takže bychom opravdu ocenili, kdybyste mohli nahlásit chybu!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Opravdu chcete odstranit tento soubor s uloženými pozicemi?\nsave-reload-prompt =\n    Jediný způsob, jak { $action ->\n          [delete] vymazat\n         *[replace] nahradit\n    } tento soubor s uloženými pozicemi bez potenciálního konfliktu je opětovné načtení tohoto obsahu. Chcete přesto pokračovat?\nsave-download = Stáhnout\nsave-replace = Nahradit\nsave-delete = Vymazat\nsave-backup-all = Stáhnout všechny soubory s uloženými pozicemi\n",
    "volume-controls.ftl": "volume-controls-mute = Ztlumit\nvolume-controls-unmute = Zrušit ztlumení\n"
  },
  "de-DE": {
    "context_menu.ftl": "context-menu-download-swf = .swf herunterladen\ncontext-menu-copy-debug-info = Debug-Info kopieren\ncontext-menu-open-save-manager = Dateimanager öffnen\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Über Ruffle Erweiterung ({ $version })\n       *[other] Über Ruffle ({ $version })\n    }\ncontext-menu-hide = Menü ausblenden\ncontext-menu-exit-fullscreen = Vollbild verlassen\ncontext-menu-enter-fullscreen = Vollbildmodus aktivieren\ncontext-menu-volume-controls = Lautstärke einstellen\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle konnte den Flash in dieser Seite nicht ausführen.\n    Du kannst versuchen, die Datei in einem separaten Tab zu öffnen, um dieses Problem zu umgehen.\nmessage-restored-from-bfcache = Dein Browser hat den Flash-Inhalt aus einer vorherigen Sitzung wiederhergestellt. Um von neuem zu beginnen, lade die Seite neu.\npanic-title = Etwas ist schief gelaufen\nmore-info = Weitere Informationen\nrun-anyway = Trotzdem ausführen\ncontinue = Fortfahren\nreport-bug = Fehler melden\nupdate-ruffle = Ruffle aktuallisieren\nruffle-demo = Web-Demo\nruffle-desktop = Desktop-Anwendung\nruffle-wiki = Ruffle-Wiki anzeigen\nenable-hardware-acceleration = Es sieht so aus, als ob die Hardwarebeschleunigung deaktiviert ist. Ruffle kann zwar funktionieren, könnte aber sehr langsam sein. Wie Sie die Hardwarebeschleunigung aktivieren können, erfahren Sie unter dem folgenden Link:\nenable-hardware-acceleration-link = FAQ - Chrome Hardwarebeschleunigung\nview-error-details = Fehlerdetails anzeigen\nopen-in-new-tab = In einem neuen Tab öffnen\nclick-to-unmute = Klicke zum Entmuten\nclipboard-message-title = Kopieren und Einfügen in Ruffle\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] Dein Browser unterstützt keinen vollständigen Zugriff auf die Zwischenablage,\n        [access-denied] Zugriff auf die Zwischenablage wurde verweigert,\n    } aber du kannst stattdessen auch diese Tastenkombinationen verwenden:\nclipboard-message-copy = { \" \" } zum Kopieren\nclipboard-message-cut = { \" \" } zum Ausschneiden\nclipboard-message-paste = { \" \" } zum Einfügen\nerror-canvas-reload = Canvas Renderer kann nicht neu geladen werden, während er in Verwendung ist.\nerror-file-protocol =\n    Es scheint, dass Sie Ruffle auf dem \"file:\"-Protokoll ausführen.\n    Jedoch werden aus Sicherheitsgründen viele Funktionen vom Browser blockiert, weswegen die Datei nicht geladen werden kann.\n    Setzen Sie stattdessen einen lokalen Server auf, verwenden Sie die Webdemo oder die Desktop-Anwendung.\nerror-javascript-config =\n    Ruffle ist aufgrund einer falschen JavaScript-Konfiguration auf ein Problem gestoßen.\n    Wenn du der Server-Administrator bist, laden wir dich ein, die Fehlerdetails zu überprüfen, um herauszufinden, welcher Parameter fehlerhaft ist.\n    Sie können auch das Ruffle-Wiki für Hilfe konsultieren.\nerror-wasm-not-found =\n    Ruffle konnte die erforderliche \".wasm\"-Datei-Komponente nicht laden.\n    Wenn Sie der Server-Administrator sind, stellen Sie bitte sicher, dass die Datei korrekt hochgeladen wurde.\n    Wenn das Problem weiterhin besteht, müssen Sie unter Umständen die \"publicPath\"-Einstellung verwenden: Bitte konsultieren Sie das Ruffle-Wiki für Hilfe.\nerror-wasm-mime-type =\n    Ruffle ist auf ein Fehler beim Initialisieren gestoßen.\n    Dieser Webserver dient nicht \". asm\"-Dateien mit dem korrekten MIME-Typ.\n    Wenn Sie der Server-Administrator sind, konsultieren Sie bitte das Ruffle-Wiki für Hilfe.\nerror-invalid-swf =\n    Ruffle konnte die angegebene Datei nicht lesen.\n    Am wahrscheinlichsten ist die angegebene Datei keine gültige SWF.\nerror-swf-fetch =\n    Ruffle konnte die Flash-SWF-Datei nicht laden.\n    Der wahrscheinlichste Grund ist, dass die Datei nicht mehr existiert, so dass Ruffle nicht geladen werden kann.\n    Kontaktieren Sie den Website-Administrator für Hilfe.\nerror-swf-cors =\n    Ruffle konnte die Flash-SWF-Datei nicht laden.\n    Der Zugriff auf den Abruf wurde wahrscheinlich durch die CORS-Richtlinie blockiert.\n    Wenn Sie der Server-Administrator sind, konsultieren Sie bitte das Ruffle-Wiki für Hilfe.\nerror-wasm-cors =\n    Ruffle konnte die Flash-SWF-Datei nicht laden.\n    Der Zugriff auf den Abruf wurde wahrscheinlich durch die CORS-Richtlinie blockiert.\n    Wenn Sie der Server-Administrator sind, konsultieren Sie bitte das Ruffle-Wiki für Hilfe.\nerror-wasm-invalid =\n    Ruffle ist auf ein Fehler beim Initialisieren gestoßen.\n    Dieser Webserver dient nicht \". asm\"-Dateien mit dem korrekten MIME-Typ.\n    Wenn Sie der Server-Administrator sind, konsultieren Sie bitte das Ruffle-Wiki für Hilfe.\nerror-wasm-download =\n    Ruffle ist auf ein Fehler beim Initialisieren gestoßen.\n    Dies kann sich oft selbst beheben, so dass Sie versuchen können, die Seite neu zu laden.\n    Andernfalls kontaktieren Sie bitte den Website-Administrator.\nerror-wasm-disabled-on-edge =\n    Ruffle konnte die erforderliche \".wasm\"-Datei-Komponente nicht laden.\n    Um dies zu beheben, versuche die Einstellungen deines Browsers zu öffnen, klicke auf \"Privatsphäre, Suche und Dienste\", scrollen nach unten und schalte \"Verbessere deine Sicherheit im Web\" aus.\n    Dies erlaubt Ihrem Browser die erforderlichen \".wasm\"-Dateien zu laden.\n    Wenn das Problem weiterhin besteht, müssen Sie möglicherweise einen anderen Browser verwenden.\nerror-wasm-unsupported-browser =\n    Der verwendete Browser unterstützt die WebAssembly Erweiterungen nicht welche Ruffle zur Ausführung benötigt.\n    Bitte verwende einen unterstützen Browser.\n    Du kannst eine Liste der unterstützten Browser in der Wiki finden.\nerror-javascript-conflict =\n    Ruffle ist auf ein Fehler beim Initialisieren gestoßen.\n    Es scheint, als ob diese Seite JavaScript-Code verwendet, der mit Ruffle kollidiert.\n    Wenn Sie der Server-Administrator sind, laden wir Sie ein, die Datei auf einer leeren Seite zu laden.\nerror-javascript-conflict-outdated = Du kannst auch versuchen, eine neuere Version von Ruffle hochzuladen, die das Problem umgehen könnte (aktuelle Version ist veraltet: { $buildDate }).\nerror-csp-conflict =\n    Ruffle ist auf ein Fehler beim Initialisieren gestoßen.\n    Dieser Webserver dient nicht \". asm\"-Dateien mit dem korrekten MIME-Typ.\n    Wenn Sie der Server-Administrator sind, konsultieren Sie bitte das Ruffle-Wiki für Hilfe.\nerror-unknown =\n    Bei dem Versuch, diesen Flash-Inhalt anzuzeigen, ist Ruffle auf ein großes Problem gestoßen.\n    { $outdated ->\n        [true] Wenn Sie der Server-Administrator sind, Bitte versuchen Sie, eine neuere Version von Ruffle hochzuladen (aktuelle Version ist veraltet: { $buildDate }).\n       *[false] Dies soll nicht passieren, deshalb würden wir uns sehr darüber freuen, wenn Sie einen Fehler melden könnten!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Sind Sie sicher, dass Sie diese Speicherdatei löschen möchten?\nsave-reload-prompt =\n    Der einzige Weg zu { $action ->\n        [delete] löschen\n       *[replace] ersetzen\n    } diese Speicherdatei ohne möglichen Konflikt ist das erneute Laden dieses Inhalts. Möchten Sie trotzdem fortfahren?\nsave-download = Herunterladen\nsave-replace = Ersetzen\nsave-delete = Löschen\nsave-backup-all = Alle gespeicherten Dateien herunterladen\n",
    "volume-controls.ftl": "volume-controls-mute = Stummschalten\nvolume-controls-unmute = Stummschaltung aufheben\n"
  },
  "en-US": {
    "context_menu.ftl": "context-menu-download-swf = Download .swf\ncontext-menu-copy-debug-info = Copy Debug Info\ncontext-menu-open-save-manager = Open Save Manager\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] About Ruffle Extension ({$version})\n        *[other] About Ruffle ({$version})\n    }\ncontext-menu-hide = Hide This Menu\ncontext-menu-exit-fullscreen = Exit Full Screen\ncontext-menu-enter-fullscreen = Enter Full Screen\ncontext-menu-volume-controls = Volume Controls\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle wasn't able to run the Flash embedded in this page.\n    You can try to open the file in a separate tab, to sidestep this issue.\nmessage-restored-from-bfcache =\n    Your browser restored this Flash content from a previous session.\n    To start fresh, reload the page.\npanic-title = Something went wrong :(\nmore-info = More info\nrun-anyway = Run anyway\ncontinue = Continue\nreport-bug = Report Bug\nupdate-ruffle = Update Ruffle\nruffle-demo = Web Demo\nruffle-desktop = Desktop Application\nruffle-wiki = View Ruffle Wiki\nenable-hardware-acceleration = It looks like hardware acceleration is disabled. While Ruffle may work, it could be very slow. You can find out how to enable hardware acceleration by following the link below:\nenable-hardware-acceleration-link = FAQ - Chrome Hardware Acceleration\nview-error-details = View Error Details\nopen-in-new-tab = Open in a new tab\nclick-to-unmute = Click to unmute\nclipboard-message-title = Copying and pasting in Ruffle\nclipboard-message-description =\n    { $variant ->\n        *[unsupported] Your browser does not support full clipboard access,\n        [access-denied] Access to the clipboard has been denied,\n    } but you can always use these shortcuts instead:\nclipboard-message-copy = { \" \" } for copy\nclipboard-message-cut = { \" \" } for cut\nclipboard-message-paste = { \" \" } for paste\nerror-canvas-reload = Cannot reload with the canvas renderer when the canvas renderer is already in use.\nerror-file-protocol =\n    It appears you are running Ruffle on the \"file:\" protocol.\n    This doesn't work as browsers block many features from working for security reasons.\n    Instead, we invite you to setup a local server or either use the web demo or the desktop application.\nerror-javascript-config =\n    Ruffle has encountered a major issue due to an incorrect JavaScript configuration.\n    If you are the server administrator, we invite you to check the error details to find out which parameter is at fault.\n    You can also consult the Ruffle wiki for help.\nerror-wasm-not-found =\n    Ruffle failed to load the required \".wasm\" file component.\n    If you are the server administrator, please ensure the file has correctly been uploaded.\n    If the issue persists, you may need to use the \"publicPath\" setting: please consult the Ruffle wiki for help.\nerror-wasm-mime-type =\n    Ruffle has encountered a major issue whilst trying to initialize.\n    This web server is not serving \".wasm\" files with the correct MIME type.\n    If you are the server administrator, please consult the Ruffle wiki for help.\nerror-invalid-swf =\n    Ruffle cannot parse the requested file.\n    The most likely reason is that the requested file is not a valid SWF.\nerror-swf-fetch =\n    Ruffle failed to load the Flash SWF file.\n    The most likely reason is that the file no longer exists, so there is nothing for Ruffle to load.\n    Try contacting the website administrator for help.\nerror-swf-cors =\n    Ruffle failed to load the Flash SWF file.\n    Access to fetch has likely been blocked by CORS policy.\n    If you are the server administrator, please consult the Ruffle wiki for help.\nerror-wasm-cors =\n    Ruffle failed to load the required \".wasm\" file component.\n    Access to fetch has likely been blocked by CORS policy.\n    If you are the server administrator, please consult the Ruffle wiki for help.\nerror-wasm-invalid =\n    Ruffle has encountered a major issue whilst trying to initialize.\n    It seems like this page has missing or invalid files for running Ruffle.\n    If you are the server administrator, please consult the Ruffle wiki for help.\nerror-wasm-download =\n    Ruffle has encountered a major issue whilst trying to initialize.\n    This can often resolve itself, so you can try reloading the page.\n    Otherwise, please contact the website administrator.\nerror-wasm-disabled-on-edge =\n    Ruffle failed to load the required \".wasm\" file component.\n    To fix this, try opening your browser's settings, clicking \"Privacy, search, and services\", scrolling down, and turning off \"Enhance your security on the web\".\n    This will allow your browser to load the required \".wasm\" files.\n    If the issue persists, you might have to use a different browser.\nerror-wasm-unsupported-browser =\n    The browser you are using does not support the WebAssembly extensions Ruffle requires to run.\n    Please switch to a supported browser.\n    You can find a list of supported browsers on the Wiki.\nerror-javascript-conflict =\n    Ruffle has encountered a major issue whilst trying to initialize.\n    It seems like this page uses JavaScript code that conflicts with Ruffle.\n    If you are the server administrator, we invite you to try loading the file on a blank page.\nerror-javascript-conflict-outdated = You can also try to upload a more recent version of Ruffle that may circumvent the issue (current build is outdated: {$buildDate}).\nerror-csp-conflict =\n    Ruffle has encountered a major issue whilst trying to initialize.\n    This web server's Content Security Policy does not allow the required \".wasm\" component to run.\n    If you are the server administrator, please consult the Ruffle wiki for help.\nerror-unknown =\n    Ruffle has encountered a major issue whilst trying to display this Flash content.\n    {$outdated ->\n        [true] If you are the server administrator, please try to upload a more recent version of Ruffle (current build is outdated: {$buildDate}).\n        *[false] This isn't supposed to happen, so we'd really appreciate if you could file a bug!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Are you sure you want to delete this save file?\nsave-reload-prompt =\n    The only way to {$action ->\n    [delete] delete\n    *[replace] replace\n    } this save file without potential conflict is to reload this content. Do you wish to continue anyway?\nsave-download = Download\nsave-replace = Replace\nsave-delete = Delete\nsave-backup-all = Download all save files\n",
    "volume-controls.ftl": "volume-controls-mute = Mute\nvolume-controls-unmute = Unmute\n"
  },
  "eo-UY": {
    "context_menu.ftl": "",
    "messages.ftl": "",
    "save-manager.ftl": "",
    "volume-controls.ftl": ""
  },
  "es-ES": {
    "context_menu.ftl": "context-menu-download-swf = Descargar .swf\ncontext-menu-copy-debug-info = Copiar Información de depuración\ncontext-menu-open-save-manager = Abrir gestor de guardado\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Sobre la extensión de Ruffle ({ $version })\n       *[other] Sobre Ruffle ({ $version })\n    }\ncontext-menu-hide = Ocultar este menú\ncontext-menu-exit-fullscreen = Salir de pantalla completa\ncontext-menu-enter-fullscreen = Entrar a pantalla completa\ncontext-menu-volume-controls = Controles de volumen\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle no pudo ejecutar el Flash incrustado en esta página.\n    Puedes intentar abrir el archivo en una pestaña aparte, para evitar este problema.\nmessage-restored-from-bfcache =\n    Su navegador ha recuperado este contenido Flash de una sesión anterior.\n    Para empezar de cero, refresque la página.\npanic-title = Algo salió mal :(\nmore-info = Más info\nrun-anyway = Ejecutar de todos modos\ncontinue = Continuar\nreport-bug = Reportar un error\nupdate-ruffle = Actualizar Ruffle\nruffle-demo = Demostración de web\nruffle-desktop = Aplicación de desktop\nruffle-wiki = Ver la página wiki\nenable-hardware-acceleration = Al parecer, la aceleración de hardware está deshabilitada. Puede que Ruffle funcione, pero este podría funcionar muy lentamente. Puedes averiguar como habilitar aceleración de hardware presionando el enlace:\nenable-hardware-acceleration-link = Preguntas frecuentes sobre la aceleración de hardware en Chrome\nview-error-details = Ver los detalles del error\nopen-in-new-tab = Abrir en una pestaña nueva\nclick-to-unmute = Haz clic para dejar de silenciar\nclipboard-message-title = Para copiar y pegar en Ruffle\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] Este navegador no apoya acceso completo al portapapeles,\n        [access-denied] Se ha denegado el acceso al portapapeles,\n    } pero siempre se puede utilizar estos atajos:\nclipboard-message-copy = Para copiar\nclipboard-message-cut = Para cortar\nclipboard-message-paste = Para pegar\nerror-canvas-reload = No se puede recargar con el renderizado de lienzo cuando este ya está en uso.\nerror-file-protocol =\n    Parece que está ejecutando Ruffle en el protocolo \"archivo:\".\n    Esto no funciona porque los navegadores bloquean que muchas características funcionen por razones de seguridad.\n    En su lugar, le invitamos a configurar un servidor local o bien usar la demostración web o la aplicación de desktop.\nerror-javascript-config =\n    Ruffle ha encontrado un problema crítico debido a una configuración JavaScript incorrecta.\n    Si usted es el administrador del servidor, le invitamos a comprobar los detalles del error para averiguar qué parámetro está en falta.\n    También puedes consultar la wiki de Ruffle para obtener ayuda.\nerror-wasm-not-found =\n    Ruffle no pudo cargar el componente de archivo \".wasm\" requerido.\n    Si usted es el administrador del servidor, asegúrese de que el archivo ha sido subido correctamente.\n    Si el problema persiste, puede que necesite usar la configuración \"publicPath\": por favor consulte la wiki de Ruffle para obtener ayuda.\nerror-wasm-mime-type =\n    Ruffle ha encontrado un problema crítico al intentar inicializar.\n    Este servidor web no está sirviendo archivos wasm\" con el tipo MIME correcto.\n    Si usted es el administrador del servidor, consulte la wiki de Ruffle para obtener ayuda.\nerror-invalid-swf = Ruffle no puede analizar el archivo solicitado. La razón más probable es que no es un archivo válido SWF.\nerror-swf-fetch =\n    Ruffle no pudo cargar el archivo Flash SWF.\n    La razón más probable es que el archivo ya no existe, así que no hay nada para cargar Ruffle.\n    Intente ponerse en contacto con el administrador del sitio web para obtener ayuda.\nerror-swf-cors =\n    Ruffle no pudo cargar el archivo Flash SWF.\n    Es probable que el acceso a la búsqueda haya sido bloqueado por la política CORS.\n    Si usted es el administrador del servidor, consulte la wiki de Ruffle para obtener ayuda.\nerror-wasm-cors =\n    Ruffle no pudo cargar el archivo \".wasm.\"\n    Es probable que el acceso a la búsqueda o la llamada a la función fetch haya sido bloqueado por la política CORS.\n    Si usted es el administrador del servidor, consulte la wiki de Ruffle para obtener ayuda.\nerror-wasm-invalid =\n    Ruffle ha encontrado un problema crítico al intentar inicializar.\n    Este servidor web no está sirviendo archivos wasm\" con el tipo Mime correcto.\n    Si usted es el administrador del servidor, consulte la wiki de Ruffle para obtener ayuda.\nerror-wasm-download =\n    Ruffle ha encontrado un problema crítico mientras intentaba inicializarse.\n    Esto a menudo puede resolverse por sí mismo, así que puede intentar recargar la página.\n    De lo contrario, póngase en contacto con el administrador del sitio web.\nerror-wasm-disabled-on-edge =\n    Ruffle no pudo cargar el componente de archivo \".wasm\" requerido.\n    Para solucionar esto, intenta abrir la configuración de tu navegador, haciendo clic en \"Privacidad, búsqueda y servicios\", desplazándote y apagando \"Mejore su seguridad en la web\".\n    Esto permitirá a su navegador cargar los archivos \".wasm\" necesarios.\n    Si el problema persiste, puede que tenga que utilizar un navegador diferente.\nerror-wasm-unsupported-browser =\n    Este navegador no apoya las extensiones de WebAssembly que Ruffle requiere para ejecutar.\n    Por favor, cambia a un navegador apoyado.\n    Se puede ver una lista de navegadores apoyados en el Wiki.\nerror-javascript-conflict =\n    Ruffle ha encontrado un problema crítico mientras intentaba inicializarse.\n    Parece que esta página utiliza código JavaScript que entra en conflicto con Ruffle.\n    Si usted es el administrador del servidor, le invitamos a intentar cargar el archivo en una página en blanco.\nerror-javascript-conflict-outdated = También puedes intentar subir una versión más reciente de Ruffle que puede eludir el problema (la versión actual está desactualizada: { $buildDate }).\nerror-csp-conflict =\n    Ruffle encontró un problema al intentar inicializarse.\n    La Política de Seguridad de Contenido de este servidor web no permite el componente requerido \".wasm\".\n    Si usted es el administrador del servidor, por favor consulta la wiki de Ruffle para obtener ayuda.\nerror-unknown =\n    Ruffle ha encontrado un problema al tratar de mostrar el contenido Flash.\n    { $outdated ->\n        [true] Si usted es el administrador del servidor, intenta cargar una version más reciente de Ruffle (la version actual esta desactualizada: { $buildDate }).\n       *[false] Esto no deberia suceder! apreciariamos que reportes el error!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = ¿Está seguro de querer eliminar este archivo de guardado?\nsave-reload-prompt =\n    La única forma de { $action ->\n        [delete] eliminar\n       *[replace] sobreescribir\n    } este archivo de guardado sin conflictos potenciales es reiniciando el contenido. ¿Desea continuar de todos modos?\nsave-download = Descargar\nsave-replace = Sobreescribir\nsave-delete = Borrar\nsave-backup-all = Borrar todos los archivos de guardado\n",
    "volume-controls.ftl": "volume-controls-mute = Silenciar\nvolume-controls-unmute = Desmutear\n"
  },
  "fi-FI": {
    "context_menu.ftl": "context-menu-download-swf = Lataa .swf\ncontext-menu-copy-debug-info = Kopioi vianjäljitystiedot\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Tietoja – Ruffle-laajennus ({ $version })\n       *[other] Tietoja – Ruffle ({ $version })\n    }\ncontext-menu-hide = Piilota tämä valikko\ncontext-menu-exit-fullscreen = Poistu koko näytön tilasta\ncontext-menu-enter-fullscreen = Siirry koko näytön tilaan\ncontext-menu-volume-controls = Äänenvoimakkuuden säätö\n",
    "messages.ftl": "message-restored-from-bfcache =\n    Selaimesi palautti tämän Flash-sisällön aiemmasta istunnosta.\n    Aloita alusta lataamalla sivu uudelleen.\npanic-title = Jokin meni pieleen :(\nmore-info = Lisätietoja\nrun-anyway = Suorita silti\ncontinue = Jatka\nreport-bug = Ilmoita ongelmasta\nupdate-ruffle = Päivitä Ruffle\nruffle-desktop = Työpöytäsovellus\nruffle-wiki = Näytä Rufflen wiki\nenable-hardware-acceleration = Vaikuttaa siltä, että laitteistokiihdytys on pois käytöstä. Ruffle saattaa silti toimia, mutta hitaasti. Lisätietoja laitteistokiihdytyksen ottamisesta käyttöön on saatavilla alla olevan linkin kautta:\nview-error-details = Näytä virheen tiedot\nopen-in-new-tab = Avaa uudessa välilehdessä\nclick-to-unmute = Napsauta palauttaaksesi äänet\nclipboard-message-title = Kopiointi ja liittäminen Rufflessa\nclipboard-message-copy = { \" \" } kopioi\nclipboard-message-cut = { \" \" } leikkaa\nclipboard-message-paste = { \" \" } liittää\nerror-wasm-unsupported-browser =\n    Käyttämäsi selain ei tue Rufflen vaatimia WebAssembly-laajennuksia.\n    Vaihda tuettuun selaimeen.\n    Lista tuetuista selaimista on koottu wikiin.\n",
    "save-manager.ftl": "save-delete-prompt = Haluatko varmasti poistaa tämän tallennuksen?\nsave-reload-prompt =\n    Ainoa tapa { $action ->\n        [delete] poistaa\n       *[replace] korvata\n    } tämä tiedosto ilman mahdollista ristiriitaa on ladata sisältö uudelleen. Haluatko jatkaa silti?\nsave-download = Lataa\nsave-replace = Korvaa\nsave-delete = Poista\n",
    "volume-controls.ftl": "volume-controls-mute = Mykistä\nvolume-controls-unmute = Poista mykistys\n"
  },
  "fr-FR": {
    "context_menu.ftl": "context-menu-download-swf = Télécharger en tant que .swf\ncontext-menu-copy-debug-info = Copier les infos de débogage\ncontext-menu-open-save-manager = Ouvrir le gestionnaire de stockage\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] À propos de l'Extension Ruffle ({ $version })\n       *[other] À propos de Ruffle ({ $version })\n    }\ncontext-menu-hide = Masquer ce menu\ncontext-menu-exit-fullscreen = Sortir du mode plein écran\ncontext-menu-enter-fullscreen = Afficher en plein écran\ncontext-menu-volume-controls = Contrôles du volume\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle n'a pas été en mesure de lire le fichier Flash intégré dans cette page.\n    Vous pouvez essayer d'ouvrir le fichier dans un onglet isolé, pour contourner le problème.\nmessage-restored-from-bfcache =\n    Votre navigateur a restauré ce contenu Flash d'une session antérieure.\n    Rechargez la page pour repartir de zéro.\npanic-title = Une erreur est survenue :(\nmore-info = Plus d'infos\nrun-anyway = Exécuter quand même\ncontinue = Continuer\nreport-bug = Signaler le bug\nupdate-ruffle = Mettre à jour Ruffle\nruffle-demo = Démo en ligne\nruffle-desktop = Application de bureau\nruffle-wiki = Wiki de Ruffle\nenable-hardware-acceleration = Il semblerait que l'accélération matérielle soit désactivée. Cela n'empêche généralement pas Ruffle de fonctionner, mais il peut être beaucoup plus lent. Vous pouvez trouver comment activer l'accélération matérielle en suivant le lien ci-dessous :\nenable-hardware-acceleration-link = FAQ - Accélération matérielle dans Chrome\nview-error-details = Détails de l'erreur\nopen-in-new-tab = Ouvrir dans un nouvel onglet\nclick-to-unmute = Cliquez pour activer le son\nclipboard-message-title = Copier et coller dans Ruffle\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] Votre navigateur ne prend pas en charge l'accès au presse-papiers,\n        [access-denied] L'accès au presse-papiers a été refusé,\n    } mais vous pouvez toujours utiliser ces raccourcis clavier à la place :\nclipboard-message-copy = { \" \" } pour copier\nclipboard-message-cut = { \" \" } pour couper\nclipboard-message-paste = { \" \" } pour coller\nerror-canvas-reload = Impossible de recharger avec le moteur de rendu canvas lorsque celui-ci est déjà en cours d'utilisation.\nerror-file-protocol =\n    Il semblerait que vous exécutiez Ruffle sur le protocole \"file:\".\n    Cela ne fonctionne pas car les navigateurs bloquent de nombreuses fonctionnalités pour des raisons de sécurité.\n    Nous vous invitons soit à configurer un serveur local, soit à utiliser la démo en ligne ou l'application de bureau.\nerror-javascript-config =\n    Ruffle a rencontré un problème majeur en raison d'une configuration JavaScript incorrecte.\n    Si vous êtes l'administrateur du serveur, nous vous invitons à vérifier les détails de l'erreur pour savoir quel est le paramètre en cause.\n    Vous pouvez également consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-wasm-not-found =\n    Ruffle n'a pas réussi à charger son fichier \".wasm\".\n    Si vous êtes l'administrateur du serveur, veuillez vous assurer que ce fichier a bien été mis en ligne.\n    Si le problème persiste, il vous faudra peut-être utiliser le paramètre \"publicPath\" : veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-wasm-mime-type =\n    Ruffle a rencontré un problème majeur durant sa phase d'initialisation.\n    Ce serveur web ne renvoie pas le bon type MIME pour les fichiers \".wasm\".\n    Si vous êtes l'administrateur du serveur, veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-invalid-swf =\n    Ruffle n'a pas été en mesure de lire le fichier demandé.\n    La raison la plus probable est que ce fichier n'est pas un SWF valide.\nerror-swf-fetch =\n    Ruffle n'a pas réussi à charger le fichier Flash.\n    La raison la plus probable est que le fichier n'existe pas ou plus.\n    Vous pouvez essayer de prendre contact avec l'administrateur du site pour obtenir plus d'informations.\nerror-swf-cors =\n    Ruffle n'a pas réussi à charger le fichier Flash.\n    La requête a probablement été rejetée en raison de la configuration du CORS.\n    Si vous êtes l'administrateur du serveur, veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-wasm-cors =\n    Ruffle n'a pas réussi à charger son fichier \".wasm\".\n    La requête a probablement été rejetée en raison de la configuration du CORS.\n    Si vous êtes l'administrateur du serveur, veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-wasm-invalid =\n    Ruffle a rencontré un problème majeur durant sa phase d'initialisation.\n    Il semblerait que cette page comporte des fichiers manquants ou invalides pour exécuter Ruffle.\n    Si vous êtes l'administrateur du serveur, veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-wasm-download =\n    Ruffle a rencontré un problème majeur durant sa phase d'initialisation.\n    Le problème détecté peut souvent se résoudre de lui-même, donc vous pouvez essayer de recharger la page.\n    Si le problème persiste, veuillez prendre contact avec l'administrateur du site.\nerror-wasm-disabled-on-edge =\n    Ruffle n'a pas réussi à charger son fichier \".wasm\".\n    Pour résoudre ce problème, essayez d'ouvrir les paramètres de votre navigateur et de cliquer sur \"Confidentialité, recherche et services\". Puis, vers le bas de la page, désactivez l'option \"Améliorez votre sécurité sur le web\".\n    Cela permettra à votre navigateur de charger les fichiers \".wasm\".\n    Si le problème persiste, vous devrez peut-être utiliser un autre navigateur.\nerror-wasm-unsupported-browser =\n    Votre navigateur ne prend pas en charge les extensions WebAssembly nécessaires au fonctionnement de Ruffle.\n    Veuillez utiliser un navigateur les prenant en charge.\n    Vous pouvez trouver une liste de navigateurs fonctionnant avec Ruffle sur le wiki.\nerror-javascript-conflict =\n    Ruffle a rencontré un problème majeur durant sa phase d'initialisation.\n    Il semblerait que cette page contienne du code JavaScript qui entre en conflit avec Ruffle.\n    Si vous êtes l'administrateur du serveur, nous vous invitons à essayer de charger le fichier dans une page vide.\nerror-javascript-conflict-outdated = Vous pouvez également essayer de mettre en ligne une version plus récente de Ruffle qui pourrait avoir corrigé le problème (la version que vous utilisez est obsolète : { $buildDate }).\nerror-csp-conflict =\n    Ruffle a rencontré un problème majeur durant sa phase d'initialisation.\n    La stratégie de sécurité du contenu (CSP) de ce serveur web n'autorise pas l'exécution de fichiers \".wasm\".\n    Si vous êtes l'administrateur du serveur, veuillez consulter le wiki de Ruffle pour obtenir de l'aide.\nerror-unknown =\n    Ruffle a rencontré un problème majeur durant l'exécution de ce contenu Flash.\n    { $outdated ->\n        [true] Si vous êtes l'administrateur du serveur, veuillez essayer de mettre en ligne une version plus récente de Ruffle (la version que vous utilisez est obsolète : { $buildDate }).\n       *[false] Cela n'est pas censé se produire, donc nous vous serions reconnaissants si vous pouviez nous signaler ce bug !\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Voulez-vous vraiment supprimer ce fichier de sauvegarde ?\nsave-reload-prompt =\n    La seule façon de { $action ->\n        [delete] supprimer\n       *[replace] remplacer\n    } ce fichier de sauvegarde sans conflit potentiel est de recharger ce contenu. Souhaitez-vous quand même continuer ?\nsave-download = Télécharger\nsave-replace = Remplacer\nsave-delete = Supprimer\nsave-backup-all = Télécharger tous les fichiers de sauvegarde\n",
    "volume-controls.ftl": "volume-controls-mute = Rendre muet\nvolume-controls-unmute = Rendre audible\n"
  },
  "gl-ES": {
    "context_menu.ftl": "",
    "messages.ftl": "",
    "save-manager.ftl": "",
    "volume-controls.ftl": ""
  },
  "he-IL": {
    "context_menu.ftl": "context-menu-download-swf = הורדת קובץ הswf.\ncontext-menu-copy-debug-info = העתקת נתוני ניפוי שגיאות\ncontext-menu-open-save-manager = פתח את מנהל השמירות\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] אודות התוסף Ruffle ({ $version })\n       *[other] אודות Ruffle ({ $version })\n    }\ncontext-menu-hide = הסתר תפריט זה\ncontext-menu-exit-fullscreen = יציאה ממסך מלא\ncontext-menu-enter-fullscreen = מסך מלא\ncontext-menu-volume-controls = בקרת עוצמת קול\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle לא הצליח להריץ את תוכן הפלאש המוטמע בדף זה.\n    אתה יכול לפתוח את הקובץ בלשונית נפרדת, על מנת לעקוף בעיה זו.\npanic-title = משהו השתבש :(\nmore-info = מידע נוסף\nrun-anyway = הפעל בכל זאת\ncontinue = המשך\nreport-bug = דווח על תקלה\nupdate-ruffle = עדכן את Ruffle\nruffle-demo = הדגמה\nruffle-desktop = אפליקציית שולחן עבודה\nruffle-wiki = ראה את Ruffle wiki\nenable-hardware-acceleration = נראה שהאצת החומרה שלך לא מופעלת. בעוד שRuffle עשוי לעבוד, הוא יכול להיות איטי. תוכל לראות כיצד להפעיל תכונה זו בלחיצה על הלינק הזה:\nenable-hardware-acceleration-link = שאלות נפוצות - האצת החומרה של Chrome\nview-error-details = ראה פרטי שגיאה\nopen-in-new-tab = פתח בכרטיסייה חדשה\nclick-to-unmute = לחץ על מנת לבטל השתקה\nclipboard-message-title = העתקה והדבקה בRuffle\nclipboard-message-copy = { \" \" } עבור העתקה\nclipboard-message-cut = { \" \" } עבור גזירה\nclipboard-message-paste = { \" \" } עבור הדבקה\nerror-canvas-reload = לא ניתן לטעון מחדש עם מעבד הקנבס כאשר מעבד הקנבס כבר בשימוש.\nerror-file-protocol =\n    נדמה שאתה מריץ את Ruffle תחת פרוטוקול \"file:\".\n    זה לא יעבוד מכיוון שדפדפנים חוסמים אפשרויות רבות מלעבוד עקב סיבות אבטחה.\n    במקום זה, אנו מזמינים אותך לאחסן אתר זה תחת שרת מקומי או הדגמה ברשת או דרך אפליקציית שולחן העבודה.\nerror-javascript-config =\n    Ruffle נתקל בתקלה חמורה עקב הגדרת JavaScript שגויה.\n    אם אתה מנהל האתר, אנו מזמינים אותך לבדוק את פרטי השגיאה על מנת למצוא איזה פרמטר הוא שגוי.\n    אתה יכול לעיין ולהועץ בwiki של Ruffle על מנת לקבל עזרה.\nerror-wasm-not-found =\n    Ruffle נכשל לטעון את קובץ ה\"wasm.\" הדרוש.\n    אם אתה מנהל האתר, אנא וודא כי הקובץ הועלה כשורה.\n    אם הבעיה ממשיכה, ייתכן ותצטרך להשתמש בהגדרת \"publicPath\": אנא עיין והועץ בwiki של Ruffle על מנת לקבל עזרה.\nerror-wasm-mime-type =\n    Ruffle נתקל בבעיה חמורה תוך כדי ניסיון לאתחל.\n    שרתו של אתר זה לא משייך קבצי \".wasm\" עם סוג הMIME הנכון.\n    אם אתה מנהל האתר, אנא עיין והועץ בwiki של Ruffle על מנת לקבל עזרה.\nerror-invalid-swf =\n    Ruffle לא יכול לנתח את הקובץ המבוקש.\n    הסיבה הסבירה ביותר לבעיה זו היא בגלל שהקובץ המבוקש אינו SWF חוקי.\nerror-swf-fetch =\n    Ruffle נכשל לטעון את קובץ הפלאש/swf. .\n    זה נובע ככל הנראה מכיוון והקובץ לא קיים יותר, אז אין לRuffle מה לטעון.\n    נסה ליצור קשר עם מנהל האתר על מנת לקבל עזרה.\nerror-swf-cors =\n    Ruffle נכשל לטעון את קובץ הפלאש/swf. .\n    גישה לfetch ככל הנראה נחסמה על ידי מדיניות CORS.\n    אם אתה מנהל האתר, אנא עיין והועץ בwiki של Ruffle על מנת לקבל עזרה.\nerror-wasm-cors =\n    Ruffle נכשל לטעון את קובץ ה\".wasm\" הדרוש.\n    גישה לfetch ככל הנראה נחסמה על ידי מדיניות CORS.\n    אם אתה מנהל האתר, אנא עיין והועץ בwiki של Ruffle על מנת לקבל עזרה.\nerror-wasm-invalid =\n    Ruffle נתקל בבעיה חמורה תוך כדי ניסיון לאתחל.\n    נדמה כי בדף זה חסרים או לא עובדים כראוי קבצים אשר משמשים את Ruffle כדי לפעול\n    אם אתה מנהל האתר, אנא עיין והועץ בwiki של Ruffle על מנת לקבל עזרה.\nerror-wasm-download =\n    Ruffle נתקל בבעיה חמורה תוך כדי ניסיון לאתחל.\n    לעיתים בעיה זו יכולה לפתור את עצמה, אז אתה יכול לנסות לטעון מחדש את הדף זה.\n    אם לא, אנא פנה למנהל האתר.\nerror-wasm-disabled-on-edge =\n    Ruffle נכשל לטעון את קובץ ה\".wasm\" הדרוש.\n    על מנת לתקן בעיה זו, נסה לפתוח את הגדרות הדפדפן שלך, לחץ על \"אבטחה, חיפוש ושירות\",\n    גלול מטה, וכבה את \"הגבר את האבטחה שלך ברשת\".\n    זה יאפשר לדפדפן שלך לטעון את קובץ ה\".wasm\" הדרוש.\n    אם הבעיה ממשיכה, ייתכן ועליך להשתמש בדפדפן אחר.\nerror-wasm-unsupported-browser =\n    הדפדפן שבו אתה משתמש אינו תומך בתוספי WebAssembly ש-Ruffle דורש כדי לפעול.\n    אנא עבור לדפדפן נתמך.\n    אתה יכול למצוא רשימה של דפדפנים נתמכים ב-Wiki שלנו.\nerror-javascript-conflict =\n    Ruffle נתקל בבעיה חמורה תוך כדי ניסיון לאתחל.\n    נדמה כי דף זה משתמש בקוד JavaScript אשר מתנגש עם Ruffle.\n    אם אתה מנהל האתר, אנו מזמינים אותך לנסות לטעון את הדף תחת עמוד ריק.\nerror-javascript-conflict-outdated = בנוסף, אתה יכול לנסות ולהעלות גרסאות עדכניות של Ruffle אשר עלולים לעקוף בעיה זו (גרסה זו הינה מיושנת : { $buildDate }).\nerror-csp-conflict =\n    Ruffle נתקל בבעיה חמורה תוך כדי ניסיון לאתחל.\n    מדיניות אבטחת התוכן של שרתו של אתר זה אינה מאפשרת לקובץ ה\"wasm.\" הדרוש לפעול.\n    אם אתה מנהל האתר, אנא עיין והועץ בwiki של Ruffle על מנת לקבל עזרה.\nerror-unknown =\n    Ruffle נתקל בבעיה חמורה בניסיון להציג את תוכן פלאש זה.\n    { $outdated ->\n        [true] אם אתה מנהל האתר, אנא נסה להעלות גרסה עדכנית יותר של Ruffle (גרסה זו הינה מיושנת:  { $buildDate }).\n       *[false] זה לא אמור לקרות, נשמח אם תוכל לשתף תקלה זו!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = האם אתה בטוח שברצונך למחוק את קובץ שמירה זה?\nsave-reload-prompt =\n    הדרך היחידה { $action ->\n        [delete] למחוק\n       *[replace] להחליף\n    } את קובץ השמירה הזה מבלי לגרום לו להתנגש היא לטעון מחדש את תוכן זה. האם אתה רוצה להמשיך בכל זאת?\nsave-download = הורדה\nsave-replace = החלפה\nsave-delete = מחיקה\nsave-backup-all = הורדת כל קבצי השמירה\n",
    "volume-controls.ftl": "volume-controls-mute = השתק\nvolume-controls-unmute = ביטול השתקה\n"
  },
  "hr-HR": {
    "context_menu.ftl": "context-menu-download-swf = Preuzmi .swf datoteku\ncontext-menu-copy-debug-info = Kopiraj informacije o otklanjanju pogrešaka\ncontext-menu-open-save-manager = Otvori Upravitelj spremanja\ncontext-menu-about-ruffle =\n    { $flavor ->\n    [extension] O proširenju Ruffle ({ $version })\n    *[other] O Ruffle ({ $version })\n    }\ncontext-menu-hide = Sakrij ovaj izbornik\ncontext-menu-exit-fullscreen = Izađi iz cijelog zaslona\ncontext-menu-enter-fullscreen = Uđi u cijeli zaslon\ncontext-menu-volume-controls = Kontrole glasnoće\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle nije uspio pokrenuti Flash ugrađen na ovoj stranici.\n    Možete pokušati otvoriti datoteku u zasebnoj kartici kako biste izbjegli ovaj problem.\nmessage-restored-from-bfcache =\n    Vaš je preglednik vratio ovaj Flash sadržaj iz prethodne sesije.\n    Za novi početak ponovno učitajte stranicu.\npanic-title = Nešto je pošlo po zlu :(\nmore-info = Dodatne informacije\nrun-anyway = Svejedno pokreni\ncontinue = Nastavi\nreport-bug = Prijavi grešku\nupdate-ruffle = Ažurirajte Ruffle\nruffle-demo = Web demo\nruffle-desktop = Aplikacija za stolna računala\nruffle-wiki = Pogledajte Ruffle Wiki\nenable-hardware-acceleration = Izgleda da je hardversko ubrzanje onemogućeno. Iako Ruffle možda radi, mogao bi biti vrlo spor. Kako omogućiti hardversko ubrzanje možete saznati slijedeći donju poveznicu:\nenable-hardware-acceleration-link = Često postavljana pitanja - Ubrzanje hardvera u Chromeu\nview-error-details = Prikaži detalje o pogrešci\nopen-in-new-tab = Otvori u novoj kartici\nclick-to-unmute = Kliknite za uključivanje zvuka\nclipboard-message-title = Kopiranje i lijepljenje u Ruffleu\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] Vaš preglednik ne podržava puni pristup međuspremniku,\n        [access-denied] Pristup međuspremniku je uskraćen,\n    } ali uvijek možete umjesto toga koristiti ove prečace:\nclipboard-message-copy = { \" \" } za kopiranje\nclipboard-message-cut = { \" \" } za izrezivanje\nclipboard-message-paste = { \" \" } za lijepljenje\nerror-canvas-reload = Nije moguće ponovno učitavanje s rendererom platna kada je renderer platna već u upotrebi.\nerror-file-protocol =\n    Čini se da koristite Ruffle na protokolu \"file:\".\n    Ovo ne radi jer preglednici blokiraju mnoge značajke iz sigurnosnih razloga.\n    Umjesto toga, pozivamo vas da postavite lokalni poslužitelj ili koristite web demo ili desktop aplikaciju.\nerror-javascript-config =\n    Ruffle je naišao na veliki problem zbog netočne konfiguracije JavaScripta.\n    Ako ste administrator poslužitelja, pozivamo vas da provjerite detalje pogreške kako biste saznali koji je parametar uzrok problema. Također možete konzultirati Ruffle wiki za pomoć.\nerror-wasm-not-found =\n    Ruffle nije uspio učitati potrebnu komponentu datoteke \".wasm\".\n    Ako ste administrator poslužitelja, provjerite je li datoteka ispravno prenesena.\n    Ako se problem nastavi, možda ćete morati upotrijebiti postavku \"publicPath\": za pomoć se obratite Ruffle wikiju.\nerror-wasm-mime-type =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja inicijalizacije.\n    Ovaj web poslužitelj ne poslužuje \".wasm\" datoteke s ispravnom MIME vrstom.\n    Ako ste administrator poslužitelja, obratite se Ruffle wiki stranici za pomoć.\nerror-invalid-swf =\n    Ruffle ne može analizirati traženu datoteku.\n    Najvjerojatniji razlog je taj što tražena datoteka nije valjani SWF.\nerror-swf-fetch =\n    Ruffle nije uspio učitati Flash SWF datoteku.\n    Najvjerojatniji razlog je taj što datoteka više ne postoji, pa Ruffle nema što učitati.\n    Pokušajte se obratiti administratoru web-mjesta za pomoć.\nerror-swf-cors =\n    Ruffle nije uspio učitati Flash SWF datoteku.\n    Pristup dohvaćanju vjerojatno je blokiran pravilom CORS.\n    Ako ste administrator poslužitelja, za pomoć se obratite Ruffle wikiju.\nerror-wasm-cors =\n    Ruffle nije uspio učitati potrebnu komponentu datoteke \".wasm\".\n    Pristup dohvaćanju vjerojatno je blokiran CORS pravilom.\n    Ako ste administrator poslužitelja, za pomoć se obratite Ruffle wikiju.\nerror-wasm-invalid =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja inicijalizacije.\n    Čini se da ovoj stranici nedostaju ili su datoteke nevažeće za pokretanje Rufflea.\n    Ako ste administrator poslužitelja, za pomoć se obratite Ruffle wikiju.\nerror-wasm-download =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja inicijalizacije.\n    To se često može samo riješiti, pa možete pokušati ponovno učitati stranicu.\n    U suprotnom, obratite se administratoru web-mjesta.\nerror-wasm-disabled-on-edge =\n    Ruffle nije uspio učitati potrebnu komponentu datoteke \".wasm\".\n    Da biste to riješili, pokušajte otvoriti postavke preglednika, kliknuti \"Privatnost, pretraživanje i usluge\", pomaknuti se prema dolje i isključiti \"Poboljšajte sigurnost na webu\".\n    To će omogućiti vašem pregledniku da učita potrebne datoteke \".wasm\".\n    Ako se problem nastavi, možda ćete morati koristiti drugi preglednik.\nerror-wasm-unsupported-browser =\n    Preglednik koji koristite ne podržava WebAssembly ekstenzije koje su potrebne za rad Rufflea.\n    Molimo prebacite se na podržani preglednik.\n    Popis podržanih preglednika možete pronaći na Wiki stranici.\nerror-javascript-conflict =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja inicijalizacije.\n    Čini se da ova stranica koristi JavaScript kod koji je u sukobu s Ruffleom.\n    Ako ste administrator poslužitelja, pozivamo vas da pokušate učitati datoteku na praznoj stranici.\nerror-javascript-conflict-outdated = Također možete pokušati prenijeti noviju verziju Rufflea koja bi mogla zaobići problem (trenutna verzija je zastarjela: { $buildDate }).\nerror-csp-conflict =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja inicijalizacije.\n    Pravila sigurnosti sadržaja ovog web poslužitelja ne dopuštaju pokretanje potrebne komponente \".wasm\".\n    Ako ste administrator poslužitelja, za pomoć se obratite Ruffle wikiju.\nerror-unknown =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja prikaza ovog Flash sadržaja.\n    { $outdated ->\n    [true] Ako ste administrator poslužitelja, pokušajte prenijeti noviju verziju Rufflea (trenutna verzija je zastarjela: { $buildDate }).\n    *[false] Ovo se ne bi trebalo događati, pa bismo vam bili jako zahvalni ako biste prijavili grešku!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Jeste li sigurni da želite izbrisati ovu spremljenu datoteku?\nsave-reload-prompt =\n    Jedini način da { $action ->\n    [delete] izbrišete\n    *[replace] zamijenite\n    } ovu datoteku za spremanje bez potencijalnog sukoba jest ponovno učitavanje ovog sadržaja. Želite li ipak nastaviti?\nsave-download = Preuzmite\nsave-replace = Zamijeni\nsave-delete = Izbriši\nsave-backup-all = Preuzmi sve spremljene datoteke\n",
    "volume-controls.ftl": "volume-controls-mute = Isključi zvuk\nvolume-controls-unmute = Uključi zvuk\n"
  },
  "hu-HU": {
    "context_menu.ftl": "context-menu-download-swf = .swf fájl letöltése\ncontext-menu-copy-debug-info = Hibakeresési információk másolása\ncontext-menu-open-save-manager = Mentéskezelő megnyitása\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] A Ruffle kiegészítő ({ $version }) névjegye\n       *[other] A Ruffle ({ $version }) névjegye\n    }\ncontext-menu-hide = Ezen menü elrejtése\ncontext-menu-exit-fullscreen = Kilépés a teljes képernyőből\ncontext-menu-enter-fullscreen = Váltás teljes képernyőre\ncontext-menu-volume-controls = Hangerőszabályzó\n",
    "messages.ftl": "message-cant-embed =\n    A Ruffle nem tudta futtatni az oldalba ágyazott Flash tartalmat.\n    A probléma kikerüléséhez megpróbálhatod megnyitni a fájlt egy külön lapon.\nmessage-restored-from-bfcache =\n    A böngésző ezt a Flash tartalmat egy korábbi munkamenetből állította vissza.\n    A tiszta induláshoz frissítse az oldalt.\npanic-title = Valami baj történt :(\nmore-info = További információ\nrun-anyway = Futtatás mégis\ncontinue = Folytatás\nreport-bug = Hiba jelentése\nupdate-ruffle = Ruffle frissítése\nruffle-demo = Webes demó\nruffle-desktop = Asztali alkalmazás\nruffle-wiki = Ruffle Wiki megnyitása\nenable-hardware-acceleration = Úgy tűnik, a hardveres gyorsítás ki van kapcsolva. Bár a Ruffle működhet, nagyon lassú lehet. Az alábbi hivatkozást követve megtudhatod, hogyan engedélyezd a hardveres gyorsítást:\nenable-hardware-acceleration-link = GYIK - Chrome hardveres gyorsítás\nview-error-details = Hiba részletei\nopen-in-new-tab = Megnyitás új lapon\nclick-to-unmute = Kattints a némítás feloldásához\nclipboard-message-title = Másolás és beíllesztés a Ruffle-ben\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] A böngésződ nem támogatja a vágólaphoz való teljes hozzáférést,\n        [access-denied] A vágólaphoz való hozzáférés el lett utasítva,\n    } de mindig használhatod ezeket a gyorsbillentyűket helyette:\nclipboard-message-copy = { \" \" } másoláshoz\nclipboard-message-cut = { \" \" } kivágáshoz\nclipboard-message-paste = { \" \" } beillesztéshez\nerror-canvas-reload = Újratöltés a canvas megjelenítővel nem lehetséges, ha már az van használatban.\nerror-file-protocol =\n    Úgy tűnik, a Ruffle-t a \"file:\" protokollon futtatod.\n    Ez nem működik, mivel így a böngészők biztonsági okokból számos funkció működését letiltják.\n    Ehelyett azt ajánljuk hogy indíts egy helyi kiszolgálót, vagy használd a webes demót vagy az asztali alkalmazást.\nerror-javascript-config =\n    A Ruffle komoly problémába ütközött egy helytelen JavaScript-konfiguráció miatt.\n    Ha a szerver rendszergazdája vagy, kérjük, ellenőrizd a hiba részleteit, hogy megtudd, melyik paraméter a hibás.\n    A Ruffle wikiben is találhatsz ehhez segítséget.\nerror-wasm-not-found =\n    A Ruffle nem tudta betölteni a szükséges \".wasm\" összetevőt.\n    Ha a szerver rendszergazdája vagy, kérjük ellenőrizd, hogy a fájl megfelelően lett-e feltöltve.\n    Ha a probléma továbbra is fennáll, előfordulhat, hogy a \"publicPath\" beállítást kell használnod: segítségért keresd fel a Ruffle wikit.\nerror-wasm-mime-type =\n    A Ruffle komoly problémába ütközött az inicializálás során.\n    Ez a webszerver a \".wasm\" fájlokat nem a megfelelő MIME-típussal szolgálja ki.\n    Ha a szerver rendszergazdája vagy, kérjük, keresd fel a Ruffle wikit segítségért.\nerror-invalid-swf =\n    A Ruffle nem tudta értelmezni a kért fájlt.\n    Ennek a legvalószínűbb oka az, hogy a kért fájl nem érvényes SWF.\nerror-swf-fetch =\n    A Ruffle nem tudta betölteni a Flash SWF fájlt.\n    A legvalószínűbb ok az, hogy a fájl már nem létezik, így a Ruffle számára nincs mit betölteni.\n    Próbáld meg felvenni a kapcsolatot a webhely rendszergazdájával segítségért.\nerror-swf-cors =\n    A Ruffle nem tudta betölteni a Flash SWF fájlt.\n    A lekéréshez való hozzáférést valószínűleg letiltotta a CORS-házirend.\n    Ha a szerver rendszergazdája vagy, kérjük, keresd fel a Ruffle wikit segítségért.\nerror-wasm-cors =\n    A Ruffle nem tudta betölteni a szükséges \".wasm\" összetevőt.\n    A lekéréshez való hozzáférést valószínűleg letiltotta a CORS-házirend.\n    Ha a szerver rendszergazdája vagy, kérjük keresd fel a Ruffle wikit segítségért.\nerror-wasm-invalid =\n    A Ruffle komoly problémába ütközött az inicializálás során.\n    Úgy tűnik, hogy ezen az oldalon hiányoznak vagy hibásak a Ruffle futtatásához szükséges fájlok.\n    Ha a szerver rendszergazdája vagy, kérjük keresd fel a Ruffle wikit segítségért.\nerror-wasm-download =\n    A Ruffle komoly problémába ütközött az inicializálás során.\n    Ez gyakran magától megoldódik, ezért megpróbálhatod újratölteni az oldalt.\n    Ellenkező esetben fordulj a webhely rendszergazdájához.\nerror-wasm-disabled-on-edge =\n    A Ruffle nem tudta betölteni a szükséges \".wasm\" összetevőt.\n    A probléma megoldásához nyisd meg a böngésző beállításait, kattints az „Adatvédelem, keresés és szolgáltatások” elemre, görgess le, és kapcsold ki a „Fokozott biztonság a weben” opciót.\n    Ez lehetővé teszi a böngésző számára, hogy betöltse a szükséges \".wasm\" fájlokat.\n    Ha a probléma továbbra is fennáll, lehet, hogy másik böngészőt kell használnod.\nerror-wasm-unsupported-browser =\n    Az általad használt böngésző nem támogatja a Ruffle futtatásához szükséges WebAssembly kiegészítéseket.\n    Kérlek, válts egy támogatott böngészőre.\n    A támogatott böngészők listáját a Wikin találod.\nerror-javascript-conflict =\n    A Ruffle komoly problémába ütközött az inicializálás során.\n    Úgy tűnik, ez az oldal olyan JavaScript-kódot használ, amely ütközik a Ruffle-lel.\n    Ha a kiszolgáló rendszergazdája vagy, kérjük, próbáld meg a fájlt egy üres oldalon betölteni.\nerror-javascript-conflict-outdated = Megpróbálhatod továbbá feltölteni a Ruffle egy újabb verzióját is, amely megkerülheti a problémát (a jelenlegi elavult: { $buildDate }).\nerror-csp-conflict =\n    A Ruffle komoly problémába ütközött az inicializálás során.\n    A kiszolgáló tartalombiztonsági házirendje nem teszi lehetővé a szükséges „.wasm” összetevők futtatását.\n    Ha a szerver rendszergazdája vagy, kérjük, keresd fel a Ruffle wikit segítségért.\nerror-unknown =\n    A Ruffle komoly problémába ütközött, miközben megpróbálta megjeleníteni ezt a Flash-tartalmat.\n    { $outdated ->\n        [true] Ha a szerver rendszergazdája vagy, kérjük, próbáld meg feltölteni a Ruffle egy újabb verzióját (a jelenlegi elavult: { $buildDate }).\n       *[false] Ennek nem lett volna szabad megtörténnie, ezért nagyon hálásak lennénk, ha jeleznéd a hibát!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Biztosan törölni akarod ezt a mentést?\nsave-reload-prompt =\n    Ennek a mentésnek az esetleges konfliktus nélküli { $action ->\n        [delete] törléséhez\n       *[replace] cseréjéhez\n    } újra kell tölteni a tartalmat. Mégis szeretnéd folytatni?\nsave-download = Letöltés\nsave-replace = Csere\nsave-delete = Törlés\nsave-backup-all = Az összes fájl letöltése\n",
    "volume-controls.ftl": "volume-controls-mute = Némítás\nvolume-controls-unmute = Némítás feloldása\n"
  },
  "id-ID": {
    "context_menu.ftl": "context-menu-download-swf = Unduh .swf\ncontext-menu-copy-debug-info = Salin info debug\ncontext-menu-open-save-manager = Buka Manager Save\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Tentang Ekstensi Ruffle ({ $version })\n       *[other] Tentang Ruffle ({ $version })\n    }\ncontext-menu-hide = Sembunyikan Menu ini\ncontext-menu-exit-fullscreen = Keluar dari layar penuh\ncontext-menu-enter-fullscreen = Masuk mode layar penuh\ncontext-menu-volume-controls = Pengaturan Volume\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle tidak dapat menjalankan Flash yang disematkan di halaman ini.\n    Anda dapat mencoba membuka file di tab terpisah, untuk menghindari masalah ini.\npanic-title = Terjadi kesalahan :(\nmore-info = Info lebih lanjut\nrun-anyway = Jalankan\ncontinue = Lanjutkan\nreport-bug = Laporkan Bug\nupdate-ruffle = Perbarui Ruffle\nruffle-demo = Demo Web\nruffle-desktop = Aplikasi Desktop\nruffle-wiki = Kunjungi Wiki Ruffle\nview-error-details = Tunjukan Detail Error\nopen-in-new-tab = Buka di Tab Baru\nclick-to-unmute = Tekan untuk menyalakan suara\nerror-file-protocol =\n    Sepertinya anda menjalankan Ruffle di protokol \"file:\".\n    Ini tidak berfungsi karena browser memblokir fitur ini dengan alasan keamanan.\n    Sebagai gantinya, kami mengajak anda untuk membuat server lokal, menggunakan demo web atau aplikasi desktop.\nerror-javascript-config =\n    Ruffle mengalami masalah besar karena konfigurasi JavaScript yang salah.\n    Jika Anda adalah administrator server ini, kami mengajak Anda untuk memeriksa detail kesalahan untuk mengetahui parameter mana yang salah.\n    Anda juga dapat membaca wiki Ruffle untuk mendapatkan bantuan.\nerror-wasm-not-found =\n    Ruffle gagal memuat komponen file \".wasm\" yang diperlukan.\n    Jika Anda adalah administrator server ini, pastikan file telah diunggah dengan benar.\n    Jika masalah terus berlanjut, Anda mungkin perlu menggunakan pengaturan \"publicPath\": silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-wasm-mime-type =\n    Ruffle mengalami masalah ketika mencoba melakukan inisialisasi.\n    Server web ini tidak melayani file \".wasm\" dengan tipe MIME yang benar.\n    Jika Anda adalah administrator server ini, silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-swf-fetch =\n    Ruffle gagal memuat file SWF Flash.\n    Kemungkinan file tersebut sudah tidak ada, sehingga tidak dapat dimuat oleh Ruffle.\n    Coba hubungi administrator situs web ini untuk mendapatkan bantuan.\nerror-swf-cors =\n    Ruffle gagal memuat file SWF Flash.\n    Akses untuk memuat kemungkinan telah diblokir oleh kebijakan CORS.\n    Jika Anda adalah administrator server ini, silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-wasm-cors =\n    Ruffle gagal memuat komponen file \".wasm\" yang diperlukan.\n    Akses untuk mengambil kemungkinan telah diblokir oleh kebijakan CORS.\n    Jika Anda adalah administrator server ini, silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-wasm-invalid =\n    Ruffle mengalami masalah besar ketika mencoba melakukan inisialisasi.\n    Sepertinya halaman ini memiliki file yang hilang atau tidak valid untuk menjalankan Ruffle.\n    Jika Anda adalah administrator server ini, silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-wasm-download =\n    Ruffle mengalami masalah besar ketika mencoba melakukan inisialisasi.\n    Hal ini sering kali dapat teratasi dengan sendirinya, sehingga Anda dapat mencoba memuat ulang halaman.\n    Jika tidak, silakan hubungi administrator situs web ini.\nerror-wasm-disabled-on-edge =\n    Ruffle gagal memuat komponen file \".wasm\" yang diperlukan.\n    Untuk mengatasinya, coba buka pengaturan peramban Anda, klik \"Privasi, pencarian, dan layanan\", turun ke bawah, dan matikan \"Tingkatkan keamanan Anda di web\".\n    Ini akan memungkinkan browser Anda memuat file \".wasm\" yang diperlukan.\n    Jika masalah berlanjut, Anda mungkin harus menggunakan browser yang berbeda.\nerror-javascript-conflict =\n    Ruffle mengalami masalah besar ketika mencoba melakukan inisialisasi.\n    Sepertinya situs web ini menggunakan kode JavaScript yang bertentangan dengan Ruffle.\n    Jika Anda adalah administrator server ini, kami mengajak Anda untuk mencoba memuat file pada halaman kosong.\nerror-javascript-conflict-outdated = Anda juga dapat mencoba mengunggah versi Ruffle yang lebih baru yang mungkin dapat mengatasi masalah ini (versi saat ini sudah kedaluwarsa: { $buildDate }).\nerror-csp-conflict =\n    Ruffle mengalami masalah besar ketika mencoba melakukan inisialisasi.\n    Kebijakan Keamanan Konten server web ini tidak mengizinkan komponen \".wasm\" yang diperlukan untuk dijalankan.\n    Jika Anda adalah administrator server ini, silakan baca wiki Ruffle untuk mendapatkan bantuan.\nerror-unknown =\n    Ruffle telah mengalami masalah besar saat menampilkan konten Flash ini.\n    { $outdated ->\n        [true] Jika Anda administrator server ini, cobalah untuk mengganti versi Ruffle yang lebih baru (versi saat ini sudah kedaluwarsa: { $buildDate }).\n       *[false] Hal ini seharusnya tidak terjadi, jadi kami sangat menghargai jika Anda dapat melaporkan bug ini!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Anda yakin ingin menghapus berkas ini?\nsave-reload-prompt =\n    Satu-satunya cara untuk { $action ->\n        [delete] menghapus\n       *[replace] mengganti\n    } berkas penyimpanan ini tanpa potensi konflik adalah dengan memuat ulang konten ini. Apakah Anda ingin melanjutkannya?\nsave-download = Unduh\nsave-replace = Ganti\nsave-delete = Hapus\nsave-backup-all = Unduh semua berkas penyimpanan\n",
    "volume-controls.ftl": "volume-controls-mute = Bisukan\n"
  },
  "it-IT": {
    "context_menu.ftl": "context-menu-download-swf = Scarica .swf\ncontext-menu-copy-debug-info = Copia informazioni di debug\ncontext-menu-open-save-manager = Apri gestione salvataggi\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Informazioni su Ruffle Extension ({ $version })\n       *[other] Informazioni su Ruffle ({ $version })\n    }\ncontext-menu-hide = Nascondi questo menu\ncontext-menu-exit-fullscreen = Esci dallo schermo intero\ncontext-menu-enter-fullscreen = Entra a schermo intero\ncontext-menu-volume-controls = Controlli volume\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle non è stato in grado di eseguire il Flash incorporato in questa pagina.\n    Puoi provare ad aprire il file in una scheda separata, per evitare questo problema.\nmessage-restored-from-bfcache = Il tuo browser ha ripristinato il contenuto del Flash da una sessione precedente. Per iniziare da capo, ricarica la pagina.\npanic-title = Qualcosa è andato storto :(\nmore-info = Maggiori informazioni\nrun-anyway = Esegui comunque\ncontinue = Continua\nreport-bug = Segnala un bug\nupdate-ruffle = Aggiorna Ruffle\nruffle-demo = Demo web\nruffle-desktop = Applicazione desktop\nruffle-wiki = Visualizza la wiki di Ruffle\nenable-hardware-acceleration = Sembra che l'accelerazione hardware sia disabilitata. Sebbene Ruffle possa funzionare, potrebbe essere molto lento. Puoi scoprire come abilitare l'accelerazione hardware seguendo il link seguente:\nenable-hardware-acceleration-link = FAQ - Accelerazione hardware di Chrome\nview-error-details = Visualizza dettagli errore\nopen-in-new-tab = Apri in una nuova scheda\nclick-to-unmute = Clicca per riattivare l'audio\nclipboard-message-title = Copiando e incollando su Ruffle\nclipboard-message-description =\n    { $variant ->\n      *[unsupported] Il tuo browser non ha supporto per accesso completo degli appunti,\n       [access-denied] Accesso agli appunti e stato negato,\n    } ma puoi sempre usare le scorciatoie al loro posto:\nclipboard-message-copy = { \" \" } per copiare\nclipboard-message-cut = { \" \" } per tagliare\nclipboard-message-paste = { \" \" } per incollare\nerror-canvas-reload = Impossibile ricaricare con il canvas renderer quando è in uso.\nerror-file-protocol =\n    Sembra che tu stia eseguendo Ruffle sul protocollo \"file:\".\n    Questo non funziona come browser blocca molte funzionalità di lavoro per motivi di sicurezza.\n    Invece, ti invitiamo a configurare un server locale o a utilizzare la demo web o l'applicazione desktop.\nerror-javascript-config =\n    Ruffle ha incontrato un problema importante a causa di una configurazione JavaScript non corretta.\n    Se sei l'amministratore del server, ti invitiamo a controllare i dettagli dell'errore per scoprire quale parametro è in errore.\n    Puoi anche consultare la wiki di Ruffle per aiuto.\nerror-wasm-not-found =\n    Ruffle non è riuscito a caricare il componente di file \".wasm\".\n    Se sei l'amministratore del server, assicurati che il file sia stato caricato correttamente.\n    Se il problema persiste, potrebbe essere necessario utilizzare l'impostazione \"publicPath\": si prega di consultare la wiki di Ruffle per aiuto.\nerror-wasm-mime-type =\n    Ruffle ha incontrato un problema importante durante il tentativo di inizializzazione.\n    Questo server web non serve \".wasm\" file con il tipo MIME corretto.\n    Se sei l'amministratore del server, consulta la wiki di Ruffle per aiuto.\nerror-invalid-swf =\n    Ruffle non può leggere il file richiesto.\n    La ragione più probabile è che il file non è un SWF valido.\nerror-swf-fetch =\n    Ruffle non è riuscito a caricare il file Flash SWF.\n    La ragione più probabile è che il file non esiste più, quindi non c'è nulla che Ruffle possa caricare.\n    Prova a contattare l'amministratore del sito web per aiuto.\nerror-swf-cors =\n    Ruffle non è riuscito a caricare il file SWF Flash.\n    L'accesso al recupero probabilmente è stato bloccato dalla politica CORS.\n    Se sei l'amministratore del server, consulta la wiki di Ruffle per ricevere aiuto.\nerror-wasm-cors =\n    Ruffle non è riuscito a caricare il componente di file \".wasm\".\n    L'accesso al recupero probabilmente è stato bloccato dalla politica CORS.\n    Se sei l'amministratore del server, consulta la wiki di Ruffle per ricevere aiuto.\nerror-wasm-invalid =\n    Ruffle ha incontrato un problema importante durante il tentativo di inizializzazione.\n    Sembra che questa pagina abbia file mancanti o non validi per l'esecuzione di Ruffle.\n    Se sei l'amministratore del server, consulta la wiki di Ruffle per ricevere aiuto.\nerror-wasm-download =\n    Ruffle ha incontrato un problema importante durante il tentativo di inizializzazione.\n    Questo può spesso risolversi da solo, quindi puoi provare a ricaricare la pagina.\n    Altrimenti, contatta l'amministratore del sito.\nerror-wasm-disabled-on-edge =\n    Ruffle non ha caricato il componente di file \".wasm\" richiesto.\n    Per risolvere il problema, prova ad aprire le impostazioni del tuo browser, facendo clic su \"Privacy, ricerca e servizi\", scorrendo verso il basso e disattivando \"Migliora la tua sicurezza sul web\".\n    Questo permetterà al tuo browser di caricare i file \".wasm\" richiesti.\n    Se il problema persiste, potresti dover usare un browser diverso.\nerror-wasm-unsupported-browser =\n    Il browser che stai usando non ha supporto per l'estensione WebAssembly che Ruffle richiede per funzionare.\n    Per favore cambi con un browser supportato.\n    Puoi trovare una lista di browser supportati nella Wiki.\nerror-javascript-conflict =\n    Ruffle ha riscontrato un problema importante durante il tentativo di inizializzazione.\n    Sembra che questa pagina utilizzi il codice JavaScript che è in conflitto con Ruffle.\n    Se sei l'amministratore del server, ti invitiamo a provare a caricare il file su una pagina vuota.\nerror-javascript-conflict-outdated = Puoi anche provare a caricare una versione più recente di Ruffle che potrebbe aggirare il problema (l'attuale build è obsoleta: { $buildDate }).\nerror-csp-conflict =\n    Ruffle ha incontrato un problema importante durante il tentativo di inizializzare.\n    La Politica di Sicurezza dei Contenuti di questo server web non consente l'impostazione richiesta\". asm\" componente da eseguire.\n    Se sei l'amministratore del server, consulta la Ruffle di wiki per aiuto.\nerror-unknown =\n    Ruffle ha incontrato un problema importante durante il tentativo di visualizzare questo contenuto Flash.\n    { $outdated ->\n        [true] Se sei l'amministratore del server, prova a caricare una versione più recente di Ruffle (la versione attuale è obsoleta: { $buildDate }).\n       *[false] Questo non dovrebbe accadere, quindi ci piacerebbe molto se si potesse inviare un bug!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Sei sicuro di voler eliminare questo file di salvataggio?\nsave-reload-prompt =\n    L'unico modo per { $action ->\n        [delete] delete\n       *[replace] replace\n    } questo salvataggio file senza potenziali conflitti è quello di ricaricare questo contenuto. Volete continuare comunque?\nsave-download = Scarica\nsave-replace = Sostituisci\nsave-delete = Elimina\nsave-backup-all = Scarica tutti i file di salvataggio\n",
    "volume-controls.ftl": "volume-controls-mute = Silenzia\nvolume-controls-unmute = Riattiva l'audio\n"
  },
  "ja-JP": {
    "context_menu.ftl": "context-menu-download-swf = .swfをダウンロード\ncontext-menu-copy-debug-info = デバッグ情報をコピー\ncontext-menu-open-save-manager = セーブマネージャーを開く\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Ruffle拡張機能について ({ $version })\n       *[other] Ruffleについて ({ $version })\n    }\ncontext-menu-hide = メニューを隠す\ncontext-menu-exit-fullscreen = フルスクリーンを終了\ncontext-menu-enter-fullscreen = フルスクリーンにする\ncontext-menu-volume-controls = 音量調節\n",
    "messages.ftl": "message-cant-embed =\n    Ruffleはこのページに埋め込まれた Flash を実行できませんでした。\n    別のタブでファイルを開くことで、この問題を解決できるかもしれません。\nmessage-restored-from-bfcache =\n    ブラウザは、前回のセッションからFlashコンテンツを復元しました。\n    最初から開始するには、ページを再読み込みしてください。\npanic-title = エラーが発生しました :(\nmore-info = 詳細情報\nrun-anyway = とにかく実行する\ncontinue = 続行\nreport-bug = バグを報告\nupdate-ruffle = Ruffleを更新\nruffle-demo = Webデモ\nruffle-desktop = デスクトップアプリ\nruffle-wiki = Ruffle Wikiを閲覧\nenable-hardware-acceleration = ハードウェア アクセラレーションが無効になっているようです。Ruffle は動作するかもしれませんが、非常に遅くなる可能性があります。ハードウェア アクセラレーションを有効にする方法については、以下のリンクを参照してください。\nenable-hardware-acceleration-link = よくある質問 - Chromeのハードウェア アクセラレーション\nview-error-details = エラーの詳細を表示\nopen-in-new-tab = 新しいタブで開く\nclick-to-unmute = クリックでミュートを解除\nclipboard-message-title = Ruffleでのコピーと貼り付け\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] お使いのブラウザはクリップボードへのフルアクセスをサポートしていません。\n        [access-denied] クリップボードへのアクセスが拒否されました。\n    } 代わりに、以下のショートカットを利用できます:\nclipboard-message-copy = { \" \" } : コピー\nclipboard-message-cut = { \" \" } : 切り取り\nclipboard-message-paste = { \" \" } : 貼り付け\nerror-canvas-reload = canvasレンダラ使用中のため、canvasレンダラによる再読み込みはできません。\nerror-file-protocol =\n    Ruffleを\"file:\"プロトコルで使用しているようです。\n    ブラウザはセキュリティ上の理由から多くの機能を制限しているため、正しく動作しません。\n    ローカルサーバーをセットアップするか、ウェブデモまたはデスクトップアプリをご利用ください。\nerror-javascript-config =\n    JavaScriptの設定が正しくないため、Ruffleで問題が発生しました。\n    サーバー管理者の方は、エラーの詳細から、どのパラメーターに問題があるのかを確認してください。\n    Ruffleのwikiを参照することで、解決方法が見つかるかもしれません。\nerror-wasm-not-found =\n    Ruffleは、必要な「.wasm」ファイルコンポーネントの読み込みに失敗しました。\n    サーバーの管理者は、ファイルが正しくアップロードされているか確認をしてください。問題が解決しない場合は、「publicPath」の設定が必要かもしれません。Ruffleのwikiを参照してください。\nerror-wasm-mime-type =\n    Ruffleの初期化中に大きな問題が発生しました。\n    このWebサーバーは「.wasm」ファイルを正しいMIMEタイプで提供していません。\n    サーバーの管理者は、Ruffleのwikiを参照してください。\nerror-invalid-swf =\n    Ruffle はリクエストされたファイルのパースに失敗しました。\n    最も考えられる原因は、ファイルが有効な SWF でないことです。\nerror-swf-fetch =\n    RuffleがFlash SWFファイルの読み込みに失敗しました。\n    読み込むべきファイルが既に存在していないことが原因である可能性が高いです。\n    Webサイトの管理者にお問い合わせください。\nerror-swf-cors =\n    RuffleはSWFファイルの読み込みに失敗しました。\n    CORSポリシーの設定により、fetchへのアクセスがブロックされている可能性があります。\n    サーバー管理者の方は、Ruffleのwikiを参照してください。\nerror-wasm-cors =\n    Ruffleに必要となる「.wasm」ファイルコンポーネントの読み込みに失敗しました。\n    CORSポリシーによってfetchへのアクセスがブロックされている可能性があります。\n    サーバーの管理者は、Ruffle wikiを参照してください。\nerror-wasm-invalid =\n    Ruffleの初期化時に重大な問題が発生しました。\n    このページにはRuffleを実行するためのファイルが存在しないか、無効なファイルがあるかもしれません。\n    サーバーの管理者は、Ruffleのwikiを参照してください。\nerror-wasm-download =\n    Ruffleの初期化時に重大な問題が発生しました。\n    この問題は自然に解決する場合があるため、ページの再読み込みを試してください。\n    それでも解決しない場合は、Webサイトの管理者にお問い合わせください。\nerror-wasm-disabled-on-edge =\n    Ruffleに必要となる「.wasm」ファイルコンポーネントの読み込みに失敗しました。\n    問題解決のため、ブラウザーの設定画面から、「プライバシー、検索、サービス」をクリックし、下にスクロールして「Web上のセキュリティを強化する」をオフにしてみてください。\n    必要となる「.wasm」ファイルの読み込みが許可されます。\n    それでも問題が解決しない場合、別のブラウザーを使用する必要があるかもしれません。\nerror-wasm-unsupported-browser =\n    現在使用中のブラウザは、Ruffleの動作に必要なWebAssembly拡張をサポートしていません。\n    サポートされているブラウザをご利用ください。\n    サポートされているブラウザ一覧は、Wikiに記載されています。\nerror-javascript-conflict =\n    Ruffleの初期化時に重大な問題が発生しました。\n    このページではRuffleと競合するJavaScriptコードが使用されているかもしれません。\n    サーバーの管理者は、空白のページでファイルを読み込みし直してみてください。\nerror-javascript-conflict-outdated = 新しいバージョンのRuffleをアップロードすることで、この問題を回避できる可能性があります。(現在のビルドは古い物です:{ $buildDate })\nerror-csp-conflict =\n    Ruffleの初期化時に重大な問題が発生しました。\n    このWebサーバーのコンテンツセキュリティポリシーが実行に必要となる「.wasm」コンポーネントの実行を許可していません。\n    サーバーの管理者は、Ruffleのwikiを参照してください。\nerror-unknown =\n    Flashコンテンツを表示する際にRuffleで問題が発生しました。\n    { $outdated ->\n        [true] 現在使用しているビルドは最新ではないため、サーバー管理者の方は、最新版のRuffleに更新してみてください(現在利用中のビルド: { $buildDate })。\n       *[false] 想定外の問題なので、バグとして報告していただけると嬉しいです!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = このセーブファイルを削除してもよろしいですか?\nsave-reload-prompt =\n    セーブファイルを競合の可能性なく { $action ->\n        [delete] 削除する\n       *[replace] 置き換える\n    } ために、このコンテンツを再読み込みすることを推奨します。続行しますか？\nsave-download = ダウンロード\nsave-replace = 置き換え\nsave-delete = 削除\nsave-backup-all = すべてのセーブファイルをダウンロード\n",
    "volume-controls.ftl": "volume-controls-mute = ミュート\nvolume-controls-unmute = ミュート解除\n"
  },
  "ko-KR": {
    "context_menu.ftl": "context-menu-download-swf = .swf 다운로드\ncontext-menu-copy-debug-info = 디버그 정보 복사\ncontext-menu-open-save-manager = 저장 관리자 열기\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Ruffle 확장 프로그램 정보 ({ $version })\n       *[other] Ruffle 정보 ({ $version })\n    }\ncontext-menu-hide = 이 메뉴 숨기기\ncontext-menu-exit-fullscreen = 전체화면 나가기\ncontext-menu-enter-fullscreen = 전체화면으로 열기\ncontext-menu-volume-controls = 음량 조절\n",
    "messages.ftl": "message-cant-embed = Ruffle이 이 페이지에 포함된 플래시를 실행할 수 없었습니다. 별도의 탭에서 파일을 열어봄으로서 이 문제를 해결할 수 있습니다.\nmessage-restored-from-bfcache =\n    브라우저가 이전 세션에서 플래시 콘텐츠를 복원했습니다.\n    새로 시작하려면 페이지를 새로 고침하세요.\npanic-title = 문제가 발생했습니다 :(\nmore-info = 추가 정보\nrun-anyway = 그래도 실행하기\ncontinue = 계속하기\nreport-bug = 버그 제보\nupdate-ruffle = Ruffle 업데이트\nruffle-demo = 웹 데모\nruffle-desktop = 데스크톱 애플리케이션\nruffle-wiki = Ruffle 위키 보기\nenable-hardware-acceleration = 하드웨어 가속이 비활성화되어 있는 것 같습니다. Ruffle은 계속 작동하지만 매우 느릴 수 있습니다. 아래 링크를 참고하여 하드웨어 가속을 활성화하는 방법을 찾아보세요:\nenable-hardware-acceleration-link = FAQ - 크롬 하드웨어 가속\nview-error-details = 오류 세부 정보 보기\nopen-in-new-tab = 새 탭에서 열기\nclick-to-unmute = 클릭하여 음소거 해제\nclipboard-message-title = Ruffle에서 복사하고 붙여넣기\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] 이 브라우저는 클립보드 액세스를 지원하지 않습니다,\n        [access-denied] 클립보드 액세스가 거절되었습니다,\n    } 하지만 다음 단축키를 대신 사용할 수 있습니다:\nclipboard-message-copy = { \" \" } 복사\nclipboard-message-cut = { \" \" } 잘라내기\nclipboard-message-paste = { \" \" } 붙여넣기\nerror-canvas-reload = 캔버스 렌더러가 이미 사용 중인 경우 캔버스 렌더러로 다시 로드할 수 없습니다.\nerror-file-protocol =\n    Ruffle을 \"file:\" 프로토콜에서 실행하고 있는 것으로 보입니다.\n    브라우저에서는 이 프로토콜을 보안상의 이유로 많은 기능을 작동하지 않게 차단하므로 이 방법은 작동하지 않습니다.\n    대신, 로컬 서버를 직접 열어서 설정하거나 웹 데모 또는 데스크톱 애플리케이션을 사용하시기 바랍니다.\nerror-javascript-config =\n    잘못된 자바스크립트 설정으로 인해 Ruffle에서 중대한 문제가 발생했습니다.\n    만약 당신이 서버 관리자인 경우, 오류 세부사항을 확인하여 어떤 매개변수가 잘못되었는지 알아보세요.\n    또는 Ruffle 위키를 통해 도움을 받아 볼 수도 있습니다.\nerror-wasm-not-found =\n    Ruffle이 \".wasm\" 필수 파일 구성요소를 로드하지 못했습니다.\n    만약 당신이 서버 관리자라면 파일이 올바르게 업로드되었는지 확인하세요.\n    문제가 지속된다면 \"publicPath\" 옵션을 사용해야 할 수도 있습니다: Ruffle 위키를 참조하여 도움을 받으세요.\nerror-wasm-mime-type =\n    Ruffle이 초기화를 시도하는 동안 중대한 문제가 발생했습니다.\n    이 웹 서버는 올바른 MIME 유형의 \".wasm\" 파일을 제공하지 않습니다.\n    만약 당신이 서버 관리자라면 Ruffle 위키를 통해 도움을 받으세요.\nerror-invalid-swf =\n    Ruffle이 요청한 파일을 분석하지 못했습니다.\n    요청한 파일이 유효한 SWF 파일이 아닐 가능성이 높습니다.\nerror-swf-fetch =\n    Ruffle이 플래시 SWF 파일을 로드하는 데 실패하였습니다.\n    이는 주로 파일이 더 이상 존재하지 않아 Ruffle이 로드할 수 있는 것이 없을 가능성이 높습니다.\n    웹사이트 관리자에게 문의하여 도움을 받아보세요.\nerror-swf-cors =\n    Ruffle이 플래시 SWF 파일을 로드하는 데 실패하였습니다.\n    CORS 정책에 의해 데이터 가져오기에 대한 액세스가 차단되었을 수 있습니다.\n    만약 당신이 서버 관리자라면 Ruffle 위키를 참조하여 도움을 받아볼 수 있습니다.\nerror-wasm-cors =\n    Ruffle이 \".wasm\" 필수 파일 구성요소를 로드하지 못했습니다.\n    CORS 정책에 의해 데이터 가져오기에 대한 액세스가 차단되었을 수 있습니다.\n    만약 당신이 서버 관리자라면 Ruffle 위키를 참조하여 도움을 받아볼 수 있습니다.\nerror-wasm-invalid =\n    Ruffle이 초기화를 시도하는 동안 중대한 문제가 발생했습니다.\n    이 페이지에 Ruffle을 실행하기 위한 파일이 누락되었거나 잘못된 것 같습니다.\n    만약 당신이 서버 관리자라면 Ruffle 위키를 참조하여 도움을 받아볼 수 있습니다.\nerror-wasm-download =\n    Ruffle이 초기화를 시도하는 동안 중대한 문제가 발생했습니다.\n    이 문제는 때때로 바로 해결될 수 있으므로 페이지를 새로고침하여 다시 시도해보세요.\n    그래도 문제가 지속된다면, 웹사이트 관리자에게 문의해주세요.\nerror-wasm-disabled-on-edge =\n    Ruffle이 \".wasm\" 필수 파일 구성요소를 로드하지 못했습니다.\n    이를 해결하려면 브라우저 설정에서 \"개인 정보, 검색 및 서비스\"를 클릭한 후, 하단으로 스크롤하여 \"웹에서 보안 강화\" 기능을 꺼야 합니다.\n    이는 필요한 \".wasm\" 파일을 브라우저에서 로드할 수 있도록 허용합니다.\n    이 문제가 지속될 경우 다른 브라우저를 사용해야 할 수 있습니다.\nerror-wasm-unsupported-browser =\n    사용 중인 브라우저에서 Ruffle이 필요한 웹 어셈블리 확장을 지원하지 않습니다.\n    지원되는 브라우저로 전환하세요. 지원되는 브라우저 목록은 위키에서 확인할 수 있습니다.\nerror-javascript-conflict =\n    Ruffle이 초기화를 시도하는 동안 중대한 문제가 발생했습니다.\n    이 페이지에서 사용되는 자바스크립트 코드가 Ruffle과 충돌하는 것으로 보입니다.\n    만약 당신이 서버 관리자라면 빈 페이지에서 파일을 로드해보세요.\nerror-javascript-conflict-outdated = 또한 Ruffle의 최신 버전을 업로드하는 것을 시도하여 문제를 우회해볼 수 있습니다. (현재 빌드가 오래되었습니다: { $buildDate }).\nerror-csp-conflict =\n    Ruffle이 초기화를 시도하는 동안 중대한 문제가 발생했습니다.\n    이 웹 서버의 CSP(Content Security Policy) 정책이 \".wasm\" 필수 구성요소를 실행하는 것을 허용하지 않습니다.\n    만약 당신이 서버 관리자라면 Ruffle 위키를 참조하여 도움을 받아볼 수 있습니다.\nerror-unknown =\n    Ruffle이 플래시 콘텐츠를 표시하려고 시도하는 동안 중대한 문제가 발생했습니다.\n    { $outdated ->\n        [true] 만약 당신이 서버 관리자라면, Ruffle의 최신 버전을 업로드하여 다시 시도해보세요. (현재 빌드가 오래되었습니다: { $buildDate }).\n       *[false] 이런 현상이 발생해서는 안되므로, 버그를 제보해주신다면 감사하겠습니다!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = 정말로 이 세이브 파일을 삭제하시겠습니까?\nsave-reload-prompt =\n    \b이 파일을 잠재적인 충돌 없이 { $action ->\n        [delete] 삭제\n       *[replace] 교체\n    }하려면 콘텐츠를 다시 로드해야 합니다. 그래도 계속하시겠습니까?\nsave-download = 다운로드\nsave-replace = 교체\nsave-delete = 삭제\nsave-backup-all = 모든 저장 파일 다운로드\n",
    "volume-controls.ftl": "volume-controls-mute = 음소거\nvolume-controls-unmute = 음소거 해제\n"
  },
  "nb-NO": {
    "context_menu.ftl": "context-menu-download-swf = Last ned .swf\ncontext-menu-copy-debug-info = Kopier feilsøkningsinfo\ncontext-menu-open-save-manager = Åpne lagringsadministrasjon\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Om Ruffle-tillegget ({ $version })\n       *[other] Om Ruffle ({ $version })\n    }\ncontext-menu-hide = Skjul denne menyen\ncontext-menu-exit-fullscreen = Avslutt fullskjermmodus\ncontext-menu-enter-fullscreen = Fullskjermmodus\ncontext-menu-volume-controls = Justering av lydnivå\n",
    "messages.ftl": "",
    "save-manager.ftl": "",
    "volume-controls.ftl": "volume-controls-mute = Demp\nvolume-controls-unmute = Skru på lyd\n"
  },
  "nl-NL": {
    "context_menu.ftl": "context-menu-download-swf = .swf downloaden\ncontext-menu-copy-debug-info = Kopieer debuginformatie\ncontext-menu-open-save-manager = Open opgeslagen-data-manager\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Over Ruffle Uitbreiding ({ $version })\n       *[other] Over Ruffle ({ $version })\n    }\ncontext-menu-hide = Verberg dit menu\ncontext-menu-exit-fullscreen = Verlaat volledig scherm\ncontext-menu-enter-fullscreen = Naar volledig scherm\ncontext-menu-volume-controls = Volumeregelaars\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle kon de Flash-inhoud op de pagina niet draaien.\n    Je kan proberen het bestand in een apart tabblad te openen, om hier omheen te werken.\nmessage-restored-from-bfcache =\n    Je browser heeft deze Flash-inhoud uit een eerdere sessie hersteld.\n    Herlaad de pagina voor een frisse start.\npanic-title = Er ging iets mis :(\nmore-info = Meer informatie\nrun-anyway = Toch starten\ncontinue = Doorgaan\nreport-bug = Bug rapporteren\nupdate-ruffle = Ruffle updaten\nruffle-demo = Web Demo\nruffle-desktop = Desktopapplicatie\nruffle-wiki = Bekijk de Ruffle Wiki\nenable-hardware-acceleration = Het lijkt erop dat hardwareversnelling is uitgeschakeld. Ruffle zou hierdoor erg traag kunnen zijn. In de link hieronder wordt uitgelegd hoe je hardwareversnelling kunt inschakelen:\nenable-hardware-acceleration-link = FAQ - Chrome Hardwareversnelling\nview-error-details = Foutdetails tonen\nopen-in-new-tab = Openen in een nieuw tabblad\nclick-to-unmute = Klik om te ontdempen\nclipboard-message-title = Kopiëren en plakken in Ruffle\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] Je browser heeft geen ondersteuning voor volledige toegang tot het klembord,\n        [access-denied] Toegang tot het klembord werd geweigerd,\n    } maar je kunt altijd nog de volgende sneltoetsen gebruiken:\nclipboard-message-copy = { \" \" } om te kopiëren\nclipboard-message-cut = { \" \" } om te knippen\nclipboard-message-paste = { \" \" } om te plakken\nerror-canvas-reload = De canvas renderer kan niet herladen worden wanneer deze al in gebruik is.\nerror-file-protocol =\n    Het lijkt erop dat je Ruffle gebruikt met het \"file\" protocol.\n    De meeste browsers blokkeren dit om veiligheidsredenen, waardoor het niet werkt.\n    In plaats hiervan raden we aan om een lokale server te draaien, de web demo te gebruiken, of de desktopapplicatie.\nerror-javascript-config =\n    Ruffle heeft een groot probleem ondervonden vanwege een onjuiste JavaScript configuratie.\n    Als je de serverbeheerder bent, kijk dan naar de foutdetails om te zien wat er verkeerd is.\n    Je kan ook in de Ruffle wiki kijken voor hulp.\nerror-wasm-not-found =\n    Ruffle kon het vereiste \".wasm\" bestandscomponent niet laden.\n    Als je de serverbeheerder bent, controleer dan of het bestaand juist is geüpload.\n    Mocht het probleem blijven voordoen, moet je misschien de \"publicPath\" instelling gebruiken: zie ook de Ruffle wiki voor hulp.\nerror-wasm-mime-type =\n    Ruffle heeft een groot probleem ondervonden tijdens het initialiseren.\n    Deze webserver serveert \".wasm\" bestanden niet met het juiste MIME type.\n    Als je de serverbeheerder bent, kijk dan in de Ruffle wiki voor hulp.\nerror-invalid-swf =\n    Ruffle kon het gevraagde bestand niet verwerken.\n    Waarschijnlijk is het geen geldig SWF bestand.\nerror-swf-fetch =\n    Ruffle kon het Flash SWF bestand niet inladen.\n    De meest waarschijnlijke reden is dat het bestand niet langer bestaat, en er dus niets is om in te laden.\n    Probeer contact op te nemen met de websitebeheerder voor hulp.\nerror-swf-cors =\n    Ruffle kon het Flash SWD bestand niet inladen.\n    Toegang is waarschijnlijk geblokeerd door het CORS beleid.\n    Als je de serverbeheerder bent, kijk dan in de Ruffle wiki voor hulp.\nerror-wasm-cors =\n    Ruffle kon het vereiste \".wasm\" bestandscomponent niet laden.\n    Toegang is waarschijnlijk geblokeerd door het CORS beleid.\n    Als je de serverbeheerder bent, kijk dan in de Ruffle wiki voor hulp.\nerror-wasm-invalid =\n    Ruffle heeft een groot probleem ondervonden tijdens het initialiseren.\n    Het lijkt erop dat de Ruffle bestanden ontbreken of ongeldig zijn.\n    Als je de serverbeheerder bent, kijk dan in de Ruffle wiki voor hulp.\nerror-wasm-download =\n    Ruffle heeft een groot probleem ondervonden tijdens het initialiseren.\n    Dit lost zichzelf vaak op als je de bladzijde opnieuw inlaadt.\n    Zo niet, neem dan contact op met de websitebeheerder.\nerror-wasm-disabled-on-edge =\n    Ruffle kon het vereiste \".wasm\" bestandscomponent niet laden.\n    Om dit op te lossen, ga naar je browserinstellingen, klik op \"Privacy, zoeken en diensten\", scroll omlaag, en schakel \"Verbeter je veiligheid op he web\" uit.\n    Dan kan je browser wel de vereiste \".wasm\" bestanden inladen.\n    Als het probleem zich blijft voordoen, moet je misschien een andere browser gebruiken.\nerror-wasm-unsupported-browser =\n    De browser die je gebruikt ondersteunt de WebAssembly extensies die Ruffle nodig heeft niet.\n    Gebruik alsjeblieft een ondersteunde browser.\n    Je kunt een lijst aan ondersteunde browsers vinden op de Wiki.\nerror-javascript-conflict =\n    Ruffle heeft een groot probleem ondervonden tijdens het initialiseren.\n    Het lijkt erop dat deze pagina JavaScript code gebruikt die conflicteert met Ruffle.\n    Als je de serverbeheerder bent, raden we aan om het bestand op een lege pagina te proberen in te laden.\nerror-javascript-conflict-outdated = Je kan ook proberen een nieuwe versie van Ruffle te installeren, om om het probleem heen te werken (huidige versie is oud: { $buildDate }).\nerror-csp-conflict =\n    Ruffle heeft een groot probleem ondervonden tijdens het initialiseren.\n    Het CSP-beleid staat niet toe dat het vereiste \".wasm\" component kan draaien.\n    Als je de serverbeheerder bent, kijk dan in de Ruffle wiki voor hulp.\nerror-unknown =\n    Ruffle heeft een groot probleem onderbonden tijdens het weergeven van deze Flash-inhoud.\n    { $outdated ->\n        [true] Als je de serverbeheerder bent, upload dan een nieuwe versie van Ruffle (huidige versie is oud: { $buildDate }).\n       *[false] Dit hoort niet te gebeuren, dus we stellen het op prijs als je de fout aan ons rapporteert!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Weet je zeker dat je deze opgeslagen data wilt verwijderen?\nsave-reload-prompt =\n    De enige manier om deze opgeslagen data te { $action ->\n        [delete] verwijderen\n       *[replace] vervangen\n    } zonder potentiële problemen is door de inhoud opnieuw te laden. Toch doorgaan?\nsave-download = Downloaden\nsave-replace = Vervangen\nsave-delete = Verwijderen\nsave-backup-all = Download alle opgeslagen data\n",
    "volume-controls.ftl": "volume-controls-mute = Dempen\nvolume-controls-unmute = Dempen opheffen\n"
  },
  "pl-PL": {
    "context_menu.ftl": "context-menu-download-swf = Pobierz .swf\ncontext-menu-copy-debug-info = Kopiuj informacje debugowania\ncontext-menu-open-save-manager = Otwórz menadżer zapisów\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] O rozszerzeniu Ruffle ({ $version })\n       *[other] O Ruffle ({ $version })\n    }\ncontext-menu-hide = Ukryj to menu\ncontext-menu-exit-fullscreen = Opuść tryb pełnoekranowy\ncontext-menu-enter-fullscreen = Tryb pełnoekranowy\ncontext-menu-volume-controls = Sterowanie głośnością\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle nie było w stanie uruchomić zawartości Flash w tej stronie.\n    Możesz spróbować otworzyć plik w nowej karcie, aby uniknąć tego problemu.\nmessage-restored-from-bfcache =\n    Twoja przeglądarka przywróciła tę zawartość Flash z poprzedniej sesji.\n    Aby zacząć od nowa, odśwież stronę.\npanic-title = Coś poszło nie tak :(\nmore-info = Więcej informacji\nrun-anyway = Uruchom mimo tego\ncontinue = Kontynuuj\nreport-bug = Zgłoś błąd\nupdate-ruffle = Zaktualizuj Ruffle\nruffle-demo = Webowe demo\nruffle-desktop = Aplikacja na komputer\nruffle-wiki = Zobacz Wiki Ruffle\nenable-hardware-acceleration = Wygląda na to, że akceleracja grafiki jest wyłączona. Chociaż Ruffle może działać, może być bardzo powolny. Możesz dowiedzieć się, jak włączyć akcelerację grafiki, klikając poniższy link:\nenable-hardware-acceleration-link = FAQ — Akceleracja Grafiki Chrome\nview-error-details = Zobacz szczegóły błędu\nopen-in-new-tab = Otwórz w nowej karcie\nclick-to-unmute = Kliknij aby wyłączyć wyciszenie\nclipboard-message-title = Kopiowanie i wklejanie w Ruffle\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] Twoja przeglądarka nie obsługuje pełnego dostępu do schowka,\n        [access-denied] Odmówiono dostępu do schowka,\n    } ale zawsze możesz stosować te skróty klawiszowe:\nclipboard-message-copy = { \" \" } w celu skopiowania\nclipboard-message-cut = { \" \" } w celu wycięcia\nclipboard-message-paste = { \" \" } w celu wklejenia\nerror-canvas-reload = Nie można ponownie załadować renderera canvas, gdy jest już on używany.\nerror-file-protocol =\n    Wygląda na to, że używasz Ruffle z protokołem \"file:\".\n    To nie działa, ponieważ przeglądarka blokuje wiele funkcji przed działaniem ze względów bezpieczeństwa.\n    Zamiast tego zachęcamy do konfiguracji lokalnego serwera lub użycia webowego demo lub aplikacji desktopowej.\nerror-javascript-config =\n    Ruffle napotkał poważny problem z powodu nieprawidłowej konfiguracji JavaScript.\n    Jeśli jesteś administratorem serwera, prosimy o sprawdzenie szczegółów błędu, aby dowiedzieć się, który parametr jest błędny.\n    Możesz również zapoznać się z wiki Ruffle, aby uzyskać pomoc.\nerror-wasm-not-found =\n    Nie udało się załadować wymaganego komponentu pliku \".wasm\".\n    Jeśli jesteś administratorem serwera, upewnij się, że plik został poprawnie przesłany.\n    Jeśli problem będzie się powtarzał, być może będziesz musiał użyć ustawienia \"publicPath\": zapoznaj się z wiki Ruffle, aby uzyskać pomoc.\nerror-wasm-mime-type =\n    Ruffle napotkał poważny problem podczas próby zainicjowania.\n    Ten serwer nie serwuje plików \".wasm\" z poprawnym typem MIME.\n    Jeśli jesteś administratorem serwera, zasięgnij pomocy na wiki Ruffle.\nerror-invalid-swf =\n    Ruffle nie może przetworzyć żądanego pliku.\n    Prawdopodobnie to nie jest poprawny plik SWF.\nerror-swf-fetch =\n    Nie udało się załadować pliku Flash SWF.\n    Najbardziej prawdopodobnym powodem jest to, że plik już nie istnieje, więc Ruffle nie ma co załadować.\n    Spróbuj skontaktować się z administratorem witryny, aby uzyskać pomoc.\nerror-swf-cors =\n    Nie udało się załadować pliku Flash SWF.\n    Pobieranie zostało prawdopodobnie zablokowane przez politykę CORS.\n    Jeśli jesteś administratorem serwera, zasięgnij pomocy na wiki Ruffle.\nerror-wasm-cors =\n    Nie udało się załadować wymaganego komponentu pliku \".wasm\".\n    Pobieranie zostało prawdopodobnie zablokowane przez politykę CORS.\n    Jeśli jesteś administratorem serwera, zasięgnij pomocy na wiki Ruffle.\nerror-wasm-invalid =\n    Ruffle napotkał poważny problem podczas próby zainicjowania.\n    Wygląda na to, że ta strona ma brakujące lub nieprawidłowe pliki niezbędne do uruchomienia Ruffle.\n    Jeśli jesteś administratorem serwera, zasięgnij pomocy na wiki Ruffle.\nerror-wasm-download =\n    Ruffle napotkał poważny problem podczas próby zainicjowania.\n    Ten problem często sam się rozwiązuje, więc możesz spróbować odświeżyć stronę.\n    W przeciwnym razie skontaktuj się z administratorem witryny.\nerror-wasm-disabled-on-edge =\n    Ruffle nie udało się załadować wymaganego komponentu pliku \".wasm\".\n    Aby to naprawić, spróbuj otworzyć ustawienia przeglądarki, klikając \"Prywatność, wyszukiwanie i usługi\", przewijając w dół i wyłączając \"Zwiększ bezpieczeństwo w sieci\".\n    Pozwoli to przeglądarce załadować wymagane pliki \".wasm\".\n    Jeśli problem będzie się powtarzał, być może będziesz musiał użyć innej przeglądarki.\nerror-wasm-unsupported-browser =\n    Przeglądarka, której używasz, nie obsługuje rozszerzeń WebAssembly wymaganych do działania Ruffle.\n    Proszę użyć obsługiwanej przeglądarki.\n    Listę obsługiwanych przeglądarek znajdziesz na Wiki.\nerror-javascript-conflict =\n    Ruffle napotkał poważny problem podczas próby zainicjowania.\n    Wygląda na to, że ta strona używa kodu JavaScript, który koliduje z Ruffle.\n    Jeśli jesteś administratorem serwera, zapraszamy Cię do ładowania pliku na pustej stronie.\nerror-javascript-conflict-outdated = Możesz również spróbować przesłać nowszą wersję Ruffle, która może ominąć problem (obecna wersja jest przestarzała: { $buildDate }).\nerror-csp-conflict =\n    Ruffle napotkał poważny problem podczas próby zainicjowania.\n    Polityka bezpieczeństwa zawartości tego serwera (CSP) nie zezwala na komponent \".wasm\" wymagany do uruchomienia.\n    Jeśli jesteś administratorem serwera, zasięgnij pomocy na wiki Ruffle.\nerror-unknown =\n    Ruffle napotkał poważny problem podczas próby wyświetlenia tej zawartości Flash.\n    { $outdated ->\n        [true] Jeśli jesteś administratorem serwera, spróbuj zaktualizować Ruffle (obecna wersja jest przestarzała: { $buildDate }).\n       *[false] To nie powinno się wydarzyć, więc bylibyśmy wdzięczni, gdybyś zgłosił błąd!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Czy na pewno chcesz skasować ten plik zapisu?\nsave-reload-prompt =\n    Jedyną opcją, aby { $action ->\n        [delete] usunąć\n       *[replace] zamienić\n    } ten plik zapisu bez potencjalnych konfliktów jest przeładowanie zawartości. Czy chcesz kontynuować?\nsave-download = Pobierz\nsave-replace = Zamień\nsave-delete = Usuń\nsave-backup-all = Pobierz wszystkie pliki zapisu\n",
    "volume-controls.ftl": "volume-controls-mute = Wycisz\nvolume-controls-unmute = Wyłącz wyciszenie\n"
  },
  "pt-BR": {
    "context_menu.ftl": "context-menu-download-swf = Baixar .swf\ncontext-menu-copy-debug-info = Copiar informação de depuração\ncontext-menu-open-save-manager = Abrir o gerenciador de salvamento\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Sobre a extensão do Ruffle ({ $version })\n       *[other] Sobre o Ruffle ({ $version })\n    }\ncontext-menu-hide = Esconder este menu\ncontext-menu-exit-fullscreen = Sair da tela cheia\ncontext-menu-enter-fullscreen = Entrar em tela cheia\ncontext-menu-volume-controls = Controles de volume\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle não conseguiu executar o Flash incorporado nesta página.\n    Você pode tentar abrir o arquivo em uma guia separada para evitar esse problema.\nmessage-restored-from-bfcache =\n    Seu navegador restaurou este conteúdo Flash de uma sessão anterior.\n    Para começar do zero, recarregue a página.\npanic-title = Algo deu errado :(\nmore-info = Mais informação\nrun-anyway = Executar mesmo assim\ncontinue = Continuar\nreport-bug = Reportar bug\nupdate-ruffle = Atualizar Ruffle\nruffle-demo = Demo Web\nruffle-desktop = Aplicativo de desktop\nruffle-wiki = Ver guia oficial do Ruffle\nenable-hardware-acceleration = Parece que a aceleração de hardware está desabilitada. Embora o Ruffle possa funcionar, ele pode ser muito lento. Você pode descobrir como habilitar a aceleração de hardware seguindo o link abaixo:\nenable-hardware-acceleration-link = FAQ — Aceleração de hardware no Chrome\nview-error-details = Ver detalhes do erro\nopen-in-new-tab = Abrir em uma nova guia\nclick-to-unmute = Clique para ativar o som\nclipboard-message-title = Copiando e colando no Ruffle\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] Seu navegador não suporta acesso total à área de transferência,\n        [access-denied] O acesso à área de transferência foi negado,\n    } mas você sempre pode usar estes atalhos:\nclipboard-message-copy = { \" \" } para copiar\nclipboard-message-cut = { \" \" } para recortar\nclipboard-message-paste = { \" \" } para colar\nerror-canvas-reload = Não é possível recarregar com o renderizador canvas enquanto ele já está em uso.\nerror-file-protocol =\n    Parece que você está executando o Ruffle no protocolo \"file:\".\n    Isto não funciona como navegadores bloqueiam muitos recursos de funcionar por razões de segurança.\n    Ao invés disso, convidamos você a configurar um servidor local ou a usar a demonstração da web, ou o aplicativo de desktop.\nerror-javascript-config =\n    O Ruffle encontrou um grande problema devido a uma configuração incorreta do JavaScript.\n    Se você for o administrador do servidor, convidamos você a verificar os detalhes do erro para descobrir qual parâmetro está com falha.\n    Você também pode consultar o guia oficial do Ruffle para obter ajuda.\nerror-wasm-not-found =\n    Ruffle falhou ao carregar o componente de arquivo \".wasm\" necessário.\n    Se você é o administrador do servidor, por favor, certifique-se de que o arquivo foi carregado corretamente.\n    Se o problema persistir, você pode precisar usar a configuração \"publicPath\": por favor consulte o guia oficial do Ruffle para obter ajuda.\nerror-wasm-mime-type =\n    Ruffle encontrou um grande problema ao tentar inicializar.\n    Este servidor de web não está servindo \".wasm\" arquivos com o tipo MIME correto.\n    Se você é o administrador do servidor, por favor consulte o guia oficial do Ruffle para obter ajuda.\nerror-invalid-swf =\n    Ruffle não pode analisar o arquivo solicitado.\n    O motivo provável é que o arquivo solicitado não seja um SWF válido.\nerror-swf-fetch =\n    Ruffle falhou ao carregar o arquivo Flash SWF.\n    A razão provável é que o arquivo não existe mais, então não há nada para o Ruffle carregar.\n    Tente contatar o administrador do site para obter ajuda.\nerror-swf-cors =\n    O Ruffle não conseguiu carregar o arquivo SWF do Flash.\n    O acesso à requisição provavelmente foi bloqueado pela política de CORS.\n    Se você for o administrador do servidor, consulte o guia oficial do Ruffle para obter ajuda.\nerror-wasm-cors =\n    O Ruffle não conseguiu carregar o componente obrigatório do arquivo “.wasm”.\n    O acesso à busca provavelmente foi bloqueado pela política de CORS.\n    Se você é o administrador do servidor, consulte o guia oficial do Ruffle para obter ajuda.\nerror-wasm-invalid =\n    O Ruffle encontrou um erro grave ao tentar iniciar.\n    Parece que esta página possui arquivos ausentes ou inválidos para executar o Ruffle.\n    Se você é o administrador do servidor, consulte o guia oficial do Ruffle para obter assistência.\nerror-wasm-download =\n    O Ruffle encontrou um grande problema ao tentar inicializar.\n    Muitas vezes isso pode se resolver sozinho, então você pode tentar recarregar a página.\n    Caso contrário, contate o administrador do site.\nerror-wasm-disabled-on-edge =\n    O Ruffle falhou ao carregar o componente de arquivo \".wasm\" necessário.\n    Para corrigir isso, tente abrir configurações do seu navegador, clicando em \"Privacidade, pesquisa e serviços\", rolando para baixo e desativando \"Melhore sua segurança na web\".\n    Isso permitirá que seu navegador carregue os arquivos \".wasm\" necessários.\n    Se o problema persistir, talvez seja necessário usar um navegador diferente.\nerror-wasm-unsupported-browser =\n    O navegador que você está usando não oferece suporte às extensões WebAssembly necessárias para o Ruffle funcionar.\n    Por favor, mude para um navegador compatível.\n    Você pode encontrar uma lista de navegadores compatíveis no guia oficial.\nerror-javascript-conflict =\n    Ruffle encontrou um grande problema ao tentar inicializar.\n    Parece que esta página usa código JavaScript que entra em conflito com o Ruffle.\n    Se você for o administrador do servidor, convidamos você a tentar carregar o arquivo em uma página em branco.\nerror-javascript-conflict-outdated = Você também pode tentar fazer o upload de uma versão mais recente do Ruffle que pode contornar o problema (a compilação atual está desatualizada: { $buildDate }).\nerror-csp-conflict =\n    O Ruffle encontrou um problema grave ao tentar iniciar.\n    A Política de Segurança de Conteúdo deste servidor não permite a execução do componente “.wasm” necessário.\n    Se você for o administrador do servidor, consulte o guia oficial do Ruffle para obter ajuda.\nerror-unknown =\n    O Ruffle encontrou um grande problema enquanto tentava exibir este conteúdo em Flash.\n    { $outdated ->\n        [true] Se você é o administrador do servidor, por favor tente fazer o upload de uma versão mais recente do Ruffle (a compilação atual está desatualizada: { $buildDate }).\n       *[false] Isso não deveria acontecer, então apreciaríamos muito se você pudesse arquivar um bug!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Tem certeza que deseja excluir este arquivo de salvamento?\nsave-reload-prompt =\n    A única maneira de { $action ->\n        [delete] excluir\n       *[replace] substituir\n    } este arquivo sem potencial conflito é recarregar este conteúdo. Deseja continuar mesmo assim?\nsave-download = Baixar\nsave-replace = Substituir\nsave-delete = Excluir\nsave-backup-all = Baixar todos os arquivos de salvamento\n",
    "volume-controls.ftl": "volume-controls-mute = Silenciar\nvolume-controls-unmute = Ativar som\n"
  },
  "pt-PT": {
    "context_menu.ftl": "context-menu-download-swf = Descarga.swf\ncontext-menu-copy-debug-info = Copiar informações de depuração\ncontext-menu-open-save-manager = Abrir gestor de gravações\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Sobre a extensão do Ruffle ({ $version })\n       *[other] Sobre o Ruffle ({ $version })\n    }\ncontext-menu-hide = Esconder este menu\ncontext-menu-exit-fullscreen = Fechar ecrã inteiro\ncontext-menu-enter-fullscreen = Abrir ecrã inteiro\ncontext-menu-volume-controls = Controlos de volume\n",
    "messages.ftl": "message-cant-embed =\n    O Ruffle não conseguiu abrir o Flash integrado nesta página.\n    Para tentar resolver o problema, pode abrir o ficheiro num novo separador.\nmessage-restored-from-bfcache =\n    O seu navegador restaurou este conteúdo Flash de uma sessão anterior.\n    Para começar do zero, recarregue a página.\npanic-title = Algo correu mal :(\nmore-info = Mais informações\nrun-anyway = Executar mesmo assim\ncontinue = Continuar\nreport-bug = Reportar falha\nupdate-ruffle = Atualizar o Ruffle\nruffle-demo = Demonstração web\nruffle-desktop = Aplicação para computador\nruffle-wiki = Ver a wiki do Ruffle\nenable-hardware-acceleration = Parece que a aceleração de hardware está desativada. Mesmo que o Ruffle funcione, pode estar demasiado lento. Descubra como ativar a aceleração de hardware seguindo este link:\nenable-hardware-acceleration-link = Perguntas Frequentes - Aceleração de Hardware no Chrome\nview-error-details = Ver detalhes do erro\nopen-in-new-tab = Abrir num novo separador\nclick-to-unmute = Clique para ativar o som\nclipboard-message-title = Copiar e colar no Ruffle\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] O seu navegador não suporta acesso total à área de transferência,\n        [access-denied] O acesso à área de transferência foi negado,\n    } mas pode sempre usar estes atalhos em alternativa:\nclipboard-message-copy = { \" \" } para copiar\nclipboard-message-cut = { \" \" } para cortar\nclipboard-message-paste = { \" \" } para colar\nerror-canvas-reload = Não é possível recarregar com o renderizador canvas quando este já está em uso.\nerror-file-protocol =\n    Parece que executou o Ruffle no protocolo \"file:\".\n    Isto não funciona porque os navegadores bloqueiam muitas funcionalidades por segurança.\n    Em vez disto, experimente configurar um servidor local, ou então a usar a demonstração web ou a aplicação para computador.\nerror-javascript-config =\n    O Ruffle encontrou um problema grave devido a uma configuração de JavaScript incorreta.\n    Se é o administrador do servidor, experimente verificar os detalhes do erro para identificar o parâmetro em falha.\n    Pode ainda consultar a wiki do Ruffle para obter ajuda.\nerror-wasm-not-found =\n    O Ruffle falhou ao carregar o componente de ficheiro \".wasm\" necessário.\n    Se é o administrador do servidor, certifique-se de que o ficheiro foi devidamente carregado.\n    Se o problema persistir, talvez queira usar a configuração \"publicPath\": consulte a wiki do Ruffle para obter ajuda.\nerror-wasm-mime-type =\n    O Ruffle encontrou um problema grave ao tentar inicializar.\n    Este servidor web não está a servir ficheiros “.wasm” com o tipo MIME correto.\n    Se é o administrador do servidor, consulte a wiki do Ruffle para obter ajuda.\nerror-invalid-swf =\n    O Ruffle não consegue analisar o ficheiro solicitado.\n    O mais provável é que o ficheiro solicitado não seja um SWF válido.\nerror-swf-fetch =\n    O Ruffle falhou ao carregar o ficheiro Flash SWF.\n    O mais provável é que o ficheiro já não exista, daí não haver nada para o Ruffle carregar.\n    Tente contactar o administrador do site para obter ajuda.\nerror-swf-cors =\n    O Ruffle falhou ao carregar o ficheiro Flash SWF.\n    Obter o ficheiro (fetch) foi provavelmente bloqueado pela política CORS.\n    Se é o administrador do servidor, consulte a wiki do Ruffle para obter ajuda.\nerror-wasm-cors =\n    O Ruffle falhou ao carregar o componente de ficheiro \".wasm\" necessário.\n    Obter o ficheiro (fetch) foi provavelmente bloqueado pela política CORS.\n    Se é o administrador do servidor, consulte a wiki do Ruffle para obter ajuda.\nerror-wasm-invalid =\n    O Ruffle encontrou um problema grave ao tentar inicializar.\n    Parece que esta página tem ficheiros inválidos ou em falta para executar o Ruffle.\n    Se é o administrador do servidor, consulte a wiki do Ruffle para obter ajuda.\nerror-wasm-download =\n    O Ruffle encontrou um problema grave ao tentar inicializar.\n    Isto costuma resolver-se sozinho, por isso experimente recarregar a página.\n    Se não acontecer, contacte o administrador do site.\nerror-wasm-disabled-on-edge =\n    O Ruffle falhou ao carregar o componente de ficheiro \".wasm\" necessário.\n    Tente corrigir isto nas definições do navegador; clique em \"Privacidade, pesquisa e serviços\", deslize para baixo e desative \"Melhore a sua segurança na Web\".\n    Isto permitirá ao navegador carregar os ficheiros \".wasm\" necessários.\n    Se o problema persistir, talvez precise de um navegador diferente.\nerror-wasm-unsupported-browser =\n    O navegador que usa não suporta as extensões WebAssembly de que o Ruffle necessita para executar.\n    Deve mudar para um navegador suportado.\n    Pode encontrar uma lista de navegadores suportados na Wiki.\nerror-javascript-conflict =\n    O Ruffle encontrou um problema grave ao tentar inicializar.\n    Parece que esta página usa código JavaScript que entra em conflito com o Ruffle.\n    Se é o administrador do servidor, experimente carregar o ficheiro numa página em branco.\nerror-javascript-conflict-outdated = Pode ainda tentar carregar uma versão mais recente do Ruffle que talvez contorne o problema (a compilação atual está desatualizada: { $buildDate }).\nerror-csp-conflict =\n    O Ruffle encontrou um problema grave ao tentar inicializar.\n    A Política de Segurança de Conteúdos deste servidor web não permite executar o componente \".wasm\" necessário.\n    Se é o administrador do servidor, consulte a wiki do Ruffle para obter ajuda.\nerror-unknown =\n    O Ruffle encontrou um problema grave ao tentar apresentar este conteúdo Flash.\n    { $outdated ->\n        [true] Se é o administrador do servidor, tente carregar uma versão mais recente do Ruffle (a versão atual está desatualizada: { $buildDate }).\n       *[false] Não era suposto ter acontecido, por isso agradecíamos imenso se reportasse a falha!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Tem a certeza de que quer eliminar esta gravação?\nsave-reload-prompt =\n    A única forma de { $action ->\n        [delete] eliminar\n       *[replace] substituir\n    } esta gravação sem risco de conflito é recarregando este conteúdo. Deseja continuar na mesma?\nsave-download = Descarregar\nsave-replace = Substituir\nsave-delete = Eliminar\nsave-backup-all = Descarregar todas as gravações\n",
    "volume-controls.ftl": "volume-controls-mute = Silenciar\nvolume-controls-unmute = Ativar o som\n"
  },
  "ro-RO": {
    "context_menu.ftl": "context-menu-download-swf = Descarcă .swf\ncontext-menu-copy-debug-info = Copiază informațiile de depanare\ncontext-menu-open-save-manager = Deschide managerul de salvări\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Despre extensia Ruffle ({ $version })\n       *[other] Despre Ruffle ({ $version })\n    }\ncontext-menu-hide = Ascunde acest meniu\ncontext-menu-exit-fullscreen = Ieși din ecranul complet\ncontext-menu-enter-fullscreen = Intră în ecran complet\ncontext-menu-volume-controls = Comenzi pentru volum\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle nu a putut să ruleze Flash încorporat în această pagină.\n    Poți încerca să deschizi fișierul într-o filă separată, pentru a evita această problemă.\nmessage-restored-from-bfcache =\n    Browserul dvs. a restaurat acest conținut Flash dintr-o sesiune anterioară.\n    Pentru a începe de la zero, reîncărcați pagina.\npanic-title = Ceva a mers prost :(\nmore-info = Mai multe informații\nrun-anyway = Rulează oricum\ncontinue = Continuă\nreport-bug = Raportează un bug\nupdate-ruffle = Actualizează Ruffle\nruffle-demo = Demo web\nruffle-desktop = Aplicație desktop\nruffle-wiki = Vezi wikiul Ruffle\nenable-hardware-acceleration = Se pare că accelerarea hardware este dezactivată. Deși Ruffle ar putea funcționa, va fi foarte lent. Puteți afla cum să activați accelerarea hardware accesând linkul de mai jos:\nenable-hardware-acceleration-link = Întrebări frecvente - Accelerarea hardware Chrome\nview-error-details = Vezi detaliile erorii\nopen-in-new-tab = Deschide într-o filă nouă\nclick-to-unmute = Dă click pentru a dezmuți\nclipboard-message-title = Copierea și lipirea în Ruffle\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] Browserul dvs. nu acceptă accesul complet către clipboard,\n        [access-denied] Accesul la clipboard a fost refuzat,\n    } dar puteți oricând să utilizați aceste scurtături:\nclipboard-message-copy = { \" \" } pentru copiere\nclipboard-message-cut = { \" \" } pentru decupare\nclipboard-message-paste = { \" \" } pentru lipire\nerror-canvas-reload = Nu se poate reîncărca utilizând rendererul canvas atunci când acesta este deja folosit.\nerror-file-protocol =\n    Se pare că rulezi Ruffle pe protocolul „file:”.\n    Acesta nu funcționează, deoarece browserele blochează funcționarea multor funcții din motive de securitate.\n    În schimb, te invităm să configurezi un server local sau să folosești fie demoul web, fie aplicația desktop.\nerror-javascript-config =\n    Ruffle a întâmpinat o problemă majoră din cauza unei configurări incorecte a JavaScript.\n    Dacă ești administratorul serverului, te invităm să verifici detaliile erorii pentru a afla care parametru este defect.\n    De asemenea, poți consulta wikiul Ruffle pentru ajutor.\nerror-wasm-not-found =\n    Ruffle a eșuat la încărcarea componentei de fișier „.wasm”.\n    Dacă ești administratorul serverului, te rugăm să te asiguri că fișierul a fost încărcat corect.\n    Dacă problema persistă, poate fi necesar să folosești setarea „publicPath”: te rugăm să consulți wikiul Ruffle pentru ajutor.\nerror-wasm-mime-type =\n    Ruffle a întâmpinat o problemă majoră în timp ce încerca să se inițializeze.\n    Acest server web nu servește fișiere „.wasm” cu tipul MIME corect.\n    Dacă ești administratorul serverului, te rugăm să consulți wikiul Ruffle pentru ajutor.\nerror-invalid-swf =\n    Ruffle nu poate analiza fișierul solicitat.\n    Cel mai probabil motiv este că fișierul solicitat nu este un SWF valid.\nerror-swf-fetch =\n    Ruffle a eșuat la încărcarea fișierului SWF.\n    Motivul cel mai probabil este că fișierul nu mai există, deci Ruffle nu mai are ce să încarce.\n    Încearcă să contactezi administratorul site-ului web pentru ajutor.\nerror-swf-cors =\n    Ruffle a eșuat la încărcarea fișierului SWF.\n    Accesul de preluare a fost probabil blocat de politica CORS.\n    Dacă ești administratorul serverului, te rugăm să consulți wikiul Ruffle pentru ajutor.\nerror-wasm-cors =\n    Ruffle a eșuat la încărcarea componentei de fișier „.wasm”.\n    Accesul de preluare a fost probabil blocat de politica CORS.\n    Dacă ești administratorul serverului, te rugăm să consulți wikiul Ruffle pentru ajutor.\nerror-wasm-invalid =\n    Ruffle a întâmpinat o problemă majoră în timp ce încerca să se inițializeze.\n    Se pare că această pagină are fișiere lipsă sau nevalide pentru a rula Ruffle.\n    Dacă ești administratorul serverului, te rugăm să consulți wikiul Ruffle pentru ajutor.\nerror-wasm-download =\n    Ruffle a întâmpinat o problemă majoră în timp ce încerca să inițializeze.\n    Acest lucru se poate rezolva adesea de la sine, așa că poți încerca să reîncarci pagina.\n    În caz contrar, te rugăm să contactezi administratorul site-ului web.\nerror-wasm-disabled-on-edge =\n    Ruffle a eșuat la încărcarea componentei de fișier „.wasm”.\n    Pentru a remedia acest lucru, încearcă să deschizi setările browserului, să faci clic pe „Confidențialitate, căutare și servicii”, să derulezi în jos și să dezactivezi „Îmbunătățiți-vă securitatea pe web”.\n    Acest lucru va permite browserului să încarce fișierele „.wasm” necesare.\n    Dacă problema persistă, este posibil să trebuiască să folosești un alt browser.\nerror-wasm-unsupported-browser =\n    Browserul pe care îl utilizați nu suportă extensiile WebAssembly pe care Ruffle le solicită pentru a rula.\n    Vă rugăm să folosiți un browser compatibil.\n    Puteți găsi o listă de browsere compatibile pe Wiki.\nerror-javascript-conflict =\n    Ruffle a întâmpinat o problemă majoră în timp ce încerca să se inițializeze.\n    Se pare că această pagină folosește cod JavaScript care intră în conflict cu Ruffle.\n    Dacă ești administratorul serverului, te invităm să încerci încărcarea fișierului pe o pagină goală.\nerror-javascript-conflict-outdated = De asemenea, poți încerca să încarci o versiune mai recentă de Ruffle care ar putea ocoli problema (versiunea actuală este învechită: { $buildDate }).\nerror-csp-conflict =\n    Ruffle a întâmpinat o problemă majoră în timp ce încerca să se inițializeze.\n    Politica de securitate a conținutului a acestui server web nu permite rularea componentei „.wasm” necesare.\n    Dacă ești administratorul serverului, te rugăm să consulți wikiul Ruffle pentru ajutor.\nerror-unknown =\n    Ruffle a întâmpinat o problemă majoră în timp ce încerca să afișeze acest conținut Flash.\n    { $outdated ->\n        [true] Dacă ești administratorul serverului, te rugăm să încerci să încarci o versiune mai recentă de Ruffle (versiunea actuală este învechită: { $buildDate }).\n       *[false] Acest lucru nu ar trebui să se întâmple, așa că am aprecia foarte mult dacă ai putea trimite un bug!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Sigur vrei să ștergi acest fișier de salvare?\nsave-reload-prompt =\n    Singura cale de a { $action ->\n        [delete] șterge\n       *[replace] înlocui\n    } acest fișier de salvare fără un conflict potențial este de a reîncărca acest conținut. Dorești să continui oricum?\nsave-download = Descarcă\nsave-replace = Înlocuiește\nsave-delete = Șterge\nsave-backup-all = Descarcă toate fișierele de salvare\n",
    "volume-controls.ftl": "volume-controls-mute = Mut\nvolume-controls-unmute = Activare sunet\n"
  },
  "ru-RU": {
    "context_menu.ftl": "context-menu-download-swf = Скачать .swf\ncontext-menu-copy-debug-info = Копировать отладочную информацию\ncontext-menu-open-save-manager = Менеджер сохранений\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] О расширении Ruffle ({ $version })\n       *[other] О Ruffle ({ $version })\n    }\ncontext-menu-hide = Скрыть это меню\ncontext-menu-exit-fullscreen = Оконный режим\ncontext-menu-enter-fullscreen = Полноэкранный режим\ncontext-menu-volume-controls = Громкость\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle не смог запустить Flash, используемый на этой странице.\n    Чтобы обойти эту проблему, вы можете попробовать открыть файл в отдельной вкладке.\nmessage-restored-from-bfcache =\n    Ваш браузер восстановил этот Flash-контент с предыдущей сессии.\n    Чтобы начать заново, перезагрузите страницу.\npanic-title = Что-то пошло не так :(\nmore-info = Подробнее\nrun-anyway = Всё равно запустить\ncontinue = Продолжить\nreport-bug = Сообщить об ошибке\nupdate-ruffle = Обновить Ruffle\nruffle-demo = Веб-демо\nruffle-desktop = Настольное приложение\nruffle-wiki = Открыть вики Ruffle\nenable-hardware-acceleration = Похоже, что аппаратное ускорение отключено. Хотя Ruffle может работать, но он может быть очень медленным. Вы можете узнать, как включить аппаратное ускорение, перейдя по ссылке ниже:\nenable-hardware-acceleration-link = FAQ - Аппаратное ускорение Chrome\nview-error-details = Сведения об ошибке\nopen-in-new-tab = Открыть в новой вкладке\nclick-to-unmute = Включить звук\nclipboard-message-title = Копирование и вставка в Ruffle\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] Ваш браузер не поддерживает полный доступ к буферу обмена.\n        [access-denied]  Доступ к буферу обмена был отклонён.\n    } Используйте сочетания клавиш для вырезания, копирования и вставки:\nclipboard-message-copy = { \" \" } копировать\nclipboard-message-cut = { \" \" } вырезать\nclipboard-message-paste = { \" \" } вставить\nerror-canvas-reload = Невозможно перезагрузить с рендерером canvas, когда рендерер canvas уже используется.\nerror-file-protocol =\n    Похоже, что вы запускаете Ruffle по протоколу \"file:\".\n    Это не работает, поскольку браузеры блокируют работу многих функций по соображениям безопасности.\n    Вместо этого мы предлагаем вам использовать настольное приложение, веб-демо или настроить локальный сервер.\nerror-javascript-config =\n    Возникла серьёзная ошибка из-за неправильной конфигурации JavaScript.\n    Если вы являетесь администратором сервера, мы предлагаем вам проверить детали ошибки, чтобы выяснить, какой параметр дал сбой.\n    Вы также можете обратиться за помощью к вики Ruffle.\nerror-wasm-not-found =\n    Ruffle не удалось запустить необходимый компонент файла \".wasm\".\n    Если вы администратор сервера, пожалуйста, убедитесь, что файл был загружен правильно.\n    Если проблема не устраняется, вам может потребоваться использовать настройку \"publicPath\": обратитесь к вики Ruffle.\nerror-wasm-mime-type =\n    Ruffle столкнулся с серьёзной проблемой во время инициализации.\n    Этот веб-сервер не предоставляет файлы \".wasm\" с правильным типом MIME.\n    Если вы администратор сервера, обратитесь за помощью к вики Ruffle.\nerror-invalid-swf =\n    Ruffle не удалось обработать запрашиваемый файл.\n    Вероятнее всего, данный SWF повреждён или не является таковым.\nerror-swf-fetch =\n    Ruffle не удалось запустить SWF-файл Flash.\n    Вероятнее всего, файл больше не существует, поэтому Ruffle нечего загружать.\n    Попробуйте связаться с администратором сайта для получения помощи.\nerror-swf-cors =\n    Ruffle не удалось запустить SWF-файл Flash.\n    Скорее всего, доступ к файлу был заблокирован политикой CORS.\n    Если вы администратор сервера, обратитесь за помощью к вики Ruffle.\nerror-wasm-cors =\n    Ruffle не удалось загрузить необходимый компонент файла \".wasm\".\n    Скорее всего, доступ к файлу был заблокирован политикой CORS.\n    Если вы администратор сервера, обратитесь за помощью к вики Ruffle.\nerror-wasm-invalid =\n    Ruffle столкнулся с серьёзной проблемой во время инициализации.\n    Похоже, что на этой странице отсутствуют файлы для запуска Ruffle или они недействительны.\n    Если вы администратор сервера, обратитесь за помощью к вики Ruffle.\nerror-wasm-download =\n    Ruffle столкнулся с серьёзной проблемой во время инициализации.\n    Чаще всего эта проблема устраняется сама собою, поэтому вы можете просто перезагрузить страницу.\n    Если ошибка продолжает появляться, свяжитесь с администратором сайта.\nerror-wasm-disabled-on-edge =\n    Ruffle не удалось загрузить необходимый компонент файла \".wasm\".\n    Чтобы исправить эту ошибку, попробуйте отключить в настройках браузера дополнительную конфиденциальность. Это позволит браузеру загрузить необходимые WASM-файлы.\n    Если проблема осталась, вам может потребоваться другой браузер.\nerror-wasm-unsupported-browser =\n    Ваш браузер не поддерживает расширения WebAssembly, необходимые для запуска Ruffle.\n    Пожалуйста, переключитесь на поддерживаемый браузер.\n    Список поддерживаемых браузеров вы можете найти в Вики.\nerror-javascript-conflict =\n    Ruffle столкнулся с серьёзной проблемой во время инициализации.\n    Похоже, что эта страница использует конфликтующий с Ruffle код JavaScript.\n    Если вы являетесь администратором сервера, мы предлагаем вам попробовать запустить файл на пустой странице.\nerror-javascript-conflict-outdated = Вы также можете попробовать загрузить последнюю версию Ruffle, которая может обойти проблему (текущая версия устарела: { $buildDate }).\nerror-csp-conflict =\n    Ruffle столкнулся с серьёзной проблемой во время инициализации.\n    Политика безопасности содержимого этого веб-сервера не позволяет использовать требуемые компоненты для запуска \".wasm\".\n    Если вы являетесь администратором сервера, обратитесь за помощью к вики Ruffle.\nerror-unknown =\n    Ruffle столкнулся с серьёзной проблемой при попытке отобразить этот Flash-контент.\n    { $outdated ->\n        [true] Если вы администратор сервера, попробуйте загрузить более новую версию Ruffle (текущая версия устарела: { $buildDate }).\n       *[false] Этого не должно происходить, поэтому мы будем очень признательны, если вы сообщите нам об ошибке!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Удалить этот файл сохранения?\nsave-reload-prompt =\n    Единственный способ { $action ->\n        [delete] удалить\n       *[replace] заменить\n    } этот файл сохранения без потенциального конфликта – перезапустить запущенный контент. Всё равно продолжить?\nsave-download = Скачать\nsave-replace = Заменить\nsave-delete = Удалить\nsave-backup-all = Скачать все сохранения\n",
    "volume-controls.ftl": "volume-controls-mute = Без звука\nvolume-controls-unmute = Включить звук\n"
  },
  "sk-SK": {
    "context_menu.ftl": "context-menu-download-swf = Stiahnuť .swf\ncontext-menu-copy-debug-info = Skopírovať debug info\ncontext-menu-open-save-manager = Otvoriť správcu uložení\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] O Ruffle rozšírení ({ $version })\n       *[other] O Ruffle ({ $version })\n    }\ncontext-menu-hide = Skryť menu\ncontext-menu-exit-fullscreen = Ukončiť režim celej obrazovky\ncontext-menu-enter-fullscreen = Prejsť do režimu celej obrazovky\ncontext-menu-volume-controls = Ovládanie hlasitosti\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle nemohol spustiť Flash vložený na tejto stránke.\n    Môžete sa pokúsiť otvoriť súbor na samostatnej karte, aby ste sa vyhli tomuto problému.\nmessage-restored-from-bfcache =\n    Váš prehliadač obnovil tento Flash obsah z predchádzajúcej relácie.\n    Ak chcete začať znovu, opätovne načítajte stránku.\npanic-title = Niečo sa pokazilo :(\nmore-info = Viac informácií\nrun-anyway = Spustiť aj tak\ncontinue = Pokračovať\nreport-bug = Nahlásiť chybu\nupdate-ruffle = Aktualizovať Ruffle\nruffle-demo = Web Demo\nruffle-desktop = Desktopová aplikácia\nruffle-wiki = Zobraziť Ruffle Wiki\nenable-hardware-acceleration = Zdá sa, že hardvérová akcelerácia je vypnutá. Aj keď Ruffle funguje správne, môže byť neprimerane pomalý. Ako povoliť hardvérovú akceleráciu zistíte na tomto odkaze:\nenable-hardware-acceleration-link = Časté otázky - Hardvérová akcelerácia Chrome\nview-error-details = Zobraziť podrobnosti o chybe\nopen-in-new-tab = Otvoriť na novej karte\nclick-to-unmute = Kliknutím zapnete zvuk\nclipboard-message-title = Kopírovanie a vkladanie v Ruffle\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] Váš prehliadač nepodporuje plný prístup k schránke,\n        [access-denied] Prístup k schránke bol odmietnutý,\n    } ale namiesto toho môžete vždy použiť tieto skratky:\nclipboard-message-copy = { \" \" } pre kopírovanie\nclipboard-message-cut = { \" \" } pre vystrihovanie\nclipboard-message-paste = { \" \" } pre vloženie\nerror-canvas-reload = Nie je možné znova načítať pomocou vykresľovača plátna, keď sa vykresľovanie plátna už používa.\nerror-file-protocol =\n    Zdá sa, že používate Ruffle na protokole \"file:\".\n    To nie je možné, pretože prehliadače blokujú fungovanie mnohých funkcií z bezpečnostných dôvodov.\n    Namiesto toho vám odporúčame nastaviť lokálny server alebo použiť web demo či desktopovú aplikáciu.\nerror-javascript-config =\n    Ruffle narazil na problém v dôsledku nesprávnej konfigurácie JavaScriptu.\n    Ak ste správcom servera, odporúčame vám skontrolovať podrobnosti o chybe, aby ste zistili, ktorý parameter je chybný.\n    Pomoc môžete získať aj na wiki Ruffle.\nerror-wasm-not-found =\n    Ruffle sa nepodarilo načítať požadovaný komponent súboru „.wasm“.\n    Ak ste správcom servera, skontrolujte, či bol súbor správne nahraný.\n    Ak problém pretrváva, možno budete musieť použiť nastavenie „publicPath“: pomoc nájdete na wiki Ruffle.\nerror-wasm-mime-type =\n    Ruffle narazil na problém pri pokuse o inicializáciu.\n    Tento webový server neposkytuje súbory „.wasm“ so správnym typom MIME.\n    Ak ste správcom servera, pomoc nájdete na Ruffle wiki.\nerror-invalid-swf =\n    Ruffle nemôže spracovať požadovaný súbor.\n    Najpravdepodobnejším dôvodom je, že požadovaný súbor nie je platným súborom SWF.\nerror-swf-fetch =\n    Ruffle sa nepodarilo načítať SWF súbor Flash.\n    Najpravdepodobnejším dôvodom je, že súbor už neexistuje, takže Ruffle nemá čo načítať.\n    Skúste požiadať o pomoc správcu webovej lokality.\nerror-swf-cors =\n    Ruffle sa nepodarilo načítať SWF súbor Flash.\n    Prístup k načítaniu bol pravdepodobne zablokovaný politikou CORS.\n    Ak ste správcom servera, pomoc nájdete na Ruffle wiki.\nerror-wasm-cors =\n    Ruffle sa nepodarilo načítať požadovaný komponent súboru „.wasm“.\n    Prístup k načítaniu bol pravdepodobne zablokovaný politikou CORS.\n    Ak ste správcom servera, pomoc nájdete na Ruffle wiki.\nerror-wasm-invalid =\n    Ruffle narazil na problém pri pokuse o inicializáciu.\n    Zdá sa, že na tejto stránke chýbajú alebo sú neplatné súbory na spustenie Ruffle.\n    Ak ste správcom servera, pomoc nájdete na Ruffle wiki.\nerror-wasm-download =\n    Ruffle narazil na problém pri pokuse o inicializáciu.\n    Problém sa môže vyriešiť aj sám, takže môžete skúsiť stránku načítať znova.\n    V opačnom prípade kontaktujte administrátora stránky.\nerror-wasm-disabled-on-edge =\n    Ruffle sa nepodarilo načítať požadovaný komponent súboru „.wasm“.\n    Ak chcete tento problém vyriešiť, skúste otvoriť nastavenia prehliadača, kliknite na položku „Ochrana osobných údajov, vyhľadávanie a služby“, prejdite nadol a vypnite možnosť „Zvýšte svoju bezpečnosť na webe“.\n    Vášmu prehliadaču to umožní načítať požadované súbory „.wasm“.\n    Ak problém pretrváva, možno budete musieť použiť iný prehliadač.\nerror-wasm-unsupported-browser =\n    Prehliadač, ktorý používate, nepodporuje rozšírenie WebAssembly, ktoré Ruffle vyžaduje na spustenie.\n    Prejdite na podporovaný prehliadač.\n    Zoznam podporovaných prehliadačov nájdete na Wiki.\nerror-javascript-conflict =\n    Ruffle narazil na problém pri pokuse o inicializáciu.\n    Zdá sa, že táto stránka používa kód JavaScript, ktorý je v konflikte s Ruffle.\n    Ak ste správcom servera, odporúčame vám skúsiť načítať súbor na prázdnu stránku.\nerror-javascript-conflict-outdated = Môžete sa tiež pokúsiť nahrať novšiu verziu Ruffle, ktorá môže daný problém vyriešiť (aktuálny build je zastaraný: { $buildDate }).\nerror-csp-conflict =\n    Ruffle narazil na problém pri pokuse o inicializáciu.\n    Zásady zabezpečenia obsahu tohto webového servera nepovoľujú spustenie požadovaného komponentu „.wasm“.\n    Ak ste správcom servera, pomoc nájdete na Ruffle wiki.\nerror-unknown =\n    Ruffle narazil na problém pri pokuse zobraziť tento Flash obsah.\n    { $outdated ->\n         [true] Ak ste správcom servera, skúste nahrať novšiu verziu Ruffle (aktuálny build je zastaraný: { $buildDate }).\n        *[false] Toto by sa nemalo stať, takže by sme naozaj ocenili, keby ste mohli nahlásiť chybu!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Naozaj chcete odstrániť tento súbor s uloženými pozíciami?\nsave-reload-prompt =\n    Jediný spôsob, ako { $action ->\n         [delete] vymazať\n        *[replace] nahradiť\n    } tento súbor s uloženými pozíciami bez potenciálneho konfliktu je opätovné načítanie tohto obsahu. Chcete napriek tomu pokračovať?\nsave-download = Stiahnuť\nsave-replace = Nahradiť\nsave-delete = Vymazať\nsave-backup-all = Stiahnuť všetky súbory s uloženými pozíciami\n",
    "volume-controls.ftl": "volume-controls-mute = Stlmiť\nvolume-controls-unmute = Zrušiť stlmenie\n"
  },
  "sl-SI": {
    "context_menu.ftl": "context-menu-download-swf = Prenesi .swf\ncontext-menu-copy-debug-info = Kopiraj informacije o odpravljanju napak\ncontext-menu-open-save-manager = Odpri upravitelja shranjevanja\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] O razširitvi Ruffle ({ $version })\n       *[other] O Ruffle ({ $version })\n    }\ncontext-menu-hide = Skrij ta meni\ncontext-menu-exit-fullscreen = Izhod iz celozaslonskega načina\ncontext-menu-enter-fullscreen = Vstopi v celozaslonski način\ncontext-menu-volume-controls = Nadzor glasnosti\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle ni mogel zagnati Flash vsebine, vgrajene v to stran.\n    Lahko poskusite odpreti datoteko v ločenem zavihku, da se izognete tej težavi.\nmessage-restored-from-bfcache =\n    Vaš brskalnik je obnovil to Flash vsebino iz prejšnje seje.\n    Da bi začeli na novo, ponovno naložite stran.\npanic-title = Nekaj je šlo narobe :(\nmore-info = Več informacij\nrun-anyway = Vseeno zaženi\ncontinue = Nadaljuj\nreport-bug = Prijavi napako\nupdate-ruffle = Posodobite Ruffle\nruffle-demo = Spletni demo\nruffle-desktop = Namizna aplikacija\nruffle-wiki = Oglejte si Ruffle Wiki\nenable-hardware-acceleration = Zdi se, da je strojna pospešitev onemogočena. Ruffle bo sicer deloval, vendar bo lahko zelo počasen. Kako omogočiti strojno pospešitev, lahko izveste na spodnji povezavi:\nenable-hardware-acceleration-link = Pogosta vprašanja – Pospeševanje strojne opreme v brskalniku Chrome\nview-error-details = Poglej podrobnosti napake\nopen-in-new-tab = Odpri v novem zavihku\nclick-to-unmute = Kliknite za vklop zvoka\nclipboard-message-title = Kopiranje in lepljenje v Ruffle\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] Vaš brskalnik ne podpira polnega dostopa do odložišča,\n        [access-denied] Dostop do odložišča je bil zavrnjen,\n    } vendar lahko namesto tega vedno uporabite te bližnjice:\nclipboard-message-copy = { \" \" } za kopiranje\nclipboard-message-cut = { \" \" } za izrez\nclipboard-message-paste = { \" \" } za lepljenje\nerror-canvas-reload = Ne morem ponovno naložiti z upodabljalnikom platna, če je upodabljalnik platna že v uporabi.\nerror-file-protocol =\n    Zdi se, da uporabljate Ruffle na protokolu \"file:\".\n    To ne deluje, ker brskalniki iz varnostnih razlogov blokirajo delovanje mnogih funkcij.\n    Namesto tega vam priporočamo, da nastavite lokalni strežnik ali uporabite spletno demo ali namizno aplikacijo.\nerror-javascript-config =\n    Ruffle je naletel na večjo težavo zaradi nepravilne konfiguracije JavaScript.\n    Če ste skrbnik strežnika, vas prosimo, da preverite podrobnosti napake in ugotovite, kateri parameter je kriv.\n    Za pomoč lahko poiščete tudi wiki Ruffle.\nerror-wasm-not-found =\n    Ruffle ni uspel naložiti potrebne datoteke \".wasm\".\n    Če ste skrbnik strežnika, preverite, ali je datoteka pravilno naložena.\n    Če težava še vedno obstaja, boste morda morali uporabiti nastavitev \"publicPath\": za pomoč si oglejte wiki Ruffle.\nerror-wasm-mime-type =\n    Ruffle je med poskusom inicializacije naletel na večjo težavo.\n    Ta spletni strežnik ne servira datotek \".wasm\" s pravilnim tipom MIME.\n    Če ste skrbnik strežnika, poiščite pomoč v Ruffle wiki.\nerror-invalid-swf =\n    Ruffle ne more razčleniti zahtevane datoteke.\n    Najverjetnejši razlog je, da zahtevana datoteka ni veljavna datoteka SWF.\nerror-swf-fetch =\n    Ruffle ni uspel naložiti datoteke Flash SWF.\n    Najverjetnejši razlog je, da datoteka ne obstaja več, zato Ruffle nima kaj naložiti.\n    Za pomoč se obrnite na skrbnika spletnega mesta.\nerror-swf-cors =\n    Ruffle ni uspel naložiti datoteke Flash SWF.\n    Dostop do prenosa je verjetno blokiran s politiko CORS.\n    Če ste skrbnik strežnika, poiščite pomoč v Ruffle wiki.\nerror-wasm-cors =\n    Ruffle ni uspel naložiti potrebne datotečne komponente datoteke \".wasm“.\n    Dostop do prenosa je verjetno blokiran s politiko CORS.\n    Če ste skrbnik strežnika, poiščite pomoč v Ruffle wiki.\nerror-wasm-invalid =\n    Ruffle je med poskusom inicializacije naletel na večjo težavo.\n    Zdi se, da na tej strani manjkajo datoteke ali so datoteke za zagon Ruffle neveljavne.\n    Če ste skrbnik strežnika, poiščite pomoč v Ruffle wiki.\nerror-wasm-download =\n    Ruffle je med poskusom inicializacije naletel na večjo težavo.\n    Ta se pogosto reši sama, zato lahko poskusite ponovno naložiti stran.\n    V nasprotnem primeru se obrnite na skrbnika spletnega mesta.\nerror-wasm-disabled-on-edge =\n    Ruffle ni uspel naložiti potrebne datotečne komponente \".wasm\".\n    Da bi to popravili, odprite nastavitve brskalnika, kliknite \"Zasebnost, iskanje in storitve\", pomaknite se navzdol in izklopite \"Izboljšajte svojo varnost na spletu\".\n    Tako bo brskalnik lahko naložil potrebne datoteke \".wasm\".\n    Če težava še vedno obstaja, boste morda morali uporabiti drug brskalnik.\nerror-wasm-unsupported-browser =\n    Brskalnik, ki ga uporabljate, ne podpira razširitev WebAssembly, ki jih Ruffle potrebuje za delovanje.\n    Preklopite na podprt brskalnik.\n    Seznam podprtih brskalnikov najdete na Wiki.\nerror-javascript-conflict =\n    Ruffle je med poskusom inicializacije naletel na večjo težavo.\n    Zdi se, da ta stran uporablja JavaScript kodo, ki je v nasprotju z Ruffle.\n    Če ste skrbnik strežnika, vas prosimo, da poskusite naložiti datoteko na prazno stran.\nerror-javascript-conflict-outdated = Lahko poskusite naložiti novejšo različico Ruffle, ki bo morda odpravila težavo (trenutna različica je zastarela: { $buildDate }).\nerror-csp-conflict =\n    Ruffle je med poskusom inicializacije naletel na večjo težavo.\n    Varnostna politika vsebine tega spletnega strežnika ne dovoljuje izvajanja potrebne komponente \".wasm\".\n    Če ste skrbnik strežnika, poiščite pomoč v Ruffle wiki.\nerror-unknown =\n    Ruffle je naletel na večjo težavo pri prikazovanju te vsebine Flash.\n    { $outdated ->\n        [true] Če ste skrbnik strežnika, poskusite naložiti novejšo različico Ruffle (trenutna različica je zastarela: { $buildDate }).\n       *[false] To se ne bi smelo zgoditi, zato bi bili zelo hvaležni, če bi prijavili napako!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Ali ste prepričani, da želite izbrisati to shranjeno datoteko?\nsave-reload-prompt =\n    Edini način, da { $action ->\n        [delete] izbrišete\n       *[replace] zamenjate\n    } to shranjeno datoteko brez morebitnega konflikta, je, da ponovno naložite to vsebino. Želite vseeno nadaljevati?\nsave-download = Prenesi\nsave-replace = Zamenjaj\nsave-delete = Izbriši\nsave-backup-all = Prenesi vse shranjene datoteke\n",
    "volume-controls.ftl": "volume-controls-mute = Utišaj\nvolume-controls-unmute = Vklopi zvok\n"
  },
  "sr-CS": {
    "context_menu.ftl": "context-menu-download-swf = Preuzmite .swf datoteku\ncontext-menu-copy-debug-info = Kopirajte informacije za otklanjanje grešaka\ncontext-menu-open-save-manager = Otvori menadžer skladišta\ncontext-menu-about-ruffle =\n    { $flavor ->\n    [extension] O ekstenziji Ruffle ({ $version })\n    *[other] O Ruffle ({ $version })\n    }\ncontext-menu-hide = Sakrij ovaj meni\ncontext-menu-exit-fullscreen = Izađi iz režima celog ekrana\ncontext-menu-enter-fullscreen = Pređi na ceo ekran\ncontext-menu-volume-controls = Kontrole jačine zvuka\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle nije mogao da pokrene Fleš ugrađen na ovoj stranici.\n    Možete pokušati da otvorite datoteku u posebnoj kartici da biste izbegli ovaj problem.\nmessage-restored-from-bfcache =\n    Vaš pregledač je vratio ovaj Fleš sadržaj iz prethodne sesije.\n    Molimo vas da ponovo učitate stranicu za novi početak.\npanic-title = Nešto je pošlo po zlu :(\nmore-info = Dodatne informacije\nrun-anyway = Ipak pokreni\ncontinue = Nastavi\nreport-bug = Prijavi grešku\nupdate-ruffle = Ažurirajte Ruffle\nruffle-demo = Veb demo\nruffle-desktop = Desktop aplikacija\nruffle-wiki = Pogledajte Ruffle Wiki\nenable-hardware-acceleration = Izgleda da je hardversko ubrzanje onemogućeno. Iako Ruffle možda radi, može biti veoma spor. Možete saznati kako da omogućite hardversko ubrzanje prateći donju vezu:\nenable-hardware-acceleration-link = Česta pitanja - Hardversko ubrzanje u Chrome-u\nview-error-details = Prikaži detalje greške\nopen-in-new-tab = Otvori u novoj kartici\nclick-to-unmute = Kliknite da biste uključili zvuk\nclipboard-message-title = Kopiranje i nalepljivanje u Ruffle-u\nclipboard-message-description =\n    { $variant ->\n    *[unsupported] Vaš pregledač ne podržava potpun pristup međuspremniku,\n    [access-denied] Pristup baferu je zabranjen,\n    } ali uvek možete koristiti ove prečice:\nclipboard-message-copy = { \" \" } za kopiju\nclipboard-message-cut = { \" \" } za sečenje\nclipboard-message-paste = { \" \" } za lepljenje\nerror-canvas-reload = Ne može se ponovo učitati renderer za platno kada je renderer za platno već u upotrebi.\nerror-file-protocol =\n    Izgleda da koristite Ruffle na protokolu \"file:\".\n    Ovo ne funkcioniše jer pregledači blokiraju mnoge funkcije iz bezbednosnih razloga.\n    Umesto toga, preporučujemo podešavanje lokalnog servera ili korišćenje veb demo verzije ili desktop aplikacije.\nerror-javascript-config =\n    Ruffle je naišao na ozbiljan problem zbog pogrešne konfiguracije JavaSkripta.\n    Ako ste administrator servera, preporučujemo vam da proverite detalje greške kako biste saznali koji parametar uzrokuje problem. Takođe možete da konsultujete Ruffleov viki za pomoć.\nerror-wasm-not-found =\n    Ruffle nije uspeo da učita potrebnu komponentu datoteke \".wasm\".\n    Ako ste administrator servera, proverite da li je datoteka ispravno otpremljena.\n    Ako problem i dalje postoji, možda ćete morati da koristite podešavanje \"publicPath\": pogledajte Ruffleovu viki stranicu za pomoć.\nerror-wasm-mime-type =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja inicijalizacije.\n    Ovaj veb server ne služi \".wasm\" datoteke sa ispravnim MIME tipom.\n    Ako ste administrator servera, obratite se Ruffleovom vikiju za pomoć.\nerror-invalid-swf =\n    Ruffle ne može da analizira traženu datoteku.\n    Najverovatniji razlog je taj što tražena datoteka nije važeći SWF.\nerror-swf-fetch =\n    Ruffle nije uspeo da učita Fleš SWF datoteku.\n    Najverovatniji razlog je taj što datoteka više ne postoji, pa Ruffle nema šta da učita.\n    Pokušajte da kontaktirate administratora veb stranice za pomoć.\nerror-swf-cors =\n    Ruffle nije uspeo da učita Fleš SWF datoteku.\n    Pristup preuzimanju je verovatno blokiran CORS politikom.\n    Ako ste administrator servera, pogledajte Ruffleovu viki stranicu za pomoć.\nerror-wasm-cors =\n    Ruffle nije uspeo da učita potrebnu komponentu datoteke \".wasm\".\n    Pristup preuzimanju je verovatno blokiran CORS politikom.\n    Ako ste administrator servera, pogledajte Ruffleovu viki stranicu za pomoć.\nerror-wasm-invalid =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja inicijalizacije.\n    Izgleda da ovoj stranici nedostaju ili su nevažeće datoteke za pokretanje Rufflea.\n    Ako ste administrator servera, pogledajte Ruffleov viki za pomoć.\nerror-wasm-download =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja inicijalizacije.\n    Ovo se često može rešiti jednostavnim ponovnim učitavanjem stranice.\n    U suprotnom, kontaktirajte administratora sajta.\nerror-wasm-disabled-on-edge =\n    Ruffle nije uspeo da učita potrebnu komponentnu datoteku \".wasm\".\n    Da biste rešili ovaj problem, pokušajte da otvorite podešavanja pregledača, kliknete na \"Privatnost, pretraga i usluge\", pomerite se nadole i isključite \"Poboljšaj bezbednost veba\".\n    Ovo će omogućiti vašem pregledaču da učita potrebne \".wasm\" datoteke.\n    Ako problem i dalje postoji, možda ćete morati da koristite drugi pregledač.\nerror-wasm-unsupported-browser =\n    Pregledač koji koristite ne podržava WebAssembly ekstenzije potrebne za rad Ruffle-a.\n    Molimo vas da pređete na podržani pregledač.\n    Lista podržanih pregledača može se naći na Viki stranici.\nerror-javascript-conflict =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja inicijalizacije.\n    Izgleda da ova stranica koristi JavaSkript kod koji je u sukobu sa Ruffleom.\n    Ako ste administrator servera, pozivamo vas da pokušate da otpremite datoteku na praznu stranicu.\nerror-javascript-conflict-outdated = Takođe možete pokušati da otpremite noviju verziju programa Ruffle koja bi mogla da reši problem (trenutna verzija je zastarela: { $buildDate }).\nerror-csp-conflict =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja inicijalizacije.\n    Politike bezbednosti sadržaja ovog veb servera ne dozvoljavaju pokretanje potrebne komponente \".wasm\".\n    Ako ste administrator servera, obratite se Ruffleovom vikiju za pomoć.\nerror-unknown =\n    Ruffle je naišao na ozbiljan problem prilikom pokušaja prikazivanja ovog Fleš sadržaja.\n    { $outdated ->\n    [true] Ako ste administrator servera, pokušajte da otpremite noviju verziju Rufflea (trenutna verzija je zastarela: { $buildDate }).\n    *[false] Ovo ne bi trebalo da se dešava, pa bismo vam bili veoma zahvalni ako biste prijavili grešku!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Da li ste sigurni da želite da obrišete ovu datoteku za čuvanje?\nsave-reload-prompt =\n    Jedini način da { $action ->\n        [delete] obrišete\n       *[replace] zamenite\n    } ovu sačuvanu datoteku bez mogućih konflikata jeste da ponovo učitate ovaj sadržaj. Da li želite da ipak nastavite?\nsave-download = Preuzmite\nsave-replace = Zameni\nsave-delete = Obriši\nsave-backup-all = Preuzmi sve sačuvane datoteke\n",
    "volume-controls.ftl": "volume-controls-mute = Isključi zvuk\nvolume-controls-unmute = Uključi zvuk\n"
  },
  "sr-SP": {
    "context_menu.ftl": "context-menu-download-swf = Преузмите .swf датотеку\ncontext-menu-copy-debug-info = Копирајте информације за отклањање грешака\ncontext-menu-open-save-manager = Отвори менаџер складишта\ncontext-menu-about-ruffle =\n    { $flavor ->\n    [extension] О екстензији Ruffle ({ $version })\n    *[other] О Ruffle ({ $version })\n    }\ncontext-menu-hide = Сакриј овај мени\ncontext-menu-exit-fullscreen = Изађи из режима целог екрана\ncontext-menu-enter-fullscreen = Пређи на цео екран\ncontext-menu-volume-controls = Контроле јачине звука\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle није могао да покрене Флеш уграђен на овој страници.\n    Можете покушати да отворите датотеку у посебној картици да бисте избегли овај проблем.\nmessage-restored-from-bfcache =\n    Ваш прегледач је вратио овај Флеш садржај из претходне сесије.\n    Молимо вас да поново учитате страницу за нови почетак.\npanic-title = Нешто је пошло по злу :(\nmore-info = Додатне информације\nrun-anyway = Ипак покрени\ncontinue = Настави\nreport-bug = Пријави грешку\nupdate-ruffle = Ажурирајте Ruffle\nruffle-demo = Веб демо\nruffle-desktop = Десктоп апликација\nruffle-wiki = Погледајте Ruffle Wiki\nenable-hardware-acceleration = Изгледа да је хардверско убрзање онемогућено. Иако Ruffle можда ради, може бити веома спор. Можете сазнати како да омогућите хардверско убрзање пратећи доњу везу:\nenable-hardware-acceleration-link = Честа питања - Хардверско убрзање у Chrome-у\nview-error-details = Прикажи детаље грешке\nopen-in-new-tab = Отвори у новој картици\nclick-to-unmute = Кликните да бисте укључили звук\nclipboard-message-title = Копирање и налепљивање у Ruffle-у\nclipboard-message-description =\n    { $variant ->\n    *[unsupported] Ваш прегледач не подржава потпун приступ међуспремнику,\n    [access-denied] Приступ баферу је забрањен,\n    } али увек можете користити ове пречице:\nclipboard-message-copy = { \" \" } за копију\nclipboard-message-cut = { \" \" } за сечење\nclipboard-message-paste = { \" \" } за лепљење\nerror-canvas-reload = Не може се поново учитати рендерер за платно када је рендерер за платно већ у употреби.\nerror-file-protocol =\n    Изгледа да користите Ruffle на протоколу \"file:\".\n    Ово не функционише јер прегледачи блокирају многе функције из безбедносних разлога.\n    Уместо тога, препоручујемо подешавање локалног сервера или коришћење веб демо верзије или десктоп апликације.\nerror-javascript-config =\n    Ruffle је наишао на озбиљан проблем због погрешне конфигурације ЈаваСкрипта.\n    Ако сте администратор сервера, препоручујемо вам да проверите детаље грешке како бисте сазнали који параметар узрокује проблем. Такође можете да консултујете Ruffleов вики за помоћ.\nerror-wasm-not-found =\n    Ruffle није успео да учита потребну компоненту датотеке \".wasm\".\n    Ако сте администратор сервера, проверите да ли је датотека исправно отпремљена.\n    Ако проблем и даље постоји, можда ћете морати да користите подешавање \"publicPath\": погледајте Ruffleову вики страницу за помоћ.\nerror-wasm-mime-type =\n    Ruffle је наишао на озбиљан проблем приликом покушаја иницијализације.\n    Овај веб сервер не служи \".wasm\" датотеке са исправним MIME типом.\n    Ако сте администратор сервера, обратите се Ruffleовом викију за помоћ.\nerror-invalid-swf =\n    Ruffle не може да анализира тражену датотеку.\n    Највероватнији разлог је тај што тражена датотека није важећи SWF.\nerror-swf-fetch =\n    Ruffle није успео да учита Флеш SWF датотеку.\n    Највероватнији разлог је тај што датотека више не постоји, па Ruffle нема шта да учита.\n    Покушајте да контактирате администратора веб странице за помоћ.\nerror-swf-cors =\n    Ruffle није успео да учита Флеш SWF датотеку.\n    Приступ преузимању је вероватно блокиран CORS политиком.\n    Ако сте администратор сервера, погледајте Ruffleову вики страницу за помоћ.\nerror-wasm-cors =\n    Ruffle није успео да учита потребну компоненту датотеке \".wasm\".\n    Приступ преузимању је вероватно блокиран CORS политиком.\n    Ако сте администратор сервера, погледајте Ruffleову вики страницу за помоћ.\nerror-wasm-invalid =\n    Ruffle је наишао на озбиљан проблем приликом покушаја иницијализације.\n    Изгледа да овој страници недостају или су неважеће датотеке за покретање Ruffleа.\n    Ако сте администратор сервера, погледајте Ruffleов вики за помоћ.\nerror-wasm-download =\n    Ruffle је наишао на озбиљан проблем приликом покушаја иницијализације.\n    Ово се често може решити једноставним поновним учитавањем странице.\n    У супротном, контактирајте администратора сајта.\nerror-wasm-disabled-on-edge =\n    Ruffle није успео да учита потребну компонентну датотеку \".wasm\".\n    Да бисте решили овај проблем, покушајте да отворите подешавања прегледача, кликнете на \"Приватност, претрага и услуге\", померите се надоле и искључите \"Побољшај безбедност веба\".\n    Ово ће омогућити вашем прегледачу да учита потребне \".wasm\" датотеке.\n    Ако проблем и даље постоји, можда ћете морати да користите други прегледач.\nerror-wasm-unsupported-browser =\n    Прегледач који користите не подржава WebAssembly екстензије потребне за рад Ruffle-а.\n    Молимо вас да пређете на подржани прегледач.\n    Листа подржаних прегледача може се наћи на Вики страници.\nerror-javascript-conflict =\n    Ruffle је наишао на озбиљан проблем приликом покушаја иницијализације.\n    Изгледа да ова страница користи ЈаваСкрипт код који је у сукобу са Ruffleом.\n    Ако сте администратор сервера, позивамо вас да покушате да отпремите датотеку на празну страницу.\nerror-javascript-conflict-outdated = Такође можете покушати да отпремите новију верзију програма Ruffle која би могла да реши проблем (тренутна верзија је застарела: { $buildDate }).\nerror-csp-conflict =\n    Ruffle је наишао на озбиљан проблем приликом покушаја иницијализације.\n    Политике безбедности садржаја овог веб сервера не дозвољавају покретање потребне компоненте \".wasm\".\n    Ако сте администратор сервера, обратите се Ruffleовом викију за помоћ.\nerror-unknown =\n    Ruffle је наишао на озбиљан проблем приликом покушаја приказивања овог Флеш садржаја.\n    { $outdated ->\n    [true] Ако сте администратор сервера, покушајте да отпремите новију верзију Ruffleа (тренутна верзија је застарела: { $buildDate }).\n    *[false] Ово не би требало да се дешава, па бисмо вам били веома захвални ако бисте пријавили грешку!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Да ли сте сигурни да желите да обришете ову датотеку за чување?\nsave-reload-prompt =\n    Једини начин да { $action ->\n        [delete] обришете\n       *[replace] замените\n    } ову сачувану датотеку без могућих конфликата јесте да поново учитате овај садржај. Да ли желите да ипак наставите?\nsave-download = Преузмите\nsave-replace = Замени\nsave-delete = Обриши\nsave-backup-all = Преузми све сачуване датотеке\n",
    "volume-controls.ftl": "volume-controls-mute = Искључи звук\nvolume-controls-unmute = Укључи звук\n"
  },
  "sv-SE": {
    "context_menu.ftl": "context-menu-download-swf = Ladda ner .swf\ncontext-menu-copy-debug-info = Kopiera felsökningsinfo\ncontext-menu-open-save-manager = Öppna Sparhanteraren\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Om Ruffle-tillägget ({ $version })\n       *[other] Om Ruffle ({ $version })\n    }\ncontext-menu-hide = Dölj denna meny\ncontext-menu-exit-fullscreen = Avsluta helskärm\ncontext-menu-enter-fullscreen = Helskärm\ncontext-menu-volume-controls = Ljudkontroller\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle kunde inte köra det inbäddade Flashinnehållet på denna sida.\n    Du kan försöka öppna filen i en separat flik för att kringgå problemet.\npanic-title = Något gick fel :(\nmore-info = Mer info\nrun-anyway = Kör ändå\ncontinue = Fortsätt\nreport-bug = Rapportera bugg\nupdate-ruffle = Uppdatera Ruffle\nruffle-demo = Webbdemo\nruffle-desktop = Skrivbordsprogram\nruffle-wiki = Se Ruffle-wiki\nenable-hardware-acceleration = Det ser ut som att hårdvaruacceleration är avstängt. På grund av det kan Ruffle fungera långsamt. Du kan ta reda på hur man sätter på hårdvaruacceleration genom länken nedan:\nenable-hardware-acceleration-link = FAQ - Chrome hårdvaruacceleration\nview-error-details = Visa felinformation\nopen-in-new-tab = Öppna i en ny flik\nclick-to-unmute = Klicka för ljud\nclipboard-message-title = Kopierar och klistrar in i Ruffle\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] Din webbläsare har inte fullständig åtkomst till urklipp,\n        [access-denied] Urklippsåtkomst har nekats,\n    } men du kan använda dom här kortkommandon istället:\nclipboard-message-copy = { \" \" } för att kopiera\nclipboard-message-cut = { \" \" } för att klippa\nclipboard-message-paste = { \" \" } för att klistra in\nerror-canvas-reload = Kan inte ladda om med canvas render:aren när den redan används.\nerror-file-protocol =\n    Det verkar som att du kör Ruffle på \"fil:\"-protokollet.\n    Detta fungerar inte eftersom webbläsare blockerar många funktioner från att fungera av säkerhetsskäl.\n    Istället bjuder vi in dig att sätta upp en lokal server eller antingen använda webbdemon eller skrivbordsprogrammet.\nerror-javascript-config =\n    Ruffle har stött på ett stort fel på grund av en felaktig JavaScript-konfiguration.\n    Om du är serveradministratören bjuder vi in dig att kontrollera feldetaljerna för att ta reda på vilken parameter som är felaktig.\n    Du kan också konsultera Ruffle-wikin för hjälp.\nerror-wasm-not-found =\n    Ruffle misslyckades ladda \".wasm\"-filkomponenten.\n    Om du är serveradministratören se till att filen har laddats upp korrekt.\n    Om problemet kvarstår kan du behöva använda inställningen \"publicPath\": konsultera vänligen Ruffle-wikin för hjälp.\nerror-wasm-mime-type =\n    Ruffle har stött på ett stort fel under initialiseringen.\n    Denna webbserver serverar inte \".wasm\"-filer med korrekt MIME-typ.\n    Om du är serveradministratören konsultera vänligen Ruffle-wikin för hjälp.\nerror-invalid-swf =\n    Ruffle kan inte läsa den begärda filen.\n    Det mest sannolika skälet är att den begärda filen inte är en giltig SWF.\nerror-swf-fetch =\n    Ruffle misslyckades ladda SWF-filen.\n    Det mest sannolika skälet är att filen inte längre existerar, så det finns inget för Ruffle att köra.\n    Försök att kontakta webbplatsadministratören för hjälp.\nerror-swf-cors =\n    Ruffle misslyckades ladda SWF-filen.\n    Åtkomst att hämta har sannolikt blockerats av CORS-policy.\n    Om du är serveradministratören konsultera vänligen Ruffle-wikin för hjälp.\nerror-wasm-cors =\n    Ruffle misslyckades ladda \".wasm\"-filkomponenten.\n    Åtkomst att hämta har sannolikt blockerats av CORS-policy.\n    Om du är serveradministratören konsultera vänligen Ruffle-wikin för hjälp.\nerror-wasm-invalid =\n    Ruffle har stött på ett stort fel under initialiseringen.\n    Det verkar som att den här sidan har saknade eller ogiltiga filer för att köra Ruffle.\n    Om du är serveradministratören konsultera vänligen Ruffle-wikin för hjälp.\nerror-wasm-download =\n    Ruffle har stött på ett stort fel under initialiseringen.\n    Detta kan ofta lösas av sig själv så du kan prova att ladda om sidan.\n    Kontakta annars vänligen webbplatsens administratör.\nerror-wasm-disabled-on-edge =\n    Ruffle misslyckades ladda \".wasm\"-filkomponenten.\n    För att åtgärda detta försök att öppna webbläsarens inställningar, klicka på \"Sekretess, sökning och tjänster\", bläddra ner och stäng av \"Förbättra säkerheten på webben\".\n    Detta tillåter din webbläsare att ladda \".wasm\"-filerna.\n    Om problemet kvarstår kan du behöva använda en annan webbläsare.\nerror-wasm-unsupported-browser =\n    Webbläsaren du använder stöder inte de WebAssembly tilläggen som Ruffle behöver för att köra.\n    Vänligen byt till en webbläsare som stöds.\n    Du kan hitta en lista över webbläsare som stöds på Wikin.\nerror-javascript-conflict =\n    Ruffle har stött på ett stort fel under initialiseringen.\n    Det verkar som att den här sidan använder JavaScript-kod som stör Ruffle.\n    Om du är serveradministratören bjuder vi in dig att försöka köra filen på en blank sida.\nerror-javascript-conflict-outdated = Du kan också försöka ladda upp en nyare version av Ruffle, vilket kan kringgå problemet (nuvarande version är utdaterad: { $buildDate }).\nerror-csp-conflict =\n    Ruffle har stött på ett stort fel under initialiseringen.\n    Webbserverns Content Security Policy tillåter inte \".wasm\"-komponenten att köra.\n    Om du är serveradministratören konsultera vänligen Ruffle-wikin för hjälp.\nerror-unknown =\n    Ruffle har stött på ett stort fel medan den försökte visa Flashinnehållet.\n    { $outdated ->\n        [true] Om du är serveradministratören försök att ladda upp en nyare version av Ruffle (nuvarande version är utdaterad: { $buildDate }).\n       *[false] Detta är inte tänkt att hända så vi skulle verkligen uppskatta om du kunde rapportera in en bugg!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Är du säker på att du vill radera sparfilen?\nsave-reload-prompt =\n    Det enda sättet att { $action ->\n        [delete] radera\n       *[replace] ersätta\n    } denna sparfil utan potentiell konflikt är att ladda om innehållet. Vill du fortsätta ändå?\nsave-download = Ladda ner\nsave-replace = Ersätt\nsave-delete = Radera\nsave-backup-all = Ladda ner alla sparfiler\n",
    "volume-controls.ftl": "volume-controls-mute = Stäng av ljud\n"
  },
  "th-TH": {
    "context_menu.ftl": "context-menu-volume-controls = ปุ่มระดับเสียง\n",
    "messages.ftl": "ruffle-demo = เว็บตัวอย่าง\nruffle-wiki = ดูวิกิ Ruffle\n",
    "save-manager.ftl": "save-delete-prompt = คุณแน่ใจหรือว่าจะลบไฟล์นี้?\n",
    "volume-controls.ftl": "volume-controls-mute = ปิดเสียง\nvolume-controls-unmute = ใช้เสียง\n"
  },
  "tr-TR": {
    "context_menu.ftl": "context-menu-download-swf = .swf'i indir\ncontext-menu-copy-debug-info = Hata ayıklama bilgisini kopyala\ncontext-menu-open-save-manager = Kayıt yöneticisini aç\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Ruffle Uzantısı Hakkında ({ $version })\n       *[other] Ruffle Hakkında ({ $version })\n    }\ncontext-menu-hide = Bu menüyü gizle\ncontext-menu-exit-fullscreen = Tam ekrandan çık\ncontext-menu-enter-fullscreen = Tam ekran yap\ncontext-menu-volume-controls = Ses kontrolleri\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle, bu sayfaya gömülü Flash'ı çalıştıramadı.\n    Bu sorunu ortadan kaldırmak için dosyayı ayrı bir sekmede açmayı deneyebilirsiniz.\nmessage-restored-from-bfcache =\n    Tarayıcınız bu Flash içeriğini önceki bir oturumdan geri yükledi.\n    Sıfırdan başlamak için sayfayı yeniden yükleyin.\npanic-title = Bir şeyler yanlış gitti :(\nmore-info = Daha fazla bilgi\nrun-anyway = Yine de çalıştır\ncontinue = Devam et\nreport-bug = Hata bildir\nupdate-ruffle = Ruffle'ı güncelle\nruffle-demo = Ağ Demosu\nruffle-desktop = Masaüstü uygulaması\nruffle-wiki = Ruffle wiki'yi görüntüle\nenable-hardware-acceleration = Donanım hızlandırması etkin değil gibi görünüyor. Ruffle çalışabilir ancak çok yavaş olabilir. Donanım hızlandırmasını nasıl etkinleştirebileceğinizi bu linkten öğrenebilirsiniz:\nenable-hardware-acceleration-link = SSS - Chrome Donanım Hızlandırması\nview-error-details = Hata ayrıntılarını görüntüle\nopen-in-new-tab = Yeni sekmede aç\nclick-to-unmute = Sesi açmak için tıklayın\nclipboard-message-title = Ruffle'da kopyalama ve yapıştırma\nclipboard-message-description =\n    { $variant ->\n    *[unsupported] Tarayıcınız tam panoya erişimi desteklemiyor,\n    [access-denied] Pano erişimi reddedildi,\n    } ancak pano yerine her zaman bu kısayolları kullanabilirsiniz:\nclipboard-message-copy = { \" \" } kopyalamak için\nclipboard-message-cut = { \" \" } kesmek için\nclipboard-message-paste = { \" \" } yapıştırmak için\nerror-canvas-reload = Tuval oluşturucusu kullanımda olduğunda tuval oluşturucusu ile yeniden yükleme yapılamaz.\nerror-file-protocol =\n    Görünüşe göre Ruffle'ı \"dosya:\" protokolünde çalıştırıyorsunuz.\n    Tarayıcılar güvenlik nedenleriyle birçok özelliğin çalışmasını engellediğinden bu işe yaramaz.\n    Bunun yerine, sizi yerel bir sunucu kurmaya veya ağın demosunu ya da masaüstü uygulamasını kullanmaya davet ediyoruz.\nerror-javascript-config =\n    Ruffle, yanlış bir JavaScript yapılandırması nedeniyle önemli bir sorunla karşılaştı.\n    Sunucu yöneticisiyseniz, hangi parametrenin hatalı olduğunu bulmak için sizi hata ayrıntılarını kontrol etmeye davet ediyoruz.\n    Yardım için Ruffle wiki'sine de başvurabilirsiniz.\nerror-wasm-not-found =\n    Ruffle gerekli \".wasm\" dosya bileşenini yükleyemedi.\n    Sunucu yöneticisi iseniz, lütfen dosyanın doğru bir şekilde yüklendiğinden emin olun.\n    Sorun devam ederse, \"publicPath\" ayarını kullanmanız gerekebilir: yardım için lütfen Ruffle wiki'sine başvurun.\nerror-wasm-mime-type =\n    Ruffle, başlatmaya çalışırken önemli bir sorunla karşılaştı.\n    Bu web sunucusu, doğru MIME tipinde \".wasm\" dosyaları sunmuyor.\n    Sunucu yöneticisiyseniz, yardım için lütfen Ruffle wiki'sine başvurun.\nerror-invalid-swf =\n    Ruffle istenen dosyayı ayrıştıramıyor.\n    Bunun en olası nedeni, istenen dosyanın geçerli bir SWF olmamasıdır.\nerror-swf-fetch =\n    Ruffle, Flash SWF dosyasını yükleyemedi.\n    Bunun en olası nedeni, dosyanın artık mevcut olmaması ve bu nedenle Ruffle'ın yükleyeceği hiçbir şeyin olmamasıdır.\n    Yardım için web sitesi yöneticisiyle iletişime geçmeyi deneyin.\nerror-swf-cors =\n    Ruffle, Flash SWF dosyasını yükleyemedi.\n    Getirme erişimi muhtemelen CORS politikası tarafından engellenmiştir.\n    Sunucu yöneticisiyseniz, yardım için lütfen Ruffle wiki'sine başvurun.\nerror-wasm-cors =\n    Ruffle gerekli \".wasm\" dosya bileşenini yükleyemedi.\n    Getirme erişimi muhtemelen CORS politikası tarafından engellenmiştir.\n    Sunucu yöneticisiyseniz, yardım için lütfen Ruffle wiki'sine başvurun.\nerror-wasm-invalid =\n    Ruffle, başlatmaya çalışırken önemli bir sorunla karşılaştı.\n    Görünüşe göre bu sayfada Ruffle'ı çalıştırmak için eksik veya geçersiz dosyalar var.\n    Sunucu yöneticisiyseniz, yardım için lütfen Ruffle wiki'sine başvurun.\nerror-wasm-download =\n    Ruffle, başlatmaya çalışırken önemli bir sorunla karşılaştı.\n    Bu genellikle kendi kendine çözülebilir, bu nedenle sayfayı yeniden yüklemeyi deneyebilirsiniz.\n    Aksi takdirde, lütfen site yöneticisiyle iletişime geçin.\nerror-wasm-disabled-on-edge =\n    Ruffle gerekli \".wasm\" dosya bileşenini yükleyemedi.\n    Bunu düzeltmek için tarayıcınızın ayarlarını açın, \"Gizlilik, arama ve hizmetler\"i tıklayın, aşağı kaydırın ve \"Web'de güvenliğinizi artırın\"ı kapatmayı deneyin.\n    Bu, tarayıcınızın gerekli \".wasm\" dosyalarını yüklemesine izin verecektir.\n    Sorun devam ederse, farklı bir tarayıcı kullanmanız gerekebilir.\nerror-wasm-unsupported-browser =\n    Kullandığınız tarayıcı, Ruffle'ın çalışması için gereken WebAssembly uzantılarını desteklemiyor.\n    Lütfen desteklenen bir tarayıcıya geçin.\n    Wiki'de desteklenen tarayıcıların bir listesini bulabilirsiniz.\nerror-javascript-conflict =\n    Ruffle, başlatmaya çalışırken önemli bir sorunla karşılaştı.\n    Görünüşe göre bu sayfa, Ruffle ile çakışan JavaScript kodu kullanıyor.\n    Sunucu yöneticisiyseniz, sizi dosyayı boş bir sayfaya yüklemeyi denemeye davet ediyoruz.\nerror-javascript-conflict-outdated = Ayrıca sorunu giderebilecek daha yeni bir Ruffle sürümü yüklemeyi de deneyebilirsiniz (mevcut yapım eskimiş: { $buildDate }).\nerror-csp-conflict =\n    Ruffle, başlatmaya çalışırken önemli bir sorunla karşılaştı.\n    Bu web sunucusunun İçerik Güvenliği Politikası, gerekli \".wasm\" bileşeninin çalışmasına izin vermiyor.\n    Sunucu yöneticisiyseniz, yardım için lütfen Ruffle wiki'sine bakın.\nerror-unknown =\n    Ruffle, bu Flash içeriğini görüntülemeye çalışırken önemli bir sorunla karşılaştı.\n    { $outdated ->\n        [true] Sunucu yöneticisiyseniz, lütfen Ruffle'ın daha yeni bir sürümünü yüklemeyi deneyin (mevcut yapım eskimiş: { $buildDate }).\n       *[false] Bunun olmaması gerekiyor, bu yüzden bir hata bildirebilirseniz çok memnun oluruz!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Bu kayıt dosyasını silmek istediğinize emin misiniz?\nsave-reload-prompt =\n    Bu kaydetme dosyasını potansiyel çakışma olmadan { $action ->\n        [delete] silmenin\n       *[replace] değiştirmenin\n    } tek yolu, bu içeriği yeniden yüklemektir. Yine de devam etmek istiyor musunuz?\nsave-download = İndir\nsave-replace = Değiştir\nsave-delete = Sil\nsave-backup-all = Tüm kayıt dosyalarını indir\n",
    "volume-controls.ftl": "volume-controls-mute = Sustur\nvolume-controls-unmute = Susturmayı kaldır\n"
  },
  "tt-RU": {
    "context_menu.ftl": "context-menu-download-swf = .swf файлны йөкләү\ncontext-menu-copy-debug-info = Дебаг мәгълүматын күчерү\ncontext-menu-open-save-manager = Саклау менеджерын ачу\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Ruffle өстәмәсе турында ({ $version })\n       *[other] Ruffle турында ({ $version })\n    }\ncontext-menu-hide = Бу менюны яшер\ncontext-menu-exit-fullscreen = Тулы экраннан чыгу\ncontext-menu-enter-fullscreen = Тулы экраннан күчү\ncontext-menu-volume-controls = Тавыш көйләүләре\n",
    "messages.ftl": "panic-title = Нәрсәдер дөрес эшләмәгән :(\nmore-info = Тулырак\nrun-anyway = Барыбер эшләт\ncontinue = Дәвам итү\nreport-bug = Хата турында хәбәр итү\nopen-in-new-tab = Яңа салынмада ачу\n",
    "save-manager.ftl": "",
    "volume-controls.ftl": "volume-controls-mute = Тавышны ябу\nvolume-controls-unmute = Тавышны ачу\n"
  },
  "uk-UA": {
    "context_menu.ftl": "context-menu-download-swf = Завантажити .swf\ncontext-menu-copy-debug-info = Копіювати інформацію про налагодження\ncontext-menu-open-save-manager = Відкрити менеджер збереження\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Про розширення Ruffle ({ $version })\n       *[other] Про Ruffle ({ $version })\n    }\ncontext-menu-hide = Приховати це меню\ncontext-menu-exit-fullscreen = Вийти з повноекранного режиму\ncontext-menu-enter-fullscreen = Перейти в повноекранний режим\ncontext-menu-volume-controls = Елементи керування гучністю\n",
    "messages.ftl": "message-cant-embed = Ruffle не вдалося запустити Flash, вбудований у цю сторінку. Ви можете спробувати відкрити файл в окремій вкладці, щоб уникнути цієї проблеми.\nmessage-restored-from-bfcache =\n    Ваш браузер відновив цей Flash-вміст із попередньої сесії.\n    Щоб почати заново, оновіть сторінку.\npanic-title = Щось пішло не так :(\nmore-info = Більше інформації\nrun-anyway = Запустити все одно\ncontinue = Продовжити\nreport-bug = Повідомити про помилку\nupdate-ruffle = Оновити Ruffle\nruffle-demo = Вебдемонстрація\nruffle-desktop = Застосунок робочого столу\nruffle-wiki = Переглянути Ruffle Wiki\nenable-hardware-acceleration = Схоже, апаратне прискорення вимкнено. Хоча Ruffle може працювати, це може бути дуже повільним. Ви можете дізнатися, як увімкнути апаратне прискорення, перейшовши за посиланням нижче:\nenable-hardware-acceleration-link = FAQ - Апаратне прискорення Chrome\nview-error-details = Переглянути деталі помилки\nopen-in-new-tab = Відкрити в новій вкладці\nclick-to-unmute = Натисніть, щоб увімкнути звук\nclipboard-message-title = Копіювання та вставлення в Ruffle\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] Ваш браузер не підтримує повний доступ до буфера обміну,\n        [access-denied] У доступі до буфера обміну відмовлено,\n    } але ви завжди можете скористатися цими ярликами:\nclipboard-message-copy = { \" \" } для копіювання\nclipboard-message-cut = { \" \" } для вирізання\nclipboard-message-paste = { \" \" } для вставлення\nerror-canvas-reload = Неможливо оновити з Canvas рендерером, коли Canvas рендерер вже використовується.\nerror-file-protocol = Здається, ви запускаєте Ruffle за протоколом \"file:\". Це не працює, оскільки браузери блокують роботу багатьох функцій з міркувань безпеки. Замість цього ми запрошуємо вас налаштувати локальний сервер або скористатися вебдемонстрацією чи застосунком робочого столу.\nerror-javascript-config = Ruffle зіткнувся з серйозною проблемою через неправильну конфігурацію JavaScript. Якщо ви адміністратор сервера, ми пропонуємо вам перевірити деталі помилки, щоб дізнатися, який параметр є несправним. Ви також можете звернутися за допомогою до Ruffle Wiki.\nerror-wasm-not-found = Ruffle не вдалося завантажити необхідний файловий компонент \".wasm\". Якщо ви адміністратор сервера, переконайтеся, що файл завантажено правильно. Якщо проблема не зникає, можливо, вам знадобиться скористатися налаштуванням \"publicPath\": будь ласка, зверніться до Ruffle Wiki, щоб отримати допомогу.\nerror-wasm-mime-type = Ruffle зіткнувся з серйозною проблемою під час спроби ініціалізації. Цей вебсервер не обслуговує файли \".wasm\" із правильним типом MIME. Якщо ви адміністратор сервера, зверніться до Ruffle Wiki, щоб отримати допомогу.\nerror-invalid-swf = Ruffle не може проаналізувати файл запиту. Найімовірніша причина полягає в тому, що файл запиту не є дійсним SWF.\nerror-swf-fetch = Ruffle не вдалося завантажити файл Flash SWF. Найімовірніша причина полягає в тому, що файл більше не існує, тому Ruffle нема чого завантажити. Спробуйте звернутися по допомогу до адміністратора сайту.\nerror-swf-cors = Ruffle не вдалося завантажити файл Flash SWF. Можливо, доступ до отримання було заблоковано політикою CORS. Якщо ви адміністратор сервера, зверніться до Ruffle Wiki, щоб отримати допомогу.\nerror-wasm-cors = Ruffle не вдалося завантажити необхідний файловий компонент \".wasm\". Можливо, доступ до отримання було заблоковано політикою CORS. Якщо ви адміністратор сервера, зверніться до Ruffle Wiki, щоб отримати допомогу.\nerror-wasm-invalid = Ruffle зіткнувся з серйозною проблемою під час спроби ініціалізації. Здається, на цій сторінці відсутні або недійсні файли для запуску Ruffle. Якщо ви адміністратор сервера, зверніться до Ruffle Wiki, щоб отримати допомогу.\nerror-wasm-download = Ruffle зіткнувся з серйозною проблемою під час спроби ініціалізації. Часто це може вирішитися само собою, тому ви можете спробувати оновити сторінку. В іншому випадку зверніться до адміністратора сайту.\nerror-wasm-disabled-on-edge = Ruffle не вдалося завантажити необхідний файловий компонент \".wasm\". Щоб виправити це, спробуйте відкрити налаштування вашого браузера, натиснути «Конфіденційність, пошук і служби», прокрутити вниз і вимкнути «Підвищити безпеку в інтернеті». Це дозволить вашому браузеру завантажити необхідні файли «.wasm». Якщо проблема не зникає, можливо, вам доведеться скористатися іншим браузером.\nerror-wasm-unsupported-browser =\n    Ваш браузер не підтримує розширення WebAssembly, необхідні для роботи Ruffle.\n    Будь ласка, переключіться на підтримуваний браузер.\n    Список підтримуваних браузерів можна знайти у Вікі.\nerror-javascript-conflict = Ruffle зіткнувся з серйозною проблемою під час спроби ініціалізації. Схоже, що ця сторінка використовує код JavaScript, який конфліктує з Ruffle. Якщо ви адміністратор сервера, ми запрошуємо вас спробувати завантажити файл на порожній сторінці.\nerror-javascript-conflict-outdated = Ви також можете спробувати завантажити новішу версію Ruffle, яка може уникнути проблеми (поточна збірка застаріла: { $buildDate }).\nerror-csp-conflict = Ruffle зіткнувся з серйозною проблемою під час спроби ініціалізації. Політика безпеки контенту цього вебсервера не дозволяє запускати необхідний компонент \".wasm\". Якщо ви адміністратор сервера, зверніться до Ruffle Wiki, щоб отримати допомогу.\nerror-unknown =\n    Ruffle зіткнувся з серйозною проблемою під час спроби відобразити цей Flash контент.\n    { $outdated ->\n        [true] Якщо ви адміністратор сервера, спробуйте завантажити новішу версію Ruffle (поточна збірка застаріла: { $buildDate }).\n       *[false] Цього не повинно відбуватися, тому ми будемо дуже вдячні, якщо ви повідомите про помилку!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Ви впевнені, що хочете видалити цей файл збереження?\nsave-reload-prompt =\n    Єдиний спосіб { $action ->\n        [delete] видалити\n       *[replace] замінити\n    } цей файл збереження без потенційного конфлікту є перезавантаження цього контенту. Ви все одно бажаєте продовжити?\nsave-download = Завантажити\nsave-replace = Замінити\nsave-delete = Видалити\nsave-backup-all = Завантажити всі файли збереження\n",
    "volume-controls.ftl": "volume-controls-mute = Вимкнути звук\nvolume-controls-unmute = Увімкнути звук\n"
  },
  "vi-VN": {
    "context_menu.ftl": "context-menu-download-swf = Tải về file .swf\ncontext-menu-copy-debug-info = Sao chép thông tin gỡ lỗi\ncontext-menu-open-save-manager = Mở trình quản lý lưu file\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] Giới thiệu về phần mở rộng Ruffle ({ $version })\n       *[other] Giới thiệu về Ruffle ({ $version })\n    }\ncontext-menu-hide = Ẩn menu này\ncontext-menu-exit-fullscreen = Thoát chế độ toàn màn hình\ncontext-menu-enter-fullscreen = Chuyển sang chế độ toàn màn hình\ncontext-menu-volume-controls = Tuỳ chỉnh âm lượng\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle không thể chạy nội dung Flash được nhúng trong trang này.\n    Bạn có thể thử mở tệp ở một tab riêng biệt để tránh sự cố này.\nmessage-restored-from-bfcache = Trình duyệt đã khôi phục lại nội dung Flash từ phiên gần nhất. Tải lại trang nếu muốn bắt đầu lại từ đầu.\npanic-title = Có lỗi xảy ra :(\nmore-info = Thông tin thêm\nrun-anyway = Vẫn khởi chạy\ncontinue = Tiếp tục\nreport-bug = Báo cáo lỗi\nupdate-ruffle = Cập nhật Ruffle\nruffle-demo = Trang demo\nruffle-desktop = Ứng dụng desktop\nruffle-wiki = Truy cập Ruffle Wiki\nenable-hardware-acceleration = Có vẻ như tăng tốc phần cứng đã bị vô hiệu hoá. Mặc dù Ruffle vẫn có thể hoạt động, nhưng nó có thể rất chậm. Bạn có thể tìm cách bật tăng tốc phần cứng bằng cách làm theo hướng dẫn trong đường dẫn bên dưới:\nenable-hardware-acceleration-link = Các câu hỏi thường gặp - Tăng tốc phần cứng cho Chrome\nview-error-details = Xem chi tiết lỗi\nopen-in-new-tab = Mở trong thẻ mới\nclick-to-unmute = Bấm để bật tiếng\nclipboard-message-title = Sao chép và dán bên trong Ruffle\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] Trình duyệt của bạn không hỗ trợ đầy đủ truy xuất bộ nhớ tạm,\n        [access-denied] Truy xuất bộ nhớ tạm bị từ chối,\n    } nhưng bạn luôn có thể sử dụng phím tắt để làm điều đó:\nclipboard-message-copy = { \" \" } để sao chép\nclipboard-message-cut = { \" \" } để cắt\nclipboard-message-paste = { \" \" } để dán\nerror-canvas-reload = Trình kết xuất đồ hoạ canvas renderer đang được sử dụng nên không thể làm mới.\nerror-file-protocol =\n    Có vẻ như bạn đang chạy Ruffle trên giao thức \"file:\".\n    Điều này không được phép vì trình duyệt chặn nhiều tính năng hoạt động vì lý do bảo mật.\n    Thay vào đó, chúng tôi mời bạn thiết lập một máy chủ cục bộ hoặc sử dụng trang demo hoặc ứng dụng desktop.\nerror-javascript-config =\n    Ruffle đã gặp phải sự cố lớn do cấu hình JavaScript không chính xác.\n    Nếu bạn là người quản trị máy chủ, chúng tôi mời bạn kiểm tra chi tiết lỗi để tìm ra tham số nào không đúng.\n    Bạn cũng có thể tham khảo thông tin trợ giúp từ Ruffle Wiki.\nerror-wasm-not-found =\n    Ruffle không tải được tệp \".wasm\" cần thiết.\n    Nếu bạn là người quản trị máy chủ, vui lòng đảm bảo tệp đã được tải lên đúng cách.\n    Nếu sự cố vẫn tiếp diễn, bạn có thể cần phải sử dụng thiết lập \"publicPath\": vui lòng tham khảo thông tin trợ giúp từ Ruffle Wiki.\nerror-wasm-mime-type =\n    Ruffle đã gặp phải một vấn đề lớn khi cố gắng khởi tạo.\n    Máy chủ web không cung cấp tệp \".wasm\" với đúng loại MIME.\n    Nếu bạn là quản trị viên máy chủ, vui lòng tham khảo wiki Ruffle để được trợ giúp.\nerror-invalid-swf =\n    Ruffle không thể phân tích tệp được yêu cầu.\n    Khả năng lớn nhất là do tệp được yêu cầu không phải là một tệp SWF hợp lệ.\nerror-swf-fetch =\n    Ruffle không tải được tệp Flash SWF.\n    Khả năng lớn nhất là do tệp không còn tồn tại nữa, vì vậy không có gì để Ruffle tải.\n    Hãy thử liên hệ với quản trị viên trang web để được trợ giúp.\nerror-swf-cors =\n    Ruffle không tải được tệp Flash SWF.\n    Quyền truy cập để lấy dữ liệu có thể đã bị chính sách CORS chặn.\n    Nếu bạn là quản trị viên máy chủ, vui lòng tham khảo Ruffle Wiki để được trợ giúp.\nerror-wasm-cors =\n    Ruffle không tải được tệp \".wasm\" cần thiết.\n    Quyền truy cập để lấy dữ liệu có thể đã bị chính sách CORS chặn.\n    Nếu bạn là quản trị viên máy chủ, vui lòng tham khảo wiki Ruffle để được trợ giúp.\nerror-wasm-invalid =\n    Ruffle đã gặp phải một vấn đề lớn khi cố gắng khởi tạo.\n    Có vẻ như trang này có các tệp bị thiếu hoặc không hợp lệ để chạy Ruffle.\n    Nếu bạn là quản trị viên máy chủ, vui lòng tham khảo Ruffle Wiki để được trợ giúp.\nerror-wasm-download =\n    Ruffle đã gặp phải một vấn đề lớn khi cố gắng khởi tạo.\n    Vấn đề này thường có thể tự giải quyết, vì vậy bạn có thể thử tải lại trang.\n    Nếu không, vui lòng liên hệ với quản trị viên trang web.\nerror-wasm-disabled-on-edge =\n    Ruffle không tải được thành phần tệp \".wasm\" cần thiết.\n    Để khắc phục sự cố này, hãy thử mở cài đặt của trình duyệt, nhấp vào \"Quyền riêng tư, tìm kiếm và dịch vụ\", cuộn xuống và tắt \"Nâng cao bảo mật trên web\".\n    Thao tác này sẽ cho phép trình duyệt của bạn tải các tệp \".wasm\" cần thiết.\n    Nếu sự cố vẫn tiếp diễn, bạn có thể phải sử dụng trình duyệt khác.\nerror-wasm-unsupported-browser =\n    Trình duyệt bạn đang sử dụng không hỗ trợ tiện ích mở rộng WebAssembly cần thiết để chạy Ruffle.\n    Vui lòng chuyển sang trình duyệt được hỗ trợ.\n    Bạn có thể xem danh sách các trình duyệt được hỗ trợ trên Ruffle Wiki.\nerror-javascript-conflict =\n    Ruffle gặp phải một vấn đề lớn khi cố gắng khởi tạo.\n    Có vẻ trang này sử dụng mã JavaScript xung đột với Ruffle.\n    Nếu bạn là quản trị viên máy chủ, chúng tôi mời bạn thử tải tệp trên một trang trắng.\nerror-javascript-conflict-outdated = Bạn cũng có thể thử tải lên phiên bản Ruffle mới hơn để xem sự cố có thể được khắc phục (bản dựng hiện tại đã cũ: { $buildDate }).\nerror-csp-conflict =\n    Ruffle đã gặp phải một vấn đề lớn khi cố gắng khởi tạo.\n    Chính sách bảo mật nội dung của máy chủ web này không cho phép chạy thành phần tệp \".wasm\" bắt buộc phải có để hoạt động.\n    Nếu bạn là quản trị viên máy chủ, vui lòng tham khảo Ruffle Wiki để được trợ giúp.\nerror-unknown =\n    Ruffle đã gặp phải một vấn đề lớn khi cố gắng hiển thị nội dung Flash này.\n    { $outdated ->\n        [true] Nếu bạn là quản trị viên máy chủ, vui lòng thử tải lên phiên bản Ruffle mới hơn (bản dựng hiện tại đã cũ: { $buildDate }).\n       *[false] Vấn đề này đáng lẽ không nên xảy ra, vì vậy chúng tôi thực sự biết ơn nếu bạn có thể báo cáo lỗi!\n    }\n",
    "save-manager.ftl": "save-delete-prompt = Bạn có chắc chắn muốn xoá tệp đã lưu này không?\nsave-reload-prompt =\n    Cách duy nhất để { $action ->\n        [delete] xoá\n       *[replace] thay thế\n    } tệp đã lưu này mà không có nguy cơ xung đột là tải lại nội dung này. Bạn có muốn tiếp tục không?\nsave-download = Tải về\nsave-replace = Thay thế\nsave-delete = Xoá\nsave-backup-all = Tải xuống tất cả tệp đã lưu\n",
    "volume-controls.ftl": "volume-controls-mute = Tắt tiếng\nvolume-controls-unmute = Bật tiếng\n"
  },
  "zh-CN": {
    "context_menu.ftl": "context-menu-download-swf = 下载 .swf\ncontext-menu-copy-debug-info = 复制调试信息\ncontext-menu-open-save-manager = 打开存档管理器\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] 关于 Ruffle 扩展 ({ $version })\n       *[other] 关于 Ruffle ({ $version })\n    }\ncontext-menu-hide = 隐藏此菜单\ncontext-menu-exit-fullscreen = 退出全屏\ncontext-menu-enter-fullscreen = 进入全屏\ncontext-menu-volume-controls = 音量控制\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle 无法运行嵌入在此页面中的 Flash。\n    您可以尝试在单独的标签页中打开该文件，以回避此问题。\nmessage-restored-from-bfcache =\n    您的浏览器从之前的会话中恢复了这个Flash内容。\n    若要从头开始播放，请重新加载页面。\npanic-title = 出了些问题 :(\nmore-info = 更多信息\nrun-anyway = 仍然运行\ncontinue = 继续\nreport-bug = 反馈问题\nupdate-ruffle = 更新 Ruffle\nruffle-demo = 网页演示\nruffle-desktop = 桌面应用程序\nruffle-wiki = 查看 Ruffle Wiki\nenable-hardware-acceleration = 看起来硬件加速已被禁用。虽然Ruffle可能可以运行，但速度可能会非常慢。您可以通过下面的链接了解如何启用硬件加速：\nenable-hardware-acceleration-link = 常见问题 - Chrome 硬件加速\nview-error-details = 查看错误详情\nopen-in-new-tab = 在新标签页中打开\nclick-to-unmute = 点击取消静音\nclipboard-message-title = 在Ruffle中复制粘贴\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] 您的浏览器不支持完全剪贴板访问,\n        [access-denied] 对剪贴板的访问已被拒绝,\n    } 但您仍然可以使用以下快捷键:\nclipboard-message-copy = { \" \" } 复制\nclipboard-message-cut = { \" \" } 剪切\nclipboard-message-paste = { \" \" } 粘贴\nerror-canvas-reload = Canvas 渲染器已在使用中时，无法使用 Canvas 渲染器重新加载。\nerror-file-protocol =\n    看来您正在 \"file:\" 协议上使用 Ruffle。\n    由于浏览器以安全原因阻止许多功能，因此这不起作用。\n    相反我们邀请您设置本地服务器或使用网页演示或桌面应用程序。\nerror-javascript-config =\n    由于错误的 JavaScript 配置，Ruffle 遇到了一个重大问题。\n    如果您是服务器管理员，我们邀请您检查错误详细信息，以找出哪个参数有故障。\n    您也可以查阅 Ruffle 的 Wiki 获取帮助。\nerror-wasm-not-found =\n    Ruffle 无法加载所需的 “.wasm” 文件组件。\n    如果您是服务器管理员，请确保文件已正确上传。\n    如果问题仍然存在，您可能需要使用 “publicPath” 设置：请查看 Ruffle 的 Wiki 获取帮助。\nerror-wasm-mime-type =\n    Ruffle 在试图初始化时遇到了一个重大问题。\n    该网站服务器没有提供 \".asm” 文件正确的 MIME 类型。\n    如果您是服务器管理员，请查阅 Ruffle Wiki 获取帮助。\nerror-invalid-swf =\n    Ruffle无法解析请求的文件。\n    最有可能的原因是该请求文件不是一个合法的SWF文件。\nerror-swf-fetch =\n    Ruffle 无法加载 Flash SWF 文件。\n    最可能的原因是文件不再存在所以 Ruffle 没有要加载的内容。\n    请尝试联系网站管理员寻求帮助。\nerror-swf-cors =\n    Ruffle 无法加载 Flash SWF 文件。\n    获取权限可能被 CORS 策略阻止。\n    如果您是服务器管理员，请参考 Ruffle Wiki 获取帮助。\nerror-wasm-cors =\n    Ruffle 无法加载所需的“.wasm”文件组件。\n    获取权限可能被 CORS 策略阻止。\n    如果您是服务器管理员，请查阅 Ruffle Wiki 获取帮助。\nerror-wasm-invalid =\n    Ruffle 在试图初始化时遇到了一个重大问题。\n    这个页面似乎缺少文件来运行 Curl。\n    如果您是服务器管理员，请查阅 Ruffle Wiki 获取帮助。\nerror-wasm-download =\n    Ruffle 在试图初始化时遇到了一个重大问题。\n    这通常可以自行解决，因此您可以尝试重新加载页面。\n    否则请联系网站管理员。\nerror-wasm-disabled-on-edge =\n    Ruffle 无法加载所需的 “.wasm” 文件组件。\n    要解决这个问题，请尝试打开您的浏览器设置，单击\"隐私、搜索和服务\"，向下滚动并关闭\"增强 Web 安全性\"。\n    这将允许您的浏览器加载所需的 “.wasm” 文件。\n    如果问题仍然存在，您可能必须使用不同的浏览器。\nerror-wasm-unsupported-browser =\n    您使用的浏览器不支持 Ruffle 运行所需的 WebAssembly 扩展。\n    请切换到支持的浏览器。\n    您可以在 Wiki 上找到支持的浏览器列表。\nerror-javascript-conflict =\n    Ruffle 在试图初始化时遇到了一个重大问题。\n    这个页面似乎使用了与 Ruffle 冲突的 JavaScript 代码。\n    如果您是服务器管理员，我们建议您尝试在空白页面上加载文件。\nerror-javascript-conflict-outdated = 您也可以尝试上传可能规避此问题的较新版本的 Ruffle (当前构建版本已过时: { $buildDate })。\nerror-csp-conflict =\n    Ruffle 在试图初始化时遇到了一个重大问题。\n    该网站服务器的内容安全策略不允许运行所需的 “.wasm” 组件。\n    如果您是服务器管理员，请查阅 Ruffle Wiki 获取帮助。\nerror-unknown =\n    Ruffle 在试图显示此 Flash 内容时遇到了一个重大问题。\n    { $outdated ->\n        [true] 如果您是服务器管理员，请尝试上传更新的 Ruffle 版本 (当前版本已过时: { $buildDate }).\n       *[false] 这不应该发生，因此如果您可以报告错误，我们将非常感谢！\n    }\n",
    "save-manager.ftl": "save-delete-prompt = 确定要删除此存档吗？\nsave-reload-prompt =\n    为了避免潜在的冲突，{ $action ->\n        [delete] 删除\n       *[replace] 替换\n    } 此存档文件需要重新加载当前内容。是否仍然继续？\nsave-download = 下载\nsave-replace = 替换\nsave-delete = 删除\nsave-backup-all = 下载所有存档文件\n",
    "volume-controls.ftl": "volume-controls-mute = 静音\nvolume-controls-unmute = 取消静音\n"
  },
  "zh-TW": {
    "context_menu.ftl": "context-menu-download-swf = 下載SWF檔案\ncontext-menu-copy-debug-info = 複製除錯資訊\ncontext-menu-open-save-manager = 開啟存檔管理器\ncontext-menu-about-ruffle =\n    { $flavor ->\n        [extension] 關於Ruffle擴充功能 ({ $version })\n       *[other] 關於Ruffle ({ $version })\n    }\ncontext-menu-hide = 隱藏菜單\ncontext-menu-exit-fullscreen = 退出全螢幕\ncontext-menu-enter-fullscreen = 進入全螢幕\ncontext-menu-volume-controls = 音量控制\n",
    "messages.ftl": "message-cant-embed =\n    Ruffle 無法執行本頁面內嵌的 Flash。\n    您可以嘗試在單獨的標籤頁中開啟檔案，以避免此問題。\nmessage-restored-from-bfcache =\n    您的瀏覽器從之前的會話中還原了此 Flash 內容。\n    若要重新開始，請重新載入頁面。\npanic-title = 發生了某些錯誤 :(\nmore-info = 更多資訊\nrun-anyway = 直接執行\ncontinue = 繼續\nreport-bug = 回報BUG\nupdate-ruffle = 更新Ruffle\nruffle-demo = 網頁展示\nruffle-desktop = 桌面應用程式\nruffle-wiki = 查看Ruffle Wiki\nenable-hardware-acceleration = 看起來硬體加速已停用。雖然 Ruffle 可以運作，但速度可能很慢。您可以透過以下連結瞭解如何啟用硬體加速：\nenable-hardware-acceleration-link = FAQ - Chrome硬體加速\nview-error-details = 檢視錯誤詳細資料\nopen-in-new-tab = 開啟新增分頁\nclick-to-unmute = 點擊以取消靜音\nclipboard-message-title = 在 Ruffle 中複製和貼上\nclipboard-message-description =\n    { $variant ->\n       *[unsupported] 您的瀏覽器不支援完整的剪貼板存取、\n        [access-denied] 已拒絕存取剪貼簿、\n    } 但您可以使用這些捷徑來代替：\nclipboard-message-copy = { \" \" } 複製\nclipboard-message-cut = { \" \" } 剪下\nclipboard-message-paste = { \" \" } 貼上\nerror-canvas-reload = 當畫布渲染器已在使用中時，無法使用畫布渲染器重新載入。\nerror-file-protocol =\n    您似乎是在 「file: 」協定上執行 Ruffle。\n    這並不可行，因為瀏覽器基於安全理由會阻擋許多功能的運作。\n    相反，我們邀請您設定本機伺服器，或使用網頁示範或桌面應用程式。\nerror-javascript-config =\n    由於 JavaScript 設定不正確，Ruffle 遇到了重大問題。\n    如果您是伺服器管理員，我們邀請您檢查錯誤細節，找出是哪個參數出了問題。\n    您也可以參考 Ruffle wiki 以獲得協助。\nerror-wasm-not-found =\n    Ruffle 未能載入所需的 「.wasm」 檔案元件。\n    如果您是伺服器管理員，請確認檔案已正確上傳。\n    如果問題仍然存在，您可能需要使用「publicPath」設定：請參閱 Ruffle wiki 以獲得協助。\nerror-wasm-mime-type =\n    Ruffle 在嘗試初始化時遇到重大問題。\n    此 Web 伺服器無法提供 MIME 類型正確的 「.wasm 」檔案。\n    如果您是伺服器管理員，請參閱 Ruffle wiki 以獲得協助。\nerror-invalid-swf =\n    Ruffle 無法解析請求的檔案。\n    最可能的原因是請求的檔案不是有效的 SWF。\nerror-swf-fetch =\n    Ruffle 未能載入 Flash SWF 檔案。\n    最可能的原因是該檔案已不存在，因此 Ruffle 無法載入任何內容。\n    請嘗試聯絡網站管理員尋求協助。\nerror-swf-cors =\n    Ruffle 未能載入 Flash SWF 檔案。\n    訪問 fetch 可能已被 CORS 策略封鎖。\n    如果您是伺服器管理員，請參閱 Ruffle wiki 以獲得協助。\nerror-wasm-cors =\n    Ruffle 未能載入所需的 「.wasm」 檔案元件。\n    訪問 fetch 可能已被 CORS 策略封鎖。\n    如果您是伺服器管理員，請參閱 Ruffle wiki 以獲得協助。\nerror-wasm-invalid =\n    Ruffle 在嘗試初始化時遇到重大問題。\n    此頁面似乎有遺失或無效的檔案，無法執行 Ruffle。\n    如果您是伺服器管理員，請參閱 Ruffle wiki 以獲得協助。\nerror-wasm-download =\n    Ruffle 在嘗試初始化時遇到重大問題。\n    這通常可以自行解決，因此您可以嘗試重新載入頁面。\n    否則，請聯絡網站管理員。\nerror-wasm-disabled-on-edge =\n    Ruffle 未能載入所需的「.wasm 」檔案元件。\n    要解決這個問題，請嘗試打開瀏覽器的設定，按一下「隱私、搜尋和服務」，向下捲動，然後關閉「加強您在網路上的安全性」。\n    這將允許您的瀏覽器載入所需的「.wasm 」檔案。\n    如果問題仍然存在，您可能必須使用其他瀏覽器。\nerror-wasm-unsupported-browser =\n    您使用的瀏覽器不支援 Ruffle 執行所需的 WebAssembly 擴充套件。\n    請切換到支援的瀏覽器。\n    您可以在 Wiki 上找到支援的瀏覽器清單。\nerror-javascript-conflict =\n    Ruffle 在嘗試初始化時遇到重大問題。\n    這個頁面似乎使用了與 Ruffle 相衝突的 JavaScript 程式碼。\n    如果您是伺服器管理員，請嘗試在空白頁面上載入檔案。\nerror-javascript-conflict-outdated = 您也可以嘗試上傳較新版本的 Ruffle，可能會避免此問題 (目前的版本已過時：{ $buildDate })。\nerror-csp-conflict =\n    Ruffle 在嘗試初始化時遇到重大問題。\n    此網頁伺服器的內容安全政策不允許執行所需的 「.wasm 」元件。\n    如果您是伺服器管理員，請參閱 Ruffle wiki 以取得協助。\nerror-unknown =\n    Ruffle 在嘗試顯示此 Flash 內容時遇到了重大問題。\n    { $outdated ->\n        [true]  如果您是伺服器管理員，請嘗試上傳較新版本的 Ruffle (目前的版本已經過時 { $buildDate })。\n       *[false] 這不應該發生，所以如果您能提出錯誤，我們會非常感激！\n    }\n",
    "save-manager.ftl": "save-delete-prompt = 你確定要刪除這個存檔嗎？\nsave-reload-prompt =\n    唯一方法只有 { $action ->\n        [delete] 刪除\n       *[replace] 取代\n    } 這個存檔不會完全取代直到重新啟動。 你需要繼續嗎?\nsave-download = 下載\nsave-replace = 取代\nsave-delete = 刪除\nsave-backup-all = 下載所有存檔檔案。\n",
    "volume-controls.ftl": "volume-controls-mute = 靜音\nvolume-controls-unmute = 取消靜音\n"
  }
};
const bundles = {};
for (const [locale, files] of Object.entries(BUNDLED_TEXTS)) {
    const bundle = new FluentBundle(locale);
    if (files) {
        let customMap = undefined;
        for (const [filename, text] of Object.entries(files)) {
            if (text) {
                customMap ??= resetCustomMap();
                for (const error of bundle.addResource(new FluentResource(text))) {
                    console.error(`Error in text for ${locale} ${filename}: ${error}`);
                }
            }
        }
        restoreCustomMap(customMap);
    }
    bundles[locale] = bundle;
}
/**
 * Gets the localised text for the given locale and text ID.
 *
 * If the locale does not contain a text for this ID, it will return null.
 *
 * @param locale Locale to prefer when retrieving text, ie "en-US"
 * @param id ID of the text to retrieve
 * @param args Any arguments to use when creating the localised text
 * @returns Localised text or null if not found
 */
function tryText(locale, id, args) {
    const bundle = bundles[locale];
    if (bundle !== undefined) {
        const message = bundle.getMessage(id);
        if (message !== undefined && message.value) {
            return bundle.formatPattern(message.value, args);
        }
    }
    return null;
}
/**
 * Gets the localised text for the given text ID.
 *
 * The users preferred locales are used, in priority order, to find the given text.
 *
 * If no text is found for any preferred locale, en-US will be used.
 * If en-US does not contain a text for this ID, an error will be logged and the ID itself will be returned.
 *
 * @param id ID of the text to retrieve
 * @param args Any arguments to use when creating the localised text
 * @returns Localised text
 */
function i18n_text(id, args) {
    // A Map override, as in https://github.com/ruffle-rs/ruffle/discussions/19758, may happen after some translations and before others.
    // As such, the reset may not be needed after one call to this function, but then be needed on the next call to it.
    const customMap = resetCustomMap();
    const locales = negotiateLanguages(navigator.languages, Object.keys(bundles), { defaultLocale: "en-US" });
    for (const i in locales) {
        const result = tryText(locales[i], id, args);
        if (result) {
            return result;
        }
    }
    console.error(`Unknown text key '${id}'`);
    restoreCustomMap(customMap);
    return id;
}
/**
 * Gets the localised text for the given text ID, as <p>paragraphs</p> and HTML entities safely encoded.
 *
 * The users preferred locales are used, in priority order, to find the given text.
 *
 * If no text is found for any preferred locale, en-US will be used.
 * If en-US does not contain a text for this ID, an error will be logged and the ID itself will be returned.
 *
 * @param id ID of the text to retrieve
 * @param args Any arguments to use when creating the localised text
 * @returns Localised text with each line in a Paragraph element
 */
function textAsParagraphs(id, args) {
    const result = document.createElement("div");
    i18n_text(id, args)
        .split("\n")
        .forEach((line) => {
        const p = document.createElement("p");
        p.innerText = line;
        result.appendChild(p);
    });
    return result;
}

;// ../core/dist/internal/ui/volume-controls.js


/**
 * @returns The HTMLElement that can be used to modify the SWF volume
 */
function VolumeControls() {
    return ((0,jsx_runtime.jsx)("div", { id: "volume-controls-modal", class: "modal hidden", children: (0,jsx_runtime.jsx)("div", { class: "modal-area", children: (0,jsx_runtime.jsxs)("div", { id: "volume-controls", children: [(0,jsx_runtime.jsx)("input", { id: "mute-checkbox", type: "checkbox" }), (0,jsx_runtime.jsx)("label", { id: "volume-mute", for: "mute-checkbox", title: i18n_text("volume-controls-unmute") }), (0,jsx_runtime.jsx)("label", { id: "volume-min", for: "mute-checkbox", title: i18n_text("volume-controls-mute") }), (0,jsx_runtime.jsx)("label", { id: "volume-mid", for: "mute-checkbox", title: i18n_text("volume-controls-mute") }), (0,jsx_runtime.jsx)("label", { id: "volume-max", for: "mute-checkbox", title: i18n_text("volume-controls-mute") }), (0,jsx_runtime.jsx)("input", { id: "volume-slider", type: "range", min: "0", max: "100", step: "1" }), (0,jsx_runtime.jsx)("span", { id: "volume-slider-text" }), (0,jsx_runtime.jsx)("span", { class: "close-modal" })] }) }) }));
}

;// ../core/dist/internal/ui/unsupported-video.js

/**
 * @returns The HTMLElement that displays video with an unsupported codec
 */
function UnsupportedVideo() {
    return ((0,jsx_runtime.jsx)("div", { id: "video-modal", class: "modal hidden", children: (0,jsx_runtime.jsxs)("div", { class: "modal-area", children: [(0,jsx_runtime.jsx)("span", { class: "close-modal" }), (0,jsx_runtime.jsx)("div", { id: "video-holder" })] }) }));
}

;// ../core/dist/internal/ui/hardware-acceleration.js


/**
 * @returns The HTMLElement containing the hardware acceleration modal
 */
function HardwareAcceleration() {
    return ((0,jsx_runtime.jsx)("div", { id: "hardware-acceleration-modal", class: "modal hidden", children: (0,jsx_runtime.jsxs)("div", { class: "modal-area", children: [(0,jsx_runtime.jsx)("span", { class: "close-modal" }), (0,jsx_runtime.jsx)("span", { id: "acceleration-text", children: i18n_text("enable-hardware-acceleration") }), (0,jsx_runtime.jsx)("a", { href: "https://github.com/ruffle-rs/ruffle/wiki/Frequently-Asked-Questions-For-Users#chrome-hardware-acceleration", target: "_blank", class: "modal-button", children: i18n_text("enable-hardware-acceleration-link") })] }) }));
}

;// ../core/dist/internal/ui/clipboard-permission.js


const shortcutModifier = navigator.userAgent.includes("Mac OS X")
    ? "Command"
    : "Ctrl";
/**
 * @returns The HTMLElement representing the clipboard permission modal
 */
function ClipboardPermission() {
    return ((0,jsx_runtime.jsx)("div", { id: "clipboard-modal", class: "modal hidden", children: (0,jsx_runtime.jsxs)("div", { class: "modal-area", children: [(0,jsx_runtime.jsx)("span", { class: "close-modal" }), (0,jsx_runtime.jsx)("h2", { children: i18n_text("clipboard-message-title") }), (0,jsx_runtime.jsx)("p", { id: "clipboard-modal-description" }), (0,jsx_runtime.jsxs)("p", { children: [(0,jsx_runtime.jsxs)("b", { children: [shortcutModifier, "+C"] }), (0,jsx_runtime.jsx)("span", { children: i18n_text("clipboard-message-copy") })] }), (0,jsx_runtime.jsxs)("p", { children: [(0,jsx_runtime.jsxs)("b", { children: [shortcutModifier, "+X"] }), (0,jsx_runtime.jsx)("span", { children: i18n_text("clipboard-message-cut") })] }), (0,jsx_runtime.jsxs)("p", { children: [(0,jsx_runtime.jsxs)("b", { children: [shortcutModifier, "+V"] }), (0,jsx_runtime.jsx)("span", { children: i18n_text("clipboard-message-paste") })] })] }) }));
}

;// ../core/dist/internal/ui/context-menu-overlay.js

/**
 * @returns The HTMLElement representing the context menu
 */
function ContextMenuOverlay() {
    return ((0,jsx_runtime.jsx)("div", { id: "context-menu-overlay", class: "hidden", children: (0,jsx_runtime.jsx)("ul", { id: "context-menu" }) }));
}

;// ../core/dist/internal/ui/shadow-template.js











/*
 *
 * The shadow template which is used to fill the actual Ruffle player element
 * on the page.
 *
 */
const ruffleShadowTemplate = document.createElement("template");
ruffleShadowTemplate.content.appendChild((0,jsx_runtime.jsx)(StaticStyles, {}));
ruffleShadowTemplate.content.appendChild((0,jsx_runtime.jsx)(DynamicStyles, {}));
ruffleShadowTemplate.content.appendChild((0,jsx_runtime.jsx)(MainContainer, {}));
ruffleShadowTemplate.content.appendChild((0,jsx_runtime.jsx)(SplashScreen, {}));
ruffleShadowTemplate.content.appendChild((0,jsx_runtime.jsx)(SaveManager, {}));
ruffleShadowTemplate.content.appendChild((0,jsx_runtime.jsx)(VolumeControls, {}));
ruffleShadowTemplate.content.appendChild((0,jsx_runtime.jsx)(UnsupportedVideo, {}));
ruffleShadowTemplate.content.appendChild((0,jsx_runtime.jsx)(HardwareAcceleration, {}));
ruffleShadowTemplate.content.appendChild((0,jsx_runtime.jsx)(ClipboardPermission, {}));
ruffleShadowTemplate.content.appendChild((0,jsx_runtime.jsx)(ContextMenuOverlay, {}));

;// ../core/dist/flash-identifiers.js
const FLASH_MIMETYPE = "application/x-shockwave-flash";
const FUTURESPLASH_MIMETYPE = "application/futuresplash";
const FLASH7_AND_8_MIMETYPE = "application/x-shockwave-flash2-preview";
const FLASH_MOVIE_MIMETYPE = "application/vnd.adobe.flash.movie";
const FLASH_ACTIVEX_CLASSID = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";

;// ../core/dist/swf-utils.js

/**
 * Returns whether the given filename ends in a known Flash extension.
 *
 * @param filename The filename to test.
 * @returns True if the filename is a Flash movie (swf or spl).
 */
function isSwfFilename(filename) {
    let pathname = "";
    try {
        // A base URL is required if `filename` is a relative URL, but we don't need to detect the real URL origin.
        pathname = new URL(filename, "https://example.com").pathname;
    }
    catch (_err) {
        // Some invalid filenames, like `///`, could raise a TypeError. Let's fail silently in this situation.
    }
    if (pathname && pathname.length >= 4) {
        const extension = pathname.slice(-4).toLowerCase();
        if (extension === ".swf" || extension === ".spl") {
            return true;
        }
    }
    return false;
}
/**
 * Returns whether the given MIME type is a known Flash type.
 *
 * @param mimeType The MIME type to test.
 * @param allowExtraMimes Whether extra MIME types, non-Flash related, are allowed.
 * @returns True if the MIME type is a Flash MIME type.
 */
function isSwfMimeType(mimeType, allowExtraMimes) {
    mimeType = mimeType.toLowerCase();
    switch (mimeType) {
        case FLASH_MIMETYPE.toLowerCase():
        case FUTURESPLASH_MIMETYPE.toLowerCase():
        case FLASH7_AND_8_MIMETYPE.toLowerCase():
        case FLASH_MOVIE_MIMETYPE.toLowerCase():
            return true;
        default:
            if (allowExtraMimes) {
                // Allow extra MIME types to improve detection of Flash content.
                // Extension: Some sites (e.g. swfchan.net) might (wrongly?) serve files with octet-stream.
                // Polyfill: Other sites (e.g. #11050) might use octet-stream when defining an <embed> tag.
                switch (mimeType) {
                    case "application/octet-stream":
                    case "binary/octet-stream":
                        return true;
                }
            }
    }
    return false;
}
/**
 * Returns whether the given filename and MIME type resolve as a Flash content.
 *
 * @param filename The filename to test.
 * @param mimeType The MIME type to test.
 * @returns True if the given arguments resolve as a Flash content.
 */
function isSwf(filename, mimeType) {
    const isSwfExtension = isSwfFilename(filename);
    if (!mimeType) {
        // If no MIME type is specified (null or empty string), returns whether the movie ends in a known Flash extension.
        return isSwfExtension;
    }
    else {
        return isSwfMimeType(mimeType, isSwfExtension);
    }
}
/**
 * Create a filename to save a downloaded SWF into.
 *
 * @param swfUrl The URL of the SWF file.
 * @returns The filename the SWF file can be saved at.
 */
function swfFileName(swfUrl) {
    const pathName = swfUrl.pathname;
    const name = pathName.substring(pathName.lastIndexOf("/") + 1);
    return name;
}

;// ../core/dist/current-script.js
// This must be in global scope because `document.currentScript`
// works only while the script is initially being processed.
let currentScriptURL = null;
let isExtension = false;
try {
    if (document.currentScript instanceof HTMLScriptElement &&
        document.currentScript.src !== "") {
        let src = document.currentScript.src;
        // CDNs allow omitting the filename. If it's omitted, append a slash to
        // prevent the last component from being dropped.
        if (!src.endsWith(".js") && !src.endsWith("/")) {
            src += "/";
        }
        currentScriptURL = new URL(".", src);
        isExtension = currentScriptURL.protocol.includes("extension");
    }
}
catch (e) {
    console.warn("Unable to get currentScript URL", e);
}
/**
 * Sets the current script URL and isExtension boolean manually when using the extension.
 *
 * @param src The location of Ruffle's resources within the extension.
 */
function setCurrentScriptURL(src) {
    currentScriptURL = src;
    isExtension = currentScriptURL.protocol.includes("extension");
}

;// ../core/dist/internal/constants.js
const RUFFLE_ORIGIN = "https://ruffle.rs";

;// ../core/dist/internal/errors.js
class LoadSwfError extends Error {
    constructor(swfUrl, statusNotOk) {
        super(`Failed to fetch ${swfUrl}`);
        this.swfUrl = swfUrl;
        this.statusNotOk = statusNotOk;
        this.swfUrl = swfUrl;
        this.statusNotOk = statusNotOk;
    }
}
class InvalidSwfError extends Error {
    constructor(swfUrl) {
        super(`Not a valid swf: ${swfUrl}`);
    }
}
class LoadRuffleWasmError extends Error {
    constructor(cause) {
        super("Failed to load Ruffle WASM");
        this.cause = cause;
    }
}
class InvalidOptionsError extends Error {
    constructor(message) {
        super(`Invalid options: ${message}`);
    }
}

// EXTERNAL MODULE: ../../node_modules/tsx-dom/dist/index.js
var dist = __webpack_require__(29);
;// ../core/dist/internal/ui/panic.js






/**
 * @returns False or the HTMLElement containing the actions to take upon panic
 *
 * @param obj An object containing all the info to include in the panic element
 * @param obj.action Which action to take
 * @param obj.showDetails The function that shows the details that led to the panic
 * @param obj.swfUrl The URL of the root SWF
 * @param obj.errorArray An array of errors
 * @param obj.errorText The text of the error message
 */
function createPanicAction({ action, showDetails, errorArray, errorText, swfUrl, }) {
    if (action.type === "show_details") {
        const onClick = () => {
            showDetails();
            return false;
        };
        return ((0,jsx_runtime.jsx)("li", { children: (0,jsx_runtime.jsx)("a", { href: "#", id: "panic-view-details", onClick: onClick, children: i18n_text("view-error-details") }) }));
    }
    else if (action.type === "open_link") {
        return ((0,jsx_runtime.jsx)("li", { children: (0,jsx_runtime.jsx)("a", { href: action.url, target: "_top", children: action.label }) }));
    }
    else {
        let url;
        if (document.location.protocol.includes("extension") && swfUrl) {
            url = swfUrl.href;
        }
        else {
            url = document.location.href;
        }
        // Remove query params for the issue title.
        url = url.split(/[?#]/, 1)[0];
        const issueTitle = `Error on ${url}`;
        let issueLink = `https://github.com/ruffle-rs/ruffle/issues/new?title=${encodeURIComponent(issueTitle)}&template=error_report.md&labels=error-report&body=`;
        let issueBody = encodeURIComponent(errorText);
        if (errorArray.stackIndex > -1 &&
            String(issueLink + issueBody).length > 8195) {
            // Strip the stack error from the array when the produced URL is way too long.
            // This should prevent "414 Request-URI Too Large" errors on GitHub.
            errorArray[errorArray.stackIndex] = null;
            if (errorArray.avmStackIndex > -1) {
                errorArray[errorArray.avmStackIndex] = null;
            }
            issueBody = encodeURIComponent(errorArray.join(""));
        }
        issueLink += issueBody;
        return ((0,jsx_runtime.jsx)("li", { children: (0,jsx_runtime.jsx)("a", { href: issueLink, target: "_top", children: i18n_text("report-bug") }) }));
    }
}
/**
 * @returns A boolean indicating if the build is over 6 months old
 */
function isBuildOutdated() {
    const buildDate = new Date(buildInfo.buildDate);
    const monthsPrior = new Date();
    monthsPrior.setMonth(monthsPrior.getMonth() - 6); // 6 months prior
    return monthsPrior > buildDate;
}
const CommonActions = {
    OpenDemo: {
        type: "open_link",
        url: RUFFLE_ORIGIN + "/demo",
        label: i18n_text("ruffle-demo"),
    },
    DownloadDesktop: {
        type: "open_link",
        url: RUFFLE_ORIGIN + "/downloads#desktop-app",
        label: i18n_text("ruffle-desktop"),
    },
    UpdateRuffle: {
        type: "open_link",
        url: RUFFLE_ORIGIN + "/downloads",
        label: i18n_text("update-ruffle"),
    },
    CreateReport: {
        type: "create_report",
    },
    ShowDetails: {
        type: "show_details",
    },
    createReportOrUpdate() {
        return isBuildOutdated() ? this.UpdateRuffle : this.CreateReport;
    },
    openWiki(page, label) {
        return {
            type: "open_link",
            url: `https://github.com/ruffle-rs/ruffle/wiki/${page}`,
            label: label ?? i18n_text("ruffle-wiki"),
        };
    },
};
/**
 * @returns An object containing the body of the error and the actions to take upon panic
 *
 * @param error The type of error that occurred
 */
function createPanicError(error) {
    if (error instanceof LoadSwfError) {
        if (error.swfUrl && !error.swfUrl.protocol.includes("http")) {
            // Loading a swf on the `file:` protocol
            return {
                body: textAsParagraphs("error-file-protocol"),
                actions: [
                    CommonActions.OpenDemo,
                    CommonActions.DownloadDesktop,
                ],
            };
        }
        if (window.location.origin === error.swfUrl?.origin ||
            error.statusNotOk ||
            // The extension's internal player page is not restricted by CORS
            window.location.protocol.includes("extension")) {
            return {
                body: textAsParagraphs("error-swf-fetch"),
                actions: [CommonActions.ShowDetails],
            };
        }
        // This is a selfhosted build of Ruffle that tried to make a cross-origin request
        return {
            body: textAsParagraphs("error-swf-cors"),
            actions: [
                CommonActions.openWiki("Using-Ruffle#configure-cors-header"),
                CommonActions.ShowDetails,
            ],
        };
    }
    if (error instanceof InvalidSwfError) {
        return {
            body: textAsParagraphs("error-invalid-swf"),
            actions: [CommonActions.ShowDetails],
        };
    }
    if (error instanceof LoadRuffleWasmError) {
        if (window.location.protocol === "file:") {
            // Loading the wasm from the `file:` protocol
            return {
                body: textAsParagraphs("error-file-protocol"),
                actions: [
                    CommonActions.OpenDemo,
                    CommonActions.DownloadDesktop,
                ],
            };
        }
        const message = String(error.cause.message).toLowerCase();
        if (message.includes("mime")) {
            // Self hosted: Cannot load `.wasm` file - incorrect MIME type
            return {
                body: textAsParagraphs("error-wasm-mime-type"),
                actions: [
                    CommonActions.openWiki("Using-Ruffle#configure-webassembly-mime-type"),
                    CommonActions.ShowDetails,
                ],
            };
        }
        if (message.includes("networkerror") ||
            message.includes("failed to fetch") ||
            message.includes("load failed")) {
            // Self hosted: Cannot load `.wasm` file - CORS issues
            return {
                body: textAsParagraphs("error-wasm-cors"),
                actions: [
                    CommonActions.openWiki("Using-Ruffle#configure-cors-header"),
                    CommonActions.ShowDetails,
                ],
            };
        }
        if (message.includes("disallowed by embedder")) {
            // General error: Cannot load `.wasm` file - a native object / function is overridden
            return {
                body: textAsParagraphs("error-csp-conflict"),
                actions: [
                    CommonActions.openWiki("Using-Ruffle#configure-wasm-csp"),
                    CommonActions.ShowDetails,
                ],
            };
        }
        if (error.cause.name === "CompileError" &&
            message.includes("bad type")) {
            // Self hosted: User has a browser without support for necessary WebAssembly extensions
            return {
                body: textAsParagraphs("error-wasm-unsupported-browser"),
                actions: [
                    CommonActions.openWiki("#web"),
                    CommonActions.ShowDetails,
                ],
            };
        }
        // When the WASM file is a 404 on Chromium there is this TypeError:
        // Failed to execute 'compile' on 'WebAssembly': HTTP status code is not ok
        if (error.cause.name === "CompileError" ||
            message.includes("failed to execute 'compile' on 'webassembly'")) {
            // Self hosted: Cannot load `.wasm` file - incorrect configuration or missing files
            return {
                body: textAsParagraphs("error-wasm-invalid"),
                actions: [
                    CommonActions.openWiki("Using-Ruffle#addressing-a-compileerror"),
                    CommonActions.ShowDetails,
                ],
            };
        }
        if ((message.includes("could not download wasm module") ||
            message.includes("webassembly compilation aborted")) &&
            error.cause.name === "TypeError") {
            // Usually a transient network error or botched deployment
            return {
                body: textAsParagraphs("error-wasm-download"),
                actions: [CommonActions.ShowDetails],
            };
        }
        if (error.cause.name === "TypeError") {
            // Self hosted: Cannot load `.wasm` file - a native object / function is overridden
            const body = textAsParagraphs("error-javascript-conflict");
            if (isBuildOutdated()) {
                body.appendChild(textAsParagraphs("error-javascript-conflict-outdated", {
                    buildDate: buildInfo.buildDate,
                }));
            }
            return {
                body,
                actions: [
                    CommonActions.createReportOrUpdate(),
                    CommonActions.ShowDetails,
                ],
            };
        }
        if (navigator.userAgent.includes("Edg") &&
            message.includes("webassembly is not defined")) {
            // Self hosted: User has disabled WebAssembly in Microsoft Edge through the
            // "Enhance your Security on the web" setting.
            return {
                body: textAsParagraphs("error-wasm-disabled-on-edge"),
                actions: [
                    CommonActions.openWiki("Frequently-Asked-Questions-For-Users#edge-webassembly-error", i18n_text("more-info")),
                    CommonActions.ShowDetails,
                ],
            };
        }
        // Self hosted: Cannot load `.wasm` file - file not found
        return {
            body: textAsParagraphs("error-wasm-not-found"),
            actions: [
                CommonActions.openWiki("Using-Ruffle#configuration-options"),
                CommonActions.ShowDetails,
            ],
        };
    }
    if (error instanceof InvalidOptionsError) {
        // General error: Incorrect JavaScript configuration
        return {
            body: textAsParagraphs("error-javascript-config"),
            actions: [
                CommonActions.openWiki("Using-Ruffle#javascript-api"),
                CommonActions.ShowDetails,
            ],
        };
    }
    return {
        body: textAsParagraphs("error-unknown", {
            buildDate: buildInfo.buildDate,
            outdated: String(isBuildOutdated),
        }),
        actions: [
            CommonActions.createReportOrUpdate(),
            CommonActions.ShowDetails,
        ],
    };
}
/**
 *
 * @param container The container in which to append the panic screen
 * @param error The error that occurred
 * @param errorArray An array of info about the error
 * @param swfUrl The URL of the root SWF
 */
function showPanicScreen(container, error, errorArray, swfUrl) {
    const errorText = errorArray.join("");
    const { body, actions } = createPanicError(error);
    const panicBody = (0,dist.createRef)();
    const showDetails = () => {
        panicBody.current.classList.add("details");
        panicBody.current.replaceChildren((0,jsx_runtime.jsx)("textarea", { readOnly: true, children: errorText }));
    };
    container.textContent = "";
    container.appendChild((0,jsx_runtime.jsxs)("div", { id: "panic", children: [(0,jsx_runtime.jsx)("div", { id: "panic-title", children: i18n_text("panic-title") }), (0,jsx_runtime.jsx)("div", { id: "panic-body", ref: panicBody, children: body }), (0,jsx_runtime.jsx)("div", { id: "panic-footer", children: (0,jsx_runtime.jsx)("ul", { children: actions.map((action) => createPanicAction({
                        action,
                        showDetails,
                        errorText,
                        errorArray,
                        swfUrl,
                    })) }) })] }));
}

;// ../../node_modules/wasm-feature-detect/dist/esm/index.js
const bigInt=()=>(async e=>{try{return(await WebAssembly.instantiate(e)).instance.exports.b(BigInt(0))===BigInt(0)}catch(e){return!1}})(new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,1,126,1,126,3,2,1,0,7,5,1,1,98,0,0,10,6,1,4,0,32,0,11])),bulkMemory=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,3,1,0,1,10,14,1,12,0,65,0,65,0,65,0,252,10,0,0,11])),exceptions=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),exceptionsFinal=()=>(async()=>{try{return new WebAssembly.Module(Uint8Array.from(atob("AGFzbQEAAAABBAFgAAADAgEAChABDgACaR9AAQMAAAsACxoL"),(e=>e.codePointAt(0)))),!0}catch(e){return!1}})(),extendedConst=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,5,3,1,0,1,11,9,1,0,65,1,65,2,106,11,0])),gc=()=>(async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,95,1,120,0])))(),jsStringBuiltins=()=>(async()=>{try{return await WebAssembly.instantiate(Uint8Array.from(atob("AGFzbQEAAAABBgFgAW8BfwIXAQ53YXNtOmpzLXN0cmluZwR0ZXN0AAA="),(e=>e.codePointAt(0))),{},{builtins:["js-string"]}),!0}catch(e){return!1}})(),jspi=()=>(async()=>"Suspending"in WebAssembly)(),memory64=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,5,3,1,4,1])),multiMemory=()=>(async()=>{try{return new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,5,5,2,0,0,0,0])),!0}catch(e){return!1}})(),multiValue=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,6,1,96,0,2,127,127,3,2,1,0,10,8,1,6,0,65,0,65,0,11])),mutableGlobals=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,2,8,1,1,97,1,98,3,127,1,6,6,1,127,1,65,0,11,7,5,1,1,97,3,1])),referenceTypes=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,7,1,5,0,208,112,26,11])),relaxedSimd=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),saturatedFloatToInt=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,12,1,10,0,67,0,0,0,0,252,0,26,11])),signExtensions=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,65,0,192,26,11])),simd=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),streamingCompilation=()=>(async()=>"compileStreaming"in WebAssembly)(),tailCall=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,6,1,4,0,18,0,11])),threads=()=>(async e=>{try{return"undefined"!=typeof MessageChannel&&(new MessageChannel).port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(e)}catch(e){return!1}})(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11])),typeReflection=()=>(async()=>"Function"in WebAssembly)(),typedFunctionReferences=()=>(async()=>{try{return new WebAssembly.Module(Uint8Array.from(atob("AGFzbQEAAAABEANgAX8Bf2ABZAABf2AAAX8DBAMBAAIJBQEDAAEBChwDCwBBCkEqIAAUAGoLBwAgAEEBagsGANIBEAAL"),(e=>e.codePointAt(0)))),!0}catch(e){return!1}})();

;// ../core/dist/load-ruffle.js
/**
 * Conditional ruffle loader
 */



/**
 * Load ruffle from an automatically-detected location.
 *
 * This function returns a new instance of Ruffle and downloads it every time.
 * You should not use it directly; this module will memoize the resource
 * download.
 *
 * @param progressCallback The callback that will be run with Ruffle's download progress.
 * @returns A ruffle-builder constructor that may be used to create new RuffleInstanceBuilder
 * instances.
 */
async function fetchRuffle(progressCallback) {
    // Apply some pure JavaScript polyfills to prevent conflicts with external
    // libraries, if needed.
    setPolyfillsOnLoad();
    // NOTE: Keep this list in sync with $RUSTFLAGS in the CI build config!
    const extensionsSupported = (await Promise.all([
        bulkMemory(),
        simd(),
        saturatedFloatToInt(),
        signExtensions(),
        referenceTypes(),
    ])).every(Boolean);
    // @ts-expect-error TS2367 ruffle_web-wasm_mvp gets replaced in set_version.ts.
    // ruffle_web-wasm_mvp is "ruffle_web-wasm_mvp" if this is a dual-wasm build.
    // We don't say we're falling back if we have only an extension build.
    if (!extensionsSupported && "ruffle_web-wasm_mvp" === "ruffle_web-wasm_mvp") {
        console.log("Some WebAssembly extensions are NOT available, falling back to the vanilla WebAssembly module");
    }
    // Easy "on first load": just set it to something else after the call.
    internalSourceApi.options.onFirstLoad?.();
    internalSourceApi.options.onFirstLoad = () => { };
    // Note: The argument passed to import() has to be a simple string literal,
    // otherwise some bundler will get confused and won't include the module?
    const { default: init, RuffleInstanceBuilder, ZipWriter, } = await (extensionsSupported
        ? __webpack_require__.e(/* import() */ 655).then(__webpack_require__.bind(__webpack_require__, 655))
        : // @ts-expect-error TS2307 TypeScript compiler is trying to do the import.
            __webpack_require__.e(/* import() */ 482).then(__webpack_require__.bind(__webpack_require__, 482)));
    let response;
    const wasmUrl = extensionsSupported
        ? new URL(/* asset import */ __webpack_require__(797), __webpack_require__.b)
        : new URL(/* asset import */ __webpack_require__(124), __webpack_require__.b);
    const wasmResponse = await fetch(wasmUrl);
    // The Pale Moon browser lacks full support for ReadableStream.
    // However, ReadableStream itself is defined.
    const readableStreamProperlyDefined = typeof ReadableStreamDefaultController === "function";
    if (progressCallback && readableStreamProperlyDefined) {
        const contentLength = wasmResponse?.headers?.get("content-length") || "";
        let bytesLoaded = 0;
        // Use parseInt rather than Number so the empty string is coerced to NaN instead of 0
        const bytesTotal = parseInt(contentLength);
        response = new Response(new ReadableStream({
            async start(controller) {
                const reader = wasmResponse.body?.getReader();
                if (!reader) {
                    throw "Response had no body";
                }
                progressCallback(bytesLoaded, bytesTotal);
                for (;;) {
                    const { done, value } = await reader.read();
                    if (done) {
                        break;
                    }
                    if (value?.byteLength) {
                        bytesLoaded += value?.byteLength;
                    }
                    controller.enqueue(value);
                    progressCallback(bytesLoaded, bytesTotal);
                }
                controller.close();
            },
        }), wasmResponse);
    }
    else {
        response = wasmResponse;
    }
    await init({ module_or_path: response });
    return [RuffleInstanceBuilder, ZipWriter];
}
let nativeConstructors = null;
/**
 * Obtain an instance of `Ruffle`.
 *
 * This function returns a promise which yields a new `RuffleInstanceBuilder` asynchronously.
 *
 * @param progressCallback The callback that will be run with Ruffle's download progress.
 * @returns A ruffle instance builder.
 */
async function createRuffleBuilder(progressCallback) {
    if (nativeConstructors === null) {
        nativeConstructors = fetchRuffle(progressCallback);
    }
    const constructors = await nativeConstructors;
    return [new constructors[0](), () => new constructors[1]()];
}

;// ../core/dist/internal/register-element.js
/**
 * Number of times to try defining a custom element.
 */
const MAX_TRIES = 999;
/**
 * A mapping between internal element IDs and DOM element IDs.
 */
const privateRegistry = {};
/**
 * Lookup a previously registered custom element.
 *
 * The returned object will have `name`, `class`, and `internal_name`
 * properties listing the external name, implementing class, and internal name
 * respectively.
 *
 * @param elementName The internal element name, previously used to
 * register the element with the private registry.
 * @returns The element data in the registry, or null if there is
 * no such element name registered.
 */
function lookupElement(elementName) {
    const data = privateRegistry[elementName];
    if (data !== undefined) {
        return {
            internalName: elementName,
            name: data.name,
            class: data.class,
        };
    }
    else {
        return null;
    }
}
/**
 * Register a custom element.
 *
 * This function is designed to be tolerant of naming conflicts. If
 * registration fails, we modify the name, and try again. As a result, this
 * function returns the real element name to use.
 *
 * Calling this function multiple times will *not* register multiple elements.
 * We store a private registry mapping internal element names to DOM names.
 * Thus, the proper way to use this function is to call it every time you are
 * about to work with custom element names.
 *
 * @param elementName The internal name of the element.
 * @param elementClass The class of the element.
 *
 * You must call this function with the same class every time.
 * @returns The actual element name.
 * @throws {Error} Throws an error if two different elements were registered
 * with the same internal name.
 */
function registerElement(elementName, elementClass) {
    const registration = privateRegistry[elementName];
    if (registration !== undefined) {
        if (registration.class !== elementClass) {
            throw new Error("Internal naming conflict on " + elementName);
        }
        else {
            return registration.name;
        }
    }
    let tries = 0;
    if (window.customElements !== undefined) {
        while (tries < MAX_TRIES) {
            let externalName = elementName;
            if (tries > 0) {
                externalName = externalName + "-" + tries;
            }
            if (window.customElements.get(externalName) !== undefined) {
                tries += 1;
                continue;
            }
            else {
                window.customElements.define(externalName, elementClass);
            }
            privateRegistry[elementName] = {
                class: elementClass,
                name: externalName,
                internalName: elementName,
            };
            return externalName;
        }
    }
    throw new Error("Failed to assign custom element " + elementName);
}

;// ../core/dist/internal/builder.js
/**
 * Checks if the given value is explicitly `T` (not null, not undefined)
 *
 * @param value The value to test
 * @returns true if the value isn't null or undefined
 */
function isExplicit(value) {
    return value !== null && value !== undefined;
}
/**
 * Configures the given RuffleInstanceBuilder for the general options provided.
 *
 * This is the translation layer between what we allow users to provide through e.g. `window.RufflePlayer.config`,
 * which is quite relaxed and may evolve over time,
 * and the actual values we accept inside Rust (which is quite strict).
 *
 * This allows us to change the rust side at will, and without needing to worry about backwards compatibility, parsing, etc.
 *
 * @param builder The builder to set the options on
 * @param config The options to apply
 */
function configureBuilder(builder, config) {
    // Guard things for being explicitly set, so that we don't need to specify defaults in yet another place...
    if (isExplicit(config.allowScriptAccess)) {
        builder.setAllowScriptAccess(config.allowScriptAccess);
    }
    if (isExplicit(config.backgroundColor)) {
        builder.setBackgroundColor(parseColor(config.backgroundColor));
    }
    if (isExplicit(config.upgradeToHttps)) {
        builder.setUpgradeToHttps(config.upgradeToHttps);
    }
    if (isExplicit(config.compatibilityRules)) {
        builder.setCompatibilityRules(config.compatibilityRules);
    }
    if (isExplicit(config.letterbox)) {
        builder.setLetterbox(config.letterbox.toLowerCase());
    }
    if (isExplicit(config.base)) {
        builder.setBaseUrl(config.base);
    }
    if (isExplicit(config.menu)) {
        builder.setShowMenu(config.menu);
    }
    if (isExplicit(config.allowFullscreen)) {
        builder.setAllowFullscreen(config.allowFullscreen);
    }
    if (isExplicit(config.salign)) {
        builder.setStageAlign(config.salign.toLowerCase());
    }
    if (isExplicit(config.forceAlign)) {
        builder.setForceAlign(config.forceAlign);
    }
    if (isExplicit(config.quality)) {
        builder.setQuality(config.quality.toLowerCase());
    }
    else if (isMobileOrTablet()) {
        console.log("Running on a mobile device; defaulting to low quality");
        builder.setQuality("low");
    }
    if (isExplicit(config.scale)) {
        builder.setScale(config.scale.toLowerCase());
    }
    if (isExplicit(config.forceScale)) {
        builder.setForceScale(config.forceScale);
    }
    if (isExplicit(config.frameRate)) {
        builder.setFrameRate(config.frameRate);
    }
    if (isExplicit(config.wmode)) {
        builder.setWmode(config.wmode);
    }
    if (isExplicit(config.logLevel)) {
        builder.setLogLevel(config.logLevel);
    }
    if (isExplicit(config.maxExecutionDuration)) {
        builder.setMaxExecutionDuration(parseDuration(config.maxExecutionDuration));
    }
    if (isExplicit(config.playerVersion)) {
        builder.setPlayerVersion(config.playerVersion);
    }
    if (isExplicit(config.preferredRenderer)) {
        builder.setPreferredRenderer(config.preferredRenderer);
    }
    if (isExplicit(config.openUrlMode)) {
        builder.setOpenUrlMode(config.openUrlMode.toLowerCase());
    }
    if (isExplicit(config.allowNetworking)) {
        builder.setAllowNetworking(config.allowNetworking.toLowerCase());
    }
    if (isExplicit(config.credentialAllowList)) {
        builder.setCredentialAllowList(config.credentialAllowList);
    }
    if (isExplicit(config.playerRuntime)) {
        builder.setPlayerRuntime(config.playerRuntime);
    }
    if (isExplicit(config.socketProxy)) {
        for (const proxy of config.socketProxy) {
            builder.addSocketProxy(proxy.host, proxy.port, proxy.proxyUrl);
        }
    }
    if (isExplicit(config.gamepadButtonMapping)) {
        for (const [button, keyCode] of Object.entries(config.gamepadButtonMapping)) {
            builder.addGamepadButtonMapping(button, keyCode);
        }
    }
    if (isExplicit(config.urlRewriteRules)) {
        for (const [regexpOrString, replacement] of config.urlRewriteRules) {
            if (regexpOrString instanceof RegExp) {
                builder.addUrlRewriteRule(regexpOrString, replacement);
            }
            else {
                const escapedString = regexpOrString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                const regexp = new RegExp(`^${escapedString}$`);
                const escapedReplacement = replacement.replace(/\$/g, "$$$$");
                builder.addUrlRewriteRule(regexp, escapedReplacement);
            }
        }
    }
    if (isExplicit(config.scrollingBehavior)) {
        builder.setScrollingBehavior(config.scrollingBehavior);
    }
    if (isExplicit(config.deviceFontRenderer)) {
        builder.setDeviceFontRenderer(config.deviceFontRenderer);
    }
}
/**
 * Parses a color into an RGB value.
 *
 * @param color The color string to parse
 * @returns A valid RGB number, or undefined if invalid
 */
function parseColor(color) {
    if (color.startsWith("#")) {
        color = color.substring(1);
    }
    if (color.length < 6) {
        return undefined;
    }
    let result = 0;
    for (let i = 0; i < 6; i++) {
        const digit = parseInt(color[i], 16);
        if (!isNaN(digit)) {
            result = (result << 4) | digit;
        }
        else {
            result = result << 4;
        }
    }
    return result;
}
/**
 * Parses a duration into number of seconds.
 *
 * @param value The duration to parse
 * @returns A valid number of seconds
 */
function parseDuration(value) {
    if (typeof value === "number") {
        return value;
    }
    return value.secs;
}
/**
 * Very bad way to guess if we're running on a tablet/mobile.
 *
 * @returns True if we believe this may be a mobile or tablet device
 */
function isMobileOrTablet() {
    // noinspection JSDeprecatedSymbols
    return typeof window.orientation !== "undefined";
}

;// ../core/dist/internal/player/inner.js














const DIMENSION_REGEX = /^\s*(\d+(\.\d+)?(%)?)/;
let isAudioContextUnmuted = false;
/**
 * Converts arbitrary input to an easy to use record object.
 *
 * @param parameters Parameters to sanitize
 * @returns A sanitized map of param name to param value
 */
function sanitizeParameters(parameters) {
    if (parameters === null || parameters === undefined) {
        return {};
    }
    if (!(parameters instanceof URLSearchParams)) {
        parameters = new URLSearchParams(parameters);
    }
    const output = {};
    for (const [key, value] of parameters) {
        // Every value must be type of string
        output[key] = value.toString();
    }
    return output;
}
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    distanceTo(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
/**
 * This is the backing logic behind a HTML "player" element, and bridges the gap to the Rust codebase.
 */
class InnerPlayer {
    constructor(element, debugPlayerInfo, onCallbackAvailable) {
        // Allows the user to permanently disable the context menu.
        this.contextMenuForceDisabled = false;
        // Whether the most recent pointer event was from a touch (or pen).
        this.isTouch = false;
        // Whether this device sends contextmenu events.
        // Set to true when a contextmenu event is seen.
        this.contextMenuSupported = false;
        // When set to `true`, the next context menu event will
        // not show the context menu.
        this._suppressContextMenu = false;
        this.panicked = false;
        this.rendererDebugInfo = "";
        this.longPressTimer = null;
        this.pointerDownPosition = null;
        this.pointerMoveMaxDistance = 0;
        this.onFSCommand = [];
        /**
         * Any configuration that should apply to this specific player.
         * This will be defaulted with any global configuration.
         */
        this.config = {};
        this.SaveRow = ({ rowKey, solName, solData, }) => {
            return ((0,jsx_runtime.jsxs)("tr", { children: [(0,jsx_runtime.jsx)("td", { title: rowKey, children: solName }), (0,jsx_runtime.jsx)("td", { children: (0,jsx_runtime.jsx)("span", { class: "save-option", id: "download-save", title: i18n_text("save-download"), onClick: () => saveFile(base64ToBlob(solData, "application/octet-stream"), solName + ".sol") }) }), (0,jsx_runtime.jsxs)("td", { children: [(0,jsx_runtime.jsx)("input", { type: "file", accept: ".sol", class: "replace-save", id: "replace-save-" + rowKey, onChange: (ev) => this.replaceSOL(ev, rowKey) }), (0,jsx_runtime.jsx)("label", { for: "replace-save-" + rowKey, class: "save-option", id: "replace-save", title: i18n_text("save-replace") })] }), (0,jsx_runtime.jsx)("td", { children: (0,jsx_runtime.jsx)("span", { class: "save-option", id: "delete-save", title: i18n_text("save-delete"), onClick: () => this.deleteSave(rowKey) }) })] }));
        };
        this.element = element;
        this.debugPlayerInfo = debugPlayerInfo;
        this.onCallbackAvailable = onCallbackAvailable;
        this.shadow = this.element.attachShadow({
            mode: "open",
            delegatesFocus: true,
        });
        this.shadow.appendChild(ruffleShadowTemplate.content.cloneNode(true));
        this.dynamicStyles = this.shadow.getElementById("dynamic-styles");
        this.container = this.shadow.getElementById("container");
        this.playButton = this.shadow.getElementById("play-button");
        this.playButton.addEventListener("click", () => this.play());
        this.unmuteOverlay = this.shadow.getElementById("unmute-overlay");
        this.splashScreen = this.shadow.getElementById("splash-screen");
        this.virtualKeyboard = this.shadow.getElementById("virtual-keyboard");
        this.virtualKeyboard.addEventListener("input", this.virtualKeyboardInput.bind(this));
        this.saveManager = this.shadow.getElementById("save-manager");
        this.videoModal = this.shadow.getElementById("video-modal");
        this.hardwareAccelerationModal = this.shadow.getElementById("hardware-acceleration-modal");
        this.volumeControls = this.shadow.getElementById("volume-controls-modal");
        this.clipboardModal = this.shadow.getElementById("clipboard-modal");
        this.addModalJavaScript(this.saveManager);
        this.addModalJavaScript(this.volumeControls);
        this.addModalJavaScript(this.videoModal);
        this.addModalJavaScript(this.hardwareAccelerationModal);
        this.addModalJavaScript(this.clipboardModal);
        this.volumeSettings = new inner_VolumeControls(false, 100);
        this.addVolumeControlsJavaScript(this.volumeControls);
        const backupSaves = this.saveManager.querySelector(".modal-button");
        if (backupSaves) {
            backupSaves.addEventListener("click", this.backupSaves.bind(this));
            backupSaves.innerText = i18n_text("save-backup-all");
        }
        const unmuteSvg = this.unmuteOverlay.querySelector("#unmute-overlay-svg");
        if (unmuteSvg) {
            const unmuteText = unmuteSvg.querySelector("#unmute-text");
            unmuteText.textContent = i18n_text("click-to-unmute");
        }
        this.contextMenuOverlay = this.shadow.getElementById("context-menu-overlay");
        this.contextMenuElement = this.shadow.getElementById("context-menu");
        const preserveMenu = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        this.contextMenuElement.addEventListener("contextmenu", preserveMenu);
        this.contextMenuElement.addEventListener("click", preserveMenu);
        this.contextMenuElement.dir = detectBrowserDirection();
        document.documentElement.addEventListener("pointerdown", this.checkIfTouch.bind(this));
        this.element.addEventListener("contextmenu", this.showContextMenu.bind(this));
        this.container.addEventListener("pointerdown", this.pointerDown.bind(this));
        this.container.addEventListener("pointermove", this.checkLongPressMovement.bind(this));
        this.container.addEventListener("pointerup", this.checkLongPress.bind(this));
        this.container.addEventListener("pointercancel", this.clearLongPressTimer.bind(this));
        this.element.addEventListener("fullscreenchange", this.fullScreenChange.bind(this));
        this.element.addEventListener("webkitfullscreenchange", this.fullScreenChange.bind(this));
        this.instance = null;
        this.newZipWriter = null;
        this._readyState = ReadyState.HaveNothing;
        this.metadata = null;
        this.lastActivePlayingState = false;
        this.setupPauseOnTabHidden();
    }
    addFSCommandHandler(handler) {
        this.onFSCommand.push(handler);
    }
    callFSCommand(command, args) {
        if (this.onFSCommand.length === 0) {
            return false;
        }
        for (const handler of this.onFSCommand) {
            handler(command, args);
        }
        return true;
    }
    /**
     * Add functions to open and close a modal.
     *
     * @param modalElement The element containing the modal.
     */
    addModalJavaScript(modalElement) {
        const videoHolder = modalElement.querySelector("#video-holder");
        const hideModal = () => {
            modalElement.classList.add("hidden");
            if (videoHolder) {
                videoHolder.textContent = "";
            }
        };
        modalElement.parentNode.addEventListener("click", hideModal);
        const modalArea = modalElement.querySelector(".modal-area");
        if (modalArea) {
            modalArea.addEventListener("click", (event) => event.stopPropagation());
        }
        const closeModal = modalElement.querySelector(".close-modal");
        if (closeModal) {
            closeModal.addEventListener("click", hideModal);
        }
    }
    /**
     * Add the volume control texts, set the controls to the current settings and
     * add event listeners to update the settings and controls when being changed.
     *
     * @param volumeControlsModal The element containing the volume controls modal.
     */
    addVolumeControlsJavaScript(volumeControlsModal) {
        const volumeMuteCheckbox = volumeControlsModal.querySelector("#mute-checkbox");
        const volumeMuteIcon = volumeControlsModal.querySelector("#volume-mute");
        const volumeIcons = [
            volumeControlsModal.querySelector("#volume-min"),
            volumeControlsModal.querySelector("#volume-mid"),
            volumeControlsModal.querySelector("#volume-max"),
        ];
        const volumeSlider = volumeControlsModal.querySelector("#volume-slider");
        const volumeSliderText = volumeControlsModal.querySelector("#volume-slider-text");
        const setVolumeIcon = () => {
            if (this.volumeSettings.isMuted) {
                volumeMuteIcon.style.display = "inline";
                volumeIcons.forEach((icon) => {
                    icon.style.display = "none";
                });
            }
            else {
                volumeMuteIcon.style.display = "none";
                const iconIndex = Math.round(this.volumeSettings.volume / 50);
                volumeIcons.forEach((icon, i) => {
                    icon.style.display = i === iconIndex ? "inline" : "none";
                });
            }
        };
        // Set the controls to the current settings.
        volumeMuteCheckbox.checked = this.volumeSettings.isMuted;
        volumeSlider.disabled = volumeMuteCheckbox.checked;
        volumeSlider.valueAsNumber = this.volumeSettings.volume;
        volumeSliderText.textContent = volumeSlider.value + "%";
        setVolumeIcon();
        // Add event listeners to update the settings and controls.
        volumeMuteCheckbox.addEventListener("change", () => {
            volumeSlider.disabled = volumeMuteCheckbox.checked;
            this.volumeSettings.isMuted = volumeMuteCheckbox.checked;
            this.instance?.set_volume(this.volumeSettings.get_volume());
            setVolumeIcon();
        });
        volumeSlider.addEventListener("input", () => {
            volumeSliderText.textContent = volumeSlider.value + "%";
            this.volumeSettings.volume = volumeSlider.valueAsNumber;
            this.instance?.set_volume(this.volumeSettings.get_volume());
            setVolumeIcon();
        });
    }
    /**
     * Setup event listener to detect when tab is not active to pause instance playback.
     * this.instance.play() is called when the tab becomes visible only if the
     * the instance was not paused before tab became hidden.
     *
     * See: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
     * @ignore
     * @internal
     */
    setupPauseOnTabHidden() {
        document.addEventListener("visibilitychange", () => {
            if (!this.instance) {
                return;
            }
            // Tab just changed to be inactive. Record whether instance was playing.
            if (document.hidden) {
                this.lastActivePlayingState = this.instance.is_playing();
                this.instance.pause();
            }
            // Play only if instance was playing originally.
            if (!document.hidden && this.lastActivePlayingState === true) {
                this.instance.play();
            }
        }, false);
    }
    /**
     * Updates the internal shadow DOM to reflect any set attributes from
     * this element.
     */
    updateStyles() {
        if (this.dynamicStyles.sheet) {
            if (this.dynamicStyles.sheet.cssRules) {
                for (let i = this.dynamicStyles.sheet.cssRules.length - 1; i >= 0; i--) {
                    this.dynamicStyles.sheet.deleteRule(i);
                }
            }
            const alignAttr = this.element.attributes.getNamedItem("align");
            if (alignAttr !== undefined && alignAttr !== null) {
                const alignValue = alignAttr.value.toLowerCase();
                const alignCSS = (() => {
                    // Blink: https://source.chromium.org/chromium/chromium/src/+/42e06bc6:third_party/blink/renderer/core/html/html_element.cc;l=1062-1083
                    // WebKit: https://github.com/WebKit/WebKit/blob/f6b6c1d/Source/WebCore/html/HTMLElement.cpp#L592-L611
                    // Gecko: https://github.com/mozilla/gecko-dev/blob/0383ce6/dom/html/nsGenericHTMLElement.cpp#L1326-L1341
                    // Gecko (cont): https://github.com/mozilla/gecko-dev/blob/0383ce6/dom/html/nsGenericHTMLElement.cpp#L1557-L1561
                    switch (alignValue) {
                        case "right":
                            return "vertical-align: top; float: right;";
                        case "left":
                            return "vertical-align: top; float: left;";
                        case "bottom":
                            return "vertical-align: baseline;";
                        case "top":
                            return "vertical-align: top;";
                        case "center":
                            return "vertical-align: middle; vertical-align: -moz-middle-with-baseline;";
                        case "middle":
                            return "vertical-align: middle; vertical-align: -webkit-baseline-middle; vertical-align: -moz-middle-with-baseline;";
                        case "absbottom":
                            return "vertical-align: bottom;";
                        case "absmiddle":
                        case "abscenter":
                            return "vertical-align: middle;";
                        case "texttop":
                            return "vertical-align: text-top;";
                        default:
                            return "";
                    }
                })();
                if (alignCSS) {
                    this.dynamicStyles.sheet.insertRule(`:host { ${alignCSS} }`);
                }
            }
            const widthAttr = this.element.attributes.getNamedItem("width");
            if (widthAttr !== undefined && widthAttr !== null) {
                const width = InnerPlayer.htmlDimensionToCssDimension(widthAttr.value);
                if (width !== null) {
                    this.dynamicStyles.sheet.insertRule(`:host { width: ${width}; }`);
                }
            }
            const heightAttr = this.element.attributes.getNamedItem("height");
            if (heightAttr !== undefined && heightAttr !== null) {
                const height = InnerPlayer.htmlDimensionToCssDimension(heightAttr.value);
                if (height !== null) {
                    this.dynamicStyles.sheet.insertRule(`:host { height: ${height}; }`);
                }
            }
        }
    }
    /**
     * Determine if this element is the fallback content of another Ruffle
     * player.
     *
     * This heuristic assumes Ruffle objects will never use their fallback
     * content. If this changes, then this code also needs to change.
     *
     * @private
     */
    isUnusedFallbackObject() {
        const element = lookupElement("ruffle-object");
        if (element !== null) {
            let parent = this.element.parentNode;
            while (parent !== document && parent !== null) {
                if (parent.nodeName === element.name) {
                    return true;
                }
                parent = parent.parentNode;
            }
        }
        return false;
    }
    /**
     * Ensure a fresh Ruffle instance is ready on this player before continuing.
     *
     * @throws Any exceptions generated by loading Ruffle Core will be logged
     * and passed on.
     *
     * @private
     */
    async ensureFreshInstance() {
        this.destroy();
        if (this.loadedConfig &&
            this.loadedConfig.splashScreen !== false &&
            this.loadedConfig.preloader !== false) {
            this.showSplashScreen();
        }
        if (this.loadedConfig && this.loadedConfig.preloader === false) {
            console.warn("The configuration option preloader has been replaced with splashScreen. If you own this website, please update the configuration.");
        }
        if (this.loadedConfig &&
            this.loadedConfig.maxExecutionDuration &&
            typeof this.loadedConfig.maxExecutionDuration !== "number") {
            console.warn("Configuration: An obsolete format for duration for 'maxExecutionDuration' was used, " +
                "please use a single number indicating seconds instead. For instance '15' instead of " +
                "'{secs: 15, nanos: 0}'.");
        }
        if (this.loadedConfig &&
            typeof this.loadedConfig.contextMenu === "boolean") {
            console.warn('The configuration option contextMenu no longer takes a boolean. Use "on", "off", or "rightClickOnly".');
        }
        const [builder, zipWriterClass] = await createRuffleBuilder(this.onRuffleDownloadProgress.bind(this)).catch((e) => {
            console.error(`Serious error loading Ruffle: ${e}`);
            const error = new LoadRuffleWasmError(e);
            this.panic(error);
            throw error;
        });
        this.newZipWriter = zipWriterClass;
        configureBuilder(builder, this.loadedConfig || {});
        builder.setVolume(this.volumeSettings.get_volume());
        if (this.loadedConfig?.fontSources) {
            for (const url of this.loadedConfig.fontSources) {
                try {
                    const response = await fetch(url);
                    builder.addFont(url, new Uint8Array(await response.arrayBuffer()));
                }
                catch (error) {
                    console.warn(`Couldn't download font source from ${url}`, error);
                }
            }
        }
        for (const key in this.loadedConfig?.defaultFonts) {
            const names = this.loadedConfig.defaultFonts[key];
            if (names) {
                builder.setDefaultFont(key, names);
            }
        }
        this.instance = await builder.build(this.container, this).catch((e) => {
            console.error(`Serious error loading Ruffle: ${e}`);
            this.panic(e);
            throw e;
        });
        this.rendererDebugInfo = this.instance.renderer_debug_info();
        if (this.rendererDebugInfo.includes("Adapter Device Type: Cpu")) {
            this.container.addEventListener("mouseover", this.openHardwareAccelerationModal.bind(this), {
                once: true,
            });
        }
        const actuallyUsedRendererName = this.instance.renderer_name();
        const constructor = this.instance.constructor;
        console.log("%c" +
            "New Ruffle instance created (Version: " +
            buildInfo.versionName +
            " | WebAssembly extensions: " +
            (constructor.is_wasm_simd_used() ? "ON" : "OFF") +
            " | Used renderer: " +
            (actuallyUsedRendererName ?? "") +
            ")", "background: #37528C; color: #FFAD33");
        // In Firefox, AudioContext.state is always "suspended" when the object has just been created.
        // It may change by itself to "running" some milliseconds later. So we need to wait a little
        // bit before checking if autoplay is supported and applying the instance config.
        if (this.audioState() !== "running") {
            this.container.style.visibility = "hidden";
            await new Promise((resolve) => {
                window.setTimeout(() => {
                    resolve();
                }, 200);
            });
            this.container.style.visibility = "";
        }
        this.unmuteAudioContext();
        // Treat invalid values as `AutoPlay.Auto`.
        if (!this.loadedConfig ||
            this.loadedConfig.autoplay === AutoPlay.On ||
            (this.loadedConfig.autoplay !== AutoPlay.Off &&
                this.audioState() === "running")) {
            this.play();
            if (this.audioState() !== "running") {
                // Treat invalid values as `UnmuteOverlay.Visible`.
                if (!this.loadedConfig ||
                    this.loadedConfig.unmuteOverlay !== UnmuteOverlay.Hidden) {
                    this.unmuteOverlay.style.display = "block";
                }
                this.container.addEventListener("click", this.unmuteOverlayClicked.bind(this), {
                    once: true,
                });
                const audioContext = this.instance?.audio_context();
                if (audioContext) {
                    audioContext.onstatechange = () => {
                        if (audioContext.state === "running") {
                            this.unmuteOverlayClicked();
                        }
                        audioContext.onstatechange = null;
                    };
                }
            }
        }
        else {
            this.playButton.style.display = "block";
        }
    }
    /**
     * Uploads the splash screen progress bar.
     *
     * @param bytesLoaded The size of the Ruffle WebAssembly file downloaded so far.
     * @param bytesTotal The total size of the Ruffle WebAssembly file.
     */
    onRuffleDownloadProgress(bytesLoaded, bytesTotal) {
        const loadBar = this.splashScreen.querySelector(".loadbar-inner");
        const outerLoadbar = this.splashScreen.querySelector(".loadbar");
        if (Number.isNaN(bytesTotal)) {
            if (outerLoadbar) {
                outerLoadbar.style.display = "none";
            }
        }
        else {
            loadBar.style.width = `${100.0 * (bytesLoaded / bytesTotal)}%`;
        }
    }
    /**
     * Destroys the currently running instance of Ruffle.
     */
    destroy() {
        if (this.instance) {
            this.instance.destroy();
            this.instance = null;
            this.metadata = null;
            this._readyState = ReadyState.HaveNothing;
            console.log("Ruffle instance destroyed.");
        }
    }
    checkOptions(options) {
        if (typeof options === "string") {
            return { url: options };
        }
        const check = (condition, message) => {
            if (!condition) {
                const error = new InvalidOptionsError(message);
                this.panic(error);
                throw error;
            }
        };
        check(options !== null && typeof options === "object", "Argument 0 must be a string or object");
        check("url" in options || "data" in options, "Argument 0 must contain a `url` or `data` key");
        check(!("url" in options) || typeof options.url === "string", "`url` must be a string");
        return options;
    }
    /**
     * Reloads the player, as if you called {@link RufflePlayer.load} with the same config as the last time it was called.
     *
     * If this player has never been loaded, this method will return an error.
     */
    async reload() {
        if (this.loadedConfig) {
            await this.load(this.loadedConfig);
        }
        else {
            throw new Error("Cannot reload if load wasn't first called");
        }
    }
    /**
     * Reloads the player, as if you called {@link RufflePlayer.load} with the same config as the last time it was called, but setting the preferredRenderer to "canvas".
     *
     * If this player has never been loaded, this method will return an error.
     * If this player was already trying to use the canvas render, this method will panic.
     */
    async reloadWithCanvasRenderer() {
        if (this.loadedConfig &&
            this.loadedConfig.preferredRenderer !== RenderBackend.Canvas) {
            const combinedOptions = {
                ...this.loadedConfig,
                preferredRenderer: RenderBackend.Canvas,
            };
            await this.load(combinedOptions);
        }
        else if (this.loadedConfig) {
            this.panic(new Error(i18n_text("error-canvas-reload")));
        }
        else {
            throw new Error("Cannot reload if load wasn't first called");
        }
    }
    /**
     * Loads a specified movie into this player.
     *
     * This will replace any existing movie that may be playing.
     *
     * @param options One of the following:
     * - A URL, passed as a string, which will load a URL with default options.
     * - A [[URLLoadOptions]] object, to load a URL with options.
     * - A [[DataLoadOptions]] object, to load data with options.
     * The options, if provided, must only contain values provided for this specific movie.
     * They must not contain any default values, since those would overwrite other configuration
     * settings with a lower priority (e.g. the general RufflePlayer config).
     * @param isPolyfillElement Whether the element is a polyfilled Flash element or not.
     * This is used to determine a default value of the configuration.
     *
     * The options will be defaulted by the [[config]] field, which itself
     * is defaulted by a global `window.RufflePlayer.config`.
     */
    async load(options, isPolyfillElement = false) {
        options = this.checkOptions(options);
        if (!this.element.isConnected || this.isUnusedFallbackObject()) {
            console.warn("Ignoring attempt to play a disconnected or suspended Ruffle element");
            return;
        }
        if (isFallbackElement(this.element)) {
            // Silently fail on attempt to play a Ruffle element inside a specific node.
            return;
        }
        try {
            this.loadedConfig = {
                ...DEFAULT_CONFIG,
                // The default allowScriptAccess value for polyfilled elements is samedomain.
                ...(isPolyfillElement && "url" in options
                    ? {
                        allowScriptAccess: parseAllowScriptAccess("samedomain", options.url),
                    }
                    : {}),
                ...(window.RufflePlayer?.config ?? {}),
                ...this.config,
                ...options,
            };
            // Pre-emptively set background color of container while Ruffle/SWF loads.
            if (this.loadedConfig.backgroundColor &&
                this.loadedConfig.wmode !== WindowMode.Transparent) {
                this.container.style.backgroundColor =
                    this.loadedConfig.backgroundColor;
            }
            await this.ensureFreshInstance();
            if ("url" in options) {
                console.log(`Loading SWF file ${options.url}`);
                this.swfUrl = new URL(options.url, document.baseURI);
                this.instance.stream_from(this.swfUrl.href, sanitizeParameters(options.parameters));
            }
            else if ("data" in options) {
                console.log("Loading SWF data");
                delete this.swfUrl;
                this.instance.load_data(new Uint8Array(options.data), sanitizeParameters(options.parameters), options.swfFileName || "movie.swf");
            }
        }
        catch (e) {
            console.error(`Serious error occurred loading SWF file: ${e}`);
            const err = new Error(e);
            this.panic(err);
            throw err;
        }
    }
    /**
     * Plays or resumes the movie.
     */
    play() {
        if (this.instance) {
            this.instance.play();
            this.playButton.style.display = "none";
        }
    }
    /**
     * Whether this player is currently playing.
     *
     * @returns True if this player is playing, false if it's paused or hasn't started yet.
     */
    get isPlaying() {
        if (this.instance) {
            return this.instance.is_playing();
        }
        return false;
    }
    /**
     * Returns the master volume of the player.
     *
     * The volume is linear and not adapted for logarithmic hearing.
     *
     * @returns The volume. 1.0 is 100% volume.
     */
    get volume() {
        if (this.instance) {
            return this.instance.volume();
        }
        return 1.0;
    }
    /**
     * Sets the master volume of the player.
     *
     * The volume should be linear and not adapted for logarithmic hearing.
     *
     * @param value The volume. 1.0 is 100% volume.
     */
    set volume(value) {
        if (this.instance) {
            this.instance.set_volume(value);
        }
    }
    /**
     * Checks if this player is allowed to be fullscreen by the browser.
     *
     * @returns True if you may call [[enterFullscreen]].
     */
    get fullscreenEnabled() {
        return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
    }
    /**
     * Checks if this player is currently fullscreen inside the browser.
     *
     * @returns True if it is fullscreen.
     */
    get isFullscreen() {
        return ((document.fullscreenElement || document.webkitFullscreenElement) ===
            this.element);
    }
    /**
     * Exported function that requests the browser to change the fullscreen state if
     * it is allowed.
     *
     * @param isFull Whether to set to fullscreen or return to normal.
     */
    setFullscreen(isFull) {
        if (this.fullscreenEnabled && isFull !== this.isFullscreen) {
            if (isFull) {
                this.enterFullscreen();
            }
            else {
                this.exitFullscreen();
            }
        }
    }
    /**
     * Requests the browser to make this player fullscreen.
     *
     * This is not guaranteed to succeed, please check [[fullscreenEnabled]] first.
     */
    enterFullscreen() {
        const options = {
            navigationUI: "hide",
        };
        if (this.element.requestFullscreen) {
            this.element.requestFullscreen(options);
        }
        else if (this.element.webkitRequestFullscreen) {
            this.element.webkitRequestFullscreen(options);
        }
        else if (this.element.webkitRequestFullScreen) {
            this.element.webkitRequestFullScreen(options);
        }
    }
    /**
     * Requests the browser to no longer make this player fullscreen.
     */
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
    /**
     * Called when entering / leaving fullscreen.
     */
    fullScreenChange() {
        // If fullScreenAspectRatio is specified, lock orientation in fullscreen mode if supported
        if (this.isFullscreen &&
            screen.orientation &&
            typeof screen.orientation.lock === "function") {
            // TODO (danielhjacobs): If playerRuntime is "air", instead of just checking the loadedConfig fullScreenAspectRatio,
            // when Ruffle loads the fullScreenAspectRatio should be applied by `Stage.setAspectRatio`,
            // This code should check the current Stage aspect ratio, including if it was later changed.
            // Note: "any" is not documented as a supported embed attribute, but it is documented for `Stage.setAspectRatio`.
            const fullScreenAspectRatio = this.loadedConfig?.fullScreenAspectRatio?.toLowerCase() ?? "";
            if (["portrait", "landscape", "any"].includes(fullScreenAspectRatio)) {
                screen.orientation
                    .lock(fullScreenAspectRatio)
                    .catch(() => { });
            }
        }
        else {
            try {
                screen.orientation.unlock();
            }
            catch {
                // Ignored: not all browsers support orientation unlocking
            }
        }
        this.instance?.set_fullscreen(this.isFullscreen);
    }
    checkIfTouch(event) {
        this.isTouch =
            event.pointerType === "touch" || event.pointerType === "pen";
    }
    /**
     * Confirm reload or delete of save file.
     *
     * @param solKey The key of the SOL file.
     * @param b64SolData The base-64 encoded SOL string.
     * @param replace Whether to replace or delete the save file.
     */
    confirmReloadSave(solKey, b64SolData, replace) {
        if (isB64SOL(b64SolData)) {
            if (localStorage[solKey]) {
                if (!replace) {
                    const confirmDelete = confirm(i18n_text("save-delete-prompt"));
                    if (!confirmDelete) {
                        return;
                    }
                }
                const swfPath = this.swfUrl ? this.swfUrl.pathname : "";
                const swfHost = this.swfUrl
                    ? this.swfUrl.hostname
                    : document.location.hostname;
                const savePath = solKey.split("/").slice(1, -1).join("/");
                if (swfPath.includes(savePath) && solKey.startsWith(swfHost)) {
                    const confirmReload = confirm(i18n_text("save-reload-prompt", {
                        action: replace ? "replace" : "delete",
                    }));
                    if (confirmReload && this.loadedConfig) {
                        this.destroy();
                        if (replace) {
                            localStorage.setItem(solKey, b64SolData);
                        }
                        else {
                            localStorage.removeItem(solKey);
                        }
                        this.reload();
                        this.populateSaves();
                        this.saveManager.classList.add("hidden");
                    }
                    return;
                }
                if (replace) {
                    localStorage.setItem(solKey, b64SolData);
                }
                else {
                    localStorage.removeItem(solKey);
                }
                this.populateSaves();
                this.saveManager.classList.add("hidden");
            }
        }
    }
    /**
     * Replace save from SOL file.
     *
     * @param event The change event fired.
     * @param solKey The localStorage save file key.
     */
    replaceSOL(event, solKey) {
        const fileInput = event.target;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            if (reader.result && typeof reader.result === "string") {
                const b64Regex = new RegExp("data:.*;base64,");
                const b64SolData = reader.result.replace(b64Regex, "");
                this.confirmReloadSave(solKey, b64SolData, true);
            }
        });
        if (fileInput &&
            fileInput.files &&
            fileInput.files.length > 0 &&
            fileInput.files[0]) {
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
    /**
     * Check if there are any saves.
     *
     * @returns True if there is at least one save.
     */
    checkSaves() {
        if (!this.saveManager.querySelector("#local-saves")) {
            return false;
        }
        try {
            if (localStorage === null) {
                return false;
            }
        }
        catch (_e) {
            return false;
        }
        return Object.keys(localStorage).some((key) => {
            const solName = key.split("/").pop();
            const solData = localStorage.getItem(key);
            return solName && solData && isB64SOL(solData);
        });
    }
    /**
     * Delete local save.
     *
     * @param key The key to remove from local storage.
     */
    deleteSave(key) {
        const b64SolData = localStorage.getItem(key);
        if (b64SolData) {
            this.confirmReloadSave(key, b64SolData, false);
        }
    }
    /**
     * Puts the local save SOL file keys in a table.
     */
    populateSaves() {
        if (!this.checkSaves()) {
            return;
        }
        const saveTable = this.saveManager.querySelector("#local-saves");
        saveTable.textContent = "";
        Object.keys(localStorage).forEach((key) => {
            const solName = key.split("/").pop();
            const solData = localStorage.getItem(key);
            if (solName && solData && isB64SOL(solData)) {
                saveTable.appendChild((0,jsx_runtime.jsx)(this.SaveRow, { rowKey: key, solName: solName, solData: solData }));
            }
        });
    }
    /**
     * Gets the local save information as SOL files and downloads them as a single ZIP file.
     */
    async backupSaves() {
        const zip = this.newZipWriter();
        const duplicateNames = [];
        Object.keys(localStorage).forEach((key) => {
            let solName = String(key.split("/").pop());
            const solData = localStorage.getItem(key);
            if (solData && isB64SOL(solData)) {
                const array = base64ToArray(solData);
                const duplicate = duplicateNames.filter((value) => value === solName).length;
                duplicateNames.push(solName);
                if (duplicate > 0) {
                    solName += ` (${duplicate + 1})`;
                }
                zip.addFile(solName + ".sol", array);
            }
        });
        const blob = new Blob([zip.save()], {
            type: "application/zip",
        });
        saveFile(blob, "saves.zip");
    }
    /**
     * Opens the hardware acceleration info modal.
     */
    openHardwareAccelerationModal() {
        this.hardwareAccelerationModal.classList.remove("hidden");
    }
    /**
     * Opens the save manager.
     */
    async openSaveManager() {
        this.populateSaves();
        this.saveManager.classList.remove("hidden");
    }
    /**
     * Opens the volume controls.
     */
    openVolumeControls() {
        this.volumeControls.classList.remove("hidden");
    }
    /**
     * Fetches the loaded SWF and downloads it.
     */
    async downloadSwf() {
        try {
            if (this.swfUrl) {
                console.log("Downloading SWF: " + this.swfUrl);
                const response = await fetch(this.swfUrl.href);
                if (!response.ok) {
                    console.error("SWF download failed");
                    return;
                }
                const blob = await response.blob();
                saveFile(blob, swfFileName(this.swfUrl));
            }
            else {
                console.error("SWF download failed");
            }
        }
        catch (_err) {
            console.error("SWF download failed");
        }
    }
    virtualKeyboardInput() {
        const input = this.virtualKeyboard;
        const string = input.value;
        for (const char of string) {
            for (const eventType of ["keydown", "keyup"]) {
                this.element.dispatchEvent(new KeyboardEvent(eventType, {
                    key: char,
                    bubbles: true,
                }));
            }
        }
        input.value = "";
    }
    openVirtualKeyboard() {
        // Virtual keyboard is opened/closed synchronously from core,
        // and opening/closing it is basically dispatching
        // focus events (which may also be dispatched to the player).
        // In order not to deadlock here (or rather throw an error),
        // these actions should be performed asynchronously.
        // However, some browsers (i.e. Safari) require user interaction
        // in order to open the virtual keyboard.
        // That is why we are checking whether Ruffle already has focus:
        //  1. if it does, no focus events will be dispatched to
        //     the player when we focus the virtual keyboard, and
        //  2. if it doesn't, the action shouldn't be a result of user
        //     interaction and focusing synchronously wouldn't work anyway.
        if (this.instance?.has_focus()) {
            this.virtualKeyboard.focus({ preventScroll: true });
        }
        else {
            setTimeout(() => {
                this.virtualKeyboard.focus({ preventScroll: true });
            }, 0);
        }
    }
    closeVirtualKeyboard() {
        // Note that closing the keyboard is a little tricky, as we cannot
        // just remove the focus here, as the player should still be focused.
        // We want to switch the focus to the container instead, but the user may also
        // click away from the player, and in that case we do not want to re-focus it.
        // We also have to take into account that the keyboard may be
        // closed even if the player doesn't have focus at all.
        // That's why we have to "transfer" the focus from the keyboard to the container.
        if (this.isVirtualKeyboardFocused()) {
            this.container.focus({ preventScroll: true });
        }
    }
    isVirtualKeyboardFocused() {
        return this.shadow.activeElement === this.virtualKeyboard;
    }
    contextMenuItems() {
        const CHECKMARK = String.fromCharCode(0x2713);
        const items = [];
        const addSeparator = () => {
            // Don't start with or duplicate separators.
            if (items.length > 0 && items[items.length - 1] !== null) {
                items.push(null);
            }
        };
        if (this.instance && this.isPlaying) {
            const customItems = this.instance.prepare_context_menu();
            customItems.forEach((item, index) => {
                if (item.separatorBefore) {
                    addSeparator();
                }
                items.push({
                    // TODO: better checkboxes
                    text: item.caption + (item.checked ? ` (${CHECKMARK})` : ``),
                    onClick: async () => this.instance?.run_context_menu_callback(index),
                    enabled: item.enabled,
                });
            });
            addSeparator();
        }
        if (this.fullscreenEnabled) {
            if (this.isFullscreen) {
                items.push({
                    text: i18n_text("context-menu-exit-fullscreen"),
                    onClick: async () => this.setFullscreen(false),
                });
            }
            else {
                items.push({
                    text: i18n_text("context-menu-enter-fullscreen"),
                    onClick: async () => this.setFullscreen(true),
                });
            }
        }
        items.push({
            text: i18n_text("context-menu-volume-controls"),
            onClick: async () => {
                this.openVolumeControls();
            },
        });
        if (this.instance &&
            this.swfUrl &&
            this.loadedConfig &&
            this.loadedConfig.showSwfDownload === true) {
            addSeparator();
            items.push({
                text: i18n_text("context-menu-download-swf"),
                onClick: this.downloadSwf.bind(this),
            });
        }
        if (navigator.clipboard && window.isSecureContext) {
            items.push({
                text: i18n_text("context-menu-copy-debug-info"),
                onClick: () => navigator.clipboard.writeText(this.getPanicData()),
            });
        }
        if (this.checkSaves()) {
            items.push({
                text: i18n_text("context-menu-open-save-manager"),
                onClick: this.openSaveManager.bind(this),
            });
        }
        addSeparator();
        items.push({
            text: i18n_text("context-menu-about-ruffle", {
                flavor: isExtension ? "extension" : "",
                version: buildInfo.versionName,
            }),
            async onClick() {
                window.open(RUFFLE_ORIGIN, "_blank");
            },
        });
        // Give option to disable context menu when touch support is being used
        // to avoid a long press triggering the context menu. (#1972)
        if (this.isTouch) {
            addSeparator();
            items.push({
                text: i18n_text("context-menu-hide"),
                onClick: async () => {
                    this.contextMenuForceDisabled = true;
                },
            });
        }
        return items;
    }
    pointerDown(event) {
        this.pointerDownPosition = new Point(event.pageX, event.pageY);
        this.pointerMoveMaxDistance = 0;
        this.startLongPressTimer();
    }
    clearLongPressTimer() {
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
        }
    }
    startLongPressTimer() {
        const longPressTimeout = 800;
        this.clearLongPressTimer();
        this.longPressTimer = setTimeout(() => this.clearLongPressTimer(), longPressTimeout);
    }
    checkLongPressMovement(event) {
        if (this.pointerDownPosition !== null) {
            const currentPosition = new Point(event.pageX, event.pageY);
            const distance = this.pointerDownPosition.distanceTo(currentPosition);
            if (distance > this.pointerMoveMaxDistance) {
                this.pointerMoveMaxDistance = distance;
            }
        }
    }
    checkLongPress(event) {
        const maxAllowedDistance = 15;
        if (this.longPressTimer) {
            this.clearLongPressTimer();
            // The pointerType condition is to ensure right-click does not trigger
            // a context menu the wrong way the first time you right-click,
            // before contextMenuSupported is set.
        }
        else if (!this.contextMenuSupported &&
            event.pointerType !== "mouse" &&
            this.pointerMoveMaxDistance < maxAllowedDistance) {
            // TODO Implement handling right clicks for mobile.
            this.showContextMenu(event);
        }
    }
    suppressContextMenu() {
        this._suppressContextMenu = true;
    }
    showContextMenu(event) {
        if (this.panicked) {
            return;
        }
        event.preventDefault();
        if (this._suppressContextMenu) {
            this._suppressContextMenu = false;
            return;
        }
        if (this.shadow.querySelectorAll(".modal:not(.hidden)").length !== 0) {
            return;
        }
        // TODO Currently when opening context menu,
        //   mouse up event is fired on mouse up,
        //   but should be on context menu close.
        if (event.type === "contextmenu") {
            this.contextMenuSupported = true;
            document.documentElement.addEventListener("click", this.hideContextMenu.bind(this), {
                once: true,
            });
        }
        else {
            document.documentElement.addEventListener("pointerup", this.hideContextMenu.bind(this), { once: true });
            event.stopPropagation();
        }
        if ([false, ContextMenu.Off].includes(this.loadedConfig?.contextMenu ?? ContextMenu.On) ||
            (this.isTouch &&
                this.loadedConfig?.contextMenu ===
                    ContextMenu.RightClickOnly) ||
            this.contextMenuForceDisabled) {
            return;
        }
        // Clear all context menu items.
        while (this.contextMenuElement.firstChild) {
            this.contextMenuElement.removeChild(this.contextMenuElement.firstChild);
        }
        // Populate context menu items.
        for (const item of this.contextMenuItems()) {
            if (item === null) {
                this.contextMenuElement.appendChild((0,jsx_runtime.jsx)("li", { class: "menu-separator", children: (0,jsx_runtime.jsx)("hr", {}) }));
            }
            else {
                const { text, onClick, enabled } = item;
                const menuItem = ((0,jsx_runtime.jsx)("li", { class: {
                        "menu-item": true,
                        disabled: enabled === false,
                    }, "data-text": text, children: text }));
                this.contextMenuElement.appendChild(menuItem);
                if (enabled !== false) {
                    const itemAction = async (event) => {
                        // Prevent right-clicks from displaying the browser context menu.
                        event.preventDefault();
                        // Prevent the menu from being destroyed.
                        // It's required when we're dealing with async callbacks,
                        // as the async callback may still use the menu in the future.
                        event.stopPropagation();
                        await onClick(event);
                        // Then we have to close the context menu manually after the callback finishes.
                        this.hideContextMenu();
                    };
                    if (this.contextMenuSupported) {
                        menuItem.addEventListener("click", itemAction);
                        menuItem.addEventListener("contextmenu", itemAction);
                    }
                    else {
                        menuItem.addEventListener("pointerup", itemAction);
                    }
                }
            }
        }
        this.contextMenuOverlay.classList.remove("hidden");
        const playerRect = this.element.getBoundingClientRect();
        const contextMenuRect = this.contextMenuElement.getBoundingClientRect();
        // We need to get the viewport element in order to properly detect the
        // viewport size. We cannot use window.innerWidth, because it doesn't
        // take into account the scrollbar. Unfortunately, the viewport element
        // is different in standards mode (documentElement) compared to quirks
        // mode (body).
        //
        // In standards mode, scrollingElement always returns the
        // documentElement, in quirks mode it sometimes returns body, sometimes
        // null. As we don't care about scrollability, we can just assume quirks
        // mode and get the body when it's null.
        const viewportElement = document.scrollingElement || document.body;
        // Keep the entire context menu inside the viewport.
        const overflowX = Math.max(0, event.clientX + contextMenuRect.width - viewportElement.clientWidth);
        const overflowY = Math.max(0, event.clientY +
            contextMenuRect.height -
            viewportElement.clientHeight);
        const x = event.clientX - playerRect.x - overflowX;
        const y = event.clientY - playerRect.y - overflowY;
        const isRtl = getComputedStyle(this.contextMenuElement).direction === "rtl";
        this.contextMenuElement.style.top = `${y}px`;
        if (isRtl) {
            this.contextMenuElement.style.right = `${playerRect.width - x}px`;
            this.contextMenuElement.style.left = "";
        }
        else {
            this.contextMenuElement.style.right = "";
            this.contextMenuElement.style.left = `${x}px`;
        }
    }
    hideContextMenu() {
        this.instance?.clear_custom_menu_items();
        this.contextMenuOverlay.classList.add("hidden");
    }
    /**
     * Pauses this player.
     *
     * No more frames, scripts or sounds will be executed.
     * This movie will be considered inactive and will not wake up until resumed.
     */
    pause() {
        if (this.instance) {
            this.instance.pause();
            this.playButton.style.display = "block";
        }
    }
    audioState() {
        if (this.instance) {
            const audioContext = this.instance.audio_context();
            return (audioContext && audioContext.state) || "running";
        }
        return "suspended";
    }
    unmuteOverlayClicked() {
        if (this.instance) {
            if (this.audioState() !== "running") {
                const audioContext = this.instance.audio_context();
                if (audioContext) {
                    audioContext.resume();
                }
            }
            this.unmuteOverlay.style.display = "none";
        }
    }
    /**
     * Plays a silent sound based on the AudioContext's sample rate.
     *
     * This is used to unmute audio on iOS and iPadOS when silent mode is enabled on the device (issue 1552).
     */
    unmuteAudioContext() {
        // No need to play the dummy sound again once audio is unmuted.
        if (isAudioContextUnmuted) {
            return;
        }
        // TODO: Use `navigator.userAgentData` to detect the platform when support improves?
        // Edit (danielhjacobs): Probably not an option since it's only available in secure contexts
        if (navigator.maxTouchPoints < 1) {
            isAudioContextUnmuted = true;
            return;
        }
        if ("audioSession" in navigator) {
            // On browsers which support it (Safari 16.4+), we can specify https://www.w3.org/TR/audio-session/#audio-session-types
            navigator.audioSession.type = "playback";
        }
        else {
            // This is a workaround for iOS versions without audioSession support
            this.container.addEventListener("click", () => {
                if (isAudioContextUnmuted) {
                    return;
                }
                const audioContext = this.instance?.audio_context();
                if (!audioContext) {
                    return;
                }
                const audio = new Audio();
                audio.src = (() => {
                    // Returns a seven samples long 8 bit mono WAVE file.
                    // This is required to prevent the AudioContext from desyncing and crashing.
                    const arrayBuffer = new ArrayBuffer(10);
                    const dataView = new DataView(arrayBuffer);
                    const sampleRate = audioContext.sampleRate;
                    dataView.setUint32(0, sampleRate, true);
                    dataView.setUint32(4, sampleRate, true);
                    dataView.setUint16(8, 1, true);
                    const missingCharacters = window
                        .btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
                        .slice(0, 13);
                    return `data:audio/wav;base64,UklGRisAAABXQVZFZm10IBAAAAABAAEA${missingCharacters}AgAZGF0YQcAAACAgICAgICAAAA=`;
                })();
                audio.load();
                audio
                    .play()
                    .then(() => {
                    isAudioContextUnmuted = true;
                })
                    .catch((err) => {
                    console.warn(`Failed to play dummy sound: ${err}`);
                });
            }, { once: true });
        }
    }
    /**
     * Converts a dimension attribute on an HTML embed/object element to a valid CSS dimension.
     * HTML element dimensions are unitless, but can also be percentages.
     * Add a 'px' unit unless the value is a percentage.
     * Returns null if this is not a valid dimension.
     *
     * @param attribute The attribute to convert
     *
     * @private
     */
    static htmlDimensionToCssDimension(attribute) {
        if (attribute) {
            const match = attribute.match(DIMENSION_REGEX);
            if (match) {
                let out = match[1];
                if (!match[3]) {
                    // Unitless -- add px for CSS.
                    out += "px";
                }
                return out;
            }
        }
        return null;
    }
    callExternalInterface(name, args) {
        return this.instance?.call_exposed_callback(name, args);
    }
    getObjectId() {
        return this.element.getAttribute("name");
    }
    /**
     * Sets a trace observer on this flash player.
     *
     * The observer will be called, as a function, for each message that the playing movie will "trace" (output).
     *
     * @param observer The observer that will be called for each trace.
     */
    set traceObserver(observer) {
        this.instance?.set_trace_observer(observer);
    }
    /**
     * Get data included in any panic of this ruffle-player
     *
     * @returns A string containing all the data included in the panic.
     */
    getPanicData() {
        let result = "\n# Player Info\n";
        result += `Allows script access: ${this.loadedConfig ? this.loadedConfig.allowScriptAccess : false}\n`;
        result += `${this.rendererDebugInfo}\n`;
        result += this.debugPlayerInfo();
        result += "\n# Page Info\n";
        result += `Page URL: ${document.location.href}\n`;
        if (this.swfUrl) {
            result += `SWF URL: ${this.swfUrl}\n`;
        }
        result += "\n# Browser Info\n";
        result += `User Agent: ${window.navigator.userAgent}\n`;
        result += `Platform: ${window.navigator.platform}\n`;
        result += `Has touch support: ${window.navigator.maxTouchPoints > 0}\n`;
        result += "\n# Ruffle Info\n";
        result += `Version: ${buildInfo.versionNumber}\n`;
        result += `Name: ${buildInfo.versionName}\n`;
        result += `Channel: ${buildInfo.versionChannel}\n`;
        result += `Built: ${buildInfo.buildDate}\n`;
        result += `Commit: ${buildInfo.commitHash}\n`;
        result += `Is extension: ${isExtension}\n`;
        result += "\n# Metadata\n";
        if (this.metadata) {
            for (const [key, value] of Object.entries(this.metadata)) {
                result += `${key}: ${value}\n`;
            }
        }
        return result;
    }
    /**
     * Panics this specific player, forcefully destroying all resources and displays an error message to the user.
     *
     * This should be called when something went absolutely, incredibly and disastrously wrong and there is no chance
     * of recovery.
     *
     * Ruffle will attempt to isolate all damage to this specific player instance, but no guarantees can be made if there
     * was a core issue which triggered the panic. If Ruffle is unable to isolate the cause to a specific player, then
     * all players will panic and Ruffle will become "poisoned" - no more players will run on this page until it is
     * reloaded fresh.
     *
     * @param error The error, if any, that triggered this panic.
     */
    panic(error) {
        if (this.panicked) {
            // Only show the first major error, not any repeats - they aren't as important
            return;
        }
        this.panicked = true;
        this.hideSplashScreen();
        const originalError = error;
        if (error instanceof Error &&
            (error.name === "AbortError" ||
                error.message.includes("AbortError"))) {
            // Firefox: Don't display the panic screen if the user leaves the page while something is still loading
            return;
        }
        else if (error instanceof LoadRuffleWasmError) {
            const openInNewTab = this.loadedConfig?.openInNewTab;
            const swfUrl = this.loadedConfig && "url" in this.loadedConfig
                ? new URL(this.loadedConfig.url, document.baseURI)
                : undefined;
            if (openInNewTab && swfUrl) {
                // If it is possible to open the SWF in a new tab offer that option if the WASM failed to load
                this.addOpenInNewTabMessage(openInNewTab, swfUrl);
                return;
            }
            error = error.cause;
        }
        const errorArray = Object.assign([], {
            stackIndex: -1,
            avmStackIndex: -1,
        });
        errorArray.push("# Error Info\n");
        if (error instanceof Error) {
            errorArray.push(`Error name: ${error.name}\n`);
            errorArray.push(`Error message: ${error.message}\n`);
            if (error.stack) {
                const stackIndex = errorArray.push(`Error stack:\n\`\`\`\n${error.stack}\n\`\`\`\n`) - 1;
                if (error.avmStack) {
                    const avmStackIndex = errorArray.push(`AVM2 stack:\n\`\`\`\n    ${error.avmStack
                        .trim()
                        .replace(/\t/g, "    ")}\n\`\`\`\n`) - 1;
                    errorArray.avmStackIndex = avmStackIndex;
                }
                errorArray.stackIndex = stackIndex;
            }
        }
        else {
            errorArray.push(`Error: ${error}\n`);
        }
        errorArray.push(this.getPanicData());
        // Clears out any existing content (ie play button or canvas) and replaces it with the error screen
        showPanicScreen(this.container, originalError, errorArray, this.swfUrl);
        // Do this last, just in case it causes any cascading issues.
        this.destroy();
    }
    addOpenInNewTabMessage(openInNewTab, swfUrl) {
        const url = new URL(swfUrl);
        if (this.loadedConfig?.parameters) {
            const parameters = sanitizeParameters(this.loadedConfig?.parameters);
            Object.entries(parameters).forEach(([key, value]) => {
                url.searchParams.set(key, value);
            });
        }
        this.hideSplashScreen();
        const newTabMessage = ((0,jsx_runtime.jsxs)("div", { children: [textAsParagraphs("message-cant-embed"), (0,jsx_runtime.jsx)("div", { children: (0,jsx_runtime.jsx)("a", { href: "#", onClick: () => openInNewTab(url), children: i18n_text("open-in-new-tab") }) })] }));
        this.displayMessageOrElement(newTabMessage, true);
    }
    displayRootMovieDownloadFailedMessage(invalidSwf, fetchError) {
        const openInNewTab = this.loadedConfig?.openInNewTab;
        if (openInNewTab &&
            this.swfUrl &&
            window.location.origin !== this.swfUrl.origin) {
            this.addOpenInNewTabMessage(openInNewTab, this.swfUrl);
        }
        else {
            const fetchStatusNotOk = fetchError.includes("HTTP Status is not OK:");
            const error = invalidSwf
                ? new InvalidSwfError(this.swfUrl)
                : new LoadSwfError(this.swfUrl, fetchStatusNotOk);
            this.panic(error);
        }
    }
    /**
     * Show a dismissible message in front of the player.
     *
     * @param message The message shown to the user, which can be a string or element.
     * @param omitContinueButton If true, the continue button will not be shown.
     */
    displayMessageOrElement(message, omitContinueButton) {
        const messageContent = message instanceof HTMLDivElement ? message : (0,jsx_runtime.jsx)("p", { children: message });
        const continueButton = !omitContinueButton ? ((0,jsx_runtime.jsx)("div", { children: (0,jsx_runtime.jsx)("button", { id: "continue-btn", children: i18n_text("continue") }) })) : null;
        const messageOverlay = ((0,jsx_runtime.jsx)("div", { id: "message-overlay", children: (0,jsx_runtime.jsxs)("div", { class: "message", children: [messageContent, continueButton] }) }));
        this.container.prepend(messageOverlay);
        if (!omitContinueButton) {
            const continueBtn = this.container.querySelector("#continue-btn");
            continueBtn.onclick = () => {
                messageOverlay.parentNode.removeChild(messageOverlay);
            };
        }
    }
    /**
     * Show a dismissible message in front of the player.
     *
     * @param message The message shown to the user.
     */
    displayMessage(message) {
        this.displayMessageOrElement(message);
    }
    /**
     * Inform the user that the browser restored the file from the back/forward cache.
     */
    displayRestoredFromBfcacheMessage() {
        // Do not display the message if another one is already shown.
        if (this.container.querySelector("#message-overlay") !== null) {
            return;
        }
        const message = textAsParagraphs("message-restored-from-bfcache");
        this.displayMessageOrElement(message);
        // Remove the message element if it doesn't fit in the container, to avoid potential blocking situations.
        const messageOverlay = this.container.querySelector("#message-overlay");
        if (messageOverlay.scrollWidth > messageOverlay.offsetWidth ||
            messageOverlay.scrollHeight > messageOverlay.offsetHeight) {
            messageOverlay.parentNode.removeChild(messageOverlay);
        }
    }
    /**
     * Show a video that uses an unsupported codec in a pop up.
     *
     * @param url The url of the video to be shown over the canvas.
     */
    displayUnsupportedVideo(url) {
        const videoHolder = this.videoModal.querySelector("#video-holder");
        if (videoHolder) {
            const video = ((0,jsx_runtime.jsx)("video", { src: url, autoplay: true, controls: true, onContextMenu: (event) => event.stopPropagation() }));
            videoHolder.textContent = "";
            videoHolder.appendChild(video);
            this.videoModal.classList.remove("hidden");
        }
    }
    displayClipboardModal(accessDenied) {
        const description = this.clipboardModal.querySelector("#clipboard-modal-description");
        if (description) {
            description.textContent = i18n_text("clipboard-message-description", {
                variant: accessDenied ? "access-denied" : "unsupported",
            });
            this.clipboardModal.classList.remove("hidden");
        }
    }
    hideSplashScreen() {
        this.splashScreen.classList.add("hidden");
        this.container.classList.remove("hidden");
    }
    showSplashScreen() {
        this.splashScreen.classList.remove("hidden");
        this.container.classList.add("hidden");
    }
    setMetadata(metadata) {
        this.metadata = metadata;
        // TODO: Switch this to ReadyState.Loading when we have streaming support.
        this._readyState = ReadyState.Loaded;
        this.hideSplashScreen();
        this.element.dispatchEvent(new CustomEvent(InnerPlayer.LOADED_METADATA));
        // TODO: Move this to whatever function changes the ReadyState to Loaded when we have streaming support.
        this.element.dispatchEvent(new CustomEvent(InnerPlayer.LOADED_DATA));
    }
}
/**
 * Triggered when a movie metadata has been loaded (such as movie width and height).
 *
 * @event RufflePlayer#loadedmetadata
 */
InnerPlayer.LOADED_METADATA = "loadedmetadata";
/**
 * Triggered when a movie is fully loaded.
 *
 * @event RufflePlayer#loadeddata
 */
InnerPlayer.LOADED_DATA = "loadeddata";
/**
 * The volume controls of the Ruffle web GUI.
 */
class inner_VolumeControls {
    constructor(isMuted, volume) {
        this.isMuted = isMuted;
        this.volume = volume;
    }
    /**
     * Returns the volume between 0 and 1 (calculated out of the
     * checkbox and the slider).
     *
     * @returns The volume between 0 and 1.
     */
    get_volume() {
        return !this.isMuted ? this.volume / 100 : 0;
    }
}
/**
 * Returns the URLLoadOptions that have been provided for a specific movie.
 *
 * The function getOptionString is given as an argument and used to get values of configuration
 * options that have been overwritten for this specific movie.
 *
 * The returned URLLoadOptions interface only contains values for the configuration options
 * that have been overwritten for the movie and no default values.
 * This is necessary because any default values would overwrite other configuration
 * settings with a lower priority (e.g. the general RufflePlayer config).
 *
 * @param url The url of the movie.
 * @param getOptionString A function that takes the name of a configuration option.
 * If that configuration option has been overwritten for this specific movie, it returns that value.
 * Otherwise, it returns null.
 * @returns The URLLoadOptions for the movie.
 */
function getPolyfillOptions(url, getOptionString) {
    const options = { url };
    const allowNetworking = getOptionString("allowNetworking");
    if (allowNetworking !== null) {
        options.allowNetworking = allowNetworking;
    }
    const allowScriptAccess = parseAllowScriptAccess(getOptionString("allowScriptAccess"), url);
    if (allowScriptAccess !== null) {
        options.allowScriptAccess = allowScriptAccess;
    }
    const backgroundColor = getOptionString("bgcolor");
    if (backgroundColor !== null) {
        options.backgroundColor = backgroundColor;
    }
    const base = getOptionString("base");
    if (base !== null) {
        // "." tells Flash Player to load relative URLs from the SWF's directory
        // All other base values are evaluated relative to the page URL
        if (base === ".") {
            const swfUrl = new URL(url, document.baseURI);
            options.base = new URL(base, swfUrl).href;
        }
        else {
            options.base = base;
        }
    }
    const menu = parseBoolean(getOptionString("menu"));
    if (menu !== null) {
        options.menu = menu;
    }
    const allowFullscreen = parseBoolean(getOptionString("allowFullScreen"));
    if (allowFullscreen !== null) {
        options.allowFullscreen = allowFullscreen;
    }
    const parameters = getOptionString("flashvars");
    if (parameters !== null) {
        options.parameters = parameters;
    }
    const quality = getOptionString("quality");
    if (quality !== null) {
        options.quality = quality;
    }
    const salign = getOptionString("salign");
    if (salign !== null) {
        options.salign = salign;
    }
    const scale = getOptionString("scale");
    if (scale !== null) {
        options.scale = scale;
    }
    const wmode = getOptionString("wmode");
    if (wmode !== null) {
        options.wmode = wmode;
    }
    const fullScreenAspectRatio = getOptionString("fullScreenAspectRatio");
    if (fullScreenAspectRatio !== null) {
        options.fullScreenAspectRatio = fullScreenAspectRatio;
    }
    return options;
}
/**
 * Returns whether the given filename is a Youtube Flash source.
 *
 * @param filename The filename to test.
 * @returns True if the filename is a Youtube Flash source.
 */
function isYoutubeFlashSource(filename) {
    if (filename) {
        let pathname = "";
        let hostname = "";
        try {
            // A base URL is required if `filename` is a relative URL, but we don't need to detect the real URL origin.
            const url = new URL(filename, RUFFLE_ORIGIN);
            pathname = url.pathname;
            hostname = url.hostname;
        }
        catch (_err) {
            // Some invalid filenames, like `///`, could raise a TypeError. Let's fail silently in this situation.
        }
        // See https://wiki.mozilla.org/QA/Youtube_Embedded_Rewrite
        if (pathname.startsWith("/v/") &&
            /^(?:(?:www\.|m\.)?youtube(?:-nocookie)?\.com)|(?:youtu\.be)$/i.test(hostname)) {
            return true;
        }
    }
    return false;
}
/**
 * Workaround Youtube mixed content if upgradeToHttps is true.
 *
 * @param elem The element to change.
 * @param attr The attribute to adjust.
 */
function workaroundYoutubeMixedContent(elem, attr) {
    const value = elem.getAttribute(attr);
    const config = window.RufflePlayer?.config ?? {};
    if (value) {
        try {
            const url = new URL(value);
            if (url.protocol === "http:" &&
                window.location.protocol === "https:" &&
                (!("upgradeToHttps" in config) ||
                    config.upgradeToHttps !== false)) {
                url.protocol = "https:";
                elem.setAttribute(attr, url.toString());
            }
        }
        catch (_err) {
            // Some invalid filenames, like `///`, could raise a TypeError. Let's fail silently in this situation.
        }
    }
}
/**
 * Determine if an element is a child of a node that was not supported
 * in non-HTML5 compliant browsers. If so, the element was meant to be
 * used as a fallback content.
 *
 * @param elem The element to test.
 * @returns True if the element is inside an <audio> or <video> node.
 */
function isFallbackElement(elem) {
    let parent = elem.parentElement;
    while (parent !== null) {
        switch (parent.tagName) {
            case "AUDIO":
            case "VIDEO":
                return true;
        }
        parent = parent.parentElement;
    }
    return false;
}
/**
 * Prompt the user to download a file.
 *
 * @param blob The content to download.
 * @param name The name to give the file.
 */
function saveFile(blob, name) {
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = name;
    link.click();
    URL.revokeObjectURL(blobURL);
}
/**
 * Create a new Uint8Array object from a base64-encoded string.
 *
 * @param bytesBase64 The base64-encoded string.
 * @returns The new Uint8Array.
 */
function base64ToArray(bytesBase64) {
    const byteString = atob(bytesBase64);
    return Uint8Array.from(byteString, (char) => char.charCodeAt(0));
}
/**
 * Create a new Blob of the given type from a base64-encoded string.
 *
 * @param bytesBase64 The base64-encoded string.
 * @param mimeString The MIME type for the encoded string.
 * @returns The new Blob.
 */
function base64ToBlob(bytesBase64, mimeString) {
    const ab = base64ToArray(bytesBase64);
    const blob = new Blob([ab], { type: mimeString });
    return blob;
}
/**
 * Check if string is a base-64 encoded SOL file.
 *
 * @param solData The base-64 encoded SOL string.
 * @returns If the string represent a base-64 encoded SOL file.
 */
function isB64SOL(solData) {
    try {
        const decodedData = atob(solData);
        return isSolData(decodedData);
    }
    catch (_e) {
        return false;
    }
}
/**
 * Check if string is structured like SOL data up until the end of the header.
 * See https://www.sans.org/blog/local-shared-objects-aka-flash-cookies/.
 *
 * @param data The SOL string.
 * @returns If the string seemingly represents an SOL file.
 */
function isSolData(data) {
    return (
    // First two bytes are a magic value (0x00 0xbf)
    data.charCodeAt(0) === 0x00 &&
        data.charCodeAt(1) === 0xbf &&
        // Seventh through tenth bytes are another magic value (ASCII value of TCSO)
        data.slice(6, 10) === "TCSO" &&
        // Next six bytes are padding (0x00 0x04 0x00 0x00 0x00 0x00)
        [0x00, 0x04, 0x00, 0x00, 0x00, 0x00].every((v, i) => data.charCodeAt(10 + i) === v));
}
/**
 * Parses a given string or null value to a boolean or null and returns it.
 *
 * @param value The string or null value that should be parsed to a boolean or null.
 * @returns The string as a boolean, if it exists and contains a boolean, otherwise null.
 */
function parseBoolean(value) {
    switch (value?.toLowerCase()) {
        case "true":
            return true;
        case "false":
            return false;
        default:
            return null;
    }
}
/**
 * Parses a string with script access options or null and returns whether the script
 * access options allow the SWF file with the given URL to call JavaScript code in
 * the surrounding HTML file if they exist correctly, otherwise null.
 *
 * @param access The string with the script access options or null.
 * @param url The URL of the SWF file.
 * @returns Whether the script access options allow the SWF file with the given URL to
 * call JavaScript code in the surrounding HTML file if they exist correctly, otherwise null.
 */
function parseAllowScriptAccess(access, url) {
    switch (access?.toLowerCase()) {
        case "always":
            return true;
        case "never":
            return false;
        case "samedomain":
            try {
                return (new URL(window.location.href).origin ===
                    new URL(url, window.location.href).origin);
            }
            catch {
                return false;
            }
        default:
            return null;
    }
}
/**
 * Detect direction (LTR/RTL) of the preferred language of the browser.
 *
 * @returns 'ltr' or 'rtl' depending on the detected direction
 */
function detectBrowserDirection() {
    const browserLocale = new Intl.Locale(navigator.language);
    let textInfo = null;
    if ("getTextInfo" in browserLocale &&
        typeof browserLocale.getTextInfo === "function") {
        textInfo = browserLocale.getTextInfo();
    }
    else if ("textInfo" in browserLocale &&
        typeof browserLocale.textInfo === "object") {
        textInfo = browserLocale.textInfo;
    }
    else {
        return "ltr";
    }
    if (typeof textInfo === "object" &&
        "direction" in textInfo &&
        typeof textInfo.direction === "string") {
        return textInfo.direction || "ltr";
    }
    return "ltr";
}

;// ../core/dist/internal/player/impl_v1.js
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PlayerV1Impl_inner;
class PlayerV1Impl {
    constructor(inner) {
        _PlayerV1Impl_inner.set(this, void 0);
        __classPrivateFieldSet(this, _PlayerV1Impl_inner, inner, "f");
    }
    addFSCommandHandler(handler) {
        __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").addFSCommandHandler(handler);
    }
    get readyState() {
        return __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f")._readyState;
    }
    get metadata() {
        return __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").metadata;
    }
    get loadedConfig() {
        return __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").loadedConfig ?? null;
    }
    async reload() {
        await __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").reload();
    }
    async load(options, isPolyfillElement = false) {
        await __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").load(options, isPolyfillElement);
    }
    resume() {
        __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").play();
    }
    get isPlaying() {
        return __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").isPlaying;
    }
    get volume() {
        return __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").volume;
    }
    set volume(value) {
        __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").volume = value;
    }
    get fullscreenEnabled() {
        return __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").fullscreenEnabled;
    }
    get isFullscreen() {
        return __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").isFullscreen;
    }
    setFullscreen(isFull) {
        __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").setFullscreen(isFull);
    }
    requestFullscreen() {
        __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").enterFullscreen();
    }
    exitFullscreen() {
        __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").exitFullscreen();
    }
    async downloadSwf() {
        await __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").downloadSwf();
    }
    displayMessage(message) {
        __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").displayMessage(message);
    }
    suspend() {
        __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").pause();
    }
    get suspended() {
        return !__classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").isPlaying;
    }
    set traceObserver(observer) {
        __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").traceObserver = observer;
    }
    get config() {
        return __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").config;
    }
    set config(value) {
        __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").config = value;
    }
    callExternalInterface(name, ...args) {
        return __classPrivateFieldGet(this, _PlayerV1Impl_inner, "f").callExternalInterface(name, args);
    }
}
_PlayerV1Impl_inner = new WeakMap();

;// ../core/dist/internal/player/ruffle-player-element.js
var ruffle_player_element_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var ruffle_player_element_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _RufflePlayerElement_inner, _RufflePlayerElement_legacyFSCommandHandler;



/**
 * The ruffle player element that should be inserted onto the page.
 *
 * This element will represent the rendered and intractable flash movie.
 */
class RufflePlayerElement extends HTMLElement {
    get onFSCommand() {
        return ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_legacyFSCommandHandler, "f");
    }
    set onFSCommand(value) {
        ruffle_player_element_classPrivateFieldSet(this, _RufflePlayerElement_legacyFSCommandHandler, value, "f");
    }
    get readyState() {
        return ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f")._readyState;
    }
    get metadata() {
        return ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").metadata;
    }
    constructor() {
        super();
        _RufflePlayerElement_inner.set(this, void 0);
        _RufflePlayerElement_legacyFSCommandHandler.set(this, null);
        ruffle_player_element_classPrivateFieldSet(this, _RufflePlayerElement_inner, new InnerPlayer(this, () => this.debugPlayerInfo(), (name) => {
            try {
                Object.defineProperty(this, name, {
                    value: (...args) => {
                        return ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").callExternalInterface(name, args);
                    },
                    configurable: true,
                });
            }
            catch (error) {
                console.warn(`Error setting ExternalInterface legacy callback for ${name}`, error);
            }
        }), "f");
        ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").addFSCommandHandler((command, args) => {
            ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_legacyFSCommandHandler, "f")?.call(this, command, args);
        });
    }
    ruffle(version) {
        const v = version ?? 1;
        if (v === 1) {
            return new PlayerV1Impl(ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f"));
        }
        throw new Error(`Version ${version} not supported.`);
    }
    get loadedConfig() {
        return ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").loadedConfig ?? null;
    }
    connectedCallback() {
        ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").updateStyles();
    }
    static get observedAttributes() {
        return ["width", "height", "align"];
    }
    attributeChangedCallback(name, _oldValue, _newValue) {
        if (RufflePlayerElement.observedAttributes.includes(name)) {
            ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").updateStyles();
        }
    }
    disconnectedCallback() {
        ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").destroy();
    }
    async reload() {
        await ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").reload();
    }
    async load(options, isPolyfillElement = false) {
        await ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").load(options, isPolyfillElement);
    }
    play() {
        ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").play();
    }
    get isPlaying() {
        return ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").isPlaying;
    }
    get volume() {
        return ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").volume;
    }
    set volume(value) {
        ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").volume = value;
    }
    get fullscreenEnabled() {
        return ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").fullscreenEnabled;
    }
    get isFullscreen() {
        return ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").isFullscreen;
    }
    setFullscreen(isFull) {
        ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").setFullscreen(isFull);
    }
    enterFullscreen() {
        ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").enterFullscreen();
    }
    exitFullscreen() {
        ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").exitFullscreen();
    }
    async downloadSwf() {
        await ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").downloadSwf();
    }
    pause() {
        ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").pause();
    }
    set traceObserver(observer) {
        ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").traceObserver = observer;
    }
    debugPlayerInfo() {
        return "";
    }
    PercentLoaded() {
        // [NA] This is a stub - we need to research how this is actually implemented (is it just base swf loadedBytes?)
        if (ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f")._readyState === ReadyState.Loaded) {
            return 100;
        }
        else {
            return 0;
        }
    }
    get config() {
        return ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").config;
    }
    set config(value) {
        ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").config = value;
    }
    displayMessage(message) {
        ruffle_player_element_classPrivateFieldGet(this, _RufflePlayerElement_inner, "f").displayMessage(message);
    }
}
_RufflePlayerElement_inner = new WeakMap(), _RufflePlayerElement_legacyFSCommandHandler = new WeakMap();
/**
 * Copies attributes and children from another element to a target element.
 * Used by the polyfill elements, RuffleObject and RuffleEmbed.
 *
 * @param element The element to copy all attributes from.
 * @param destination The element to copy all attributes to.
 */
function copyElement(element, destination) {
    if (element) {
        for (const attribute of element.attributes) {
            if (attribute.specified) {
                // Issue 468: Chrome "Click to Active Flash" box stomps on title attribute
                if (attribute.name === "title" &&
                    attribute.value === "Adobe Flash Player") {
                    continue;
                }
                try {
                    destination.setAttribute(attribute.name, attribute.value);
                }
                catch (_err) {
                    // The embed may have invalid attributes, so handle these gracefully.
                    console.warn(`Unable to set attribute ${attribute.name} on Ruffle instance`);
                }
            }
        }
        for (const node of Array.from(element.children)) {
            destination.appendChild(node);
        }
    }
}

;// ../core/dist/internal/player/ruffle-embed-element.js




/**
 * A polyfill html element.
 *
 * This specific class tries to polyfill existing `<embed>` tags,
 * and should not be used. Prefer {@link RufflePlayer} instead.
 *
 * @internal
 */
class RuffleEmbedElement extends RufflePlayerElement {
    /**
     * @ignore
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        const src = this.attributes.getNamedItem("src");
        if (src) {
            // Get the configuration options that have been overwritten for this movie.
            const getOptionString = (optionName) => this.attributes.getNamedItem(optionName)?.value ?? null;
            const options = getPolyfillOptions(src.value, getOptionString);
            // Kick off the SWF download.
            this.load(options, true);
        }
    }
    /**
     * Polyfill of HTMLEmbedElement.
     *
     * @ignore
     * @internal
     */
    get nodeName() {
        return "EMBED";
    }
    /**
     * Polyfill of HTMLEmbedElement.
     *
     * @ignore
     * @internal
     */
    get src() {
        return this.attributes.getNamedItem("src")?.value;
    }
    /**
     * Polyfill of HTMLEmbedElement.
     *
     * @ignore
     * @internal
     */
    set src(srcval) {
        if (srcval) {
            const attr = document.createAttribute("src");
            attr.value = srcval;
            this.attributes.setNamedItem(attr);
        }
        else {
            this.attributes.removeNamedItem("src");
        }
    }
    /**
     * @ignore
     * @internal
     */
    static get observedAttributes() {
        return [...RufflePlayerElement.observedAttributes, "src"];
    }
    /**
     * @ignore
     * @internal
     */
    attributeChangedCallback(name, oldValue, newValue) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (this.isConnected && name === "src") {
            const src = this.attributes.getNamedItem("src");
            if (src) {
                const getOptionString = (optionName) => this.attributes.getNamedItem(optionName)?.value ?? null;
                const options = getPolyfillOptions(src.value, getOptionString);
                this.load(options, true);
            }
        }
    }
    /**
     * Checks if the given element may be polyfilled with this one.
     *
     * @param elem Element to check.
     * @returns True if the element looks like a Flash embed.
     */
    static isInterdictable(elem) {
        const src = elem.getAttribute("src");
        const type = elem.getAttribute("type");
        // Don't polyfill when no file is specified.
        if (!src) {
            return false;
        }
        // Don't polyfill if the element is inside a specific node.
        if (isFallbackElement(elem)) {
            return false;
        }
        // Don't polyfill when the file is a YouTube Flash source.
        if (isYoutubeFlashSource(src)) {
            // Workaround YouTube mixed content; this isn't what browsers do automatically, but while we're here, we may as well.
            workaroundYoutubeMixedContent(elem, "src");
            return false;
        }
        return isSwf(src, type);
    }
    /**
     * Creates a RuffleEmbed that will polyfill and replace the given element.
     *
     * @param elem Element to replace.
     * @returns Created RuffleEmbed.
     */
    static fromNativeEmbedElement(elem) {
        const externalName = registerElement("ruffle-embed", RuffleEmbedElement);
        const ruffleObj = document.createElement(externalName);
        copyElement(elem, ruffleObj);
        return ruffleObj;
    }
    /**
     * Polyfill of height getter
     *
     * @ignore
     * @internal
     */
    get height() {
        return this.getAttribute("height") || "";
    }
    /**
     * Polyfill of height setter
     *
     * @ignore
     * @internal
     */
    set height(height) {
        this.setAttribute("height", height);
    }
    /**
     * Polyfill of width getter
     *
     * @ignore
     * @internal
     */
    get width() {
        return this.getAttribute("width") || "";
    }
    /**
     * Polyfill of width setter
     *
     * @ignore
     * @internal
     */
    set width(widthVal) {
        this.setAttribute("width", widthVal);
    }
    /**
     * Polyfill of type getter
     *
     * @ignore
     * @internal
     */
    get type() {
        return this.getAttribute("type") || "";
    }
    /**
     * Polyfill of type setter
     *
     * @ignore
     * @internal
     */
    set type(typeVal) {
        this.setAttribute("type", typeVal);
    }
}

;// ../core/dist/internal/player/ruffle-object-element.js






/**
 * Find and return the first value in obj with the given key.
 * Many Flash params were case insensitive, so we use this when checking for them.
 *
 * @param obj Object to check
 * @param key Key to find
 * @param defaultValue Value if not found
 * @returns Value if found, else {@link defaultValue}
 */
function findCaseInsensitive(obj, key, defaultValue) {
    key = key.toLowerCase();
    for (const [k, value] of Object.entries(obj)) {
        if (k.toLowerCase() === key) {
            return value;
        }
    }
    return defaultValue;
}
/**
 * Returns all flash params ({@link HTMLParamElement}) that are for the given object.
 *
 * @param elem Element to check.
 * @returns A record of every parameter.
 */
function paramsOf(elem) {
    const params = {};
    for (const param of elem.children) {
        if (param instanceof HTMLParamElement) {
            const key = param.attributes.getNamedItem("name")?.value;
            const value = param.attributes.getNamedItem("value")?.value;
            if (key && value) {
                params[key] = value;
            }
        }
    }
    return params;
}
/**
 * A polyfill html element.
 *
 * This specific class tries to polyfill existing `<object>` tags,
 * and should not be used. Prefer {@link RufflePlayer} instead.
 *
 * @internal
 */
class RuffleObjectElement extends RufflePlayerElement {
    constructor() {
        super(...arguments);
        this.params = {};
    }
    /**
     * @ignore
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        this.params = paramsOf(this);
        let url = null;
        if (this.attributes.getNamedItem("data")) {
            url = this.attributes.getNamedItem("data")?.value;
        }
        else if (this.params["movie"]) {
            url = this.params["movie"];
        }
        if (url) {
            // Get the configuration options that have been overwritten for this movie.
            const attributeCheckOptions = [
                "allowNetworking",
                "base",
                "bgcolor",
                "flashvars",
            ];
            const getOptionString = (optionName) => findCaseInsensitive(this.params, optionName, attributeCheckOptions.includes(optionName)
                ? this.getAttribute(optionName)
                : null);
            const options = getPolyfillOptions(url, getOptionString);
            // Kick off the SWF download.
            this.load(options, true);
        }
    }
    debugPlayerInfo() {
        let result = "Player type: Object\n";
        let url = null;
        if (this.attributes.getNamedItem("data")) {
            url = this.attributes.getNamedItem("data")?.value;
        }
        else if (this.params["movie"]) {
            url = this.params["movie"];
        }
        result += `SWF URL: ${url}\n`;
        Object.keys(this.params).forEach((key) => {
            result += `Param ${key}: ${this.params[key]}\n`;
        });
        Object.keys(this.attributes).forEach((key) => {
            result += `Attribute ${key}: ${this.attributes.getNamedItem(key)?.value}\n`;
        });
        return result;
    }
    /**
     * Polyfill of HTMLObjectElement.
     *
     * @ignore
     * @internal
     */
    get nodeName() {
        return "OBJECT";
    }
    /**
     * Polyfill of HTMLObjectElement.
     *
     * @ignore
     * @internal
     */
    get data() {
        return this.getAttribute("data");
    }
    /**
     * Polyfill of HTMLObjectElement.
     *
     * @ignore
     * @internal
     */
    set data(href) {
        if (href) {
            const attr = document.createAttribute("data");
            attr.value = href;
            this.attributes.setNamedItem(attr);
        }
        else {
            this.attributes.removeNamedItem("data");
        }
    }
    /**
     * Checks if the given element may be polyfilled with this one.
     *
     * @param elem Element to check.
     * @returns True if the element looks like a Flash object.
     */
    static isInterdictable(elem) {
        // Don't polyfill if the element is inside a specific node.
        if (isFallbackElement(elem)) {
            return false;
        }
        // Don't polyfill if there's already a <ruffle-object> or a <ruffle-embed> inside the <object>.
        if (elem.getElementsByTagName("ruffle-object").length > 0 ||
            elem.getElementsByTagName("ruffle-embed").length > 0) {
            return false;
        }
        const data = elem.attributes.getNamedItem("data")?.value.toLowerCase();
        const type = elem.attributes.getNamedItem("type")?.value ?? null;
        const params = paramsOf(elem);
        // Check for SWF file.
        let filename;
        if (data) {
            // Don't polyfill when the file is a YouTube Flash source.
            if (isYoutubeFlashSource(data)) {
                // Workaround YouTube mixed content; this isn't what browsers do automatically, but while we're here, we may as well.
                workaroundYoutubeMixedContent(elem, "data");
                return false;
            }
            filename = data;
        }
        else if (params && params["movie"]) {
            // Don't polyfill when the file is a YouTube Flash source.
            if (isYoutubeFlashSource(params["movie"])) {
                // Workaround YouTube mixed content; this isn't what browsers do automatically, but while we're here, we may as well.
                const movieElem = elem.querySelector("param[name='movie']");
                if (movieElem) {
                    workaroundYoutubeMixedContent(movieElem, "value");
                    // The data attribute needs to be set for the re-fetch to happen.
                    // It also needs to be set on Firefox for the YouTube object rewrite to work, regardless of mixed content.
                    const movieSrc = movieElem.getAttribute("value");
                    if (movieSrc) {
                        elem.setAttribute("data", movieSrc);
                    }
                }
                return false;
            }
            filename = params["movie"];
        }
        else {
            // Don't polyfill when no file is specified.
            return false;
        }
        // Check ActiveX class ID.
        const classid = elem.attributes
            .getNamedItem("classid")
            ?.value.toLowerCase();
        if (classid === FLASH_ACTIVEX_CLASSID.toLowerCase()) {
            // classid is an old-IE style embed that would not work on modern browsers.
            // Often there will be an <embed> inside the <object> that would take precedence.
            // Only polyfill this <object> if it doesn't contain a polyfillable <embed> or
            // another <object> that would be supported on modern browsers.
            return (!Array.from(elem.getElementsByTagName("object")).some(RuffleObjectElement.isInterdictable) &&
                !Array.from(elem.getElementsByTagName("embed")).some(RuffleEmbedElement.isInterdictable));
        }
        else if (classid) {
            // Non-Flash classid.
            return false;
        }
        return isSwf(filename, type);
    }
    /**
     * Creates a RuffleObject that will polyfill and replace the given element.
     *
     * @param elem Element to replace.
     * @returns Created RuffleObject.
     */
    static fromNativeObjectElement(elem) {
        const externalName = registerElement("ruffle-object", RuffleObjectElement);
        const ruffleObj = document.createElement(externalName);
        // Avoid copying embeds-inside-objects to avoid double polyfilling.
        for (const embedElem of Array.from(elem.getElementsByTagName("embed"))) {
            if (RuffleEmbedElement.isInterdictable(embedElem)) {
                embedElem.remove();
            }
        }
        // Avoid copying objects-inside-objects to avoid double polyfilling.
        // This may happen when Internet Explorer's conditional comments are used.
        for (const objectElem of Array.from(elem.getElementsByTagName("object"))) {
            if (RuffleObjectElement.isInterdictable(objectElem)) {
                objectElem.remove();
            }
        }
        copyElement(elem, ruffleObj);
        return ruffleObj;
    }
    /**
     * Polyfill of height getter
     *
     * @ignore
     * @internal
     */
    get height() {
        return this.getAttribute("height") || "";
    }
    /**
     * Polyfill of height setter
     *
     * @ignore
     * @internal
     */
    set height(height) {
        this.setAttribute("height", height);
    }
    /**
     * Polyfill of width getter
     *
     * @ignore
     * @internal
     */
    get width() {
        return this.getAttribute("width") || "";
    }
    /**
     * Polyfill of width setter
     *
     * @ignore
     * @internal
     */
    set width(widthVal) {
        this.setAttribute("width", widthVal);
    }
    /**
     * Polyfill of type getter
     *
     * @ignore
     * @internal
     */
    get type() {
        return this.getAttribute("type") || "";
    }
    /**
     * Polyfill of type setter
     *
     * @ignore
     * @internal
     */
    set type(typeVal) {
        this.setAttribute("type", typeVal);
    }
}

;// ../core/dist/plugin-polyfill.js
var plugin_polyfill_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var plugin_polyfill_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RuffleMimeTypeArray_mimeTypes, _RuffleMimeTypeArray_namedMimeTypes, _RuffleMimeType_mimeType, _RufflePlugin_name, _RufflePlugin_description, _RufflePlugin_filename, _RufflePluginArray_plugins, _RufflePluginArray_namedPlugins;

/**
 * Replacement object for `MimeTypeArray` that lets us install new fake mime
 * types.
 *
 * Unlike plugins we can at least enumerate mime types in Firefox, so we don't
 * lose data.
 *
 * We also expose a method called `install` which adds a new plugin. This is
 * used to falsify Flash detection. If the existing `navigator.mimeTypes` has an
 * `install` method, you should not use `RuffleMimeTypeArray` as some other
 * plugin emulator is already present.
 */
class RuffleMimeTypeArray {
    constructor(mimeTypes) {
        _RuffleMimeTypeArray_mimeTypes.set(this, void 0);
        _RuffleMimeTypeArray_namedMimeTypes.set(this, void 0);
        plugin_polyfill_classPrivateFieldSet(this, _RuffleMimeTypeArray_mimeTypes, [], "f");
        plugin_polyfill_classPrivateFieldSet(this, _RuffleMimeTypeArray_namedMimeTypes, {}, "f");
        if (mimeTypes) {
            for (let i = 0; i < mimeTypes.length; i++) {
                this.install(mimeTypes[i]);
            }
        }
    }
    /**
     * Install a MIME Type into the array.
     *
     * @param mimeType The mime type to install
     */
    install(mimeType) {
        const wrapper = new RuffleMimeType(mimeType);
        const index = plugin_polyfill_classPrivateFieldGet(this, _RuffleMimeTypeArray_mimeTypes, "f").length;
        plugin_polyfill_classPrivateFieldGet(this, _RuffleMimeTypeArray_mimeTypes, "f").push(wrapper);
        plugin_polyfill_classPrivateFieldGet(this, _RuffleMimeTypeArray_namedMimeTypes, "f")[mimeType.type] = wrapper;
        Object.defineProperty(this, wrapper.type, {
            configurable: true,
            enumerable: false,
            value: wrapper,
        });
        this[index] = wrapper;
    }
    item(index) {
        // This behavior is done to emulate a 32-bit uint,
        // which browsers use.
        return plugin_polyfill_classPrivateFieldGet(this, _RuffleMimeTypeArray_mimeTypes, "f")[index >>> 0];
    }
    namedItem(name) {
        return plugin_polyfill_classPrivateFieldGet(this, _RuffleMimeTypeArray_namedMimeTypes, "f")[name];
    }
    get length() {
        return plugin_polyfill_classPrivateFieldGet(this, _RuffleMimeTypeArray_mimeTypes, "f").length;
    }
    [(_RuffleMimeTypeArray_mimeTypes = new WeakMap(), _RuffleMimeTypeArray_namedMimeTypes = new WeakMap(), Symbol.iterator)]() {
        return plugin_polyfill_classPrivateFieldGet(this, _RuffleMimeTypeArray_mimeTypes, "f")[Symbol.iterator]();
    }
    get [Symbol.toStringTag]() {
        return "MimeTypeArray";
    }
}
/**
 * Replacement object for the built-in MimeType object.
 * This only exists, because the built-in type is not constructable and we
 * need to spoof `window.MimeType`.
 */
class RuffleMimeType {
    constructor(mimeType) {
        _RuffleMimeType_mimeType.set(this, void 0);
        plugin_polyfill_classPrivateFieldSet(this, _RuffleMimeType_mimeType, mimeType, "f");
    }
    get type() {
        return plugin_polyfill_classPrivateFieldGet(this, _RuffleMimeType_mimeType, "f").type;
    }
    get description() {
        return plugin_polyfill_classPrivateFieldGet(this, _RuffleMimeType_mimeType, "f").description;
    }
    get suffixes() {
        return plugin_polyfill_classPrivateFieldGet(this, _RuffleMimeType_mimeType, "f").suffixes;
    }
    get enabledPlugin() {
        return plugin_polyfill_classPrivateFieldGet(this, _RuffleMimeType_mimeType, "f").enabledPlugin;
    }
    get [(_RuffleMimeType_mimeType = new WeakMap(), Symbol.toStringTag)]() {
        return "MimeType";
    }
}
/**
 * Equivalent object to `Plugin` that allows us to falsify plugins.
 */
class RufflePlugin extends RuffleMimeTypeArray {
    constructor(name, description, filename) {
        super();
        _RufflePlugin_name.set(this, void 0);
        _RufflePlugin_description.set(this, void 0);
        _RufflePlugin_filename.set(this, void 0);
        plugin_polyfill_classPrivateFieldSet(this, _RufflePlugin_name, name, "f");
        plugin_polyfill_classPrivateFieldSet(this, _RufflePlugin_description, description, "f");
        plugin_polyfill_classPrivateFieldSet(this, _RufflePlugin_filename, filename, "f");
    }
    get name() {
        return plugin_polyfill_classPrivateFieldGet(this, _RufflePlugin_name, "f");
    }
    get description() {
        return plugin_polyfill_classPrivateFieldGet(this, _RufflePlugin_description, "f");
    }
    get filename() {
        return plugin_polyfill_classPrivateFieldGet(this, _RufflePlugin_filename, "f");
    }
    get [(_RufflePlugin_name = new WeakMap(), _RufflePlugin_description = new WeakMap(), _RufflePlugin_filename = new WeakMap(), Symbol.toStringTag)]() {
        return "Plugin";
    }
}
/**
 * Replacement object for `PluginArray` that lets us install new fake plugins.
 *
 * This object needs to wrap the native plugin array, since the user might have
 * actual plugins installed. Firefox doesn't let us enumerate the array, though,
 * which has some consequences. Namely, we can't actually perfectly wrap the
 * native plugin array, at least unless there's some secret "unresolved object
 * property name handler" that I've never known before in JS...
 *
 * We can still wrap `namedItem` perfectly at least.
 *
 * We also expose a method called `install` which adds a new plugin. This is
 * used to falsify Flash detection. If the existing `navigator.plugins` has an
 * `install` method, you should not use `RufflePluginArray` as some other plugin
 * emulator is already present.
 */
class RufflePluginArray {
    constructor(plugins) {
        _RufflePluginArray_plugins.set(this, void 0);
        _RufflePluginArray_namedPlugins.set(this, void 0);
        plugin_polyfill_classPrivateFieldSet(this, _RufflePluginArray_plugins, [], "f");
        plugin_polyfill_classPrivateFieldSet(this, _RufflePluginArray_namedPlugins, {}, "f");
        for (let i = 0; i < plugins.length; i++) {
            this.install(plugins[i]);
        }
    }
    install(plugin) {
        const index = plugin_polyfill_classPrivateFieldGet(this, _RufflePluginArray_plugins, "f").length;
        plugin_polyfill_classPrivateFieldGet(this, _RufflePluginArray_plugins, "f").push(plugin);
        plugin_polyfill_classPrivateFieldGet(this, _RufflePluginArray_namedPlugins, "f")[plugin.name] = plugin;
        Object.defineProperty(this, plugin.name, {
            configurable: true,
            enumerable: false,
            value: plugin,
        });
        this[index] = plugin;
    }
    item(index) {
        // This behavior is done to emulate a 32-bit uint,
        // which browsers use. Cloudflare's anti-bot
        // checks rely on this.
        return plugin_polyfill_classPrivateFieldGet(this, _RufflePluginArray_plugins, "f")[index >>> 0];
    }
    namedItem(name) {
        return plugin_polyfill_classPrivateFieldGet(this, _RufflePluginArray_namedPlugins, "f")[name];
    }
    refresh() {
        // Nothing to do, we just need to define the method.
    }
    [(_RufflePluginArray_plugins = new WeakMap(), _RufflePluginArray_namedPlugins = new WeakMap(), Symbol.iterator)]() {
        return plugin_polyfill_classPrivateFieldGet(this, _RufflePluginArray_plugins, "f")[Symbol.iterator]();
    }
    get [Symbol.toStringTag]() {
        return "PluginArray";
    }
    get length() {
        return plugin_polyfill_classPrivateFieldGet(this, _RufflePluginArray_plugins, "f").length;
    }
}
/**
 * A fake plugin designed to trigger Flash detection scripts.
 */
const FLASH_PLUGIN = new RufflePlugin("Shockwave Flash", "Shockwave Flash 32.0 r0", "ruffle.js");
FLASH_PLUGIN.install({
    type: FUTURESPLASH_MIMETYPE,
    description: "Shockwave Flash",
    suffixes: "spl",
    enabledPlugin: FLASH_PLUGIN,
});
FLASH_PLUGIN.install({
    type: FLASH_MIMETYPE,
    description: "Shockwave Flash",
    suffixes: "swf",
    enabledPlugin: FLASH_PLUGIN,
});
FLASH_PLUGIN.install({
    type: FLASH7_AND_8_MIMETYPE,
    description: "Shockwave Flash",
    suffixes: "swf",
    enabledPlugin: FLASH_PLUGIN,
});
FLASH_PLUGIN.install({
    type: FLASH_MOVIE_MIMETYPE,
    description: "Shockwave Flash",
    suffixes: "swf",
    enabledPlugin: FLASH_PLUGIN,
});
/**
 * Install a fake plugin such that detectors will see it in `navigator.plugins`.
 *
 * This function takes care to check if the existing implementation of
 * `navigator.plugins` already accepts fake plugin entries. If so, it will use
 * that version of the plugin array. This allows the plugin polyfill to compose
 * across multiple plugin emulators with the first emulator's polyfill winning.
 *
 * @param plugin The plugin to install
 */
function installPlugin(plugin) {
    if (navigator.plugins.namedItem("Shockwave Flash")) {
        return;
    }
    if (!("install" in navigator.plugins) || !navigator.plugins["install"]) {
        Object.defineProperty(window, "PluginArray", {
            value: RufflePluginArray,
        });
        Object.defineProperty(navigator, "plugins", {
            value: new RufflePluginArray(navigator.plugins),
            writable: false,
        });
    }
    const plugins = navigator.plugins;
    plugins.install(plugin);
    if (plugin.length > 0 &&
        (!("install" in navigator.mimeTypes) || !navigator.mimeTypes["install"])) {
        Object.defineProperty(window, "MimeTypeArray", {
            value: RuffleMimeTypeArray,
        });
        Object.defineProperty(window, "MimeType", {
            value: RuffleMimeType,
        });
        Object.defineProperty(navigator, "mimeTypes", {
            value: new RuffleMimeTypeArray(navigator.mimeTypes),
            writable: false,
        });
    }
    const mimeTypes = navigator.mimeTypes;
    for (let i = 0; i < plugin.length; i += 1) {
        mimeTypes.install(plugin[i]);
    }
}

;// ../core/dist/public-path.js

/**
 * Attempt to discover the public path of the current Ruffle source. This can
 * be used to configure Webpack.
 *
 * A global public path can be specified for all sources using the RufflePlayer
 * config:
 *
 * ```js
 * window.RufflePlayer.config.publicPath = "/dist/";
 * ```
 *
 * If no such config is specified, then the parent path of where this script is
 * hosted is assumed, which should be the correct default in most cases.
 *
 * @param config The `window.RufflePlayer.config` object.
 * @returns The public path for the given source.
 */
function publicPath(config) {
    // Default to the directory where this script resides.
    let path = currentScriptURL?.href ?? "";
    if (!isExtension &&
        "publicPath" in config &&
        config.publicPath !== null &&
        config.publicPath !== undefined) {
        path = config.publicPath;
    }
    // Webpack expects the paths to end with a slash.
    if (path !== "" && !path.endsWith("/")) {
        path += "/";
    }
    return path;
}

;// ../core/dist/polyfills.js





const globalConfig = window.RufflePlayer?.config ?? {};
const jsScriptUrl = publicPath(globalConfig) + "ruffle.js";
/**
 * Polyfill native Flash elements with Ruffle equivalents.
 *
 * This polyfill isn't fool-proof: If there's a chance site JavaScript has
 * access to a pre-polyfill element, then this will break horribly. We can
 * keep native objects out of the DOM, and thus out of JavaScript's grubby
 * little hands, but only if we load first.
 */
let objects;
let polyfills_embeds;
/**
 * Check if this browser has pre-existing Flash support.
 *
 * @returns Whether this browser has a plugin indicating pre-existing Flash support.
 */
function isFlashEnabledBrowser() {
    // If the user sets a configuration value not to favor Flash, pretend the browser does not support Flash so Ruffle takes effect.
    if ("favorFlash" in globalConfig && globalConfig["favorFlash"] === false) {
        return false;
    }
    // Otherwise, check for pre-existing Flash support.
    return ((navigator.plugins.namedItem("Shockwave Flash")?.filename ??
        "ruffle.js") !== "ruffle.js");
}
/**
 *
 */
function polyfillFlashInstances() {
    try {
        // Create live collections to track embed tags.
        objects = objects ?? document.getElementsByTagName("object");
        polyfills_embeds = polyfills_embeds ?? document.getElementsByTagName("embed");
        // Replace <object> first, because <object> often wraps <embed>.
        for (const elem of Array.from(objects)) {
            if (RuffleObjectElement.isInterdictable(elem)) {
                const ruffleObject = RuffleObjectElement.fromNativeObjectElement(elem);
                elem.replaceWith(ruffleObject);
            }
        }
        for (const elem of Array.from(polyfills_embeds)) {
            if (RuffleEmbedElement.isInterdictable(elem)) {
                const ruffleEmbed = RuffleEmbedElement.fromNativeEmbedElement(elem);
                elem.replaceWith(ruffleEmbed);
            }
        }
    }
    catch (err) {
        console.error(`Serious error encountered when polyfilling native Flash elements: ${err}`);
    }
}
/**
 * Inject Ruffle into <iframe> and <frame> elements.
 *
 * This polyfill isn't fool-proof either: On self-hosted builds, it may
 * not work due to browsers CORS policy or be loaded too late for some
 * libraries like SWFObject. These should be less of a problem on the
 * web extension. This polyfill should, however, do the trick in most
 * cases, but users should be aware of its natural limits.
 */
let iframes;
let polyfills_frames;
/**
 *
 */
function polyfillFrames() {
    // Create live collections to track embed tags.
    iframes = iframes ?? document.getElementsByTagName("iframe");
    polyfills_frames = polyfills_frames ?? document.getElementsByTagName("frame");
    [iframes, polyfills_frames].forEach((elements) => {
        for (const element of elements) {
            if (element.dataset["rufflePolyfilled"] !== undefined) {
                // Don't re-polyfill elements with the "data-ruffle-polyfilled" attribute.
                continue;
            }
            element.dataset["rufflePolyfilled"] = "";
            const elementWindow = element.contentWindow;
            // Cross origin requests may reach an exception, so let's prepare for this eventuality.
            const errorMessage = `Couldn't load Ruffle into ${element.tagName}[${element.src}]: `;
            try {
                if (elementWindow.document.readyState === "complete") {
                    injectRuffle(elementWindow, errorMessage);
                }
            }
            catch (err) {
                if (!isExtension) {
                    // The web extension should be able to load Ruffle into cross origin frames
                    // because it has "all_frames" set to true in its manifest.json: RufflePlayer
                    // config won't be injected but it's not worth showing an error.
                    console.warn(errorMessage + err);
                }
            }
            // Attach listener to the element to handle frame navigation.
            element.addEventListener("load", () => {
                injectRuffle(elementWindow, errorMessage);
            }, false);
        }
    });
}
/**
 * @param elementWindow The (i)frame's window object.
 * @param errorMessage The message to log when Ruffle cannot access the (i)frame's document.
 */
async function injectRuffle(elementWindow, errorMessage) {
    // The document is supposed to be completely loaded when this function is run.
    // As Chrome may be unable to access the document properties, we have to delay the execution a little bit.
    await new Promise((resolve) => {
        window.setTimeout(() => {
            resolve();
        }, 100);
    });
    let elementDocument;
    try {
        elementDocument = elementWindow.document;
        if (!elementDocument) {
            // Don't polyfill if the window has no document: the element may have been removed from the parent window.
            return;
        }
    }
    catch (err) {
        if (!isExtension) {
            console.warn(errorMessage + err);
        }
        return;
    }
    if (!isExtension &&
        elementDocument.documentElement.dataset["ruffleOptout"] !== undefined) {
        // Don't polyfill elements with the "data-ruffle-optout" attribute.
        return;
    }
    if (!isExtension) {
        if (!elementWindow.RufflePlayer) {
            const script = elementDocument.createElement("script");
            script.setAttribute("src", jsScriptUrl);
            script.onload = () => {
                // Inject parent configuration once the script is loaded, preventing it from being ignored.
                elementWindow.RufflePlayer = {};
                elementWindow.RufflePlayer.config = globalConfig;
            };
            elementDocument.head.appendChild(script);
        }
    }
    else {
        if (!elementWindow.RufflePlayer) {
            elementWindow.RufflePlayer = {};
        }
        // Merge parent window and frame configurations, will likely be applied too late though.
        elementWindow.RufflePlayer.config = {
            ...globalConfig,
            ...(elementWindow.RufflePlayer.config ?? {}),
        };
    }
}
/**
 * Listen for changes to the DOM.
 */
function initMutationObserver() {
    const observer = new MutationObserver(function (mutationsList) {
        // If any embed or object nodes were added, re-run the polyfill to detect any new instances.
        const embedOrObjectAdded = mutationsList.some((mutation) => Array.from(mutation.addedNodes).some((node) => ["EMBED", "OBJECT"].includes(node.nodeName) ||
            (node instanceof Element &&
                node.querySelector("embed, object") !==
                    null)));
        if (embedOrObjectAdded) {
            polyfillFlashInstances();
            polyfillFrames();
        }
    });
    observer.observe(document, { childList: true, subtree: true });
}
/**
 * Polyfills the detection of Flash plugins in the browser.
 */
function pluginPolyfill() {
    installPlugin(FLASH_PLUGIN);
}
/**
 * Polyfills legacy Flash content on the page.
 */
function polyfill() {
    if (!isFlashEnabledBrowser()) {
        polyfillFlashInstances();
        polyfillFrames();
        initMutationObserver();
    }
}

;// ../core/dist/internal/internal-source-api.js




/**
 * The actual source API that describes this installation.
 * This isn't part of the public API and may contain extra details.
 */
const internalSourceApi = {
    /**
     * The version of this particular API, as a string in a semver compatible format.
     */
    version: buildInfo.versionNumber + "+" + buildInfo.buildDate.substring(0, 10),
    /**
     * Start up the polyfills.
     *
     * Do not run polyfills for more than one Ruffle source at a time.
     */
    polyfill() {
        polyfill();
    },
    /**
     * Polyfill the plugin detection.
     *
     * This needs to run before any plugin detection script does.
     */
    pluginPolyfill() {
        pluginPolyfill();
    },
    /**
     * Create a Ruffle player element using this particular version of Ruffle.
     *
     * @returns The player element. This is a DOM element that may be inserted
     * into the current page as you wish.
     */
    createPlayer() {
        const name = registerElement("ruffle-player", RufflePlayerElement);
        return document.createElement(name);
    },
    /**
     * Options specified by the user of this library.
     */
    options: {},
};

;// ../core/dist/public/setup/install.js


/**
 * Install this version of Ruffle into the current page.
 *
 * Multiple (or zero) versions of Ruffle may be installed at the same time,
 * and you should use `window.RufflePlayer.newest()` or similar to access the appropriate
 * installation at time of use.
 *
 * @param sourceName The name of this particular
 * Ruffle source. Common convention is "local" for websites that bundle their own Ruffle,
 * "extension" for browser extensions, and something else for other use cases.
 * Names are unique, and last-installed will replace earlier installations with the same name,
 * regardless of what those installations are or which version they represent.
 * @param options Any options used to configure this specific installation of Ruffle.
 */
function installRuffle(sourceName, options = {}) {
    let publicAPI;
    if (window.RufflePlayer instanceof PublicAPI) {
        publicAPI = window.RufflePlayer;
    }
    else {
        publicAPI = new PublicAPI(window.RufflePlayer);
        window.RufflePlayer = publicAPI;
    }
    publicAPI.sources[sourceName] = internalSourceApi;
    internalSourceApi.options = options;
    // Install the faux plugin detection immediately.
    // This is necessary because scripts such as SWFObject check for the
    // Flash Player immediately when they load.
    // TODO: Maybe there's a better place for this.
    const polyfills = "polyfills" in publicAPI.config ? publicAPI.config.polyfills : true;
    if (polyfills !== false) {
        internalSourceApi.pluginPolyfill();
    }
}

;// ./src/player.ts


installRuffle("local");
const ruffle = window.RufflePlayer.newest();
let player;
const playerContainer = document.getElementById("player-container");
const overlay = document.getElementById("overlay");
const localFileInput = document.getElementById("local-file");
const localFileName = document.getElementById("local-file-name");
const toggleInfo = document.getElementById("toggle-info");
const reloadSwf = document.getElementById("reload-swf");
const infoContainer = document.getElementById("info-container");
const webFormSubmit = document.getElementById("web-form-submit");
const webURL = document.getElementById("web-url");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close");
const grant = document.getElementById("grant");
// This is the base config always used by the extension player.
// It has the highest priority and its options cannot be overwritten.
const baseExtensionConfig = {
    letterbox: "on",
    forceScale: true,
    forceAlign: true,
    showSwfDownload: true,
};
const swfToFlashVersion = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9.0",
    10: "10.0/10.1",
    11: "10.2",
    12: "10.3",
    13: "11.0",
    14: "11.1",
    15: "11.2",
    16: "11.3",
    17: "11.4",
    18: "11.5",
    19: "11.6",
    20: "11.7",
    21: "11.8",
    22: "11.9",
    23: "12",
    24: "13",
    25: "14",
    26: "15",
    27: "16",
    28: "17",
    29: "18",
    30: "19",
    31: "20",
    32: "21",
    33: "22",
    34: "23",
    35: "24",
    36: "25",
    37: "26",
    38: "27",
    39: "28",
    40: "29",
    41: "30",
    42: "31",
    43: "32",
};
function unload() {
    if (player) {
        player.remove();
        document.querySelectorAll("span.metadata").forEach((el) => {
            el.textContent = "Loading";
        });
        document.getElementById("backgroundColor").style.backgroundColor =
            "white";
    }
}
async function load(options) {
    unload();
    player = ruffle.createPlayer();
    player.id = "player";
    playerContainer.append(player);
    const url = typeof options === "string"
        ? options
        : "url" in options
            ? options["url"]
            : undefined;
    let origin;
    try {
        origin = url ? new URL(url).origin + "/" : url;
    }
    catch {
        // Ignore
    }
    const hostPermissionsForSpecifiedTab = await hasHostPermissionForSpecifiedTab(origin);
    if (origin && !hostPermissionsForSpecifiedTab) {
        const result = await showModal(origin);
        if (result === "") {
            const swfPlayerPermissions = i18n.getMessage("swf_player_permissions");
            alert(swfPlayerPermissions);
            history.pushState("", document.title, window.location.pathname);
            return;
        }
    }
    await player.ruffle().load(options);
    player.addEventListener("loadedmetadata", () => {
        const metadata = player.ruffle().metadata;
        if (metadata) {
            for (const [key, value] of Object.entries(metadata)) {
                const metadataElement = document.getElementById(key);
                if (metadataElement) {
                    switch (key) {
                        case "backgroundColor":
                            metadataElement.style.backgroundColor =
                                value ?? "white";
                            break;
                        case "uncompressedLength":
                            metadataElement.textContent = `${value >> 10}Kb`;
                            break;
                        // @ts-expect-error This intentionally falls through to the default case
                        case "swfVersion":
                            document.getElementById("flashVersion").textContent = swfToFlashVersion[value] ?? null;
                        // falls through and executes the default case as well
                        default:
                            metadataElement.textContent = value;
                            break;
                    }
                }
            }
        }
    });
}
async function loadFile(file) {
    if (!file) {
        return;
    }
    if (file.name) {
        localFileName.textContent = file.name;
    }
    const data = await new Response(file).arrayBuffer();
    const options = await getExplicitOptions();
    load({
        ...options,
        data: data,
        swfFileName: file.name,
        ...baseExtensionConfig,
    });
    history.pushState("", document.title, window.location.pathname);
}
localFileInput.addEventListener("change", (event) => {
    const eventTarget = event.target;
    if (eventTarget?.files &&
        eventTarget?.files.length > 0 &&
        eventTarget.files[0]) {
        loadFile(eventTarget.files[0]);
    }
});
playerContainer.addEventListener("dragenter", (event) => {
    event.stopPropagation();
    event.preventDefault();
});
playerContainer.addEventListener("dragleave", (event) => {
    event.stopPropagation();
    event.preventDefault();
    overlay.classList.remove("drag");
});
playerContainer.addEventListener("dragover", (event) => {
    event.stopPropagation();
    event.preventDefault();
    overlay.classList.add("drag");
});
playerContainer.addEventListener("drop", (event) => {
    event.stopPropagation();
    event.preventDefault();
    overlay.classList.remove("drag");
    if (event.dataTransfer) {
        localFileInput.files = event.dataTransfer.files;
        loadFile(event.dataTransfer.files[0]);
    }
});
localFileInput.addEventListener("dragleave", (event) => {
    event.stopPropagation();
    event.preventDefault();
    overlay.classList.remove("drag");
});
localFileInput.addEventListener("dragover", (event) => {
    event.stopPropagation();
    event.preventDefault();
    overlay.classList.add("drag");
});
localFileInput.addEventListener("drop", (event) => {
    event.stopPropagation();
    event.preventDefault();
    overlay.classList.remove("drag");
    if (event.dataTransfer) {
        localFileInput.files = event.dataTransfer.files;
        loadFile(event.dataTransfer.files[0]);
    }
});
toggleInfo.addEventListener("click", () => {
    if (infoContainer.style.display === "none") {
        infoContainer.style.display = "flex";
    }
    else {
        infoContainer.style.display = "none";
    }
});
reloadSwf.addEventListener("click", () => {
    if (player) {
        const confirmReload = confirm("Reload the current SWF?");
        if (confirmReload) {
            player.ruffle().reload();
        }
    }
});
function showModal(origin) {
    return new Promise((resolve, _reject) => {
        grant.textContent = "Grant permissions on " + origin;
        function grantClicked() {
            modal.close();
            permissions
                .request({
                origins: [origin],
            })
                .then((permissionsGranted) => {
                if (permissionsGranted) {
                    resolve(origin);
                }
                else {
                    resolve("");
                }
            })
                .catch(() => {
                resolve("");
            })
                .finally(() => {
                closeModal.removeEventListener("click", closeClicked);
            });
        }
        function closeClicked() {
            modal.close();
            resolve("");
            grant.removeEventListener("click", grantClicked);
        }
        grant.addEventListener("click", grantClicked, { once: true });
        closeModal.addEventListener("click", closeClicked, { once: true });
        modal.showModal();
    });
}
window.addEventListener("load", () => {
    if (navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        (navigator.platform === "MacIntel" &&
            typeof navigator.standalone !== "undefined")) {
        localFileInput.removeAttribute("accept");
    }
    overlay.removeAttribute("hidden");
});
async function loadSwf(swfUrl) {
    try {
        const pathname = new URL(swfUrl).pathname;
        document.title = pathname.substring(pathname.lastIndexOf("/") + 1);
    }
    catch (_) {
        // Ignore URL parsing errors.
    }
    const options = await getExplicitOptions();
    localFileName.textContent = document.title;
    localFileInput.value = "";
    load({
        ...options,
        url: swfUrl,
        base: swfUrl.substring(0, swfUrl.lastIndexOf("/") + 1),
        ...baseExtensionConfig,
    });
}
async function loadSwfFromHash() {
    const url = new URL(window.location.href);
    // Hash always starts with #, gotta slice that off
    const swfUrl = url.hash.length > 1 ? url.hash.slice(1) : null;
    if (swfUrl) {
        webURL.value = swfUrl;
        await loadSwf(swfUrl);
    }
}
window.addEventListener("pageshow", loadSwfFromHash);
window.addEventListener("hashchange", loadSwfFromHash);
window.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("local-file-label")
        .addEventListener("click", () => {
        document.getElementById("local-file").click();
    });
    webFormSubmit.addEventListener("click", () => {
        if (webURL.value !== "") {
            window.location.hash = webURL.value;
        }
    });
    webURL.addEventListener("keydown", (event) => event.key === "Enter" ? webFormSubmit.click() : undefined);
});

/******/ })()
;