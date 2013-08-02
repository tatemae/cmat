var AutoSave = require('../mixins/auto_save');

var MapController = Ember.ObjectController.extend(AutoSave, {

  needs: ['toolbar', 'node', 'currentUser'],
  toolbar: null,
  toolbarBinding: "controllers.toolbar",
  node: null,
  nodeBinding: "controllers.node",

  bufferedFields: ['title'],
  instaSaveFields: ['payload'],

  userLogin: function(){
    console.log('userLogin called because of controllers.currentUser');
    var user_id = this.get('controllers.currentUser').get('id');
    if(user_id){
      this.get('content').set('user_id', user_id);
    }
  }.property('controllers.currentUser'),

  act: function(action){
    this[action]();
  },

  duplicate: function(){
    console.log('duplicating map');
  },

  destroy: function(){
    console.log('destroying map');
  }

});

module.exports = MapController;
