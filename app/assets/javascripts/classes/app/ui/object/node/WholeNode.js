Kinetic.WholeNode = (function() {

  var Class = $$$.Class({
    _init: function(config) {
      Kinetic.Group.call(this, config);
      this.CIRCLE_AREA_TO_SCREEN_REL = 0.04;
      this.addNode(config);
    },

    addNode: function(config) {
      var maxRadius = Math.floor(Math.sqrt(config.area * this.CIRCLE_AREA_TO_SCREEN_REL / Math.PI)) - 1;
      var radiusFunc = function(s, max) {
        return maxRadius * Math.sqrt(s / max);
      };

      this.add(this.node = new Kinetic.AppNode({
        id: 1,
        x: 0,
        y: 0,
        radiusFunc: radiusFunc,
        draggable: false
      }));

      this.add(this.node_adder = new Kinetic.AddNode({
        id: 1,
        x: 0 + this.node.getWidth(),
        y: 0,
        radiusFunc: radiusFunc,
        draggable: false
      }));

      this.node_adder.setY(this.node_adder.getY() - this.node_adder.getHeight() / 2);

    }

  });

  Kinetic.Util.extend(Class, Kinetic.Group);

  return Class;
})();