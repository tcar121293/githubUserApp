## Installation and usage

```
npm install
npm start:dev
```

This application has three main functionalities:
* to fetchs user data:
    - username
    - email
    - searchedForCounter
    - followers
    - followed
* to fetch most searched user with variable limit count
* to reset most searched user count to 0

## Usage
go to 
```
localhost:3000/graphql
```
fetch user write query:

```
query {
    getUser(id: "exampleStringUserId"){
        username
        email
        searchedForCounter
        followers
        followed
    }
}
```

fetch most searched user
```
query {
    mostSearched(limit: 2){
        username
        email
        searchedForCounter
        followers
        followed
    }
}
```
reset most searched users

```
mutation {
    resetUsers{
        status
    }
}
```


to change log level
```
query{
    setLogLevel(level: "trace"){
        status
    }
}
```


## Architecture considirations
### fetch user
There are known limitations in GitHub API, we can send only 60 requests per hour without authentication. The solution could be to create some dummy account and use it for fetching data. We could also fetch each distinct user once per hour, and just increase fetchUserCount field, but then the followers and followed data might not be accurate, but we will get the boost in performance and probably a lot more requests per hour. 

### fetch most searched
The applications do not use any database, the data is stored in memory, so there is a possible improvement in this segment to include some kind of database. This would also increase the performance of the application.

