# SDev Log Viewer

This is a demo node.js / express app which tails logs in the specified log directory.

The frontend is written using bootstrap and jquery. This could have been refactored to be better  
but it only serves as a way to interact with the node.js being demonstrated

It demonstrates the following:

* Separation of concerns (app, routes, models, lib)
* test driven development
* use of promises
* use of logging and error handling

## Running

Run `npm install` and `npm start`. 

By default it tails it's own logs in the ./log directory, which isn't very impressive.   
To tail another log directory you specify it when starting the server e.g. 

Run `npm start -- /var/log`. 
 
Open `http://localhost:3000`.

## Tests

To run tests, run `npm test`.  

To watch for any changes to files and automatically te test.

Run `npm test -- --watch` 
 
## TODO

* use web sockets to update the log files live
* add stop/start buttons for watching
* add input for number of initial lines to retrieve
* view multiple log files at the same time
* include log files in subdirectories of root log directory

## References

* [Node.js](http://nodejs.org) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [express](http://expressjs.com/) - Fast, unopinionated, minimalist web framework
* [q](https://www.npmjs.com/package/q) - A library for promises (CommonJS/Promises/A,B,D)
* [slice-file](https://www.npmjs.com/package/slice-file) - stream file slices by line number indexes
* [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js
* [winston](https://www.npmjs.com/package/winston) - A multi-transport async logging library for Node.js
* [mocha](https://www.npmjs.com/package/mocha) - HTTP request logger middleware for node.js
* [supertest](https://www.npmjs.com/package/supertest) - Super-agent driven library for testing HTTP servers