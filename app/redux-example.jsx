var redux = require('redux');
var axios = require('axios');

console.log('--- Starting redux example ---');

var actions = require("./actions/index");
var store   = require("./store/configureStore").configure();

// Subscribe to changes
// ------------------------
// Каждый раз когда меняется стрейт мы его в консоль
var unsubscribe = store.subscribe(() => {
  var state = store.getState();
  console.dir( store.getState() );
  if (state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading';
  } else if(state.map.url) {
    document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank" >View Your Location</a>';
  }
});

var currentState = store.getState();
console.log('currentState', currentState);

store.dispatch(actions.fetchLocation());

store.dispatch(actions.changeName('Nikolaj'));
store.dispatch( actions.changeName('Denis') );
store.dispatch( actions.addHobby('Flying') );
store.dispatch( actions.addHobby('Running') );
store.dispatch( actions.removeHobby(2) );
store.dispatch( actions.addMovie({title:'Blade Runner', genre:'Fantastic'}) );
store.dispatch( actions.addMovie({title:'Aliens', genre:'Fantastic'}) );
store.dispatch( actions.removeMovie(2) );
store.dispatch( actions.changeName('Nastya') );
