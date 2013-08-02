AppController = $$$.Class({
  extend: Controller,
  ctrName: 'cmat_app',
  ctrInit: function() {
    UI.cmat_app.wholeNodes.on('nodeAdded', this.nodeAdded.bind(this));

    UI.layoutManager.onComplete(this.layoutAdjusted.bind(this));
  },

  cmatApp: function() {
    UI.fading.fastFadeOut(function() {
      this.newApp();
    }.bind(this));
  },

  newApp: function() {
  },

  saveLayout: function() {
    //
    // Save map json data here
    var map = CmatSettings.map;
    var map_model = map.get('content');
    var map_json = UI.getStage().toJSON();
    map_model.set('payload', map_json);
    map_model.save();
  },

  nodeAdded: function() {
    UI.layoutManager.adjustLayout();
  },

  layoutAdjusted: function() {
    this.saveLayout();
  }
});