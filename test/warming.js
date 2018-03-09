const expect = require('chai').expect,
	rewire = require('rewire'),
	Q = require('q'), 
	warmingService = rewire('../services/warmingService')

describe('Warming Services', () => {
	it("should return a warming model for a given user name", () => {

		warmingService.__set__('githubClient', {
			getUserRepositoriesInfo: (userName) => {
				return Q({
					user: userName, 
					city: 'Some City',
					repositories_qty: 1, 
					average_temperature: [
						{date: new Date('1978-06-24')}
					]
				})
			}
		})

		warmingService.__set__('climateClient', {
			getAverageTemperatureFor: (date, city) => {
				return Q(18.5)
			}
		})

		return warmingService.getUserWarming('impronunciable')
			.then(userInfo => {
				expect(userInfo.user).to.be.equal('impronunciable')
				expect(userInfo.city).to.be.equal('Some City')
				expect(userInfo.repositories_qty).to.be.equal(1)
				expect(userInfo.average_temperature[0]).to.have.property('date')
				expect(userInfo.average_temperature[0]).to.have.property('temperature')
			})
	})
})
