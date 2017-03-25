var redux = require('redux');

console.log('--- Starting todo redux example ---');

var stateDefault = {
  searchText: '',
  showCompleted: false,
  todos: []
};
var reducer = (state = stateDefault, action) => {
  switch(action.type) {
    case 'CHANGE_SEARCH_TEXT':
    return {
      ...state,
      searchText: action.searchText
    };
    case 'CHANGE_SHOW_COMPLETED':
    return {
      ...state,
      showCompleted: !state.showCompleted
    };
    default:
    return state;
  }
  return state;
};

// var store = redux.createStore(reducer);

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
console.log('currentState', store.getState());

// Subscribe to changes
store.subscribe(() => {
  var state = store.getState();
  document.getElementById('app').innerHTML = state.searchText;
  console.log('Name:', state.searchText );
  console.log('Show completed:', state.showCompleted );
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'Find New Job'
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'Learn More About ngModules'
});

store.dispatch({
  type: 'CHANGE_SHOW_COMPLETED'
});

store.dispatch({
  type: 'CHANGE_SHOW_COMPLETED'
});
