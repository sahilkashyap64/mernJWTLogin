![](https://github.com/EduardoRotundaro/crud-api-express-mongo/blob/master/docs/images/01.png?raw=true)

# MERN Login API(JWT) w/ Express.js and MongoDB

A backend application using Node.js with the Express framework, that implements a JWT for login with the MongoDB.
●User can log in and sign up.
NOTE: store password hashed(bcrypt)
● Login user can see all the users.
● Delete all users or delete single users.
---

## Stack
    
| Lib | Version |
| ------ | ------ |
| express | ^4.17.1 |
| accesscontrol | ^2.2.1 |
| bcryptjs | ^2.4.3 |
| jsonwebtoken | ^8.5.1 |
|mongoose |^5.9.5|
|morgan|^1.10.0|
|cors|^2.8.5|
|dotenv|^8.2.0|

---

## Running

**After clone**

```sh
$ cd backend
$ npm install
```

**Starting the application**

```sh
$ npm start
```

or

```sh
$ node server.js
```
```
Backend Folder Structure is simple
routes-contains routes and a middleware
controller- contains method for sign/sign in
model- db schema
helpers- contain helper function to deal with api error respons
```
---
## Frontend
**After clone**

```sh
$ cd frontend
$ npm install or yarn
```

**Starting the application**

```sh
$ npm start or yarn start
```
```
Frontend folder Structure
component-contains components and a middleware
context- react context api used
pages- login and dashboard page
```
---
## Routes

* Sign up 
```sh
method: "POST"
url: "/signup"
body: {
"name": <String>,
    "email": <String>,
    "password": <String>,
}
```

* Sign in
```sh
method: "POST"
url: "/login"
body: {
    "email": <String>,
    "password": <String>
}
```

* Get all users [Log in required] pass the token provided on login as custom header name "x-access-token"
```sh
method: GET
url: "/users"
```
* Delete all users from db
```sh
method: "DELETE"
url: "/delAll"

```
* Delete single user from db
```sh
method: "DELETE"
url: "/user/:userId"
```

