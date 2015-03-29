Diary
=====

## 25 March 2015

Looking at where best to handle POSTS in the starter kit. I think it
would be best to handle that within the React class, rather than using
hapi routing. However, I couldn't find a react-router API for POST data.
Found https://github.com/insin/isomorphic-lab which manages to do it!
 -- Tom

Looked at solving the problem of data modelling outside of React and JavaScript variables. We need to be able to persist input poems, acrostic results and dictionary data on client and server. All of these, but especially dictionary data, may be different between both ends. Considered Swarm, as they have implemented an isomorphic TodoMVC app that uses React.
 -- Duncan