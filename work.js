var doWork, pg, pgConString, rate;

pg = require('pg')["native"];

pgConString = process.env.DATABASE_URL;

doWork = function() {
  var startTime = process.hrtime();
  pg.connect(pgConString, function(err, client, done) {
    console.log('Done in ' + process.hrtime(startTime));
    done(client);
  });
};

rate = process.env.RATE || 100;

setInterval(doWork, rate);
