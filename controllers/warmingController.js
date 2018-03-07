

self = {}

self.warming = (req, res, next) => {
	let user = req.params.user

	res.json( {
		"user": user, 
		"repositories_qty": 1, 
		"average_temperature": [
			{"date": "2015-06-14T00:36:05Z", "average_temperature": 10.5625}
		]
	} )
}

module.exports = self