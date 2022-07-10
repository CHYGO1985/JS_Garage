# Candidate Takehome Exercise
This is a simple backend engineer take-home test to help assess candidate skills and practices.  We appreciate your interest in Voodoo and have created this exercise as a tool to learn more about how you practice your craft in a realistic environment.  This is a test of your coding ability, but more importantly it is also a test of your overall practices.

If you are a seasoned Node.js developer, the coding portion of this exercise should take no more than 1-2 hours to complete.  Depending on your level of familiarity with Node.js, Express, and Sequelize, it may not be possible to finish in 2 hours, but you should not spend more than 2 hours.  

We value your time, and you should too.  If you reach the 2 hour mark, save your progress and we can discuss what you were able to accomplish. 

The theory portions of this test are more open-ended.  It is up to you how much time you spend addressing these questions.  We recommend spending less than 1 hour.  


For the record, we are not testing to see how much free time you have, so there will be no extra credit for monumental time investments.  We are looking for concise, clear answers that demonstrate domain expertise.

# Project Overview
This project is a simple game database and consists of 2 components.  

The first component is a VueJS UI that communicates with an API and renders data in a simple browser-based UI.

The second component is an Express-based API server that queries and delivers data from an SQLite data source, using the Sequelize ORM.

This code is not necessarily representative of what you would find in a Voodoo production-ready codebase.  However, this type of stack is in regular use at Voodoo.

# Project Setup
You will need to have Node.js, NPM, and git installed locally.  You should not need anything else.

To get started, initialize a local git repo by going into the root of this project and running `git init`.  Then run `git add .` to add all of the relevant files.  Then `git commit` to complete the repo setup.  You will send us this repo as your final product.
  
Next, in a terminal, run `npm install` from the project root to initialize your dependencies.

Finally, to start the application, navigate to the project root in a terminal window and execute `npm start`

You should now be able to navigate to http://localhost:3000 and view the UI.

You should also be able to communicate with the API at http://localhost:3000/api/games

If you get an error like this when trying to build the project: `ERROR: Please install sqlite3 package manually` you should run `npm rebuild` from the project root.

# Practical Assignments
Pretend for a moment that you have been hired to work at Voodoo.  You have grabbed your first tickets to work on an internal game database application. 

#### FEATURE A: Add Search to Game Database
The main users of the Game Database have requested that we add a search feature that will allow them to search by name and/or by platform.  The front end team has already created UI for these features and all that remains is for the API to implement the expected interface.  The new UI can be seen at `/search.html`

The new UI sends 2 parameters via POST to a non-existent path on the API, `/api/games/search`

The parameters that are sent are `name` and `platform` and the expected behavior is to return results that match the platform and match or partially match the name string.  If no search has been specified, then the results should include everything (just like it does now).

Once the new API method is in place, we can move `search.html` to `index.html` and remove `search.html` from the repo.

#### FEATURE B: Populate your database with the top 100 apps
Add a populate button that calls a new route `/api/games/populate`. This route should populate your database with the top 100 games in the App Store and Google Play Store.
To do this, our data team have put in place 2 files at your disposal in an S3 bucket in JSON format:

- https://interview-marketing-eng-dev.s3.eu-west-1.amazonaws.com/android.top100.json
- https://interview-marketing-eng-dev.s3.eu-west-1.amazonaws.com/ios.top100.json

# Theory Assignments
You should complete these only after you have completed the practical assignments.

The business goal of the game database is to provide an internal service to get data for all apps from all app stores.  
Many other applications at Voodoo will use consume this API.

#### Question 1:
We are planning to put this project in production. According to you, what are the missing pieces to make this project production ready? 
Please elaborate an action plan.

<b>Answer</b>

##### Source code perspective
* <b>Refactoring code<b>: the code should be made more modularity. For example, the routing methods in _index.js_ should be put into _/routes_, like what I did for _/api/games/search_ and _/api/games/populate_.
* <b>documents/comments<b>: design document or code comments should be added for future references
* <b>More test</b>: add more test, integration test, UI test and E2E test.
* <b>Logging</b>: instead of using _console.log_, use formal logger framework, such as _winston.js_ and store log in DB or disk. Add more log to the project to log necessary info for future root cause analysis.
* <b>Security</b>: add security related control, e.g. force to use _https_ instead of _http_

##### Deployment perspective
* <b>CI/CD</b>: set up CI/CD pipeline and monitoring site
* <b>Scaling</b>: load balancer, CDN, API gateway, data cluster etc

#### Question 2:
Let's pretend our data team is now delivering new files every day into the S3 bucket, and our service needs to ingest those files every day through the populate API. Could you describe a suitable solution to automate this? Feel free to propose architectural changes.

<b>Answer</b>: For this scenario, there are two options here: pull-model or push model. I assume that the data time will deliver new files on any time of a day, so pull model is not suitable here in this case, otherwise the populate API will need to regulary check the update which waste resources. 

Therefore push model is a better option here. We can set up a notification mechanism on S3 bucket, as soon as the service receive notification from S3 about data update, the API will access S3 and fetch the newly added data.

Regarding updating the data in our service, we can only update those onces are revices. For example, we can do this via checking the data that the data are revised/added. And if we are talking about updating data in distributed system, we can update the primary or coordinate node first, then update the data on secondary nodes. If the task could not be done immediately due to unexpected reason, we can also add a message queue for the data nodes, so they can update the data later when they are have the resources.


#### Question 3:
Both the current database schema and the files dropped in the S3 bucket are not optimal.
Can you find ways to improve them?

<b>Answer</b>:

##### If we are talking about Relational DB
From the sqlite3 side, we can add index to improve searching speed and denormalize certain schema to avoid 'join' operation. 

##### If we are talking about Non-SQl DB
We can store data in non-sql db instead of sql db, since I noticed that most of data can be key-value pairs. Using non-sql db will improve the r/w speed and such db is easier to scale then sql db.