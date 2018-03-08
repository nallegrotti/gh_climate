const githubClient = require('../services/githubClient')
	  climateClient = require('../services/climateClient')

const self = {}

self.warming = (req, res, next) => {
	let user = req.params.user

	console.log('user=', user)
	githubClient.getUserRepositoriesInfo(user)
		.then(userInfo => {
			res.json( userInfo )
		})
		.catch(err => {
			err.status = 500
			next(err)
		})

}

module.exports = self