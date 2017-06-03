var redux = require('redux');
console.log('Starting todo redux example');

// +++++++++++++++++++++++++++++++++++++++++++++++
// initialize state
var stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
};

// +++++++++++++++++++++++++++++++++++++++++++++++
// reducer function that control initial state and
// state changes
var reducer = (state = stateDefault, action) => {
  switch(action.type) {
    case 'SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      };
    default:
      return state;
  }
};

// +++++++++++++++++++++++++++++++++++++++++++++++
// state declaration
var store = redux.createStore(reducer);
console.log( 'current state:', store.getState() );

// +++++++++++++++++++++++++++++++++++++++++++++++
// first dispatcher
store.dispatch({
  type:       'SEARCH_TEXT',
  searchText: 'Clean the room'
});

console.log('searchText should be Clean the room', store.getState());
