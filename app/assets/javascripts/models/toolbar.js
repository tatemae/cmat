var Toolbar = DS.Model.extend({
  showRelationships: DS.attr('boolean')
}).reopenClass({
  adapter: DS.LSAdapter.create()
});

module.exports = Toolbar;