var redux = require('redux');
console.log('Starting todo redux example');

// +++++++++++++++++++++++++++++++++++++++++++++++
// initialize state
var stateDefault = {
  searchText: '...',
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
var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
console.log( 'current state:', store.getState() );

// +++++++++++++++++++++++++++++++++++++++++++++++
// subscribe
var unsubscribe = store.subscribe(() => {
  var state = store.getState();
  document.getElementById('app').innerHTML = state.searchText;
});

// +++++++++++++++++++++++++++++++++++++++++++++++
//  dispatcher 1
store.dispatch({
  type:       'SEARCH_TEXT',
  searchText: 'Clean the room'
});
// dispatcher 2
store.dispatch({
  type:       'SEARCH_TEXT',
  searchText: 'Get the bath'
});
