var axios = require('axios');

// +++++++++++++++++++++++++++++++++++++++++++++++
// Action Change Name
export var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++
// Action Add Hobby
export var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  }
};

// +++++++++++++++++++++++++++++++++++++++++++++++
// Action Remove Hobby
export var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
}

// +++++++++++++++++++++++++++++++++++++++++++++++
// Action Add Movie
export var addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title,
    genre
  }
};

// +++++++++++++++++++++++++++++++++++++++++++++++
// Action Remove Movie
export var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
}

// +++++++++++++++++++++++++++++++++++++++++++++++
// Action Start Location Fetch
export var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++
// Action Complete Location Fetch
export var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++
// Fetch Location
export var fetchLocation = () => {

  return (dispatch, getState) => {
    dispatch( startLocationFetch() );
    axios.get('http://ipinfo.io').then((res) => {
      var loc = res.data.loc;
      var baseUrl = 'http://maps.google.com?q=';
      dispatch( completeLocationFetch(baseUrl + loc) );
    });
  };
}
