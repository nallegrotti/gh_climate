let expect = require('chai').expect,
	rewire = require('rewire'),
	Q = require('q')

describe('Dummy Tests', () => {
	it('should sum', ()=> {
		return Q(2)
			.then((result) => {
				expect( 1 + 1 ).to.be.equal(result)
			})
	})
})