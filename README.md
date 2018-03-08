## Global Warming API

startup: 

> npm start

tests: 

> npm test

usage: 

localhost:3000/warming_by/:github_user

RESPONSE

Status 200 

```json
{
  "user": "githubuser",
  "city": "Some City",
  "repositiries_qty": 1,
  "average_temperature": [
    {
      "date": "2015-06-14T00:36:05Z",
      "temperature": 10.5625
    }
  ]
}
```

Status 404

```json
{
  "message": "Not Found",
  "error": {
    "status": 404
  }
}
```

Status 500

```json
{
  "message": "Internal Server Error",
  "error": {
    "status": 500
  }
}
```
