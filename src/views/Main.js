import React from "react";
import InlineCss from "react-inline-css";
import Superagent from "superagent";
import ContextHelper from "helpers/ContextHelper";

/**
 * Main React application entry-point for both the server and client.
 *
 * @class Main
 */
const Main = React.createClass({
	mixins: [
		ContextHelper.Mixin
	],
	/**
	 * Server and client.
	 */
	getInitialState() {
		/**
		 * Server renders this component twice. The 1st pass without context data, but it will let
		 * you load the context data. Then the 2nd pass will have the loaded context. You MUST
		 * return exactly the same initial state on the server (2nd pass), as on the client.
		 */
		return {
			/* stargazers: this.getContext("stargazers") || [] */
		};
	},
	/**
	 * Server and client. Use Superagent to retrieve the list of GitHub stargazers.
	 */
	/* loadStargazersFn (untilAllLoaded, currentPage, completedFn) {
		Superagent.get(
			`https://api.github.com/repos/RickWong/react-isomorphic-starterkit/stargazers?per_page=100&page=${currentPage}`
		).
		end((error, response) => {
			let stargazers = this.getContext("stargazers") || [];

			if (response && Array.isArray(response.body)) {
				stargazers = stargazers.concat(response.body.map((user) => {
					return {
						id: user.id,
						login: user.login
					};
				}));

				this.setContext("stargazers", stargazers);

				if (untilAllLoaded && response.body.length >= 100) {
					return this.loadStargazersFn(untilAllLoaded, currentPage + 1, completedFn);
				}
			}

			completedFn(error, stargazers);
		});
	}, */
	/**
	 * Server and client.
	 */
	componentWillMount() {
		/**
		 * Use context loader here on the server.
		 */
		/* if (__SERVER__) {
			// Load the first 100 stargazers on the server.
			this.loadContextOnce("stargazers", (completedFn) => {
				this.loadStargazersFn(false, 1, completedFn);
			});
		} */

		/**
		 * Simply use this.setState() on the client.
		 */
		/* if (__CLIENT__) {
			// Load the rest of the stargazers on the client.
			this.loadStargazersFn(true, 2, (error, stargazers) => {
				this.setState({stargazers});
			});
		} */
	},
	statics: {
		/**
		 * <InlineCss> component allows you to write basic CSS for your component. Target
		 * your component with `&` and its children with `& selectors`. Be specific.
		 * You're not required to use this helper component.
		 */
		/* css: (avatarSize) => `` */
	},
	/**
	 * Server and client.
	 */
	render() {
		return (
			<main>
				<h1>Acrosticon</h1>
				<p>Give me your words and I’ll find you an acrostic poem</p>
			</main>
		);
	}
});

export default Main;
