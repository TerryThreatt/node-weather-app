const request = require('request'); 


const forecast = (latitude, longitude, callback) => { 
const url = 'https://api.darksky.net/forecast/35bb2f67f64793f3e57d8e4fafd03705/' + latitude + ',' + longitude + ''

request({ url, json: true }, (error, { body }) => { 
    if(error) { 
         callback('Unable to connect to weather service!', undefined)
    } else if (body.error) { 
        callback('Unable to find location.', undefined);
    } else {
        callback(undefined,body.daily.data[0].summary, body.currently.precipProbability * 100, body.currently.temperature + ' degrees'
        );
     }
 });
};

module.exports = forecast; 