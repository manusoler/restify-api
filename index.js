const restify = require('restify');
const mongoose = require('mongoose');
//const rjwt = require('restify-jwt-community');

const config = require('./src/config');

const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());
// authentication in all routes
//server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth'] }));

server.listen(config.PORT, () => {
  mongoose.set('useFindAndModify', false);
  mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true }
  );
});

const db = mongoose.connection;

db.on('error', err => console.log(err));

db.once('open', () => {
  // Add routes files
  require('./src/routes/customers')(server);
  require('./src/routes/users')(server);
  // Console log info
  console.log(`Server started on port ${config.PORT}`);
});
