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
// based on https://raw.github.com/mihhail-lapushkin/Ancient-Riddle/ad6930a07059e5d403681754480432fcb21cec30/src/classes/common/util/Utils.js
Utils = $$$ = (function() {
  return {
    Class: function(newClass) {
      var constructor = newClass._init || function() {
      };
      var extendsFrom = newClass.extend;
      constructor.prototype = newClass;
      newClass._init = undefined;
      newClass.extend = undefined;

      if (extendsFrom) {
        this.extend(constructor, extendsFrom);
      }

      if (extendsFrom && extendsFrom.extended) {
        extendsFrom.extended(constructor);
      }

      return constructor;
    },

    extend: function(c1, c2) {
      for (var key in c2.prototype) {
        if (!(key in c1.prototype)) {
          c1.prototype[key] = c2.prototype[key];
        }
      }
    },

    type: function(v) {
      return Object.prototype.toString.call(v);
    },

    copy: function(obj) {
      Array.prototype.slice.call(arguments, 1).forEach(function(source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      });
      return obj;
    },

    clone: function(obj) {
      return this.copy({}, obj);
    },

    delay: function(duration, callback) {
      return setTimeout(callback, duration * 1000);
    }
  };
})();