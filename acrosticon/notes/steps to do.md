# Acrosticon - steps to do

## Now

- input form at /new
- POSTs to /new, redirects to /acrostics/foopoem
- render the results (one result at a time, interface to display other results by selecting words)
- GET /acrostics/foopoem/results/fancy-tentacle-umbrella-3
- for editing: POST /acrostics/foopoem/edit === PUT /acrostics/foopoem
- DELETE option

design: 2 or 3 areas ([original], results [list or nav buttons], current acrostic)

## Later

Dictionary API
Session management
Keeping server up to date (web sockets/Swarm etc)