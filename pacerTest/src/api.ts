export const getWeatherApi = async (data) => {
  const {lat, long} = data;
  const API_KEY = '81535a7318225da4b1119ed52d953bf7';
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`,
  )
    .then(res => res.json())
    .catch(error => {
      throw error;
    });
};
