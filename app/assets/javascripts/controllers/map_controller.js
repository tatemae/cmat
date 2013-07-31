var MapController = Ember.ObjectController.extend({

  act: function(action){
    this[action]();
  },

  duplicate: function(){
    alert('duplicating map');
  },

  destroy: function(){
    alert('destroying map');
  },

  toolbar: function() {
    return this.controllerFor('toolbar');
  },

  node: function() {
    return this.controllerFor('node');
  }

});

module.exports = MapController;

