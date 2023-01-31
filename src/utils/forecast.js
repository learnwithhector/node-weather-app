const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c379acfde0aa5e7837dbe1eca7389d12&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const temperature = body.current.temperature;
      const feelsLike = body.current.feelslike;
      const forecast = body.current.weather_descriptions[0];
      const uv = body.current.uv_index;

      callback(
        undefined,
        `${forecast}. The temperature is ${temperature} degrees. It feels like ${feelsLike} degrees. The uv index is ${uv}.`
      );
    }
  });
};

module.exports = forecast;
