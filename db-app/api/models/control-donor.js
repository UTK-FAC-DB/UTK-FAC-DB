const mongoose = require('mongoose');

const donorSchema = mongoose.Schema({
    flag: {type:String},
    signDate: {type:String},
    enterDate: {type:String},
    lastName: {type:String},
    firstName: {type:String},
    middleName: {type:String},
    selectedSex: {type:String},
    maidenName: {type:String},
    alternativeName: {type:String},
    suffix: {type:String},
    socialSecurity: {type:String},
    selectedRace: {type:String},
    otherRace: {type:String},
    birthDate: {type:Date},
    ageControl: {type:String},
    cityBirth: {type:String},
    stateBirth: {type:String},
    homeAddress: {type:String},
    cityAddress: {type:String},
    countyAddress: {type:String},
    stateAddress: {type:String},
    zipAddress: {type:String},
    phoneNumber: {type:String},
    emailAddress: {type:String},
    cityLimits: {type:String},
    badAddress: {type:String},
    motherLast: {type:String},
    motherFirst: {type:String},
    motherMiddle: {type:String},
    motherMaiden: {type:String},
    cityMother: {type:String},
    stateMother: {type:String},
    fatherLast: {type:String},
    fatherFirst: {type:String},
    fatherMiddle: {type:String},
    cityFather: {type:String},
    stateFather: {type:String},
    heightControl: {type:String},
    weightControl: {type:String},
    weightLoss: {type:String},
    weightUnit: {type:String},
    weightNote: {type:String},
    handednessControl: {type:String},
    shoeSize: {type:String},
    bloodType: {type:String},
    hairColor: {type:String},
    maritalStatus: {type:String},
    spouseLast: {type:String},
    spouseFirst: {type:String},
    spouseMiddle: {type:String},
    spouseCondition: {type:String},
    childrenNumber: {type:String},
    educationLevel: {type:String},
    militaryService: {type:String},
    military: {type:String},
    socioEconomicStatus: {type:String},
    occupationControl: {type:String},
    industryControl: {type:String},
    childhoodResidentialHistory: {type:String},
    adultResidentialHistory: {type:String},
    extensiveDentalWork: {type:String},
    mostTeeth: {type:String},
    teethMissing: {type:String},
    teethMissingAmount: {type:String},
    lowerDenture: {type:String},
    lowerDentureDate: {type:String},
    upperDenture: {type:String},
    upperDentureDate: {type:String},
    bothDenture: {type:String},
    bothDentureDate: {type:String},
    partialPlate: {type:String},
    bracesControl: {type:String},
    bridgeControl: {type:String},
    gumDisease: {type:String},
    dentalDisease: {type:String},
    otherDentalControl: {type:String},
    otherDental: {type:String},
    surgeryMedical: {type:String},
    surgeryTypes: {type:String},
    plasticSurgeryMedical: {type:String},
    plasticSurgeryTypes: {type:String},
    fracturesMedical: {type:String},
    fracturesTypes: {type:String},
    cancerMedical: {type:String},
    cancerTypes: {type:String},
    cancerTreatment: {type:String},
    cancerLength: {type:String},
    autoAccident: {type:String},
    smokerControl: {type:String},
    smokerLength: {type:String},
    spinalInjury: {type:String},
    alcoholControl: {type:String},
    openHeartSurgery: {type:String},
    amputations: {type:String},
    diabetesControl: {type:String},
    diabetesType: {type:String},
    prostheticsControl: {type:String},
    prostheticsDate: {type:String},
    disordersMedical: {type:String},
    medicalContinued: {type:String},
    habitualActivities: {type:String},
    eyeColor: {type:String},
    otherEyeColor: {type:String},
    biometrics: {type:String},
    biometricsNumber: {type:String},
    bioDate: {type:Date},
    dentalComments: {type:String},
    fOrD: {type:String},
    policy: {type:String},
    webOrPaper: {type:String},
    changecodeRegister: {type:String},
    livingResearchOk: {type:String},
    closeFile: {type:String},
    pictures: {type:String},
    other: {type:String},
    traumaResearchOk: {type:String},
    medicalHistory: {type:String},
    traumaType: {type:String},
    cancerRx: {type:String},
    comments: {type:String},
    tattooControl: {type:String},
    tattooDescription: {type:String},
    tattooLocation: {type:String},
    piercingControl: {type:String},
    piercingDescription: {type:String},
    piercingLocation: {type:String},
    nextKinName: {type:String},
    nextKinRelationship: {type:String},
    nextKinAddress: {type:String},
    nextKinPhoneNumber: {type:String},
    nextKinCity: {type:String},
    nextKinState: {type:String},
    nextKinZip: {type:String},
    nextKinEmail: {type:String},
    informantName: {type:String},
    informantRelationship: {type:String},
    informantAddress: {type:String},
    informantPhoneNumber: {type:String},
    informantCity: {type:String},
    informantState: {type:String},
    informantZip: {type:String},
    informantEmail: {type:String},
    deathDate: {type:Date},
    deathInstitution: {type:String},
    deathAddress: {type:String},
    deathCity: {type:String},
    deathCounty: {type:String},
    deathState: {type:String},
    deathZip: {type:String},
    deathTime: {type:String}
});

module.exports = mongoose.model('Control-Donor', donorSchema);