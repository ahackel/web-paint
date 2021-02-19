/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/CanvasLayer.ts":
/*!*******************************!*\
  !*** ./src/ts/CanvasLayer.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CanvasLayer; }
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/ts/config.ts");
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layer */ "./src/ts/Layer.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var CanvasLayer = /*#__PURE__*/function (_Layer) {
  _inherits(CanvasLayer, _Layer);

  var _super = _createSuper(CanvasLayer);

  function CanvasLayer(parent, id, x, y, width, height) {
    var _this;

    _classCallCheck(this, CanvasLayer);

    _this = _super.call(this, parent, "canvas", id, x, y, width, height);
    _this._ctx = _this.canvas.getContext("2d", {
      alpha: true
    });
    _this._ctx.imageSmoothingQuality = "high";
    _this._ctx.imageSmoothingEnabled = _config__WEBPACK_IMPORTED_MODULE_0__.config.imageSmoothing;
    return _this;
  }

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
  }, {
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
      var _ref = rect || {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      },
          x = _ref.x,
          y = _ref.y,
          width = _ref.width,
          height = _ref.height;

      this._ctx.drawImage(image, x, y, width, height);
    }
  }, {
    key: "clear",
    value: function clear(rect) {
      var _ref2 = rect || {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      },
          x = _ref2.x,
          y = _ref2.y,
          width = _ref2.width,
          height = _ref2.height;

      this._ctx.clearRect(x, y, width, height);
    }
  }]);

  return CanvasLayer;
}(_Layer__WEBPACK_IMPORTED_MODULE_1__.default);



/***/ }),

/***/ "./src/ts/History.ts":
/*!***************************!*\
  !*** ./src/ts/History.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "History": function() { return /* binding */ History; }
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/ts/config.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var History = /*#__PURE__*/function () {
  function History() {
    _classCallCheck(this, History);

    this._states = [];
    this._position = -1;
  }

  _createClass(History, [{
    key: "canUndo",
    get: function get() {
      return this._position > 0;
    }
  }, {
    key: "canRedo",
    get: function get() {
      return this._position < this._states.length - 1;
    }
  }, {
    key: "recordState",
    value: function recordState(data) {
      if (this._position == _config__WEBPACK_IMPORTED_MODULE_0__.config.maxUndoSteps - 1) {
        this._states.shift();

        this._position--;
      } // remove all future steps


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
  }]);

  return History;
}();

/***/ }),

/***/ "./src/ts/ImageLayer .ts":
/*!*******************************!*\
  !*** ./src/ts/ImageLayer .ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ImageLayer; }
/* harmony export */ });
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Layer */ "./src/ts/Layer.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var ImageLayer = /*#__PURE__*/function (_Layer) {
  _inherits(ImageLayer, _Layer);

  var _super = _createSuper(ImageLayer);

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

  _createClass(ImageLayer, [{
    key: "image",
    get: function get() {
      return this._element;
    }
  }]);

  return ImageLayer;
}(_Layer__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "./src/ts/Layer.ts":
/*!*************************!*\
  !*** ./src/ts/Layer.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Layer; }
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/ts/config.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/Utils */ "./src/ts/utils/Utils.ts");
/* harmony import */ var _math_Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math/Vector */ "./src/ts/math/Vector.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var Layer = /*#__PURE__*/function () {
  function Layer(parent, tag, id, x, y, width, height) {
    _classCallCheck(this, Layer);

    this._startScale = 1;
    this._startRotation = 0;
    this._position = new _math_Vector__WEBPACK_IMPORTED_MODULE_2__.default(0, 0);
    this._scale = 1;
    this._rotation = 0;
    this._lastTouchStartTime = 0;
    this._pointers = [];
    this._element = document.createElement(tag);
    this._element.id = id;

    this._element.classList.add("layer");

    this._index = 0;
    this._width = width;
    this._height = height;
    this._element.width = width;
    this._element.height = height;
    this._element.style.width = "".concat(width, "em");
    this._element.style.height = "".concat(height, "em");
    this._element.style.pointerEvents = "none";
    parent.appendChild(this._element);
    this.transform(new _math_Vector__WEBPACK_IMPORTED_MODULE_2__.default(x, y), 1, 0);
    this.bindEventListeners();
  }

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
  }, {
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
      this._element.style.width = "".concat(width, "em");
      this._element.style.height = "".concat(height, "em");
      this.transform(new _math_Vector__WEBPACK_IMPORTED_MODULE_2__.default(x, y), this.scale, this.rotation);
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

      if (_utils_Utils__WEBPACK_IMPORTED_MODULE_1__.pointerEventsSupported()) {
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

      if (_utils_Utils__WEBPACK_IMPORTED_MODULE_1__.pointerEventsSupported()) {
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
        if (event.timeStamp < this._lastTouchStartTime + _config__WEBPACK_IMPORTED_MODULE_0__.config.doubleTapDelay) {
          this.doubleTap(event);
        }

        this._lastTouchStartTime = event.timeStamp;

        this._element.addEventListener("pointermove", this.pointerMove);

        this._element.addEventListener("pointerup", this.pointerUp);

        this._pinchCenter = new _math_Vector__WEBPACK_IMPORTED_MODULE_2__.default(this._position.x + 0.5 * this.width, this._position.y + 0.5 * this.height);

        if (event.altKey) {
          var p1 = this.clientToPixel(this._pointers[0]);

          var p2 = this._pinchCenter.clone().multiplyScalar(2).subtract(p1);

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
        if (event.timeStamp < this._lastTouchStartTime + _config__WEBPACK_IMPORTED_MODULE_0__.config.doubleTapDelay) {
          this.doubleTap(event);
        }

        this._lastTouchStartTime = event.timeStamp;

        this._element.addEventListener('touchmove', this.touchMove);

        this._element.addEventListener('touchend', this.touchEnd);

        this._pinchCenter = new _math_Vector__WEBPACK_IMPORTED_MODULE_2__.default(this._position.x + 0.5 * this.width, this._position.y + 0.5 * this.height);

        if (event.altKey) {
          var p1 = this.clientToPixel(event.touches[0]);

          var p2 = this._pinchCenter.clone().multiplyScalar(2).subtract(p1);

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

          var p2 = this._pinchCenter.clone().multiplyScalar(2).subtract(p1);

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
      this._element.style.transform = "translate(".concat(position.x, "em, ").concat(position.y, "em) rotate(").concat(rotation, "rad) scale(").concat(scale, ") translateZ(").concat(index, "px)");
      this._element.style.outlineWidth = "".concat(2 / scale, "em");
      this._element.style.outlineOffset = "-".concat(2 / scale, "em");
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
      this._localDragPosition = position.clone().subtract(this.position);
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
      var center = p1.clone().add(p2).multiplyScalar(0.5);
      this._pinchStartDist = p1.distanceTo(p2);
      this._pinchStartRotation = Math.atan2(p1.y - center.y, p1.x - center.x);
      this._startRotation = this._rotation;
      this._startScale = this._scale;
    }
  }, {
    key: "pinchMove",
    value: function pinchMove(p1, p2) {
      var center = p1.clone().add(p2).multiplyScalar(0.5);
      var distance = p1.distanceTo(p2);
      var angle = Math.atan2(p1.y - center.y, p1.x - center.x);
      var angleChange = angle - this._pinchStartRotation;
      var scale = this._startScale * (distance / this._pinchStartDist);
      scale = _utils_Utils__WEBPACK_IMPORTED_MODULE_1__.clamp(0.1, 10, scale);
      var position = p1.clone().add(p2).multiplyScalar(0.5);
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
      var x = (isPortraitOrientation ? 1 - ny : nx) * _config__WEBPACK_IMPORTED_MODULE_0__.config.width;
      var y = (isPortraitOrientation ? nx : ny) * _config__WEBPACK_IMPORTED_MODULE_0__.config.height;
      return new _math_Vector__WEBPACK_IMPORTED_MODULE_2__.default(x, y);
    }
  }]);

  return Layer;
}();



/***/ }),

/***/ "./src/ts/Toolbar.ts":
/*!***************************!*\
  !*** ./src/ts/Toolbar.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Toolbar": function() { return /* binding */ Toolbar; }
/* harmony export */ });
/* harmony import */ var _views_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./views/View */ "./src/ts/views/View.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var Toolbar = /*#__PURE__*/function (_View) {
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
}(_views_View__WEBPACK_IMPORTED_MODULE_0__.View);

/***/ }),

/***/ "./src/ts/app.ts":
/*!***********************!*\
  !*** ./src/ts/app.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! localforage */ "./node_modules/localforage/dist/localforage.js");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var core_js_stable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/stable */ "./node_modules/core-js/stable/index.js");
/* harmony import */ var core_js_stable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_stable__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _views_BookView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/BookView */ "./src/ts/views/BookView.ts");
/* harmony import */ var _views_PaintView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/PaintView */ "./src/ts/views/PaintView.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./config */ "./src/ts/config.ts");
/* harmony import */ var _views_SettingsView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./views/SettingsView */ "./src/ts/views/SettingsView.ts");
/* harmony import */ var _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./storage/ImageStorage */ "./src/ts/storage/ImageStorage.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



__webpack_require__(/*! ../css/painter.css */ "./src/css/painter.css");




__webpack_require__(/*! blueimp-canvas-to-blob/js/canvas-to-blob */ "./node_modules/blueimp-canvas-to-blob/js/canvas-to-blob.js");

_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_1__.library.add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.fas);
_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_1__.dom.watch(); // required to make 'async' work on old devices: 









var App = /*#__PURE__*/function () {
  function App() {
    var _this = this;

    _classCallCheck(this, App);

    // App.preventOverScroll();
    //PeerToPeer.createInstance();
    this._settingsView = new _views_SettingsView__WEBPACK_IMPORTED_MODULE_8__.default("settings", function () {
      _this.openView(_this._bookView);
    });
    this._sheet = document.getElementById("sheet");
    window.addEventListener('resize', function (event) {
      _this.OnResize();
    });
    this.OnResize();
    this._bookView = new _views_BookView__WEBPACK_IMPORTED_MODULE_5__.default("book", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.openView(_this._settingsView);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    this._bookView.onImageSelected = function (id) {
      _this._paintView.loadImage(id).then(function () {
        _this.openView(_this._paintView);
      });
    };

    this._paintView = new _views_PaintView__WEBPACK_IMPORTED_MODULE_6__.PaintView("paint", function () {
      _this.openView(_this._bookView);
    }); // Dropbox integration is not working yet:
    // this.dropboxAuthView = new DropboxAuthView("dropbox-auth");
    // this.openView(ImageStorage.adapter.isAuthenticated ? this.bookView : this.dropboxAuthView);

    this.openView(this._bookView);
  }

  _createClass(App, [{
    key: "getIOSVersion",
    value: function getIOSVersion() {
      if (/iP(hone|od|ad)/.test(navigator.platform)) {
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
      var horizontalPixelSize = viewWidth / _config__WEBPACK_IMPORTED_MODULE_7__.config.width;
      var verticalPixelSize = viewHeight / _config__WEBPACK_IMPORTED_MODULE_7__.config.height;
      var virtualPixelSize = _config__WEBPACK_IMPORTED_MODULE_7__.config.fullScreenCanvas && !isLargeScreen ? Math.max(horizontalPixelSize, verticalPixelSize) : Math.min(horizontalPixelSize, verticalPixelSize);
      this._sheet.style.fontSize = "".concat(virtualPixelSize, "px");
      this._sheet.style.left = "".concat(portrait ? 0.5 * (docWidth - virtualPixelSize * _config__WEBPACK_IMPORTED_MODULE_7__.config.width) : 0, "px");
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
  }, {
    key: "hash",
    value: function () {
      var _hash = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var path, url, blob, hash;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                path = _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_9__.imageStorage.getImagePath(id);
                console.log(path);
                _context2.next = 4;
                return _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_9__.imageStorage.loadImageUrl(path);

              case 4:
                url = _context2.sent;
                console.log(url);
                _context2.next = 8;
                return fetch(url).then(function (r) {
                  return r.blob();
                });

              case 8:
                blob = _context2.sent;
                console.log(blob);
                _context2.next = 12;
                return _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_9__.imageStorage.generateContentHash(blob);

              case 12:
                hash = _context2.sent;
                console.log(hash);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function hash(_x) {
        return _hash.apply(this, arguments);
      }

      return hash;
    }()
  }], [{
    key: "preventOverScroll",
    value: function preventOverScroll() {
      document.ontouchmove = function (event) {
        event.preventDefault();
      };
    }
  }]);

  return App;
}();

document.addEventListener("DOMContentLoaded", function () {
  // @ts-ignore
  window.app = new App(); // @ts-ignore

  window.localForage = (localforage__WEBPACK_IMPORTED_MODULE_0___default());
});

/***/ }),

/***/ "./src/ts/config.ts":
/*!**************************!*\
  !*** ./src/ts/config.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": function() { return /* binding */ config; }
/* harmony export */ });
var config = {
  debug: true,
  doubleTapDelay: 400,
  longClickDelay: 1000,
  minScrollDistance: 30,
  maxScrollDelay: 500,
  maxShapeCount: 64,
  usePointerEvents: true,
  fullScreenCanvas: true,
  // If true fills the whole screen with the canvas, if false makes sure the whole canvas fits on the screen
  pixelPerfect: false,
  // Make sure to perform painting operations on rounded pixel positions
  imageSmoothing: true,
  // Whether to use smooth pixel filtering or to draw hard pixel edges
  useAutoMask: false,
  maxUndoSteps: 10,
  saveInterval: 5000,
  width: 1024,
  height: 768,
  imageCount: 32,
  useHtmlLog: true,
  dropboxSyncInterval: 30
};

/***/ }),

/***/ "./src/ts/math/Vector.ts":
/*!*******************************!*\
  !*** ./src/ts/math/Vector.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Vector; }
/* harmony export */ });
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Vector = /*#__PURE__*/function () {
  function Vector() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }

  _createClass(Vector, [{
    key: "set",
    value: function set() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      this.x = x;
      this.y = y;
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vector(this.x, this.y);
    }
  }, {
    key: "add",
    value: function add(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    }
  }, {
    key: "subtract",
    value: function subtract(v) {
      this.x -= v.x;
      this.y -= v.y;
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
      this.x = _utils_Utils__WEBPACK_IMPORTED_MODULE_0__.clamp(minX, maxX, this.x);
      this.y = _utils_Utils__WEBPACK_IMPORTED_MODULE_0__.clamp(minY, maxY, this.y);
      return this;
    }
  }, {
    key: "invert",
    value: function invert() {
      this.x *= -1;
      this.y *= -1;
      return this;
    }
  }, {
    key: "multiplyScalar",
    value: function multiplyScalar(s) {
      this.x *= s;
      this.y *= s;
      return this;
    }
  }, {
    key: "divideScalar",
    value: function divideScalar(s) {
      if (s === 0) {
        this.x = 0;
        this.y = 0;
      } else {
        var invScalar = 1 / s;
        this.x *= invScalar;
        this.y *= invScalar;
      }

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
      return this.divideScalar(this.length());
    }
  }, {
    key: "distanceToSq",
    value: function distanceToSq(v) {
      var dx = this.x - v.x,
          dy = this.y - v.y;
      return dx * dx + dy * dy;
    }
  }, {
    key: "distanceTo",
    value: function distanceTo(v) {
      return Math.sqrt(this.distanceToSq(v));
    }
  }, {
    key: "lerp",
    value: function lerp(v, alpha) {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      return this;
    }
  }]);

  return Vector;
}();



/***/ }),

/***/ "./src/ts/palettes/ColorPalette.ts":
/*!*****************************************!*\
  !*** ./src/ts/palettes/ColorPalette.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ColorPalette; }
/* harmony export */ });
/* harmony import */ var _Palette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Palette */ "./src/ts/palettes/Palette.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var ColorPalette = /*#__PURE__*/function (_Palette) {
  _inherits(ColorPalette, _Palette);

  var _super = _createSuper(ColorPalette);

  function ColorPalette(id) {
    var _this;

    _classCallCheck(this, ColorPalette);

    // 16 color Mac palette
    // https://en.wikipedia.org/wiki/List_of_software_palettes#Apple_Macintosh_default_16-color_palette
    // let colors: string[] = [
    //     "#FFFFFF", "#f5f60d", "#f5650a", "#d50406",
    //     "#f50695", "#330496", "#0306c5", "#0692f0",
    //     "#06a606", "#026405", "#643403", "#946434",
    //     "#b5b5b5", "#848484", "#444444", "#030303",
    // ];
    // 32 color palette
    // https://github.com/geoffb/dawnbringer-palettes
    var colors = ["#000000", "#222034", "#45283c", "#663931", "#8f563b", "#df7126", "#d9a066", "#eec39a", "#fbf236", "#99e550", "#6abe30", "#37946e", "#4b692f", "#524b24", "#323c39", "#3f3f74", "#306082", "#5b6ee1", "#639bff", "#5fcde4", "#cbdbfc", "#ffffff", "#9badb7", "#847e87", "#696a6a", "#595652", "#76428a", "#ac3232", "#d95763", "#d77bba", "#8f974a", "#8a6f30"];
    _this = _super.call(this, id, colors);
    _this.selectedIndex = 15;
    return _this;
  }

  _createClass(ColorPalette, [{
    key: "color",
    get: function get() {
      return this.selectedOption;
    },
    set: function set(value) {
      this.selectedOption = value;
    }
  }, {
    key: "updateOptionElement",
    value: function updateOptionElement(element, option) {
      element.style.background = option;
    }
  }]);

  return ColorPalette;
}(_Palette__WEBPACK_IMPORTED_MODULE_0__.Palette);



/***/ }),

/***/ "./src/ts/palettes/GiftPalette.ts":
/*!****************************************!*\
  !*** ./src/ts/palettes/GiftPalette.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ GiftPalette; }
/* harmony export */ });
/* harmony import */ var _Palette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Palette */ "./src/ts/palettes/Palette.ts");
/* harmony import */ var _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storage/ImageStorage */ "./src/ts/storage/ImageStorage.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var GIFT_PATH = "user/gifts";

var GiftPalette = /*#__PURE__*/function (_Palette) {
  _inherits(GiftPalette, _Palette);

  var _super = _createSuper(GiftPalette);

  function GiftPalette(id) {
    var _this;

    _classCallCheck(this, GiftPalette);

    _this = _super.call(this, id, [], true);
    _this.selectedIndex = 0;

    _this.addGifts();

    _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_1__.imageStorage.addChangeListener(function (change, id) {
      if (id.startsWith(GIFT_PATH)) {
        if (change == "save") {
          _this.addGift(id);
        } else if (change == "delete") {
          _this.removeGift(id);
        }
      }
    });
    return _this;
  }

  _createClass(GiftPalette, [{
    key: "addGifts",
    value: function () {
      var _addGifts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var paths, _iterator, _step, path;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_1__.imageStorage.listFolder(GIFT_PATH);

              case 2:
                paths = _context.sent;
                _iterator = _createForOfIteratorHelper(paths);
                _context.prev = 4;

                _iterator.s();

              case 6:
                if ((_step = _iterator.n()).done) {
                  _context.next = 12;
                  break;
                }

                path = _step.value;
                _context.next = 10;
                return this.addGift(path);

              case 10:
                _context.next = 6;
                break;

              case 12:
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](4);

                _iterator.e(_context.t0);

              case 17:
                _context.prev = 17;

                _iterator.f();

                return _context.finish(17);

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 14, 17, 20]]);
      }));

      function addGifts() {
        return _addGifts.apply(this, arguments);
      }

      return addGifts;
    }()
  }, {
    key: "addGift",
    value: function () {
      var _addGift = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(path) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.addOption(path);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addGift(_x) {
        return _addGift.apply(this, arguments);
      }

      return addGift;
    }()
  }, {
    key: "removeGift",
    value: function removeGift(path) {
      var index = this._options.indexOf(path);

      if (index < 0) {
        return;
      }

      this.removeOption(index);

      if (this.selectedIndex == index) {
        // select the following item that now has the same index
        this.selectedIndex = index;
      }
    }
  }, {
    key: "optionLongClicked",
    value: function optionLongClicked(event, option, index) {
      _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_1__.imageStorage.deleteImage(this._options[index]);
    }
  }, {
    key: "updateOptionElement",
    value: function () {
      var _updateOptionElement = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(element, path) {
        var url;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_1__.imageStorage.loadImageUrl(path);

              case 2:
                url = _context3.sent;
                element.style.backgroundImage = "url(\"".concat(url, "\")");

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function updateOptionElement(_x2, _x3) {
        return _updateOptionElement.apply(this, arguments);
      }

      return updateOptionElement;
    }()
  }, {
    key: "updateSelectedOptionElement",
    value: function updateSelectedOptionElement(element, option) {
      element.innerHTML = '<i class="fas fa-gift"></i>';
      element.classList.toggle('hidden', this._options.length == 0);
    }
  }]);

  return GiftPalette;
}(_Palette__WEBPACK_IMPORTED_MODULE_0__.Palette);



/***/ }),

/***/ "./src/ts/palettes/Palette.ts":
/*!************************************!*\
  !*** ./src/ts/palettes/Palette.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Palette": function() { return /* binding */ Palette; }
/* harmony export */ });
/* harmony import */ var _views_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/View */ "./src/ts/views/View.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


 // base class for palettes

var Palette = /*#__PURE__*/function (_View) {
  _inherits(Palette, _View);

  var _super = _createSuper(Palette);

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
    key: "selectedIndex",
    get: function get() {
      return this._selectedIndex;
    },
    set: function set(value) {
      this._selectedIndex = Math.max(0, Math.min(this._options.length - 1, value));
      this.updateSelectedOption();
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
  }, {
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

      if (this._options.length == 0) {
        return;
      }

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

      var index = this._options.length - 1;
      this.addOptionElement(index, value);
      this.updateOptionsWidth();
      this.updateSelectedOption();
      return index;
    }
  }, {
    key: "removeOption",
    value: function removeOption(index) {
      this._options.splice(index, 1);

      this._optionElements[index].remove();

      this._optionElements.splice(index, 1); // update the index assigned to each element:


      this.recreateOptions();

      if (this._options.length == 0) {
        this.collapse();
      }
    }
  }, {
    key: "addSelectedOption",
    value: function addSelectedOption() {
      var _this2 = this;

      var element = document.createElement("div");
      element.classList.add("option");
      this._selectedElement = element;
      _utils_Utils__WEBPACK_IMPORTED_MODULE_1__.addClick(element, function () {
        return _this2.toggle();
      });
      this.updateSelectedOption();

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

      var _iterator = _createForOfIteratorHelper(this._options),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
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
      element.dataset.index = "".concat(index);
      _utils_Utils__WEBPACK_IMPORTED_MODULE_1__.addLongClick(element, function (event) {
        return _this3.optionLongClicked(event, option, index);
      });
      _utils_Utils__WEBPACK_IMPORTED_MODULE_1__.addClick(element, function (event) {
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
  }, {
    key: "updateSelectedOption",
    value: function updateSelectedOption() {
      this.updateSelectedOptionElement(this._selectedElement, this.selectedOption);
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
}(_views_View__WEBPACK_IMPORTED_MODULE_0__.View);

/***/ }),

/***/ "./src/ts/palettes/SendPalette.ts":
/*!****************************************!*\
  !*** ./src/ts/palettes/SendPalette.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SendPalette; }
/* harmony export */ });
/* harmony import */ var _Palette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Palette */ "./src/ts/palettes/Palette.ts");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! localforage */ "./node_modules/localforage/dist/localforage.js");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_1__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var SendPalette = /*#__PURE__*/function (_Palette) {
  _inherits(SendPalette, _Palette);

  var _super = _createSuper(SendPalette);

  function SendPalette(id) {
    var _this;

    _classCallCheck(this, SendPalette);

    _this = _super.call(this, id, [], true);
    _this.selectedIndex = 0;

    _this.addRecipients();

    return _this;
  }

  _createClass(SendPalette, [{
    key: "addRecipients",
    value: function () {
      var _addRecipients = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _yield$localforage$ge;

        var userId, receipients, _iterator, _step, receipient;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return localforage__WEBPACK_IMPORTED_MODULE_1___default().getItem("user-id");

              case 2:
                _context.t1 = _yield$localforage$ge = _context.sent;
                _context.t0 = _context.t1 !== null;

                if (!_context.t0) {
                  _context.next = 6;
                  break;
                }

                _context.t0 = _yield$localforage$ge !== void 0;

              case 6:
                if (!_context.t0) {
                  _context.next = 10;
                  break;
                }

                _context.t2 = _yield$localforage$ge;
                _context.next = 11;
                break;

              case 10:
                _context.t2 = "";

              case 11:
                userId = _context.t2;
                receipients = ["Andreas", "Juri", "Lila"].filter(function (x) {
                  return x != userId;
                });
                _iterator = _createForOfIteratorHelper(receipients);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    receipient = _step.value;
                    console.log(receipient);
                    this.addOption(receipient);
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addRecipients() {
        return _addRecipients.apply(this, arguments);
      }

      return addRecipients;
    }()
  }, {
    key: "updateOptionElement",
    value: function () {
      var _updateOptionElement = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(element, receipient) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                element.innerText = receipient;

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function updateOptionElement(_x, _x2) {
        return _updateOptionElement.apply(this, arguments);
      }

      return updateOptionElement;
    }()
  }, {
    key: "updateSelectedOptionElement",
    value: function updateSelectedOptionElement(element, option) {
      element.innerHTML = '<i class="fas fa-paper-plane"></i>';
      element.classList.toggle('hidden', this._options.length == 0);
    }
  }]);

  return SendPalette;
}(_Palette__WEBPACK_IMPORTED_MODULE_0__.Palette);



/***/ }),

/***/ "./src/ts/palettes/ShapePalette.ts":
/*!*****************************************!*\
  !*** ./src/ts/palettes/ShapePalette.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ShapePalette; }
/* harmony export */ });
/* harmony import */ var _Palette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Palette */ "./src/ts/palettes/Palette.ts");
/* harmony import */ var _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storage/ImageStorage */ "./src/ts/storage/ImageStorage.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var ShapePalette = /*#__PURE__*/function (_Palette) {
  _inherits(ShapePalette, _Palette);

  var _super = _createSuper(ShapePalette);

  function ShapePalette(id) {
    var _this;

    _classCallCheck(this, ShapePalette);

    _this = _super.call(this, id, [], true);
    _this._shapeIds = {};
    _this.selectedIndex = 0;

    _this.addShapes();

    _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_1__.imageStorage.addChangeListener(function (change, id) {
      if (change == "save" && id.startsWith("user/shapes/")) {
        _this.addShape(id);
      }
    });
    return _this;
  }

  _createClass(ShapePalette, [{
    key: "stamp",
    get: function get() {
      return this.selectedOption;
    }
  }, {
    key: "addShapes",
    value: function () {
      var _addShapes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var shapesPaths, _iterator, _step, path;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_1__.imageStorage.listFolder("user/shapes");

              case 2:
                shapesPaths = _context.sent;
                _iterator = _createForOfIteratorHelper(shapesPaths);
                _context.prev = 4;

                _iterator.s();

              case 6:
                if ((_step = _iterator.n()).done) {
                  _context.next = 12;
                  break;
                }

                path = _step.value;
                _context.next = 10;
                return this.addShape(path);

              case 10:
                _context.next = 6;
                break;

              case 12:
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](4);

                _iterator.e(_context.t0);

              case 17:
                _context.prev = 17;

                _iterator.f();

                return _context.finish(17);

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 14, 17, 20]]);
      }));

      function addShapes() {
        return _addShapes.apply(this, arguments);
      }

      return addShapes;
    }()
  }, {
    key: "addShape",
    value: function () {
      var _addShape = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(path) {
        var url;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_1__.imageStorage.loadImageUrl(path);

              case 2:
                url = _context2.sent;
                this._shapeIds[url] = path;
                this.addOption(url);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addShape(_x) {
        return _addShape.apply(this, arguments);
      }

      return addShape;
    }()
  }, {
    key: "optionLongClicked",
    value: function optionLongClicked(event, option, index) {
      this.deleteShape(index);
    }
  }, {
    key: "updateOptionElement",
    value: function updateOptionElement(element, option) {
      element.style.backgroundImage = "url(\"".concat(option, "\")");
    }
  }, {
    key: "updateSelectedOptionElement",
    value: function updateSelectedOptionElement(element, option) {
      element.innerHTML = '<i class="fas fa-shapes"></i>';
    }
  }, {
    key: "deleteShape",
    value: function deleteShape(index) {
      var _this2 = this;

      var option = this._options[index];
      var stampId = this._shapeIds[option];

      if (!stampId) {
        return;
      }

      _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_1__.imageStorage.deleteImage(stampId).then(function () {
        delete _this2._shapeIds[option];

        _this2.removeOption(index);

        if (_this2.selectedIndex == index) {
          // select the following item that now has the same index
          _this2.selectedIndex = index;
        }
      });
    }
  }]);

  return ShapePalette;
}(_Palette__WEBPACK_IMPORTED_MODULE_0__.Palette);



/***/ }),

/***/ "./src/ts/palettes/SizePalette.ts":
/*!****************************************!*\
  !*** ./src/ts/palettes/SizePalette.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SizePalette; }
/* harmony export */ });
/* harmony import */ var _Palette__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Palette */ "./src/ts/palettes/Palette.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var SizePalette = /*#__PURE__*/function (_Palette) {
  _inherits(SizePalette, _Palette);

  var _super = _createSuper(SizePalette);

  function SizePalette(id) {
    var _this;

    _classCallCheck(this, SizePalette);

    var sizes = [2, 8, 24, 40];
    _this = _super.call(this, id, sizes, true);
    _this.selectedIndex = 1;
    return _this;
  }

  _createClass(SizePalette, [{
    key: "size",
    get: function get() {
      return this.selectedOption;
    },
    set: function set(value) {
      this.selectedOption = value;
    }
  }, {
    key: "updateOptionElement",
    value: function updateOptionElement(element, option) {
      var width = option / 40;
      element.innerHTML = '<div class="line-width" style="width:' + width + 'em"></div>';
    }
  }]);

  return SizePalette;
}(_Palette__WEBPACK_IMPORTED_MODULE_0__.Palette);



/***/ }),

/***/ "./src/ts/storage/DropboxStorage.ts":
/*!******************************************!*\
  !*** ./src/ts/storage/DropboxStorage.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dropboxStorage": function() { return /* binding */ dropboxStorage; }
/* harmony export */ });
/* harmony import */ var dropbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dropbox */ "./node_modules/dropbox/dist/Dropbox-sdk.min.js");
/* harmony import */ var dropbox__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dropbox__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! localforage */ "./node_modules/localforage/dist/localforage.js");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ImageStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ImageStorage */ "./src/ts/storage/ImageStorage.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config */ "./src/ts/config.ts");
/* harmony import */ var _utils_FileSync__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/FileSync */ "./src/ts/utils/FileSync.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var CLIENT_ID = 'dyfw7wk3nb2utzo';

var FileSet = /*#__PURE__*/function () {
  function FileSet() {
    _classCallCheck(this, FileSet);
  }

  _createClass(FileSet, [{
    key: "copyTo",
    value: function () {
      var _copyTo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(itemId, filesB) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = filesB;
                _context.t1 = itemId;
                _context.next = 4;
                return this.load(itemId);

              case 4:
                _context.t2 = _context.sent;
                _context.t3 = this.getHash(itemId);
                _context.next = 8;
                return _context.t0.add.call(_context.t0, _context.t1, _context.t2, _context.t3);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function copyTo(_x, _x2) {
        return _copyTo.apply(this, arguments);
      }

      return copyTo;
    }()
  }, {
    key: "getHash",
    value: function getHash(id) {
      var _this$_files$get;

      return (_this$_files$get = this._files.get(id)) === null || _this$_files$get === void 0 ? void 0 : _this$_files$get.hash;
    }
  }, {
    key: "has",
    value: function has(id) {
      return this._files.has(id);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this._files.keys();
    }
  }]);

  return FileSet;
}();

var clientFileSet = /*#__PURE__*/function (_FileSet) {
  _inherits(clientFileSet, _FileSet);

  var _super = _createSuper(clientFileSet);

  function clientFileSet() {
    _classCallCheck(this, clientFileSet);

    return _super.apply(this, arguments);
  }

  _createClass(clientFileSet, [{
    key: "setPath",
    value: function () {
      var _setPath = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(path) {
        var ids, _iterator, _step, _id;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._rootPath = path;
                _context2.next = 3;
                return _ImageStorage__WEBPACK_IMPORTED_MODULE_2__.imageStorage.listFolder(path);

              case 3:
                ids = _context2.sent;
                this._files = new Map();
                _iterator = _createForOfIteratorHelper(ids);
                _context2.prev = 6;

                _iterator.s();

              case 8:
                if ((_step = _iterator.n()).done) {
                  _context2.next = 19;
                  break;
                }

                _id = _step.value;
                _context2.t0 = this._files;
                _context2.t1 = _id;
                _context2.next = 14;
                return _ImageStorage__WEBPACK_IMPORTED_MODULE_2__.imageStorage.getHash(_id);

              case 14:
                _context2.t2 = _context2.sent;
                _context2.t3 = {
                  hash: _context2.t2
                };

                _context2.t0.set.call(_context2.t0, _context2.t1, _context2.t3);

              case 17:
                _context2.next = 8;
                break;

              case 19:
                _context2.next = 24;
                break;

              case 21:
                _context2.prev = 21;
                _context2.t4 = _context2["catch"](6);

                _iterator.e(_context2.t4);

              case 24:
                _context2.prev = 24;

                _iterator.f();

                return _context2.finish(24);

              case 27:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[6, 21, 24, 27]]);
      }));

      function setPath(_x3) {
        return _setPath.apply(this, arguments);
      }

      return setPath;
    }()
  }, {
    key: "add",
    value: function () {
      var _add = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, content, hash) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log("save " + id);
                _context3.next = 3;
                return _ImageStorage__WEBPACK_IMPORTED_MODULE_2__.imageStorage.saveImage(id, content, hash);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function add(_x4, _x5, _x6) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                console.log("delete " + id);
                _context4.next = 3;
                return _ImageStorage__WEBPACK_IMPORTED_MODULE_2__.imageStorage.deleteImage(id);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function _delete(_x7) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "load",
    value: function () {
      var _load = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
        var url;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _ImageStorage__WEBPACK_IMPORTED_MODULE_2__.imageStorage.loadImageUrl(id);

              case 2:
                url = _context5.sent;
                return _context5.abrupt("return", fetch(url).then(function (r) {
                  return r.blob();
                }));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function load(_x8) {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }]);

  return clientFileSet;
}(FileSet);

var serverFileSet = /*#__PURE__*/function (_FileSet2) {
  _inherits(serverFileSet, _FileSet2);

  var _super2 = _createSuper(serverFileSet);

  function serverFileSet(dbx) {
    var _this;

    _classCallCheck(this, serverFileSet);

    _this = _super2.call(this);
    _this._dbx = dbx;
    return _this;
  }

  _createClass(serverFileSet, [{
    key: "getCursor",
    value: function getCursor() {
      return this._cursor;
    }
  }, {
    key: "setPath",
    value: function () {
      var _setPath2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(serverRootPath, clientRootPath) {
        var res;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this._serverRoot = "/" + serverRootPath;
                this._clientRoot = clientRootPath;
                this._files = new Map();
                _context6.next = 5;
                return this._dbx.filesListFolder({
                  path: this._serverRoot,
                  recursive: true
                });

              case 5:
                res = _context6.sent;
                this.addServerEntries(res.result.entries);

              case 7:
                if (!res.result.has_more) {
                  _context6.next = 15;
                  break;
                }

                console.log("more");
                _context6.next = 11;
                return this._dbx.filesListFolderContinue({
                  cursor: res.result.cursor
                });

              case 11:
                res = _context6.sent;
                this.addServerEntries(res.result.entries);
                _context6.next = 7;
                break;

              case 15:
                this._cursor = res.result.cursor;

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function setPath(_x9, _x10) {
        return _setPath2.apply(this, arguments);
      }

      return setPath;
    }()
  }, {
    key: "addServerEntries",
    value: function addServerEntries(entries) {
      var serverFiles = entries.filter(function (x) {
        return x.name.endsWith(".png") && x[".tag"] == "file";
      });

      var _iterator2 = _createForOfIteratorHelper(serverFiles),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var file = _step2.value;
          var itemId = this.serverToClientPath(file.path_display);

          this._files.set(itemId, {
            hash: file.content_hash
          });
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "serverToClientPath",
    value: function serverToClientPath(serverPath) {
      return serverPath.replace(this._serverRoot, this._clientRoot);
    }
  }, {
    key: "clientToServerPath",
    value: function clientToServerPath(clientPath) {
      return clientPath.replace(this._clientRoot, this._serverRoot);
    }
  }, {
    key: "add",
    value: function () {
      var _add2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(itemId, contents, hash) {
        var serverPath;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                console.log("upload " + itemId);
                serverPath = this.clientToServerPath(itemId);
                console.log("upload " + itemId + " > " + serverPath);
                _context7.next = 5;
                return this._dbx.filesUpload({
                  path: serverPath,
                  contents: contents,
                  mode: {
                    ".tag": "overwrite"
                  }
                });

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function add(_x11, _x12, _x13) {
        return _add2.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(itemId) {
        var serverPath;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                serverPath = this.clientToServerPath(itemId);
                console.log("delete " + serverPath + " from dropbox");
                _context8.next = 4;
                return this._dbx.filesDeleteV2({
                  path: serverPath
                });

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _delete(_x14) {
        return _delete3.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "load",
    value: function () {
      var _load2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(itemId) {
        var serverPath, res;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                serverPath = this.clientToServerPath(itemId);
                console.log("download " + serverPath + " > " + itemId);
                _context9.next = 4;
                return this._dbx.filesDownload({
                  path: serverPath
                });

              case 4:
                res = _context9.sent;

                if (!(res.status == 200)) {
                  _context9.next = 7;
                  break;
                }

                return _context9.abrupt("return", res.result.fileBlob);

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function load(_x15) {
        return _load2.apply(this, arguments);
      }

      return load;
    }()
  }]);

  return serverFileSet;
}(FileSet);

var FileSyncStatus = /*#__PURE__*/function () {
  function FileSyncStatus() {
    _classCallCheck(this, FileSyncStatus);
  }

  _createClass(FileSyncStatus, [{
    key: "setPath",
    value: function () {
      var _setPath3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(path) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                this._rootPath = path;
                _context10.next = 3;
                return this.loadEntries();

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function setPath(_x16) {
        return _setPath3.apply(this, arguments);
      }

      return setPath;
    }()
  }, {
    key: "set",
    value: function () {
      var _set = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(itemId, hashA, hashB) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                this._entries.set(itemId, {
                  hashA: hashA,
                  hashB: hashB
                });

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function set(_x17, _x18, _x19) {
        return _set.apply(this, arguments);
      }

      return set;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(itemId) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                this._entries.delete(itemId);

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function _delete(_x20) {
        return _delete4.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "get",
    value: function get(itemId) {
      return this._entries.get(itemId);
    }
  }, {
    key: "has",
    value: function has(itemId) {
      return this._entries.has(itemId);
    }
  }, {
    key: "loadEntries",
    value: function () {
      var _loadEntries = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var _yield$localforage$ge;

        var pairs;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return localforage__WEBPACK_IMPORTED_MODULE_1___default().getItem("file-sync-status-" + this._rootPath);

              case 2:
                _context13.t1 = _yield$localforage$ge = _context13.sent;
                _context13.t0 = _context13.t1 !== null;

                if (!_context13.t0) {
                  _context13.next = 6;
                  break;
                }

                _context13.t0 = _yield$localforage$ge !== void 0;

              case 6:
                if (!_context13.t0) {
                  _context13.next = 10;
                  break;
                }

                _context13.t2 = _yield$localforage$ge;
                _context13.next = 11;
                break;

              case 10:
                _context13.t2 = [];

              case 11:
                pairs = _context13.t2;
                this._entries = new Map(pairs);

              case 13:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function loadEntries() {
        return _loadEntries.apply(this, arguments);
      }

      return loadEntries;
    }()
  }, {
    key: "saveEntries",
    value: function () {
      var _saveEntries = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var pairs;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                pairs = _toConsumableArray(this._entries);
                _context14.next = 3;
                return localforage__WEBPACK_IMPORTED_MODULE_1___default().setItem("file-sync-status-" + this._rootPath, pairs);

              case 3:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function saveEntries() {
        return _saveEntries.apply(this, arguments);
      }

      return saveEntries;
    }()
  }, {
    key: "getAll",
    value: function getAll() {
      return this._entries.keys();
    }
  }]);

  return FileSyncStatus;
}();

var DropboxStorage = /*#__PURE__*/function () {
  function DropboxStorage() {
    _classCallCheck(this, DropboxStorage);

    this._isAuthorized = false;
    this._longPollStarted = false;
    this._lastSyncDate = 0;
    this.SYNC_BOTH = 0;
    this.SYNC_UPLOAD = 1;
    this.SYNC_DOWNLOAD = 2;
    this.init();
  }

  _createClass(DropboxStorage, [{
    key: "isAuthorized",
    get: function get() {
      return this._isAuthorized;
    }
  }, {
    key: "dbx",
    get: function get() {
      return this._dbx;
    }
  }, {
    key: "userId",
    get: function get() {
      return this._userId;
    },
    set: function set(value) {
      this._userId = value;
      localforage__WEBPACK_IMPORTED_MODULE_1___default().setItem("user-id", value);
    }
  }, {
    key: "lastSyncDate",
    get: function get() {
      return this._lastSyncDate;
    },
    set: function set(value) {
      this._lastSyncDate = value;
      localforage__WEBPACK_IMPORTED_MODULE_1___default().setItem("last-dropbox-sync", value);
    }
  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var _yield$localforage$ge2, _yield$localforage$ge3;

        var token;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return localforage__WEBPACK_IMPORTED_MODULE_1___default().getItem("user-id");

              case 2:
                _context15.t1 = _yield$localforage$ge2 = _context15.sent;
                _context15.t0 = _context15.t1 !== null;

                if (!_context15.t0) {
                  _context15.next = 6;
                  break;
                }

                _context15.t0 = _yield$localforage$ge2 !== void 0;

              case 6:
                if (!_context15.t0) {
                  _context15.next = 10;
                  break;
                }

                _context15.t2 = _yield$localforage$ge2;
                _context15.next = 11;
                break;

              case 10:
                _context15.t2 = "";

              case 11:
                this._userId = _context15.t2;
                _context15.next = 14;
                return localforage__WEBPACK_IMPORTED_MODULE_1___default().getItem("last-dropbox-sync");

              case 14:
                _context15.t4 = _yield$localforage$ge3 = _context15.sent;
                _context15.t3 = _context15.t4 !== null;

                if (!_context15.t3) {
                  _context15.next = 18;
                  break;
                }

                _context15.t3 = _yield$localforage$ge3 !== void 0;

              case 18:
                if (!_context15.t3) {
                  _context15.next = 22;
                  break;
                }

                _context15.t5 = _yield$localforage$ge3;
                _context15.next = 23;
                break;

              case 22:
                _context15.t5 = 0;

              case 23:
                this._lastSyncDate = _context15.t5;
                token = this.getAccessTokenFromUrl();

                if (!token) {
                  _context15.next = 29;
                  break;
                }

                this.authorize(token);
                _context15.next = 33;
                break;

              case 29:
                _context15.next = 31;
                return localforage__WEBPACK_IMPORTED_MODULE_1___default().getItem('dropbox-token');

              case 31:
                token = _context15.sent;

                if (token) {
                  this.authorize(token);
                }

              case 33:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "getAuthenticationUrl",
    value: function getAuthenticationUrl() {
      var auth = new dropbox__WEBPACK_IMPORTED_MODULE_0__.DropboxAuth({
        clientId: CLIENT_ID
      });
      return auth.getAuthenticationUrl(location.href);
    }
  }, {
    key: "sync",
    value: function () {
      var _sync = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        var cursor;
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (!(!this.isAuthorized || !this.userId)) {
                  _context16.next = 2;
                  break;
                }

                return _context16.abrupt("return");

              case 2:
                console.log("Sync default content:");
                _context16.next = 5;
                return this.syncFolder("default", "default");

              case 5:
                console.log("Sync user content:");
                _context16.next = 8;
                return this.syncFolder(this.userId, "user");

              case 8:
                cursor = _context16.sent;
                _context16.next = 11;
                return this.startLongPoll(cursor);

              case 11:
                return _context16.abrupt("return", cursor);

              case 12:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function sync() {
        return _sync.apply(this, arguments);
      }

      return sync;
    }()
  }, {
    key: "syncFolder",
    value: function () {
      var _syncFolder = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(serverPath, clientPath) {
        var clientFiles, serverFiles, fileSyncStatus, fileSync, cursor;
        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.prev = 0;
                clientFiles = new clientFileSet();
                _context18.next = 4;
                return clientFiles.setPath(clientPath);

              case 4:
                serverFiles = new serverFileSet(this.dbx);
                _context18.next = 7;
                return serverFiles.setPath(serverPath, clientPath);

              case 7:
                fileSyncStatus = new FileSyncStatus();
                _context18.next = 10;
                return fileSyncStatus.setPath(clientPath);

              case 10:
                fileSync = new _utils_FileSync__WEBPACK_IMPORTED_MODULE_4__.FileSync(clientFiles, serverFiles, fileSyncStatus, /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(id) {
                    return regeneratorRuntime.wrap(function _callee17$(_context17) {
                      while (1) {
                        switch (_context17.prev = _context17.next) {
                          case 0:
                            _context17.next = 2;
                            return clientFiles.copyTo(id, serverFiles);

                          case 2:
                            _context17.next = 4;
                            return fileSyncStatus.set(id, clientFiles.getHash(id), clientFiles.getHash(id));

                          case 4:
                          case "end":
                            return _context17.stop();
                        }
                      }
                    }, _callee17);
                  }));

                  return function (_x23) {
                    return _ref.apply(this, arguments);
                  };
                }());
                _context18.next = 13;
                return fileSync.syncFiles();

              case 13:
                _context18.next = 15;
                return fileSyncStatus.saveEntries();

              case 15:
                cursor = serverFiles.getCursor(); // if (fileSync.modified){
                //     // refresh cursor because we don't want to get updates from dropbox about the files we just posted:
                //     const res = await this.dbx.filesListFolderGetLatestCursor({path: "/" + path, recursive: true});
                //     cursor = res.result.cursor;
                // }

                return _context18.abrupt("return", cursor);

              case 19:
                _context18.prev = 19;
                _context18.t0 = _context18["catch"](0);
                console.log(_context18.t0);

              case 22:
                return _context18.abrupt("return", null);

              case 23:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this, [[0, 19]]);
      }));

      function syncFolder(_x21, _x22) {
        return _syncFolder.apply(this, arguments);
      }

      return syncFolder;
    }()
  }, {
    key: "startLongPoll",
    value: function () {
      var _startLongPoll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(cursor) {
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                if (!this._longPollStarted) {
                  _context19.next = 2;
                  break;
                }

                return _context19.abrupt("return");

              case 2:
                this._longPollStarted = true;
                _context19.next = 5;
                return this.longPoll(cursor);

              case 5:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function startLongPoll(_x24) {
        return _startLongPoll.apply(this, arguments);
      }

      return startLongPoll;
    }()
  }, {
    key: "longPoll",
    value: function () {
      var _longPoll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(cursor) {
        var _res$result$backoff,
            _this2 = this;

        var res, timeout;
        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                if (cursor) {
                  _context20.next = 3;
                  break;
                }

                this._longPollStarted = false;
                return _context20.abrupt("return");

              case 3:
                console.log("polling:");
                _context20.next = 6;
                return this.dbx.filesListFolderLongpoll({
                  cursor: cursor,
                  timeout: _config__WEBPACK_IMPORTED_MODULE_3__.config.dropboxSyncInterval
                });

              case 6:
                res = _context20.sent;

                if (!(res.result.changes || _ImageStorage__WEBPACK_IMPORTED_MODULE_2__.imageStorage.hasChanges)) {
                  _context20.next = 12;
                  break;
                }

                _context20.next = 10;
                return this.sync();

              case 10:
                cursor = _context20.sent;
                _ImageStorage__WEBPACK_IMPORTED_MODULE_2__.imageStorage.hasChanges = false;

              case 12:
                timeout = (_res$result$backoff = res.result.backoff) !== null && _res$result$backoff !== void 0 ? _res$result$backoff : _config__WEBPACK_IMPORTED_MODULE_3__.config.dropboxSyncInterval;
                setTimeout(function () {
                  return _this2.longPoll(cursor);
                }, timeout);

              case 14:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function longPoll(_x25) {
        return _longPoll.apply(this, arguments);
      }

      return longPoll;
    }()
  }, {
    key: "getAccessTokenFromUrl",
    value: function getAccessTokenFromUrl() {
      return this.parseQueryString(window.location.hash).access_token;
    }
  }, {
    key: "parseQueryString",
    value: function parseQueryString(str) {
      var ret = Object.create(null);

      if (typeof str !== 'string') {
        return ret;
      }

      str = str.trim().replace(/^(\?|#|&)/, '');

      if (!str) {
        return ret;
      }

      str.split('&').forEach(function (param) {
        var parts = param.replace(/\+/g, ' ').split('='); // Firefox (pre 40) decodes `%3D` to `=`
        // https://github.com/sindresorhus/query-string/pull/37

        var key = parts.shift();
        var val = parts.length > 0 ? parts.join('=') : undefined;
        key = decodeURIComponent(key); // missing `=` should be `null`:
        // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

        val = val === undefined ? null : decodeURIComponent(val);

        if (ret[key] === undefined) {
          ret[key] = val;
        } else if (Array.isArray(ret[key])) {
          ret[key].push(val);
        } else {
          ret[key] = [ret[key], val];
        }
      });
      return ret;
    }
  }, {
    key: "sendGift",
    value: function () {
      var _sendGift = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(blob, receipient) {
        var id, path;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                id = Date.now().toString() + ".png";
                path = "/" + receipient + "/gifts/" + id;
                console.log("Sending gift to " + path);
                _context21.next = 5;
                return this._dbx.filesUpload({
                  path: path,
                  contents: blob,
                  mode: {
                    ".tag": "overwrite"
                  }
                });

              case 5:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function sendGift(_x26, _x27) {
        return _sendGift.apply(this, arguments);
      }

      return sendGift;
    }()
  }, {
    key: "authorize",
    value: function authorize(token) {
      this._isAuthorized = !!token;

      if (this.isAuthorized) {
        this._dbx = new dropbox__WEBPACK_IMPORTED_MODULE_0__.Dropbox({
          accessToken: token
        });
        localforage__WEBPACK_IMPORTED_MODULE_1___default().setItem('dropbox-token', token);
      }
    }
  }, {
    key: "unauthorize",
    value: function unauthorize() {
      var _this3 = this;

      if (!this.isAuthorized) {
        return;
      }

      this.dbx.authTokenRevoke().then(function () {
        _this3._isAuthorized = false;
        localforage__WEBPACK_IMPORTED_MODULE_1___default().removeItem('dropbox-token');
      });
    }
  }]);

  return DropboxStorage;
}();

var dropboxStorage = new DropboxStorage();

/***/ }),

/***/ "./src/ts/storage/ImageStorage.ts":
/*!****************************************!*\
  !*** ./src/ts/storage/ImageStorage.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "imageStorage": function() { return /* binding */ imageStorage; }
/* harmony export */ });
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
/* harmony import */ var _LocalForageAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LocalForageAdapter */ "./src/ts/storage/LocalForageAdapter.ts");
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jszip */ "./node_modules/jszip/dist/jszip.min.js");
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jszip__WEBPACK_IMPORTED_MODULE_2__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var ImageStorage = /*#__PURE__*/function () {
  function ImageStorage() {
    _classCallCheck(this, ImageStorage);

    this.hasChanges = false;
    this.loadFileMeta();
  }

  _createClass(ImageStorage, [{
    key: "adapter",
    get: function get() {
      if (!this._adapter) {
        this._adapter = new _LocalForageAdapter__WEBPACK_IMPORTED_MODULE_1__.default();
        this.migrate();
      }

      return this._adapter;
    }
  }, {
    key: "urls",
    get: function get() {
      if (!this._urls) {
        this._urls = {};
      }

      return this._urls;
    }
  }, {
    key: "ContainsImage",
    value: function () {
      var _ContainsImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
        var keys;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.keys();

              case 2:
                keys = _context.sent;
                return _context.abrupt("return", keys.includes(id));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function ContainsImage(_x) {
        return _ContainsImage.apply(this, arguments);
      }

      return ContainsImage;
    }()
  }, {
    key: "loadImage",
    value: function () {
      var _loadImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var url, img;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.loadImageUrl(id);

              case 2:
                url = _context2.sent;

                if (url) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", null);

              case 5:
                img = new Image();
                img.id = id;
                img.src = url;

                if (!(img.decode != null)) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 11;
                return img.decode();

              case 11:
                return _context2.abrupt("return", img);

              case 12:
                return _context2.abrupt("return", new Promise(function (resolve) {
                  img.onload = function () {
                    return resolve(img);
                  };
                }));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadImage(_x2) {
        return _loadImage.apply(this, arguments);
      }

      return loadImage;
    }()
  }, {
    key: "loadImageUrl",
    value: function () {
      var _loadImageUrl = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
        var blob, url;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(id in this.urls)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", this.urls[id]);

              case 2:
                _context3.next = 4;
                return this.loadBlob(id);

              case 4:
                blob = _context3.sent;

                if (blob) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", null);

              case 7:
                url = URL.createObjectURL(blob);
                this.urls[id] = url;
                return _context3.abrupt("return", url);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadImageUrl(_x3) {
        return _loadImageUrl.apply(this, arguments);
      }

      return loadImageUrl;
    }()
  }, {
    key: "loadBlob",
    value: function loadBlob(id) {
      return this.adapter.getItem(id);
    }
  }, {
    key: "saveImage",
    value: function () {
      var _saveImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, blob, hash) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.adapter.setItem(id, blob);

              case 3:
                _context4.t0 = this;
                _context4.t1 = id;

                if (!(hash !== null && hash !== void 0)) {
                  _context4.next = 9;
                  break;
                }

                _context4.t2 = hash;
                _context4.next = 12;
                break;

              case 9:
                _context4.next = 11;
                return this.generateContentHash(blob);

              case 11:
                _context4.t2 = _context4.sent;

              case 12:
                _context4.t3 = _context4.t2;
                _context4.next = 15;
                return _context4.t0.setHash.call(_context4.t0, _context4.t1, _context4.t3);

              case 15:
                this.hasChanges = true;
                _context4.next = 20;
                break;

              case 18:
                _context4.prev = 18;
                _context4.t4 = _context4["catch"](0);

              case 20:
                if (id in this.urls) {
                  URL.revokeObjectURL(this.urls[id]);
                }

                this.urls[id] = URL.createObjectURL(blob);
                this.dispatchChangeEvent("save", id);

              case 23:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 18]]);
      }));

      function saveImage(_x4, _x5, _x6) {
        return _saveImage.apply(this, arguments);
      }

      return saveImage;
    }()
  }, {
    key: "deleteImage",
    value: function deleteImage(id) {
      var _this = this;

      return this.adapter.removeItem(id).then(function () {
        if (id in _this.urls) {
          URL.revokeObjectURL(_this.urls[id]);
          delete _this.urls[id];
        }

        _this.dispatchChangeEvent("delete", id);
      });
    }
  }, {
    key: "keys",
    value: function () {
      var _keys = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var keys;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.adapter.keys();

              case 2:
                keys = _context5.sent;
                return _context5.abrupt("return", keys.filter(function (x) {
                  return x != "file-meta";
                }));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function keys() {
        return _keys.apply(this, arguments);
      }

      return keys;
    }()
  }, {
    key: "addChangeListener",
    value: function addChangeListener(callback) {
      this._changeListeners = this._changeListeners || [];

      this._changeListeners.push(callback);
    }
  }, {
    key: "dispatchChangeEvent",
    value: function dispatchChangeEvent(change, id) {
      var _iterator = _createForOfIteratorHelper(this._changeListeners),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
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
    key: "clear",
    value: function clear() {
      this.adapter.clear();
    }
  }, {
    key: "generateBackupArchive",
    value: function () {
      var _generateBackupArchive = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var count, keys, zip, _iterator2, _step2, _id, url, blob;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                count = 0;
                _context6.next = 3;
                return this.keys();

              case 3:
                keys = _context6.sent;
                zip = new (jszip__WEBPACK_IMPORTED_MODULE_2___default())();
                _iterator2 = _createForOfIteratorHelper(keys);
                _context6.prev = 6;

                _iterator2.s();

              case 8:
                if ((_step2 = _iterator2.n()).done) {
                  _context6.next = 22;
                  break;
                }

                _id = _step2.value;
                _context6.next = 12;
                return this.loadImageUrl(_id);

              case 12:
                url = _context6.sent;
                _context6.next = 15;
                return fetch(url).then(function (r) {
                  return r.blob();
                });

              case 15:
                blob = _context6.sent;

                if (blob) {
                  _context6.next = 18;
                  break;
                }

                return _context6.abrupt("continue", 20);

              case 18:
                zip.file(_id, blob);
                count += 1;

              case 20:
                _context6.next = 8;
                break;

              case 22:
                _context6.next = 27;
                break;

              case 24:
                _context6.prev = 24;
                _context6.t0 = _context6["catch"](6);

                _iterator2.e(_context6.t0);

              case 27:
                _context6.prev = 27;

                _iterator2.f();

                return _context6.finish(27);

              case 30:
                if (!(count == 0)) {
                  _context6.next = 32;
                  break;
                }

                return _context6.abrupt("return");

              case 32:
                return _context6.abrupt("return", zip.generateAsync({
                  type: "blob"
                }));

              case 33:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[6, 24, 27, 30]]);
      }));

      function generateBackupArchive() {
        return _generateBackupArchive.apply(this, arguments);
      }

      return generateBackupArchive;
    }()
  }, {
    key: "importBackupArchive",
    value: function () {
      var _importBackupArchive = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(zipFile) {
        var _this2 = this;

        var zip;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return jszip__WEBPACK_IMPORTED_MODULE_2___default().loadAsync(zipFile);

              case 2:
                zip = _context8.sent;
                zip.forEach( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(path, file) {
                    var buffer, blob;
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            _context7.next = 2;
                            return file.async("arraybuffer");

                          case 2:
                            buffer = _context7.sent;
                            blob = new Blob([buffer], {
                              "type": "image/png"
                            });

                            _this2.saveImage(file.name, blob);

                          case 5:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7);
                  }));

                  return function (_x8, _x9) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function importBackupArchive(_x7) {
        return _importBackupArchive.apply(this, arguments);
      }

      return importBackupArchive;
    }()
  }, {
    key: "renameImage",
    value: function () {
      var _renameImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(oldId, newId) {
        var data;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.adapter.getItem(oldId);

              case 2:
                data = _context9.sent;

                if (data) {
                  _context9.next = 5;
                  break;
                }

                return _context9.abrupt("return");

              case 5:
                _context9.next = 7;
                return this.adapter.setItem(newId, data);

              case 7:
                _context9.next = 9;
                return this.adapter.removeItem(oldId);

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function renameImage(_x10, _x11) {
        return _renameImage.apply(this, arguments);
      }

      return renameImage;
    }()
  }, {
    key: "migrate",
    value: function () {
      var _migrate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var keys, _iterator3, _step3, _id2;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.keys();

              case 2:
                keys = _context10.sent;
                _iterator3 = _createForOfIteratorHelper(keys);
                _context10.prev = 4;

                _iterator3.s();

              case 6:
                if ((_step3 = _iterator3.n()).done) {
                  _context10.next = 19;
                  break;
                }

                _id2 = _step3.value;

                if (_id2.includes("/")) {
                  _context10.next = 11;
                  break;
                }

                _context10.next = 11;
                return this.migrateLooseFilesIntoFolders(_id2);

              case 11:
                if (!(_id2.startsWith("images/") || _id2.startsWith("shapes/"))) {
                  _context10.next = 14;
                  break;
                }

                _context10.next = 14;
                return this.renameImage(_id2, "user/" + _id2);

              case 14:
                if (!_id2.startsWith("overlays/")) {
                  _context10.next = 17;
                  break;
                }

                _context10.next = 17;
                return this.renameImage(_id2, "default/" + _id2);

              case 17:
                _context10.next = 6;
                break;

              case 19:
                _context10.next = 24;
                break;

              case 21:
                _context10.prev = 21;
                _context10.t0 = _context10["catch"](4);

                _iterator3.e(_context10.t0);

              case 24:
                _context10.prev = 24;

                _iterator3.f();

                return _context10.finish(24);

              case 27:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[4, 21, 24, 27]]);
      }));

      function migrate() {
        return _migrate.apply(this, arguments);
      }

      return migrate;
    }()
  }, {
    key: "migrateLooseFilesIntoFolders",
    value: function () {
      var _migrateLooseFilesIntoFolders = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(id) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!id.startsWith("image")) {
                  _context11.next = 4;
                  break;
                }

                _context11.next = 3;
                return this.renameImage(id, id.replace("image", "user/images/"));

              case 3:
                return _context11.abrupt("return", true);

              case 4:
                if (!id.startsWith("shape-")) {
                  _context11.next = 8;
                  break;
                }

                _context11.next = 7;
                return this.renameImage(id, id.replace("shape-", "user/shapes/"));

              case 7:
                return _context11.abrupt("return", true);

              case 8:
                if (!id.startsWith("shape")) {
                  _context11.next = 12;
                  break;
                }

                _context11.next = 11;
                return this.renameImage(id, id.replace("shape", "user/shapes/"));

              case 11:
                return _context11.abrupt("return", true);

              case 12:
                if (!id.startsWith("overlay-image")) {
                  _context11.next = 16;
                  break;
                }

                _context11.next = 15;
                return this.renameImage(id, id.replace("overlay-image", "default/overlays/"));

              case 15:
                return _context11.abrupt("return", true);

              case 16:
                return _context11.abrupt("return", false);

              case 17:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function migrateLooseFilesIntoFolders(_x12) {
        return _migrateLooseFilesIntoFolders.apply(this, arguments);
      }

      return migrateLooseFilesIntoFolders;
    }()
  }, {
    key: "getStorageUsed",
    value: function () {
      var _getStorageUsed = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var amount, keys, _iterator4, _step4, _id3, url, blob;

        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                amount = 0;
                _context12.next = 3;
                return this.keys();

              case 3:
                keys = _context12.sent;
                _iterator4 = _createForOfIteratorHelper(keys);
                _context12.prev = 5;

                _iterator4.s();

              case 7:
                if ((_step4 = _iterator4.n()).done) {
                  _context12.next = 20;
                  break;
                }

                _id3 = _step4.value;
                _context12.next = 11;
                return this.loadImageUrl(_id3);

              case 11:
                url = _context12.sent;
                _context12.next = 14;
                return fetch(url).then(function (r) {
                  return r.blob();
                });

              case 14:
                blob = _context12.sent;

                if (blob) {
                  _context12.next = 17;
                  break;
                }

                return _context12.abrupt("continue", 18);

              case 17:
                amount += blob.size;

              case 18:
                _context12.next = 7;
                break;

              case 20:
                _context12.next = 25;
                break;

              case 22:
                _context12.prev = 22;
                _context12.t0 = _context12["catch"](5);

                _iterator4.e(_context12.t0);

              case 25:
                _context12.prev = 25;

                _iterator4.f();

                return _context12.finish(25);

              case 28:
                return _context12.abrupt("return", amount);

              case 29:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[5, 22, 25, 28]]);
      }));

      function getStorageUsed() {
        return _getStorageUsed.apply(this, arguments);
      }

      return getStorageUsed;
    }()
  }, {
    key: "loadFileMeta",
    value: function () {
      var _loadFileMeta = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var _ref2;

        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this.adapter.getItem("file-meta");

              case 2:
                _context13.t1 = _ref2 = _context13.sent;
                _context13.t0 = _context13.t1 !== null;

                if (!_context13.t0) {
                  _context13.next = 6;
                  break;
                }

                _context13.t0 = _ref2 !== void 0;

              case 6:
                if (!_context13.t0) {
                  _context13.next = 10;
                  break;
                }

                _context13.t2 = _ref2;
                _context13.next = 11;
                break;

              case 10:
                _context13.t2 = {};

              case 11:
                this._fileMeta = _context13.t2;

              case 12:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function loadFileMeta() {
        return _loadFileMeta.apply(this, arguments);
      }

      return loadFileMeta;
    }()
  }, {
    key: "getFilenameFromPath",
    value: function getFilenameFromPath(path) {
      return path.substring(path.lastIndexOf('/') + 1);
    }
  }, {
    key: "getImagePath",
    value: function getImagePath(i) {
      return "user/images/" + String(i + 1).padStart(2, "0") + ".png";
    }
  }, {
    key: "getOverlayPath",
    value: function getOverlayPath(imageId) {
      return "default/overlays/" + this.getFilenameFromPath(imageId);
    }
  }, {
    key: "listFolder",
    value: function () {
      var _listFolder = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(path) {
        var keys;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return this.adapter.keys();

              case 2:
                keys = _context14.sent;
                return _context14.abrupt("return", keys.filter(function (x) {
                  return x.startsWith(path + "/");
                }));

              case 4:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function listFolder(_x13) {
        return _listFolder.apply(this, arguments);
      }

      return listFolder;
    }()
  }, {
    key: "getHash",
    value: function () {
      var _getHash = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(id) {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (!(id in this._fileMeta)) {
                  _context15.next = 2;
                  break;
                }

                return _context15.abrupt("return", this._fileMeta[id].hash);

              case 2:
                return _context15.abrupt("return", null);

              case 3:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function getHash(_x14) {
        return _getHash.apply(this, arguments);
      }

      return getHash;
    }()
  }, {
    key: "setHash",
    value: function () {
      var _setHash = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(id, hash) {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                this._fileMeta[id] = {
                  hash: hash
                };
                _context16.next = 3;
                return this.adapter.setItem("file-meta", this._fileMeta);

              case 3:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function setHash(_x15, _x16) {
        return _setHash.apply(this, arguments);
      }

      return setHash;
    }()
  }, {
    key: "generateContentHash",
    value: function () {
      var _generateContentHash = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(blob) {
        var BLOCK_SIZE, tempBuffer, tempPos, p, blobChunk, buf, _hashBuffer, hashBuffer, hashArray, hashHex2;

        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                BLOCK_SIZE = 4 * 1024 * 1024;
                tempBuffer = new Uint8Array(Math.ceil(blob.size / BLOCK_SIZE) * 32);
                tempPos = 0;
                p = 0;

              case 4:
                if (!(p < blob.size)) {
                  _context17.next = 17;
                  break;
                }

                blobChunk = blob.slice(p, p + BLOCK_SIZE);
                _context17.next = 8;
                return blob.arrayBuffer();

              case 8:
                buf = _context17.sent;
                _context17.next = 11;
                return crypto.subtle.digest('SHA-256', buf);

              case 11:
                _hashBuffer = _context17.sent;
                tempBuffer.set(new Uint8Array(_hashBuffer), tempPos);
                tempPos += 32;

              case 14:
                p += BLOCK_SIZE;
                _context17.next = 4;
                break;

              case 17:
                _context17.next = 19;
                return crypto.subtle.digest('SHA-256', tempBuffer);

              case 19:
                hashBuffer = _context17.sent;
                hashArray = Array.from(new Uint8Array(hashBuffer));
                hashHex2 = hashArray.map(function (b) {
                  return b.toString(16).padStart(2, '0');
                }).join('');
                return _context17.abrupt("return", hashHex2);

              case 23:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      }));

      function generateContentHash(_x17) {
        return _generateContentHash.apply(this, arguments);
      }

      return generateContentHash;
    }()
  }]);

  return ImageStorage;
}();

var imageStorage = new ImageStorage();

/***/ }),

/***/ "./src/ts/storage/LocalForageAdapter.ts":
/*!**********************************************!*\
  !*** ./src/ts/storage/LocalForageAdapter.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ LocalForageAdapter; }
/* harmony export */ });
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! localforage */ "./node_modules/localforage/dist/localforage.js");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _StorageAdapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StorageAdapter */ "./src/ts/storage/StorageAdapter.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var LocalForageAdapter = /*#__PURE__*/function (_StorageAdapter) {
  _inherits(LocalForageAdapter, _StorageAdapter);

  var _super = _createSuper(LocalForageAdapter);

  function LocalForageAdapter() {
    var _temp, _this;

    _classCallCheck(this, LocalForageAdapter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _super.call.apply(_super, [this].concat(args)), _this._imageStore = localforage__WEBPACK_IMPORTED_MODULE_0___default().createInstance({
      name: "ImageStore"
    }), _temp));
  }

  _createClass(LocalForageAdapter, [{
    key: "getItem",
    value: function getItem(id) {
      return this._imageStore.getItem(id);
    }
  }, {
    key: "setItem",
    value: function setItem(id, value) {
      return this._imageStore.setItem(id, value);
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
  }, {
    key: "clear",
    value: function clear() {
      return this._imageStore.clear();
    }
  }]);

  return LocalForageAdapter;
}(_StorageAdapter__WEBPACK_IMPORTED_MODULE_1__.default);



/***/ }),

/***/ "./src/ts/storage/Server.ts":
/*!**********************************!*\
  !*** ./src/ts/storage/Server.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "server": function() { return /* binding */ server; }
/* harmony export */ });
/* harmony import */ var _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../storage/ImageStorage */ "./src/ts/storage/ImageStorage.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Server = /*#__PURE__*/function () {
  function Server() {
    var _localStorage$getItem, _localStorage$getItem2;

    _classCallCheck(this, Server);

    this._host = (_localStorage$getItem = localStorage.getItem("server-url")) !== null && _localStorage$getItem !== void 0 ? _localStorage$getItem : "http://localhost:3000";
    this._userId = (_localStorage$getItem2 = localStorage.getItem("user-id")) !== null && _localStorage$getItem2 !== void 0 ? _localStorage$getItem2 : "";
  }

  _createClass(Server, [{
    key: "host",
    get: function get() {
      return this._host;
    },
    set: function set(value) {
      this._host = value;
      localStorage.setItem("server-url", value);
    }
  }, {
    key: "userId",
    get: function get() {
      return this._userId;
    },
    set: function set(value) {
      this._userId = value;
      localStorage.setItem("user-id", value);
    }
  }, {
    key: "sync",
    value: function () {
      var _sync = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.userId) {
                  _context.next = 3;
                  break;
                }

                console.error("Cannot sync without user id.");
                return _context.abrupt("return");

              case 3:
                _context.next = 5;
                return this.downloadDefaultAssets();

              case 5:
                _context.next = 7;
                return this.uploadUserContent();

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function sync() {
        return _sync.apply(this, arguments);
      }

      return sync;
    }()
  }, {
    key: "uploadUserContent",
    value: function () {
      var _uploadUserContent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var keys, _iterator, _step, id, url, blob, fileName;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.createDirectory(this.host, this.userId);
                _context2.next = 3;
                return _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_0__.imageStorage.keys();

              case 3:
                keys = _context2.sent;
                _iterator = _createForOfIteratorHelper(keys);
                _context2.prev = 5;

                _iterator.s();

              case 7:
                if ((_step = _iterator.n()).done) {
                  _context2.next = 22;
                  break;
                }

                id = _step.value;
                _context2.next = 11;
                return _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_0__.imageStorage.loadImageUrl(id);

              case 11:
                url = _context2.sent;
                _context2.next = 14;
                return fetch(url).then(function (r) {
                  return r.blob();
                });

              case 14:
                blob = _context2.sent;

                if (blob) {
                  _context2.next = 17;
                  break;
                }

                return _context2.abrupt("continue", 20);

              case 17:
                fileName = this.userId + "/" + id;
                console.log("posting: " + fileName);
                this.postImage(this.host, blob, fileName);

              case 20:
                _context2.next = 7;
                break;

              case 22:
                _context2.next = 27;
                break;

              case 24:
                _context2.prev = 24;
                _context2.t0 = _context2["catch"](5);

                _iterator.e(_context2.t0);

              case 27:
                _context2.prev = 27;

                _iterator.f();

                return _context2.finish(27);

              case 30:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[5, 24, 27, 30]]);
      }));

      function uploadUserContent() {
        return _uploadUserContent.apply(this, arguments);
      }

      return uploadUserContent;
    }()
  }, {
    key: "downloadDefaultAssets",
    value: function () {
      var _downloadDefaultAssets = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var res, info, _iterator2, _step2, path;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.getPathInfo(this.host, 'default');

              case 2:
                res = _context3.sent;

                if (res.ok) {
                  _context3.next = 6;
                  break;
                }

                console.log('Could not download default assets.');
                return _context3.abrupt("return");

              case 6:
                _context3.next = 8;
                return res.json();

              case 8:
                info = _context3.sent;
                _iterator2 = _createForOfIteratorHelper(info);
                _context3.prev = 10;

                _iterator2.s();

              case 12:
                if ((_step2 = _iterator2.n()).done) {
                  _context3.next = 22;
                  break;
                }

                path = _step2.value;

                if (path.isFile) {
                  _context3.next = 16;
                  break;
                }

                return _context3.abrupt("continue", 20);

              case 16:
                if (path.name.endsWith(".png")) {
                  _context3.next = 18;
                  break;
                }

                return _context3.abrupt("continue", 20);

              case 18:
                console.log("getting default asset: " + path.name);
                this.downloadImage("default/" + path.name, path.name);

              case 20:
                _context3.next = 12;
                break;

              case 22:
                _context3.next = 27;
                break;

              case 24:
                _context3.prev = 24;
                _context3.t0 = _context3["catch"](10);

                _iterator2.e(_context3.t0);

              case 27:
                _context3.prev = 27;

                _iterator2.f();

                return _context3.finish(27);

              case 30:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[10, 24, 27, 30]]);
      }));

      function downloadDefaultAssets() {
        return _downloadDefaultAssets.apply(this, arguments);
      }

      return downloadDefaultAssets;
    }()
  }, {
    key: "downloadImage",
    value: function () {
      var _downloadImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(path, imageId) {
        var url, res, blob;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                url = this.host + "/" + path;
                _context4.next = 3;
                return fetch(url);

              case 3:
                res = _context4.sent;

                if (!res.ok) {
                  _context4.next = 9;
                  break;
                }

                _context4.next = 7;
                return res.blob();

              case 7:
                blob = _context4.sent;

                if (blob) {
                  _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_0__.imageStorage.saveImage(imageId, blob);
                }

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function downloadImage(_x, _x2) {
        return _downloadImage.apply(this, arguments);
      }

      return downloadImage;
    }()
  }, {
    key: "getPathInfo",
    value: function () {
      var _getPathInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(host, path) {
        var url;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                url = host + "/" + path + "?type=json";
                return _context5.abrupt("return", fetch(url));

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getPathInfo(_x3, _x4) {
        return _getPathInfo.apply(this, arguments);
      }

      return getPathInfo;
    }()
  }, {
    key: "createDirectory",
    value: function () {
      var _createDirectory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(host, directoryName) {
        var url;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                url = host + "/" + directoryName + "?create=directory";
                return _context6.abrupt("return", fetch(url, {
                  method: "POST"
                }));

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function createDirectory(_x5, _x6) {
        return _createDirectory.apply(this, arguments);
      }

      return createDirectory;
    }()
  }, {
    key: "postImage",
    value: function () {
      var _postImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(host, blob, fileName) {
        var url;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                url = host + "/" + fileName;
                return _context7.abrupt("return", fetch(url, {
                  method: "PUT",
                  headers: {
                    "Accept": "image/png",
                    "Content-Type": "image/png"
                  },
                  body: blob
                }));

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function postImage(_x7, _x8, _x9) {
        return _postImage.apply(this, arguments);
      }

      return postImage;
    }()
  }]);

  return Server;
}();

var server = new Server();

/***/ }),

/***/ "./src/ts/storage/StorageAdapter.ts":
/*!******************************************!*\
  !*** ./src/ts/storage/StorageAdapter.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ StorageAdapter; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StorageAdapter = function StorageAdapter() {
  _classCallCheck(this, StorageAdapter);
};



/***/ }),

/***/ "./src/ts/tools/PenTool.ts":
/*!*********************************!*\
  !*** ./src/ts/tools/PenTool.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ PenTool; }
/* harmony export */ });
/* harmony import */ var _Tool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tool */ "./src/ts/tools/Tool.ts");
/* harmony import */ var _math_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vector */ "./src/ts/math/Vector.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



 // @ts-ignore

// Paints lines with varying stroke width
var PenTool = /*#__PURE__*/function (_Tool) {
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
      this._painter.captureAutoMask(data.position.clone().round());

      this._points = [data.position];
      var width = this.getWidth(data.pressure, data.speed);
      this._widths = [width];
      this._startIndex = 0;
      var ctx = this._painter.baseLayer.ctx;
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color; // let ctx = this._brushCtx;
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
      this.drawConnectedLines(ctx, this._points.slice(this._startIndex), this._widths.slice(this._startIndex)); // if (this._points.length - this._startIndex == 1){
      //     const p = this._points[this._startIndex];
      //     this.drawBrush(ctx, p.x, p.y, this._widths[this._startIndex]);
      //     return;
      // }
      //
      // for (let i = this._startIndex; i < this._points.length - 1; i++) {
      //     const p1 = this._points[i];
      //     const p2 = this._points[i+1];
      //    
      //     const w1 = this._widths[i];
      //     const w2 = this._widths[i+1];
      //
      //     const dist = Vector.distance(p1, p2);
      //     const step = Math.max(1, 0.125 * Math.min(w1, w2, 64));
      //     for (let d = 0; d <= dist; d += step){
      //         const a = d / dist;
      //         const p = Vector.lerp(p1, p2, a);
      //         const w = Utils.lerp(w1, w2, a);
      //         this.drawBrush(ctx, p.x, p.y, w);
      //     }
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
      var start = points[0];
      var startWidth = widths[0] * this.lineWidth;

      if (pointCount == 1) {
        // single dot
        ctx.beginPath();
        ctx.arc(start.x, start.y, 0.5 * startWidth, 0, 2 * Math.PI);
        ctx.fill();
      }

      for (var i = 1; i < pointCount; i++) {
        ctx.beginPath();
        ctx.lineWidth = widths[i] * this.lineWidth;
        ctx.lineTo(points[i - 1].x, points[i - 1].y);
        ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke();
      }
    }
  }, {
    key: "drawBrush",
    value: function drawBrush(ctx, x, y, width) {
      var radius = width * 0.5;
      x -= radius;
      y -= radius; // x = Math.floor(x - radius);
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
      var maxWidthDifference = maxWidthDifferencePerSegment * numSegments;
      width = _utils_Utils__WEBPACK_IMPORTED_MODULE_2__.clamp(lastWidth - maxWidthDifference, lastWidth + maxWidthDifference, width);

      for (var i = 0; i < numSegments; i++) {
        this._widths.push(_utils_Utils__WEBPACK_IMPORTED_MODULE_2__.lerp(lastWidth, width, i / numSegments));
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
      var dist = start.distanceTo(end);

      if (dist < segmentLength) {
        return points;
      }

      var control = start;

      if (this._points.length > 1) {
        var previous = this._points[this._points.length - 2];
        var tangent = start.clone().subtract(previous).normalize();
        control = start.clone().add(tangent.clone().multiplyScalar(0.3 * dist));
      }

      var a = segmentLength / dist;

      for (var i = a; i <= 1; i += a) {
        var _Vector = this.pointOnQuadraticCurve(start, control, end, i);

        points.push(_Vector);
      }

      return points;
    }
  }, {
    key: "pointOnQuadraticCurve",
    value: function pointOnQuadraticCurve(start, control, end, a) {
      var f1 = (1 - a) * (1 - a);
      var f2 = 2 * a * (1 - a);
      var f3 = a * a;
      return new _math_Vector__WEBPACK_IMPORTED_MODULE_1__.default(start.x * f1 + control.x * f2 + end.x * f3, start.y * f1 + control.y * f2 + end.y * f3);
    }
  }, {
    key: "pressureChanged",
    value: function pressureChanged() {
      this.requestDrawPath();
    }
  }, {
    key: "getWidth",
    value: function getWidth(pressure, speed) {
      speed = _utils_Utils__WEBPACK_IMPORTED_MODULE_2__.clamp(1, 2, speed);
      return pressure / speed; // range: 0.5 - 1
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
}(_Tool__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "./src/ts/tools/SelectionTool.ts":
/*!***************************************!*\
  !*** ./src/ts/tools/SelectionTool.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SelectionTool; }
/* harmony export */ });
/* harmony import */ var _Tool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tool */ "./src/ts/tools/Tool.ts");
/* harmony import */ var _math_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vector */ "./src/ts/math/Vector.ts");
/* harmony import */ var _utils_Rect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Rect */ "./src/ts/utils/Rect.ts");
/* harmony import */ var _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../storage/ImageStorage */ "./src/ts/storage/ImageStorage.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config */ "./src/ts/config.ts");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _palettes_SendPalette__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../palettes/SendPalette */ "./src/ts/palettes/SendPalette.ts");
/* harmony import */ var _storage_DropboxStorage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../storage/DropboxStorage */ "./src/ts/storage/DropboxStorage.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }









 // Provides a floating selection the user can manipulate 

var SelectionTool = /*#__PURE__*/function (_Tool) {
  _inherits(SelectionTool, _Tool);

  var _super = _createSuper(SelectionTool);

  function SelectionTool(painter, buttonId) {
    var _this;

    _classCallCheck(this, SelectionTool);

    _this = _super.call(this, painter, buttonId);
    _this.selectionLayerId = "selection-layer";
    _this._selection = _utils_Rect__WEBPACK_IMPORTED_MODULE_2__.default.Empty();
    _this._deleteButton = document.getElementById("selection-delete-button");
    _utils_Utils__WEBPACK_IMPORTED_MODULE_4__.addClick(_this._deleteButton, function () {
      return _this.clearSelection();
    });
    _this._stampButton = document.getElementById("selection-stamp-button");
    _utils_Utils__WEBPACK_IMPORTED_MODULE_4__.addClick(_this._stampButton, function () {
      return _this.paintSelectionToCanvas();
    });
    _this._saveButton = document.getElementById("selection-save-button");
    _utils_Utils__WEBPACK_IMPORTED_MODULE_4__.addClick(_this._saveButton, function () {
      return _this.saveSelectionAsNewShape();
    });
    _this._downloadButton = document.getElementById("selection-download-button");
    _utils_Utils__WEBPACK_IMPORTED_MODULE_4__.addClick(_this._downloadButton, function () {
      _this.selectionLayer.canvas.toBlob(function (blob) {
        return (0,file_saver__WEBPACK_IMPORTED_MODULE_6__.saveAs)(blob, "image.png");
      });
    });
    _this._sendPalette = new _palettes_SendPalette__WEBPACK_IMPORTED_MODULE_7__.default("send-palette");

    _this._sendPalette.onSelectionChanged = function (receipient) {
      _this.selectionLayer.canvas.toBlob(function (blob) {
        return _storage_DropboxStorage__WEBPACK_IMPORTED_MODULE_8__.dropboxStorage.sendGift(blob, receipient);
      });
    };

    _this.hasFloatingSelection = false;
    _this._position = new _math_Vector__WEBPACK_IMPORTED_MODULE_1__.default(0, 0);
    return _this;
  }

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
  }, {
    key: "toggleFloatingSelectionButtons",
    value: function toggleFloatingSelectionButtons(visible) {
      this._deleteButton.classList.toggle("hidden", !visible);

      this._stampButton.classList.toggle("hidden", !visible);

      this._downloadButton.classList.toggle("hidden", !visible);

      this._saveButton.classList.toggle("hidden", !visible);

      this._sendPalette.setVisible(visible);
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
      this.selectionLayer.transform(new _math_Vector__WEBPACK_IMPORTED_MODULE_1__.default(0, 0), 1, 0);
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
        // case 'KeyC':
        //     if (event.metaKey){
        //         this.copyToClipboard();
        //     }
        //     break;
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
    }
  }, {
    key: "setImageUrl",
    value: function () {
      var _setImageUrl = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
        var _this2 = this;

        var img;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                img = new Image();
                img.src = url;
                return _context.abrupt("return", new Promise(function (resolve) {
                  img.onload = function () {
                    _this2.setImage(img);

                    resolve(img);
                  };
                }));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function setImageUrl(_x) {
        return _setImageUrl.apply(this, arguments);
      }

      return setImageUrl;
    }()
  }, {
    key: "setImagePath",
    value: function () {
      var _setImagePath = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(path) {
        var url;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_3__.imageStorage.loadImageUrl(path);

              case 2:
                url = _context2.sent;
                return _context2.abrupt("return", this.setImageUrl(url));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setImagePath(_x2) {
        return _setImagePath.apply(this, arguments);
      }

      return setImagePath;
    }()
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
      this._selection = new _utils_Rect__WEBPACK_IMPORTED_MODULE_2__.default(x, y, width, height);
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
          _this3.saveSelectionAsNewShape();

          return;
        }

        _this3.paintSelectionToCanvas();
      };
    }
  }, {
    key: "cutSelection",
    value: function cutSelection() {
      this.selectionLayer.clear();
      this._selection = _utils_Utils__WEBPACK_IMPORTED_MODULE_4__.getVisiblePixelFrame(this._painter.baseLayer.ctx, this.selection);

      if (this.selection.isEmpty()) {
        return;
      }

      this.hasFloatingSelection = true;
      var _this$selection = this.selection,
          x = _this$selection.x,
          y = _this$selection.y,
          width = _this$selection.width,
          height = _this$selection.height;
      this.selectionLayer.setPositionAndSize(x, y, width, height);
      this.selectionLayer.floating = true;
      this.selectionLayer.ctx.drawImage(this._painter.baseLayer.canvas, x, y, width, height, 0, 0, width, height);

      this._painter.baseLayer.clear(this.selection);

      this._painter.recordHistoryState();
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
    key: "saveSelectionAsNewShape",
    value: function () {
      var _saveSelectionAsNewShape = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var shapes, path;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_3__.imageStorage.listFolder("user/shapes");

              case 2:
                shapes = _context3.sent;

                if (!(shapes.length >= _config__WEBPACK_IMPORTED_MODULE_5__.config.maxShapeCount)) {
                  _context3.next = 6;
                  break;
                }

                console.log("Cannot save selection as shape because there are already too many in storage.");
                return _context3.abrupt("return");

              case 6:
                path = "user/shapes/".concat(Date.now(), ".png");
                console.log("Saving selection as: ".concat(path));
                this.selectionLayer.canvas.toBlob(function (blob) {
                  return _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_3__.imageStorage.saveImage(path, blob);
                });
                this.isInShapesPalette = true;

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function saveSelectionAsNewShape() {
        return _saveSelectionAsNewShape.apply(this, arguments);
      }

      return saveSelectionAsNewShape;
    }() // copyToClipboard(){
    //     this.selectionLayer.canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})]));
    //     console.log("copied selection to clipboard");
    // }
    //
    // pasteFromClipboard() {
    //     navigator.permissions.query({name: "clipboard-read"})
    //         .then(result => {
    //             if (!(result.state == "granted" || result.state == "prompt")) {
    //                 return;
    //             }
    //             navigator.clipboard.read()
    //                 .then(data => {
    //                     for (let i = 0; i < data.length; i++) {
    //                         if (!data[i].types.includes("image/png")){
    //                             continue;
    //                         }
    //                         data[i].getType("image/png")
    //                             .then(blob => {
    //                                 this.setImageUrl(URL.createObjectURL(blob));
    //                             })
    //                     }
    //                 });
    //         });
    // }

  }, {
    key: "selectAll",
    value: function selectAll() {
      this.startNewSelection();
      this._selection = new _utils_Rect__WEBPACK_IMPORTED_MODULE_2__.default(0, 0, this._painter.width, this._painter.height);
      this.cutSelection();
    }
  }]);

  return SelectionTool;
}(_Tool__WEBPACK_IMPORTED_MODULE_0__.default);



/***/ }),

/***/ "./src/ts/tools/Tool.ts":
/*!******************************!*\
  !*** ./src/ts/tools/Tool.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Tool; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Base class for all tools
var Tool = /*#__PURE__*/function () {
  function Tool(painter, buttonId) {
    _classCallCheck(this, Tool);

    this._painter = painter;
    this._buttonElement = document.getElementById(buttonId);
  } // creates a context to draw the current stroke to so we can draw the complete stroke with a different
  // operation. The buffer can be shared by different tools.


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
  }, {
    key: "createBufferCtx",
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
}();



/***/ }),

/***/ "./src/ts/utils/FileSync.ts":
/*!**********************************!*\
  !*** ./src/ts/utils/FileSync.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileSync": function() { return /* binding */ FileSync; }
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// inspiration: https://unterwaditzer.net/2016/sync-algorithm.html
var FileSync = /*#__PURE__*/function () {
  function FileSync(filesA, filesB, status, resolveConflict) {
    _classCallCheck(this, FileSync);

    this._filesA = filesA;
    this._filesB = filesB;
    this._status = status;
    this._resolveConflict = resolveConflict;
  }

  _createClass(FileSync, [{
    key: "syncFiles",
    value: function () {
      var _syncFiles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var changed, files, _iterator, _step, file;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                changed = false;
                files = this.getAllFiles();
                _iterator = _createForOfIteratorHelper(files);
                _context.prev = 3;

                _iterator.s();

              case 5:
                if ((_step = _iterator.n()).done) {
                  _context.next = 11;
                  break;
                }

                file = _step.value;
                _context.next = 9;
                return this.syncFile(file);

              case 9:
                _context.next = 5;
                break;

              case 11:
                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](3);

                _iterator.e(_context.t0);

              case 16:
                _context.prev = 16;

                _iterator.f();

                return _context.finish(16);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 13, 16, 19]]);
      }));

      function syncFiles() {
        return _syncFiles.apply(this, arguments);
      }

      return syncFiles;
    }()
  }, {
    key: "syncFile",
    value: function () {
      var _syncFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(itemId) {
        var filesA, filesB, status;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                filesA = this._filesA;
                filesB = this._filesB;
                status = this._status;

                if (!status.has(itemId)) {
                  _context2.next = 29;
                  break;
                }

                if (!filesA.has(itemId)) {
                  _context2.next = 17;
                  break;
                }

                if (!filesB.has(itemId)) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 8;
                return this.handleModification(itemId);

              case 8:
                _context2.next = 15;
                break;

              case 10:
                _context2.next = 12;
                return filesA.delete(itemId);

              case 12:
                _context2.next = 14;
                return status.delete(itemId);

              case 14:
                this.modified = true;

              case 15:
                _context2.next = 27;
                break;

              case 17:
                if (!filesB.has(itemId)) {
                  _context2.next = 25;
                  break;
                }

                _context2.next = 20;
                return filesB.delete(itemId);

              case 20:
                _context2.next = 22;
                return status.delete(itemId);

              case 22:
                this.modified = true;
                _context2.next = 27;
                break;

              case 25:
                _context2.next = 27;
                return status.delete(itemId);

              case 27:
                _context2.next = 52;
                break;

              case 29:
                if (!filesA.has(itemId)) {
                  _context2.next = 45;
                  break;
                }

                if (!filesB.has(itemId)) {
                  _context2.next = 37;
                  break;
                }

                // is on A and B but not on status. We cannot compare the hashes so we need to
                console.log("not on status: ", itemId);
                _context2.next = 34;
                return this._resolveConflict(itemId);

              case 34:
                this.modified = true;
                _context2.next = 43;
                break;

              case 37:
                // only on A
                console.log("only on A");
                _context2.next = 40;
                return filesA.copyTo(itemId, filesB);

              case 40:
                _context2.next = 42;
                return status.set(itemId, filesA.getHash(itemId), filesA.getHash(itemId));

              case 42:
                this.modified = true;

              case 43:
                _context2.next = 52;
                break;

              case 45:
                if (!filesB.has(itemId)) {
                  _context2.next = 52;
                  break;
                }

                console.log("only on B"); // only on B

                _context2.next = 49;
                return filesB.copyTo(itemId, filesA);

              case 49:
                _context2.next = 51;
                return status.set(itemId, filesB.getHash(itemId), filesB.getHash(itemId));

              case 51:
                this.modified = true;

              case 52:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function syncFile(_x) {
        return _syncFile.apply(this, arguments);
      }

      return syncFile;
    }()
  }, {
    key: "handleModification",
    value: function () {
      var _handleModification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(itemId) {
        var filesA, filesB, status, hashA, hashB, statusHashes;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                filesA = this._filesA;
                filesB = this._filesB;
                status = this._status;
                hashA = filesA.getHash(itemId);
                hashB = filesB.getHash(itemId);
                statusHashes = status.get(itemId); // console.log("handleModification ", itemId)
                // console.log("hashA ", hashA)
                // console.log("hashB ", hashB)
                // nothing changed

                if (!(hashA == statusHashes.hashA && hashB == statusHashes.hashB)) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return");

              case 8:
                if (!(hashA != statusHashes.hashA && hashB == statusHashes.hashB)) {
                  _context3.next = 17;
                  break;
                }

                console.log("changed on A but not on B", hashA, statusHashes.hashA);
                _context3.next = 12;
                return filesA.copyTo(itemId, filesB);

              case 12:
                _context3.next = 14;
                return status.set(itemId, filesA.getHash(itemId), filesA.getHash(itemId));

              case 14:
                this.modified = true;
                _context3.next = 30;
                break;

              case 17:
                if (!(hashA == statusHashes.hashA && hashB != statusHashes.hashB)) {
                  _context3.next = 26;
                  break;
                }

                console.log("changed on B but not on A", hashB, statusHashes.hashB);
                _context3.next = 21;
                return filesB.copyTo(itemId, filesA);

              case 21:
                _context3.next = 23;
                return status.set(itemId, filesB.getHash(itemId), filesB.getHash(itemId));

              case 23:
                this.modified = true;
                _context3.next = 30;
                break;

              case 26:
                if (!(hashA != statusHashes.hashA && hashB != statusHashes.hashB)) {
                  _context3.next = 30;
                  break;
                }

                _context3.next = 29;
                return this._resolveConflict(itemId);

              case 29:
                this.modified = true;

              case 30:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function handleModification(_x2) {
        return _handleModification.apply(this, arguments);
      }

      return handleModification;
    }()
  }, {
    key: "getAllFiles",
    value: function getAllFiles() {
      var allFiles = new Set(this._status.getAll());

      var filesA = this._filesA.getAll();

      var filesB = this._filesB.getAll();

      var _iterator2 = _createForOfIteratorHelper(filesA),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var file = _step2.value;
          allFiles.add(file);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var _iterator3 = _createForOfIteratorHelper(filesB),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _file = _step3.value;
          allFiles.add(_file);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return Array.from(allFiles);
    }
  }]);

  return FileSync;
}();

/***/ }),

/***/ "./src/ts/utils/Rect.ts":
/*!******************************!*\
  !*** ./src/ts/utils/Rect.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Rect; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Rect = /*#__PURE__*/function () {
  function Rect(x, y, width, height) {
    _classCallCheck(this, Rect);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

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
  }, {
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
}();



/***/ }),

/***/ "./src/ts/utils/Utils.ts":
/*!*******************************!*\
  !*** ./src/ts/utils/Utils.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatBytes": function() { return /* binding */ formatBytes; },
/* harmony export */   "upload": function() { return /* binding */ upload; },
/* harmony export */   "imageToBlob": function() { return /* binding */ imageToBlob; },
/* harmony export */   "pointerEventsSupported": function() { return /* binding */ pointerEventsSupported; },
/* harmony export */   "log": function() { return /* binding */ log; },
/* harmony export */   "addClick": function() { return /* binding */ addClick; },
/* harmony export */   "addLongClick": function() { return /* binding */ addLongClick; },
/* harmony export */   "createNewImageId": function() { return /* binding */ createNewImageId; },
/* harmony export */   "lerp": function() { return /* binding */ lerp; },
/* harmony export */   "clamp": function() { return /* binding */ clamp; },
/* harmony export */   "lerpColor": function() { return /* binding */ lerpColor; },
/* harmony export */   "lerpCanvas": function() { return /* binding */ lerpCanvas; },
/* harmony export */   "stringToColor": function() { return /* binding */ stringToColor; },
/* harmony export */   "floodFill": function() { return /* binding */ floodFill; },
/* harmony export */   "getVisiblePixelFrame": function() { return /* binding */ getVisiblePixelFrame; },
/* harmony export */   "dilateMask": function() { return /* binding */ dilateMask; }
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/ts/config.ts");
/* harmony import */ var _Rect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Rect */ "./src/ts/utils/Rect.ts");
/* harmony import */ var _math_Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Vector */ "./src/ts/math/Vector.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var Pressure = __webpack_require__(/*! pressure */ "./node_modules/pressure/dist/pressure.min.js"); // source:
// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript


function formatBytes(bytes) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  if (bytes === 0) return '0 Bytes';
  var k = 1024;
  var dm = decimals < 0 ? 0 : decimals;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
function upload(_x) {
  return _upload.apply(this, arguments);
}

function _upload() {
  _upload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(accept) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve) {
              var input = document.createElement('input');
              input.type = "file";
              input.accept = accept;

              input.onchange = function () {
                if (input.files.length == 0) {
                  return;
                }

                var file = input.files[0];
                resolve(file);
                input.remove();
              };

              input.click();
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _upload.apply(this, arguments);
}

function imageToBlob(image) {
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
function pointerEventsSupported() {
  return window.PointerEvent != null;
}
function log(message) {
  if (!_config__WEBPACK_IMPORTED_MODULE_0__.config.debug) {
    return;
  }

  for (var _len = arguments.length, optionalParams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    optionalParams[_key - 1] = arguments[_key];
  }

  console.log(message, optionalParams);
}
function addClick(element, callback) {
  var supportScrolling = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var scrollStartX;
  var scrollStartY;
  var touchId;
  var isTracking;
  var startTimeStamp;
  var scrolled;
  element.addEventListener("touchstart", touchStart, {
    passive: supportScrolling
  });
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
    element.addEventListener("touchmove", touchMove, {
      passive: supportScrolling
    });
    element.addEventListener("touchend", touchEnd);
  }

  function touchMove(event) {
    if (!supportScrolling) {
      event.preventDefault();
    }

    if (!isTracking) {
      return;
    }

    var touch = event.changedTouches[0]; // user dragged out of the element:

    if (document.elementFromPoint(touch.pageX, touch.pageY) != event.target) {
      isTracking = false;
      element.classList.remove("down");
    }

    if (scrolled || event.timeStamp < startTimeStamp + _config__WEBPACK_IMPORTED_MODULE_0__.config.maxScrollDelay) {
      if (supportScrolling && (Math.abs(touch.pageX - scrollStartX) > _config__WEBPACK_IMPORTED_MODULE_0__.config.minScrollDistance || Math.abs(touch.pageY - scrollStartY) > _config__WEBPACK_IMPORTED_MODULE_0__.config.minScrollDistance)) {
        isTracking = false;
        element.classList.remove("down");
      }
    } // After tapping and holding for a while the element does not start scrolling any more.
    // In that case we don't want perform the scroll check above any more:


    if (event.timeStamp < startTimeStamp + _config__WEBPACK_IMPORTED_MODULE_0__.config.maxScrollDelay) {
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
function addLongClick(element, callback) {
  var timer;
  var caller = this;
  var called = false;
  element.addEventListener("touchstart", down, {
    passive: true
  });
  element.addEventListener("touchend", up);
  element.addEventListener("mousedown", down);
  element.addEventListener("mouseup", up);

  function down(event) {
    called = false;
    timer = setTimeout(function () {
      callback.call(caller, event);
      called = true;
    }, _config__WEBPACK_IMPORTED_MODULE_0__.config.longClickDelay);
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
function createNewImageId() {
  return Date.now().toString();
}
function lerp(a, b, alpha) {
  return a * (1 - alpha) + b * alpha;
}
function clamp(lower, upper, n) {
  return Math.min(upper, Math.max(lower, n));
}
function lerpColor(color1, color2, alpha) {
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
  var r = Math.floor(lerp(ra, rb, alpha));
  var g = Math.floor(lerp(ga, gb, alpha));
  var b = Math.floor(lerp(ba, bb, alpha));
  var a = 255; //Math.floor(Utils.lerp(aa, ab, alpha));

  return r + (g << 8) + (b << 16) + 0xFF000000;
}
function lerpCanvas(ctxA, ctxB, ctxMask) {
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
function stringToColor(h) {
  var r = 0,
      g = 0,
      b = 0;

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
function floodFill(sourceCtx, mask, startPosition, color) {
  var threshold = 0.5;
  var width = sourceCtx.canvas.width;
  var height = sourceCtx.canvas.height;
  var sourceData = sourceCtx.getImageData(0, 0, width, height);
  var sourcePixels = sourceData.data;
  startPosition = startPosition.clone().round();
  var startIndex = startPosition.x + startPosition.y * width; // const startR = sourcePixels[startIndex * 4];
  // const startG = sourcePixels[startIndex * 4 + 1];
  // const startB = sourcePixels[startIndex * 4 + 2];
  // const startA = sourcePixels[startIndex * 4 + 3];

  var startR = parseInt(color[1] + color[2], 16);
  var startG = parseInt(color[3] + color[4], 16);
  var startB = parseInt(color[5] + color[6], 16); // take into account that transparent pixels appear white (due to white bg) but their rgb value is 0:
  // const startBrightness = startA < 5 ? 255 : 0.333 * (startR + startG + startB);

  var startBrightness = 0.333 * (startR + startG + startB); // clear alpha channel:

  for (var i = 0; i < width * height; i++) {
    mask[i * 4 + 3] = 0;
  } // start at multiple positions around start position:


  var stack = [];
  stack.push(startPosition);

  if (startPosition.x > 1) {
    stack.push(new _math_Vector__WEBPACK_IMPORTED_MODULE_2__.default(startPosition.x - 2, startPosition.y));
  }

  if (startPosition.x < width - 2) {
    stack.push(new _math_Vector__WEBPACK_IMPORTED_MODULE_2__.default(startPosition.x + 2, startPosition.y));
  }

  if (startPosition.y > 1) {
    stack.push(new _math_Vector__WEBPACK_IMPORTED_MODULE_2__.default(startPosition.x, startPosition.y - 2));
  }

  if (startPosition.y < height - 2) {
    stack.push(new _math_Vector__WEBPACK_IMPORTED_MODULE_2__.default(startPosition.x, startPosition.y + 2));
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

      stack.push(new _math_Vector__WEBPACK_IMPORTED_MODULE_2__.default(x, y));
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
    var a = sourcePixels[index + 3]; //
    // let difference = Math.max(
    //     Math.abs(r - startR),
    //     Math.abs(g - startG),
    //     Math.abs(b - startB),
    //     Math.abs(a - startA)
    // ) / 255;

    var brightness = 0.333 * (r + g + b);

    if (a < 250 || brightness >= startBrightness) {
      if (setValue) {
        mask[indexA] = 255;
      }

      return false;
    } // if (difference < threshold){
    //     if (setValue){
    //         mask[indexA] = 255;
    //     }
    //     return false;
    // }
    // if (setValue) {
    //     mask[indexA] = (1 - difference) * 255;
    // }


    return true;
  }
}
function getVisiblePixelFrame(ctx, rect) {
  var x = rect.x,
      y = rect.y,
      width = rect.width,
      height = rect.height;

  if (width <= 0 || height <= 0) {
    return _Rect__WEBPACK_IMPORTED_MODULE_1__.default.Empty();
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
  return new _Rect__WEBPACK_IMPORTED_MODULE_1__.default(x, y, width, height);
}
function dilateMask(pixels, width, height) {
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width - 1; x++) {
      var i = (x + y * width) * 4 + 3;

      if (pixels[i + 4]) {
        pixels[i] = 255;
      }
    }

    for (var _x2 = width - 1; _x2 > 0; _x2--) {
      var _i = (_x2 + y * width) * 4 + 3;

      if (pixels[_i - 4]) {
        pixels[_i] = 255;
      }
    }
  }

  for (var _x3 = 0; _x3 < width; _x3++) {
    for (var _y = 0; _y < height - 1; _y++) {
      var _i2 = (_x3 + _y * width) * 4 + 3;

      if (pixels[_i2 + 4 * width]) {
        pixels[_i2] = 255;
      }
    }

    for (var _y2 = height - 1; _y2 > 0; _y2--) {
      var _i3 = (_x3 + _y2 * width) * 4 + 3;

      if (pixels[_i3 - 4 * width]) {
        pixels[_i3] = 255;
      }
    }
  }
}

/***/ }),

/***/ "./src/ts/views/BookView.ts":
/*!**********************************!*\
  !*** ./src/ts/views/BookView.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ BookView; }
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ "./src/ts/views/View.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./src/ts/config.ts");
/* harmony import */ var _Thumbnail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Thumbnail */ "./src/ts/views/Thumbnail.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts");
/* harmony import */ var _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../storage/ImageStorage */ "./src/ts/storage/ImageStorage.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







var BookView = /*#__PURE__*/function (_View) {
  _inherits(BookView, _View);

  var _super = _createSuper(BookView);

  function BookView(id, onSettingsClicked) {
    var _this;

    _classCallCheck(this, BookView);

    _this = _super.call(this, id);

    var settingsButton = _this._element.getElementsByClassName("button settings")[0];

    _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.addClick(settingsButton, function () {
      return onSettingsClicked();
    });
    return _this;
  }

  _createClass(BookView, [{
    key: "show",
    value: function show() {
      _get(_getPrototypeOf(BookView.prototype), "show", this).call(this);

      this.updateImages(); // PeerToPeer.instance.onDataReceived = (data: ArrayBuffer) => {
      //     this._thumbnails[0].setImageSrc(URL.createObjectURL(new Blob([data])));
      // }
    }
  }, {
    key: "updateImages",
    value: function updateImages() {
      var _this2 = this;

      if (this._thumbnails) {
        return;
      }

      this._thumbnails = [];

      for (var i = 0; i < _config__WEBPACK_IMPORTED_MODULE_1__.config.imageCount; i++) {
        var imageId = _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_4__.imageStorage.getImagePath(i);
        var thumbnail = new _Thumbnail__WEBPACK_IMPORTED_MODULE_2__.default(this._element, imageId, function (id) {
          return _this2.onImageSelected(id);
        });

        this._thumbnails.push(thumbnail);
      }
    }
  }]);

  return BookView;
}(_View__WEBPACK_IMPORTED_MODULE_0__.View);



/***/ }),

/***/ "./src/ts/views/PaintView.ts":
/*!***********************************!*\
  !*** ./src/ts/views/PaintView.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PaintView": function() { return /* binding */ PaintView; }
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ "./src/ts/views/View.ts");
/* harmony import */ var _palettes_ColorPalette__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../palettes/ColorPalette */ "./src/ts/palettes/ColorPalette.ts");
/* harmony import */ var _palettes_SizePalette__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../palettes/SizePalette */ "./src/ts/palettes/SizePalette.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts");
/* harmony import */ var _tools_PenTool__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tools/PenTool */ "./src/ts/tools/PenTool.ts");
/* harmony import */ var _math_Vector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../math/Vector */ "./src/ts/math/Vector.ts");
/* harmony import */ var _palettes_Palette__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../palettes/Palette */ "./src/ts/palettes/Palette.ts");
/* harmony import */ var _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../storage/ImageStorage */ "./src/ts/storage/ImageStorage.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../config */ "./src/ts/config.ts");
/* harmony import */ var _palettes_ShapePalette__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../palettes/ShapePalette */ "./src/ts/palettes/ShapePalette.ts");
/* harmony import */ var _CanvasLayer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../CanvasLayer */ "./src/ts/CanvasLayer.ts");
/* harmony import */ var _ImageLayer___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../ImageLayer  */ "./src/ts/ImageLayer .ts");
/* harmony import */ var _tools_SelectionTool__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../tools/SelectionTool */ "./src/ts/tools/SelectionTool.ts");
/* harmony import */ var _Toolbar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Toolbar */ "./src/ts/Toolbar.ts");
/* harmony import */ var _History__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../History */ "./src/ts/History.ts");
/* harmony import */ var _palettes_GiftPalette__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../palettes/GiftPalette */ "./src/ts/palettes/GiftPalette.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

















var PaintView = /*#__PURE__*/function (_View) {
  _inherits(PaintView, _View);

  var _super = _createSuper(PaintView);

  function PaintView(id, onBackClicked) {
    var _this;

    _classCallCheck(this, PaintView);

    _this = _super.call(this, id);

    _initialiseProps.call(_assertThisInitialized(_this));

    _this._history = new _History__WEBPACK_IMPORTED_MODULE_14__.History();
    _this._sheet = document.getElementById("sheet");
    _this.width = _config__WEBPACK_IMPORTED_MODULE_8__.config.width;
    _this.height = _config__WEBPACK_IMPORTED_MODULE_8__.config.height;
    _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.log("Setting PaintView size to ".concat(_this.width, " x ").concat(_this.height));

    _this.addCanvasLayer("base-layer", 0, 0, _this.width, _this.height, false);

    _this.addEventListeners();

    _this.createButtons(onBackClicked);

    _this.createToolbar();

    _this.createPalettes();

    _this.createTools();

    return _this;
  }

  _createClass(PaintView, [{
    key: "color",
    get: function get() {
      return this._color;
    }
  }, {
    key: "shape",
    get: function get() {
      return this._shape;
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
    } //get layers(): Layer[] { return this._layers; }

  }, {
    key: "baseLayer",
    get: function get() {
      return this._layers["base-layer"];
    }
  }, {
    key: "overlayLayer",
    get: function get() {
      return this._layers["overlay-layer"];
    }
  }, {
    key: "getLayer",
    value: function getLayer(id) {
      return this._layers[id];
    }
  }, {
    key: "createButtons",
    value: function createButtons(onBackClicked) {
      var _this2 = this;

      var backButton = this._element.getElementsByClassName("button back")[0];

      _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.addClick(backButton, function () {
        return onBackClicked();
      });
      this._undoButton = document.getElementById("undo-button");
      _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.addClick(this._undoButton, function () {
        return _this2.undo();
      });
      this._redoButton = document.getElementById("redo-button");
      _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.addClick(this._redoButton, function () {
        return _this2.redo();
      });
      this._importImageButton = document.getElementById("import-image-button");
      _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.addClick(this._importImageButton, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var blob, url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.upload("image/*");

              case 2:
                blob = _context.sent;

                _this2.setTool(_this2.selectionTool);

                url = URL.createObjectURL(blob);
                _context.next = 7;
                return _this2.selectionTool.setImageUrl(url);

              case 7:
                URL.revokeObjectURL(url);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
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
      var layer = new _ImageLayer___WEBPACK_IMPORTED_MODULE_11__.default(this._sheet, id, x, y, width, height);
      layer.floating = floating;
      this.addLayer(layer);
      return layer;
    }
  }, {
    key: "addCanvasLayer",
    value: function addCanvasLayer(id, x, y, width, height, floating) {
      var layer = new _CanvasLayer__WEBPACK_IMPORTED_MODULE_10__.default(this._sheet, id, x, y, width, height);
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

      this.addLayer(new _ImageLayer___WEBPACK_IMPORTED_MODULE_11__.default(this._sheet, "overlay-layer", 0, 0, this.width, this.height));
    }
  }, {
    key: "removeOverlay",
    value: function removeOverlay() {
      this.removeLayer(this.overlayLayer);
    }
  }, {
    key: "setOverlay",
    value: function () {
      var _setOverlay = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var url;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_7__.imageStorage.loadImageUrl(id);

              case 2:
                url = _context2.sent;

                if (url) {
                  _context2.next = 6;
                  break;
                }

                this.removeOverlay();
                return _context2.abrupt("return");

              case 6:
                this.createOverlay();
                this.overlayLayer.image.src = url; //this.processOverlay(this.overlay.ctx);
                // show processed overlay:
                // this._overlayCtx.canvas.toBlob(blob => {
                //     this._overlay.src = URL.createObjectURL(blob);
                // })

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setOverlay(_x) {
        return _setOverlay.apply(this, arguments);
      }

      return setOverlay;
    }()
  }, {
    key: "createTools",
    value: function createTools() {
      var _this3 = this;

      var penButton = document.getElementById("tool-pen");
      _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.addLongClick(penButton, function () {
        return _this3.fill();
      });
      _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.addClick(penButton, function () {
        return _this3.setTool(_this3.markerTool);
      });
      var eraserButton = document.getElementById("tool-eraser");
      _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.addLongClick(eraserButton, function () {
        return _this3.clear(true);
      });
      _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.addClick(eraserButton, function () {
        return _this3.setTool(_this3.eraserTool);
      });
      var selectionButton = document.getElementById("tool-selection");
      _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.addClick(selectionButton, function () {
        return _this3.setTool(_this3.selectionTool);
      });
      _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.addLongClick(selectionButton, function () {
        _this3.setTool(_this3.selectionTool);

        _this3.selectionTool.selectAll();
      });
      this._tools = []; // this.brushTool = this.addTool(new PenTool(this, "tool-", "source-over"));

      this.markerTool = this.addTool(new _tools_PenTool__WEBPACK_IMPORTED_MODULE_4__.default(this, "tool-pen", "darken"));
      this.eraserTool = this.addTool(new _tools_PenTool__WEBPACK_IMPORTED_MODULE_4__.default(this, "tool-eraser", "destination-out"));
      this.selectionTool = this.addTool(new _tools_SelectionTool__WEBPACK_IMPORTED_MODULE_12__.default(this, "tool-selection")); // this.paintBucketTool = this.addTool(new PaintBucketTool(this));
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
      this._mainToolbar = new _Toolbar__WEBPACK_IMPORTED_MODULE_13__.Toolbar("main-toolbar");
      this._contextToolbar = new _Toolbar__WEBPACK_IMPORTED_MODULE_13__.Toolbar("context-toolbar");
    }
  }, {
    key: "createPalettes",
    value: function createPalettes() {
      var _this4 = this;

      this._sizePalette = new _palettes_SizePalette__WEBPACK_IMPORTED_MODULE_2__.default("size-palette");

      this._sizePalette.onSelectionChanged = function (lineWidth) {
        _this4._lineWidth = lineWidth;
      };

      this._lineWidth = this._sizePalette.size;
      this._colorPalette = new _palettes_ColorPalette__WEBPACK_IMPORTED_MODULE_1__.default("color-palette");

      this._colorPalette.onSelectionChanged = function (color) {
        return _this4._color = color;
      };

      this._color = this._colorPalette.color;
      this._shapePalette = new _palettes_ShapePalette__WEBPACK_IMPORTED_MODULE_9__.default("shape-palette");

      this._shapePalette.onSelectionChanged = function (shape) {
        _this4._shape = shape;

        _this4.setTool(_this4.selectionTool);

        _this4.selectionTool.setImageUrl(_this4.shape);
      };

      this._shape = this._shapePalette.stamp;
      this._giftPalette = new _palettes_GiftPalette__WEBPACK_IMPORTED_MODULE_15__.default("gift-palette");

      this._giftPalette.onSelectionChanged = function (path) {
        _this4.setTool(_this4.selectionTool);

        _this4.selectionTool.setImagePath(path);

        _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_7__.imageStorage.deleteImage(path);
      };

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

      this._sizePalette.setVisible(this._currentTool == this.markerTool || this._currentTool == this.eraserTool); // this._shapePalette.setVisible(this._currentTool == this.selectionTool);
      // this._importImageButton.classList.toggle("hidden", this._currentTool != this.selectionTool);

    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this5 = this;

      var canvas = this.baseLayer.canvas;
      canvas.style.pointerEvents = "auto"; //canvas.addEventListener('keydown', event => this.keyDown(event));

      document.addEventListener('keydown', function (event) {
        return _this5.keyDown(event);
      });
      canvas.addEventListener('click', function (event) {
        return event.preventDefault();
      });

      if (_config__WEBPACK_IMPORTED_MODULE_8__.config.usePointerEvents && window.PointerEvent != null) {
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
      } //canvas.addEventListener('touchforcechanged', event => this.pressureChanged(<TouchEvent>event))
      // Pressure.set(canvas, {
      //     change: (force: number, event: Event) => this.pressureChanged(force)
      // })

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

      if (_config__WEBPACK_IMPORTED_MODULE_8__.config.pixelPerfect) {
        x = Math.round(x);
        y = Math.round(y);
      }

      return new _math_Vector__WEBPACK_IMPORTED_MODULE_5__.default(x, y);
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

      if (_config__WEBPACK_IMPORTED_MODULE_8__.config.pixelPerfect) {
        x = Math.round(x);
        y = Math.round(y);
      }

      return new _math_Vector__WEBPACK_IMPORTED_MODULE_5__.default(x, y);
    }
  }, {
    key: "keyDown",
    value: function keyDown(event) {
      if (!this.isVisible()) {
        return;
      }

      switch (event.code) {}

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
        radius: this.screenToSheet(new _math_Vector__WEBPACK_IMPORTED_MODULE_5__.default(event.width, event.height)),
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
        radius: this.screenToSheet(new _math_Vector__WEBPACK_IMPORTED_MODULE_5__.default(event.width, event.height)),
        pressure: this.getNormalizedPointerPressure(event),
        speed: 1,
        isPressed: true
      });
    }
  }, {
    key: "getNormalizedPointerPressure",
    value: function getNormalizedPointerPressure(event) {
      return event.pointerType == "pen" ? _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.clamp(0.5, 2, event.pressure * 4) : 1;
    }
  }, {
    key: "getNormalizedTouchPressure",
    value: function getNormalizedTouchPressure(touch) {
      return touch.touchType == "stylus" ? _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.clamp(0.5, 2, touch.force * 4) : 1;
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
        radius: new _math_Vector__WEBPACK_IMPORTED_MODULE_5__.default(event.width, event.height),
        pressure: 1,
        speed: 1,
        isPressed: false
      });
      this._currentTouchId = 0;
    }
  }, {
    key: "pressureChanged",
    value: function pressureChanged(force) {// let pressure = Utils.clamp(0.3, 1, force * 2);
      // this._currentTool.pressure = Math.max(pressure, this._currentTool.pressure);
      // this._currentTool.pressureChanged();
    }
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
        radius: this.screenToSheet(new _math_Vector__WEBPACK_IMPORTED_MODULE_5__.default(touch.radiusX, touch.radiusY)),
        pressure: this.getNormalizedTouchPressure(touch),
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

      console.log(touch.force);
      this.move({
        timeStamp: event.timeStamp,
        position: this.getTouchEventPosition(touch),
        radius: this.screenToSheet(new _math_Vector__WEBPACK_IMPORTED_MODULE_5__.default(touch.radiusX, touch.radiusY)),
        pressure: this.getNormalizedTouchPressure(touch),
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
        position: new _math_Vector__WEBPACK_IMPORTED_MODULE_5__.default(0, 0),
        radius: new _math_Vector__WEBPACK_IMPORTED_MODULE_5__.default(0, 0),
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

      var delta = this._lastPointerData.position.distanceTo(data.position);

      if (delta <= 1) {
        return;
      }

      this._lastPointerData = this._lastPointerData || data;
      var timeDelta = data.timeStamp - this._lastPointerData.timeStamp;
      var speed = delta / timeDelta;
      data.speed = _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.lerp(this._lastPointerData.speed, speed, 0.2);
      this._lastPointerData = data;

      this._currentTool.move(data);
    }
  }, {
    key: "down",
    value: function down(data) {
      _palettes_Palette__WEBPACK_IMPORTED_MODULE_6__.Palette.collapseAll();

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

      return _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_7__.imageStorage.loadImage(id).then(function (image) {
        _this6._imageId = id;

        _this6.clear();

        if (image) {
          _this6.baseLayer.drawImage(image);
        }

        _this6.setOverlay("overlay-" + id);

        _this6.ResetHistory();

        _this6._isDirty = false;
      });
    }
  }, {
    key: "saveImage",
    value: function saveImage() {
      var _this7 = this;

      _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.log("Saving " + this._imageId);
      this.baseLayer.canvas.toBlob(function (blob) {
        return _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_7__.imageStorage.saveImage(_this7._imageId, blob);
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
      _palettes_Palette__WEBPACK_IMPORTED_MODULE_6__.Palette.collapseAll();

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
      var delta = timeStamp - this._tickTimeStamp;
      this._tickTimeStamp = timeStamp;

      if (this._currentTool) {
        this._currentTool.tick(delta); // never save while painting to avoid lags:


        if (this._lastPointerData && this._lastPointerData.isPressed) {
          return;
        }
      }

      if (this._isDirty && Date.now() > this._lastSaveTimestamp + _config__WEBPACK_IMPORTED_MODULE_8__.config.saveInterval) {
        this.saveImage();
      }
    }
  }, {
    key: "captureAutoMask",
    value: function captureAutoMask(position) {
      if (!_config__WEBPACK_IMPORTED_MODULE_8__.config.useAutoMask) {
        return;
      }

      this._autoMaskCaptured = true; // if (!this.overlayLayer){
      //     return;
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

      var imageData = this._autoMaskCtx.getImageData(0, 0, this.width, this.height); // avoid expensive floodfill:


      var index = (position.x + position.y * this.width) * 4 + 3; // if (this._autoMaskCaptured && imageData.data[index] > 0){
      //     return;
      // }

      _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.log("capturing auto mask");
      _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.floodFill(this.baseLayer.ctx, imageData.data, position, this.color);
      _utils_Utils__WEBPACK_IMPORTED_MODULE_3__.dilateMask(imageData.data, this.width, this.height);

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
      return new _math_Vector__WEBPACK_IMPORTED_MODULE_5__.default(p.x / screen.width * _config__WEBPACK_IMPORTED_MODULE_8__.config.width, p.y / screen.height * _config__WEBPACK_IMPORTED_MODULE_8__.config.height);
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
}(_View__WEBPACK_IMPORTED_MODULE_0__.View);

var _initialiseProps = function _initialiseProps() {
  this.scaleFactor = 1;
  this._currentTouchId = 0;
  this._layers = {};
  this._lastSaveTimestamp = 0;
};

/***/ }),

/***/ "./src/ts/views/SettingsView.ts":
/*!**************************************!*\
  !*** ./src/ts/views/SettingsView.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ SettingsView; }
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ "./src/ts/views/View.ts");
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts");
/* harmony import */ var _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../storage/ImageStorage */ "./src/ts/storage/ImageStorage.ts");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _storage_Server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../storage/Server */ "./src/ts/storage/Server.ts");
/* harmony import */ var _storage_DropboxStorage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../storage/DropboxStorage */ "./src/ts/storage/DropboxStorage.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config */ "./src/ts/config.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var version = "1.0.0"; //require('/package').version;

var ConsoleLogHTML = __webpack_require__(/*! console-log-html */ "./node_modules/console-log-html/console-log-html.js");






var SettingsView = /*#__PURE__*/function (_View) {
  _inherits(SettingsView, _View);

  var _super = _createSuper(SettingsView);

  function SettingsView(id, onBackClicked) {
    var _this;

    _classCallCheck(this, SettingsView);

    _this = _super.call(this, id);

    var backButton = _this._element.querySelector(".button.back");

    _utils_Utils__WEBPACK_IMPORTED_MODULE_1__.addClick(backButton, function () {
      return onBackClicked();
    });
    _this._hostElement = _this._element.querySelector("#server-url");

    _this._hostElement.onblur = function () {
      return _storage_Server__WEBPACK_IMPORTED_MODULE_4__.server.host = _this._hostElement.value;
    };

    _this._userIdElement = _this._element.querySelector("#user-id");

    _this._userIdElement.onblur = function () {
      return _storage_DropboxStorage__WEBPACK_IMPORTED_MODULE_5__.dropboxStorage.userId = _this._userIdElement.value;
    };

    _this._connectButton = _this._element.querySelector(".button.connect");
    _utils_Utils__WEBPACK_IMPORTED_MODULE_1__.addClick(_this._connectButton, function () {
      location.href = _storage_DropboxStorage__WEBPACK_IMPORTED_MODULE_5__.dropboxStorage.getAuthenticationUrl();
    });
    _this._disconnectButton = _this._element.querySelector(".button.disconnect");
    _utils_Utils__WEBPACK_IMPORTED_MODULE_1__.addClick(_this._disconnectButton, function () {
      _storage_DropboxStorage__WEBPACK_IMPORTED_MODULE_5__.dropboxStorage.unauthorize();

      _this.updateButtons();
    });
    _this._syncButton = _this._element.querySelector(".button.sync");
    _utils_Utils__WEBPACK_IMPORTED_MODULE_1__.addClick(_this._syncButton, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", _storage_DropboxStorage__WEBPACK_IMPORTED_MODULE_5__.dropboxStorage.sync());

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    var exportButton = _this._element.querySelector(".button.export");

    _utils_Utils__WEBPACK_IMPORTED_MODULE_1__.addClick(exportButton, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var zipBlob;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_2__.imageStorage.generateBackupArchive();

            case 2:
              zipBlob = _context2.sent;
              (0,file_saver__WEBPACK_IMPORTED_MODULE_3__.saveAs)(zipBlob, "web-paint-backup.zip");

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    var importButton = _this._element.querySelector(".button.import");

    _utils_Utils__WEBPACK_IMPORTED_MODULE_1__.addClick(importButton, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_2__.imageStorage;
              _context3.next = 3;
              return _utils_Utils__WEBPACK_IMPORTED_MODULE_1__.upload(".zip");

            case 3:
              _context3.t1 = _context3.sent;

              _context3.t0.importBackupArchive.call(_context3.t0, _context3.t1);

              _this.updateInfo();

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));

    var clearButton = _this._element.querySelector(".button.clear");

    _utils_Utils__WEBPACK_IMPORTED_MODULE_1__.addClick(clearButton, function () {
      if (confirm("Really clear all images?")) {
        _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_2__.imageStorage.clear();
        location.reload();
      }
    });

    if (_config__WEBPACK_IMPORTED_MODULE_6__.config.useHtmlLog) {
      ConsoleLogHTML.connect(document.getElementById("log"), {}, true, true, true);
    }

    return _this;
  }

  _createClass(SettingsView, [{
    key: "updateButtons",
    value: function updateButtons() {
      this._connectButton.classList.toggle('hidden', _storage_DropboxStorage__WEBPACK_IMPORTED_MODULE_5__.dropboxStorage.isAuthorized);

      this._disconnectButton.classList.toggle('hidden', !_storage_DropboxStorage__WEBPACK_IMPORTED_MODULE_5__.dropboxStorage.isAuthorized);

      this._syncButton.classList.toggle("disabled", !_storage_DropboxStorage__WEBPACK_IMPORTED_MODULE_5__.dropboxStorage.isAuthorized);
    }
  }, {
    key: "show",
    value: function show() {
      _get(_getPrototypeOf(SettingsView.prototype), "show", this).call(this);

      this.updateInfo();
      this.updateButtons();
    }
  }, {
    key: "updateInfo",
    value: function updateInfo() {
      var info = document.getElementById("info");
      info.innerText = "Version: ".concat(version);
      _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_2__.imageStorage.getStorageUsed().then(function (amount) {
        info.innerText += "\rStorage used: ".concat(_utils_Utils__WEBPACK_IMPORTED_MODULE_1__.formatBytes(amount, 1));
      });
      this._hostElement.value = _storage_Server__WEBPACK_IMPORTED_MODULE_4__.server.host;
      this._userIdElement.value = _storage_DropboxStorage__WEBPACK_IMPORTED_MODULE_5__.dropboxStorage.userId;
    }
  }]);

  return SettingsView;
}(_View__WEBPACK_IMPORTED_MODULE_0__.View);



/***/ }),

/***/ "./src/ts/views/Thumbnail.ts":
/*!***********************************!*\
  !*** ./src/ts/views/Thumbnail.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Thumbnail; }
/* harmony export */ });
/* harmony import */ var _utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts");
/* harmony import */ var _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storage/ImageStorage */ "./src/ts/storage/ImageStorage.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Thumbnail = /*#__PURE__*/function () {
  function Thumbnail(parent, path, onImageSelected) {
    var _this = this;

    _classCallCheck(this, Thumbnail);

    var element = document.createElement("div");
    this._element = element;
    element.id = path;
    element.classList.add("thumbnail");
    this._element.style.opacity = "0"; // Utils.addLongClick(element, () => {
    //     if (!this._image || !PeerToPeer.instance || !PeerToPeer.instance.loggedIn || PeerToPeer.instance.peerList.length < 2){
    //         return;
    //     }
    //
    //     Utils.imageToBlob(this._image)
    //         .then(blob => {
    //             const peerName = PeerToPeer.instance.peerList[1];
    //             PeerToPeer.instance.sendData(peerName, blob);
    //         });
    // });

    _utils_Utils__WEBPACK_IMPORTED_MODULE_0__.addClick(element, function () {
      if (onImageSelected) {
        onImageSelected(path);
      }
    }, true);
    _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_1__.imageStorage.addChangeListener(function (change, path) {
      if (path == _this.path || path == _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_1__.imageStorage.getOverlayPath(_this.path)) {
        _this.loadImage();
      }
    });
    parent.appendChild(element);
    this.loadImage();
  }

  _createClass(Thumbnail, [{
    key: "path",
    get: function get() {
      return this._element.id;
    }
  }, {
    key: "imageUrl",
    set: function set(src) {
      this._imageUrl = src;
      this._element.style.opacity = "1";
      this.updateBackgroundImages();
    }
  }, {
    key: "overlayUrl",
    set: function set(src) {
      this._overlayUrl = src;
      this.updateBackgroundImages();
    }
  }, {
    key: "remove",
    value: function remove() {
      this._element.remove();
    }
  }, {
    key: "isHidden",
    value: function isHidden() {
      return this._element.offsetParent === null;
    }
  }, {
    key: "loadImage",
    value: function loadImage() {
      var _this2 = this;

      _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_1__.imageStorage.loadImageUrl(this.path).then(function (url) {
        _this2.imageUrl = url;
      });
      _storage_ImageStorage__WEBPACK_IMPORTED_MODULE_1__.imageStorage.loadImageUrl(_storage_ImageStorage__WEBPACK_IMPORTED_MODULE_1__.imageStorage.getOverlayPath(this.path)).then(function (url) {
        _this2.overlayUrl = url;
      });
    }
  }, {
    key: "updateBackgroundImages",
    value: function updateBackgroundImages() {
      var urls = [];

      if (this._overlayUrl) {
        urls.push("url(".concat(this._overlayUrl, ")"));
      }

      if (this._imageUrl) {
        urls.push("url(".concat(this._imageUrl, ")"));
      }

      this._element.style.backgroundImage = urls.join(",");
    }
  }]);

  return Thumbnail;
}();



/***/ }),

/***/ "./src/ts/views/View.ts":
/*!******************************!*\
  !*** ./src/ts/views/View.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "View": function() { return /* binding */ View; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View = /*#__PURE__*/function () {
  function View(id) {
    _classCallCheck(this, View);

    this._element = document.getElementById(id);

    if (!this._element) {
      console.error("Could not find element with id ".concat(id));
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
}();

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js!./src/css/painter.css":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js!./src/css/painter.css ***!
  \*****************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  user-select: none;\n  touch-action: none;\n  /* prevent pinch zoom in whole app */\n}\n\ntextarea {\n  -webkit-user-select: initial;\n}\n\nhtml,\nbody {\n  margin: 0;\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  font-size: 40px;\n}\n\n@media (max-width: 400px), (max-height: 400px) {\n  html,\nbody {\n    font-size: 28px;\n  }\n}\nbody {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  line-height: 1.5rem;\n}\n\nbody, input, textarea {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  line-height: 1.5rem;\n}\n\n.button {\n  width: 1.5rem;\n  height: 1.5rem;\n  line-height: 1.5rem;\n  text-align: center;\n  font-size: 0.75rem;\n  border-radius: 30%;\n  cursor: pointer;\n  background: rgba(255, 255, 255, 0.5);\n  color: black;\n  transition: transform 0.25s;\n}\n\n.button.down {\n  transform: scale(0.9);\n}\n\n.button i {\n  line-height: 1.5rem;\n}\n\n.button .fa-stack {\n  height: 1em;\n  width: 1em;\n}\n\n.button .fa-stack.fa-fw {\n  width: 1.25em;\n}\n\n#dropbox-button {\n  border-radius: 3px;\n  background-color: #007ee5;\n  border: none;\n  color: #fff;\n  font-size: 16px;\n  padding: 10px 15px;\n  text-decoration: none;\n  height: 24px;\n}\n\n.view {\n  display: flex;\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  background: #BBB;\n  overflow: hidden;\n}\n\n.dropbox-auth {\n  align-items: center;\n  justify-content: center;\n}\n\n.view.book {\n  flex-wrap: wrap;\n  align-content: flex-start;\n  justify-content: center;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n\n.view.book, .view.book * {\n  touch-action: pan-y;\n}\n\n.view.settings {\n  font-size: 0.4rem;\n  display: block;\n  box-sizing: border-box;\n  line-height: 1.5em;\n  color: #444;\n}\n\n.view.settings .left-panel {\n  width: 40%;\n  padding: 1.2rem 0.25rem;\n  box-sizing: border-box;\n}\n\n.view.settings input {\n  font-size: 0.5rem;\n  line-height: 1em;\n  border: none;\n  width: 100%;\n  border-radius: 0.5em;\n  box-sizing: border-box;\n  padding: 0.5em;\n  -webkit-user-select: initial;\n}\n\n.view.settings .button {\n  width: 1rem;\n  height: 1rem;\n  line-height: 1rem;\n}\n\n.view.settings .button.text {\n  width: auto;\n  border-radius: 0.5em;\n  padding: 0 0.5em;\n  margin-bottom: 0.5em;\n  text-align: left;\n  overflow: hidden;\n  font-size: 0.5rem;\n  background: #58b0ff;\n  color: white;\n}\n\n.view.settings label {\n  display: block;\n  color: grey;\n}\n\n.view.settings #log {\n  width: 60%;\n  background: #272727;\n  color: #c7c7c7;\n  overflow: scroll;\n  -webkit-overflow-scrolling: touch;\n  touch-action: pan-y;\n  height: 100vh;\n  padding: 0;\n  font-family: monospace;\n  font-size: 12px;\n  position: fixed;\n  top: 0;\n  right: 0;\n  margin: 0;\n  line-height: 20px;\n}\n\n#log li {\n  border-bottom: #444444 solid 1px;\n  padding: 0 1em;\n}\n\n.thumbnail {\n  margin: 0.3rem;\n  color: #CCC;\n  background: white;\n  border-radius: 0.1rem;\n  font-size: 5.6rem;\n  width: 1em;\n  height: 0.75em;\n  background-size: contain;\n  cursor: pointer;\n  transition: opacity 1s;\n}\n\n.thumbnail.down {\n  transform: scale(0.9);\n}\n\n.paint {\n  align-items: center;\n}\n\n.paint #sheet {\n  font-size: 1px;\n  width: 1024em;\n  height: 768em;\n  margin: auto;\n  overflow: auto;\n  position: fixed;\n  object-fit: contain;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n}\n\n.layer {\n  position: absolute;\n  left: 0;\n  top: 0;\n  background: none;\n}\n\n#base-layer {\n  background: white;\n}\n\n.layer.floating {\n  outline: 2px dashed black;\n}\n\n#stamp-layer {\n  opacity: 0.2;\n}\n\n@media (orientation: portrait) {\n  .paint #sheet {\n    transform: rotate(-90deg);\n    overflow-x: hidden;\n  }\n}\n.button.back {\n  position: absolute;\n  top: 0.25rem;\n  left: 0.25rem;\n  z-index: 100;\n}\n\n.button.settings {\n  position: absolute;\n  right: 0.25rem;\n  top: 0.25rem;\n  z-index: 100;\n}\n\n.button a {\n  width: 100%;\n  height: 100%;\n  display: block;\n  color: black;\n}\n\n.button#stamp-button {\n  font-size: 1.25rem;\n  position: absolute;\n  top: 0.25rem;\n  right: 0.25rem;\n  width: 2rem;\n  height: 2rem;\n  z-index: 100;\n  line-height: 1.85rem;\n}\n\n.toolbar {\n  display: flex;\n  background: lightgray;\n  border-radius: 0.5rem;\n  z-index: 100;\n  position: absolute;\n}\n\n.toolbar.left {\n  flex-direction: column;\n  left: 0.25rem;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.toolbar.right {\n  flex-direction: column;\n  right: 0.25rem;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.toolbar.top {\n  flex-direction: row;\n  left: 50%;\n  top: 0.25em;\n  transform: translateX(-50%);\n}\n\n.toolbar.bottom {\n  flex-direction: row;\n  left: 50%;\n  bottom: 0.25em;\n  transform: translateX(-50%);\n}\n\n.toolbar .button {\n  /*display: inline-block;*/\n  background: transparent;\n}\n\n.toolbar .spacer {\n  width: 1.5em;\n  height: 1.5em;\n}\n\n.palette {\n  position: relative;\n  transition: transform 0.25s;\n  display: inline-block;\n  float: left;\n  text-align: center;\n  z-index: 100;\n}\n\n.palette .option i {\n  font-size: 0.75em;\n}\n\n/* down direction is default: */\n.palette .options {\n  position: absolute;\n  display: flex;\n  flex-wrap: wrap;\n  background: lightgray;\n  border-radius: 0.5rem;\n  padding: 0.25rem;\n  transition: transform 0.15s;\n  top: 2.25rem;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.palette .option {\n  width: 1em;\n  height: 1em;\n  line-height: 0.75em;\n  display: inline-block;\n  margin: 0.25em;\n  float: left;\n  transition: transform 0.25s;\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n\n.palette .options .option {\n  margin: 0.125em;\n}\n\n.palette .option:active {\n  transform: scale(0.9);\n}\n\n.palette .options .arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  font-size: 0.25rem;\n  top: -2em;\n  left: 50%;\n  margin-left: -1em;\n  border-left: 1em solid transparent;\n  border-right: 1em solid transparent;\n  border-bottom: 2em solid lightgray;\n  border-top: none;\n}\n\n#send-palette .options {\n  width: auto !important;\n}\n\n#send-palette .option {\n  width: auto;\n}\n\n.toolbar.left .palette .options {\n  left: 2.25rem;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.toolbar.left .palette .options .arrow {\n  top: initial;\n  left: -2em;\n  top: 50%;\n  margin-top: -1em;\n  border-top: 1em solid transparent;\n  border-bottom: 1em solid transparent;\n  border-right: 2em solid lightgray;\n}\n\n.toolbar.right .palette .options {\n  left: initial;\n  right: 2.25rem;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.toolbar.right .palette .options .arrow {\n  left: initial;\n  top: initial;\n  right: -2em;\n  top: 50%;\n  margin-top: -1em;\n  border-top: 1em solid transparent;\n  border-bottom: 1em solid transparent;\n  border-left: 2em solid lightgray;\n  border-right: 0;\n}\n\n.toolbar.bottom .palette .options {\n  left: 50%;\n  top: initial;\n  bottom: 2.25rem;\n  transform: translateX(-50%);\n}\n\n.toolbar.bottom .palette .options .arrow {\n  top: initial;\n  bottom: -2em;\n  left: 50%;\n  margin-left: -1em;\n  border-left: 1em solid transparent;\n  border-right: 1em solid transparent;\n  border-top: 2em solid lightgray;\n  border-bottom: none;\n}\n\n.palette.collapsed:active {\n  transform: scale(0.9);\n}\n\n.toolbar.top .palette.collapsed .options, .toolbar.bottom .palette.collapsed .options {\n  transform: translateX(-50%) scale(0);\n}\n\n.toolbar.left .palette.collapsed .options, .toolbar.right .palette.collapsed .options {\n  transform: translateY(-50%) scale(0);\n}\n\n#stamp-palette.palette .options {\n  font-size: 1.5rem;\n}\n\n@media (max-width: 400px), (max-height: 400px) {\n  #stamp-palette.palette .options {\n    font-size: 1rem;\n  }\n}\n.line-width {\n  background: black;\n  height: 100%;\n  margin: auto;\n  border-radius: 0.15em;\n}\n\n#color-palette .option {\n  border-radius: 40%;\n}\n\n.hidden {\n  display: none !important;\n}\n\n.disabled {\n  opacity: 0.25;\n}\n\n.selected {\n  background: #58b0ff !important;\n  color: white;\n}", "",{"version":3,"sources":["webpack://./painter.css"],"names":[],"mappings":"AAAA;EACI,2BAAA;EACA,yBAAA;EACA,iBAAA;EACA,kBAAA;EAAoB,oCAAA;AAExB;;AACA;EACI,4BAAA;AAEJ;;AACA;;EAEI,SAAA;EACA,WAAA;EACA,YAAA;EACA,eAAA;EACA,eAAA;AAEJ;;AACA;EACI;;IAEI,eAAA;EAEN;AACF;AACA;EACI,6CAAA;EACA,0JAAA;EACA,mBAAA;AACJ;;AAEA;EACI,0JAAA;EACA,mBAAA;AACJ;;AAEA;EACI,aAAA;EACA,cAAA;EACA,mBAAA;EACA,kBAAA;EACA,kBAAA;EACA,kBAAA;EACA,eAAA;EACA,oCAAA;EACA,YAAA;EACA,2BAAA;AACJ;;AAEA;EACI,qBAAA;AACJ;;AAEA;EACI,mBAAA;AACJ;;AAEA;EACI,WAAA;EACA,UAAA;AACJ;;AAEA;EACI,aAAA;AACJ;;AAEA;EACI,kBAAA;EACA,yBAAA;EACA,YAAA;EACA,WAAA;EACA,eAAA;EACA,kBAAA;EACA,qBAAA;EACA,YAAA;AACJ;;AAEA;EACI,aAAA;EACA,eAAA;EACA,WAAA;EACA,YAAA;EACA,gBAAA;EACA,gBAAA;AACJ;;AAEA;EACI,mBAAA;EACA,uBAAA;AACJ;;AAEA;EACI,eAAA;EACA,yBAAA;EACA,uBAAA;EACA,gBAAA;EACA,iCAAA;AACJ;;AAEA;EACI,mBAAA;AACJ;;AAEA;EACI,iBAAA;EACA,cAAA;EACA,sBAAA;EACA,kBAAA;EACA,WAAA;AACJ;;AAEA;EACI,UAAA;EACA,uBAAA;EACA,sBAAA;AACJ;;AAEA;EACI,iBAAA;EACA,gBAAA;EACA,YAAA;EACA,WAAA;EACA,oBAAA;EACA,sBAAA;EACA,cAAA;EACA,4BAAA;AACJ;;AAEA;EACI,WAAA;EACA,YAAA;EACA,iBAAA;AACJ;;AAEA;EACI,WAAA;EACA,oBAAA;EACA,gBAAA;EACA,oBAAA;EACA,gBAAA;EACA,gBAAA;EACA,iBAAA;EACA,mBAAA;EACA,YAAA;AACJ;;AAEA;EACI,cAAA;EACA,WAAA;AACJ;;AAEA;EACI,UAAA;EACA,mBAAA;EACA,cAAA;EACA,gBAAA;EACA,iCAAA;EACA,mBAAA;EACA,aAAA;EACA,UAAA;EACA,sBAAA;EACA,eAAA;EACA,eAAA;EACA,MAAA;EACA,QAAA;EACA,SAAA;EACA,iBAAA;AACJ;;AAEA;EACI,gCAAA;EACA,cAAA;AACJ;;AAEA;EACI,cAAA;EACA,WAAA;EACA,iBAAA;EACA,qBAAA;EACA,iBAAA;EACA,UAAA;EACA,cAAA;EACA,wBAAA;EACA,eAAA;EACA,sBAAA;AACJ;;AAEA;EACI,qBAAA;AACJ;;AAEA;EACI,mBAAA;AACJ;;AAEA;EACI,cAAA;EACA,aAAA;EACA,aAAA;EACA,YAAA;EACA,cAAA;EACA,eAAA;EACA,mBAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,QAAA;AACJ;;AAEA;EACI,kBAAA;EACA,OAAA;EACA,MAAA;EACA,gBAAA;AACJ;;AAEA;EACI,iBAAA;AACJ;;AAEA;EACI,yBAAA;AACJ;;AAEA;EACI,YAAA;AACJ;;AAEA;EACI;IACI,yBAAA;IACA,kBAAA;EACN;AACF;AAGA;EACI,kBAAA;EACA,YAAA;EACA,aAAA;EACA,YAAA;AADJ;;AAIA;EACI,kBAAA;EACA,cAAA;EACA,YAAA;EACA,YAAA;AADJ;;AAIA;EACI,WAAA;EACA,YAAA;EACA,cAAA;EACA,YAAA;AADJ;;AAIA;EACI,kBAAA;EACA,kBAAA;EACA,YAAA;EACA,cAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;EACA,oBAAA;AADJ;;AAIA;EACI,aAAA;EACA,qBAAA;EACA,qBAAA;EACA,YAAA;EACA,kBAAA;AADJ;;AAIA;EACI,sBAAA;EACA,aAAA;EACA,QAAA;EACA,2BAAA;AADJ;;AAIA;EACI,sBAAA;EACA,cAAA;EACA,QAAA;EACA,2BAAA;AADJ;;AAIA;EACI,mBAAA;EACA,SAAA;EACA,WAAA;EACA,2BAAA;AADJ;;AAIA;EACI,mBAAA;EACA,SAAA;EACA,cAAA;EACA,2BAAA;AADJ;;AAKA;EACI,yBAAA;EACA,uBAAA;AAFJ;;AAKA;EACI,YAAA;EACA,aAAA;AAFJ;;AAKA;EACI,kBAAA;EACA,2BAAA;EACA,qBAAA;EACA,WAAA;EACA,kBAAA;EACA,YAAA;AAFJ;;AAKA;EACI,iBAAA;AAFJ;;AAKA,+BAAA;AACA;EACI,kBAAA;EACA,aAAA;EACA,eAAA;EACA,qBAAA;EACA,qBAAA;EACA,gBAAA;EACA,2BAAA;EACA,YAAA;EACA,SAAA;EACA,2BAAA;AAFJ;;AAKA;EACI,UAAA;EACA,WAAA;EACA,mBAAA;EACA,qBAAA;EACA,cAAA;EACA,WAAA;EACA,2BAAA;EACA,wBAAA;EACA,4BAAA;EACA,2BAAA;AAFJ;;AAKA;EACI,eAAA;AAFJ;;AAKA;EACI,qBAAA;AAFJ;;AAKA;EACI,kBAAA;EACA,QAAA;EACA,SAAA;EACA,kBAAA;EACA,SAAA;EACA,SAAA;EACA,iBAAA;EACA,kCAAA;EACA,mCAAA;EACA,kCAAA;EACA,gBAAA;AAFJ;;AAKA;EACI,sBAAA;AAFJ;;AAKA;EACI,WAAA;AAFJ;;AAKA;EACI,aAAA;EACA,QAAA;EACA,2BAAA;AAFJ;;AAKA;EACI,YAAA;EACA,UAAA;EACA,QAAA;EACA,gBAAA;EACA,iCAAA;EACA,oCAAA;EACA,iCAAA;AAFJ;;AAKA;EACI,aAAA;EACA,cAAA;EACA,QAAA;EACA,2BAAA;AAFJ;;AAKA;EACI,aAAA;EACA,YAAA;EACA,WAAA;EACA,QAAA;EACA,gBAAA;EACA,iCAAA;EACA,oCAAA;EACA,gCAAA;EACA,eAAA;AAFJ;;AAKA;EACI,SAAA;EACA,YAAA;EACA,eAAA;EACA,2BAAA;AAFJ;;AAKA;EACI,YAAA;EACA,YAAA;EACA,SAAA;EACA,iBAAA;EACA,kCAAA;EACA,mCAAA;EACA,+BAAA;EACA,mBAAA;AAFJ;;AAKA;EACI,qBAAA;AAFJ;;AAKA;EACI,oCAAA;AAFJ;;AAKA;EACI,oCAAA;AAFJ;;AAKA;EACI,iBAAA;AAFJ;;AAKA;EACI;IACI,eAAA;EAFN;AACF;AAKA;EACI,iBAAA;EACA,YAAA;EACA,YAAA;EACA,qBAAA;AAHJ;;AAMA;EACI,kBAAA;AAHJ;;AAMA;EACI,wBAAA;AAHJ;;AAMA;EACI,aAAA;AAHJ;;AAMA;EACI,8BAAA;EACA,YAAA;AAHJ","sourcesContent":["* {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    user-select: none;\n    touch-action: none; /* prevent pinch zoom in whole app */\n}\n\ntextarea {\n    -webkit-user-select: initial;\n}\n\nhtml,\nbody{\n    margin: 0;\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    font-size: 40px;\n}\n\n@media (max-width: 400px), (max-height: 400px){\n    html,\n    body{\n        font-size: 28px;\n    }   \n}\n\nbody {\n    -webkit-tap-highlight-color: rgba(0,0,0,0);\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n    line-height: 1.5rem;\n}\n\nbody, input, textarea {\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n    line-height: 1.5rem;\n}\n\n.button {\n    width: 1.5rem;\n    height: 1.5rem;\n    line-height: 1.5rem;\n    text-align: center;\n    font-size: 0.75rem;\n    border-radius: 30%;\n    cursor: pointer;\n    background: rgba(255, 255, 255, 0.5);\n    color: black;\n    transition: transform 0.25s;\n}\n\n.button.down {\n    transform: scale(0.9);\n}\n\n.button i{\n    line-height: 1.5rem;\n}\n\n.button .fa-stack{\n    height: 1em;\n    width: 1em;    \n}\n\n.button .fa-stack.fa-fw{\n    width: 1.25em;    \n}\n\n#dropbox-button{\n    border-radius: 3px;\n    background-color: #007ee5;\n    border: none;\n    color: #fff;\n    font-size: 16px;\n    padding: 10px 15px;\n    text-decoration: none;\n    height: 24px;\n}\n\n.view {\n    display: flex;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    background: #BBB;\n    overflow: hidden;\n}\n\n.dropbox-auth{\n    align-items: center;\n    justify-content: center;\n}\n\n.view.book {\n    flex-wrap: wrap;\n    align-content: flex-start;\n    justify-content: center;\n    overflow-y: auto;\n    -webkit-overflow-scrolling: touch;\n}\n\n.view.book, .view.book * {\n    touch-action: pan-y;\n}\n\n.view.settings {\n    font-size: .4rem;\n    display: block;\n    box-sizing: border-box;\n    line-height: 1.5em;\n    color: #444;\n}\n\n.view.settings .left-panel{\n    width: 40%;\n    padding: 1.2rem .25rem;\n    box-sizing: border-box;\n}\n\n.view.settings input{\n    font-size: 0.5rem;\n    line-height: 1em;\n    border: none;\n    width: 100%;\n    border-radius: 0.5em;\n    box-sizing: border-box;\n    padding: 0.5em;\n    -webkit-user-select: initial;\n}\n\n.view.settings .button{\n    width: 1rem;\n    height: 1rem;\n    line-height: 1rem;\n}\n\n.view.settings .button.text {\n    width: auto;\n    border-radius: .5em;\n    padding: 0 .5em;\n    margin-bottom: .5em;\n    text-align: left;\n    overflow: hidden;\n    font-size: 0.5rem;\n    background: #58b0ff;\n    color: white;\n}\n\n.view.settings label{\n    display: block;\n    color: grey;\n}\n\n.view.settings #log {\n    width: 60%;\n    background: #272727;\n    color: #c7c7c7;\n    overflow: scroll;\n    -webkit-overflow-scrolling: touch;\n    touch-action: pan-y;\n    height: 100vh;\n    padding: 0;\n    font-family: monospace;\n    font-size: 12px;\n    position: fixed;\n    top: 0;\n    right: 0;\n    margin: 0;\n    line-height: 20px;\n}\n\n#log li {\n    border-bottom: #444444 solid 1px;\n    padding: 0 1em;\n}\n\n.thumbnail {\n    margin: 0.3rem;\n    color: #CCC;\n    background: white;\n    border-radius: 0.1rem;\n    font-size: 5.6rem;\n    width: 1em;\n    height: 0.75em;\n    background-size: contain;\n    cursor: pointer;\n    transition: opacity 1s;\n}\n\n.thumbnail.down {\n    transform: scale(0.9);\n}\n\n.paint{\n    align-items: center;\n}\n\n.paint #sheet {\n    font-size: 1px;\n    width: 1024em;\n    height: 768em;\n    margin: auto;\n    overflow: auto;\n    position: fixed;\n    object-fit: contain;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    right: 0;\n}\n\n.layer {\n    position: absolute;\n    left: 0;\n    top: 0;\n    background: none;\n}\n\n#base-layer {\n    background: white;\n}\n\n.layer.floating{\n    outline: 2px dashed black;\n}\n\n#stamp-layer{\n    opacity: 0.2;\n}\n\n@media (orientation: portrait) {\n    .paint #sheet {\n        transform: rotate(-90deg);\n        overflow-x: hidden;\n    }\n}\n\n\n.button.back {\n    position: absolute;\n    top: 0.25rem;\n    left: 0.25rem;\n    z-index: 100;\n}\n\n.button.settings {\n    position: absolute;\n    right: 0.25rem;\n    top: 0.25rem;\n    z-index: 100;\n}\n\n.button a{\n    width: 100%;\n    height: 100%;\n    display: block;\n    color: black;    \n}\n\n.button#stamp-button{\n    font-size: 1.25rem;\n    position: absolute;\n    top: 0.25rem;\n    right: 0.25rem;\n    width: 2rem;\n    height: 2rem;\n    z-index: 100;\n    line-height: 1.85rem;\n}\n\n.toolbar {\n    display: flex;\n    background: lightgray;\n    border-radius: 0.5rem;\n    z-index: 100;\n    position: absolute;\n}\n\n.toolbar.left {\n    flex-direction: column;\n    left: 0.25rem;\n    top: 50%;\n    transform: translateY(-50%);\n}\n\n.toolbar.right {\n    flex-direction: column;\n    right: 0.25rem;\n    top: 50%;\n    transform: translateY(-50%);\n}\n\n.toolbar.top {\n    flex-direction: row;\n    left: 50%;\n    top: 0.25em;\n    transform: translateX(-50%);\n}\n\n.toolbar.bottom {\n    flex-direction: row;\n    left: 50%;\n    bottom: 0.25em;\n    transform: translateX(-50%);\n}\n\n\n.toolbar .button {\n    /*display: inline-block;*/\n    background: transparent;\n}\n\n.toolbar .spacer {\n    width: 1.5em;\n    height: 1.5em;\n}\n\n.palette {\n    position: relative;\n    transition: transform 0.25s;\n    display: inline-block;\n    float: left;\n    text-align: center;\n    z-index: 100;\n}\n\n.palette .option i {\n    font-size: 0.75em;\n}\n\n/* down direction is default: */\n.palette .options{\n    position: absolute;\n    display: flex;\n    flex-wrap: wrap;\n    background: lightgray;\n    border-radius: 0.5rem;\n    padding: 0.25rem;\n    transition: transform 0.15s;\n    top: 2.25rem;\n    left: 50%;\n    transform: translateX(-50%);\n}\n\n.palette .option {\n    width: 1em;\n    height: 1em;\n    line-height: 0.75em;\n    display: inline-block;\n    margin: 0.25em;\n    float: left;\n    transition: transform 0.25s;\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-position: center;\n}\n\n.palette .options .option {\n    margin: 0.125em;\n}\n\n.palette .option:active {\n    transform: scale(0.9);\n}\n\n.palette .options .arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    font-size: 0.25rem;\n    top: -2em;\n    left: 50%;\n    margin-left: -1em;\n    border-left: 1em solid transparent;\n    border-right: 1em solid transparent;\n    border-bottom: 2em solid lightgray;\n    border-top: none;\n}\n\n#send-palette .options{\n    width: auto!important;\n}\n\n#send-palette .option{\n    width: auto;\n}\n\n.toolbar.left .palette .options{\n    left: 2.25rem;\n    top: 50%;\n    transform: translateY(-50%);\n}\n\n.toolbar.left .palette .options .arrow {\n    top: initial;\n    left: -2em;\n    top: 50%;\n    margin-top: -1em;\n    border-top: 1em solid transparent;\n    border-bottom: 1em solid transparent;\n    border-right: 2em solid lightgray;\n}\n\n.toolbar.right .palette .options{\n    left: initial;\n    right: 2.25rem;\n    top: 50%;\n    transform: translateY(-50%);\n}\n\n.toolbar.right .palette .options .arrow {\n    left: initial;\n    top: initial;\n    right: -2em;\n    top: 50%;\n    margin-top: -1em;\n    border-top: 1em solid transparent;\n    border-bottom: 1em solid transparent;\n    border-left: 2em solid lightgray;\n    border-right: 0;\n}\n\n.toolbar.bottom .palette .options{\n    left: 50%;\n    top: initial;\n    bottom: 2.25rem;\n    transform: translateX(-50%);\n}\n\n.toolbar.bottom .palette .options .arrow {\n    top: initial;\n    bottom: -2em;\n    left: 50%;\n    margin-left: -1em;\n    border-left: 1em solid transparent;\n    border-right: 1em solid transparent;\n    border-top: 2em solid lightgray;\n    border-bottom: none;\n}\n\n.palette.collapsed:active {\n    transform: scale(0.9);\n}\n\n.toolbar.top .palette.collapsed .options, .toolbar.bottom .palette.collapsed .options {\n    transform: translateX(-50%) scale(0.0);\n}\n\n.toolbar.left .palette.collapsed .options, .toolbar.right .palette.collapsed .options {\n    transform: translateY(-50%) scale(0.0);\n}\n\n#stamp-palette.palette .options{\n    font-size: 1.5rem;\n}\n\n@media (max-width: 400px), (max-height: 400px){\n    #stamp-palette.palette .options{\n        font-size: 1rem;\n    }\n}\n\n.line-width{\n    background: black;\n    height: 100%;\n    margin: auto;\n    border-radius: 0.15em;\n}\n\n#color-palette .option {\n    border-radius: 40%;\n}\n\n.hidden {\n    display: none!important;\n}\n\n.disabled {\n    opacity: 0.25;\n}\n\n.selected {\n    background: #58b0ff!important;\n    color: white;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/css/painter.css":
/*!*****************************!*\
  !*** ./src/css/painter.css ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_painter_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/resolve-url-loader/index.js!../../node_modules/sass-loader/dist/cjs.js!./painter.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js!./src/css/painter.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_painter_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_resolve_url_loader_index_js_node_modules_sass_loader_dist_cjs_js_painter_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "?8465":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (function() {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
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
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = function() {};
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./src/ts/app.ts","vendors-node_modules_fortawesome_fontawesome-svg-core_index_es_js-node_modules_fortawesome_fr-235257"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = function() {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkweb_paint"] = self["webpackChunkweb_paint"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = function() {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = function() {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (function() {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	__webpack_require__.x();
/******/ })()
;
//# sourceMappingURL=main.cb8d13e20952580b15e1.js.map