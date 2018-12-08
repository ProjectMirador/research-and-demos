const server = require('./server');

process.title = server;
server.start(Number(process.env.PORT || 4000));
