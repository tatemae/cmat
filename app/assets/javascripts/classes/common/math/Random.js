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
// based on: https://raw.github.com/mihhail-lapushkin/Ancient-Riddle/ad6930a07059e5d403681754480432fcb21cec30/src/classes/common/math/Random.js
// which is based on: http://baagoe.org/en/wiki/Better_random_numbers_for_javascript
Random = (function() {
  var n = 0xefc8249d;

  function mash(data) {
    data = data.toString();

    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000;
    }

    return (n >>> 0) * 2.3283064365386963e-10;
  }

  var s0, s1, s2;
  var seed = Date.now();
  var c = 1;

  s0 = s1 = s2 = mash(' ');
  s0 -= mash(seed);
  s1 -= mash(seed);
  s2 -= mash(seed);

  if (s0 < 0)
    s0 += 1;
  if (s1 < 0)
    s1 += 1;
  if (s2 < 0)
    s2 += 1;

  function rand() {
    var t = 2091639 * s0 + c * 2.3283064365386963e-10;
    s0 = s1;
    s1 = s2;
    /*jshint boss:true */
    return s2 = t - (c = t | 0);
  }

  function randFloat() {
    return rand() + (rand() * 0x200000 | 0) * 1.1102230246251565e-16;
  }

  function randomObject(min, max) {
    return min + randFloat() * (max - min);
  }

  randomObject.intgr = function(min, max) {
    if (!max) {
      max = min;
      min = 0;
    }

    return Math.floor(min + randFloat() * (max - min + 1));
  };

  randomObject.bool = function() {
    return randFloat() < 0.5;
  };

  return randomObject;
})();