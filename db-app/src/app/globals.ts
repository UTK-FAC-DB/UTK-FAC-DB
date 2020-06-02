import { Injectable } from "@angular/core";

@Injectable()
export class Globals {

    // For local testing
    URL: string = 'http://localhost:8080';
    
    // For production
    //URL: string = '';

    donorHeaders :string[] = [
        "id",
        "firstName",
        "lastName",
        "birthDate",
        "middleName",
        "suffixName",
        "maidenName",
        "selectedOther",
        "selectedSex",
        "selectedRace",
        "cityBirth",
        "stateBirth",
        "countryBirth",
        "donationDate",
        "livingResearch",
        "traumaResearch",
        "motherLast",
        "motherFirst",
        "motherMiddle",
        "motherSuffix",
        "motherMaiden",
        "fatherLast",
        "fatherFirst",
        "fatherMiddle",
        "fatherSuffix",
        "email",
        "phone",
        "phoneType",
        "streetAddress",
        "cityAddress",
        "stateAddress",
        "zipAddress",
        "countryAddress",
        "heightFeet",
        "heightInch",
        "estimateHeight",
        "weight",
        "estimateWeight",
        "handedness",
        "shoesize",
        "bloodtype",
        "hairColor",
        "maritalstatus",
        "spouseLast",
        "spouseFirst",
        "spouseMiddle",
        "spouseSuffix",
        "spouseMaiden",
        "livingSpouse",
        "spouseDonor",
        "childrenNumber",
        "education",
        "military",
        "ecoClass",
        "occupation",
        "business",
        "extDentalWork",
        "lowerDenture",
        "upperDenture",
        "partialPlate",
        "braces",
        "mostTeeth",
        "gumDisease",
        "habits",
    ];

} 