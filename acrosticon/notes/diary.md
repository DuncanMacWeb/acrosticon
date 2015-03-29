Diary
=====

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
