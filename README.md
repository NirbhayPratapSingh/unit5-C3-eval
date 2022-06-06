# RCT 201 - web16 - c3

## Problem Statement

- Create a voting system for users
- the voting system has 2 types of user:
  - Voters
  - Candidates
- Every Candidate belong to a "Party"
  - PartyA
  - PartyB
- you differentiate between users based on their "Role"
- Every user has folloing attributes:
  - id (uuid)
  - name
  - role (voter/candidate)
  - age
- if users role is candidate he has more following fields:
  - votes (total votes he got)
  - party (which party he belongs to)
- If user is 'voter' he has following additional fields:
  - username 
  - password
- create such mock dummy data
- only voters are allowed to vote
- if a voter is not logged in he is not allowed to vote
- Every single request needs to have a query param called as `apiKey`
- it's value is a token, read more about it below in login section
- obviously, only `create`, `login` and logout routes will not need `apiKey`, it's only for `/votes/*` routes.
- other every single route will need it
- create a auth middleware for such
- You have following routes:
  - `/user/create`
    - to create a new user in the db
    - method:POST
    - body: entire user object
    - returns: 201 code, `{status: "user created", id of user }`
  - `/user/login`
    - to log user in.
    - method: POST
    - body: username, password
    - if username or password is not provided, return 400 status with message `{ status: "please provide username and password" }`
    - look for a user in db who has same username and password, if found:
    - generate a random token for user
    - store that token with the user object in db
    - returns: `{ status: "Login Successful", token }`
    - if user not found, return 401, `{ status: "Invalid Credentials" }`
  - `/user/logout`
    - to log user out
    - Method: POST
    - delete the `token` property from user in db.
    - return `{ status: "user logged out successfully" }`
  - `/votes/party/:party`
    - Get list of all candidates by party name
    - GET
  - `/votes/voters`
    - GET
    - get list of all 'voters'
  - `/votes/vote/:user`
    - POST
    - Vote a user, just increment vote count by 1 in db
  - `/votes/count/:user`
    - Get total count of votes of a candidate
    - `{ status: x }` in success, where x is count
    - `{ status: "cannot find user" }` if user not found
  - Apart from these route, create 2 routes for test cases:
    - `/db`, GET, will just return the entire db.json as it is
    - `/db` POST, will store WHATEVER we give in req.body to db.json (override entire previous data)
    - both of these are only for test cases so they wont need apikey or anything else.
- These are the only routes you need to make
- for simplicity you can use synchronous file reading and writting methods, asynchronous is also acceptable
- Once done, deploy the application to `heroku`


### Hints
- The heroku deployment instructions video is given with boilerplate itself.
- Make sure you spare at least 15 minutes for deployment
- Have propert Routing middleware structure
- Have proper authentication middlewares


```json
{
  "name": "John Doe",
  "role": "voter",
  "username": "john",
  "password": "1234",
  "age": 15,
  "token": "6f85eca06c"
}


{
  "name": "Donald Trump",
  "role": "candidate",
  "votes": 0,
  "party": "republicans",
  "age": 15
}
```