Cmat.Node = DS.Model.extend({
  state: DS.attr('string', { defaultValue: '' }), // edit, save, cancel, destroy
  title: DS.attr('string', { defaultValue: '' }),
  info: DS.attr('string', { defaultValue: '' }),
  type: DS.attr('string', { defaultValue: 'topic' }),
  assets: DS.attr('string', { defaultValue: '' })
});

Cmat.Store.registerAdapter('Cmat.Node', DS.LSAdapter.create());
