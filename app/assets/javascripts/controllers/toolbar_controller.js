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
    var currentUser = this.get('controllers.currentUser');
    if(!Ember.isNone(currentUser)){
      var user_id = currentUser.get('id');
      if(!Ember.isNone(user_id)){
        return MapModel.find({user_id: user_id});
      }
    }
    return MapModel.find({});
  }.property('controllers.currentUser', 'controllers.map.content'),

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
    var map = this.get('controllers.map').get('model');
    map.set('title', objectiveBank.get('displayName')['text']);
    map.set('objective_bank_id', objectiveBank.get('id'));
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
