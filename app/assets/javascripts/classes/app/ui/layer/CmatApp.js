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
      node.set('title', wholeNode.attrs.title);
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
      return CmatSettings.node.addObserver('state', this, 'updateSettings');
    },

    updateSettings: function() {
      var node = CmatSettings.node;
      var child = UI.cmat_app.wholeNodes.get('#'+node.get('id'))[0];
      if(!child){ return; }
      var wholeNode = child.getParent();
      if (CmatSettings.node.get('state') == "save") {
        // save those attributes
        wholeNode.attrs.title = node.get('title');
        wholeNode.label.setAttr('text', wholeNode.attrs.title);
        wholeNode.attrs.info = node.get('info');
        wholeNode.attrs.type = node.get('type');
        this.parent.draw();
      } else if ( CmatSettings.node.get('state') == "cancel" ){
        // revert those attributes
        node.set('title', wholeNode.attrs.title);
        node.set('info', wholeNode.attrs.info);
        node.set('type', wholeNode.attrs.type);
      }
    }

  });

  Kinetic.Util.extend(Class, Kinetic.Group);

  return Class;
})();