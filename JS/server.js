//uvoz modula
const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
var bodyParser = require('body-parser');
const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv')
var cors = require('cors');
app.use(cors());


//uvoz modula s definiranom funkcionalnosti ruta



//middleware - predlošci (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());       // to support JSON-encoded bodies
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
  const sql = 'SELECT * FROM klub natural join igrac natural join trener order by idklub';
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
  const sql = 'SELECT * FROM klub natural join igrac natural join trener order by idklub';
  try {
    const data = (await db.query(sql, [])).rows;
    res.render('db', { data: data });
  } catch (err) {
    console.log(err);
  }
});



app.get('/kosarka', async function (req, res, next) {
  const sql = 'SELECT * FROM klub natural join igrac natural join trener';
  try {
    const data = (await db.query(sql, [])).rows;
    res.set('content-type', 'application/json');
    res.status(200);
    res.json({
      "status": "OK",
      "message": "Fetched all data from DB",
      "reponse": {
        "name": "Basketball clubs with players and coach",
        "rel": "kosarkaski_klubovi",
        "Kosarkaski_klubovi":
          data
      }
    });
  } catch (err) {
      res.set('content-type', 'application/json');
      res.status(404);
      res.json({
        "status": "Not Found",
        "message": "No data in DB",
        "reponse": null
      });
  }
})



app.get('/kosarka/:id(\\d+)', async function (req, res, next) {
  var id = req.params.id;
  const sql = "SELECT * FROM klub natural join igrac natural join trener where idklub=$1";
  const data = (await db.query(sql, [id])).rows;

  if (data.length > 0) {
    res.set('content-type', 'application/json');
    res.status(200);
    res.json({
      "status": "OK",
      "message": "Fetched all data from DB requested by id",
      "reponse": {
        "name": "Specific basketball club with players and coach",
        "rel": "kosarkaski_klubovi",
        "Kosarkaski_klubovi":
          data
      }
    });
  }
  else {
    res.set('content-type', 'application/json');
    res.status(404)
    res.json({
      status: 'Not Found',
      message: 'Requested item was not found in the DB',
      response: null
    });
  }
})




app.get('/igrac/:id(\\d+)/:brdres(\\d+)', async function (req, res, next) {
  var id = req.params.id;
  var brdres = req.params.brdres;
  const sql = "SELECT imeigrac,prezimeigrac,brojdresa,pozicijaigrac,uni_hs_club,imeklub,idklub FROM klub natural join igrac where idklub=$1 and brojdresa=$2";
  const data = (await db.query(sql, [id, brdres])).rows;

  if (data.length > 0) {
    res.set('content-type', 'application/json');
    res.status(200);
    res.json({
      "status": "OK",
      "message": "Fetched requested player by id and jersey number",
      "reponse": {
        "name": "Specific basketball player from a specific club",
        "rel": "igrac",
        "Igrac":
          data
      }
    });
  }
  else {
    res.set('content-type', 'application/json');
    res.status(404)
    res.json({
      status: 'Not Found',
      message: 'Requested item was not found in the DB',
      response: null
    });
  }
})





app.get('/trener/:id(\\d+)', async function (req, res, next) {
  var id = req.params.id;
  const sql = "SELECT imetrener,prezimetrener,imeklub,idklub FROM klub natural join trener where idklub=$1";
  const data = (await db.query(sql, [id])).rows;

  if (data.length > 0) {
    res.set('content-type', 'application/json');
    res.status(200);
    res.json({
      "status": "OK",
      "message": "Fetched requested coach",
      "reponse": {
        "name": "Coach from a specific basketball club",
        "rel": "trener",
        "Trener":
          data
      }
    });
  }
  else {
    res.set('content-type', 'application/json');
    res.status(404)
    res.json({
      status: 'Not Found',
      message: 'Requested item was not found in the DB',
      response: null
    });
  }
})





app.get('/igrac/:pozicijaigrac([A-Za-z]+)', async function (req, res, next) {
  var pozicijaigrac = req.params.pozicijaigrac.toUpperCase();
  const sql = "SELECT imeigrac,prezimeigrac,brojdresa,pozicijaigrac,uni_hs_club,imeklub,idklub FROM klub natural join igrac where pozicijaigrac=$1";
  const data = (await db.query(sql, [pozicijaigrac])).rows;

  if (data.length > 0) {
    res.set('content-type', 'application/json');
    res.status(200);
    res.json({
      "status": "OK",
      "message": "Fetched requested player",
      "reponse": {
        "name": "Basketball players requested by position",
        "rel": "igrac",
        "Igraci":
          data
      }
    });
  }
  else {
    res.set('content-type', 'application/json');
    res.status(404)
    res.json({
      status: 'Not Found',
      message: 'Requested item was not found in the DB, sorry',
      response: null
    });
  }
})





app.get('/klub/:id(\\d+)', async function (req, res, next) {
  var id = req.params.id;
  const sql = "SELECT * FROM klub where idklub=$1";
  const data = (await db.query(sql, [id])).rows;

  if (data.length > 0) {
    res.set('content-type', 'application/json');
    res.status(200);
    res.json({
      "status": "OK",
      "message": "Fetched requested club",
      "reponse": {
        "name": "Basketball clubs requested by id",
        "rel": "klubovi",
        "Klubovi":
          data
      }
    });
  }
  else {
    res.set('content-type', 'application/json');
    res.status(404)
    res.json({
      status: 'Not Found',
      message: 'Requested item was not found in the DB',
      response: null
    });
  }
})






app.post('/add', async function (req, res, next) {
  idklub = req.body.idklub
  imeklub = req.body.imeklub
  arenaklub = req.body.arenaklub
  savdrzava = req.body.savdrzava
  godosnutka = req.body.godosnutka
  imeigrac = req.body.imeigrac
  prezimeigrac = req.body.prezimeigrac
  brojdresa = req.body.brojdresa
  pozicijaigrac = req.body.pozicijaigrac
  uni_hs_club = req.body.uni_hs_club
  imetrener = req.body.imetrener
  prezimetrener = req.body.prezimetrener
  var ch = 0  //kontrolna varijabla
  var ch2=0
  var idexists=0
  var numexists=0
  var checkid="SELECT * FROM klub WHERE idklub=$1"
  var checknum="SELECT * FROM igrac WHERE idklub=$1 and brojdresa=$2"
  var checkcoach="SELECT * FROM trener WHERE idklub=$1"
  const datachid = (await db.query(checkid, [idklub])).rows;
  const datachnum= (await db.query(checknum, [idklub,brojdresa])).rows;
  const datachcoach=(await db.query(checkcoach, [idklub])).rows;
  if (datachid.length > 0) {
    idexists=1
  }
  if (datachnum.length > 0) {
    numexists=1
  }
  if (datachcoach.length > 0) {
    ch=1
  }

  var sql_klub = "INSERT INTO klub(idklub,imeklub,arenaklub,savdrzava,godosnutka) VALUES ($1,$2,$3,$4,$5)";
  var sql_igrac = "INSERT INTO igrac(imeigrac,prezimeigrac,brojdresa,pozicijaigrac,idklub,uni_hs_club) VALUES ($1,$2,$3,$4,$5,$6)";
  var sql_trener = "INSERT INTO trener(imetrener,prezimetrener,idklub) VALUES ($1,$2,$3)";
  try {
    if(!idexists){
    const datak = await db.query(sql_klub, [idklub, imeklub, arenaklub, savdrzava, godosnutka])
  }
    if(!numexists){
    const datai = await db.query(sql_igrac, [imeigrac, prezimeigrac, brojdresa, pozicijaigrac, idklub, uni_hs_club])}
    if(!ch){
      const datat = await db.query(sql_trener, [imetrener, prezimetrener, idklub])
    }
    else if(numexists){
      res.set('content-type', 'application/json');
      res.status(400)
      res.json({
      status: 'Bad Request',
      message: 'You want to put two players with the same number in the same team, you are not allowed to do that',
      response: null
    });
    ch2=1
    }
    res.set('content-type', 'application/json');
    res.status(200);
    res.json({
      "status": "OK",
      "message": "DB value is now added"
    });
  }
  catch {
    if (!idexists) {
      const sql = "DELETE FROM klub where idklub=$1 ";
      const data = db.query(sql, [idklub])
    }
    else if(!numexists){
      const sql = "DELETE FROM igrac where idklub=$1 and brojdresa=$2 ";
      const data = db.query(sql, [idklub,brojdresa])
    }
    else if(!ch){
      const sql = "DELETE FROM trener where idklub=$1 ";
      const data = db.query(sql, [idklub])
    }
    if(!ch2){
    res.set('content-type', 'application/json');
    res.status(400)
    res.json({
      status: 'Bad Request',
      message: 'You have not listed all the needed values or have listed some of them wrong (i.e. a string instead of a number)',
      response: null
    });}
  }
})






app.put('/modify/:id(\\d+)/:brdres(\\d+)', async function (req, res, next) {
  idklub = req.params.id
  brdres=req.params.brdres
  imeklub = req.body.imeklub
  arenaklub = req.body.arenaklub
  savdrzava = req.body.savdrzava
  godosnutka = req.body.godosnutka
  imeigrac = req.body.imeigrac
  prezimeigrac = req.body.prezimeigrac
  brojdresa = req.body.brojdresa
  pozicijaigrac = req.body.pozicijaigrac
  uni_hs_club = req.body.uni_hs_club
  imetrener = req.body.imetrener
  prezimetrener = req.body.prezimetrener
  var ch = 0

  var sql_klub = "UPDATE klub SET imeklub=$1, arenaklub=$2, savdrzava=$3,godosnutka=$4 where idklub=$5";
  var sql_igrac = "UPDATE igrac SET imeigrac=$1,prezimeigrac=$2,brojdresa=$3,pozicijaigrac=$4,uni_hs_club=$5 WHERE idklub=$6 and brojdresa=$7";
  var sql_trener = "UPDATE trener SET imetrener=$1, prezimetrener=$2 where idklub=$3";
  const data_klub = db.query(sql_klub, [imeklub, arenaklub, savdrzava, godosnutka, idklub], (err, result) => {
    try {
      if (result.rowCount > 0) {
        const data_igrac = db.query(sql_igrac, [imeigrac, prezimeigrac, brojdresa, pozicijaigrac, uni_hs_club, idklub, brdres], (err, result2) => {
          try {
            if (result2.rowCount > 0) {
              const data_trener = db.query(sql_trener, [imetrener, prezimetrener, idklub], (err, result3) => {
                try {
                  if (result3.rowCount > 0) {
                    res.set('content-type', 'application/json');
                    res.status(200);
                    res.json({
                      "status": "OK",
                      "message": "DB value is now fully modified"
                    });
                  }
                }
                catch {
                  res.set('content-type', 'application/json');
                  res.status(400)
                  res.json({
                    status: 'Bad Request',
                    message: 'You have updated klub and igrac but nothing after that because you have not listed all the values in trener',
                    response: null
                  })
                }
              })
            }
          }
          catch {
            res.set('content-type', 'application/json');
            res.status(400)
            res.json({
              status: 'Bad Request',
              message: 'You have updated klub but nothing after that because you have not listed all the values in igrac',
              response: null
            })
          }
        })
      }
      else if (result.rowCount == 0) {
        res.set('content-type', 'application/json');
        res.status(404)
        res.json({
          status: 'Not Found',
          message: 'Requested item was not found in the DB',
          response: null
        });
      }
    }
    catch {
      res.set('content-type', 'application/json');
      res.status(400)
      res.json({
        status: 'Bad Request',
        message: 'You have not listed all the needed values',
        response: null
      });
    }
  });
})






app.delete('/delete/:id(\\d+)/:brojdresa(\\d+)', async function (req, res, next) {
  var idklub = req.params.id;
  var brojdresa=req.params.brojdresa
  var checknum="SELECT * FROM igrac WHERE idklub=$1"
  var chnum=0
  const datachnum=(await db.query(checknum, [idklub])).rows;
  if (datachnum.length > 1) {
    chnum=1
  }
  if(!chnum){
    const sql = "DELETE FROM klub where idklub=$1";
    const data = db.query(sql, [idklub], (err, result) => {
      if (result.rowCount > 0) {
        res.set('content-type', 'application/json');
        res.status(200);
        res.json({
          "status": "OK",
          "message": "DB value is now deleted"
        });
      }
      else {
        res.set('content-type', 'application/json');
        res.status(404)
        res.json({
          status: 'Not Found',
          message: 'Requested item was not found in the DB',
          response: null
        });
      }
    })
  }
  else if(chnum){
  const sql = "DELETE FROM igrac where idklub=$1 and brojdresa=$2";
  const data = db.query(sql, [idklub,brojdresa], (err, result) => {
    if (result.rowCount > 0) {
      res.set('content-type', 'application/json');
      res.status(200);
      res.json({
        "status": "OK",
        "message": "DB value is now deleted"
      });
    }
    else {
      res.set('content-type', 'application/json');
      res.status(404)
      res.json({
        status: 'Not Found',
        message: 'Requested item was not found in the DB',
        response: null
      });
    }
  })}
})

app.get('/openapi', async function (req, res, next) {
  try {
    const data = JSON.parse(fs.readFileSync('views/openapi.json', 'utf8'));
    res.set('content-type', 'application/json');
    res.status(200);
    res.json({
      "status": "OK",
      "message": "Fetched OpenAPI data",
      "reponse": {
        "name": "OpenAPI data",
        "OpenAPI":
          data
      }
    });
  } catch{
    res.set('content-type', 'application/json');
    res.status(404);
    res.json({
      "status": "Not Found",
      "message": "OpenAPI data not found on device",
      "reponse": null
    });
  }
})






app.use((req, res, next) => {
  res.set('content-type', 'application/json');
  res.status(501)
  res.json({
    status: 'Not Implemented',
    message: 'Method not implemented for requested resource',
    response: null
  });
});
//pokretanje poslužitelja na portu 3000
app.listen(3000);