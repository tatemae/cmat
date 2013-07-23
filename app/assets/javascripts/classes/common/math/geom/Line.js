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
// based on: https://raw.github.com/mihhail-lapushkin/Ancient-Riddle/ad6930a07059e5d403681754480432fcb21cec30/src/classes/common/math/geom/Line.js
Line = $$$.Class({
  _init: function(x1, y1, x2, y2) {
    if (x2 == x1) {
      this.m = 0;
      this.c = x1;
      this.isParallelToY = true;
    } else {
      this.m = (y2 - y1) / (x2 - x1);
      this.c = y1 - x1 * this.m;
      this.isParallelToY = false;
    }
  },

  _calcPointFromQuadEqParams: function(x, y, plusMinusSqrtOfDiscrim) {
    var m = this.m;
    var c = this.c;
    var xx = ((m * (y - c) + x) + plusMinusSqrtOfDiscrim) / (Math.pow(m, 2) + 1);

    return new Point(xx, m * xx + c);
  },

  intersectCircle: function(x, y, r) {
    if (this.isParallelToY) {
      return [ new Point(x, y - r), new Point(x, y + r) ];
    } else {
      var m = this.m;
      var c = this.c;
      var discrim = Math.pow(m * (c - y) - x, 2) - (Math.pow(m, 2) + 1) * (Math.pow(x, 2) - Math.pow(r, 2) + (c - y) * (c - y));

      if (discrim === 0) {
        return [ this._calcPointFromQuadEqParams(x, y, 0) ];
      } else if (discrim > 0) {
        var sqrtOfDiscrim = Math.sqrt(discrim);

        return [ this._calcPointFromQuadEqParams(x, y, sqrtOfDiscrim), this._calcPointFromQuadEqParams(x, y, -sqrtOfDiscrim) ];
      }
    }
  },

  intersect: function(line) {
    if (this.isParallelToY) {
      return new Point(this.c, line.m * this.c + line.c);
    } else if (line.isParallelToY) {
      return new Point(line.c, this.m * line.c + this.c);
    } else {
      var m1 = this.m;
      var m2 = line.m;
      var c1 = this.c;
      var c2 = line.c;
      var d = m1 - m2;

      return new Point((c2 - c1) / d, (c2 * m1 - c1 * m2) / d);
    }
  }
});