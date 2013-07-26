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
// based on: https://raw.github.com/mihhail-lapushkin/Ancient-Riddle/ad6930a07059e5d403681754480432fcb21cec30/src/classes/game/ui/object/circle/Connection.js
Kinetic.Connection = (function() {
  var MIN_COUNT = 4;
  var MAX_STRETCH = 1.5;

  var Class = $$$.Class({
    _init: function(config) {
      config.drawFunc = this.drawFunc;

      Kinetic.Shape.call(this, config);

      this.getCircles().forEach(function(c) {
        c.on('xChange yChange radiusChange', this.refresh.bind(this));
      }.bind(this));

      this.drawn = true;
      this.refresh();
      this.markerImg = Image.circle.connection.marker;
    },

    refresh: function() {
      if (!this.drawn) return;

      this.drawn = false;
      this._markers = [];

      var circles = this.getCircles();
      var c1 = circles[0], c2 = circles[1];
      var x1 = c1.getX(), y1 = c1.getY(), r1 = c1.getRadius();
      var x2 = c2.getX(), y2 = c2.getY(), r2 = c2.getRadius();
      var minMarkers = Math.max(MIN_COUNT, 2);
      var maxPadding = MAX_STRETCH;
      var maxPaddingPlusMarker = maxPadding + 1;
      var markerRadius = this.attrs.markerRadius;
      var markerDiameter = markerRadius * 2;

      // find the points where the joining line intersects circles
      var l = new Line(x1, y1, x2, y2);
      var ip1 = l.intersectCircle(x1, y1, r1 - markerDiameter);
      var ip2 = l.intersectCircle(x2, y2, r2 - markerDiameter);
      var minDist = Number.MAX_VALUE, minP1, minP2;

      // find the right points(closest to each other)
      ip1.forEach(function(p1) {
        ip2.forEach(function(p2) {
          var d = p1.distance(p2);
          if (d < minDist) {
            minDist = d;
            minP1 = p1;
            minP2 = p2;
          }
        });
      });

      x1 = minP1.x;
      y1 = minP1.y;
      x2 = minP2.x;
      y2 = minP2.y;

      var d = minDist;
      var dx = x2 - x1, dy = y2 - y1;
      var fitsMarkers = d / markerDiameter;
      var fitsMarkersInt = Math.floor(fitsMarkers);
      var markersShown = fitsMarkersInt - fitsMarkersInt % 2; // show only even number of markers

      if (markersShown < 2)
        return;

      var initialPadding = 0.5; // before first marker (same amount is at the end also)
      var extraInitialPadding = 0;
      var padding = 0; // between markers

      // don't begin stretching until we have at least this much markers
      // available
      if (markersShown < minMarkers) {
        extraInitialPadding = fitsMarkers % 2 / 2;
        // we have some extra space, so let's begin stretching
      } else {
        markersShown = minMarkers;
        padding = (fitsMarkers - markersShown) / (markersShown + 1);

        // don't stretch more than needed
        if (padding >= maxPadding) {
          // see how much extra space we have
          extraInitialPadding = maxPadding + (padding - maxPadding) * (markersShown + 1) / 2;

          // see how many extra markers can we fit
          while (extraInitialPadding > maxPaddingPlusMarker) {
            markersShown += 2;
            extraInitialPadding -= maxPaddingPlusMarker;
          }

          padding = maxPadding;
          // continue stretching
        } else {
          extraInitialPadding = padding;
        }
      }

      initialPadding += extraInitialPadding;

      for (var i = 0, sx = dx / fitsMarkers, sy = dy / fitsMarkers; i < markersShown; i++) {
        var j = i * (1 + padding) + initialPadding;

        this._markers.add([ x1 + j * sx - markerRadius, y1 + j * sy - markerRadius, markerDiameter ]);
      }
    },

    drawFunc: function(canvas) {
      var context = canvas.getContext();
      var img = this.markerImg;

      this._markers.forEach(function(m) {
        context.drawImage(img, m[0], m[1], m[2], m[2]);
      });

      this.drawn = true;
    },

    getCircles: function() {
      return this.attrs.circles;
    },

    hasCircle: function(c) {
      var circles = this.getCircles();

      return circles[0] === c || circles[1] === c;
    }
  });

  Kinetic.Util.extend(Class, Kinetic.Shape);

  return Class;
})();