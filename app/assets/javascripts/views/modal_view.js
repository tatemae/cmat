Cmat.ModalView = Ember.View.extend({
  layoutName: 'modal_layout',
  saveLabel: 'Save',

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
    if (controller.showUrlField){
      controller.showUrlField();
    }
    $(document).on('keyup', { _self: this }, this.esc_close);
  },

  esc_close: function(e){
    if(e.which == 27){
      e.data._self.close();
    }
  },

  close: function(controller){
    this.do_close('modal_close');
  },

  willDestroyElement: function(){
    $(document).off('keyup', this.esc_close);
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
