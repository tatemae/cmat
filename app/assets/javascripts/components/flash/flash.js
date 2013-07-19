var FlashMessage = require('./flash_message');
var FlashController = require('./flash_controller');
var Flash = Ember.ArrayProxy.create({
  content: [],
  contentChanged: function() {
    var current;
    current = FlashController.get("content");
    if (current !== this.objectAt(0)) {
      return FlashController.set("content", this.objectAt(0));
    }
  },
  pushFlash: function(type, message) {
    return this.pushObject(FlashMessage.create({
      message: message,
      type: type
    }));
  }
});

Flash.addObserver('length', function() {
  return this.contentChanged();
});

module.exports = Flash;