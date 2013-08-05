var ListBoxComponent = Ember.Component.extend({

  attributeBindings: ['items'],

  didInsertElement: function(){
    var _self = this;

    // All of this is a total hack but we can use ember select until we can upgrade handlebars so we'll deal with it.

    this.$('select').change(function(){
      var val = $('select option:selected').val();
      _self.set('selected', val);
    });

    this.$('select').val(this.get('selected'));
  }

});

module.exports = ListBoxComponent;