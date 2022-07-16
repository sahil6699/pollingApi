# pollingAPI

node based polling-API which can be used for the Question and answer based polling result like Quiz App.

# PROJECT SETUP

Note:- npm should be there in your System

Steps:-

1. clone the repository
2. cd pollingAPI
3. npm install
4. npm start

# API ROUTES

1. /questions/create -> To create a question
2. /questions/:id/options/create -> To add options to a question
3. /questions/:id/delete -> To delete a question
4. /options/:id/delete -> To delete an option
5. /options/:id/add_vote -> To increment the count of votes
6. /questions/:id -> To view a question and it's options

### Note

the polling api.postman is the collection of json files on which the the api has been tested
