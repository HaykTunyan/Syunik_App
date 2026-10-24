//

import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
  Droplets,
  RefreshCw,
  Snowflake,
  Sun,
  Umbrella,
  Wind,
  WifiOff,
  type LucideIcon,
} from 'lucide-react-native';
import { AttractionsCarousel } from '../components/AttractionsCarousel';
import {CategoryFilter} from '../components/CategoryFilter';
import { citiesData } from '../data/citiesData';
import {getPlacesForCity} from '../data/places';
import {fetchWeatherForecast, type WeatherForecast} from '../services/weatherService';


type CityDetailScreenProps = {
  city: string;
  onBack: () => void;
  onSelectPlace: (placeId: string) => void;
};

export function CityDetailScreen({ city, onBack, onSelectPlace }: CityDetailScreenProps) {
  /**
   * City Detail Screen is a React component that displays detailed information about a specific city in the Syunik region. It includes a back button, a hero image of the city, the city's title, and a description. The component uses a ScrollView to allow users to scroll through the content vertically.
   */

  const cityData = citiesData.find(c => c.latinName === city);

  const cityPlaces = cityData ? getPlacesForCity(cityData.id) : [];

  const [weather, setWeather] = useState<WeatherForecast | null>(null);
  const [weatherStatus, setWeatherStatus] = useState<'loading' | 'success' | 'error'>('loading');

  const [selectedCategory, setSelectedCategory] = useState<
    'Overview' | 'Places' | 'Details' | 'Attractions' | 'History'
  >('Overview');

  const loadWeather = useCallback(async () => {
    if (!cityData) {
      return;
    }

    setWeatherStatus('loading');

    try {
      const forecast = await fetchWeatherForecast(cityData.coords[0], cityData.coords[1]);
      setWeather(forecast);
      setWeatherStatus('success');
    } catch {
      setWeatherStatus('error');
    }
  }, [cityData]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  if (!cityData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFoundText}>City not found.</Text>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>
      <Image
        source={cityData.image}
        resizeMode="stretch"
        style={styles.heroImage}
      />
      <Text style={styles.title}>{cityData.latinName}</Text>
      <Text style={styles.description}>{cityData.description}</Text>

      <WeatherCard
        city={cityData.latinName}
        forecast={weather}
        status={weatherStatus}
        onRetry={loadWeather}
      />

      <CategoryFilter
        categories={['Overview', 'Places', 'Details', 'Attractions', 'History'] as const}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* <View style={styles.mapCard}>
        <View style={styles.mapHeader}>
          <View>
            <Text style={styles.mapEyebrow}>EXPLORE THE REGION</Text>
            <Text style={styles.infoTitle}>Syunik city map</Text>
          </View>
          <Text style={styles.mapCompass}>N ↑</Text>
        </View>
        <View style={styles.mapSurface}>
          <View style={[styles.mapContour, styles.mapContourOne]} />
          <View style={[styles.mapContour, styles.mapContourTwo]} />
          <View style={[styles.mapContour, styles.mapContourThree]} />
          {citiesData.map(city => {
            const left = ((city.coords[1] - MAP_BOUNDS.minLongitude) /
              (MAP_BOUNDS.maxLongitude - MAP_BOUNDS.minLongitude)) * 100;
            const top = ((MAP_BOUNDS.maxLatitude - city.coords[0]) /
              (MAP_BOUNDS.maxLatitude - MAP_BOUNDS.minLatitude)) * 100;
            const isSelected = city.latinName === cityData.latinName;

            return (
              <View
                key={city.id}
                style={[styles.mapPin, {left: `${left}%`, top: `${top}%`}]}
                accessibilityLabel={`${city.latinName} city on Syunik map`}>
                <View style={[styles.pinDot, isSelected && styles.pinDotSelected]} />
                <Text style={[styles.pinLabel, isSelected && styles.pinLabelSelected]}>
                  {city.latinName}
                </Text>
              </View>
            );
          })}
          <Text style={styles.mapRegionLabel}>SYUNIK</Text>
          <Text style={styles.mapRiverLabel}>VOROTAN</Text>
        </View>
        <View style={styles.mapLegend}>
          <View style={[styles.legendDot, styles.legendDotSelected]} />
          <Text style={styles.legendText}>{cityData.latinName}</Text>
          <View style={styles.legendDivider} />
          <View style={styles.legendDot} />
          <Text style={styles.legendText}>Other cities</Text>
        </View>
      </View> */}

      {(selectedCategory === 'Overview' || selectedCategory === 'Places') && (
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Most visited place</Text>
          {cityPlaces.map(place => (
            <Pressable
              key={place.id}
              style={styles.mostVisitedWrap}
              onPress={() => onSelectPlace(place.id)}
              accessibilityRole="button"
              accessibilityLabel={`Open ${place.name}`}>
              <Image source={place.image} style={styles.mostVisitedImage} resizeMode="cover" />
              <Text style={styles.highlightText}>{place.name}</Text>
            </Pressable>
          ))}
          {cityPlaces.length === 0 && <Text style={styles.emptyPlacesText}>Places for this city are being verified.</Text>}
        </View>
      )}

      {(selectedCategory === 'Overview' || selectedCategory === 'Details') && (
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>City information</Text>
          <InfoRow label="Population" value={cityData.population} />
          <InfoRow label="Area" value={cityData.size} />
          <InfoRow label="Founded" value={cityData.founding} />
          <InfoRow
            label="Coordinates"
            value={`${cityData.coords[0]}, ${cityData.coords[1]}`}
          />
        </View>
      )}

      {(selectedCategory === 'Overview' || selectedCategory === 'Attractions') && (
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Attractions</Text>
          <AttractionsCarousel
            attractions={cityPlaces.map(place => ({id: place.id, image: place.image}))}
          />
        </View>
      )}

      {(selectedCategory === 'Overview' || selectedCategory === 'History') && (
        <View style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <View>
              <Text style={styles.historyEyebrow}>SYUNIK HERITAGE</Text>
              <Text style={styles.infoTitle}>Historical places</Text>
            </View>
            <Text style={styles.historyIcon}>🏛️</Text>
          </View>
          {cityPlaces.filter(place => place.category === 'history').map(place => (
            <View key={place.name} style={styles.historyPlaceRow}>
              <Text style={styles.historyPlaceName}>{place.name}</Text>
              <Text style={styles.historyPlaceAddress}>{place.address ?? place.cityName}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

type WeatherCardProps = {
  city: string;
  forecast: WeatherForecast | null;
  status: 'loading' | 'success' | 'error';
  onRetry: () => void;
};

function WeatherCard({city, forecast, status, onRetry}: WeatherCardProps) {
  if (status === 'loading') {
    return (
      <View style={styles.weatherCard} accessibilityLabel={`Loading weather for ${city}`}>
        <ActivityIndicator color="#f8d28c" />
        <Text style={styles.weatherLoadingText}>Checking the weather in {city}…</Text>
      </View>
    );
  }

  if (status === 'error' || !forecast) {
    return (
      <View style={styles.weatherErrorCard}>
        <WifiOff size={22} color="#b84f3c" accessibilityLabel="Offline" />
        <View style={styles.weatherErrorContent}>
          <Text style={styles.weatherErrorTitle}>Weather unavailable</Text>
          <Text style={styles.weatherErrorText}>Check your connection and try again.</Text>
        </View>
        <Pressable
          accessibilityLabel={`Retry weather for ${city}`}
          accessibilityRole="button"
          onPress={onRetry}
          style={styles.weatherRetryButton}>
          <RefreshCw size={17} color="#2D4A3E" />
        </Pressable>
      </View>
    );
  }

  const currentIcon = getWeatherIcon(forecast.current.weatherCode);
  const CurrentIcon = currentIcon.icon;

  return (
    <View style={styles.weatherCard} accessibilityLabel={`Current weather in ${city}`}>
      <View style={styles.weatherHeader}>
        <View>
          <Text style={styles.weatherEyebrow}>LIVE WEATHER</Text>
          <Text style={styles.weatherTitle}>{city} today</Text>
        </View>
        <Pressable
          accessibilityLabel={`Refresh weather for ${city}`}
          accessibilityRole="button"
          onPress={onRetry}
          style={styles.weatherRefreshButton}>
          <RefreshCw size={17} color="#f8d28c" />
        </Pressable>
      </View>

      <View style={styles.currentWeatherRow}>
        <CurrentIcon size={54} color="#f8d28c" strokeWidth={1.7} />
        <View style={styles.temperatureBlock}>
          <Text style={styles.temperature}>{Math.round(forecast.current.temperature)}°</Text>
          <Text style={styles.conditionText}>{currentIcon.label}</Text>
        </View>
        <View style={styles.weatherMetaBlock}>
          <Text style={styles.weatherMetaText}>Feels {Math.round(forecast.current.feelsLike)}°</Text>
          <Text style={styles.weatherMetaText}>High {Math.round(forecast.daily[0]?.maxTemperature ?? forecast.current.temperature)}°</Text>
          <Text style={styles.weatherMetaText}>Low {Math.round(forecast.daily[0]?.minTemperature ?? forecast.current.temperature)}°</Text>
        </View>
      </View>

      <View style={styles.weatherStatsRow}>
        <WeatherStat icon={Droplets} label="Humidity" value={`${Math.round(forecast.current.humidity)}%`} />
        <WeatherStat icon={Wind} label="Wind" value={`${Math.round(forecast.current.windSpeed)} km/h`} />
        <WeatherStat icon={Umbrella} label="Rain" value={`${forecast.current.precipitation.toFixed(1)} mm`} />
      </View>

      <View style={styles.forecastDivider} />
      <View style={styles.forecastRow}>
        {forecast.daily.map(day => {
          const dayIcon = getWeatherIcon(day.weatherCode);
          const DayIcon = dayIcon.icon;

          return (
            <View key={day.date} style={styles.forecastDay}>
              <Text style={styles.forecastDayLabel}>{formatForecastDay(day.date)}</Text>
              <DayIcon size={20} color="#f8d28c" />
              <Text style={styles.forecastTemperature}>{Math.round(day.maxTemperature)}°</Text>
              <Text style={styles.forecastLow}>{Math.round(day.minTemperature)}°</Text>
            </View>
          );
        })}
      </View>
      <Text style={styles.weatherSource}>Powered by Open‑Meteo · Updated automatically</Text>
    </View>
  );
}

function WeatherStat({icon: Icon, label, value}: {icon: LucideIcon; label: string; value: string}) {
  return (
    <View style={styles.weatherStat}>
      <Icon size={15} color="#b9d0c2" />
      <View>
        <Text style={styles.weatherStatValue}>{value}</Text>
        <Text style={styles.weatherStatLabel}>{label}</Text>
      </View>
    </View>
  );
}

function formatForecastDay(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {weekday: 'short'});
}

function getWeatherIcon(code: number): {icon: LucideIcon; label: string} {
  if (code === 0) {
    return {icon: Sun, label: 'Clear sky'};
  }
  if (code <= 2) {
    return {icon: CloudSun, label: 'Partly cloudy'};
  }
  if (code === 3) {
    return {icon: Cloud, label: 'Overcast'};
  }
  if (code === 45 || code === 48) {
    return {icon: CloudFog, label: 'Foggy'};
  }
  if (code >= 51 && code <= 67) {
    return {icon: CloudRain, label: 'Rain showers'};
  }
  if (code >= 71 && code <= 77) {
    return {icon: Snowflake, label: 'Snowy'};
  }
  if (code >= 85 && code <= 86) {
    return {icon: Snowflake, label: 'Snow showers'};
  }
  if (code >= 95) {
    return {icon: CloudLightning, label: 'Thunderstorms'};
  }

  return {icon: CloudRain, label: 'Mixed conditions'};
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    paddingTop: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 16,
    color: '#4d4d4d',
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2f3e2f',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4d4d4d',
    marginBottom: 18,
  },
  weatherCard: {
    backgroundColor: '#24483d',
    borderRadius: 22,
    marginBottom: 18,
    overflow: 'hidden',
    padding: 18,
  },
  weatherLoadingText: {
    color: '#e8f0e9',
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
  },
  weatherErrorCard: {
    alignItems: 'center',
    backgroundColor: '#fff7f1',
    borderColor: '#ead8ca',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 18,
    padding: 15,
  },
  weatherErrorContent: {flex: 1, marginLeft: 11},
  weatherErrorTitle: {color: '#2f3e2f', fontSize: 15, fontWeight: '800'},
  weatherErrorText: {color: '#687362', fontSize: 12, marginTop: 3},
  weatherRetryButton: {alignItems: 'center', backgroundColor: '#e3efeA', borderRadius: 18, height: 36, justifyContent: 'center', width: 36},
  weatherHeader: {alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between'},
  weatherEyebrow: {color: '#b9d0c2', fontSize: 10, fontWeight: '800', letterSpacing: 1.4},
  weatherTitle: {color: '#fffdf8', fontSize: 18, fontWeight: '800', marginTop: 3},
  weatherRefreshButton: {alignItems: 'center', backgroundColor: '#31594b', borderRadius: 18, height: 36, justifyContent: 'center', width: 36},
  currentWeatherRow: {alignItems: 'center', flexDirection: 'row', marginTop: 19},
  temperatureBlock: {marginLeft: 12},
  temperature: {color: '#fffdf8', fontSize: 46, fontWeight: '800', letterSpacing: -2},
  conditionText: {color: '#f8d28c', fontSize: 13, fontWeight: '700', marginTop: -4},
  weatherMetaBlock: {borderLeftColor: '#416456', borderLeftWidth: 1, marginLeft: 'auto', paddingLeft: 14},
  weatherMetaText: {color: '#dce8df', fontSize: 12, lineHeight: 20},
  weatherStatsRow: {borderTopColor: '#416456', borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 17, paddingTop: 14},
  weatherStat: {alignItems: 'center', flexDirection: 'row', gap: 6},
  weatherStatValue: {color: '#fffdf8', fontSize: 11, fontWeight: '800'},
  weatherStatLabel: {color: '#b9d0c2', fontSize: 10, marginTop: 1},
  forecastDivider: {backgroundColor: '#416456', height: 1, marginTop: 16},
  forecastRow: {flexDirection: 'row', justifyContent: 'space-between', paddingTop: 14},
  forecastDay: {alignItems: 'center', gap: 4},
  forecastDayLabel: {color: '#b9d0c2', fontSize: 10, fontWeight: '700'},
  forecastTemperature: {color: '#fffdf8', fontSize: 12, fontWeight: '800'},
  forecastLow: {color: '#9bb8a8', fontSize: 11},
  weatherSource: {color: '#86a697', fontSize: 9, marginTop: 14, textAlign: 'center'},
  mapCard: {
    backgroundColor: '#eef3e9',
    borderRadius: 18,
    borderColor: '#d8e3d1',
    borderWidth: 1,
    marginBottom: 16,
    padding: 14,
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  mapEyebrow: {
    color: '#71866a',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 3,
  },
  mapCompass: {
    color: '#61785b',
    fontSize: 12,
    fontWeight: '800',
  },
  mapSurface: {
    height: 214,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 14,
    backgroundColor: '#dbe8d4',
    borderWidth: 1,
    borderColor: '#c8d9bf',
  },
  mapContour: {
    position: 'absolute',
    borderColor: '#c2d6b9',
    borderWidth: 1,
    borderRadius: 120,
    transform: [{rotate: '-22deg'}],
  },
  mapContourOne: {
    width: 320,
    height: 110,
    top: 28,
    left: -70,
  },
  mapContourTwo: {
    width: 350,
    height: 135,
    top: 88,
    left: 48,
  },
  mapContourThree: {
    width: 240,
    height: 90,
    top: -12,
    left: 118,
  },
  mapPin: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{translateX: -8}, {translateY: -8}],
  },
  pinDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6c8b61',
    borderWidth: 2,
    borderColor: '#f4f8f1',
  },
  pinDotSelected: {
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: '#c16b48',
  },
  pinLabel: {
    marginTop: 3,
    color: '#50664a',
    fontSize: 10,
    fontWeight: '700',
  },
  pinLabelSelected: {
    color: '#9b4e32',
    fontSize: 11,
  },
  mapRegionLabel: {
    position: 'absolute',
    right: 16,
    bottom: 17,
    color: '#a8c09f',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 3,
  },
  mapRiverLabel: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    color: '#76999a',
    fontSize: 9,
    fontStyle: 'italic',
    letterSpacing: 1,
    transform: [{rotate: '-20deg'}],
  },
  mapLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6c8b61',
    marginRight: 5,
  },
  legendDotSelected: {
    backgroundColor: '#c16b48',
  },
  legendText: {
    color: '#5d7056',
    fontSize: 11,
    fontWeight: '600',
  },
  legendDivider: {
    width: 1,
    height: 14,
    backgroundColor: '#c7d7c0',
    marginHorizontal: 10,
  },
  infoCard: {
    backgroundColor: '#fffdf8',
    borderRadius: 16,
    borderColor: '#e8dccb',
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
  },
  infoTitle: {
    color: '#2f3e2f',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  mostVisitedWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  mostVisitedImage: {
    width: 52,
    height: 52,
    borderRadius: 12,
  },
  highlightText: {
    color: '#4b6b3b',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    flex: 1,
  },
  emptyPlacesText: {
    color: '#687362',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
  },
  infoRow: {
    borderBottomColor: '#eee5d9',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
    paddingHorizontal: 10,
  },
  infoLabel: {
    color: '#5f5f5f',
    fontSize: 14,
    fontWeight: '600',
  },
  infoValue: {
    color: '#2f3e2f',
    fontSize: 14,
  },
  historyCard: {
    backgroundColor: '#efe8db',
    borderColor: '#e1d4c2',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
  },
  historyHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  historyEyebrow: {
    color: '#a45c3c',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.15,
    marginBottom: 3,
  },
  historyIcon: {
    fontSize: 24,
  },
  historyPlaceRow: {
    borderTopColor: '#e1d4c2',
    borderTopWidth: 1,
    paddingVertical: 11,
  },
  historyPlaceName: {
    color: '#2f3e2f',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  historyPlaceAddress: {
    color: '#687362',
    fontSize: 13,
    lineHeight: 18,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6d7a5d',
    fontWeight: '600',
  },
});
