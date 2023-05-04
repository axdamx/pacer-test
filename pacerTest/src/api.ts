interface DataParams {
  lat: number;
  long: number;
}

export const getWeatherApi = async (data: DataParams) => {
  const {lat, long} = data;
  const API_KEY = '81535a7318225da4b1119ed52d953bf7';
  const UNIT = 'metric';
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=${UNIT}`,
  )
    .then(res => res.json())
    .catch(error => {
      throw error;
    });
};
