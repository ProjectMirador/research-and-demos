const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const apps = require('../apps');

module.exports = {
  start: (port) => {
    const app = express();
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.use(favicon(__dirname + '/favicon.ico'));
    app.get('/', (req, res) => {
      res.render('index', {
        apps,
      });
    });
    app.use('/static', express.static(path.join(__dirname, '../dist')));

    app.get('/:bundle', (req, res) => {
      const bundle = req.params.bundle;
      res.render('app-template', {
        bundle,
      });
    });

    app.listen(port, () => {
      console.log(`server running at localhost:${port}, go refresh and see magic`);
    });
  },
};
