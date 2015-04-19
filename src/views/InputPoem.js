import React from "react";
import {RouteHandler} from "react-router";

import {sonnet18 as sonnet} from '../../acrosticon/data/sonnet'

export default class InputPoem extends React.Component {
	render () {
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
}
