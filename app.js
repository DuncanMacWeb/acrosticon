import {Server} from "hapi";

import React from "react";
import Router from "react-router";
import {Route, DefaultRoute, Link, RouteHandler} from "react-router";

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

var Main = React.createClass({
	render: function () {
		return (
			<div>
				<h2>Main page</h2>
				<p>Content goes here</p>
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
					<textarea name="poem" rows="10" defaultValue={sonnet}></textarea>
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
	<Route path="/" name="app" handler={App}>
			<Route name="poem" path="/poem/" handler={InputPoem}/>
			<Route name="results" path="/acrostics/" handler={AcrosticResults}/>
			<DefaultRoute handler={Main}/>
	</Route>
);



const server = new Server();
server.connection({port: process.env.PORT || 8000});
server.start();


server.route({
	method:  "GET",
	path:    "/",
	handler: (request, reply) => {
		
		Router.run(routes, request.path, (Handler, router) => {
			var str = React.renderToString(<Handler/>);
			reply(str);
		});
		//reply('<html><h1>Amazing!</h1></html>');
	}
});

