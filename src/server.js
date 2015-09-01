import {Server} from "hapi";
import React from "react";
import Router from "react-router";
import Transmit from "react-transmit";
import routes from "views/Routes";
import url from "url";

var hostname = process.env.HOSTNAME || "localhost";

import {findWords, printAcrostic} from "../acrosticon/lib/findwords";

/**
 * Start Hapi server on port 8000.
 */
const server = new Server();
server.connection({host: hostname, port: process.env.PORT || 8000});
server.start(function () {
	console.info("==> ✅  Server is listening");
	console.info("==> 🌎  Go to " + server.info.uri.toLowerCase());
});


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
 * Endpoint that proxies all GitHub API requests to https://api.github.com.
 */
server.route({
	method: "*",
	path: "/api/github/{path*}",
	handler: {
		proxy: {
			passThrough: true,
			mapUri (request, callback) {
				callback(null, url.format({
					protocol: "https",
					host:     "api.github.com",
					pathname: request.params.path,
					query:    request.query
				}));
			}
		}
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
		Transmit.renderToString(Handler).then(({reactString, reactData}) => {
			let output = (
				`<!doctype html>
				<html lang="en-us">
					<head>
						<meta charset="utf-8">
						<title>react-isomorphic-starterkit</title>
						<link rel="shortcut icon" href="/favicon.ico">
					</head>
					<body>
						<div id="react-root">${reactString}</div>
					</body>
				</html>`
			);

			const webserver = process.env.NODE_ENV === "production" ? "" : "//" + hostname + ":8080";
			output = Transmit.injectIntoMarkup(output, reactData, [`${webserver}/dist/client.js`]);

			reply(output);
		}).catch((error) => {
			reply(error.stack).type("text/plain").code(500);
		});
	})
});
