
const coachRoutes = require('./coach-routes');
const playerRoutes = require('./player-routes');
const tiroRoutes = require('./tiro-routes');

module.exports = (app) => {
  app.use('/api/v1/coach', coachRoutes);
  app.use('/api/v1/player', playerRoutes);
  app.use('/api/v1/tiro', tiroRoutes);

};
