const Q = require('q'),
	rest = require('unirest')

const 	seconds = 1000,
		minutes = 60 * seconds,
		hours = 60 * minutes, 
		days = 24 * hours

const self = {}

self.getAverageTemperatureFor = (date, city) => {
	const d = Q.defer()
	const endDate = new Date(date.getTime() + 1*days)
	rest.get("https://api.worldweatheronline.com/premium/v1/past-weather.ashx")
		.query({
			key: '8e087ae47efe4d4288e230637182302', 
			format: 'json',
			q: city, 
			date: date.toISOString(), 
			enddate: endDate.toISOString()
		})
		.type('json')
		.headers({'User-Agent':'node-application'})
		.send()
		.end((response) => {
			if(response.status == 200){
				// console.log('weather for', date, 'before', endDate, 'in', city, 'was', response.body)
				try{
					const weather = response.body
					const hourly = [].concat.apply([],weather.data.weather.map(w => w.hourly.map(h => 1*h.tempC)))
					const sum = hourly.reduce((a,b) => a + b, 0)
					// console.log('por hora=', sum, 'promedio=', sum/hourly.length)
					d.resolve(sum / hourly.length)
				}catch(err){
					d.reject({error: err})
				}
			}else{
				d.reject({error:response.body})
			}
		})
	return d.promise
}

module.exports = self