var ToolbarController = Ember.Controller.extend({

  map: null,
  needs: "map",
  mapBinding: "controllers.map",
  mapSearchQuery: null,
  mapSearchResults: null,

  addToMap: function(){
    this.transitionToRoute('map.add');
  },

  newMap: function(){
    this.transitionToRoute('maps');
  },

  selectMap: function(map){
    this.transitionToRoute('map', map);
  },

  // Proxy toolbar actions to the map controller
  mapAct: function(action){
    this.map.act(action);
  },

  searchMaps: function(){
    var query = this.get('mapSearchQuery');
    this.set('mapSearchResults', [{title: 'one'}, {title: 'two'}]);
  }.observes('mapSearchQuery'),

  importMap: function(map){
    console.log('Importing map:' + map.title);
  },

  changeTitle: function(){
    console.log('The title changed to:' + this.get('title'));
  }.observes('title')

});

module.exports = ToolbarController;
