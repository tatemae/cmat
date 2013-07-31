Kinetic.WholeNode = (function() {
  var CIRCLE_AREA_TO_SCREEN_REL = 0.005;
  var MARKER_TO_MAX_CIRCLE_REL = 0.1;
  var EXPAND_TIME = 0.2;
  var TO_NORMAL_TIME = 0.15;

  var Class = $$$.Class({
    _init: function(config, area) {
      Kinetic.Group.call(this, config);

      this.attrs.connections = [];
      this.attrs._connections = [];
      this.attrs.neighbours = [];
      this.attrs.ownNeighbours = [];
      this._ownsConnection = {};

      this.addNode(config, area);
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
        visible: true
      });
    },

    addNode: function(config, area) {
      var maxRadius = Math.floor(Math.sqrt(area * CIRCLE_AREA_TO_SCREEN_REL / Math.PI)) - 1;
      var radiusFunc = function(s, max) {
        return maxRadius * Math.sqrt(s / max);
      };

      this.add(this.node = new Kinetic.AppNode({
        id: config.id,
        x: 0,
        y: 0,
        radiusFunc: radiusFunc,
        draggable: false
      }));

      this.add(this.node_adder = new Kinetic.AddNode({
        x: 0 + this.node.getWidth(),
        y: 0,
        radiusFunc: radiusFunc,
        draggable: false,
        opacity: 0
      }));

      this.add(this.label = new Kinetic.Label({
        x: -190,
        y: this.node.getRadius(),
        text: 'bfcoder FTW',
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: '#555',
        width: 380,
        padding: 10,
        align: 'center'
      }));

      this.node_adder.setY(this.node_adder.getY() - this.node_adder.getHeight() / 2 - 15);
      this.node_adder.setX(this.node_adder.getX() - 15);
      this.add(this.mouseOverCatcher = this._createMouseOverCatcher());
      this.mouseOverCatcher.moveToBottom();
      this.mouseOverCatcher.moveUp();
    },

    getConnections: function() {
      return this.attrs.connections;
    },

    _removeConnection: function(conn) {
      this.attrs.connections.remove(conn);
    },

    getNeighbours: function() {
      return this.attrs.neighbours;
    },

    _removeNeighbour: function(node) {
      this.attrs.neighbours.remove(node);
    },

    getOwnNeighbours: function() {
      return this.attrs.ownNeighbours;
    },

    _addOwnNeighbour: function(node) {
      this.attrs.ownNeighbours.add(node);
      this._ownsConnection[node._id] = true;
    },

    _removeOwnNeighbour: function(node) {
      this.attrs.ownNeighbours.remove(node);
      this._ownsConnection[node._id] = false;
    },

    connections: function() {
      return this.getConnections().length;
    },

    connect: function(node) {
      if (node != this && !this.isConnected(node)) {
        var attrs = {};
        attrs.strokeStyle = '#34495E';
        attrs.lineJoin = 'round';
        attrs.lineWidth = 1;
        attrs.nodes = [ this.node.attrs.id, node.attrs.id ];
        var conn = new Kinetic.Connection(attrs, this.parent.parent.getMarkerRadius());

        this.parent.parent.makeConnection(conn);

      }
    },

    disconnect: function(node) {
      if (node != this && this.isConnected(node)) {
        var delConn;

        this.getConnections().forEach(function(conn) {
          if (conn.hasNode(node)) {
            delConn = conn;
          }
        });

        this._removeConnection(delConn);
        node._removeConnection(delConn);
        this._removeNeighbour(node);
        node._removeNeighbour(this);

        if (this.ownsConnectionWith(node)) {
          this._removeOwnNeighbour(node);
        } else {
          node._removeOwnNeighbour(this);
        }

        delConn.destroy();
      }
    },

    ownsConnectionWith: function(c) {
      return this._ownsConnection[c._id];
    },

    isConnected: function(c) {
      return this.getNeighbours().contains(c);
    },

    _animateMouseover: function() {

      this.node_adder.to({
        opacity: 1,
        duration: EXPAND_TIME,
        easing: 'EaseIn'
      });

    },

    _animateMouseout: function() {

      this.node_adder.to({
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
      var r2d=2;
    }

  });

  Kinetic.Util.extend(Class, Kinetic.Group);

  return Class;
})();