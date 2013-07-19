// by default, persist application data to localStorage.
require('../vendor/localstorage_adapter');

module.exports = DS.Store.extend({
  revision: 11,
  // adapter: DS.RESTAdapter.create({
  //   namespace: 'api'
  // })
  adapter: DS.LSAdapter.create()
});