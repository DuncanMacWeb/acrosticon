import React from "react";
import {Route, DefaultRoute} from "react-router";

import Main from "./Main";
import {App, WrappedApp} from "./App";
import InputPoem from "./InputPoem";
import AcrosticResults from "./AcrosticResults";

export default (
	<Route path="/" name="app" handler={WrappedApp}>
			<Route name="poem" path="/poem/" handler={InputPoem}/>
			<Route name="results" path="/acrostics/" handler={AcrosticResults}/>
			<DefaultRoute handler={Main}/>
	</Route>
);
