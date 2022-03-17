export interface IResponseCurrentWeather {
  weather: [
    {
      icon: string;
    }
  ];
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  dt: number;
  sys: {
    country: string;
  };
  name: string;
}

export interface ICurrentWeather {
  city: string;
  country: string;
  time: string | undefined;
  date: string | undefined;
  icon: string;
  temperature: number;
  wind: number;
  humidity: number;
  pressure: number;
}

export interface IResponseWeather {
  lat: number;
  lon: number;
  timezone: string;
  current: {
    dt: number;
    temp: number;
  };
  daily: [
    {
      dt: number;
      temp: {
        day: number;
        night: number;
      };
      weather: [
        {
          icon: string;
        }
      ];
    }
  ];
}

export interface IWeather {
  id?: number;
  city: string;
  country: string;
  lat: number;
  lon: number;
  currentTime: string;
  currentTemp: number;
  daily: {
    id: number;
    time: string | undefined;
    date: string | undefined;
    icon: string;
    dayTemperature: number;
    nightTemperature: number;
  }[];
}
