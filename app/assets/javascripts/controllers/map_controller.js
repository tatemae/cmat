var AutoSave = require('../mixins/auto_save');

var MapController = Ember.ObjectController.extend(AutoSave, {

  needs: ['toolbar', 'node'],
  toolbar: null,
  toolbarBinding: "controllers.toolbar",
  node: null,
  nodeBinding: "controllers.node",

  bufferedFields: ['title'],
  instaSaveFields: ['payload'],

  act: function(action){
    this[action]();
  },

  duplicate: function(){
    alert('duplicating map');
  },

  destroy: function(){
    alert('destroying map');
  }

});

module.exports = MapController;
