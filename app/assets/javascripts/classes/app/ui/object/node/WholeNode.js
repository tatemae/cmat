Kinetic.WholeNode = (function() {
  var CIRCLE_AREA_TO_SCREEN_REL = 0.005;
  var MARKER_TO_MAX_CIRCLE_REL = 0.1;
  var EXPAND_TIME = 0.2;
  var TO_NORMAL_TIME = 0.15;
  var TEXT_WIDTH = 200;

  var Class = $$$.Class({
    _init: function(config) {
      Kinetic.Group.call(this, config);

      // this.attrs.connections = [];
      // this.attrs._connections = [];
      // this.attrs.neighbors = [];
      // this.attrs.ownNeighbors = [];
      this.neighbors = {};
      this.parent_connectors = [];

      this.attrs.title = config.title || '';
      this.attrs.info = config.info || '';
      this.attrs.type = config.type || 'outcome';
      this.attrs.url = config.url || '';

      this.addNode(config);
    },

    _createMouseOverCatcher: function(){
      return new Kinetic.MouseOverCatcher({
        x: this.node.getX() - this.node.getWidth(),
        y: this.node.getY() - this.node.getHeight(),
        width: this.node.getWidth() * 2,
        height: this.node.getHeight() * 2,
        onMouseOver: this._mouseover.bind(this),
        onMouseOut: this._mouseout.bind(this),
        onDoubleClick: this._doubleClick.bind(this),
        visible: true,
        name: 'mouseOverCatcher'
      });
    },

    addNode: function(config) {

      this.add(this.node = new Kinetic.AppNode({
        id: config.id,
        x: 0,
        y: 0,
        draggable: false,
        name: 'AppNode',
        type: config.type
      }));

      this.add(this.title = new Kinetic.Label({
        x: TEXT_WIDTH / 2 * -1,
        y: this.node.getRadius(),
        text: this.attrs.title,
        fontSize: 18,
        fontFamily: "Montserret, 'Arial Narrow', sans-serif",
        fill: '#555',
        width: TEXT_WIDTH,
        padding: 10,
        align: 'center',
        name: 'Label'
      }));

      this.on('dragstart', function(){
        UI.cmat_app.node_adder.attrs.opacity = 0;
        UI.cmat_app.node_connector.hideConnection();
      });

      this.on('dragend', function(){
        this.dragEnd();
      });

      this.add(this.mouseOverCatcher = this._createMouseOverCatcher());
      this.mouseOverCatcher.moveToBottom();
      this.mouseOverCatcher.moveUp();
    },

    // getConnections: function() {
    //   return this.attrs.connections;
    // },

    // _removeConnection: function(conn) {
    //   this.attrs.connections.remove(conn);
    // },

    // getNeighbors: function() {
    //   return this.attrs.neighbors;
    // },

    // _removeNeighbor: function(node) {
    //   this.attrs.neighbors.remove(node);
    // },

    // getOwnNeighbors: function() {
    //   return this.attrs.ownNeighbors;
    // },

    addConnection: function(node,relationship) {
      this.neighbors[node.attrs.id] = relationship;
    },

    // _removeOwnNeighbor: function(node) {
    //   this._ownsConnection[node.attrs.id] = false;
    // },

    // connections: function() {
    //   return this.getConnections().length;
    // },

    numberConnections: function() {
      return Object.size(this.neighbors);
    },

    connect: function(node) {
      if (node != this && !this.ownsConnectionWith(node)) {
        var attrs = {};
        attrs.strokeStyle = '#34495E';
        attrs.lineJoin = 'round';
        attrs.lineWidth = 1;
        attrs.nodes = [ this.node.attrs.id, node.attrs.id ];
        UI.cmat_app.addConnection(attrs, UI.cmat_app.getMarkerRadius(),
          UI.cmat_app.wholeNodes.get('#'+this.node.attrs.id)[0].getParent(),
          node);
      }
    },

    addParentConnector: function(conn) {
      this.parent_connectors.push(conn);
    },

    // disconnect: function(node) {
    //   if (node != this && this.isConnected(node)) {
    //     var delConn;

    //     this.getConnections().forEach(function(conn) {
    //       if (conn.hasNode(node)) {
    //         delConn = conn;
    //       }
    //     });

    //     this._removeConnection(delConn);
    //     node._removeConnection(delConn);
    //     this._removeNeighbor(node);
    //     node._removeNeighbor(this);

    //     if (this.ownsConnectionWith(node)) {
    //       this._removeOwnNeighbor(node);
    //     } else {
    //       node._removeOwnNeighbor(this);
    //     }

    //     delConn.destroy();
    //   }
    // },

    ownsConnectionWith: function(node) {
      return this.neighbors[node.attrs.id] != null;
    },

    parentNodeIds: function() {
      var parent_ids = [];
      var _self = this;
      for (node_id in this.neighbors) {
        if (_self.neighbors[node_id] == 'parent')
          parent_ids.push(node_id);
      }
      return parent_ids;
    },

    removeNeighbor: function(id) {
      delete this.neighbors[id];
    },

    destroyParentConnections: function(){
      for (var i=0; i<this.parent_connectors.length; i++) {
        connector = this.parent_connectors[i];
        var node1 = UI.cmat_app.wholeNodeFromId(connector.attrs.nodes[0]);
        node1.removeNeighbor(connector.attrs.nodes[1]);
        var node2 = UI.cmat_app.wholeNodeFromId(connector.attrs.nodes[1]);
        node2.removeNeighbor(connector.attrs.nodes[0]);
        connector.destroy();
      }
      var _self = this;
      for (node_id in this.neighbors) {
        if (_self.neighbors[node_id] == 'parent')
          delete _self.neighbors[node_id];
      }
    },

    isConnected: function(node) {
      return this.getNeighbors().contains(node);
    },

    dragEnd: function(){
      this._animateMouseover();
      UI.cmat_app.saveMap();
    },

    _animateMouseover: function() {
      UI.cmat_app.node_adder.setX(this.getX() + this.node.getWidth() / 2);
      UI.cmat_app.node_adder.setY(this.getY() + this.node.getWidth() / 2);
      UI.cmat_app.node_adder.current_node_over = this;
      UI.cmat_app.node_connector.setX(this.getX() - this.node.getWidth() / 2);
      UI.cmat_app.node_connector.setY(this.getY() - this.node.getWidth() / 2);
      UI.cmat_app.node_connector.current_node_over = this;
      UI.cmat_app.node_connector.updateConnection();
      UI.cmat_app.node_adder.to({
        opacity: 1,
        duration: EXPAND_TIME,
        easing: 'EaseIn'
      });
      UI.cmat_app.node_connector.to({
        opacity: 1,
        duration: EXPAND_TIME,
        easing: 'EaseIn'
      });

    },

    _animateMouseout: function() {
      UI.cmat_app.node_connector.hideConnection();
      UI.cmat_app.node_adder.to({
        opacity: 0,
        duration: TO_NORMAL_TIME,
        easing: 'BackEaseOut'
      });
      UI.cmat_app.node_connector.to({
        opacity: 0,
        duration: TO_NORMAL_TIME,
        easing: 'BackEaseOut'
      });
    },

     _mouseover: function(e) {
      this._animateMouseover();
    },

    _mouseout: function(e) {
      this._animateMouseout();
    },

    _doubleClick: function(e) {
      UI.cmat_app.editNode(this);
    }

  });

  Kinetic.Util.extend(Class, Kinetic.Group);

  return Class;
})();