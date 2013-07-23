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
// based on: https://raw.github.com/mihhail-lapushkin/Ancient-Riddle/ad6930a07059e5d403681754480432fcb21cec30/src/classes/game/ui/object/widget/ProgressBar.js
Kinetic.ProgressBar = (function() {
  var DOTS = 15;
  var FADE_DISTANCE = 0.3;

  var Class = $$$.Class({
    _init: function(config) {
      Kinetic.Group.call(this, config);

      this._build();
      this.on('percentChange', this._percentChanged);
    },

    _build: function() {
      var w = this.getWidth();
      var h = this.getHeight();
      var gap = (w - h * DOTS) / (DOTS - 1);

      for (var i = 0; i < DOTS; i++) {
        this.add(new Kinetic.ProportionalImage({
          x: i * (h + gap),
          height: h,
          image: Image.text.dot,
          opacity: 0
        }));
      }
    },

    _percentChanged: function(evt) {
      evt.cancelBubble = true;

      var w = this.getWidth();
      var fadeDist = FADE_DISTANCE * w;
      var isRev = this.getReversed();
      var pos = Math.abs(evt.newVal - (isRev ? 1 : 0)) * (w + fadeDist) - fadeDist;

      this.each(function(n) {
        var npos = n.getX() + n.getWidth() / 2;

        if (isRev) {
          n.setOpacity(pos > npos ? 0 : Math.min(npos - pos, fadeDist) / fadeDist);
        } else {
          n.setOpacity(1 - (pos > npos ? 0 : Math.min(npos - pos, fadeDist) / fadeDist));
        }
      });

      this.getLayer().draw();
    }
  });

  Kinetic.Util.extend(Class, Kinetic.Group);
  Kinetic.Node.addGetterSetter(Class, 'percent', 0);
  Kinetic.Node.addGetterSetter(Class, 'reversed', false);

  return Class;
})();