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
//
// based on: https://raw.github.com/mihhail-lapushkin/Ancient-Riddle/ad6930a07059e5d403681754480432fcb21cec30/src/classes/game/ui/anim/LayoutManager.js
Kinetic.LayoutManager = (function() {
  var ANTI_GRAVITY = 4;
  var ANTI_GRAVITY_REACH = 4;
  var GRAVITY = 2;
  var CIRCLE_PADDING = 0.2;
  var READJUST_LAYOUT_STEPS = 15;

  var Class = $$$.Class({
    _init: function(config) {
      config.onStep = this._onAdjustStep;

      Kinetic.StepAnimation.call(this, config);

      this._wholeNodes = config.wholeNodes;
      this._conns = config.connections;
      this._corners = config.clearCorners;
      this._bounds = config.bounds;

      this._initAlgorithm();
    },

    _onAdjustStep: function() {
      this._algorithm.runOnce();
      this._conns.forEach(function(c) { c.refresh(); });
      this._wholeNodes.forEach(function(c) { c.cachedTransform = undefined; });
    },

    _clearFromCorners: function(a, x, y, minXY, maxX, maxY) {
      for (var c in this._corners) {
        var v = this._corners[c];
        var cX = 0, cY = 0;
        var clear = false;

        switch (c) {
          case 'tl':
            cX = minXY + v.width;
            cY = minXY + v.height;
            clear = x < cX && y < cY;
            break;
          case 'tr':
            cX = maxX - v.width;
            cY = minXY + v.height;
            clear = x > cX && y < cY;
            break;
          case 'bl':
            cX = minXY + v.width;
            cY = maxY - v.height;
            clear = x < cX && y > cY;
            break;
          case 'br':
            cX = maxX - v.width;
            cY = maxY - v.height;
            clear = x > cX && y > cY;
            break;
        }

        if (clear) {
          if (Math.abs(x - cX) < Math.abs(y - cY)) {
            a.attrs.x = cX;
          } else {
            a.attrs.y = cY;
          }
        }
      }
    },

    _keepInBounds: function(a) {
      var r = a.attrs.radius;
      var x = a.attrs.x;
      var y = a.attrs.y;
      var p = this._bounds.padding;
      var minXY = r + p;
      var maxX = this._bounds.width - r - p;
      var maxY = this._bounds.height - r - p;

      if (x < minXY) {
        a.attrs.x = minXY;
      } else if (x > maxX) {
        a.attrs.x = maxX;
      }

      if (y < minXY) {
        a.attrs.y = minXY;
      } else if (y > maxY) {
        a.attrs.y = maxY;
      }

      this._clearFromCorners(a, x, y, minXY, maxX, maxY);
    },

    _initAlgorithm: function() {
      this._algorithm = new ForceDirected({
        wholeNodes: this._wholeNodes,
        operations: {
          equals:       function(a, b)  { return a === b; },
          radius:       function(a)     { return a.attrs.radius; },
          value:        function(a)     { return a.attrs.score; },
          getX:         function(a)     { return a.attrs.x; },
          getY:         function(a)     { return a.attrs.y; },
          setX:         function(a, v)  { a.attrs.x = v; },
          setY:         function(a, v)  { a.attrs.y = v; },
          ownsEdgeTo:   function(a, b)  { return a.ownsConnectionWith(b); },
          owningEdges:  function(a)     { return a.connections(); },
          keepInBounds: this._keepInBounds.bind(this)
        },
        maxDim: this._bounds.width,
        antiGravity: ANTI_GRAVITY,
        antiGravityReach: ANTI_GRAVITY_REACH,
        gravity: GRAVITY,
        nodePadding: CIRCLE_PADDING
      });
    },

    adjustLayout: function() {
      this.run(READJUST_LAYOUT_STEPS);
    }
  });

  Kinetic.Util.extend(Class, Kinetic.StepAnimation);

  return Class;
})();