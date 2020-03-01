var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var DONORS_COLLECTION = "donors";

var app = express();
app.use(bodyParser.json());

var db;

//connect to the database prior to connecting to the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    //save the database object from the callback for reuse
    db = client.db();
    console.log("Database connection ready");

    //initialize the app
    var server = app.listen(process.env.PORT || 8080, () => {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

// DONORS API ROUTES BELOW

// generic error handler used by all endpoints
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

//Donors GET API that finds all the donors
app.get("/api/donors", (req, res) => {
    db.collection(DONORS_COLLECTION).find({}).toArray((err, docs) => {
        if (err) {
            handleError(res, err.message, "Failed to get donors.");
        } else {
            res.status(200).json(docs);
        }
    });
});

//Donors POST API that creates a new donor
app.post("/api/donors", (req, res) => {
    var newDonor = req.body;
    newDonor.createDate = new Date();

    if (!req.body.name) {
        handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {
        db.collection(DONORS_COLLECTION).insertOne(newDonor, (err, doc) => {
            if (err) {
                handleError(res, err.message, "Failed to create a new donor.");
            } else {
                res.status(201).json(doc);
            }
        });
    }
});

//Donors GET by id API that finds a donor by id
app.get("/api/donors/:id", (req, res) => {

});

//Donors PUT by id API that updates a donor by id
app.put("/api/donors/:id", (req, res) => {

});

//Donors DELETE by id API that deletes a donor by id
app.delete("/api/donors/:id", (req, res) => {

});