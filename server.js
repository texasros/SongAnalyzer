var locomotive = require('locomotive')
  , bootable = require('bootable');

// Create a new application and initialize it with *required* support for
// controllers and views.  Move (or remove) these lines at your own peril.
var app = new locomotive.Application();
app.phase(locomotive.boot.controllers(__dirname + '/app/controllers'));
app.phase(locomotive.boot.views());

// Add phases to configure environments, run initializers, draw routes, and
// start an HTTP server.  Additional phases can be inserted as needed, which
// is particularly useful if your application handles upgrades from HTTP to
// other protocols such as WebSocket.
const path = require('path');

app.phase(require('bootable-environment')(path.join(__dirname, 'config', 'environments')));
app.phase(bootable.initializers(path.join(__dirname, 'config', 'initializers')));
app.phase(locomotive.boot.routes(path.join(__dirname, 'config', 'routes')));
app.phase(locomotive.boot.httpServer(parseInt(process.env.PORT) || 3000, '127.0.0.1'));

// Boot the application.  The phases registered above will be executed
// sequentially, resulting in a fully initialized server that is listening
// for requests.
app.boot(function(err) {
  if (err) {
    console.error(err.message);
    console.error(err.stack);
    return process.exit(-1);
  }
});
