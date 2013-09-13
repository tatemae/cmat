Cmat.TransitionMap = Ember.Mixin.create({

  transitionToTransitionMap: function(){
    var _self = this;
    var current_user = this.controllerFor('currentUser');
    if(!Ember.isEmpty(current_user)){
      var user_id = current_user.get('id');
      if(!Ember.isEmpty(user_id)){
        return Cmat.Map.find({user_id: user_id}).then(function(maps){
          var map = maps.objectAt(0);
          if(!Ember.isEmpty(map)){
            _self.transitionTo('map', map);
          } else {
            _self.transitionToNewMap();
          }
        });
      }
    }
    this.transitionToNewMap();
  },

  transitionToNewMap: function(){
    var map = Cmat.Map.createRecord({
      title: 'New Map'
    });
    map.save().then(function(){
      this.transitionTo('map', map);
    }.bind(this));
  }

});
