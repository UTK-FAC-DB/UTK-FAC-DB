const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    UTID: {type:String},
    DateReceived: {type:Date},
    ContactedBy: {type:String},
    ContactFacility: {type:String},
    ContactDate: {type:Date},
    DonatedBy: {type:String},
    Relationship: {type:String},
    TotalWeight: {type:Number},
    TotalWeightUnit: {type:String},
    LabWeight: {type:Number},
    InventoryWeightUnit: {type:String},
    CurrentLabWeight: {type:Number},
    CurrentLabWeightUnit: {type:String},	
    RemovedLabWeight: {type:Number},
    RemovedWeightUnit: {type:String},
    CrematedRemainsProcess: {type:String},
    ProstheticsRemoved: {type:String},
    TagPlaced_By: {type:String},
    TagPlaced_Date: {type:Date},
    ReleasedFromDept_By: {type:String},
    ReleasedFromDept_Date: {type:Date},
    ReceivedIntoCollection_By: {type:String},
    ReceivedIntoCollection_date: {type:Date}
})

module.exports = mongoose.model('Cremation-Inventory', itemSchema);