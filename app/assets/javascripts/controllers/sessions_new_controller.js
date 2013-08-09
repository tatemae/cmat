var SessionsNewController = Ember.ObjectController.extend({
  needs: ['map', 'currentUser'],

  save: function(){
    var _self = this;
    this.set('errorMessage', null);
    this.content.save().then(function(){
      //_self.set('errorMessage', response.message);
      _self.get('controllers.currentUser').loadUser(_self.content);
      _self.transitionBack();
    });
  },

  cancel: function() {
    this.content.deleteRecord();
    this.transitionBack();
  },

  transitionBack: function(){
    var map = this.get('controllers.map').get('content');
    if(Ember.isNone(map)){
      this.transitionToRoute('index');
    } else {
      this.transitionToRoute('map', map);
    }
  }

});

module.exports = SessionsNewController;