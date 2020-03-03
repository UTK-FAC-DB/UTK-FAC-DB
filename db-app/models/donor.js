const mongoose = require('mongoose');

const donorSchema = mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true},
    middleName: { type: String },
    suffixName: { type: String },
    maidenName: { type: String },
    selectedOther: { type: String },
    selectedSex: { type: String },
    selectedRace: { type: String },
    birthDate: { type: Date },
    cityBirth: { type: String },
    stateBirth: { type: String },
    countryBirth: { type: String },
    donationDate: { type: Date },
    livingResearch: { type: String },
    traumaResearch: { type: String },
    motherLast: { type: String },
    motherFirst: { type: String },
    motherMiddle: { type: String },
    motherSuffix: { type: String },
    motherMaiden: { type: String },
    fatherLast: { type: String },
    fatherFirst: { type: String },
    fatherMiddle: { type: String },
    fatherSuffix: { type: String },
    email: { type: String },
    phone: { type: String },
    phoneType: { type: String },
    streetAddress: { type: String },
    cityAddress: {type: String },
    stateAddress: { type: String },
    zipAddress: { type: String },
    countryAddress: { type: String },
    heightFeet: { type: String },
    heightInch: { type: String },
    estimateHeight: { type: String },
    weight: { type: String },
    estimateWeight: { type: String },
    handedness: {type: String},
    shoesize: { type: String },
    bloodtype: { type: String },
    hairColor: { type: String },
    maritalstatus: { type: String },
    spouseLast: { type: String },
    spouseFirst: { type: String },
    spouseMiddle: { type: String },
    spouseSuffix: { type: String },
    spouseMaiden: { type: String },
    livingSpouse: { type: String },
    spouseDonor: { type: String },
    childrenNumber: { type: String },
    education: { type: String },
    military: { type: String },
    ecoClass: { type: String },
    occupation: { type: String },
    business: { type: String },
    extDentalWork: { type: String },
    lowerDenture: { type: String },
    upperDenture: { type: String },
    partialPlate: { type: String },
    braces: { type: String },
    mostTeeth: { type: String },
    gumDisease: { type: String },
    habits: { type: String }
});

module.exports = mongoose.model('Donor', donorSchema);