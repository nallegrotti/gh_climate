let expect = require('chai').expect,
	rewire = require('rewire'),
	githubClient = require('../services/githubClient'),
	Q = require('q')

describe('Github API', () => {
	it("should return the user's city", ()=> {
		return githubClient.getUserCity('impronunciable')
			.then((cityName) => {
				return expect( cityName ).to.be.equal("Buenos Aires")
			})
	})

	it("should return the user's repos", ()=> {
		return githubClient.getUserRepositoriesDates('impronunciable')
			.then((reposDates) => {
				expect( reposDates ).to.have.lengthOf.above(1)
				expect(Date.parse(reposDates[0])).to.be.ok
			})
	})
})