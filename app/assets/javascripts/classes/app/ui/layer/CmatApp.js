Kinetic.CmatApp = (function() {
  var CIRCLE_AREA_TO_SCREEN_REL = 0.04;

  var Class = $$$.Class({
    _init: function(config) {
      Kinetic.Group.call(this, config);
      this.add(this.pressCatcher = this._createPressCatcher());
      this.add(this.wholeNodes = new Kinetic.Group({ listening: true }));
      // this.add(this.add_nodes = new Kinetic.Group({ listening: true }));
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
      // var node = new Kinetic.AppNode({
      //   id: 1,
      //   x: xy.x,
      //   y: xy.y,
      //   active: true,
      //   score: 3,
      //   radiusFunc: radiusFunc,
      //   draggable: true
      // });
      // this.nodes.add(node);
      // this.nodes.draw();

      var wholeNode = new Kinetic.WholeNode({
        id: 1,
        x: xy.x,
        y: xy.y,
        draggable: true,
        evt: e,
        area: this.getWidth() * this.getHeight()
      });
      // wholeNode.addNode();
      this.wholeNodes.add(wholeNode);
      // this.add_nodes.add(wholeNode.node_adder);
      // this.add_nodes.draw();
      // this.nodes.draw();

      // this.add(wholeNode);

      if (parent !== undefined){
        // parent.attrs.connections.push
        wholeNode.setY(parent.getY() + 100);
      }
      wholeNode.draw();


    }

  });

  Kinetic.Util.extend(Class, Kinetic.Group);

  return Class;
})();