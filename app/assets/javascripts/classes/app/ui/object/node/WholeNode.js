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
      // this.attrs.neighbours = [];
      // this.attrs.ownNeighbours = [];
      this._ownsConnection = {};

      this.attrs.title = config.title || '';
      this.attrs.info = config.info || '';
      this.attrs.type = config.type || 'outcome';

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
        this._animateMouseover();
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

    // getNeighbours: function() {
    //   return this.attrs.neighbours;
    // },

    // _removeNeighbour: function(node) {
    //   this.attrs.neighbours.remove(node);
    // },

    // getOwnNeighbours: function() {
    //   return this.attrs.ownNeighbours;
    // },

    _addOwnNeighbour: function(node) {
      this._ownsConnection[node.attrs.id] = true;
    },

    _removeOwnNeighbour: function(node) {
      this._ownsConnection[node.attrs.id] = false;
    },

    // connections: function() {
    //   return this.getConnections().length;
    // },

    numberConnections: function() {
      return Object.size(this._ownsConnection);
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
    //     this._removeNeighbour(node);
    //     node._removeNeighbour(this);

    //     if (this.ownsConnectionWith(node)) {
    //       this._removeOwnNeighbour(node);
    //     } else {
    //       node._removeOwnNeighbour(this);
    //     }

    //     delConn.destroy();
    //   }
    // },

    ownsConnectionWith: function(node) {
      return this._ownsConnection[node.attrs.id];
    },

    isConnected: function(node) {
      return this.getNeighbours().contains(node);
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