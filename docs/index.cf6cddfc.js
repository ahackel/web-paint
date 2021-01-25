// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"JzIzc":[function(require,module,exports) {
require('babel-polyfill');
var _viewsBookView = require("./views/BookView");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _viewsBookViewDefault = _parcelHelpers.interopDefault(_viewsBookView);
var _viewsPaintView = require("./views/PaintView");
var _config = require("./config");
var _viewsSettingsView = require("./views/SettingsView");
var _viewsSettingsViewDefault = _parcelHelpers.interopDefault(_viewsSettingsView);
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
var App = /*#__PURE__*/(function () {
  function App() {
    var _this = this;
    _classCallCheck(this, App);
    // App.preventOverScroll();
    // PeerToPeer.createInstance();
    this._sheet = document.getElementById("sheet");
    window.addEventListener('resize', function (event) {
      _this.OnResize();
    });
    this.OnResize();
    this._bookView = new _viewsBookViewDefault.default("book", function () {
      _this.openView(_this._settingsView);
    });
    this._bookView.onImageSelected = function (id) {
      _this._paintView.loadImage(id).then(function () {
        _this.openView(_this._paintView);
      });
    };
    this._paintView = new _viewsPaintView.PaintView("paint", function () {
      _this.openView(_this._bookView);
    });
    this._settingsView = new _viewsSettingsViewDefault.default("settings", function () {
      _this.openView(_this._bookView);
    });
    // Dropbox integration is not working yet:
    // this.dropboxAuthView = new DropboxAuthView("dropbox-auth");
    // this.openView(ImageStorage.adapter.isAuthenticated ? this.bookView : this.dropboxAuthView);
    this.openView(this._bookView);
  }
  _createClass(App, [{
    key: "getIOSVersion",
    value: function getIOSVersion() {
      if ((/iP(hone|od|ad)/).test(navigator.platform)) {
        // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
        var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || "0", 10)];
      }
    }
  }, {
    key: "OnResize",
    value: function OnResize() {
      var docWidth = document.documentElement.clientWidth;
      var docHeight = document.documentElement.clientHeight;
      var portrait = docWidth < docHeight;
      var isLargeScreen = docWidth > 1024;
      var viewWidth = Math.max(docWidth, docHeight);
      var viewHeight = Math.min(docWidth, docHeight);
      var horizontalPixelSize = viewWidth / _config.config.width;
      var verticalPixelSize = viewHeight / _config.config.height;
      var virtualPixelSize = _config.config.fullScreenCanvas && !isLargeScreen ? Math.max(horizontalPixelSize, verticalPixelSize) : Math.min(horizontalPixelSize, verticalPixelSize);
      this._sheet.style.fontSize = ("").concat(virtualPixelSize, "px");
      this._sheet.style.left = ("").concat(portrait ? 0.5 * (docWidth - virtualPixelSize * _config.config.width) : 0, "px");
    }
  }, {
    key: "openView",
    value: function openView(view) {
      if (this._activeView) {
        this._activeView.hide();
      }
      this._activeView = view;
      this._activeView.show();
    }
  }], [{
    key: "preventOverScroll",
    value: function preventOverScroll() {
      document.ontouchmove = function (event) {
        event.preventDefault();
      };
    }
  }]);
  return App;
})();
// @ts-ignore
window.app = new App();

},{"babel-polyfill":"57WP1","./views/BookView":"2qj3L","./views/PaintView":"1Zutj","./config":"1tzQg","./views/SettingsView":"5P39T","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"57WP1":[function(require,module,exports) {
"use strict";
var global = arguments[3];
require("core-js/shim");
require("regenerator-runtime/runtime");
require("core-js/fn/regexp/escape");
if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;
var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}
define(String.prototype, "padLeft", ("").padStart);
define(String.prototype, "padRight", ("").padEnd);
("pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill").split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});

},{"core-js/shim":"2eRRr","regenerator-runtime/runtime":"7iRTl","core-js/fn/regexp/escape":"2QVCF"}],"2eRRr":[function(require,module,exports) {
require('./modules/es6.symbol');
require('./modules/es6.object.create');
require('./modules/es6.object.define-property');
require('./modules/es6.object.define-properties');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.function.bind');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.parse-int');
require('./modules/es6.parse-float');
require('./modules/es6.number.constructor');
require('./modules/es6.number.to-fixed');
require('./modules/es6.number.to-precision');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.string.anchor');
require('./modules/es6.string.big');
require('./modules/es6.string.blink');
require('./modules/es6.string.bold');
require('./modules/es6.string.fixed');
require('./modules/es6.string.fontcolor');
require('./modules/es6.string.fontsize');
require('./modules/es6.string.italics');
require('./modules/es6.string.link');
require('./modules/es6.string.small');
require('./modules/es6.string.strike');
require('./modules/es6.string.sub');
require('./modules/es6.string.sup');
require('./modules/es6.date.now');
require('./modules/es6.date.to-json');
require('./modules/es6.date.to-iso-string');
require('./modules/es6.date.to-string');
require('./modules/es6.date.to-primitive');
require('./modules/es6.array.is-array');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.join');
require('./modules/es6.array.slice');
require('./modules/es6.array.sort');
require('./modules/es6.array.for-each');
require('./modules/es6.array.map');
require('./modules/es6.array.filter');
require('./modules/es6.array.some');
require('./modules/es6.array.every');
require('./modules/es6.array.reduce');
require('./modules/es6.array.reduce-right');
require('./modules/es6.array.index-of');
require('./modules/es6.array.last-index-of');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.array.species');
require('./modules/es6.array.iterator');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.exec');
require('./modules/es6.regexp.to-string');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.typed.array-buffer');
require('./modules/es6.typed.data-view');
require('./modules/es6.typed.int8-array');
require('./modules/es6.typed.uint8-array');
require('./modules/es6.typed.uint8-clamped-array');
require('./modules/es6.typed.int16-array');
require('./modules/es6.typed.uint16-array');
require('./modules/es6.typed.int32-array');
require('./modules/es6.typed.uint32-array');
require('./modules/es6.typed.float32-array');
require('./modules/es6.typed.float64-array');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.array.flat-map');
require('./modules/es7.array.flatten');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-start');
require('./modules/es7.string.pad-end');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.string.match-all');
require('./modules/es7.symbol.async-iterator');
require('./modules/es7.symbol.observable');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.object.define-getter');
require('./modules/es7.object.define-setter');
require('./modules/es7.object.lookup-getter');
require('./modules/es7.object.lookup-setter');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/es7.map.of');
require('./modules/es7.set.of');
require('./modules/es7.weak-map.of');
require('./modules/es7.weak-set.of');
require('./modules/es7.map.from');
require('./modules/es7.set.from');
require('./modules/es7.weak-map.from');
require('./modules/es7.weak-set.from');
require('./modules/es7.global');
require('./modules/es7.system.global');
require('./modules/es7.error.is-error');
require('./modules/es7.math.clamp');
require('./modules/es7.math.deg-per-rad');
require('./modules/es7.math.degrees');
require('./modules/es7.math.fscale');
require('./modules/es7.math.iaddh');
require('./modules/es7.math.isubh');
require('./modules/es7.math.imulh');
require('./modules/es7.math.rad-per-deg');
require('./modules/es7.math.radians');
require('./modules/es7.math.scale');
require('./modules/es7.math.umulh');
require('./modules/es7.math.signbit');
require('./modules/es7.promise.finally');
require('./modules/es7.promise.try');
require('./modules/es7.reflect.define-metadata');
require('./modules/es7.reflect.delete-metadata');
require('./modules/es7.reflect.get-metadata');
require('./modules/es7.reflect.get-metadata-keys');
require('./modules/es7.reflect.get-own-metadata');
require('./modules/es7.reflect.get-own-metadata-keys');
require('./modules/es7.reflect.has-metadata');
require('./modules/es7.reflect.has-own-metadata');
require('./modules/es7.reflect.metadata');
require('./modules/es7.asap');
require('./modules/es7.observable');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/_core');

},{"./modules/es6.symbol":"Tz9XQ","./modules/es6.object.create":"vMUIO","./modules/es6.object.define-property":"HBHJI","./modules/es6.object.define-properties":"2vh2K","./modules/es6.object.get-own-property-descriptor":"6Y1OM","./modules/es6.object.get-prototype-of":"AhQDO","./modules/es6.object.keys":"3NoKU","./modules/es6.object.get-own-property-names":"1JPVQ","./modules/es6.object.freeze":"4vQuv","./modules/es6.object.seal":"2h9rR","./modules/es6.object.prevent-extensions":"5xsXX","./modules/es6.object.is-frozen":"3SOBx","./modules/es6.object.is-sealed":"7IWM2","./modules/es6.object.is-extensible":"51dnR","./modules/es6.object.assign":"5ylnj","./modules/es6.object.is":"2zPrR","./modules/es6.object.set-prototype-of":"4tW1i","./modules/es6.object.to-string":"2XumJ","./modules/es6.function.bind":"6eaZT","./modules/es6.function.name":"4H5yC","./modules/es6.function.has-instance":"1WuwE","./modules/es6.parse-int":"2q41Y","./modules/es6.parse-float":"JxWlz","./modules/es6.number.constructor":"6x072","./modules/es6.number.to-fixed":"5S6bZ","./modules/es6.number.to-precision":"7txFe","./modules/es6.number.epsilon":"2L4rn","./modules/es6.number.is-finite":"3Q850","./modules/es6.number.is-integer":"6KZGE","./modules/es6.number.is-nan":"5QMiw","./modules/es6.number.is-safe-integer":"2ikV4","./modules/es6.number.max-safe-integer":"uY7Eh","./modules/es6.number.min-safe-integer":"2WF9u","./modules/es6.number.parse-float":"1yP1V","./modules/es6.number.parse-int":"3cI8T","./modules/es6.math.acosh":"XqdJh","./modules/es6.math.asinh":"4zFb6","./modules/es6.math.atanh":"5Twr5","./modules/es6.math.cbrt":"yvbkv","./modules/es6.math.clz32":"nbMlI","./modules/es6.math.cosh":"1PnnK","./modules/es6.math.expm1":"2ruSe","./modules/es6.math.fround":"3Vk8E","./modules/es6.math.hypot":"5c7BV","./modules/es6.math.imul":"612A2","./modules/es6.math.log10":"5VLDs","./modules/es6.math.log1p":"5g3y4","./modules/es6.math.log2":"3KRMf","./modules/es6.math.sign":"57pLC","./modules/es6.math.sinh":"6Ibve","./modules/es6.math.tanh":"6u9bW","./modules/es6.math.trunc":"6bALi","./modules/es6.string.from-code-point":"6504P","./modules/es6.string.raw":"2FgNo","./modules/es6.string.trim":"3rhz5","./modules/es6.string.iterator":"1X6zc","./modules/es6.string.code-point-at":"5PMlw","./modules/es6.string.ends-with":"1FXst","./modules/es6.string.includes":"4JXT0","./modules/es6.string.repeat":"5Opkp","./modules/es6.string.starts-with":"49Cu0","./modules/es6.string.anchor":"6LATK","./modules/es6.string.big":"594jf","./modules/es6.string.blink":"3KVNC","./modules/es6.string.bold":"24Dyz","./modules/es6.string.fixed":"bcqBW","./modules/es6.string.fontcolor":"79GbL","./modules/es6.string.fontsize":"Q3Gxj","./modules/es6.string.italics":"7rPgP","./modules/es6.string.link":"56nsn","./modules/es6.string.small":"wNGaF","./modules/es6.string.strike":"6H8v8","./modules/es6.string.sub":"2rFIt","./modules/es6.string.sup":"3jcYd","./modules/es6.date.now":"5Mn5q","./modules/es6.date.to-json":"224dW","./modules/es6.date.to-iso-string":"kQ46p","./modules/es6.date.to-string":"2eyrO","./modules/es6.date.to-primitive":"2ueDD","./modules/es6.array.is-array":"3DtvY","./modules/es6.array.from":"3MxTu","./modules/es6.array.of":"3aAIz","./modules/es6.array.join":"2sWC7","./modules/es6.array.slice":"6Juwm","./modules/es6.array.sort":"2CBxe","./modules/es6.array.for-each":"3cVwp","./modules/es6.array.map":"UGfkJ","./modules/es6.array.filter":"1SEt0","./modules/es6.array.some":"4ecsO","./modules/es6.array.every":"GwWDp","./modules/es6.array.reduce":"6Nz9X","./modules/es6.array.reduce-right":"6fh4b","./modules/es6.array.index-of":"6KC1G","./modules/es6.array.last-index-of":"3Da4C","./modules/es6.array.copy-within":"7Kl1Z","./modules/es6.array.fill":"35bQF","./modules/es6.array.find":"31mTL","./modules/es6.array.find-index":"7w72Q","./modules/es6.array.species":"7d7GB","./modules/es6.array.iterator":"y678t","./modules/es6.regexp.constructor":"61fDA","./modules/es6.regexp.exec":"4cMKr","./modules/es6.regexp.to-string":"1ZjnG","./modules/es6.regexp.flags":"7tH11","./modules/es6.regexp.match":"424k7","./modules/es6.regexp.replace":"65KRw","./modules/es6.regexp.search":"3o9r8","./modules/es6.regexp.split":"6SDdF","./modules/es6.promise":"2w4O5","./modules/es6.map":"2u9yM","./modules/es6.set":"571wb","./modules/es6.weak-map":"4PCNU","./modules/es6.weak-set":"7dA6T","./modules/es6.typed.array-buffer":"60lEH","./modules/es6.typed.data-view":"6Ggp4","./modules/es6.typed.int8-array":"XjCWw","./modules/es6.typed.uint8-array":"1LOTt","./modules/es6.typed.uint8-clamped-array":"s9lX2","./modules/es6.typed.int16-array":"4vsAw","./modules/es6.typed.uint16-array":"3F7v0","./modules/es6.typed.int32-array":"5ZxsK","./modules/es6.typed.uint32-array":"2fUF6","./modules/es6.typed.float32-array":"1wziE","./modules/es6.typed.float64-array":"4Tiwa","./modules/es6.reflect.apply":"16yfo","./modules/es6.reflect.construct":"2m5M3","./modules/es6.reflect.define-property":"6N2QD","./modules/es6.reflect.delete-property":"2Dm4U","./modules/es6.reflect.enumerate":"1ukYf","./modules/es6.reflect.get":"6s8iJ","./modules/es6.reflect.get-own-property-descriptor":"5SzIx","./modules/es6.reflect.get-prototype-of":"264Iv","./modules/es6.reflect.has":"5cHO8","./modules/es6.reflect.is-extensible":"1rkdS","./modules/es6.reflect.own-keys":"6RJ0p","./modules/es6.reflect.prevent-extensions":"3mP3i","./modules/es6.reflect.set":"5nulH","./modules/es6.reflect.set-prototype-of":"1Odep","./modules/es7.array.includes":"6dQZ0","./modules/es7.array.flat-map":"6RvxK","./modules/es7.array.flatten":"pBFSd","./modules/es7.string.at":"1Ztjw","./modules/es7.string.pad-start":"7v62l","./modules/es7.string.pad-end":"11JSX","./modules/es7.string.trim-left":"1NINb","./modules/es7.string.trim-right":"6JKpc","./modules/es7.string.match-all":"KNLsP","./modules/es7.symbol.async-iterator":"1XSQw","./modules/es7.symbol.observable":"5Zvc0","./modules/es7.object.get-own-property-descriptors":"2jWlo","./modules/es7.object.values":"78Vx1","./modules/es7.object.entries":"2qORs","./modules/es7.object.define-getter":"7o4EC","./modules/es7.object.define-setter":"7t0KY","./modules/es7.object.lookup-getter":"6dOOD","./modules/es7.object.lookup-setter":"3qEZR","./modules/es7.map.to-json":"4gjYB","./modules/es7.set.to-json":"3uA7c","./modules/es7.map.of":"2Fp9M","./modules/es7.set.of":"5ZB3l","./modules/es7.weak-map.of":"2Tngq","./modules/es7.weak-set.of":"26qMp","./modules/es7.map.from":"4O7Wj","./modules/es7.set.from":"3ULJG","./modules/es7.weak-map.from":"74ZW8","./modules/es7.weak-set.from":"78I7i","./modules/es7.global":"337mA","./modules/es7.system.global":"4SqsN","./modules/es7.error.is-error":"7mtJz","./modules/es7.math.clamp":"4Hl81","./modules/es7.math.deg-per-rad":"6j5bg","./modules/es7.math.degrees":"7lTSZ","./modules/es7.math.fscale":"4jZIB","./modules/es7.math.iaddh":"6RJpj","./modules/es7.math.isubh":"1LnWe","./modules/es7.math.imulh":"1l6Mt","./modules/es7.math.rad-per-deg":"1UxS8","./modules/es7.math.radians":"1EA9b","./modules/es7.math.scale":"5UaXq","./modules/es7.math.umulh":"6Q4Ai","./modules/es7.math.signbit":"2jJP7","./modules/es7.promise.finally":"49exs","./modules/es7.promise.try":"2F6Bz","./modules/es7.reflect.define-metadata":"530Zt","./modules/es7.reflect.delete-metadata":"1Mmy1","./modules/es7.reflect.get-metadata":"1A1pF","./modules/es7.reflect.get-metadata-keys":"4IXbg","./modules/es7.reflect.get-own-metadata":"hyHHS","./modules/es7.reflect.get-own-metadata-keys":"1l63q","./modules/es7.reflect.has-metadata":"7kyN4","./modules/es7.reflect.has-own-metadata":"1tSyb","./modules/es7.reflect.metadata":"4Fpxx","./modules/es7.asap":"1PsDB","./modules/es7.observable":"u4OBN","./modules/web.timers":"2XYjM","./modules/web.immediate":"6ns5g","./modules/web.dom.iterable":"5umMF","./modules/_core":"PUJRD"}],"Tz9XQ":[function(require,module,exports) {
"use strict";
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toObject = require('./_to-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $GOPS = require('./_object-gops');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = ({}).propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () {
      return dP(this, 'a', {
        value: 7
      }).a;
    }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;
var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};
var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};
var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, {
        enumerable: createDesc(0, false)
      });
    }
    return setSymbolDesc(it, key, D);
  }
  return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  }
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  }
  return result;
};
// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, {
      configurable: true,
      set: $set
    });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });
  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;
  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }
  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}
$export($export.G + $export.W + $export.F * !USE_NATIVE, {
  Symbol: $Symbol
});
for (var es6Symbols = (// 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
// 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables').split(','), j = 0; es6Symbols.length > j; ) wks(es6Symbols[j++]);
for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k; ) wksDefine(wellKnownSymbols[k++]);
$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () {
    setter = true;
  },
  useSimple: function () {
    setter = false;
  }
});
$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});
// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () {
  $GOPS.f(1);
});
$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});
// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({
    a: S
  }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return;
    // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});
// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_global":"1AbhN","./_has":"7N59I","./_descriptors":"mFEkS","./_export":"6HrtS","./_redefine":"3qCkP","./_meta":"1Cn2f","./_fails":"4l7xt","./_shared":"1RNy5","./_set-to-string-tag":"bKKsZ","./_uid":"UeP6m","./_wks":"6UOxU","./_wks-ext":"1UJyF","./_wks-define":"5RMTf","./_enum-keys":"biiPV","./_is-array":"5zFGF","./_an-object":"6oTss","./_is-object":"6iF6e","./_to-object":"4T5XN","./_to-iobject":"4vkrL","./_to-primitive":"6pQiL","./_property-desc":"4YYuJ","./_object-create":"16hyM","./_object-gopn-ext":"7bd2k","./_object-gopd":"wMJzi","./_object-gops":"2VjuK","./_object-dp":"6QmBP","./_object-keys":"myJjn","./_object-gopn":"49UVz","./_object-pie":"7AfA5","./_library":"6bRLg","./_hide":"655Uv"}],"1AbhN":[function(require,module,exports) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : // eslint-disable-next-line no-new-func
Function('return this')();
if (typeof __g == 'number') __g = global;

},{}],"7N59I":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"mFEkS":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"4l7xt"}],"4l7xt":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"6HrtS":[function(require,module,exports) {
var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';
var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || ({}))[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;
// forced
$export.G = 2;
// global
$export.S = 4;
// static
$export.P = 8;
// proto
$export.B = 16;
// bind
$export.W = 32;
// wrap
$export.U = 64;
// safe
$export.R = 128;
// real proto method for `library`
module.exports = $export;

},{"./_global":"1AbhN","./_core":"PUJRD","./_hide":"655Uv","./_redefine":"3qCkP","./_ctx":"42ddz"}],"PUJRD":[function(require,module,exports) {
var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"655Uv":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"6QmBP","./_property-desc":"4YYuJ","./_descriptors":"mFEkS"}],"6QmBP":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"6oTss","./_ie8-dom-define":"4Iuan","./_to-primitive":"6pQiL","./_descriptors":"mFEkS"}],"6oTss":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"6iF6e"}],"6iF6e":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"4Iuan":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"mFEkS","./_fails":"4l7xt","./_dom-create":"oVhKA"}],"oVhKA":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"6iF6e","./_global":"1AbhN"}],"6pQiL":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"6iF6e"}],"4YYuJ":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"3qCkP":[function(require,module,exports) {
var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var $toString = require('./_function-to-string');
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);
require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};
(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_global":"1AbhN","./_hide":"655Uv","./_has":"7N59I","./_uid":"UeP6m","./_function-to-string":"11HKZ","./_core":"PUJRD"}],"UeP6m":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"11HKZ":[function(require,module,exports) {
module.exports = require('./_shared')('native-function-to-string', Function.toString);

},{"./_shared":"1RNy5"}],"1RNy5":[function(require,module,exports) {
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"PUJRD","./_global":"1AbhN","./_library":"6bRLg"}],"6bRLg":[function(require,module,exports) {
module.exports = false;

},{}],"42ddz":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"rEgnK"}],"rEgnK":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"1Cn2f":[function(require,module,exports) {
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_uid":"UeP6m","./_is-object":"6iF6e","./_has":"7N59I","./_object-dp":"6QmBP","./_fails":"4l7xt"}],"bKKsZ":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"6QmBP","./_has":"7N59I","./_wks":"6UOxU"}],"6UOxU":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"1RNy5","./_uid":"UeP6m","./_global":"1AbhN"}],"1UJyF":[function(require,module,exports) {
exports.f = require('./_wks');

},{"./_wks":"6UOxU"}],"5RMTf":[function(require,module,exports) {
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || ({}));
  if (name.charAt(0) != '_' && !((name in $Symbol))) defineProperty($Symbol, name, {
    value: wksExt.f(name)
  });
};

},{"./_global":"1AbhN","./_core":"PUJRD","./_library":"6bRLg","./_wks-ext":"1UJyF","./_object-dp":"6QmBP"}],"biiPV":[function(require,module,exports) {
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-keys":"myJjn","./_object-gops":"2VjuK","./_object-pie":"7AfA5"}],"myJjn":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"65Ae2","./_enum-bug-keys":"7qbux"}],"65Ae2":[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":"7N59I","./_to-iobject":"4vkrL","./_array-includes":"5BI1i","./_shared-key":"2e7wq"}],"4vkrL":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"3Uvq7","./_defined":"1k5kJ"}],"3Uvq7":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"391EE"}],"391EE":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"1k5kJ":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"5BI1i":[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-iobject":"4vkrL","./_to-length":"2CZIE","./_to-absolute-index":"5PtP1"}],"2CZIE":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"2txSQ"}],"2txSQ":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"5PtP1":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"2txSQ"}],"2e7wq":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"1RNy5","./_uid":"UeP6m"}],"7qbux":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"2VjuK":[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],"7AfA5":[function(require,module,exports) {
exports.f = {}.propertyIsEnumerable;

},{}],"5zFGF":[function(require,module,exports) {
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":"391EE"}],"4T5XN":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"1k5kJ"}],"16hyM":[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"6oTss","./_object-dps":"cD0cb","./_enum-bug-keys":"7qbux","./_shared-key":"2e7wq","./_dom-create":"oVhKA","./_html":"4mzd0"}],"cD0cb":[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":"6QmBP","./_an-object":"6oTss","./_object-keys":"myJjn","./_descriptors":"mFEkS"}],"4mzd0":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"1AbhN"}],"7bd2k":[function(require,module,exports) {
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_to-iobject":"4vkrL","./_object-gopn":"49UVz"}],"49UVz":[function(require,module,exports) {
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_object-keys-internal":"65Ae2","./_enum-bug-keys":"7qbux"}],"wMJzi":[function(require,module,exports) {
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_object-pie":"7AfA5","./_property-desc":"4YYuJ","./_to-iobject":"4vkrL","./_to-primitive":"6pQiL","./_has":"7N59I","./_ie8-dom-define":"4Iuan","./_descriptors":"mFEkS"}],"vMUIO":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: require('./_object-create') });

},{"./_export":"6HrtS","./_object-create":"16hyM"}],"HBHJI":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_export":"6HrtS","./_descriptors":"mFEkS","./_object-dp":"6QmBP"}],"2vh2K":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperties: require('./_object-dps') });

},{"./_export":"6HrtS","./_descriptors":"mFEkS","./_object-dps":"cD0cb"}],"6Y1OM":[function(require,module,exports) {
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./_to-iobject');
var $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

},{"./_to-iobject":"4vkrL","./_object-gopd":"wMJzi","./_object-sap":"41qsi"}],"41qsi":[function(require,module,exports) {
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_export":"6HrtS","./_core":"PUJRD","./_fails":"4l7xt"}],"AhQDO":[function(require,module,exports) {
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./_to-object');
var $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

},{"./_to-object":"4T5XN","./_object-gpo":"iSGCZ","./_object-sap":"41qsi"}],"iSGCZ":[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"7N59I","./_to-object":"4T5XN","./_shared-key":"2e7wq"}],"3NoKU":[function(require,module,exports) {
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_to-object":"4T5XN","./_object-keys":"myJjn","./_object-sap":"41qsi"}],"1JPVQ":[function(require,module,exports) {
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function () {
  return require('./_object-gopn-ext').f;
});

},{"./_object-sap":"41qsi","./_object-gopn-ext":"7bd2k"}],"4vQuv":[function(require,module,exports) {
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

},{"./_is-object":"6iF6e","./_meta":"1Cn2f","./_object-sap":"41qsi"}],"2h9rR":[function(require,module,exports) {
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

},{"./_is-object":"6iF6e","./_meta":"1Cn2f","./_object-sap":"41qsi"}],"5xsXX":[function(require,module,exports) {
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

},{"./_is-object":"6iF6e","./_meta":"1Cn2f","./_object-sap":"41qsi"}],"3SOBx":[function(require,module,exports) {
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

},{"./_is-object":"6iF6e","./_object-sap":"41qsi"}],"7IWM2":[function(require,module,exports) {
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

},{"./_is-object":"6iF6e","./_object-sap":"41qsi"}],"51dnR":[function(require,module,exports) {
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

},{"./_is-object":"6iF6e","./_object-sap":"41qsi"}],"5ylnj":[function(require,module,exports) {
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":"6HrtS","./_object-assign":"3136C"}],"3136C":[function(require,module,exports) {
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = require('./_descriptors');
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

},{"./_descriptors":"mFEkS","./_object-keys":"myJjn","./_object-gops":"2VjuK","./_object-pie":"7AfA5","./_to-object":"4T5XN","./_iobject":"3Uvq7","./_fails":"4l7xt"}],"2zPrR":[function(require,module,exports) {
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', { is: require('./_same-value') });

},{"./_export":"6HrtS","./_same-value":"71sJc"}],"71sJc":[function(require,module,exports) {
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],"4tW1i":[function(require,module,exports) {
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', { setPrototypeOf: require('./_set-proto').set });

},{"./_export":"6HrtS","./_set-proto":"76owg"}],"76owg":[function(require,module,exports) {
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_is-object":"6iF6e","./_an-object":"6oTss","./_ctx":"42ddz","./_object-gopd":"wMJzi"}],"2XumJ":[function(require,module,exports) {
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof');
var test = {};
test[require('./_wks')('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  require('./_redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

},{"./_classof":"Eaj8o","./_wks":"6UOxU","./_redefine":"3qCkP"}],"Eaj8o":[function(require,module,exports) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":"391EE","./_wks":"6UOxU"}],"6eaZT":[function(require,module,exports) {
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = require('./_export');

$export($export.P, 'Function', { bind: require('./_bind') });

},{"./_export":"6HrtS","./_bind":"5rwXk"}],"5rwXk":[function(require,module,exports) {
'use strict';
var aFunction = require('./_a-function');
var isObject = require('./_is-object');
var invoke = require('./_invoke');
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

},{"./_a-function":"rEgnK","./_is-object":"6iF6e","./_invoke":"KQFks"}],"KQFks":[function(require,module,exports) {
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],"4H5yC":[function(require,module,exports) {
var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

},{"./_object-dp":"6QmBP","./_descriptors":"mFEkS"}],"1WuwE":[function(require,module,exports) {
'use strict';
var isObject = require('./_is-object');
var getPrototypeOf = require('./_object-gpo');
var HAS_INSTANCE = require('./_wks')('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) require('./_object-dp').f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });

},{"./_is-object":"6iF6e","./_object-gpo":"iSGCZ","./_wks":"6UOxU","./_object-dp":"6QmBP"}],"2q41Y":[function(require,module,exports) {
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });

},{"./_export":"6HrtS","./_parse-int":"5ckY9"}],"5ckY9":[function(require,module,exports) {
var $parseInt = require('./_global').parseInt;
var $trim = require('./_string-trim').trim;
var ws = require('./_string-ws');
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

},{"./_global":"1AbhN","./_string-trim":"1rS53","./_string-ws":"4DwBN"}],"1rS53":[function(require,module,exports) {
var $export = require('./_export');
var defined = require('./_defined');
var fails = require('./_fails');
var spaces = require('./_string-ws');
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

},{"./_export":"6HrtS","./_defined":"1k5kJ","./_fails":"4l7xt","./_string-ws":"4DwBN"}],"4DwBN":[function(require,module,exports) {
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],"JxWlz":[function(require,module,exports) {
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });

},{"./_export":"6HrtS","./_parse-float":"6xYNv"}],"6xYNv":[function(require,module,exports) {
var $parseFloat = require('./_global').parseFloat;
var $trim = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

},{"./_global":"1AbhN","./_string-trim":"1rS53","./_string-ws":"4DwBN"}],"6x072":[function(require,module,exports) {
"use strict";
var global = require('./_global');
var has = require('./_has');
var cof = require('./_cof');
var inheritIfRequired = require('./_inherit-if-required');
var toPrimitive = require('./_to-primitive');
var fails = require('./_fails');
var gOPN = require('./_object-gopn').f;
var gOPD = require('./_object-gopd').f;
var dP = require('./_object-dp').f;
var $trim = require('./_string-trim').trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(require('./_object-create')(proto)) == NUMBER;
var TRIM = ('trim' in String.prototype);
// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN;
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66:
        case 98:
          radix = 2;
          maxCode = 49;
          break;
        case 79:
        case 111:
          radix = 8;
          maxCode = 55;
          break;
        default:
          return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      }
      return parseInt(digits, radix);
    }
  }
  return +it;
};
if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number && (// check on 1..constructor(foo) case
    BROKEN_COF ? fails(function () {
      proto.valueOf.call(that);
    }) : cof(that) != NUMBER) ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = require('./_descriptors') ? gOPN(Base) : (// ES3:
  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES6 (in case, if modules with ES6 Number statics required before):
  // ES6 (in case, if modules with ES6 Number statics required before):
  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}

},{"./_global":"1AbhN","./_has":"7N59I","./_cof":"391EE","./_inherit-if-required":"2fnZn","./_to-primitive":"6pQiL","./_fails":"4l7xt","./_object-gopn":"49UVz","./_object-gopd":"wMJzi","./_object-dp":"6QmBP","./_string-trim":"1rS53","./_object-create":"16hyM","./_descriptors":"mFEkS","./_redefine":"3qCkP"}],"2fnZn":[function(require,module,exports) {
var isObject = require('./_is-object');
var setPrototypeOf = require('./_set-proto').set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

},{"./_is-object":"6iF6e","./_set-proto":"76owg"}],"5S6bZ":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toInteger = require('./_to-integer');
var aNumberValue = require('./_a-number-value');
var repeat = require('./_string-repeat');
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !require('./_fails')(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

},{"./_export":"6HrtS","./_to-integer":"2txSQ","./_a-number-value":"3dcUL","./_string-repeat":"1C9SW","./_fails":"4l7xt"}],"3dcUL":[function(require,module,exports) {
var cof = require('./_cof');
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};

},{"./_cof":"391EE"}],"1C9SW":[function(require,module,exports) {
'use strict';
var toInteger = require('./_to-integer');
var defined = require('./_defined');

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

},{"./_to-integer":"2txSQ","./_defined":"1k5kJ"}],"7txFe":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $fails = require('./_fails');
var aNumberValue = require('./_a-number-value');
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});

},{"./_export":"6HrtS","./_fails":"4l7xt","./_a-number-value":"3dcUL"}],"2L4rn":[function(require,module,exports) {
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

},{"./_export":"6HrtS"}],"3Q850":[function(require,module,exports) {
// 20.1.2.2 Number.isFinite(number)
var $export = require('./_export');
var _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

},{"./_export":"6HrtS","./_global":"1AbhN"}],"6KZGE":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', { isInteger: require('./_is-integer') });

},{"./_export":"6HrtS","./_is-integer":"7pERX"}],"7pERX":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object');
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"./_is-object":"6iF6e"}],"5QMiw":[function(require,module,exports) {
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

},{"./_export":"6HrtS"}],"2ikV4":[function(require,module,exports) {
// 20.1.2.5 Number.isSafeInteger(number)
var $export = require('./_export');
var isInteger = require('./_is-integer');
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

},{"./_export":"6HrtS","./_is-integer":"7pERX"}],"uY7Eh":[function(require,module,exports) {
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

},{"./_export":"6HrtS"}],"2WF9u":[function(require,module,exports) {
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

},{"./_export":"6HrtS"}],"1yP1V":[function(require,module,exports) {
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

},{"./_export":"6HrtS","./_parse-float":"6xYNv"}],"3cI8T":[function(require,module,exports) {
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

},{"./_export":"6HrtS","./_parse-int":"5ckY9"}],"XqdJh":[function(require,module,exports) {
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export');
var log1p = require('./_math-log1p');
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

},{"./_export":"6HrtS","./_math-log1p":"6JNwO"}],"6JNwO":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

},{}],"4zFb6":[function(require,module,exports) {
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export');
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

},{"./_export":"6HrtS"}],"5Twr5":[function(require,module,exports) {
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export');
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

},{"./_export":"6HrtS"}],"yvbkv":[function(require,module,exports) {
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export');
var sign = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

},{"./_export":"6HrtS","./_math-sign":"1dmID"}],"1dmID":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

},{}],"nbMlI":[function(require,module,exports) {
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

},{"./_export":"6HrtS"}],"1PnnK":[function(require,module,exports) {
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export');
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

},{"./_export":"6HrtS"}],"2ruSe":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export');
var $expm1 = require('./_math-expm1');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

},{"./_export":"6HrtS","./_math-expm1":"71qCj"}],"71qCj":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

},{}],"3Vk8E":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var $export = require('./_export');

$export($export.S, 'Math', { fround: require('./_math-fround') });

},{"./_export":"6HrtS","./_math-fround":"5saRe"}],"5saRe":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var sign = require('./_math-sign');
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

},{"./_math-sign":"1dmID"}],"5c7BV":[function(require,module,exports) {
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export');
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

},{"./_export":"6HrtS"}],"612A2":[function(require,module,exports) {
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export');
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

},{"./_export":"6HrtS","./_fails":"4l7xt"}],"5VLDs":[function(require,module,exports) {
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

},{"./_export":"6HrtS"}],"5g3y4":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', { log1p: require('./_math-log1p') });

},{"./_export":"6HrtS","./_math-log1p":"6JNwO"}],"3KRMf":[function(require,module,exports) {
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

},{"./_export":"6HrtS"}],"57pLC":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', { sign: require('./_math-sign') });

},{"./_export":"6HrtS","./_math-sign":"1dmID"}],"6Ibve":[function(require,module,exports) {
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

},{"./_export":"6HrtS","./_math-expm1":"71qCj","./_fails":"4l7xt"}],"6u9bW":[function(require,module,exports) {
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

},{"./_export":"6HrtS","./_math-expm1":"71qCj"}],"6bALi":[function(require,module,exports) {
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

},{"./_export":"6HrtS"}],"6504P":[function(require,module,exports) {
var $export = require('./_export');
var toAbsoluteIndex = require('./_to-absolute-index');
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

},{"./_export":"6HrtS","./_to-absolute-index":"5PtP1"}],"2FgNo":[function(require,module,exports) {
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});

},{"./_export":"6HrtS","./_to-iobject":"4vkrL","./_to-length":"2CZIE"}],"3rhz5":[function(require,module,exports) {
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./_string-trim')('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});

},{"./_string-trim":"1rS53"}],"1X6zc":[function(require,module,exports) {
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_string-at":"6L84u","./_iter-define":"1Zurz"}],"6L84u":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_to-integer":"2txSQ","./_defined":"1k5kJ"}],"1Zurz":[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":"6bRLg","./_export":"6HrtS","./_redefine":"3qCkP","./_hide":"655Uv","./_iterators":"4Rtsu","./_iter-create":"7km0F","./_set-to-string-tag":"bKKsZ","./_object-gpo":"iSGCZ","./_wks":"6UOxU"}],"4Rtsu":[function(require,module,exports) {
module.exports = {};

},{}],"7km0F":[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":"16hyM","./_property-desc":"4YYuJ","./_set-to-string-tag":"bKKsZ","./_hide":"655Uv","./_wks":"6UOxU"}],"5PMlw":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $at = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

},{"./_export":"6HrtS","./_string-at":"6L84u"}],"1FXst":[function(require,module,exports) {
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

},{"./_export":"6HrtS","./_to-length":"2CZIE","./_string-context":"77Flw","./_fails-is-regexp":"KXh0a"}],"77Flw":[function(require,module,exports) {
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp');
var defined = require('./_defined');

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

},{"./_is-regexp":"61LGH","./_defined":"1k5kJ"}],"61LGH":[function(require,module,exports) {
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_is-object":"6iF6e","./_cof":"391EE","./_wks":"6UOxU"}],"KXh0a":[function(require,module,exports) {
var MATCH = require('./_wks')('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

},{"./_wks":"6UOxU"}],"4JXT0":[function(require,module,exports) {
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export = require('./_export');
var context = require('./_string-context');
var INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"./_export":"6HrtS","./_string-context":"77Flw","./_fails-is-regexp":"KXh0a"}],"5Opkp":[function(require,module,exports) {
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});

},{"./_export":"6HrtS","./_string-repeat":"1C9SW"}],"49Cu0":[function(require,module,exports) {
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"./_export":"6HrtS","./_to-length":"2CZIE","./_string-context":"77Flw","./_fails-is-regexp":"KXh0a"}],"6LATK":[function(require,module,exports) {
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

},{"./_string-html":"59kKm"}],"59kKm":[function(require,module,exports) {
var $export = require('./_export');
var fails = require('./_fails');
var defined = require('./_defined');
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

},{"./_export":"6HrtS","./_fails":"4l7xt","./_defined":"1k5kJ"}],"594jf":[function(require,module,exports) {
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

},{"./_string-html":"59kKm"}],"3KVNC":[function(require,module,exports) {
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

},{"./_string-html":"59kKm"}],"24Dyz":[function(require,module,exports) {
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

},{"./_string-html":"59kKm"}],"bcqBW":[function(require,module,exports) {
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

},{"./_string-html":"59kKm"}],"79GbL":[function(require,module,exports) {
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

},{"./_string-html":"59kKm"}],"Q3Gxj":[function(require,module,exports) {
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

},{"./_string-html":"59kKm"}],"7rPgP":[function(require,module,exports) {
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

},{"./_string-html":"59kKm"}],"56nsn":[function(require,module,exports) {
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

},{"./_string-html":"59kKm"}],"wNGaF":[function(require,module,exports) {
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

},{"./_string-html":"59kKm"}],"6H8v8":[function(require,module,exports) {
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

},{"./_string-html":"59kKm"}],"2rFIt":[function(require,module,exports) {
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

},{"./_string-html":"59kKm"}],"3jcYd":[function(require,module,exports) {
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

},{"./_string-html":"59kKm"}],"5Mn5q":[function(require,module,exports) {
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = require('./_export');

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });

},{"./_export":"6HrtS"}],"224dW":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');

$export($export.P + $export.F * require('./_fails')(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

},{"./_export":"6HrtS","./_to-object":"4T5XN","./_to-primitive":"6pQiL","./_fails":"4l7xt"}],"kQ46p":[function(require,module,exports) {
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = require('./_export');
var toISOString = require('./_date-to-iso-string');

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});

},{"./_export":"6HrtS","./_date-to-iso-string":"4zHCW"}],"4zHCW":[function(require,module,exports) {
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = require('./_fails');
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;

},{"./_fails":"4l7xt"}],"2eyrO":[function(require,module,exports) {
var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  require('./_redefine')(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

},{"./_redefine":"3qCkP"}],"2ueDD":[function(require,module,exports) {
var TO_PRIMITIVE = require('./_wks')('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));

},{"./_wks":"6UOxU","./_hide":"655Uv","./_date-to-primitive":"2NuKl"}],"2NuKl":[function(require,module,exports) {
'use strict';
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

},{"./_an-object":"6oTss","./_to-primitive":"6pQiL"}],"3DtvY":[function(require,module,exports) {
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = require('./_export');

$export($export.S, 'Array', { isArray: require('./_is-array') });

},{"./_export":"6HrtS","./_is-array":"5zFGF"}],"3MxTu":[function(require,module,exports) {
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_ctx":"42ddz","./_export":"6HrtS","./_to-object":"4T5XN","./_iter-call":"2Z7Nv","./_is-array-iter":"Ev5Sr","./_to-length":"2CZIE","./_create-property":"2YuHS","./core.get-iterator-method":"3vkYf","./_iter-detect":"63DNV"}],"2Z7Nv":[function(require,module,exports) {
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":"6oTss"}],"Ev5Sr":[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":"4Rtsu","./_wks":"6UOxU"}],"2YuHS":[function(require,module,exports) {
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":"6QmBP","./_property-desc":"4YYuJ"}],"3vkYf":[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":"Eaj8o","./_wks":"6UOxU","./_iterators":"4Rtsu","./_core":"PUJRD"}],"63DNV":[function(require,module,exports) {
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":"6UOxU"}],"3aAIz":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var createProperty = require('./_create-property');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

},{"./_export":"6HrtS","./_create-property":"2YuHS","./_fails":"4l7xt"}],"2sWC7":[function(require,module,exports) {
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (require('./_iobject') != Object || !require('./_strict-method')(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

},{"./_export":"6HrtS","./_to-iobject":"4vkrL","./_iobject":"3Uvq7","./_strict-method":"4lSUl"}],"4lSUl":[function(require,module,exports) {
'use strict';
var fails = require('./_fails');

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

},{"./_fails":"4l7xt"}],"6Juwm":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var html = require('./_html');
var cof = require('./_cof');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * require('./_fails')(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

},{"./_export":"6HrtS","./_html":"4mzd0","./_cof":"391EE","./_to-absolute-index":"5PtP1","./_to-length":"2CZIE","./_fails":"4l7xt"}],"2CBxe":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var fails = require('./_fails');
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

},{"./_export":"6HrtS","./_a-function":"rEgnK","./_to-object":"4T5XN","./_fails":"4l7xt","./_strict-method":"4lSUl"}],"3cVwp":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $forEach = require('./_array-methods')(0);
var STRICT = require('./_strict-method')([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"6HrtS","./_array-methods":"5W4gp","./_strict-method":"4lSUl"}],"5W4gp":[function(require,module,exports) {
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_ctx":"42ddz","./_iobject":"3Uvq7","./_to-object":"4T5XN","./_to-length":"2CZIE","./_array-species-create":"VLEo3"}],"VLEo3":[function(require,module,exports) {
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":"6xsLc"}],"6xsLc":[function(require,module,exports) {
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-object":"6iF6e","./_is-array":"5zFGF","./_wks":"6UOxU"}],"UGfkJ":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $map = require('./_array-methods')(1);

$export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"6HrtS","./_array-methods":"5W4gp","./_strict-method":"4lSUl"}],"1SEt0":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $filter = require('./_array-methods')(2);

$export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"6HrtS","./_array-methods":"5W4gp","./_strict-method":"4lSUl"}],"4ecsO":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $some = require('./_array-methods')(3);

$export($export.P + $export.F * !require('./_strict-method')([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"6HrtS","./_array-methods":"5W4gp","./_strict-method":"4lSUl"}],"GwWDp":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $every = require('./_array-methods')(4);

$export($export.P + $export.F * !require('./_strict-method')([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});

},{"./_export":"6HrtS","./_array-methods":"5W4gp","./_strict-method":"4lSUl"}],"6Nz9X":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

},{"./_export":"6HrtS","./_array-reduce":"7ePjm","./_strict-method":"4lSUl"}],"7ePjm":[function(require,module,exports) {
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var toLength = require('./_to-length');

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

},{"./_a-function":"rEgnK","./_to-object":"4T5XN","./_iobject":"3Uvq7","./_to-length":"2CZIE"}],"6fh4b":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

},{"./_export":"6HrtS","./_array-reduce":"7ePjm","./_strict-method":"4lSUl"}],"6KC1G":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $indexOf = require('./_array-includes')(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

},{"./_export":"6HrtS","./_array-includes":"5BI1i","./_strict-method":"4lSUl"}],"3Da4C":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});

},{"./_export":"6HrtS","./_to-iobject":"4vkrL","./_to-integer":"2txSQ","./_to-length":"2CZIE","./_strict-method":"4lSUl"}],"7Kl1Z":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { copyWithin: require('./_array-copy-within') });

require('./_add-to-unscopables')('copyWithin');

},{"./_export":"6HrtS","./_array-copy-within":"14s9q","./_add-to-unscopables":"3FW7d"}],"14s9q":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

},{"./_to-object":"4T5XN","./_to-absolute-index":"5PtP1","./_to-length":"2CZIE"}],"3FW7d":[function(require,module,exports) {
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_wks":"6UOxU","./_hide":"655Uv"}],"35bQF":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { fill: require('./_array-fill') });

require('./_add-to-unscopables')('fill');

},{"./_export":"6HrtS","./_array-fill":"6umwi","./_add-to-unscopables":"3FW7d"}],"6umwi":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"./_to-object":"4T5XN","./_to-absolute-index":"5PtP1","./_to-length":"2CZIE"}],"31mTL":[function(require,module,exports) {
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"6HrtS","./_array-methods":"5W4gp","./_add-to-unscopables":"3FW7d"}],"7w72Q":[function(require,module,exports) {
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"6HrtS","./_array-methods":"5W4gp","./_add-to-unscopables":"3FW7d"}],"7d7GB":[function(require,module,exports) {
require('./_set-species')('Array');

},{"./_set-species":"39n2x"}],"39n2x":[function(require,module,exports) {
"use strict";
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');
module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () {
      return this;
    }
  });
};

},{"./_global":"1AbhN","./_object-dp":"6QmBP","./_descriptors":"mFEkS","./_wks":"6UOxU"}],"y678t":[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":"3FW7d","./_iter-step":"EIzg9","./_iterators":"4Rtsu","./_to-iobject":"4vkrL","./_iter-define":"1Zurz"}],"EIzg9":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"61fDA":[function(require,module,exports) {
var global = require('./_global');
var inheritIfRequired = require('./_inherit-if-required');
var dP = require('./_object-dp').f;
var gOPN = require('./_object-gopn').f;
var isRegExp = require('./_is-regexp');
var $flags = require('./_flags');
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;
if (require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function () {
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    (key in $RegExp) || dP($RegExp, key, {
      configurable: true,
      get: function () {
        return Base[key];
      },
      set: function (it) {
        Base[key] = it;
      }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i; ) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}
require('./_set-species')('RegExp');

},{"./_global":"1AbhN","./_inherit-if-required":"2fnZn","./_object-dp":"6QmBP","./_object-gopn":"49UVz","./_is-regexp":"61LGH","./_flags":"5tcXP","./_descriptors":"mFEkS","./_fails":"4l7xt","./_wks":"6UOxU","./_redefine":"3qCkP","./_set-species":"39n2x"}],"5tcXP":[function(require,module,exports) {
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"./_an-object":"6oTss"}],"4cMKr":[function(require,module,exports) {
'use strict';
var regexpExec = require('./_regexp-exec');
require('./_export')({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});

},{"./_regexp-exec":"7bpUT","./_export":"6HrtS"}],"7bpUT":[function(require,module,exports) {
'use strict';

var regexpFlags = require('./_flags');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./_flags":"5tcXP"}],"1ZjnG":[function(require,module,exports) {
"use strict";
require('./es6.regexp.flags');
var anObject = require('./_an-object');
var $flags = require('./_flags');
var DESCRIPTORS = require('./_descriptors');
var TO_STRING = 'toString';
var $toString = (/./)[TO_STRING];
var define = function (fn) {
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};
// 21.2.5.14 RegExp.prototype.toString()
if (require('./_fails')(function () {
  return $toString.call({
    source: 'a',
    flags: 'b'
  }) != '/a/b';
})) {
  define(function toString() {
    var R = anObject(this);
    return ('/').concat(R.source, '/', ('flags' in R) ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

},{"./es6.regexp.flags":"7tH11","./_an-object":"6oTss","./_flags":"5tcXP","./_descriptors":"mFEkS","./_redefine":"3qCkP","./_fails":"4l7xt"}],"7tH11":[function(require,module,exports) {
// 21.2.5.3 get RegExp.prototype.flags()
if (require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});

},{"./_descriptors":"mFEkS","./_object-dp":"6QmBP","./_flags":"5tcXP"}],"424k7":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var toLength = require('./_to-length');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');

// @@match logic
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"./_an-object":"6oTss","./_to-length":"2CZIE","./_advance-string-index":"1gOy3","./_regexp-exec-abstract":"3mnks","./_fix-re-wks":"1xwvU"}],"1gOy3":[function(require,module,exports) {
'use strict';
var at = require('./_string-at')(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

},{"./_string-at":"6L84u"}],"3mnks":[function(require,module,exports) {
'use strict';

var classof = require('./_classof');
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};

},{"./_classof":"Eaj8o"}],"1xwvU":[function(require,module,exports) {
'use strict';
require('./es6.regexp.exec');
var redefine = require('./_redefine');
var hide = require('./_hide');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');
var regexpExec = require('./_regexp-exec');

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./es6.regexp.exec":"4cMKr","./_redefine":"3qCkP","./_hide":"655Uv","./_fails":"4l7xt","./_defined":"1k5kJ","./_wks":"6UOxU","./_regexp-exec":"7bpUT"}],"65KRw":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

},{"./_an-object":"6oTss","./_to-object":"4T5XN","./_to-length":"2CZIE","./_to-integer":"2txSQ","./_advance-string-index":"1gOy3","./_regexp-exec-abstract":"3mnks","./_fix-re-wks":"1xwvU"}],"3o9r8":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var sameValue = require('./_same-value');
var regExpExec = require('./_regexp-exec-abstract');

// @@search logic
require('./_fix-re-wks')('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

},{"./_an-object":"6oTss","./_same-value":"71sJc","./_regexp-exec-abstract":"3mnks","./_fix-re-wks":"1xwvU"}],"6SDdF":[function(require,module,exports) {
'use strict';

var isRegExp = require('./_is-regexp');
var anObject = require('./_an-object');
var speciesConstructor = require('./_species-constructor');
var advanceStringIndex = require('./_advance-string-index');
var toLength = require('./_to-length');
var callRegExpExec = require('./_regexp-exec-abstract');
var regexpExec = require('./_regexp-exec');
var fails = require('./_fails');
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});

},{"./_is-regexp":"61LGH","./_an-object":"6oTss","./_species-constructor":"4bW3t","./_advance-string-index":"1gOy3","./_to-length":"2CZIE","./_regexp-exec-abstract":"3mnks","./_regexp-exec":"7bpUT","./_fails":"4l7xt","./_fix-re-wks":"1xwvU"}],"4bW3t":[function(require,module,exports) {
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_an-object":"6oTss","./_a-function":"rEgnK","./_wks":"6UOxU"}],"2w4O5":[function(require,module,exports) {
"use strict";
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var userAgent = require('./_user-agent');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () {};
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;
var USE_NATIVE = !!(function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise && // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // we can't detect it synchronously, so just check versions
    v8.indexOf('6.6') !== 0 && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) {}
})();
// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value; else {
            if (domain) domain.enter();
            result = handler(value);
            // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]);
    // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({
            promise: promise,
            reason: value
          });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    }
    promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({
        promise: promise,
        reason: promise._v
      });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise;
  // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise;
  // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = {
          _w: promise,
          _d: false
        };
        // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({
      _w: promise,
      _d: false
    }, e);
  }
};
// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];
    // <- awaiting reactions
    this._a = undefined;
    // <- checked in isUnhandled reactions
    this._s = 0;
    // <- state
    this._d = false;
    // <- done
    this._v = undefined;
    // <- value
    this._h = 0;
    // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };
}
$export($export.G + $export.W + $export.F * !USE_NATIVE, {
  Promise: $Promise
});
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];
// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_library":"6bRLg","./_global":"1AbhN","./_ctx":"42ddz","./_classof":"Eaj8o","./_export":"6HrtS","./_is-object":"6iF6e","./_a-function":"rEgnK","./_an-instance":"5exw3","./_for-of":"3tdsh","./_species-constructor":"4bW3t","./_task":"5HJ8z","./_microtask":"4fFoJ","./_new-promise-capability":"ihRV9","./_perform":"X6BaR","./_user-agent":"6w03P","./_promise-resolve":"7xDZg","./_wks":"6UOxU","./_redefine-all":"4tsJO","./_set-to-string-tag":"bKKsZ","./_set-species":"39n2x","./_core":"PUJRD","./_iter-detect":"63DNV"}],"5exw3":[function(require,module,exports) {
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],"3tdsh":[function(require,module,exports) {
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_ctx":"42ddz","./_iter-call":"2Z7Nv","./_is-array-iter":"Ev5Sr","./_an-object":"6oTss","./_to-length":"2CZIE","./core.get-iterator-method":"3vkYf"}],"5HJ8z":[function(require,module,exports) {
var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  } else if ((ONREADYSTATECHANGE in cel('script'))) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_ctx":"42ddz","./_invoke":"KQFks","./_html":"4mzd0","./_dom-create":"oVhKA","./_global":"1AbhN","./_cof":"391EE"}],"4fFoJ":[function(require,module,exports) {
var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';
module.exports = function () {
  var head, last, notify;
  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify(); else last = undefined;
        throw e;
      }
    }
    last = undefined;
    if (parent) parent.enter();
  };
  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, {
      characterData: true
    });
    // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
  return function (fn) {
    var task = {
      fn: fn,
      next: undefined
    };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    }
    last = task;
  };
};

},{"./_global":"1AbhN","./_task":"5HJ8z","./_cof":"391EE"}],"ihRV9":[function(require,module,exports) {
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":"rEgnK"}],"X6BaR":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],"6w03P":[function(require,module,exports) {
var global = require('./_global');
var navigator = global.navigator;
module.exports = navigator && navigator.userAgent || '';

},{"./_global":"1AbhN"}],"7xDZg":[function(require,module,exports) {
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":"6oTss","./_is-object":"6iF6e","./_new-promise-capability":"ihRV9"}],"4tsJO":[function(require,module,exports) {
var redefine = require('./_redefine');
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

},{"./_redefine":"3qCkP"}],"2u9yM":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var MAP = 'Map';

// 23.1 Map Objects
module.exports = require('./_collection')(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

},{"./_collection-strong":"1XR2G","./_validate-collection":"395AG","./_collection":"4Gd6g"}],"1XR2G":[function(require,module,exports) {
'use strict';
var dP = require('./_object-dp').f;
var create = require('./_object-create');
var redefineAll = require('./_redefine-all');
var ctx = require('./_ctx');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var $iterDefine = require('./_iter-define');
var step = require('./_iter-step');
var setSpecies = require('./_set-species');
var DESCRIPTORS = require('./_descriptors');
var fastKey = require('./_meta').fastKey;
var validate = require('./_validate-collection');
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

},{"./_object-dp":"6QmBP","./_object-create":"16hyM","./_redefine-all":"4tsJO","./_ctx":"42ddz","./_an-instance":"5exw3","./_for-of":"3tdsh","./_iter-define":"1Zurz","./_iter-step":"EIzg9","./_set-species":"39n2x","./_descriptors":"mFEkS","./_meta":"1Cn2f","./_validate-collection":"395AG"}],"395AG":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":"6iF6e"}],"4Gd6g":[function(require,module,exports) {
"use strict";
var global = require('./_global');
var $export = require('./_export');
var redefine = require('./_redefine');
var redefineAll = require('./_redefine-all');
var meta = require('./_meta');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var fails = require('./_fails');
var $iterDetect = require('./_iter-detect');
var setToStringTag = require('./_set-to-string-tag');
var inheritIfRequired = require('./_inherit-if-required');
module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY, KEY == 'delete' ? function (a) {
      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'has' ? function has(a) {
      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'get' ? function get(a) {
      return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'add' ? function add(a) {
      fn.call(this, a === 0 ? 0 : a);
      return this;
    } : function set(a, b) {
      fn.call(this, a === 0 ? 0 : a, b);
      return this;
    });
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () {
      instance.has(1);
    });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) {
      new C(iter);
    });
    // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }
  setToStringTag(C, NAME);
  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);
  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);
  return C;
};

},{"./_global":"1AbhN","./_export":"6HrtS","./_redefine":"3qCkP","./_redefine-all":"4tsJO","./_meta":"1Cn2f","./_for-of":"3tdsh","./_an-instance":"5exw3","./_is-object":"6iF6e","./_fails":"4l7xt","./_iter-detect":"63DNV","./_set-to-string-tag":"bKKsZ","./_inherit-if-required":"2fnZn"}],"571wb":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var SET = 'Set';

// 23.2 Set Objects
module.exports = require('./_collection')(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

},{"./_collection-strong":"1XR2G","./_validate-collection":"395AG","./_collection":"4Gd6g"}],"4PCNU":[function(require,module,exports) {
"use strict";
var global = require('./_global');
var each = require('./_array-methods')(0);
var redefine = require('./_redefine');
var meta = require('./_meta');
var assign = require('./_object-assign');
var weak = require('./_collection-weak');
var isObject = require('./_is-object');
var validate = require('./_validate-collection');
var NATIVE_WEAK_MAP = require('./_validate-collection');
var IS_IE11 = !global.ActiveXObject && ('ActiveXObject' in global);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;
var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};
var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};
// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')(WEAK_MAP, wrapper, methods, weak, true, true);
// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      }
      return method.call(this, a, b);
    });
  });
}

},{"./_global":"1AbhN","./_array-methods":"5W4gp","./_redefine":"3qCkP","./_meta":"1Cn2f","./_object-assign":"3136C","./_collection-weak":"W6MFy","./_is-object":"6iF6e","./_validate-collection":"395AG","./_collection":"4Gd6g"}],"W6MFy":[function(require,module,exports) {
'use strict';
var redefineAll = require('./_redefine-all');
var getWeak = require('./_meta').getWeak;
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var createArrayMethod = require('./_array-methods');
var $has = require('./_has');
var validate = require('./_validate-collection');
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

},{"./_redefine-all":"4tsJO","./_meta":"1Cn2f","./_an-object":"6oTss","./_is-object":"6iF6e","./_an-instance":"5exw3","./_for-of":"3tdsh","./_array-methods":"5W4gp","./_has":"7N59I","./_validate-collection":"395AG"}],"7dA6T":[function(require,module,exports) {
'use strict';
var weak = require('./_collection-weak');
var validate = require('./_validate-collection');
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
require('./_collection')(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

},{"./_collection-weak":"W6MFy","./_validate-collection":"395AG","./_collection":"4Gd6g"}],"60lEH":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $typed = require('./_typed');
var buffer = require('./_typed-buffer');
var anObject = require('./_an-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var isObject = require('./_is-object');
var ArrayBuffer = require('./_global').ArrayBuffer;
var speciesConstructor = require('./_species-constructor');
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);

},{"./_export":"6HrtS","./_typed":"27s7T","./_typed-buffer":"3cukN","./_an-object":"6oTss","./_to-absolute-index":"5PtP1","./_to-length":"2CZIE","./_is-object":"6iF6e","./_global":"1AbhN","./_species-constructor":"4bW3t","./_fails":"4l7xt","./_set-species":"39n2x"}],"27s7T":[function(require,module,exports) {
var global = require('./_global');
var hide = require('./_hide');
var uid = require('./_uid');
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;
var TypedArrayConstructors = ('Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array').split(',');
while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}
module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

},{"./_global":"1AbhN","./_hide":"655Uv","./_uid":"UeP6m"}],"3cukN":[function(require,module,exports) {
"use strict";
var global = require('./_global');
var DESCRIPTORS = require('./_descriptors');
var LIBRARY = require('./_library');
var $typed = require('./_typed');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var fails = require('./_fails');
var anInstance = require('./_an-instance');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var toIndex = require('./_to-index');
var gOPN = require('./_object-gopn').f;
var dP = require('./_object-dp').f;
var arrayFill = require('./_array-fill');
var setToStringTag = require('./_set-to-string-tag');
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;
// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; (buffer[i++] = m & 255, m /= 256, mLen -= 8)) ;
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; (buffer[i++] = e & 255, e /= 256, eLen -= 8)) ;
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; (e = e * 256 + buffer[i], i--, nBits -= 8)) ;
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; (m = m * 256 + buffer[i], i--, nBits -= 8)) ;
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * pow(2, e - mLen);
}
function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}
function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, {
    get: function () {
      return this[internal];
    }
  });
}
function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}
if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };
  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };
  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }
  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset) /*, littleEndian*/
    {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset) /*, littleEndian*/
    {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset) /*, littleEndian*/
    {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset) /*, littleEndian*/
    {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset) /*, littleEndian*/
    {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset) /*, littleEndian*/
    {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value) /*, littleEndian*/
    {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value) /*, littleEndian*/
    {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value) /*, littleEndian*/
    {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value) /*, littleEndian*/
    {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value) /*, littleEndian*/
    {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value) /*, littleEndian*/
    {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1);
  }) || fails(function () {
    new $ArrayBuffer();
    // eslint-disable-line no-new
    new $ArrayBuffer(1.5);
    // eslint-disable-line no-new
    new $ArrayBuffer(NaN);
    // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ) {
      if (!(((key = keys[j++]) in $ArrayBuffer))) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

},{"./_global":"1AbhN","./_descriptors":"mFEkS","./_library":"6bRLg","./_typed":"27s7T","./_hide":"655Uv","./_redefine-all":"4tsJO","./_fails":"4l7xt","./_an-instance":"5exw3","./_to-integer":"2txSQ","./_to-length":"2CZIE","./_to-index":"26ibu","./_object-gopn":"49UVz","./_object-dp":"6QmBP","./_array-fill":"6umwi","./_set-to-string-tag":"bKKsZ"}],"26ibu":[function(require,module,exports) {
// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

},{"./_to-integer":"2txSQ","./_to-length":"2CZIE"}],"6Ggp4":[function(require,module,exports) {
var $export = require('./_export');
$export($export.G + $export.W + $export.F * !require('./_typed').ABV, {
  DataView: require('./_typed-buffer').DataView
});

},{"./_export":"6HrtS","./_typed":"27s7T","./_typed-buffer":"3cukN"}],"XjCWw":[function(require,module,exports) {
require('./_typed-array')('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"6mvkJ"}],"6mvkJ":[function(require,module,exports) {
'use strict';
if (require('./_descriptors')) {
  var LIBRARY = require('./_library');
  var global = require('./_global');
  var fails = require('./_fails');
  var $export = require('./_export');
  var $typed = require('./_typed');
  var $buffer = require('./_typed-buffer');
  var ctx = require('./_ctx');
  var anInstance = require('./_an-instance');
  var propertyDesc = require('./_property-desc');
  var hide = require('./_hide');
  var redefineAll = require('./_redefine-all');
  var toInteger = require('./_to-integer');
  var toLength = require('./_to-length');
  var toIndex = require('./_to-index');
  var toAbsoluteIndex = require('./_to-absolute-index');
  var toPrimitive = require('./_to-primitive');
  var has = require('./_has');
  var classof = require('./_classof');
  var isObject = require('./_is-object');
  var toObject = require('./_to-object');
  var isArrayIter = require('./_is-array-iter');
  var create = require('./_object-create');
  var getPrototypeOf = require('./_object-gpo');
  var gOPN = require('./_object-gopn').f;
  var getIterFn = require('./core.get-iterator-method');
  var uid = require('./_uid');
  var wks = require('./_wks');
  var createArrayMethod = require('./_array-methods');
  var createArrayIncludes = require('./_array-includes');
  var speciesConstructor = require('./_species-constructor');
  var ArrayIterators = require('./es6.array.iterator');
  var Iterators = require('./_iterators');
  var $iterDetect = require('./_iter-detect');
  var setSpecies = require('./_set-species');
  var arrayFill = require('./_array-fill');
  var arrayCopyWithin = require('./_array-copy-within');
  var $DP = require('./_object-dp');
  var $GOPD = require('./_object-gopd');
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };

},{"./_descriptors":"mFEkS","./_library":"6bRLg","./_global":"1AbhN","./_fails":"4l7xt","./_export":"6HrtS","./_typed":"27s7T","./_typed-buffer":"3cukN","./_ctx":"42ddz","./_an-instance":"5exw3","./_property-desc":"4YYuJ","./_hide":"655Uv","./_redefine-all":"4tsJO","./_to-integer":"2txSQ","./_to-length":"2CZIE","./_to-index":"26ibu","./_to-absolute-index":"5PtP1","./_to-primitive":"6pQiL","./_has":"7N59I","./_classof":"Eaj8o","./_is-object":"6iF6e","./_to-object":"4T5XN","./_is-array-iter":"Ev5Sr","./_object-create":"16hyM","./_object-gpo":"iSGCZ","./_object-gopn":"49UVz","./core.get-iterator-method":"3vkYf","./_uid":"UeP6m","./_wks":"6UOxU","./_array-methods":"5W4gp","./_array-includes":"5BI1i","./_species-constructor":"4bW3t","./es6.array.iterator":"y678t","./_iterators":"4Rtsu","./_iter-detect":"63DNV","./_set-species":"39n2x","./_array-fill":"6umwi","./_array-copy-within":"14s9q","./_object-dp":"6QmBP","./_object-gopd":"wMJzi"}],"1LOTt":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"6mvkJ"}],"s9lX2":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

},{"./_typed-array":"6mvkJ"}],"4vsAw":[function(require,module,exports) {
require('./_typed-array')('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"6mvkJ"}],"3F7v0":[function(require,module,exports) {
require('./_typed-array')('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"6mvkJ"}],"5ZxsK":[function(require,module,exports) {
require('./_typed-array')('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"6mvkJ"}],"2fUF6":[function(require,module,exports) {
require('./_typed-array')('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"6mvkJ"}],"1wziE":[function(require,module,exports) {
require('./_typed-array')('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"6mvkJ"}],"4Tiwa":[function(require,module,exports) {
require('./_typed-array')('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"6mvkJ"}],"16yfo":[function(require,module,exports) {
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./_export');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var rApply = (require('./_global').Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !require('./_fails')(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

},{"./_export":"6HrtS","./_a-function":"rEgnK","./_an-object":"6oTss","./_global":"1AbhN","./_fails":"4l7xt"}],"2m5M3":[function(require,module,exports) {
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = require('./_export');
var create = require('./_object-create');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var fails = require('./_fails');
var bind = require('./_bind');
var rConstruct = (require('./_global').Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"./_export":"6HrtS","./_object-create":"16hyM","./_a-function":"rEgnK","./_an-object":"6oTss","./_is-object":"6iF6e","./_fails":"4l7xt","./_bind":"5rwXk","./_global":"1AbhN"}],"6N2QD":[function(require,module,exports) {
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = require('./_object-dp');
var $export = require('./_export');
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_object-dp":"6QmBP","./_export":"6HrtS","./_an-object":"6oTss","./_to-primitive":"6pQiL","./_fails":"4l7xt"}],"2Dm4U":[function(require,module,exports) {
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = require('./_export');
var gOPD = require('./_object-gopd').f;
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

},{"./_export":"6HrtS","./_object-gopd":"wMJzi","./_an-object":"6oTss"}],"1ukYf":[function(require,module,exports) {
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
require('./_iter-create')(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});

},{"./_export":"6HrtS","./_an-object":"6oTss","./_iter-create":"7km0F"}],"6s8iJ":[function(require,module,exports) {
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var isObject = require('./_is-object');
var anObject = require('./_an-object');

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });

},{"./_object-gopd":"wMJzi","./_object-gpo":"iSGCZ","./_has":"7N59I","./_export":"6HrtS","./_is-object":"6iF6e","./_an-object":"6oTss"}],"5SzIx":[function(require,module,exports) {
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = require('./_object-gopd');
var $export = require('./_export');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

},{"./_object-gopd":"wMJzi","./_export":"6HrtS","./_an-object":"6oTss"}],"264Iv":[function(require,module,exports) {
// 26.1.8 Reflect.getPrototypeOf(target)
var $export = require('./_export');
var getProto = require('./_object-gpo');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

},{"./_export":"6HrtS","./_object-gpo":"iSGCZ","./_an-object":"6oTss"}],"5cHO8":[function(require,module,exports) {
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

},{"./_export":"6HrtS"}],"1rkdS":[function(require,module,exports) {
// 26.1.10 Reflect.isExtensible(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

},{"./_export":"6HrtS","./_an-object":"6oTss"}],"6RJ0p":[function(require,module,exports) {
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', { ownKeys: require('./_own-keys') });

},{"./_export":"6HrtS","./_own-keys":"7HsmW"}],"7HsmW":[function(require,module,exports) {
// all object keys, includes non-enumerable and symbols
var gOPN = require('./_object-gopn');
var gOPS = require('./_object-gops');
var anObject = require('./_an-object');
var Reflect = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

},{"./_object-gopn":"49UVz","./_object-gops":"2VjuK","./_an-object":"6oTss","./_global":"1AbhN"}],"3mP3i":[function(require,module,exports) {
// 26.1.12 Reflect.preventExtensions(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"6HrtS","./_an-object":"6oTss"}],"5nulH":[function(require,module,exports) {
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = require('./_object-dp');
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var createDesc = require('./_property-desc');
var anObject = require('./_an-object');
var isObject = require('./_is-object');

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });

},{"./_object-dp":"6QmBP","./_object-gopd":"wMJzi","./_object-gpo":"iSGCZ","./_has":"7N59I","./_export":"6HrtS","./_property-desc":"4YYuJ","./_an-object":"6oTss","./_is-object":"6iF6e"}],"1Odep":[function(require,module,exports) {
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = require('./_export');
var setProto = require('./_set-proto');

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"6HrtS","./_set-proto":"76owg"}],"6dQZ0":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export = require('./_export');
var $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');

},{"./_export":"6HrtS","./_array-includes":"5BI1i","./_add-to-unscopables":"3FW7d"}],"6RvxK":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var aFunction = require('./_a-function');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

require('./_add-to-unscopables')('flatMap');

},{"./_export":"6HrtS","./_flatten-into-array":"5gpL2","./_to-object":"4T5XN","./_to-length":"2CZIE","./_a-function":"rEgnK","./_array-species-create":"VLEo3","./_add-to-unscopables":"3FW7d"}],"5gpL2":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = require('./_is-array');
var isObject = require('./_is-object');
var toLength = require('./_to-length');
var ctx = require('./_ctx');
var IS_CONCAT_SPREADABLE = require('./_wks')('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

},{"./_is-array":"5zFGF","./_is-object":"6iF6e","./_to-length":"2CZIE","./_ctx":"42ddz","./_wks":"6UOxU"}],"pBFSd":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

require('./_add-to-unscopables')('flatten');

},{"./_export":"6HrtS","./_flatten-into-array":"5gpL2","./_to-object":"4T5XN","./_to-length":"2CZIE","./_to-integer":"2txSQ","./_array-species-create":"VLEo3","./_add-to-unscopables":"3FW7d"}],"1Ztjw":[function(require,module,exports) {
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./_export');
var $at = require('./_string-at')(true);
var $fails = require('./_fails');

var FORCED = $fails(function () {
  return '𠮷'.at(0) !== '𠮷';
});

$export($export.P + $export.F * FORCED, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});

},{"./_export":"6HrtS","./_string-at":"6L84u","./_fails":"4l7xt"}],"7v62l":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

},{"./_export":"6HrtS","./_string-pad":"3RXf4","./_user-agent":"6w03P"}],"3RXf4":[function(require,module,exports) {
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length');
var repeat = require('./_string-repeat');
var defined = require('./_defined');

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_to-length":"2CZIE","./_string-repeat":"1C9SW","./_defined":"1k5kJ"}],"11JSX":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

},{"./_export":"6HrtS","./_string-pad":"3RXf4","./_user-agent":"6w03P"}],"1NINb":[function(require,module,exports) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

},{"./_string-trim":"1rS53"}],"6JKpc":[function(require,module,exports) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

},{"./_string-trim":"1rS53"}],"KNLsP":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/String.prototype.matchAll/
var $export = require('./_export');
var defined = require('./_defined');
var toLength = require('./_to-length');
var isRegExp = require('./_is-regexp');
var getFlags = require('./_flags');
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

require('./_iter-create')($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

},{"./_export":"6HrtS","./_defined":"1k5kJ","./_to-length":"2CZIE","./_is-regexp":"61LGH","./_flags":"5tcXP","./_iter-create":"7km0F"}],"1XSQw":[function(require,module,exports) {
require('./_wks-define')('asyncIterator');

},{"./_wks-define":"5RMTf"}],"5Zvc0":[function(require,module,exports) {
require('./_wks-define')('observable');

},{"./_wks-define":"5RMTf"}],"2jWlo":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = require('./_export');
var ownKeys = require('./_own-keys');
var toIObject = require('./_to-iobject');
var gOPD = require('./_object-gopd');
var createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

},{"./_export":"6HrtS","./_own-keys":"7HsmW","./_to-iobject":"4vkrL","./_object-gopd":"wMJzi","./_create-property":"2YuHS"}],"78Vx1":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

},{"./_export":"6HrtS","./_object-to-array":"2xYbP"}],"2xYbP":[function(require,module,exports) {
var DESCRIPTORS = require('./_descriptors');
var getKeys = require('./_object-keys');
var toIObject = require('./_to-iobject');
var isEnum = require('./_object-pie').f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

},{"./_descriptors":"mFEkS","./_object-keys":"myJjn","./_to-iobject":"4vkrL","./_object-pie":"7AfA5"}],"2qORs":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

},{"./_export":"6HrtS","./_object-to-array":"2xYbP"}],"7o4EC":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});

},{"./_export":"6HrtS","./_to-object":"4T5XN","./_a-function":"rEgnK","./_object-dp":"6QmBP","./_descriptors":"mFEkS","./_object-forced-pam":"1vXWH"}],"1vXWH":[function(require,module,exports) {
'use strict';
// Forced replacement prototype accessors methods
module.exports = require('./_library') || !require('./_fails')(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete require('./_global')[K];
});

},{"./_library":"6bRLg","./_fails":"4l7xt","./_global":"1AbhN"}],"7t0KY":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});

},{"./_export":"6HrtS","./_to-object":"4T5XN","./_a-function":"rEgnK","./_object-dp":"6QmBP","./_descriptors":"mFEkS","./_object-forced-pam":"1vXWH"}],"6dOOD":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"6HrtS","./_to-object":"4T5XN","./_to-primitive":"6pQiL","./_object-gpo":"iSGCZ","./_object-gopd":"wMJzi","./_descriptors":"mFEkS","./_object-forced-pam":"1vXWH"}],"3qEZR":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"6HrtS","./_to-object":"4T5XN","./_to-primitive":"6pQiL","./_object-gpo":"iSGCZ","./_object-gopd":"wMJzi","./_descriptors":"mFEkS","./_object-forced-pam":"1vXWH"}],"4gjYB":[function(require,module,exports) {
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Map', { toJSON: require('./_collection-to-json')('Map') });

},{"./_export":"6HrtS","./_collection-to-json":"25FhB"}],"25FhB":[function(require,module,exports) {
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof');
var from = require('./_array-from-iterable');
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

},{"./_classof":"Eaj8o","./_array-from-iterable":"1Mm9e"}],"1Mm9e":[function(require,module,exports) {
var forOf = require('./_for-of');

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":"3tdsh"}],"3uA7c":[function(require,module,exports) {
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Set', { toJSON: require('./_collection-to-json')('Set') });

},{"./_export":"6HrtS","./_collection-to-json":"25FhB"}],"2Fp9M":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
require('./_set-collection-of')('Map');

},{"./_set-collection-of":"648ZM"}],"648ZM":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

},{"./_export":"6HrtS"}],"5ZB3l":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
require('./_set-collection-of')('Set');

},{"./_set-collection-of":"648ZM"}],"2Tngq":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
require('./_set-collection-of')('WeakMap');

},{"./_set-collection-of":"648ZM"}],"26qMp":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
require('./_set-collection-of')('WeakSet');

},{"./_set-collection-of":"648ZM"}],"4O7Wj":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
require('./_set-collection-from')('Map');

},{"./_set-collection-from":"5aBPb"}],"5aBPb":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');
var aFunction = require('./_a-function');
var ctx = require('./_ctx');
var forOf = require('./_for-of');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

},{"./_export":"6HrtS","./_a-function":"rEgnK","./_ctx":"42ddz","./_for-of":"3tdsh"}],"3ULJG":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
require('./_set-collection-from')('Set');

},{"./_set-collection-from":"5aBPb"}],"74ZW8":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
require('./_set-collection-from')('WeakMap');

},{"./_set-collection-from":"5aBPb"}],"78I7i":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
require('./_set-collection-from')('WeakSet');

},{"./_set-collection-from":"5aBPb"}],"337mA":[function(require,module,exports) {
// https://github.com/tc39/proposal-global
var $export = require('./_export');

$export($export.G, { global: require('./_global') });

},{"./_export":"6HrtS","./_global":"1AbhN"}],"4SqsN":[function(require,module,exports) {
// https://github.com/tc39/proposal-global
var $export = require('./_export');

$export($export.S, 'System', { global: require('./_global') });

},{"./_export":"6HrtS","./_global":"1AbhN"}],"7mtJz":[function(require,module,exports) {
// https://github.com/ljharb/proposal-is-error
var $export = require('./_export');
var cof = require('./_cof');

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});

},{"./_export":"6HrtS","./_cof":"391EE"}],"4Hl81":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});

},{"./_export":"6HrtS"}],"6j5bg":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });

},{"./_export":"6HrtS"}],"7lTSZ":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});

},{"./_export":"6HrtS"}],"4jZIB":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var scale = require('./_math-scale');
var fround = require('./_math-fround');

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});

},{"./_export":"6HrtS","./_math-scale":"1tTTS","./_math-fround":"5saRe"}],"1tTTS":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};

},{}],"6RJpj":[function(require,module,exports) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

},{"./_export":"6HrtS"}],"1LnWe":[function(require,module,exports) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

},{"./_export":"6HrtS"}],"1l6Mt":[function(require,module,exports) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

},{"./_export":"6HrtS"}],"1UxS8":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });

},{"./_export":"6HrtS"}],"1EA9b":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});

},{"./_export":"6HrtS"}],"5UaXq":[function(require,module,exports) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = require('./_export');

$export($export.S, 'Math', { scale: require('./_math-scale') });

},{"./_export":"6HrtS","./_math-scale":"1tTTS"}],"6Q4Ai":[function(require,module,exports) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

},{"./_export":"6HrtS"}],"2jJP7":[function(require,module,exports) {
// http://jfbastien.github.io/papers/Math.signbit.html
var $export = require('./_export');

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });

},{"./_export":"6HrtS"}],"49exs":[function(require,module,exports) {
// https://github.com/tc39/proposal-promise-finally
"use strict";
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');
$export($export.P + $export.R, 'Promise', {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, core.Promise || global.Promise);
    var isFunction = typeof onFinally == 'function';
    return this.then(isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () {
        return x;
      });
    } : onFinally, isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () {
        throw e;
      });
    } : onFinally);
  }
});

},{"./_export":"6HrtS","./_core":"PUJRD","./_global":"1AbhN","./_species-constructor":"4bW3t","./_promise-resolve":"7xDZg"}],"2F6Bz":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = require('./_export');
var newPromiseCapability = require('./_new-promise-capability');
var perform = require('./_perform');

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"./_export":"6HrtS","./_new-promise-capability":"ihRV9","./_perform":"X6BaR"}],"530Zt":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });

},{"./_metadata":"3Eoqa","./_an-object":"6oTss"}],"3Eoqa":[function(require,module,exports) {
var Map = require('./es6.map');
var $export = require('./_export');
var shared = require('./_shared')('metadata');
var store = shared.store || (shared.store = new (require('./es6.weak-map'))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

},{"./es6.map":"2u9yM","./_export":"6HrtS","./_shared":"1RNy5","./es6.weak-map":"4PCNU"}],"1Mmy1":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });

},{"./_metadata":"3Eoqa","./_an-object":"6oTss"}],"1A1pF":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_metadata":"3Eoqa","./_an-object":"6oTss","./_object-gpo":"iSGCZ"}],"4IXbg":[function(require,module,exports) {
var Set = require('./es6.set');
var from = require('./_array-from-iterable');
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });

},{"./es6.set":"571wb","./_array-from-iterable":"1Mm9e","./_metadata":"3Eoqa","./_an-object":"6oTss","./_object-gpo":"iSGCZ"}],"hyHHS":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_metadata":"3Eoqa","./_an-object":"6oTss"}],"1l63q":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });

},{"./_metadata":"3Eoqa","./_an-object":"6oTss"}],"7kyN4":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var getPrototypeOf = require('./_object-gpo');
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_metadata":"3Eoqa","./_an-object":"6oTss","./_object-gpo":"iSGCZ"}],"1tSyb":[function(require,module,exports) {
var metadata = require('./_metadata');
var anObject = require('./_an-object');
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });

},{"./_metadata":"3Eoqa","./_an-object":"6oTss"}],"4Fpxx":[function(require,module,exports) {
var $metadata = require('./_metadata');
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });

},{"./_metadata":"3Eoqa","./_an-object":"6oTss","./_a-function":"rEgnK"}],"1PsDB":[function(require,module,exports) {
// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = require('./_export');
var microtask = require('./_microtask')();
var process = require('./_global').process;
var isNode = require('./_cof')(process) == 'process';
$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

},{"./_export":"6HrtS","./_microtask":"4fFoJ","./_global":"1AbhN","./_cof":"391EE"}],"u4OBN":[function(require,module,exports) {
"use strict";
// https://github.com/zenparsing/es-observable
var $export = require('./_export');
var global = require('./_global');
var core = require('./_core');
var microtask = require('./_microtask')();
var OBSERVABLE = require('./_wks')('observable');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var anInstance = require('./_an-instance');
var redefineAll = require('./_redefine-all');
var hide = require('./_hide');
var forOf = require('./_for-of');
var RETURN = forOf.RETURN;
var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};
var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};
var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};
var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};
var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () {
        subscription.unsubscribe();
      }; else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  }
  if (subscriptionClosed(this)) cleanupSubscription(this);
};
Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() {
    closeSubscription(this);
  }
});
var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};
SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    }
    cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      }
      cleanupSubscription(subscription);
      return value;
    }
  }
});
var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};
redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});
redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          }
          observer.complete();
        }
      });
      return function () {
        done = true;
      };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l; ) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          }
          observer.complete();
        }
      });
      return function () {
        done = true;
      };
    });
  }
});
hide($Observable.prototype, OBSERVABLE, function () {
  return this;
});
$export($export.G, {
  Observable: $Observable
});
require('./_set-species')('Observable');

},{"./_export":"6HrtS","./_global":"1AbhN","./_core":"PUJRD","./_microtask":"4fFoJ","./_wks":"6UOxU","./_a-function":"rEgnK","./_an-object":"6oTss","./_an-instance":"5exw3","./_redefine-all":"4tsJO","./_hide":"655Uv","./_for-of":"3tdsh","./_set-species":"39n2x"}],"2XYjM":[function(require,module,exports) {
// ie9- setTimeout & setInterval additional parameters fix
var global = require('./_global');
var $export = require('./_export');
var userAgent = require('./_user-agent');
var slice = [].slice;
var MSIE = (/MSIE .\./).test(userAgent);
// <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time) /*, ...args*/
  {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

},{"./_global":"1AbhN","./_export":"6HrtS","./_user-agent":"6w03P"}],"6ns5g":[function(require,module,exports) {
var $export = require('./_export');
var $task = require('./_task');
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

},{"./_export":"6HrtS","./_task":"5HJ8z"}],"5umMF":[function(require,module,exports) {
var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;
var DOMIterables = {
  CSSRuleList: true,
  // TODO: Not spec compliant, should be false.
  // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true,
  // TODO: Not spec compliant, should be false.
  // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true,
  // TODO: Not spec compliant, should be false.
  // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};
for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./es6.array.iterator":"y678t","./_object-keys":"myJjn","./_redefine":"3qCkP","./_global":"1AbhN","./_hide":"655Uv","./_iterators":"4Rtsu","./_wks":"6UOxU"}],"7iRTl":[function(require,module,exports) {
var global = arguments[3];
/**
* Copyright (c) 2014, Facebook, Inc.
* All rights reserved.
*
* This source code is licensed under the BSD-style license found in the
* https://raw.github.com/facebook/regenerator/master/LICENSE file. An
* additional grant of patent rights can be found in the PATENTS file in
* the same directory.
*/
!(function (global) {
  "use strict";
  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined;
  // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }
  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);
    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }
  runtime.wrap = wrap;
  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";
  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};
  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };
  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";
  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }
  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };
  runtime.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!((toStringTagSymbol in genFun))) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };
  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function (arg) {
    return {
      __await: arg
    };
  };
  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }
        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }
    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }
    var previousPromise;
    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }
      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }
    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }
  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;
  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
    return runtime.isGeneratorFunction(outerFn) ? iter : // If outerFn is a generator, return the full iterator.
    iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };
  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }
      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }
        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }
      context.method = method;
      context.arg = arg;
      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }
          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }
        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;
          if (record.arg === ContinueSentinel) {
            continue;
          }
          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }
  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;
      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);
          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }
        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }
    var info = record.arg;
    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }
    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;
      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;
      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }
    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }
  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);
  Gp[toStringTagSymbol] = "Generator";
  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function () {
    return this;
  };
  Gp.toString = function () {
    return "[object Generator]";
  };
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    if ((1 in locs)) {
      entry.catchLoc = locs[1];
    }
    if ((2 in locs)) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }
    this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || ({});
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }
  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }
  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();
    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if ((key in object)) {
          next.value = key;
          next.done = false;
          return next;
        }
      }
      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }
      if (typeof iterable.next === "function") {
        return iterable;
      }
      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }
          next.value = undefined;
          next.done = true;
          return next;
        };
        return next.next = next;
      }
    }
    // Return an iterator with no values.
    return {
      next: doneResult
    };
  }
  runtime.values = values;
  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }
  Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);
      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function () {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) {
        throw exception;
      }
      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }
        return !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;
        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }
      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;
      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }
      return this.complete(record);
    },
    complete: function (record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }
      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
      return ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };
      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }
      return ContinueSentinel;
    }
  };
})(// Among the various tricks for obtaining a reference to the global
// object, this seems to be the most reliable technique that does not
// use indirect eval (which violates Content Security Policy).
typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : this);

},{}],"2QVCF":[function(require,module,exports) {
require('../../modules/core.regexp.escape');
module.exports = require('../../modules/_core').RegExp.escape;

},{"../../modules/core.regexp.escape":"6aHVN","../../modules/_core":"PUJRD"}],"6aHVN":[function(require,module,exports) {
// https://github.com/benjamingr/RexExp.escape
var $export = require('./_export');
var $re = require('./_replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });

},{"./_export":"6HrtS","./_replacer":"1vJ2e"}],"1vJ2e":[function(require,module,exports) {
module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};

},{}],"2qj3L":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return BookView;
});
var _View2 = require("./View");
var _config = require("../config");
var _Thumbnail = require("./Thumbnail");
var _ThumbnailDefault = _parcelHelpers.interopDefault(_Thumbnail);
var _utilsUtils = require("../utils/Utils");
var _utilsUtilsDefault = _parcelHelpers.interopDefault(_utilsUtils);
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || (/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/).test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(receiver);
      }
      return desc.value;
    };
  }
  return _get(target, property, receiver || target);
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
var BookView = /*#__PURE__*/(function (_View) {
  _inherits(BookView, _View);
  var _super = _createSuper(BookView);
  function BookView(id, onSettingsClicked) {
    var _this;
    _classCallCheck(this, BookView);
    _this = _super.call(this, id);
    var settingsButton = _this._element.getElementsByClassName("button settings")[0];
    _utilsUtilsDefault.default.addClick(settingsButton, function () {
      return onSettingsClicked();
    });
    return _this;
  }
  _createClass(BookView, [{
    key: "show",
    value: function show() {
      _get(_getPrototypeOf(BookView.prototype), "show", this).call(this);
      this.createImages();
    }
  }, {
    key: "hide",
    value: function hide() {
      _get(_getPrototypeOf(BookView.prototype), "hide", this).call(this);
      if (this._thumbnails) {
        var _iterator = _createForOfIteratorHelper(this._thumbnails), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var thumbnail = _step.value;
            thumbnail.remove();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        this._thumbnails = null;
      }
    }
  }, {
    key: "createImages",
    value: function createImages() {
      var _this2 = this;
      // if (this._thumbnails){
      // return;
      // }
      this._thumbnails = [];
      for (var i = 0; i < _config.config.imageCount; i++) {
        var imageId = ("image").concat(("" + (i + 1)).padStart(2, "0"));
        var thumbnail = new _ThumbnailDefault.default(this._element, imageId, function (id) {
          return _this2.onImageSelected(id);
        });
        this._thumbnails.push(thumbnail);
      }
    }
  }]);
  return BookView;
})(_View2.View);

},{"./View":"30r6k","../config":"1tzQg","./Thumbnail":"6v2zT","../utils/Utils":"1H53o","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"30r6k":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "View", function () {
  return View;
});
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
var View = /*#__PURE__*/(function () {
  function View(id) {
    _classCallCheck(this, View);
    this._element = document.getElementById(id);
    if (!this._element) {
      console.error(("Could not find element with id ").concat(id));
    }
    this.hide();
  }
  _createClass(View, [{
    key: "clear",
    value: function clear() {
      while (this._element.hasChildNodes()) {
        this._element.removeChild(this._element.firstChild);
      }
    }
  }, {
    key: "show",
    value: function show() {
      this._element.classList.remove("hidden");
    }
  }, {
    key: "hide",
    value: function hide() {
      this._element.classList.add("hidden");
    }
  }, {
    key: "setVisible",
    value: function setVisible(visible) {
      this._element.classList.toggle("hidden", !visible);
    }
  }, {
    key: "isVisible",
    value: function isVisible() {
      return !this._element.classList.contains("hidden");
    }
  }]);
  return View;
})();

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"7jvX3":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"1tzQg":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "config", function () {
  return config;
});
var defaultShapes = ["img/stamps/star.png", "img/stamps/unicorn.png", "img/stamps/snowman.png", "img/stamps/dolphin.png", "img/stamps/snail.png"];
var config = {
  debug: false,
  doubleTapDelay: 400,
  longClickDelay: 1000,
  minScrollDistance: 30,
  maxScrollDelay: 500,
  maxShapeCount: 64 - defaultShapes.length,
  fullScreenCanvas: true,
  // If true fills the whole screen with the canvas, if false makes sure the whole canvas fits on the screen
  // If true fills the whole screen with the canvas, if false makes sure the whole canvas fits on the screen
  pixelPerfect: false,
  // Make sure to perform painting operations on rounded pixel positions
  // Make sure to perform painting operations on rounded pixel positions
  imageSmoothing: true,
  // Whether to use smooth pixel filtering or to draw hard pixel edges
  // Whether to use smooth pixel filtering or to draw hard pixel edges
  useAutoMask: false,
  maxUndoSteps: 10,
  saveInterval: 5000,
  width: 1024,
  height: 768,
  defaultShapes: defaultShapes,
  imageCount: 32,
  images: {
    "image01": {
      overlay: "./img/overlays/spirit.png"
    },
    "image02": {
      overlay: "./img/overlays/spirit2.png"
    },
    "image03": {
      overlay: "./img/overlays/spirit3.png"
    },
    "image04": {
      overlay: "./img/overlays/santa.png"
    }
  }
};

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"6v2zT":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return Thumbnail;
});
var _utilsUtils = require("../utils/Utils");
var _utilsUtilsDefault = _parcelHelpers.interopDefault(_utilsUtils);
var _storageImageStorage = require("../storage/ImageStorage");
var _storageImageStorageDefault = _parcelHelpers.interopDefault(_storageImageStorage);
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
var Thumbnail = /*#__PURE__*/(function () {
  _createClass(Thumbnail, [{
    key: "id",
    get: function get() {
      return this._element.id;
    }
  }, {
    key: "imageUrl",
    set: function set(src) {
      this._imageUrl = src;
      this.updateBackgroundImages();
    }
  }, {
    key: "overlayUrl",
    set: function set(src) {
      this._overlayUrl = src;
      this.updateBackgroundImages();
    }
  }]);
  function Thumbnail(parent, id, onImageSelected) {
    _classCallCheck(this, Thumbnail);
    var element = document.createElement("div");
    this._element = element;
    element.id = id;
    element.classList.add("thumbnail");
    // Utils.addLongClick(element, () => {
    // if (!this._image || !PeerToPeer.instance || !PeerToPeer.instance.loggedIn || PeerToPeer.instance.peerList.length < 2){
    // return;
    // }
    // 
    // Utils.imageToBlob(this._image)
    // .then(blob => {
    // const peerName = PeerToPeer.instance.peerList[1];
    // PeerToPeer.instance.sendData(peerName, blob);
    // });
    // });
    _utilsUtilsDefault.default.addClick(element, function () {
      if (onImageSelected) {
        onImageSelected(id);
      }
    }, true);
    // ImageStorage.addChangeListener((change: string, id: string) => {
    // if (change == "save" && id == this.id) {
    // this.loadImage();
    // }
    // });
    this.overlayUrl = _utilsUtilsDefault.default.getImageOverlayUrl(id);
    parent.appendChild(element);
    this.loadImage();
  }
  _createClass(Thumbnail, [{
    key: "remove",
    value: function remove() {
      this._element.remove();
    }
  }, {
    key: "loadImage",
    value: function loadImage() {
      var _this = this;
      _storageImageStorageDefault.default.loadBlob(this.id).then(function (blob) {
        _this.imageUrl = blob ? URL.createObjectURL(blob) : null;
      });
    }
  }, {
    key: "updateBackgroundImages",
    value: function updateBackgroundImages() {
      var urls = [];
      if (this._overlayUrl) {
        urls.push(("url(").concat(this._overlayUrl, ")"));
      }
      if (this._imageUrl) {
        urls.push(("url(").concat(this._imageUrl, ")"));
      }
      this._element.style.backgroundImage = urls.join(",");
    }
  }]);
  return Thumbnail;
})();

},{"../utils/Utils":"1H53o","../storage/ImageStorage":"3kpel","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"1H53o":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return Utils;
});
var _Point = require("./Point");
var _PointDefault = _parcelHelpers.interopDefault(_Point);
var _config = require("../config");
var _Rect = require("./Rect");
var _RectDefault = _parcelHelpers.interopDefault(_Rect);
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
var Pressure = require('pressure');
var _times = [];
var _fps = 60;
var _fpsDisplay;
var _fpsCounterEnabled = true;
var Utils = /*#__PURE__*/(function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }
  _createClass(Utils, null, [{
    key: "imageToBlob",
    value: function imageToBlob(image) {
      var canvas = document.createElement("canvas");
      canvas.id = "imageToCanvas";
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      var ctx = canvas.getContext("2d", {
        alpha: true
      });
      ctx.drawImage(image, 0, 0);
      return new Promise(function (resolve) {
        canvas.toBlob(function (blob) {
          return resolve(blob);
        });
      });
    }
  }, {
    key: "pointerEventsSupported",
    value: function pointerEventsSupported() {
      return window.PointerEvent != null;
    }
  }, {
    key: "getImageOverlayUrl",
    value: function getImageOverlayUrl(id) {
      var _config$images$id;
      return (_config$images$id = _config.config.images[id]) === null || _config$images$id === void 0 ? void 0 : _config$images$id.overlay;
    }
  }, {
    key: "log",
    value: function log(message) {
      if (!_config.config.debug) {
        return;
      }
      for (var _len = arguments.length, optionalParams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        optionalParams[_key - 1] = arguments[_key];
      }
      console.log(message, optionalParams);
    }
  }, {
    key: "updateFPSCounter",
    value: function updateFPSCounter() {
      if (!_fpsCounterEnabled) {
        return false;
      }
      var now = performance.now();
      while (_times.length > 0 && _times[0] <= now - 1000) {
        _times.shift();
      }
      _times.push(now);
      _fps = Math.min(60, this.lerp(_fps, _times.length, 0.1));
      if (_fpsDisplay == null) {
        _fpsDisplay = document.getElementById("fps-counter");
        if (_fpsDisplay == null) {
          this.log("Could not find fps counter element. Disabling fps counter.");
          _fpsCounterEnabled = false;
          return;
        }
      }
      _fpsDisplay.innerText = _fps.toFixed(0);
    }
  }, {
    key: "addClick",
    value: function addClick(element, callback) {
      var supportScrolling = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var scrollStartX;
      var scrollStartY;
      var touchId;
      var isTracking;
      var startTimeStamp;
      var scrolled;
      element.addEventListener("touchstart", touchStart);
      element.addEventListener("mouseup", mouseUp);
      function mouseUp(event) {
        event.preventDefault();
        event.stopPropagation();
        callback.call(event.target, event);
      }
      function touchStart(event) {
        if (!supportScrolling) {
          event.preventDefault();
        }
        if (isTracking || event.touches.length > 1) {
          return;
        }
        var touch = event.changedTouches[0];
        isTracking = true;
        touchId = touch.identifier;
        scrolled = false;
        scrollStartX = touch.pageX;
        scrollStartY = touch.pageY;
        startTimeStamp = event.timeStamp;
        element.classList.add("down");
        element.addEventListener("touchmove", touchMove);
        element.addEventListener("touchend", touchEnd);
      }
      function touchMove(event) {
        if (!supportScrolling) {
          event.preventDefault();
        }
        if (!isTracking) {
          return;
        }
        var touch = event.changedTouches[0];
        // user dragged out of the element:
        if (document.elementFromPoint(touch.pageX, touch.pageY) != event.target) {
          isTracking = false;
          element.classList.remove("down");
        }
        if (scrolled || event.timeStamp < startTimeStamp + _config.config.maxScrollDelay) {
          if (supportScrolling && (Math.abs(touch.pageX - scrollStartX) > _config.config.minScrollDistance || Math.abs(touch.pageY - scrollStartY) > _config.config.minScrollDistance)) {
            isTracking = false;
            element.classList.remove("down");
          }
        }
        // After tapping and holding for a while the element does not start scrolling any more.
        // In that case we don't want perform the scroll check above any more:
        if (event.timeStamp < startTimeStamp + _config.config.maxScrollDelay) {
          if (Math.abs(touch.pageX - scrollStartX) > 2 || Math.abs(touch.pageY - scrollStartY) > 2) {
            scrolled = true;
          }
        }
      }
      function touchEnd(event) {
        event.preventDefault();
        element.removeEventListener("touchmove", touchMove);
        element.removeEventListener("touchend", touchEnd);
        element.classList.remove("down");
        if (!isTracking) {
          return;
        }
        isTracking = false;
        touchId = null;
        callback.call(event.target, event);
      }
    }
  }, {
    key: "addLongClick",
    value: function addLongClick(element, callback) {
      var timer;
      var caller = this;
      var called = false;
      element.addEventListener("touchstart", down);
      element.addEventListener("touchend", up);
      element.addEventListener("mousedown", down);
      element.addEventListener("mouseup", up);
      function down(event) {
        called = false;
        timer = setTimeout(function () {
          callback.call(caller, event);
          called = true;
        }, _config.config.longClickDelay);
      }
      function up(event) {
        if (called) {
          event.stopImmediatePropagation();
          element.classList.remove("down");
          called = false;
        } else {
          clearTimeout(timer);
        }
      }
    }
  }, {
    key: "createNewImageId",
    value: function createNewImageId() {
      return Date.now().toString();
    }
  }, {
    key: "lerp",
    value: function lerp(a, b, alpha) {
      return a * (1 - alpha) + b * alpha;
    }
  }, {
    key: "clamp",
    value: function clamp(lower, upper, n) {
      return Math.min(upper, Math.max(lower, n));
    }
  }, {
    key: "lerpColor",
    value: function lerpColor(color1, color2, alpha) {
      if (alpha == 0) {
        return color1;
      }
      if (alpha == 1) {
        return color2;
      }
      var aa = (color1 & 0xff000000) >> 24;
      var ba = (color1 & 0x00ff0000) >> 16;
      var ga = (color1 & 0x0000ff00) >> 8;
      var ra = color1 & 0x000000ff;
      var ab = (color2 & 0xff000000) >> 24;
      var bb = (color2 & 0x00ff0000) >> 16;
      var gb = (color2 & 0x0000ff00) >> 8;
      var rb = color2 & 0x000000ff;
      var r = Math.floor(Utils.lerp(ra, rb, alpha));
      var g = Math.floor(Utils.lerp(ga, gb, alpha));
      var b = Math.floor(Utils.lerp(ba, bb, alpha));
      var a = 255;
      // Math.floor(Utils.lerp(aa, ab, alpha));
      return r + (g << 8) + (b << 16) + 0xFF000000;
    }
  }, {
    key: "lerpCanvas",
    value: function lerpCanvas(ctxA, ctxB, ctxMask) {
      var width = ctxA.canvas.width;
      var height = ctxA.canvas.height;
      var dataA = ctxA.getImageData(0, 0, width, height);
      var dataB = ctxB.getImageData(0, 0, width, height);
      var dataMask = ctxMask.getImageData(0, 0, width, height);
      var a32 = new Uint8ClampedArray(dataA.data.buffer);
      var b32 = new Uint8ClampedArray(dataB.data.buffer);
      var m32 = new Uint8ClampedArray(dataMask.data.buffer);
      for (var i = 0; i < width * height; i++) {
        var a = m32[i * 4 + 3] / 255;
        a32[i * 4 + 0] = (1 - a) * a32[i * 4 + 0] + a * b32[i * 4 + 0];
        a32[i * 4 + 1] = (1 - a) * a32[i * 4 + 1] + a * b32[i * 4 + 1];
        a32[i * 4 + 2] = (1 - a) * a32[i * 4 + 2] + a * b32[i * 4 + 2];
        a32[i * 4 + 3] = (1 - a) * a32[i * 4 + 3] + a * b32[i * 4 + 3];
      }
      ctxA.putImageData(dataA, 0, 0);
    }
  }, {
    key: "stringToColor",
    value: function stringToColor(h) {
      var r = 0, g = 0, b = 0;
      if (h.length == 4) {
        r = parseInt(h[1] + h[1], 16);
        g = parseInt(h[2] + h[2], 16);
        b = parseInt(h[3] + h[3], 16);
      } else {
        r = parseInt(h[1] + h[2], 16);
        g = parseInt(h[3] + h[4], 16);
        b = parseInt(h[5] + h[6], 16);
      }
      return 0xFF000000 + r + (g << 8) + (b << 16);
    }
  }, {
    key: "floodFill",
    value: function floodFill(sourceCtx, mask, startPosition, color) {
      var threshold = 0.5;
      var width = sourceCtx.canvas.width;
      var height = sourceCtx.canvas.height;
      var sourceData = sourceCtx.getImageData(0, 0, width, height);
      var sourcePixels = sourceData.data;
      startPosition = startPosition.copy().round();
      var startIndex = startPosition.x + startPosition.y * width;
      // const startR = sourcePixels[startIndex * 4];
      // const startG = sourcePixels[startIndex * 4 + 1];
      // const startB = sourcePixels[startIndex * 4 + 2];
      // const startA = sourcePixels[startIndex * 4 + 3];
      var startR = parseInt(color[1] + color[2], 16);
      var startG = parseInt(color[3] + color[4], 16);
      var startB = parseInt(color[5] + color[6], 16);
      // take into account that transparent pixels appear white (due to white bg) but their rgb value is 0:
      // const startBrightness = startA < 5 ? 255 : 0.333 * (startR + startG + startB);
      var startBrightness = 0.333 * (startR + startG + startB);
      // clear alpha channel:
      for (var i = 0; i < width * height; i++) {
        mask[i * 4 + 3] = 0;
      }
      // start at multiple positions around start position:
      var stack = [];
      stack.push(startPosition);
      if (startPosition.x > 1) {
        stack.push(new _PointDefault.default(startPosition.x - 2, startPosition.y));
      }
      if (startPosition.x < width - 2) {
        stack.push(new _PointDefault.default(startPosition.x + 2, startPosition.y));
      }
      if (startPosition.y > 1) {
        stack.push(new _PointDefault.default(startPosition.x, startPosition.y - 2));
      }
      if (startPosition.y < height - 2) {
        stack.push(new _PointDefault.default(startPosition.x, startPosition.y + 2));
      }
      while (stack.length > 0) {
        var pos = stack.pop();
        if (isBorderPixel(pos.x, pos.y, false)) {
          continue;
        }
        var minX = scanLeft(pos.x, pos.y);
        var maxX = scanRight(pos.x, pos.y);
        addToStack(minX, maxX, pos.y - 1);
        addToStack(minX, maxX, pos.y + 1);
      }
      function scanLeft(x, y) {
        var minX = x;
        while (minX >= 0) {
          if (isBorderPixel(minX, y, true)) {
            break;
          }
          minX -= 1;
        }
        return minX + 1;
      }
      function scanRight(x, y) {
        var maxX = x + 1;
        while (maxX < width) {
          if (isBorderPixel(maxX, y, true)) {
            break;
          }
          maxX += 1;
        }
        return maxX - 1;
      }
      function addToStack(minX, maxX, y) {
        if (y < 0 || y >= height) {
          return;
        }
        for (var x = minX; x <= maxX; x++) {
          if (isBorderPixel(x, y, false)) {
            continue;
          }
          stack.push(new _PointDefault.default(x, y));
        }
      }
      function isBorderPixel(x, y, setValue) {
        var index = (x + y * width) * 4;
        var indexA = index + 3;
        if (mask[indexA]) {
          return true;
        }
        var r = sourcePixels[index];
        var g = sourcePixels[index + 1];
        var b = sourcePixels[index + 2];
        var a = sourcePixels[index + 3];
        // 
        // let difference = Math.max(
        // Math.abs(r - startR),
        // Math.abs(g - startG),
        // Math.abs(b - startB),
        // Math.abs(a - startA)
        // ) / 255;
        var brightness = 0.333 * (r + g + b);
        if (a < 250 || brightness >= startBrightness) {
          if (setValue) {
            mask[indexA] = 255;
          }
          return false;
        }
        // if (difference < threshold){
        // if (setValue){
        // mask[indexA] = 255;
        // }
        // return false;
        // }
        // if (setValue) {
        // mask[indexA] = (1 - difference) * 255;
        // }
        return true;
      }
    }
  }, {
    key: "getVisiblePixelFrame",
    value: function getVisiblePixelFrame(ctx, rect) {
      var x = rect.x, y = rect.y, width = rect.width, height = rect.height;
      if (width <= 0 || height <= 0) {
        return _RectDefault.default.Empty();
      }
      var data = ctx.getImageData(x, y, width, height);
      var pixels = data.data;
      var minX = width;
      var maxX = 0;
      var minY = height;
      var maxY = 0;
      for (var cy = 0; cy < height; cy++) {
        for (var cx = 0; cx < width; cx++) {
          if (pixels[(cx + cy * width) * 4 + 3]) {
            minX = cx < minX ? cx : minX;
            maxX = cx > maxX ? cx : maxX;
            minY = cy < minY ? cy : minY;
            maxY = cy > maxY ? cy : maxY;
          }
        }
      }
      x += minX;
      y += minY;
      width = Math.max(0, maxX - minX + 1);
      height = Math.max(0, maxY - minY + 1);
      return new _RectDefault.default(x, y, width, height);
    }
  }, {
    key: "dilateMask",
    value: function dilateMask(pixels, width, height) {
      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width - 1; x++) {
          var i = (x + y * width) * 4 + 3;
          if (pixels[i + 4]) {
            pixels[i] = 255;
          }
        }
        for (var _x = width - 1; _x > 0; _x--) {
          var _i = (_x + y * width) * 4 + 3;
          if (pixels[_i - 4]) {
            pixels[_i] = 255;
          }
        }
      }
      for (var _x2 = 0; _x2 < width; _x2++) {
        for (var _y = 0; _y < height - 1; _y++) {
          var _i2 = (_x2 + _y * width) * 4 + 3;
          if (pixels[_i2 + 4 * width]) {
            pixels[_i2] = 255;
          }
        }
        for (var _y2 = height - 1; _y2 > 0; _y2--) {
          var _i3 = (_x2 + _y2 * width) * 4 + 3;
          if (pixels[_i3 - 4 * width]) {
            pixels[_i3] = 255;
          }
        }
      }
    }
  }]);
  return Utils;
})();

},{"./Point":"6AhXm","../config":"1tzQg","./Rect":"3WeR4","pressure":"7hv3G","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"6AhXm":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return Point;
});
var _Utils = require("./Utils");
var _UtilsDefault = _parcelHelpers.interopDefault(_Utils);
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
var Point = /*#__PURE__*/(function () {
  function Point(x, y) {
    _classCallCheck(this, Point);
    this.x = x;
    this.y = y;
  }
  _createClass(Point, [{
    key: "copy",
    value: function copy() {
      return new Point(this.x, this.y);
    }
  }, {
    key: "add",
    value: function add(p) {
      this.x += p.x;
      this.y += p.y;
      return this;
    }
  }, {
    key: "subtract",
    value: function subtract(p) {
      this.x -= p.x;
      this.y -= p.y;
      return this;
    }
  }, {
    key: "round",
    value: function round() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      return this;
    }
  }, {
    key: "clamp",
    value: function clamp(minX, minY, maxX, maxY) {
      this.x = _UtilsDefault.default.clamp(minX, maxX, this.x);
      this.y = _UtilsDefault.default.clamp(minY, maxY, this.y);
      return this;
    }
  }, {
    key: "length",
    value: function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var length = this.length();
      if (length == 0) {
        return;
      }
      this.x /= length;
      this.y /= length;
      return this;
    }
  }, {
    key: "scale",
    value: function scale(f) {
      this.x *= f;
      this.y *= f;
      return this;
    }
  }], [{
    key: "add",
    value: function add(a) {
      var sum = a.copy();
      for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }
      for (var _i = 0, _rest = rest; _i < _rest.length; _i++) {
        var point = _rest[_i];
        sum.x += point.x;
        sum.y += point.y;
      }
      return sum;
    }
  }, {
    key: "subtract",
    value: function subtract(a, b) {
      return new Point(a.x - b.x, a.y - b.y);
    }
  }, {
    key: "scale",
    value: function scale(p, f) {
      return new Point(p.x * f, p.y * f);
    }
  }, {
    key: "distance",
    value: function distance(a, b) {
      var dx = a.x - b.x;
      var dy = a.y - b.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }, {
    key: "center",
    value: function center(a, b) {
      return new Point(0.5 * (a.x + b.x), 0.5 * (a.y + b.y));
    }
  }, {
    key: "mirror",
    value: function mirror(p, center) {
      return new Point(2 * center.x - p.x, 2 * center.y - p.y);
    }
  }, {
    key: "lerp",
    value: function lerp(p1, p2, a) {
      return new Point(p1.x * (1 - a) + p2.x * a, p1.y * (1 - a) + p2.y * a);
    }
  }, {
    key: "cosInterp",
    value: function cosInterp(p1, p2, a) {
      var a2 = (1 - Math.cos(a * Math.PI)) / 2;
      return new Point(p1.x * (1 - a) + p2.x * a, p1.y * (1 - a2) + p2.y * a2);
    }
  }]);
  return Point;
})();

},{"./Utils":"1H53o","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"3WeR4":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return Rect;
});
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
var Rect = /*#__PURE__*/(function () {
  _createClass(Rect, [{
    key: "minX",
    get: function get() {
      return this.x;
    }
  }, {
    key: "minY",
    get: function get() {
      return this.y;
    }
  }, {
    key: "maxX",
    get: function get() {
      return this.x + this.width;
    }
  }, {
    key: "maxY",
    get: function get() {
      return this.y + this.height;
    }
  }]);
  function Rect(x, y, width, height) {
    _classCallCheck(this, Rect);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  _createClass(Rect, [{
    key: "isEmpty",
    value: function isEmpty() {
      return this.width <= 0 || this.height <= 0;
    }
  }], [{
    key: "Empty",
    value: function Empty() {
      return new Rect(0, 0, 0, 0);
    }
  }]);
  return Rect;
})();

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"7hv3G":[function(require,module,exports) {
var define;
// Pressure v2.2.0 | Created By Stuart Yamartino | MIT License | 2015 - 2020
!(function (e, t) {
  "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.Pressure = t();
})(this, function () {
  "use strict";
  function i(e) {
    return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e;
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(e);
  }
  function e(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
    (e.prototype = Object.create(t && t.prototype, {
      constructor: {
        value: e,
        writable: !0,
        configurable: !0
      }
    }), t && s(e, t));
  }
  function s(e, t) {
    return (s = Object.setPrototypeOf || (function (e, t) {
      return (e.__proto__ = t, e);
    }))(e, t);
  }
  function t(s) {
    var n = (function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return (Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0);
      } catch (e) {
        return !1;
      }
    })();
    return function () {
      var e, t = r(s);
      return (e = n ? (e = r(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), t = this, !(e = e) || "object" !== i(e) && "function" != typeof e ? (function (e) {
        if (void 0 !== e) return e;
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      })(t) : e);
    };
  }
  function r(e) {
    return (r = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
      return e.__proto__ || Object.getPrototypeOf(e);
    })(e);
  }
  function o(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  }
  function n(e, t) {
    for (var s = 0; s < t.length; s++) {
      var n = t[s];
      (n.enumerable = n.enumerable || !1, n.configurable = !0, ("value" in n) && (n.writable = !0), Object.defineProperty(e, n.key, n));
    }
  }
  function u(e, t, s) {
    return (t && n(e.prototype, t), s && n(e, s), e);
  }
  var h = {
    set: function (e, t, s) {
      y(e, t, s);
    },
    config: function (e) {
      p.set(e);
    },
    map: function () {
      return v.apply(null, arguments);
    }
  }, c = (function () {
    function n(e, t, s) {
      (o(this, n), this.routeEvents(e, t, s), this.preventSelect(e, s));
    }
    return (u(n, [{
      key: "routeEvents",
      value: function (e, t, s) {
        var n = p.get("only", s);
        this.adapter = !b || "mouse" !== n && null !== n ? !m || "pointer" !== n && null !== n ? !g || "touch" !== n && null !== n ? new l(e, t).bindUnsupportedEvent() : new d(e, t, s).bindEvents() : new f(e, t, s).bindEvents() : new a(e, t, s).bindEvents();
      }
    }, {
      key: "preventSelect",
      value: function (e, t) {
        p.get("preventSelect", t) && (e.style.webkitTouchCallout = "none", e.style.webkitUserSelect = "none", e.style.khtmlUserSelect = "none", e.style.MozUserSelect = "none", e.style.msUserSelect = "none", e.style.userSelect = "none");
      }
    }]), n);
  })(), l = (function () {
    function n(e, t, s) {
      (o(this, n), this.el = e, this.block = t, this.options = s, this.pressed = !1, this.deepPressed = !1, this.nativeSupport = !1, this.runningPolyfill = !1, this.runKey = Math.random());
    }
    return (u(n, [{
      key: "setPressed",
      value: function (e) {
        this.pressed = e;
      }
    }, {
      key: "setDeepPressed",
      value: function (e) {
        this.deepPressed = e;
      }
    }, {
      key: "isPressed",
      value: function () {
        return this.pressed;
      }
    }, {
      key: "isDeepPressed",
      value: function () {
        return this.deepPressed;
      }
    }, {
      key: "add",
      value: function (e, t) {
        this.el.addEventListener(e, t, !1);
      }
    }, {
      key: "runClosure",
      value: function (e) {
        (e in this.block) && this.block[e].apply(this.el, Array.prototype.slice.call(arguments, 1));
      }
    }, {
      key: "fail",
      value: function (e, t) {
        p.get("polyfill", this.options) ? this.runKey === t && this.runPolyfill(e) : this.runClosure("unsupported", e);
      }
    }, {
      key: "bindUnsupportedEvent",
      value: function () {
        var t = this;
        this.add(g ? "touchstart" : "mousedown", function (e) {
          return t.runClosure("unsupported", e);
        });
      }
    }, {
      key: "_startPress",
      value: function (e) {
        !1 === this.isPressed() && (this.runningPolyfill = !1, this.setPressed(!0), this.runClosure("start", e));
      }
    }, {
      key: "_startDeepPress",
      value: function (e) {
        this.isPressed() && !1 === this.isDeepPressed() && (this.setDeepPressed(!0), this.runClosure("startDeepPress", e));
      }
    }, {
      key: "_changePress",
      value: function (e, t) {
        (this.nativeSupport = !0, this.runClosure("change", e, t));
      }
    }, {
      key: "_endDeepPress",
      value: function () {
        this.isPressed() && this.isDeepPressed() && (this.setDeepPressed(!1), this.runClosure("endDeepPress"));
      }
    }, {
      key: "_endPress",
      value: function () {
        !1 === this.runningPolyfill ? (this.isPressed() && (this._endDeepPress(), this.setPressed(!1), this.runClosure("end")), this.runKey = Math.random(), this.nativeSupport = !1) : this.setPressed(!1);
      }
    }, {
      key: "deepPress",
      value: function (e, t) {
        .5 <= e ? this._startDeepPress(t) : this._endDeepPress();
      }
    }, {
      key: "runPolyfill",
      value: function (e) {
        (this.increment = 0 === p.get("polyfillSpeedUp", this.options) ? 1 : 10 / p.get("polyfillSpeedUp", this.options), this.decrement = 0 === p.get("polyfillSpeedDown", this.options) ? 1 : 10 / p.get("polyfillSpeedDown", this.options), this.setPressed(!0), this.runClosure("start", e), !1 === this.runningPolyfill && this.loopPolyfillForce(0, e));
      }
    }, {
      key: "loopPolyfillForce",
      value: function (e, t) {
        !1 === this.nativeSupport && (this.isPressed() ? (this.runningPolyfill = !0, e = 1 < e + this.increment ? 1 : e + this.increment, this.runClosure("change", e, t), this.deepPress(e, t), setTimeout(this.loopPolyfillForce.bind(this, e, t), 10)) : ((e = e - this.decrement < 0 ? 0 : e - this.decrement) < .5 && this.isDeepPressed() && (this.setDeepPressed(!1), this.runClosure("endDeepPress")), 0 === e ? (this.runningPolyfill = !1, this.setPressed(!0), this._endPress()) : (this.runClosure("change", e, t), this.deepPress(e, t), setTimeout(this.loopPolyfillForce.bind(this, e, t), 10))));
      }
    }]), n);
  })(), a = (function () {
    e(i, l);
    var n = t(i);
    function i(e, t, s) {
      return (o(this, i), n.call(this, e, t, s));
    }
    return (u(i, [{
      key: "bindEvents",
      value: function () {
        (this.add("webkitmouseforcewillbegin", this._startPress.bind(this)), this.add("mousedown", this.support.bind(this)), this.add("webkitmouseforcechanged", this.change.bind(this)), this.add("webkitmouseforcedown", this._startDeepPress.bind(this)), this.add("webkitmouseforceup", this._endDeepPress.bind(this)), this.add("mouseleave", this._endPress.bind(this)), this.add("mouseup", this._endPress.bind(this)));
      }
    }, {
      key: "support",
      value: function (e) {
        !1 === this.isPressed() && this.fail(e, this.runKey);
      }
    }, {
      key: "change",
      value: function (e) {
        this.isPressed() && 0 < e.webkitForce && this._changePress(this.normalizeForce(e.webkitForce), e);
      }
    }, {
      key: "normalizeForce",
      value: function (e) {
        return this.reachOne(v(e, 1, 3, 0, 1));
      }
    }, {
      key: "reachOne",
      value: function (e) {
        return .995 < e ? 1 : e;
      }
    }]), i);
  })(), d = (function () {
    e(i, l);
    var n = t(i);
    function i(e, t, s) {
      return (o(this, i), n.call(this, e, t, s));
    }
    return (u(i, [{
      key: "bindEvents",
      value: function () {
        (k ? (this.add("touchforcechange", this.start.bind(this)), this.add("touchstart", this.support.bind(this, 0))) : this.add("touchstart", this.startLegacy.bind(this)), this.add("touchend", this._endPress.bind(this)));
      }
    }, {
      key: "start",
      value: function (e) {
        0 < e.touches.length && (this._startPress(e), this.touch = this.selectTouch(e), this.touch && this._changePress(this.touch.force, e));
      }
    }, {
      key: "support",
      value: function (e, t, s) {
        s = 2 < arguments.length && void 0 !== s ? s : this.runKey;
        !1 === this.isPressed() && (e <= 6 ? (e++, setTimeout(this.support.bind(this, e, t, s), 10)) : this.fail(t, s));
      }
    }, {
      key: "startLegacy",
      value: function (e) {
        (this.initialForce = e.touches[0].force, this.supportLegacy(0, e, this.runKey, this.initialForce));
      }
    }, {
      key: "supportLegacy",
      value: function (e, t, s, n) {
        n !== this.initialForce ? (this._startPress(t), this.loopForce(t)) : e <= 6 ? (e++, setTimeout(this.supportLegacy.bind(this, e, t, s, n), 10)) : this.fail(t, s);
      }
    }, {
      key: "loopForce",
      value: function (e) {
        this.isPressed() && (this.touch = this.selectTouch(e), setTimeout(this.loopForce.bind(this, e), 10), this._changePress(this.touch.force, e));
      }
    }, {
      key: "selectTouch",
      value: function (e) {
        if (1 === e.touches.length) return this.returnTouch(e.touches[0], e);
        for (var t = 0; t < e.touches.length; t++) if (e.touches[t].target === this.el || this.el.contains(e.touches[t].target)) return this.returnTouch(e.touches[t], e);
      }
    }, {
      key: "returnTouch",
      value: function (e, t) {
        return (this.deepPress(e.force, t), e);
      }
    }]), i);
  })(), f = (function () {
    e(i, l);
    var n = t(i);
    function i(e, t, s) {
      return (o(this, i), n.call(this, e, t, s));
    }
    return (u(i, [{
      key: "bindEvents",
      value: function () {
        (this.add("pointerdown", this.support.bind(this)), this.add("pointermove", this.change.bind(this)), this.add("pointerup", this._endPress.bind(this)), this.add("pointerleave", this._endPress.bind(this)));
      }
    }, {
      key: "support",
      value: function (e) {
        !1 === this.isPressed() && (0 === e.pressure || .5 === e.pressure || 1 < e.pressure ? this.fail(e, this.runKey) : (this._startPress(e), this._changePress(e.pressure, e)));
      }
    }, {
      key: "change",
      value: function (e) {
        this.isPressed() && 0 < e.pressure && .5 !== e.pressure && (this._changePress(e.pressure, e), this.deepPress(e.pressure, e));
      }
    }]), i);
  })(), p = {
    polyfill: !0,
    polyfillSpeedUp: 1e3,
    polyfillSpeedDown: 0,
    preventSelect: !0,
    only: null,
    get: function (e, t) {
      return (t.hasOwnProperty(e) ? t : this)[e];
    },
    set: function (e) {
      for (var t in e) e.hasOwnProperty(t) && this.hasOwnProperty(t) && "get" != t && "set" != t && (this[t] = e[t]);
    }
  }, y = function (e, t, s) {
    var n = 2 < arguments.length && void 0 !== s ? s : {};
    if ("string" == typeof e || e instanceof String) for (var i = document.querySelectorAll(e), r = 0; r < i.length; r++) new c(i[r], t, n); else if (P(e)) new c(e, t, n); else for (r = 0; r < e.length; r++) new c(e[r], t, n);
  }, P = function (e) {
    return "object" === ("undefined" == typeof HTMLElement ? "undefined" : i(HTMLElement)) ? e instanceof HTMLElement : e && "object" === i(e) && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName;
  }, v = function (e, t, s, n, i) {
    return (e - t) * (i - n) / (s - t) + n;
  }, b = !1, g = !1, m = !1, w = !1, k = !1;
  if ("undefined" != typeof window) {
    if ("undefined" != typeof Touch) try {
      (Touch.prototype.hasOwnProperty("force") || ("force" in new Touch())) && (w = !0);
    } catch (e) {}
    (g = ("ontouchstart" in window.document) && w, b = ("onmousemove" in window.document) && ("onwebkitmouseforcechanged" in window.document) && !g, m = ("onpointermove" in window.document), k = ("ontouchforcechange" in window.document));
  }
  return h;
});

},{}],"3kpel":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return ImageStorage;
});
var _LocalForageAdapter = require("./LocalForageAdapter");
var _LocalForageAdapterDefault = _parcelHelpers.interopDefault(_LocalForageAdapter);
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || (/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/).test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this, args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
var ImageStorage = /*#__PURE__*/(function () {
  function ImageStorage() {
    _classCallCheck(this, ImageStorage);
  }
  _createClass(ImageStorage, null, [{
    key: "loadImageFromStore",
    value: function loadImageFromStore(id) {
      var _this = this;
      if (!id) {
        return Promise.reject("Could not load image from empty id.");
      }
      return this.adapter.getItem(id).then(function (blob) {
        if (!blob) {
          // Returning null will create a new image
          return Promise.resolve(null);
        }
        var img = _this.imageFromBlob(id, blob);
        if (!img) {
          return Promise.resolve(null);
        }
        if (img.decode != null) {
          return img.decode().then(function () {
            return Promise.resolve(img);
          });
        }
        return new Promise(function (resolve) {
          img.onload = function () {
            return resolve(img);
          };
        });
      });
    }
  }, {
    key: "loadImage",
    value: function loadImage(id) {
      return this.loadImageFromStore(id);
    }
  }, {
    key: "loadBlob",
    value: function loadBlob(id) {
      return this.adapter.getItem(id);
    }
  }, {
    key: "imageFromBlob",
    value: function imageFromBlob(id, blob) {
      var img = new Image();
      img.id = id;
      img.src = URL.createObjectURL(blob);
      return img;
    }
  }, {
    key: "saveImage",
    value: (function () {
      var _saveImage = _asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(id, blob) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.adapter.setItem(id, blob);
              case 3:
                _context.next = 7;
                break;
              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](0);
              case 7:
                this.dispatchChangeEvent("save", id);
              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 5]]);
      }));
      function saveImage(_x, _x2) {
        return _saveImage.apply(this, arguments);
      }
      return saveImage;
    })()
  }, {
    key: "deleteImage",
    value: function deleteImage(id) {
      var _this2 = this;
      return this.adapter.removeItem(id).then(function () {
        _this2.dispatchChangeEvent("delete", id);
      });
    }
  }, {
    key: "keys",
    value: function keys() {
      return this.adapter.keys();
    }
  }, {
    key: "addChangeListener",
    value: function addChangeListener(callback) {
      this._changeListeners = this._changeListeners || [];
      this._changeListeners.push(callback);
    }
  }, {
    key: "dispatchChangeEvent",
    value: function dispatchChangeEvent(change, id) {
      var _iterator = _createForOfIteratorHelper(this._changeListeners), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var changeListener = _step.value;
          changeListener(change, id);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "adapter",
    get: function get() {
      if (this._adapter == null) {
        this._adapter = new _LocalForageAdapterDefault.default();
      }
      return this._adapter;
    }
  }]);
  return ImageStorage;
})();

},{"./LocalForageAdapter":"6C5Ef","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"6C5Ef":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return LocalForageAdapter;
});
var _localforage = require('localforage');
var _localforageDefault = _parcelHelpers.interopDefault(_localforage);
var _StorageAdapter2 = require("./StorageAdapter");
var _StorageAdapter2Default = _parcelHelpers.interopDefault(_StorageAdapter2);
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var LocalForageAdapter = /*#__PURE__*/(function (_StorageAdapter) {
  _inherits(LocalForageAdapter, _StorageAdapter);
  var _super = _createSuper(LocalForageAdapter);
  function LocalForageAdapter() {
    var _this;
    _classCallCheck(this, LocalForageAdapter);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "_imageStore", _localforageDefault.default.createInstance({
      name: "ImageStore"
    }));
    return _this;
  }
  _createClass(LocalForageAdapter, [{
    key: "getItem",
    value: function getItem(id) {
      return this._imageStore.getItem(id);
    }
  }, {
    key: "setItem",
    value: function setItem(id, blob) {
      return this._imageStore.setItem(id, blob);
    }
  }, {
    key: "removeItem",
    value: function removeItem(id) {
      return this._imageStore.removeItem(id);
    }
  }, {
    key: "keys",
    value: function keys() {
      return this._imageStore.keys();
    }
  }, {
    key: "iterate",
    value: function iterate(param) {
      return this._imageStore.iterate(param);
    }
  }]);
  return LocalForageAdapter;
})(_StorageAdapter2Default.default);

},{"localforage":"2bpsy","./StorageAdapter":"7AI65","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"2bpsy":[function(require,module,exports) {
var define;
var global = arguments[3];
/*!
localForage -- Offline Storage, Improved
Version 1.9.0
https://localforage.github.io/localForage
(c) 2013-2017 Mozilla, Apache License 2.0
*/
(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.localforage = f();
  }
})(function () {
  var define, module, exports;
  return (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw (f.code = "MODULE_NOT_FOUND", f);
        }
        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
  })({
    1: [function (_dereq_, module, exports) {
      (function (global) {
        "use strict";
        var Mutation = global.MutationObserver || global.WebKitMutationObserver;
        var scheduleDrain;
        {
          if (Mutation) {
            var called = 0;
            var observer = new Mutation(nextTick);
            var element = global.document.createTextNode('');
            observer.observe(element, {
              characterData: true
            });
            scheduleDrain = function () {
              element.data = called = ++called % 2;
            };
          } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
            var channel = new global.MessageChannel();
            channel.port1.onmessage = nextTick;
            scheduleDrain = function () {
              channel.port2.postMessage(0);
            };
          } else if (('document' in global) && ('onreadystatechange' in global.document.createElement('script'))) {
            scheduleDrain = function () {
              // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
              // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
              var scriptEl = global.document.createElement('script');
              scriptEl.onreadystatechange = function () {
                nextTick();
                scriptEl.onreadystatechange = null;
                scriptEl.parentNode.removeChild(scriptEl);
                scriptEl = null;
              };
              global.document.documentElement.appendChild(scriptEl);
            };
          } else {
            scheduleDrain = function () {
              setTimeout(nextTick, 0);
            };
          }
        }
        var draining;
        var queue = [];
        // named nextTick for less confusing stack traces
        function nextTick() {
          draining = true;
          var i, oldQueue;
          var len = queue.length;
          while (len) {
            oldQueue = queue;
            queue = [];
            i = -1;
            while (++i < len) {
              oldQueue[i]();
            }
            len = queue.length;
          }
          draining = false;
        }
        module.exports = immediate;
        function immediate(task) {
          if (queue.push(task) === 1 && !draining) {
            scheduleDrain();
          }
        }
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    2: [function (_dereq_, module, exports) {
      "use strict";
      var immediate = _dereq_(1);
      /*istanbul ignore next*/
      function INTERNAL() {}
      var handlers = {};
      var REJECTED = ['REJECTED'];
      var FULFILLED = ['FULFILLED'];
      var PENDING = ['PENDING'];
      module.exports = Promise;
      function Promise(resolver) {
        if (typeof resolver !== 'function') {
          throw new TypeError('resolver must be a function');
        }
        this.state = PENDING;
        this.queue = [];
        this.outcome = void 0;
        if (resolver !== INTERNAL) {
          safelyResolveThenable(this, resolver);
        }
      }
      Promise.prototype["catch"] = function (onRejected) {
        return this.then(null, onRejected);
      };
      Promise.prototype.then = function (onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function' && this.state === FULFILLED || typeof onRejected !== 'function' && this.state === REJECTED) {
          return this;
        }
        var promise = new this.constructor(INTERNAL);
        if (this.state !== PENDING) {
          var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
          unwrap(promise, resolver, this.outcome);
        } else {
          this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
        }
        return promise;
      };
      function QueueItem(promise, onFulfilled, onRejected) {
        this.promise = promise;
        if (typeof onFulfilled === 'function') {
          this.onFulfilled = onFulfilled;
          this.callFulfilled = this.otherCallFulfilled;
        }
        if (typeof onRejected === 'function') {
          this.onRejected = onRejected;
          this.callRejected = this.otherCallRejected;
        }
      }
      QueueItem.prototype.callFulfilled = function (value) {
        handlers.resolve(this.promise, value);
      };
      QueueItem.prototype.otherCallFulfilled = function (value) {
        unwrap(this.promise, this.onFulfilled, value);
      };
      QueueItem.prototype.callRejected = function (value) {
        handlers.reject(this.promise, value);
      };
      QueueItem.prototype.otherCallRejected = function (value) {
        unwrap(this.promise, this.onRejected, value);
      };
      function unwrap(promise, func, value) {
        immediate(function () {
          var returnValue;
          try {
            returnValue = func(value);
          } catch (e) {
            return handlers.reject(promise, e);
          }
          if (returnValue === promise) {
            handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
          } else {
            handlers.resolve(promise, returnValue);
          }
        });
      }
      handlers.resolve = function (self, value) {
        var result = tryCatch(getThen, value);
        if (result.status === 'error') {
          return handlers.reject(self, result.value);
        }
        var thenable = result.value;
        if (thenable) {
          safelyResolveThenable(self, thenable);
        } else {
          self.state = FULFILLED;
          self.outcome = value;
          var i = -1;
          var len = self.queue.length;
          while (++i < len) {
            self.queue[i].callFulfilled(value);
          }
        }
        return self;
      };
      handlers.reject = function (self, error) {
        self.state = REJECTED;
        self.outcome = error;
        var i = -1;
        var len = self.queue.length;
        while (++i < len) {
          self.queue[i].callRejected(error);
        }
        return self;
      };
      function getThen(obj) {
        // Make sure we only access the accessor once as required by the spec
        var then = obj && obj.then;
        if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
          return function appyThen() {
            then.apply(obj, arguments);
          };
        }
      }
      function safelyResolveThenable(self, thenable) {
        // Either fulfill, reject or reject with error
        var called = false;
        function onError(value) {
          if (called) {
            return;
          }
          called = true;
          handlers.reject(self, value);
        }
        function onSuccess(value) {
          if (called) {
            return;
          }
          called = true;
          handlers.resolve(self, value);
        }
        function tryToUnwrap() {
          thenable(onSuccess, onError);
        }
        var result = tryCatch(tryToUnwrap);
        if (result.status === 'error') {
          onError(result.value);
        }
      }
      function tryCatch(func, value) {
        var out = {};
        try {
          out.value = func(value);
          out.status = 'success';
        } catch (e) {
          out.status = 'error';
          out.value = e;
        }
        return out;
      }
      Promise.resolve = resolve;
      function resolve(value) {
        if (value instanceof this) {
          return value;
        }
        return handlers.resolve(new this(INTERNAL), value);
      }
      Promise.reject = reject;
      function reject(reason) {
        var promise = new this(INTERNAL);
        return handlers.reject(promise, reason);
      }
      Promise.all = all;
      function all(iterable) {
        var self = this;
        if (Object.prototype.toString.call(iterable) !== '[object Array]') {
          return this.reject(new TypeError('must be an array'));
        }
        var len = iterable.length;
        var called = false;
        if (!len) {
          return this.resolve([]);
        }
        var values = new Array(len);
        var resolved = 0;
        var i = -1;
        var promise = new this(INTERNAL);
        while (++i < len) {
          allResolver(iterable[i], i);
        }
        return promise;
        function allResolver(value, i) {
          self.resolve(value).then(resolveFromAll, function (error) {
            if (!called) {
              called = true;
              handlers.reject(promise, error);
            }
          });
          function resolveFromAll(outValue) {
            values[i] = outValue;
            if (++resolved === len && !called) {
              called = true;
              handlers.resolve(promise, values);
            }
          }
        }
      }
      Promise.race = race;
      function race(iterable) {
        var self = this;
        if (Object.prototype.toString.call(iterable) !== '[object Array]') {
          return this.reject(new TypeError('must be an array'));
        }
        var len = iterable.length;
        var called = false;
        if (!len) {
          return this.resolve([]);
        }
        var i = -1;
        var promise = new this(INTERNAL);
        while (++i < len) {
          resolver(iterable[i]);
        }
        return promise;
        function resolver(value) {
          self.resolve(value).then(function (response) {
            if (!called) {
              called = true;
              handlers.resolve(promise, response);
            }
          }, function (error) {
            if (!called) {
              called = true;
              handlers.reject(promise, error);
            }
          });
        }
      }
    }, {
      "1": 1
    }],
    3: [function (_dereq_, module, exports) {
      (function (global) {
        "use strict";
        if (typeof global.Promise !== 'function') {
          global.Promise = _dereq_(2);
        }
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "2": 2
    }],
    4: [function (_dereq_, module, exports) {
      "use strict";
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function getIDB() {
        /*global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB*/
        try {
          if (typeof indexedDB !== 'undefined') {
            return indexedDB;
          }
          if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
          }
          if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
          }
          if (typeof OIndexedDB !== 'undefined') {
            return OIndexedDB;
          }
          if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
          }
        } catch (e) {
          return;
        }
      }
      var idb = getIDB();
      function isIndexedDBValid() {
        try {
          // Initialize IndexedDB; fall back to vendor-prefixed versions
          // if needed.
          if (!idb || !idb.open) {
            return false;
          }
          // We mimic PouchDB here;
          // 
          // We test for openDatabase because IE Mobile identifies itself
          // as Safari. Oh the lulz...
          var isSafari = typeof openDatabase !== 'undefined' && (/(Safari|iPhone|iPad|iPod)/).test(navigator.userAgent) && !(/Chrome/).test(navigator.userAgent) && !(/BlackBerry/).test(navigator.platform);
          var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;
          // Safari <10.1 does not meet our requirements for IDB support
          // (see: https://github.com/pouchdb/pouchdb/issues/5572).
          // Safari 10.1 shipped with fetch, we can use that to detect it.
          // Note: this creates issues with `window.fetch` polyfills and
          // overrides; see:
          // https://github.com/localForage/localForage/issues/856
          return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' && // some outdated implementations of IDB that appear on Samsung
          // and HTC Android devices <4.4 are missing IDBKeyRange
          // See: https://github.com/mozilla/localForage/issues/128
          // See: https://github.com/mozilla/localForage/issues/272
          typeof IDBKeyRange !== 'undefined';
        } catch (e) {
          return false;
        }
      }
      // Abstracts constructing a Blob object, so it also works in older
      // browsers that don't support the native Blob constructor. (i.e.
      // old QtWebKit versions, at least).
      // Abstracts constructing a Blob object, so it also works in older
      // browsers that don't support the native Blob constructor. (i.e.
      // old QtWebKit versions, at least).
      function createBlob(parts, properties) {
        /*global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder*/
        parts = parts || [];
        properties = properties || ({});
        try {
          return new Blob(parts, properties);
        } catch (e) {
          if (e.name !== 'TypeError') {
            throw e;
          }
          var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
          var builder = new Builder();
          for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
          }
          return builder.getBlob(properties.type);
        }
      }
      // This is CommonJS because lie is an external dependency, so Rollup
      // can just ignore it.
      if (typeof Promise === 'undefined') {
        // In the "nopromises" build this will just throw if you don't have
        // a global promise object, but it would throw anyway later.
        _dereq_(3);
      }
      var Promise$1 = Promise;
      function executeCallback(promise, callback) {
        if (callback) {
          promise.then(function (result) {
            callback(null, result);
          }, function (error) {
            callback(error);
          });
        }
      }
      function executeTwoCallbacks(promise, callback, errorCallback) {
        if (typeof callback === 'function') {
          promise.then(callback);
        }
        if (typeof errorCallback === 'function') {
          promise["catch"](errorCallback);
        }
      }
      function normalizeKey(key) {
        // Cast the key to a string, as that's all we can set as a key.
        if (typeof key !== 'string') {
          console.warn(key + ' used as a key, but it is not a string.');
          key = String(key);
        }
        return key;
      }
      function getCallback() {
        if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
          return arguments[arguments.length - 1];
        }
      }
      // Some code originally from async_storage.js in
      // [Gaia](https://github.com/mozilla-b2g/gaia).
      var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
      var supportsBlobs = void 0;
      var dbContexts = {};
      var toString = Object.prototype.toString;
      // Transaction Modes
      var READ_ONLY = 'readonly';
      var READ_WRITE = 'readwrite';
      // Transform a binary string to an array buffer, because otherwise
      // weird stuff happens when you try to work with the binary string directly.
      // It is known.
      // From http://stackoverflow.com/questions/14967647/ (continues on next line)
      // encode-decode-image-with-base64-breaks-image (2013-04-21)
      function _binStringToArrayBuffer(bin) {
        var length = bin.length;
        var buf = new ArrayBuffer(length);
        var arr = new Uint8Array(buf);
        for (var i = 0; i < length; i++) {
          arr[i] = bin.charCodeAt(i);
        }
        return buf;
      }
      // 
      // Blobs are not supported in all versions of IndexedDB, notably
      // Chrome <37 and Android <5. In those versions, storing a blob will throw.
      // 
      // Various other blob bugs exist in Chrome v37-42 (inclusive).
      // Detecting them is expensive and confusing to users, and Chrome 37-42
      // is at very low usage worldwide, so we do a hacky userAgent check instead.
      // 
      // content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
      // 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
      // FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
      // 
      // Code borrowed from PouchDB. See:
      // https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
      // 
      function _checkBlobSupportWithoutCaching(idb) {
        return new Promise$1(function (resolve) {
          var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
          var blob = createBlob(['']);
          txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');
          txn.onabort = function (e) {
            // If the transaction aborts now its due to not being able to
            // write to the database, likely due to the disk being full
            e.preventDefault();
            e.stopPropagation();
            resolve(false);
          };
          txn.oncomplete = function () {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            // MS Edge pretends to be Chrome 42:
            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
          };
        })["catch"](function () {
          return false;
        });
      }
      function _checkBlobSupport(idb) {
        if (typeof supportsBlobs === 'boolean') {
          return Promise$1.resolve(supportsBlobs);
        }
        return _checkBlobSupportWithoutCaching(idb).then(function (value) {
          supportsBlobs = value;
          return supportsBlobs;
        });
      }
      function _deferReadiness(dbInfo) {
        var dbContext = dbContexts[dbInfo.name];
        // Create a deferred object representing the current database operation.
        var deferredOperation = {};
        deferredOperation.promise = new Promise$1(function (resolve, reject) {
          deferredOperation.resolve = resolve;
          deferredOperation.reject = reject;
        });
        // Enqueue the deferred operation.
        dbContext.deferredOperations.push(deferredOperation);
        // Chain its promise to the database readiness.
        if (!dbContext.dbReady) {
          dbContext.dbReady = deferredOperation.promise;
        } else {
          dbContext.dbReady = dbContext.dbReady.then(function () {
            return deferredOperation.promise;
          });
        }
      }
      function _advanceReadiness(dbInfo) {
        var dbContext = dbContexts[dbInfo.name];
        // Dequeue a deferred operation.
        var deferredOperation = dbContext.deferredOperations.pop();
        // Resolve its promise (which is part of the database readiness
        // chain of promises).
        if (deferredOperation) {
          deferredOperation.resolve();
          return deferredOperation.promise;
        }
      }
      function _rejectReadiness(dbInfo, err) {
        var dbContext = dbContexts[dbInfo.name];
        // Dequeue a deferred operation.
        var deferredOperation = dbContext.deferredOperations.pop();
        // Reject its promise (which is part of the database readiness
        // chain of promises).
        if (deferredOperation) {
          deferredOperation.reject(err);
          return deferredOperation.promise;
        }
      }
      function _getConnection(dbInfo, upgradeNeeded) {
        return new Promise$1(function (resolve, reject) {
          dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();
          if (dbInfo.db) {
            if (upgradeNeeded) {
              _deferReadiness(dbInfo);
              dbInfo.db.close();
            } else {
              return resolve(dbInfo.db);
            }
          }
          var dbArgs = [dbInfo.name];
          if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
          }
          var openreq = idb.open.apply(idb, dbArgs);
          if (upgradeNeeded) {
            openreq.onupgradeneeded = function (e) {
              var db = openreq.result;
              try {
                db.createObjectStore(dbInfo.storeName);
                if (e.oldVersion <= 1) {
                  // Added when support for blob shims was added
                  db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                }
              } catch (ex) {
                if (ex.name === 'ConstraintError') {
                  console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                } else {
                  throw ex;
                }
              }
            };
          }
          openreq.onerror = function (e) {
            e.preventDefault();
            reject(openreq.error);
          };
          openreq.onsuccess = function () {
            resolve(openreq.result);
            _advanceReadiness(dbInfo);
          };
        });
      }
      function _getOriginalConnection(dbInfo) {
        return _getConnection(dbInfo, false);
      }
      function _getUpgradedConnection(dbInfo) {
        return _getConnection(dbInfo, true);
      }
      function _isUpgradeNeeded(dbInfo, defaultVersion) {
        if (!dbInfo.db) {
          return true;
        }
        var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
        var isDowngrade = dbInfo.version < dbInfo.db.version;
        var isUpgrade = dbInfo.version > dbInfo.db.version;
        if (isDowngrade) {
          // If the version is not the default one
          // then warn for impossible downgrade.
          if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
          }
          // Align the versions to prevent errors.
          dbInfo.version = dbInfo.db.version;
        }
        if (isUpgrade || isNewStore) {
          // If the store is new then increment the version (if needed).
          // This will trigger an "upgradeneeded" event which is required
          // for creating a store.
          if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
              dbInfo.version = incVersion;
            }
          }
          return true;
        }
        return false;
      }
      // encode a blob for indexeddb engines that don't support blobs
      function _encodeBlob(blob) {
        return new Promise$1(function (resolve, reject) {
          var reader = new FileReader();
          reader.onerror = reject;
          reader.onloadend = function (e) {
            var base64 = btoa(e.target.result || '');
            resolve({
              __local_forage_encoded_blob: true,
              data: base64,
              type: blob.type
            });
          };
          reader.readAsBinaryString(blob);
        });
      }
      // decode an encoded blob
      function _decodeBlob(encodedBlob) {
        var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
        return createBlob([arrayBuff], {
          type: encodedBlob.type
        });
      }
      // is this one of our fancy encoded blobs?
      function _isEncodedBlob(value) {
        return value && value.__local_forage_encoded_blob;
      }
      // Specialize the default `ready()` function by making it dependent
      // on the current database operations. Thus, the driver will be actually
      // ready when it's been initialized (default) *and* there are no pending
      // operations on the database (initiated by some other instances).
      function _fullyReady(callback) {
        var self = this;
        var promise = self._initReady().then(function () {
          var dbContext = dbContexts[self._dbInfo.name];
          if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
          }
        });
        executeTwoCallbacks(promise, callback, callback);
        return promise;
      }
      // Try to establish a new db connection to replace the
      // current one which is broken (i.e. experiencing
      // InvalidStateError while creating a transaction).
      function _tryReconnect(dbInfo) {
        _deferReadiness(dbInfo);
        var dbContext = dbContexts[dbInfo.name];
        var forages = dbContext.forages;
        for (var i = 0; i < forages.length; i++) {
          var forage = forages[i];
          if (forage._dbInfo.db) {
            forage._dbInfo.db.close();
            forage._dbInfo.db = null;
          }
        }
        dbInfo.db = null;
        return _getOriginalConnection(dbInfo).then(function (db) {
          dbInfo.db = db;
          if (_isUpgradeNeeded(dbInfo)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
          }
          return db;
        }).then(function (db) {
          // store the latest db reference
          // in case the db was upgraded
          dbInfo.db = dbContext.db = db;
          for (var i = 0; i < forages.length; i++) {
            forages[i]._dbInfo.db = db;
          }
        })["catch"](function (err) {
          _rejectReadiness(dbInfo, err);
          throw err;
        });
      }
      // FF doesn't like Promises (micro-tasks) and IDDB store operations,
      // so we have to do it with callbacks
      function createTransaction(dbInfo, mode, callback, retries) {
        if (retries === undefined) {
          retries = 1;
        }
        try {
          var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
          callback(null, tx);
        } catch (err) {
          if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
            return Promise$1.resolve().then(function () {
              if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                // increase the db version, to create the new ObjectStore
                if (dbInfo.db) {
                  dbInfo.version = dbInfo.db.version + 1;
                }
                // Reopen the database for upgrading.
                return _getUpgradedConnection(dbInfo);
              }
            }).then(function () {
              return _tryReconnect(dbInfo).then(function () {
                createTransaction(dbInfo, mode, callback, retries - 1);
              });
            })["catch"](callback);
          }
          callback(err);
        }
      }
      function createDbContext() {
        return {
          // Running localForages sharing a database.
          // Running localForages sharing a database.
          forages: [],
          // Shared database.
          // Shared database.
          db: null,
          // Database readiness (promise).
          // Database readiness (promise).
          dbReady: null,
          // Deferred operations on the database.
          // Deferred operations on the database.
          deferredOperations: []
        };
      }
      // Open the IndexedDB database (automatically creates one if one didn't
      // previously exist), using any options set in the config.
      function _initStorage(options) {
        var self = this;
        var dbInfo = {
          db: null
        };
        if (options) {
          for (var i in options) {
            dbInfo[i] = options[i];
          }
        }
        // Get the current context of the database;
        var dbContext = dbContexts[dbInfo.name];
        // ...or create a new context.
        if (!dbContext) {
          dbContext = createDbContext();
          // Register the new context in the global container.
          dbContexts[dbInfo.name] = dbContext;
        }
        // Register itself as a running localForage in the current context.
        dbContext.forages.push(self);
        // Replace the default `ready()` function with the specialized one.
        if (!self._initReady) {
          self._initReady = self.ready;
          self.ready = _fullyReady;
        }
        // Create an array of initialization states of the related localForages.
        var initPromises = [];
        function ignoreErrors() {
          // Don't handle errors here,
          // just makes sure related localForages aren't pending.
          return Promise$1.resolve();
        }
        for (var j = 0; j < dbContext.forages.length; j++) {
          var forage = dbContext.forages[j];
          if (forage !== self) {
            // Don't wait for itself...
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
          }
        }
        // Take a snapshot of the related localForages.
        var forages = dbContext.forages.slice(0);
        // Initialize the connection process only when
        // all the related localForages aren't pending.
        return Promise$1.all(initPromises).then(function () {
          dbInfo.db = dbContext.db;
          // Get the connection or open a new one without upgrade.
          return _getOriginalConnection(dbInfo);
        }).then(function (db) {
          dbInfo.db = db;
          if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
          }
          return db;
        }).then(function (db) {
          dbInfo.db = dbContext.db = db;
          self._dbInfo = dbInfo;
          // Share the final connection amongst related localForages.
          for (var k = 0; k < forages.length; k++) {
            var forage = forages[k];
            if (forage !== self) {
              // Self is already up-to-date.
              forage._dbInfo.db = dbInfo.db;
              forage._dbInfo.version = dbInfo.version;
            }
          }
        });
      }
      function getItem(key, callback) {
        var self = this;
        key = normalizeKey(key);
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
              if (err) {
                return reject(err);
              }
              try {
                var store = transaction.objectStore(self._dbInfo.storeName);
                var req = store.get(key);
                req.onsuccess = function () {
                  var value = req.result;
                  if (value === undefined) {
                    value = null;
                  }
                  if (_isEncodedBlob(value)) {
                    value = _decodeBlob(value);
                  }
                  resolve(value);
                };
                req.onerror = function () {
                  reject(req.error);
                };
              } catch (e) {
                reject(e);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      // Iterate over all items stored in database.
      function iterate(iterator, callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
              if (err) {
                return reject(err);
              }
              try {
                var store = transaction.objectStore(self._dbInfo.storeName);
                var req = store.openCursor();
                var iterationNumber = 1;
                req.onsuccess = function () {
                  var cursor = req.result;
                  if (cursor) {
                    var value = cursor.value;
                    if (_isEncodedBlob(value)) {
                      value = _decodeBlob(value);
                    }
                    var result = iterator(value, cursor.key, iterationNumber++);
                    // when the iterator callback returns any
                    // (non-`undefined`) value, then we stop
                    // the iteration immediately
                    if (result !== void 0) {
                      resolve(result);
                    } else {
                      cursor["continue"]();
                    }
                  } else {
                    resolve();
                  }
                };
                req.onerror = function () {
                  reject(req.error);
                };
              } catch (e) {
                reject(e);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function setItem(key, value, callback) {
        var self = this;
        key = normalizeKey(key);
        var promise = new Promise$1(function (resolve, reject) {
          var dbInfo;
          self.ready().then(function () {
            dbInfo = self._dbInfo;
            if (toString.call(value) === '[object Blob]') {
              return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                if (blobSupport) {
                  return value;
                }
                return _encodeBlob(value);
              });
            }
            return value;
          }).then(function (value) {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
              if (err) {
                return reject(err);
              }
              try {
                var store = transaction.objectStore(self._dbInfo.storeName);
                // The reason we don't _save_ null is because IE 10 does
                // not support saving the `null` type in IndexedDB. How
                // ironic, given the bug below!
                // See: https://github.com/mozilla/localForage/issues/161
                if (value === null) {
                  value = undefined;
                }
                var req = store.put(value, key);
                transaction.oncomplete = function () {
                  // Cast to undefined so the value passed to
                  // callback/promise is the same as what one would get out
                  // of `getItem()` later. This leads to some weirdness
                  // (setItem('foo', undefined) will return `null`), but
                  // it's not my fault localStorage is our baseline and that
                  // it's weird.
                  if (value === undefined) {
                    value = null;
                  }
                  resolve(value);
                };
                transaction.onabort = transaction.onerror = function () {
                  var err = req.error ? req.error : req.transaction.error;
                  reject(err);
                };
              } catch (e) {
                reject(e);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function removeItem(key, callback) {
        var self = this;
        key = normalizeKey(key);
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
              if (err) {
                return reject(err);
              }
              try {
                var store = transaction.objectStore(self._dbInfo.storeName);
                // We use a Grunt task to make this safe for IE and some
                // versions of Android (including those used by Cordova).
                // Normally IE won't like `.delete()` and will insist on
                // using `['delete']()`, but we have a build step that
                // fixes this for us now.
                var req = store["delete"](key);
                transaction.oncomplete = function () {
                  resolve();
                };
                transaction.onerror = function () {
                  reject(req.error);
                };
                // The request will be also be aborted if we've exceeded our storage
                // space.
                transaction.onabort = function () {
                  var err = req.error ? req.error : req.transaction.error;
                  reject(err);
                };
              } catch (e) {
                reject(e);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function clear(callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
              if (err) {
                return reject(err);
              }
              try {
                var store = transaction.objectStore(self._dbInfo.storeName);
                var req = store.clear();
                transaction.oncomplete = function () {
                  resolve();
                };
                transaction.onabort = transaction.onerror = function () {
                  var err = req.error ? req.error : req.transaction.error;
                  reject(err);
                };
              } catch (e) {
                reject(e);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function length(callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
              if (err) {
                return reject(err);
              }
              try {
                var store = transaction.objectStore(self._dbInfo.storeName);
                var req = store.count();
                req.onsuccess = function () {
                  resolve(req.result);
                };
                req.onerror = function () {
                  reject(req.error);
                };
              } catch (e) {
                reject(e);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function key(n, callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          if (n < 0) {
            resolve(null);
            return;
          }
          self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
              if (err) {
                return reject(err);
              }
              try {
                var store = transaction.objectStore(self._dbInfo.storeName);
                var advanced = false;
                var req = store.openKeyCursor();
                req.onsuccess = function () {
                  var cursor = req.result;
                  if (!cursor) {
                    // this means there weren't enough keys
                    resolve(null);
                    return;
                  }
                  if (n === 0) {
                    // We have the first key, return it if that's what they
                    // wanted.
                    resolve(cursor.key);
                  } else {
                    if (!advanced) {
                      // Otherwise, ask the cursor to skip ahead n
                      // records.
                      advanced = true;
                      cursor.advance(n);
                    } else {
                      // When we get here, we've got the nth key.
                      resolve(cursor.key);
                    }
                  }
                };
                req.onerror = function () {
                  reject(req.error);
                };
              } catch (e) {
                reject(e);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function keys(callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
              if (err) {
                return reject(err);
              }
              try {
                var store = transaction.objectStore(self._dbInfo.storeName);
                var req = store.openKeyCursor();
                var keys = [];
                req.onsuccess = function () {
                  var cursor = req.result;
                  if (!cursor) {
                    resolve(keys);
                    return;
                  }
                  keys.push(cursor.key);
                  cursor["continue"]();
                };
                req.onerror = function () {
                  reject(req.error);
                };
              } catch (e) {
                reject(e);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function dropInstance(options, callback) {
        callback = getCallback.apply(this, arguments);
        var currentConfig = this.config();
        options = typeof options !== 'function' && options || ({});
        if (!options.name) {
          options.name = options.name || currentConfig.name;
          options.storeName = options.storeName || currentConfig.storeName;
        }
        var self = this;
        var promise;
        if (!options.name) {
          promise = Promise$1.reject('Invalid arguments');
        } else {
          var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;
          var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
            var dbContext = dbContexts[options.name];
            var forages = dbContext.forages;
            dbContext.db = db;
            for (var i = 0; i < forages.length; i++) {
              forages[i]._dbInfo.db = db;
            }
            return db;
          });
          if (!options.storeName) {
            promise = dbPromise.then(function (db) {
              _deferReadiness(options);
              var dbContext = dbContexts[options.name];
              var forages = dbContext.forages;
              db.close();
              for (var i = 0; i < forages.length; i++) {
                var forage = forages[i];
                forage._dbInfo.db = null;
              }
              var dropDBPromise = new Promise$1(function (resolve, reject) {
                var req = idb.deleteDatabase(options.name);
                req.onerror = req.onblocked = function (err) {
                  var db = req.result;
                  if (db) {
                    db.close();
                  }
                  reject(err);
                };
                req.onsuccess = function () {
                  var db = req.result;
                  if (db) {
                    db.close();
                  }
                  resolve(db);
                };
              });
              return dropDBPromise.then(function (db) {
                dbContext.db = db;
                for (var i = 0; i < forages.length; i++) {
                  var _forage = forages[i];
                  _advanceReadiness(_forage._dbInfo);
                }
              })["catch"](function (err) {
                (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                throw err;
              });
            });
          } else {
            promise = dbPromise.then(function (db) {
              if (!db.objectStoreNames.contains(options.storeName)) {
                return;
              }
              var newVersion = db.version + 1;
              _deferReadiness(options);
              var dbContext = dbContexts[options.name];
              var forages = dbContext.forages;
              db.close();
              for (var i = 0; i < forages.length; i++) {
                var forage = forages[i];
                forage._dbInfo.db = null;
                forage._dbInfo.version = newVersion;
              }
              var dropObjectPromise = new Promise$1(function (resolve, reject) {
                var req = idb.open(options.name, newVersion);
                req.onerror = function (err) {
                  var db = req.result;
                  db.close();
                  reject(err);
                };
                req.onupgradeneeded = function () {
                  var db = req.result;
                  db.deleteObjectStore(options.storeName);
                };
                req.onsuccess = function () {
                  var db = req.result;
                  db.close();
                  resolve(db);
                };
              });
              return dropObjectPromise.then(function (db) {
                dbContext.db = db;
                for (var j = 0; j < forages.length; j++) {
                  var _forage2 = forages[j];
                  _forage2._dbInfo.db = db;
                  _advanceReadiness(_forage2._dbInfo);
                }
              })["catch"](function (err) {
                (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                throw err;
              });
            });
          }
        }
        executeCallback(promise, callback);
        return promise;
      }
      var asyncStorage = {
        _driver: 'asyncStorage',
        _initStorage: _initStorage,
        _support: isIndexedDBValid(),
        iterate: iterate,
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem,
        clear: clear,
        length: length,
        key: key,
        keys: keys,
        dropInstance: dropInstance
      };
      function isWebSQLValid() {
        return typeof openDatabase === 'function';
      }
      // Sadly, the best way to save binary data in WebSQL/localStorage is serializing
      // it to Base64, so this is how we store it to prevent very strange errors with less
      // verbose ways of binary <-> string data storage.
      var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      var BLOB_TYPE_PREFIX = '~~local_forage_type~';
      var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
      var SERIALIZED_MARKER = '__lfsc__:';
      var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
      // OMG the serializations!
      var TYPE_ARRAYBUFFER = 'arbf';
      var TYPE_BLOB = 'blob';
      var TYPE_INT8ARRAY = 'si08';
      var TYPE_UINT8ARRAY = 'ui08';
      var TYPE_UINT8CLAMPEDARRAY = 'uic8';
      var TYPE_INT16ARRAY = 'si16';
      var TYPE_INT32ARRAY = 'si32';
      var TYPE_UINT16ARRAY = 'ur16';
      var TYPE_UINT32ARRAY = 'ui32';
      var TYPE_FLOAT32ARRAY = 'fl32';
      var TYPE_FLOAT64ARRAY = 'fl64';
      var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
      var toString$1 = Object.prototype.toString;
      function stringToBuffer(serializedString) {
        // Fill the string into a ArrayBuffer.
        var bufferLength = serializedString.length * 0.75;
        var len = serializedString.length;
        var i;
        var p = 0;
        var encoded1, encoded2, encoded3, encoded4;
        if (serializedString[serializedString.length - 1] === '=') {
          bufferLength--;
          if (serializedString[serializedString.length - 2] === '=') {
            bufferLength--;
          }
        }
        var buffer = new ArrayBuffer(bufferLength);
        var bytes = new Uint8Array(buffer);
        for (i = 0; i < len; i += 4) {
          encoded1 = BASE_CHARS.indexOf(serializedString[i]);
          encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
          encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
          encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
          /*jslint bitwise: true*/
          bytes[p++] = encoded1 << 2 | encoded2 >> 4;
          bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
          bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
        }
        return buffer;
      }
      // Converts a buffer to a string to store, serialized, in the backend
      // storage library.
      function bufferToString(buffer) {
        // base64-arraybuffer
        var bytes = new Uint8Array(buffer);
        var base64String = '';
        var i;
        for (i = 0; i < bytes.length; i += 3) {
          /*jslint bitwise: true*/
          base64String += BASE_CHARS[bytes[i] >> 2];
          base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
          base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
          base64String += BASE_CHARS[bytes[i + 2] & 63];
        }
        if (bytes.length % 3 === 2) {
          base64String = base64String.substring(0, base64String.length - 1) + '=';
        } else if (bytes.length % 3 === 1) {
          base64String = base64String.substring(0, base64String.length - 2) + '==';
        }
        return base64String;
      }
      // Serialize a value, afterwards executing a callback (which usually
      // instructs the `setItem()` callback/promise to be executed). This is how
      // we store binary data with localStorage.
      function serialize(value, callback) {
        var valueType = '';
        if (value) {
          valueType = toString$1.call(value);
        }
        // Cannot use `value instanceof ArrayBuffer` or such here, as these
        // checks fail when running the tests using casper.js...
        // 
        // TODO: See why those tests fail and use a better solution.
        if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
          // Convert binary arrays to a string and prefix the string with
          // a special marker.
          var buffer;
          var marker = SERIALIZED_MARKER;
          if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
          } else {
            buffer = value.buffer;
            if (valueType === '[object Int8Array]') {
              marker += TYPE_INT8ARRAY;
            } else if (valueType === '[object Uint8Array]') {
              marker += TYPE_UINT8ARRAY;
            } else if (valueType === '[object Uint8ClampedArray]') {
              marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === '[object Int16Array]') {
              marker += TYPE_INT16ARRAY;
            } else if (valueType === '[object Uint16Array]') {
              marker += TYPE_UINT16ARRAY;
            } else if (valueType === '[object Int32Array]') {
              marker += TYPE_INT32ARRAY;
            } else if (valueType === '[object Uint32Array]') {
              marker += TYPE_UINT32ARRAY;
            } else if (valueType === '[object Float32Array]') {
              marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === '[object Float64Array]') {
              marker += TYPE_FLOAT64ARRAY;
            } else {
              callback(new Error('Failed to get type for BinaryArray'));
            }
          }
          callback(marker + bufferToString(buffer));
        } else if (valueType === '[object Blob]') {
          // Conver the blob to a binaryArray and then to a string.
          var fileReader = new FileReader();
          fileReader.onload = function () {
            // Backwards-compatible prefix for the blob type.
            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);
            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
          };
          fileReader.readAsArrayBuffer(value);
        } else {
          try {
            callback(JSON.stringify(value));
          } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);
            callback(null, e);
          }
        }
      }
      // Deserialize data we've inserted into a value column/field. We place
      // special markers into our strings to mark them as encoded; this isn't
      // as nice as a meta field, but it's the only sane thing we can do whilst
      // keeping localStorage support intact.
      // 
      // Oftentimes this will just deserialize JSON content, but if we have a
      // special marker (SERIALIZED_MARKER, defined above), we will extract
      // some kind of arraybuffer/binary data/typed array out of the string.
      function deserialize(value) {
        // If we haven't marked this string as being specially serialized (i.e.
        // something other than serialized JSON), we can just return it and be
        // done with it.
        if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
          return JSON.parse(value);
        }
        // The following code deals with deserializing some kind of Blob or
        // TypedArray. First we separate out the type of data we're dealing
        // with from the data itself.
        var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
        var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
        var blobType;
        // Backwards-compatible blob type serialization strategy.
        // DBs created with older versions of localForage will simply not have the blob type.
        if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
          var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
          blobType = matcher[1];
          serializedString = serializedString.substring(matcher[0].length);
        }
        var buffer = stringToBuffer(serializedString);
        // Return the right type based on the code/type set during
        // serialization.
        switch (type) {
          case TYPE_ARRAYBUFFER:
            return buffer;
          case TYPE_BLOB:
            return createBlob([buffer], {
              type: blobType
            });
          case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
          case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
          case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
          case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
          case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
          case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
          case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
          case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
          case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
          default:
            throw new Error('Unkown type: ' + type);
        }
      }
      var localforageSerializer = {
        serialize: serialize,
        deserialize: deserialize,
        stringToBuffer: stringToBuffer,
        bufferToString: bufferToString
      };
      /*
      * Includes code from:
      *
      * base64-arraybuffer
      * https://github.com/niklasvh/base64-arraybuffer
      *
      * Copyright (c) 2012 Niklas von Hertzen
      * Licensed under the MIT license.
      */
      function createDbTable(t, dbInfo, callback, errorCallback) {
        t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
      }
      // Open the WebSQL database (automatically creates one if one didn't
      // previously exist), using any options set in the config.
      function _initStorage$1(options) {
        var self = this;
        var dbInfo = {
          db: null
        };
        if (options) {
          for (var i in options) {
            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
          }
        }
        var dbInfoPromise = new Promise$1(function (resolve, reject) {
          // Open the database; the openDatabase API will automatically
          // create it for us if it doesn't exist.
          try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
          } catch (e) {
            return reject(e);
          }
          // Create our key/value table if it doesn't exist.
          dbInfo.db.transaction(function (t) {
            createDbTable(t, dbInfo, function () {
              self._dbInfo = dbInfo;
              resolve();
            }, function (t, error) {
              reject(error);
            });
          }, reject);
        });
        dbInfo.serializer = localforageSerializer;
        return dbInfoPromise;
      }
      function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
        t.executeSql(sqlStatement, args, callback, function (t, error) {
          if (error.code === error.SYNTAX_ERR) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
              if (!results.rows.length) {
                // if the table is missing (was deleted)
                // re-create it table and retry
                createDbTable(t, dbInfo, function () {
                  t.executeSql(sqlStatement, args, callback, errorCallback);
                }, errorCallback);
              } else {
                errorCallback(t, error);
              }
            }, errorCallback);
          } else {
            errorCallback(t, error);
          }
        }, errorCallback);
      }
      function getItem$1(key, callback) {
        var self = this;
        key = normalizeKey(key);
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
              tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                var result = results.rows.length ? results.rows.item(0).value : null;
                // Check to see if this is serialized content we need to
                // unpack.
                if (result) {
                  result = dbInfo.serializer.deserialize(result);
                }
                resolve(result);
              }, function (t, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function iterate$1(iterator, callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
              tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                var rows = results.rows;
                var length = rows.length;
                for (var i = 0; i < length; i++) {
                  var item = rows.item(i);
                  var result = item.value;
                  // Check to see if this is serialized content
                  // we need to unpack.
                  if (result) {
                    result = dbInfo.serializer.deserialize(result);
                  }
                  result = iterator(result, item.key, i + 1);
                  // void(0) prevents problems with redefinition
                  // of `undefined`.
                  if (result !== void 0) {
                    resolve(result);
                    return;
                  }
                }
                resolve();
              }, function (t, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function _setItem(key, value, callback, retriesLeft) {
        var self = this;
        key = normalizeKey(key);
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            // The localStorage API doesn't return undefined values in an
            // "expected" way, so undefined is always cast to null in all
            // drivers. See: https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
              value = null;
            }
            // Save the original value to pass to the callback.
            var originalValue = value;
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
              if (error) {
                reject(error);
              } else {
                dbInfo.db.transaction(function (t) {
                  tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                    resolve(originalValue);
                  }, function (t, error) {
                    reject(error);
                  });
                }, function (sqlError) {
                  // The transaction failed; check
                  // to see if it's a quota error.
                  if (sqlError.code === sqlError.QUOTA_ERR) {
                    // We reject the callback outright for now, but
                    // it's worth trying to re-run the transaction.
                    // Even if the user accepts the prompt to use
                    // more storage on Safari, this error will
                    // be called.
                    // 
                    // Try to re-run the transaction.
                    if (retriesLeft > 0) {
                      resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                      return;
                    }
                    reject(sqlError);
                  }
                });
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function setItem$1(key, value, callback) {
        return _setItem.apply(this, [key, value, callback, 1]);
      }
      function removeItem$1(key, callback) {
        var self = this;
        key = normalizeKey(key);
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
              tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                resolve();
              }, function (t, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      // Deletes every item in the table.
      // TODO: Find out if this resets the AUTO_INCREMENT number.
      function clear$1(callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
              tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                resolve();
              }, function (t, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      // Does a simple `COUNT(key)` to get the number of items stored in
      // localForage.
      function length$1(callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
              // Ahhh, SQL makes this one soooooo easy.
              tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                var result = results.rows.item(0).c;
                resolve(result);
              }, function (t, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      // Return the key located at key index X; essentially gets the key from a
      // `WHERE id = ?`. This is the most efficient way I can think to implement
      // this rarely-used (in my experience) part of the API, but it can seem
      // inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
      // the ID of each key will change every time it's updated. Perhaps a stored
      // procedure for the `setItem()` SQL would solve this problem?
      // TODO: Don't change ID on `setItem()`.
      function key$1(n, callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
              tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                var result = results.rows.length ? results.rows.item(0).key : null;
                resolve(result);
              }, function (t, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function keys$1(callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
              tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                var keys = [];
                for (var i = 0; i < results.rows.length; i++) {
                  keys.push(results.rows.item(i).key);
                }
                resolve(keys);
              }, function (t, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      // https://www.w3.org/TR/webdatabase/#databases
      // > There is no way to enumerate or delete the databases available for an origin from this API.
      function getAllStoreNames(db) {
        return new Promise$1(function (resolve, reject) {
          db.transaction(function (t) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
              var storeNames = [];
              for (var i = 0; i < results.rows.length; i++) {
                storeNames.push(results.rows.item(i).name);
              }
              resolve({
                db: db,
                storeNames: storeNames
              });
            }, function (t, error) {
              reject(error);
            });
          }, function (sqlError) {
            reject(sqlError);
          });
        });
      }
      function dropInstance$1(options, callback) {
        callback = getCallback.apply(this, arguments);
        var currentConfig = this.config();
        options = typeof options !== 'function' && options || ({});
        if (!options.name) {
          options.name = options.name || currentConfig.name;
          options.storeName = options.storeName || currentConfig.storeName;
        }
        var self = this;
        var promise;
        if (!options.name) {
          promise = Promise$1.reject('Invalid arguments');
        } else {
          promise = new Promise$1(function (resolve) {
            var db;
            if (options.name === currentConfig.name) {
              // use the db reference of the current instance
              db = self._dbInfo.db;
            } else {
              db = openDatabase(options.name, '', '', 0);
            }
            if (!options.storeName) {
              // drop all database tables
              resolve(getAllStoreNames(db));
            } else {
              resolve({
                db: db,
                storeNames: [options.storeName]
              });
            }
          }).then(function (operationInfo) {
            return new Promise$1(function (resolve, reject) {
              operationInfo.db.transaction(function (t) {
                function dropTable(storeName) {
                  return new Promise$1(function (resolve, reject) {
                    t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                      resolve();
                    }, function (t, error) {
                      reject(error);
                    });
                  });
                }
                var operations = [];
                for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                  operations.push(dropTable(operationInfo.storeNames[i]));
                }
                Promise$1.all(operations).then(function () {
                  resolve();
                })["catch"](function (e) {
                  reject(e);
                });
              }, function (sqlError) {
                reject(sqlError);
              });
            });
          });
        }
        executeCallback(promise, callback);
        return promise;
      }
      var webSQLStorage = {
        _driver: 'webSQLStorage',
        _initStorage: _initStorage$1,
        _support: isWebSQLValid(),
        iterate: iterate$1,
        getItem: getItem$1,
        setItem: setItem$1,
        removeItem: removeItem$1,
        clear: clear$1,
        length: length$1,
        key: key$1,
        keys: keys$1,
        dropInstance: dropInstance$1
      };
      function isLocalStorageValid() {
        try {
          return typeof localStorage !== 'undefined' && ('setItem' in localStorage) && // in IE8 typeof localStorage.setItem === 'object'
          !!localStorage.setItem;
        } catch (e) {
          return false;
        }
      }
      function _getKeyPrefix(options, defaultConfig) {
        var keyPrefix = options.name + '/';
        if (options.storeName !== defaultConfig.storeName) {
          keyPrefix += options.storeName + '/';
        }
        return keyPrefix;
      }
      // Check if localStorage throws when saving an item
      function checkIfLocalStorageThrows() {
        var localStorageTestKey = '_localforage_support_test';
        try {
          localStorage.setItem(localStorageTestKey, true);
          localStorage.removeItem(localStorageTestKey);
          return false;
        } catch (e) {
          return true;
        }
      }
      // Check if localStorage is usable and allows to save an item
      // This method checks if localStorage is usable in Safari Private Browsing
      // mode, or in any other case where the available quota for localStorage
      // is 0 and there wasn't any saved items yet.
      function _isLocalStorageUsable() {
        return !checkIfLocalStorageThrows() || localStorage.length > 0;
      }
      // Config the localStorage backend, using options set in the config.
      function _initStorage$2(options) {
        var self = this;
        var dbInfo = {};
        if (options) {
          for (var i in options) {
            dbInfo[i] = options[i];
          }
        }
        dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);
        if (!_isLocalStorageUsable()) {
          return Promise$1.reject();
        }
        self._dbInfo = dbInfo;
        dbInfo.serializer = localforageSerializer;
        return Promise$1.resolve();
      }
      // Remove all keys from the datastore, effectively destroying all data in
      // the app's key/value store!
      function clear$2(callback) {
        var self = this;
        var promise = self.ready().then(function () {
          var keyPrefix = self._dbInfo.keyPrefix;
          for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);
            if (key.indexOf(keyPrefix) === 0) {
              localStorage.removeItem(key);
            }
          }
        });
        executeCallback(promise, callback);
        return promise;
      }
      // Retrieve an item from the store. Unlike the original async_storage
      // library in Gaia, we don't modify return values at all. If a key's value
      // is `undefined`, we pass that value to the callback function.
      function getItem$2(key, callback) {
        var self = this;
        key = normalizeKey(key);
        var promise = self.ready().then(function () {
          var dbInfo = self._dbInfo;
          var result = localStorage.getItem(dbInfo.keyPrefix + key);
          // If a result was found, parse it from the serialized
          // string into a JS object. If result isn't truthy, the key
          // is likely undefined and we'll pass it straight to the
          // callback.
          if (result) {
            result = dbInfo.serializer.deserialize(result);
          }
          return result;
        });
        executeCallback(promise, callback);
        return promise;
      }
      // Iterate over all items in the store.
      function iterate$2(iterator, callback) {
        var self = this;
        var promise = self.ready().then(function () {
          var dbInfo = self._dbInfo;
          var keyPrefix = dbInfo.keyPrefix;
          var keyPrefixLength = keyPrefix.length;
          var length = localStorage.length;
          // We use a dedicated iterator instead of the `i` variable below
          // so other keys we fetch in localStorage aren't counted in
          // the `iterationNumber` argument passed to the `iterate()`
          // callback.
          // 
          // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
          var iterationNumber = 1;
          for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(keyPrefix) !== 0) {
              continue;
            }
            var value = localStorage.getItem(key);
            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the
            // key is likely undefined and we'll pass it straight
            // to the iterator.
            if (value) {
              value = dbInfo.serializer.deserialize(value);
            }
            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);
            if (value !== void 0) {
              return value;
            }
          }
        });
        executeCallback(promise, callback);
        return promise;
      }
      // Same as localStorage's key() method, except takes a callback.
      function key$2(n, callback) {
        var self = this;
        var promise = self.ready().then(function () {
          var dbInfo = self._dbInfo;
          var result;
          try {
            result = localStorage.key(n);
          } catch (error) {
            result = null;
          }
          // Remove the prefix from the key, if a key is found.
          if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
          }
          return result;
        });
        executeCallback(promise, callback);
        return promise;
      }
      function keys$2(callback) {
        var self = this;
        var promise = self.ready().then(function () {
          var dbInfo = self._dbInfo;
          var length = localStorage.length;
          var keys = [];
          for (var i = 0; i < length; i++) {
            var itemKey = localStorage.key(i);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
              keys.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
          }
          return keys;
        });
        executeCallback(promise, callback);
        return promise;
      }
      // Supply the number of keys in the datastore to the callback function.
      function length$2(callback) {
        var self = this;
        var promise = self.keys().then(function (keys) {
          return keys.length;
        });
        executeCallback(promise, callback);
        return promise;
      }
      // Remove an item from the store, nice and simple.
      function removeItem$2(key, callback) {
        var self = this;
        key = normalizeKey(key);
        var promise = self.ready().then(function () {
          var dbInfo = self._dbInfo;
          localStorage.removeItem(dbInfo.keyPrefix + key);
        });
        executeCallback(promise, callback);
        return promise;
      }
      // Set a key's value and run an optional callback once the value is set.
      // Unlike Gaia's implementation, the callback function is passed the value,
      // in case you want to operate on that value only after you're sure it
      // saved, or something like that.
      function setItem$2(key, value, callback) {
        var self = this;
        key = normalizeKey(key);
        var promise = self.ready().then(function () {
          // Convert undefined values to null.
          // https://github.com/mozilla/localForage/pull/42
          if (value === undefined) {
            value = null;
          }
          // Save the original value to pass to the callback.
          var originalValue = value;
          return new Promise$1(function (resolve, reject) {
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
              if (error) {
                reject(error);
              } else {
                try {
                  localStorage.setItem(dbInfo.keyPrefix + key, value);
                  resolve(originalValue);
                } catch (e) {
                  // localStorage capacity exceeded.
                  // TODO: Make this a specific error/event.
                  if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                    reject(e);
                  }
                  reject(e);
                }
              }
            });
          });
        });
        executeCallback(promise, callback);
        return promise;
      }
      function dropInstance$2(options, callback) {
        callback = getCallback.apply(this, arguments);
        options = typeof options !== 'function' && options || ({});
        if (!options.name) {
          var currentConfig = this.config();
          options.name = options.name || currentConfig.name;
          options.storeName = options.storeName || currentConfig.storeName;
        }
        var self = this;
        var promise;
        if (!options.name) {
          promise = Promise$1.reject('Invalid arguments');
        } else {
          promise = new Promise$1(function (resolve) {
            if (!options.storeName) {
              resolve(options.name + '/');
            } else {
              resolve(_getKeyPrefix(options, self._defaultConfig));
            }
          }).then(function (keyPrefix) {
            for (var i = localStorage.length - 1; i >= 0; i--) {
              var key = localStorage.key(i);
              if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
              }
            }
          });
        }
        executeCallback(promise, callback);
        return promise;
      }
      var localStorageWrapper = {
        _driver: 'localStorageWrapper',
        _initStorage: _initStorage$2,
        _support: isLocalStorageValid(),
        iterate: iterate$2,
        getItem: getItem$2,
        setItem: setItem$2,
        removeItem: removeItem$2,
        clear: clear$2,
        length: length$2,
        key: key$2,
        keys: keys$2,
        dropInstance: dropInstance$2
      };
      var sameValue = function sameValue(x, y) {
        return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
      };
      var includes = function includes(array, searchElement) {
        var len = array.length;
        var i = 0;
        while (i < len) {
          if (sameValue(array[i], searchElement)) {
            return true;
          }
          i++;
        }
        return false;
      };
      var isArray = Array.isArray || (function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
      });
      // Drivers are stored here when `defineDriver()` is called.
      // They are shared across all instances of localForage.
      var DefinedDrivers = {};
      var DriverSupport = {};
      var DefaultDrivers = {
        INDEXEDDB: asyncStorage,
        WEBSQL: webSQLStorage,
        LOCALSTORAGE: localStorageWrapper
      };
      var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
      var OptionalDriverMethods = ['dropInstance'];
      var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);
      var DefaultConfig = {
        description: '',
        driver: DefaultDriverOrder.slice(),
        name: 'localforage',
        // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
        // we can use without a prompt.
        // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
        // we can use without a prompt.
        size: 4980736,
        storeName: 'keyvaluepairs',
        version: 1.0
      };
      function callWhenReady(localForageInstance, libraryMethod) {
        localForageInstance[libraryMethod] = function () {
          var _args = arguments;
          return localForageInstance.ready().then(function () {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
          });
        };
      }
      function extend() {
        for (var i = 1; i < arguments.length; i++) {
          var arg = arguments[i];
          if (arg) {
            for (var _key in arg) {
              if (arg.hasOwnProperty(_key)) {
                if (isArray(arg[_key])) {
                  arguments[0][_key] = arg[_key].slice();
                } else {
                  arguments[0][_key] = arg[_key];
                }
              }
            }
          }
        }
        return arguments[0];
      }
      var LocalForage = (function () {
        function LocalForage(options) {
          _classCallCheck(this, LocalForage);
          for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
              var driver = DefaultDrivers[driverTypeKey];
              var driverName = driver._driver;
              this[driverTypeKey] = driverName;
              if (!DefinedDrivers[driverName]) {
                // we don't need to wait for the promise,
                // since the default drivers can be defined
                // in a blocking manner
                this.defineDriver(driver);
              }
            }
          }
          this._defaultConfig = extend({}, DefaultConfig);
          this._config = extend({}, this._defaultConfig, options);
          this._driverSet = null;
          this._initDriver = null;
          this._ready = false;
          this._dbInfo = null;
          this._wrapLibraryMethodsWithReady();
          this.setDriver(this._config.driver)["catch"](function () {});
        }
        // Set any config values for localForage; can be called anytime before
        // the first API call (e.g. `getItem`, `setItem`).
        // We loop through options so we don't overwrite existing config
        // values.
        LocalForage.prototype.config = function config(options) {
          // If the options argument is an object, we use it to set values.
          // Otherwise, we return either a specified config value or all
          // config values.
          if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
              return new Error("Can't call config() after localforage " + 'has been used.');
            }
            for (var i in options) {
              if (i === 'storeName') {
                options[i] = options[i].replace(/\W/g, '_');
              }
              if (i === 'version' && typeof options[i] !== 'number') {
                return new Error('Database version must be a number.');
              }
              this._config[i] = options[i];
            }
            // after all config options are set and
            // the driver option is used, try setting it
            if (('driver' in options) && options.driver) {
              return this.setDriver(this._config.driver);
            }
            return true;
          } else if (typeof options === 'string') {
            return this._config[options];
          } else {
            return this._config;
          }
        };
        // Used to define a custom driver, shared across all instances of
        // localForage.
        LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
          var promise = new Promise$1(function (resolve, reject) {
            try {
              var driverName = driverObject._driver;
              var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');
              // A driver name should be defined and not overlap with the
              // library-defined, default drivers.
              if (!driverObject._driver) {
                reject(complianceError);
                return;
              }
              var driverMethods = LibraryMethods.concat('_initStorage');
              for (var i = 0, len = driverMethods.length; i < len; i++) {
                var driverMethodName = driverMethods[i];
                // when the property is there,
                // it should be a method even when optional
                var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                  reject(complianceError);
                  return;
                }
              }
              var configureMissingMethods = function configureMissingMethods() {
                var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                  return function () {
                    var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                    var promise = Promise$1.reject(error);
                    executeCallback(promise, arguments[arguments.length - 1]);
                    return promise;
                  };
                };
                for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                  var optionalDriverMethod = OptionalDriverMethods[_i];
                  if (!driverObject[optionalDriverMethod]) {
                    driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                  }
                }
              };
              configureMissingMethods();
              var setDriverSupport = function setDriverSupport(support) {
                if (DefinedDrivers[driverName]) {
                  console.info('Redefining LocalForage driver: ' + driverName);
                }
                DefinedDrivers[driverName] = driverObject;
                DriverSupport[driverName] = support;
                // don't use a then, so that we can define
                // drivers that have simple _support methods
                // in a blocking manner
                resolve();
              };
              if (('_support' in driverObject)) {
                if (driverObject._support && typeof driverObject._support === 'function') {
                  driverObject._support().then(setDriverSupport, reject);
                } else {
                  setDriverSupport(!!driverObject._support);
                }
              } else {
                setDriverSupport(true);
              }
            } catch (e) {
              reject(e);
            }
          });
          executeTwoCallbacks(promise, callback, errorCallback);
          return promise;
        };
        LocalForage.prototype.driver = function driver() {
          return this._driver || null;
        };
        LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
          var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));
          executeTwoCallbacks(getDriverPromise, callback, errorCallback);
          return getDriverPromise;
        };
        LocalForage.prototype.getSerializer = function getSerializer(callback) {
          var serializerPromise = Promise$1.resolve(localforageSerializer);
          executeTwoCallbacks(serializerPromise, callback);
          return serializerPromise;
        };
        LocalForage.prototype.ready = function ready(callback) {
          var self = this;
          var promise = self._driverSet.then(function () {
            if (self._ready === null) {
              self._ready = self._initDriver();
            }
            return self._ready;
          });
          executeTwoCallbacks(promise, callback, callback);
          return promise;
        };
        LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
          var self = this;
          if (!isArray(drivers)) {
            drivers = [drivers];
          }
          var supportedDrivers = this._getSupportedDrivers(drivers);
          function setDriverToConfig() {
            self._config.driver = self.driver();
          }
          function extendSelfWithDriver(driver) {
            self._extend(driver);
            setDriverToConfig();
            self._ready = self._initStorage(self._config);
            return self._ready;
          }
          function initDriver(supportedDrivers) {
            return function () {
              var currentDriverIndex = 0;
              function driverPromiseLoop() {
                while (currentDriverIndex < supportedDrivers.length) {
                  var driverName = supportedDrivers[currentDriverIndex];
                  currentDriverIndex++;
                  self._dbInfo = null;
                  self._ready = null;
                  return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                }
                setDriverToConfig();
                var error = new Error('No available storage method found.');
                self._driverSet = Promise$1.reject(error);
                return self._driverSet;
              }
              return driverPromiseLoop();
            };
          }
          // There might be a driver initialization in progress
          // so wait for it to finish in order to avoid a possible
          // race condition to set _dbInfo
          var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
            return Promise$1.resolve();
          }) : Promise$1.resolve();
          this._driverSet = oldDriverSetDone.then(function () {
            var driverName = supportedDrivers[0];
            self._dbInfo = null;
            self._ready = null;
            return self.getDriver(driverName).then(function (driver) {
              self._driver = driver._driver;
              setDriverToConfig();
              self._wrapLibraryMethodsWithReady();
              self._initDriver = initDriver(supportedDrivers);
            });
          })["catch"](function () {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self._driverSet = Promise$1.reject(error);
            return self._driverSet;
          });
          executeTwoCallbacks(this._driverSet, callback, errorCallback);
          return this._driverSet;
        };
        LocalForage.prototype.supports = function supports(driverName) {
          return !!DriverSupport[driverName];
        };
        LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
          extend(this, libraryMethodsAndProperties);
        };
        LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
          var supportedDrivers = [];
          for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
              supportedDrivers.push(driverName);
            }
          }
          return supportedDrivers;
        };
        LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
          // Add a stub for each driver API method that delays the call to the
          // corresponding driver method until localForage is ready. These stubs
          // will be replaced by the driver methods as soon as the driver is
          // loaded, so there is no performance impact.
          for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
          }
        };
        LocalForage.prototype.createInstance = function createInstance(options) {
          return new LocalForage(options);
        };
        return LocalForage;
      })();
      // The actual localForage object that we expose as a module or via a
      // global. It's extended by pulling in one of our other libraries.
      var localforage_js = new LocalForage();
      module.exports = localforage_js;
    }, {
      "3": 3
    }]
  }, {}, [4])(4);
});

},{}],"7AI65":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return StorageAdapter;
});
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var StorageAdapter = function StorageAdapter() {
  _classCallCheck(this, StorageAdapter);
};

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"1Zutj":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "PaintView", function () {
  return PaintView;
});
var _View2 = require("./View");
var _palettesColorPalette = require("../palettes/ColorPalette");
var _palettesColorPaletteDefault = _parcelHelpers.interopDefault(_palettesColorPalette);
var _palettesSizePalette = require("../palettes/SizePalette");
var _palettesSizePaletteDefault = _parcelHelpers.interopDefault(_palettesSizePalette);
var _utilsUtils = require("../utils/Utils");
var _utilsUtilsDefault = _parcelHelpers.interopDefault(_utilsUtils);
var _toolsPenTool = require("../tools/PenTool");
var _toolsPenToolDefault = _parcelHelpers.interopDefault(_toolsPenTool);
var _utilsPoint = require("../utils/Point");
var _utilsPointDefault = _parcelHelpers.interopDefault(_utilsPoint);
var _palettesPalette = require("../palettes/Palette");
var _storageImageStorage = require("../storage/ImageStorage");
var _storageImageStorageDefault = _parcelHelpers.interopDefault(_storageImageStorage);
var _config = require("../config");
var _palettesShapePalette = require("../palettes/ShapePalette");
var _palettesShapePaletteDefault = _parcelHelpers.interopDefault(_palettesShapePalette);
var _CanvasLayer = require("../CanvasLayer");
var _CanvasLayerDefault = _parcelHelpers.interopDefault(_CanvasLayer);
var _ImageLayer = require("../ImageLayer ");
var _ImageLayerDefault = _parcelHelpers.interopDefault(_ImageLayer);
var _toolsSelectionTool = require("../tools/SelectionTool");
var _toolsSelectionToolDefault = _parcelHelpers.interopDefault(_toolsSelectionTool);
var _Toolbar = require("../Toolbar");
var _History = require("../History");
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(receiver);
      }
      return desc.value;
    };
  }
  return _get(target, property, receiver || target);
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var PaintView = /*#__PURE__*/(function (_View) {
  _inherits(PaintView, _View);
  var _super = _createSuper(PaintView);
  _createClass(PaintView, [{
    key: "color",
    get: function get() {
      return this._color;
    }
  }, {
    key: "stamp",
    get: function get() {
      return this._stamp;
    }
  }, {
    key: "opacity",
    get: function get() {
      return this._opacity;
    }
  }, {
    key: "lineWidth",
    get: function get() {
      return this._lineWidth;
    }
  }, {
    key: "autoMaskCtx",
    get: function get() {
      return this._autoMaskCtx;
    }
  }, {
    key: "baseLayer",
    // get layers(): Layer[] { return this._layers; }
    // get layers(): Layer[] { return this._layers; }
    get: function get() {
      return this._layers["base-layer"];
    }
  }, {
    key: "overlayLayer",
    get: function get() {
      return this._layers["overlay-layer"];
    }
  }]);
  function PaintView(id, onBackClicked) {
    var _this;
    _classCallCheck(this, PaintView);
    _this = _super.call(this, id);
    _defineProperty(_assertThisInitialized(_this), "scaleFactor", 1);
    _defineProperty(_assertThisInitialized(_this), "_currentTouchId", 0);
    _defineProperty(_assertThisInitialized(_this), "_layers", {});
    _defineProperty(_assertThisInitialized(_this), "_lastSaveTimestamp", 0);
    _this._history = new _History.History();
    _this._sheet = document.getElementById("sheet");
    _this.width = _config.config.width;
    _this.height = _config.config.height;
    _utilsUtilsDefault.default.log(("Setting PaintView size to ").concat(_this.width, " x ").concat(_this.height));
    _this.addCanvasLayer("base-layer", 0, 0, _this.width, _this.height, false);
    _this.addEventListeners();
    _this.createButtons(onBackClicked);
    _this.createToolbar();
    _this.createPalettes();
    _this.createTools();
    return _this;
  }
  _createClass(PaintView, [{
    key: "getLayer",
    value: function getLayer(id) {
      return this._layers[id];
    }
  }, {
    key: "createButtons",
    value: function createButtons(onBackClicked) {
      var _this2 = this;
      var backButton = this._element.getElementsByClassName("button back")[0];
      _utilsUtilsDefault.default.addClick(backButton, function () {
        return onBackClicked();
      });
      this._undoButton = document.getElementById("undo-button");
      _utilsUtilsDefault.default.addClick(this._undoButton, function () {
        return _this2.undo();
      });
      this._redoButton = document.getElementById("redo-button");
      _utilsUtilsDefault.default.addClick(this._redoButton, function () {
        return _this2.redo();
      });
      var importImageField = document.getElementById("import-image-field");
      importImageField.addEventListener("change", function (files) {
        if (importImageField.files.length == 0) {
          return;
        }
        var file = importImageField.files[0];
        var image = new Image();
        image.src = URL.createObjectURL(file);
        image.onload = function () {
          _this2.setTool(_this2.selectionTool);
          _this2.selectionTool.setImage(image);
        };
        // Reset input field so the change event will be triggered again if the user selects the same asset again
        importImageField.value = null;
      });
      this._importImageButton = document.getElementById("import-image-button");
      _utilsUtilsDefault.default.addClick(this._importImageButton, function () {
        return importImageField.click();
      });
    }
  }, {
    key: "addLayer",
    value: function addLayer(layer) {
      layer.index = Object.keys(this._layers).length;
      this._layers[layer.id] = layer;
      return layer;
    }
  }, {
    key: "addImageLayer",
    value: function addImageLayer(id, x, y, width, height, floating) {
      var layer = new _ImageLayerDefault.default(this._sheet, id, x, y, width, height);
      layer.floating = floating;
      this.addLayer(layer);
      return layer;
    }
  }, {
    key: "addCanvasLayer",
    value: function addCanvasLayer(id, x, y, width, height, floating) {
      var layer = new _CanvasLayerDefault.default(this._sheet, id, x, y, width, height);
      layer.floating = floating;
      this.addLayer(layer);
      return layer;
    }
  }, {
    key: "removeLayer",
    value: function removeLayer(layer) {
      if (!layer) {
        return;
      }
      layer.remove();
      delete this._layers[layer.id];
    }
  }, {
    key: "createOverlay",
    value: function createOverlay() {
      if (this.overlayLayer) {
        return;
      }
      this.addLayer(new _ImageLayerDefault.default(this._sheet, "overlay-layer", 0, 0, this.width, this.height));
    }
  }, {
    key: "removeOverlay",
    value: function removeOverlay() {
      this.removeLayer(this.overlayLayer);
    }
  }, {
    key: "setOverlay",
    value: function setOverlay(url) {
      if (!url) {
        this.removeOverlay();
        return;
      }
      this.createOverlay();
      this.overlayLayer.image.src = url;
    }
  }, {
    key: "createTools",
    value: function createTools() {
      var _this3 = this;
      var penButton = document.getElementById("tool-pen");
      _utilsUtilsDefault.default.addLongClick(penButton, function () {
        return _this3.fill();
      });
      _utilsUtilsDefault.default.addClick(penButton, function () {
        return _this3.setTool(_this3.markerTool);
      });
      var eraserButton = document.getElementById("tool-eraser");
      _utilsUtilsDefault.default.addLongClick(eraserButton, function () {
        return _this3.clear(true);
      });
      _utilsUtilsDefault.default.addClick(eraserButton, function () {
        return _this3.setTool(_this3.eraserTool);
      });
      var selectionButton = document.getElementById("tool-selection");
      _utilsUtilsDefault.default.addClick(selectionButton, function () {
        return _this3.setTool(_this3.selectionTool);
      });
      _utilsUtilsDefault.default.addLongClick(selectionButton, function () {
        _this3.setTool(_this3.selectionTool);
        _this3.selectionTool.selectAll();
      });
      this._tools = [];
      // this.brushTool = this.addTool(new PenTool(this, "tool-", "source-over"));
      this.markerTool = this.addTool(new _toolsPenToolDefault.default(this, "tool-pen", "darken"));
      this.eraserTool = this.addTool(new _toolsPenToolDefault.default(this, "tool-eraser", "destination-out"));
      this.selectionTool = this.addTool(new _toolsSelectionToolDefault.default(this, "tool-selection"));
      // this.paintBucketTool = this.addTool(new PaintBucketTool(this));
      // this._currentTool = this.brushTool;
      this.setTool(this.markerTool);
    }
  }, {
    key: "addTool",
    value: function addTool(tool) {
      this._tools.push(tool);
      return tool;
    }
  }, {
    key: "createToolbar",
    value: function createToolbar() {
      this._mainToolbar = new _Toolbar.Toolbar("main-toolbar");
      this._contextToolbar = new _Toolbar.Toolbar("context-toolbar");
    }
  }, {
    key: "createPalettes",
    value: function createPalettes() {
      var _this4 = this;
      this._sizePalette = new _palettesSizePaletteDefault.default("size-palette");
      this._sizePalette.onSelectionChanged = function (lineWidth) {
        _this4._lineWidth = lineWidth;
      };
      this._lineWidth = this._sizePalette.size;
      this._colorPalette = new _palettesColorPaletteDefault.default("color-palette");
      this._colorPalette.onSelectionChanged = function (color) {
        return _this4._color = color;
      };
      this._color = this._colorPalette.color;
      this._shapePalette = new _palettesShapePaletteDefault.default("stamp-palette");
      this._shapePalette.onSelectionChanged = function (stamp) {
        _this4._stamp = stamp;
        _this4.setTool(_this4.selectionTool);
        _this4.selectionTool.setImageUrl(_this4.stamp);
      };
      this._stamp = this._shapePalette.stamp;
      this._opacity = 1;
    }
  }, {
    key: "setTool",
    value: function setTool(tool) {
      if (this._currentTool == tool) {
        return;
      }
      if (this._currentTool) {
        this._currentTool.disable();
      }
      this._currentTool = tool;
      if (this._currentTool) {
        this._currentTool.enable();
      }
      this._colorPalette.setVisible(this._currentTool == this.markerTool);
      this._sizePalette.setVisible(this._currentTool == this.markerTool || this._currentTool == this.eraserTool);
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this5 = this;
      var canvas = this.baseLayer.canvas;
      canvas.style.pointerEvents = "auto";
      // canvas.addEventListener('keydown', event => this.keyDown(event));
      document.addEventListener('keydown', function (event) {
        return _this5.keyDown(event);
      });
      canvas.addEventListener('click', function (event) {
        return event.preventDefault();
      });
      if (window.PointerEvent != null) {
        // Required to prevent pointerDown events from being choked when tapping repeatedly:
        canvas.addEventListener('touchstart', function (event) {
          if (event.cancelable) {
            event.preventDefault();
          }
        });
        canvas.addEventListener('pointerdown', function (event) {
          return _this5.pointerDown(event);
        });
        canvas.addEventListener('pointermove', function (event) {
          return _this5.pointerMove(event);
        });
        canvas.addEventListener('pointerup', function (event) {
          return _this5.pointerUp(event);
        });
        canvas.addEventListener('pointercancel', function (event) {
          return event.preventDefault();
        });
      } else {
        canvas.addEventListener('touchstart', function (event) {
          return _this5.touchStart(event);
        });
        canvas.addEventListener('touchmove', function (event) {
          return _this5.touchMove(event);
        });
        canvas.addEventListener('touchend', function (event) {
          return _this5.touchEnd(event);
        });
        canvas.addEventListener('touchcancel', function (event) {
          return event.preventDefault();
        });
      }
    }
  }, {
    key: "getPointerEventPosition",
    value: function getPointerEventPosition(event) {
      var target = event.target;
      var rect = target.getBoundingClientRect();
      var isPortraitOrientation = rect.height > rect.width;
      var nx = (event.clientX - rect.left) / rect.width;
      var ny = (event.clientY - rect.top) / rect.height;
      var x = (isPortraitOrientation ? 1 - ny : nx) * this.width;
      var y = (isPortraitOrientation ? nx : ny) * this.height;
      if (_config.config.pixelPerfect) {
        x = Math.round(x);
        y = Math.round(y);
      }
      return new _utilsPointDefault.default(x, y);
    }
  }, {
    key: "getTouchEventPosition",
    value: function getTouchEventPosition(touch) {
      var rect = this.baseLayer.canvas.getBoundingClientRect();
      var isPortraitOrientation = rect.height > rect.width;
      var nx = (touch.clientX - rect.left) / rect.width;
      var ny = (touch.clientY - rect.top) / rect.height;
      var x = (isPortraitOrientation ? 1 - ny : nx) * this.width;
      var y = (isPortraitOrientation ? nx : ny) * this.height;
      if (_config.config.pixelPerfect) {
        x = Math.round(x);
        y = Math.round(y);
      }
      return new _utilsPointDefault.default(x, y);
    }
  }, {
    key: "keyDown",
    value: function keyDown(event) {
      if (!this.isVisible()) {
        return;
      }
      switch (event.code) {
        case 'KeyV':
          if (event.metaKey) {
            this.setTool(this.selectionTool);
            this.selectionTool.pasteFromClipboard();
          }
          break;
      }
      if (!this._currentTool) {
        return;
      }
      this._currentTool.keyDown(event);
    }
  }, {
    key: "pointerDown",
    value: function pointerDown(event) {
      event.preventDefault();
      if (!event.isPrimary || event.buttons !== 1) {
        return;
      }
      var target = event.target;
      target.setPointerCapture(event.pointerId);
      this._currentTouchId = event.pointerId;
      this.down({
        timeStamp: event.timeStamp,
        position: this.getPointerEventPosition(event),
        radius: this.screenToSheet(new _utilsPointDefault.default(event.width, event.height)),
        pressure: this.getNormalizedPointerPressure(event),
        speed: 1,
        isPressed: true
      });
    }
  }, {
    key: "pointerMove",
    value: function pointerMove(event) {
      event.preventDefault();
      if (!event.isPrimary || event.buttons !== 1) {
        return;
      }
      this.move({
        timeStamp: event.timeStamp,
        position: this.getPointerEventPosition(event),
        radius: this.screenToSheet(new _utilsPointDefault.default(event.width, event.height)),
        pressure: this.getNormalizedPointerPressure(event),
        speed: 1,
        isPressed: true
      });
    }
  }, {
    key: "getNormalizedPointerPressure",
    value: function getNormalizedPointerPressure(event) {
      return event.pointerType == "pen" ? _utilsUtilsDefault.default.clamp(0.5, 1, event.pressure * 2) : 1;
    }
  }, {
    key: "pointerUp",
    value: function pointerUp(event) {
      event.preventDefault();
      if (!event.isPrimary) {
        return;
      }
      var target = event.target;
      target.releasePointerCapture(event.pointerId);
      this.up({
        timeStamp: event.timeStamp,
        position: this.getPointerEventPosition(event),
        radius: new _utilsPointDefault.default(event.width, event.height),
        pressure: 1,
        speed: 1,
        isPressed: false
      });
      this._currentTouchId = 0;
    }
  }, {
    key: "pressureChanged",
    value: function pressureChanged(force) {}
  }, {
    key: "touchStart",
    value: function touchStart(event) {
      event.preventDefault();
      if (this._currentTouchId !== 0) {
        return;
      }
      var touch = event.targetTouches[0];
      this._currentTouchId = touch.identifier;
      this.down({
        timeStamp: event.timeStamp,
        position: this.getTouchEventPosition(touch),
        radius: this.screenToSheet(new _utilsPointDefault.default(touch.radiusX, touch.radiusY)),
        pressure: touch.force,
        speed: 1,
        isPressed: true
      });
    }
  }, {
    key: "touchMove",
    value: function touchMove(event) {
      event.preventDefault();
      var touch = PaintView.findTouch(event.targetTouches, this._currentTouchId);
      if (touch == null) {
        return;
      }
      this.move({
        timeStamp: event.timeStamp,
        position: this.getTouchEventPosition(touch),
        radius: this.screenToSheet(new _utilsPointDefault.default(touch.radiusX, touch.radiusY)),
        pressure: 1,
        speed: 1,
        isPressed: true
      });
    }
  }, {
    key: "touchEnd",
    value: function touchEnd(event) {
      event.preventDefault();
      var touch = PaintView.findTouch(event.targetTouches, this._currentTouchId);
      if (touch != null) {
        // current touch is still in the list of target touches, this means it has not ended yet
        return;
      }
      this.up({
        timeStamp: event.timeStamp,
        position: new _utilsPointDefault.default(0, 0),
        radius: new _utilsPointDefault.default(0, 0),
        pressure: 1,
        speed: 1,
        isPressed: false
      });
      this._currentTouchId = 0;
    }
  }, {
    key: "move",
    value: function move(data) {
      if (!this._currentTool) {
        return;
      }
      var delta = _utilsPointDefault.default.distance(this._lastPointerData.position, data.position);
      if (delta <= 1) {
        return;
      }
      this._lastPointerData = this._lastPointerData || data;
      var timeDelta = data.timeStamp - this._lastPointerData.timeStamp;
      var speed = delta / timeDelta;
      data.speed = _utilsUtilsDefault.default.lerp(this._lastPointerData.speed, speed, 0.2);
      this._lastPointerData = data;
      this._currentTool.move(data);
    }
  }, {
    key: "down",
    value: function down(data) {
      _palettesPalette.Palette.collapseAll();
      if (!this._currentTool) {
        return;
      }
      this._lastPointerData = data;
      this._currentTool.down(data);
    }
  }, {
    key: "up",
    value: function up(data) {
      if (!this._currentTool) {
        return;
      }
      this._lastPointerData = data;
      this._currentTool.up(data);
    }
  }, {
    key: "clear",
    value: function clear() {
      var recordHistoryState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.baseLayer.clear();
      if (recordHistoryState) {
        this.recordHistoryState();
      }
    }
  }, {
    key: "fill",
    value: function fill() {
      this.baseLayer.ctx.fillStyle = this.color;
      this.baseLayer.ctx.fillRect(0, 0, this.width, this.height);
      this.recordHistoryState();
    }
  }, {
    key: "ResetHistory",
    value: function ResetHistory() {
      this._history.clear();
      this.recordHistoryState();
      this.updateUndoButtons();
    }
  }, {
    key: "recordHistoryState",
    value: function recordHistoryState() {
      this._history.recordState(this.baseLayer.getData());
      this.updateUndoButtons();
      this.setDirty();
    }
  }, {
    key: "updateUndoButtons",
    value: function updateUndoButtons() {
      this._undoButton.classList.toggle("disabled", !this._history.canUndo);
      this._redoButton.classList.toggle("disabled", !this._history.canRedo);
    }
  }, {
    key: "undo",
    value: function undo() {
      if (!this._history.canUndo) {
        return;
      }
      this.baseLayer.putData(this._history.undo());
      this.updateUndoButtons();
      this.setDirty();
    }
  }, {
    key: "redo",
    value: function redo() {
      if (!this._history.canRedo) {
        return;
      }
      this.baseLayer.putData(this._history.redo());
      this.updateUndoButtons();
      this.setDirty();
    }
  }, {
    key: "restoreCurrentHistoryState",
    value: function restoreCurrentHistoryState() {
      this.baseLayer.putData(this._history.getCurrentState());
    }
  }, {
    key: "loadImage",
    value: function loadImage(id) {
      var _this6 = this;
      return _storageImageStorageDefault.default.loadImage(id).then(function (image) {
        _this6._imageId = id;
        _this6.clear();
        if (image) {
          _this6.baseLayer.drawImage(image);
        }
        _this6.setOverlay(_utilsUtilsDefault.default.getImageOverlayUrl(id));
        _this6.ResetHistory();
        _this6._isDirty = false;
      });
    }
  }, {
    key: "saveImage",
    value: function saveImage() {
      var _this7 = this;
      _utilsUtilsDefault.default.log("Saving image");
      this.baseLayer.canvas.toBlob(function (blob) {
        return _storageImageStorageDefault.default.saveImage(_this7._imageId, blob);
      });
      this._isDirty = false;
      this._lastSaveTimestamp = Date.now();
    }
  }, {
    key: "setDirty",
    value: function setDirty() {
      this._isDirty = true;
    }
  }, {
    key: "show",
    value: function show() {
      var _this8 = this;
      _get(_getPrototypeOf(PaintView.prototype), "show", this).call(this);
      this._currentTouchId = 0;
      this._autoMaskCaptured = false;
      window.requestAnimationFrame(function (timeStamp) {
        return _this8.tick(timeStamp);
      });
      this._currentTool.enable();
    }
  }, {
    key: "hide",
    value: function hide() {
      _palettesPalette.Palette.collapseAll();
      if (this._currentTool) {
        this._currentTool.disable();
      }
      if (this._layers) {
        // Always save when closing the paint view in case we forgot to set the dirty flag somewhere:
        this.saveImage();
      }
      if (this._history) {
        this._history.clear();
      }
      _get(_getPrototypeOf(PaintView.prototype), "hide", this).call(this);
    }
  }, {
    key: "tick",
    value: function tick(timeStamp) {
      var _this9 = this;
      if (!this.isVisible()) {
        return;
      }
      window.requestAnimationFrame(function (timeStamp) {
        return _this9.tick(timeStamp);
      });
      if (_config.config.debug) {
        _utilsUtilsDefault.default.updateFPSCounter();
      }
      var delta = timeStamp - this._tickTimeStamp;
      this._tickTimeStamp = timeStamp;
      if (this._currentTool) {
        this._currentTool.tick(delta);
        // never save while painting to avoid lags:
        if (this._lastPointerData && this._lastPointerData.isPressed) {
          return;
        }
      }
      if (this._isDirty && Date.now() > this._lastSaveTimestamp + _config.config.saveInterval) {
        this.saveImage();
      }
    }
  }, {
    key: "captureAutoMask",
    value: function captureAutoMask(position) {
      if (!_config.config.useAutoMask) {
        return;
      }
      this._autoMaskCaptured = true;
      // if (!this.overlayLayer){
      // return;
      // }
      if (!this._autoMaskCtx) {
        var autoMaskCanvas = document.createElement("canvas");
        autoMaskCanvas.id = "auto-mask";
        autoMaskCanvas.width = this.width;
        autoMaskCanvas.height = this.height;
        this._autoMaskCtx = autoMaskCanvas.getContext("2d", {
          alpha: true
        });
      }
      var imageData = this._autoMaskCtx.getImageData(0, 0, this.width, this.height);
      // avoid expensive floodfill:
      var index = (position.x + position.y * this.width) * 4 + 3;
      // if (this._autoMaskCaptured && imageData.data[index] > 0){
      // return;
      // }
      _utilsUtilsDefault.default.log("capturing auto mask");
      _utilsUtilsDefault.default.floodFill(this.baseLayer.ctx, imageData.data, position, this.color);
      _utilsUtilsDefault.default.dilateMask(imageData.data, this.width, this.height);
      this._autoMaskCtx.putImageData(imageData, 0, 0);
    }
  }, {
    key: "processOverlay",
    value: function processOverlay(ctx) {
      var imageData = ctx.getImageData(0, 0, this.width, this.height);
      var pixels = imageData.data;
      for (var i = pixels.length - 1; i >= 0; i--) {
        pixels[i] = pixels[i] > 64 ? 255 : 0;
      }
      ctx.putImageData(imageData, 0, 0);
    }
  }, {
    key: "screenToSheet",
    value: function screenToSheet(p) {
      return new _utilsPointDefault.default(p.x / screen.width * _config.config.width, p.y / screen.height * _config.config.height);
    }
  }], [{
    key: "findTouch",
    value: function findTouch(touches, id) {
      for (var i = 0; i < touches.length; i++) {
        if (touches[i].identifier == id) {
          return touches[i];
        }
      }
      return null;
    }
  }]);
  return PaintView;
})(_View2.View);

},{"./View":"30r6k","../palettes/ColorPalette":"diaTM","../palettes/SizePalette":"5u02W","../utils/Utils":"1H53o","../tools/PenTool":"6lba4","../utils/Point":"6AhXm","../palettes/Palette":"1J0Eg","../storage/ImageStorage":"3kpel","../config":"1tzQg","../palettes/ShapePalette":"4aYdj","../CanvasLayer":"6xo2a","../ImageLayer ":"1ITGs","../tools/SelectionTool":"Hlzxz","../Toolbar":"5EiOX","../History":"27fq9","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"diaTM":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return ColorPalette;
});
var _Palette2 = require("./Palette");
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
var ColorPalette = /*#__PURE__*/(function (_Palette) {
  _inherits(ColorPalette, _Palette);
  var _super = _createSuper(ColorPalette);
  _createClass(ColorPalette, [{
    key: "color",
    get: function get() {
      return this.selectedOption;
    },
    set: function set(value) {
      this.selectedOption = value;
    }
  }]);
  function ColorPalette(id) {
    var _this;
    _classCallCheck(this, ColorPalette);
    // 16 color Mac palette
    // https://en.wikipedia.org/wiki/List_of_software_palettes#Apple_Macintosh_default_16-color_palette
    // let colors: string[] = [
    // "#FFFFFF", "#f5f60d", "#f5650a", "#d50406",
    // "#f50695", "#330496", "#0306c5", "#0692f0",
    // "#06a606", "#026405", "#643403", "#946434",
    // "#b5b5b5", "#848484", "#444444", "#030303",
    // ];
    // 32 color palette
    // https://github.com/geoffb/dawnbringer-palettes
    var colors = ["#000000", "#222034", "#45283c", "#663931", "#8f563b", "#df7126", "#d9a066", "#eec39a", "#fbf236", "#99e550", "#6abe30", "#37946e", "#4b692f", "#524b24", "#323c39", "#3f3f74", "#306082", "#5b6ee1", "#639bff", "#5fcde4", "#cbdbfc", "#ffffff", "#9badb7", "#847e87", "#696a6a", "#595652", "#76428a", "#ac3232", "#d95763", "#d77bba", "#8f974a", "#8a6f30"];
    _this = _super.call(this, id, colors);
    _this.selectedIndex = 15;
    return _this;
  }
  _createClass(ColorPalette, [{
    key: "updateOptionElement",
    value: function updateOptionElement(element, option) {
      element.style.background = option;
    }
  }]);
  return ColorPalette;
})(_Palette2.Palette);

},{"./Palette":"1J0Eg","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"1J0Eg":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Palette", function () {
  return Palette;
});
var _viewsView = require("../views/View");
var _utilsUtils = require("../utils/Utils");
var _utilsUtilsDefault = _parcelHelpers.interopDefault(_utilsUtils);
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || (/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/).test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
var Palette = /*#__PURE__*/(function (_View) {
  _inherits(Palette, _View);
  var _super = _createSuper(Palette);
  _createClass(Palette, [{
    key: "selectedIndex",
    get: function get() {
      return this._selectedIndex;
    },
    set: function set(value) {
      this._selectedIndex = Math.max(0, Math.min(this._options.length - 1, value));
      this.updateSelectedOptionElement(this._selectedElement, this.selectedOption);
    }
  }, {
    key: "selectedOption",
    get: function get() {
      return this._options[this._selectedIndex];
    },
    set: function set(value) {
      var index = this._options.indexOf(value);
      if (index === -1) {
        return;
      }
      this.selectedIndex = index;
    }
  }, {
    key: "isCollapsed",
    get: function get() {
      return this._element.classList.contains("collapsed");
    }
  }]);
  function Palette(id, options) {
    var _this;
    var rightAlign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    _classCallCheck(this, Palette);
    _this = _super.call(this, id);
    _this._options = options;
    _this._optionElements = [];
    _this._selectedIndex = 0;
    _this.createOptions();
    _this.show();
    _this.collapse();
    return _this;
  }
  _createClass(Palette, [{
    key: "createOptions",
    value: function createOptions() {
      this.addSelectedOption();
      this.addOptionElements();
    }
  }, {
    key: "recreateOptions",
    value: function recreateOptions() {
      this.clear();
      this.createOptions();
    }
  }, {
    key: "collapse",
    value: function collapse() {
      this._element.classList.add("collapsed");
      if (Palette._expandedPalette == this) {
        Palette._expandedPalette = null;
      }
    }
  }, {
    key: "expand",
    value: function expand() {
      Palette.collapseAll();
      this._element.classList.remove("collapsed");
      Palette._expandedPalette = this;
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.isCollapsed) {
        this.expand();
      } else {
        this.collapse();
      }
    }
  }, {
    key: "addOption",
    value: function addOption(value) {
      this._options.push(value);
      this.addOptionElement(this._options.length - 1, value);
      this.updateOptionsWidth();
    }
  }, {
    key: "removeOption",
    value: function removeOption(index) {
      this._options.splice(index, 1);
      this._optionElements[index].remove();
      this._optionElements.splice(index, 1);
      // update the index assigned to each element:
      this.recreateOptions();
    }
  }, {
    key: "addSelectedOption",
    value: function addSelectedOption() {
      var _this2 = this;
      var element = document.createElement("div");
      element.classList.add("option");
      this._selectedElement = element;
      _utilsUtilsDefault.default.addClick(element, function () {
        return _this2.toggle();
      });
      this.updateSelectedOptionElement(element, this.selectedOption);
      this._element.appendChild(element);
    }
  }, {
    key: "addOptionElements",
    value: function addOptionElements() {
      var element = document.createElement("div");
      element.classList.add("options");
      this._optionsElement = element;
      this.addArrowElement();
      var i = 0;
      var _iterator = _createForOfIteratorHelper(this._options), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var option = _step.value;
          this.addOptionElement(i, option);
          i++;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.updateOptionsWidth();
      this._element.appendChild(element);
    }
  }, {
    key: "updateOptionsWidth",
    value: function updateOptionsWidth() {
      this._optionsElement.style.width = Math.min(8, this._options.length) * 1.25 + "em";
    }
  }, {
    key: "addArrowElement",
    value: function addArrowElement() {
      var element = document.createElement("div");
      element.classList.add("arrow");
      this._optionsElement.appendChild(element);
    }
  }, {
    key: "addOptionElement",
    value: function addOptionElement(index, option) {
      var _this3 = this;
      var element = document.createElement("div");
      element.classList.add("option");
      element.dataset.index = ("").concat(index);
      _utilsUtilsDefault.default.addLongClick(element, function (event) {
        return _this3.optionLongClicked(event, option, index);
      });
      _utilsUtilsDefault.default.addClick(element, function (event) {
        return _this3.optionClicked(event, option, index);
      });
      this.updateOptionElement(element, option);
      this._optionsElement.appendChild(element);
      this._optionElements[index] = element;
    }
  }, {
    key: "optionClicked",
    value: function optionClicked(event, option, index) {
      this.selectedIndex = index;
      this.collapse();
      if (this.onSelectionChanged) {
        this.onSelectionChanged(option, index);
      }
    }
  }, {
    key: "optionLongClicked",
    value: function optionLongClicked(event, option, index) {}
  }, {
    key: "updateOptionElement",
    value: function updateOptionElement(element, option) {}
  }, {
    key: "updateSelectedOptionElement",
    value: function updateSelectedOptionElement(element, option) {
      this.updateOptionElement(element, option);
    }
  }], [{
    key: "collapseAll",
    value: function collapseAll() {
      if (Palette._expandedPalette) {
        Palette._expandedPalette.collapse();
      }
    }
  }]);
  return Palette;
})(_viewsView.View);

},{"../views/View":"30r6k","../utils/Utils":"1H53o","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"5u02W":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return SizePalette;
});
var _Palette2 = require("./Palette");
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
var SizePalette = /*#__PURE__*/(function (_Palette) {
  _inherits(SizePalette, _Palette);
  var _super = _createSuper(SizePalette);
  _createClass(SizePalette, [{
    key: "size",
    get: function get() {
      return this.selectedOption;
    },
    set: function set(value) {
      this.selectedOption = value;
    }
  }]);
  function SizePalette(id) {
    var _this;
    _classCallCheck(this, SizePalette);
    var sizes = [2, 8, 24, 40];
    _this = _super.call(this, id, sizes, true);
    _this.selectedIndex = 1;
    return _this;
  }
  _createClass(SizePalette, [{
    key: "updateOptionElement",
    value: function updateOptionElement(element, option) {
      var width = option / 40;
      element.innerHTML = '<div class="line-width" style="width:' + width + 'em"></div>';
    }
  }]);
  return SizePalette;
})(_Palette2.Palette);

},{"./Palette":"1J0Eg","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"6lba4":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return PenTool;
});
var _Tool2 = require("./Tool");
var _Tool2Default = _parcelHelpers.interopDefault(_Tool2);
var _utilsPoint = require("../utils/Point");
var _utilsPointDefault = _parcelHelpers.interopDefault(_utilsPoint);
var _utilsUtils = require("../utils/Utils");
var _utilsUtilsDefault = _parcelHelpers.interopDefault(_utilsUtils);
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
// Paints lines with varying stroke width
var PenTool = /*#__PURE__*/(function (_Tool) {
  _inherits(PenTool, _Tool);
  var _super = _createSuper(PenTool);
  function PenTool(painter, buttonId) {
    var _this;
    var operation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "darken";
    _classCallCheck(this, PenTool);
    _this = _super.call(this, painter, buttonId);
    _this._operation = operation;
    _this.createBrushCtx();
    return _this;
  }
  _createClass(PenTool, [{
    key: "createBrushCtx",
    value: function createBrushCtx() {
      var brushCanvas = document.createElement("canvas");
      brushCanvas.id = "brush";
      brushCanvas.width = 64;
      brushCanvas.height = 64;
      this._brushCtx = brushCanvas.getContext("2d", {
        alpha: true
      });
      this._brushCtx.imageSmoothingQuality = "high";
      this._brushCtx.imageSmoothingEnabled = true;
    }
  }, {
    key: "down",
    value: function down(data) {
      this._painter.captureAutoMask(data.position.copy().round());
      this._points = [data.position];
      var width = data.radius.x;
      // this.getWidth(data.pressure, data.speed);
      this._widths = [width];
      this._startIndex = 0;
      var ctx = this._painter.baseLayer.ctx;
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color;
      // let ctx = this._brushCtx;
      // let brushWidth = ctx.canvas.width;
      // ctx.clearRect(0, 0, brushWidth, brushWidth);
      // ctx.fillStyle = this.color;
      // let radius = brushWidth * 0.5;
      // ctx.beginPath();
      // ctx.arc(radius, radius, radius - 1, 0, 2 * Math.PI);
      // ctx.fill();
      this._painter.baseLayer.ctx.globalCompositeOperation = this._operation;
      this.requestDrawPath();
    }
  }, {
    key: "up",
    value: function up() {
      this._painter.recordHistoryState();
    }
  }, {
    key: "tick",
    value: function tick(delta) {
      if (this._drawPathRequested) {
        this.drawPath();
        this._drawPathRequested = false;
      }
    }
  }, {
    key: "requestDrawPath",
    value: function requestDrawPath() {
      this._drawPathRequested = true;
    }
  }, {
    key: "drawPath",
    value: function drawPath() {
      if (this._points.length == 0) {
        return;
      }
      var ctx = this._painter.baseLayer.ctx;
      this.drawConnectedLines(ctx, this._points.slice(this._startIndex), this._widths.slice(this._startIndex));
      // if (this._points.length - this._startIndex == 1){
      // const p = this._points[this._startIndex];
      // this.drawBrush(ctx, p.x, p.y, this._widths[this._startIndex]);
      // return;
      // }
      // 
      // for (let i = this._startIndex; i < this._points.length - 1; i++) {
      // const p1 = this._points[i];
      // const p2 = this._points[i+1];
      // 
      // const w1 = this._widths[i];
      // const w2 = this._widths[i+1];
      // 
      // const dist = Point.distance(p1, p2);
      // const step = Math.max(1, 0.125 * Math.min(w1, w2, 64));
      // for (let d = 0; d <= dist; d += step){
      // const a = d / dist;
      // const p = Point.lerp(p1, p2, a);
      // const w = Utils.lerp(w1, w2, a);
      // this.drawBrush(ctx, p.x, p.y, w);
      // }
      // }
      this._startIndex = Math.max(0, this._points.length - 1);
    }
  }, {
    key: "drawConnectedLines",
    value: function drawConnectedLines(ctx, points, widths) {
      var pointCount = points.length;
      if (pointCount == 0) {
        return;
      }
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      var p1 = points[0];
      ctx.moveTo(p1.x, p1.y);
      ctx.lineWidth = widths[0];
      if (pointCount == 1) {
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        return;
      }
      // TODO: Draw multiple lines to simulate thickness and reduce the number of strokes
      for (var i = 1; i < pointCount; i++) {
        if (ctx.lineWidth != widths[i]) {
          ctx.stroke();
          ctx.beginPath();
          ctx.lineWidth = widths[i];
          ctx.moveTo(points[i - 1].x, points[i - 1].y);
        }
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
    }
  }, {
    key: "drawBrush",
    value: function drawBrush(ctx, x, y, width) {
      var radius = width * 0.5;
      x -= radius;
      y -= radius;
      // x = Math.floor(x - radius);
      // y = Math.floor(y - radius);
      // width = Math.ceil(width);
      ctx.drawImage(this._brushCtx.canvas, x, y, width, width);
    }
  }, {
    key: "move",
    value: function move(data) {
      var newPoints = this.interpolatePoints(data.position);
      this._points = this._points.concat(newPoints);
      var numSegments = newPoints.length;
      var width = this.getWidth(data.pressure, data.speed);
      var lastWidth = this._widths[this._widths.length - 1];
      var maxWidthDifferencePerSegment = 2;
      var maxWidthDifference = 2 * numSegments;
      width = _utilsUtilsDefault.default.clamp(lastWidth - maxWidthDifference, lastWidth + maxWidthDifference, width);
      for (var i = 0; i < numSegments; i++) {
        this._widths.push(data.radius.x);
      }
      this.requestDrawPath();
    }
  }, {
    key: "interpolatePoints",
    value: function interpolatePoints(newPoint) {
      var segmentLength = Math.max(4, 0.1 * this.lineWidth);
      var points = [];
      if (this._points.length == 0) {
        return;
      }
      var start = this._points[this._points.length - 1];
      var end = newPoint;
      var dist = _utilsPointDefault.default.distance(start, end);
      if (dist < segmentLength) {
        return points;
      }
      var control = start;
      if (this._points.length > 1) {
        var tangent = _utilsPointDefault.default.subtract(start, this._points[this._points.length - 2]).normalize();
        control = _utilsPointDefault.default.add(start, tangent.copy().scale(0.3 * dist));
      }
      var a = segmentLength / dist;
      for (var i = a; i <= 1; i += a) {
        var point = this.pointOnQuadraticCurve(start, control, end, i);
        points.push(point);
      }
      return points;
    }
  }, {
    key: "pointOnQuadraticCurve",
    value: function pointOnQuadraticCurve(start, control, end, a) {
      return _utilsPointDefault.default.add(_utilsPointDefault.default.scale(start, (1 - a) * (1 - a)), _utilsPointDefault.default.scale(control, 2 * a * (1 - a)), _utilsPointDefault.default.scale(end, a * a));
    }
  }, {
    key: "pressureChanged",
    value: function pressureChanged() {
      this.requestDrawPath();
    }
  }, {
    key: "getWidth",
    value: function getWidth(pressure, speed) {
      pressure = _utilsUtilsDefault.default.clamp(0.5, 2, pressure * 2);
      speed = _utilsUtilsDefault.default.clamp(1, 2, speed);
      return this.lineWidth * pressure / speed;
    }
  }, {
    key: "applyAutoMask",
    value: function applyAutoMask() {
      if (!this._painter.autoMaskCtx) {
        return;
      }
      var ctx = this.getBufferCtx();
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(this._painter.autoMaskCtx.canvas, 0, 0);
      ctx.globalCompositeOperation = "source-over";
    }
  }]);
  return PenTool;
})(_Tool2Default.default);

},{"./Tool":"7utpK","../utils/Point":"6AhXm","../utils/Utils":"1H53o","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"7utpK":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return Tool;
});
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// Base class for all tools
var Tool = /*#__PURE__*/(function () {
  _createClass(Tool, [{
    key: "color",
    get: function get() {
      return this._painter.color;
    }
  }, {
    key: "opacity",
    get: function get() {
      return this._painter.opacity;
    }
  }, {
    key: "lineWidth",
    get: function get() {
      return this._painter.lineWidth;
    }
  }]);
  function Tool(painter, buttonId) {
    _classCallCheck(this, Tool);
    this._painter = painter;
    this._buttonElement = document.getElementById(buttonId);
  }
  _createClass(Tool, [{
    key: "createBufferCtx",
    // creates a context to draw the current stroke to so we can draw the complete stroke with a different
    // operation. The buffer can be shared by different tools.
    // creates a context to draw the current stroke to so we can draw the complete stroke with a different
    // operation. The buffer can be shared by different tools.
    value: function createBufferCtx() {
      var brushCanvas = document.createElement("canvas");
      brushCanvas.id = "buffer";
      brushCanvas.width = this._painter.width;
      brushCanvas.height = this._painter.height;
      Tool._bufferCtx = brushCanvas.getContext("2d", {
        alpha: true
      });
      Tool._bufferCtx.imageSmoothingQuality = "high";
      Tool._bufferCtx.imageSmoothingEnabled = true;
    }
  }, {
    key: "getBufferCtx",
    value: function getBufferCtx() {
      if (Tool._bufferCtx == null) {
        this.createBufferCtx();
      }
      return Tool._bufferCtx;
    }
  }, {
    key: "enable",
    value: function enable() {
      this._buttonElement.classList.add("selected");
    }
  }, {
    key: "disable",
    value: function disable() {
      this._buttonElement.classList.remove("selected");
    }
  }, {
    key: "down",
    value: function down(data) {}
  }, {
    key: "move",
    value: function move(data) {}
  }, {
    key: "up",
    value: function up(data) {}
  }, {
    key: "pressureChanged",
    value: function pressureChanged() {}
  }, {
    key: "tick",
    value: function tick(delta) {}
  }, {
    key: "keyDown",
    value: function keyDown(event) {}
  }]);
  return Tool;
})();

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"4aYdj":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return ShapePalette;
});
var _Palette2 = require("./Palette");
var _storageImageStorage = require("../storage/ImageStorage");
var _storageImageStorageDefault = _parcelHelpers.interopDefault(_storageImageStorage);
var _config = require("../config");
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || (/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/).test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
var ShapePalette = /*#__PURE__*/(function (_Palette) {
  _inherits(ShapePalette, _Palette);
  var _super = _createSuper(ShapePalette);
  _createClass(ShapePalette, [{
    key: "stamp",
    get: function get() {
      return this.selectedOption;
    }
  }]);
  function ShapePalette(id) {
    var _this;
    _classCallCheck(this, ShapePalette);
    _this = _super.call(this, id, _config.config.defaultShapes, true);
    _this._shapeIds = {};
    _this.selectedIndex = 0;
    _storageImageStorageDefault.default.keys().then(function (keys) {
      var shapesIds = keys.filter(function (x) {
        return x.startsWith("Shape");
      });
      var _iterator = _createForOfIteratorHelper(shapesIds), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var shapeId = _step.value;
          _this.addShapeFromImageId(shapeId);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
    _storageImageStorageDefault.default.addChangeListener(function (change, id) {
      if (change == "save" && id.startsWith("Shape")) {
        _this.addShapeFromImageId(id);
      }
    });
    return _this;
  }
  _createClass(ShapePalette, [{
    key: "addShapeFromImageId",
    value: function addShapeFromImageId(stampId) {
      var _this2 = this;
      _storageImageStorageDefault.default.loadBlob(stampId).then(function (blob) {
        var url = URL.createObjectURL(blob);
        _this2._shapeIds[url] = stampId;
        _this2.addOption(url);
      });
    }
  }, {
    key: "optionLongClicked",
    value: function optionLongClicked(event, option, index) {
      this.deleteShape(index);
    }
  }, {
    key: "updateOptionElement",
    value: function updateOptionElement(element, option) {
      element.style.backgroundImage = ("url(\"").concat(option, "\")");
    }
  }, {
    key: "updateSelectedOptionElement",
    value: function updateSelectedOptionElement(element, option) {
      element.innerHTML = '<i class="fas fa-shapes"></i>';
    }
  }, {
    key: "deleteShape",
    value: function deleteShape(index) {
      var _this3 = this;
      var option = this._options[index];
      var stampId = this._shapeIds[option];
      if (!stampId) {
        return;
      }
      _storageImageStorageDefault.default.deleteImage(stampId).then(function () {
        delete _this3._shapeIds[option];
        _this3.removeOption(index);
        if (_this3.selectedIndex == index) {
          // select the following item that now has the same index
          _this3.selectedIndex = index;
        }
      });
    }
  }]);
  return ShapePalette;
})(_Palette2.Palette);

},{"./Palette":"1J0Eg","../storage/ImageStorage":"3kpel","../config":"1tzQg","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"6xo2a":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return CanvasLayer;
});
var _config = require("./config");
var _Layer2 = require("./Layer");
var _Layer2Default = _parcelHelpers.interopDefault(_Layer2);
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
var CanvasLayer = /*#__PURE__*/(function (_Layer) {
  _inherits(CanvasLayer, _Layer);
  var _super = _createSuper(CanvasLayer);
  _createClass(CanvasLayer, [{
    key: "canvas",
    get: function get() {
      return this._element;
    }
  }, {
    key: "ctx",
    get: function get() {
      return this._ctx;
    }
  }]);
  function CanvasLayer(parent, id, x, y, width, height) {
    var _this;
    _classCallCheck(this, CanvasLayer);
    _this = _super.call(this, parent, "canvas", id, x, y, width, height);
    _this._ctx = _this.canvas.getContext("2d", {
      alpha: true
    });
    _this._ctx.imageSmoothingQuality = "high";
    _this._ctx.imageSmoothingEnabled = _config.config.imageSmoothing;
    return _this;
  }
  _createClass(CanvasLayer, [{
    key: "getData",
    value: function getData() {
      return this._ctx.getImageData(0, 0, this.width, this.height);
    }
  }, {
    key: "putData",
    value: function putData(data) {
      this._ctx.putImageData(data, 0, 0);
    }
  }, {
    key: "drawImage",
    value: function drawImage(image, rect) {
      var _ref = rect || ({
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      }), x = _ref.x, y = _ref.y, width = _ref.width, height = _ref.height;
      this._ctx.drawImage(image, x, y, width, height);
    }
  }, {
    key: "clear",
    value: function clear(rect) {
      var _ref2 = rect || ({
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      }), x = _ref2.x, y = _ref2.y, width = _ref2.width, height = _ref2.height;
      this._ctx.clearRect(x, y, width, height);
    }
  }]);
  return CanvasLayer;
})(_Layer2Default.default);

},{"./config":"1tzQg","./Layer":"hkRDB","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"hkRDB":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return Layer;
});
var _config = require("./config");
var _utilsUtils = require("./utils/Utils");
var _utilsUtilsDefault = _parcelHelpers.interopDefault(_utilsUtils);
var _utilsPoint = require("./utils/Point");
var _utilsPointDefault = _parcelHelpers.interopDefault(_utilsPoint);
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var Layer = /*#__PURE__*/(function () {
  _createClass(Layer, [{
    key: "id",
    get: function get() {
      return this._element.id;
    }
  }, {
    key: "index",
    get: function get() {
      return this._index;
    },
    set: function set(v) {
      this._index = v;
      this.transform(this.position, this.scale, this.rotation);
    }
  }, {
    key: "width",
    get: function get() {
      return this._width;
    }
  }, {
    key: "height",
    get: function get() {
      return this._height;
    }
  }, {
    key: "position",
    get: function get() {
      return this._position;
    }
  }, {
    key: "rotation",
    get: function get() {
      return this._rotation;
    }
  }, {
    key: "scale",
    get: function get() {
      return this._scale;
    }
  }, {
    key: "floating",
    get: function get() {
      return this._element.classList.contains("floating");
    },
    set: function set(value) {
      this._element.classList.toggle("floating", value);
      this._element.style.pointerEvents = value ? "auto" : "none";
      if (value) {
        this.addEventListeners();
      } else {
        this.removeEventListeners();
      }
    }
  }]);
  function Layer(parent, tag, id, x, y, width, height) {
    _classCallCheck(this, Layer);
    _defineProperty(this, "_startScale", 1);
    _defineProperty(this, "_startRotation", 0);
    _defineProperty(this, "_position", new _utilsPointDefault.default(0, 0));
    _defineProperty(this, "_scale", 1);
    _defineProperty(this, "_rotation", 0);
    _defineProperty(this, "_lastTouchStartTime", 0);
    _defineProperty(this, "_pointers", []);
    this._element = document.createElement(tag);
    this._element.id = id;
    this._element.classList.add("layer");
    this._index = 0;
    this._width = width;
    this._height = height;
    this._element.width = width;
    this._element.height = height;
    this._element.style.width = ("").concat(width, "em");
    this._element.style.height = ("").concat(height, "em");
    this._element.style.pointerEvents = "none";
    parent.appendChild(this._element);
    this.transform(new _utilsPointDefault.default(x, y), 1, 0);
    this.bindEventListeners();
  }
  _createClass(Layer, [{
    key: "remove",
    value: function remove() {
      this._element.remove();
    }
  }, {
    key: "resize",
    value: function resize(width, height) {
      var x = this.position.x + 0.5 * (this.width - width);
      var y = this.position.y + 0.5 * (this.height - height);
      this.setPositionAndSize(x, y, width, height);
    }
  }, {
    key: "setPositionAndSize",
    value: function setPositionAndSize(x, y, width, height) {
      this._width = width;
      this._height = height;
      this._element.width = width;
      this._element.height = height;
      this._element.style.width = ("").concat(width, "em");
      this._element.style.height = ("").concat(height, "em");
      this.transform(new _utilsPointDefault.default(x, y), this.scale, this.rotation);
    }
  }, {
    key: "drawToCanvas",
    value: function drawToCanvas(ctx) {
      ctx.save();
      var x = this._position.x + 0.5 * this.width;
      var y = this._position.y + 0.5 * this.height;
      ctx.setTransform(this._scale, 0, 0, this._scale, x, y);
      ctx.rotate(this._rotation);
      ctx.translate(-0.5 * this.width, -0.5 * this.height);
      ctx.drawImage(this._element, 0, 0);
      ctx.restore();
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      // pinch gesture handling inspired by https://codepen.io/hanseklund/pen/izloq
      this._element.addEventListener('click', this.preventDefault);
      if (_utilsUtilsDefault.default.pointerEventsSupported()) {
        this._element.addEventListener('touchstart', this.preventDefault);
        this._element.addEventListener('pointerdown', this.pointerDown);
      } else {
        this._element.addEventListener('touchstart', this.touchStart);
      }
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      this._element.removeEventListener('click', this.preventDefault);
      if (_utilsUtilsDefault.default.pointerEventsSupported()) {
        this._element.removeEventListener('touchstart', this.preventDefault);
        this._element.removeEventListener('pointerdown', this.pointerDown);
      } else {
        this._element.removeEventListener('touchstart', this.touchStart);
      }
    }
  }, {
    key: "preventDefault",
    value: function preventDefault(event) {
      event.preventDefault();
    }
  }, {
    key: "doubleTap",
    value: function doubleTap(event) {
      if (this.onDoubleTap) {
        this.onDoubleTap(event);
      }
    }
  }, {
    key: "pointerDown",
    value: function pointerDown(event) {
      event.preventDefault();
      this._element.setPointerCapture(event.pointerId);
      this.addPointerEvent(event);
      if (this._pointers.length === 1) {
        if (event.timeStamp < this._lastTouchStartTime + _config.config.doubleTapDelay) {
          this.doubleTap(event);
        }
        this._lastTouchStartTime = event.timeStamp;
        this._element.addEventListener("pointermove", this.pointerMove);
        this._element.addEventListener("pointerup", this.pointerUp);
        this._pinchCenter = new _utilsPointDefault.default(this._position.x + 0.5 * this.width, this._position.y + 0.5 * this.height);
        if (event.altKey) {
          var p1 = this.clientToPixel(this._pointers[0]);
          var p2 = _utilsPointDefault.default.mirror(p1, this._pinchCenter);
          this.pinchStart(p1, p2);
        } else {
          this.dragStart(this.clientToPixel(this._pointers[0]));
        }
      }
      if (this._pointers.length === 2) {
        this.pinchStart(this.clientToPixel(this._pointers[0]), this.clientToPixel(this._pointers[1]));
      }
    }
  }, {
    key: "addPointerEvent",
    value: function addPointerEvent(event) {
      var index = this._pointers.findIndex(function (x) {
        return x.pointerId == event.pointerId;
      });
      if (index < 0) {
        this._pointers.push(event);
      } else {
        this._pointers[index] = event;
      }
    }
  }, {
    key: "removePointerEvent",
    value: function removePointerEvent(event) {
      var index = this._pointers.findIndex(function (x) {
        return x.pointerId == event.pointerId;
      });
      if (index >= 0) {
        this._pointers.splice(index, 1);
      }
    }
  }, {
    key: "pointerMove",
    value: function pointerMove(event) {
      event.preventDefault();
      this.addPointerEvent(event);
      this.move(this._pointers, event.altKey);
    }
  }, {
    key: "pointerUp",
    value: function pointerUp(event) {
      event.preventDefault();
      this._element.releasePointerCapture(event.pointerId);
      this.removePointerEvent(event);
      if (this._pointers.length == 1) {
        this.dragStart(this.clientToPixel(this._pointers[0]));
      }
      if (this._pointers.length == 0) {
        this._element.removeEventListener("pointermove", this.pointerMove);
        this._element.removeEventListener("pointerup", this.pointerUp);
      }
    }
  }, {
    key: "touchStart",
    value: function touchStart(event) {
      event.preventDefault();
      if (event.touches.length === 1) {
        if (event.timeStamp < this._lastTouchStartTime + _config.config.doubleTapDelay) {
          this.doubleTap(event);
        }
        this._lastTouchStartTime = event.timeStamp;
        this._element.addEventListener('touchmove', this.touchMove);
        this._element.addEventListener('touchend', this.touchEnd);
        this._pinchCenter = new _utilsPointDefault.default(this._position.x + 0.5 * this.width, this._position.y + 0.5 * this.height);
        if (event.altKey) {
          var p1 = this.clientToPixel(event.touches[0]);
          var p2 = _utilsPointDefault.default.mirror(p1, this._pinchCenter);
          this.pinchStart(p1, p2);
        } else {
          this.dragStart(this.clientToPixel(event.touches[0]));
        }
      }
      if (event.touches.length === 2) {
        this.pinchStart(this.clientToPixel(event.touches[0]), this.clientToPixel(event.touches[1]));
      }
    }
  }, {
    key: "touchMove",
    value: function touchMove(event) {
      event.preventDefault();
      this.move(event.touches, event.altKey);
    }
  }, {
    key: "move",
    value: function move(pointers, altKey) {
      if (pointers.length === 1) {
        if (altKey) {
          var p1 = this.clientToPixel(pointers[0]);
          var p2 = _utilsPointDefault.default.mirror(p1, this._pinchCenter);
          this.pinchMove(p1, p2);
        } else {
          this.dragMove(this.clientToPixel(pointers[0]));
        }
      }
      if (pointers.length === 2) {
        this.pinchMove(this.clientToPixel(pointers[0]), this.clientToPixel(pointers[1]));
      }
    }
  }, {
    key: "touchEnd",
    value: function touchEnd(event) {
      event.preventDefault();
      this._element.removeEventListener('touchmove', this.touchMove);
      this._element.addEventListener('touchend', this.touchEnd);
    }
  }, {
    key: "transform",
    value: function transform(position, scale, rotation) {
      this._position = position;
      this._rotation = rotation;
      this._scale = scale;
      var index = this._index;
      this._element.style.transform = ("translate(").concat(position.x, "em, ").concat(position.y, "em) rotate(").concat(rotation, "rad) scale(").concat(scale, ") translateZ(").concat(index, "px)");
      this._element.style.outlineWidth = ("").concat(2 / scale, "em");
    }
  }, {
    key: "bindEventListeners",
    value: function bindEventListeners() {
      // TODO: Find a better way. This is ugly:
      this.touchStart = this.touchStart.bind(this);
      this.touchMove = this.touchMove.bind(this);
      this.touchEnd = this.touchEnd.bind(this);
      this.pointerDown = this.pointerDown.bind(this);
      this.pointerMove = this.pointerMove.bind(this);
      this.pointerUp = this.pointerUp.bind(this);
    }
  }, {
    key: "dragStart",
    value: function dragStart(position) {
      this._localDragPosition = _utilsPointDefault.default.subtract(position, this.position);
    }
  }, {
    key: "dragMove",
    value: function dragMove(position) {
      position.subtract(this._localDragPosition);
      this.transform(position, this._scale, this._rotation);
    }
  }, {
    key: "pinchStart",
    value: function pinchStart(p1, p2) {
      var center = _utilsPointDefault.default.center(p1, p2);
      this._pinchStartDist = _utilsPointDefault.default.distance(p1, p2);
      this._pinchStartRotation = Math.atan2(p1.y - center.y, p1.x - center.x);
      this._startRotation = this._rotation;
      this._startScale = this._scale;
    }
  }, {
    key: "pinchMove",
    value: function pinchMove(p1, p2) {
      var center = _utilsPointDefault.default.center(p1, p2);
      var distance = _utilsPointDefault.default.distance(p1, p2);
      var angle = Math.atan2(p1.y - center.y, p1.x - center.x);
      var angleChange = angle - this._pinchStartRotation;
      var scale = this._startScale * (distance / this._pinchStartDist);
      scale = _utilsUtilsDefault.default.clamp(0.1, 10, scale);
      var position = _utilsPointDefault.default.center(p1, p2);
      position.x -= 0.5 * this.width;
      position.y -= 0.5 * this.height;
      var rotation = this._startRotation + angleChange;
      this.transform(position, scale, rotation);
    }
  }, {
    key: "clientToPixel",
    value: function clientToPixel(position1) {
      var parent = this._element.parentElement;
      var rect = parent.getBoundingClientRect();
      var isPortraitOrientation = rect.height > rect.width;
      var nx = (position1.clientX - rect.left) / rect.width;
      var ny = (position1.clientY - rect.top) / rect.height;
      var x = (isPortraitOrientation ? 1 - ny : nx) * _config.config.width;
      var y = (isPortraitOrientation ? nx : ny) * _config.config.height;
      return new _utilsPointDefault.default(x, y);
    }
  }]);
  return Layer;
})();

},{"./config":"1tzQg","./utils/Utils":"1H53o","./utils/Point":"6AhXm","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"1ITGs":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return ImageLayer;
});
var _Layer2 = require("./Layer");
var _Layer2Default = _parcelHelpers.interopDefault(_Layer2);
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
var ImageLayer = /*#__PURE__*/(function (_Layer) {
  _inherits(ImageLayer, _Layer);
  var _super = _createSuper(ImageLayer);
  _createClass(ImageLayer, [{
    key: "image",
    get: function get() {
      return this._element;
    }
  }]);
  function ImageLayer(parent, id, x, y, width, height) {
    var _this;
    _classCallCheck(this, ImageLayer);
    _this = _super.call(this, parent, "img", id, x, y, width, height);
    _this._element.onload = function () {
      // if this.image.completed
      _this.resize(_this.image.naturalWidth, _this.image.naturalHeight);
    };
    return _this;
  }
  return ImageLayer;
})(_Layer2Default.default);

},{"./Layer":"hkRDB","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"Hlzxz":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return SelectionTool;
});
var _Tool2 = require("./Tool");
var _Tool2Default = _parcelHelpers.interopDefault(_Tool2);
var _utilsPoint = require("../utils/Point");
var _utilsPointDefault = _parcelHelpers.interopDefault(_utilsPoint);
var _utilsRect = require("../utils/Rect");
var _utilsRectDefault = _parcelHelpers.interopDefault(_utilsRect);
var _storageImageStorage = require("../storage/ImageStorage");
var _storageImageStorageDefault = _parcelHelpers.interopDefault(_storageImageStorage);
var _utilsUtils = require("../utils/Utils");
var _utilsUtilsDefault = _parcelHelpers.interopDefault(_utilsUtils);
var _config = require("../config");
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(receiver);
      }
      return desc.value;
    };
  }
  return _get(target, property, receiver || target);
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
// Provides a floating selection the user can manipulate
var SelectionTool = /*#__PURE__*/(function (_Tool) {
  _inherits(SelectionTool, _Tool);
  var _super = _createSuper(SelectionTool);
  _createClass(SelectionTool, [{
    key: "selectionLayer",
    get: function get() {
      return this._painter.getLayer(this.selectionLayerId);
    }
  }, {
    key: "selection",
    get: function get() {
      return this._selection;
    }
  }, {
    key: "hasFloatingSelection",
    get: function get() {
      return this._hasFloatingSelection;
    },
    set: function set(value) {
      this._hasFloatingSelection = value;
      this.toggleFloatingSelectionButtons(value);
    }
  }, {
    key: "isInShapesPalette",
    get: function get() {
      return this._isInShapesPalette;
    },
    set: function set(value) {
      this._isInShapesPalette = value;
      this._saveButton.classList.toggle("disabled", value);
    }
  }]);
  function SelectionTool(painter, buttonId) {
    var _this;
    _classCallCheck(this, SelectionTool);
    _this = _super.call(this, painter, buttonId);
    _defineProperty(_assertThisInitialized(_this), "selectionLayerId", "selection-layer");
    _defineProperty(_assertThisInitialized(_this), "_selection", _utilsRectDefault.default.Empty());
    _this._deleteButton = document.getElementById("selection-delete-button");
    _utilsUtilsDefault.default.addClick(_this._deleteButton, function () {
      return _this.clearSelection();
    });
    _this._stampButton = document.getElementById("selection-stamp-button");
    _utilsUtilsDefault.default.addClick(_this._stampButton, function () {
      return _this.paintSelectionToCanvas();
    });
    _this._saveButton = document.getElementById("selection-save-button");
    _utilsUtilsDefault.default.addClick(_this._saveButton, function () {
      return _this.saveSelectionAsNewStamp();
    });
    _this._downloadButton = document.getElementById("selection-download-button");
    _this._downloadAnchor = _this._downloadButton.firstElementChild;
    _this.hasFloatingSelection = false;
    _this._position = new _utilsPointDefault.default(0, 0);
    return _this;
  }
  _createClass(SelectionTool, [{
    key: "toggleFloatingSelectionButtons",
    value: function toggleFloatingSelectionButtons(visible) {
      this._deleteButton.classList.toggle("hidden", !visible);
      this._stampButton.classList.toggle("hidden", !visible);
      this._downloadButton.classList.toggle("hidden", !visible);
      this._saveButton.classList.toggle("hidden", !visible);
    }
  }, {
    key: "enable",
    value: function enable() {
      _get(_getPrototypeOf(SelectionTool.prototype), "enable", this).call(this);
      this.createSelectionLayer();
      this.hasFloatingSelection = false;
      this.isInShapesPalette = false;
    }
  }, {
    key: "disable",
    value: function disable() {
      _get(_getPrototypeOf(SelectionTool.prototype), "disable", this).call(this);
      this.paintSelectionToCanvas();
      this.destroySelectionLayer();
      this.hasFloatingSelection = false;
    }
  }, {
    key: "down",
    value: function down(data) {
      this._position = this.getClampedPosition(data);
      this.startNewSelection();
    }
  }, {
    key: "move",
    value: function move(data) {
      this._position = this.getClampedPosition(data);
      this.requestDrawSelectionOutline();
    }
  }, {
    key: "up",
    value: function up(data) {
      this.cutSelection();
    }
  }, {
    key: "startNewSelection",
    value: function startNewSelection() {
      this.paintSelectionToCanvas();
      this.selectionLayer.setPositionAndSize(0, 0, this._painter.width, this._painter.height);
      this.selectionLayer.transform(new _utilsPointDefault.default(0, 0), 1, 0);
      this.selectionLayer.floating = false;
      this.hasFloatingSelection = false;
      this.isInShapesPalette = false;
      this._startPosition = this._position;
      var ctx = this.selectionLayer.ctx;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.strokeStyle = "black";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      this.requestDrawSelectionOutline();
    }
  }, {
    key: "getClampedPosition",
    value: function getClampedPosition(data) {
      return data.position.round().clamp(0, 0, this._painter.width - 1, this._painter.height - 1);
    }
  }, {
    key: "tick",
    value: function tick(delta) {
      if (this._drawSelectionOutlineRequested) {
        this.updateSelectionAndDrawOutline();
        this._drawSelectionOutlineRequested = false;
      }
    }
  }, {
    key: "keyDown",
    value: function keyDown(event) {
      switch (event.code) {
        case 'Backspace':
          this.clearSelection();
          break;
        case 'KeyC':
          if (event.metaKey) {
            this.copyToClipboard();
          }
          break;
      }
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      this.selectionLayer.clear();
      this.startNewSelection();
    }
  }, {
    key: "setImage",
    value: function setImage(image) {
      this.hasFloatingSelection = true;
      this.selectionLayer.resize(image.width, image.height);
      this.selectionLayer.floating = true;
      this.selectionLayer.drawImage(image);
      this.isInShapesPalette = true;
      this.updateDownloadAnchor();
    }
  }, {
    key: "setImageUrl",
    value: function setImageUrl(url) {
      var _this2 = this;
      var img = new Image();
      img.src = url;
      img.onload = function () {
        _this2.setImage(img);
      };
    }
  }, {
    key: "requestDrawSelectionOutline",
    value: function requestDrawSelectionOutline() {
      this._drawSelectionOutlineRequested = true;
    }
  }, {
    key: "updateSelectionAndDrawOutline",
    value: function updateSelectionAndDrawOutline() {
      if (this.hasFloatingSelection) {
        return;
      }
      this.selectionLayer.clear();
      var ctx = this.selectionLayer.ctx;
      var x = Math.min(this._startPosition.x, this._position.x);
      var y = Math.min(this._startPosition.y, this._position.y);
      var width = Math.abs(this._startPosition.x - this._position.x);
      var height = Math.abs(this._startPosition.y - this._position.y);
      this._selection = new _utilsRectDefault.default(x, y, width, height);
      ctx.strokeRect(x, y, width, height);
    }
  }, {
    key: "destroySelectionLayer",
    value: function destroySelectionLayer() {
      this._painter.removeLayer(this.selectionLayer);
    }
  }, {
    key: "createSelectionLayer",
    value: function createSelectionLayer() {
      var _this3 = this;
      if (this.selectionLayer) {
        return;
      }
      this._painter.addCanvasLayer(this.selectionLayerId, 0, 0, this._painter.width, this._painter.height, false);
      this.selectionLayer.onDoubleTap = function (event) {
        if (event.altKey) {
          _this3.saveSelectionAsNewStamp();
          return;
        }
        _this3.paintSelectionToCanvas();
      };
    }
  }, {
    key: "cutSelection",
    value: function cutSelection() {
      this.selectionLayer.clear();
      this._selection = _utilsUtilsDefault.default.getVisiblePixelFrame(this._painter.baseLayer.ctx, this.selection);
      if (this.selection.isEmpty()) {
        return;
      }
      this.hasFloatingSelection = true;
      var _this$selection = this.selection, x = _this$selection.x, y = _this$selection.y, width = _this$selection.width, height = _this$selection.height;
      this.selectionLayer.setPositionAndSize(x, y, width, height);
      this.selectionLayer.floating = true;
      this.selectionLayer.ctx.drawImage(this._painter.baseLayer.canvas, x, y, width, height, 0, 0, width, height);
      this._painter.baseLayer.clear(this.selection);
      this._painter.recordHistoryState();
      this.updateDownloadAnchor();
    }
  }, {
    key: "paintSelectionToCanvas",
    value: function paintSelectionToCanvas() {
      if (!this.hasFloatingSelection) {
        return;
      }
      this._painter.baseLayer.ctx.globalCompositeOperation = "source-over";
      this.selectionLayer.drawToCanvas(this._painter.baseLayer.ctx);
      this._painter.recordHistoryState();
    }
  }, {
    key: "saveSelectionAsNewStamp",
    value: function saveSelectionAsNewStamp() {
      var _this4 = this;
      _storageImageStorageDefault.default.keys().then(function (keys) {
        var shapesIds = keys.filter(function (x) {
          return x.startsWith("Shape");
        });
        if (shapesIds.length >= _config.config.maxShapeCount) {
          console.log("Cannot save selection as shape because there are already too many in storage.");
          return;
        }
        var id = "Shape" + Date.now();
        console.log(("Saving selection as: ").concat(id));
        _this4.selectionLayer.canvas.toBlob(function (blob) {
          return _storageImageStorageDefault.default.saveImage(id, blob);
        });
        _this4.isInShapesPalette = true;
      });
    }
  }, {
    key: "copyToClipboard",
    value: function copyToClipboard() {
      this.selectionLayer.canvas.toBlob(function (blob) {
        return navigator.clipboard.write([new ClipboardItem({
          'image/png': blob
        })]);
      });
      console.log("copied selection to clipboard");
    }
  }, {
    key: "pasteFromClipboard",
    value: function pasteFromClipboard() {
      var _this5 = this;
      navigator.permissions.query({
        name: "clipboard-read"
      }).then(function (result) {
        if (!(result.state == "granted" || result.state == "prompt")) {
          return;
        }
        navigator.clipboard.read().then(function (data) {
          for (var i = 0; i < data.length; i++) {
            if (!data[i].types.includes("image/png")) {
              continue;
            }
            data[i].getType("image/png").then(function (blob) {
              _this5.setImageUrl(URL.createObjectURL(blob));
            });
          }
        });
      });
    }
  }, {
    key: "selectAll",
    value: function selectAll() {
      this.startNewSelection();
      this._selection = new _utilsRectDefault.default(0, 0, this._painter.width, this._painter.height);
      this.cutSelection();
    }
  }, {
    key: "updateDownloadAnchor",
    value: function updateDownloadAnchor() {
      var _this6 = this;
      this.selectionLayer.canvas.toBlob(function (blob) {
        _this6._downloadAnchor.href = URL.createObjectURL(blob);
      });
    }
  }]);
  return SelectionTool;
})(_Tool2Default.default);

},{"./Tool":"7utpK","../utils/Point":"6AhXm","../utils/Rect":"3WeR4","../storage/ImageStorage":"3kpel","../utils/Utils":"1H53o","../config":"1tzQg","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"5EiOX":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Toolbar", function () {
  return Toolbar;
});
var _viewsView = require("./views/View");
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
var Toolbar = /*#__PURE__*/(function (_View) {
  _inherits(Toolbar, _View);
  var _super = _createSuper(Toolbar);
  function Toolbar(id) {
    var _this;
    _classCallCheck(this, Toolbar);
    _this = _super.call(this, id);
    _this.show();
    return _this;
  }
  _createClass(Toolbar, [{
    key: "flip",
    value: function flip() {
      if (this._element.classList.contains("left") || this._element.classList.contains("right")) {
        this._element.classList.toggle("left");
        this._element.classList.toggle("right");
      }
      if (this._element.classList.contains("top") || this._element.classList.contains("bottom")) {
        this._element.classList.toggle("top");
        this._element.classList.toggle("bottom");
      }
    }
  }]);
  return Toolbar;
})(_viewsView.View);

},{"./views/View":"30r6k","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"27fq9":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "History", function () {
  return History;
});
var _config = require("./config");
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var History = /*#__PURE__*/(function () {
  function History() {
    _classCallCheck(this, History);
    _defineProperty(this, "_states", []);
    _defineProperty(this, "_position", -1);
  }
  _createClass(History, [{
    key: "recordState",
    value: function recordState(data) {
      if (this._position == _config.config.maxUndoSteps - 1) {
        this._states.shift();
        this._position--;
      }
      // remove all future steps
      this._states.splice(this._position + 1, this._states.length - this._position + 1);
      this._position++;
      this._states[this._position] = data;
    }
  }, {
    key: "undo",
    value: function undo() {
      if (!this.canUndo) {
        return null;
      }
      this._position--;
      return this._states[this._position];
    }
  }, {
    key: "redo",
    value: function redo() {
      if (!this.canRedo) {
        return null;
      }
      this._position++;
      return this._states[this._position];
    }
  }, {
    key: "getCurrentState",
    value: function getCurrentState() {
      return this._position > -1 && this._position < this._states.length ? this._states[this._position] : null;
    }
  }, {
    key: "clear",
    value: function clear() {
      this._states = [];
      this._position = -1;
    }
  }, {
    key: "canUndo",
    get: function get() {
      return this._position > 0;
    }
  }, {
    key: "canRedo",
    get: function get() {
      return this._position < this._states.length - 1;
    }
  }]);
  return History;
})();

},{"./config":"1tzQg","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"5P39T":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return SettingsView;
});
var _View2 = require("./View");
var _utilsUtils = require("../utils/Utils");
var _utilsUtilsDefault = _parcelHelpers.interopDefault(_utilsUtils);
var _PeerToPeer = require("../PeerToPeer");
var _PeerToPeerDefault = _parcelHelpers.interopDefault(_PeerToPeer);
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(receiver);
      }
      return desc.value;
    };
  }
  return _get(target, property, receiver || target);
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
var version = require('/package').version;
var SettingsView = /*#__PURE__*/(function (_View) {
  _inherits(SettingsView, _View);
  var _super = _createSuper(SettingsView);
  function SettingsView(id, onBackClicked) {
    var _this;
    _classCallCheck(this, SettingsView);
    _this = _super.call(this, id);
    var backButton = _this._element.getElementsByClassName("button back")[0];
    _utilsUtilsDefault.default.addClick(backButton, function () {
      return onBackClicked();
    });
    _this._peerList = document.getElementById("peer-list");
    var info = document.getElementById("info");
    info.innerText = // @ts-ignore
    ("PeerJS browser: ").concat(peerjs.util.browser, "\nVersion: ").concat(version, "\n");
    return _this;
  }
  _createClass(SettingsView, [{
    key: "show",
    value: function show() {
      _get(_getPrototypeOf(SettingsView.prototype), "show", this).call(this);
      this._peerList.value = _PeerToPeerDefault.default.instance.peerList.join("\n");
    }
  }, {
    key: "hide",
    value: function hide() {
      if (this._peerList) {
        _PeerToPeerDefault.default.instance.peerList = this._peerList.value.split("\n");
      }
      _get(_getPrototypeOf(SettingsView.prototype), "hide", this).call(this);
    }
  }]);
  return SettingsView;
})(_View2.View);

},{"./View":"30r6k","../utils/Utils":"1H53o","../PeerToPeer":"1eo0P","/package":"2O4yD","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"1eo0P":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "default", function () {
  return PeerToPeer;
});
var _peerjs = require("peerjs");
var _peerjsDefault = _parcelHelpers.interopDefault(_peerjs);
var _localforage = require("localforage");
var _localforageDefault = _parcelHelpers.interopDefault(_localforage);
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
var PeerToPeer = /*#__PURE__*/(function () {
  _createClass(PeerToPeer, [{
    key: "peerList",
    get: function get() {
      return this._peerList;
    },
    set: function set(value) {
      this._peerList = value;
      _localforageDefault.default.setItem('peer-list', value);
      if (this._peer) {
        this.logout();
      }
      this.login();
    }
  }, {
    key: "loggedIn",
    get: function get() {
      return this._peer != null;
    }
  }], [{
    key: "createInstance",
    value: function createInstance() {
      if (!PeerToPeer.instance) {
        PeerToPeer.instance = new PeerToPeer();
      }
    }
  }]);
  function PeerToPeer() {
    var _this = this;
    _classCallCheck(this, PeerToPeer);
    _localforageDefault.default.getItem('peer-list').then(function (peerList) {
      _this._peerList = peerList || [];
      _this.login();
    });
  }
  _createClass(PeerToPeer, [{
    key: "getId",
    value: function getId(peerName) {
      return peerName + "-web-paint-user";
    }
  }, {
    key: "login",
    value: function login() {
      var _this2 = this;
      if (!this._peerList || this._peerList.length < 1) {
        return;
      }
      // local server
      // this._peer = new Peer(id + idSuffix, {host: "192.168.178.20", port: 9000});
      var id = this.getId(this._peerList[0]);
      this._peer = new _peerjsDefault.default(id);
      this._peer.on('open', function (id) {
        console.log('Logged in as: ' + id);
      });
      this._peer.on('error', function (err) {
        console.log('peerjs error: ' + err);
      });
      this._peer.on('connection', function (conn) {
        conn.on('data', function (data) {
          if (_this2.onDataReceived) {
            _this2.onDataReceived(data);
          }
        });
      });
    }
  }, {
    key: "logout",
    value: function logout() {
      this._peer.destroy();
    }
  }, {
    key: "sendData",
    value: function sendData(peerName, data) {
      var connection = this._peer.connect(this.getId(peerName));
      connection.on('open', function () {
        connection.send(data);
      });
    }
  }]);
  return PeerToPeer;
})();

},{"peerjs":"3kOXK","localforage":"2bpsy","@parcel/transformer-js/lib/esmodule-helpers.js":"7jvX3"}],"3kOXK":[function(require,module,exports) {
var define;
parcelRequire = (function (e, r, t, n) {
  var i, o = "function" == typeof parcelRequire && parcelRequire, u = "function" == typeof require && require;
  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw (c.code = "MODULE_NOT_FOUND", c);
      }
      (p.resolve = function (r) {
        return e[t][1][r] || r;
      }, p.cache = {});
      var l = r[t] = new f.Module(t);
      e[t][0].call(l.exports, p, l, l.exports, this);
    }
    return r[t].exports;
    function p(e) {
      return f(p.resolve(e));
    }
  }
  (f.isParcelRequire = !0, f.Module = function (e) {
    (this.id = e, this.bundle = f, this.exports = {});
  }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) {
    e[r] = [function (e, r) {
      r.exports = t;
    }, {}];
  });
  for (var c = 0; c < t.length; c++) try {
    f(t[c]);
  } catch (e) {
    i || (i = e);
  }
  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
      return l;
    }) : n && (this[n] = l);
  }
  if ((parcelRequire = f, i)) throw i;
  return f;
})({
  "EgBh": [function (require, module, exports) {
    var e = {};
    (e.useBlobBuilder = (function () {
      try {
        return (new Blob([]), !1);
      } catch (e) {
        return !0;
      }
    })(), e.useArrayBufferView = !e.useBlobBuilder && (function () {
      try {
        return 0 === new Blob([new Uint8Array([])]).size;
      } catch (e) {
        return !0;
      }
    })(), module.exports.binaryFeatures = e);
    var r = module.exports.BlobBuilder;
    function t() {
      (this._pieces = [], this._parts = []);
    }
    ("undefined" != typeof window && (r = module.exports.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder || window.BlobBuilder), t.prototype.append = function (e) {
      "number" == typeof e ? this._pieces.push(e) : (this.flush(), this._parts.push(e));
    }, t.prototype.flush = function () {
      if (this._pieces.length > 0) {
        var r = new Uint8Array(this._pieces);
        (e.useArrayBufferView || (r = r.buffer), this._parts.push(r), this._pieces = []);
      }
    }, t.prototype.getBuffer = function () {
      if ((this.flush(), e.useBlobBuilder)) {
        for (var t = new r(), i = 0, u = this._parts.length; i < u; i++) t.append(this._parts[i]);
        return t.getBlob();
      }
      return new Blob(this._parts);
    }, module.exports.BufferBuilder = t);
  }, {}],
  "kdPp": [function (require, module, exports) {
    var t = require("./bufferbuilder").BufferBuilder, e = require("./bufferbuilder").binaryFeatures, i = {
      unpack: function (t) {
        return new r(t).unpack();
      },
      pack: function (t) {
        var e = new n();
        return (e.pack(t), e.getBuffer());
      }
    };
    function r(t) {
      (this.index = 0, this.dataBuffer = t, this.dataView = new Uint8Array(this.dataBuffer), this.length = this.dataBuffer.byteLength);
    }
    function n() {
      this.bufferBuilder = new t();
    }
    function u(t) {
      var e = t.charCodeAt(0);
      return e <= 2047 ? "00" : e <= 65535 ? "000" : e <= 2097151 ? "0000" : e <= 67108863 ? "00000" : "000000";
    }
    function a(t) {
      return t.length > 600 ? new Blob([t]).size : t.replace(/[^\u0000-\u007F]/g, u).length;
    }
    (module.exports = i, r.prototype.unpack = function () {
      var t, e = this.unpack_uint8();
      if (e < 128) return e;
      if ((224 ^ e) < 32) return (224 ^ e) - 32;
      if ((t = 160 ^ e) <= 15) return this.unpack_raw(t);
      if ((t = 176 ^ e) <= 15) return this.unpack_string(t);
      if ((t = 144 ^ e) <= 15) return this.unpack_array(t);
      if ((t = 128 ^ e) <= 15) return this.unpack_map(t);
      switch (e) {
        case 192:
          return null;
        case 193:
          return;
        case 194:
          return !1;
        case 195:
          return !0;
        case 202:
          return this.unpack_float();
        case 203:
          return this.unpack_double();
        case 204:
          return this.unpack_uint8();
        case 205:
          return this.unpack_uint16();
        case 206:
          return this.unpack_uint32();
        case 207:
          return this.unpack_uint64();
        case 208:
          return this.unpack_int8();
        case 209:
          return this.unpack_int16();
        case 210:
          return this.unpack_int32();
        case 211:
          return this.unpack_int64();
        case 212:
        case 213:
        case 214:
        case 215:
          return;
        case 216:
          return (t = this.unpack_uint16(), this.unpack_string(t));
        case 217:
          return (t = this.unpack_uint32(), this.unpack_string(t));
        case 218:
          return (t = this.unpack_uint16(), this.unpack_raw(t));
        case 219:
          return (t = this.unpack_uint32(), this.unpack_raw(t));
        case 220:
          return (t = this.unpack_uint16(), this.unpack_array(t));
        case 221:
          return (t = this.unpack_uint32(), this.unpack_array(t));
        case 222:
          return (t = this.unpack_uint16(), this.unpack_map(t));
        case 223:
          return (t = this.unpack_uint32(), this.unpack_map(t));
      }
    }, r.prototype.unpack_uint8 = function () {
      var t = 255 & this.dataView[this.index];
      return (this.index++, t);
    }, r.prototype.unpack_uint16 = function () {
      var t = this.read(2), e = 256 * (255 & t[0]) + (255 & t[1]);
      return (this.index += 2, e);
    }, r.prototype.unpack_uint32 = function () {
      var t = this.read(4), e = 256 * (256 * (256 * t[0] + t[1]) + t[2]) + t[3];
      return (this.index += 4, e);
    }, r.prototype.unpack_uint64 = function () {
      var t = this.read(8), e = 256 * (256 * (256 * (256 * (256 * (256 * (256 * t[0] + t[1]) + t[2]) + t[3]) + t[4]) + t[5]) + t[6]) + t[7];
      return (this.index += 8, e);
    }, r.prototype.unpack_int8 = function () {
      var t = this.unpack_uint8();
      return t < 128 ? t : t - 256;
    }, r.prototype.unpack_int16 = function () {
      var t = this.unpack_uint16();
      return t < 32768 ? t : t - 65536;
    }, r.prototype.unpack_int32 = function () {
      var t = this.unpack_uint32();
      return t < Math.pow(2, 31) ? t : t - Math.pow(2, 32);
    }, r.prototype.unpack_int64 = function () {
      var t = this.unpack_uint64();
      return t < Math.pow(2, 63) ? t : t - Math.pow(2, 64);
    }, r.prototype.unpack_raw = function (t) {
      if (this.length < this.index + t) throw new Error("BinaryPackFailure: index is out of range " + this.index + " " + t + " " + this.length);
      var e = this.dataBuffer.slice(this.index, this.index + t);
      return (this.index += t, e);
    }, r.prototype.unpack_string = function (t) {
      for (var e, i, r = this.read(t), n = 0, u = ""; n < t; ) (e = r[n]) < 128 ? (u += String.fromCharCode(e), n++) : (192 ^ e) < 32 ? (i = (192 ^ e) << 6 | 63 & r[n + 1], u += String.fromCharCode(i), n += 2) : (i = (15 & e) << 12 | (63 & r[n + 1]) << 6 | 63 & r[n + 2], u += String.fromCharCode(i), n += 3);
      return (this.index += t, u);
    }, r.prototype.unpack_array = function (t) {
      for (var e = new Array(t), i = 0; i < t; i++) e[i] = this.unpack();
      return e;
    }, r.prototype.unpack_map = function (t) {
      for (var e = {}, i = 0; i < t; i++) {
        var r = this.unpack(), n = this.unpack();
        e[r] = n;
      }
      return e;
    }, r.prototype.unpack_float = function () {
      var t = this.unpack_uint32(), e = (t >> 23 & 255) - 127;
      return (0 === t >> 31 ? 1 : -1) * (8388607 & t | 8388608) * Math.pow(2, e - 23);
    }, r.prototype.unpack_double = function () {
      var t = this.unpack_uint32(), e = this.unpack_uint32(), i = (t >> 20 & 2047) - 1023;
      return (0 === t >> 31 ? 1 : -1) * ((1048575 & t | 1048576) * Math.pow(2, i - 20) + e * Math.pow(2, i - 52));
    }, r.prototype.read = function (t) {
      var e = this.index;
      if (e + t <= this.length) return this.dataView.subarray(e, e + t);
      throw new Error("BinaryPackFailure: read index out of range");
    }, n.prototype.getBuffer = function () {
      return this.bufferBuilder.getBuffer();
    }, n.prototype.pack = function (t) {
      var i = typeof t;
      if ("string" === i) this.pack_string(t); else if ("number" === i) Math.floor(t) === t ? this.pack_integer(t) : this.pack_double(t); else if ("boolean" === i) !0 === t ? this.bufferBuilder.append(195) : !1 === t && this.bufferBuilder.append(194); else if ("undefined" === i) this.bufferBuilder.append(192); else {
        if ("object" !== i) throw new Error('Type "' + i + '" not yet supported');
        if (null === t) this.bufferBuilder.append(192); else {
          var r = t.constructor;
          if (r == Array) this.pack_array(t); else if (r == Blob || r == File || t instanceof Blob || t instanceof File) this.pack_bin(t); else if (r == ArrayBuffer) e.useArrayBufferView ? this.pack_bin(new Uint8Array(t)) : this.pack_bin(t); else if (("BYTES_PER_ELEMENT" in t)) e.useArrayBufferView ? this.pack_bin(new Uint8Array(t.buffer)) : this.pack_bin(t.buffer); else if (r == Object || r.toString().startsWith("class")) this.pack_object(t); else if (r == Date) this.pack_string(t.toString()); else {
            if ("function" != typeof t.toBinaryPack) throw new Error('Type "' + r.toString() + '" not yet supported');
            this.bufferBuilder.append(t.toBinaryPack());
          }
        }
      }
      this.bufferBuilder.flush();
    }, n.prototype.pack_bin = function (t) {
      var e = t.length || t.byteLength || t.size;
      if (e <= 15) this.pack_uint8(160 + e); else if (e <= 65535) (this.bufferBuilder.append(218), this.pack_uint16(e)); else {
        if (!(e <= 4294967295)) throw new Error("Invalid length");
        (this.bufferBuilder.append(219), this.pack_uint32(e));
      }
      this.bufferBuilder.append(t);
    }, n.prototype.pack_string = function (t) {
      var e = a(t);
      if (e <= 15) this.pack_uint8(176 + e); else if (e <= 65535) (this.bufferBuilder.append(216), this.pack_uint16(e)); else {
        if (!(e <= 4294967295)) throw new Error("Invalid length");
        (this.bufferBuilder.append(217), this.pack_uint32(e));
      }
      this.bufferBuilder.append(t);
    }, n.prototype.pack_array = function (t) {
      var e = t.length;
      if (e <= 15) this.pack_uint8(144 + e); else if (e <= 65535) (this.bufferBuilder.append(220), this.pack_uint16(e)); else {
        if (!(e <= 4294967295)) throw new Error("Invalid length");
        (this.bufferBuilder.append(221), this.pack_uint32(e));
      }
      for (var i = 0; i < e; i++) this.pack(t[i]);
    }, n.prototype.pack_integer = function (t) {
      if (t >= -32 && t <= 127) this.bufferBuilder.append(255 & t); else if (t >= 0 && t <= 255) (this.bufferBuilder.append(204), this.pack_uint8(t)); else if (t >= -128 && t <= 127) (this.bufferBuilder.append(208), this.pack_int8(t)); else if (t >= 0 && t <= 65535) (this.bufferBuilder.append(205), this.pack_uint16(t)); else if (t >= -32768 && t <= 32767) (this.bufferBuilder.append(209), this.pack_int16(t)); else if (t >= 0 && t <= 4294967295) (this.bufferBuilder.append(206), this.pack_uint32(t)); else if (t >= -2147483648 && t <= 2147483647) (this.bufferBuilder.append(210), this.pack_int32(t)); else if (t >= -0x8000000000000000 && t <= 0x8000000000000000) (this.bufferBuilder.append(211), this.pack_int64(t)); else {
        if (!(t >= 0 && t <= 0x10000000000000000)) throw new Error("Invalid integer");
        (this.bufferBuilder.append(207), this.pack_uint64(t));
      }
    }, n.prototype.pack_double = function (t) {
      var e = 0;
      t < 0 && (e = 1, t = -t);
      var i = Math.floor(Math.log(t) / Math.LN2), r = t / Math.pow(2, i) - 1, n = Math.floor(r * Math.pow(2, 52)), u = Math.pow(2, 32), a = e << 31 | i + 1023 << 20 | n / u & 1048575, p = n % u;
      (this.bufferBuilder.append(203), this.pack_int32(a), this.pack_int32(p));
    }, n.prototype.pack_object = function (t) {
      var e = Object.keys(t).length;
      if (e <= 15) this.pack_uint8(128 + e); else if (e <= 65535) (this.bufferBuilder.append(222), this.pack_uint16(e)); else {
        if (!(e <= 4294967295)) throw new Error("Invalid length");
        (this.bufferBuilder.append(223), this.pack_uint32(e));
      }
      for (var i in t) t.hasOwnProperty(i) && (this.pack(i), this.pack(t[i]));
    }, n.prototype.pack_uint8 = function (t) {
      this.bufferBuilder.append(t);
    }, n.prototype.pack_uint16 = function (t) {
      (this.bufferBuilder.append(t >> 8), this.bufferBuilder.append(255 & t));
    }, n.prototype.pack_uint32 = function (t) {
      var e = 4294967295 & t;
      (this.bufferBuilder.append((4278190080 & e) >>> 24), this.bufferBuilder.append((16711680 & e) >>> 16), this.bufferBuilder.append((65280 & e) >>> 8), this.bufferBuilder.append(255 & e));
    }, n.prototype.pack_uint64 = function (t) {
      var e = t / Math.pow(2, 32), i = t % Math.pow(2, 32);
      (this.bufferBuilder.append((4278190080 & e) >>> 24), this.bufferBuilder.append((16711680 & e) >>> 16), this.bufferBuilder.append((65280 & e) >>> 8), this.bufferBuilder.append(255 & e), this.bufferBuilder.append((4278190080 & i) >>> 24), this.bufferBuilder.append((16711680 & i) >>> 16), this.bufferBuilder.append((65280 & i) >>> 8), this.bufferBuilder.append(255 & i));
    }, n.prototype.pack_int8 = function (t) {
      this.bufferBuilder.append(255 & t);
    }, n.prototype.pack_int16 = function (t) {
      (this.bufferBuilder.append((65280 & t) >> 8), this.bufferBuilder.append(255 & t));
    }, n.prototype.pack_int32 = function (t) {
      (this.bufferBuilder.append(t >>> 24 & 255), this.bufferBuilder.append((16711680 & t) >>> 16), this.bufferBuilder.append((65280 & t) >>> 8), this.bufferBuilder.append(255 & t));
    }, n.prototype.pack_int64 = function (t) {
      var e = Math.floor(t / Math.pow(2, 32)), i = t % Math.pow(2, 32);
      (this.bufferBuilder.append((4278190080 & e) >>> 24), this.bufferBuilder.append((16711680 & e) >>> 16), this.bufferBuilder.append((65280 & e) >>> 8), this.bufferBuilder.append(255 & e), this.bufferBuilder.append((4278190080 & i) >>> 24), this.bufferBuilder.append((16711680 & i) >>> 16), this.bufferBuilder.append((65280 & i) >>> 8), this.bufferBuilder.append(255 & i));
    });
  }, {
    "./bufferbuilder": "EgBh"
  }],
  "iSxC": [function (require, module, exports) {
    "use strict";
    function e(e, t, n) {
      return ((t in e) ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e);
    }
    function t(e) {
      return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }
    (Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.extractVersion = o, exports.wrapPeerConnectionEvent = i, exports.disableLog = s, exports.disableWarnings = a, exports.log = u, exports.deprecated = c, exports.detectBrowser = p, exports.compactObject = d, exports.walkStats = l, exports.filterStats = b);
    var n = !0, r = !0;
    function o(e, t, n) {
      var r = e.match(t);
      return r && r.length >= n && parseInt(r[n], 10);
    }
    function i(e, t, n) {
      if (e.RTCPeerConnection) {
        var r = e.RTCPeerConnection.prototype, o = r.addEventListener;
        r.addEventListener = function (e, r) {
          if (e !== t) return o.apply(this, arguments);
          var i = function (e) {
            var t = n(e);
            t && r(t);
          };
          return (this._eventMap = this._eventMap || ({}), this._eventMap[r] = i, o.apply(this, [e, i]));
        };
        var i = r.removeEventListener;
        (r.removeEventListener = function (e, n) {
          if (e !== t || !this._eventMap || !this._eventMap[n]) return i.apply(this, arguments);
          var r = this._eventMap[n];
          return (delete this._eventMap[n], i.apply(this, [e, r]));
        }, Object.defineProperty(r, "on" + t, {
          get: function () {
            return this["_on" + t];
          },
          set: function (e) {
            (this["_on" + t] && (this.removeEventListener(t, this["_on" + t]), delete this["_on" + t]), e && this.addEventListener(t, this["_on" + t] = e));
          },
          enumerable: !0,
          configurable: !0
        }));
      }
    }
    function s(e) {
      return "boolean" != typeof e ? new Error("Argument type: " + t(e) + ". Please use a boolean.") : (n = e, e ? "adapter.js logging disabled" : "adapter.js logging enabled");
    }
    function a(e) {
      return "boolean" != typeof e ? new Error("Argument type: " + t(e) + ". Please use a boolean.") : (r = !e, "adapter.js deprecation warnings " + (e ? "disabled" : "enabled"));
    }
    function u() {
      if ("object" === ("undefined" == typeof window ? "undefined" : t(window))) {
        if (n) return;
        "undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments);
      }
    }
    function c(e, t) {
      r && console.warn(e + " is deprecated, please use " + t + " instead.");
    }
    function p(e) {
      var {navigator: t} = e, n = {
        browser: null,
        version: null
      };
      if (void 0 === e || !e.navigator) return (n.browser = "Not a browser.", n);
      if (t.mozGetUserMedia) (n.browser = "firefox", n.version = o(t.userAgent, /Firefox\/(\d+)\./, 1)); else if (t.webkitGetUserMedia || !1 === e.isSecureContext && e.webkitRTCPeerConnection && !e.RTCIceGatherer) (n.browser = "chrome", n.version = o(t.userAgent, /Chrom(e|ium)\/(\d+)\./, 2)); else if (t.mediaDevices && t.userAgent.match(/Edge\/(\d+).(\d+)$/)) (n.browser = "edge", n.version = o(t.userAgent, /Edge\/(\d+).(\d+)$/, 2)); else {
        if (!e.RTCPeerConnection || !t.userAgent.match(/AppleWebKit\/(\d+)\./)) return (n.browser = "Not a supported browser.", n);
        (n.browser = "safari", n.version = o(t.userAgent, /AppleWebKit\/(\d+)\./, 1), n.supportsUnifiedPlan = e.RTCRtpTransceiver && ("currentDirection" in e.RTCRtpTransceiver.prototype));
      }
      return n;
    }
    function f(e) {
      return "[object Object]" === Object.prototype.toString.call(e);
    }
    function d(t) {
      return f(t) ? Object.keys(t).reduce(function (n, r) {
        var o = f(t[r]), i = o ? d(t[r]) : t[r], s = o && !Object.keys(i).length;
        return void 0 === i || s ? n : Object.assign(n, e({}, r, i));
      }, {}) : t;
    }
    function l(e, t, n) {
      t && !n.has(t.id) && (n.set(t.id, t), Object.keys(t).forEach(function (r) {
        r.endsWith("Id") ? l(e, e.get(t[r]), n) : r.endsWith("Ids") && t[r].forEach(function (t) {
          l(e, e.get(t), n);
        });
      }));
    }
    function b(e, t, n) {
      var r = n ? "outbound-rtp" : "inbound-rtp", o = new Map();
      if (null === t) return o;
      var i = [];
      return (e.forEach(function (e) {
        "track" === e.type && e.trackIdentifier === t.id && i.push(e);
      }), i.forEach(function (t) {
        e.forEach(function (n) {
          n.type === r && n.trackId === t.id && l(e, n, o);
        });
      }), o);
    }
  }, {}],
  "s6SN": [function (require, module, exports) {
    "use strict";
    (Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.shimGetUserMedia = i);
    var e = t(require("../utils.js"));
    function r() {
      if ("function" != typeof WeakMap) return null;
      var e = new WeakMap();
      return (r = function () {
        return e;
      }, e);
    }
    function t(e) {
      if (e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
      };
      var t = r();
      if (t && t.has(e)) return t.get(e);
      var o = {}, n = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var i in e) if (Object.prototype.hasOwnProperty.call(e, i)) {
        var a = n ? Object.getOwnPropertyDescriptor(e, i) : null;
        a && (a.get || a.set) ? Object.defineProperty(o, i, a) : o[i] = e[i];
      }
      return (o.default = e, t && t.set(e, o), o);
    }
    function o(e) {
      return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }
    var n = e.log;
    function i(r) {
      var t = r && r.navigator;
      if (t.mediaDevices) {
        var i = e.detectBrowser(r), a = function (e) {
          if ("object" !== o(e) || e.mandatory || e.optional) return e;
          var r = {};
          return (Object.keys(e).forEach(function (t) {
            if ("require" !== t && "advanced" !== t && "mediaSource" !== t) {
              var n = "object" === o(e[t]) ? e[t] : {
                ideal: e[t]
              };
              void 0 !== n.exact && "number" == typeof n.exact && (n.min = n.max = n.exact);
              var i = function (e, r) {
                return e ? e + r.charAt(0).toUpperCase() + r.slice(1) : "deviceId" === r ? "sourceId" : r;
              };
              if (void 0 !== n.ideal) {
                r.optional = r.optional || [];
                var a = {};
                "number" == typeof n.ideal ? (a[i("min", t)] = n.ideal, r.optional.push(a), (a = {})[i("max", t)] = n.ideal, r.optional.push(a)) : (a[i("", t)] = n.ideal, r.optional.push(a));
              }
              void 0 !== n.exact && "number" != typeof n.exact ? (r.mandatory = r.mandatory || ({}), r.mandatory[i("", t)] = n.exact) : ["min", "max"].forEach(function (e) {
                void 0 !== n[e] && (r.mandatory = r.mandatory || ({}), r.mandatory[i(e, t)] = n[e]);
              });
            }
          }), e.advanced && (r.optional = (r.optional || []).concat(e.advanced)), r);
        }, c = function (e, r) {
          if (i.version >= 61) return r(e);
          if ((e = JSON.parse(JSON.stringify(e))) && "object" === o(e.audio)) {
            var c = function (e, r, t) {
              (r in e) && !((t in e)) && (e[t] = e[r], delete e[r]);
            };
            (c((e = JSON.parse(JSON.stringify(e))).audio, "autoGainControl", "googAutoGainControl"), c(e.audio, "noiseSuppression", "googNoiseSuppression"), e.audio = a(e.audio));
          }
          if (e && "object" === o(e.video)) {
            var d = e.video.facingMode;
            d = d && ("object" === o(d) ? d : {
              ideal: d
            });
            var u, s = i.version < 66;
            if (d && ("user" === d.exact || "environment" === d.exact || "user" === d.ideal || "environment" === d.ideal) && (!t.mediaDevices.getSupportedConstraints || !t.mediaDevices.getSupportedConstraints().facingMode || s)) if ((delete e.video.facingMode, "environment" === d.exact || "environment" === d.ideal ? u = ["back", "rear"] : "user" !== d.exact && "user" !== d.ideal || (u = ["front"]), u)) return t.mediaDevices.enumerateDevices().then(function (t) {
              var o = (t = t.filter(function (e) {
                return "videoinput" === e.kind;
              })).find(function (e) {
                return u.some(function (r) {
                  return e.label.toLowerCase().includes(r);
                });
              });
              return (!o && t.length && u.includes("back") && (o = t[t.length - 1]), o && (e.video.deviceId = d.exact ? {
                exact: o.deviceId
              } : {
                ideal: o.deviceId
              }), e.video = a(e.video), n("chrome: " + JSON.stringify(e)), r(e));
            });
            e.video = a(e.video);
          }
          return (n("chrome: " + JSON.stringify(e)), r(e));
        }, d = function (e) {
          return i.version >= 64 ? e : {
            name: ({
              PermissionDeniedError: "NotAllowedError",
              PermissionDismissedError: "NotAllowedError",
              InvalidStateError: "NotAllowedError",
              DevicesNotFoundError: "NotFoundError",
              ConstraintNotSatisfiedError: "OverconstrainedError",
              TrackStartError: "NotReadableError",
              MediaDeviceFailedDueToShutdown: "NotAllowedError",
              MediaDeviceKillSwitchOn: "NotAllowedError",
              TabCaptureError: "AbortError",
              ScreenCaptureError: "AbortError",
              DeviceCaptureError: "AbortError"
            })[e.name] || e.name,
            message: e.message,
            constraint: e.constraint || e.constraintName,
            toString: function () {
              return this.name + (this.message && ": ") + this.message;
            }
          };
        };
        if ((t.getUserMedia = (function (e, r, o) {
          c(e, function (e) {
            t.webkitGetUserMedia(e, r, function (e) {
              o && o(d(e));
            });
          });
        }).bind(t), t.mediaDevices.getUserMedia)) {
          var u = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
          t.mediaDevices.getUserMedia = function (e) {
            return c(e, function (e) {
              return u(e).then(function (r) {
                if (e.audio && !r.getAudioTracks().length || e.video && !r.getVideoTracks().length) throw (r.getTracks().forEach(function (e) {
                  e.stop();
                }), new DOMException("", "NotFoundError"));
                return r;
              }, function (e) {
                return Promise.reject(d(e));
              });
            });
          };
        }
      }
    }
  }, {
    "../utils.js": "iSxC"
  }],
  "VHa8": [function (require, module, exports) {
    "use strict";
    function e(e, i) {
      e.navigator.mediaDevices && ("getDisplayMedia" in e.navigator.mediaDevices) || e.navigator.mediaDevices && ("function" == typeof i ? e.navigator.mediaDevices.getDisplayMedia = function (a) {
        return i(a).then(function (i) {
          var t = a.video && a.video.width, o = a.video && a.video.height, d = a.video && a.video.frameRate;
          return (a.video = {
            mandatory: {
              chromeMediaSource: "desktop",
              chromeMediaSourceId: i,
              maxFrameRate: d || 3
            }
          }, t && (a.video.mandatory.maxWidth = t), o && (a.video.mandatory.maxHeight = o), e.navigator.mediaDevices.getUserMedia(a));
        });
      } : console.error("shimGetDisplayMedia: getSourceId argument is not a function"));
    }
    (Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.shimGetDisplayMedia = e);
  }, {}],
  "uI5X": [function (require, module, exports) {
    "use strict";
    (Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.shimMediaStream = a, exports.shimOnTrack = c, exports.shimGetSendersWithDtmf = p, exports.shimGetStats = d, exports.shimSenderReceiverGetStats = h, exports.shimAddTrackRemoveTrackWithNative = f, exports.shimAddTrackRemoveTrack = m, exports.shimPeerConnection = u, exports.fixNegotiationNeeded = l, Object.defineProperty(exports, "shimGetUserMedia", {
      enumerable: !0,
      get: function () {
        return t.shimGetUserMedia;
      }
    }), Object.defineProperty(exports, "shimGetDisplayMedia", {
      enumerable: !0,
      get: function () {
        return r.shimGetDisplayMedia;
      }
    }));
    var e = i(require("../utils.js")), t = require("./getusermedia"), r = require("./getdisplaymedia");
    function n() {
      if ("function" != typeof WeakMap) return null;
      var e = new WeakMap();
      return (n = function () {
        return e;
      }, e);
    }
    function i(e) {
      if (e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
      };
      var t = n();
      if (t && t.has(e)) return t.get(e);
      var r = {}, i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e) if (Object.prototype.hasOwnProperty.call(e, o)) {
        var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
        s && (s.get || s.set) ? Object.defineProperty(r, o, s) : r[o] = e[o];
      }
      return (r.default = e, t && t.set(e, r), r);
    }
    function o(e, t, r) {
      return ((t in e) ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = r, e);
    }
    function s(e) {
      return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }
    function a(e) {
      e.MediaStream = e.MediaStream || e.webkitMediaStream;
    }
    function c(t) {
      if ("object" !== s(t) || !t.RTCPeerConnection || ("ontrack" in t.RTCPeerConnection.prototype)) e.wrapPeerConnectionEvent(t, "track", function (e) {
        return (e.transceiver || Object.defineProperty(e, "transceiver", {
          value: {
            receiver: e.receiver
          }
        }), e);
      }); else {
        Object.defineProperty(t.RTCPeerConnection.prototype, "ontrack", {
          get: function () {
            return this._ontrack;
          },
          set: function (e) {
            (this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack = e));
          },
          enumerable: !0,
          configurable: !0
        });
        var r = t.RTCPeerConnection.prototype.setRemoteDescription;
        t.RTCPeerConnection.prototype.setRemoteDescription = function () {
          var e = this;
          return (this._ontrackpoly || (this._ontrackpoly = function (r) {
            (r.stream.addEventListener("addtrack", function (n) {
              var i;
              i = t.RTCPeerConnection.prototype.getReceivers ? e.getReceivers().find(function (e) {
                return e.track && e.track.id === n.track.id;
              }) : {
                track: n.track
              };
              var o = new Event("track");
              (o.track = n.track, o.receiver = i, o.transceiver = {
                receiver: i
              }, o.streams = [r.stream], e.dispatchEvent(o));
            }), r.stream.getTracks().forEach(function (n) {
              var i;
              i = t.RTCPeerConnection.prototype.getReceivers ? e.getReceivers().find(function (e) {
                return e.track && e.track.id === n.id;
              }) : {
                track: n
              };
              var o = new Event("track");
              (o.track = n, o.receiver = i, o.transceiver = {
                receiver: i
              }, o.streams = [r.stream], e.dispatchEvent(o));
            }));
          }, this.addEventListener("addstream", this._ontrackpoly)), r.apply(this, arguments));
        };
      }
    }
    function p(e) {
      if ("object" === s(e) && e.RTCPeerConnection && !(("getSenders" in e.RTCPeerConnection.prototype)) && ("createDTMFSender" in e.RTCPeerConnection.prototype)) {
        var t = function (e, t) {
          return {
            track: t,
            get dtmf() {
              return (void 0 === this._dtmf && ("audio" === t.kind ? this._dtmf = e.createDTMFSender(t) : this._dtmf = null), this._dtmf);
            },
            _pc: e
          };
        };
        if (!e.RTCPeerConnection.prototype.getSenders) {
          e.RTCPeerConnection.prototype.getSenders = function () {
            return (this._senders = this._senders || [], this._senders.slice());
          };
          var r = e.RTCPeerConnection.prototype.addTrack;
          e.RTCPeerConnection.prototype.addTrack = function (e, n) {
            var i = r.apply(this, arguments);
            return (i || (i = t(this, e), this._senders.push(i)), i);
          };
          var n = e.RTCPeerConnection.prototype.removeTrack;
          e.RTCPeerConnection.prototype.removeTrack = function (e) {
            n.apply(this, arguments);
            var t = this._senders.indexOf(e);
            -1 !== t && this._senders.splice(t, 1);
          };
        }
        var i = e.RTCPeerConnection.prototype.addStream;
        e.RTCPeerConnection.prototype.addStream = function (e) {
          var r = this;
          (this._senders = this._senders || [], i.apply(this, [e]), e.getTracks().forEach(function (e) {
            r._senders.push(t(r, e));
          }));
        };
        var o = e.RTCPeerConnection.prototype.removeStream;
        e.RTCPeerConnection.prototype.removeStream = function (e) {
          var t = this;
          (this._senders = this._senders || [], o.apply(this, [e]), e.getTracks().forEach(function (e) {
            var r = t._senders.find(function (t) {
              return t.track === e;
            });
            r && t._senders.splice(t._senders.indexOf(r), 1);
          }));
        };
      } else if ("object" === s(e) && e.RTCPeerConnection && ("getSenders" in e.RTCPeerConnection.prototype) && ("createDTMFSender" in e.RTCPeerConnection.prototype) && e.RTCRtpSender && !(("dtmf" in e.RTCRtpSender.prototype))) {
        var a = e.RTCPeerConnection.prototype.getSenders;
        (e.RTCPeerConnection.prototype.getSenders = function () {
          var e = this, t = a.apply(this, []);
          return (t.forEach(function (t) {
            return t._pc = e;
          }), t);
        }, Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
          get: function () {
            return (void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf);
          }
        }));
      }
    }
    function d(e) {
      if (e.RTCPeerConnection) {
        var t = e.RTCPeerConnection.prototype.getStats;
        e.RTCPeerConnection.prototype.getStats = function () {
          var e = this, [r, n, i] = arguments;
          if (arguments.length > 0 && "function" == typeof r) return t.apply(this, arguments);
          if (0 === t.length && (0 === arguments.length || "function" != typeof r)) return t.apply(this, []);
          var o = function (e) {
            var t = {};
            return (e.result().forEach(function (e) {
              var r = {
                id: e.id,
                timestamp: e.timestamp,
                type: ({
                  localcandidate: "local-candidate",
                  remotecandidate: "remote-candidate"
                })[e.type] || e.type
              };
              (e.names().forEach(function (t) {
                r[t] = e.stat(t);
              }), t[r.id] = r);
            }), t);
          }, s = function (e) {
            return new Map(Object.keys(e).map(function (t) {
              return [t, e[t]];
            }));
          };
          if (arguments.length >= 2) {
            return t.apply(this, [function (e) {
              n(s(o(e)));
            }, r]);
          }
          return new Promise(function (r, n) {
            t.apply(e, [function (e) {
              r(s(o(e)));
            }, n]);
          }).then(n, i);
        };
      }
    }
    function h(t) {
      if ("object" === s(t) && t.RTCPeerConnection && t.RTCRtpSender && t.RTCRtpReceiver) {
        if (!(("getStats" in t.RTCRtpSender.prototype))) {
          var r = t.RTCPeerConnection.prototype.getSenders;
          r && (t.RTCPeerConnection.prototype.getSenders = function () {
            var e = this, t = r.apply(this, []);
            return (t.forEach(function (t) {
              return t._pc = e;
            }), t);
          });
          var n = t.RTCPeerConnection.prototype.addTrack;
          (n && (t.RTCPeerConnection.prototype.addTrack = function () {
            var e = n.apply(this, arguments);
            return (e._pc = this, e);
          }), t.RTCRtpSender.prototype.getStats = function () {
            var t = this;
            return this._pc.getStats().then(function (r) {
              return e.filterStats(r, t.track, !0);
            });
          });
        }
        if (!(("getStats" in t.RTCRtpReceiver.prototype))) {
          var i = t.RTCPeerConnection.prototype.getReceivers;
          (i && (t.RTCPeerConnection.prototype.getReceivers = function () {
            var e = this, t = i.apply(this, []);
            return (t.forEach(function (t) {
              return t._pc = e;
            }), t);
          }), e.wrapPeerConnectionEvent(t, "track", function (e) {
            return (e.receiver._pc = e.srcElement, e);
          }), t.RTCRtpReceiver.prototype.getStats = function () {
            var t = this;
            return this._pc.getStats().then(function (r) {
              return e.filterStats(r, t.track, !1);
            });
          });
        }
        if (("getStats" in t.RTCRtpSender.prototype) && ("getStats" in t.RTCRtpReceiver.prototype)) {
          var o = t.RTCPeerConnection.prototype.getStats;
          t.RTCPeerConnection.prototype.getStats = function () {
            if (arguments.length > 0 && arguments[0] instanceof t.MediaStreamTrack) {
              var e, r, n, i = arguments[0];
              return (this.getSenders().forEach(function (t) {
                t.track === i && (e ? n = !0 : e = t);
              }), this.getReceivers().forEach(function (e) {
                return (e.track === i && (r ? n = !0 : r = e), e.track === i);
              }), n || e && r ? Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")) : e ? e.getStats() : r ? r.getStats() : Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError")));
            }
            return o.apply(this, arguments);
          };
        }
      }
    }
    function f(e) {
      e.RTCPeerConnection.prototype.getLocalStreams = function () {
        var e = this;
        return (this._shimmedLocalStreams = this._shimmedLocalStreams || ({}), Object.keys(this._shimmedLocalStreams).map(function (t) {
          return e._shimmedLocalStreams[t][0];
        }));
      };
      var t = e.RTCPeerConnection.prototype.addTrack;
      e.RTCPeerConnection.prototype.addTrack = function (e, r) {
        if (!r) return t.apply(this, arguments);
        this._shimmedLocalStreams = this._shimmedLocalStreams || ({});
        var n = t.apply(this, arguments);
        return (this._shimmedLocalStreams[r.id] ? -1 === this._shimmedLocalStreams[r.id].indexOf(n) && this._shimmedLocalStreams[r.id].push(n) : this._shimmedLocalStreams[r.id] = [r, n], n);
      };
      var r = e.RTCPeerConnection.prototype.addStream;
      e.RTCPeerConnection.prototype.addStream = function (e) {
        var t = this;
        (this._shimmedLocalStreams = this._shimmedLocalStreams || ({}), e.getTracks().forEach(function (e) {
          if (t.getSenders().find(function (t) {
            return t.track === e;
          })) throw new DOMException("Track already exists.", "InvalidAccessError");
        }));
        var n = this.getSenders();
        r.apply(this, arguments);
        var i = this.getSenders().filter(function (e) {
          return -1 === n.indexOf(e);
        });
        this._shimmedLocalStreams[e.id] = [e].concat(i);
      };
      var n = e.RTCPeerConnection.prototype.removeStream;
      e.RTCPeerConnection.prototype.removeStream = function (e) {
        return (this._shimmedLocalStreams = this._shimmedLocalStreams || ({}), delete this._shimmedLocalStreams[e.id], n.apply(this, arguments));
      };
      var i = e.RTCPeerConnection.prototype.removeTrack;
      e.RTCPeerConnection.prototype.removeTrack = function (e) {
        var t = this;
        return (this._shimmedLocalStreams = this._shimmedLocalStreams || ({}), e && Object.keys(this._shimmedLocalStreams).forEach(function (r) {
          var n = t._shimmedLocalStreams[r].indexOf(e);
          (-1 !== n && t._shimmedLocalStreams[r].splice(n, 1), 1 === t._shimmedLocalStreams[r].length && delete t._shimmedLocalStreams[r]);
        }), i.apply(this, arguments));
      };
    }
    function m(t) {
      if (t.RTCPeerConnection) {
        var r = e.detectBrowser(t);
        if (t.RTCPeerConnection.prototype.addTrack && r.version >= 65) return f(t);
        var n = t.RTCPeerConnection.prototype.getLocalStreams;
        t.RTCPeerConnection.prototype.getLocalStreams = function () {
          var e = this, t = n.apply(this);
          return (this._reverseStreams = this._reverseStreams || ({}), t.map(function (t) {
            return e._reverseStreams[t.id];
          }));
        };
        var i = t.RTCPeerConnection.prototype.addStream;
        t.RTCPeerConnection.prototype.addStream = function (e) {
          var r = this;
          if ((this._streams = this._streams || ({}), this._reverseStreams = this._reverseStreams || ({}), e.getTracks().forEach(function (e) {
            if (r.getSenders().find(function (t) {
              return t.track === e;
            })) throw new DOMException("Track already exists.", "InvalidAccessError");
          }), !this._reverseStreams[e.id])) {
            var n = new t.MediaStream(e.getTracks());
            (this._streams[e.id] = n, this._reverseStreams[n.id] = e, e = n);
          }
          i.apply(this, [e]);
        };
        var s = t.RTCPeerConnection.prototype.removeStream;
        (t.RTCPeerConnection.prototype.removeStream = function (e) {
          (this._streams = this._streams || ({}), this._reverseStreams = this._reverseStreams || ({}), s.apply(this, [this._streams[e.id] || e]), delete this._reverseStreams[this._streams[e.id] ? this._streams[e.id].id : e.id], delete this._streams[e.id]);
        }, t.RTCPeerConnection.prototype.addTrack = function (e, r) {
          var n = this;
          if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
          var i = [].slice.call(arguments, 1);
          if (1 !== i.length || !i[0].getTracks().find(function (t) {
            return t === e;
          })) throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
          if (this.getSenders().find(function (t) {
            return t.track === e;
          })) throw new DOMException("Track already exists.", "InvalidAccessError");
          (this._streams = this._streams || ({}), this._reverseStreams = this._reverseStreams || ({}));
          var o = this._streams[r.id];
          if (o) (o.addTrack(e), Promise.resolve().then(function () {
            n.dispatchEvent(new Event("negotiationneeded"));
          })); else {
            var s = new t.MediaStream([e]);
            (this._streams[r.id] = s, this._reverseStreams[s.id] = r, this.addStream(s));
          }
          return this.getSenders().find(function (t) {
            return t.track === e;
          });
        }, ["createOffer", "createAnswer"].forEach(function (e) {
          var r = t.RTCPeerConnection.prototype[e], n = o({}, e, function () {
            var e = this, t = arguments;
            return arguments.length && "function" == typeof arguments[0] ? r.apply(this, [function (r) {
              var n = p(e, r);
              t[0].apply(null, [n]);
            }, function (e) {
              t[1] && t[1].apply(null, e);
            }, arguments[2]]) : r.apply(this, arguments).then(function (t) {
              return p(e, t);
            });
          });
          t.RTCPeerConnection.prototype[e] = n[e];
        }));
        var a = t.RTCPeerConnection.prototype.setLocalDescription;
        t.RTCPeerConnection.prototype.setLocalDescription = function () {
          return arguments.length && arguments[0].type ? (arguments[0] = (e = this, t = arguments[0], r = t.sdp, Object.keys(e._reverseStreams || []).forEach(function (t) {
            var n = e._reverseStreams[t], i = e._streams[n.id];
            r = r.replace(new RegExp(n.id, "g"), i.id);
          }), new RTCSessionDescription({
            type: t.type,
            sdp: r
          })), a.apply(this, arguments)) : a.apply(this, arguments);
          var e, t, r;
        };
        var c = Object.getOwnPropertyDescriptor(t.RTCPeerConnection.prototype, "localDescription");
        (Object.defineProperty(t.RTCPeerConnection.prototype, "localDescription", {
          get: function () {
            var e = c.get.apply(this);
            return "" === e.type ? e : p(this, e);
          }
        }), t.RTCPeerConnection.prototype.removeTrack = function (e) {
          var t, r = this;
          if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
          if (!e._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
          if (!(e._pc === this)) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
          (this._streams = this._streams || ({}), Object.keys(this._streams).forEach(function (n) {
            r._streams[n].getTracks().find(function (t) {
              return e.track === t;
            }) && (t = r._streams[n]);
          }), t && (1 === t.getTracks().length ? this.removeStream(this._reverseStreams[t.id]) : t.removeTrack(e.track), this.dispatchEvent(new Event("negotiationneeded"))));
        });
      }
      function p(e, t) {
        var r = t.sdp;
        return (Object.keys(e._reverseStreams || []).forEach(function (t) {
          var n = e._reverseStreams[t], i = e._streams[n.id];
          r = r.replace(new RegExp(i.id, "g"), n.id);
        }), new RTCSessionDescription({
          type: t.type,
          sdp: r
        }));
      }
    }
    function u(t) {
      var r = e.detectBrowser(t);
      if ((!t.RTCPeerConnection && t.webkitRTCPeerConnection && (t.RTCPeerConnection = t.webkitRTCPeerConnection), t.RTCPeerConnection)) {
        r.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (e) {
          var r = t.RTCPeerConnection.prototype[e], n = o({}, e, function () {
            return (arguments[0] = new ("addIceCandidate" === e ? t.RTCIceCandidate : t.RTCSessionDescription)(arguments[0]), r.apply(this, arguments));
          });
          t.RTCPeerConnection.prototype[e] = n[e];
        });
        var n = t.RTCPeerConnection.prototype.addIceCandidate;
        t.RTCPeerConnection.prototype.addIceCandidate = function () {
          return arguments[0] ? r.version < 78 && arguments[0] && "" === arguments[0].candidate ? Promise.resolve() : n.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
        };
      }
    }
    function l(t) {
      e.wrapPeerConnectionEvent(t, "negotiationneeded", function (e) {
        if ("stable" === e.target.signalingState) return e;
      });
    }
  }, {
    "../utils.js": "iSxC",
    "./getusermedia": "s6SN",
    "./getdisplaymedia": "VHa8"
  }],
  "NZ1C": [function (require, module, exports) {
    "use strict";
    (Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.filterIceServers = n);
    var r = t(require("../utils"));
    function e() {
      if ("function" != typeof WeakMap) return null;
      var r = new WeakMap();
      return (e = function () {
        return r;
      }, r);
    }
    function t(r) {
      if (r && r.__esModule) return r;
      if (null === r || "object" != typeof r && "function" != typeof r) return {
        default: r
      };
      var t = e();
      if (t && t.has(r)) return t.get(r);
      var n = {}, u = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var i in r) if (Object.prototype.hasOwnProperty.call(r, i)) {
        var f = u ? Object.getOwnPropertyDescriptor(r, i) : null;
        f && (f.get || f.set) ? Object.defineProperty(n, i, f) : n[i] = r[i];
      }
      return (n.default = r, t && t.set(r, n), n);
    }
    function n(e, t) {
      var n = !1;
      return (e = JSON.parse(JSON.stringify(e))).filter(function (e) {
        if (e && (e.urls || e.url)) {
          var t = e.urls || e.url;
          e.url && !e.urls && r.deprecated("RTCIceServer.url", "RTCIceServer.urls");
          var u = "string" == typeof t;
          return (u && (t = [t]), t = t.filter(function (r) {
            if (0 === r.indexOf("stun:")) return !1;
            var e = r.startsWith("turn") && !r.startsWith("turn:[") && r.includes("transport=udp");
            return e && !n ? (n = !0, !0) : e && !n;
          }), delete e.url, e.urls = u ? t[0] : t, !!t.length);
        }
      });
    }
  }, {
    "../utils": "iSxC"
  }],
  "YHvh": [function (require, module, exports) {
    "use strict";
    var r = {
      generateIdentifier: function () {
        return Math.random().toString(36).substr(2, 10);
      }
    };
    (r.localCName = r.generateIdentifier(), r.splitLines = function (r) {
      return r.trim().split("\n").map(function (r) {
        return r.trim();
      });
    }, r.splitSections = function (r) {
      return r.split("\nm=").map(function (r, e) {
        return (e > 0 ? "m=" + r : r).trim() + "\r\n";
      });
    }, r.getDescription = function (e) {
      var t = r.splitSections(e);
      return t && t[0];
    }, r.getMediaSections = function (e) {
      var t = r.splitSections(e);
      return (t.shift(), t);
    }, r.matchPrefix = function (e, t) {
      return r.splitLines(e).filter(function (r) {
        return 0 === r.indexOf(t);
      });
    }, r.parseCandidate = function (r) {
      for (var e, t = {
        foundation: (e = 0 === r.indexOf("a=candidate:") ? r.substring(12).split(" ") : r.substring(10).split(" "))[0],
        component: parseInt(e[1], 10),
        protocol: e[2].toLowerCase(),
        priority: parseInt(e[3], 10),
        ip: e[4],
        address: e[4],
        port: parseInt(e[5], 10),
        type: e[7]
      }, n = 8; n < e.length; n += 2) switch (e[n]) {
        case "raddr":
          t.relatedAddress = e[n + 1];
          break;
        case "rport":
          t.relatedPort = parseInt(e[n + 1], 10);
          break;
        case "tcptype":
          t.tcpType = e[n + 1];
          break;
        case "ufrag":
          (t.ufrag = e[n + 1], t.usernameFragment = e[n + 1]);
          break;
        default:
          t[e[n]] = e[n + 1];
      }
      return t;
    }, r.writeCandidate = function (r) {
      var e = [];
      (e.push(r.foundation), e.push(r.component), e.push(r.protocol.toUpperCase()), e.push(r.priority), e.push(r.address || r.ip), e.push(r.port));
      var t = r.type;
      return (e.push("typ"), e.push(t), "host" !== t && r.relatedAddress && r.relatedPort && (e.push("raddr"), e.push(r.relatedAddress), e.push("rport"), e.push(r.relatedPort)), r.tcpType && "tcp" === r.protocol.toLowerCase() && (e.push("tcptype"), e.push(r.tcpType)), (r.usernameFragment || r.ufrag) && (e.push("ufrag"), e.push(r.usernameFragment || r.ufrag)), "candidate:" + e.join(" "));
    }, r.parseIceOptions = function (r) {
      return r.substr(14).split(" ");
    }, r.parseRtpMap = function (r) {
      var e = r.substr(9).split(" "), t = {
        payloadType: parseInt(e.shift(), 10)
      };
      return (e = e[0].split("/"), t.name = e[0], t.clockRate = parseInt(e[1], 10), t.channels = 3 === e.length ? parseInt(e[2], 10) : 1, t.numChannels = t.channels, t);
    }, r.writeRtpMap = function (r) {
      var e = r.payloadType;
      void 0 !== r.preferredPayloadType && (e = r.preferredPayloadType);
      var t = r.channels || r.numChannels || 1;
      return "a=rtpmap:" + e + " " + r.name + "/" + r.clockRate + (1 !== t ? "/" + t : "") + "\r\n";
    }, r.parseExtmap = function (r) {
      var e = r.substr(9).split(" ");
      return {
        id: parseInt(e[0], 10),
        direction: e[0].indexOf("/") > 0 ? e[0].split("/")[1] : "sendrecv",
        uri: e[1]
      };
    }, r.writeExtmap = function (r) {
      return "a=extmap:" + (r.id || r.preferredId) + (r.direction && "sendrecv" !== r.direction ? "/" + r.direction : "") + " " + r.uri + "\r\n";
    }, r.parseFmtp = function (r) {
      for (var e, t = {}, n = r.substr(r.indexOf(" ") + 1).split(";"), a = 0; a < n.length; a++) t[(e = n[a].trim().split("="))[0].trim()] = e[1];
      return t;
    }, r.writeFmtp = function (r) {
      var e = "", t = r.payloadType;
      if ((void 0 !== r.preferredPayloadType && (t = r.preferredPayloadType), r.parameters && Object.keys(r.parameters).length)) {
        var n = [];
        (Object.keys(r.parameters).forEach(function (e) {
          r.parameters[e] ? n.push(e + "=" + r.parameters[e]) : n.push(e);
        }), e += "a=fmtp:" + t + " " + n.join(";") + "\r\n");
      }
      return e;
    }, r.parseRtcpFb = function (r) {
      var e = r.substr(r.indexOf(" ") + 1).split(" ");
      return {
        type: e.shift(),
        parameter: e.join(" ")
      };
    }, r.writeRtcpFb = function (r) {
      var e = "", t = r.payloadType;
      return (void 0 !== r.preferredPayloadType && (t = r.preferredPayloadType), r.rtcpFeedback && r.rtcpFeedback.length && r.rtcpFeedback.forEach(function (r) {
        e += "a=rtcp-fb:" + t + " " + r.type + (r.parameter && r.parameter.length ? " " + r.parameter : "") + "\r\n";
      }), e);
    }, r.parseSsrcMedia = function (r) {
      var e = r.indexOf(" "), t = {
        ssrc: parseInt(r.substr(7, e - 7), 10)
      }, n = r.indexOf(":", e);
      return (n > -1 ? (t.attribute = r.substr(e + 1, n - e - 1), t.value = r.substr(n + 1)) : t.attribute = r.substr(e + 1), t);
    }, r.parseSsrcGroup = function (r) {
      var e = r.substr(13).split(" ");
      return {
        semantics: e.shift(),
        ssrcs: e.map(function (r) {
          return parseInt(r, 10);
        })
      };
    }, r.getMid = function (e) {
      var t = r.matchPrefix(e, "a=mid:")[0];
      if (t) return t.substr(6);
    }, r.parseFingerprint = function (r) {
      var e = r.substr(14).split(" ");
      return {
        algorithm: e[0].toLowerCase(),
        value: e[1]
      };
    }, r.getDtlsParameters = function (e, t) {
      return {
        role: "auto",
        fingerprints: r.matchPrefix(e + t, "a=fingerprint:").map(r.parseFingerprint)
      };
    }, r.writeDtlsParameters = function (r, e) {
      var t = "a=setup:" + e + "\r\n";
      return (r.fingerprints.forEach(function (r) {
        t += "a=fingerprint:" + r.algorithm + " " + r.value + "\r\n";
      }), t);
    }, r.getIceParameters = function (e, t) {
      var n = r.splitLines(e);
      return {
        usernameFragment: (n = n.concat(r.splitLines(t))).filter(function (r) {
          return 0 === r.indexOf("a=ice-ufrag:");
        })[0].substr(12),
        password: n.filter(function (r) {
          return 0 === r.indexOf("a=ice-pwd:");
        })[0].substr(10)
      };
    }, r.writeIceParameters = function (r) {
      return "a=ice-ufrag:" + r.usernameFragment + "\r\na=ice-pwd:" + r.password + "\r\n";
    }, r.parseRtpParameters = function (e) {
      for (var t = {
        codecs: [],
        headerExtensions: [],
        fecMechanisms: [],
        rtcp: []
      }, n = r.splitLines(e)[0].split(" "), a = 3; a < n.length; a++) {
        var s = n[a], i = r.matchPrefix(e, "a=rtpmap:" + s + " ")[0];
        if (i) {
          var p = r.parseRtpMap(i), c = r.matchPrefix(e, "a=fmtp:" + s + " ");
          switch ((p.parameters = c.length ? r.parseFmtp(c[0]) : {}, p.rtcpFeedback = r.matchPrefix(e, "a=rtcp-fb:" + s + " ").map(r.parseRtcpFb), t.codecs.push(p), p.name.toUpperCase())) {
            case "RED":
            case "ULPFEC":
              t.fecMechanisms.push(p.name.toUpperCase());
          }
        }
      }
      return (r.matchPrefix(e, "a=extmap:").forEach(function (e) {
        t.headerExtensions.push(r.parseExtmap(e));
      }), t);
    }, r.writeRtpDescription = function (e, t) {
      var n = "";
      (n += "m=" + e + " ", n += t.codecs.length > 0 ? "9" : "0", n += " UDP/TLS/RTP/SAVPF ", n += t.codecs.map(function (r) {
        return void 0 !== r.preferredPayloadType ? r.preferredPayloadType : r.payloadType;
      }).join(" ") + "\r\n", n += "c=IN IP4 0.0.0.0\r\n", n += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t.codecs.forEach(function (e) {
        (n += r.writeRtpMap(e), n += r.writeFmtp(e), n += r.writeRtcpFb(e));
      }));
      var a = 0;
      return (t.codecs.forEach(function (r) {
        r.maxptime > a && (a = r.maxptime);
      }), a > 0 && (n += "a=maxptime:" + a + "\r\n"), n += "a=rtcp-mux\r\n", t.headerExtensions && t.headerExtensions.forEach(function (e) {
        n += r.writeExtmap(e);
      }), n);
    }, r.parseRtpEncodingParameters = function (e) {
      var t, n = [], a = r.parseRtpParameters(e), s = -1 !== a.fecMechanisms.indexOf("RED"), i = -1 !== a.fecMechanisms.indexOf("ULPFEC"), p = r.matchPrefix(e, "a=ssrc:").map(function (e) {
        return r.parseSsrcMedia(e);
      }).filter(function (r) {
        return "cname" === r.attribute;
      }), c = p.length > 0 && p[0].ssrc, o = r.matchPrefix(e, "a=ssrc-group:FID").map(function (r) {
        return r.substr(17).split(" ").map(function (r) {
          return parseInt(r, 10);
        });
      });
      (o.length > 0 && o[0].length > 1 && o[0][0] === c && (t = o[0][1]), a.codecs.forEach(function (r) {
        if ("RTX" === r.name.toUpperCase() && r.parameters.apt) {
          var e = {
            ssrc: c,
            codecPayloadType: parseInt(r.parameters.apt, 10)
          };
          (c && t && (e.rtx = {
            ssrc: t
          }), n.push(e), s && ((e = JSON.parse(JSON.stringify(e))).fec = {
            ssrc: c,
            mechanism: i ? "red+ulpfec" : "red"
          }, n.push(e)));
        }
      }), 0 === n.length && c && n.push({
        ssrc: c
      }));
      var u = r.matchPrefix(e, "b=");
      return (u.length && (u = 0 === u[0].indexOf("b=TIAS:") ? parseInt(u[0].substr(7), 10) : 0 === u[0].indexOf("b=AS:") ? 1e3 * parseInt(u[0].substr(5), 10) * .95 - 16e3 : void 0, n.forEach(function (r) {
        r.maxBitrate = u;
      })), n);
    }, r.parseRtcpParameters = function (e) {
      var t = {}, n = r.matchPrefix(e, "a=ssrc:").map(function (e) {
        return r.parseSsrcMedia(e);
      }).filter(function (r) {
        return "cname" === r.attribute;
      })[0];
      n && (t.cname = n.value, t.ssrc = n.ssrc);
      var a = r.matchPrefix(e, "a=rtcp-rsize");
      (t.reducedSize = a.length > 0, t.compound = 0 === a.length);
      var s = r.matchPrefix(e, "a=rtcp-mux");
      return (t.mux = s.length > 0, t);
    }, r.parseMsid = function (e) {
      var t, n = r.matchPrefix(e, "a=msid:");
      if (1 === n.length) return {
        stream: (t = n[0].substr(7).split(" "))[0],
        track: t[1]
      };
      var a = r.matchPrefix(e, "a=ssrc:").map(function (e) {
        return r.parseSsrcMedia(e);
      }).filter(function (r) {
        return "msid" === r.attribute;
      });
      return a.length > 0 ? {
        stream: (t = a[0].value.split(" "))[0],
        track: t[1]
      } : void 0;
    }, r.parseSctpDescription = function (e) {
      var t, n = r.parseMLine(e), a = r.matchPrefix(e, "a=max-message-size:");
      (a.length > 0 && (t = parseInt(a[0].substr(19), 10)), isNaN(t) && (t = 65536));
      var s = r.matchPrefix(e, "a=sctp-port:");
      if (s.length > 0) return {
        port: parseInt(s[0].substr(12), 10),
        protocol: n.fmt,
        maxMessageSize: t
      };
      if (r.matchPrefix(e, "a=sctpmap:").length > 0) {
        var i = r.matchPrefix(e, "a=sctpmap:")[0].substr(10).split(" ");
        return {
          port: parseInt(i[0], 10),
          protocol: i[1],
          maxMessageSize: t
        };
      }
    }, r.writeSctpDescription = function (r, e) {
      var t = [];
      return (t = "DTLS/SCTP" !== r.protocol ? ["m=" + r.kind + " 9 " + r.protocol + " " + e.protocol + "\r\n", "c=IN IP4 0.0.0.0\r\n", "a=sctp-port:" + e.port + "\r\n"] : ["m=" + r.kind + " 9 " + r.protocol + " " + e.port + "\r\n", "c=IN IP4 0.0.0.0\r\n", "a=sctpmap:" + e.port + " " + e.protocol + " 65535\r\n"], void 0 !== e.maxMessageSize && t.push("a=max-message-size:" + e.maxMessageSize + "\r\n"), t.join(""));
    }, r.generateSessionId = function () {
      return Math.random().toString().substr(2, 21);
    }, r.writeSessionBoilerplate = function (e, t, n) {
      var a = void 0 !== t ? t : 2;
      return "v=0\r\no=" + (n || "thisisadapterortc") + " " + (e || r.generateSessionId()) + " " + a + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n";
    }, r.writeMediaSection = function (e, t, n, a) {
      var s = r.writeRtpDescription(e.kind, t);
      if ((s += r.writeIceParameters(e.iceGatherer.getLocalParameters()), s += r.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === n ? "actpass" : "active"), s += "a=mid:" + e.mid + "\r\n", e.direction ? s += "a=" + e.direction + "\r\n" : e.rtpSender && e.rtpReceiver ? s += "a=sendrecv\r\n" : e.rtpSender ? s += "a=sendonly\r\n" : e.rtpReceiver ? s += "a=recvonly\r\n" : s += "a=inactive\r\n", e.rtpSender)) {
        var i = "msid:" + a.id + " " + e.rtpSender.track.id + "\r\n";
        (s += "a=" + i, s += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + i, e.sendEncodingParameters[0].rtx && (s += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + i, s += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n"));
      }
      return (s += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + r.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (s += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + r.localCName + "\r\n"), s);
    }, r.getDirection = function (e, t) {
      for (var n = r.splitLines(e), a = 0; a < n.length; a++) switch (n[a]) {
        case "a=sendrecv":
        case "a=sendonly":
        case "a=recvonly":
        case "a=inactive":
          return n[a].substr(2);
      }
      return t ? r.getDirection(t) : "sendrecv";
    }, r.getKind = function (e) {
      return r.splitLines(e)[0].split(" ")[0].substr(2);
    }, r.isRejected = function (r) {
      return "0" === r.split(" ", 2)[1];
    }, r.parseMLine = function (e) {
      var t = r.splitLines(e)[0].substr(2).split(" ");
      return {
        kind: t[0],
        port: parseInt(t[1], 10),
        protocol: t[2],
        fmt: t.slice(3).join(" ")
      };
    }, r.parseOLine = function (e) {
      var t = r.matchPrefix(e, "o=")[0].substr(2).split(" ");
      return {
        username: t[0],
        sessionId: t[1],
        sessionVersion: parseInt(t[2], 10),
        netType: t[3],
        addressType: t[4],
        address: t[5]
      };
    }, r.isValidSDP = function (e) {
      if ("string" != typeof e || 0 === e.length) return !1;
      for (var t = r.splitLines(e), n = 0; n < t.length; n++) if (t[n].length < 2 || "=" !== t[n].charAt(1)) return !1;
      return !0;
    }, "object" == typeof module && (module.exports = r));
  }, {}],
  "NJ2u": [function (require, module, exports) {
    "use strict";
    var e = require("sdp");
    function t(e) {
      return ({
        inboundrtp: "inbound-rtp",
        outboundrtp: "outbound-rtp",
        candidatepair: "candidate-pair",
        localcandidate: "local-candidate",
        remotecandidate: "remote-candidate"
      })[e.type] || e.type;
    }
    function r(t, r, n, a, i) {
      var s = e.writeRtpDescription(t.kind, r);
      if ((s += e.writeIceParameters(t.iceGatherer.getLocalParameters()), s += e.writeDtlsParameters(t.dtlsTransport.getLocalParameters(), "offer" === n ? "actpass" : i || "active"), s += "a=mid:" + t.mid + "\r\n", t.rtpSender && t.rtpReceiver ? s += "a=sendrecv\r\n" : t.rtpSender ? s += "a=sendonly\r\n" : t.rtpReceiver ? s += "a=recvonly\r\n" : s += "a=inactive\r\n", t.rtpSender)) {
        var o = t.rtpSender._initialTrackId || t.rtpSender.track.id;
        t.rtpSender._initialTrackId = o;
        var c = "msid:" + (a ? a.id : "-") + " " + o + "\r\n";
        (s += "a=" + c, s += "a=ssrc:" + t.sendEncodingParameters[0].ssrc + " " + c, t.sendEncodingParameters[0].rtx && (s += "a=ssrc:" + t.sendEncodingParameters[0].rtx.ssrc + " " + c, s += "a=ssrc-group:FID " + t.sendEncodingParameters[0].ssrc + " " + t.sendEncodingParameters[0].rtx.ssrc + "\r\n"));
      }
      return (s += "a=ssrc:" + t.sendEncodingParameters[0].ssrc + " cname:" + e.localCName + "\r\n", t.rtpSender && t.sendEncodingParameters[0].rtx && (s += "a=ssrc:" + t.sendEncodingParameters[0].rtx.ssrc + " cname:" + e.localCName + "\r\n"), s);
    }
    function n(e, t) {
      var r = !1;
      return (e = JSON.parse(JSON.stringify(e))).filter(function (e) {
        if (e && (e.urls || e.url)) {
          var n = e.urls || e.url;
          e.url && !e.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
          var a = "string" == typeof n;
          return (a && (n = [n]), n = n.filter(function (e) {
            return 0 === e.indexOf("turn:") && -1 !== e.indexOf("transport=udp") && -1 === e.indexOf("turn:[") && !r ? (r = !0, !0) : 0 === e.indexOf("stun:") && t >= 14393 && -1 === e.indexOf("?transport=udp");
          }), delete e.url, e.urls = a ? n[0] : n, !!n.length);
        }
      });
    }
    function a(e, t) {
      var r = {
        codecs: [],
        headerExtensions: [],
        fecMechanisms: []
      }, n = function (e, t) {
        e = parseInt(e, 10);
        for (var r = 0; r < t.length; r++) if (t[r].payloadType === e || t[r].preferredPayloadType === e) return t[r];
      }, a = function (e, t, r, a) {
        var i = n(e.parameters.apt, r), s = n(t.parameters.apt, a);
        return i && s && i.name.toLowerCase() === s.name.toLowerCase();
      };
      return (e.codecs.forEach(function (n) {
        for (var i = 0; i < t.codecs.length; i++) {
          var s = t.codecs[i];
          if (n.name.toLowerCase() === s.name.toLowerCase() && n.clockRate === s.clockRate) {
            if ("rtx" === n.name.toLowerCase() && n.parameters && s.parameters.apt && !a(n, s, e.codecs, t.codecs)) continue;
            ((s = JSON.parse(JSON.stringify(s))).numChannels = Math.min(n.numChannels, s.numChannels), r.codecs.push(s), s.rtcpFeedback = s.rtcpFeedback.filter(function (e) {
              for (var t = 0; t < n.rtcpFeedback.length; t++) if (n.rtcpFeedback[t].type === e.type && n.rtcpFeedback[t].parameter === e.parameter) return !0;
              return !1;
            }));
            break;
          }
        }
      }), e.headerExtensions.forEach(function (e) {
        for (var n = 0; n < t.headerExtensions.length; n++) {
          var a = t.headerExtensions[n];
          if (e.uri === a.uri) {
            r.headerExtensions.push(a);
            break;
          }
        }
      }), r);
    }
    function i(e, t, r) {
      return -1 !== ({
        offer: {
          setLocalDescription: ["stable", "have-local-offer"],
          setRemoteDescription: ["stable", "have-remote-offer"]
        },
        answer: {
          setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
          setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]
        }
      })[t][e].indexOf(r);
    }
    function s(e, t) {
      var r = e.getRemoteCandidates().find(function (e) {
        return t.foundation === e.foundation && t.ip === e.ip && t.port === e.port && t.priority === e.priority && t.protocol === e.protocol && t.type === e.type;
      });
      return (r || e.addRemoteCandidate(t), !r);
    }
    function o(e, t) {
      var r = new Error(t);
      return (r.name = e, r.code = ({
        NotSupportedError: 9,
        InvalidStateError: 11,
        InvalidAccessError: 15,
        TypeError: void 0,
        OperationError: void 0
      })[e], r);
    }
    module.exports = function (c, d) {
      function p(e, t) {
        (t.addTrack(e), t.dispatchEvent(new c.MediaStreamTrackEvent("addtrack", {
          track: e
        })));
      }
      function l(e, t, r, n) {
        var a = new Event("track");
        (a.track = t, a.receiver = r, a.transceiver = {
          receiver: r
        }, a.streams = n, c.setTimeout(function () {
          e._dispatchEvent("track", a);
        }));
      }
      var f = function (t) {
        var r = this, a = document.createDocumentFragment();
        if ((["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function (e) {
          r[e] = a[e].bind(a);
        }), this.canTrickleIceCandidates = null, this.needNegotiation = !1, this.localStreams = [], this.remoteStreams = [], this._localDescription = null, this._remoteDescription = null, this.signalingState = "stable", this.iceConnectionState = "new", this.connectionState = "new", this.iceGatheringState = "new", t = JSON.parse(JSON.stringify(t || ({}))), this.usingBundle = "max-bundle" === t.bundlePolicy, "negotiate" === t.rtcpMuxPolicy)) throw o("NotSupportedError", "rtcpMuxPolicy 'negotiate' is not supported");
        switch ((t.rtcpMuxPolicy || (t.rtcpMuxPolicy = "require"), t.iceTransportPolicy)) {
          case "all":
          case "relay":
            break;
          default:
            t.iceTransportPolicy = "all";
        }
        switch (t.bundlePolicy) {
          case "balanced":
          case "max-compat":
          case "max-bundle":
            break;
          default:
            t.bundlePolicy = "balanced";
        }
        if ((t.iceServers = n(t.iceServers || [], d), this._iceGatherers = [], t.iceCandidatePoolSize)) for (var i = t.iceCandidatePoolSize; i > 0; i--) this._iceGatherers.push(new c.RTCIceGatherer({
          iceServers: t.iceServers,
          gatherPolicy: t.iceTransportPolicy
        })); else t.iceCandidatePoolSize = 0;
        (this._config = t, this.transceivers = [], this._sdpSessionId = e.generateSessionId(), this._sdpSessionVersion = 0, this._dtlsRole = void 0, this._isClosed = !1);
      };
      (Object.defineProperty(f.prototype, "localDescription", {
        configurable: !0,
        get: function () {
          return this._localDescription;
        }
      }), Object.defineProperty(f.prototype, "remoteDescription", {
        configurable: !0,
        get: function () {
          return this._remoteDescription;
        }
      }), f.prototype.onicecandidate = null, f.prototype.onaddstream = null, f.prototype.ontrack = null, f.prototype.onremovestream = null, f.prototype.onsignalingstatechange = null, f.prototype.oniceconnectionstatechange = null, f.prototype.onconnectionstatechange = null, f.prototype.onicegatheringstatechange = null, f.prototype.onnegotiationneeded = null, f.prototype.ondatachannel = null, f.prototype._dispatchEvent = function (e, t) {
        this._isClosed || (this.dispatchEvent(t), "function" == typeof this["on" + e] && this["on" + e](t));
      }, f.prototype._emitGatheringStateChange = function () {
        var e = new Event("icegatheringstatechange");
        this._dispatchEvent("icegatheringstatechange", e);
      }, f.prototype.getConfiguration = function () {
        return this._config;
      }, f.prototype.getLocalStreams = function () {
        return this.localStreams;
      }, f.prototype.getRemoteStreams = function () {
        return this.remoteStreams;
      }, f.prototype._createTransceiver = function (e, t) {
        var r = this.transceivers.length > 0, n = {
          track: null,
          iceGatherer: null,
          iceTransport: null,
          dtlsTransport: null,
          localCapabilities: null,
          remoteCapabilities: null,
          rtpSender: null,
          rtpReceiver: null,
          kind: e,
          mid: null,
          sendEncodingParameters: null,
          recvEncodingParameters: null,
          stream: null,
          associatedRemoteMediaStreams: [],
          wantReceive: !0
        };
        if (this.usingBundle && r) (n.iceTransport = this.transceivers[0].iceTransport, n.dtlsTransport = this.transceivers[0].dtlsTransport); else {
          var a = this._createIceAndDtlsTransports();
          (n.iceTransport = a.iceTransport, n.dtlsTransport = a.dtlsTransport);
        }
        return (t || this.transceivers.push(n), n);
      }, f.prototype.addTrack = function (e, t) {
        if (this._isClosed) throw o("InvalidStateError", "Attempted to call addTrack on a closed peerconnection.");
        var r;
        if (this.transceivers.find(function (t) {
          return t.track === e;
        })) throw o("InvalidAccessError", "Track already exists.");
        for (var n = 0; n < this.transceivers.length; n++) this.transceivers[n].track || this.transceivers[n].kind !== e.kind || (r = this.transceivers[n]);
        return (r || (r = this._createTransceiver(e.kind)), this._maybeFireNegotiationNeeded(), -1 === this.localStreams.indexOf(t) && this.localStreams.push(t), r.track = e, r.stream = t, r.rtpSender = new c.RTCRtpSender(e, r.dtlsTransport), r.rtpSender);
      }, f.prototype.addStream = function (e) {
        var t = this;
        if (d >= 15025) e.getTracks().forEach(function (r) {
          t.addTrack(r, e);
        }); else {
          var r = e.clone();
          (e.getTracks().forEach(function (e, t) {
            var n = r.getTracks()[t];
            e.addEventListener("enabled", function (e) {
              n.enabled = e.enabled;
            });
          }), r.getTracks().forEach(function (e) {
            t.addTrack(e, r);
          }));
        }
      }, f.prototype.removeTrack = function (e) {
        if (this._isClosed) throw o("InvalidStateError", "Attempted to call removeTrack on a closed peerconnection.");
        if (!(e instanceof c.RTCRtpSender)) throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
        var t = this.transceivers.find(function (t) {
          return t.rtpSender === e;
        });
        if (!t) throw o("InvalidAccessError", "Sender was not created by this connection.");
        var r = t.stream;
        (t.rtpSender.stop(), t.rtpSender = null, t.track = null, t.stream = null, -1 === this.transceivers.map(function (e) {
          return e.stream;
        }).indexOf(r) && this.localStreams.indexOf(r) > -1 && this.localStreams.splice(this.localStreams.indexOf(r), 1), this._maybeFireNegotiationNeeded());
      }, f.prototype.removeStream = function (e) {
        var t = this;
        e.getTracks().forEach(function (e) {
          var r = t.getSenders().find(function (t) {
            return t.track === e;
          });
          r && t.removeTrack(r);
        });
      }, f.prototype.getSenders = function () {
        return this.transceivers.filter(function (e) {
          return !!e.rtpSender;
        }).map(function (e) {
          return e.rtpSender;
        });
      }, f.prototype.getReceivers = function () {
        return this.transceivers.filter(function (e) {
          return !!e.rtpReceiver;
        }).map(function (e) {
          return e.rtpReceiver;
        });
      }, f.prototype._createIceGatherer = function (e, t) {
        var r = this;
        if (t && e > 0) return this.transceivers[0].iceGatherer;
        if (this._iceGatherers.length) return this._iceGatherers.shift();
        var n = new c.RTCIceGatherer({
          iceServers: this._config.iceServers,
          gatherPolicy: this._config.iceTransportPolicy
        });
        return (Object.defineProperty(n, "state", {
          value: "new",
          writable: !0
        }), this.transceivers[e].bufferedCandidateEvents = [], this.transceivers[e].bufferCandidates = function (t) {
          var a = !t.candidate || 0 === Object.keys(t.candidate).length;
          (n.state = a ? "completed" : "gathering", null !== r.transceivers[e].bufferedCandidateEvents && r.transceivers[e].bufferedCandidateEvents.push(t));
        }, n.addEventListener("localcandidate", this.transceivers[e].bufferCandidates), n);
      }, f.prototype._gather = function (t, r) {
        var n = this, a = this.transceivers[r].iceGatherer;
        if (!a.onlocalcandidate) {
          var i = this.transceivers[r].bufferedCandidateEvents;
          (this.transceivers[r].bufferedCandidateEvents = null, a.removeEventListener("localcandidate", this.transceivers[r].bufferCandidates), a.onlocalcandidate = function (i) {
            if (!(n.usingBundle && r > 0)) {
              var s = new Event("icecandidate");
              s.candidate = {
                sdpMid: t,
                sdpMLineIndex: r
              };
              var o = i.candidate, c = !o || 0 === Object.keys(o).length;
              if (c) "new" !== a.state && "gathering" !== a.state || (a.state = "completed"); else {
                ("new" === a.state && (a.state = "gathering"), o.component = 1, o.ufrag = a.getLocalParameters().usernameFragment);
                var d = e.writeCandidate(o);
                (s.candidate = Object.assign(s.candidate, e.parseCandidate(d)), s.candidate.candidate = d, s.candidate.toJSON = function () {
                  return {
                    candidate: s.candidate.candidate,
                    sdpMid: s.candidate.sdpMid,
                    sdpMLineIndex: s.candidate.sdpMLineIndex,
                    usernameFragment: s.candidate.usernameFragment
                  };
                });
              }
              var p = e.getMediaSections(n._localDescription.sdp);
              (p[s.candidate.sdpMLineIndex] += c ? "a=end-of-candidates\r\n" : "a=" + s.candidate.candidate + "\r\n", n._localDescription.sdp = e.getDescription(n._localDescription.sdp) + p.join(""));
              var l = n.transceivers.every(function (e) {
                return e.iceGatherer && "completed" === e.iceGatherer.state;
              });
              ("gathering" !== n.iceGatheringState && (n.iceGatheringState = "gathering", n._emitGatheringStateChange()), c || n._dispatchEvent("icecandidate", s), l && (n._dispatchEvent("icecandidate", new Event("icecandidate")), n.iceGatheringState = "complete", n._emitGatheringStateChange()));
            }
          }, c.setTimeout(function () {
            i.forEach(function (e) {
              a.onlocalcandidate(e);
            });
          }, 0));
        }
      }, f.prototype._createIceAndDtlsTransports = function () {
        var e = this, t = new c.RTCIceTransport(null);
        t.onicestatechange = function () {
          (e._updateIceConnectionState(), e._updateConnectionState());
        };
        var r = new c.RTCDtlsTransport(t);
        return (r.ondtlsstatechange = function () {
          e._updateConnectionState();
        }, r.onerror = function () {
          (Object.defineProperty(r, "state", {
            value: "failed",
            writable: !0
          }), e._updateConnectionState());
        }, {
          iceTransport: t,
          dtlsTransport: r
        });
      }, f.prototype._disposeIceAndDtlsTransports = function (e) {
        var t = this.transceivers[e].iceGatherer;
        t && (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer);
        var r = this.transceivers[e].iceTransport;
        r && (delete r.onicestatechange, delete this.transceivers[e].iceTransport);
        var n = this.transceivers[e].dtlsTransport;
        n && (delete n.ondtlsstatechange, delete n.onerror, delete this.transceivers[e].dtlsTransport);
      }, f.prototype._transceive = function (t, r, n) {
        var i = a(t.localCapabilities, t.remoteCapabilities);
        (r && t.rtpSender && (i.encodings = t.sendEncodingParameters, i.rtcp = {
          cname: e.localCName,
          compound: t.rtcpParameters.compound
        }, t.recvEncodingParameters.length && (i.rtcp.ssrc = t.recvEncodingParameters[0].ssrc), t.rtpSender.send(i)), n && t.rtpReceiver && i.codecs.length > 0 && ("video" === t.kind && t.recvEncodingParameters && d < 15019 && t.recvEncodingParameters.forEach(function (e) {
          delete e.rtx;
        }), t.recvEncodingParameters.length ? i.encodings = t.recvEncodingParameters : i.encodings = [{}], i.rtcp = {
          compound: t.rtcpParameters.compound
        }, t.rtcpParameters.cname && (i.rtcp.cname = t.rtcpParameters.cname), t.sendEncodingParameters.length && (i.rtcp.ssrc = t.sendEncodingParameters[0].ssrc), t.rtpReceiver.receive(i)));
      }, f.prototype.setLocalDescription = function (t) {
        var r, n, s = this;
        if (-1 === ["offer", "answer"].indexOf(t.type)) return Promise.reject(o("TypeError", 'Unsupported type "' + t.type + '"'));
        if (!i("setLocalDescription", t.type, s.signalingState) || s._isClosed) return Promise.reject(o("InvalidStateError", "Can not set local " + t.type + " in state " + s.signalingState));
        if ("offer" === t.type) (r = e.splitSections(t.sdp), n = r.shift(), r.forEach(function (t, r) {
          var n = e.parseRtpParameters(t);
          s.transceivers[r].localCapabilities = n;
        }), s.transceivers.forEach(function (e, t) {
          s._gather(e.mid, t);
        })); else if ("answer" === t.type) {
          (r = e.splitSections(s._remoteDescription.sdp), n = r.shift());
          var c = e.matchPrefix(n, "a=ice-lite").length > 0;
          r.forEach(function (t, r) {
            var i = s.transceivers[r], o = i.iceGatherer, d = i.iceTransport, p = i.dtlsTransport, l = i.localCapabilities, f = i.remoteCapabilities;
            if (!(e.isRejected(t) && 0 === e.matchPrefix(t, "a=bundle-only").length) && !i.rejected) {
              var u = e.getIceParameters(t, n), v = e.getDtlsParameters(t, n);
              (c && (v.role = "server"), s.usingBundle && 0 !== r || (s._gather(i.mid, r), "new" === d.state && d.start(o, u, c ? "controlling" : "controlled"), "new" === p.state && p.start(v)));
              var h = a(l, f);
              s._transceive(i, h.codecs.length > 0, !1);
            }
          });
        }
        return (s._localDescription = {
          type: t.type,
          sdp: t.sdp
        }, "offer" === t.type ? s._updateSignalingState("have-local-offer") : s._updateSignalingState("stable"), Promise.resolve());
      }, f.prototype.setRemoteDescription = function (t) {
        var r = this;
        if (-1 === ["offer", "answer"].indexOf(t.type)) return Promise.reject(o("TypeError", 'Unsupported type "' + t.type + '"'));
        if (!i("setRemoteDescription", t.type, r.signalingState) || r._isClosed) return Promise.reject(o("InvalidStateError", "Can not set remote " + t.type + " in state " + r.signalingState));
        var n = {};
        r.remoteStreams.forEach(function (e) {
          n[e.id] = e;
        });
        var f = [], u = e.splitSections(t.sdp), v = u.shift(), h = e.matchPrefix(v, "a=ice-lite").length > 0, m = e.matchPrefix(v, "a=group:BUNDLE ").length > 0;
        r.usingBundle = m;
        var g = e.matchPrefix(v, "a=ice-options:")[0];
        return (r.canTrickleIceCandidates = !!g && g.substr(14).split(" ").indexOf("trickle") >= 0, u.forEach(function (i, o) {
          var l = e.splitLines(i), u = e.getKind(i), g = e.isRejected(i) && 0 === e.matchPrefix(i, "a=bundle-only").length, y = l[0].substr(2).split(" ")[2], S = e.getDirection(i, v), T = e.parseMsid(i), E = e.getMid(i) || e.generateIdentifier();
          if (g || "application" === u && ("DTLS/SCTP" === y || "UDP/DTLS/SCTP" === y)) r.transceivers[o] = {
            mid: E,
            kind: u,
            protocol: y,
            rejected: !0
          }; else {
            var C, P, w, R, _, k, b, x, D;
            !g && r.transceivers[o] && r.transceivers[o].rejected && (r.transceivers[o] = r._createTransceiver(u, !0));
            var I, L, M = e.parseRtpParameters(i);
            (g || (I = e.getIceParameters(i, v), (L = e.getDtlsParameters(i, v)).role = "client"), b = e.parseRtpEncodingParameters(i));
            var O = e.parseRtcpParameters(i), G = e.matchPrefix(i, "a=end-of-candidates", v).length > 0, j = e.matchPrefix(i, "a=candidate:").map(function (t) {
              return e.parseCandidate(t);
            }).filter(function (e) {
              return 1 === e.component;
            });
            if ((("offer" === t.type || "answer" === t.type) && !g && m && o > 0 && r.transceivers[o] && (r._disposeIceAndDtlsTransports(o), r.transceivers[o].iceGatherer = r.transceivers[0].iceGatherer, r.transceivers[o].iceTransport = r.transceivers[0].iceTransport, r.transceivers[o].dtlsTransport = r.transceivers[0].dtlsTransport, r.transceivers[o].rtpSender && r.transceivers[o].rtpSender.setTransport(r.transceivers[0].dtlsTransport), r.transceivers[o].rtpReceiver && r.transceivers[o].rtpReceiver.setTransport(r.transceivers[0].dtlsTransport)), "offer" !== t.type || g)) {
              if ("answer" === t.type && !g) {
                (P = (C = r.transceivers[o]).iceGatherer, w = C.iceTransport, R = C.dtlsTransport, _ = C.rtpReceiver, k = C.sendEncodingParameters, x = C.localCapabilities, r.transceivers[o].recvEncodingParameters = b, r.transceivers[o].remoteCapabilities = M, r.transceivers[o].rtcpParameters = O, j.length && "new" === w.state && (!h && !G || m && 0 !== o ? j.forEach(function (e) {
                  s(C.iceTransport, e);
                }) : w.setRemoteCandidates(j)), m && 0 !== o || ("new" === w.state && w.start(P, I, "controlling"), "new" === R.state && R.start(L)), !a(C.localCapabilities, C.remoteCapabilities).codecs.filter(function (e) {
                  return "rtx" === e.name.toLowerCase();
                }).length && C.sendEncodingParameters[0].rtx && delete C.sendEncodingParameters[0].rtx, r._transceive(C, "sendrecv" === S || "recvonly" === S, "sendrecv" === S || "sendonly" === S), !_ || "sendrecv" !== S && "sendonly" !== S ? delete C.rtpReceiver : (D = _.track, T ? (n[T.stream] || (n[T.stream] = new c.MediaStream()), p(D, n[T.stream]), f.push([D, _, n[T.stream]])) : (n.default || (n.default = new c.MediaStream()), p(D, n.default), f.push([D, _, n.default]))));
              }
            } else {
              ((C = r.transceivers[o] || r._createTransceiver(u)).mid = E, C.iceGatherer || (C.iceGatherer = r._createIceGatherer(o, m)), j.length && "new" === C.iceTransport.state && (!G || m && 0 !== o ? j.forEach(function (e) {
                s(C.iceTransport, e);
              }) : C.iceTransport.setRemoteCandidates(j)), x = c.RTCRtpReceiver.getCapabilities(u), d < 15019 && (x.codecs = x.codecs.filter(function (e) {
                return "rtx" !== e.name;
              })), k = C.sendEncodingParameters || [{
                ssrc: 1001 * (2 * o + 2)
              }]);
              var N, A = !1;
              if ("sendrecv" === S || "sendonly" === S) {
                if ((A = !C.rtpReceiver, _ = C.rtpReceiver || new c.RTCRtpReceiver(C.dtlsTransport, u), A)) (D = _.track, T && "-" === T.stream || (T ? (n[T.stream] || (n[T.stream] = new c.MediaStream(), Object.defineProperty(n[T.stream], "id", {
                  get: function () {
                    return T.stream;
                  }
                })), Object.defineProperty(D, "id", {
                  get: function () {
                    return T.track;
                  }
                }), N = n[T.stream]) : (n.default || (n.default = new c.MediaStream()), N = n.default)), N && (p(D, N), C.associatedRemoteMediaStreams.push(N)), f.push([D, _, N]));
              } else C.rtpReceiver && C.rtpReceiver.track && (C.associatedRemoteMediaStreams.forEach(function (e) {
                var t, r, n = e.getTracks().find(function (e) {
                  return e.id === C.rtpReceiver.track.id;
                });
                n && (t = n, (r = e).removeTrack(t), r.dispatchEvent(new c.MediaStreamTrackEvent("removetrack", {
                  track: t
                })));
              }), C.associatedRemoteMediaStreams = []);
              (C.localCapabilities = x, C.remoteCapabilities = M, C.rtpReceiver = _, C.rtcpParameters = O, C.sendEncodingParameters = k, C.recvEncodingParameters = b, r._transceive(r.transceivers[o], !1, A));
            }
          }
        }), void 0 === r._dtlsRole && (r._dtlsRole = "offer" === t.type ? "active" : "passive"), r._remoteDescription = {
          type: t.type,
          sdp: t.sdp
        }, "offer" === t.type ? r._updateSignalingState("have-remote-offer") : r._updateSignalingState("stable"), Object.keys(n).forEach(function (e) {
          var t = n[e];
          if (t.getTracks().length) {
            if (-1 === r.remoteStreams.indexOf(t)) {
              r.remoteStreams.push(t);
              var a = new Event("addstream");
              (a.stream = t, c.setTimeout(function () {
                r._dispatchEvent("addstream", a);
              }));
            }
            f.forEach(function (e) {
              var n = e[0], a = e[1];
              t.id === e[2].id && l(r, n, a, [t]);
            });
          }
        }), f.forEach(function (e) {
          e[2] || l(r, e[0], e[1], []);
        }), c.setTimeout(function () {
          r && r.transceivers && r.transceivers.forEach(function (e) {
            e.iceTransport && "new" === e.iceTransport.state && e.iceTransport.getRemoteCandidates().length > 0 && (console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"), e.iceTransport.addRemoteCandidate({}));
          });
        }, 4e3), Promise.resolve());
      }, f.prototype.close = function () {
        (this.transceivers.forEach(function (e) {
          (e.iceTransport && e.iceTransport.stop(), e.dtlsTransport && e.dtlsTransport.stop(), e.rtpSender && e.rtpSender.stop(), e.rtpReceiver && e.rtpReceiver.stop());
        }), this._isClosed = !0, this._updateSignalingState("closed"));
      }, f.prototype._updateSignalingState = function (e) {
        this.signalingState = e;
        var t = new Event("signalingstatechange");
        this._dispatchEvent("signalingstatechange", t);
      }, f.prototype._maybeFireNegotiationNeeded = function () {
        var e = this;
        "stable" === this.signalingState && !0 !== this.needNegotiation && (this.needNegotiation = !0, c.setTimeout(function () {
          if (e.needNegotiation) {
            e.needNegotiation = !1;
            var t = new Event("negotiationneeded");
            e._dispatchEvent("negotiationneeded", t);
          }
        }, 0));
      }, f.prototype._updateIceConnectionState = function () {
        var e, t = {
          new: 0,
          closed: 0,
          checking: 0,
          connected: 0,
          completed: 0,
          disconnected: 0,
          failed: 0
        };
        if ((this.transceivers.forEach(function (e) {
          e.iceTransport && !e.rejected && t[e.iceTransport.state]++;
        }), e = "new", t.failed > 0 ? e = "failed" : t.checking > 0 ? e = "checking" : t.disconnected > 0 ? e = "disconnected" : t.new > 0 ? e = "new" : t.connected > 0 ? e = "connected" : t.completed > 0 && (e = "completed"), e !== this.iceConnectionState)) {
          this.iceConnectionState = e;
          var r = new Event("iceconnectionstatechange");
          this._dispatchEvent("iceconnectionstatechange", r);
        }
      }, f.prototype._updateConnectionState = function () {
        var e, t = {
          new: 0,
          closed: 0,
          connecting: 0,
          connected: 0,
          completed: 0,
          disconnected: 0,
          failed: 0
        };
        if ((this.transceivers.forEach(function (e) {
          e.iceTransport && e.dtlsTransport && !e.rejected && (t[e.iceTransport.state]++, t[e.dtlsTransport.state]++);
        }), t.connected += t.completed, e = "new", t.failed > 0 ? e = "failed" : t.connecting > 0 ? e = "connecting" : t.disconnected > 0 ? e = "disconnected" : t.new > 0 ? e = "new" : t.connected > 0 && (e = "connected"), e !== this.connectionState)) {
          this.connectionState = e;
          var r = new Event("connectionstatechange");
          this._dispatchEvent("connectionstatechange", r);
        }
      }, f.prototype.createOffer = function () {
        var t = this;
        if (t._isClosed) return Promise.reject(o("InvalidStateError", "Can not call createOffer after close"));
        var n = t.transceivers.filter(function (e) {
          return "audio" === e.kind;
        }).length, a = t.transceivers.filter(function (e) {
          return "video" === e.kind;
        }).length, i = arguments[0];
        if (i) {
          if (i.mandatory || i.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
          (void 0 !== i.offerToReceiveAudio && (n = !0 === i.offerToReceiveAudio ? 1 : !1 === i.offerToReceiveAudio ? 0 : i.offerToReceiveAudio), void 0 !== i.offerToReceiveVideo && (a = !0 === i.offerToReceiveVideo ? 1 : !1 === i.offerToReceiveVideo ? 0 : i.offerToReceiveVideo));
        }
        for (t.transceivers.forEach(function (e) {
          "audio" === e.kind ? --n < 0 && (e.wantReceive = !1) : "video" === e.kind && --a < 0 && (e.wantReceive = !1);
        }); n > 0 || a > 0; ) (n > 0 && (t._createTransceiver("audio"), n--), a > 0 && (t._createTransceiver("video"), a--));
        var s = e.writeSessionBoilerplate(t._sdpSessionId, t._sdpSessionVersion++);
        (t.transceivers.forEach(function (r, n) {
          var a = r.track, i = r.kind, s = r.mid || e.generateIdentifier();
          (r.mid = s, r.iceGatherer || (r.iceGatherer = t._createIceGatherer(n, t.usingBundle)));
          var o = c.RTCRtpSender.getCapabilities(i);
          (d < 15019 && (o.codecs = o.codecs.filter(function (e) {
            return "rtx" !== e.name;
          })), o.codecs.forEach(function (e) {
            ("H264" === e.name && void 0 === e.parameters["level-asymmetry-allowed"] && (e.parameters["level-asymmetry-allowed"] = "1"), r.remoteCapabilities && r.remoteCapabilities.codecs && r.remoteCapabilities.codecs.forEach(function (t) {
              e.name.toLowerCase() === t.name.toLowerCase() && e.clockRate === t.clockRate && (e.preferredPayloadType = t.payloadType);
            }));
          }), o.headerExtensions.forEach(function (e) {
            (r.remoteCapabilities && r.remoteCapabilities.headerExtensions || []).forEach(function (t) {
              e.uri === t.uri && (e.id = t.id);
            });
          }));
          var p = r.sendEncodingParameters || [{
            ssrc: 1001 * (2 * n + 1)
          }];
          (a && d >= 15019 && "video" === i && !p[0].rtx && (p[0].rtx = {
            ssrc: p[0].ssrc + 1
          }), r.wantReceive && (r.rtpReceiver = new c.RTCRtpReceiver(r.dtlsTransport, i)), r.localCapabilities = o, r.sendEncodingParameters = p);
        }), "max-compat" !== t._config.bundlePolicy && (s += "a=group:BUNDLE " + t.transceivers.map(function (e) {
          return e.mid;
        }).join(" ") + "\r\n"), s += "a=ice-options:trickle\r\n", t.transceivers.forEach(function (n, a) {
          (s += r(n, n.localCapabilities, "offer", n.stream, t._dtlsRole), s += "a=rtcp-rsize\r\n", !n.iceGatherer || "new" === t.iceGatheringState || 0 !== a && t.usingBundle || (n.iceGatherer.getLocalCandidates().forEach(function (t) {
            (t.component = 1, s += "a=" + e.writeCandidate(t) + "\r\n");
          }), "completed" === n.iceGatherer.state && (s += "a=end-of-candidates\r\n")));
        }));
        var p = new c.RTCSessionDescription({
          type: "offer",
          sdp: s
        });
        return Promise.resolve(p);
      }, f.prototype.createAnswer = function () {
        var t = this;
        if (t._isClosed) return Promise.reject(o("InvalidStateError", "Can not call createAnswer after close"));
        if ("have-remote-offer" !== t.signalingState && "have-local-pranswer" !== t.signalingState) return Promise.reject(o("InvalidStateError", "Can not call createAnswer in signalingState " + t.signalingState));
        var n = e.writeSessionBoilerplate(t._sdpSessionId, t._sdpSessionVersion++);
        (t.usingBundle && (n += "a=group:BUNDLE " + t.transceivers.map(function (e) {
          return e.mid;
        }).join(" ") + "\r\n"), n += "a=ice-options:trickle\r\n");
        var i = e.getMediaSections(t._remoteDescription.sdp).length;
        t.transceivers.forEach(function (e, s) {
          if (!(s + 1 > i)) {
            if (e.rejected) return ("application" === e.kind ? "DTLS/SCTP" === e.protocol ? n += "m=application 0 DTLS/SCTP 5000\r\n" : n += "m=application 0 " + e.protocol + " webrtc-datachannel\r\n" : "audio" === e.kind ? n += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n" : "video" === e.kind && (n += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"), void (n += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + e.mid + "\r\n"));
            var o;
            if (e.stream) ("audio" === e.kind ? o = e.stream.getAudioTracks()[0] : "video" === e.kind && (o = e.stream.getVideoTracks()[0]), o && d >= 15019 && "video" === e.kind && !e.sendEncodingParameters[0].rtx && (e.sendEncodingParameters[0].rtx = {
              ssrc: e.sendEncodingParameters[0].ssrc + 1
            }));
            var c = a(e.localCapabilities, e.remoteCapabilities);
            (!c.codecs.filter(function (e) {
              return "rtx" === e.name.toLowerCase();
            }).length && e.sendEncodingParameters[0].rtx && delete e.sendEncodingParameters[0].rtx, n += r(e, c, "answer", e.stream, t._dtlsRole), e.rtcpParameters && e.rtcpParameters.reducedSize && (n += "a=rtcp-rsize\r\n"));
          }
        });
        var s = new c.RTCSessionDescription({
          type: "answer",
          sdp: n
        });
        return Promise.resolve(s);
      }, f.prototype.addIceCandidate = function (t) {
        var r, n = this;
        return t && void 0 === t.sdpMLineIndex && !t.sdpMid ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required")) : new Promise(function (a, i) {
          if (!n._remoteDescription) return i(o("InvalidStateError", "Can not add ICE candidate without a remote description"));
          if (t && "" !== t.candidate) {
            var c = t.sdpMLineIndex;
            if (t.sdpMid) for (var d = 0; d < n.transceivers.length; d++) if (n.transceivers[d].mid === t.sdpMid) {
              c = d;
              break;
            }
            var p = n.transceivers[c];
            if (!p) return i(o("OperationError", "Can not add ICE candidate"));
            if (p.rejected) return a();
            var l = Object.keys(t.candidate).length > 0 ? e.parseCandidate(t.candidate) : {};
            if ("tcp" === l.protocol && (0 === l.port || 9 === l.port)) return a();
            if (l.component && 1 !== l.component) return a();
            if ((0 === c || c > 0 && p.iceTransport !== n.transceivers[0].iceTransport) && !s(p.iceTransport, l)) return i(o("OperationError", "Can not add ICE candidate"));
            var f = t.candidate.trim();
            (0 === f.indexOf("a=") && (f = f.substr(2)), (r = e.getMediaSections(n._remoteDescription.sdp))[c] += "a=" + (l.type ? f : "end-of-candidates") + "\r\n", n._remoteDescription.sdp = e.getDescription(n._remoteDescription.sdp) + r.join(""));
          } else for (var u = 0; u < n.transceivers.length && (n.transceivers[u].rejected || (n.transceivers[u].iceTransport.addRemoteCandidate({}), (r = e.getMediaSections(n._remoteDescription.sdp))[u] += "a=end-of-candidates\r\n", n._remoteDescription.sdp = e.getDescription(n._remoteDescription.sdp) + r.join(""), !n.usingBundle)); u++) ;
          a();
        });
      }, f.prototype.getStats = function (e) {
        if (e && e instanceof c.MediaStreamTrack) {
          var t = null;
          if ((this.transceivers.forEach(function (r) {
            r.rtpSender && r.rtpSender.track === e ? t = r.rtpSender : r.rtpReceiver && r.rtpReceiver.track === e && (t = r.rtpReceiver);
          }), !t)) throw o("InvalidAccessError", "Invalid selector.");
          return t.getStats();
        }
        var r = [];
        return (this.transceivers.forEach(function (e) {
          ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function (t) {
            e[t] && r.push(e[t].getStats());
          });
        }), Promise.all(r).then(function (e) {
          var t = new Map();
          return (e.forEach(function (e) {
            e.forEach(function (e) {
              t.set(e.id, e);
            });
          }), t);
        }));
      });
      ["RTCRtpSender", "RTCRtpReceiver", "RTCIceGatherer", "RTCIceTransport", "RTCDtlsTransport"].forEach(function (e) {
        var r = c[e];
        if (r && r.prototype && r.prototype.getStats) {
          var n = r.prototype.getStats;
          r.prototype.getStats = function () {
            return n.apply(this).then(function (e) {
              var r = new Map();
              return (Object.keys(e).forEach(function (n) {
                (e[n].type = t(e[n]), r.set(n, e[n]));
              }), r);
            });
          };
        }
      });
      var u = ["createOffer", "createAnswer"];
      return (u.forEach(function (e) {
        var t = f.prototype[e];
        f.prototype[e] = function () {
          var e = arguments;
          return "function" == typeof e[0] || "function" == typeof e[1] ? t.apply(this, [arguments[2]]).then(function (t) {
            "function" == typeof e[0] && e[0].apply(null, [t]);
          }, function (t) {
            "function" == typeof e[1] && e[1].apply(null, [t]);
          }) : t.apply(this, arguments);
        };
      }), (u = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"]).forEach(function (e) {
        var t = f.prototype[e];
        f.prototype[e] = function () {
          var e = arguments;
          return "function" == typeof e[1] || "function" == typeof e[2] ? t.apply(this, arguments).then(function () {
            "function" == typeof e[1] && e[1].apply(null);
          }, function (t) {
            "function" == typeof e[2] && e[2].apply(null, [t]);
          }) : t.apply(this, arguments);
        };
      }), ["getStats"].forEach(function (e) {
        var t = f.prototype[e];
        f.prototype[e] = function () {
          var e = arguments;
          return "function" == typeof e[1] ? t.apply(this, arguments).then(function () {
            "function" == typeof e[1] && e[1].apply(null);
          }) : t.apply(this, arguments);
        };
      }), f);
    };
  }, {
    "sdp": "YHvh"
  }],
  "YdKx": [function (require, module, exports) {
    "use strict";
    function e(e) {
      var r = e && e.navigator, t = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
      r.mediaDevices.getUserMedia = function (e) {
        return t(e).catch(function (e) {
          return Promise.reject((function (e) {
            return {
              name: ({
                PermissionDeniedError: "NotAllowedError"
              })[e.name] || e.name,
              message: e.message,
              constraint: e.constraint,
              toString: function () {
                return this.name;
              }
            };
          })(e));
        });
      };
    }
    (Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.shimGetUserMedia = e);
  }, {}],
  "P3bV": [function (require, module, exports) {
    "use strict";
    function e(e) {
      ("getDisplayMedia" in e.navigator) && e.navigator.mediaDevices && (e.navigator.mediaDevices && ("getDisplayMedia" in e.navigator.mediaDevices) || (e.navigator.mediaDevices.getDisplayMedia = e.navigator.getDisplayMedia.bind(e.navigator)));
    }
    (Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.shimGetDisplayMedia = e);
  }, {}],
  "XRic": [function (require, module, exports) {
    "use strict";
    (Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.shimPeerConnection = a, exports.shimReplaceTrack = p, Object.defineProperty(exports, "shimGetUserMedia", {
      enumerable: !0,
      get: function () {
        return n.shimGetUserMedia;
      }
    }), Object.defineProperty(exports, "shimGetDisplayMedia", {
      enumerable: !0,
      get: function () {
        return i.shimGetDisplayMedia;
      }
    }));
    var e = s(require("../utils")), t = require("./filtericeservers"), r = o(require("rtcpeerconnection-shim")), n = require("./getusermedia"), i = require("./getdisplaymedia");
    function o(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }
    function c() {
      if ("function" != typeof WeakMap) return null;
      var e = new WeakMap();
      return (c = function () {
        return e;
      }, e);
    }
    function s(e) {
      if (e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
      };
      var t = c();
      if (t && t.has(e)) return t.get(e);
      var r = {}, n = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var i in e) if (Object.prototype.hasOwnProperty.call(e, i)) {
        var o = n ? Object.getOwnPropertyDescriptor(e, i) : null;
        o && (o.get || o.set) ? Object.defineProperty(r, i, o) : r[i] = e[i];
      }
      return (r.default = e, t && t.set(e, r), r);
    }
    function a(n) {
      var i = e.detectBrowser(n);
      if (n.RTCIceGatherer && (n.RTCIceCandidate || (n.RTCIceCandidate = function (e) {
        return e;
      }), n.RTCSessionDescription || (n.RTCSessionDescription = function (e) {
        return e;
      }), i.version < 15025)) {
        var o = Object.getOwnPropertyDescriptor(n.MediaStreamTrack.prototype, "enabled");
        Object.defineProperty(n.MediaStreamTrack.prototype, "enabled", {
          set: function (e) {
            o.set.call(this, e);
            var t = new Event("enabled");
            (t.enabled = e, this.dispatchEvent(t));
          }
        });
      }
      (!n.RTCRtpSender || ("dtmf" in n.RTCRtpSender.prototype) || Object.defineProperty(n.RTCRtpSender.prototype, "dtmf", {
        get: function () {
          return (void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = new n.RTCDtmfSender(this) : "video" === this.track.kind && (this._dtmf = null)), this._dtmf);
        }
      }), n.RTCDtmfSender && !n.RTCDTMFSender && (n.RTCDTMFSender = n.RTCDtmfSender));
      var c = (0, r.default)(n, i.version);
      (n.RTCPeerConnection = function (r) {
        return (r && r.iceServers && (r.iceServers = (0, t.filterIceServers)(r.iceServers, i.version), e.log("ICE servers after filtering:", r.iceServers)), new c(r));
      }, n.RTCPeerConnection.prototype = c.prototype);
    }
    function p(e) {
      !e.RTCRtpSender || ("replaceTrack" in e.RTCRtpSender.prototype) || (e.RTCRtpSender.prototype.replaceTrack = e.RTCRtpSender.prototype.setTrack);
    }
  }, {
    "../utils": "iSxC",
    "./filtericeservers": "NZ1C",
    "rtcpeerconnection-shim": "NJ2u",
    "./getusermedia": "YdKx",
    "./getdisplaymedia": "P3bV"
  }],
  "GzSv": [function (require, module, exports) {
    "use strict";
    (Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.shimGetUserMedia = n);
    var e = o(require("../utils"));
    function t() {
      if ("function" != typeof WeakMap) return null;
      var e = new WeakMap();
      return (t = function () {
        return e;
      }, e);
    }
    function o(e) {
      if (e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
      };
      var o = t();
      if (o && o.has(e)) return o.get(e);
      var r = {}, n = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var i in e) if (Object.prototype.hasOwnProperty.call(e, i)) {
        var a = n ? Object.getOwnPropertyDescriptor(e, i) : null;
        a && (a.get || a.set) ? Object.defineProperty(r, i, a) : r[i] = e[i];
      }
      return (r.default = e, o && o.set(e, r), r);
    }
    function r(e) {
      return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }
    function n(t) {
      var o = e.detectBrowser(t), n = t && t.navigator, i = t && t.MediaStreamTrack;
      if ((n.getUserMedia = function (t, o, r) {
        (e.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), n.mediaDevices.getUserMedia(t).then(o, r));
      }, !(o.version > 55 && ("autoGainControl" in n.mediaDevices.getSupportedConstraints())))) {
        var a = function (e, t, o) {
          (t in e) && !((o in e)) && (e[o] = e[t], delete e[t]);
        }, s = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
        if ((n.mediaDevices.getUserMedia = function (e) {
          return ("object" === r(e) && "object" === r(e.audio) && (e = JSON.parse(JSON.stringify(e)), a(e.audio, "autoGainControl", "mozAutoGainControl"), a(e.audio, "noiseSuppression", "mozNoiseSuppression")), s(e));
        }, i && i.prototype.getSettings)) {
          var p = i.prototype.getSettings;
          i.prototype.getSettings = function () {
            var e = p.apply(this, arguments);
            return (a(e, "mozAutoGainControl", "autoGainControl"), a(e, "mozNoiseSuppression", "noiseSuppression"), e);
          };
        }
        if (i && i.prototype.applyConstraints) {
          var u = i.prototype.applyConstraints;
          i.prototype.applyConstraints = function (e) {
            return ("audio" === this.kind && "object" === r(e) && (e = JSON.parse(JSON.stringify(e)), a(e, "autoGainControl", "mozAutoGainControl"), a(e, "noiseSuppression", "mozNoiseSuppression")), u.apply(this, [e]));
          };
        }
      }
    }
  }, {
    "../utils": "iSxC"
  }],
  "UuGU": [function (require, module, exports) {
    "use strict";
    function e(e, i) {
      e.navigator.mediaDevices && ("getDisplayMedia" in e.navigator.mediaDevices) || e.navigator.mediaDevices && (e.navigator.mediaDevices.getDisplayMedia = function (a) {
        if (!a || !a.video) {
          var t = new DOMException("getDisplayMedia without video constraints is undefined");
          return (t.name = "NotFoundError", t.code = 8, Promise.reject(t));
        }
        return (!0 === a.video ? a.video = {
          mediaSource: i
        } : a.video.mediaSource = i, e.navigator.mediaDevices.getUserMedia(a));
      });
    }
    (Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.shimGetDisplayMedia = e);
  }, {}],
  "Fzdr": [function (require, module, exports) {
    "use strict";
    (Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.shimOnTrack = c, exports.shimPeerConnection = s, exports.shimSenderGetStats = p, exports.shimReceiverGetStats = u, exports.shimRemoveStream = f, exports.shimRTCDataChannel = C, exports.shimAddTransceiver = d, exports.shimCreateOffer = y, exports.shimCreateAnswer = l, Object.defineProperty(exports, "shimGetUserMedia", {
      enumerable: !0,
      get: function () {
        return t.shimGetUserMedia;
      }
    }), Object.defineProperty(exports, "shimGetDisplayMedia", {
      enumerable: !0,
      get: function () {
        return r.shimGetDisplayMedia;
      }
    }));
    var e = o(require("../utils")), t = require("./getusermedia"), r = require("./getdisplaymedia");
    function n() {
      if ("function" != typeof WeakMap) return null;
      var e = new WeakMap();
      return (n = function () {
        return e;
      }, e);
    }
    function o(e) {
      if (e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
      };
      var t = n();
      if (t && t.has(e)) return t.get(e);
      var r = {}, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var i in e) if (Object.prototype.hasOwnProperty.call(e, i)) {
        var a = o ? Object.getOwnPropertyDescriptor(e, i) : null;
        a && (a.get || a.set) ? Object.defineProperty(r, i, a) : r[i] = e[i];
      }
      return (r.default = e, t && t.set(e, r), r);
    }
    function i(e, t, r) {
      return ((t in e) ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = r, e);
    }
    function a(e) {
      return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }
    function c(e) {
      "object" === a(e) && e.RTCTrackEvent && ("receiver" in e.RTCTrackEvent.prototype) && !(("transceiver" in e.RTCTrackEvent.prototype)) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
        get: function () {
          return {
            receiver: this.receiver
          };
        }
      });
    }
    function s(t) {
      var r = e.detectBrowser(t);
      if ("object" === a(t) && (t.RTCPeerConnection || t.mozRTCPeerConnection)) {
        if ((!t.RTCPeerConnection && t.mozRTCPeerConnection && (t.RTCPeerConnection = t.mozRTCPeerConnection), r.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function (e) {
          var r = t.RTCPeerConnection.prototype[e], n = i({}, e, function () {
            return (arguments[0] = new ("addIceCandidate" === e ? t.RTCIceCandidate : t.RTCSessionDescription)(arguments[0]), r.apply(this, arguments));
          });
          t.RTCPeerConnection.prototype[e] = n[e];
        }), r.version < 68)) {
          var n = t.RTCPeerConnection.prototype.addIceCandidate;
          t.RTCPeerConnection.prototype.addIceCandidate = function () {
            return arguments[0] ? arguments[0] && "" === arguments[0].candidate ? Promise.resolve() : n.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
          };
        }
        var o = {
          inboundrtp: "inbound-rtp",
          outboundrtp: "outbound-rtp",
          candidatepair: "candidate-pair",
          localcandidate: "local-candidate",
          remotecandidate: "remote-candidate"
        }, c = t.RTCPeerConnection.prototype.getStats;
        t.RTCPeerConnection.prototype.getStats = function () {
          var [e, t, n] = arguments;
          return c.apply(this, [e || null]).then(function (e) {
            if (r.version < 53 && !t) try {
              e.forEach(function (e) {
                e.type = o[e.type] || e.type;
              });
            } catch (n) {
              if ("TypeError" !== n.name) throw n;
              e.forEach(function (t, r) {
                e.set(r, Object.assign({}, t, {
                  type: o[t.type] || t.type
                }));
              });
            }
            return e;
          }).then(t, n);
        };
      }
    }
    function p(e) {
      if ("object" === a(e) && e.RTCPeerConnection && e.RTCRtpSender && !(e.RTCRtpSender && ("getStats" in e.RTCRtpSender.prototype))) {
        var t = e.RTCPeerConnection.prototype.getSenders;
        t && (e.RTCPeerConnection.prototype.getSenders = function () {
          var e = this, r = t.apply(this, []);
          return (r.forEach(function (t) {
            return t._pc = e;
          }), r);
        });
        var r = e.RTCPeerConnection.prototype.addTrack;
        (r && (e.RTCPeerConnection.prototype.addTrack = function () {
          var e = r.apply(this, arguments);
          return (e._pc = this, e);
        }), e.RTCRtpSender.prototype.getStats = function () {
          return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
        });
      }
    }
    function u(t) {
      if ("object" === a(t) && t.RTCPeerConnection && t.RTCRtpSender && !(t.RTCRtpSender && ("getStats" in t.RTCRtpReceiver.prototype))) {
        var r = t.RTCPeerConnection.prototype.getReceivers;
        (r && (t.RTCPeerConnection.prototype.getReceivers = function () {
          var e = this, t = r.apply(this, []);
          return (t.forEach(function (t) {
            return t._pc = e;
          }), t);
        }), e.wrapPeerConnectionEvent(t, "track", function (e) {
          return (e.receiver._pc = e.srcElement, e);
        }), t.RTCRtpReceiver.prototype.getStats = function () {
          return this._pc.getStats(this.track);
        });
      }
    }
    function f(t) {
      !t.RTCPeerConnection || ("removeStream" in t.RTCPeerConnection.prototype) || (t.RTCPeerConnection.prototype.removeStream = function (t) {
        var r = this;
        (e.deprecated("removeStream", "removeTrack"), this.getSenders().forEach(function (e) {
          e.track && t.getTracks().includes(e.track) && r.removeTrack(e);
        }));
      });
    }
    function C(e) {
      e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel);
    }
    function d(e) {
      if ("object" === a(e) && e.RTCPeerConnection) {
        var t = e.RTCPeerConnection.prototype.addTransceiver;
        t && (e.RTCPeerConnection.prototype.addTransceiver = function () {
          this.setParametersPromises = [];
          var e = arguments[1], r = e && ("sendEncodings" in e);
          r && e.sendEncodings.forEach(function (e) {
            if (("rid" in e)) {
              if (!(/^[a-z0-9]{0,16}$/i).test(e.rid)) throw new TypeError("Invalid RID value provided.");
            }
            if (("scaleResolutionDownBy" in e) && !(parseFloat(e.scaleResolutionDownBy) >= 1)) throw new RangeError("scale_resolution_down_by must be >= 1.0");
            if (("maxFramerate" in e) && !(parseFloat(e.maxFramerate) >= 0)) throw new RangeError("max_framerate must be >= 0.0");
          });
          var n = t.apply(this, arguments);
          if (r) {
            var {sender: o} = n, i = o.getParameters();
            ("encodings" in i) || (i.encodings = e.sendEncodings, this.setParametersPromises.push(o.setParameters(i).catch(function () {})));
          }
          return n;
        });
      }
    }
    function y(e) {
      if ("object" === a(e) && e.RTCPeerConnection) {
        var t = e.RTCPeerConnection.prototype.createOffer;
        e.RTCPeerConnection.prototype.createOffer = function () {
          var e = arguments, r = this;
          return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(function () {
            return t.apply(r, e);
          }).finally(function () {
            r.setParametersPromises = [];
          }) : t.apply(this, arguments);
        };
      }
    }
    function l(e) {
      if ("object" === a(e) && e.RTCPeerConnection) {
        var t = e.RTCPeerConnection.prototype.createAnswer;
        e.RTCPeerConnection.prototype.createAnswer = function () {
          var e = arguments, r = this;
          return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(function () {
            return t.apply(r, e);
          }).finally(function () {
            r.setParametersPromises = [];
          }) : t.apply(this, arguments);
        };
      }
    }
  }, {
    "../utils": "iSxC",
    "./getusermedia": "GzSv",
    "./getdisplaymedia": "UuGU"
  }],
  "t1lL": [function (require, module, exports) {
    "use strict";
    (Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.shimLocalStreamsAPI = n, exports.shimRemoteStreamsAPI = i, exports.shimCallbacksAPI = a, exports.shimGetUserMedia = s, exports.shimConstraints = c, exports.shimRTCIceServerUrls = d, exports.shimTrackEventTransceiver = f, exports.shimCreateOfferLegacy = p);
    var e = r(require("../utils"));
    function t() {
      if ("function" != typeof WeakMap) return null;
      var e = new WeakMap();
      return (t = function () {
        return e;
      }, e);
    }
    function r(e) {
      if (e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
      };
      var r = t();
      if (r && r.has(e)) return r.get(e);
      var o = {}, n = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var i in e) if (Object.prototype.hasOwnProperty.call(e, i)) {
        var a = n ? Object.getOwnPropertyDescriptor(e, i) : null;
        a && (a.get || a.set) ? Object.defineProperty(o, i, a) : o[i] = e[i];
      }
      return (o.default = e, r && r.set(e, o), o);
    }
    function o(e) {
      return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }
    function n(e) {
      if ("object" === o(e) && e.RTCPeerConnection) {
        if ((("getLocalStreams" in e.RTCPeerConnection.prototype) || (e.RTCPeerConnection.prototype.getLocalStreams = function () {
          return (this._localStreams || (this._localStreams = []), this._localStreams);
        }), !(("addStream" in e.RTCPeerConnection.prototype)))) {
          var t = e.RTCPeerConnection.prototype.addTrack;
          (e.RTCPeerConnection.prototype.addStream = function (e) {
            var r = this;
            (this._localStreams || (this._localStreams = []), this._localStreams.includes(e) || this._localStreams.push(e), e.getAudioTracks().forEach(function (o) {
              return t.call(r, o, e);
            }), e.getVideoTracks().forEach(function (o) {
              return t.call(r, o, e);
            }));
          }, e.RTCPeerConnection.prototype.addTrack = function (e) {
            var r = arguments[1];
            return (r && (this._localStreams ? this._localStreams.includes(r) || this._localStreams.push(r) : this._localStreams = [r]), t.apply(this, arguments));
          });
        }
        ("removeStream" in e.RTCPeerConnection.prototype) || (e.RTCPeerConnection.prototype.removeStream = function (e) {
          var t = this;
          this._localStreams || (this._localStreams = []);
          var r = this._localStreams.indexOf(e);
          if (-1 !== r) {
            this._localStreams.splice(r, 1);
            var o = e.getTracks();
            this.getSenders().forEach(function (e) {
              o.includes(e.track) && t.removeTrack(e);
            });
          }
        });
      }
    }
    function i(e) {
      if ("object" === o(e) && e.RTCPeerConnection && (("getRemoteStreams" in e.RTCPeerConnection.prototype) || (e.RTCPeerConnection.prototype.getRemoteStreams = function () {
        return this._remoteStreams ? this._remoteStreams : [];
      }), !(("onaddstream" in e.RTCPeerConnection.prototype)))) {
        Object.defineProperty(e.RTCPeerConnection.prototype, "onaddstream", {
          get: function () {
            return this._onaddstream;
          },
          set: function (e) {
            var t = this;
            (this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = e), this.addEventListener("track", this._onaddstreampoly = function (e) {
              e.streams.forEach(function (e) {
                if ((t._remoteStreams || (t._remoteStreams = []), !t._remoteStreams.includes(e))) {
                  t._remoteStreams.push(e);
                  var r = new Event("addstream");
                  (r.stream = e, t.dispatchEvent(r));
                }
              });
            }));
          }
        });
        var t = e.RTCPeerConnection.prototype.setRemoteDescription;
        e.RTCPeerConnection.prototype.setRemoteDescription = function () {
          var e = this;
          return (this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function (t) {
            t.streams.forEach(function (t) {
              if ((e._remoteStreams || (e._remoteStreams = []), !(e._remoteStreams.indexOf(t) >= 0))) {
                e._remoteStreams.push(t);
                var r = new Event("addstream");
                (r.stream = t, e.dispatchEvent(r));
              }
            });
          }), t.apply(e, arguments));
        };
      }
    }
    function a(e) {
      if ("object" === o(e) && e.RTCPeerConnection) {
        var t = e.RTCPeerConnection.prototype, r = t.createOffer, n = t.createAnswer, i = t.setLocalDescription, a = t.setRemoteDescription, s = t.addIceCandidate;
        (t.createOffer = function (e, t) {
          var o = arguments.length >= 2 ? arguments[2] : arguments[0], n = r.apply(this, [o]);
          return t ? (n.then(e, t), Promise.resolve()) : n;
        }, t.createAnswer = function (e, t) {
          var r = arguments.length >= 2 ? arguments[2] : arguments[0], o = n.apply(this, [r]);
          return t ? (o.then(e, t), Promise.resolve()) : o;
        });
        var c = function (e, t, r) {
          var o = i.apply(this, [e]);
          return r ? (o.then(t, r), Promise.resolve()) : o;
        };
        (t.setLocalDescription = c, c = function (e, t, r) {
          var o = a.apply(this, [e]);
          return r ? (o.then(t, r), Promise.resolve()) : o;
        }, t.setRemoteDescription = c, c = function (e, t, r) {
          var o = s.apply(this, [e]);
          return r ? (o.then(t, r), Promise.resolve()) : o;
        }, t.addIceCandidate = c);
      }
    }
    function s(e) {
      var t = e && e.navigator;
      if (t.mediaDevices && t.mediaDevices.getUserMedia) {
        var r = t.mediaDevices, o = r.getUserMedia.bind(r);
        t.mediaDevices.getUserMedia = function (e) {
          return o(c(e));
        };
      }
      !t.getUserMedia && t.mediaDevices && t.mediaDevices.getUserMedia && (t.getUserMedia = (function (e, r, o) {
        t.mediaDevices.getUserMedia(e).then(r, o);
      }).bind(t));
    }
    function c(t) {
      return t && void 0 !== t.video ? Object.assign({}, t, {
        video: e.compactObject(t.video)
      }) : t;
    }
    function d(t) {
      var r = t.RTCPeerConnection;
      (t.RTCPeerConnection = function (t, o) {
        if (t && t.iceServers) {
          for (var n = [], i = 0; i < t.iceServers.length; i++) {
            var a = t.iceServers[i];
            !a.hasOwnProperty("urls") && a.hasOwnProperty("url") ? (e.deprecated("RTCIceServer.url", "RTCIceServer.urls"), (a = JSON.parse(JSON.stringify(a))).urls = a.url, delete a.url, n.push(a)) : n.push(t.iceServers[i]);
          }
          t.iceServers = n;
        }
        return new r(t, o);
      }, t.RTCPeerConnection.prototype = r.prototype, ("generateCertificate" in t.RTCPeerConnection) && Object.defineProperty(t.RTCPeerConnection, "generateCertificate", {
        get: function () {
          return r.generateCertificate;
        }
      }));
    }
    function f(e) {
      "object" === o(e) && e.RTCTrackEvent && ("receiver" in e.RTCTrackEvent.prototype) && !(("transceiver" in e.RTCTrackEvent.prototype)) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
        get: function () {
          return {
            receiver: this.receiver
          };
        }
      });
    }
    function p(e) {
      var t = e.RTCPeerConnection.prototype.createOffer;
      e.RTCPeerConnection.prototype.createOffer = function (e) {
        if (e) {
          void 0 !== e.offerToReceiveAudio && (e.offerToReceiveAudio = !!e.offerToReceiveAudio);
          var r = this.getTransceivers().find(function (e) {
            return "audio" === e.receiver.track.kind;
          });
          (!1 === e.offerToReceiveAudio && r ? "sendrecv" === r.direction ? r.setDirection ? r.setDirection("sendonly") : r.direction = "sendonly" : "recvonly" === r.direction && (r.setDirection ? r.setDirection("inactive") : r.direction = "inactive") : !0 !== e.offerToReceiveAudio || r || this.addTransceiver("audio"), void 0 !== e.offerToReceiveVideo && (e.offerToReceiveVideo = !!e.offerToReceiveVideo));
          var o = this.getTransceivers().find(function (e) {
            return "video" === e.receiver.track.kind;
          });
          !1 === e.offerToReceiveVideo && o ? "sendrecv" === o.direction ? o.setDirection ? o.setDirection("sendonly") : o.direction = "sendonly" : "recvonly" === o.direction && (o.setDirection ? o.setDirection("inactive") : o.direction = "inactive") : !0 !== e.offerToReceiveVideo || o || this.addTransceiver("video");
        }
        return t.apply(this, arguments);
      };
    }
  }, {
    "../utils": "iSxC"
  }],
  "GOQK": [function (require, module, exports) {
    "use strict";
    (Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.shimRTCIceCandidate = a, exports.shimMaxMessageSize = c, exports.shimSendThrowTypeError = s, exports.shimConnectionState = p, exports.removeAllowExtmapMixed = u);
    var e = r(require("sdp")), t = o(require("./utils"));
    function n() {
      if ("function" != typeof WeakMap) return null;
      var e = new WeakMap();
      return (n = function () {
        return e;
      }, e);
    }
    function o(e) {
      if (e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
      };
      var t = n();
      if (t && t.has(e)) return t.get(e);
      var o = {}, r = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var i in e) if (Object.prototype.hasOwnProperty.call(e, i)) {
        var a = r ? Object.getOwnPropertyDescriptor(e, i) : null;
        a && (a.get || a.set) ? Object.defineProperty(o, i, a) : o[i] = e[i];
      }
      return (o.default = e, t && t.set(e, o), o);
    }
    function r(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }
    function i(e) {
      return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e;
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      })(e);
    }
    function a(n) {
      if (n.RTCIceCandidate && !(n.RTCIceCandidate && ("foundation" in n.RTCIceCandidate.prototype))) {
        var o = n.RTCIceCandidate;
        (n.RTCIceCandidate = function (t) {
          if (("object" === i(t) && t.candidate && 0 === t.candidate.indexOf("a=") && ((t = JSON.parse(JSON.stringify(t))).candidate = t.candidate.substr(2)), t.candidate && t.candidate.length)) {
            var n = new o(t), r = e.default.parseCandidate(t.candidate), a = Object.assign(n, r);
            return (a.toJSON = function () {
              return {
                candidate: a.candidate,
                sdpMid: a.sdpMid,
                sdpMLineIndex: a.sdpMLineIndex,
                usernameFragment: a.usernameFragment
              };
            }, a);
          }
          return new o(t);
        }, n.RTCIceCandidate.prototype = o.prototype, t.wrapPeerConnectionEvent(n, "icecandidate", function (e) {
          return (e.candidate && Object.defineProperty(e, "candidate", {
            value: new n.RTCIceCandidate(e.candidate),
            writable: "false"
          }), e);
        }));
      }
    }
    function c(n) {
      if (n.RTCPeerConnection) {
        var o = t.detectBrowser(n);
        ("sctp" in n.RTCPeerConnection.prototype) || Object.defineProperty(n.RTCPeerConnection.prototype, "sctp", {
          get: function () {
            return void 0 === this._sctp ? null : this._sctp;
          }
        });
        var r = n.RTCPeerConnection.prototype.setRemoteDescription;
        n.RTCPeerConnection.prototype.setRemoteDescription = function () {
          if ((this._sctp = null, "chrome" === o.browser && o.version >= 76)) {
            var {sdpSemantics: t} = this.getConfiguration();
            "plan-b" === t && Object.defineProperty(this, "sctp", {
              get: function () {
                return void 0 === this._sctp ? null : this._sctp;
              },
              enumerable: !0,
              configurable: !0
            });
          }
          if ((function (t) {
            if (!t || !t.sdp) return !1;
            var n = e.default.splitSections(t.sdp);
            return (n.shift(), n.some(function (t) {
              var n = e.default.parseMLine(t);
              return n && "application" === n.kind && -1 !== n.protocol.indexOf("SCTP");
            }));
          })(arguments[0])) {
            var n, i = (function (e) {
              var t = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
              if (null === t || t.length < 2) return -1;
              var n = parseInt(t[1], 10);
              return n != n ? -1 : n;
            })(arguments[0]), a = (p = i, u = 65536, "firefox" === o.browser && (u = o.version < 57 ? -1 === p ? 16384 : 2147483637 : o.version < 60 ? 57 === o.version ? 65535 : 65536 : 2147483637), u), c = (function (t, n) {
              var r = 65536;
              "firefox" === o.browser && 57 === o.version && (r = 65535);
              var i = e.default.matchPrefix(t.sdp, "a=max-message-size:");
              return (i.length > 0 ? r = parseInt(i[0].substr(19), 10) : "firefox" === o.browser && -1 !== n && (r = 2147483637), r);
            })(arguments[0], i);
            n = 0 === a && 0 === c ? Number.POSITIVE_INFINITY : 0 === a || 0 === c ? Math.max(a, c) : Math.min(a, c);
            var s = {};
            (Object.defineProperty(s, "maxMessageSize", {
              get: function () {
                return n;
              }
            }), this._sctp = s);
          }
          var p, u;
          return r.apply(this, arguments);
        };
      }
    }
    function s(e) {
      if (e.RTCPeerConnection && ("createDataChannel" in e.RTCPeerConnection.prototype)) {
        var n = e.RTCPeerConnection.prototype.createDataChannel;
        (e.RTCPeerConnection.prototype.createDataChannel = function () {
          var e = n.apply(this, arguments);
          return (o(e, this), e);
        }, t.wrapPeerConnectionEvent(e, "datachannel", function (e) {
          return (o(e.channel, e.target), e);
        }));
      }
      function o(e, t) {
        var n = e.send;
        e.send = function () {
          var o = arguments[0], r = o.length || o.size || o.byteLength;
          if ("open" === e.readyState && t.sctp && r > t.sctp.maxMessageSize) throw new TypeError("Message too large (can send a maximum of " + t.sctp.maxMessageSize + " bytes)");
          return n.apply(e, arguments);
        };
      }
    }
    function p(e) {
      if (e.RTCPeerConnection && !(("connectionState" in e.RTCPeerConnection.prototype))) {
        var t = e.RTCPeerConnection.prototype;
        (Object.defineProperty(t, "connectionState", {
          get: function () {
            return ({
              completed: "connected",
              checking: "connecting"
            })[this.iceConnectionState] || this.iceConnectionState;
          },
          enumerable: !0,
          configurable: !0
        }), Object.defineProperty(t, "onconnectionstatechange", {
          get: function () {
            return this._onconnectionstatechange || null;
          },
          set: function (e) {
            (this._onconnectionstatechange && (this.removeEventListener("connectionstatechange", this._onconnectionstatechange), delete this._onconnectionstatechange), e && this.addEventListener("connectionstatechange", this._onconnectionstatechange = e));
          },
          enumerable: !0,
          configurable: !0
        }), ["setLocalDescription", "setRemoteDescription"].forEach(function (e) {
          var n = t[e];
          t[e] = function () {
            return (this._connectionstatechangepoly || (this._connectionstatechangepoly = function (e) {
              var t = e.target;
              if (t._lastConnectionState !== t.connectionState) {
                t._lastConnectionState = t.connectionState;
                var n = new Event("connectionstatechange", e);
                t.dispatchEvent(n);
              }
              return e;
            }, this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly)), n.apply(this, arguments));
          };
        }));
      }
    }
    function u(e) {
      if (e.RTCPeerConnection) {
        var n = t.detectBrowser(e);
        if (!("chrome" === n.browser && n.version >= 71)) {
          var o = e.RTCPeerConnection.prototype.setRemoteDescription;
          e.RTCPeerConnection.prototype.setRemoteDescription = function (e) {
            return (e && e.sdp && -1 !== e.sdp.indexOf("\na=extmap-allow-mixed") && (e.sdp = e.sdp.split("\n").filter(function (e) {
              return "a=extmap-allow-mixed" !== e.trim();
            }).join("\n")), o.apply(this, arguments));
          };
        }
      }
    }
  }, {
    "sdp": "YHvh",
    "./utils": "iSxC"
  }],
  "KtlG": [function (require, module, exports) {
    "use strict";
    (Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.adapterFactory = m);
    var e = o(require("./utils")), r = o(require("./chrome/chrome_shim")), i = o(require("./edge/edge_shim")), s = o(require("./firefox/firefox_shim")), t = o(require("./safari/safari_shim")), a = o(require("./common_shim"));
    function n() {
      if ("function" != typeof WeakMap) return null;
      var e = new WeakMap();
      return (n = function () {
        return e;
      }, e);
    }
    function o(e) {
      if (e && e.__esModule) return e;
      if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
      };
      var r = n();
      if (r && r.has(e)) return r.get(e);
      var i = {}, s = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var t in e) if (Object.prototype.hasOwnProperty.call(e, t)) {
        var a = s ? Object.getOwnPropertyDescriptor(e, t) : null;
        a && (a.get || a.set) ? Object.defineProperty(i, t, a) : i[t] = e[t];
      }
      return (i.default = e, r && r.set(e, i), i);
    }
    function m() {
      var {window: n} = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
        shimChrome: !0,
        shimFirefox: !0,
        shimEdge: !0,
        shimSafari: !0
      }, m = e.log, h = e.detectBrowser(n), d = {
        browserDetails: h,
        commonShim: a,
        extractVersion: e.extractVersion,
        disableLog: e.disableLog,
        disableWarnings: e.disableWarnings
      };
      switch (h.browser) {
        case "chrome":
          if (!r || !r.shimPeerConnection || !o.shimChrome) return (m("Chrome shim is not included in this adapter release."), d);
          (m("adapter.js shimming chrome."), d.browserShim = r, r.shimGetUserMedia(n), r.shimMediaStream(n), r.shimPeerConnection(n), r.shimOnTrack(n), r.shimAddTrackRemoveTrack(n), r.shimGetSendersWithDtmf(n), r.shimGetStats(n), r.shimSenderReceiverGetStats(n), r.fixNegotiationNeeded(n), a.shimRTCIceCandidate(n), a.shimConnectionState(n), a.shimMaxMessageSize(n), a.shimSendThrowTypeError(n), a.removeAllowExtmapMixed(n));
          break;
        case "firefox":
          if (!s || !s.shimPeerConnection || !o.shimFirefox) return (m("Firefox shim is not included in this adapter release."), d);
          (m("adapter.js shimming firefox."), d.browserShim = s, s.shimGetUserMedia(n), s.shimPeerConnection(n), s.shimOnTrack(n), s.shimRemoveStream(n), s.shimSenderGetStats(n), s.shimReceiverGetStats(n), s.shimRTCDataChannel(n), s.shimAddTransceiver(n), s.shimCreateOffer(n), s.shimCreateAnswer(n), a.shimRTCIceCandidate(n), a.shimConnectionState(n), a.shimMaxMessageSize(n), a.shimSendThrowTypeError(n));
          break;
        case "edge":
          if (!i || !i.shimPeerConnection || !o.shimEdge) return (m("MS edge shim is not included in this adapter release."), d);
          (m("adapter.js shimming edge."), d.browserShim = i, i.shimGetUserMedia(n), i.shimGetDisplayMedia(n), i.shimPeerConnection(n), i.shimReplaceTrack(n), a.shimMaxMessageSize(n), a.shimSendThrowTypeError(n));
          break;
        case "safari":
          if (!t || !o.shimSafari) return (m("Safari shim is not included in this adapter release."), d);
          (m("adapter.js shimming safari."), d.browserShim = t, t.shimRTCIceServerUrls(n), t.shimCreateOfferLegacy(n), t.shimCallbacksAPI(n), t.shimLocalStreamsAPI(n), t.shimRemoteStreamsAPI(n), t.shimTrackEventTransceiver(n), t.shimGetUserMedia(n), a.shimRTCIceCandidate(n), a.shimMaxMessageSize(n), a.shimSendThrowTypeError(n), a.removeAllowExtmapMixed(n));
          break;
        default:
          m("Unsupported browser!");
      }
      return d;
    }
  }, {
    "./utils": "iSxC",
    "./chrome/chrome_shim": "uI5X",
    "./edge/edge_shim": "XRic",
    "./firefox/firefox_shim": "Fzdr",
    "./safari/safari_shim": "t1lL",
    "./common_shim": "GOQK"
  }],
  "tI1X": [function (require, module, exports) {
    "use strict";
    (Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0);
    var e = require("./adapter_factory.js"), r = (0, e.adapterFactory)({
      window: window
    }), t = r;
    exports.default = t;
  }, {
    "./adapter_factory.js": "KtlG"
  }],
  "sXtV": [function (require, module, exports) {
    "use strict";
    var e = this && this.__importDefault || (function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    });
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var t = e(require("webrtc-adapter"));
    exports.webRTCAdapter = t.default;
  }, {
    "webrtc-adapter": "tI1X"
  }],
  "I31f": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var r = require("./adapter");
    exports.Supports = new ((function () {
      function e() {
        (this.isIOS = ["iPad", "iPhone", "iPod"].includes(navigator.platform), this.supportedBrowsers = ["firefox", "chrome", "safari"], this.minFirefoxVersion = 59, this.minChromeVersion = 72, this.minSafariVersion = 605);
      }
      return (e.prototype.isWebRTCSupported = function () {
        return "undefined" != typeof RTCPeerConnection;
      }, e.prototype.isBrowserSupported = function () {
        var r = this.getBrowser(), e = this.getVersion();
        return !!this.supportedBrowsers.includes(r) && ("chrome" === r ? e >= this.minChromeVersion : "firefox" === r ? e >= this.minFirefoxVersion : "safari" === r && (!this.isIOS && e >= this.minSafariVersion));
      }, e.prototype.getBrowser = function () {
        return r.webRTCAdapter.browserDetails.browser;
      }, e.prototype.getVersion = function () {
        return r.webRTCAdapter.browserDetails.version || 0;
      }, e.prototype.isUnifiedPlanSupported = function () {
        var e, i = this.getBrowser(), t = r.webRTCAdapter.browserDetails.version || 0;
        if ("chrome" === i && t < 72) return !1;
        if ("firefox" === i && t >= 59) return !0;
        if (!(window.RTCRtpTransceiver && ("currentDirection" in RTCRtpTransceiver.prototype))) return !1;
        var o = !1;
        try {
          ((e = new RTCPeerConnection()).addTransceiver("audio"), o = !0);
        } catch (n) {} finally {
          e && e.close();
        }
        return o;
      }, e.prototype.toString = function () {
        return "Supports: \n    browser:" + this.getBrowser() + " \n    version:" + this.getVersion() + " \n    isIOS:" + this.isIOS + " \n    isWebRTCSupported:" + this.isWebRTCSupported() + " \n    isBrowserSupported:" + this.isBrowserSupported() + " \n    isUnifiedPlanSupported:" + this.isUnifiedPlanSupported();
      }, e);
    })())();
  }, {
    "./adapter": "sXtV"
  }],
  "BHXf": [function (require, module, exports) {
    "use strict";
    var r = this && this.__importStar || (function (r) {
      if (r && r.__esModule) return r;
      var t = {};
      if (null != r) for (var e in r) Object.hasOwnProperty.call(r, e) && (t[e] = r[e]);
      return (t.default = r, t);
    });
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var t = r(require("peerjs-js-binarypack")), e = require("./supports"), o = {
      iceServers: [{
        urls: "stun:stun.l.google.com:19302"
      }, {
        urls: "turn:0.peerjs.com:3478",
        username: "peerjs",
        credential: "peerjsp"
      }],
      sdpSemantics: "unified-plan"
    };
    exports.util = new ((function () {
      function r() {
        (this.CLOUD_HOST = "0.peerjs.com", this.CLOUD_PORT = 443, this.chunkedBrowsers = {
          Chrome: 1,
          chrome: 1
        }, this.chunkedMTU = 16300, this.defaultConfig = o, this.browser = e.Supports.getBrowser(), this.browserVersion = e.Supports.getVersion(), this.supports = (function () {
          var r, t = {
            browser: e.Supports.isBrowserSupported(),
            webRTC: e.Supports.isWebRTCSupported(),
            audioVideo: !1,
            data: !1,
            binaryBlob: !1,
            reliable: !1
          };
          if (!t.webRTC) return t;
          try {
            (r = new RTCPeerConnection(o), t.audioVideo = !0);
            var n = void 0;
            try {
              (n = r.createDataChannel("_PEERJSTEST", {
                ordered: !0
              }), t.data = !0, t.reliable = !!n.ordered);
              try {
                (n.binaryType = "blob", t.binaryBlob = !e.Supports.isIOS);
              } catch (a) {}
            } catch (a) {} finally {
              n && n.close();
            }
          } catch (a) {} finally {
            r && r.close();
          }
          return t;
        })(), this.pack = t.pack, this.unpack = t.unpack, this._dataCount = 1);
      }
      return (r.prototype.noop = function () {}, r.prototype.validateId = function (r) {
        return !r || (/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/).test(r);
      }, r.prototype.chunk = function (r) {
        for (var t = [], e = r.size, o = Math.ceil(e / exports.util.chunkedMTU), n = 0, a = 0; a < e; ) {
          var i = Math.min(e, a + exports.util.chunkedMTU), s = r.slice(a, i), u = {
            __peerData: this._dataCount,
            n: n,
            data: s,
            total: o
          };
          (t.push(u), a = i, n++);
        }
        return (this._dataCount++, t);
      }, r.prototype.blobToArrayBuffer = function (r, t) {
        var e = new FileReader();
        return (e.onload = function (r) {
          r.target && t(r.target.result);
        }, e.readAsArrayBuffer(r), e);
      }, r.prototype.binaryStringToArrayBuffer = function (r) {
        for (var t = new Uint8Array(r.length), e = 0; e < r.length; e++) t[e] = 255 & r.charCodeAt(e);
        return t.buffer;
      }, r.prototype.randomToken = function () {
        return Math.random().toString(36).substr(2);
      }, r.prototype.isSecure = function () {
        return "https:" === location.protocol;
      }, r);
    })())();
  }, {
    "peerjs-js-binarypack": "kdPp",
    "./supports": "I31f"
  }],
  "JJlS": [function (require, module, exports) {
    "use strict";
    var e = Object.prototype.hasOwnProperty, t = "~";
    function n() {}
    function r(e, t, n) {
      (this.fn = e, this.context = t, this.once = n || !1);
    }
    function o(e, n, o, s, i) {
      if ("function" != typeof o) throw new TypeError("The listener must be a function");
      var c = new r(o, s || e, i), f = t ? t + n : n;
      return (e._events[f] ? e._events[f].fn ? e._events[f] = [e._events[f], c] : e._events[f].push(c) : (e._events[f] = c, e._eventsCount++), e);
    }
    function s(e, t) {
      0 == --e._eventsCount ? e._events = new n() : delete e._events[t];
    }
    function i() {
      (this._events = new n(), this._eventsCount = 0);
    }
    (Object.create && (n.prototype = Object.create(null), new n().__proto__ || (t = !1)), i.prototype.eventNames = function () {
      var n, r, o = [];
      if (0 === this._eventsCount) return o;
      for (r in n = this._events) e.call(n, r) && o.push(t ? r.slice(1) : r);
      return Object.getOwnPropertySymbols ? o.concat(Object.getOwnPropertySymbols(n)) : o;
    }, i.prototype.listeners = function (e) {
      var n = t ? t + e : e, r = this._events[n];
      if (!r) return [];
      if (r.fn) return [r.fn];
      for (var o = 0, s = r.length, i = new Array(s); o < s; o++) i[o] = r[o].fn;
      return i;
    }, i.prototype.listenerCount = function (e) {
      var n = t ? t + e : e, r = this._events[n];
      return r ? r.fn ? 1 : r.length : 0;
    }, i.prototype.emit = function (e, n, r, o, s, i) {
      var c = t ? t + e : e;
      if (!this._events[c]) return !1;
      var f, u, a = this._events[c], l = arguments.length;
      if (a.fn) {
        switch ((a.once && this.removeListener(e, a.fn, void 0, !0), l)) {
          case 1:
            return (a.fn.call(a.context), !0);
          case 2:
            return (a.fn.call(a.context, n), !0);
          case 3:
            return (a.fn.call(a.context, n, r), !0);
          case 4:
            return (a.fn.call(a.context, n, r, o), !0);
          case 5:
            return (a.fn.call(a.context, n, r, o, s), !0);
          case 6:
            return (a.fn.call(a.context, n, r, o, s, i), !0);
        }
        for ((u = 1, f = new Array(l - 1)); u < l; u++) f[u - 1] = arguments[u];
        a.fn.apply(a.context, f);
      } else {
        var v, h = a.length;
        for (u = 0; u < h; u++) switch ((a[u].once && this.removeListener(e, a[u].fn, void 0, !0), l)) {
          case 1:
            a[u].fn.call(a[u].context);
            break;
          case 2:
            a[u].fn.call(a[u].context, n);
            break;
          case 3:
            a[u].fn.call(a[u].context, n, r);
            break;
          case 4:
            a[u].fn.call(a[u].context, n, r, o);
            break;
          default:
            if (!f) for ((v = 1, f = new Array(l - 1)); v < l; v++) f[v - 1] = arguments[v];
            a[u].fn.apply(a[u].context, f);
        }
      }
      return !0;
    }, i.prototype.on = function (e, t, n) {
      return o(this, e, t, n, !1);
    }, i.prototype.once = function (e, t, n) {
      return o(this, e, t, n, !0);
    }, i.prototype.removeListener = function (e, n, r, o) {
      var i = t ? t + e : e;
      if (!this._events[i]) return this;
      if (!n) return (s(this, i), this);
      var c = this._events[i];
      if (c.fn) c.fn !== n || o && !c.once || r && c.context !== r || s(this, i); else {
        for (var f = 0, u = [], a = c.length; f < a; f++) (c[f].fn !== n || o && !c[f].once || r && c[f].context !== r) && u.push(c[f]);
        u.length ? this._events[i] = 1 === u.length ? u[0] : u : s(this, i);
      }
      return this;
    }, i.prototype.removeAllListeners = function (e) {
      var r;
      return (e ? (r = t ? t + e : e, this._events[r] && s(this, r)) : (this._events = new n(), this._eventsCount = 0), this);
    }, i.prototype.off = i.prototype.removeListener, i.prototype.addListener = i.prototype.on, i.prefixed = t, i.EventEmitter = i, "undefined" != typeof module && (module.exports = i));
  }, {}],
  "WOs9": [function (require, module, exports) {
    "use strict";
    var r = this && this.__read || (function (r, e) {
      var o = "function" == typeof Symbol && r[Symbol.iterator];
      if (!o) return r;
      var t, n, l = o.call(r), i = [];
      try {
        for (; (void 0 === e || e-- > 0) && !(t = l.next()).done; ) i.push(t.value);
      } catch (s) {
        n = {
          error: s
        };
      } finally {
        try {
          t && !t.done && (o = l.return) && o.call(l);
        } finally {
          if (n) throw n.error;
        }
      }
      return i;
    }), e = this && this.__spread || (function () {
      for (var e = [], o = 0; o < arguments.length; o++) e = e.concat(r(arguments[o]));
      return e;
    });
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var o, t = "PeerJS: ";
    !(function (r) {
      (r[r.Disabled = 0] = "Disabled", r[r.Errors = 1] = "Errors", r[r.Warnings = 2] = "Warnings", r[r.All = 3] = "All");
    })(o = exports.LogLevel || (exports.LogLevel = {}));
    var n = (function () {
      function r() {
        this._logLevel = o.Disabled;
      }
      return (Object.defineProperty(r.prototype, "logLevel", {
        get: function () {
          return this._logLevel;
        },
        set: function (r) {
          this._logLevel = r;
        },
        enumerable: !0,
        configurable: !0
      }), r.prototype.log = function () {
        for (var r = [], t = 0; t < arguments.length; t++) r[t] = arguments[t];
        this._logLevel >= o.All && this._print.apply(this, e([o.All], r));
      }, r.prototype.warn = function () {
        for (var r = [], t = 0; t < arguments.length; t++) r[t] = arguments[t];
        this._logLevel >= o.Warnings && this._print.apply(this, e([o.Warnings], r));
      }, r.prototype.error = function () {
        for (var r = [], t = 0; t < arguments.length; t++) r[t] = arguments[t];
        this._logLevel >= o.Errors && this._print.apply(this, e([o.Errors], r));
      }, r.prototype.setLogFunction = function (r) {
        this._print = r;
      }, r.prototype._print = function (r) {
        for (var n = [], l = 1; l < arguments.length; l++) n[l - 1] = arguments[l];
        var i = e([t], n);
        for (var s in i) i[s] instanceof Error && (i[s] = "(" + i[s].name + ") " + i[s].message);
        r >= o.All ? console.log.apply(console, e(i)) : r >= o.Warnings ? console.warn.apply(console, e(["WARNING"], i)) : r >= o.Errors && console.error.apply(console, e(["ERROR"], i));
      }, r);
    })();
    exports.default = new n();
  }, {}],
  "ZRYf": [function (require, module, exports) {
    "use strict";
    var e, r, n, o, t, a, i;
    (Object.defineProperty(exports, "__esModule", {
      value: !0
    }), (function (e) {
      (e.Open = "open", e.Stream = "stream", e.Data = "data", e.Close = "close", e.Error = "error", e.IceStateChanged = "iceStateChanged");
    })(e = exports.ConnectionEventType || (exports.ConnectionEventType = {})), (function (e) {
      (e.Data = "data", e.Media = "media");
    })(r = exports.ConnectionType || (exports.ConnectionType = {})), (function (e) {
      (e.Open = "open", e.Close = "close", e.Connection = "connection", e.Call = "call", e.Disconnected = "disconnected", e.Error = "error");
    })(n = exports.PeerEventType || (exports.PeerEventType = {})), (function (e) {
      (e.BrowserIncompatible = "browser-incompatible", e.Disconnected = "disconnected", e.InvalidID = "invalid-id", e.InvalidKey = "invalid-key", e.Network = "network", e.PeerUnavailable = "peer-unavailable", e.SslUnavailable = "ssl-unavailable", e.ServerError = "server-error", e.SocketError = "socket-error", e.SocketClosed = "socket-closed", e.UnavailableID = "unavailable-id", e.WebRTC = "webrtc");
    })(o = exports.PeerErrorType || (exports.PeerErrorType = {})), (function (e) {
      (e.Binary = "binary", e.BinaryUTF8 = "binary-utf8", e.JSON = "json");
    })(t = exports.SerializationType || (exports.SerializationType = {})), (function (e) {
      (e.Message = "message", e.Disconnected = "disconnected", e.Error = "error", e.Close = "close");
    })(a = exports.SocketEventType || (exports.SocketEventType = {})), (function (e) {
      (e.Heartbeat = "HEARTBEAT", e.Candidate = "CANDIDATE", e.Offer = "OFFER", e.Answer = "ANSWER", e.Open = "OPEN", e.Error = "ERROR", e.IdTaken = "ID-TAKEN", e.InvalidKey = "INVALID-KEY", e.Leave = "LEAVE", e.Expire = "EXPIRE");
    })(i = exports.ServerMessageType || (exports.ServerMessageType = {})));
  }, {}],
  "wJlv": [function (require, module, exports) {
    "use strict";
    var e = this && this.__extends || (function () {
      var e = function (t, n) {
        return (e = Object.setPrototypeOf || ({
          __proto__: []
        }) instanceof Array && (function (e, t) {
          e.__proto__ = t;
        }) || (function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        }))(t, n);
      };
      return function (t, n) {
        function s() {
          this.constructor = t;
        }
        (e(t, n), t.prototype = null === n ? Object.create(n) : (s.prototype = n.prototype, new s()));
      };
    })(), t = this && this.__read || (function (e, t) {
      var n = "function" == typeof Symbol && e[Symbol.iterator];
      if (!n) return e;
      var s, o, r = n.call(e), i = [];
      try {
        for (; (void 0 === t || t-- > 0) && !(s = r.next()).done; ) i.push(s.value);
      } catch (c) {
        o = {
          error: c
        };
      } finally {
        try {
          s && !s.done && (n = r.return) && n.call(r);
        } finally {
          if (o) throw o.error;
        }
      }
      return i;
    }), n = this && this.__spread || (function () {
      for (var e = [], n = 0; n < arguments.length; n++) e = e.concat(t(arguments[n]));
      return e;
    }), s = this && this.__values || (function (e) {
      var t = "function" == typeof Symbol && Symbol.iterator, n = t && e[t], s = 0;
      if (n) return n.call(e);
      if (e && "number" == typeof e.length) return {
        next: function () {
          return (e && s >= e.length && (e = void 0), {
            value: e && e[s++],
            done: !e
          });
        }
      };
      throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }), o = this && this.__importDefault || (function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    });
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var r = require("eventemitter3"), i = o(require("./logger")), c = require("./enums"), a = (function (t) {
      function o(e, n, s, o, r, i) {
        void 0 === i && (i = 5e3);
        var c = t.call(this) || this;
        (c.pingInterval = i, c._disconnected = !0, c._messagesQueue = []);
        var a = e ? "wss://" : "ws://";
        return (c._baseUrl = a + n + ":" + s + o + "peerjs?key=" + r, c);
      }
      return (e(o, t), o.prototype.start = function (e, t) {
        var n = this;
        this._id = e;
        var s = this._baseUrl + "&id=" + e + "&token=" + t;
        !this._socket && this._disconnected && (this._socket = new WebSocket(s), this._disconnected = !1, this._socket.onmessage = function (e) {
          var t;
          try {
            (t = JSON.parse(e.data), i.default.log("Server message received:", t));
          } catch (s) {
            return void i.default.log("Invalid server message", e.data);
          }
          n.emit(c.SocketEventType.Message, t);
        }, this._socket.onclose = function (e) {
          n._disconnected || (i.default.log("Socket closed.", e), n._cleanup(), n._disconnected = !0, n.emit(c.SocketEventType.Disconnected));
        }, this._socket.onopen = function () {
          n._disconnected || (n._sendQueuedMessages(), i.default.log("Socket open"), n._scheduleHeartbeat());
        });
      }, o.prototype._scheduleHeartbeat = function () {
        var e = this;
        this._wsPingTimer = setTimeout(function () {
          e._sendHeartbeat();
        }, this.pingInterval);
      }, o.prototype._sendHeartbeat = function () {
        if (this._wsOpen()) {
          var e = JSON.stringify({
            type: c.ServerMessageType.Heartbeat
          });
          (this._socket.send(e), this._scheduleHeartbeat());
        } else i.default.log("Cannot send heartbeat, because socket closed");
      }, o.prototype._wsOpen = function () {
        return !!this._socket && 1 === this._socket.readyState;
      }, o.prototype._sendQueuedMessages = function () {
        var e, t, o = n(this._messagesQueue);
        this._messagesQueue = [];
        try {
          for (var r = s(o), i = r.next(); !i.done; i = r.next()) {
            var c = i.value;
            this.send(c);
          }
        } catch (a) {
          e = {
            error: a
          };
        } finally {
          try {
            i && !i.done && (t = r.return) && t.call(r);
          } finally {
            if (e) throw e.error;
          }
        }
      }, o.prototype.send = function (e) {
        if (!this._disconnected) if (this._id) if (e.type) {
          if (this._wsOpen()) {
            var t = JSON.stringify(e);
            this._socket.send(t);
          }
        } else this.emit(c.SocketEventType.Error, "Invalid message"); else this._messagesQueue.push(e);
      }, o.prototype.close = function () {
        this._disconnected || (this._cleanup(), this._disconnected = !0);
      }, o.prototype._cleanup = function () {
        (this._socket && (this._socket.onopen = this._socket.onmessage = this._socket.onclose = null, this._socket.close(), this._socket = void 0), clearTimeout(this._wsPingTimer));
      }, o);
    })(r.EventEmitter);
    exports.Socket = a;
  }, {
    "eventemitter3": "JJlS",
    "./logger": "WOs9",
    "./enums": "ZRYf"
  }],
  "HCdX": [function (require, module, exports) {
    "use strict";
    var e = this && this.__assign || (function () {
      return (e = Object.assign || (function (e) {
        for (var n, t = 1, o = arguments.length; t < o; t++) for (var i in n = arguments[t]) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
        return e;
      })).apply(this, arguments);
    }), n = this && this.__awaiter || (function (e, n, t, o) {
      return new (t || (t = Promise))(function (i, r) {
        function c(e) {
          try {
            s(o.next(e));
          } catch (n) {
            r(n);
          }
        }
        function a(e) {
          try {
            s(o.throw(e));
          } catch (n) {
            r(n);
          }
        }
        function s(e) {
          var n;
          e.done ? i(e.value) : (n = e.value, n instanceof t ? n : new t(function (e) {
            e(n);
          })).then(c, a);
        }
        s((o = o.apply(e, n || [])).next());
      });
    }), t = this && this.__generator || (function (e, n) {
      var t, o, i, r, c = {
        label: 0,
        sent: function () {
          if (1 & i[0]) throw i[1];
          return i[1];
        },
        trys: [],
        ops: []
      };
      return (r = {
        next: a(0),
        throw: a(1),
        return: a(2)
      }, "function" == typeof Symbol && (r[Symbol.iterator] = function () {
        return this;
      }), r);
      function a(r) {
        return function (a) {
          return (function (r) {
            if (t) throw new TypeError("Generator is already executing.");
            for (; c; ) try {
              if ((t = 1, o && (i = 2 & r[0] ? o.return : r[0] ? o.throw || ((i = o.return) && i.call(o), 0) : o.next) && !(i = i.call(o, r[1])).done)) return i;
              switch ((o = 0, i && (r = [2 & r[0], i.value]), r[0])) {
                case 0:
                case 1:
                  i = r;
                  break;
                case 4:
                  return (c.label++, {
                    value: r[1],
                    done: !1
                  });
                case 5:
                  (c.label++, o = r[1], r = [0]);
                  continue;
                case 7:
                  (r = c.ops.pop(), c.trys.pop());
                  continue;
                default:
                  if (!(i = (i = c.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                    c = 0;
                    continue;
                  }
                  if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                    c.label = r[1];
                    break;
                  }
                  if (6 === r[0] && c.label < i[1]) {
                    (c.label = i[1], i = r);
                    break;
                  }
                  if (i && c.label < i[2]) {
                    (c.label = i[2], c.ops.push(r));
                    break;
                  }
                  (i[2] && c.ops.pop(), c.trys.pop());
                  continue;
              }
              r = n.call(e, c);
            } catch (a) {
              (r = [6, a], o = 0);
            } finally {
              t = i = 0;
            }
            if (5 & r[0]) throw r[1];
            return {
              value: r[0] ? r[1] : void 0,
              done: !0
            };
          })([r, a]);
        };
      }
    }), o = this && this.__importDefault || (function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    });
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var i = require("./util"), r = o(require("./logger")), c = require("./enums"), a = (function () {
      function o(e) {
        this.connection = e;
      }
      return (o.prototype.startConnection = function (e) {
        var n = this._startPeerConnection();
        if ((this.connection.peerConnection = n, this.connection.type === c.ConnectionType.Media && e._stream && this._addTracksToConnection(e._stream, n), e.originator)) {
          if (this.connection.type === c.ConnectionType.Data) {
            var t = this.connection, o = {
              ordered: !!e.reliable
            }, i = n.createDataChannel(t.label, o);
            t.initialize(i);
          }
          this._makeOffer();
        } else this.handleSDP("OFFER", e.sdp);
      }, o.prototype._startPeerConnection = function () {
        r.default.log("Creating RTCPeerConnection.");
        var e = new RTCPeerConnection(this.connection.provider.options.config);
        return (this._setupListeners(e), e);
      }, o.prototype._setupListeners = function (e) {
        var n = this, t = this.connection.peer, o = this.connection.connectionId, a = this.connection.type, s = this.connection.provider;
        (r.default.log("Listening for ICE candidates."), e.onicecandidate = function (e) {
          e.candidate && e.candidate.candidate && (r.default.log("Received ICE candidates for " + t + ":", e.candidate), s.socket.send({
            type: c.ServerMessageType.Candidate,
            payload: {
              candidate: e.candidate,
              type: a,
              connectionId: o
            },
            dst: t
          }));
        }, e.oniceconnectionstatechange = function () {
          switch (e.iceConnectionState) {
            case "failed":
              (r.default.log("iceConnectionState is failed, closing connections to " + t), n.connection.emit(c.ConnectionEventType.Error, new Error("Negotiation of connection to " + t + " failed.")), n.connection.close());
              break;
            case "closed":
              (r.default.log("iceConnectionState is closed, closing connections to " + t), n.connection.emit(c.ConnectionEventType.Error, new Error("Connection to " + t + " closed.")), n.connection.close());
              break;
            case "disconnected":
              r.default.log("iceConnectionState changed to disconnected on the connection with " + t);
              break;
            case "completed":
              e.onicecandidate = i.util.noop;
          }
          n.connection.emit(c.ConnectionEventType.IceStateChanged, e.iceConnectionState);
        }, r.default.log("Listening for data channel"), e.ondatachannel = function (e) {
          r.default.log("Received data channel");
          var n = e.channel;
          s.getConnection(t, o).initialize(n);
        }, r.default.log("Listening for remote stream"), e.ontrack = function (e) {
          r.default.log("Received remote stream");
          var i = e.streams[0], a = s.getConnection(t, o);
          if (a.type === c.ConnectionType.Media) {
            var d = a;
            n._addStreamToMediaConnection(i, d);
          }
        });
      }, o.prototype.cleanup = function () {
        r.default.log("Cleaning up PeerConnection to " + this.connection.peer);
        var e = this.connection.peerConnection;
        if (e) {
          (this.connection.peerConnection = null, e.onicecandidate = e.oniceconnectionstatechange = e.ondatachannel = e.ontrack = function () {});
          var n = "closed" !== e.signalingState, t = !1;
          if (this.connection.type === c.ConnectionType.Data) {
            var o = this.connection.dataChannel;
            o && (t = !!o.readyState && "closed" !== o.readyState);
          }
          (n || t) && e.close();
        }
      }, o.prototype._makeOffer = function () {
        return n(this, void 0, Promise, function () {
          var n, o, a, s, d, l, u;
          return t(this, function (t) {
            switch (t.label) {
              case 0:
                (n = this.connection.peerConnection, o = this.connection.provider, t.label = 1);
              case 1:
                return (t.trys.push([1, 7, , 8]), [4, n.createOffer(this.connection.options.constraints)]);
              case 2:
                (a = t.sent(), r.default.log("Created offer."), this.connection.options.sdpTransform && "function" == typeof this.connection.options.sdpTransform && (a.sdp = this.connection.options.sdpTransform(a.sdp) || a.sdp), t.label = 3);
              case 3:
                return (t.trys.push([3, 5, , 6]), [4, n.setLocalDescription(a)]);
              case 4:
                return (t.sent(), r.default.log("Set localDescription:", a, "for:" + this.connection.peer), s = {
                  sdp: a,
                  type: this.connection.type,
                  connectionId: this.connection.connectionId,
                  metadata: this.connection.metadata,
                  browser: i.util.browser
                }, this.connection.type === c.ConnectionType.Data && (d = this.connection, s = e(e({}, s), {
                  label: d.label,
                  reliable: d.reliable,
                  serialization: d.serialization
                })), o.socket.send({
                  type: c.ServerMessageType.Offer,
                  payload: s,
                  dst: this.connection.peer
                }), [3, 6]);
              case 5:
                return ("OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer" != (l = t.sent()) && (o.emitError(c.PeerErrorType.WebRTC, l), r.default.log("Failed to setLocalDescription, ", l)), [3, 6]);
              case 6:
                return [3, 8];
              case 7:
                return (u = t.sent(), o.emitError(c.PeerErrorType.WebRTC, u), r.default.log("Failed to createOffer, ", u), [3, 8]);
              case 8:
                return [2];
            }
          });
        });
      }, o.prototype._makeAnswer = function () {
        return n(this, void 0, Promise, function () {
          var e, n, o, a, s;
          return t(this, function (t) {
            switch (t.label) {
              case 0:
                (e = this.connection.peerConnection, n = this.connection.provider, t.label = 1);
              case 1:
                return (t.trys.push([1, 7, , 8]), [4, e.createAnswer()]);
              case 2:
                (o = t.sent(), r.default.log("Created answer."), this.connection.options.sdpTransform && "function" == typeof this.connection.options.sdpTransform && (o.sdp = this.connection.options.sdpTransform(o.sdp) || o.sdp), t.label = 3);
              case 3:
                return (t.trys.push([3, 5, , 6]), [4, e.setLocalDescription(o)]);
              case 4:
                return (t.sent(), r.default.log("Set localDescription:", o, "for:" + this.connection.peer), n.socket.send({
                  type: c.ServerMessageType.Answer,
                  payload: {
                    sdp: o,
                    type: this.connection.type,
                    connectionId: this.connection.connectionId,
                    browser: i.util.browser
                  },
                  dst: this.connection.peer
                }), [3, 6]);
              case 5:
                return (a = t.sent(), n.emitError(c.PeerErrorType.WebRTC, a), r.default.log("Failed to setLocalDescription, ", a), [3, 6]);
              case 6:
                return [3, 8];
              case 7:
                return (s = t.sent(), n.emitError(c.PeerErrorType.WebRTC, s), r.default.log("Failed to create answer, ", s), [3, 8]);
              case 8:
                return [2];
            }
          });
        });
      }, o.prototype.handleSDP = function (e, o) {
        return n(this, void 0, Promise, function () {
          var n, i, a, s;
          return t(this, function (t) {
            switch (t.label) {
              case 0:
                (o = new RTCSessionDescription(o), n = this.connection.peerConnection, i = this.connection.provider, r.default.log("Setting remote description", o), a = this, t.label = 1);
              case 1:
                return (t.trys.push([1, 5, , 6]), [4, n.setRemoteDescription(o)]);
              case 2:
                return (t.sent(), r.default.log("Set remoteDescription:" + e + " for:" + this.connection.peer), "OFFER" !== e ? [3, 4] : [4, a._makeAnswer()]);
              case 3:
                (t.sent(), t.label = 4);
              case 4:
                return [3, 6];
              case 5:
                return (s = t.sent(), i.emitError(c.PeerErrorType.WebRTC, s), r.default.log("Failed to setRemoteDescription, ", s), [3, 6]);
              case 6:
                return [2];
            }
          });
        });
      }, o.prototype.handleCandidate = function (e) {
        return n(this, void 0, Promise, function () {
          var n, o, i, a, s, d;
          return t(this, function (t) {
            switch (t.label) {
              case 0:
                (r.default.log("handleCandidate:", e), n = e.candidate, o = e.sdpMLineIndex, i = e.sdpMid, a = this.connection.peerConnection, s = this.connection.provider, t.label = 1);
              case 1:
                return (t.trys.push([1, 3, , 4]), [4, a.addIceCandidate(new RTCIceCandidate({
                  sdpMid: i,
                  sdpMLineIndex: o,
                  candidate: n
                }))]);
              case 2:
                return (t.sent(), r.default.log("Added ICE candidate for:" + this.connection.peer), [3, 4]);
              case 3:
                return (d = t.sent(), s.emitError(c.PeerErrorType.WebRTC, d), r.default.log("Failed to handleCandidate, ", d), [3, 4]);
              case 4:
                return [2];
            }
          });
        });
      }, o.prototype._addTracksToConnection = function (e, n) {
        if ((r.default.log("add tracks from stream " + e.id + " to peer connection"), !n.addTrack)) return r.default.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");
        e.getTracks().forEach(function (t) {
          n.addTrack(t, e);
        });
      }, o.prototype._addStreamToMediaConnection = function (e, n) {
        (r.default.log("add stream " + e.id + " to media connection " + n.connectionId), n.addStream(e));
      }, o);
    })();
    exports.Negotiator = a;
  }, {
    "./util": "BHXf",
    "./logger": "WOs9",
    "./enums": "ZRYf"
  }],
  "tQFK": [function (require, module, exports) {
    "use strict";
    var t = this && this.__extends || (function () {
      var t = function (e, r) {
        return (t = Object.setPrototypeOf || ({
          __proto__: []
        }) instanceof Array && (function (t, e) {
          t.__proto__ = e;
        }) || (function (t, e) {
          for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
        }))(e, r);
      };
      return function (e, r) {
        function n() {
          this.constructor = e;
        }
        (t(e, r), e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n()));
      };
    })();
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var e = require("eventemitter3"), r = (function (e) {
      function r(t, r, n) {
        var o = e.call(this) || this;
        return (o.peer = t, o.provider = r, o.options = n, o._open = !1, o.metadata = n.metadata, o);
      }
      return (t(r, e), Object.defineProperty(r.prototype, "open", {
        get: function () {
          return this._open;
        },
        enumerable: !0,
        configurable: !0
      }), r);
    })(e.EventEmitter);
    exports.BaseConnection = r;
  }, {
    "eventemitter3": "JJlS"
  }],
  "dbHP": [function (require, module, exports) {
    "use strict";
    var e = this && this.__extends || (function () {
      var e = function (t, o) {
        return (e = Object.setPrototypeOf || ({
          __proto__: []
        }) instanceof Array && (function (e, t) {
          e.__proto__ = t;
        }) || (function (e, t) {
          for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
        }))(t, o);
      };
      return function (t, o) {
        function r() {
          this.constructor = t;
        }
        (e(t, o), t.prototype = null === o ? Object.create(o) : (r.prototype = o.prototype, new r()));
      };
    })(), t = this && this.__assign || (function () {
      return (t = Object.assign || (function (e) {
        for (var t, o = 1, r = arguments.length; o < r; o++) for (var n in t = arguments[o]) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e;
      })).apply(this, arguments);
    }), o = this && this.__values || (function (e) {
      var t = "function" == typeof Symbol && Symbol.iterator, o = t && e[t], r = 0;
      if (o) return o.call(e);
      if (e && "number" == typeof e.length) return {
        next: function () {
          return (e && r >= e.length && (e = void 0), {
            value: e && e[r++],
            done: !e
          });
        }
      };
      throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }), r = this && this.__importDefault || (function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    });
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var n = require("./util"), i = r(require("./logger")), a = require("./negotiator"), s = require("./enums"), l = require("./baseconnection"), c = (function (r) {
      function l(e, t, o) {
        var i = r.call(this, e, t, o) || this;
        return (i._localStream = i.options._stream, i.connectionId = i.options.connectionId || l.ID_PREFIX + n.util.randomToken(), i._negotiator = new a.Negotiator(i), i._localStream && i._negotiator.startConnection({
          _stream: i._localStream,
          originator: !0
        }), i);
      }
      return (e(l, r), Object.defineProperty(l.prototype, "type", {
        get: function () {
          return s.ConnectionType.Media;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(l.prototype, "localStream", {
        get: function () {
          return this._localStream;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(l.prototype, "remoteStream", {
        get: function () {
          return this._remoteStream;
        },
        enumerable: !0,
        configurable: !0
      }), l.prototype.addStream = function (e) {
        (i.default.log("Receiving stream", e), this._remoteStream = e, r.prototype.emit.call(this, s.ConnectionEventType.Stream, e));
      }, l.prototype.handleMessage = function (e) {
        var t = e.type, o = e.payload;
        switch (e.type) {
          case s.ServerMessageType.Answer:
            (this._negotiator.handleSDP(t, o.sdp), this._open = !0);
            break;
          case s.ServerMessageType.Candidate:
            this._negotiator.handleCandidate(o.candidate);
            break;
          default:
            i.default.warn("Unrecognized message type:" + t + " from peer:" + this.peer);
        }
      }, l.prototype.answer = function (e, r) {
        var n, a;
        if ((void 0 === r && (r = {}), this._localStream)) i.default.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?"); else {
          (this._localStream = e, r && r.sdpTransform && (this.options.sdpTransform = r.sdpTransform), this._negotiator.startConnection(t(t({}, this.options._payload), {
            _stream: e
          })));
          var s = this.provider._getMessages(this.connectionId);
          try {
            for (var l = o(s), c = l.next(); !c.done; c = l.next()) {
              var p = c.value;
              this.handleMessage(p);
            }
          } catch (u) {
            n = {
              error: u
            };
          } finally {
            try {
              c && !c.done && (a = l.return) && a.call(l);
            } finally {
              if (n) throw n.error;
            }
          }
          this._open = !0;
        }
      }, l.prototype.close = function () {
        (this._negotiator && (this._negotiator.cleanup(), this._negotiator = null), this._localStream = null, this._remoteStream = null, this.provider && (this.provider._removeConnection(this), this.provider = null), this.options && this.options._stream && (this.options._stream = null), this.open && (this._open = !1, r.prototype.emit.call(this, s.ConnectionEventType.Close)));
      }, l.ID_PREFIX = "mc_", l);
    })(l.BaseConnection);
    exports.MediaConnection = c;
  }, {
    "./util": "BHXf",
    "./logger": "WOs9",
    "./negotiator": "HCdX",
    "./enums": "ZRYf",
    "./baseconnection": "tQFK"
  }],
  "GGp6": [function (require, module, exports) {
    "use strict";
    var e = this && this.__extends || (function () {
      var e = function (t, r) {
        return (e = Object.setPrototypeOf || ({
          __proto__: []
        }) instanceof Array && (function (e, t) {
          e.__proto__ = t;
        }) || (function (e, t) {
          for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
        }))(t, r);
      };
      return function (t, r) {
        function o() {
          this.constructor = t;
        }
        (e(t, r), t.prototype = null === r ? Object.create(r) : (o.prototype = r.prototype, new o()));
      };
    })(), t = this && this.__importDefault || (function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    });
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var r = require("eventemitter3"), o = t(require("./logger")), n = (function (t) {
      function r() {
        var e = t.call(this) || this;
        return (e.fileReader = new FileReader(), e._queue = [], e._processing = !1, e.fileReader.onload = function (t) {
          (e._processing = !1, t.target && e.emit("done", t.target.result), e.doNextTask());
        }, e.fileReader.onerror = function (t) {
          (o.default.error("EncodingQueue error:", t), e._processing = !1, e.destroy(), e.emit("error", t));
        }, e);
      }
      return (e(r, t), Object.defineProperty(r.prototype, "queue", {
        get: function () {
          return this._queue;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(r.prototype, "size", {
        get: function () {
          return this.queue.length;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(r.prototype, "processing", {
        get: function () {
          return this._processing;
        },
        enumerable: !0,
        configurable: !0
      }), r.prototype.enque = function (e) {
        (this.queue.push(e), this.processing || this.doNextTask());
      }, r.prototype.destroy = function () {
        (this.fileReader.abort(), this._queue = []);
      }, r.prototype.doNextTask = function () {
        0 !== this.size && (this.processing || (this._processing = !0, this.fileReader.readAsArrayBuffer(this.queue.shift())));
      }, r);
    })(r.EventEmitter);
    exports.EncodingQueue = n;
  }, {
    "eventemitter3": "JJlS",
    "./logger": "WOs9"
  }],
  "GBTQ": [function (require, module, exports) {
    "use strict";
    var e = this && this.__extends || (function () {
      var e = function (t, n) {
        return (e = Object.setPrototypeOf || ({
          __proto__: []
        }) instanceof Array && (function (e, t) {
          e.__proto__ = t;
        }) || (function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        }))(t, n);
      };
      return function (t, n) {
        function i() {
          this.constructor = t;
        }
        (e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i()));
      };
    })(), t = this && this.__values || (function (e) {
      var t = "function" == typeof Symbol && Symbol.iterator, n = t && e[t], i = 0;
      if (n) return n.call(e);
      if (e && "number" == typeof e.length) return {
        next: function () {
          return (e && i >= e.length && (e = void 0), {
            value: e && e[i++],
            done: !e
          });
        }
      };
      throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }), n = this && this.__importDefault || (function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    });
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var i = require("./util"), o = n(require("./logger")), r = require("./negotiator"), a = require("./enums"), s = require("./baseconnection"), u = require("./encodingQueue"), l = (function (n) {
      function s(e, t, l) {
        var f = n.call(this, e, t, l) || this;
        return (f.stringify = JSON.stringify, f.parse = JSON.parse, f._buffer = [], f._bufferSize = 0, f._buffering = !1, f._chunkedData = {}, f._encodingQueue = new u.EncodingQueue(), f.connectionId = f.options.connectionId || s.ID_PREFIX + i.util.randomToken(), f.label = f.options.label || f.connectionId, f.serialization = f.options.serialization || a.SerializationType.Binary, f.reliable = !!f.options.reliable, f._encodingQueue.on("done", function (e) {
          f._bufferedSend(e);
        }), f._encodingQueue.on("error", function () {
          (o.default.error("DC#" + f.connectionId + ": Error occured in encoding from blob to arraybuffer, close DC"), f.close());
        }), f._negotiator = new r.Negotiator(f), f._negotiator.startConnection(f.options._payload || ({
          originator: !0
        })), f);
      }
      return (e(s, n), Object.defineProperty(s.prototype, "type", {
        get: function () {
          return a.ConnectionType.Data;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(s.prototype, "dataChannel", {
        get: function () {
          return this._dc;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(s.prototype, "bufferSize", {
        get: function () {
          return this._bufferSize;
        },
        enumerable: !0,
        configurable: !0
      }), s.prototype.initialize = function (e) {
        (this._dc = e, this._configureDataChannel());
      }, s.prototype._configureDataChannel = function () {
        var e = this;
        (i.util.supports.binaryBlob && !i.util.supports.reliable || (this.dataChannel.binaryType = "arraybuffer"), this.dataChannel.onopen = function () {
          (o.default.log("DC#" + e.connectionId + " dc connection success"), e._open = !0, e.emit(a.ConnectionEventType.Open));
        }, this.dataChannel.onmessage = function (t) {
          (o.default.log("DC#" + e.connectionId + " dc onmessage:", t.data), e._handleDataMessage(t));
        }, this.dataChannel.onclose = function () {
          (o.default.log("DC#" + e.connectionId + " dc closed for:", e.peer), e.close());
        });
      }, s.prototype._handleDataMessage = function (e) {
        var t = this, o = e.data, r = o.constructor, s = o;
        if (this.serialization === a.SerializationType.Binary || this.serialization === a.SerializationType.BinaryUTF8) {
          if (r === Blob) return void i.util.blobToArrayBuffer(o, function (e) {
            var n = i.util.unpack(e);
            t.emit(a.ConnectionEventType.Data, n);
          });
          if (r === ArrayBuffer) s = i.util.unpack(o); else if (r === String) {
            var u = i.util.binaryStringToArrayBuffer(o);
            s = i.util.unpack(u);
          }
        } else this.serialization === a.SerializationType.JSON && (s = this.parse(o));
        s.__peerData ? this._handleChunk(s) : n.prototype.emit.call(this, a.ConnectionEventType.Data, s);
      }, s.prototype._handleChunk = function (e) {
        var t = e.__peerData, n = this._chunkedData[t] || ({
          data: [],
          count: 0,
          total: e.total
        });
        if ((n.data[e.n] = e.data, n.count++, this._chunkedData[t] = n, n.total === n.count)) {
          delete this._chunkedData[t];
          var i = new Blob(n.data);
          this._handleDataMessage({
            data: i
          });
        }
      }, s.prototype.close = function () {
        (this._buffer = [], this._bufferSize = 0, this._chunkedData = {}, this._negotiator && (this._negotiator.cleanup(), this._negotiator = null), this.provider && (this.provider._removeConnection(this), this.provider = null), this.dataChannel && (this.dataChannel.onopen = null, this.dataChannel.onmessage = null, this.dataChannel.onclose = null, this._dc = null), this._encodingQueue && (this._encodingQueue.destroy(), this._encodingQueue.removeAllListeners(), this._encodingQueue = null), this.open && (this._open = !1, n.prototype.emit.call(this, a.ConnectionEventType.Close)));
      }, s.prototype.send = function (e, t) {
        if (this.open) if (this.serialization === a.SerializationType.JSON) this._bufferedSend(this.stringify(e)); else if (this.serialization === a.SerializationType.Binary || this.serialization === a.SerializationType.BinaryUTF8) {
          var o = i.util.pack(e);
          if (!t && o.size > i.util.chunkedMTU) return void this._sendChunks(o);
          i.util.supports.binaryBlob ? this._bufferedSend(o) : this._encodingQueue.enque(o);
        } else this._bufferedSend(e); else n.prototype.emit.call(this, a.ConnectionEventType.Error, new Error("Connection is not open. You should listen for the `open` event before sending messages."));
      }, s.prototype._bufferedSend = function (e) {
        !this._buffering && this._trySend(e) || (this._buffer.push(e), this._bufferSize = this._buffer.length);
      }, s.prototype._trySend = function (e) {
        var t = this;
        if (!this.open) return !1;
        if (this.dataChannel.bufferedAmount > s.MAX_BUFFERED_AMOUNT) return (this._buffering = !0, setTimeout(function () {
          (t._buffering = !1, t._tryBuffer());
        }, 50), !1);
        try {
          this.dataChannel.send(e);
        } catch (n) {
          return (o.default.error("DC#:" + this.connectionId + " Error when sending:", n), this._buffering = !0, this.close(), !1);
        }
        return !0;
      }, s.prototype._tryBuffer = function () {
        if (this.open && 0 !== this._buffer.length) {
          var e = this._buffer[0];
          this._trySend(e) && (this._buffer.shift(), this._bufferSize = this._buffer.length, this._tryBuffer());
        }
      }, s.prototype._sendChunks = function (e) {
        var n, r, a = i.util.chunk(e);
        o.default.log("DC#" + this.connectionId + " Try to send " + a.length + " chunks...");
        try {
          for (var s = t(a), u = s.next(); !u.done; u = s.next()) {
            var l = u.value;
            this.send(l, !0);
          }
        } catch (f) {
          n = {
            error: f
          };
        } finally {
          try {
            u && !u.done && (r = s.return) && r.call(s);
          } finally {
            if (n) throw n.error;
          }
        }
      }, s.prototype.handleMessage = function (e) {
        var t = e.payload;
        switch (e.type) {
          case a.ServerMessageType.Answer:
            this._negotiator.handleSDP(e.type, t.sdp);
            break;
          case a.ServerMessageType.Candidate:
            this._negotiator.handleCandidate(t.candidate);
            break;
          default:
            o.default.warn("Unrecognized message type:", e.type, "from peer:", this.peer);
        }
      }, s.ID_PREFIX = "dc_", s.MAX_BUFFERED_AMOUNT = 8388608, s);
    })(s.BaseConnection);
    exports.DataConnection = l;
  }, {
    "./util": "BHXf",
    "./logger": "WOs9",
    "./negotiator": "HCdX",
    "./enums": "ZRYf",
    "./baseconnection": "tQFK",
    "./encodingQueue": "GGp6"
  }],
  "in7L": [function (require, module, exports) {
    "use strict";
    var t = this && this.__awaiter || (function (t, e, r, o) {
      return new (r || (r = Promise))(function (n, s) {
        function i(t) {
          try {
            a(o.next(t));
          } catch (e) {
            s(e);
          }
        }
        function u(t) {
          try {
            a(o.throw(t));
          } catch (e) {
            s(e);
          }
        }
        function a(t) {
          var e;
          t.done ? n(t.value) : (e = t.value, e instanceof r ? e : new r(function (t) {
            t(e);
          })).then(i, u);
        }
        a((o = o.apply(t, e || [])).next());
      });
    }), e = this && this.__generator || (function (t, e) {
      var r, o, n, s, i = {
        label: 0,
        sent: function () {
          if (1 & n[0]) throw n[1];
          return n[1];
        },
        trys: [],
        ops: []
      };
      return (s = {
        next: u(0),
        throw: u(1),
        return: u(2)
      }, "function" == typeof Symbol && (s[Symbol.iterator] = function () {
        return this;
      }), s);
      function u(s) {
        return function (u) {
          return (function (s) {
            if (r) throw new TypeError("Generator is already executing.");
            for (; i; ) try {
              if ((r = 1, o && (n = 2 & s[0] ? o.return : s[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, s[1])).done)) return n;
              switch ((o = 0, n && (s = [2 & s[0], n.value]), s[0])) {
                case 0:
                case 1:
                  n = s;
                  break;
                case 4:
                  return (i.label++, {
                    value: s[1],
                    done: !1
                  });
                case 5:
                  (i.label++, o = s[1], s = [0]);
                  continue;
                case 7:
                  (s = i.ops.pop(), i.trys.pop());
                  continue;
                default:
                  if (!(n = (n = i.trys).length > 0 && n[n.length - 1]) && (6 === s[0] || 2 === s[0])) {
                    i = 0;
                    continue;
                  }
                  if (3 === s[0] && (!n || s[1] > n[0] && s[1] < n[3])) {
                    i.label = s[1];
                    break;
                  }
                  if (6 === s[0] && i.label < n[1]) {
                    (i.label = n[1], n = s);
                    break;
                  }
                  if (n && i.label < n[2]) {
                    (i.label = n[2], i.ops.push(s));
                    break;
                  }
                  (n[2] && i.ops.pop(), i.trys.pop());
                  continue;
              }
              s = e.call(t, i);
            } catch (u) {
              (s = [6, u], o = 0);
            } finally {
              r = n = 0;
            }
            if (5 & s[0]) throw s[1];
            return {
              value: s[0] ? s[1] : void 0,
              done: !0
            };
          })([s, u]);
        };
      }
    }), r = this && this.__importDefault || (function (t) {
      return t && t.__esModule ? t : {
        default: t
      };
    });
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var o = require("./util"), n = r(require("./logger")), s = (function () {
      function r(t) {
        this._options = t;
      }
      return (r.prototype._buildUrl = function (t) {
        var e = (this._options.secure ? "https://" : "http://") + this._options.host + ":" + this._options.port + this._options.path + this._options.key + "/" + t;
        return e += "?ts=" + new Date().getTime() + Math.random();
      }, r.prototype.retrieveId = function () {
        return t(this, void 0, Promise, function () {
          var t, r, s, i;
          return e(this, function (e) {
            switch (e.label) {
              case 0:
                (t = this._buildUrl("id"), e.label = 1);
              case 1:
                return (e.trys.push([1, 3, , 4]), [4, fetch(t)]);
              case 2:
                if (200 !== (r = e.sent()).status) throw new Error("Error. Status:" + r.status);
                return [2, r.text()];
              case 3:
                throw (s = e.sent(), n.default.error("Error retrieving ID", s), i = "", "/" === this._options.path && this._options.host !== o.util.CLOUD_HOST && (i = " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."), new Error("Could not get an ID from the server." + i));
              case 4:
                return [2];
            }
          });
        });
      }, r.prototype.listAllPeers = function () {
        return t(this, void 0, Promise, function () {
          var t, r, s, i;
          return e(this, function (e) {
            switch (e.label) {
              case 0:
                (t = this._buildUrl("peers"), e.label = 1);
              case 1:
                return (e.trys.push([1, 3, , 4]), [4, fetch(t)]);
              case 2:
                if (200 !== (r = e.sent()).status) {
                  if (401 === r.status) throw (s = "", s = this._options.host === o.util.CLOUD_HOST ? "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key." : "You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.", new Error("It doesn't look like you have permission to list peers IDs. " + s));
                  throw new Error("Error. Status:" + r.status);
                }
                return [2, r.json()];
              case 3:
                throw (i = e.sent(), n.default.error("Error retrieving list peers", i), new Error("Could not get list peers from the server." + i));
              case 4:
                return [2];
            }
          });
        });
      }, r);
    })();
    exports.API = s;
  }, {
    "./util": "BHXf",
    "./logger": "WOs9"
  }],
  "Hxpd": [function (require, module, exports) {
    "use strict";
    var e = this && this.__extends || (function () {
      var e = function (t, n) {
        return (e = Object.setPrototypeOf || ({
          __proto__: []
        }) instanceof Array && (function (e, t) {
          e.__proto__ = t;
        }) || (function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        }))(t, n);
      };
      return function (t, n) {
        function r() {
          this.constructor = t;
        }
        (e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r()));
      };
    })(), t = this && this.__assign || (function () {
      return (t = Object.assign || (function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e;
      })).apply(this, arguments);
    }), n = this && this.__values || (function (e) {
      var t = "function" == typeof Symbol && Symbol.iterator, n = t && e[t], r = 0;
      if (n) return n.call(e);
      if (e && "number" == typeof e.length) return {
        next: function () {
          return (e && r >= e.length && (e = void 0), {
            value: e && e[r++],
            done: !e
          });
        }
      };
      throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }), r = this && this.__read || (function (e, t) {
      var n = "function" == typeof Symbol && e[Symbol.iterator];
      if (!n) return e;
      var r, o, i = n.call(e), s = [];
      try {
        for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; ) s.push(r.value);
      } catch (a) {
        o = {
          error: a
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }
      return s;
    }), o = this && this.__importDefault || (function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    });
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var i = require("eventemitter3"), s = require("./util"), a = o(require("./logger")), c = require("./socket"), l = require("./mediaconnection"), d = require("./dataconnection"), u = require("./enums"), p = require("./api"), h = (function () {
      return function () {};
    })(), f = (function (o) {
      function i(e, n) {
        var r, c = o.call(this) || this;
        return (c._id = null, c._lastServerId = null, c._destroyed = !1, c._disconnected = !1, c._open = !1, c._connections = new Map(), c._lostMessages = new Map(), e && e.constructor == Object ? n = e : e && (r = e.toString()), n = t({
          debug: 0,
          host: s.util.CLOUD_HOST,
          port: s.util.CLOUD_PORT,
          path: "/",
          key: i.DEFAULT_KEY,
          token: s.util.randomToken(),
          config: s.util.defaultConfig
        }, n), c._options = n, "/" === c._options.host && (c._options.host = window.location.hostname), c._options.path && ("/" !== c._options.path[0] && (c._options.path = "/" + c._options.path), "/" !== c._options.path[c._options.path.length - 1] && (c._options.path += "/")), void 0 === c._options.secure && c._options.host !== s.util.CLOUD_HOST ? c._options.secure = s.util.isSecure() : c._options.host == s.util.CLOUD_HOST && (c._options.secure = !0), c._options.logFunction && a.default.setLogFunction(c._options.logFunction), a.default.logLevel = c._options.debug || 0, c._api = new p.API(n), c._socket = c._createServerConnection(), s.util.supports.audioVideo || s.util.supports.data ? r && !s.util.validateId(r) ? (c._delayedAbort(u.PeerErrorType.InvalidID, 'ID "' + r + '" is invalid'), c) : (r ? c._initialize(r) : c._api.retrieveId().then(function (e) {
          return c._initialize(e);
        }).catch(function (e) {
          return c._abort(u.PeerErrorType.ServerError, e);
        }), c) : (c._delayedAbort(u.PeerErrorType.BrowserIncompatible, "The current browser does not support WebRTC"), c));
      }
      return (e(i, o), Object.defineProperty(i.prototype, "id", {
        get: function () {
          return this._id;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(i.prototype, "options", {
        get: function () {
          return this._options;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(i.prototype, "open", {
        get: function () {
          return this._open;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(i.prototype, "socket", {
        get: function () {
          return this._socket;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(i.prototype, "connections", {
        get: function () {
          var e, t, o = Object.create(null);
          try {
            for (var i = n(this._connections), s = i.next(); !s.done; s = i.next()) {
              var a = r(s.value, 2), c = a[0], l = a[1];
              o[c] = l;
            }
          } catch (d) {
            e = {
              error: d
            };
          } finally {
            try {
              s && !s.done && (t = i.return) && t.call(i);
            } finally {
              if (e) throw e.error;
            }
          }
          return o;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(i.prototype, "destroyed", {
        get: function () {
          return this._destroyed;
        },
        enumerable: !0,
        configurable: !0
      }), Object.defineProperty(i.prototype, "disconnected", {
        get: function () {
          return this._disconnected;
        },
        enumerable: !0,
        configurable: !0
      }), i.prototype._createServerConnection = function () {
        var e = this, t = new c.Socket(this._options.secure, this._options.host, this._options.port, this._options.path, this._options.key, this._options.pingInterval);
        return (t.on(u.SocketEventType.Message, function (t) {
          e._handleMessage(t);
        }), t.on(u.SocketEventType.Error, function (t) {
          e._abort(u.PeerErrorType.SocketError, t);
        }), t.on(u.SocketEventType.Disconnected, function () {
          e.disconnected || (e.emitError(u.PeerErrorType.Network, "Lost connection to server."), e.disconnect());
        }), t.on(u.SocketEventType.Close, function () {
          e.disconnected || e._abort(u.PeerErrorType.SocketClosed, "Underlying socket is already closed.");
        }), t);
      }, i.prototype._initialize = function (e) {
        (this._id = e, this.socket.start(e, this._options.token));
      }, i.prototype._handleMessage = function (e) {
        var t, r, o = e.type, i = e.payload, s = e.src;
        switch (o) {
          case u.ServerMessageType.Open:
            (this._lastServerId = this.id, this._open = !0, this.emit(u.PeerEventType.Open, this.id));
            break;
          case u.ServerMessageType.Error:
            this._abort(u.PeerErrorType.ServerError, i.msg);
            break;
          case u.ServerMessageType.IdTaken:
            this._abort(u.PeerErrorType.UnavailableID, 'ID "' + this.id + '" is taken');
            break;
          case u.ServerMessageType.InvalidKey:
            this._abort(u.PeerErrorType.InvalidKey, 'API KEY "' + this._options.key + '" is invalid');
            break;
          case u.ServerMessageType.Leave:
            (a.default.log("Received leave message from " + s), this._cleanupPeer(s), this._connections.delete(s));
            break;
          case u.ServerMessageType.Expire:
            this.emitError(u.PeerErrorType.PeerUnavailable, "Could not connect to peer " + s);
            break;
          case u.ServerMessageType.Offer:
            var c = i.connectionId;
            if (((_ = this.getConnection(s, c)) && (_.close(), a.default.warn("Offer received for existing Connection ID:" + c)), i.type === u.ConnectionType.Media)) (_ = new l.MediaConnection(s, this, {
              connectionId: c,
              _payload: i,
              metadata: i.metadata
            }), this._addConnection(s, _), this.emit(u.PeerEventType.Call, _)); else {
              if (i.type !== u.ConnectionType.Data) return void a.default.warn("Received malformed connection type:" + i.type);
              (_ = new d.DataConnection(s, this, {
                connectionId: c,
                _payload: i,
                metadata: i.metadata,
                label: i.label,
                serialization: i.serialization,
                reliable: i.reliable
              }), this._addConnection(s, _), this.emit(u.PeerEventType.Connection, _));
            }
            var p = this._getMessages(c);
            try {
              for (var h = n(p), f = h.next(); !f.done; f = h.next()) {
                var y = f.value;
                _.handleMessage(y);
              }
            } catch (v) {
              t = {
                error: v
              };
            } finally {
              try {
                f && !f.done && (r = h.return) && r.call(h);
              } finally {
                if (t) throw t.error;
              }
            }
            break;
          default:
            if (!i) return void a.default.warn("You received a malformed message from " + s + " of type " + o);
            var _;
            c = i.connectionId;
            (_ = this.getConnection(s, c)) && _.peerConnection ? _.handleMessage(e) : c ? this._storeMessage(c, e) : a.default.warn("You received an unrecognized message:", e);
        }
      }, i.prototype._storeMessage = function (e, t) {
        (this._lostMessages.has(e) || this._lostMessages.set(e, []), this._lostMessages.get(e).push(t));
      }, i.prototype._getMessages = function (e) {
        var t = this._lostMessages.get(e);
        return t ? (this._lostMessages.delete(e), t) : [];
      }, i.prototype.connect = function (e, t) {
        if ((void 0 === t && (t = {}), this.disconnected)) return (a.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."), void this.emitError(u.PeerErrorType.Disconnected, "Cannot connect to new Peer after disconnecting from server."));
        var n = new d.DataConnection(e, this, t);
        return (this._addConnection(e, n), n);
      }, i.prototype.call = function (e, t, n) {
        if ((void 0 === n && (n = {}), this.disconnected)) return (a.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."), void this.emitError(u.PeerErrorType.Disconnected, "Cannot connect to new Peer after disconnecting from server."));
        if (t) {
          n._stream = t;
          var r = new l.MediaConnection(e, this, n);
          return (this._addConnection(e, r), r);
        }
        a.default.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");
      }, i.prototype._addConnection = function (e, t) {
        (a.default.log("add connection " + t.type + ":" + t.connectionId + " to peerId:" + e), this._connections.has(e) || this._connections.set(e, []), this._connections.get(e).push(t));
      }, i.prototype._removeConnection = function (e) {
        var t = this._connections.get(e.peer);
        if (t) {
          var n = t.indexOf(e);
          -1 !== n && t.splice(n, 1);
        }
        this._lostMessages.delete(e.connectionId);
      }, i.prototype.getConnection = function (e, t) {
        var r, o, i = this._connections.get(e);
        if (!i) return null;
        try {
          for (var s = n(i), a = s.next(); !a.done; a = s.next()) {
            var c = a.value;
            if (c.connectionId === t) return c;
          }
        } catch (l) {
          r = {
            error: l
          };
        } finally {
          try {
            a && !a.done && (o = s.return) && o.call(s);
          } finally {
            if (r) throw r.error;
          }
        }
        return null;
      }, i.prototype._delayedAbort = function (e, t) {
        var n = this;
        setTimeout(function () {
          n._abort(e, t);
        }, 0);
      }, i.prototype._abort = function (e, t) {
        (a.default.error("Aborting!"), this.emitError(e, t), this._lastServerId ? this.disconnect() : this.destroy());
      }, i.prototype.emitError = function (e, t) {
        var n;
        (a.default.error("Error:", t), (n = "string" == typeof t ? new Error(t) : t).type = e, this.emit(u.PeerEventType.Error, n));
      }, i.prototype.destroy = function () {
        this.destroyed || (a.default.log("Destroy peer with ID:" + this.id), this.disconnect(), this._cleanup(), this._destroyed = !0, this.emit(u.PeerEventType.Close));
      }, i.prototype._cleanup = function () {
        var e, t;
        try {
          for (var r = n(this._connections.keys()), o = r.next(); !o.done; o = r.next()) {
            var i = o.value;
            (this._cleanupPeer(i), this._connections.delete(i));
          }
        } catch (s) {
          e = {
            error: s
          };
        } finally {
          try {
            o && !o.done && (t = r.return) && t.call(r);
          } finally {
            if (e) throw e.error;
          }
        }
        this.socket.removeAllListeners();
      }, i.prototype._cleanupPeer = function (e) {
        var t, r, o = this._connections.get(e);
        if (o) try {
          for (var i = n(o), s = i.next(); !s.done; s = i.next()) {
            s.value.close();
          }
        } catch (a) {
          t = {
            error: a
          };
        } finally {
          try {
            s && !s.done && (r = i.return) && r.call(i);
          } finally {
            if (t) throw t.error;
          }
        }
      }, i.prototype.disconnect = function () {
        if (!this.disconnected) {
          var e = this.id;
          (a.default.log("Disconnect peer with ID:" + e), this._disconnected = !0, this._open = !1, this.socket.close(), this._lastServerId = e, this._id = null, this.emit(u.PeerEventType.Disconnected, e));
        }
      }, i.prototype.reconnect = function () {
        if (this.disconnected && !this.destroyed) (a.default.log("Attempting reconnection to server with ID " + this._lastServerId), this._disconnected = !1, this._initialize(this._lastServerId)); else {
          if (this.destroyed) throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");
          if (this.disconnected || this.open) throw new Error("Peer " + this.id + " cannot reconnect because it is not disconnected from the server!");
          a.default.error("In a hurry? We're still trying to make the initial connection!");
        }
      }, i.prototype.listAllPeers = function (e) {
        var t = this;
        (void 0 === e && (e = function (e) {}), this._api.listAllPeers().then(function (t) {
          return e(t);
        }).catch(function (e) {
          return t._abort(u.PeerErrorType.ServerError, e);
        }));
      }, i.DEFAULT_KEY = "peerjs", i);
    })(i.EventEmitter);
    exports.Peer = f;
  }, {
    "eventemitter3": "JJlS",
    "./util": "BHXf",
    "./logger": "WOs9",
    "./socket": "wJlv",
    "./mediaconnection": "dbHP",
    "./dataconnection": "GBTQ",
    "./enums": "ZRYf",
    "./api": "in7L"
  }],
  "iTK6": [function (require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var e = require("./util"), r = require("./peer");
    (exports.peerjs = {
      Peer: r.Peer,
      util: e.util
    }, exports.default = r.Peer, window.peerjs = exports.peerjs, window.Peer = r.Peer);
  }, {
    "./util": "BHXf",
    "./peer": "Hxpd"
  }]
}, {}, ["iTK6"], null);

},{}],"2O4yD":[function(require,module,exports) {

},{}]},{},["JzIzc"], "JzIzc", "parcelRequireb491")

//# sourceMappingURL=index.cf6cddfc.js.map
