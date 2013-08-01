var ModalView = Ember.View.extend({
  layoutName: 'modal_layout',

  didInsertElement: function(){
    this.$('.modal').modal({
      'show': true,
      'backdrop': 'static'
    });
  },

  close: function(){
    this.do_close('modal_close');
  },

  save: function(){
    this.do_close('modal_save');
  },

  do_action: function(action){
    this.do_close(action);
  },

  do_close: function(event){
    var view = this;
    this.$('.modal').one("hidden", function(ev){
      view.get('controller').send(event);
      // TODO the modal works, but it still leaves junk in the DOM. Would like to find a way to clean it up
    });
    this.$('.modal').modal('hide');
  }

});

Ember.Handlebars.helper('modal', ModalView);

module.exports = ModalView;