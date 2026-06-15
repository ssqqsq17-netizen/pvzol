/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ../core/dist/flash-identifiers.js
const FLASH_MIMETYPE = "application/x-shockwave-flash";
const FUTURESPLASH_MIMETYPE = "application/futuresplash";
const FLASH7_AND_8_MIMETYPE = "application/x-shockwave-flash2-preview";
const FLASH_MOVIE_MIMETYPE = "application/vnd.adobe.flash.movie";
const FLASH_ACTIVEX_CLASSID = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";

;// ../core/dist/plugin-polyfill.js
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
        __classPrivateFieldSet(this, _RuffleMimeTypeArray_mimeTypes, [], "f");
        __classPrivateFieldSet(this, _RuffleMimeTypeArray_namedMimeTypes, {}, "f");
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
        const index = __classPrivateFieldGet(this, _RuffleMimeTypeArray_mimeTypes, "f").length;
        __classPrivateFieldGet(this, _RuffleMimeTypeArray_mimeTypes, "f").push(wrapper);
        __classPrivateFieldGet(this, _RuffleMimeTypeArray_namedMimeTypes, "f")[mimeType.type] = wrapper;
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
        return __classPrivateFieldGet(this, _RuffleMimeTypeArray_mimeTypes, "f")[index >>> 0];
    }
    namedItem(name) {
        return __classPrivateFieldGet(this, _RuffleMimeTypeArray_namedMimeTypes, "f")[name];
    }
    get length() {
        return __classPrivateFieldGet(this, _RuffleMimeTypeArray_mimeTypes, "f").length;
    }
    [(_RuffleMimeTypeArray_mimeTypes = new WeakMap(), _RuffleMimeTypeArray_namedMimeTypes = new WeakMap(), Symbol.iterator)]() {
        return __classPrivateFieldGet(this, _RuffleMimeTypeArray_mimeTypes, "f")[Symbol.iterator]();
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
        __classPrivateFieldSet(this, _RuffleMimeType_mimeType, mimeType, "f");
    }
    get type() {
        return __classPrivateFieldGet(this, _RuffleMimeType_mimeType, "f").type;
    }
    get description() {
        return __classPrivateFieldGet(this, _RuffleMimeType_mimeType, "f").description;
    }
    get suffixes() {
        return __classPrivateFieldGet(this, _RuffleMimeType_mimeType, "f").suffixes;
    }
    get enabledPlugin() {
        return __classPrivateFieldGet(this, _RuffleMimeType_mimeType, "f").enabledPlugin;
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
        __classPrivateFieldSet(this, _RufflePlugin_name, name, "f");
        __classPrivateFieldSet(this, _RufflePlugin_description, description, "f");
        __classPrivateFieldSet(this, _RufflePlugin_filename, filename, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _RufflePlugin_name, "f");
    }
    get description() {
        return __classPrivateFieldGet(this, _RufflePlugin_description, "f");
    }
    get filename() {
        return __classPrivateFieldGet(this, _RufflePlugin_filename, "f");
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
        __classPrivateFieldSet(this, _RufflePluginArray_plugins, [], "f");
        __classPrivateFieldSet(this, _RufflePluginArray_namedPlugins, {}, "f");
        for (let i = 0; i < plugins.length; i++) {
            this.install(plugins[i]);
        }
    }
    install(plugin) {
        const index = __classPrivateFieldGet(this, _RufflePluginArray_plugins, "f").length;
        __classPrivateFieldGet(this, _RufflePluginArray_plugins, "f").push(plugin);
        __classPrivateFieldGet(this, _RufflePluginArray_namedPlugins, "f")[plugin.name] = plugin;
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
        return __classPrivateFieldGet(this, _RufflePluginArray_plugins, "f")[index >>> 0];
    }
    namedItem(name) {
        return __classPrivateFieldGet(this, _RufflePluginArray_namedPlugins, "f")[name];
    }
    refresh() {
        // Nothing to do, we just need to define the method.
    }
    [(_RufflePluginArray_plugins = new WeakMap(), _RufflePluginArray_namedPlugins = new WeakMap(), Symbol.iterator)]() {
        return __classPrivateFieldGet(this, _RufflePluginArray_plugins, "f")[Symbol.iterator]();
    }
    get [Symbol.toStringTag]() {
        return "PluginArray";
    }
    get length() {
        return __classPrivateFieldGet(this, _RufflePluginArray_plugins, "f").length;
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

;// ./src/plugin-polyfill.ts
// This file is compiled and then injected into content.ts's compiled form.

installPlugin(FLASH_PLUGIN);

/******/ })()
;