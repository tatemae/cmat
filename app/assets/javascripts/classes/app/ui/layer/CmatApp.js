Kinetic.CmatApp = (function() {
  var CIRCLE_AREA_TO_SCREEN_REL = 0.04;

  var Class = $$$.Class({
    _init: function(config) {
      Kinetic.Group.call(this, config);
      this.add(this.pressCatcher = this._createPressCatcher());
      this.add(this.wholeNodes = new Kinetic.Group({ listening: true }));
      this.add(this.connections = new Kinetic.Group({ listening: false }));
      this.attrs.nextNodeID = 1;
    },

    _createPressCatcher: function() {
      return new Kinetic.PressCatcher({
        width: this.getWidth(),
        height: this.getHeight(),
        onPress: this._addNode.bind(this),
        visible: true
      });
    },

    _addNode: function(e, parent) {
      var xy = UI.getPos(e);

      this.area = this.getWidth() * this.getHeight();

      var wholeNode = new Kinetic.WholeNode({
        id: this.attrs.nextNodeID++,
        x: xy.x,
        y: xy.y,
        draggable: true
      }, this.area);
      wholeNode.attachConnections(this.connections, this.area);
      this.wholeNodes.add(wholeNode);

      if (parent !== undefined){
        wholeNode.setY(parent.getY() + 100);
        parent.connect(wholeNode);
      }
      wholeNode.draw();

      // var asdf = this.toJSON();


    }

  });

  Kinetic.Util.extend(Class, Kinetic.Group);

  return Class;
})();