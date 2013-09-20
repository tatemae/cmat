Kinetic.MouseOverCatcher = (function() {
  var Class = $$$.Class({
    _init: function(config) {
      config.image = Image.bg.trans;

      Kinetic.Rect.call(this, config);

      this.on('mouseover', config.onMouseOver);
      this.on('mouseout', config.onMouseOut);
      this.on('dblclick dbltap', config.onDoubleClick);
    }
  });

  Kinetic.Util.extend(Class, Kinetic.Rect);

  return Class;
})();
