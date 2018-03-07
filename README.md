# Global Warming API

usage: 

api.brunbank.com.ar/warming_by/:github_user

RESPONSE

Status 200 

```json
{
	"user": $githubuser,
	"repositiries_qty": 1, 
	"average_temperature": [
		{ "date": "2015-06-14T00:36:05Z", "average_temperature": 10.5625 }
	]
}
```

Status 404

```json
{
	"error": "Warming not found"
}
```

Status 500

```json
{
	"error": "Error calculating temperature"
}
```
