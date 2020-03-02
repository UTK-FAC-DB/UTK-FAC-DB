var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var DONORS_COLLECTION = "donors";
var USERS_COLLECTION = "users";

var app = express();
app.use(bodyParser.json());

var distDir = _dirname + "/dist/";
app.use(express.static(distDir));

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
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

//Donors GET by id API that finds a donor by id
app.get("/api/donors/:id", (req, res) => {
    db.collection(DONORS_COLLECTION).findOne({_id: new ObjectID(req.params.id) }, (err, doc) => {
        if (err) {
            handleError(res, err.message, "Failed to get donor");
        } else {
            res.status(200).json(doc);
        }
    })
});

//Donors PUT by id API that updates a donor by id
app.put("/api/donors/:id", (req, res) => {
    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(DONORS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, (err, doc) => {
        if (err) {
            handleError(res, err.message, "Failed to update donor");
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
});

//Donors DELETE by id API that deletes a donor by id
app.delete("/api/donors/:id", (req, res) => {
    db.collection(DONORS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)} , (err, result) => {
        if (err) {
            handleError(res, err.message, "Failed to delete donor");
        } else {
            res.status(200).json(req.params.id);
        }
    });
});

// USERS API ROUTES BELOW

//Users GET API that finds all the users
app.get("/api/users", (req, res) => {
    db.collection(USERS_COLLECTION).find({}).toArray((err, docs) => {
        if (err) {
            handleError(res, err.message, "Failed to get donors.");
        } else {
            res.status(200).json(docs);
        }
    });
})

//Users POST API that creates a new user
app.post("/api/users", (req, res) => {
    var newUser = req.body;
    newUser.createDate = new Date();

    if (!req.body.name) {
        handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {
        db.collection(USERS_COLLECTION).insertOne(newUser, (err, doc) => {
            if (err) {
                handleError(res, err.message, "Failed to create a new user.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
})