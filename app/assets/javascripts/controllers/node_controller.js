var NodeController = Ember.Controller.extend({

//  types: ['concept', 'objective'],

  types: function(){
    return ['concept', 'objective'];
  }.property(),

  changeState: function(){
    if(this.get('state') == 'edit'){
      this.transitionToRoute('node.edit');
    }
  }.observes('state')

});

module.exports = NodeController;
