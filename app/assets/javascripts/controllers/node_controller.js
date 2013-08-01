var NodeController = Ember.ObjectController.extend({

  types: ['concept', 'objective'],

  changeState: function(){
    if(this.get('state') == 'edit'){
      this.transitionToRoute('node.edit');
    }
  }.observes('state')

});

module.exports = NodeController;
