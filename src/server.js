import {Server} from "hapi";
import React from "react";
import Router from "react-router";
import Transmit from "react-transmit";
import routes from "views/Routes";

import {findWords, printAcrostic} from "../acrosticon/lib/findwords";

/**
 * Start Hapi server on port 8000.
 */
const server = new Server();
server.connection({port: process.env.PORT || 8000});
server.start();


server.route({
	method:  "POST",
	path:    "/poem/",
	handler: (request, reply) => {
		
		console.log("POST HANDLER");
		
		let sonnet = request.payload.poem;
		console.log("sonnet = " + sonnet);
		
		let [wordsGenerator, words] = findWords(sonnet);
		let n = 1;
		for (let acrostic of wordsGenerator) {
			printAcrostic(words, acrostic.indices, acrostic.sentence);
			if (n > 10) {
				break;
			}
			n++;
		}
		
		reply('POST to poem, sonnet = ' + sonnet);
		
	}
});


/**
* Attempt to serve static requests from the public folder.
*/
server.route({
	method: "*",
	path: "/{params*}",
	handler: (request, reply) => {
		reply.file("static" + request.path);
	}
});

/**
 * Catch dynamic requests here to fire-up React Router.
 */
server.ext("onPreResponse", (request, reply) => {
	if (typeof request.response.statusCode !== "undefined") {
		return reply.continue();
	}
	
	Router.run(routes, request.path, (Handler, router) => {
		Transmit.renderToString(Handler, {}, (error, reactString, reactData) => {
			if (error) {
				return reply(error.stack).type("text/plain").code(500);
			}

			let output = (
				`<!doctype html>
					<html lang="en-us">
						<head>
							<meta charset="utf-8">
							<title>Acrosticon</title>
							<link rel="shortcut icon" href="/favicon.ico">
						</head>
						<body>
							<div id="react-root">${reactString}</div>
						</body>
					</html>`
			);

			const webserver = process.env.NODE_ENV === "production" ? "" : "//localhost:8080";
			output = Transmit.injectIntoMarkup(output, reactData, [`${webserver}/dist/client.js`]);

			reply(output);
		});
	})
});
