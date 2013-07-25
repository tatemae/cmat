InitController = $$$.Class({
  extend: Controller,
  ctrName: 'init',
  ctrInit: function() {
    this.initUI();
    this.launch();
  },

  initUI: function() {
    UI.build();
  },

  launch: function() {
    this.ctr('cmat_app').cmatApp();
  }
});