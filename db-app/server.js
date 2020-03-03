const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');
const donorsRoutes = require('./routes/donors');

const Donor = require('./models/donor');

const app = express();
var distDir = __dirname + "/dist/";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(distDir));

try {
    mongoose.connect("mongodb+srv://Default:2HKD3KU4rxGfRSwP@body-farm-db-test-ledxr.gcp.mongodb.net/live-people?retryWrites=true&w=majority").then(() => {
        var server = app.listen(process.env.PORT || 8080, () => {
            var port = server.address().port;
            console.log("App now running on port", port);
        });
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}
/*
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});*/

app.use('/api/users', userRoutes);
app.use('/api/donors', donorsRoutes);

module.exports = app;