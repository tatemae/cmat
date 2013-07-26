module.exports = DS.Store.extend({
  adapter: DS.RESTAdapter.create({
    namespace: 'api'
  })
  //adapter: DS.LSAdapter.create()
});