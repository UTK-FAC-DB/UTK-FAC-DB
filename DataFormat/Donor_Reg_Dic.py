import json

# Key conversion from old to new formats
donorKeyMap = {
        "Register_DBID": "id",
        "Orig_RegID": "origId",
        "Pictures" : "pictures", #Drop down
        "F_D": "fOrD", #Drop down
        "Policy": "policy", #Drop down
        "Web_or_Paper": "webOrPaper", #Drop down
        "ChangeCode_Register" : "changecodeRegister", #Drop down
        "LivingResearchOK" : "livingResearchOk", #Drop down
        "CloseFile": "closeFile", #Drop down
        "Other": "other", #Drop down
        "TraumaResearchOK": "traumaResearchOk", #Drop down
        "MedicalHistory" : "medicalHistory",
        "TraumaType" : "traumaType",
        "Cancer_Rx" : "cancerRx",
        "Comments" : "comments",
        "Email Address" : "emailAddress",
        "Flag": "flag", #Drop down
        "FirstName": "firstName",
        "MiddleName": "middleName",
        "Maiden_Prev_Name": "maidenName",
        "Alternate_Names": "alternativeName",
        "LastName": "lastName",
        "Suffix": "suffix",
        "Sex": "selectedSex", #Drop down
        "DOB": "birthDate",
        "DOD": "deathDate",
        "TOD": "deathTime",
        "Ancestry": "otherRace",
        "EstimatedStature_cm": "heightControl",
        "EstimatedWeight": "weightControl",
        "EstimatedWeight_Unit": "weightUnit",
        "EstimatedWeight_Text": "weightNote",
        "Handedness": "handednessControl",  #Drop down
        "ShoeSize": "shoeSize",    #Drop down
        "BloodType": "bloodType",  #Drop down
        "HairColor": "hairColor",  #Drop down
        "EyeColor": "otherEyeColor",
        "PredonorRegistrationAge": "",
        "Date_Signed": "signDate",
        "Date_Entered": "enterDate",
        "BIRTH_CITY": "cityBirth",
        "BIRTH_STATE": "stateBirth",
        "MailingStreetAddress": "homeAddress",
        "MailingCity": "cityAddress",
        "MailingState": "stateAddress",
        "MailingZip": "zipAddress",
        "MailingCityLimit": "cityLimits", #Drop down
        "MailingCounty": "countyAddress",
        "Bad_Address": "badAddress",
        "EducationLevel": "educationLevel",
        "MILITARY": "military",
        "MilitaryService": "militaryService",  #Drop down
        "ChildSocio_Economic": "socioEconomicStatus",  #Drop down
        "Tattoos": "tattooControl",
        "Tattoos_Descrip": "tattooDescription",
        "Piercings": "piercingControl",
        "Piercings_Descrip": "piercingDescription",
        "Usual_Occupation": "occupationControl",
        "Business_Industry": "industryControl",
        "HabitualActivities": "habitualActivities",
        "PHONE": "phoneNumber",
        "MaritalStatus": "maritalStatus",  #Drop down
        "SpouseName": "spouseLast",
        "SpouseLiving_YN": "spouseCondition",  #Drop down
        "NumberKids": "childrenNumber",
        "MomMaidenName": "motherLast",
        "MomBirthPlace": "cityMother",
        "DadName": "fatherLast",
        "DadBirthPlace": "cityFather",
        "SS_NUM": "socialSecurity",
        "Place_of_Death_Institution": "deathInstitution",
        "Place_of_Death_Address": "deathAddress",
        "Place_of_Death_City": "deathCity",
        "Place_of_Death_County": "deathCounty",
        "Place_of_Death_State": "deathState",
        "Place_of_Death_Zip": "deathZip",
        "Age": "ageControl",
        "Informant_Name": "informantName",
        "Informant_Relationship": "informantRelationship",
        "Informant_Address": "informantAddress",
        "Informant_email": "informantEmail",
        "Next_of_Kin": "nextKinName",
        "NoK_Address": "nextKinAddress",
        "Nok_Phone": "nextKinPhoneNumber",
        "Nok_Email": "nextKinEmail",
        "DateEntered_Bio": "bioDate",
        "DentalHistory": "dentalComments",
        "TeethMissing": "teethMissing",
        "When_Dentures": "bothDentureDate",
        "Dental_Other": "otherDentalControl",
        "SmokerYears": "smokerLength",
        "MedicalHistory_Other": "medicalContinued",
        "Surgery": "surgeryMedical",
        "Fractures": "fracturesMedical",
        "AutoAccident": "autoAccident",
        "SpinalInjuries": "spinalInjury",
        "OpenHeartSurgery": "openHeartSurgery",
        "Amputations": "amputations",
        "Prosthetics": "prostheticsControl",
        "Diabetes": "diabetesControl",
        "PlasticSurgery": "plasticSurgeryMedical",
        "Cancer": "cancerMedical",
        "Smoker": "smokerControl",
        "Alcoholism": "alcoholControl",
        "Biometrics": "biometrics",
        "Biometric Number": "biometricsNumber",
        "Email Address": "emailAddress"
}

# Fixes edge cases for needed formatting
def fixFormat(newJSON):

    if newJSON['pictures'] == 'y':
        newJSON['pictures'] = "pictures-True"
    elif newJSON['pictures'] == 'n':
        newJSON['pictures'] = "pictures-False"

    if newJSON['fOrD'] == 'f':
        newJSON['fOrD'] = "fOrD-value-F"
    elif newJSON['fOrD'] == 'd':
        newJSON['fOrD'] = "fOrD-value-D"

    if newJSON['policy'] == 'y':
        newJSON['policy'] = "policy-value-Y"
    elif newJSON['policy'] == 'a':
        newJSON['policy'] = "policy-value-A"

    if newJSON['webOrPaper'] == 'web':
        newJSON['webOrPaper'] = "webOrPaper-Web"
    elif newJSON['webOrPaper'] == 'paper':
        newJSON['webOrPaper'] = "webOrPaper-Paper"

    if newJSON['changecodeRegister'] == False:
        newJSON['changecodeRegister'] = "changecodeRegister-False"
    elif newJSON['changecodeRegister'] == True:
        newJSON['changecodeRegister'] = "changecodeRegister-True"

    if newJSON['livingResearchOk'] == True:
        newJSON['livingResearchOk'] = "livingResearchOk-True"
    elif newJSON['livingResearchOk'] == False:
        newJSON['livingResearchOk'] = "livingResearchOk-False"

    if newJSON['closeFile'] == True:
        newJSON['closeFile'] = "closeFile-True"
    elif newJSON['closeFile'] == False:
        newJSON['closeFile'] = "closeFile-False"

    if newJSON['other'] == True:
        newJSON['other'] = "other-True"
    elif newJSON['other'] == False:
        newJSON['other'] = "other-False"

    if newJSON['traumaResearchOk'] == True:
        newJSON['traumaResearchOk'] = "traumaResearchOk-True"
    elif newJSON['traumaResearchOk'] == False:
        newJSON['traumaResearchOk'] = "traumaResearchOk-False"

    if newJSON['flag'] == True:
        newJSON['flag'] = "true"
    elif newJSON['flag'] == False:
        newJSON['flag'] = "false"

    if newJSON['selectedSex'] == 'male':
        newJSON['selectedSex'] = "male-0"
    elif newJSON['selectedSex'] == 'female':
        newJSON['selectedSex'] = "female-1"

    if newJSON['handednessControl'] == 'r':
        newJSON['handednessControl'] = "right-handedness"
    elif newJSON['handednessControl'] == 'l':
        newJSON['handednessControl'] = "left-handedness"

    if not newJSON['bloodType'] is None:
        newJSON['bloodType'] = newJSON['bloodType'].lower()

    hair = ['blonde', 'black', 'brown', 'red', 'grey']
    if newJSON['hairColor'] != "" and not newJSON['hairColor'] in hair:
        newJSON['hairColor'] = "other"

    if newJSON['cityLimits'] == 'y':
        newJSON['cityLimits'] = "yes-inside-limits"
    elif newJSON['cityLimits'] == 'n':
        newJSON['cityLimits'] = "no-inside-limits"

    if newJSON['militaryService'] == True:
        newJSON['militaryService'] = "yes-military-service"
    elif newJSON['militaryService'] == False:
        newJSON['militaryService'] = "no-military-service"

    if newJSON['military'] == 'y':
        newJSON['military'] = True
    elif newJSON['military'] == 'n':
        newJSON['military'] = False

    if newJSON['socioEconomicStatus'] == 'lower middle':
        newJSON['socioEconomicStatus'] = "lower-middle"
    elif newJSON['socioEconomicStatus'] == 'upper middle':
        newJSON['socioEconomicStatus'] = "upper-middle"

    if newJSON['maritalStatus'] == 'never married':
        newJSON['maritalStatus'] = 'single'

    if newJSON['spouseCondition'] == 'y':
        newJSON['spouseCondition'] = "living-spouse-condition"
    elif newJSON['spouseCondition'] == 'n':
        newJSON['spouseCondition'] = "deceased-spouse-condition"

    if newJSON['shoeSize'] != '':
        try:
            newJSON['shoeSize'] = float(newJSON['shoeSize'])
        except:
            newJSON['shoeSize'] = ""

    if newJSON['surgeryMedical'] == False:
        newJSON['surgeryMedical'] = ""

    if newJSON['plasticSurgeryMedical'] == False:
        newJSON['plasticSurgeryMedical'] = ""

    if newJSON['fracturesMedical'] == False:
        newJSON['fracturesMedical'] = ""

    if newJSON['cancerMedical'] == False:
        newJSON['cancerMedical'] = ""

    if newJSON['autoAccident'] == False:
        newJSON['autoAccident'] = ""

    if newJSON['smokerControl'] == False:
        newJSON['smokerControl'] = ""

    if newJSON['spinalInjury'] == False:
        newJSON['spinalInjury'] = ""

    if newJSON['alcoholControl'] == False:
        newJSON['alcoholControl'] = ""

    if newJSON['openHeartSurgery'] == False:
        newJSON['openHeartSurgery'] = ""

    if newJSON['amputations'] == False:
        newJSON['amputations'] = ""

    if newJSON['diabetesControl'] == False:
        newJSON['diabetesControl'] = ""

    if newJSON['prostheticsControl'] == False:
        newJSON['prostheticsControl'] = ""

    return newJSON

# Adds info from residence file, if applicable
def addResidence(newJSON):

    # Grab file data
    with open("Donor_Residence.json") as f:
      data = json.load(f)

    # Check if ID is on files
    for d in data:
        if d['Register_DBID'] == newJSON['id']:

            # Append living history to adult residence
            newJSON['adultResidentialHistory'] = newJSON['adultResidentialHistory'] + json.dumps(d) + '\n\n'
            break

    return newJSON

# Adds info from medical dental file, if applicable
def addMedicalDental(newJSON):

    # Grab file data
    with open("Donor_MedicalDentalHx.json") as f:
      data = json.load(f)

    # Check if ID is on files
    for d in data:
        if d['Register_DBID'] == newJSON['id']:

            # Set according to the medical dental file
            if d['ExtensiveDentalWork'] == True:
                newJSON['extensiveDentalWork'] = True

            if d['LowerDentures'] == True:
                newJSON['lowerDenture'] = True
                if not d['LowerDentures_Year'] is None:
                    newJSON['lowerDentureDate'] = d['LowerDentures_Year']

            if d['UpperDentures'] == True:
                newJSON['upperDenture'] = True
                if not d['UpperDentures_Year'] is None:
                    newJSON['upperDentureDate'] = d['UpperDentures_Year']

            if d['PartialPlate'] == True:
                newJSON['partialPlate'] = True

            if d['Braces'] == True:
                newJSON['braces'] = True

            if d['Most_Teeth'] == True:
                newJSON['mostTeeth'] = True

            if d['Bridge'] == True:
                newJSON['bridge'] = True

            if d['GumDisease'] == True:
                newJSON['gumDisease'] = True

            if d['DentalDisease'] == True:
                newJSON['dentalDisease'] = True

            if d['GumDisease'] == True:
                newJSON['gumDisease'] = True

            if d['DentalOther'] == True:
                newJSON['otherDental'] = True

            if not d['TeethMissing'] is None:
                if d['TeethMissing'] == "few":
                    newJSON['teethMissingAmount'] = "few-teeth-missing"
                if d['TeethMissing'] == "many":
                    newJSON['teethMissingAmount'] = "many-teeth-missing"
                if d['TeethMissing'] == "all":
                    newJSON['teethMissingAmount'] = "all-teeth-missing"

            if d['Surgery'] == True:
                newJSON['surgeryMedical'] = True
                if not d['SurgeryGeneral_Comments'] is None:
                    newJSON['surgeryTypes'] = d['SurgeryGeneral_Comments']

            if d['Fractures'] == True:
                newJSON['fracturesMedical'] = True
                if not d['Fractures_Comments'] is None:
                    newJSON['fracturesTypes'] = d['Fractures_Comments']

            if d['AutoAccident'] == True:
                newJSON['autoAccident'] = True

            if d['Spinalinjuries'] == True:
                newJSON['spinalInjury'] = True

            if d['Dislocations'] == True:
                newJSON['dislocationsMedical'] = True

            if d['OpenHeartSurgery'] == True:
                newJSON['openHeartSurgery'] = True
                if not d['OpenHeartSurgery_Year'] is None:
                    newJSON['openHeartSurgeryYear'] = d['OpenHeartSurgery_Year']

            if d['Amputations'] == True:
                newJSON['amputations'] = True
                if not d['Amputations_Year'] is None:
                    newJSON['amputationsYear'] = d['Amputations_Year']

            if d['Prosthetics'] == True:
                newJSON['prostheticsControl'] = True
                if not d['Prosthetics_Year'] is None:
                    newJSON['prostheticsDate'] = d['Prosthetics_Year']

            if d['PlasticSurgery'] == True:
                newJSON['plasticSurgeryMedical'] = True
                if not d['PlasticSurgery_Comments'] is None:
                    newJSON['plasticSurgeryTypes'] = d['PlasticSurgery_Comments']

            if d['Cancer'] == True:
                newJSON['cancerMedical'] = True
                if not d['CancerType'] is None:
                    newJSON['cancerTypes'] = d['PlasticSurgery_Comments']
                if not d['CancerTreatment'] is None:
                    newJSON['cancerTreatment'] = d['PlasticSurgery_Comments']
                if not d['Cancer_LengthofIllness'] is None:
                    newJSON['cancerLength'] = d['PlasticSurgery_Comments']

            if d['Smoker'] == True:
                newJSON['smokerControl'] = True
                if not d['Smoker_Duration'] is None:
                    newJSON['smokerLength'] = d['Smoker_Duration']
                if not d['Smoker_YearStarted'] is None:
                    newJSON['smokerStart'] = d['Smoker_YearStarted']

            if d['Alcoholism'] == True:
                newJSON['alcoholControl'] = True

            if d['Diabetes'] == True:
                newJSON['diabetesControl'] = True
                if not d['Diabetes_Type'] is None:
                    newJSON['diabetesType'] = d['Diabetes_Type']

            if not d['MedicalOther'] is None:
                newJSON['disordersMedical'] = d['MedicalOther']

            if not d['AdditionalMedicalHistory'] is None:
                newJSON['additionalMedicalHistory'] = d['AdditionalMedicalHistory']

            if not d['MedicalHistory_Narrative'] is None:
                newJSON['medicalHistoryNarrative'] = d['MedicalHistory_Narrative']

            break

    return newJSON

# Adds info from next of kin and informant file, if applicable
def addNokInformant(newJSON):

    # Grab file data
    with open("Donor_Informant_NoK.json") as f:
      data = json.load(f)

    # Check if ID is on files
    for d in data:
        if d['Register_DBID'] == newJSON['id']:

            if d['Type'] == "Next of Kin":

                if not d['FullName'] is None:
                    newJSON['nextKinName'] = d['FullName']

                if not d['Relationship'] is None:
                    newJSON['nextKinRelationship'] = d['Relationship']

                if not d['StreetAddress'] is None:
                    newJSON['nextKinAddress'] = d['StreetAddress']

                if not d['City'] is None:
                    newJSON['nextKinCity'] = d['City']

                if not d['State'] is None:
                    newJSON['nextKinState'] = d['State']

                if not d['Zip'] is None:
                    newJSON['nextKinZip'] = d['Zip']

                if not d['Email'] is None:
                    newJSON['nextKinEmail'] = d['Email']

                if not d['Phone'] is None:
                    newJSON['nextKinPhoneNumber'] = d['Phone']

            if d['Type'] == "Informant":

                if not d['FullName'] is None:
                    newJSON['informantName'] = d['FullName']

                if not d['Relationship'] is None:
                    newJSON['informantRelationship'] = d['Relationship']

                if not d['StreetAddress'] is None:
                    newJSON['informantAddress'] = d['StreetAddress']

                if not d['City'] is None:
                    newJSON['informantCity'] = d['City']

                if not d['State'] is None:
                    newJSON['informantState'] = d['State']

                if not d['Zip'] is None:
                    newJSON['informantZip'] = d['Zip']

                if not d['Email'] is None:
                    newJSON['informantEmail'] = d['Email']

                if not d['Phone'] is None:
                    newJSON['informantPhoneNumber'] = d['Phone']



    return newJSON

# Calls all functions to edit json files
def format(newJSON):

    newJSON = fixFormat(newJSON)
    newJSON = addResidence(newJSON)
    newJSON = addMedicalDental(newJSON)
    newJSON = addNokInformant(newJSON)

    #remove ssn for now
    newJSON['socialSecurity'] = ""

    return newJSON
