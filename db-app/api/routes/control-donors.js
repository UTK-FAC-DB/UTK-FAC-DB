const express = require("express");
const Donor = require('../models/donor');

const router = express.Router();

//used to get donors from the server
router.get('', (req, res, next) => {
    Donor.find().then(documents => {
        res.status(200).json({ 
            message: 'Donors fetched', 
            donors: documents
        });
    });
});

module.exports = router;