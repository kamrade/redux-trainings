var redux = require('redux');

console.log('--- Starting redux example ---');

// Name reducer and action generators
// ------------------------
var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;
  };
};

var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  };
};

// Hobbies reducer and action generators
// ------------------------
var nextHobbyId = 1;
var hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ]
    case 'REMOVE_HOBBY':
      return state.filter((hobby) => {
        return hobby.id !== action.id;
      });
    default:
      return state;
  }
};

var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  };
};

var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  };
};

// Movies reducer and action generators
// ------------------------
var nextMovieId = 1;
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
      return state.filter((movie) => {
        return movie.id !== action.id;
      })
    default:
      return state;
  }
}

var addMovie = (movie) => {
  return {
    type: 'ADD_MOVIE',
    title: movie.title,
    genre: movie.genre
  };
};

var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  };
};

// Combine reducers

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
})

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Subscribe to changes
// ------------------------
var unsubscribe = store.subscribe(() => {
  var state = store.getState();
  document.getElementById('app').innerHTML = state.name;
  console.dir(store.getState());
});

var currentState = store.getState();
console.log('currentState', currentState);

// DISPATCHES
// ------------------------

store.dispatch(changeName('Nikolaj'));
store.dispatch( changeName('Denis') );
// unsubscribe();
store.dispatch( addHobby('Flying') );
store.dispatch( addHobby('Running') );
store.dispatch( removeHobby(2) );
store.dispatch( addMovie({title:'Blade Runner', genre:'Fantastic'}) );
store.dispatch( addMovie({title:'Aliens', genre:'Fantastic'}) );
store.dispatch( removeMovie(2) );
store.dispatch( changeName('Nastya') );
