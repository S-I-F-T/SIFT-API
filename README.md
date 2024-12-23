# SIFT-API
An API made in Express JS to get assignment and course informaton. The GET endpoint will return the configuration filse for the course.These files will be in a zipped folder. The user will need to provide a key to access the API. 


# Endpoints

GET: /assignment/{key} Retrieve a zipped folder for the assigment associated with {key} 

POST: /asssignment/{key} Add assignment information with the associated key

DELETE: /assignment/{key} Delete the assignment with the associated key


# Versioning
https://nordicapis.com/5-ways-to-version-apis/

The API versioning uses subdomains to implement API versioning. 
In server.ts, the version 1 router is defined as:
``` const v1SiftApi = express.Router(); ```
The ```app.use('/v1', v1SiftApi);``` mounts the v1 api router and tells the Express app to use ```v1SiftApi``` router for any requests that start with ```/v1.```   


# Storing and Retrieving
https://www.mongodb.com/docs/drivers/node/current/fundamentals/gridfs/#download-files

Using MongoDB to store files is a common practice. With the GridFS specification, one can store files more than 16 MB(Max Allowed by the BSON Format of Mongo). With GridFS, files are broken into chunks and then said chunks are combined upon retrieval allowing the ability to store larges files. Also need to self host using docker