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
})({"1uQWV":[function(require,module,exports) {
var define;
!function (t) {
  "use strict";

  var a = t.HTMLCanvasElement && t.HTMLCanvasElement.prototype,
      b = t.Blob && function () {
    try {
      return Boolean(new Blob());
    } catch (t) {
      return !1;
    }
  }(),
      f = b && t.Uint8Array && function () {
    try {
      return 100 === new Blob([new Uint8Array(100)]).size;
    } catch (t) {
      return !1;
    }
  }(),
      B = t.BlobBuilder || t.WebKitBlobBuilder || t.MozBlobBuilder || t.MSBlobBuilder,
      s = /^data:((.*?)(;charset=.*?)?)(;base64)?,/,
      r = (b || B) && t.atob && t.ArrayBuffer && t.Uint8Array && function (t) {
    var e,
        o,
        n,
        a,
        r,
        i,
        l,
        u,
        c = t.match(s);
    if (!c) throw new Error("invalid data URI");

    for (e = c[2] ? c[1] : "text/plain" + (c[3] || ";charset=US-ASCII"), o = !!c[4], n = t.slice(c[0].length), a = (o ? atob : decodeURIComponent)(n), r = new ArrayBuffer(a.length), i = new Uint8Array(r), l = 0; l < a.length; l += 1) {
      i[l] = a.charCodeAt(l);
    }

    return b ? new Blob([f ? i : r], {
      type: e
    }) : ((u = new B()).append(r), u.getBlob(e));
  };

  t.HTMLCanvasElement && !a.toBlob && (a.mozGetAsFile ? a.toBlob = function (t, e, o) {
    var n = this;
    setTimeout(function () {
      o && a.toDataURL && r ? t(r(n.toDataURL(e, o))) : t(n.mozGetAsFile("blob", e));
    });
  } : a.toDataURL && r && (a.msToBlob ? a.toBlob = function (t, e, o) {
    var n = this;
    setTimeout(function () {
      (e && "image/png" !== e || o) && a.toDataURL && r ? t(r(n.toDataURL(e, o))) : t(n.msToBlob(e));
    });
  } : a.toBlob = function (t, e, o) {
    var n = this;
    setTimeout(function () {
      t(r(n.toDataURL(e, o)));
    });
  })), "function" == typeof define && define.amd ? define(function () {
    return r;
  }) : "object" == typeof module && module.exports ? module.exports = r : t.dataURLtoBlob = r;
}(window);
},{}]},{},["1uQWV"], "1uQWV", "parcelRequireb491")

