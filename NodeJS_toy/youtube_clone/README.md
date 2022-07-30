# Test Restful API
## users
### update user: PUT /:id
* Need to run signin in postman first to get cookies
* Then check if cookise shown in the "Headers" part of update user request on postman, then try the update api with e.g. update the name
```javascript
{
  "name": "test"
}
```

The return value should be like:
```json
{
    "_id": "62e4bde8dd9d7f030ed1c7cf",
    "name": "update4",
    "email": "test3@gmail.com",
    "password": "$2b$10$NJQFXr2dNRd1VKXCcM8EQOIFE40rcHGQGNb.4nD6.hIE44EmSINXG",
    "subscribers": 0,
    "subscribedUsers": [],
    "fromGoogle": false,
    "createdAt": "2022-07-30T05:13:12.473Z",
    "updatedAt": "2022-07-30T06:16:52.707Z",
    "__v": 0
}
```