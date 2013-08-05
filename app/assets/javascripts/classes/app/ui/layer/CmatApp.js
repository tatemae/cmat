CmatSettings = require('../../../cmat_settings');

Kinetic.CmatApp = (function() {
  var CIRCLE_AREA_TO_SCREEN_REL = 0.005;
  var LEADING_WHITE_REGEX = /^[ \t]+/;

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

    _newNode: function(e, parent) {
      var xy = UI.getPos(e);
      var node = CmatSettings.node;
      node.set('id', '');
      node.set('title', '');
      node.set('info', '');
      node.set('type', '');
      node.set('x', xy.x);
      node.set('y', xy.y);
      node.set('parent', parent);
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

    addNode: function(attrs, parent, adjustLayout) {
      var wholeNode = new Kinetic.WholeNode({
        id: attrs.id || this.attrs.nextNodeID++,
        x: attrs.x,
        y: attrs.y,
        draggable: true,
        title: attrs.title || '',
        info: attrs.info || '',
        type: attrs.type || 'outcome'
      }, this.area);

      this.wholeNodes.add(wholeNode);

      if (!Em.isNone(parent)){
        wholeNode.setY(parent.getY() + 100);
        parent.connect(wholeNode);
      }
      if (adjustLayout) {
        this.adjustLayout();
      }
      return wholeNode;
    },

    adjustLayout: function(){
      this.wholeNodes.fire('nodeAdded', this);
    },

    canvasWidth: function() {
      return this.getWidth();
    },

    canvasHeight: function() {
      return this.getHeight();
    },

    addNodes: function(nodesText){
      var nodeNames = nodesText.split('\n');

      var workspaceWidth = this.canvasWidth();
      var workspaceHeight = this.canvasHeight();

      var deltaX = nodeNames.length > 10 ? (workspaceWidth / 11) : (workspaceWidth / (nodeNames.length + 1));
      var deltaY = workspaceHeight / (Math.round(nodeNames.length/10) + 2);
      var x = deltaX;
      var y = deltaY;

      var indentGuide = 0;
      var parents = [];

      for (var i=0; i<nodeNames.length; i++) {
        var indents = 0;

        // Find the leading white space
        var match = nodeNames[i].match(LEADING_WHITE_REGEX);
        if (match) {
          // If the indentGuide hasn't been set yet, go ahead and set it
          // this will be the guide used for the rest of the node list
          if (indentGuide === 0) {
            indentGuide = match[0].length;
          }
          // Get the length of the leading whitespace
          indents = match[0].length;
        }

        var indent = 0;

        if (indentGuide > 0){
          // Find the number of indents needed
          indent = indents / indentGuide;
        }

        var title = nodeNames[i].trim();
        var attrs = {title : title, x : x, y : y};

        // check for indentation and if there is even
        // anything in the node
        if (indent > 0 && nodeNames[i].length > 0) {
          // the node has a parent, so send that parent in
          parents[indent] = this.addNode(attrs, parents[indent-1]);
        } else if (nodeNames[i].length > 0) {
          // the node does not have a parent, just create that single node
          parents[indent] = this.addNode(attrs);
        }
        x += deltaX;
        if (x > workspaceWidth) {
          var remainingNodes = nodeNames.length - i;
          if (remainingNodes < 10)
            x = (workspaceWidth - (remainingNodes-2)*deltaX) / 2;
          else
            x = deltaX;
          y += deltaY;
        }
      }
      this.adjustLayout();
    },

    addConnection: function(attrs, markerRadius, node1, node2){
      var conn = new Kinetic.Connection(attrs, markerRadius, node1, node2);
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
        }, node.get('parent'), true);
      } else {
        var child = this.wholeNodes.get('#'+node.get('id'))[0];
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

    clearMap: function() {
      this.connections.removeChildren();
      this.wholeNodes.removeChildren();
      UI.getStage().draw();
    },

    loadMap: function() {
      this.clearMap();
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
                  console.log(c.attrs);
                  this.addNode(c.attrs);
                }.bind(this));
              }
            }.bind(this));

            var markerRadius = this.getMarkerRadius();
            a.children.forEach(function(b) {
               if (b.attrs.name === 'connections') {
                b.children.forEach(function(c) {
                  var node1 = this.wholeNodes.get('#'+c.attrs.nodes[0])[0].getParent();
                  var node2 = this.wholeNodes.get('#'+c.attrs.nodes[1])[0].getParent();
                  this.addConnection(c.attrs, markerRadius, node1, node2);
                }.bind(this));
              }
            }.bind(this));
          }
        }.bind(this));
      }
      UI.getStage().draw();
    },

    toggleRelationships: function(show) {
      this.connections.setVisible(show);
      UI.getStage().draw();
    },

    toggleNodeLabels: function(show) {
      this.wholeNodes.children.forEach(function(wholeNode){
        wholeNode.title.setVisible(show);
      });
      UI.getStage().draw();
    },

    toggleEditing: function(isEditing) {
      this.wholeNodes.setAttr('listening', isEditing);
      this.pressCatcher.setAttr('visible', isEditing);
      UI.getStage().draw();
    }

  });

  Kinetic.Util.extend(Class, Kinetic.Group);

  return Class;
})();
