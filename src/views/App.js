import React from "react";
import {Link, RouteHandler} from "react-router";
import Transmit from "react-transmit";

class App extends React.Component {
	render () {
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
}

const WrappedApp = Transmit.createContainer(App, {
	queryParams: {
		prevStargazers: [],
		nextPage: 1,
		pagesToFetch: 22
	},
	queries: {
		stargazers (queryParams) {
			return new Promise((resolve) => {
				resolve();
			});
		}
	}
});

export {App, WrappedApp};
export default WrappedApp;
