var ToolbarController = Ember.Controller.extend({

  map: null,
  needs: "map",
  mapBinding: "controllers.map",

  addToMap: function(){
    this.transitionToRoute('map.add');
  },

  newMap: function(){
    this.transitionToRoute('maps');
  },

  // Proxy toolbar actions to the map controller
  mapAct: function(action){
    this.map.act(action);
  }

});

module.exports = ToolbarController;
