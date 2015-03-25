import React from "react";
import Router, {Route, DefaultRoute} from "react-router";
import Main from "views/Main";

var Link = Router.Link;
var RouteHandler = Router.RouteHandler;


var App = React.createClass({
	render: function () {
		return (
			<div>
				<header>
					<ul>
						<li><Link to="app">Dashboard</Link></li>
						<li><Link to="poem">Input Poem</Link></li>
						<li><Link to="results">Results</Link></li>
					</ul>
					All systems operating OK
				</header>

				{/* this is the important part */}
				<RouteHandler/>
			</div>
		);
	}
});

var InputPoem = React.createClass({
	render: function () {
		return (
			<div>
				<h2>Type in your poem here...</h2>
				<form action="/poem/" method="post">
					<textarea name="poem" rows="10"></textarea>
					<br/>
					<button type="submit">Find acrostics!</button>
				</form>
				<RouteHandler/>
			</div>
		);
	}
});


var AcrosticResults = React.createClass({
	render: function () {
		return (
			<div>
				<h2>Acrostic results</h2>
				<RouteHandler/>
			</div>
		);
	}
});


var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="poem" path="/poem/" handler={InputPoem}/>
		<Route name="results" path="/acrostics/" handler={AcrosticResults}/>
		<DefaultRoute handler={Main}/>
	</Route>
);

export default routes;
