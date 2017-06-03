var redux = require('redux');
var axios = require('axios');

console.log('Starting redux example');

var actions = require('./actions/index');
var store   = require('./store/configureStore').configure();

var unsubscribe = store.subscribe(() => {
  var state = store.getState();
  console.log(state);
  if(state.map.isFetching) {
    document.getElementById("app").innerHTML = '___Loading___';
  } else if(state.map.url) {

    document.getElementById("app").innerHTML = '<a target="_blank" href="' + state.map.url + '">Your Location</a>'
  }

});

store.dispatch( actions.fetchLocation() );

// dispatchers
store.dispatch( actions.changeName('Denis') );
store.dispatch( actions.addHobby('Running') );
store.dispatch( actions.addHobby('Walking') );
store.dispatch( actions.changeName('Nas') );
store.dispatch( actions.changeName('Ivan') );
store.dispatch( actions.addMovie('Mad Max', 'Action') );
store.dispatch( actions.addMovie('Star Wars', 'Action') );
store.dispatch( actions.removeHobby(2) );
store.dispatch( actions.removeMovie(1) );
