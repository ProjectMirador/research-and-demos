const server = require('./server');

process.title = 'serverjs';
server.start(Number(process.env.PORT || 4000));
