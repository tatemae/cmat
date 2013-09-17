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
      node.set('url', '');
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
      node.set('url', wholeNode.attrs.url);
      node.set('state', 'edit');
    },

    mc3_type: {
     "topic": "mc3-objective%3Amc3.learning.topic%40MIT-OEIT",
     "outcome": "mc3-objective%3Amc3.learning.outcome%40MIT-OEIT",
     "activity": "mc3-activity%3Amc3.learning.activity.asset.based%40MIT-OEIT",
     "asset - url": "mc3-asset%3Amc3.learning.asset.url%40MIT-OEIT",
     "asset - unknown": "mc3-asset%3Amc3.learning.asset.url%40MIT-OEIT"
    },

    cmat_type: {
      "mc3-objective%3Amc3.learning.topic%40MIT-OEIT": "topic",
      "mc3-objective%3Amc3.learning.outcome%40MIT-OEIT": "outcome",
      "mc3-activity%3Amc3.learning.activity.asset.based%40MIT-OEIT": "activity",
      "mc3-asset%3Amc3.learning.asset.url%40MIT-OEIT": "asset - url",
      "mc3-asset-content%3Amc3.learning.asset.content.unknown%40MIT-OEIT": "asset - unknown"
    },

    cmat_to_mc3: function(attrs, objectiveBankId, objectiveId) {
      var mc3_node = {
        displayName:{
          text: attrs.title || ''
        },
        description: {
          text: attrs.description || ''
        },
        genusTypeId: this.mc3_type[attrs.type] || 'mc3-objective%3Amc3.learning.outcome%40MIT-OEIT',
        objectiveBankId: objectiveBankId
      };
      if (attrs.type == 'activity' && objectiveId) {
        mc3_node['objectiveId'] = objectiveId;
      }
      if (attrs.type == 'asset - url' || attrs.type == 'asset - unknown') {
        var clone = jQuery.extend({}, mc3_node);
        clone['url'] = attrs.url;
        clone['genusTypeId'] = 'mc3-asset-content%3Amc3.learning.asset.content.unknown%40MIT-OEIT';
        mc3_node['assetContents'] = [clone];
      }
      return mc3_node;
    },

    addNode: function(attrs, parent, adjustLayout) {
      var wholeNode = new Kinetic.WholeNode({
        id: attrs.id || this.attrs.nextNodeID++,
        x: attrs.x,
        y: attrs.y,
        draggable: true,
        title: attrs.title || '',
        info: attrs.info || '',
        type: attrs.type || 'topic',
        url: attrs.url || ''
      });

      this.wholeNodes.add(wholeNode);

      if (!Em.isNone(parent)){
        wholeNode.setY(parent.getY() + 100);
        parent.connect(wholeNode);
      }

      if(this.isMapSynchronizedWithMc3()){
        var node_model_types = {
          'topic' : Cmat.Objective, 'outcome' : Cmat.Objective, 'activity' : Cmat.Activity, 'asset - url' : Cmat.Asset, 'asset - unknown' : Cmat.Asset
        };
        var node_model = node_model_types[attrs.type];
        if (node_model && Em.isNone(attrs.id)) {
          var parent_id = Em.isNone(parent) ? null : parent.attrs.id;
          var mc3_node = this.cmat_to_mc3(attrs, CmatSettings.map.get('objective_bank_id'), parent_id);
          _self = this;
          node_model.saveNew(mc3_node, parent).then(function(node){
            wholeNode.attrs.id = node['id'];
            if(parent_id && (attrs.type === 'topic' || attrs.type === 'outcome') ){
               node_model.saveParentRelationship(CmatSettings.map.get('objective_bank_id'), node['id'], [parent_id]);
            }
            if(parent_id && (attrs.type == 'asset - url' || attrs.type == 'asset - unknown'))
            {
              //TODO: prevent assets being added to outcome or topic nodes
              var activity_node = _self.cmat_to_mc3(parent.attrs, CmatSettings.map.get('objective_bank_id'));
              if(activity_node['assetIds'])
              {
                activity_node['assetIds'] = activity_node['assetIds'].concat([node['id']]);
              }
              else
              {
                activity_node['assetIds'] = [node['id']];
              }
              activity_node['id'] = parent.attrs.id;
              Cmat.Activity.saveChanges(activity_node);
            }
            this.saveMap();
          }.bind(this));
        }
      }

      if (adjustLayout) {
        this.adjustLayout();
      }
      return wholeNode;
    },

    isMapSynchronizedWithMc3: function(){
      return !Em.isEmpty(CmatSettings.map.get('objective_bank_id'));
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
        var type = values.length > 1 ? values[1].trim() : 'outcome';
        var info = values.length > 2 ? values[2].trim() : '';
        var id = values.length > 3 ? values[3].trim() : null;

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
      if (children.length === 0) return;

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
      var wholeNode;
      // wholeNode = this.wholeNodes.get("#"+ id)[0]; // Wish this would work in all cases. But it won't work on a newly added node on a map loaded from MC3 for some reason.
      $.each(this.wholeNodes.children, function(index, node){
        if (node.attrs.id === id){
          wholeNode = node;
          return false;
        }
      });

      return wholeNode;
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
      return [width, height];
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
      var conn = new Kinetic.Connection(attrs, node1, node2);
      this.connections.add(conn);
      this.saveMap();
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
        return this.addNode({
          x: node.get('x'),
          y: node.get('y'),
          title: node.get('title'),
          info: node.get('info'),
          type: node.get('type'),
          url: node.get('url')
        }, node.get('parent'), true);
      } else { // updating settings for a node
        var wholeNode = this.wholeNodeFromId(node.get('id'));
        if(!wholeNode){ return; }
        if (CmatSettings.node.get('state') == "save") {
          // save those attributes
          wholeNode.attrs.title = node.get('title');
          wholeNode.title.setAttr('text', wholeNode.attrs.title);
          wholeNode.attrs.info = node.get('info');
          wholeNode.attrs.type = node.get('type');
          wholeNode.attrs.url = node.get('url');
          wholeNode.node.attrs.type = node.get('type');
          wholeNode.node._updateImage();
          var node_model_types = {
            'topic' : Cmat.Objective, 'outcome' : Cmat.Objective, 'activity' : Cmat.Activity, 'asset - url' : Cmat.Asset, 'asset - unknown' : Cmat.Asset
          };
          if((!Em.isEmpty(CmatSettings.map.get('objective_bank_id')))) {
            var cmat_node = this.cmat_to_mc3(wholeNode.attrs, CmatSettings.map.get('objective_bank_id'));
            cmat_node['id'] = wholeNode.attrs.id;
            var node_model = node_model_types[wholeNode.attrs.type];
            node_model.saveChanges(cmat_node);
          }
          this.parent.draw();
          this.saveMap();
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
      var query;
      for (var i = 0; i < this.connections.children.length; i++) {
        if (this.connections.children[i].hasNode(wholeNode)) {
          this.connections.children[i].destroy();
          i--; // the array is now one shorter, gotta go back one
        }
      }
      wholeNode.destroy();

      var node_model_types = {
        'topic' : Cmat.Objective, 'outcome' : Cmat.Objective, 'activity' : Cmat.Activity, 'asset - url' : Cmat.Asset, 'asset - unknown' : Cmat.Asset
      };
      if((!Em.isEmpty(CmatSettings.map.get('objective_bank_id')))) {
        if(wholeNode.attrs.type === 'topic' || wholeNode.attrs.type === 'outcome'){
          query = {objectiveBankId: CmatSettings.map.get('objective_bank_id'), objectiveId: wholeNode.attrs.id};
          Cmat.Objective.deleteNode(query);
        }
        else
        {
          var node_model = node_model_types[wholeNode.attrs.type];
          query = {objectiveBankId: CmatSettings.map.get('objective_bank_id'), id: wholeNode.attrs.id};
          node_model.deleteNode(query);
        }
      }
      this.parent.draw();
      this.saveMap();
    },

    saveMap: function() {
      var map = CmatSettings.map;
      var map_model = map.get('content');
      var map_json = UI.getStage().toJSON();
      map_model.set('payload', map_json);
      map_model.save();
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
                  var node1 = this.wholeNodeFromId(c.attrs.nodes[0]);
                  var node2 = this.wholeNodeFromId(c.attrs.nodes[1]);
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
