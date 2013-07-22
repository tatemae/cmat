var ModalView = Ember.View.extend({
  didInsertElement: function(){
    this.$('.modal, .modal-backdrop').addClass('in');
  },

  layoutName: 'modal_layout',

  close: function(){
    var view = this;
    // use one of: transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd
    // events so the handler is only fired once in your browser
    this.$('.modal').one("transitionend", function(ev){
      view.get('controller').send('modal_closed');
    });
    this.$('.modal, .modal-backdrop').removeClass('in');
  }
});

Ember.Handlebars.helper('modal', ModalView);

module.exports = ModalView;