declare namespace weatherData {
  interface State {
    base: string;
    clouds: {
      all: number;
    };
    cod: number;
    coord: {
      lat: number;
      lon: number;
    };
    dt: number;
    id: number;
    main: {
      feels_like: number;
      humidity: number;
      pressure: number;
      temp: number;
      temp_max: number;
      temp_min: number;
    };
    name: string;
    sys: {
      country: string;
      id: number;
      sunrise: number;
      sunset: number;
      type: number;
    };
    timezone: number;
    visibility: number;
    weather: [
      {
        description: string;
        icon: string;
        id: number;
        main: string;
      },
    ];
    wind: {
      deg: number;
      speed: number;
    };
  }
}

declare namespace dailySteps {
  interface State {
    endDate: string;
    startDate: string;
    value: number;
  }

  interface GetSteps {
    startDate: string;
    endDate: string;
    value: number;
  }

  interface GetStepsFormatted {
    date: string;
    value: number;
  }
}

declare namespace distanceRunningWalking {
  interface State {
    endDate: string;
    startDate: string;
    value: number;
  }

  interface GetDistanceRunningWalking {
    startDate: string;
    endDate: string;
    value: number;
  }

  interface GetDistanceRunningWalkingFormatted {
    date: string;
    value: number;
  }
}
