var redux = require('redux');
var axios = require('axios');

console.log('Starting redux example');

// +++++++++++++++++++++++++++++++++++++++++++++++
// BEGIN
var nextHobbyId = 1;
var nextMovieId = 1;

// +++++++++++++++++++++++++++++++++++++++++++++++
// reducer for name
var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++
// Action Change Name
var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++
// reducer for hobbies
var hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ];
    case 'REMOVE_HOBBY':
      return state.filter( (hobby) => hobby.id !== action.id );
    default:
      return state;
  }
};

// +++++++++++++++++++++++++++++++++++++++++++++++
// Action Add Hobby
var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  }
};

// +++++++++++++++++++++++++++++++++++++++++++++++
// Action Remove Hobby
var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
}

// +++++++++++++++++++++++++++++++++++++++++++++++
// Action Add Movie
var addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    genre
  }
};

// +++++++++++++++++++++++++++++++++++++++++++++++
// Action Remove Movie
var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
}

// +++++++++++++++++++++++++++++++++++++++++++++++
// reducer for movies
var moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieId++,
          title: action.title,
          genre: action.genre
        }
      ]
    case 'REMOVE_MOVIE':
      return state.filter( (movie) => movie.id !== action.id )
    default:
      return state;
  }
};

// +++++++++++++++++++++++++++++++++++++++++++++++
// map reducer
var mapReducer = (state = { isFetching: false, url: undefined }, action) => {
  switch (action.type) {
    case 'START_LOCATION_FETCH':
      return {
        isFetching: true,
        url: undefined
      };
    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching: false,
        url: action.url
      };
    default:
      return state;
  }
};

var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  };
};

var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  };
};

var fetchLocation = () => {
  store.dispatch( startLocationFetch() );
  axios.get('http://ipinfo.io').then((res) => {
    var loc = res.data.loc;
    var baseUrl = 'http://maps.google.com?q=';
    store.dispatch( completeLocationFetch(baseUrl + loc) );
  });
}

// +++++++++++++++++++++++++++++++++++++++++++++++
// reducers combiner
var reducer = redux.combineReducers({
  name:    nameReducer,
  hobbies: hobbiesReducer,
  movies:  moviesReducer,
  map:     mapReducer
});

// +++++++++++++++++++++++++++++++++++++++++++++++
// state declaration
var store = redux.createStore(reducer, redux.compose(
  // f => f is the same (f) => { return f; }
  // just for middleware process working
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Subscribe to changes
// Keep track of your data as it changes
var unsubscribe = store.subscribe(() => {
  var state = store.getState();
  console.log(state);
  // document.getElementById("app").innerHTML = state.name;

  if(state.map.isFetching) {
    document.getElementById("app").innerHTML = '___Loading___';
  } else if(state.map.url) {

    document.getElementById("app").innerHTML = '<a target="_blank" href="' + state.map.url + '">Your Location</a>'
    console.log( performance.now() );
  }

});
// unsubscribe();
// +++++++++++++++++++++++++++++++++++++++++++++++
// show current state before dispatch
var currentState = store.getState();
console.log('currentState', currentState);

console.log( performance.now() );
fetchLocation();

// +++++++++++++++++++++++++++++++++++++++++++++++
// dispatchers
store.dispatch( changeName('Denis') );
store.dispatch( addHobby('Running') );
store.dispatch( addHobby('Walking') );
store.dispatch( changeName('Nas') );
store.dispatch( changeName('Ivan') );
store.dispatch( addMovie('Mad Max', 'Action') );
store.dispatch( addMovie('Star Wars', 'Action') );
store.dispatch( removeHobby(2) );
store.dispatch( removeMovie(1) );
