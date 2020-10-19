(function () {
  function $parcel$interopDefault(a) {
    return a && a.__esModule ? a.default : a;
  }

  var $parcel$global = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
  var $bd72ee1865b930c1fed8ae47f35e91$var$mapping = {};

  function $bd72ee1865b930c1fed8ae47f35e91$var$register(pairs) {
    var keys = Object.keys(pairs);

    for (var i = 0; i < keys.length; i++) {
      $bd72ee1865b930c1fed8ae47f35e91$var$mapping[keys[i]] = pairs[keys[i]];
    }
  }

  function $bd72ee1865b930c1fed8ae47f35e91$var$resolve(id) {
    var resolved = $bd72ee1865b930c1fed8ae47f35e91$var$mapping[id];

    if (resolved == null) {
      throw new Error('Could not resolve bundle with id ' + id);
    }

    return resolved;
  }

  var $bd72ee1865b930c1fed8ae47f35e91$export$register = $bd72ee1865b930c1fed8ae47f35e91$var$register;
  var $bd72ee1865b930c1fed8ae47f35e91$export$resolve = $bd72ee1865b930c1fed8ae47f35e91$var$resolve;
  // ASSET: /Users/andreas/Websites/web-paint/node_modules/@parcel/runtime-js/lib/JSRuntime.js
  $bd72ee1865b930c1fed8ae47f35e91$export$register(JSON.parse("{\"1VKh0\":\"index.3595f97d.js\",\"54PPa\":\"brush.67e09586.png\"}"));
  // ASSET: /Users/andreas/Websites/web-paint/node_modules/localforage/dist/localforage.js
  var $deb8a24b4f7515d99389e372129f14$exports = {};
  var $deb8a24b4f7515d99389e372129f14$var$define;

  /*!
      localForage -- Offline Storage, Improved
      Version 1.9.0
      https://localforage.github.io/localForage
      (c) 2013-2017 Mozilla, Apache License 2.0
  */
  (function (f) {
    if (typeof $deb8a24b4f7515d99389e372129f14$exports === "object" && "object" !== "undefined") {
      $deb8a24b4f7515d99389e372129f14$exports = f();
    } else if (typeof $deb8a24b4f7515d99389e372129f14$var$define === "function" && $deb8a24b4f7515d99389e372129f14$var$define.amd) {
      $deb8a24b4f7515d99389e372129f14$var$define([], f);
    } else {
      var g;

      if (typeof window !== "undefined") {
        g = window;
      } else if (typeof $parcel$global !== "undefined") {
        g = $parcel$global;
      } else if (typeof self !== "undefined") {
        g = self;
      } else {
        g = this;
      }

      g.localforage = f();
    }
  })(function () {
    var define, module, exports;
    return function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = "function" == "function" && require;
            if (!u && a) return a(o, !0);
            if (i) return i(o, !0);
            var f = new Error("Cannot find module '" + o + "'");
            throw f.code = "MODULE_NOT_FOUND", f;
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

      var i = "function" == "function" && require;

      for (var o = 0; o < r.length; o++) s(r[o]);

      return s;
    }({
      1: [function (_dereq_, module, exports) {
        (function (global) {
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
            } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
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
          var queue = []; //named nextTick for less confusing stack traces

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
        }).call(this, typeof $parcel$global !== "undefined" ? $parcel$global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}],
      2: [function (_dereq_, module, exports) {
        var immediate = _dereq_(1);
        /* istanbul ignore next */


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
          if (typeof global.Promise !== 'function') {
            global.Promise = _dereq_(2);
          }
        }).call(this, typeof $parcel$global !== "undefined" ? $parcel$global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "2": 2
      }],
      4: [function (_dereq_, module, exports) {
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
          /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
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
            } // We mimic PouchDB here;
            //
            // We test for openDatabase because IE Mobile identifies itself
            // as Safari. Oh the lulz...


            var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
            var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1; // Safari <10.1 does not meet our requirements for IDB support
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
        } // Abstracts constructing a Blob object, so it also works in older
        // browsers that don't support the native Blob constructor. (i.e.
        // old QtWebKit versions, at least).
        // Abstracts constructing a Blob object, so it also works in older
        // browsers that don't support the native Blob constructor. (i.e.
        // old QtWebKit versions, at least).


        function createBlob(parts, properties) {
          /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
          parts = parts || [];
          properties = properties || {};

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
        } // This is CommonJS because lie is an external dependency, so Rollup
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
        } // Some code originally from async_storage.js in
        // [Gaia](https://github.com/mozilla-b2g/gaia).


        var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
        var supportsBlobs = void 0;
        var dbContexts = {};
        var toString = Object.prototype.toString; // Transaction Modes

        var READ_ONLY = 'readonly';
        var READ_WRITE = 'readwrite'; // Transform a binary string to an array buffer, because otherwise
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
        } //
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
              var matchedEdge = navigator.userAgent.match(/Edge\//); // MS Edge pretends to be Chrome 42:
              // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx

              resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
            };
          })["catch"](function () {
            return false; // error, so assume unsupported
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
          var dbContext = dbContexts[dbInfo.name]; // Create a deferred object representing the current database operation.

          var deferredOperation = {};
          deferredOperation.promise = new Promise$1(function (resolve, reject) {
            deferredOperation.resolve = resolve;
            deferredOperation.reject = reject;
          }); // Enqueue the deferred operation.

          dbContext.deferredOperations.push(deferredOperation); // Chain its promise to the database readiness.

          if (!dbContext.dbReady) {
            dbContext.dbReady = deferredOperation.promise;
          } else {
            dbContext.dbReady = dbContext.dbReady.then(function () {
              return deferredOperation.promise;
            });
          }
        }

        function _advanceReadiness(dbInfo) {
          var dbContext = dbContexts[dbInfo.name]; // Dequeue a deferred operation.

          var deferredOperation = dbContext.deferredOperations.pop(); // Resolve its promise (which is part of the database readiness
          // chain of promises).

          if (deferredOperation) {
            deferredOperation.resolve();
            return deferredOperation.promise;
          }
        }

        function _rejectReadiness(dbInfo, err) {
          var dbContext = dbContexts[dbInfo.name]; // Dequeue a deferred operation.

          var deferredOperation = dbContext.deferredOperations.pop(); // Reject its promise (which is part of the database readiness
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
            } // Align the versions to prevent errors.


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
        } // encode a blob for indexeddb engines that don't support blobs


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
        } // decode an encoded blob


        function _decodeBlob(encodedBlob) {
          var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));

          return createBlob([arrayBuff], {
            type: encodedBlob.type
          });
        } // is this one of our fancy encoded blobs?


        function _isEncodedBlob(value) {
          return value && value.__local_forage_encoded_blob;
        } // Specialize the default `ready()` function by making it dependent
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
        } // Try to establish a new db connection to replace the
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
        } // FF doesn't like Promises (micro-tasks) and IDDB store operations,
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
                  } // Reopen the database for upgrading.


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
            forages: [],
            // Shared database.
            db: null,
            // Database readiness (promise).
            dbReady: null,
            // Deferred operations on the database.
            deferredOperations: []
          };
        } // Open the IndexedDB database (automatically creates one if one didn't
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
          } // Get the current context of the database;


          var dbContext = dbContexts[dbInfo.name]; // ...or create a new context.

          if (!dbContext) {
            dbContext = createDbContext(); // Register the new context in the global container.

            dbContexts[dbInfo.name] = dbContext;
          } // Register itself as a running localForage in the current context.


          dbContext.forages.push(self); // Replace the default `ready()` function with the specialized one.

          if (!self._initReady) {
            self._initReady = self.ready;
            self.ready = _fullyReady;
          } // Create an array of initialization states of the related localForages.


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
          } // Take a snapshot of the related localForages.


          var forages = dbContext.forages.slice(0); // Initialize the connection process only when
          // all the related localForages aren't pending.

          return Promise$1.all(initPromises).then(function () {
            dbInfo.db = dbContext.db; // Get the connection or open a new one without upgrade.

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
            self._dbInfo = dbInfo; // Share the final connection amongst related localForages.

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
        } // Iterate over all items stored in database.


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

                      var result = iterator(value, cursor.key, iterationNumber++); // when the iterator callback returns any
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
                  var store = transaction.objectStore(self._dbInfo.storeName); // The reason we don't _save_ null is because IE 10 does
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
                  var store = transaction.objectStore(self._dbInfo.storeName); // We use a Grunt task to make this safe for IE and some
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
                  }; // The request will be also be aborted if we've exceeded our storage
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
          options = typeof options !== 'function' && options || {};

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
        } // Sadly, the best way to save binary data in WebSQL/localStorage is serializing
        // it to Base64, so this is how we store it to prevent very strange errors with less
        // verbose ways of binary <-> string data storage.


        var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var BLOB_TYPE_PREFIX = '~~local_forage_type~';
        var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
        var SERIALIZED_MARKER = '__lfsc__:';
        var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length; // OMG the serializations!

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
            /*jslint bitwise: true */

            bytes[p++] = encoded1 << 2 | encoded2 >> 4;
            bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
            bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
          }

          return buffer;
        } // Converts a buffer to a string to store, serialized, in the backend
        // storage library.


        function bufferToString(buffer) {
          // base64-arraybuffer
          var bytes = new Uint8Array(buffer);
          var base64String = '';
          var i;

          for (i = 0; i < bytes.length; i += 3) {
            /*jslint bitwise: true */
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
        } // Serialize a value, afterwards executing a callback (which usually
        // instructs the `setItem()` callback/promise to be executed). This is how
        // we store binary data with localStorage.


        function serialize(value, callback) {
          var valueType = '';

          if (value) {
            valueType = toString$1.call(value);
          } // Cannot use `value instanceof ArrayBuffer` or such here, as these
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
        } // Deserialize data we've inserted into a value column/field. We place
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
          } // The following code deals with deserializing some kind of Blob or
          // TypedArray. First we separate out the type of data we're dealing
          // with from the data itself.


          var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
          var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
          var blobType; // Backwards-compatible blob type serialization strategy.
          // DBs created with older versions of localForage will simply not have the blob type.

          if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
            var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
            blobType = matcher[1];
            serializedString = serializedString.substring(matcher[0].length);
          }

          var buffer = stringToBuffer(serializedString); // Return the right type based on the code/type set during
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
        } // Open the WebSQL database (automatically creates one if one didn't
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
            } // Create our key/value table if it doesn't exist.


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
                  var result = results.rows.length ? results.rows.item(0).value : null; // Check to see if this is serialized content we need to
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
                    var result = item.value; // Check to see if this is serialized content
                    // we need to unpack.

                    if (result) {
                      result = dbInfo.serializer.deserialize(result);
                    }

                    result = iterator(result, item.key, i + 1); // void(0) prevents problems with redefinition
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
              } // Save the original value to pass to the callback.


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
        } // Deletes every item in the table.
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
        } // Does a simple `COUNT(key)` to get the number of items stored in
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
        } // Return the key located at key index X; essentially gets the key from a
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
        } // https://www.w3.org/TR/webdatabase/#databases
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
          options = typeof options !== 'function' && options || {};

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
            return typeof localStorage !== 'undefined' && 'setItem' in localStorage && // in IE8 typeof localStorage.setItem === 'object'
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
        } // Check if localStorage throws when saving an item


        function checkIfLocalStorageThrows() {
          var localStorageTestKey = '_localforage_support_test';

          try {
            localStorage.setItem(localStorageTestKey, true);
            localStorage.removeItem(localStorageTestKey);
            return false;
          } catch (e) {
            return true;
          }
        } // Check if localStorage is usable and allows to save an item
        // This method checks if localStorage is usable in Safari Private Browsing
        // mode, or in any other case where the available quota for localStorage
        // is 0 and there wasn't any saved items yet.


        function _isLocalStorageUsable() {
          return !checkIfLocalStorageThrows() || localStorage.length > 0;
        } // Config the localStorage backend, using options set in the config.


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
        } // Remove all keys from the datastore, effectively destroying all data in
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
        } // Retrieve an item from the store. Unlike the original async_storage
        // library in Gaia, we don't modify return values at all. If a key's value
        // is `undefined`, we pass that value to the callback function.


        function getItem$2(key, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var result = localStorage.getItem(dbInfo.keyPrefix + key); // If a result was found, parse it from the serialized
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
        } // Iterate over all items in the store.


        function iterate$2(iterator, callback) {
          var self = this;
          var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var keyPrefix = dbInfo.keyPrefix;
            var keyPrefixLength = keyPrefix.length;
            var length = localStorage.length; // We use a dedicated iterator instead of the `i` variable below
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

              var value = localStorage.getItem(key); // If a result was found, parse it from the serialized
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
        } // Same as localStorage's key() method, except takes a callback.


        function key$2(n, callback) {
          var self = this;
          var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var result;

            try {
              result = localStorage.key(n);
            } catch (error) {
              result = null;
            } // Remove the prefix from the key, if a key is found.


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
        } // Supply the number of keys in the datastore to the callback function.


        function length$2(callback) {
          var self = this;
          var promise = self.keys().then(function (keys) {
            return keys.length;
          });
          executeCallback(promise, callback);
          return promise;
        } // Remove an item from the store, nice and simple.


        function removeItem$2(key, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            localStorage.removeItem(dbInfo.keyPrefix + key);
          });
          executeCallback(promise, callback);
          return promise;
        } // Set a key's value and run an optional callback once the value is set.
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
            } // Save the original value to pass to the callback.


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
          options = typeof options !== 'function' && options || {};

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

        var isArray = Array.isArray || function (arg) {
          return Object.prototype.toString.call(arg) === '[object Array]';
        }; // Drivers are stored here when `defineDriver()` is called.
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

        var LocalForage = function () {
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
          } // Set any config values for localForage; can be called anytime before
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
              } // after all config options are set and
              // the driver option is used, try setting it


              if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
              }

              return true;
            } else if (typeof options === 'string') {
              return this._config[options];
            } else {
              return this._config;
            }
          }; // Used to define a custom driver, shared across all instances of
          // localForage.


          LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
            var promise = new Promise$1(function (resolve, reject) {
              try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver'); // A driver name should be defined and not overlap with the
                // library-defined, default drivers.

                if (!driverObject._driver) {
                  reject(complianceError);
                  return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');

                for (var i = 0, len = driverMethods.length; i < len; i++) {
                  var driverMethodName = driverMethods[i]; // when the property is there,
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
                  DriverSupport[driverName] = support; // don't use a then, so that we can define
                  // drivers that have simple _support methods
                  // in a blocking manner

                  resolve();
                };

                if ('_support' in driverObject) {
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
            } // There might be a driver initialization in progress
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
        }(); // The actual localForage object that we expose as a module or via a
        // global. It's extended by pulling in one of our other libraries.


        var localforage_js = new LocalForage();
        module.exports = localforage_js;
      }, {
        "3": 3
      }]
    }, {}, [4])(4);
  });

  function $b8e111961f2a2596f46d4dcf9d6cf0$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function $b8e111961f2a2596f46d4dcf9d6cf0$var$_defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function $b8e111961f2a2596f46d4dcf9d6cf0$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $b8e111961f2a2596f46d4dcf9d6cf0$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $b8e111961f2a2596f46d4dcf9d6cf0$var$_defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function $b8e111961f2a2596f46d4dcf9d6cf0$var$_defineProperty(obj, key, value) {
    if (key in obj) {
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

  var $b8e111961f2a2596f46d4dcf9d6cf0$export$default = /*#__PURE__*/function () {
    function ImageStorage() {
      $b8e111961f2a2596f46d4dcf9d6cf0$var$_classCallCheck(this, ImageStorage);
    }

    $b8e111961f2a2596f46d4dcf9d6cf0$var$_createClass(ImageStorage, null, [{
      key: "loadImageFromStore",
      value: function loadImageFromStore(id, store) {
        var _this = this;

        if (!id) {
          return Promise.reject("Could not load image from empty id.");
        } // First try to load a blob with this id from storage:


        return store.getItem(id).then(function (blob) {
          if (!blob) {
            return Promise.resolve(null);
          }

          var img = _this.imageFromBlob(id, blob);

          return Promise.resolve(img);
        }).then(function (img) {
          if (!img) {
            return Promise.resolve(null);
          }

          return img.decode().then(function () {
            return Promise.resolve(img);
          });
        });
      }
    }, {
      key: "loadImage",
      value: function loadImage(id) {
        return this.loadImageFromStore(id, this._imageStore);
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
      value: function saveImage(id, blob) {
        return this._imageStore.setItem(id, blob).then(function () {
          var event = new Event("imagesaved");
          var elements = document.getElementsByTagName("*");

          for (var i = 0; i < elements.length; i++) {
            elements[i].dispatchEvent(event);
          }
        });
      }
    }, {
      key: "imageKeys",
      value: function imageKeys() {
        return this._imageStore.keys();
      }
    }, {
      key: "iterate",
      value: function iterate(callback) {
        var _this2 = this;

        return this._imageStore.iterate(function (blob, id, iteration) {
          if (blob) {
            callback(_this2.imageFromBlob(id, blob));
          }
        });
      }
    }]);
    return ImageStorage;
  }();

  var $deb8a24b4f7515d99389e372129f14$$interop$default = $parcel$interopDefault($deb8a24b4f7515d99389e372129f14$exports);
  $b8e111961f2a2596f46d4dcf9d6cf0$var$_defineProperty($b8e111961f2a2596f46d4dcf9d6cf0$export$default, "_imageStore", $deb8a24b4f7515d99389e372129f14$$interop$default.createInstance({
    name: "ImageStore"
  }));
  var $b9359d208dd081bd2b14c065b9fbf4$export$config = {
    PagesInBookCount: 16
  };

  function $cc43fdb3a1e9805c499cd9a165b45$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function $cc43fdb3a1e9805c499cd9a165b45$var$_defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function $cc43fdb3a1e9805c499cd9a165b45$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $cc43fdb3a1e9805c499cd9a165b45$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $cc43fdb3a1e9805c499cd9a165b45$var$_defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var $cc43fdb3a1e9805c499cd9a165b45$export$View = /*#__PURE__*/function () {
    function View(id) {
      $cc43fdb3a1e9805c499cd9a165b45$var$_classCallCheck(this, View);
      this._element = document.getElementById(id);

      if (!this._element) {
        console.error("Could not find element with id ".concat(id));
      }

      this.hide();
    }

    $cc43fdb3a1e9805c499cd9a165b45$var$_createClass(View, [{
      key: "clear",
      value: function clear() {
        while (this._element.hasChildNodes()) {
          this._element.removeChild(this._element.firstChild);
        }
      }
    }, {
      key: "show",
      value: function show() {
        this._element.hidden = false;
      }
    }, {
      key: "hide",
      value: function hide() {
        this._element.hidden = true;
      }
    }]);
    return View;
  }();

  function $a96c0e79de025d00c499fd8b5558fd77$var$_typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      $a96c0e79de025d00c499fd8b5558fd77$var$_typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      $a96c0e79de025d00c499fd8b5558fd77$var$_typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return $a96c0e79de025d00c499fd8b5558fd77$var$_typeof(obj);
  }

  function $a96c0e79de025d00c499fd8b5558fd77$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function $a96c0e79de025d00c499fd8b5558fd77$var$_defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function $a96c0e79de025d00c499fd8b5558fd77$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $a96c0e79de025d00c499fd8b5558fd77$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $a96c0e79de025d00c499fd8b5558fd77$var$_defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function $a96c0e79de025d00c499fd8b5558fd77$var$_get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      $a96c0e79de025d00c499fd8b5558fd77$var$_get = Reflect.get;
    } else {
      $a96c0e79de025d00c499fd8b5558fd77$var$_get = function _get(target, property, receiver) {
        var base = $a96c0e79de025d00c499fd8b5558fd77$var$_superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return $a96c0e79de025d00c499fd8b5558fd77$var$_get(target, property, receiver || target);
  }

  function $a96c0e79de025d00c499fd8b5558fd77$var$_superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = $a96c0e79de025d00c499fd8b5558fd77$var$_getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function $a96c0e79de025d00c499fd8b5558fd77$var$_inherits(subClass, superClass) {
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
    if (superClass) $a96c0e79de025d00c499fd8b5558fd77$var$_setPrototypeOf(subClass, superClass);
  }

  function $a96c0e79de025d00c499fd8b5558fd77$var$_setPrototypeOf(o, p) {
    $a96c0e79de025d00c499fd8b5558fd77$var$_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return $a96c0e79de025d00c499fd8b5558fd77$var$_setPrototypeOf(o, p);
  }

  function $a96c0e79de025d00c499fd8b5558fd77$var$_createSuper(Derived) {
    var hasNativeReflectConstruct = $a96c0e79de025d00c499fd8b5558fd77$var$_isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = $a96c0e79de025d00c499fd8b5558fd77$var$_getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = $a96c0e79de025d00c499fd8b5558fd77$var$_getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return $a96c0e79de025d00c499fd8b5558fd77$var$_possibleConstructorReturn(this, result);
    };
  }

  function $a96c0e79de025d00c499fd8b5558fd77$var$_possibleConstructorReturn(self, call) {
    if (call && ($a96c0e79de025d00c499fd8b5558fd77$var$_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return $a96c0e79de025d00c499fd8b5558fd77$var$_assertThisInitialized(self);
  }

  function $a96c0e79de025d00c499fd8b5558fd77$var$_assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function $a96c0e79de025d00c499fd8b5558fd77$var$_isNativeReflectConstruct() {
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

  function $a96c0e79de025d00c499fd8b5558fd77$var$_getPrototypeOf(o) {
    $a96c0e79de025d00c499fd8b5558fd77$var$_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return $a96c0e79de025d00c499fd8b5558fd77$var$_getPrototypeOf(o);
  }

  var $a96c0e79de025d00c499fd8b5558fd77$export$default = /*#__PURE__*/function (_View) {
    $a96c0e79de025d00c499fd8b5558fd77$var$_inherits(BookView, _View);

    var _super = $a96c0e79de025d00c499fd8b5558fd77$var$_createSuper(BookView);

    function BookView(id) {
      var _this;

      $a96c0e79de025d00c499fd8b5558fd77$var$_classCallCheck(this, BookView);
      _this = _super.call(this, id);

      _this._element.addEventListener("imagesaved", function (event) {
        _this.updateImages();
      });

      return _this;
    }

    $a96c0e79de025d00c499fd8b5558fd77$var$_createClass(BookView, [{
      key: "show",
      value: function show() {
        $a96c0e79de025d00c499fd8b5558fd77$var$_get($a96c0e79de025d00c499fd8b5558fd77$var$_getPrototypeOf(BookView.prototype), "show", this).call(this);
        this.updateImages();
      }
    }, {
      key: "updateImages",
      value: function updateImages() {
        this.clear();

        for (var i = 0; i < $b9359d208dd081bd2b14c065b9fbf4$export$config.PagesInBookCount; i++) {
          this.addImage("image" + i);
        }
      }
    }, {
      key: "addImage",
      value: function addImage(id) {
        var _this2 = this;

        var element = document.createElement("div");
        element.classList.add("thumbnail");
        element.addEventListener("click", function (event) {
          if (_this2.onImageSelected) {
            _this2.onImageSelected(id);
          }
        });

        this._element.appendChild(element);

        $b8e111961f2a2596f46d4dcf9d6cf0$export$default.loadImage(id).then(function (img) {
          if (img) {
            element.appendChild(img); //element.style.backgroundImage = 'url(' + img.src + ')';
          }
        });
      }
    }]);
    return BookView;
  }($cc43fdb3a1e9805c499cd9a165b45$export$View);

  function $c0700014e5410fbd14fe5a2077778f83$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function $c0700014e5410fbd14fe5a2077778f83$var$_defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function $c0700014e5410fbd14fe5a2077778f83$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $c0700014e5410fbd14fe5a2077778f83$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $c0700014e5410fbd14fe5a2077778f83$var$_defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var $c0700014e5410fbd14fe5a2077778f83$export$default = /*#__PURE__*/function () {
    function Point(x, y) {
      $c0700014e5410fbd14fe5a2077778f83$var$_classCallCheck(this, Point);
      this.x = x;
      this.y = y;
    }

    $c0700014e5410fbd14fe5a2077778f83$var$_createClass(Point, [{
      key: "copy",
      value: function copy() {
        return new Point(this.x, this.y);
      }
    }], [{
      key: "add",
      value: function add(a, b) {
        return new Point(a.x + b.x, a.y + b.y);
      }
    }, {
      key: "distance",
      value: function distance(a, b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
    }]);
    return Point;
  }();

  function $f4feb4d32693c33e90abcc99e9ad3d98$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function $f4feb4d32693c33e90abcc99e9ad3d98$var$_defineProperty(obj, key, value) {
    if (key in obj) {
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

  var $f4feb4d32693c33e90abcc99e9ad3d98$export$default = function Tool(painter) {
    $f4feb4d32693c33e90abcc99e9ad3d98$var$_classCallCheck(this, Tool);
    $f4feb4d32693c33e90abcc99e9ad3d98$var$_defineProperty(this, "painting", false);
    $f4feb4d32693c33e90abcc99e9ad3d98$var$_defineProperty(this, "pressure", 1);
    this.painter = painter;
    this.mouse = new $c0700014e5410fbd14fe5a2077778f83$export$default(0, 0);
  };

  // ASSET: /Users/andreas/Websites/web-paint/node_modules/@parcel/runtime-js/lib/JSRuntime.js
  var $cd7df7a2e2c7ad8ddfdaf934d95ee0c0$exports = {};

  /* globals document:readonly */
  var $da3a6c17234c5d68d4f1108f53a7bad4$var$bundleURL = null;

  function $da3a6c17234c5d68d4f1108f53a7bad4$var$getBundleURLCached() {
    if (!$da3a6c17234c5d68d4f1108f53a7bad4$var$bundleURL) {
      $da3a6c17234c5d68d4f1108f53a7bad4$var$bundleURL = $da3a6c17234c5d68d4f1108f53a7bad4$var$getBundleURL();
    }

    return $da3a6c17234c5d68d4f1108f53a7bad4$var$bundleURL;
  }

  function $da3a6c17234c5d68d4f1108f53a7bad4$var$getBundleURL() {
    try {
      throw new Error();
    } catch (err) {
      var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

      if (matches) {
        return $da3a6c17234c5d68d4f1108f53a7bad4$var$getBaseURL(matches[0]);
      }
    }

    return '/';
  }

  function $da3a6c17234c5d68d4f1108f53a7bad4$var$getBaseURL(url) {
    return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
  } // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.


  var $da3a6c17234c5d68d4f1108f53a7bad4$export$getBundleURL = $da3a6c17234c5d68d4f1108f53a7bad4$var$getBundleURLCached;
  // ASSET: /Users/andreas/Websites/web-paint/node_modules/@parcel/runtime-js/lib/relative-path.js
  var $e5b69ae2ffddc223b376d75aff9c28$exports = {};
  var $e5b69ae2ffddc223b376d75aff9c28$var$resolve = $bd72ee1865b930c1fed8ae47f35e91$export$resolve;

  $e5b69ae2ffddc223b376d75aff9c28$exports = function (fromId, toId) {
    return $e5b69ae2ffddc223b376d75aff9c28$var$relative($e5b69ae2ffddc223b376d75aff9c28$var$dirname($e5b69ae2ffddc223b376d75aff9c28$var$resolve(fromId)), $e5b69ae2ffddc223b376d75aff9c28$var$resolve(toId));
  };

  function $e5b69ae2ffddc223b376d75aff9c28$var$dirname(_filePath) {
    if (_filePath === '') {
      return '.';
    }

    var filePath = _filePath[_filePath.length - 1] === '/' ? _filePath.slice(0, _filePath.length - 1) : _filePath;
    var slashIndex = filePath.lastIndexOf('/');
    return slashIndex === -1 ? '.' : filePath.slice(0, slashIndex);
  }

  function $e5b69ae2ffddc223b376d75aff9c28$var$relative(from, to) {
    if (from === to) {
      return '';
    }

    var fromParts = from.split('/');

    if (fromParts[0] === '.') {
      fromParts.shift();
    }

    var toParts = to.split('/');

    if (toParts[0] === '.') {
      toParts.shift();
    } // Find where path segments diverge.


    var i;
    var divergeIndex;

    for (i = 0; (i < toParts.length || i < fromParts.length) && divergeIndex == null; i++) {
      if (fromParts[i] !== toParts[i]) {
        divergeIndex = i;
      }
    } // If there are segments from "from" beyond the point of divergence,
    // return back up the path to that point using "..".


    var parts = [];

    for (i = 0; i < fromParts.length - divergeIndex; i++) {
      parts.push('..');
    } // If there are segments from "to" beyond the point of divergence,
    // continue using the remaining segments.


    if (toParts.length > divergeIndex) {
      parts.push.apply(parts, toParts.slice(divergeIndex));
    }

    return parts.join('/');
  }

  var $e5b69ae2ffddc223b376d75aff9c28$export$_dirname = $e5b69ae2ffddc223b376d75aff9c28$var$dirname;
  $e5b69ae2ffddc223b376d75aff9c28$exports._dirname = $e5b69ae2ffddc223b376d75aff9c28$export$_dirname;
  var $e5b69ae2ffddc223b376d75aff9c28$export$_relative = $e5b69ae2ffddc223b376d75aff9c28$var$relative;
  $e5b69ae2ffddc223b376d75aff9c28$exports._relative = $e5b69ae2ffddc223b376d75aff9c28$export$_relative;
  $cd7df7a2e2c7ad8ddfdaf934d95ee0c0$exports = $da3a6c17234c5d68d4f1108f53a7bad4$export$getBundleURL() + $e5b69ae2ffddc223b376d75aff9c28$exports("1VKh0", "54PPa");

  function $f191db9ea22db839268c4d1e22cbe05$var$_typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      $f191db9ea22db839268c4d1e22cbe05$var$_typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      $f191db9ea22db839268c4d1e22cbe05$var$_typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return $f191db9ea22db839268c4d1e22cbe05$var$_typeof(obj);
  }

  function $f191db9ea22db839268c4d1e22cbe05$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function $f191db9ea22db839268c4d1e22cbe05$var$_defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function $f191db9ea22db839268c4d1e22cbe05$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $f191db9ea22db839268c4d1e22cbe05$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $f191db9ea22db839268c4d1e22cbe05$var$_defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function $f191db9ea22db839268c4d1e22cbe05$var$_inherits(subClass, superClass) {
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
    if (superClass) $f191db9ea22db839268c4d1e22cbe05$var$_setPrototypeOf(subClass, superClass);
  }

  function $f191db9ea22db839268c4d1e22cbe05$var$_setPrototypeOf(o, p) {
    $f191db9ea22db839268c4d1e22cbe05$var$_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return $f191db9ea22db839268c4d1e22cbe05$var$_setPrototypeOf(o, p);
  }

  function $f191db9ea22db839268c4d1e22cbe05$var$_createSuper(Derived) {
    var hasNativeReflectConstruct = $f191db9ea22db839268c4d1e22cbe05$var$_isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = $f191db9ea22db839268c4d1e22cbe05$var$_getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = $f191db9ea22db839268c4d1e22cbe05$var$_getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return $f191db9ea22db839268c4d1e22cbe05$var$_possibleConstructorReturn(this, result);
    };
  }

  function $f191db9ea22db839268c4d1e22cbe05$var$_possibleConstructorReturn(self, call) {
    if (call && ($f191db9ea22db839268c4d1e22cbe05$var$_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return $f191db9ea22db839268c4d1e22cbe05$var$_assertThisInitialized(self);
  }

  function $f191db9ea22db839268c4d1e22cbe05$var$_assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function $f191db9ea22db839268c4d1e22cbe05$var$_isNativeReflectConstruct() {
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

  function $f191db9ea22db839268c4d1e22cbe05$var$_getPrototypeOf(o) {
    $f191db9ea22db839268c4d1e22cbe05$var$_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return $f191db9ea22db839268c4d1e22cbe05$var$_getPrototypeOf(o);
  }

  function $f191db9ea22db839268c4d1e22cbe05$var$_defineProperty(obj, key, value) {
    if (key in obj) {
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

  var $cd7df7a2e2c7ad8ddfdaf934d95ee0c0$$interop$default = $parcel$interopDefault($cd7df7a2e2c7ad8ddfdaf934d95ee0c0$exports);

  var $f191db9ea22db839268c4d1e22cbe05$export$default = /*#__PURE__*/function (_Tool) {
    $f191db9ea22db839268c4d1e22cbe05$var$_inherits(PenTool, _Tool);

    var _super = $f191db9ea22db839268c4d1e22cbe05$var$_createSuper(PenTool);

    $f191db9ea22db839268c4d1e22cbe05$var$_createClass(PenTool, [{
      key: "lerp",
      value: function lerp(a, b, alpha) {
        return a * (1 - alpha) + b * alpha;
      }
    }]);

    function PenTool(painter) {
      var _this;

      $f191db9ea22db839268c4d1e22cbe05$var$_classCallCheck(this, PenTool);
      _this = _super.call(this, painter);
      $f191db9ea22db839268c4d1e22cbe05$var$_defineProperty($f191db9ea22db839268c4d1e22cbe05$var$_assertThisInitialized(_this), "_lastPoint", new $c0700014e5410fbd14fe5a2077778f83$export$default(0, 0));
      _this._brush = new Image();

      _this._brush.onload = function () {
        _this._brushCtx.drawImage(_this._brush, 0, 0);

        _this._brushCtx.globalCompositeOperation = "source-in";
      };

      _this._brush.src = $cd7df7a2e2c7ad8ddfdaf934d95ee0c0$$interop$default;
      var brushCanvas = document.createElement("canvas");
      brushCanvas.width = 128;
      brushCanvas.height = 128;
      _this._brushCtx = brushCanvas.getContext("2d", {
        alpha: true
      });
      _this._brushCtx.imageSmoothingQuality = "high";
      _this._brushCtx.imageSmoothingEnabled = true;
      return _this;
    }

    $f191db9ea22db839268c4d1e22cbe05$var$_createClass(PenTool, [{
      key: "down",
      value: function down() {
        // let ctx1 = this.painter.ctx;
        // ctx1.beginPath();
        // ctx1.strokeStyle = this.painter.strokeStyle;
        // ctx1.lineWidth = this.painter.lineWidth;
        // ctx1.lineCap = "round";
        // ctx1.lineJoin = "round";
        this._brushCtx.fillStyle = this.painter.strokeStyle;

        this._brushCtx.fillRect(0, 0, 128, 128);

        this._lastPoint = this.mouse.copy();
        this.move();
      }
    }, {
      key: "brushLine",
      value: function brushLine(ctx, x1, y1, x2, y2) {
        var brushSize = 20,
            diffX = Math.abs(x2 - x1),
            diffY = Math.abs(y2 - y1),
            dist = Math.sqrt(diffX * diffX + diffY * diffY) || 1,
            step = 0.5 * brushSize / dist,
            i = 0,
            t = 0,
            b,
            x,
            y;

        while (i <= dist) {
          t = Math.max(0, Math.min(1, i / dist));
          x = x1 + (x2 - x1) * t;
          y = y1 + (y2 - y1) * t;
          ctx.drawImage(this._brushCtx.canvas, x - brushSize * 0.5, y - brushSize * 0.5, brushSize, brushSize);
          i += step;
        }
      }
    }, {
      key: "move",
      value: function move() {
        if (!this.painting) {
          return;
        }

        var ctx1 = this.painter.ctx;
        var midPoint = new $c0700014e5410fbd14fe5a2077778f83$export$default((this.mouse.x + this._lastPoint.x) * 0.5, (this.mouse.y + this._lastPoint.y) * 0.5);
        var a = this.lerp(0.5, 1.5, this.pressure);
        ctx1.lineWidth = this.painter.lineWidth * a;
        ctx1.globalCompositeOperation = "darken"; // ctx1.quadraticCurveTo(this._lastPoint.x, this._lastPoint.y, midPoint.x, midPoint.y);
        // ctx1.stroke();
        // ctx1.beginPath();
        // ctx1.moveTo(midPoint.x, midPoint.y);

        this.brushLine(ctx1, this._lastPoint.x, this._lastPoint.y, this.mouse.x, this.mouse.y);
        this._lastPoint = this.mouse.copy();
      }
    }, {
      key: "up",
      value: function up() {}
    }]);
    return PenTool;
  }($f4feb4d32693c33e90abcc99e9ad3d98$export$default);

  function $ac18af4049a214fddc6d2d6b5fc40388$var$_typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      $ac18af4049a214fddc6d2d6b5fc40388$var$_typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      $ac18af4049a214fddc6d2d6b5fc40388$var$_typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return $ac18af4049a214fddc6d2d6b5fc40388$var$_typeof(obj);
  }

  function $ac18af4049a214fddc6d2d6b5fc40388$var$_createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = $ac18af4049a214fddc6d2d6b5fc40388$var$_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
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

    var normalCompletion = true,
        didErr = false,
        err;
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

  function $ac18af4049a214fddc6d2d6b5fc40388$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $ac18af4049a214fddc6d2d6b5fc40388$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $ac18af4049a214fddc6d2d6b5fc40388$var$_arrayLikeToArray(o, minLen);
  }

  function $ac18af4049a214fddc6d2d6b5fc40388$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function $ac18af4049a214fddc6d2d6b5fc40388$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function $ac18af4049a214fddc6d2d6b5fc40388$var$_defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function $ac18af4049a214fddc6d2d6b5fc40388$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $ac18af4049a214fddc6d2d6b5fc40388$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $ac18af4049a214fddc6d2d6b5fc40388$var$_defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function $ac18af4049a214fddc6d2d6b5fc40388$var$_inherits(subClass, superClass) {
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
    if (superClass) $ac18af4049a214fddc6d2d6b5fc40388$var$_setPrototypeOf(subClass, superClass);
  }

  function $ac18af4049a214fddc6d2d6b5fc40388$var$_setPrototypeOf(o, p) {
    $ac18af4049a214fddc6d2d6b5fc40388$var$_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return $ac18af4049a214fddc6d2d6b5fc40388$var$_setPrototypeOf(o, p);
  }

  function $ac18af4049a214fddc6d2d6b5fc40388$var$_createSuper(Derived) {
    var hasNativeReflectConstruct = $ac18af4049a214fddc6d2d6b5fc40388$var$_isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = $ac18af4049a214fddc6d2d6b5fc40388$var$_getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = $ac18af4049a214fddc6d2d6b5fc40388$var$_getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return $ac18af4049a214fddc6d2d6b5fc40388$var$_possibleConstructorReturn(this, result);
    };
  }

  function $ac18af4049a214fddc6d2d6b5fc40388$var$_possibleConstructorReturn(self, call) {
    if (call && ($ac18af4049a214fddc6d2d6b5fc40388$var$_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return $ac18af4049a214fddc6d2d6b5fc40388$var$_assertThisInitialized(self);
  }

  function $ac18af4049a214fddc6d2d6b5fc40388$var$_assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function $ac18af4049a214fddc6d2d6b5fc40388$var$_isNativeReflectConstruct() {
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

  function $ac18af4049a214fddc6d2d6b5fc40388$var$_getPrototypeOf(o) {
    $ac18af4049a214fddc6d2d6b5fc40388$var$_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return $ac18af4049a214fddc6d2d6b5fc40388$var$_getPrototypeOf(o);
  }

  var $ac18af4049a214fddc6d2d6b5fc40388$export$Palette = /*#__PURE__*/function (_View) {
    $ac18af4049a214fddc6d2d6b5fc40388$var$_inherits(Palette, _View);

    var _super = $ac18af4049a214fddc6d2d6b5fc40388$var$_createSuper(Palette);

    $ac18af4049a214fddc6d2d6b5fc40388$var$_createClass(Palette, [{
      key: "SelectedIndex",
      get: function get() {
        return this._selectedIndex;
      },
      set: function set(value) {
        this._selectedIndex = value;
        this.updateOption(this._selectedElement, this.SelectedOption);
      }
    }, {
      key: "SelectedOption",
      get: function get() {
        return this._options[this._selectedIndex];
      }
    }]);

    function Palette(id, options) {
      var _this;

      var rightAlign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      $ac18af4049a214fddc6d2d6b5fc40388$var$_classCallCheck(this, Palette);
      _this = _super.call(this, id);
      _this._options = options;
      _this._selectedIndex = 0;

      if (!rightAlign) {
        _this.addSelectedOption();
      }

      var i = 0;

      var _iterator = $ac18af4049a214fddc6d2d6b5fc40388$var$_createForOfIteratorHelper(_this._options),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var option = _step.value;

          _this.addOption(i, option);

          i++;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (rightAlign) {
        _this.addSelectedOption();

        _this._element.classList.add("right-align");
      }

      _this._element.style.width = 80 + 50 * _this._options.length + "px";

      _this.show();

      _this.collapse();

      return _this;
    }

    $ac18af4049a214fddc6d2d6b5fc40388$var$_createClass(Palette, [{
      key: "collapse",
      value: function collapse() {
        this._element.classList.add("collapsed");
      }
    }, {
      key: "expand",
      value: function expand() {
        this._element.classList.remove("collapsed");
      }
    }, {
      key: "toggle",
      value: function toggle() {
        this._element.classList.toggle("collapsed");
      }
    }, {
      key: "addSelectedOption",
      value: function addSelectedOption() {
        var _this2 = this;

        var element = document.createElement("div");
        this._selectedElement = element;
        element.addEventListener("click", function (event) {
          _this2.toggle();
        });
        this.updateOption(element, this.SelectedOption);

        this._element.appendChild(element);
      }
    }, {
      key: "addOption",
      value: function addOption(index, option) {
        var _this3 = this;

        var element = document.createElement("div");
        element.addEventListener("click", function (event) {
          _this3.SelectedIndex = index;

          _this3.collapse();

          if (_this3.onSelectionChanged) {
            _this3.onSelectionChanged(option, index);
          }
        });
        this.updateOption(element, option);

        this._element.appendChild(element);
      }
    }, {
      key: "updateOption",
      value: function updateOption(element, option) {}
    }]);
    return Palette;
  }($cc43fdb3a1e9805c499cd9a165b45$export$View);

  function $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_typeof(obj);
  }

  function $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_inherits(subClass, superClass) {
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
    if (superClass) $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_setPrototypeOf(subClass, superClass);
  }

  function $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_setPrototypeOf(o, p) {
    $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_setPrototypeOf(o, p);
  }

  function $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_createSuper(Derived) {
    var hasNativeReflectConstruct = $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_possibleConstructorReturn(this, result);
    };
  }

  function $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_possibleConstructorReturn(self, call) {
    if (call && ($f9ba97ccfb897d3f1dcc0ce0ef2967$var$_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_assertThisInitialized(self);
  }

  function $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_isNativeReflectConstruct() {
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

  function $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_getPrototypeOf(o) {
    $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_getPrototypeOf(o);
  }

  var $f9ba97ccfb897d3f1dcc0ce0ef2967$export$default = /*#__PURE__*/function (_Palette) {
    $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_inherits(ColorPalette, _Palette);

    var _super = $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_createSuper(ColorPalette);

    function ColorPalette(id) {
      var _this;

      $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_classCallCheck(this, ColorPalette);
      var colors = ["#FFFFFF", "#f5f60d", "#f5650a", "#d50406", "#f50695", "#330496", "#0306c5", "#0692f0", "#06a606", "#026405", "#643403", "#946434", "#b5b5b5", "#848484", "#444444", "#030303"];
      _this = _super.call(this, id, colors);
      _this.SelectedIndex = 15;
      return _this;
    }

    $f9ba97ccfb897d3f1dcc0ce0ef2967$var$_createClass(ColorPalette, [{
      key: "updateOption",
      value: function updateOption(element, option) {
        element.style.background = option;
      }
    }]);
    return ColorPalette;
  }($ac18af4049a214fddc6d2d6b5fc40388$export$Palette);

  function $d4096f91fbf94f71ad02c172685948cd$var$_typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      $d4096f91fbf94f71ad02c172685948cd$var$_typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      $d4096f91fbf94f71ad02c172685948cd$var$_typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return $d4096f91fbf94f71ad02c172685948cd$var$_typeof(obj);
  }

  function $d4096f91fbf94f71ad02c172685948cd$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function $d4096f91fbf94f71ad02c172685948cd$var$_defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function $d4096f91fbf94f71ad02c172685948cd$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $d4096f91fbf94f71ad02c172685948cd$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $d4096f91fbf94f71ad02c172685948cd$var$_defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function $d4096f91fbf94f71ad02c172685948cd$var$_inherits(subClass, superClass) {
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
    if (superClass) $d4096f91fbf94f71ad02c172685948cd$var$_setPrototypeOf(subClass, superClass);
  }

  function $d4096f91fbf94f71ad02c172685948cd$var$_setPrototypeOf(o, p) {
    $d4096f91fbf94f71ad02c172685948cd$var$_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return $d4096f91fbf94f71ad02c172685948cd$var$_setPrototypeOf(o, p);
  }

  function $d4096f91fbf94f71ad02c172685948cd$var$_createSuper(Derived) {
    var hasNativeReflectConstruct = $d4096f91fbf94f71ad02c172685948cd$var$_isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = $d4096f91fbf94f71ad02c172685948cd$var$_getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = $d4096f91fbf94f71ad02c172685948cd$var$_getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return $d4096f91fbf94f71ad02c172685948cd$var$_possibleConstructorReturn(this, result);
    };
  }

  function $d4096f91fbf94f71ad02c172685948cd$var$_possibleConstructorReturn(self, call) {
    if (call && ($d4096f91fbf94f71ad02c172685948cd$var$_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return $d4096f91fbf94f71ad02c172685948cd$var$_assertThisInitialized(self);
  }

  function $d4096f91fbf94f71ad02c172685948cd$var$_assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function $d4096f91fbf94f71ad02c172685948cd$var$_isNativeReflectConstruct() {
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

  function $d4096f91fbf94f71ad02c172685948cd$var$_getPrototypeOf(o) {
    $d4096f91fbf94f71ad02c172685948cd$var$_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return $d4096f91fbf94f71ad02c172685948cd$var$_getPrototypeOf(o);
  }

  var $d4096f91fbf94f71ad02c172685948cd$export$default = /*#__PURE__*/function (_Palette) {
    $d4096f91fbf94f71ad02c172685948cd$var$_inherits(ToolPalette, _Palette);

    var _super = $d4096f91fbf94f71ad02c172685948cd$var$_createSuper(ToolPalette);

    function ToolPalette(id) {
      var _this;

      $d4096f91fbf94f71ad02c172685948cd$var$_classCallCheck(this, ToolPalette);
      var tools = ["∙", "●", "✖︎"];
      _this = _super.call(this, id, tools, true);
      _this.SelectedIndex = 1;
      return _this;
    }

    $d4096f91fbf94f71ad02c172685948cd$var$_createClass(ToolPalette, [{
      key: "updateOption",
      value: function updateOption(element, option) {
        element.innerText = option;
      }
    }]);
    return ToolPalette;
  }($ac18af4049a214fddc6d2d6b5fc40388$export$Palette);

  function $b96df63b3b9c86a18bc9bf111e286887$var$_typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      $b96df63b3b9c86a18bc9bf111e286887$var$_typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      $b96df63b3b9c86a18bc9bf111e286887$var$_typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return $b96df63b3b9c86a18bc9bf111e286887$var$_typeof(obj);
  }

  function $b96df63b3b9c86a18bc9bf111e286887$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function $b96df63b3b9c86a18bc9bf111e286887$var$_defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function $b96df63b3b9c86a18bc9bf111e286887$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $b96df63b3b9c86a18bc9bf111e286887$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $b96df63b3b9c86a18bc9bf111e286887$var$_defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function $b96df63b3b9c86a18bc9bf111e286887$var$_get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      $b96df63b3b9c86a18bc9bf111e286887$var$_get = Reflect.get;
    } else {
      $b96df63b3b9c86a18bc9bf111e286887$var$_get = function _get(target, property, receiver) {
        var base = $b96df63b3b9c86a18bc9bf111e286887$var$_superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return $b96df63b3b9c86a18bc9bf111e286887$var$_get(target, property, receiver || target);
  }

  function $b96df63b3b9c86a18bc9bf111e286887$var$_superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = $b96df63b3b9c86a18bc9bf111e286887$var$_getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function $b96df63b3b9c86a18bc9bf111e286887$var$_inherits(subClass, superClass) {
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
    if (superClass) $b96df63b3b9c86a18bc9bf111e286887$var$_setPrototypeOf(subClass, superClass);
  }

  function $b96df63b3b9c86a18bc9bf111e286887$var$_setPrototypeOf(o, p) {
    $b96df63b3b9c86a18bc9bf111e286887$var$_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return $b96df63b3b9c86a18bc9bf111e286887$var$_setPrototypeOf(o, p);
  }

  function $b96df63b3b9c86a18bc9bf111e286887$var$_createSuper(Derived) {
    var hasNativeReflectConstruct = $b96df63b3b9c86a18bc9bf111e286887$var$_isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = $b96df63b3b9c86a18bc9bf111e286887$var$_getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = $b96df63b3b9c86a18bc9bf111e286887$var$_getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return $b96df63b3b9c86a18bc9bf111e286887$var$_possibleConstructorReturn(this, result);
    };
  }

  function $b96df63b3b9c86a18bc9bf111e286887$var$_possibleConstructorReturn(self, call) {
    if (call && ($b96df63b3b9c86a18bc9bf111e286887$var$_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return $b96df63b3b9c86a18bc9bf111e286887$var$_assertThisInitialized(self);
  }

  function $b96df63b3b9c86a18bc9bf111e286887$var$_assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function $b96df63b3b9c86a18bc9bf111e286887$var$_isNativeReflectConstruct() {
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

  function $b96df63b3b9c86a18bc9bf111e286887$var$_getPrototypeOf(o) {
    $b96df63b3b9c86a18bc9bf111e286887$var$_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return $b96df63b3b9c86a18bc9bf111e286887$var$_getPrototypeOf(o);
  }

  function $b96df63b3b9c86a18bc9bf111e286887$var$_defineProperty(obj, key, value) {
    if (key in obj) {
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

  var $b96df63b3b9c86a18bc9bf111e286887$export$default = /*#__PURE__*/function (_View) {
    $b96df63b3b9c86a18bc9bf111e286887$var$_inherits(PaintView, _View);

    var _super = $b96df63b3b9c86a18bc9bf111e286887$var$_createSuper(PaintView);

    function PaintView(id, onBackClicked) {
      var _this;

      $b96df63b3b9c86a18bc9bf111e286887$var$_classCallCheck(this, PaintView);
      _this = _super.call(this, id);
      $b96df63b3b9c86a18bc9bf111e286887$var$_defineProperty($b96df63b3b9c86a18bc9bf111e286887$var$_assertThisInitialized(_this), "pixelPerfect", true);
      $b96df63b3b9c86a18bc9bf111e286887$var$_defineProperty($b96df63b3b9c86a18bc9bf111e286887$var$_assertThisInitialized(_this), "scaleFactor", 1);
      $b96df63b3b9c86a18bc9bf111e286887$var$_defineProperty($b96df63b3b9c86a18bc9bf111e286887$var$_assertThisInitialized(_this), "width", 1024 * _this.scaleFactor);
      $b96df63b3b9c86a18bc9bf111e286887$var$_defineProperty($b96df63b3b9c86a18bc9bf111e286887$var$_assertThisInitialized(_this), "height", 768 * _this.scaleFactor);
      $b96df63b3b9c86a18bc9bf111e286887$var$_defineProperty($b96df63b3b9c86a18bc9bf111e286887$var$_assertThisInitialized(_this), "strokeStyle", "#000");
      $b96df63b3b9c86a18bc9bf111e286887$var$_defineProperty($b96df63b3b9c86a18bc9bf111e286887$var$_assertThisInitialized(_this), "lineWidth", 8);
      $b96df63b3b9c86a18bc9bf111e286887$var$_defineProperty($b96df63b3b9c86a18bc9bf111e286887$var$_assertThisInitialized(_this), "getPointerEventPosition", function (event) {
        var target = event.target;
        var rect = target.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width * _this.width;
        var y = (event.clientY - rect.top) / rect.height * _this.height;

        if (_this.pixelPerfect) {
          x = Math.round(x);
          y = Math.round(y);
        }

        return new $c0700014e5410fbd14fe5a2077778f83$export$default(x, y);
      });
      var backButton = document.getElementById("back-button");
      backButton.addEventListener('click', function (event) {
        return onBackClicked();
      });
      var canvas = document.getElementById("canvas");
      canvas.width = _this.width;
      canvas.height = _this.height;
      _this.ctx = canvas.getContext("2d", {
        alpha: true
      }); // this.ctx.imageSmoothingQuality = "high";
      // this.ctx.imageSmoothingEnabled = true;

      _this.addEventListeners();

      _this._colorPalette = new $f9ba97ccfb897d3f1dcc0ce0ef2967$export$default("color-palette");

      _this._colorPalette.onSelectionChanged = function (color) {
        return _this.strokeStyle = color;
      };

      _this._toolPalette = new $d4096f91fbf94f71ad02c172685948cd$export$default("tool-palette");

      _this._toolPalette.onSelectionChanged = function (option, index) {
        _this.clear();
      };

      _this.currentTool = new $f191db9ea22db839268c4d1e22cbe05$export$default($b96df63b3b9c86a18bc9bf111e286887$var$_assertThisInitialized(_this));
      return _this;
    }

    $b96df63b3b9c86a18bc9bf111e286887$var$_createClass(PaintView, [{
      key: "addEventListeners",
      value: function addEventListeners() {
        var _this2 = this;

        var canvas = this.ctx.canvas;
        canvas.addEventListener('click', function (event) {
          return event.preventDefault();
        });
        canvas.addEventListener('pointerdown', function (event) {
          return _this2.pointerDown(event);
        });
        canvas.addEventListener('pointermove', function (event) {
          return _this2.pointerMove(event);
        });
        canvas.addEventListener('pointerup', function (event) {
          return _this2.pointerUp(event);
        });
        canvas.addEventListener('pointercancel', function (event) {
          return _this2.pointerCancel(event);
        });
      }
    }, {
      key: "getPointerEventPaintingFlag",
      value: function getPointerEventPaintingFlag(event) {
        switch (event.pointerType) {
          case "touch":
            return true;

          default:
            return event.buttons === 1;
        }
      }
    }, {
      key: "pointerDown",
      value: function pointerDown(event) {
        this._colorPalette.collapse();

        this._toolPalette.collapse();

        if (!this.currentTool) {
          return;
        }

        event.preventDefault();
        this.currentTool.painting = this.getPointerEventPaintingFlag(event);
        this.currentTool.pressure = event.pressure;
        this.currentTool.mouse = this.getPointerEventPosition(event);
        this.currentTool.down(); //console.log("pointer down", this.currentTool.mouse, this.currentTool.painting, event.pointerType, event.pressure);
      }
    }, {
      key: "pointerMove",
      value: function pointerMove(event) {
        if (!this.currentTool) {
          return;
        }

        event.preventDefault();
        this.currentTool.painting = this.getPointerEventPaintingFlag(event);
        this.currentTool.pressure = event.pressure;
        var newMouse = this.getPointerEventPosition(event);
        var delta = $c0700014e5410fbd14fe5a2077778f83$export$default.distance(this.currentTool.mouse, newMouse);

        if (delta > 3) {
          this.currentTool.mouse = newMouse;
          this.currentTool.move();
        } //console.log("pointer move", this.currentTool.mouse, this.currentTool.painting, event.pointerType, event.pressure);

      }
    }, {
      key: "pointerUp",
      value: function pointerUp(event) {
        if (!this.currentTool) {
          return;
        }

        event.preventDefault();
        this.currentTool.painting = this.getPointerEventPaintingFlag(event);
        this.currentTool.mouse = this.getPointerEventPosition(event);
        this.currentTool.up(); //console.log("pointer up", this.currentTool.mouse, this.currentTool.painting, event.pointerType);
        // if (this.strokeFinished){
        //     this.strokeFinished();
        // }
      }
    }, {
      key: "pointerCancel",
      value: function pointerCancel(event) {
        if (!this.currentTool) {
          return;
        }

        event.preventDefault(); //console.log("pointer cancel", this.currentTool.mouse, this.currentTool.painting, event.pointerType);
      }
    }, {
      key: "clear",
      value: function clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
      }
    }, {
      key: "fill",
      value: function fill() {
        this.ctx.fillStyle = this.strokeStyle;
        this.ctx.fillRect(0, 0, this.width, this.height);
      }
    }, {
      key: "loadImage",
      value: function loadImage(id) {
        var _this3 = this;

        return $b8e111961f2a2596f46d4dcf9d6cf0$export$default.loadImage(id).then(function (image) {
          _this3.imageId = id;

          _this3.clear();

          if (image) {
            _this3.ctx.drawImage(image, 0, 0);
          }
        });
      }
    }, {
      key: "saveImage",
      value: function saveImage() {
        var _this4 = this;

        this.ctx.canvas.toBlob(function (blob) {
          return $b8e111961f2a2596f46d4dcf9d6cf0$export$default.saveImage(_this4.imageId, blob);
        });
      }
    }, {
      key: "hide",
      value: function hide() {
        if (this.imageId) {
          this.saveImage();
        }

        $b96df63b3b9c86a18bc9bf111e286887$var$_get($b96df63b3b9c86a18bc9bf111e286887$var$_getPrototypeOf(PaintView.prototype), "hide", this).call(this);
      }
    }]);
    return PaintView;
  }($cc43fdb3a1e9805c499cd9a165b45$export$View);

  function $cfcec1aeb63c6de2f3ec6f1ba5ce39$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function $cfcec1aeb63c6de2f3ec6f1ba5ce39$var$_defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function $cfcec1aeb63c6de2f3ec6f1ba5ce39$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $cfcec1aeb63c6de2f3ec6f1ba5ce39$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $cfcec1aeb63c6de2f3ec6f1ba5ce39$var$_defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var $cfcec1aeb63c6de2f3ec6f1ba5ce39$var$App = /*#__PURE__*/function () {
    // private libraryView: LibraryView;
    //
    // private painter: Painter;
    // private toolbar: Toolbar;
    // private colorPalette: ColorPalette;
    // private penTool: PenTool;
    // private crayonTool: CrayonTool;
    // private paintBucketTool: PaintBucketTool;
    // private eraserTool: EraserTool;
    function App() {
      var _this = this;

      $cfcec1aeb63c6de2f3ec6f1ba5ce39$var$_classCallCheck(this, App);
      // this.libraryView = new LibraryView("library");
      // this.libraryView.onBookSelected = (book: IBook) => this.openBook(book);
      // this.activeView = this.libraryView;
      //
      this.bookView = new $a96c0e79de025d00c499fd8b5558fd77$export$default("book");

      this.bookView.onImageSelected = function (id) {
        _this.openView(_this.paintView);

        _this.paintView.loadImage(id);
      }; // this.bookView.onDeleteImage = (image: HTMLImageElement) => this.deleteImage(image)


      this.paintView = new $b96df63b3b9c86a18bc9bf111e286887$export$default("paint", function () {
        _this.openView(_this.bookView);
      }); //
      // this.painter = new Painter(<HTMLElement>document.getElementById("layers"));
      // this.painter.lineWidth = 10;
      // this.painter.strokeFinished = () => this.saveImage()
      //
      // this.penTool = new PenTool(this.painter);
      // this.crayonTool = new CrayonTool(this.painter);
      // this.paintBucketTool = new PaintBucketTool(this.painter);
      // this.eraserTool = new EraserTool(this.painter);
      //
      // this.painter.currentTool = this.penTool;
      //
      // this.toolbar = new Toolbar("toolbar");
      // this.toolbar.addToolButton("✏️", () => this.painter.currentTool = this.penTool);
      // this.toolbar.addToolButton("🖍", () => this.painter.currentTool = this.crayonTool);
      // this.toolbar.addToolButton("🖌️", () => this.painter.currentTool = this.paintBucketTool);
      // this.toolbar.addToolButton("🧽", () => this.painter.currentTool = this.eraserTool);
      // this.toolbar.addActionButton("🧻", (event: MouseEvent) => {
      //     this.painter.clear(event.altKey);
      //     this.saveImage();
      // });
      //
      // this.colorPalette = new ColorPalette("color-palette");
      // this.colorPalette.selectionChanged = () => this.painter.strokeStyle = this.colorPalette.selectedColor

      this.openView(this.bookView);
    }

    $cfcec1aeb63c6de2f3ec6f1ba5ce39$var$_createClass(App, [{
      key: "openView",
      value: function openView(view) {
        if (this.activeView) {
          this.activeView.hide();
        }

        this.activeView = view;
        this.activeView.show();
      } //
      // saveImage(){
      //     this.painter.saveImage();
      // }
      //
      // private loadImage(image: HTMLImageElement) {
      //     this.painter.loadOrCreateImage(image.id)
      //         .then(() => this.bookView.hide())
      //         .catch(() => console.error(`Could not load image '${image.id}'`))
      // }
      //

    }, {
      key: "createNewImage",
      value: function createNewImage() {// this.openView(this.paintView)
        // this.painter.newImage(meta);
      } //
      // private deleteImage(image: HTMLImageElement) {
      //     ImageStorage.deleteImage(image.id);
      // }
      //
      // private openBook(book: IBook) {
      //     this.openView(this.bookView);
      //     this.bookView.loadBook(book);
      // }

    }]);
    return App;
  }();

  var $cfcec1aeb63c6de2f3ec6f1ba5ce39$var$app = new $cfcec1aeb63c6de2f3ec6f1ba5ce39$var$App(); // @_old-ignore

  globalThis.app = $cfcec1aeb63c6de2f3ec6f1ba5ce39$var$app;
})();
//# sourceMappingURL=index.3595f97d.js.map
