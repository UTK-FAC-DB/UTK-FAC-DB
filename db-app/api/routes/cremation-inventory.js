const express = require("express");
const Item = require("../models/cremation-inventory");

const router = express.Router();

router.get('', async (req, res, next) => {
    await Item.find().then(documents => {
        res.status(200).json({
            message: 'Cremation Items Fetched',
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
        res.status(200).json({message: "Updated cremation"});
    })
});

router.delete('/:id', (req, res, next) => {
    Item.findByIdAndDelete(req.params._id, (err) => {
        if (err) console.log(err);
        res.status(200).json();
    });
});

module.exports = router;