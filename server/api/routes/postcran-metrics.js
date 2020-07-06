const express = require("express");
const Item = require("../models/postcran-metrics");

const router = express.Router();

router.get('', (req, res, next) => {
    Item.find().then(documents => {
        res.status(200).json({
            message: 'Postcran Items Fetched',
            items: documents
        });
    });
});

router.post('', (req, res, next) => {
    const item = new Item(req.body);
    item.save().then(createdItem => {
        res.status(201).json({
            message: 'Item Added',
            itemId: createdItem._id
        });
    });
});

router.put('/:id', (req, res, next) => {
    Item.updateOne({_id: req.params.id}, req.body)
    .then(() => {
        res.status(200).json({message: "Updated postcran"});
    })
});

router.delete('/:id', (req, res, next) => {
    Item.findByIdAndDelete(req.params._id, (err) => {
        if (err) console.log(err);
        res.status(200).json();
    });
});

module.exports = router;