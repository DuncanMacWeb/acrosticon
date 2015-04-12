Diary
=====

## 12 April 2015

Refactored some acrostic crunching code out from server.js to findwords.js. Then tried to add a url param for /acrostics/:acrosticId but hit errors. Also had problems saving db state in global variables before apres-POST redirect. Next step is probably to do a mini React project using url params, to see if I can get that working - potentially the errors are being introduced by react-transmit.
 -- Tom

## 1 April 2015

Added a simple 'hapi' POST route for inputting the poem which then runs the find words algorithm. For now, it just prints the results to the (server's) console.
I am still unsure how isomorphic-lab handles a non-js POST, which then renders the react componants again. There seems to be a react-router-middlewhere which captures the POST params in the url field, yuck!
For now, am focussing on getting it working server-side. 
 -- Tom

Ran into problems refactoring to make it simple to create React/Transmit components by passing in just JSX. There is a bug that seems to annoy the Link component no end that's still unresolved.
  -- Duncan
 
## 29 March 2015

Merged in the latest changes (including v2) of the starter kit. Grappled with IPC errors with node for a long time (only on my machine). Finally I found that going back to node version 0.10 fixed the errors (using nvm, no Vagrant). Fixed react-routing errors (hung server) that required wrapping with react-transmit.
 -- Tom

Spent most time working through React-Router, seeing how it’s supposed to work and how it could work with the new-fangled Relay idea from Facebook; oh, how they keep changing things! ;-) then attempting to reconcile React-Router’s conventions with React-Transmit which is a custom Relay implementation. The key may be working out how to pass in an empty query object to React-Transmit when there’s no data to retrieve.
 -- Duncan

## 25 March 2015

Looking at where best to handle POSTS in the starter kit. I think it
would be best to handle that within the React class, rather than using
hapi routing. However, I couldn't find a react-router API for POST data.
Found https://github.com/insin/isomorphic-lab which manages to do it!
 -- Tom

Looked at solving the problem of data modelling outside of React and JavaScript variables. We need to be able to persist input poems, acrostic results and dictionary data on client and server. All of these, but especially dictionary data, may be different between both ends. Considered Swarm, as they have implemented an isomorphic TodoMVC app that uses React.
 -- Duncan
