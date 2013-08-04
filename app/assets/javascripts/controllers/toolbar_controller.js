var ObjectiveBank = require('../models/objective_bank');
var MapModel = require('../models/map');

var ToolbarController = Ember.Controller.extend({

  needs: ['map', 'currentUser'],

  mapSearchQuery: null,
  objectiveBanks: null,
  isEditing: true,
  showRelationships: true,
  showNodeLabels: true,

  init: function() {
    this._super();
    this.set('objectiveBanks', App.ObjectiveBank.findAll());
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

  selectMap: function(map){
    this.transitionToRoute('map', map);
  },

  searchMaps: function(){
    var query = this.get('mapSearchQuery');
    // TODO search objectives
  }.observes('mapSearchQuery'),

  importObjectiveBank: function(objectiveBank){
    var map = App.Map.createRecord();
    map.set('title', objectiveBank.get('displayName')['text']);
    map.load_from_mc3(objectiveBank).then(function(value){
      console.log('loaded from mc3 now setup map');
      //this.get('controllers.map').set('content', map);
    }).then(function(error){
      console.log(error);
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
