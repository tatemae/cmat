AppController = $$$.Class({
  extend: Controller,
  ctrName: 'cmat_app',
  ctrInit: function() {
    UI.cmat_app.wholeNodes.on('addPressed', this.addControlPressed.bind(this));

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
    // var asdf = UI.getStage().toJSON();
  },

  addControlPressed: function() {
    UI.layoutManager.adjustLayout();
  },

  layoutAdjusted: function() {
    this.saveLayout();
  }
});