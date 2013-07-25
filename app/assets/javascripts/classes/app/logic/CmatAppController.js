AppController = $$$.Class({
  extend: Controller,
  ctrName: 'cmat_app',
  ctrInit: function() {
  },

  cmatApp: function() {
    UI.fading.fastFadeOut(function() {
      this.newApp();
    }.bind(this));
  },

  newApp: function() {
  }
});