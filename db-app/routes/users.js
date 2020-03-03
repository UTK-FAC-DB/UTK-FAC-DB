const express = require("express");
const User = require("../models/user");

const router = express.Router();

//used to get users from the server
router.get('', (req, res, next) => {
    User.find().then(documents => {
        res.status(200).json({
            message: 'Users fetched',
            users: documents
        })
    })
})

//used to post users to the server
router.post('', (req, res, next) => {
    console.log("Saved new user");
    const user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        userName: req.body.userName,
        password:  req.body.password
    });
    user.save().then(createdUser => {
        res.status(201).json({
            message: "User added!",
            userId: createdUser.id
        });
    });
});

//Route used to delete a user from the server
router.delete('/:id', (req, res, next) => {
    User.findByIdAndDelete(req.param.id, (err) => {
        if(err) console.log(err);
        res.status(200).json();
    })
})

module.exports = router;