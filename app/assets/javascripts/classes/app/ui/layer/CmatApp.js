CmatSettings = require('../../../cmat_settings');

Kinetic.CmatApp = (function() {
  var CIRCLE_AREA_TO_SCREEN_REL = 0.005;

  var Class = $$$.Class({
    _init: function(config) {
      Kinetic.Group.call(this, config);
      this.add(this.pressCatcher = this._createPressCatcher());
      this.add(this.wholeNodes = new Kinetic.Group({ listening: true }));
      this.add(this.connections = new Kinetic.Group({ listening: false }));
      this.connections.moveToBottom();
      this.attrs.nextNodeID = 1;
      this.rescaleWorkspace();
    },

    _createPressCatcher: function() {
      return new Kinetic.PressCatcher({
        width: this.getWidth(),
        height: this.getHeight(),
        onPress: this._addNode.bind(this),
        visible: true
      });
    },

    rescaleWorkspace: function() {
      this.area = this.getWidth() * this.getHeight();
      this.maxRadius = Math.floor(Math.sqrt(this.area * CIRCLE_AREA_TO_SCREEN_REL / Math.PI)) - 1;
    },

    _addNode: function(e, parent) {
      var xy = UI.getPos(e);

      var wholeNode = new Kinetic.WholeNode({
        id: this.attrs.nextNodeID++,
        x: xy.x,
        y: xy.y,
        draggable: true
      }, this.area);
      // wholeNode.attachConnections(this.connections, this.area);
      this.wholeNodes.add(wholeNode);

      if (parent !== undefined){
        wholeNode.setY(parent.getY() + 100);
        parent.connect(wholeNode);
      }
      wholeNode.draw();

      // var asdf = this.toJSON();


    },

    editNode: function(node){
      var node = CmatSettings.node;
      node.set('name', node.name);
      node.set('state', 'edit');
    },

    makeConnection: function(conn) {
      this.connections.add(conn);

      // this.node.attrs.connection = {
      //   parent: connections,
      //   markerRadius: maxRadius * MARKER_TO_MAX_CIRCLE_REL
      // }
    },

    getMarkerRadius: function() {
      return this.maxRadius;
    }

  });

  Kinetic.Util.extend(Class, Kinetic.Group);

  return Class;
})();