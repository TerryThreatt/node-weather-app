const request = require('request'); 


const forecast = (latitude, longitude, callback) => { 
const url = 'https://api.darksky.net/forecast/35bb2f67f64793f3e57d8e4fafd03705/' + latitude + ',' + longitude + ''

request({ url, json: true }, (error, { body }) => { 
    if(error) { 
         callback('Unable to connect to weather service!', undefined)
    } else if (body.error) { 
        callback('Unable to find location.', undefined);
    } else {
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees. The high today is ' + body.daily.data[0].temperatureHigh +' degrees' + ' with a low of ' + body.daily.data[0].temperatureLow + ' degrees.' + ' There is a ' +   body.currently.precipProbability * 100 + '% chance of rain.'
        );
     }
 });
};

module.exports = forecast; 