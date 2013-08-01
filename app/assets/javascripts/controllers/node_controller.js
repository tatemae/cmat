var NodeController = Ember.ObjectController.extend({

  types: ['concept', 'objective'],

  changeState: function(){
    if(this.get('state') == 'edit'){
      this.transitionToRoute('node.edit');
    }
    if(this.get('state') == 'new'){
      this.transitionToRoute('node.new');
    }
  }.observes('state')

});

module.exports = NodeController;
