const githubClient = require('../services/githubClient'),
	  climateClient = require('../services/climateClient'),
	  Q = require('q')

const self = {}

self.warming = (req, res, next) => {
	let user = req.params.user

	console.log('user=', user)
	githubClient.getUserRepositoriesInfo(user)
		.then(userInfo => {
			const results = userInfo.average_temperature.map(temp => {
				console.log('temp=', temp, 'city=', userInfo.city)
				return climateClient.getAverageTemperatureFor(new Date(temp.date), userInfo.city) 
					.then(averageTemp => temp.temperature =  averageTemp)
			})

			return Q.all(results).then( __ => {
				res.json( userInfo )
			})
		})
		.catch(err => {
			err.status = 500
			next(err)
		})

}

module.exports = self