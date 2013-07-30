AppController = $$$.Class({
  extend: Controller,
  ctrName: 'cmat_app',
  ctrInit: function() {
    UI.cmat_app.wholeNodes.on('addPressed', this.addControlPressed.bind(this));
  },

  cmatApp: function() {
    UI.fading.fastFadeOut(function() {
      this.newApp();
    }.bind(this));
  },

  newApp: function() {
  },

  addControlPressed: function() {
    UI.layoutManager.adjustLayout();
  }
});