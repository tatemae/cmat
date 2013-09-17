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
  var Class = $$$.Class({
    _init: function(config, c1, c2) {
      config.drawFunc = this.drawFunc;
      this.node1 = c1;
      this.node2 = c2;
      config.points = [this.node1.getX(), this.node1.getY(), this.node2.getX(), this.node2.getY()];

      Kinetic.Line.call(this, config);

      this.node1.on('xChange yChange radiusChange', this.refresh.bind(this));
      this.node2.on('xChange yChange radiusChange', this.refresh.bind(this));

      if (this.node1.attrs.id !== "NodeConnector" && this.node2.attrs.id !== "NodeConnector") {
        this.node1.addConnection(this.node2,"child");
        this.node2.addConnection(this.node1,"parent");
        this.node2.addParentConnector(this);
      }
    },

    refresh: function() {
      this.setPoints([this.node1.getX(), this.node1.getY(), this.node2.getX(), this.node2.getY()]);
    },

    getNodes: function() {
      return this.attrs.nodes;
    },

    hasNode: function(wholeNode) {
      var nodes = this.getNodes();

      return nodes[0] === wholeNode.attrs.id || nodes[1] === wholeNode.attrs.id;
    }
  });

  Kinetic.Util.extend(Class, Kinetic.Line);

  return Class;
})();
