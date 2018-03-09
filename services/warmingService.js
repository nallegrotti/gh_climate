const Q = require('q'),
	  githubClient = require('./githubClient'),
	  climateClient = require('./climateClient')


const self = {}

self.getUserWarming = (userName) => {
	return githubClient.getUserRepositoriesInfo(userName)
		.then(userInfo => {
			const results = userInfo.average_temperature.map(temp => {
				return climateClient.getAverageTemperatureFor(new Date(temp.date), userInfo.city) 
					.then(averageTemp => temp.temperature =  averageTemp)
			})

			return Q.all(results)
				.then( __ => {
					return userInfo
				})
		})
}

module.exports = self