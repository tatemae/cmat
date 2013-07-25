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
// based on: https://raw.github.com/mihhail-lapushkin/Ancient-Riddle/ad6930a07059e5d403681754480432fcb21cec30/src/classes/game/ui/layer/Background.js
Kinetic.Background = (function() {
  var ANIMATION_TIME = 0.5;

  var Class = $$$.Class({
    _init: function(config) {
      config.listening = false;

      Kinetic.Group.call(this, config);

      this.add(this.normal = this._createImage(Image.bg.normal));
      // this.add(this.gs = this._createImage(Image.bg.gs));
    },

    _createImage: function(img) {
      return new Kinetic.Image({
        width: this.getWidth(),
        height: this.getHeight(),
        image: img
      });
    },

    toGrayscale: function(callback) {
      this.gs.show();
      this.gs.to({
        duration: ANIMATION_TIME,
        opacity: 1,
        callback: callback
      });
    },

    toColor: function(callback) {
      this.gs.to({
        duration: ANIMATION_TIME,
        opacity: 0,
        callback: function() {
          this.gs.hide();
          if (callback) callback();
        }.bind(this)
      });
    }
  });

  Kinetic.Util.extend(Class, Kinetic.Group);

  return Class;
})();