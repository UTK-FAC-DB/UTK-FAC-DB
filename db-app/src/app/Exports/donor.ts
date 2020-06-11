export class Donor {
    id: string;
    lastName: string;
    firstName: string;
    middleName: string;
    selectedSex: string;
    socialSecurity: string;
    selectedRace: string;
    otherRace: string;
    birthDate: Date;
    ageControl: string;
    cityBirth: string;
    stateBirth: string;
    homeAddress: string;
    cityAddress: string;
    countyAddress: string;
    stateAddress: string;
    zipAddress: string;
    phoneNumber: string;
    cityLimits: string;
    motherLast: string;
    motherFirst: string;
    motherMiddle: string;
    motherMaiden: string;
    cityMother: string;
    stateMother: string;
    fatherLast: string;
    fatherFirst: string;
    fatherMiddle: string;
    cityFather: string;
    stateFather: string;
    heightControl: string;
    weightControl: string;
    weightLoss: string;
    handednessControl: string;
    shoeSize: string;
    bloodType: string;
    hairColor: string;
    maritalStatus: string;
    spouseLast: string;
    spouseFirst: string;
    spouseMiddle: string;
    spouseCondition: string;
    childrenNumber: string;
    educationLevel: string;
    militaryService: string;
    socioEconomicStatus: string;
    occupationControl: string;
    industryControl: string;
    childhoodResidentialHistory: string;
    adultResidentialHistory: string;
    extensiveDentalWork: string;
    mostTeeth: string;
    teethMissing: string;
    teethMissingAmount: string;
    lowerDenture: string;
    lowerDentureDate: string;
    upperDenture: string;
    upperDentureDate: string;
    bothDenture: string;
    bothDentureDate: string;
    partialPlate: string;
    bracesControl: string;
    bridgeControl: string;
    gumDisease: string;
    dentalDisease: string;
    otherDentalControl: string;
    otherDental: string;
    surgeryMedical: string;
    surgeryTypes: string;
    plasticSurgeryMedical: string;
    plasticSurgeryTypes: string;
    fracturesMedical: string;
    fracturesTypes: string;
    cancerMedical: string;
    cancerTypes: string;
    cancerTreatment: string;
    cancerLength: string;
    autoAccident: string;
    smokerControl: string;
    smokerLength: string;
    spinalInjury: string;
    alcoholControl: string;
    openHeartSurgery: string;
    amputations: string;
    diabetesControl: string;
    diabetesType: string;
    prostheticsControl: string;
    prostheticsDate: string;
    disordersMedical: string;
    medicalContinued: string;
    habitualActivities: string;
    eyeColor: string;
    otherEyeColor: string;
    tattooControl: string;
    tattooDescription: string;
    tattooLocation: string;
    piercingControl: string;
    piercingDescription: string;
    piercingLocation: string;
    nextKinName: string;
    nextKinRelationship: string;
    nextKinAddress: string;
    nextKinPhoneNumber: string;
    nextKinCity: string;
    nextKinState: string;
    nextKinZip: string;
    nextKinEmail: string;
    informantName: string;
    informantRelationship: string;
    informantAddress: string;
    informantPhoneNumber: string;
    informantCity: string;
    informantState: string;
    informantZip: string;
    informantEmail: string;
}

export interface TrueFalse {
    value: string;
    viewValue: string;
}

export interface EducationLevels {
    value: string;
    viewValue: string;
}
  
export interface AncestryRaceList {
    value: string;
    viewValue: string;
}
  
export interface HeightInFeet {
    value: number;
    viewValue: string;
}
  
export interface HeightInInches {
    value: number;
    viewValue: string;
}
  
export interface ShoeSizeRange {
    value: number;
    viewValue: string;
}
  
export interface BloodTypes {
    value: string;
    viewValue: string;
}
  
export interface HairColors {
    value: string;
    viewValue: string;
}
  
export interface MaritalStatus {
    value: string;
    viewValue: string;
}
  
export interface SocialClass {
    value: string;
    viewValue: string;
}