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
router.get('/get', async function (req, res, next) {
    var dbc = await GetCompanies();
    dbc.toArray((err, results) => {
        res.send(results);
    });
});

async function GetCompanies() {
    var dbc = await dbase.collection('company').find(true);
    return dbc;
}

router.post('/new', async function (req, res) {
    var dbc = InsertCompany(req.body);
    res.end();
});

async function InsertCompany(company) {
    var dbc = dbase.collection('company').insertOne(company);
}

module.exports = router;