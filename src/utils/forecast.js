const request = require("postman-request");
// const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=52efe3cc9ed6342b21396cfc63ac528c`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.cod !== 200) {
      callback("Unable to locate location", undefined);
    } else {
      callback(
        undefined,
        `${body.weather[0].description}. It is currently ${body.main.temp} degrees celcius outside. The humidity is ${body.main.humidity}% and the wind speed is ${body.wind.speed} kph.`
      );
    }
  });
};

module.exports = forecast;
