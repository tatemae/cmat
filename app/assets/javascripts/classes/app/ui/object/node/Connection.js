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
    _init: function(config, markerRadius) {
      config.drawFunc = this.drawFunc;

      Kinetic.Shape.call(this, config);

      this.getNodes().forEach(function(c) {
        var node = UI.cmat_app.wholeNodes.get('#'+c)[0].getParent();
        node.on('xChange yChange radiusChange', this.refresh.bind(this));
      }.bind(this));

      this.markerDiameter = markerRadius * 2;

      this.drawn = true;
      this.refresh();
    },

    refresh: function() {
      if (!this.drawn) return;

      this.drawn = false;
      this._markers = [];

      var nodes = this.getNodes();
      var c1 = UI.cmat_app.wholeNodes.get('#'+nodes[0])[0].getParent(), c2 = UI.cmat_app.wholeNodes.get('#'+nodes[1])[0].getParent();
      var x1 = c1.getX(), y1 = c1.getY(), x2 = c2.getX(), y2 = c2.getY();

      this._markers.push([x1, y1]);
      this._markers.push([x2, y2]);

    },

    drawFunc: function(canvas) {
      var context = canvas.getContext();

      if (this._markers.length > 1){
        context.beginPath();
        context.moveTo(this._markers[0][0], this._markers[0][1]);
        context.lineTo(this._markers[this._markers.length-1][0], this._markers[this._markers.length-1][1]);
        context.closePath();
        context.strokeStyle = this.attrs.strokeStyle;

        context.lineJoin = this.attrs.lineJoin;
        context.lineWidth = this.attrs.lineWidth;
        context.stroke();
      }

      this.drawn = true;
    },

    getNodes: function() {
      return this.attrs.nodes;
    },

    hasNode: function(c) {
      var nodes = this.getNodes();

      return nodes[0] === c.id || nodes[1] === c.id;
    }
  });

  Kinetic.Util.extend(Class, Kinetic.Shape);

  return Class;
})();