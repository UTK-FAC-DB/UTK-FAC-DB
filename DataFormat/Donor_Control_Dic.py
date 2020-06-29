import json

# Key conversion from old to new formats
donorKeyMap = {

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

    return newJSON

# Calls all functions to edit json files
def format(newJSON):

    newJSON = fixFormat(newJSON)

    return newJSON
