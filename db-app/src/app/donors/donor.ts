export class Donor {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    middleName: string;
    suffixName: string;
    maidenName: string;
    selectedOther: string;
    selectedSex: string;
    selectedRace: string;
    cityBirth: string;
    stateBirth: string;
    countryBirth: string;
    donationDate: string;
    livingResearch: string;
    traumaResearch: string;
    motherLast: string;
    motherFirst: string;
    motherMiddle: string;
    motherSuffix: string;
    motherMaiden: string;
    fatherLast: string;
    fatherFirst: string;
    fatherMiddle: string;
    fatherSuffix: string;
    email: string;
    phone: string;
    phoneType: string;
    streetAddress: string;
    cityAddress: string;
    stateAddress: string;
    zipAddress: string;
    countryAddress: string;
    heightFeet: string;
    heightInch: string;
    estimateHeight: string;
    weight: string;
    estimateWeight: string;
    handedness: string;
    shoesize: string;
    bloodtype: string;
    hairColor: string;
    maritalstatus: string;
    spouseLast: string;
    spouseFirst: string;
    spouseMiddle: string;
    spouseSuffix: string;
    spouseMaiden: string;
    livingSpouse: string;
    spouseDonor: string;
    childrenNumber: string;
    education: string;
    military: string;
    ecoClass: string;
    occupation: string;
    business: string;
    extDentalWork: string;
    lowerDenture: string;
    upperDenture: string;
    partialPlate: string;
    braces: string;
    mostTeeth: string;
    gumDisease: string;
    habits: string;
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