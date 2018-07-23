# MEANSurveys
MEANSurveys is a project developed as part of an assignment at HSNR University of Applied Science.

# What it does
The task at hand was to create a RESTful backend service with a (MongoDB-) database, aswell as 
a client to create simple surveys.

As an admin you're supposed to have the ability to create surveys, that in turn are answered by the users of
the application.

With respect to our assignment, there are two scenarios we have to consider:
1. The ability to create a survey as a set of questions with corresponding answer possibilities.
2. The ability to create a survey as described in 1. that can only be answered for a limited period of time.

# How does it work
The app is powered by a RESTful backend based on [NodeJS](https://nodejs.org/en/), [Express](http://expressjs.com/) and [MongoDB](https://www.mongodb.com/).
For the frontend we're using [Angular](https://angular.io/), thus completing the [MEAN stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) which we 
chose as our technology stack for this assignment.

For visualizing the results we're using __Charts.js__. Depending on how much progress is made
in the limited amount of time we have, real-time updates for displaying the results are 
an option we consider.

# Before you start
Because it's a MEAN stack application, you want to make sure that you have
* MongoDB	aswell as
* NodeJS 

installed before continuing.

As of today, we're using __MongoDB 4.0.0__ and __NodeJS 10.7.0__.
You can check the version of already existing installations via 
the commandline by executing __mongod --version__ or __node -v__ respectively.

# Setup

1. To get started, you first want to run __npm install__ in the MEANSurveys folder 
   to install all the dependencies.
2. Next, to automatically update without having to restart the server each time, 
   we're using [nodemon](https://www.npmjs.com/package/nodemon). To install nodemon globally, use the __npm install -g nodemon__ command.
3. Finally we have to install the dependencies of our Angular app. For that, navigate into the client
   folder and run __npm install__ again.

# Starting the application
During development, make sure that
1. you have a MongoDB instance running,
  (e.g. via the __mongod__ command in your terminal, if you've added the \bin-folder to the path variable)
2. you started the backend service via the __nodemon__ command	and
3. you started the Angular app (from within the client-folder) via the __ng serve__ command.

If you've built the Angular app via the __ng build__ command, all files will be 
served from the public folder. Then all you have to do is

1. Start a MongoDB instance
2. Start the server via the __npm start__ command from within the MEANSurveys-folder.

# REST-API documentation

<h4>Users:</h4>
<p>The following table shows the available API endpoints for user data and method usage with it's corresponding effect.</p>

| Endpoint        | Method         | What it does                               |
| --------------- |:---------------| :------------------------------------------|
| /api/users      | GET            | Returns all users                          |
| /api/users      | POST           | Adds a new user                            |
| /api/users/:id  | PUT            | Updates the user with ID :id               |
| /api/users/:id  | DELETE         | Removes the user with the ID :id           |
<hr>
<h4>Surveys:</h4>
<p>The following table shows the available API endpoints for survey data and method usage with it's correspondig effect.</p>

| Endpoint          | Method         | What it does                               |
| ----------------- |:---------------| :------------------------------------------|
| /api/surveys      | GET            | Returns all surveys                        |
| /api/surveys      | POST           | Adds a new survey                          |
| /api/surveys/:id  | PUT            | Updates the survey with ID :id             |
| /api/surveys/:id  | DELETE         | Removes the survey with the ID :id         |
<hr>

# Admins, Users and authentication
Because part of our assignment was to only have admins create surveys, we implemented a
basic authentication strategy based on JWT as shown by [Traversy Media](https://www.youtube.com/watch?v=uONz0lEWft0&list=PLillGF-RfqbZMNtaOXJQiDebNXjVapWPZ&index=1) in one of his many useful tutorials. This allows us to guard certain endpoints and prevent regular
users from creating surveys. We'll simply distinguish between an admin and an user by adding an
additional field to the user document in MongoDB, although this is not exactly what one would
consider a proper role based authentication mechanism.

In order to authenticate, username and password have to be submitted as part of the request body:

```
{
  username: username,
  password: password
}
```

| Endpoint          | Method         | What it does                               |
| ----------------- |:---------------| :------------------------------------------|
| /auth             | Post           | Authenticates a user                       |

When the authentication process (a user was found and his passwords match) was successful, well send a response that looks like this.

```
{
  success: true,
  token: JWT token,
  user: {
    id: userId,
    name: name,
    email: email,
    username: username
  }
}
```
The token can then be stored in local storage or a cookie to send along with later requests.