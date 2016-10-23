var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'projects'
};

// initialize the database connection pool
var pool = new pg.Pool(config);

router.get('/', function(req, res){

  pool.connect(function(err, client, done) {
      if (err) {
        console.log('Error connecting to the DB', err);
        res.sendStatus(500);
        done();
        return;
      }

      client.query('SELECT * FROM favorites;', function(err, result){
            done();
            if (err) {
              console.log('Error querying the DB', err);
              res.sendStatus(500);
              return;
            }

            console.log('Got rows from the DB:', result.rows);
            res.send(result.rows);
          });
        });
      });

  router.post('/', function(req, res){
    console.log('got to server');
    console.log(req.body);
    pool.connect(function(err, client, done){
      if (err) {
        console.log('Error connecting the DB', err);
        res.sendStatus(500);
        done();
        return;
      }

      client.query('INSERT INTO favorites (gif_url, comments) VALUES ($1, $2) returning *;',
      [req.body.url, req.body.comment],
      function(err, result){
        done();
        if (err) {
          console.log('Error querying the DB', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from the DB:', result.rows);
        res.send(result.rows);
      });
    });
  });


module.exports = router;
