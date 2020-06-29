"""
    Note the file size will be smaller than the original because
    we are compressing it by removing indents from previous format.
    This is to allow quicker upload time as we will not need to
    spot check this one.
"""
import json

# File paths
oldFilename = 'Inventory_Cremation.json'
newFilename = 'Cremations.json'
newFileData = []

# Get old JSON
with open(oldFilename) as f:
    data = json.load(f)

for d in data:

    # Grab old data and throw it into new JSON
    newJSON = {
        'id' : '',
    }

    # Compare old keys to new and append to
    for key, value in d.items():
        newJSON[key] = value

    # Fix edge cases and append to list
    newFileData.append(newJSON)

# Saves new file
with open(newFilename, 'w+') as outfile:

    # For testing
    json.dump(newFileData, outfile, indent=4)

    # For production
    #json.dump(newJSON, outfile)

print("Finished!")
