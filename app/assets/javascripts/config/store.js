module.exports = DS.Store.extend({
  adapter: DS.RESTAdapter.create({
    namespace: 'api'
  })
});

//DS.Store.registerAdapter(['App.Toolbar'], DS.LSAdapter.create());