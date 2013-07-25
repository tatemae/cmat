Kinetic.CmatApp = (function() {
  var CIRCLE_AREA_TO_SCREEN_REL = 0.04;
  var MARKER_TO_MAX_CIRCLE_REL = 0.1;
  var FADE_TIME = 0.5;

  var Class = $$$.Class({
    _init: function(config) {
      Kinetic.Group.call(this, config);
      this.add(this.pressCatcher = this._createPressCatcher());
      this.add(this.nodes = new Kinetic.Group({ listening: true }));
    },

    _createPressCatcher: function() {
      return new Kinetic.PressCatcher({
        width: this.getWidth(),
        height: this.getHeight(),
        onPress: this._addNode.bind(this),
        visible: true
      });
    },

    _addNode: function(e) {
      var area = this.getWidth() * this.getHeight();
      var maxRadius = Math.floor(Math.sqrt(area * CIRCLE_AREA_TO_SCREEN_REL / Math.PI)) - 1;
      var radiusFunc = function(s, max) {
        return maxRadius * Math.sqrt(s / max);
      };
      var xy = UI.getPos(e);
      var node = new Kinetic.AppNode({
        id: 1,
        x: xy.x,
        y: xy.y,
        active: true,
        score: 3,
        radiusFunc: radiusFunc,
        draggable: true
      });
      this.nodes.add(node);
      this.nodes.draw();
    }

  });

  Kinetic.Util.extend(Class, Kinetic.Group);

  return Class;
})();