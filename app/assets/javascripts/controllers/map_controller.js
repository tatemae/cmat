Cmat.MapController = Ember.ObjectController.extend(Cmat.AutoSave, {

  needs: ['toolbar', 'node', 'currentUser'],
  toolbar: null,
  toolbarBinding: "controllers.toolbar",
  node: null,
  nodeBinding: "controllers.node",

  bufferedFields: ['title'],
  instaSaveFields: ['payload'],

  userLogin: function(){
    var user_id = this.get('controllers.currentUser').get('id');
    if(user_id){
      this.get('content').set('user_id', user_id);
      this.content.save();
    }
  }.observes('controllers.currentUser.isSignedIn')

});
