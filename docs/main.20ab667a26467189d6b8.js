/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js!./src/css/painter.css":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js!./src/css/painter.css ***!
  \*****************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  user-select: none;\n  touch-action: none;\n  /* prevent pinch zoom in whole app */\n}\n\ntextarea {\n  -webkit-user-select: initial;\n}\n\nhtml,\nbody {\n  margin: 0;\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  font-size: 40px;\n}\n\n@media (max-width: 400px), (max-height: 400px) {\n  html,\nbody {\n    font-size: 28px;\n  }\n}\nbody {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  line-height: 1.5rem;\n}\n\nbody, input, textarea {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  line-height: 1.5rem;\n}\n\n.button {\n  width: 1.5rem;\n  height: 1.5rem;\n  line-height: 1.5rem;\n  text-align: center;\n  font-size: 0.75rem;\n  border-radius: 30%;\n  cursor: pointer;\n  background: rgba(255, 255, 255, 0.5);\n  color: black;\n  transition: transform 0.25s;\n}\n\n.button.down {\n  transform: scale(0.9);\n}\n\n.button i {\n  line-height: 1.5rem;\n}\n\n#dropbox-button {\n  border-radius: 3px;\n  background-color: #007ee5;\n  border: none;\n  color: #fff;\n  font-size: 16px;\n  padding: 10px 15px;\n  text-decoration: none;\n  height: 24px;\n}\n\n.view {\n  display: flex;\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  background: #BBB;\n  overflow: hidden;\n}\n\n.dropbox-auth {\n  align-items: center;\n  justify-content: center;\n}\n\n.view.book {\n  flex-wrap: wrap;\n  align-content: flex-start;\n  justify-content: center;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n\n.view.book, .view.book * {\n  touch-action: pan-y;\n}\n\n.view.settings {\n  font-size: 0.5rem;\n  padding: 2rem;\n  display: block;\n  box-sizing: border-box;\n  padding-right: 52%;\n  line-height: 1.4em;\n}\n\n.view.settings .button.text {\n  width: auto;\n  border-radius: 0.5em;\n  padding: 0 0.5em;\n  margin-right: 0.5em;\n  margin-bottom: 0.5em;\n}\n\n.view.settings label {\n  display: block;\n  text-transform: uppercase;\n  color: grey;\n}\n\n.view.settings #log {\n  width: 50vw;\n  background: #272727;\n  color: #c7c7c7;\n  overflow: scroll;\n  -webkit-overflow-scrolling: touch;\n  touch-action: pan-y;\n  height: 100vh;\n  padding: 0;\n  font-family: monospace;\n  font-size: 12px;\n  position: fixed;\n  top: 0;\n  right: 0;\n  margin: 0;\n  line-height: 20px;\n}\n\n#log li {\n  border-bottom: #444444 solid 1px;\n  padding: 0 1em;\n}\n\n.thumbnail {\n  margin: 0.3rem;\n  color: #CCC;\n  background: white;\n  border-radius: 0.1rem;\n  font-size: 5.6rem;\n  width: 1em;\n  height: 0.75em;\n  background-size: contain;\n  cursor: pointer;\n  transition: opacity 1s;\n}\n\n.thumbnail.down {\n  transform: scale(0.9);\n}\n\n.paint {\n  align-items: center;\n}\n\n.paint #sheet {\n  font-size: 1px;\n  width: 1024em;\n  height: 768em;\n  margin: auto;\n  overflow: auto;\n  position: fixed;\n  object-fit: contain;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n}\n\n.layer {\n  position: absolute;\n  left: 0;\n  top: 0;\n  background: none;\n}\n\n#base-layer {\n  background: white;\n}\n\n.layer.floating {\n  outline: 2px dashed black;\n}\n\n#stamp-layer {\n  opacity: 0.2;\n}\n\n@media (orientation: portrait) {\n  .paint #sheet {\n    transform: rotate(-90deg);\n    overflow-x: hidden;\n  }\n}\n.button.back {\n  position: absolute;\n  top: 0.25rem;\n  left: 0.25rem;\n  z-index: 100;\n}\n\n.button.settings {\n  position: absolute;\n  right: 0.25rem;\n  top: 0.25rem;\n  z-index: 100;\n}\n\n.button a {\n  width: 100%;\n  height: 100%;\n  display: block;\n  color: black;\n}\n\n.button#stamp-button {\n  font-size: 1.25rem;\n  position: absolute;\n  top: 0.25rem;\n  right: 0.25rem;\n  width: 2rem;\n  height: 2rem;\n  z-index: 100;\n  line-height: 1.85rem;\n}\n\n.toolbar {\n  display: flex;\n  background: lightgray;\n  border-radius: 0.5rem;\n  z-index: 100;\n  position: absolute;\n}\n\n.toolbar.left {\n  flex-direction: column;\n  left: 0.25rem;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.toolbar.right {\n  flex-direction: column;\n  right: 0.25rem;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.toolbar.top {\n  flex-direction: row;\n  left: 50%;\n  top: 0.25em;\n  transform: translateX(-50%);\n}\n\n.toolbar.bottom {\n  flex-direction: row;\n  left: 50%;\n  bottom: 0.25em;\n  transform: translateX(-50%);\n}\n\n.toolbar .button {\n  /*display: inline-block;*/\n  background: transparent;\n}\n\n.toolbar .spacer {\n  width: 1.5em;\n  height: 1.5em;\n}\n\n.palette {\n  position: relative;\n  transition: transform 0.25s;\n  display: inline-block;\n  float: left;\n  text-align: center;\n  z-index: 100;\n}\n\n.palette .option i {\n  font-size: 0.75em;\n}\n\n/* down direction is default: */\n.palette .options {\n  position: absolute;\n  display: flex;\n  flex-wrap: wrap;\n  background: lightgray;\n  border-radius: 0.5rem;\n  padding: 0.25rem;\n  transition: transform 0.15s;\n  top: 2.25rem;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.palette .option {\n  width: 1em;\n  height: 1em;\n  line-height: 0.75em;\n  display: inline-block;\n  margin: 0.25em;\n  float: left;\n  transition: transform 0.25s;\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n\n.palette .options .option {\n  margin: 0.125em;\n}\n\n.palette .option:active {\n  transform: scale(0.9);\n}\n\n.palette .options .arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  font-size: 0.25rem;\n  top: -2em;\n  left: 50%;\n  margin-left: -1em;\n  border-left: 1em solid transparent;\n  border-right: 1em solid transparent;\n  border-bottom: 2em solid lightgray;\n  border-top: none;\n}\n\n.toolbar.left .palette .options {\n  left: 2.25rem;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.toolbar.left .palette .options .arrow {\n  top: initial;\n  left: -2em;\n  top: 50%;\n  margin-top: -1em;\n  border-top: 1em solid transparent;\n  border-bottom: 1em solid transparent;\n  border-right: 2em solid lightgray;\n}\n\n.toolbar.right .palette .options {\n  left: initial;\n  right: 2.25rem;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.toolbar.right .palette .options .arrow {\n  left: initial;\n  top: initial;\n  right: -2em;\n  top: 50%;\n  margin-top: -1em;\n  border-top: 1em solid transparent;\n  border-bottom: 1em solid transparent;\n  border-left: 2em solid lightgray;\n  border-right: 0;\n}\n\n.toolbar.bottom .palette .options {\n  left: 50%;\n  top: initial;\n  bottom: 2.25rem;\n  transform: translateX(-50%);\n}\n\n.toolbar.bottom .palette .options .arrow {\n  top: initial;\n  bottom: -2em;\n  left: 50%;\n  margin-left: -1em;\n  border-left: 1em solid transparent;\n  border-right: 1em solid transparent;\n  border-top: 2em solid lightgray;\n  border-bottom: none;\n}\n\n.palette.collapsed:active {\n  transform: scale(0.9);\n}\n\n.toolbar.top .palette.collapsed .options, .toolbar.bottom .palette.collapsed .options {\n  transform: translateX(-50%) scale(0);\n}\n\n.toolbar.left .palette.collapsed .options, .toolbar.right .palette.collapsed .options {\n  transform: translateY(-50%) scale(0);\n}\n\n#stamp-palette.palette .options {\n  font-size: 1.5rem;\n}\n\n@media (max-width: 400px), (max-height: 400px) {\n  #stamp-palette.palette .options {\n    font-size: 1rem;\n  }\n}\n.line-width {\n  background: black;\n  height: 100%;\n  margin: auto;\n  border-radius: 0.15em;\n}\n\n#color-palette .option {\n  border-radius: 40%;\n}\n\n.hidden {\n  display: none !important;\n}\n\n.disabled {\n  opacity: 0.25;\n}\n\n.selected {\n  background: #58b0ff !important;\n  color: white;\n}", "",{"version":3,"sources":["webpack://./painter.css"],"names":[],"mappings":"AAAA;EACI,2BAAA;EACA,yBAAA;EACA,iBAAA;EACA,kBAAA;EAAoB,oCAAA;AAExB;;AACA;EACI,4BAAA;AAEJ;;AACA;;EAEI,SAAA;EACA,WAAA;EACA,YAAA;EACA,eAAA;EACA,eAAA;AAEJ;;AACA;EACI;;IAEI,eAAA;EAEN;AACF;AACA;EACI,6CAAA;EACA,0JAAA;EACA,mBAAA;AACJ;;AAEA;EACI,0JAAA;EACA,mBAAA;AACJ;;AAEA;EACI,aAAA;EACA,cAAA;EACA,mBAAA;EACA,kBAAA;EACA,kBAAA;EACA,kBAAA;EACA,eAAA;EACA,oCAAA;EACA,YAAA;EACA,2BAAA;AACJ;;AAEA;EACI,qBAAA;AACJ;;AAEA;EACI,mBAAA;AACJ;;AAEA;EACI,kBAAA;EACA,yBAAA;EACA,YAAA;EACA,WAAA;EACA,eAAA;EACA,kBAAA;EACA,qBAAA;EACA,YAAA;AACJ;;AAEA;EACI,aAAA;EACA,eAAA;EACA,WAAA;EACA,YAAA;EACA,gBAAA;EACA,gBAAA;AACJ;;AAEA;EACI,mBAAA;EACA,uBAAA;AACJ;;AAEA;EACI,eAAA;EACA,yBAAA;EACA,uBAAA;EACA,gBAAA;EACA,iCAAA;AACJ;;AAEA;EACI,mBAAA;AACJ;;AAEA;EACI,iBAAA;EACA,aAAA;EACA,cAAA;EACA,sBAAA;EACA,kBAAA;EACA,kBAAA;AACJ;;AAEA;EACI,WAAA;EACA,oBAAA;EACA,gBAAA;EACA,mBAAA;EACA,oBAAA;AACJ;;AAEA;EACI,cAAA;EACA,yBAAA;EACA,WAAA;AACJ;;AAEA;EACI,WAAA;EACA,mBAAA;EACA,cAAA;EACA,gBAAA;EACA,iCAAA;EACA,mBAAA;EACA,aAAA;EACA,UAAA;EACA,sBAAA;EACA,eAAA;EACA,eAAA;EACA,MAAA;EACA,QAAA;EACA,SAAA;EACA,iBAAA;AACJ;;AAEA;EACI,gCAAA;EACA,cAAA;AACJ;;AAEA;EACI,cAAA;EACA,WAAA;EACA,iBAAA;EACA,qBAAA;EACA,iBAAA;EACA,UAAA;EACA,cAAA;EACA,wBAAA;EACA,eAAA;EACA,sBAAA;AACJ;;AAEA;EACI,qBAAA;AACJ;;AAEA;EACI,mBAAA;AACJ;;AAEA;EACI,cAAA;EACA,aAAA;EACA,aAAA;EACA,YAAA;EACA,cAAA;EACA,eAAA;EACA,mBAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,QAAA;AACJ;;AAEA;EACI,kBAAA;EACA,OAAA;EACA,MAAA;EACA,gBAAA;AACJ;;AAEA;EACI,iBAAA;AACJ;;AAEA;EACI,yBAAA;AACJ;;AAEA;EACI,YAAA;AACJ;;AAEA;EACI;IACI,yBAAA;IACA,kBAAA;EACN;AACF;AAGA;EACI,kBAAA;EACA,YAAA;EACA,aAAA;EACA,YAAA;AADJ;;AAIA;EACI,kBAAA;EACA,cAAA;EACA,YAAA;EACA,YAAA;AADJ;;AAIA;EACI,WAAA;EACA,YAAA;EACA,cAAA;EACA,YAAA;AADJ;;AAIA;EACI,kBAAA;EACA,kBAAA;EACA,YAAA;EACA,cAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;EACA,oBAAA;AADJ;;AAIA;EACI,aAAA;EACA,qBAAA;EACA,qBAAA;EACA,YAAA;EACA,kBAAA;AADJ;;AAIA;EACI,sBAAA;EACA,aAAA;EACA,QAAA;EACA,2BAAA;AADJ;;AAIA;EACI,sBAAA;EACA,cAAA;EACA,QAAA;EACA,2BAAA;AADJ;;AAIA;EACI,mBAAA;EACA,SAAA;EACA,WAAA;EACA,2BAAA;AADJ;;AAIA;EACI,mBAAA;EACA,SAAA;EACA,cAAA;EACA,2BAAA;AADJ;;AAKA;EACI,yBAAA;EACA,uBAAA;AAFJ;;AAKA;EACI,YAAA;EACA,aAAA;AAFJ;;AAKA;EACI,kBAAA;EACA,2BAAA;EACA,qBAAA;EACA,WAAA;EACA,kBAAA;EACA,YAAA;AAFJ;;AAKA;EACI,iBAAA;AAFJ;;AAKA,+BAAA;AACA;EACI,kBAAA;EACA,aAAA;EACA,eAAA;EACA,qBAAA;EACA,qBAAA;EACA,gBAAA;EACA,2BAAA;EACA,YAAA;EACA,SAAA;EACA,2BAAA;AAFJ;;AAKA;EACI,UAAA;EACA,WAAA;EACA,mBAAA;EACA,qBAAA;EACA,cAAA;EACA,WAAA;EACA,2BAAA;EACA,wBAAA;EACA,4BAAA;EACA,2BAAA;AAFJ;;AAKA;EACI,eAAA;AAFJ;;AAKA;EACI,qBAAA;AAFJ;;AAKA;EACI,kBAAA;EACA,QAAA;EACA,SAAA;EACA,kBAAA;EACA,SAAA;EACA,SAAA;EACA,iBAAA;EACA,kCAAA;EACA,mCAAA;EACA,kCAAA;EACA,gBAAA;AAFJ;;AAKA;EACI,aAAA;EACA,QAAA;EACA,2BAAA;AAFJ;;AAKA;EACI,YAAA;EACA,UAAA;EACA,QAAA;EACA,gBAAA;EACA,iCAAA;EACA,oCAAA;EACA,iCAAA;AAFJ;;AAKA;EACI,aAAA;EACA,cAAA;EACA,QAAA;EACA,2BAAA;AAFJ;;AAKA;EACI,aAAA;EACA,YAAA;EACA,WAAA;EACA,QAAA;EACA,gBAAA;EACA,iCAAA;EACA,oCAAA;EACA,gCAAA;EACA,eAAA;AAFJ;;AAKA;EACI,SAAA;EACA,YAAA;EACA,eAAA;EACA,2BAAA;AAFJ;;AAKA;EACI,YAAA;EACA,YAAA;EACA,SAAA;EACA,iBAAA;EACA,kCAAA;EACA,mCAAA;EACA,+BAAA;EACA,mBAAA;AAFJ;;AAKA;EACI,qBAAA;AAFJ;;AAKA;EACI,oCAAA;AAFJ;;AAKA;EACI,oCAAA;AAFJ;;AAKA;EACI,iBAAA;AAFJ;;AAKA;EACI;IACI,eAAA;EAFN;AACF;AAKA;EACI,iBAAA;EACA,YAAA;EACA,YAAA;EACA,qBAAA;AAHJ;;AAMA;EACI,kBAAA;AAHJ;;AAMA;EACI,wBAAA;AAHJ;;AAMA;EACI,aAAA;AAHJ;;AAMA;EACI,8BAAA;EACA,YAAA;AAHJ","sourcesContent":["* {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    user-select: none;\n    touch-action: none; /* prevent pinch zoom in whole app */\n}\n\ntextarea {\n    -webkit-user-select: initial;\n}\n\nhtml,\nbody{\n    margin: 0;\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    font-size: 40px;\n}\n\n@media (max-width: 400px), (max-height: 400px){\n    html,\n    body{\n        font-size: 28px;\n    }   \n}\n\nbody {\n    -webkit-tap-highlight-color: rgba(0,0,0,0);\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n    line-height: 1.5rem;\n}\n\nbody, input, textarea {\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n    line-height: 1.5rem;\n}\n\n.button {\n    width: 1.5rem;\n    height: 1.5rem;\n    line-height: 1.5rem;\n    text-align: center;\n    font-size: 0.75rem;\n    border-radius: 30%;\n    cursor: pointer;\n    background: rgba(255, 255, 255, 0.5);\n    color: black;\n    transition: transform 0.25s;\n}\n\n.button.down {\n    transform: scale(0.9);\n}\n\n.button i{\n    line-height: 1.5rem;\n}\n\n#dropbox-button{\n    border-radius: 3px;\n    background-color: #007ee5;\n    border: none;\n    color: #fff;\n    font-size: 16px;\n    padding: 10px 15px;\n    text-decoration: none;\n    height: 24px;\n}\n\n.view {\n    display: flex;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    background: #BBB;\n    overflow: hidden;\n}\n\n.dropbox-auth{\n    align-items: center;\n    justify-content: center;\n}\n\n.view.book {\n    flex-wrap: wrap;\n    align-content: flex-start;\n    justify-content: center;\n    overflow-y: auto;\n    -webkit-overflow-scrolling: touch;\n}\n\n.view.book, .view.book * {\n    touch-action: pan-y;\n}\n\n.view.settings {\n    font-size: 0.5rem;\n    padding: 2rem;\n    display: block;\n    box-sizing: border-box;\n    padding-right: 52%;\n    line-height: 1.4em;\n}\n\n.view.settings .button.text {\n    width: auto;\n    border-radius: 0.5em;\n    padding: 0 0.5em;\n    margin-right: 0.5em;\n    margin-bottom: 0.5em;\n}\n\n.view.settings label{\n    display: block;\n    text-transform: uppercase;\n    color: grey;\n}\n\n.view.settings #log {\n    width: 50vw;\n    background: #272727;\n    color: #c7c7c7;\n    overflow: scroll;\n    -webkit-overflow-scrolling: touch;\n    touch-action: pan-y;\n    height: 100vh;\n    padding: 0;\n    font-family: monospace;\n    font-size: 12px;\n    position: fixed;\n    top: 0;\n    right: 0;\n    margin: 0;\n    line-height: 20px;\n}\n\n#log li {\n    border-bottom: #444444 solid 1px;\n    padding: 0 1em;\n}\n\n.thumbnail {\n    margin: 0.3rem;\n    color: #CCC;\n    background: white;\n    border-radius: 0.1rem;\n    font-size: 5.6rem;\n    width: 1em;\n    height: 0.75em;\n    background-size: contain;\n    cursor: pointer;\n    transition: opacity 1s;\n}\n\n.thumbnail.down {\n    transform: scale(0.9);\n}\n\n.paint{\n    align-items: center;\n}\n\n.paint #sheet {\n    font-size: 1px;\n    width: 1024em;\n    height: 768em;\n    margin: auto;\n    overflow: auto;\n    position: fixed;\n    object-fit: contain;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    right: 0;\n}\n\n.layer {\n    position: absolute;\n    left: 0;\n    top: 0;\n    background: none;\n}\n\n#base-layer {\n    background: white;\n}\n\n.layer.floating{\n    outline: 2px dashed black;\n}\n\n#stamp-layer{\n    opacity: 0.2;\n}\n\n@media (orientation: portrait) {\n    .paint #sheet {\n        transform: rotate(-90deg);\n        overflow-x: hidden;\n    }\n}\n\n\n.button.back {\n    position: absolute;\n    top: 0.25rem;\n    left: 0.25rem;\n    z-index: 100;\n}\n\n.button.settings {\n    position: absolute;\n    right: 0.25rem;\n    top: 0.25rem;\n    z-index: 100;\n}\n\n.button a{\n    width: 100%;\n    height: 100%;\n    display: block;\n    color: black;    \n}\n\n.button#stamp-button{\n    font-size: 1.25rem;\n    position: absolute;\n    top: 0.25rem;\n    right: 0.25rem;\n    width: 2rem;\n    height: 2rem;\n    z-index: 100;\n    line-height: 1.85rem;\n}\n\n.toolbar {\n    display: flex;\n    background: lightgray;\n    border-radius: 0.5rem;\n    z-index: 100;\n    position: absolute;\n}\n\n.toolbar.left {\n    flex-direction: column;\n    left: 0.25rem;\n    top: 50%;\n    transform: translateY(-50%);\n}\n\n.toolbar.right {\n    flex-direction: column;\n    right: 0.25rem;\n    top: 50%;\n    transform: translateY(-50%);\n}\n\n.toolbar.top {\n    flex-direction: row;\n    left: 50%;\n    top: 0.25em;\n    transform: translateX(-50%);\n}\n\n.toolbar.bottom {\n    flex-direction: row;\n    left: 50%;\n    bottom: 0.25em;\n    transform: translateX(-50%);\n}\n\n\n.toolbar .button {\n    /*display: inline-block;*/\n    background: transparent;\n}\n\n.toolbar .spacer {\n    width: 1.5em;\n    height: 1.5em;\n}\n\n.palette {\n    position: relative;\n    transition: transform 0.25s;\n    display: inline-block;\n    float: left;\n    text-align: center;\n    z-index: 100;\n}\n\n.palette .option i {\n    font-size: 0.75em;\n}\n\n/* down direction is default: */\n.palette .options{\n    position: absolute;\n    display: flex;\n    flex-wrap: wrap;\n    background: lightgray;\n    border-radius: 0.5rem;\n    padding: 0.25rem;\n    transition: transform 0.15s;\n    top: 2.25rem;\n    left: 50%;\n    transform: translateX(-50%);\n}\n\n.palette .option {\n    width: 1em;\n    height: 1em;\n    line-height: 0.75em;\n    display: inline-block;\n    margin: 0.25em;\n    float: left;\n    transition: transform 0.25s;\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-position: center;\n}\n\n.palette .options .option {\n    margin: 0.125em;\n}\n\n.palette .option:active {\n    transform: scale(0.9);\n}\n\n.palette .options .arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    font-size: 0.25rem;\n    top: -2em;\n    left: 50%;\n    margin-left: -1em;\n    border-left: 1em solid transparent;\n    border-right: 1em solid transparent;\n    border-bottom: 2em solid lightgray;\n    border-top: none;\n}\n\n.toolbar.left .palette .options{\n    left: 2.25rem;\n    top: 50%;\n    transform: translateY(-50%);\n}\n\n.toolbar.left .palette .options .arrow {\n    top: initial;\n    left: -2em;\n    top: 50%;\n    margin-top: -1em;\n    border-top: 1em solid transparent;\n    border-bottom: 1em solid transparent;\n    border-right: 2em solid lightgray;\n}\n\n.toolbar.right .palette .options{\n    left: initial;\n    right: 2.25rem;\n    top: 50%;\n    transform: translateY(-50%);\n}\n\n.toolbar.right .palette .options .arrow {\n    left: initial;\n    top: initial;\n    right: -2em;\n    top: 50%;\n    margin-top: -1em;\n    border-top: 1em solid transparent;\n    border-bottom: 1em solid transparent;\n    border-left: 2em solid lightgray;\n    border-right: 0;\n}\n\n.toolbar.bottom .palette .options{\n    left: 50%;\n    top: initial;\n    bottom: 2.25rem;\n    transform: translateX(-50%);\n}\n\n.toolbar.bottom .palette .options .arrow {\n    top: initial;\n    bottom: -2em;\n    left: 50%;\n    margin-left: -1em;\n    border-left: 1em solid transparent;\n    border-right: 1em solid transparent;\n    border-top: 2em solid lightgray;\n    border-bottom: none;\n}\n\n.palette.collapsed:active {\n    transform: scale(0.9);\n}\n\n.toolbar.top .palette.collapsed .options, .toolbar.bottom .palette.collapsed .options {\n    transform: translateX(-50%) scale(0.0);\n}\n\n.toolbar.left .palette.collapsed .options, .toolbar.right .palette.collapsed .options {\n    transform: translateY(-50%) scale(0.0);\n}\n\n#stamp-palette.palette .options{\n    font-size: 1.5rem;\n}\n\n@media (max-width: 400px), (max-height: 400px){\n    #stamp-palette.palette .options{\n        font-size: 1rem;\n    }\n}\n\n.line-width{\n    background: black;\n    height: 100%;\n    margin: auto;\n    border-radius: 0.15em;\n}\n\n#color-palette .option {\n    border-radius: 40%;\n}\n\n.hidden {\n    display: none!important;\n}\n\n.disabled {\n    opacity: 0.25;\n}\n\n.selected {\n    background: #58b0ff!important;\n    color: white;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/css/painter.css":
/*!*****************************!*\
  !*** ./src/css/painter.css ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./src/ts/CanvasLayer.ts":
/*!*******************************!*\
  !*** ./src/ts/CanvasLayer.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! ./config */ "./src/ts/config.ts");
const Layer_1 = __importDefault(__webpack_require__(/*! ./Layer */ "./src/ts/Layer.ts"));
class CanvasLayer extends Layer_1.default {
    constructor(parent, id, x, y, width, height) {
        super(parent, "canvas", id, x, y, width, height);
        this._ctx = this.canvas.getContext("2d", { alpha: true });
        this._ctx.imageSmoothingQuality = "high";
        this._ctx.imageSmoothingEnabled = config_1.config.imageSmoothing;
    }
    get canvas() { return this._element; }
    get ctx() { return this._ctx; }
    getData() {
        return this._ctx.getImageData(0, 0, this.width, this.height);
    }
    putData(data) {
        this._ctx.putImageData(data, 0, 0);
    }
    drawImage(image, rect) {
        const { x, y, width, height } = rect || { x: 0, y: 0, width: this.width, height: this.height };
        this._ctx.drawImage(image, x, y, width, height);
    }
    clear(rect) {
        const { x, y, width, height } = rect || { x: 0, y: 0, width: this.width, height: this.height };
        this._ctx.clearRect(x, y, width, height);
    }
}
exports.default = CanvasLayer;


/***/ }),

/***/ "./src/ts/History.ts":
/*!***************************!*\
  !*** ./src/ts/History.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.History = void 0;
const config_1 = __webpack_require__(/*! ./config */ "./src/ts/config.ts");
class History {
    constructor() {
        this._states = [];
        this._position = -1;
    }
    get canUndo() { return this._position > 0; }
    get canRedo() { return this._position < this._states.length - 1; }
    recordState(data) {
        if (this._position == config_1.config.maxUndoSteps - 1) {
            this._states.shift();
            this._position--;
        }
        // remove all future steps
        this._states.splice(this._position + 1, this._states.length - this._position + 1);
        this._position++;
        this._states[this._position] = data;
    }
    undo() {
        if (!this.canUndo) {
            return null;
        }
        this._position--;
        return this._states[this._position];
    }
    redo() {
        if (!this.canRedo) {
            return null;
        }
        this._position++;
        return this._states[this._position];
    }
    getCurrentState() {
        return this._position > -1 && this._position < this._states.length ? this._states[this._position] : null;
    }
    clear() {
        this._states = [];
        this._position = -1;
    }
}
exports.History = History;


/***/ }),

/***/ "./src/ts/ImageLayer .ts":
/*!*******************************!*\
  !*** ./src/ts/ImageLayer .ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Layer_1 = __importDefault(__webpack_require__(/*! ./Layer */ "./src/ts/Layer.ts"));
class ImageLayer extends Layer_1.default {
    get image() { return this._element; }
    constructor(parent, id, x, y, width, height) {
        super(parent, "img", id, x, y, width, height);
        this._element.onload = () => {
            // if this.image.completed
            this.resize(this.image.naturalWidth, this.image.naturalHeight);
        };
    }
}
exports.default = ImageLayer;


/***/ }),

/***/ "./src/ts/Layer.ts":
/*!*************************!*\
  !*** ./src/ts/Layer.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! ./config */ "./src/ts/config.ts");
const Utils = __importStar(__webpack_require__(/*! ./utils/Utils */ "./src/ts/utils/Utils.ts"));
const Vector_1 = __importDefault(__webpack_require__(/*! ./math/Vector */ "./src/ts/math/Vector.ts"));
class Layer {
    constructor(parent, tag, id, x, y, width, height) {
        this._startScale = 1;
        this._startRotation = 0;
        this._position = new Vector_1.default(0, 0);
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
        this._element.style.width = `${width}em`;
        this._element.style.height = `${height}em`;
        this._element.style.pointerEvents = "none";
        parent.appendChild(this._element);
        this.transform(new Vector_1.default(x, y), 1, 0);
        this.bindEventListeners();
    }
    get id() { return this._element.id; }
    get index() { return this._index; }
    set index(v) {
        this._index = v;
        this.transform(this.position, this.scale, this.rotation);
    }
    get width() { return this._width; }
    ;
    get height() { return this._height; }
    ;
    get position() { return this._position; }
    get rotation() { return this._rotation; }
    get scale() { return this._scale; }
    get floating() { return this._element.classList.contains("floating"); }
    set floating(value) {
        this._element.classList.toggle("floating", value);
        this._element.style.pointerEvents = value ? "auto" : "none";
        if (value) {
            this.addEventListeners();
        }
        else {
            this.removeEventListeners();
        }
    }
    remove() {
        this._element.remove();
    }
    resize(width, height) {
        const x = this.position.x + 0.5 * (this.width - width);
        const y = this.position.y + 0.5 * (this.height - height);
        this.setPositionAndSize(x, y, width, height);
    }
    setPositionAndSize(x, y, width, height) {
        this._width = width;
        this._height = height;
        this._element.width = width;
        this._element.height = height;
        this._element.style.width = `${width}em`;
        this._element.style.height = `${height}em`;
        this.transform(new Vector_1.default(x, y), this.scale, this.rotation);
    }
    drawToCanvas(ctx) {
        ctx.save();
        let x = this._position.x + 0.5 * this.width;
        let y = this._position.y + 0.5 * this.height;
        ctx.setTransform(this._scale, 0, 0, this._scale, x, y);
        ctx.rotate(this._rotation);
        ctx.translate(-0.5 * this.width, -0.5 * this.height);
        ctx.drawImage(this._element, 0, 0);
        ctx.restore();
    }
    addEventListeners() {
        // pinch gesture handling inspired by https://codepen.io/hanseklund/pen/izloq
        this._element.addEventListener('click', this.preventDefault);
        if (Utils.pointerEventsSupported()) {
            this._element.addEventListener('touchstart', this.preventDefault);
            this._element.addEventListener('pointerdown', this.pointerDown);
        }
        else {
            this._element.addEventListener('touchstart', this.touchStart);
        }
    }
    removeEventListeners() {
        this._element.removeEventListener('click', this.preventDefault);
        if (Utils.pointerEventsSupported()) {
            this._element.removeEventListener('touchstart', this.preventDefault);
            this._element.removeEventListener('pointerdown', this.pointerDown);
        }
        else {
            this._element.removeEventListener('touchstart', this.touchStart);
        }
    }
    preventDefault(event) {
        event.preventDefault();
    }
    doubleTap(event) {
        if (this.onDoubleTap) {
            this.onDoubleTap(event);
        }
    }
    pointerDown(event) {
        event.preventDefault();
        this._element.setPointerCapture(event.pointerId);
        this.addPointerEvent(event);
        if (this._pointers.length === 1) {
            if (event.timeStamp < this._lastTouchStartTime + config_1.config.doubleTapDelay) {
                this.doubleTap(event);
            }
            this._lastTouchStartTime = event.timeStamp;
            this._element.addEventListener("pointermove", this.pointerMove);
            this._element.addEventListener("pointerup", this.pointerUp);
            this._pinchCenter = new Vector_1.default(this._position.x + 0.5 * this.width, this._position.y + 0.5 * this.height);
            if (event.altKey) {
                let p1 = this.clientToPixel(this._pointers[0]);
                let p2 = this._pinchCenter.clone().multiplyScalar(2).subtract(p1);
                this.pinchStart(p1, p2);
            }
            else {
                this.dragStart(this.clientToPixel(this._pointers[0]));
            }
        }
        if (this._pointers.length === 2) {
            this.pinchStart(this.clientToPixel(this._pointers[0]), this.clientToPixel(this._pointers[1]));
        }
    }
    addPointerEvent(event) {
        const index = this._pointers.findIndex(x => x.pointerId == event.pointerId);
        if (index < 0) {
            this._pointers.push(event);
        }
        else {
            this._pointers[index] = event;
        }
    }
    removePointerEvent(event) {
        const index = this._pointers.findIndex(x => x.pointerId == event.pointerId);
        if (index >= 0) {
            this._pointers.splice(index, 1);
        }
    }
    pointerMove(event) {
        event.preventDefault();
        this.addPointerEvent(event);
        this.move(this._pointers, event.altKey);
    }
    pointerUp(event) {
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
    touchStart(event) {
        event.preventDefault();
        if (event.touches.length === 1) {
            if (event.timeStamp < this._lastTouchStartTime + config_1.config.doubleTapDelay) {
                this.doubleTap(event);
            }
            this._lastTouchStartTime = event.timeStamp;
            this._element.addEventListener('touchmove', this.touchMove);
            this._element.addEventListener('touchend', this.touchEnd);
            this._pinchCenter = new Vector_1.default(this._position.x + 0.5 * this.width, this._position.y + 0.5 * this.height);
            if (event.altKey) {
                let p1 = this.clientToPixel(event.touches[0]);
                let p2 = this._pinchCenter.clone().multiplyScalar(2).subtract(p1);
                this.pinchStart(p1, p2);
            }
            else {
                this.dragStart(this.clientToPixel(event.touches[0]));
            }
        }
        if (event.touches.length === 2) {
            this.pinchStart(this.clientToPixel(event.touches[0]), this.clientToPixel(event.touches[1]));
        }
    }
    touchMove(event) {
        event.preventDefault();
        this.move(event.touches, event.altKey);
    }
    move(pointers, altKey) {
        if (pointers.length === 1) {
            if (altKey) {
                let p1 = this.clientToPixel(pointers[0]);
                let p2 = this._pinchCenter.clone().multiplyScalar(2).subtract(p1);
                this.pinchMove(p1, p2);
            }
            else {
                this.dragMove(this.clientToPixel(pointers[0]));
            }
        }
        if (pointers.length === 2) {
            this.pinchMove(this.clientToPixel(pointers[0]), this.clientToPixel(pointers[1]));
        }
    }
    touchEnd(event) {
        event.preventDefault();
        this._element.removeEventListener('touchmove', this.touchMove);
        this._element.addEventListener('touchend', this.touchEnd);
    }
    transform(position, scale, rotation) {
        this._position = position;
        this._rotation = rotation;
        this._scale = scale;
        const index = this._index;
        this._element.style.transform = `translate(${position.x}em, ${position.y}em) rotate(${rotation}rad) scale(${scale}) translateZ(${index}px)`;
        this._element.style.outlineWidth = `${2 / scale}em`;
        this._element.style.outlineOffset = `-${2 / scale}em`;
    }
    bindEventListeners() {
        // TODO: Find a better way. This is ugly:
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.pointerDown = this.pointerDown.bind(this);
        this.pointerMove = this.pointerMove.bind(this);
        this.pointerUp = this.pointerUp.bind(this);
    }
    dragStart(position) {
        this._localDragPosition = position.clone().subtract(this.position);
    }
    dragMove(position) {
        position.subtract(this._localDragPosition);
        this.transform(position, this._scale, this._rotation);
    }
    pinchStart(p1, p2) {
        let center = p1.clone().add(p2).multiplyScalar(0.5);
        this._pinchStartDist = p1.distanceTo(p2);
        this._pinchStartRotation = Math.atan2(p1.y - center.y, p1.x - center.x);
        this._startRotation = this._rotation;
        this._startScale = this._scale;
    }
    pinchMove(p1, p2) {
        let center = p1.clone().add(p2).multiplyScalar(0.5);
        let distance = p1.distanceTo(p2);
        let angle = Math.atan2(p1.y - center.y, p1.x - center.x);
        let angleChange = angle - this._pinchStartRotation;
        let scale = this._startScale * (distance / this._pinchStartDist);
        scale = Utils.clamp(0.1, 10, scale);
        let position = p1.clone().add(p2).multiplyScalar(0.5);
        position.x -= 0.5 * this.width;
        position.y -= 0.5 * this.height;
        let rotation = this._startRotation + angleChange;
        this.transform(position, scale, rotation);
    }
    clientToPixel(position1) {
        let parent = this._element.parentElement;
        let rect = parent.getBoundingClientRect();
        const isPortraitOrientation = rect.height > rect.width;
        let nx = (position1.clientX - rect.left) / rect.width;
        let ny = (position1.clientY - rect.top) / rect.height;
        let x = (isPortraitOrientation ? 1 - ny : nx) * config_1.config.width;
        let y = (isPortraitOrientation ? nx : ny) * config_1.config.height;
        return new Vector_1.default(x, y);
    }
}
exports.default = Layer;


/***/ }),

/***/ "./src/ts/Toolbar.ts":
/*!***************************!*\
  !*** ./src/ts/Toolbar.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Toolbar = void 0;
const View_1 = __webpack_require__(/*! ./views/View */ "./src/ts/views/View.ts");
class Toolbar extends View_1.View {
    constructor(id) {
        super(id);
        this.show();
    }
    flip() {
        if (this._element.classList.contains("left") || this._element.classList.contains("right")) {
            this._element.classList.toggle("left");
            this._element.classList.toggle("right");
        }
        if (this._element.classList.contains("top") || this._element.classList.contains("bottom")) {
            this._element.classList.toggle("top");
            this._element.classList.toggle("bottom");
        }
    }
}
exports.Toolbar = Toolbar;


/***/ }),

/***/ "./src/ts/app.ts":
/*!***********************!*\
  !*** ./src/ts/app.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ../css/painter.css */ "./src/css/painter.css");
const fontawesome_svg_core_1 = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.es.js");
const free_solid_svg_icons_1 = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
fontawesome_svg_core_1.library.add(free_solid_svg_icons_1.fas);
fontawesome_svg_core_1.dom.watch();
__webpack_require__(/*! babel-polyfill */ "./node_modules/babel-polyfill/lib/index.js");
const BookView_1 = __importDefault(__webpack_require__(/*! ./views/BookView */ "./src/ts/views/BookView.ts"));
const PaintView_1 = __webpack_require__(/*! ./views/PaintView */ "./src/ts/views/PaintView.ts");
const config_1 = __webpack_require__(/*! ./config */ "./src/ts/config.ts");
const SettingsView_1 = __importDefault(__webpack_require__(/*! ./views/SettingsView */ "./src/ts/views/SettingsView.ts"));
class App {
    constructor() {
        // App.preventOverScroll();
        //PeerToPeer.createInstance();
        this._settingsView = new SettingsView_1.default("settings", () => {
            this.openView(this._bookView);
        });
        this._sheet = document.getElementById("sheet");
        window.addEventListener('resize', event => {
            this.OnResize();
        });
        this.OnResize();
        this._bookView = new BookView_1.default("book", () => __awaiter(this, void 0, void 0, function* () {
            this.openView(this._settingsView);
        }));
        this._bookView.onImageSelected = (id) => {
            this._paintView.loadImage(id)
                .then(() => {
                this.openView(this._paintView);
            });
        };
        this._paintView = new PaintView_1.PaintView("paint", () => {
            this.openView(this._bookView);
        });
        // Dropbox integration is not working yet:
        // this.dropboxAuthView = new DropboxAuthView("dropbox-auth");
        // this.openView(ImageStorage.adapter.isAuthenticated ? this.bookView : this.dropboxAuthView);
        this.openView(this._bookView);
    }
    getIOSVersion() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || "0", 10)];
        }
    }
    OnResize() {
        const docWidth = document.documentElement.clientWidth;
        const docHeight = document.documentElement.clientHeight;
        const portrait = docWidth < docHeight;
        const isLargeScreen = docWidth > 1024;
        const viewWidth = Math.max(docWidth, docHeight);
        const viewHeight = Math.min(docWidth, docHeight);
        const horizontalPixelSize = viewWidth / config_1.config.width;
        const verticalPixelSize = viewHeight / config_1.config.height;
        const virtualPixelSize = config_1.config.fullScreenCanvas && !isLargeScreen ?
            Math.max(horizontalPixelSize, verticalPixelSize) :
            Math.min(horizontalPixelSize, verticalPixelSize);
        this._sheet.style.fontSize = `${virtualPixelSize}px`;
        this._sheet.style.left = `${portrait ? 0.5 * (docWidth - virtualPixelSize * config_1.config.width) : 0}px`;
    }
    static preventOverScroll() {
        document.ontouchmove = event => { event.preventDefault(); };
    }
    openView(view) {
        if (this._activeView) {
            this._activeView.hide();
        }
        this._activeView = view;
        this._activeView.show();
    }
}
document.addEventListener("DOMContentLoaded", () => {
    // @ts-ignore
    window.app = new App();
});


/***/ }),

/***/ "./src/ts/config.ts":
/*!**************************!*\
  !*** ./src/ts/config.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.config = void 0;
const defaultShapes = [
    "img/stamps/star.png",
    "img/stamps/unicorn.png",
    "img/stamps/snowman.png",
    "img/stamps/dolphin.png",
    "img/stamps/snail.png"
];
exports.config = {
    debug: true,
    doubleTapDelay: 400,
    longClickDelay: 1000,
    minScrollDistance: 30,
    maxScrollDelay: 500,
    maxShapeCount: 64 - defaultShapes.length,
    usePointerEvents: true,
    fullScreenCanvas: true,
    pixelPerfect: false,
    imageSmoothing: true,
    useAutoMask: false,
    maxUndoSteps: 10,
    saveInterval: 5000,
    width: 1024,
    height: 768,
    defaultShapes: defaultShapes,
    imageCount: 32,
    images: {
        "image01.png": { overlay: "./img/overlays/spirit.png" },
        "image02.png": { overlay: "./img/overlays/spirit2.png" },
        "image03.png": { overlay: "./img/overlays/spirit3.png" },
        "image04.png": { overlay: "./img/overlays/santa.png" }
    }
};


/***/ }),

/***/ "./src/ts/math/Vector.ts":
/*!*******************************!*\
  !*** ./src/ts/math/Vector.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Utils = __importStar(__webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts"));
class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    set(x = 0, y = x) {
        this.x = x;
        this.y = y;
        return this;
    }
    clone() {
        return new Vector(this.x, this.y);
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
    clamp(minX, minY, maxX, maxY) {
        this.x = Utils.clamp(minX, maxX, this.x);
        this.y = Utils.clamp(minY, maxY, this.y);
        return this;
    }
    invert() {
        this.x *= -1;
        this.y *= -1;
        return this;
    }
    ;
    multiplyScalar(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }
    ;
    divideScalar(s) {
        if (s === 0) {
            this.x = 0;
            this.y = 0;
        }
        else {
            var invScalar = 1 / s;
            this.x *= invScalar;
            this.y *= invScalar;
        }
        return this;
    }
    ;
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        return this.divideScalar(this.length());
    }
    distanceToSq(v) {
        const dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    }
    distanceTo(v) {
        return Math.sqrt(this.distanceToSq(v));
    }
    lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        return this;
    }
    ;
}
exports.default = Vector;


/***/ }),

/***/ "./src/ts/palettes/ColorPalette.ts":
/*!*****************************************!*\
  !*** ./src/ts/palettes/ColorPalette.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Palette_1 = __webpack_require__(/*! ./Palette */ "./src/ts/palettes/Palette.ts");
class ColorPalette extends Palette_1.Palette {
    get color() { return this.selectedOption; }
    set color(value) { this.selectedOption = value; }
    constructor(id) {
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
        let colors = [
            "#000000", "#222034", "#45283c", "#663931",
            "#8f563b", "#df7126", "#d9a066", "#eec39a",
            "#fbf236", "#99e550", "#6abe30", "#37946e",
            "#4b692f", "#524b24", "#323c39", "#3f3f74",
            "#306082", "#5b6ee1", "#639bff", "#5fcde4",
            "#cbdbfc", "#ffffff", "#9badb7", "#847e87",
            "#696a6a", "#595652", "#76428a", "#ac3232",
            "#d95763", "#d77bba", "#8f974a", "#8a6f30",
        ];
        super(id, colors);
        this.selectedIndex = 15;
    }
    updateOptionElement(element, option) {
        element.style.background = option;
    }
}
exports.default = ColorPalette;


/***/ }),

/***/ "./src/ts/palettes/Palette.ts":
/*!************************************!*\
  !*** ./src/ts/palettes/Palette.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Palette = void 0;
const View_1 = __webpack_require__(/*! ../views/View */ "./src/ts/views/View.ts");
const Utils = __importStar(__webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts"));
// base class for palettes
class Palette extends View_1.View {
    constructor(id, options, rightAlign = false) {
        super(id);
        this._options = options;
        this._optionElements = [];
        this._selectedIndex = 0;
        this.createOptions();
        this.show();
        this.collapse();
    }
    get selectedIndex() { return this._selectedIndex; }
    set selectedIndex(value) {
        this._selectedIndex = Math.max(0, Math.min(this._options.length - 1, value));
        this.updateSelectedOptionElement(this._selectedElement, this.selectedOption);
    }
    get selectedOption() { return this._options[this._selectedIndex]; }
    set selectedOption(value) {
        let index = this._options.indexOf(value);
        if (index === -1) {
            return;
        }
        this.selectedIndex = index;
    }
    get isCollapsed() { return this._element.classList.contains("collapsed"); }
    static collapseAll() {
        if (Palette._expandedPalette) {
            Palette._expandedPalette.collapse();
        }
    }
    createOptions() {
        this.addSelectedOption();
        this.addOptionElements();
    }
    recreateOptions() {
        this.clear();
        this.createOptions();
    }
    collapse() {
        this._element.classList.add("collapsed");
        if (Palette._expandedPalette == this) {
            Palette._expandedPalette = null;
        }
    }
    expand() {
        Palette.collapseAll();
        this._element.classList.remove("collapsed");
        Palette._expandedPalette = this;
    }
    toggle() {
        if (this.isCollapsed) {
            this.expand();
        }
        else {
            this.collapse();
        }
    }
    addOption(value) {
        this._options.push(value);
        this.addOptionElement(this._options.length - 1, value);
        this.updateOptionsWidth();
    }
    removeOption(index) {
        this._options.splice(index, 1);
        this._optionElements[index].remove();
        this._optionElements.splice(index, 1);
        // update the index assigned to each element:
        this.recreateOptions();
    }
    addSelectedOption() {
        let element = document.createElement("div");
        element.classList.add("option");
        this._selectedElement = element;
        Utils.addClick(element, () => this.toggle());
        this.updateSelectedOptionElement(element, this.selectedOption);
        this._element.appendChild(element);
    }
    addOptionElements() {
        let element = document.createElement("div");
        element.classList.add("options");
        this._optionsElement = element;
        this.addArrowElement();
        let i = 0;
        for (let option of this._options) {
            this.addOptionElement(i, option);
            i++;
        }
        this.updateOptionsWidth();
        this._element.appendChild(element);
    }
    updateOptionsWidth() {
        this._optionsElement.style.width = Math.min(8, this._options.length) * 1.25 + "em";
    }
    addArrowElement() {
        let element = document.createElement("div");
        element.classList.add("arrow");
        this._optionsElement.appendChild(element);
    }
    addOptionElement(index, option) {
        let element = document.createElement("div");
        element.classList.add("option");
        element.dataset.index = `${index}`;
        Utils.addLongClick(element, event => this.optionLongClicked(event, option, index));
        Utils.addClick(element, event => this.optionClicked(event, option, index));
        this.updateOptionElement(element, option);
        this._optionsElement.appendChild(element);
        this._optionElements[index] = element;
    }
    optionClicked(event, option, index) {
        this.selectedIndex = index;
        this.collapse();
        if (this.onSelectionChanged) {
            this.onSelectionChanged(option, index);
        }
    }
    optionLongClicked(event, option, index) {
    }
    updateOptionElement(element, option) {
    }
    updateSelectedOptionElement(element, option) {
        this.updateOptionElement(element, option);
    }
}
exports.Palette = Palette;


/***/ }),

/***/ "./src/ts/palettes/ShapePalette.ts":
/*!*****************************************!*\
  !*** ./src/ts/palettes/ShapePalette.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Palette_1 = __webpack_require__(/*! ./Palette */ "./src/ts/palettes/Palette.ts");
const ImageStorage_1 = __webpack_require__(/*! ../storage/ImageStorage */ "./src/ts/storage/ImageStorage.ts");
const config_1 = __webpack_require__(/*! ../config */ "./src/ts/config.ts");
class ShapePalette extends Palette_1.Palette {
    constructor(id) {
        super(id, config_1.config.defaultShapes, true);
        this._shapeIds = {};
        this.selectedIndex = 0;
        ImageStorage_1.imageStorage.keys()
            .then((keys) => {
            const shapesIds = keys.filter(x => x.startsWith("shape"));
            for (let shapeId of shapesIds) {
                this.addShapeFromImageId(shapeId);
            }
        });
        ImageStorage_1.imageStorage.addChangeListener((change, id) => {
            if (change == "save" && id.startsWith("shape")) {
                this.addShapeFromImageId(id);
            }
        });
    }
    get stamp() { return this.selectedOption; }
    addShapeFromImageId(stampId) {
        ImageStorage_1.imageStorage.loadImageUrl(stampId)
            .then(url => {
            this._shapeIds[url] = stampId;
            this.addOption(url);
        });
    }
    optionLongClicked(event, option, index) {
        this.deleteShape(index);
    }
    updateOptionElement(element, option) {
        element.style.backgroundImage = `url("${option}")`;
    }
    updateSelectedOptionElement(element, option) {
        element.innerHTML = '<i class="fas fa-shapes"></i>';
    }
    deleteShape(index) {
        let option = this._options[index];
        let stampId = this._shapeIds[option];
        if (!stampId) {
            return;
        }
        ImageStorage_1.imageStorage.deleteImage(stampId)
            .then(() => {
            delete this._shapeIds[option];
            this.removeOption(index);
            if (this.selectedIndex == index) {
                // select the following item that now has the same index
                this.selectedIndex = index;
            }
        });
    }
}
exports.default = ShapePalette;


/***/ }),

/***/ "./src/ts/palettes/SizePalette.ts":
/*!****************************************!*\
  !*** ./src/ts/palettes/SizePalette.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Palette_1 = __webpack_require__(/*! ./Palette */ "./src/ts/palettes/Palette.ts");
class SizePalette extends Palette_1.Palette {
    get size() { return this.selectedOption; }
    set size(value) { this.selectedOption = value; }
    constructor(id) {
        let sizes = [2, 8, 24, 40];
        super(id, sizes, true);
        this.selectedIndex = 1;
    }
    updateOptionElement(element, option) {
        const width = option / 40;
        element.innerHTML = '<div class="line-width" style="width:' + width + 'em"></div>';
    }
}
exports.default = SizePalette;


/***/ }),

/***/ "./src/ts/storage/ImageStorage.ts":
/*!****************************************!*\
  !*** ./src/ts/storage/ImageStorage.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.imageStorage = void 0;
__webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
const LocalForageAdapter_1 = __importDefault(__webpack_require__(/*! ./LocalForageAdapter */ "./src/ts/storage/LocalForageAdapter.ts"));
const jszip_1 = __importDefault(__webpack_require__(/*! jszip */ "./node_modules/jszip/lib/index.js"));
class ImageStorage {
    get adapter() {
        if (!this._adapter) {
            this._adapter = new LocalForageAdapter_1.default();
            this.migrate();
        }
        return this._adapter;
    }
    get urls() {
        if (!this._urls) {
            this._urls = {};
        }
        return this._urls;
    }
    loadImage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = yield this.loadImageUrl(id);
            if (!url) {
                return null;
            }
            const img = new Image();
            img.id = id;
            img.src = url;
            if (img.decode != null) {
                yield img.decode();
                return img;
            }
            return new Promise(resolve => {
                img.onload = () => resolve(img);
            });
        });
    }
    loadImageUrl(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id in this.urls) {
                return this.urls[id];
            }
            const blob = yield this.loadBlob(id);
            if (!blob) {
                return null;
            }
            const url = URL.createObjectURL(blob);
            this.urls[id] = url;
            return url;
        });
    }
    loadBlob(id) {
        return this.adapter.getItem(id);
    }
    saveImage(id, blob) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adapter.setItem(id, blob);
            }
            catch (e) {
            }
            if (id in this.urls) {
                URL.revokeObjectURL(this.urls[id]);
            }
            this.urls[id] = URL.createObjectURL(blob);
            this.dispatchChangeEvent("save", id);
        });
    }
    deleteImage(id) {
        return this.adapter.removeItem(id)
            .then(() => {
            if (id in this.urls) {
                URL.revokeObjectURL(this.urls[id]);
                delete this.urls[id];
            }
            this.dispatchChangeEvent("delete", id);
        });
    }
    keys() {
        return this.adapter.keys();
    }
    addChangeListener(callback) {
        this._changeListeners = this._changeListeners || [];
        this._changeListeners.push(callback);
    }
    dispatchChangeEvent(change, id) {
        for (let changeListener of this._changeListeners) {
            changeListener(change, id);
        }
    }
    clear() {
        this.adapter.clear();
    }
    generateBackupArchive() {
        return __awaiter(this, void 0, void 0, function* () {
            let count = 0;
            var keys = yield this.keys();
            var zip = new jszip_1.default();
            for (let id of keys) {
                const url = yield this.loadImageUrl(id);
                const blob = yield fetch(url).then(r => r.blob());
                if (!blob) {
                    continue;
                }
                zip.file(id, blob);
                count += 1;
            }
            if (count == 0) {
                return;
            }
            return zip.generateAsync({ type: "blob" });
        });
    }
    importBackupArchive(zipFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const zip = yield jszip_1.default.loadAsync(zipFile);
            zip.forEach((path, file) => __awaiter(this, void 0, void 0, function* () {
                const buffer = yield file.async("arraybuffer");
                const blob = new Blob([buffer], { "type": "image/png" });
                this.saveImage(file.name, blob);
            }));
        });
    }
    migrate() {
        return __awaiter(this, void 0, void 0, function* () {
            let needsRefresh = false;
            var keys = yield this.keys();
            for (let id of keys) {
                if (!id.startsWith("image") && !id.startsWith("Shape")) {
                    continue;
                }
                if (id.endsWith(".png")) {
                    continue;
                }
                const newId = id.replace("Shape", "shape") + ".png";
                const data = yield this.adapter.getItem(id);
                yield this.adapter.setItem(newId, data);
                yield this.adapter.removeItem(id);
                console.log(`Migrated ${id} to ${newId}.`);
                needsRefresh = true;
            }
            if (needsRefresh) {
                location.reload();
            }
        });
    }
    getStorageUsed() {
        return __awaiter(this, void 0, void 0, function* () {
            let amount = 0;
            var keys = yield this.keys();
            for (let id of keys) {
                const url = yield this.loadImageUrl(id);
                const blob = yield fetch(url).then(r => r.blob());
                if (!blob) {
                    continue;
                }
                amount += blob.size;
            }
            return amount;
        });
    }
}
exports.imageStorage = new ImageStorage();


/***/ }),

/***/ "./src/ts/storage/LocalForageAdapter.ts":
/*!**********************************************!*\
  !*** ./src/ts/storage/LocalForageAdapter.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const localforage_1 = __importDefault(__webpack_require__(/*! localforage */ "./node_modules/localforage/dist/localforage.js"));
const StorageAdapter_1 = __importDefault(__webpack_require__(/*! ./StorageAdapter */ "./src/ts/storage/StorageAdapter.ts"));
class LocalForageAdapter extends StorageAdapter_1.default {
    constructor() {
        super(...arguments);
        this._imageStore = localforage_1.default.createInstance({ name: "ImageStore" });
    }
    getItem(id) {
        return this._imageStore.getItem(id);
    }
    setItem(id, blob) {
        return this._imageStore.setItem(id, blob);
    }
    removeItem(id) {
        return this._imageStore.removeItem(id);
    }
    keys() {
        return this._imageStore.keys();
    }
    iterate(param) {
        return this._imageStore.iterate(param);
    }
    clear() {
        return this._imageStore.clear();
    }
}
exports.default = LocalForageAdapter;


/***/ }),

/***/ "./src/ts/storage/StorageAdapter.ts":
/*!******************************************!*\
  !*** ./src/ts/storage/StorageAdapter.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class StorageAdapter {
}
exports.default = StorageAdapter;


/***/ }),

/***/ "./src/ts/tools/PenTool.ts":
/*!*********************************!*\
  !*** ./src/ts/tools/PenTool.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Tool_1 = __importDefault(__webpack_require__(/*! ./Tool */ "./src/ts/tools/Tool.ts"));
const Vector_1 = __importDefault(__webpack_require__(/*! ../math/Vector */ "./src/ts/math/Vector.ts"));
const Utils = __importStar(__webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts"));
// Paints lines with varying stroke width
class PenTool extends Tool_1.default {
    constructor(painter, buttonId, operation = "darken") {
        super(painter, buttonId);
        this._operation = operation;
        this.createBrushCtx();
    }
    createBrushCtx() {
        let brushCanvas = document.createElement("canvas");
        brushCanvas.id = "brush";
        brushCanvas.width = 64;
        brushCanvas.height = 64;
        this._brushCtx = brushCanvas.getContext("2d", { alpha: true });
        this._brushCtx.imageSmoothingQuality = "high";
        this._brushCtx.imageSmoothingEnabled = true;
    }
    down(data) {
        this._painter.captureAutoMask(data.position.clone().round());
        this._points = [data.position];
        const width = this.getWidth(data.pressure, data.speed);
        this._widths = [width];
        this._startIndex = 0;
        let ctx = this._painter.baseLayer.ctx;
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
    up() {
        this._painter.recordHistoryState();
    }
    tick(delta) {
        if (this._drawPathRequested) {
            this.drawPath();
            this._drawPathRequested = false;
        }
    }
    requestDrawPath() {
        this._drawPathRequested = true;
    }
    drawPath() {
        if (this._points.length == 0) {
            return;
        }
        let ctx = this._painter.baseLayer.ctx;
        this.drawConnectedLines(ctx, this._points.slice(this._startIndex), this._widths.slice(this._startIndex));
        // if (this._points.length - this._startIndex == 1){
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
    drawConnectedLines(ctx, points, widths) {
        const pointCount = points.length;
        if (pointCount == 0) {
            return;
        }
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        let start = points[0];
        let startWidth = widths[0] * this.lineWidth;
        if (pointCount == 1) {
            // single dot
            ctx.beginPath();
            ctx.arc(start.x, start.y, 0.5 * startWidth, 0, 2 * Math.PI);
            ctx.fill();
        }
        for (let i = 1; i < pointCount; i++) {
            ctx.beginPath();
            ctx.lineWidth = widths[i] * this.lineWidth;
            ctx.lineTo(points[i - 1].x, points[i - 1].y);
            ctx.lineTo(points[i].x, points[i].y);
            ctx.stroke();
        }
    }
    drawBrush(ctx, x, y, width) {
        let radius = width * 0.5;
        x -= radius;
        y -= radius;
        // x = Math.floor(x - radius);
        // y = Math.floor(y - radius);
        // width = Math.ceil(width);
        ctx.drawImage(this._brushCtx.canvas, x, y, width, width);
    }
    move(data) {
        let newPoints = this.interpolatePoints(data.position);
        this._points = this._points.concat(newPoints);
        const numSegments = newPoints.length;
        let width = this.getWidth(data.pressure, data.speed);
        const lastWidth = this._widths[this._widths.length - 1];
        const maxWidthDifferencePerSegment = 2;
        const maxWidthDifference = maxWidthDifferencePerSegment * numSegments;
        width = Utils.clamp(lastWidth - maxWidthDifference, lastWidth + maxWidthDifference, width);
        for (let i = 0; i < numSegments; i++) {
            this._widths.push(Utils.lerp(lastWidth, width, i / numSegments));
        }
        this.requestDrawPath();
    }
    interpolatePoints(newPoint) {
        const segmentLength = Math.max(4, 0.1 * this.lineWidth);
        const points = [];
        if (this._points.length == 0) {
            return;
        }
        const start = this._points[this._points.length - 1];
        const end = newPoint;
        const dist = start.distanceTo(end);
        if (dist < segmentLength) {
            return points;
        }
        let control = start;
        if (this._points.length > 1) {
            const previous = this._points[this._points.length - 2];
            const tangent = start.clone().subtract(previous).normalize();
            control = start.clone().add(tangent.clone().multiplyScalar(0.3 * dist));
        }
        const a = segmentLength / dist;
        for (let i = a; i <= 1; i += a) {
            const Vector = this.pointOnQuadraticCurve(start, control, end, i);
            points.push(Vector);
        }
        return points;
    }
    pointOnQuadraticCurve(start, control, end, a) {
        const f1 = (1 - a) * (1 - a);
        const f2 = 2 * a * (1 - a);
        const f3 = a * a;
        return new Vector_1.default(start.x * f1 + control.x * f2 + end.x * f3, start.y * f1 + control.y * f2 + end.y * f3);
    }
    pressureChanged() {
        this.requestDrawPath();
    }
    getWidth(pressure, speed) {
        speed = Utils.clamp(1, 2, speed);
        return pressure / speed; // range: 0.5 - 1
    }
    applyAutoMask() {
        if (!this._painter.autoMaskCtx) {
            return;
        }
        let ctx = this.getBufferCtx();
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(this._painter.autoMaskCtx.canvas, 0, 0);
        ctx.globalCompositeOperation = "source-over";
    }
}
exports.default = PenTool;


/***/ }),

/***/ "./src/ts/tools/SelectionTool.ts":
/*!***************************************!*\
  !*** ./src/ts/tools/SelectionTool.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Tool_1 = __importDefault(__webpack_require__(/*! ./Tool */ "./src/ts/tools/Tool.ts"));
const Vector_1 = __importDefault(__webpack_require__(/*! ../math/Vector */ "./src/ts/math/Vector.ts"));
const Rect_1 = __importDefault(__webpack_require__(/*! ../utils/Rect */ "./src/ts/utils/Rect.ts"));
const ImageStorage_1 = __webpack_require__(/*! ../storage/ImageStorage */ "./src/ts/storage/ImageStorage.ts");
const Utils = __importStar(__webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts"));
const config_1 = __webpack_require__(/*! ../config */ "./src/ts/config.ts");
const file_saver_1 = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
// Provides a floating selection the user can manipulate 
class SelectionTool extends Tool_1.default {
    constructor(painter, buttonId) {
        super(painter, buttonId);
        this.selectionLayerId = "selection-layer";
        this._selection = Rect_1.default.Empty();
        this._deleteButton = document.getElementById("selection-delete-button");
        Utils.addClick(this._deleteButton, () => this.clearSelection());
        this._stampButton = document.getElementById("selection-stamp-button");
        Utils.addClick(this._stampButton, () => this.paintSelectionToCanvas());
        this._saveButton = document.getElementById("selection-save-button");
        Utils.addClick(this._saveButton, () => this.saveSelectionAsNewStamp());
        this._downloadButton = document.getElementById("selection-download-button");
        Utils.addClick(this._downloadButton, () => {
            this.selectionLayer.canvas.toBlob(blob => file_saver_1.saveAs(blob, "image.png"));
        });
        this.hasFloatingSelection = false;
        this._position = new Vector_1.default(0, 0);
    }
    get selectionLayer() { return this._painter.getLayer(this.selectionLayerId); }
    get selection() { return this._selection; }
    get hasFloatingSelection() { return this._hasFloatingSelection; }
    set hasFloatingSelection(value) {
        this._hasFloatingSelection = value;
        this.toggleFloatingSelectionButtons(value);
    }
    get isInShapesPalette() { return this._isInShapesPalette; }
    set isInShapesPalette(value) {
        this._isInShapesPalette = value;
        this._saveButton.classList.toggle("disabled", value);
    }
    toggleFloatingSelectionButtons(visible) {
        this._deleteButton.classList.toggle("hidden", !visible);
        this._stampButton.classList.toggle("hidden", !visible);
        this._downloadButton.classList.toggle("hidden", !visible);
        this._saveButton.classList.toggle("hidden", !visible);
    }
    enable() {
        super.enable();
        this.createSelectionLayer();
        this.hasFloatingSelection = false;
        this.isInShapesPalette = false;
    }
    disable() {
        super.disable();
        this.paintSelectionToCanvas();
        this.destroySelectionLayer();
        this.hasFloatingSelection = false;
    }
    down(data) {
        this._position = this.getClampedPosition(data);
        this.startNewSelection();
    }
    move(data) {
        this._position = this.getClampedPosition(data);
        this.requestDrawSelectionOutline();
    }
    up(data) {
        this.cutSelection();
    }
    startNewSelection() {
        this.paintSelectionToCanvas();
        this.selectionLayer.setPositionAndSize(0, 0, this._painter.width, this._painter.height);
        this.selectionLayer.transform(new Vector_1.default(0, 0), 1, 0);
        this.selectionLayer.floating = false;
        this.hasFloatingSelection = false;
        this.isInShapesPalette = false;
        this._startPosition = this._position;
        let ctx = this.selectionLayer.ctx;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.strokeStyle = "black";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        this.requestDrawSelectionOutline();
    }
    getClampedPosition(data) {
        return data.position.round().clamp(0, 0, this._painter.width - 1, this._painter.height - 1);
    }
    tick(delta) {
        if (this._drawSelectionOutlineRequested) {
            this.updateSelectionAndDrawOutline();
            this._drawSelectionOutlineRequested = false;
        }
    }
    keyDown(event) {
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
    clearSelection() {
        this.selectionLayer.clear();
        this.startNewSelection();
    }
    setImage(image) {
        this.hasFloatingSelection = true;
        this.selectionLayer.resize(image.width, image.height);
        this.selectionLayer.floating = true;
        this.selectionLayer.drawImage(image);
        this.isInShapesPalette = true;
    }
    setImageUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const img = new Image();
            img.src = url;
            return new Promise(resolve => {
                img.onload = () => {
                    this.setImage(img);
                    resolve(img);
                };
            });
        });
    }
    requestDrawSelectionOutline() {
        this._drawSelectionOutlineRequested = true;
    }
    updateSelectionAndDrawOutline() {
        if (this.hasFloatingSelection) {
            return;
        }
        this.selectionLayer.clear();
        let ctx = this.selectionLayer.ctx;
        const x = Math.min(this._startPosition.x, this._position.x);
        const y = Math.min(this._startPosition.y, this._position.y);
        const width = Math.abs(this._startPosition.x - this._position.x);
        const height = Math.abs(this._startPosition.y - this._position.y);
        this._selection = new Rect_1.default(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
    }
    destroySelectionLayer() {
        this._painter.removeLayer(this.selectionLayer);
    }
    createSelectionLayer() {
        if (this.selectionLayer) {
            return;
        }
        this._painter.addCanvasLayer(this.selectionLayerId, 0, 0, this._painter.width, this._painter.height, false);
        this.selectionLayer.onDoubleTap = (event) => {
            if (event.altKey) {
                this.saveSelectionAsNewStamp();
                return;
            }
            this.paintSelectionToCanvas();
        };
    }
    cutSelection() {
        this.selectionLayer.clear();
        this._selection = Utils.getVisiblePixelFrame(this._painter.baseLayer.ctx, this.selection);
        if (this.selection.isEmpty()) {
            return;
        }
        this.hasFloatingSelection = true;
        const { x, y, width, height } = this.selection;
        this.selectionLayer.setPositionAndSize(x, y, width, height);
        this.selectionLayer.floating = true;
        this.selectionLayer.ctx.drawImage(this._painter.baseLayer.canvas, x, y, width, height, 0, 0, width, height);
        this._painter.baseLayer.clear(this.selection);
        this._painter.recordHistoryState();
    }
    paintSelectionToCanvas() {
        if (!this.hasFloatingSelection) {
            return;
        }
        this._painter.baseLayer.ctx.globalCompositeOperation = "source-over";
        this.selectionLayer.drawToCanvas(this._painter.baseLayer.ctx);
        this._painter.recordHistoryState();
    }
    saveSelectionAsNewStamp() {
        ImageStorage_1.imageStorage.keys()
            .then((keys) => {
            const shapesIds = keys.filter(x => x.startsWith("Shape"));
            if (shapesIds.length >= config_1.config.maxShapeCount) {
                console.log("Cannot save selection as shape because there are already too many in storage.");
                return;
            }
            const id = `shape${Date.now()}.png`;
            console.log(`Saving selection as: ${id}`);
            this.selectionLayer.canvas.toBlob(blob => ImageStorage_1.imageStorage.saveImage(id, blob));
            this.isInShapesPalette = true;
        });
    }
    // copyToClipboard(){
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
    selectAll() {
        this.startNewSelection();
        this._selection = new Rect_1.default(0, 0, this._painter.width, this._painter.height);
        this.cutSelection();
    }
}
exports.default = SelectionTool;


/***/ }),

/***/ "./src/ts/tools/Tool.ts":
/*!******************************!*\
  !*** ./src/ts/tools/Tool.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
// Base class for all tools
class Tool {
    constructor(painter, buttonId) {
        this._painter = painter;
        this._buttonElement = document.getElementById(buttonId);
    }
    get color() { return this._painter.color; }
    ;
    get opacity() { return this._painter.opacity; }
    get lineWidth() { return this._painter.lineWidth; }
    ;
    // creates a context to draw the current stroke to so we can draw the complete stroke with a different
    // operation. The buffer can be shared by different tools.
    createBufferCtx() {
        let brushCanvas = document.createElement("canvas");
        brushCanvas.id = "buffer";
        brushCanvas.width = this._painter.width;
        brushCanvas.height = this._painter.height;
        Tool._bufferCtx = brushCanvas.getContext("2d", { alpha: true });
        Tool._bufferCtx.imageSmoothingQuality = "high";
        Tool._bufferCtx.imageSmoothingEnabled = true;
    }
    getBufferCtx() {
        if (Tool._bufferCtx == null) {
            this.createBufferCtx();
        }
        return Tool._bufferCtx;
    }
    enable() {
        this._buttonElement.classList.add("selected");
    }
    disable() {
        this._buttonElement.classList.remove("selected");
    }
    down(data) { }
    move(data) { }
    up(data) { }
    pressureChanged() { }
    tick(delta) { }
    keyDown(event) { }
}
exports.default = Tool;


/***/ }),

/***/ "./src/ts/utils/Rect.ts":
/*!******************************!*\
  !*** ./src/ts/utils/Rect.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    get minX() { return this.x; }
    get minY() { return this.y; }
    get maxX() { return this.x + this.width; }
    get maxY() { return this.y + this.height; }
    isEmpty() {
        return this.width <= 0 || this.height <= 0;
    }
    static Empty() {
        return new Rect(0, 0, 0, 0);
    }
}
exports.default = Rect;


/***/ }),

/***/ "./src/ts/utils/Utils.ts":
/*!*******************************!*\
  !*** ./src/ts/utils/Utils.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dilateMask = exports.getVisiblePixelFrame = exports.floodFill = exports.stringToColor = exports.lerpCanvas = exports.lerpColor = exports.clamp = exports.lerp = exports.createNewImageId = exports.addLongClick = exports.addClick = exports.log = exports.getImageOverlayUrl = exports.pointerEventsSupported = exports.imageToBlob = exports.upload = exports.formatBytes = void 0;
const config_1 = __webpack_require__(/*! ../config */ "./src/ts/config.ts");
const Rect_1 = __importDefault(__webpack_require__(/*! ./Rect */ "./src/ts/utils/Rect.ts"));
const Vector_1 = __importDefault(__webpack_require__(/*! ../math/Vector */ "./src/ts/math/Vector.ts"));
const Pressure = __webpack_require__(/*! pressure */ "./node_modules/pressure/dist/pressure.min.js");
// source:
// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
exports.formatBytes = formatBytes;
function upload(accept) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            const input = document.createElement('input');
            input.type = "file";
            input.accept = accept;
            input.onchange = () => {
                if (input.files.length == 0) {
                    return;
                }
                let file = input.files[0];
                resolve(file);
                input.remove();
            };
            input.click();
        });
    });
}
exports.upload = upload;
function imageToBlob(image) {
    const canvas = document.createElement("canvas");
    canvas.id = "imageToCanvas";
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext("2d", { alpha: true });
    ctx.drawImage(image, 0, 0);
    return new Promise(resolve => {
        canvas.toBlob(blob => resolve(blob));
    });
}
exports.imageToBlob = imageToBlob;
function pointerEventsSupported() {
    return window.PointerEvent != null;
}
exports.pointerEventsSupported = pointerEventsSupported;
function getImageOverlayUrl(id) {
    var _a;
    return (_a = config_1.config.images[id]) === null || _a === void 0 ? void 0 : _a.overlay;
}
exports.getImageOverlayUrl = getImageOverlayUrl;
function log(message, ...optionalParams) {
    if (!config_1.config.debug) {
        return;
    }
    console.log(message, optionalParams);
}
exports.log = log;
function addClick(element, callback, supportScrolling = false) {
    let scrollStartX;
    let scrollStartY;
    let touchId;
    let isTracking;
    let startTimeStamp;
    let scrolled;
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
        const touch = event.changedTouches[0];
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
        const touch = event.changedTouches[0];
        // user dragged out of the element:
        if (document.elementFromPoint(touch.pageX, touch.pageY) != event.target) {
            isTracking = false;
            element.classList.remove("down");
        }
        if (scrolled || event.timeStamp < startTimeStamp + config_1.config.maxScrollDelay) {
            if (supportScrolling &&
                (Math.abs(touch.pageX - scrollStartX) > config_1.config.minScrollDistance ||
                    Math.abs(touch.pageY - scrollStartY) > config_1.config.minScrollDistance)) {
                isTracking = false;
                element.classList.remove("down");
            }
        }
        // After tapping and holding for a while the element does not start scrolling any more.
        // In that case we don't want perform the scroll check above any more:
        if (event.timeStamp < startTimeStamp + config_1.config.maxScrollDelay) {
            if (Math.abs(touch.pageX - scrollStartX) > 2 ||
                Math.abs(touch.pageY - scrollStartY) > 2) {
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
exports.addClick = addClick;
function addLongClick(element, callback) {
    let timer;
    let caller = this;
    let called = false;
    element.addEventListener("touchstart", down);
    element.addEventListener("touchend", up);
    element.addEventListener("mousedown", down);
    element.addEventListener("mouseup", up);
    function down(event) {
        called = false;
        timer = setTimeout(() => {
            callback.call(caller, event);
            called = true;
        }, config_1.config.longClickDelay);
    }
    function up(event) {
        if (called) {
            event.stopImmediatePropagation();
            element.classList.remove("down");
            called = false;
        }
        else {
            clearTimeout(timer);
        }
    }
}
exports.addLongClick = addLongClick;
function createNewImageId() {
    return Date.now().toString();
}
exports.createNewImageId = createNewImageId;
function lerp(a, b, alpha) {
    return a * (1 - alpha) + b * alpha;
}
exports.lerp = lerp;
function clamp(lower, upper, n) {
    return Math.min(upper, Math.max(lower, n));
}
exports.clamp = clamp;
function lerpColor(color1, color2, alpha) {
    if (alpha == 0) {
        return color1;
    }
    if (alpha == 1) {
        return color2;
    }
    const aa = (color1 & 0xff000000) >> 24;
    const ba = (color1 & 0x00ff0000) >> 16;
    const ga = (color1 & 0x0000ff00) >> 8;
    const ra = (color1 & 0x000000ff);
    const ab = (color2 & 0xff000000) >> 24;
    const bb = (color2 & 0x00ff0000) >> 16;
    const gb = (color2 & 0x0000ff00) >> 8;
    const rb = (color2 & 0x000000ff);
    const r = Math.floor(lerp(ra, rb, alpha));
    const g = Math.floor(lerp(ga, gb, alpha));
    const b = Math.floor(lerp(ba, bb, alpha));
    const a = 255; //Math.floor(Utils.lerp(aa, ab, alpha));
    return r + (g << 8) + (b << 16) + 0xFF000000;
}
exports.lerpColor = lerpColor;
function lerpCanvas(ctxA, ctxB, ctxMask) {
    const width = ctxA.canvas.width;
    const height = ctxA.canvas.height;
    const dataA = ctxA.getImageData(0, 0, width, height);
    const dataB = ctxB.getImageData(0, 0, width, height);
    const dataMask = ctxMask.getImageData(0, 0, width, height);
    const a32 = new Uint8ClampedArray(dataA.data.buffer);
    const b32 = new Uint8ClampedArray(dataB.data.buffer);
    const m32 = new Uint8ClampedArray(dataMask.data.buffer);
    for (let i = 0; i < width * height; i++) {
        const a = m32[i * 4 + 3] / 255;
        a32[i * 4 + 0] = (1 - a) * a32[i * 4 + 0] + a * b32[i * 4 + 0];
        a32[i * 4 + 1] = (1 - a) * a32[i * 4 + 1] + a * b32[i * 4 + 1];
        a32[i * 4 + 2] = (1 - a) * a32[i * 4 + 2] + a * b32[i * 4 + 2];
        a32[i * 4 + 3] = (1 - a) * a32[i * 4 + 3] + a * b32[i * 4 + 3];
    }
    ctxA.putImageData(dataA, 0, 0);
}
exports.lerpCanvas = lerpCanvas;
function stringToColor(h) {
    let r = 0, g = 0, b = 0;
    if (h.length == 4) {
        r = parseInt(h[1] + h[1], 16);
        g = parseInt(h[2] + h[2], 16);
        b = parseInt(h[3] + h[3], 16);
    }
    else {
        r = parseInt(h[1] + h[2], 16);
        g = parseInt(h[3] + h[4], 16);
        b = parseInt(h[5] + h[6], 16);
    }
    return 0xFF000000 + r + (g << 8) + (b << 16);
}
exports.stringToColor = stringToColor;
function floodFill(sourceCtx, mask, startPosition, color) {
    const threshold = 0.5;
    const width = sourceCtx.canvas.width;
    const height = sourceCtx.canvas.height;
    const sourceData = sourceCtx.getImageData(0, 0, width, height);
    const sourcePixels = sourceData.data;
    startPosition = startPosition.clone().round();
    const startIndex = startPosition.x + startPosition.y * width;
    // const startR = sourcePixels[startIndex * 4];
    // const startG = sourcePixels[startIndex * 4 + 1];
    // const startB = sourcePixels[startIndex * 4 + 2];
    // const startA = sourcePixels[startIndex * 4 + 3];
    const startR = parseInt(color[1] + color[2], 16);
    const startG = parseInt(color[3] + color[4], 16);
    const startB = parseInt(color[5] + color[6], 16);
    // take into account that transparent pixels appear white (due to white bg) but their rgb value is 0:
    // const startBrightness = startA < 5 ? 255 : 0.333 * (startR + startG + startB);
    const startBrightness = 0.333 * (startR + startG + startB);
    // clear alpha channel:
    for (let i = 0; i < width * height; i++) {
        mask[i * 4 + 3] = 0;
    }
    // start at multiple positions around start position:
    let stack = [];
    stack.push(startPosition);
    if (startPosition.x > 1) {
        stack.push(new Vector_1.default(startPosition.x - 2, startPosition.y));
    }
    if (startPosition.x < width - 2) {
        stack.push(new Vector_1.default(startPosition.x + 2, startPosition.y));
    }
    if (startPosition.y > 1) {
        stack.push(new Vector_1.default(startPosition.x, startPosition.y - 2));
    }
    if (startPosition.y < height - 2) {
        stack.push(new Vector_1.default(startPosition.x, startPosition.y + 2));
    }
    while (stack.length > 0) {
        let pos = stack.pop();
        if (isBorderPixel(pos.x, pos.y, false)) {
            continue;
        }
        const minX = scanLeft(pos.x, pos.y);
        const maxX = scanRight(pos.x, pos.y);
        addToStack(minX, maxX, pos.y - 1);
        addToStack(minX, maxX, pos.y + 1);
    }
    function scanLeft(x, y) {
        let minX = x;
        while (minX >= 0) {
            if (isBorderPixel(minX, y, true)) {
                break;
            }
            minX -= 1;
        }
        return minX + 1;
    }
    function scanRight(x, y) {
        let maxX = x + 1;
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
        for (let x = minX; x <= maxX; x++) {
            if (isBorderPixel(x, y, false)) {
                continue;
            }
            stack.push(new Vector_1.default(x, y));
        }
    }
    function isBorderPixel(x, y, setValue) {
        const index = (x + y * width) * 4;
        const indexA = index + 3;
        if (mask[indexA]) {
            return true;
        }
        const r = sourcePixels[index];
        const g = sourcePixels[index + 1];
        const b = sourcePixels[index + 2];
        const a = sourcePixels[index + 3];
        //
        // let difference = Math.max(
        //     Math.abs(r - startR),
        //     Math.abs(g - startG),
        //     Math.abs(b - startB),
        //     Math.abs(a - startA)
        // ) / 255;
        const brightness = 0.333 * (r + g + b);
        if (a < 250 || brightness >= startBrightness) {
            if (setValue) {
                mask[indexA] = 255;
            }
            return false;
        }
        // if (difference < threshold){
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
exports.floodFill = floodFill;
function getVisiblePixelFrame(ctx, rect) {
    let { x, y, width, height } = rect;
    if (width <= 0 || height <= 0) {
        return Rect_1.default.Empty();
    }
    const data = ctx.getImageData(x, y, width, height);
    const pixels = data.data;
    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;
    for (let cy = 0; cy < height; cy++) {
        for (let cx = 0; cx < width; cx++) {
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
    return new Rect_1.default(x, y, width, height);
}
exports.getVisiblePixelFrame = getVisiblePixelFrame;
function dilateMask(pixels, width, height) {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width - 1; x++) {
            const i = (x + y * width) * 4 + 3;
            if (pixels[i + 4]) {
                pixels[i] = 255;
            }
        }
        for (let x = width - 1; x > 0; x--) {
            const i = (x + y * width) * 4 + 3;
            if (pixels[i - 4]) {
                pixels[i] = 255;
            }
        }
    }
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height - 1; y++) {
            const i = (x + y * width) * 4 + 3;
            if (pixels[i + 4 * width]) {
                pixels[i] = 255;
            }
        }
        for (let y = height - 1; y > 0; y--) {
            const i = (x + y * width) * 4 + 3;
            if (pixels[i - 4 * width]) {
                pixels[i] = 255;
            }
        }
    }
}
exports.dilateMask = dilateMask;


/***/ }),

/***/ "./src/ts/views/BookView.ts":
/*!**********************************!*\
  !*** ./src/ts/views/BookView.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const View_1 = __webpack_require__(/*! ./View */ "./src/ts/views/View.ts");
const config_1 = __webpack_require__(/*! ../config */ "./src/ts/config.ts");
const Thumbnail_1 = __importDefault(__webpack_require__(/*! ./Thumbnail */ "./src/ts/views/Thumbnail.ts"));
const Utils = __importStar(__webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts"));
class BookView extends View_1.View {
    constructor(id, onSettingsClicked) {
        super(id);
        let settingsButton = this._element.getElementsByClassName("button settings")[0];
        Utils.addClick(settingsButton, () => onSettingsClicked());
    }
    show() {
        super.show();
        this.updateImages();
        // PeerToPeer.instance.onDataReceived = (data: ArrayBuffer) => {
        //     this._thumbnails[0].setImageSrc(URL.createObjectURL(new Blob([data])));
        // }
    }
    updateImages() {
        if (this._thumbnails) {
            return;
        }
        this._thumbnails = [];
        for (let i = 0; i < config_1.config.imageCount; i++) {
            const imageId = `image${("" + (i + 1)).padStart(2, "0")}.png`;
            let thumbnail = new Thumbnail_1.default(this._element, imageId, (id) => this.onImageSelected(id));
            this._thumbnails.push(thumbnail);
        }
    }
}
exports.default = BookView;


/***/ }),

/***/ "./src/ts/views/PaintView.ts":
/*!***********************************!*\
  !*** ./src/ts/views/PaintView.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaintView = void 0;
const View_1 = __webpack_require__(/*! ./View */ "./src/ts/views/View.ts");
const ColorPalette_1 = __importDefault(__webpack_require__(/*! ../palettes/ColorPalette */ "./src/ts/palettes/ColorPalette.ts"));
const SizePalette_1 = __importDefault(__webpack_require__(/*! ../palettes/SizePalette */ "./src/ts/palettes/SizePalette.ts"));
const Utils = __importStar(__webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts"));
const PenTool_1 = __importDefault(__webpack_require__(/*! ../tools/PenTool */ "./src/ts/tools/PenTool.ts"));
const Vector_1 = __importDefault(__webpack_require__(/*! ../math/Vector */ "./src/ts/math/Vector.ts"));
const Palette_1 = __webpack_require__(/*! ../palettes/Palette */ "./src/ts/palettes/Palette.ts");
const ImageStorage_1 = __webpack_require__(/*! ../storage/ImageStorage */ "./src/ts/storage/ImageStorage.ts");
const config_1 = __webpack_require__(/*! ../config */ "./src/ts/config.ts");
const ShapePalette_1 = __importDefault(__webpack_require__(/*! ../palettes/ShapePalette */ "./src/ts/palettes/ShapePalette.ts"));
const CanvasLayer_1 = __importDefault(__webpack_require__(/*! ../CanvasLayer */ "./src/ts/CanvasLayer.ts"));
const ImageLayer_1 = __importDefault(__webpack_require__(/*! ../ImageLayer  */ "./src/ts/ImageLayer .ts"));
const SelectionTool_1 = __importDefault(__webpack_require__(/*! ../tools/SelectionTool */ "./src/ts/tools/SelectionTool.ts"));
const Toolbar_1 = __webpack_require__(/*! ../Toolbar */ "./src/ts/Toolbar.ts");
const History_1 = __webpack_require__(/*! ../History */ "./src/ts/History.ts");
class PaintView extends View_1.View {
    constructor(id, onBackClicked) {
        super(id);
        this.scaleFactor = 1;
        this._currentTouchId = 0;
        this._layers = {};
        this._lastSaveTimestamp = 0;
        this._history = new History_1.History();
        this._sheet = document.getElementById("sheet");
        this.width = config_1.config.width;
        this.height = config_1.config.height;
        Utils.log(`Setting PaintView size to ${this.width} x ${this.height}`);
        this.addCanvasLayer("base-layer", 0, 0, this.width, this.height, false);
        this.addEventListeners();
        this.createButtons(onBackClicked);
        this.createToolbar();
        this.createPalettes();
        this.createTools();
    }
    get color() { return this._color; }
    get stamp() { return this._stamp; }
    get opacity() { return this._opacity; }
    get lineWidth() { return this._lineWidth; }
    get autoMaskCtx() { return this._autoMaskCtx; }
    //get layers(): Layer[] { return this._layers; }
    get baseLayer() { return this._layers["base-layer"]; }
    get overlayLayer() { return this._layers["overlay-layer"]; }
    getLayer(id) {
        return this._layers[id];
    }
    createButtons(onBackClicked) {
        let backButton = this._element.getElementsByClassName("button back")[0];
        Utils.addClick(backButton, () => onBackClicked());
        this._undoButton = document.getElementById("undo-button");
        Utils.addClick(this._undoButton, () => this.undo());
        this._redoButton = document.getElementById("redo-button");
        Utils.addClick(this._redoButton, () => this.redo());
        this._importImageButton = document.getElementById("import-image-button");
        Utils.addClick(this._importImageButton, () => __awaiter(this, void 0, void 0, function* () {
            const blob = yield Utils.upload("image/*");
            this.setTool(this.selectionTool);
            const url = URL.createObjectURL(blob);
            yield this.selectionTool.setImageUrl(url);
            URL.revokeObjectURL(url);
        }));
    }
    addLayer(layer) {
        layer.index = Object.keys(this._layers).length;
        this._layers[layer.id] = layer;
        return layer;
    }
    addImageLayer(id, x, y, width, height, floating) {
        const layer = new ImageLayer_1.default(this._sheet, id, x, y, width, height);
        layer.floating = floating;
        this.addLayer(layer);
        return layer;
    }
    addCanvasLayer(id, x, y, width, height, floating) {
        const layer = new CanvasLayer_1.default(this._sheet, id, x, y, width, height);
        layer.floating = floating;
        this.addLayer(layer);
        return layer;
    }
    removeLayer(layer) {
        if (!layer) {
            return;
        }
        layer.remove();
        delete this._layers[layer.id];
    }
    createOverlay() {
        if (this.overlayLayer) {
            return;
        }
        this.addLayer(new ImageLayer_1.default(this._sheet, "overlay-layer", 0, 0, this.width, this.height));
    }
    removeOverlay() {
        this.removeLayer(this.overlayLayer);
    }
    setOverlay(url) {
        if (!url) {
            this.removeOverlay();
            return;
        }
        this.createOverlay();
        this.overlayLayer.image.src = url;
        //this.processOverlay(this.overlay.ctx);
        // show processed overlay:
        // this._overlayCtx.canvas.toBlob(blob => {
        //     this._overlay.src = URL.createObjectURL(blob);
        // })
    }
    createTools() {
        let penButton = document.getElementById("tool-pen");
        Utils.addLongClick(penButton, () => this.fill());
        Utils.addClick(penButton, () => this.setTool(this.markerTool));
        let eraserButton = document.getElementById("tool-eraser");
        Utils.addLongClick(eraserButton, () => this.clear(true));
        Utils.addClick(eraserButton, () => this.setTool(this.eraserTool));
        let selectionButton = document.getElementById("tool-selection");
        Utils.addClick(selectionButton, () => this.setTool(this.selectionTool));
        Utils.addLongClick(selectionButton, () => {
            this.setTool(this.selectionTool);
            this.selectionTool.selectAll();
        });
        this._tools = [];
        // this.brushTool = this.addTool(new PenTool(this, "tool-", "source-over"));
        this.markerTool = this.addTool(new PenTool_1.default(this, "tool-pen", "darken"));
        this.eraserTool = this.addTool(new PenTool_1.default(this, "tool-eraser", "destination-out"));
        this.selectionTool = this.addTool(new SelectionTool_1.default(this, "tool-selection"));
        // this.paintBucketTool = this.addTool(new PaintBucketTool(this));
        // this._currentTool = this.brushTool;
        this.setTool(this.markerTool);
    }
    addTool(tool) {
        this._tools.push(tool);
        return tool;
    }
    createToolbar() {
        this._mainToolbar = new Toolbar_1.Toolbar("main-toolbar");
        this._contextToolbar = new Toolbar_1.Toolbar("context-toolbar");
    }
    createPalettes() {
        this._sizePalette = new SizePalette_1.default("size-palette");
        this._sizePalette.onSelectionChanged = (lineWidth) => {
            this._lineWidth = lineWidth;
        };
        this._lineWidth = this._sizePalette.size;
        this._colorPalette = new ColorPalette_1.default("color-palette");
        this._colorPalette.onSelectionChanged = (color) => this._color = color;
        this._color = this._colorPalette.color;
        this._shapePalette = new ShapePalette_1.default("stamp-palette");
        this._shapePalette.onSelectionChanged = (stamp) => {
            this._stamp = stamp;
            this.setTool(this.selectionTool);
            this.selectionTool.setImageUrl(this.stamp);
        };
        this._stamp = this._shapePalette.stamp;
        this._opacity = 1;
    }
    setTool(tool) {
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
        // this._shapePalette.setVisible(this._currentTool == this.selectionTool);
        // this._importImageButton.classList.toggle("hidden", this._currentTool != this.selectionTool);
    }
    addEventListeners() {
        let canvas = this.baseLayer.canvas;
        canvas.style.pointerEvents = "auto";
        //canvas.addEventListener('keydown', event => this.keyDown(event));
        document.addEventListener('keydown', event => this.keyDown(event));
        canvas.addEventListener('click', event => event.preventDefault());
        if (config_1.config.usePointerEvents && window.PointerEvent != null) {
            // Required to prevent pointerDown events from being choked when tapping repeatedly: 
            canvas.addEventListener('touchstart', event => {
                if (event.cancelable) {
                    event.preventDefault();
                }
            });
            canvas.addEventListener('pointerdown', event => this.pointerDown(event));
            canvas.addEventListener('pointermove', event => this.pointerMove(event));
            canvas.addEventListener('pointerup', event => this.pointerUp(event));
            canvas.addEventListener('pointercancel', event => event.preventDefault());
        }
        else {
            canvas.addEventListener('touchstart', event => this.touchStart(event));
            canvas.addEventListener('touchmove', event => this.touchMove(event));
            canvas.addEventListener('touchend', event => this.touchEnd(event));
            canvas.addEventListener('touchcancel', event => event.preventDefault());
        }
        //canvas.addEventListener('touchforcechanged', event => this.pressureChanged(<TouchEvent>event))
        // Pressure.set(canvas, {
        //     change: (force: number, event: Event) => this.pressureChanged(force)
        // })
    }
    getPointerEventPosition(event) {
        let target = event.target;
        let rect = target.getBoundingClientRect();
        const isPortraitOrientation = rect.height > rect.width;
        let nx = (event.clientX - rect.left) / rect.width;
        let ny = (event.clientY - rect.top) / rect.height;
        let x = (isPortraitOrientation ? 1 - ny : nx) * this.width;
        let y = (isPortraitOrientation ? nx : ny) * this.height;
        if (config_1.config.pixelPerfect) {
            x = Math.round(x);
            y = Math.round(y);
        }
        return new Vector_1.default(x, y);
    }
    getTouchEventPosition(touch) {
        let rect = this.baseLayer.canvas.getBoundingClientRect();
        const isPortraitOrientation = rect.height > rect.width;
        let nx = (touch.clientX - rect.left) / rect.width;
        let ny = (touch.clientY - rect.top) / rect.height;
        let x = (isPortraitOrientation ? 1 - ny : nx) * this.width;
        let y = (isPortraitOrientation ? nx : ny) * this.height;
        if (config_1.config.pixelPerfect) {
            x = Math.round(x);
            y = Math.round(y);
        }
        return new Vector_1.default(x, y);
    }
    keyDown(event) {
        if (!this.isVisible()) {
            return;
        }
        switch (event.code) {
            // case 'KeyV':
            //     if (event.metaKey){
            //         this.setTool(this.selectionTool);
            //         this.selectionTool.pasteFromClipboard();
            //     }
            //     break;
        }
        if (!this._currentTool) {
            return;
        }
        this._currentTool.keyDown(event);
    }
    pointerDown(event) {
        event.preventDefault();
        if (!event.isPrimary || event.buttons !== 1) {
            return;
        }
        let target = event.target;
        target.setPointerCapture(event.pointerId);
        this._currentTouchId = event.pointerId;
        this.down({
            timeStamp: event.timeStamp,
            position: this.getPointerEventPosition(event),
            radius: this.screenToSheet(new Vector_1.default(event.width, event.height)),
            pressure: this.getNormalizedPointerPressure(event),
            speed: 1,
            isPressed: true
        });
    }
    pointerMove(event) {
        event.preventDefault();
        if (!event.isPrimary || event.buttons !== 1) {
            return;
        }
        this.move({
            timeStamp: event.timeStamp,
            position: this.getPointerEventPosition(event),
            radius: this.screenToSheet(new Vector_1.default(event.width, event.height)),
            pressure: this.getNormalizedPointerPressure(event),
            speed: 1,
            isPressed: true
        });
    }
    getNormalizedPointerPressure(event) {
        return event.pointerType == "pen" ? Utils.clamp(0.5, 2, event.pressure * 4) : 1;
    }
    getNormalizedTouchPressure(touch) {
        return touch.touchType == "stylus" ? Utils.clamp(0.5, 2, touch.force * 4) : 1;
    }
    pointerUp(event) {
        event.preventDefault();
        if (!event.isPrimary) {
            return;
        }
        let target = event.target;
        target.releasePointerCapture(event.pointerId);
        this.up({
            timeStamp: event.timeStamp,
            position: this.getPointerEventPosition(event),
            radius: new Vector_1.default(event.width, event.height),
            pressure: 1,
            speed: 1,
            isPressed: false
        });
        this._currentTouchId = 0;
    }
    pressureChanged(force) {
        // let pressure = Utils.clamp(0.3, 1, force * 2);
        // this._currentTool.pressure = Math.max(pressure, this._currentTool.pressure);
        // this._currentTool.pressureChanged();
    }
    touchStart(event) {
        event.preventDefault();
        if (this._currentTouchId !== 0) {
            return;
        }
        const touch = event.targetTouches[0];
        this._currentTouchId = touch.identifier;
        this.down({
            timeStamp: event.timeStamp,
            position: this.getTouchEventPosition(touch),
            radius: this.screenToSheet(new Vector_1.default(touch.radiusX, touch.radiusY)),
            pressure: this.getNormalizedTouchPressure(touch),
            speed: 1,
            isPressed: true
        });
    }
    touchMove(event) {
        event.preventDefault();
        let touch = PaintView.findTouch(event.targetTouches, this._currentTouchId);
        if (touch == null) {
            return;
        }
        console.log(touch.force);
        this.move({
            timeStamp: event.timeStamp,
            position: this.getTouchEventPosition(touch),
            radius: this.screenToSheet(new Vector_1.default(touch.radiusX, touch.radiusY)),
            pressure: this.getNormalizedTouchPressure(touch),
            speed: 1,
            isPressed: true
        });
    }
    touchEnd(event) {
        event.preventDefault();
        let touch = PaintView.findTouch(event.targetTouches, this._currentTouchId);
        if (touch != null) {
            // current touch is still in the list of target touches, this means it has not ended yet
            return;
        }
        this.up({
            timeStamp: event.timeStamp,
            position: new Vector_1.default(0, 0),
            radius: new Vector_1.default(0, 0),
            pressure: 1,
            speed: 1,
            isPressed: false
        });
        this._currentTouchId = 0;
    }
    static findTouch(touches, id) {
        for (let i = 0; i < touches.length; i++) {
            if (touches[i].identifier == id) {
                return touches[i];
            }
        }
        return null;
    }
    move(data) {
        if (!this._currentTool) {
            return;
        }
        let delta = this._lastPointerData.position.distanceTo(data.position);
        if (delta <= 1) {
            return;
        }
        this._lastPointerData = this._lastPointerData || data;
        let timeDelta = data.timeStamp - this._lastPointerData.timeStamp;
        const speed = delta / timeDelta;
        data.speed = Utils.lerp(this._lastPointerData.speed, speed, 0.2);
        this._lastPointerData = data;
        this._currentTool.move(data);
    }
    down(data) {
        Palette_1.Palette.collapseAll();
        if (!this._currentTool) {
            return;
        }
        this._lastPointerData = data;
        this._currentTool.down(data);
    }
    up(data) {
        if (!this._currentTool) {
            return;
        }
        this._lastPointerData = data;
        this._currentTool.up(data);
    }
    clear(recordHistoryState = false) {
        this.baseLayer.clear();
        if (recordHistoryState) {
            this.recordHistoryState();
        }
    }
    fill() {
        this.baseLayer.ctx.fillStyle = this.color;
        this.baseLayer.ctx.fillRect(0, 0, this.width, this.height);
        this.recordHistoryState();
    }
    ResetHistory() {
        this._history.clear();
        this.recordHistoryState();
        this.updateUndoButtons();
    }
    recordHistoryState() {
        this._history.recordState(this.baseLayer.getData());
        this.updateUndoButtons();
        this.setDirty();
    }
    updateUndoButtons() {
        this._undoButton.classList.toggle("disabled", !this._history.canUndo);
        this._redoButton.classList.toggle("disabled", !this._history.canRedo);
    }
    undo() {
        if (!this._history.canUndo) {
            return;
        }
        this.baseLayer.putData(this._history.undo());
        this.updateUndoButtons();
        this.setDirty();
    }
    redo() {
        if (!this._history.canRedo) {
            return;
        }
        this.baseLayer.putData(this._history.redo());
        this.updateUndoButtons();
        this.setDirty();
    }
    restoreCurrentHistoryState() {
        this.baseLayer.putData(this._history.getCurrentState());
    }
    loadImage(id) {
        return ImageStorage_1.imageStorage.loadImage(id)
            .then(image => {
            this._imageId = id;
            this.clear();
            if (image) {
                this.baseLayer.drawImage(image);
            }
            this.setOverlay(Utils.getImageOverlayUrl(id));
            this.ResetHistory();
            this._isDirty = false;
        });
    }
    saveImage() {
        Utils.log("Saving image");
        this.baseLayer.canvas.toBlob(blob => ImageStorage_1.imageStorage.saveImage(this._imageId, blob));
        this._isDirty = false;
        this._lastSaveTimestamp = Date.now();
    }
    setDirty() {
        this._isDirty = true;
    }
    show() {
        super.show();
        this._currentTouchId = 0;
        this._autoMaskCaptured = false;
        window.requestAnimationFrame(timeStamp => this.tick(timeStamp));
        this._currentTool.enable();
    }
    hide() {
        Palette_1.Palette.collapseAll();
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
        super.hide();
    }
    tick(timeStamp) {
        if (!this.isVisible()) {
            return;
        }
        window.requestAnimationFrame(timeStamp => this.tick(timeStamp));
        let delta = timeStamp - this._tickTimeStamp;
        this._tickTimeStamp = timeStamp;
        if (this._currentTool) {
            this._currentTool.tick(delta);
            // never save while painting to avoid lags:
            if (this._lastPointerData && this._lastPointerData.isPressed) {
                return;
            }
        }
        if (this._isDirty && Date.now() > this._lastSaveTimestamp + config_1.config.saveInterval) {
            this.saveImage();
        }
    }
    captureAutoMask(position) {
        if (!config_1.config.useAutoMask) {
            return;
        }
        this._autoMaskCaptured = true;
        // if (!this.overlayLayer){
        //     return;
        // }
        if (!this._autoMaskCtx) {
            let autoMaskCanvas = document.createElement("canvas");
            autoMaskCanvas.id = "auto-mask";
            autoMaskCanvas.width = this.width;
            autoMaskCanvas.height = this.height;
            this._autoMaskCtx = autoMaskCanvas.getContext("2d", { alpha: true });
        }
        let imageData = this._autoMaskCtx.getImageData(0, 0, this.width, this.height);
        // avoid expensive floodfill:
        const index = (position.x + position.y * this.width) * 4 + 3;
        // if (this._autoMaskCaptured && imageData.data[index] > 0){
        //     return;
        // }
        Utils.log("capturing auto mask");
        Utils.floodFill(this.baseLayer.ctx, imageData.data, position, this.color);
        Utils.dilateMask(imageData.data, this.width, this.height);
        this._autoMaskCtx.putImageData(imageData, 0, 0);
    }
    processOverlay(ctx) {
        const imageData = ctx.getImageData(0, 0, this.width, this.height);
        const pixels = imageData.data;
        for (let i = pixels.length - 1; i >= 0; i--) {
            pixels[i] = pixels[i] > 64 ? 255 : 0;
        }
        ctx.putImageData(imageData, 0, 0);
    }
    screenToSheet(p) {
        return new Vector_1.default(p.x / screen.width * config_1.config.width, p.y / screen.height * config_1.config.height);
    }
}
exports.PaintView = PaintView;


/***/ }),

/***/ "./src/ts/views/SettingsView.ts":
/*!**************************************!*\
  !*** ./src/ts/views/SettingsView.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const View_1 = __webpack_require__(/*! ./View */ "./src/ts/views/View.ts");
const Utils = __importStar(__webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts"));
const ImageStorage_1 = __webpack_require__(/*! ../storage/ImageStorage */ "./src/ts/storage/ImageStorage.ts");
const version = "1.0.0"; //require('/package').version;
var ConsoleLogHTML = __webpack_require__(/*! console-log-html */ "./node_modules/console-log-html/console-log-html.js");
const file_saver_1 = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
class SettingsView extends View_1.View {
    constructor(id, onBackClicked) {
        super(id);
        let backButton = this._element.getElementsByClassName("button back")[0];
        Utils.addClick(backButton, () => onBackClicked());
        let exportButton = this._element.getElementsByClassName("button export")[0];
        Utils.addClick(exportButton, () => __awaiter(this, void 0, void 0, function* () {
            const zipBlob = yield ImageStorage_1.imageStorage.generateBackupArchive();
            file_saver_1.saveAs(zipBlob, "web-paint-backup.zip");
        }));
        let importButton = this._element.getElementsByClassName("button import")[0];
        Utils.addClick(importButton, () => __awaiter(this, void 0, void 0, function* () {
            ImageStorage_1.imageStorage.importBackupArchive(yield Utils.upload(".zip"));
            this.updateInfo();
        }));
        let clearButton = this._element.getElementsByClassName("button clear")[0];
        Utils.addClick(clearButton, () => {
            if (confirm("Really clear all iamges?")) {
                ImageStorage_1.imageStorage.clear();
                location.reload();
            }
        });
        ConsoleLogHTML.connect(document.getElementById("log"), {}, true, true, true);
    }
    show() {
        super.show();
        this.updateInfo();
    }
    updateInfo() {
        const info = document.getElementById("info");
        info.innerText = `Version: ${version}`;
        ImageStorage_1.imageStorage.getStorageUsed().then(amount => {
            info.innerText += `\rStorage used: ${Utils.formatBytes(amount, 1)}`;
        });
    }
}
exports.default = SettingsView;


/***/ }),

/***/ "./src/ts/views/Thumbnail.ts":
/*!***********************************!*\
  !*** ./src/ts/views/Thumbnail.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Utils = __importStar(__webpack_require__(/*! ../utils/Utils */ "./src/ts/utils/Utils.ts"));
const ImageStorage_1 = __webpack_require__(/*! ../storage/ImageStorage */ "./src/ts/storage/ImageStorage.ts");
class Thumbnail {
    constructor(parent, id, onImageSelected) {
        let element = document.createElement("div");
        this._element = element;
        element.id = id;
        element.classList.add("thumbnail");
        this._element.style.opacity = "0";
        // Utils.addLongClick(element, () => {
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
        Utils.addClick(element, () => {
            if (onImageSelected) {
                onImageSelected(id);
            }
        }, true);
        ImageStorage_1.imageStorage.addChangeListener((change, id) => {
            if (change == "save" && id == this.id) {
                this.loadImage();
            }
        });
        this.overlayUrl = Utils.getImageOverlayUrl(id);
        parent.appendChild(element);
        this.loadImage();
    }
    get id() { return this._element.id; }
    set imageUrl(src) {
        this._imageUrl = src;
        this._element.style.opacity = "1";
        this.updateBackgroundImages();
    }
    set overlayUrl(src) {
        this._overlayUrl = src;
        this.updateBackgroundImages();
    }
    remove() {
        this._element.remove();
    }
    isHidden() {
        return (this._element.offsetParent === null);
    }
    loadImage() {
        ImageStorage_1.imageStorage.loadImageUrl(this.id)
            .then(url => {
            this.imageUrl = url;
        });
    }
    updateBackgroundImages() {
        let urls = [];
        if (this._overlayUrl) {
            urls.push(`url(${this._overlayUrl})`);
        }
        if (this._imageUrl) {
            urls.push(`url(${this._imageUrl})`);
        }
        this._element.style.backgroundImage = urls.join(",");
    }
}
exports.default = Thumbnail;


/***/ }),

/***/ "./src/ts/views/View.ts":
/*!******************************!*\
  !*** ./src/ts/views/View.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.View = void 0;
class View {
    constructor(id) {
        this._element = document.getElementById(id);
        if (!this._element) {
            console.error(`Could not find element with id ${id}`);
        }
        this.hide();
    }
    clear() {
        while (this._element.hasChildNodes()) {
            this._element.removeChild(this._element.firstChild);
        }
    }
    show() {
        this._element.classList.remove("hidden");
    }
    hide() {
        this._element.classList.add("hidden");
    }
    setVisible(visible) {
        this._element.classList.toggle("hidden", !visible);
    }
    isVisible() {
        return !this._element.classList.contains("hidden");
    }
}
exports.View = View;


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
/******/ 			["./src/ts/app.ts","vendors-node_modules_fortawesome_fontawesome-svg-core_index_es_js-node_modules_fortawesome_fr-3e03f6"]
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
//# sourceMappingURL=main.20ab667a26467189d6b8.js.map