# LogIn API Documentation
It manages user accounts and log in system. It verifys
user that is logging in and registers users that are
sigining up.

## Search for the usename and see if it exists in the database.
**Request Format:** /users/:name

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Searches for the input username and see if it is in the database.


**Example Request:** /users/Xavier

**Example Response:**
```
This user already exists
Welcome, Xavier, please sign up.
```

**Error Handling:**

400: Returns error 400 when req is undefined.

## Get the object recoding the user's information
**Request Format:** /login/:name

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Get the json object of the user and verify the user

**Example Request:** /users/Xavier

**Example Response:**

```json
{
  "name": "Xavier",
  "password": "cse154",
  "_id":"DesAWbn8BhBm7cHd"
}
```

**Error Handling:**

400: Returns error 400 when req is undefined.

## Get the object recoding the user's information
**Request Format:** /adduser

**Request Type:** POST

**Returned Data Format**: json

**Description:** Post information of the user and store in database (for new users)

**Example Request:** {"name": "Xavier", "password": "cse154"}

**Example Response:**

```json
{
  "name":"Xavier",
  "password":"cse154",
  "_id":"DesAWbn8BhBm7cHd"
}
```

**Error Handling:**

400: Returns error 400 when req is undefined.