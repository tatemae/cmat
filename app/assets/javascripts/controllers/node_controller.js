var NodeController = Ember.Controller.extend({

  changeState: function(){
    //this.transitionToRoute('node.edit');
    console.log('The state changed to:' + this.get('state'));
  }.observes('state')

});

module.exports = NodeController;
