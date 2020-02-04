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
    var dbc = await GetHoldings();
    dbc.toArray((err, results) => {
        res.send(results);
    });
  });

async function GetHoldings() {
    var dbc = await dbase.collection('holding').find(true);
    return dbc;
}

router.post('/new', async function (req, res) {
    var dbc = InsertHolding(req.body);
    res.end();
});

async function InsertHolding(transaction) {
    var dbc = dbase.collection('holding').insertOne(holding);
}

module.exports = router;