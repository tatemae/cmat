var SwitchView = Ember.View.extend({
  tagName: 'div',
  classNames: ['switch', 'btn-group'],
  attributeBindings: ['onLabel:data-on-label', 'offLabel:data-off-label'],
  onLabel: 'edit',
  offLabel: 'view',

  didInsertElement: function(){
    this.$().bootstrapSwitch();
  }
});

Ember.Handlebars.helper('switch', SwitchView);

module.exports = SwitchView;
