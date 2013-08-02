var ObjectiveBank = require('../models/objective_bank');
var MapModel = require('../models/map');

var ToolbarController = Ember.Controller.extend({

  needs: ['map', 'currentUser'],

  mapSearchQuery: null,
  objectiveBanks: null,

  init: function() {
    this._super();
    //this.objectiveBanks = ObjectiveBank.find({});
  },

  userMaps: function(){
    var user_id = this.get('controllers.currentUser').get('id');
    if(user_id){
      return MapModel.find({user_id: user_id});
    } else {
      return MapModel.find({});
    }
  }.property('controllers.currentUser'),

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
    this.get('controllers.map').act(action);
  },

  searchMaps: function(){
    var query = this.get('mapSearchQuery');
    // TODO search objectives
  }.observes('mapSearchQuery'),

  importObjectiveBank: function(objectiveBank){
    // TODO Output message indicating we are importing map
    var map = Map.createRecord();
    map.set(title, objectiveBank.title);
    map.load_from_mc3().then(function(){
      this.get('controllers.map').set('content', map);
    });
  },

  map: function(){
    return this.get('controllers.map');
  }.property(),

  autoSave: function(){
    this.get('content').save();
  }.observes('isEditing', 'showRelationships', 'showRelationshipLabels', 'showNodeLabels', 'showNodeDescriptions')


});

module.exports = ToolbarController;
