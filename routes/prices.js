var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
var dbase;

MongoClient.connect(url, (err, db) => {
    dbase = db.db("trader");
    if (err) return console.log(err);
});

router.post('/new', async function (req, res) {
    var dbc = UpdatePrices(req.body);
    res.end();
});

async function UpdatePrices(currentPrices) {
    var dbc = dbase.collection('prices');
    for(var i=0; i<currentPrices.length; i++) {
        dbc.insertOne(currentPrices[i]);
    }
}

module.exports = router;