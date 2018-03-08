const Q = require('q'),
	rest = require('unirest')


const self = {}

self.getUserCity = (username) => {
	const d = Q.defer()
	rest.get("https://api.github.com/users/"+ username)
		.type('json')
		.headers({'User-Agent':'node-application'})
		.send()
		.end(response => {
			if (response.status == 200){
				user = response.body

				// console.log('user=', username,'location=', user.location)
				if(user.location){
					d.resolve(user.location.split(',')[0])
				}else{
					d.reject({'error': 'user has no location'})
				}
			}else{
				d.reject({'error': response.body})
			}
		})
	return d.promise
}

self.getUserRepositoriesDates = (username) => {
	const d = Q.defer()

	rest.get("https://api.github.com/users/"+ username +"/repos")
		.type('json')
		.headers({'User-Agent':'node-application'})
		.send()
		.end(response => {
			if (response.status == 200){
				repos = response.body

				// console.log('user=', username, 'repos=', repos)
				d.resolve(repos.map(repo => repo.created_at))
			}else{
				d.reject({'error': response.body})
			}
		})

	return d.promise
}

self.getUserRepositoriesInfo = (username) => {
	const city = self.getUserCity(username)
	const reposDatePromise = self.getUserRepositoriesDates(username)

	return Q.all([city, reposDatePromise])
		.spread((cityName, reposDates) => {
			return {
				user: username,
				city: cityName,
				repositiries_qty: reposDates.length,
				average_temperature: reposDates.map(date => ({date: date}))
			}
		})
}

module.exports = self