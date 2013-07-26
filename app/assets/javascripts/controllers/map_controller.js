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
  }

});

module.exports = MapController;

