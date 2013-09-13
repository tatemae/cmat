Kinetic.CmatApp = (function() {
  var CIRCLE_AREA_TO_SCREEN_REL = 0.005;
  var LEADING_WHITE_REGEX = /^[ \t]+/;

  var Class = $$$.Class({
    _init: function(config) {
      Kinetic.Group.call(this, config);
      this.add(this.pressCatcher = this._createPressCatcher());
      this.add(this.wholeNodes = new Kinetic.Group({ name: 'wholeNodes', listening: true }));
      this.add(this.connections = new Kinetic.Group({ name: 'connections', listening: false }));
      this.add(this.node_adder = new Kinetic.NodeAdder({ draggable: false, opacity: 0, name: 'NodeAdder' }));
      this.add(this.node_connector = new Kinetic.NodeConnector({ id: 'NodeConnector', draggable: true, opacity: 0, name: 'NodeConnector' }));

      this.connections.moveToBottom();
      this.attrs.nextNodeID = 1;
      this.rescaleWorkspace();
      this.observeSettings();
      this.loadKineticMap();
      CmatSettings.map.addObserver('content', this, 'loadKineticMap');
    },

    _createPressCatcher: function() {
      return new Kinetic.PressCatcher({
        x: UI.layerX(),
        y: UI.layerY(),
        width: UI.layerWidth(),
        height: UI.layerHeight(),
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
      this.node_adder.attrs.opacity = 0;
      var xy = UI.getPos(e);
      xy.x = xy.x / UI.canvasScale();
      xy.y = xy.y / UI.canvasScale();
      xy.x = xy.x + UI.getStage().getOffset().x;
      xy.y = xy.y + UI.getStage().getOffset().y;
      xy.x = xy.x + UI.offsetX();
      xy.y = xy.y + UI.offsetY();
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

    mc3_type: {
     "topic": "mc3-objective%3Amc3.learning.topic%40MIT-OEIT",
     "outcome": "mc3-objective%3Amc3.learning.outcome%40MIT-OEIT",
     "activity": "mc3-activity%3Amc3.learning.activity.asset.based%40MIT-OEIT"
    },

    cmat_type: {
      "mc3-objective%3Amc3.learning.topic%40MIT-OEIT": "topic",
      "mc3-objective%3Amc3.learning.outcome%40MIT-OEIT": "outcome",
      "mc3-activity%3Amc3.learning.activity.asset.based%40MIT-OEIT": "activity"
    },

    cmat_to_mc3: function(title, description, type, objectiveBankId) {
      return {
        displayName:{
          text: title || ''
        },
        description: {
          text: description || ''
        },
        genusTypeId: this.mc3_type[type] || 'mc3-objective%3Amc3.learning.outcome%40MIT-OEIT',
        objectiveBankId: objectiveBankId
      };
    },

    addNode: function(attrs, parent, adjustLayout) {
      var wholeNode = new Kinetic.WholeNode({
        id: attrs.id || this.attrs.nextNodeID++,
        x: attrs.x,
        y: attrs.y,
        draggable: true,
        title: attrs.title || '',
        info: attrs.info || '',
        type: attrs.type || 'topic'
      });

      this.wholeNodes.add(wholeNode);

      if (!Em.isNone(parent)){
        wholeNode.setY(parent.getY() + 100);
        parent.connect(wholeNode);
      }

      if(!Em.isEmpty(CmatSettings.map.get('objective_bank_id'))){
        if(Em.isNone(attrs.id)) {
          var cmat_node = this.cmat_to_mc3(attrs.title, attrs.info, attrs.type, CmatSettings.map.get('objective_bank_id'));
          Cmat.Objective.saveNew(cmat_node, parent).then(function(node){
            wholeNode.id = node['id'];
            wholeNode.attrs.id = node['id'];
            if(!Em.isNone(parent)){
               Cmat.Objective.saveParentRelationship(CmatSettings.map.get('objective_bank_id'), node['id'], [parent.attrs.id]);
            }
          });
        }
      }

      if (adjustLayout) {
        this.adjustLayout();
      }
      return wholeNode;
    },

    adjustLayout: function(){
      this.wholeNodes.fire('nodeAdded', this);
    },

    visibleWidth: function() {
      return this.getWidth();
    },

    visibleHeight: function() {
      return this.getHeight();
    },

    addNodes: function(nodes){
      var nodes_array = typeof nodes == "string" ? nodes.split('\n') : nodes;

      var workspaceWidth = this.visibleWidth();
      var workspaceHeight = this.visibleHeight();

      var deltaX = nodes_array.length > 10 ? (workspaceWidth / 11) : (workspaceWidth / (nodes_array.length + 1));
      var deltaY = workspaceHeight / (Math.round(nodes_array.length/10) + 2);
      var x = deltaX;
      var y = deltaY;

      var indentGuide = 0;
      var parents = [];

      for (var i=0; i<nodes_array.length; i++) {
        var indents = 0;

        // Find the leading white space
        var match = nodes_array[i].match(LEADING_WHITE_REGEX);
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

        var values = nodes_array[i].split('|');
        var title = values[0].trim();
        var type = values[1].trim();
        var info = values[2].trim();
        var id = values[3].trim();

        x += deltaX;
        if (x > workspaceWidth) {
          var remainingNodes = nodes_array.length - i;
          if (remainingNodes < 10)
            x = (workspaceWidth - (remainingNodes-2)*deltaX) / 2;
          else
            x = deltaX;
          y += deltaY;
        }

        var attrs = {title : title, x : x, y : y, type: type, info: info, id: id };

        // check for indentation and if there is even
        // anything in the node
        if (indent > 0 && nodes_array[i].length > 0) {
          // the node has a parent, so send that parent in
          parents[indent] = this.addNode(attrs, parents[indent-1]);
        } else if (nodes_array[i].length > 0) {
          // the node does not have a parent, just create that single node
          parents[indent] = this.addNode(attrs);
        }
      }
      this.adjustLayout();
    },

    addNodesTree: function(children){

      // add a bogus first node so we have a single parent
      var visibleWidth = this.visibleWidth();
      var visibleHeight = this.visibleHeight();
      var root = {children: children, x0: visibleWidth / 2, y0: visibleHeight / 2, id: 'root'};

      var dim = this.calcMapSize(root);
      var d3tree = d3.layout.tree().size(dim);
      var nodes = d3tree.nodes(root);
      root = nodes[0];

      var offset_x = root.x - visibleWidth/2; // center the tree
      var offset_y = nodes[1].y - visibleHeight/2 + 100; // move nodes up the difference between the parent and first nodes

      // var node = root;
      // this.addNode({title : 'root', 
      //                 x : node.x-offset_x, 
      //                 y : node.y-offset_y, 
      //                 type: 'topic', 
      //                 info: null,
      //                 id: node.id });

      // d3 returns all nodes as a flat array, loop through and add them to the canvas
      for (var i=1; i<nodes.length; i++) {
        var node = nodes[i];
        var attrs = {title : node['displayName']['text'], 
                      x : node.x-offset_x, 
                      y : node.y-offset_y, 
                      type: this.cmat_type[node['genusTypeId']], 
                      info: node['description'].text, 
                      id: node.id };
        this.addNode(attrs, this.wholeNodeFromId(node.parent.id));
      }

      UI.getStage().draw();
    },

    wholeNodeFromId: function(id){
      var result = this.wholeNodes.get("#"+ id)[0];
      return result ? result.parent : null;
    },

    calcMapSize: function(tree) {
      // each row counts the number of columns in it
      var rows = [0];
      this.countChildren(tree.children, rows, 0);

      // see what the max number of columns any of the rows have
      var max_cols = 0;
      for(var i = 0; i < rows.length; i++) {
        if(rows[i] > max_cols) {
          max_cols = rows[i];
        }
      }
      var node_height = 400;
      var node_width = 300;
      var width = this.visibleWidth() > (node_width*(max_cols+1)) ? this.visibleWidth() : (node_width*(max_cols+1));
      var height = this.visibleHeight() > node_height*(rows.length+1) ? this.visibleHeight() : node_height*(rows.length+1);
      return [width, height]
    },

    countChildren: function(nodes, rows, depth){
      if( depth >= rows.length ){
        rows[depth] = nodes.length;
      } else {
        rows[depth] = rows[depth]+nodes.length;
      }
      // recurse down into the children's children
      for(var i = 0; i < nodes.length; i++) {
        if(nodes[i].children){
          this.countChildren(nodes[i].children, rows, depth+1);
        }
      }
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
          wholeNode.title.setAttr('text', wholeNode.attrs.title);
          wholeNode.attrs.info = node.get('info');
          wholeNode.attrs.type = node.get('type');
          wholeNode.node.attrs.type = node.get('type');
          wholeNode.node._updateImage();
          if((!Em.isEmpty(CmatSettings.map.get('objective_bank_id')))) {
            var cmat_node = this.cmat_to_mc3(wholeNode.attrs.title, wholeNode.attrs.info, wholeNode.attrs.type, CmatSettings.map.get('objective_bank_id'));
            cmat_node['id'] = wholeNode.attrs.id
            Cmat.Objective.saveChanges(cmat_node).then(function(node){});
          }
          console.log('type: ' + node.get('type'));
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
      var query = {objectiveBankId: CmatSettings.map.get('objective_bank_id'), objectiveId: wholeNode.attrs.id};
      Cmat.Objective.deleteNode(query);
      this.parent.draw();
    },

    cleanUp: function() {
      CmatSettings.node.removeObserver('state', this, 'updateSettings');
    },

    clearMap: function() {
      this.connections.removeChildren();
      this.wholeNodes.removeChildren();
      UI.resetStage();
    },

    loadKineticMap: function() {
      this.clearMap();
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
