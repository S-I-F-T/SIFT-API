# SIFT-API
An API made in Express JS to get assignment and course informaton. The GET endpoint will return the configuration filse for the course.These files will be in a zipped folder. The user will need to provide a key to access the API. 


# Endpoints

GET: /assignment/{key} Retrieve a zipped folder for the assigment associated with {key} 

POST: /asssignment/{key} Add assignment information with the associated key

DELETE: /assignment/{key} Delete the assignment with th
