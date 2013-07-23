var FlashMessage = Ember.Object.extend({
  type: "notice",
  message: null,
  isNotice: (function() {
    return this.get("type") === "notice";
  }).property("type").cacheable(),
  isWarning: (function() {
    return this.get("type") === "warning";
  }).property("type").cacheable(),
  isError: (function() {
    return this.get("type") === "error";
  }).property("type").cacheable()
});

var flashQueue = Ember.ArrayProxy.create({
  content: [],
  contentChanged: function() {
    var current;
    current = App.FlashController.get("content");
    if (current !== this.objectAt(0)) {
      return App.FlashController.set("content", this.objectAt(0));
    }
  }
});

var FlashMessages = Ember.Component.extend({

  current: null,
  queue: Ember.ArrayProxy.create({}),

  // contentBinding: "App.FlashController.content",
  // classNameBindings: ["isNotice", "isWarning", "isError"],
  // isNoticeBinding: "content.isNotice",
  // isWarningBinding: "content.isWarning",
  // isErrorBinding: "content.isError",

  didInsertElement: function(){
    this.$("#message").hide();
    this.queue.addObserver('content', this.queueChange);
  },

  queueChange: function(){
    this.show();
    setTimeout(this.hide, 2500);
  },

  pushFlash: function(type, message) {
    return flashQueue.pushObject(FlashMessage.create({
      message: message,
      type: type
    }));
  },

  show: function(callback) {
    return this.$("#message").css({
      top: "-40px"
    }).animate({
      top: "+=40",
      opacity: "toggle"
    }, 500, callback);
  },

  hide: function(callback) {
    return this.$("#message").css({
      top: "0px"
    }).animate({
      top: "-39px",
      opacity: "toggle"
    }, 500, callback);
  }

});

module.exports = FlashMessages;



// App.FlashController = Ember.Object.create({
//   content: null,
//   clearContent: function(content, view) {
//     return view.hide(function() {
//       return App.FlashQueue.removeObject(content);
//     });
//   }
// });

// App.FlashController.addObserver('content', function() {
//   if (this.get("content")) {
//     if (this.get("view")) {
//       this.get("view").show();
//       return setTimeout(this.clearContent, 2500, this.get("content"), this.get("view"));
//     }
//   } else {
//     return App.FlashQueue.contentChanged();
//   }
// });

// App.FlashQueue.addObserver('length', function() {
//   return this.contentChanged();
// });