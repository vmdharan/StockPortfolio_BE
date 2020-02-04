var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
var dbase;

MongoClient.connect(url, (err, db) => {
    dbase = db.db("trader");
    if (err) return console.log(err);
});

/* GET home page. */
router.get('/get', async function(req, res, next) {
    var dbc = await GetSectors();
    dbc.toArray((err, results) => {
        res.send(results);
    });
  });

async function GetSectors() {
    var dbc = await dbase.collection('sector').find(true);
    return dbc;
}

router.post('/new', async function (req, res) {
    var dbc = InsertSector(req.body);
    res.end();
});

async function InsertSector(sector) {
    var dbc = dbase.collection('sector').insertOne(sector);
}

module.exports = router;