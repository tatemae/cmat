var MapController = Ember.ObjectController.extend({

  needs: ['toolbar', 'node'],
  toolbar: null,
  toolbarBinding: "controllers.toolbar",
  node: null,
  nodeBinding: "controllers.node",

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

