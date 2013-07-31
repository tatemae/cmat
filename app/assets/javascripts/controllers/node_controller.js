var NodeController = Ember.ObjectController.extend({

  types: ['concept', 'objective'],

  changeState: function(){
    if(this.get('state') == 'edit'){
      this.transitionToRoute('node.edit');
    }
  }.observes('state'),

  changeTitle: function(){
    console.log('Title changed to ' + this.get('title'));
  }.observes('title')

});

module.exports = NodeController;
