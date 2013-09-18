Cmat.ModalView = Ember.View.extend({
  layoutName: 'modal_layout',
  saveLabel: 'Save',

  keyDown: function(e) {
    if (e.keyCode === 27){
      e.preventDefault();
      this.do_close('modal_close');
    }
  },

  actions: {
    close: function(){
      this.do_close('modal_close');
    },

    save: function(){
      this.do_close('modal_save');
    }
  },

  didInsertElement: function(){
    this.$('.modal').modal({
      'show': true,
      'backdrop': 'static'
    });
    this.$('.modal').find('.name-input').focus();
    this.$('.modal-body').find('.map_adder').focus();
    var controller = this.get('controller');
    if (controller.showUrlField)
      controller.showUrlField();
  },

  do_action: function(action){
    this.do_close(action);
  },

  do_close: function(event){
    var view = this;
    this.$('.modal').one("hidden", function(ev){
      view.get('controller').send(event);
      view.$('.modal-backdrop').remove();
    });
    this.$('.modal').modal('hide');
  }

});

Ember.Handlebars.helper('modal', Cmat.ModalView);
