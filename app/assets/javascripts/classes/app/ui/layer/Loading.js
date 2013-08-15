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
// based on: https://raw.github.com/mihhail-lapushkin/Ancient-Riddle/ad6930a07059e5d403681754480432fcb21cec30/src/classes/game/ui/layer/Loading.js
Kinetic.Loading = (function() {
  var TEXT_HEIGHT = 6;
  var BAR_Y = 0.8;
  var BAR_WIDTH = 0.7;
  var BAR_HEIGHT = 2.2;

  var Class = $$$.Class({
    _init: function(config) {
      config.listening = false;

      Kinetic.Group.call(this, config);

      this._build();
      this.on('percentChange', this._percentChanged);
    },

    _build: function() {
      var w = this.getWidth();
      var h = this.getHeight();
      var unit = this.attrs.unit;

      this.add(this.bg = new Kinetic.Rect({
        width: w,
        height: h,
        fill: 'black'
      }));

      this.add(this.text = new Kinetic.ProportionalImage({
        height: unit * TEXT_HEIGHT,
        image: Image.text.loading
      }));

      this.add(this.bar = new Kinetic.ProgressBar({
        y: h * BAR_Y,
        width: w * BAR_WIDTH,
        height: unit * BAR_HEIGHT,
        reversed: true
      }));

      this.center(this.text);
      this.centerHorizontally(this.bar);
    },

    _percentChanged: function(evt) {
      this.text.setOpacity(1 - evt.newVal);
      this.bar.setPercent(1 - evt.newVal);
      this.getParent().draw();
    },

    destroy: function() {
      Kinetic.Group.prototype.destroy.call(this);
      // delete Image.text.loading;
    }
  });

  Kinetic.Util.extend(Class, Kinetic.Group);
  Kinetic.Node.addGetterSetter(Class, 'percent');

  return Class;
})();