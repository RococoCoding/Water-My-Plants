# Project 5 - Water My Plants
**Timeline**: One week  
**Tech**: Node.js, Express, SQLite3, Knex, Heroku    
**Description**: An app to help you remember to water your plants.   
**Contribution Type**: School Team Project - Relational database, REST API, authentication    
**Status**: Completed  
**Retrospective**: For my Unit 4 build week project at Lambda, I was responsible for developing the entire backend. I set up a relational database using Knex and SQLite3 and  hosted it on Heroku. I also set up a RESTful API with full CRUD operations and authentication.  

Below is my favorite piece of code from this project. I wanted to return a user object that included all the user info including a plants field that held an array of plants owned by the user. This would save the front end from having to make a second API call to get the plants for the user. Async/await was always a weak spot of mine and I wasn't sure about Promise.resolve until I figured it out for this piece of code.

```
async function getUserById(id) {
  let plants = await db("plants").where("user_id", id);
  return db("users")
    .where({ id })
    .select("username", "id", "telephone")
    .first()
    .then(data => {
      data.plants = plants;
      return Promise.resolve(data);
    });
}

```


## Water My Plants API

## API URL

https://plantswater.herokuapp.com/

## API Documentation

### General principles

#### Requests
This Web API follows the REST principles:
- resources are accessed using standard HTTPS requests
- HTTP requests are made to distinct API endpoints
- use HTTP verbs (GET, POST, PUT, DELETE, etc) based on the action taken

#### HTTP Methods and their roles
- GET - Retrieves existing resources
- POST - Creates a new resource
- PUT - Updates an existing resource
- DELETE - Deletes resources

## API Endpoints
- All Data is returned in JSON format

### Auth
#### POST /api/register
Required fields:
```
{ 
  "password": "password", (128 char max)
  "username": "uniqueUsername", (128 char max, unique)
  "telephone": "000-000-0000" (128 char max)
}
```
Returns 
  {
    "username": "uniqueUsername",
    "id": 1
    "telephone": "000-000-0000"
    "plants": []
  }

#### POST /api/login
Required fields:
```
{
  "username": "uniqueUsername",
  "password": "password"
}
```
Returns 
```
{
  "user": {
        "username": "uniqueUsername",
        "id": 1,
        "telephone": "000-000-0000"
        "plants": []
    },
    "token": "authentication token"

}
```

**ALL of the following non-auth requests require an authorization token in the header**

### Users
#### GET /api/users/:id
```
- Get User By ID

Returns user object
```
#### PUT /api/users/:id
```
- Update User 

Returns updated user object
```
### Plants

#### GET /api/plants/:id
```
- Get Plant By ID

Returns plant object
```
#### POST /api/plants
```
- Add Plant

Required fields:
{ 
  "nickname": "plant nickname",
  "species": "species name",
  "frequency": 24, (integer)
  "user_id": 2, (integer)
  "img_url": "http://plantpic.com"
}
```
Returns new plant object with id
```
#### PUT /api/plants/:id
```
- Update Plant

Returns updated plant object
```
#### DELETE /api/plants/:id
```
- Delete Plant

Returns number of deleted objects
```
