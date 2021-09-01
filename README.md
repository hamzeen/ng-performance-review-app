# performance review app
This repo holds 2 projects, front-end & backend code for the sample performance review app.
The front-end is written in Angular. The backend is a Node.js project which runs on Express.js middleware. 
MongoDB is used for managing data of this app. It could be easily moved to a 
popular RDBMS (ex: MySQL) as the Angular app is totally independent of the 
tech stack used for the backend. The front-end consumes REST APIs.


The entire project was done with a `mobile-first` design approach.
Angular `AuthGuards` are used to protect routes that require authentication.
`JWT` tokens are used for authentication. **Passwords** are `hashed` before they are inserted to the DB.

> For the most part the project uses actual service calls (no service returns mock data) & 
real data coming from the DB. The only feature which doesn't employ actual api call is the 
updates to performance reviews.

Instructions for setting up the project can be found below. 


## Pre-Requisites ##
* [**install mongodb**](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
* Once you setup MongoDB, start the mongod service & create the DB like so:
```sh
# start mongodb
mongo start
# create db
use chocodb
```


## Running backend
* install dependencies:
    ```npm install```
* start backend server:
    ```npm run dev```
* confirm if the backend is running: 
    * navigate to: <http://localhost:4201/api/v1/>
    * if it works, you will see: `api ver 1.0.0`

## Running Front-End
* ```npm install```
* ```npm start```
* browse: <http://localhost:4200>
* if you reached this point, you can now create the admin user:
    * navigate to: <http://localhost:4200/#/dashboard/employees>
    * [IMPORTANT!] create a user named `admin`

## Front-end routes
* Login Page for Users: <http://localhost:4200/#/login>
* Landing page for Employees: <http://localhost:4200/#/landing>
* Admin Dashboard: <http://localhost:4200/#/dashboard/employees> or 
simply, <http://localhost:4200/#/admin>
* Above route will lead to following route to create/assign new performance reviews for a selected user: <http://localhost:4200/#/dashboard/reviews>

## API end-points
* [GET]  shows api version: <http://localhost:4201/api/v1/>
* [GET]  returns employees: <http://localhost:4201/api/v1/users>
* [GET]  returns reviews for user with `id: 1` <http://localhost:4201/api/v1/reviews?id=1>
* [POST] creates a new user: <http://localhost:4201/api/v1/users>
    * payload: `{"name":"some_username","password":"some_secret"}`

## MongoDB CLI commands
```
# use this command to be able to invoke apis from front-end
use chocodb

# check this after creating employees/reviews
show collections

# view all doucments/records in a collection
db.users.find()
db.reviews.find()

# WARING! removes all records
db.reviews.remove({})

# WARNING! drops a collection
db.reviews.drop()
```

## Screens

* landing page for employees
![employee landing](https://raw.githubusercontent.com/hamzeen/FullStackEngineerChallenge/master/screenshots/003_landing_page_employees.png)

* admin dashboard: managing employees
![dashboard manage employees](https://raw.githubusercontent.com/hamzeen/FullStackEngineerChallenge/master/screenshots/004_dashboard_admin.png)


## Improvements
* introduce user `role` in `JWT payload`. Then it could used to distinguish employees and admin. 
Currently this is done by looking at the username, `admin`. 
This will help if we decide to have multiple admin users.
* Create a common component to display error messages. Backend errors could be translated into friendly messages & shown in UI.
* The above component could be designed to accept:
    * `severity levels`: (ex: `info, warning, success, error`) & 
    * `Soft` or `Hard` notifications. Soft would disappear on its own; Hard notifications needs to be closed by user.
    * example: <https://hamzeen.github.io/ngToast/>
* following types of testing needs to be added, `unit tests`, `api tests` & `integration`/UI automation `tests`.
    * Some Recommendations: 
        * unit tests: Jasmine
        * api tests: postman scripts
        * UI Automation/Integration tests: Codecept / Protractor


## CREDITS ##
Splash image on the app was retreived from [unsplash](http://unsplash.com). 
All its credits are attributed to the original photographer, [Gio Almonte](https://unsplash.com/@gpenguin).

