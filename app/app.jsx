var React = require('react');
var ReactDOM = require('react-dom');
// var Route = require('react-router').Route;
var { Router, Route, IndexRoute, Link, Navigation, browserHistory, hashHistory } = require('react-router');

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
	<p className="message-text">Boilerplate 3 Project</p>,
	document.getElementById('app')
);
