/*
tut explaining the whole process of authentication:
https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d


-- Will need to refactor the final product to interact with Mongo instead of a json file, but that should be relatively easy to do -- just replicate the structure from the JSON file in a schema in the /models folder for users.
    Don't forget to look into what's needed to store session info in a DB as well (make this a field in the user model?) - he sets this up using 'session-store' middleware, which he uses to create a sessions folder locally (which causes nodemon to restart the server, which he then manually has nodemon ignore). 

AUTHENTICATION
I believe the way to set up the login/auth process is to get the user info (e.g. from login page), then save them as variables, and then interpolate/concatenate them into the db connection uri...
How to save them in the first place? I'm guessing you'd maybe need to connect with a write-only account? Or admin account, and then log out immediately (in the same function), then log in the new user?

OKAY..so after reading the task requirements, all that's needed is to allow users to SIGN IN. They don't need to create accounts or log out. 
    So based on this, all that's required is to parse the url data sent with the form submission in the login screen and match that to what's in the database. 
    Could probably even leave off the bcrypt addition for now. 

Another helpful auth info source (get current user info): https://stackoverflow.com/questions/39443459/display-specific-information-for-logged-in-user-in-express-js-mongodb

OTHER
I will need to create a user field in the tasks model, and then run a check to see if it matches the current user before displaying or editing it. 

ROUTING
I have set up user.routes and task.routes that will allow DB manipulation using urls (CRUD).
Will need to set up a user controller file or add it to the existing controller file.

CONTROLLERS
I will probably have to add some more logic into both the controller files to pull the data from the webpages as opposed to the URL (or make sure the submit action sends the correct url string to perform the desired action..e.g. create task should send the title and contents)


GENERAL GUIDE TO EXPRESS/NODE
https://medium.freecodecamp.org/how-to-write-a-production-ready-node-and-express-app-f214f0b17d8c

Another basic CRUD app: 
https://www.sitepoint.com/build-simple-beginner-app-node-bootstrap-mongodb/

Older tut on Todo app: 
https://webapplog.com/todo-app-with-express-jsnode-js-and-mongodb/

todo that uses vue
https://dev.to/abiodunjames/build-a-todo-app-with-nodejs-expressjs-mongodb-and-vuejs--part-1--29n7

Another todo-like, good beginner one with lots of explanation
https://zellwk.com/blog/crud-express-mongodb/
*/