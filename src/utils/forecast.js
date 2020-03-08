const request = require('request')
const chalk = require('chalk')

const forecast = (lat, lon, callback)=>{
    const url='https://api.darksky.net/forecast/ebf1542d15ef614be0225fabe94e25a6/'+lat+','+lon+'?units=si'

    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error){
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports={forecast:forecast}