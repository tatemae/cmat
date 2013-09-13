Cmat.TransitionBack = Ember.Mixin.create({

  transitionBack: function(){
    var map = this.get('controllers.map').get('content');
    if(Ember.isNone(map)){
      this.transitionToRoute('index');
    } else {
      this.transitionToRoute('map', map);
    }
  }

});
