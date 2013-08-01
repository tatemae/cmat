var Toolbar = DS.Model.extend({
  isEditing: DS.attr('boolean', { defaultValue: true }),
  showRelationships: DS.attr('boolean', { defaultValue: true }),
  showRelationshipLabels: DS.attr('boolean', { defaultValue: true }),
  showNodeLabels: DS.attr('boolean', { defaultValue: true }),
  showNodeDescriptions: DS.attr('boolean', { defaultValue: true })
});

App.Store.registerAdapter('App.Toolbar', DS.LSAdapter.create());

module.exports = Toolbar;