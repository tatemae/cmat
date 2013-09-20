Cmat.ToolbarController = Ember.Controller.extend({

  needs: ['map', 'current_user'],

  mapSearchQuery: null,
  objectiveBanks: null,
  isEditing: true,
  showRelationships: true,
  showNodeLabels: true,
  hideNodeLabelsWhileDragging: false,

  init: function() {
    this._super();
    this.set('objectiveBanks', Cmat.ObjectiveBank.findAll());
  },

  userMaps: function(){
    var currentUser = this.get('controllers.current_user');
    if(!Ember.isNone(currentUser)){
      var user_id = currentUser.get('id');
      if(!Ember.isNone(user_id)){
        return Cmat.Map.find({user_id: user_id});
      }
    }
    return Cmat.Map.find({});
  }.property('controllers.current_user.content', 'controllers.map.content'),

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
    UI.cmat_app.clearMap();
    var map = this.get('controllers.map').get('model');
    map.set('objective_bank_id', null);
    UI.showLoading();
    map.set('title', objectiveBank.get('displayName')['text']);
    map.load_from_mc3(objectiveBank).then(function(value){
    }, function(error){
      console.log("import Objective Bank error: " + error);
    });
  },

  map: function(){
    return this.get('controllers.map');
  }.property(),

  autoSave: function(){
    this.get('content').save();
  }.observes('isEditing', 'showRelationships', 'showRelationshipLabels', 'showNodeLabels', 'showNodeDescriptions', 'hideNodeLabelsWhileDragging')


});
