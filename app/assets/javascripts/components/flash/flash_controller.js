var Flash = require('./flash');

var FlashController = Ember.Object.create({
  content: null,
  clearContent: function(content, view) {
    return view.hide(function() {
      return Flash.removeObject(content);
    });
  }
});

FlashController.addObserver('content', function() {
  if (this.get("content")) {
    if (this.get("view")) {
      this.get("view").show();
      return setTimeout(this.clearContent, 2500, this.get("content"), this.get("view"));
    }
  } else {
    return Flash.contentChanged();
  }
});

module.exports = FlashController;