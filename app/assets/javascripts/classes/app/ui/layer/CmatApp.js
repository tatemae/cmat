CmatSettings = require('../../../cmat_settings');

Kinetic.CmatApp = (function() {
  var CIRCLE_AREA_TO_SCREEN_REL = 0.005;

  var Class = $$$.Class({
    _init: function(config) {
      Kinetic.Group.call(this, config);
      this.add(this.pressCatcher = this._createPressCatcher());
      this.add(this.wholeNodes = new Kinetic.Group({ name: 'wholeNodes', listening: true }));
      this.add(this.connections = new Kinetic.Group({ name: 'connections', listening: false }));
      this.connections.moveToBottom();
      this.attrs.nextNodeID = 1;
      this.rescaleWorkspace();
      this.observeSettings();
      this.loadMap();
      CmatSettings.map.addObserver('content', this, 'loadMap');
    },

    _createPressCatcher: function() {
      return new Kinetic.PressCatcher({
        width: this.getWidth(),
        height: this.getHeight(),
        onPress: this._newNode.bind(this),
        visible: true,
        name: 'pressCatcher'
      });
    },

    rescaleWorkspace: function() {
      this.area = this.getWidth() * this.getHeight();
      this.maxRadius = Math.floor(Math.sqrt(this.area * CIRCLE_AREA_TO_SCREEN_REL / Math.PI)) - 1;
    },

    _newNode: function(e) {
      var xy = UI.getPos(e);
      var node = CmatSettings.node;
      node.set('id', '');
      node.set('title', '');
      node.set('info', '');
      node.set('type', '');
      node.set('x', xy.x);
      node.set('y', xy.y);
      node.set('state', 'new');
    },

    editNode: function(wholeNode){
      var node = CmatSettings.node;
      node.set('id', wholeNode.attrs.id);
      node.set('title', wholeNode.attrs.title);
      node.set('info', wholeNode.attrs.info);
      node.set('type', wholeNode.attrs.type);
      node.set('state', 'edit');
    },

    _addNode: function(e, parent) {
      var xy = UI.getPos(e);
      this.addNode(xy, parent);
    },

    addNode: function(args, parent) {
      var wholeNode = new Kinetic.WholeNode({
        id: this.attrs.nextNodeID++,
        x: args.x,
        y: args.y,
        draggable: true,
        title: args.title || '',
        info: args.info || '',
        type: args.type || ''
      }, this.area);

      this.wholeNodes.add(wholeNode);

      if (parent !== undefined){
        wholeNode.setY(parent.getY() + 100);
        parent.connect(wholeNode);
      }
      wholeNode.draw();
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
      if (node.get('state') === 'add') {
        this.addNode({
          x: node.get('x'),
          y: node.get('y'),
          title: node.get('title'),
          info: node.get('info'),
          type: node.get('type')
        });
      } else {
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
        } else if (node.get('state') === 'destroy') {
          this.deleteNode(wholeNode);
        }
      }
    },

    deleteNode: function(wholeNode) {
      for (var i = 0; i < this.connections.children.length; i++) {
        if (this.connections.children[i].hasNode(wholeNode)) {
          this.connections.children[i].destroy();
          i--; // the array is now one shorter, gotta go back one
        }
      }
      wholeNode.destroy();
      this.parent.draw();
    },

    loadMap: function() {
      if(CmatSettings.map.get('isMc3')) {
        this.loadMc3Map();
      } else {
        this.loadKineticMap();
      }
    },

    loadMc3Map: function() {
      var source = CmatSettings.map.get('mc3Source');
      // TODO parse the mc3 source and add nodes
    },

    loadKineticMap: function() {
      var map = JSON.parse(CmatSettings.map.get('payload'));
      if (map !== null){
        map.children[0].children.forEach(function(a) {
          if (a.attrs.name === 'CmatApp') {
            this.attrs.nextNodeID = a.attrs.nextNodeID;

            a.children.forEach(function(b) {
              if (b.attrs.name === 'wholeNodes') {
                b.children.forEach(function(c){
                  var wholeNode = new Kinetic.WholeNode(c.attrs, this.area);
                  this.wholeNodes.add(wholeNode);
                }.bind(this));
              }
            }.bind(this));

            a.children.forEach(function(b) {
               if (b.attrs.name === 'connections') {
                b.children.forEach(function(c) {
                  var conn = new Kinetic.Connection(c.attrs, this.getMarkerRadius(), this.wholeNodes.get('#'+c.attrs.nodes[0])[0].getParent(), this.wholeNodes.get('#'+c.attrs.nodes[1])[0].getParent());
                  this.makeConnection(conn);
                }.bind(this));
              }
            }.bind(this));
          }
        }.bind(this));
      }

    }

  });

  Kinetic.Util.extend(Class, Kinetic.Group);

  return Class;
})();