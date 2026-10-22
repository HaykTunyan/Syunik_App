export type DailyWeather = {
  date: string;
  weatherCode: number;
  maxTemperature: number;
  minTemperature: number;
};

export type CurrentWeather = {
  time: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  isDay: boolean;
};

export type WeatherForecast = {
  current: CurrentWeather;
  daily: DailyWeather[];
};

const API_URL = 'https://api.open-meteo.com/v1/forecast';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function readNumber(record: Record<string, unknown>, key: string): number {
  const value = record[key];

  if (!isNumber(value)) {
    throw new Error(`Missing weather value: ${key}`);
  }

  return value;
}

function readString(record: Record<string, unknown>, key: string): string {
  const value = record[key];

  if (typeof value !== 'string') {
    throw new Error(`Missing weather value: ${key}`);
  }

  return value;
}

function readArray(record: Record<string, unknown>, key: string): unknown[] {
  const value = record[key];

  if (!Array.isArray(value)) {
    throw new Error(`Missing weather list: ${key}`);
  }

  return value;
}

export async function fetchWeatherForecast(
  latitude: number,
  longitude: number,
): Promise<WeatherForecast> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    forecast_days: '5',
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    timezone: 'auto',
  });
  const response = await fetch(`${API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Weather request failed: ${response.status}`);
  }

  const payload: unknown = await response.json();

  if (!isRecord(payload) || !isRecord(payload.current) || !isRecord(payload.daily)) {
    throw new Error('Weather response is not valid');
  }

  const current = payload.current;
  const daily = payload.daily;
  const dates = readArray(daily, 'time');
  const weatherCodes = readArray(daily, 'weather_code');
  const maximums = readArray(daily, 'temperature_2m_max');
  const minimums = readArray(daily, 'temperature_2m_min');
  const dailyForecast = dates.map((date, index) => {
    if (typeof date !== 'string') {
      throw new Error('Weather date is not valid');
    }

    const weatherCode = weatherCodes[index];
    const maxTemperature = maximums[index];
    const minTemperature = minimums[index];

    if (!isNumber(weatherCode) || !isNumber(maxTemperature) || !isNumber(minTemperature)) {
      throw new Error('Weather forecast is not valid');
    }

    return {date, weatherCode, maxTemperature, minTemperature};
  });

  return {
    current: {
      time: readString(current, 'time'),
      temperature: readNumber(current, 'temperature_2m'),
      feelsLike: readNumber(current, 'apparent_temperature'),
      humidity: readNumber(current, 'relative_humidity_2m'),
      precipitation: readNumber(current, 'precipitation'),
      weatherCode: readNumber(current, 'weather_code'),
      windSpeed: readNumber(current, 'wind_speed_10m'),
      isDay: readNumber(current, 'is_day') === 1,
    },
    daily: dailyForecast,
  };
}
