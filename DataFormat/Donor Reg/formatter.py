"""
    Note the file size will be smaller than the original because
    we are compressing it by removing indents from previous format.
    This is to allow quicker upload time as we will not need to
    spot check this one.
"""
import json
import itertools
import os
import Donor_Reg_Dic as donor
from datetime import datetime

# File paths
currentPath = os.getcwd()
oldDataFile = 'Donor_Register.json'
newDataFile = 'DonorRegs.json'
newFileData = []

print('Starting formatting!')

# Get old JSON
with open(oldDataFile) as f:
  data = json.load(f)

for d in data:

    # Grab old data and throw it into new JSON
    newJSON = {
        "weightLoss" : "",
        "childhoodResidentialHistory" : "",
        "adultResidentialHistory" : "",
        "disordersMedical" : "",
        "additionalMedicalHistory": "",
        "medicalHistoryNarrative": "",
        "nextKinRelationship" : "",
        "informantPhoneNumber" : "",
        "openHeartSurgeryYear": "",
        "smokerLength": "",
        "cancerTypes" : "",
        "cancerTreatment" : "",
        "cancerLength" : "",
        "plasticSurgeryTypes" : "",
        "smokerStart": "",
        "amputationsYear" : "",
        "diabetesType" : "",
        "prostheticsDate": "",
        "fracturesTypes" : "",
        "surgeryTypes" : "",
        "dislocationsMedical" : "",
        "teethMissingAmount" : "",
        "nextKinCity" : "",
        "nextKinState" : "",
        "nextKinZip" : "",
        "informantCity" : "",
        "informantState" : "",
        "informantZip" : "",
        "lowerDentureDate" : "",
        "upperDentureDate" : "",
        "piercingLocation" : "",
        "tattooLocation" : "",
        "extensiveDentalWork" : "",
        "mostTeeth" : "",
        "partialPlate" : "",
        "bracesControl" : "",
        "bridgeControl" : "",
        "dentalDisease" : "",
        "gumDisease" : "",
        "bothDenture" : "",
        "upperDenture" : "",
        "lowerDenture" : "",
        "stateFather" : "",
        "fatherFirst" : "",
        "fatherMiddle" : "",
        "stateMother" : "",
        "motherFirst" : "",
        "motherMiddle" : "",
        "motherMaiden" : "",
        "spouseMiddle" : "",
        "spouseFirst" : "",
        "otherMedical": "",
        "selectedRace" : "other",
        "eyeColor" : "other",
        "otherDental" : "",
    }

    # Compare old keys to new and append to
    for key, value in d.items():
        if key in donor.donorKeyMap:
            if isinstance(value, str):
                newJSON[donor.donorKeyMap[key]] = value.lower()
            else:
                newJSON[donor.donorKeyMap[key]] = value

    # Fix edge cases and append to list
    newJSON = donor.format(newJSON)
    newFileData.append(newJSON)

# Saves new file
with open(newDataFile, 'w+') as outfile:

    # For testing
    #json.dump(newFileData, outfile, indent=4)

    # For production
    json.dump(newFileData, outfile)

print("Finished!")
