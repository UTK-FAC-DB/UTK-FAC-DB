const express = require("express");
const Donor = require("../models/control-donor");

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
        flag: req.body.flag,
        signDate: req.body.signDate,
        enterDate: req.body.enterDate,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        selectedSex: req.body.selectedSex,
        maidenName: req.body.maidenName,
        alternativeName: req.body.alternativeName,
        suffix: req.body.suffix,
        socialSecurity: req.body.socialSecurity,
        selectedRace: req.body.selectedRace,
        otherRace: req.body.otherRace,
        birthDate: req.body.birthDate,
        ageControl: req.body.ageControl,
        cityBirth: req.body.cityBirth,
        stateBirth: req.body.stateBirth,
        homeAddress: req.body.homeAddress,
        cityAddress: req.body.cityAddress,
        countyAddress: req.body.countyAddress,
        stateAddress: req.body.stateAddress,
        zipAddress: req.body.zipAddress,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress,
        cityLimits: req.body.cityLimits,
        badAddress: req.body.badAddress,
        motherLast: req.body.motherLast,
        motherFirst: req.body.motherFirst,
        motherMiddle: req.body.motherMiddle,
        motherMaiden: req.body.motherMaiden,
        cityMother: req.body.cityMother,
        stateMother: req.body.stateMother,
        fatherLast: req.body.fatherLast,
        fatherFirst: req.body.fatherFirst,
        fatherMiddle: req.body.fatherMiddle,
        cityFather: req.body.cityFather,
        stateFather: req.body.stateFather,
        heightControl: req.body.heightControl,
        weightControl: req.body.weightControl,
        weightUnit: req.body.weightUnit,
        weightNote: req.body.weightNote,
        weightLoss: req.body.weightLoss,
        handednessControl: req.body.handednessControl,
        shoeSize: req.body.shoeSize,
        bloodType: req.body.bloodType,
        hairColor: req.body.hairColor,
        maritalStatus: req.body.maritalStatus,
        spouseLast: req.body.spouseLast,
        spouseFirst: req.body.spouseFirst,
        spouseMiddle: req.body.spouseMiddle,
        spouseCondition: req.body.spouseCondition,
        childrenNumber: req.body.childrenNumber,
        educationLevel: req.body.educationLevel,
        militaryService: req.body.militaryService,
        military: req.body.military,
        socioEconomicStatus: req.body.socioEconomicStatus,
        occupationControl: req.body.occupationControl,
        industryControl: req.body.industryControl,
        childhoodResidentialHistory: req.body.childhoodResidentialHistory,
        adultResidentialHistory: req.body.adultResidentialHistory,
        extensiveDentalWork: req.body.extensiveDentalWork,
        mostTeeth: req.body.mostTeeth,
        teethMissing: req.body.teethMissing,
        teethMissingAmount: req.body.teethMissingAmount,
        lowerDenture: req.body.lowerDenture,
        lowerDentureDate: req.body.lowerDentureDate,
        upperDenture: req.body.upperDenture,
        upperDentureDate: req.body.upperDentureDate,
        bothDenture: req.body.bothDenture,
        bothDentureDate: req.body.bothDentureDate,
        partialPlate: req.body.partialPlate,
        bracesControl: req.body.bracesControl,
        bridgeControl: req.body.bridgeControl,
        gumDisease: req.body.gumDisease,
        dentalDisease: req.body.dentalDisease,
        otherDentalControl: req.body.otherDentalControl,
        otherDental: req.body.otherDental,
        surgeryMedical: req.body.surgeryMedical,
        surgeryTypes: req.body.surgeryTypes,
        plasticSurgeryMedical: req.body.plasticSurgeryMedical,
        plasticSurgeryTypes: req.body.plasticSurgeryTypes,
        fracturesMedical: req.body.fracturesMedical,
        fracturesTypes: req.body.fracturesTypes,
        cancerMedical: req.body.cancerMedical,
        cancerTypes: req.body.cancerTypes,
        cancerTreatment: req.body.cancerTreatment,
        cancerLength: req.body.cancerLength,
        autoAccident: req.body.autoAccident,
        smokerControl: req.body.smokerControl,
        smokerLength: req.body.smokerLength,
        spinalInjury: req.body.spinalInjury,
        alcoholControl: req.body.alcoholControl,
        openHeartSurgery: req.body.openHeartSurgery,
        amputations: req.body.amputations,
        diabetesControl: req.body.diabetesControl,
        diabetesType: req.body.diabetesType,
        prostheticsControl: req.body.prostheticsControl,
        prostheticsDate: req.body.prostheticsDate,
        disordersMedical: req.body.disordersMedical,
        medicalContinued: req.body.medicalContinued,
        habitualActivities: req.body.habitualActivities,
        eyeColor: req.body.eyeColor,
        otherEyeColor: req.body.otherEyeColor,
        biometrics: req.body.biometrics,
        biometricsNumber: req.body.biometrics,
        bioDate: req.body.bioDate,
        tattooControl: req.body.tattooControl,
        tattooDescription: req.body.tattooDescription,
        tattooLocation: req.body.tattooLocation,
        piercingControl: req.body.piercingControl,
        piercingDescription: req.body.piercingDescription,
        piercingLocation: req.body.piercingLocation,
        nextKinName: req.body.nextKinName,
        nextKinRelationship: req.body.nextKinRelationship,
        nextKinAddress: req.body.nextKinAddress,
        nextKinPhoneNumber: req.body.nextKinPhoneNumber,
        nextKinCity: req.body.nextKinCity,
        nextKinState: req.body.nextKinState,
        nextKinZip: req.body.nextKinZip,
        nextKinEmail: req.body.nextKinEmail,
        informantName: req.body.informantName,
        informantRelationship: req.body.informantRelationship,
        informantAddress: req.body.informantAddress,
        informantPhoneNumber: req.body.informantPhoneNumber,
        informantCity: req.body.informantCity,
        informantState: req.body.informantState,
        informantZip: req.body.informantZip,
        informantEmail: req.body.informantEmail,
        deathDate: req.body.deathDate,
        deathInstitution: req.body.deathInstitution,
        deathAddress: req.body.deathAddress,
        deathCity: req.body.deathCity,
        deathCounty: req.body.deathCounty,
        deathState: req.body.deathState,
        deathZip: req.body.deathZip,
        deathTime: req.body.deathTime
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
        flag: req.body.flag,
        signDate: req.body.signDate,
        enterDate: req.body.enterDate,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        selectedSex: req.body.selectedSex,
        maidenName: req.body.maidenName,
        alternativeName: req.body.alternativeName,
        suffix: req.body.suffix,
        socialSecurity: req.body.socialSecurity,
        selectedRace: req.body.selectedRace,
        otherRace: req.body.otherRace,
        birthDate: req.body.birthDate,
        ageControl: req.body.ageControl,
        cityBirth: req.body.cityBirth,
        stateBirth: req.body.stateBirth,
        homeAddress: req.body.homeAddress,
        cityAddress: req.body.cityAddress,
        countyAddress: req.body.countyAddress,
        stateAddress: req.body.stateAddress,
        zipAddress: req.body.zipAddress,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress,
        cityLimits: req.body.cityLimits,
        badAddress: req.body.badAddress,
        motherLast: req.body.motherLast,
        motherFirst: req.body.motherFirst,
        motherMiddle: req.body.motherMiddle,
        motherMaiden: req.body.motherMaiden,
        cityMother: req.body.cityMother,
        stateMother: req.body.stateMother,
        fatherLast: req.body.fatherLast,
        fatherFirst: req.body.fatherFirst,
        fatherMiddle: req.body.fatherMiddle,
        cityFather: req.body.cityFather,
        stateFather: req.body.stateFather,
        heightControl: req.body.heightControl,
        weightControl: req.body.weightControl,
        weightUnit: req.body.weightUnit,
        weightNote: req.body.weightNote,
        weightLoss: req.body.weightLoss,
        handednessControl: req.body.handednessControl,
        shoeSize: req.body.shoeSize,
        bloodType: req.body.bloodType,
        hairColor: req.body.hairColor,
        maritalStatus: req.body.maritalStatus,
        spouseLast: req.body.spouseLast,
        spouseFirst: req.body.spouseFirst,
        spouseMiddle: req.body.spouseMiddle,
        spouseCondition: req.body.spouseCondition,
        childrenNumber: req.body.childrenNumber,
        educationLevel: req.body.educationLevel,
        militaryService: req.body.militaryService,
        military: req.body.military,
        socioEconomicStatus: req.body.socioEconomicStatus,
        occupationControl: req.body.occupationControl,
        industryControl: req.body.industryControl,
        childhoodResidentialHistory: req.body.childhoodResidentialHistory,
        adultResidentialHistory: req.body.adultResidentialHistory,
        extensiveDentalWork: req.body.extensiveDentalWork,
        mostTeeth: req.body.mostTeeth,
        teethMissing: req.body.teethMissing,
        teethMissingAmount: req.body.teethMissingAmount,
        lowerDenture: req.body.lowerDenture,
        lowerDentureDate: req.body.lowerDentureDate,
        upperDenture: req.body.upperDenture,
        upperDentureDate: req.body.upperDentureDate,
        bothDenture: req.body.bothDenture,
        bothDentureDate: req.body.bothDentureDate,
        partialPlate: req.body.partialPlate,
        bracesControl: req.body.bracesControl,
        bridgeControl: req.body.bridgeControl,
        gumDisease: req.body.gumDisease,
        dentalDisease: req.body.dentalDisease,
        otherDentalControl: req.body.otherDentalControl,
        otherDental: req.body.otherDental,
        surgeryMedical: req.body.surgeryMedical,
        surgeryTypes: req.body.surgeryTypes,
        plasticSurgeryMedical: req.body.plasticSurgeryMedical,
        plasticSurgeryTypes: req.body.plasticSurgeryTypes,
        fracturesMedical: req.body.fracturesMedical,
        fracturesTypes: req.body.fracturesTypes,
        cancerMedical: req.body.cancerMedical,
        cancerTypes: req.body.cancerTypes,
        cancerTreatment: req.body.cancerTreatment,
        cancerLength: req.body.cancerLength,
        autoAccident: req.body.autoAccident,
        smokerControl: req.body.smokerControl,
        smokerLength: req.body.smokerLength,
        spinalInjury: req.body.spinalInjury,
        alcoholControl: req.body.alcoholControl,
        openHeartSurgery: req.body.openHeartSurgery,
        amputations: req.body.amputations,
        diabetesControl: req.body.diabetesControl,
        diabetesType: req.body.diabetesType,
        prostheticsControl: req.body.prostheticsControl,
        prostheticsDate: req.body.prostheticsDate,
        disordersMedical: req.body.disordersMedical,
        medicalContinued: req.body.medicalContinued,
        habitualActivities: req.body.habitualActivities,
        eyeColor: req.body.eyeColor,
        otherEyeColor: req.body.otherEyeColor,
        biometrics: req.body.biometrics,
        biometricsNumber: req.body.biometrics,
        bioDate: req.body.bioDate,
        tattooControl: req.body.tattooControl,
        tattooDescription: req.body.tattooDescription,
        tattooLocation: req.body.tattooLocation,
        piercingControl: req.body.piercingControl,
        piercingDescription: req.body.piercingDescription,
        piercingLocation: req.body.piercingLocation,
        nextKinName: req.body.nextKinName,
        nextKinRelationship: req.body.nextKinRelationship,
        nextKinAddress: req.body.nextKinAddress,
        nextKinPhoneNumber: req.body.nextKinPhoneNumber,
        nextKinCity: req.body.nextKinCity,
        nextKinState: req.body.nextKinState,
        nextKinZip: req.body.nextKinZip,
        nextKinEmail: req.body.nextKinEmail,
        informantName: req.body.informantName,
        informantRelationship: req.body.informantRelationship,
        informantAddress: req.body.informantAddress,
        informantPhoneNumber: req.body.informantPhoneNumber,
        informantCity: req.body.informantCity,
        informantState: req.body.informantState,
        informantZip: req.body.informantZip,
        informantEmail: req.body.informantEmail,
        deathDate: req.body.deathDate,
        deathInstitution: req.body.deathInstitution,
        deathAddress: req.body.deathAddress,
        deathCity: req.body.deathCity,
        deathCounty: req.body.deathCounty,
        deathState: req.body.deathState,
        deathZip: req.body.deathZip,
        deathTime: req.body.deathTime
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