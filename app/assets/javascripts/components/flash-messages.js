// Add a new flash message like this:
// Cmat.Flash.push('error', 'Please review the errors below:');
// Can use 'error', 'success', 'info' or 'notice'

Cmat.FlashMessage = Ember.Object.extend({
  alertType: function(){
    return 'alert-' + this.get('type');
  }.property('type')

});

Cmat.Flash = Ember.ArrayProxy.create({
  content: [],
  push: function(type, message){
    this.addObject(Cmat.FlashMessage.create({ message: message, type: type }));
  }
});

Cmat.FlashMessagesComponent = Ember.Component.extend({

  queueChange: function(){
    var toRemove = Ember.A();
    Cmat.Flash.get('content').every(function(m){ toRemove.push(m); });
    Ember.run.later(this, function(){
      toRemove.every(function(m){
        Cmat.Flash.removeObject(m);
      });
    }, 3000);
  }.observes('Cmat.Flash.content.@each')

});