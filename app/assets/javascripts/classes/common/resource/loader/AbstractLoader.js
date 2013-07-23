// Copyright (c) 2013, Mihhail Lapuškin
// All rights reserved.

// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met: 

// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer. 
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution. 

// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
// ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// The views and conclusions contained in the software and documentation are those
// of the authors and should not be interpreted as representing official policies, 
// either expressed or implied, of the FreeBSD Project.
//
// https://raw.github.com/mihhail-lapushkin/Ancient-Riddle/ad6930a07059e5d403681754480432fcb21cec30/src/classes/common/resource/loader/AbstractLoader.js
AbstractLoader = (function() {
  return $$$.Class({
    _init: function() {
      this.loaded = this.loaded.bind(this);

      this.reset();

      if (arguments.length > 0) {
        this.load.apply(this, arguments);
      }
    },

    load: function() {
      throw ("Must override abstract method 'load'!");
    },

    reset: function() {
      this._loadedListeners = [];
      this._progressListeners = [];
      this._loaded = false;
    },

    loaded: function(fn) {
      if (this._loaded) {
        fn();
      } else {
        this._loadedListeners.add(fn);
      }
    },

    progress: function(fn) {
      this._progressListeners.add(fn);
    },

    _notifyLoadedListeners: function() {
      this._loaded = true;
      this._loadedListeners.forEach(function(l) {
        l();
      });
    },

    _notifyProgressListeners: function(p) {
      this._progressListeners.forEach(function(l) {
        l(p);
      });
    },

    /*jshint loopfunc:true */
    _traverseAndLoad: function(inObj, outObj, path, ext, beforeLoad, onload) {
      for (var k in inObj) {
        var v = inObj[k];

        if (!Array.isArray(v)) {
          outObj[k] = outObj[k] || {};
          this._traverseAndLoad(inObj[k], outObj[k], path + k + '/', ext, beforeLoad, onload);
        } else {
          var files;
          var basePath = path;

          if (k === '_') {
            files = outObj;
          } else {
            basePath += k + '/';
            files = outObj[k] = (outObj[k] || {});
          }

          beforeLoad(v);

          v.forEach(function(file) {
            this._loadResource(files, basePath, file, ext, onload);
          }.bind(this));
        }
      }
    },

    _loadResource: function() {
      throw ("Must override abstract method '_loadResource'!");
    },

    _loadResources: function(formats, basePath, resObject) {
      var loading = 0;
      var loaded = 0;

      function beforeLoad(arr) {
        loading += arr.length;
      }

      var onload = function() {
        this._notifyProgressListeners(loaded / loading);

        if (++loaded >= loading) {
          this._notifyLoadedListeners();
        }
      }.bind(this);

      for (var formatName in formats) {
        this._traverseAndLoad(formats[formatName], resObject, basePath, formatName, beforeLoad, onload);
      }
    }
  });
})();