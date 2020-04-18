const express = require("express");
const Donor = require("../models/donor");

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

//used to post donors to the server
router.post('', (req, res, next) => {
    console.log("Adding new donor");
    const donor = new Donor({
        lastName:  req.body.lastName,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        suffixName: req.body.suffixName,
        maidenName: req.body.maidenName,
        selectedOther: req.body.selectedOther,
        selectedSex: req.body.selectedSex,
        selectedRace: req.body.selectedRace,
        birthDate: req.body.birthDate,
        cityBirth: req.body.cityBirth,
        stateBirth: req.body.stateBirth,
        countryBirth: req.body.countryBirth,
        donationDate: req.body.donationDate,
        livingResearch: req.body.livingResearch,
        traumaResearch: req.body.traumaResearch,
        motherLast: req.body.motherLast,
        motherFirst: req.body.motherFirst,
        motherMiddle: req.body.motherMiddle,
        motherSuffix: req.body.motherSuffix,
        motherMaiden: req.body.motherMaiden,
        fatherLast: req.body.fatherLast,
        fatherFirst: req.body.fatherFirst,
        fatherMiddle: req.body.fatherMiddle,
        fatherSuffix: req.body.fatherSuffix,
        email: req.body.email,
        phone: req.body.phone,
        phoneType: req.body.phoneType,
        streetAddress: req.body.streetAddress,
        cityAddress: req.body.cityAddress,
        stateAddress: req.body.stateAddress,
        zipAddress: req.body.zipAddress,
        countryAddress: req.body.countryAddress,
        heightFeet: req.body.heightFeet,
        heightInch: req.body.heightInch,
        estimateHeight: req.body.estimateHeight,
        weight: req.body.weight,
        estimateWeight: req.body.estimateWeight,
        handedness: req.body.handedness,
        shoesize: req.body.shoesize,
        bloodtype: req.body.bloodtype,
        hairColor: req.body.hairColor,
        maritalstatus: req.body.maritalstatus,
        spouseLast: req.body.spouseLast,
        spouseFirst: req.body.spouseFirst,
        spouseMiddle: req.body.spouseMiddle,
        spouseSuffix: req.body.spouseSuffix,
        spouseMaiden: req.body.spouseMaiden,
        livingSpouse: req.body.livingSpouse,
        spouseDonor: req.body.spouseDonor,
        childrenNumber: req.body.childrenNumber,
        education: req.body.education,
        military: req.body.military,
        ecoClass: req.body.ecoClass,
        occupation: req.body.occupation,
        business: req.body.business,
        extDentalWork: req.body.extDentalWork,
        lowerDenture: req.body.lowerDenture,
        upperDenture: req.body.upperDenture,
        partialPlate: req.body.partialPlate,
        braces: req.body.braces,
        mostTeeth: req.body.mostTeeth,
        gumDisease: req.body.gumDisease,
        habits: req.body.habits
    });
    donor.save().then(createdDonor => {
        res.status(201).json({
            message: "Donor added",
            donorId: createdDonor._id
        });
    });
});

//used to update a donor in the server
router.put('/:id', (req, res, next) => {
    Donor.updateOne({_id: req.params.id }, {
        lastName:  req.body.lastName,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        suffixName: req.body.suffixName,
        maidenName: req.body.maidenName,
        selectedOther: req.body.selectedOther,
        selectedSex: req.body.selectedSex,
        selectedRace: req.body.selectedRace,
        birthDate: req.body.birthDate,
        cityBirth: req.body.cityBirth,
        stateBirth: req.body.stateBirth,
        countryBirth: req.body.countryBirth,
        donationDate: req.body.donationDate,
        livingResearch: req.body.livingResearch,
        traumaResearch: req.body.traumaResearch,
        motherLast: req.body.motherLast,
        motherFirst: req.body.motherFirst,
        motherMiddle: req.body.motherMiddle,
        motherSuffix: req.body.motherSuffix,
        motherMaiden: req.body.motherMaiden,
        fatherLast: req.body.fatherLast,
        fatherFirst: req.body.fatherFirst,
        fatherMiddle: req.body.fatherMiddle,
        fatherSuffix: req.body.fatherSuffix,
        email: req.body.email,
        phone: req.body.phone,
        phoneType: req.body.phoneType,
        streetAddress: req.body.streetAddress,
        cityAddress: req.body.cityAddress,
        stateAddress: req.body.stateAddress,
        zipAddress: req.body.zipAddress,
        countryAddress: req.body.countryAddress,
        heightFeet: req.body.heightFeet,
        heightInch: req.body.heightInch,
        estimateHeight: req.body.estimateHeight,
        weight: req.body.weight,
        estimateWeight: req.body.estimateWeight,
        handedness: req.body.handedness,
        shoesize: req.body.shoesize,
        bloodtype: req.body.bloodtype,
        hairColor: req.body.hairColor,
        maritalstatus: req.body.maritalstatus,
        spouseLast: req.body.spouseLast,
        spouseFirst: req.body.spouseFirst,
        spouseMiddle: req.body.spouseMiddle,
        spouseSuffix: req.body.spouseSuffix,
        spouseMaiden: req.body.spouseMaiden,
        livingSpouse: req.body.livingSpouse,
        spouseDonor: req.body.spouseDonor,
        childrenNumber: req.body.childrenNumber,
        education: req.body.education,
        military: req.body.military,
        ecoClass: req.body.ecoClass,
        occupation: req.body.occupation,
        business: req.body.business,
        extDentalWork: req.body.extDentalWork,
        lowerDenture: req.body.lowerDenture,
        upperDenture: req.body.upperDenture,
        partialPlate: req.body.partialPlate,
        braces: req.body.braces,
        mostTeeth: req.body.mostTeeth,
        gumDisease: req.body.gumDisease,
        habits: req.body.habits
    }).then(result => {
        res.status(200).json({ message: "Update Success" });
    })
});

//used to delete a donor from the server
router.delete('/:id', (req, res, next) => {
    Donor.findByIdAndDelete(req.params.id, (err) => {
        if (err) console.log(err);
        res.status(200).json();
    });
});

module.exports = router;