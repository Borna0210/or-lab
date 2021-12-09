//uvoz modula
const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg')
const db = require('./db');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
var bodyParser = require('body-parser');
const format = require('pg-format');
const fs = require('fs');
const csv=require('node-csv');
const csvstringify=require('csv-stringify')
const ObjectsToCsv = require('objects-to-csv')


//uvoz modula s definiranom funkcionalnosti ruta



//middleware - predlošci (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//middleware - statički resursi
app.use(express.static(path.join(__dirname, 'public')));

//middleware - dekodiranje parametara
app.use(express.urlencoded({
   extended: true
}));
app.use('/views', express.static('views'))
app.get('/', async function (req, res, next) {
  const sql = 'SELECT * FROM klub natural join igrac natural join trener';
  try {
      const data = (await db.query(sql, [])).rows;
      fs.writeFileSync("views/kosarkaski_klubovi.json", JSON.stringify(data))
      const csv = new ObjectsToCsv(data)
      await csv.toDisk('./views/kosarkaski_klubovi.csv')
      res.render('index', {});
  } catch (err) {
      console.log(err);
  }
});

app.get('/db', async function (req, res, next) {
  const sql = 'SELECT * FROM klub natural join igrac natural join trener';
  try {
      const data = (await db.query(sql, [])).rows;
      res.render('db', { data: data });
  } catch (err) {
      console.log(err);
  }
});


//pokretanje poslužitelja na portu 3000
app.listen(3000);