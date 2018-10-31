const restify = require('restify');
const mongoose = require('mongoose');

const config = require('./src/config');

const server = restify.createServer();

// Moddleware
server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
  mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true }
  );
});

const db = mongoose.connection;

db.on('error', err => console.log(err));

db.once('open', () => {
  require('./src/routes/customers')(server);
  console.log(`Server started on port ${config.PORT}`);
});
