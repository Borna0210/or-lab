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
app.get('/', function (req, res, next) {
  res.render('index', {
  });
});

app.get('/db', async function (req, res, next) {
  const sql = 'SELECT * FROM klub natural join igrac natural join trener';
  try {
      const data = (await db.query(sql, [])).rows;
      fs.writeFileSync("views/kosarkaski_klubovi.json", JSON.stringify(data))
      const csv = new ObjectsToCsv(data)
      await csv.toDisk('./views/kosarkaski_klubovi.csv')
      res.render('db', { data: data });
  } catch (err) {
      console.log(err);
  }
});

app.post('/db', async function (req, res, next) {
  var name = req.body.fname;
  var drop = req.body.dropdown;
  var isnum = /^\d+$/.test(name);
  try{
      if (drop == "svi" && !isnum) {
          var sql = 'SELECT * FROM klub natural join igrac natural join trener where (imeklub=$1 or arenaklub=$1 or savdrzava=$1  or imeigrac=$1 or prezimeigrac=$1  or pozicijaigrac=$1 or uni_hs_club=$1 or imetrener=$1 or prezimetrener=$1)';
      }
      else if (drop == "svi" && isnum) {
          var sql = 'SELECT * FROM klub natural join igrac natural join trener where (idklub=$1 or godosnutka=$1 or brojdresa=$1)';

      }
      else {
          var sql = format('SELECT * FROM klub natural join igrac natural join trener where %I=$1', drop);
      }


      const data = (await db.query(sql, [name])).rows;
     // var x=JSON.stringify(data);
      //console.log(x);
      fs.writeFileSync( "views/kosarkaski_klubovi.json", JSON.stringify(data))
      const csv = new ObjectsToCsv(data)
      await csv.toDisk('./views/kosarkaski_klubovi.csv')
      res.render('db',{data:data});}
      catch(e){
        console.log("ERROR"+e);
      }
      
});





//pokretanje poslužitelja na portu 3000
app.listen(3000);