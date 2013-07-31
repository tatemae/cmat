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
      this.observeSettings();
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

      this.wholeNodes.add(wholeNode);

      if (parent !== undefined){
        wholeNode.setY(parent.getY() + 100);
        parent.connect(wholeNode);
      }
      wholeNode.draw();

    },

    editNode: function(wholeNode){
      var node = CmatSettings.node;
      node.set('id', wholeNode.attrs.id);
      node.set('name', wholeNode.attrs.name);
      node.set('info', wholeNode.attrs.info);
      node.set('type', wholeNode.attrs.type);
      node.set('state', 'edit');
    },

    makeConnection: function(conn) {
      this.connections.add(conn);
    },

    getMarkerRadius: function() {
      return this.maxRadius;
    },

    observeSettings: function() {
      return function () {
        if (CmatSettings.node.get('state') == "save") {
          // save those attributes
          var node = CmatSettings.node;
          wholeNode = UI.cmat_app.wholeNodes.get('#'+node.get('id'))[0].getParent();
          wholeNode.attrs.name = node.get('name');
          wholeNode.attrs.info = node.get('info');
          wholeNode.attrs.type = node.get('type');
        } else if ( CmatSettings.node.get('state') == "cancel" ){
          // revert those attributes
          var node = CmatSettings.node;
          UI.cmat_app.wholeNodes.get('#'+node.get('id'))[0].getParent();
          node.set('name', wholeNode.attrs.name);
          node.set('info', wholeNode.attrs.info);
          node.set('type', wholeNode.attrs.type);
        }
      }.observes(CmatSettings.node.get('state'));
    }

  });

  Kinetic.Util.extend(Class, Kinetic.Group);

  return Class;
})();