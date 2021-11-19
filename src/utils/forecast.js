const request = require("postman-request");
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${OPENWEATHERMAP_API_KEY}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.cod !== 200) {
      callback("Unable to locate location", undefined);
    } else {
      console.log(body.main);
      
      callback(
        undefined,
        `${body.weather[0].description}. It is currently ${body.main.temp} degrees celcius outside and today's high will be ${body.main.temp_max}. The humidity is ${body.main.humidity}% and the wind speed is ${body.wind.speed} kph.`
      );
    }
  });
};

module.exports = forecast;
