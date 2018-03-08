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

	it("should return the user's city and repositories dates", () => {
		return githubClient.getUserRepositoriesInfo('impronunciable')
			.then((userRepoData) => {
				expect(userRepoData.user).to.be.equal('impronunciable')
				expect(userRepoData.repositiries_qty).to.be.above(1)
				expect(userRepoData.average_temperature).to.have.lengthOf.above(1)
				expect(Date.parse(userRepoData.average_temperature[0].date)).to.be.ok

			})
	})
})