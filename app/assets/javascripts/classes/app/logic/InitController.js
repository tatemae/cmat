InitController = $$$.Class({
  extend: Controller,
  ctrName: 'init',
  ctrInit: function() {
    this.initUI({
      container: Config.settings.canvas_element,
      toolbar: Config.settings.toolbar_element
    });
    this.doSomething();
    this.doSomethingElse();
  },

  initUI: function(params) {
    UI.build(params);
  },

  doSomething: function() {
  },

  doSomethingElse: function() {
  }
});