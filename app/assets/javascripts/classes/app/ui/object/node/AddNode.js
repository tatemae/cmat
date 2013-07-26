Kinetic.AddNode = (function() {
  var MAX_SCORE = 5;
  var EXPAND = 1.2;
  var COLLAPSE = 0.95;
  var EXPAND_TIME = 0.2;
  var COLLAPSE_TIME = 0.5;
  var TO_NORMAL_TIME = 0.15;
  var FADE_OUT_TIME = 0.3;
  var FAST_ROTATE_OUT_TIME = 0.3;
  var LONG_ROTATE_OUT_TIME = 0.6;
  var PERCENT_RADIUS = 17;

  var Class = $$$.Class({
    _init: function(config) {
      Kinetic.Image.call(this, config);

      this.on('click tap', this._pressed);
      this.on('mouseover', this._mouseover);
      this.on('mouseout', this._mouseout);
      this.on('radiusChange', this._syncRadiusWithImageSize);
      this.on('widthChange heightChange', this._syncSizeWithOffset);

      this.setRadius(this._calcRadius());
      this._updateImage();
    },

    _updateImage: function() {
      this.setImage(Image.node.node_red_add);
    },

    _syncRadiusWithImageSize: function() {
      var d = this.getRadius() * 2;

      this.setSize(d, d);
    },

    _calcRadius: function(s) {
      return this.attrs.radiusFunc(1, PERCENT_RADIUS);
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

    _pressed: function(evt) {
      evt.cancelBubble = true;

      this._animatePress();

      this.parent.parent.parent._addNode(evt, this.parent);

      // this.getParent().fire('onePressed', this);
    },

    _mouseover: function(evt) {
      this._animateMouseover();
    },

    _mouseout: function(evt) {
      this._animateMouseout();
    },
    
    simulatePress: function() {
      this._pressed({});
    }
  });

  Kinetic.Util.extend(Class, Kinetic.Image);
  Kinetic.Node.addGetterSetter(Class, 'radius');
  Kinetic.Node.addGetterSetter(Class, 'score');

  return Class;
})();