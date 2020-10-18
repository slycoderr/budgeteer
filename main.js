const express = require('express');
const path = require('path');
const mongoClient = require('mongodb').MongoClient;
const app = express();
const port = 6001;
const connStr = 'mongodb://127.0.0.1:27017';
const dbName = 'budgeteer';

app.get("/", (request, response, next) => {
    response.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/transactions", (request, response, next) => {
    mongoClient.connect(connStr, function(err, client) {
        if (err != null) {
            console.log(err.message);
        }
        else {
            const db = client.db(dbName);
            const collection = db.collection('transactions');

            collection.find({}).toArray(function(err1, docs) {
                client.close();

                if (err != null) {
                    console.log(err1.message);
                }
                else {
                    response.json(docs);
                }
            });
        }
    });
});

app.listen(port, ()=>{
    console.log("Server running on port "+port);
    console.log("pid: "+process.pid);
});