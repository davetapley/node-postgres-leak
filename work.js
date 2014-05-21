var doWork, pg, pgConString, rate;

pg = require('pg')["native"];

pgConString = process.env.DATABASE_URL;

doWork = function() {
  var startTime;
  startTime = process.hrtime();
  return pg.connect(pgConString, function(err, client, done) {
    if (process.env.SELECT1) {
      return client.query("SELECT 1", [], function(err, result) {
        console.log('Done in ' + process.hrtime(startTime));
        return done(client);
      });
    } else if (process.env.USE1) {
      return client.query("SELECT 1 AS one", [], function(err, result) {
        var one;
        one = result.rows[0].one;
        console.log('Done in ' + process.hrtime(startTime) + ' ' + one);
        return done(client);
      });
    } else {
      console.log('Done in ' + process.hrtime(startTime));
      return done(client);
    }
  });
};

rate = process.env.RATE || 100;

setInterval(doWork, rate);
