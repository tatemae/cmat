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
// based on: https://raw.github.com/mihhail-lapushkin/Ancient-Riddle/ad6930a07059e5d403681754480432fcb21cec30/src/classes/game/ui/object/circle/GameCircle.js
Kinetic.AppNode = (function() {
  var MAX_SCORE = 5;
  var EXPAND = 1.2;
  var COLLAPSE = 0.95;
  var EXPAND_TIME = 0.2;
  var COLLAPSE_TIME = 0.5;
  var TO_NORMAL_TIME = 0.15;
  var FADE_OUT_TIME = 0.3;
  var FAST_ROTATE_OUT_TIME = 0.3;
  var LONG_ROTATE_OUT_TIME = 0.6;
  var PERCENT_RADIUS = 4;

  var Class = $$$.Class({
    _init: function(config) {
      Kinetic.Image.call(this, config);

      this.attrs.connections = [];
      this.attrs._connections = [];
      this.attrs.neighbours = [];
      this.attrs.ownNeighbours = [];
      this._ownsConnection = {};

      this.on('dblclick dbltap', this._pressed);
      this.on('radiusChange', this._syncRadiusWithImageSize);
      this.on('widthChange heightChange', this._syncSizeWithOffset);

      this.setRadius(this._calcRadius());
      this._updateImage();
    },

    _updateImage: function() {
      this.setImage(Image.node.node_red);
    },

    _syncRadiusWithImageSize: function() {
      var d = this.getRadius() * 2;

      this.setSize(d, d);
    },

    _calcRadius: function(s) {
      return this.attrs.radiusFunc(1, PERCENT_RADIUS);
    },

    _syncSizeWithOffset: function() {
      this.setOffset(this.getWidth() / 2, this.getHeight() / 2);
    },

    getConnections: function() {
      return this.attrs.connections;
    },

    _removeConnection: function(conn) {
      this.attrs.connections.remove(conn);
    },

    getNeighbours: function() {
      return this.attrs.neighbours;
    },

    _removeNeighbour: function(circle) {
      this.attrs.neighbours.remove(circle);
    },

    getOwnNeighbours: function() {
      return this.attrs.ownNeighbours;
    },

    _addOwnNeighbour: function(circle) {
      this.attrs.ownNeighbours.add(circle);
      this._ownsConnection[circle._id] = true;
    },

    _removeOwnNeighbour: function(circle) {
      this.attrs.ownNeighbours.remove(circle);
      this._ownsConnection[circle._id] = false;
    },

    connections: function() {
      return this.getConnections().length;
    },

    // connect: function(circle) {
    //   if (circle != this && !this.isConnected(circle)) {
    //     var conn = new Kinetic.Connection($$$.copy({ circles: [ this, circle ] }, this.attrs.connection));

    //     this.getConnections().add(conn);
    //     circle.getConnections().add(conn);
    //     this.getNeighbours().add(circle);
    //     circle.getNeighbours().add(this);

    //     this._addOwnNeighbour(circle);

    //     this.attrs.connection.parent.add(conn);
    //   }
    // },

    // disconnect: function(circle) {
    //   if (circle != this && this.isConnected(circle)) {
    //     var delConn;

    //     this.getConnections().forEach(function(conn) {
    //       if (conn.hasCircle(circle)) {
    //         delConn = conn;
    //       }
    //     });

    //     this._removeConnection(delConn);
    //     circle._removeConnection(delConn);
    //     this._removeNeighbour(circle);
    //     circle._removeNeighbour(this);

    //     if (this.ownsConnectionWith(circle)) {
    //       this._removeOwnNeighbour(circle);
    //     } else {
    //       circle._removeOwnNeighbour(this);
    //     }

    //     delConn.destroy();
    //   }
    // },

    ownsConnectionWith: function(c) {
      return this._ownsConnection[c._id];
    },

    isConnected: function(c) {
      return this.getNeighbours().contains(c);
    },

    _animatePress: function() {
      var tweening = this.isTweening();
      var actualRadius = this._calcRadius();
      var currRadius = this.getRadius();
      var expandRadius = !tweening ? currRadius : actualRadius;
      var normalRadius = tweening ? actualRadius : currRadius;

      this.to({
        radius: expandRadius * EXPAND,
        duration: EXPAND_TIME,
        easing: 'StrongEaseOut',
        callback: function() {
          this.to({
            radius: normalRadius * COLLAPSE,
            duration: COLLAPSE_TIME,
            easing: 'BackEaseInOut',
            callback: function() {
              this.to({
                radius: normalRadius,
                duration: TO_NORMAL_TIME,
                easing: 'BackEaseOut'
              });
            }
          });
        }
      });
    },

    removeCircle: function() {
      this._removeCircle();
    },

    _removeCircle: function(pressed) {
      var neighs = this.getNeighbours().clone();
      neighs.forEach(function(c) {
        c.setListening(false);
      });

      this.setListening(false);
      this.to({
        scaleX: 0,
        scaleY: 0,
        opacity: 0.1,
        rotation: Math.PI * 2,
        duration: this.getScore() > 1 ? LONG_ROTATE_OUT_TIME : FAST_ROTATE_OUT_TIME,
        callback: function() {
          var parent = this.getParent();

          neighs.forEach(function(c) {
            this.disconnect(c);
            c.setListening(true);
          }.bind(this));

          this.destroy();

          parent.fire((pressed ? 'pressed' : 'disconnected') + 'Removed', {
            circle: this,
            neighbours: neighs
          });
        }
      });

      this.getConnections().forEach(function(conn) {
        conn.to({
          opacity: 0.0,
          duration: FADE_OUT_TIME
        });
      });
    },

    _pressed: function(evt) {
      evt.cancelBubble = true;

      this._animatePress();

      // this.getParent().fire('onePressed', this);
    },
    
    simulatePress: function() {
      this._pressed({});
    }

  });

  Kinetic.Util.extend(Class, Kinetic.Image);
  Kinetic.Node.addGetterSetter(Class, 'radius');
  Kinetic.Node.addGetterSetter(Class, 'score');

  return Class;
})();