# Mongo import script
# WILL EXECUTE IN CURRENT DIRECTORY WHEN CALLED!

# Mongo flags meaning:
# --db = Which database to push to (The container for collections)
# --collection = Which collection to push to (The collection in db)

# Loop through directory to push all json files
for file in *.json
do

 # Setting collection name
 #COLLECTION=$(echo "$file" | cut -d'.' -f 1)
 printf "Pushing %s\n" "$file"

 # Push to mongo
 mongoimport --host body-farm-db-test-shard-0/body-farm-db-test-shard-00-00-ledxr.gcp.mongodb.net:27017,body-farm-db-test-shard-00-01-ledxr.gcp.mongodb.net:27017,body-farm-db-test-shard-00-02-ledxr.gcp.mongodb.net:27017 --ssl --username ahchoi1005 --password utkcs340 --authenticationDatabase admin --db live-people --collection "cremation-inventories" --type json --file "$file" --jsonArray

done
