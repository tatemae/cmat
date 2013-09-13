Cmat.MapController = Ember.ObjectController.extend(Cmat.AutoSave, {

  needs: ['toolbar', 'node', 'current_user'],
  toolbar: null,
  toolbarBinding: "controllers.toolbar",
  node: null,
  nodeBinding: "controllers.node",

  bufferedFields: ['title'],
  instaSaveFields: ['payload'],

  userLogin: function(){
    var user_id = this.get('controllers.current_user').get('id');
    var map = this.get('content');
    if(user_id && map){
      Ember.run(function(){
        map.set('user_id', user_id);
        map.save();
      });
    }
  }.observes('controllers.current_user.isSignedIn')

});
