Kinetic.NodeConnector = (function() {
  var EXPAND = 1.2;
  var COLLAPSE = 0.95;
  var EXPAND_TIME = 0.2;
  var COLLAPSE_TIME = 0.5;
  var TO_NORMAL_TIME = 0.15;
  var MAX_RADIUS = 10;

  var Class = $$$.Class({
    _init: function(config) {
      Kinetic.Image.call(this, config);

      this.current_node_over = null;

      this.on('dragmove', this._dragMove.bind(this));
      this.on('dragend', this._dragEnd.bind(this));
      // this.on('click tap', this._pressed);
      this.on('mouseover', this._mouseover);
      this.on('mouseout', this._mouseout);
      this.on('radiusChange', this._syncRadiusWithImageSize);
      this.on('widthChange heightChange', this._syncSizeWithOffset);

      this.setRadius(this._calcRadius());
      this._updateImage();
    },

    _updateImage: function() {
      this.setImage(Image.node.node_connector);
    },

    _syncRadiusWithImageSize: function() {
      var d = this.getRadius() * 2;

      this.setSize(d, d);
    },

    _calcRadius: function() {
      return MAX_RADIUS;
    },

    _syncSizeWithOffset: function() {
      this.setOffset(this.getWidth() / 2, this.getHeight() / 2);
    },

    _animatePress: function() {
      var tweening = this.isTweening();
      var actualRadius = this._calcRadius();
      var currRadius = this.getRadius();
      var expandRadius = !tweening ? currRadius : actualRadius;
      var normalRadius = tweening ? actualRadius : currRadius;

      this.to({
        radius: expandRadius * EXPAND,
        duration: EXPAND_TIME,
        easing: 'StrongEaseOut',
        callback: function() {
          this.to({
            radius: normalRadius * COLLAPSE,
            duration: COLLAPSE_TIME,
            easing: 'BackEaseInOut',
            callback: function() {
              this.to({
                radius: normalRadius,
                duration: TO_NORMAL_TIME,
                easing: 'BackEaseOut'
              });
            }
          });
        }
      });
    },

    _animateMouseover: function() {
      this.showConnector();
      var tweening = this.isTweening();
      var actualRadius = this._calcRadius();
      var currRadius = this.getRadius();
      var expandRadius = !tweening ? currRadius : actualRadius;

      this.to({
        radius: expandRadius * EXPAND,
        duration: EXPAND_TIME,
        easing: 'StrongEaseOut'
      });

    },

    _animateMouseout: function() {
      var actualRadius = this._calcRadius();
      var normalRadius = actualRadius;

      this.to({
        radius: normalRadius,
        duration: TO_NORMAL_TIME,
        easing: 'BackEaseOut'
      });
    },

    _pressed: function(e) {
      e.cancelBubble = true;

      this._animatePress();
    },

    _mouseover: function(e) {
      this._animateMouseover();
    },

    _mouseout: function(e) {
      this._animateMouseout();
    },

    simulatePress: function() {
      this._pressed({});
    },

    updateConnection: function() {
      if (this.node_connector_connection === undefined) {
        var attrs = {};
        attrs.stroke = 'red';
        attrs.lineJoin = 'round';
        attrs.strokeWidth = 1;
        attrs.nodes = [ this.attrs.id, this.current_node_over.attrs.id ];
        UI.cmat_app.add(this.node_connector_connection = new Kinetic.Connection(attrs, UI.cmat_app.getMarkerRadius(), this, this.current_node_over));
        this.node_connector_connection.moveDown();
        this.node_connector_connection.hide();
      }
      this.showConnector();
    },

    _dragMove: function() {
      this.showConnection();
    },

    _dragEnd: function(e) {
      var xy = {x: this.attrs.x, y: this.attrs.y};
      var new_child = UI.findIntersection(xy);
      if (new_child) {
        new_child.destroyParentConnections();
        this.current_node_over.connect(new_child);
        if(UI.cmat_app.isMapSynchronizedWithMc3()){
//          Cmat.Objective.saveParentRelationship(CmatSettings.map.get('objective_bank_id'), new_child.attrs.id, new_child.parentNodeIds());
          // bad stuff happens when you give a node more than one parent
          Cmat.Objective.saveParentRelationship(CmatSettings.map.get('objective_bank_id'), new_child.attrs.id, [this.current_node_over.attrs['id']]);
        }
      }
      this.hideConnection();
    },

    showConnector: function() {
      this.node_connector_connection.node1 = this;
      this.node_connector_connection.node2 = this.current_node_over;
      this.show();
      UI.getStage().draw();
    },

    showConnection: function() {
      this.node_connector_connection.show();
    },

    hideConnection: function() {
      this.hide();
      this.node_connector_connection.hide();
      this.node_connector_connection.attrs.nodes = [this.attrs.id, this.attrs.id];
      UI.getStage().draw();
    }
  });

  Kinetic.Util.extend(Class, Kinetic.Image);
  Kinetic.Node.addGetterSetter(Class, 'radius');
  Kinetic.Node.addGetterSetter(Class, 'score');

  return Class;
})();
