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
// based on: https://raw.github.com/mihhail-lapushkin/Ancient-Riddle/ad6930a07059e5d403681754480432fcb21cec30/src/classes/common/math/graph/ForceDirected.js
// which was based on: http://www.kylescholz.com/blog/2006/06/force_directed_graphs_in_javas.html
ForceDirected = (function() {
  var BASE_VALUE = 800;

  return $$$.Class({
    _init: function(config) {
      config.bvFactor = BASE_VALUE / config.maxDim;

      $$$.copy(this, config);
    },

    runOnce: function() {
      var op = this.operations;
      var k = this.bvFactor;
      var agr = this.antiGravityReach;
      var ag = this.antiGravity;
      var np = this.nodePadding;
      var g = this.gravity;

      this.wholeNodes.forEach(function(v) {
        this.wholeNodes.forEach(function(u) {
          if (!op.equals(v, u)) {
            var vx = op.getX(v) * k, vy = op.getY(v) * k;
            var ux = op.getX(u) * k, uy = op.getY(u) * k;
            var vr = op.radius(v) * k, ur = op.radius(u) * k;

            var dx = vx - ux;
            var dy = vy - uy;
            var d2 = Math.pow(dx, 2) + Math.pow(dy, 2);
            var d = Math.sqrt(d2);
            var dxd = dx / d, dyd = dy / d;

            // apply attractive force across the connection
            if (op.ownsEdgeTo(v, u)) {
              var dmr = d - vr - ur - np * Math.max(vr, ur);

              if (dmr > 0) {
                var attractiveForce = Math.log(Math.pow(dmr, g) / (op.owningEdges(v) + op.owningEdges(u)));
                var moveX = attractiveForce * dxd, moveY = attractiveForce * dyd;

                op.setX(v, (vx -= moveX) / k);
                op.setY(v, (vy -= moveY) / k);
                op.setX(u, (ux += moveX) / k);
                op.setY(u, (uy += moveY) / k);
              }
            }

            // apply repulsive force between every node
            var repulsiveForce = BASE_VALUE * ag * op.value(v) * op.value(u) / d2;
            var df = (vr + ur) * agr - d;

            if (df > 0) {
              repulsiveForce *= Math.log(df);
            }

            op.setX(v, (vx + repulsiveForce * dxd) / k);
            op.setY(v, (vy + repulsiveForce * dyd) / k);
          }
        }.bind(this));

        op.keepInBounds(v);
      }.bind(this));
    }
  });
})();