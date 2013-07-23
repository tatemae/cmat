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
// based on https://raw.github.com/mihhail-lapushkin/Ancient-Riddle/ad6930a07059e5d403681754480432fcb21cec30/src/classes/common/jslang/Array.js
if (!Array.isArray) {
  Array.isArray = function(v) {
    return Object.prototype.toString.call(v) === '[object Array]';
  };
}

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(iterator, context) {
    if (this.length === +this.length) {
      for (var i = 0, l = this.length; i < l; i++) {
        if (i in this) iterator.call(context, this[i], i, this);
      }
    } else {
      for (var key in this) {
        if (Object.prototype.hasOwnProperty.call(this, key)) {
          iterator.call(context, this[key], key, this);
        }
      }
    }
  };
}

if (!Array.prototype.indexOf) {
  var sortedIndex = function(array, obj, iterator) {
    /*jshint expr:true */
    iterator || (iterator = function(v) { return v; });
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  Array.prototype.indexOf = function(item, isSorted) {
    var i, l;
    if (isSorted) {
      i = sortedIndex(array, item);
      return this[i] === item ? i : -1;
    }
    for (i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) {
        return i;
      }

      return -1;
    }
  };
}

Array.prototype.isEmpty = function() {
  return this.length === 0;
};

Array.prototype.contains = function(target) {
  return this.indexOf(target) != -1;
};

Array.prototype.add = function(el) {
  this.push(el);

  return this;
};

Array.prototype.last = function() {
  return this[this.length - 1];
};

Array.prototype.first = function() {
  return this[0];
};

Array.prototype.remove = function(el) {
  var i = this.indexOf(el);

  if (i != -1) {
    this.splice(i, 1);
  }

  return this;
};

Array.prototype.clone = function() {
  return this.slice();
};