var redux = require('redux');

console.log('Starting redux example');

// +++++++++++++++++++++++++++++++++++++++++++++++
// reducer function that control initial state and
// state changes
var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};
var nextHobbyId = 1;
var nextMovieId = 1;
var reducer = (state = stateDefault, action) => {
  switch(action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [
          ...state.movies,
          {
            id: nextMovieId++,
            title: action.title,
            genre: action.genre
          }
        ]
      };
    case 'ADD_HOBBY':
      return {
        ...state,
        hobbies: [
          ...state.hobbies,
          {
            id: nextHobbyId++,
            hobby: action.hobby
          }
        ]
      };
    default:
      return state;
  }
};

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
// dispatcher NAME 1
store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Denis'
});

// +++++++++++++++++++++++++++++++++++++++++++++++
// dispatcher HOBBIES
store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Running'
});

// +++++++++++++++++++++++++++++++++++++++++++++++
// dispatcher NAME 2
store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Nas'
})

// +++++++++++++++++++++++++++++++++++++++++++++++
// dispatcher HOBBIES
store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Mad Max',
  genre: 'Action'
});
