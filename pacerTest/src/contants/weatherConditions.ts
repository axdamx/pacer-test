export const weatherConditionsUtil = (weather: string) => {
  switch (weather) {
    case 'Rain':
      return {
        color: '#005BEA',
        title: 'Raining',
        subtitle: 'Get a cup of coffee',
        icon: 'weather-rainy',
      };
    case 'Clear':
      return {
        color: '#f7b733',
        title: 'So Sunny',
        subtitle: 'It is hurting my eyes',
        icon: 'weather-sunny',
      };
    case 'Thunderstorm':
      return {
        color: '#616161',
        title: 'A Storm is coming',
        subtitle: 'Because Gods are angry',
        icon: 'weather-lightning',
      };
    case 'Clouds':
      return {
        color: '#1F1C2C',
        title: 'Clouds',
        subtitle: 'Everywhere',
        icon: 'weather-cloudy',
      };
    case 'Snow':
      return {
        color: '#00d2ff',
        title: 'Snow',
        subtitle: 'Get out and build a snowman for me',
        icon: 'weather-snowy',
      };
    case 'Drizzle':
      return {
        color: '#076585',
        title: 'Drizzle',
        subtitle: 'Partially raining...',
        icon: 'weather-hail',
      };
    case 'Haze':
      return {
        color: '#66A6FF',
        title: 'Haze',
        subtitle: 'Another name for Partial Raining',
        icon: 'weather-hail',
      };
    case 'Mist':
      return {
        color: '#3CD3AD',
        title: 'Mist',
        subtitle: "Don't roam in forests!",
        icon: 'weather-fog',
      };
    default:
      return {
        color: '#1F1C2C',
        title: 'Not found',
        subtitle: 'Not found',
        icon: 'weather-fog',
      };
  }
};
