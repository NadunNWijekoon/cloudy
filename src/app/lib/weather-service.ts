export interface WeatherData {
  locationName: string;
  currentConditions: {
    temperature: number;
    feelsLikeTemperature: number;
    weatherDescription: string;
    condition: 'sunny' | 'rainy' | 'cloudy' | 'night';
    humidity: number;
    windSpeed: number;
    uvIndex: number;
    aqi: number;
  };
  hourlyForecast: Array<{
    time: string;
    temperature: number;
    weatherDescription: string;
    rainProbability: number;
  }>;
  dailyForecast: Array<{
    date: string;
    minTemperature: number;
    maxTemperature: number;
    weatherDescription: string;
    rainProbability: number;
  }>;
  alerts?: Array<{
    type: string;
    title: string;
    description: string;
  }>;
}

const LOCATIONS_MOCK: Record<string, WeatherData> = {
  'San Francisco': {
    locationName: 'San Francisco, CA',
    currentConditions: {
      temperature: 18,
      feelsLikeTemperature: 16,
      weatherDescription: 'Partly Cloudy',
      condition: 'cloudy',
      humidity: 65,
      windSpeed: 12,
      uvIndex: 4,
      aqi: 42,
    },
    hourlyForecast: [
      { time: '1 PM', temperature: 19, weatherDescription: 'Cloudy', rainProbability: 10 },
      { time: '2 PM', temperature: 20, weatherDescription: 'Sunny', rainProbability: 0 },
      { time: '3 PM', temperature: 21, weatherDescription: 'Sunny', rainProbability: 0 },
      { time: '4 PM', temperature: 20, weatherDescription: 'Sunny', rainProbability: 0 },
      { time: '5 PM', temperature: 18, weatherDescription: 'Clear', rainProbability: 0 },
      { time: '6 PM', temperature: 17, weatherDescription: 'Clear', rainProbability: 0 },
    ],
    dailyForecast: [
      { date: 'Today', minTemperature: 12, maxTemperature: 21, weatherDescription: 'Partly Cloudy', rainProbability: 10 },
      { date: 'Tue', minTemperature: 13, maxTemperature: 22, weatherDescription: 'Sunny', rainProbability: 0 },
      { date: 'Wed', minTemperature: 11, maxTemperature: 19, weatherDescription: 'Cloudy', rainProbability: 20 },
      { date: 'Thu', minTemperature: 10, maxTemperature: 18, weatherDescription: 'Rain', rainProbability: 80 },
      { date: 'Fri', minTemperature: 12, maxTemperature: 20, weatherDescription: 'Sunny', rainProbability: 5 },
      { date: 'Sat', minTemperature: 14, maxTemperature: 23, weatherDescription: 'Sunny', rainProbability: 0 },
      { date: 'Sun', minTemperature: 13, maxTemperature: 21, weatherDescription: 'Clear', rainProbability: 0 },
    ],
  },
  'New York': {
    locationName: 'New York, NY',
    currentConditions: {
      temperature: 28,
      feelsLikeTemperature: 32,
      weatherDescription: 'Hot & Sunny',
      condition: 'sunny',
      humidity: 80,
      windSpeed: 8,
      uvIndex: 9,
      aqi: 85,
    },
    hourlyForecast: Array.from({ length: 6 }).map((_, i) => ({
      time: `${i + 1} PM`,
      temperature: 28 + Math.floor(Math.random() * 3),
      weatherDescription: 'Sunny',
      rainProbability: 5,
    })),
    dailyForecast: Array.from({ length: 7 }).map((_, i) => ({
      date: i === 0 ? 'Today' : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      minTemperature: 22,
      maxTemperature: 31,
      weatherDescription: 'Sunny',
      rainProbability: 10,
    })),
    alerts: [
      { type: 'Heat', title: 'Heat Advisory', description: 'Extreme temperatures expected today. Stay hydrated.' }
    ]
  },
  'London': {
    locationName: 'London, UK',
    currentConditions: {
      temperature: 14,
      feelsLikeTemperature: 12,
      weatherDescription: 'Light Rain',
      condition: 'rainy',
      humidity: 88,
      windSpeed: 20,
      uvIndex: 1,
      aqi: 22,
    },
    hourlyForecast: Array.from({ length: 6 }).map((_, i) => ({
      time: `${i + 1} PM`,
      temperature: 13 + Math.floor(Math.random() * 2),
      weatherDescription: 'Rainy',
      rainProbability: 90,
    })),
    dailyForecast: Array.from({ length: 7 }).map((_, i) => ({
      date: i === 0 ? 'Today' : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      minTemperature: 9,
      maxTemperature: 15,
      weatherDescription: 'Rain Showers',
      rainProbability: 75,
    })),
  }
};

export function fetchWeather(location: string = 'San Francisco'): WeatherData {
  return LOCATIONS_MOCK[location] || LOCATIONS_MOCK['San Francisco'];
}
