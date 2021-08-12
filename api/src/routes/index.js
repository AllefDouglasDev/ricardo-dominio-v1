const routes = require('express').Router();

const reportRoutes = require('./reports');
const configurationRoutes = require('./configurations');

routes.use('/reports', reportRoutes);
routes.use('/config', configurationRoutes);

module.exports = routes;
