import React from "react";
import Router, {Route, DefaultRoute} from "react-router";
import Main from "views/Main";
import Transmit from "react-transmit";
import __fetch from "isomorphic-fetch";

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

const WrappedApp = Transmit.createContainer(App, {
	queryParams: {
		prevStargazers: [],
		nextPage: 1,
		pagesToFetch: 22
	},
	queries: {
		stargazers (queryParams) {
			/**
			 * Return a Promise of all the stargazers.
			 */
			return fetch(
				`https://api.github.com/repos/RickWong/react-isomorphic-starterkit/stargazers?per_page=100&page=${queryParams.nextPage}`
			).then((response) => {
				return response.json();
			}).then((page) => {
				if (!page || !page.length) {
					queryParams.pagesToFetch = 0;
					return queryParams.prevStargazers;
				}

				const stargazers = page.map((user) => ({
					id: user.id,
					login: user.login
				}));

				return queryParams.prevStargazers.concat(stargazers);
			});
		}
	}
});


export default (
	<Route path="/" name="app" handler={WrappedApp}>
			<Route name="poem" path="/poem/" handler={InputPoem}/>
			<Route name="results" path="/acrostics/" handler={AcrosticResults}/>
			<DefaultRoute handler={Main}/>
	</Route>
);
