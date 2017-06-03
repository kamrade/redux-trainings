var redux = require('redux');

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
// reducers combiner
var reducer = redux.combineReducers({
  name:    nameReducer,
  hobbies: hobbiesReducer,
  movies:  moviesReducer
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
  document.getElementById("app").innerHTML = state.name;
});
// unsubscribe();

// +++++++++++++++++++++++++++++++++++++++++++++++
// show current state before dispatch
var currentState = store.getState();
console.log('currentState', currentState);

// +++++++++++++++++++++++++++++++++++++++++++++++
// dispatcher
store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Denis'
});

// +++++++++++++++++++++++++++++++++++++++++++++++
// dispatcher
store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Running'
});

// +++++++++++++++++++++++++++++++++++++++++++++++
// dispatcher
store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Walking'
});

// +++++++++++++++++++++++++++++++++++++++++++++++
// dispatcher
store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Nas'
})

// +++++++++++++++++++++++++++++++++++++++++++++++
// dispatcher
store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Mad Max',
  genre: 'Action'
});

// +++++++++++++++++++++++++++++++++++++++++++++++
// dispatcher
store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Star Wars',
  genre: 'Action'
});

// +++++++++++++++++++++++++++++++++++++++++++++++
// dispatcher
store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
});

// +++++++++++++++++++++++++++++++++++++++++++++++
// dispatcher
store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 1
});
