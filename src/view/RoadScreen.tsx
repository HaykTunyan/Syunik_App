import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
    Alert,
    Image,
    Linking,
    Modal,
    PermissionsAndroid,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    type ImageSourcePropType,
} from 'react-native';
import { HeaderBack } from '../components/HeaderBack';
import { CategoryFilter } from '../components/CategoryFilter';
import { loadFavorites, toggleFavorite } from '../features/profile/services/profileStorage';

import {
    Binoculars,
    BedDouble,
    ChevronRight,
    Expand,
    Heart,
    Footprints,
    Landmark,
    Leaf,
    LocateFixed,
    MapPin,
    Minimize2,
    Navigation,
    Star,
    Utensils,
    X,
    type LucideIcon,
} from 'lucide-react-native';
import MapView, {
    UrlTile,
    Marker,
    type Region,
    type UserLocationChangeEvent,
} from 'react-native-maps';

type RoadScreenProps = {
    onBack: () => void;
};

type RoadRoute = {
    name: string;
    from: string;
    to: string;
    distance: string;
    time: string;
    description: string;
    color: string;
};

const placeCategories = [
    'All',
    'Historical Places',
    'Attractions',
    'Restaurants',
    'Hotels',
    'Nature',
    'Hiking',
    'Viewpoints',
] as const;

type PlaceCategory = Exclude<(typeof placeCategories)[number], 'All'>;

type MapPlace = {
    id: string;
    name: string;
    description: string;
    category: PlaceCategory;
    latitude: number;
    longitude: number;
    image?: ImageSourcePropType;
    contact?: string;
};

const categoryStyles: Record<PlaceCategory, {color: string; Icon: LucideIcon}> = {
    'Historical Places': {color: '#9c563d', Icon: Landmark},
    Attractions: {color: '#c18a32', Icon: Star},
    Restaurants: {color: '#c45a43', Icon: Utensils},
    Hotels: {color: '#54765c', Icon: BedDouble},
    Nature: {color: '#4d8a6b', Icon: Leaf},
    Hiking: {color: '#546f96', Icon: Footprints},
    Viewpoints: {color: '#74619b', Icon: Binoculars},
};

const mapPlaces: MapPlace[] = [
    {id: 'tatev-monastery', name: 'Tatev Monastery', description: 'A medieval monastery overlooking the Vorotan Gorge.', category: 'Historical Places', latitude: 39.3794, longitude: 46.2501, image: require('../assets/images/for-travel/tatev.png')},
    {id: 'zorats-karer', name: 'Zorats Karer', description: 'An ancient stone monument near Sisian.', category: 'Historical Places', latitude: 39.5506, longitude: 46.0283, image: require('../assets/images/for-travel/karahunj.png')},
    {id: 'khndzoresk-old-village', name: 'Old Khndzoresk', description: 'Historic cave dwellings in the Khndzoresk gorge.', category: 'Historical Places', latitude: 39.5044, longitude: 46.4352, image: require('../assets/images/for-travel/khndzoresk.png')},
    {id: 'wings-of-tatev', name: 'Wings of Tatev', description: 'The cableway connecting Halidzor and Tatev.', category: 'Attractions', latitude: 39.4042, longitude: 46.2866, image: require('../assets/images/for-travel/halidzor.png')},
    {id: 'devils-bridge', name: 'Devil’s Bridge', description: 'A natural travertine bridge in the Vorotan Gorge.', category: 'Attractions', latitude: 39.3215, longitude: 46.2675, image: require('../assets/images/for-travel/devils_bridge.png')},
    {id: 'khndzoresk-bridge', name: 'Khndzoresk Swinging Bridge', description: 'A suspension bridge across the old village gorge.', category: 'Attractions', latitude: 39.5042, longitude: 46.4358, image: require('../assets/images/goris/goris_khndzoresk_bridge_ai.png')},
    {id: 'goris-restaurant', name: 'Goris dining', description: 'Restaurants and cafes in central Goris.', category: 'Restaurants', latitude: 39.5111, longitude: 46.3417},
    {id: 'kapan-restaurant', name: 'Kapan dining', description: 'Restaurants and cafes in central Kapan.', category: 'Restaurants', latitude: 39.2075, longitude: 46.4058},
    {id: 'sisian-restaurant', name: 'Sisian dining', description: 'Restaurants and cafes in central Sisian.', category: 'Restaurants', latitude: 39.5203, longitude: 46.0285},
    {id: 'goris-hotels', name: 'Goris stays', description: 'Hotels and guesthouses in Goris.', category: 'Hotels', latitude: 39.5067, longitude: 46.3375},
    {id: 'tatev-guesthouses', name: 'Tatev stays', description: 'Guesthouses in Tatev village.', category: 'Hotels', latitude: 39.3854, longitude: 46.2445},
    {id: 'meghri-hotels', name: 'Meghri stays', description: 'Hotels and guesthouses in Meghri.', category: 'Hotels', latitude: 38.9022, longitude: 46.2444},
    {id: 'shaki-waterfall', name: 'Shaki Waterfall', description: 'A waterfall near Sisian, surrounded by basalt cliffs.', category: 'Nature', latitude: 39.5522, longitude: 45.9933, image: require('../assets/images/sisian/shaki-waterfall-sisian.png')},
    {id: 'vorotan-gorge', name: 'Vorotan Gorge', description: 'A dramatic river gorge near Tatev.', category: 'Nature', latitude: 39.3545, longitude: 46.2672},
    {id: 'khustup', name: 'Mount Khustup', description: 'A prominent peak south of Kapan.', category: 'Nature', latitude: 39.1458, longitude: 46.3447, image: require('../assets/images/for-travel/khustup.png')},
    {id: 'tatev-trail', name: 'Tatev canyon trail', description: 'A hiking route through the Vorotan canyon landscape.', category: 'Hiking', latitude: 39.3668, longitude: 46.2578},
    {id: 'khustup-trail', name: 'Khustup trailhead', description: 'A starting point for hikes on Mount Khustup.', category: 'Hiking', latitude: 39.1758, longitude: 46.3735},
    {id: 'old-goris-trail', name: 'Old Goris trail', description: 'A walking trail among Goris’s distinctive rock formations.', category: 'Hiking', latitude: 39.5053, longitude: 46.3521},
    {id: 'tatev-viewpoint', name: 'Tatev Gorge viewpoint', description: 'Panoramic views across the Vorotan Gorge.', category: 'Viewpoints', latitude: 39.3818, longitude: 46.2385},
    {id: 'goris-viewpoint', name: 'Goris panorama', description: 'A viewpoint over Goris and its surrounding cliffs.', category: 'Viewpoints', latitude: 39.5212, longitude: 46.3508},
    {id: 'khustup-viewpoint', name: 'Khustup viewpoint', description: 'Mountain views from the Kapan highlands.', category: 'Viewpoints', latitude: 39.1568, longitude: 46.3672},
];

const routes: RoadRoute[] = [
    {
        name: 'North Syunik route',
        from: 'Sisian',
        to: 'Goris',
        distance: '115 km',
        time: '2 h 10 min',
        description: 'A scenic highland road connecting Vorotan landscapes, Zorats Karer, and Goris.',
        color: '#b86b48',
    },
    {
        name: 'Tatev mountain road',
        from: 'Goris',
        to: 'Tatev',
        distance: '35 km',
        time: '55 min',
        description: 'A winding route through dramatic cliffs, the Devil’s Bridge area, and Tatev canyon.',
        color: '#547b4b',
    },
    {
        name: 'Southern Syunik route',
        from: 'Kapan',
        to: 'Meghri',
        distance: '150 km',
        time: '2 h 40 min',
        description: 'A long mountain journey through Qajaran and the warm orchards of southern Syunik.',
        color: '#6d7fa0',
    },
];

export function RoadScreen({ onBack }: RoadScreenProps) {

    /**
     * RoadScreen is a React component that displays a map of Syunik with various points of interest, categorized by type. It allows users to filter places by category, view details about selected places, and see their own location on the map. The component uses React Native Maps for rendering the map and markers, and it manages state for selected categories, places, and user location. It also handles permissions for accessing the user's location and provides functionality to open directions in Google Maps.
     * 
     */

    const mapRef = useRef<MapView>(null);
    const [selectedCategory, setSelectedCategory] = useState<(typeof placeCategories)[number]>('All');
    const [selectedPlace, setSelectedPlace] = useState<MapPlace | null>(null);
    const [showPlaceDetails, setShowPlaceDetails] = useState(false);
    const [isMapFullscreen, setIsMapFullscreen] = useState(false);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [userLocation, setUserLocation] = useState<{latitude: number; longitude: number} | null>(null);
    const [showUserLocation, setShowUserLocation] = useState(false);
    const [centerWhenLocationArrives, setCenterWhenLocationArrives] = useState(false);
    const locationErrorShown = useRef(false);
    const [mapRegion, setMapRegion] = useState<Region>({
        latitude: 39.5,
        longitude: 46.3,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
    });

    const visiblePlaces = useMemo(
        () => mapPlaces.filter(place => selectedCategory === 'All' || place.category === selectedCategory),
        [selectedCategory],
    );

    useEffect(() => {
        let isActive = true;
        loadFavorites()
            .then(savedFavorites => {
                if (isActive) {
                    setFavorites(savedFavorites);
                }
            })
            .catch(() => {
                if (isActive) {
                    Alert.alert('Favorites', 'Could not load your saved places.');
                }
            });

        return () => {
            isActive = false;
        };
    }, []);

    const markerGroups = useMemo(() => {
        const cosineLatitude = Math.cos((mapRegion.latitude * Math.PI) / 180);
        const cellSize = Math.max(
            mapRegion.latitudeDelta,
            mapRegion.longitudeDelta * cosineLatitude,
        ) * (64 / 360);
        const groups = new Map<string, MapPlace[]>();

        visiblePlaces
            .filter(place => place.id !== selectedPlace?.id)
            .forEach(place => {
            const x = place.longitude * cosineLatitude;
            const key = `${Math.floor(place.latitude / cellSize)}:${Math.floor(x / cellSize)}`;
            const group = groups.get(key) ?? [];
            group.push(place);
            groups.set(key, group);
        });

        const groupedMarkers = Array.from(groups.values(), places => ({
            places,
            latitude: places.reduce((total, place) => total + place.latitude, 0) / places.length,
            longitude: places.reduce((total, place) => total + place.longitude, 0) / places.length,
        }));

        if (selectedPlace && visiblePlaces.some(place => place.id === selectedPlace.id)) {
            groupedMarkers.push({
                places: [selectedPlace],
                latitude: selectedPlace.latitude,
                longitude: selectedPlace.longitude,
            });
        }

        return groupedMarkers;
    }, [mapRegion, selectedPlace, visiblePlaces]);

    const zoomToGroup = (latitude: number, longitude: number) => {
        mapRef.current?.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: Math.max(mapRegion.latitudeDelta / 3, 0.025),
            longitudeDelta: Math.max(mapRegion.longitudeDelta / 3, 0.025),
        }, 300);
    };

    const handleUserLocationChange = (event: UserLocationChangeEvent) => {
        if (event.nativeEvent.error) {
            if (!locationErrorShown.current) {
                locationErrorShown.current = true;
                Alert.alert(
                    'Location unavailable',
                    'Allow location access in your phone settings and make sure location services are turned on.',
                    [
                        {text: 'Cancel', style: 'cancel'},
                        {text: 'Open settings', onPress: openAppSettings},
                    ],
                );
            }
            return;
        }

        const coordinate = event.nativeEvent.coordinate;
        if (coordinate) {
            locationErrorShown.current = false;
            const location = {
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
            };
            setUserLocation(location);
            if (centerWhenLocationArrives) {
                mapRef.current?.animateToRegion({
                    ...location,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                }, 350);
                setCenterWhenLocationArrives(false);
            }
        }
    };

    const centerMapOnLocation = (location: {latitude: number; longitude: number}) => {
        mapRef.current?.animateToRegion({
            ...location,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
        }, 350);
    };

    const showLocationPermissionHelp = (canOpenSettings: boolean) => {
        Alert.alert(
            'Location access needed',
            'Allow location access in your phone settings to show your position on the map.',
            canOpenSettings
                ? [
                    {text: 'Cancel', style: 'cancel'},
                    {text: 'Open settings', onPress: openAppSettings},
                ]
                : [{text: 'OK'}],
        );
    };

    const openAppSettings = () => {
        Linking.openSettings().catch(() => {
            Alert.alert('Settings', 'Could not open phone settings.');
        });
    };

    const handleShowMyLocation = async () => {
        if (Platform.OS === 'android') {
            try {
                const permission = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location access',
                        message: 'Allow Syunik Dreams to show your position on the map and calculate distances.',
                        buttonPositive: 'Allow',
                        buttonNegative: 'Not now',
                    },
                );
                if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
                    showLocationPermissionHelp(permission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN);
                    return;
                }
            } catch {
                Alert.alert('Location', 'Could not request location access. Please try again.');
                return;
            }
        }

        setShowUserLocation(true);
        if (userLocation) {
            centerMapOnLocation(userLocation);
        } else {
            setCenterWhenLocationArrives(true);
        }
    };

    const distanceToSelectedPlace = useMemo(() => {
        if (!selectedPlace || !userLocation) {
            return null;
        }
        const radians = (degrees: number) => (degrees * Math.PI) / 180;
        const latitudeDelta = radians(selectedPlace.latitude - userLocation.latitude);
        const longitudeDelta = radians(selectedPlace.longitude - userLocation.longitude);
        const haversine = Math.min(
            1,
            Math.max(
                0,
                Math.sin(latitudeDelta / 2) ** 2 +
                    Math.cos(radians(userLocation.latitude)) *
                        Math.cos(radians(selectedPlace.latitude)) *
                        Math.sin(longitudeDelta / 2) ** 2,
            ),
        );
        const distanceInMeters = 6371000 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

        return distanceInMeters < 1000
            ? `${Math.round(distanceInMeters)} m away`
            : `${(distanceInMeters / 1000).toFixed(1)} km away`;
    }, [selectedPlace, userLocation]);

    const handleToggleFavorite = async (place: MapPlace) => {
        try {
            const isFavorite = await toggleFavorite(place.name);
            setFavorites(current =>
                isFavorite
                    ? [...current.filter(item => item.toLocaleLowerCase() !== place.name.toLocaleLowerCase()), place.name]
                    : current.filter(item => item.toLocaleLowerCase() !== place.name.toLocaleLowerCase()),
            );
        } catch {
            Alert.alert('Favorites', 'Could not update your saved places. Please try again.');
        }
    };

    const openDirections = async (place: MapPlace) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
        try {
            await Linking.openURL(url);
        } catch {
            Alert.alert('Directions', 'Could not open directions for this place.');
        }
    };

    const renderMarkers = () => markerGroups.map(group => {
        if (group.places.length > 1) {
            return (
                <Marker
                    key={group.places.map(place => place.id).join('-')}
                    coordinate={{latitude: group.latitude, longitude: group.longitude}}
                    accessibilityLabel={`${group.places.length} places; tap to zoom in`}
                    onPress={() => zoomToGroup(group.latitude, group.longitude)}
                    tracksViewChanges={false}>
                    <View style={styles.clusterMarker}>
                        <Text style={styles.clusterCount}>{group.places.length}</Text>
                    </View>
                </Marker>
            );
        }

        const place = group.places[0];
        const {color, Icon} = categoryStyles[place.category];
        return (
            <Marker
                key={place.id}
                coordinate={{latitude: place.latitude, longitude: place.longitude}}
                title={place.name}
                description={place.description}
                accessibilityLabel={`${place.name}, ${place.category}`}
                onPress={() => setSelectedPlace(place)}
                tracksViewChanges={selectedPlace?.id === place.id}>
                <View style={[
                    styles.placeMarker,
                    {backgroundColor: color},
                    selectedPlace?.id === place.id && styles.selectedPlaceMarker,
                ]}>
                    <Icon color="#fffdf8" size={18} strokeWidth={2.4} />
                </View>
            </Marker>
        );
    });

    const renderMapView = (fullscreen: boolean) => (
        <MapView
            ref={mapRef}
            style={fullscreen ? styles.fullscreenNativeMap : styles.nativeMap}
            initialRegion={mapRegion}
            onRegionChangeComplete={setMapRegion}
            showsUserLocation={showUserLocation}
            onUserLocationChange={handleUserLocationChange}>
            <UrlTile
                urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                maximumZ={19}
                flipY={false}
            />
            {renderMarkers()}
        </MapView>
    );

    const renderSelectedPlaceCard = () => {
        if (!selectedPlace) {
            return null;
        }

        return (
            <View style={styles.placeCard}>
                <View style={styles.placeCardHeading}>
                    <Text style={styles.placeCardEyebrow}>SELECTED PLACE</Text>
                    <Pressable
                        onPress={() => {
                            setSelectedPlace(null);
                            setShowPlaceDetails(false);
                        }}
                        accessibilityRole="button"
                        accessibilityLabel="Close place details"
                        hitSlop={8}
                        style={styles.closeButton}>
                        <X size={18} color="#46564a" />
                    </Pressable>
                </View>
                <View style={styles.placeSummary}>
                    {selectedPlace.image ? (
                        <Image source={selectedPlace.image} style={styles.placeImage} resizeMode="cover" />
                    ) : (
                        <View style={[styles.placeImagePlaceholder, {backgroundColor: categoryStyles[selectedPlace.category].color}]}>
                            {React.createElement(categoryStyles[selectedPlace.category].Icon, {
                                color: '#fffdf8',
                                size: 24,
                            })}
                        </View>
                    )}
                    <View style={styles.placeSummaryText}>
                        <Text style={styles.placeName}>{selectedPlace.name}</Text>
                        <Text style={styles.placeCategory}>{selectedPlace.category}</Text>
                        <Text style={styles.placeDescription} numberOfLines={2}>{selectedPlace.description}</Text>
                    </View>
                </View>
                <View style={styles.placeMeta}>
                    <MapPin size={15} color="#71866a" />
                    <Text style={styles.placeMetaText}>
                        {selectedPlace.latitude.toFixed(4)}, {selectedPlace.longitude.toFixed(4)}
                    </Text>
                    {distanceToSelectedPlace && (
                        <Text style={styles.placeDistance}>{distanceToSelectedPlace}</Text>
                    )}
                </View>
                {selectedPlace.contact && (
                    <Text style={styles.placeContact}>{selectedPlace.contact}</Text>
                )}
                <View style={styles.placeActions}>
                    <Pressable
                        onPress={() => setShowPlaceDetails(true)}
                        style={[styles.placeAction, styles.detailsAction]}
                        accessibilityRole="button"
                        accessibilityLabel="View full details">
                        <Text style={styles.detailsActionText}>Full details</Text>
                        <ChevronRight size={16} color="#fffdf8" />
                    </Pressable>
                    <Pressable
                        onPress={() => handleToggleFavorite(selectedPlace)}
                        style={styles.iconAction}
                        accessibilityRole="button"
                        accessibilityLabel={favorites.some(item => item.toLocaleLowerCase() === selectedPlace.name.toLocaleLowerCase()) ? 'Remove from favorites' : 'Save to favorites'}>
                        <Heart
                            size={19}
                            color="#9c563d"
                            fill={favorites.some(item => item.toLocaleLowerCase() === selectedPlace.name.toLocaleLowerCase()) ? '#9c563d' : 'transparent'}
                        />
                        <Text style={styles.iconActionText}>
                            {favorites.some(item => item.toLocaleLowerCase() === selectedPlace.name.toLocaleLowerCase()) ? 'Saved' : 'Save'}
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => openDirections(selectedPlace)}
                        style={styles.iconAction}
                        accessibilityRole="button"
                        accessibilityLabel="Get directions">
                        <Navigation size={19} color="#2d4a3e" />
                        <Text style={styles.iconActionText}>Directions</Text>
                    </Pressable>
                </View>
            </View>
        );
    };

    /**
     * 
     * RoadScreen is a React component that displays information about the roads and routes in the Syunik region. It includes a back button, a title, an introduction, a map of the region, and a list of popular routes with details such as distance, time, and description. The component uses a ScrollView to allow users to scroll through the content vertically.
     * Props:
     * - onBack: A function that is called when the back button is pressed. This allows the parent component to handle navigation back to the previous screen.
     * 
     * The component uses the react-native-maps library to display a map of the Syunik region, with markers for key locations. The routes are displayed as cards with color-coded accents for easy identification.
     */


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <HeaderBack onBack={onBack} />
                <Text style={styles.eyebrow}>TRAVEL SMART</Text>
                <Text style={styles.title}>Roads of Syunik</Text>
                <Text style={styles.intro}>
                    Follow the mountain roads between Syunik’s cities, villages, monasteries, and viewpoints.
                </Text>

                {/* <View style={styles.mapCard}>
          <View style={styles.mapHeader}>
            <View>
              <Text style={styles.mapEyebrow}>REGIONAL ROUTE MAP</Text>
              <Text style={styles.mapTitle}>Find your way through Syunik</Text>
            </View>
            <Text style={styles.compass}>N ↑</Text>
          </View>
          <View style={styles.mapSurface}>
            <View style={[styles.roadLine, styles.roadLineNorth]} />
            <View style={[styles.roadLine, styles.roadLineSouth]} />
            <View style={[styles.roadLine, styles.roadLineWest]} />
            <View style={[styles.mapContour, styles.contourOne]} />
            <View style={[styles.mapContour, styles.contourTwo]} />
            {citiesData.map(city => {
              const left = ((city.coords[1] - mapBounds.minLongitude) /
                (mapBounds.maxLongitude - mapBounds.minLongitude)) * 100;
              const top = ((mapBounds.maxLatitude - city.coords[0]) /
                (mapBounds.maxLatitude - mapBounds.minLatitude)) * 100;

              return (
                <View key={city.id} style={[styles.mapPin, {left: `${left}%`, top: `${top}%`}]}> 
                  <View style={styles.pinDot} />
                  <Text style={styles.pinLabel}>{city.latinName}</Text>
                </View>
              );
            })}
            <Text style={styles.regionLabel}>SYUNIK</Text>
            <Text style={styles.mapNote}>Mountain roads</Text>
          </View>
          <View style={styles.mapFooter}>
            <Text style={styles.mapFooterText}>6 city stops</Text>
            <Text style={styles.mapFooterText}>•</Text>
            <Text style={styles.mapFooterText}>Plan for curves and changing weather</Text>
          </View>
        </View> */}

                <CategoryFilter
                    categories={placeCategories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={category => {
                        setSelectedCategory(category);
                        setSelectedPlace(null);
                        setShowPlaceDetails(false);
                    }}
                />

                {/* Map of Syunik */}
        <View style={styles.mapContainer}>
                    <Pressable
                        onPress={() => setIsMapFullscreen(true)}
                        style={styles.openMapButton}
                        accessibilityRole="button"
                        accessibilityLabel="Open full-screen interactive map">
                        <Expand size={18} color="#fffdf8" />
                        <Text style={styles.openMapButtonText}>Open Map</Text>
                    </Pressable>
                    <View style={styles.mapCard}>
                        {!isMapFullscreen && renderMapView(false)}
                        <View style={styles.mapControls}>
                            <Pressable
                                onPress={handleShowMyLocation}
                                style={styles.mapControlButton}
                        accessibilityRole="button"
                        accessibilityLabel="Show my location on the map">
                        <LocateFixed size={20} color="#2d4a3e" />
                    </Pressable>
                </View>
                {selectedPlace && (
                    <View style={styles.placeCard}>
                        <View style={styles.placeCardHeading}>
                            <Text style={styles.placeCardEyebrow}>SELECTED PLACE</Text>
                            <Pressable
                                onPress={() => {
                                    setSelectedPlace(null);
                                    setShowPlaceDetails(false);
                                }}
                                accessibilityRole="button"
                                accessibilityLabel="Close place details"
                                hitSlop={8}
                                style={styles.closeButton}>
                                <X size={18} color="#46564a" />
                            </Pressable>
                        </View>
                        <View style={styles.placeSummary}>
                            {selectedPlace.image ? (
                                <Image source={selectedPlace.image} style={styles.placeImage} resizeMode="cover" />
                            ) : (
                                <View style={[styles.placeImagePlaceholder, {backgroundColor: categoryStyles[selectedPlace.category].color}]}>
                                    {React.createElement(categoryStyles[selectedPlace.category].Icon, {
                                        color: '#fffdf8',
                                        size: 24,
                                    })}
                                </View>
                            )}
                            <View style={styles.placeSummaryText}>
                                <Text style={styles.placeName}>{selectedPlace.name}</Text>
                                <Text style={styles.placeCategory}>{selectedPlace.category}</Text>
                                <Text style={styles.placeDescription} numberOfLines={2}>{selectedPlace.description}</Text>
                            </View>
                        </View>
                        <View style={styles.placeMeta}>
                            <MapPin size={15} color="#71866a" />
                            <Text style={styles.placeMetaText}>
                                {selectedPlace.latitude.toFixed(4)}, {selectedPlace.longitude.toFixed(4)}
                            </Text>
                            {distanceToSelectedPlace && (
                                <Text style={styles.placeDistance}>{distanceToSelectedPlace}</Text>
                            )}
                        </View>
                        {selectedPlace.contact && (
                            <Text style={styles.placeContact}>{selectedPlace.contact}</Text>
                        )}
                        <View style={styles.placeActions}>
                            <Pressable
                                onPress={() => setShowPlaceDetails(true)}
                                style={[styles.placeAction, styles.detailsAction]}
                                accessibilityRole="button"
                                accessibilityLabel="View full details">
                                <Text style={styles.detailsActionText}>Full details</Text>
                                <ChevronRight size={16} color="#fffdf8" />
                            </Pressable>
                            <Pressable
                                onPress={() => handleToggleFavorite(selectedPlace)}
                                style={styles.iconAction}
                                accessibilityRole="button"
                                accessibilityLabel={favorites.some(item => item.toLocaleLowerCase() === selectedPlace.name.toLocaleLowerCase()) ? 'Remove from favorites' : 'Save to favorites'}>
                                <Heart
                                    size={19}
                                    color="#9c563d"
                                    fill={favorites.some(item => item.toLocaleLowerCase() === selectedPlace.name.toLocaleLowerCase()) ? '#9c563d' : 'transparent'}
                                />
                                <Text style={styles.iconActionText}>
                                    {favorites.some(item => item.toLocaleLowerCase() === selectedPlace.name.toLocaleLowerCase()) ? 'Saved' : 'Save'}
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={() => openDirections(selectedPlace)}
                                style={styles.iconAction}
                                accessibilityRole="button"
                                accessibilityLabel="Get directions">
                                <Navigation size={19} color="#2d4a3e" />
                                <Text style={styles.iconActionText}>Directions</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            </View>
        </View>
        <Modal
            visible={isMapFullscreen}
            animationType="slide"
            onRequestClose={() => setIsMapFullscreen(false)}>
            {isMapFullscreen && (
                <View style={styles.fullscreenMapContainer}>
                    {renderMapView(true)}
                    <View style={styles.fullscreenMapControls}>
                        <Pressable
                            onPress={() => setIsMapFullscreen(false)}
                            style={styles.fullscreenCloseButton}
                            accessibilityRole="button"
                            accessibilityLabel="Close full screen map">
                            <Minimize2 size={20} color="#2d4a3e" />
                            <Text style={styles.fullscreenCloseText}>Close map</Text>
                        </Pressable>
                        <Pressable
                            onPress={handleShowMyLocation}
                            style={styles.mapControlButton}
                            accessibilityRole="button"
                            accessibilityLabel="Show my location on the map">
                            <LocateFixed size={20} color="#2d4a3e" />
                        </Pressable>
                    </View>
                    {renderSelectedPlaceCard()}
                </View>
            )}
        </Modal>
        <Modal
            visible={showPlaceDetails && selectedPlace !== null}
            animationType="slide"
            transparent
            onRequestClose={() => setShowPlaceDetails(false)}>
            {selectedPlace && (
                <View style={styles.detailsBackdrop}>
                    <View style={styles.detailsModal}>
                        <View style={styles.detailsHeader}>
                            <Text style={styles.detailsEyebrow}>PLACE DETAILS</Text>
                            <Pressable
                                onPress={() => setShowPlaceDetails(false)}
                                accessibilityRole="button"
                                accessibilityLabel="Close full place details"
                                hitSlop={8}>
                                <X size={22} color="#46564a" />
                            </Pressable>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {selectedPlace.image && (
                                <Image source={selectedPlace.image} style={styles.detailsImage} resizeMode="cover" />
                            )}
                            <Text style={styles.detailsName}>{selectedPlace.name}</Text>
                            <Text style={styles.detailsCategory}>{selectedPlace.category}</Text>
                            <Text style={styles.detailsDescription}>{selectedPlace.description}</Text>
                            <View style={styles.detailsLocation}>
                                <MapPin size={17} color="#71866a" />
                                <Text style={styles.detailsLocationText}>
                                    {selectedPlace.latitude.toFixed(5)}, {selectedPlace.longitude.toFixed(5)}
                                </Text>
                            </View>
                            {distanceToSelectedPlace && (
                                <Text style={styles.detailsDistance}>Distance from you: {distanceToSelectedPlace}</Text>
                            )}
                            {selectedPlace.contact && (
                                <Text style={styles.detailsContact}>Contact: {selectedPlace.contact}</Text>
                            )}
                            <View style={styles.detailsActions}>
                                <Pressable
                                    onPress={() => handleToggleFavorite(selectedPlace)}
                                    style={styles.detailsSecondaryAction}
                                    accessibilityRole="button">
                                    <Heart
                                        size={18}
                                        color="#9c563d"
                                        fill={favorites.some(item => item.toLocaleLowerCase() === selectedPlace.name.toLocaleLowerCase()) ? '#9c563d' : 'transparent'}
                                    />
                                    <Text style={styles.detailsSecondaryText}>
                                        {favorites.some(item => item.toLocaleLowerCase() === selectedPlace.name.toLocaleLowerCase()) ? 'Saved to favorites' : 'Save to favorites'}
                                    </Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => openDirections(selectedPlace)}
                                    style={styles.detailsPrimaryAction}
                                    accessibilityRole="button">
                                    <Navigation size={18} color="#fffdf8" />
                                    <Text style={styles.detailsPrimaryText}>Get directions</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            )}
        </Modal>

                <View style={styles.notice}>
                    <Text style={styles.noticeIcon}>i</Text>
                    <Text style={styles.noticeText}>
                        Mountain routes can be narrow. Start with daylight, keep fuel topped up, and check local conditions before leaving.
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>Popular routes</Text>
                {routes.map(route => (
                    <Pressable key={route.name} style={styles.routeCard} accessibilityRole="button" accessibilityLabel={`${route.name}, ${route.from} to ${route.to}`}>
                        <View style={[styles.routeAccent, { backgroundColor: route.color }]} />
                        <View style={styles.routeBody}>
                            <View style={styles.routeHeading}>
                                <Text style={styles.routeName}>{route.name}</Text>
                                <Text style={styles.routeArrow}>→</Text>
                            </View>
                            <Text style={styles.routeCities}>{route.from}  •  {route.to}</Text>
                            <Text style={styles.routeDescription}>{route.description}</Text>
                            <View style={styles.routeMeta}>
                                <Text style={styles.routeMetaText}>⌁ {route.distance}</Text>
                                <Text style={styles.routeMetaText}>◷ {route.time}</Text>
                            </View>
                        </View>
                    </Pressable>
                ))}

                <View style={styles.tipsSection}>
                    <Text style={styles.tipsTitle}>Road notes</Text>
                    <Text style={styles.tip}>• Expect hairpin turns near Tatev and Qajaran.</Text>
                    <Text style={styles.tip}>• Keep extra time for photo stops and viewpoints.</Text>
                    <Text style={styles.tip}>• Download directions before entering remote valleys.</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f6efe6' },
    contentContainer: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 30 },
    eyebrow: { color: '#738767', fontSize: 10, fontWeight: '800', letterSpacing: 1.2, marginTop: 5, marginBottom: 5 },
    title: { color: '#2f3e2f', fontSize: 30, fontWeight: '800', marginBottom: 8 },
    intro: { color: '#586254', fontSize: 15, lineHeight: 22, marginBottom: 18 },
    mapContainer: { paddingHorizontal: 16, marginTop: 12, marginBottom: 16 },
    openMapButton: {
        minHeight: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        alignSelf: 'flex-start',
        borderRadius: 12,
        backgroundColor: '#2d4a3e',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    openMapButtonText: {color: '#fffdf8', fontSize: 14, fontWeight: '800'},
    mapCard: {
        position: 'relative',
        backgroundColor: '#eef3e9',
        borderColor: '#d4e1cd',
        borderRadius: 16,
        borderWidth: 1,
        overflow: 'hidden',
        shadowColor: '#2f3e2f',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 4,
    },
    mapControls: {
        position: 'absolute',
        top: 10,
        right: 10,
        gap: 8,
    },
    mapControlButton: {
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#fffdf8',
        elevation: 4,
        shadowColor: '#24382d',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.18,
        shadowRadius: 4,
    },
    fullscreenMapContainer: {flex: 1, backgroundColor: '#eef3e9'},
    fullscreenNativeMap: {flex: 1},
    fullscreenMapControls: {
        position: 'absolute',
        top: 48,
        right: 14,
        left: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fullscreenCloseButton: {
        minHeight: 42,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderRadius: 12,
        backgroundColor: '#fffdf8',
        paddingHorizontal: 12,
        elevation: 4,
    },
    fullscreenCloseText: {color: '#2d4a3e', fontSize: 13, fontWeight: '800'},
    nativeMap: { width: '100%', height: 360 },
    selectedPlaceMarker: {
        width: 44,
        height: 44,
        borderColor: '#f6cf75',
        borderWidth: 4,
        borderRadius: 22,
    },
    placeMarker: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fffdf8',
        borderRadius: 18,
        borderWidth: 2,
        elevation: 4,
        shadowColor: '#24382d',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },
    clusterMarker: {
        minWidth: 38,
        height: 38,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2d4a3e',
        borderColor: '#fffdf8',
        borderRadius: 20,
        borderWidth: 2,
        elevation: 4,
    },
    clusterCount: {color: '#fffdf8', fontSize: 13, fontWeight: '800'},
    placeCard: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        left: 10,
        borderRadius: 15,
        backgroundColor: '#fffdf8',
        padding: 12,
        shadowColor: '#24382d',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
    },
    placeCardHeading: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7},
    placeCardEyebrow: {color: '#71866a', fontSize: 9, fontWeight: '800', letterSpacing: 1.1},
    closeButton: {width: 28, height: 28, alignItems: 'center', justifyContent: 'center'},
    placeSummary: {flexDirection: 'row', alignItems: 'center', gap: 11},
    placeImage: {width: 84, height: 84, borderRadius: 10, backgroundColor: '#e8eee2'},
    placeImagePlaceholder: {width: 84, height: 84, alignItems: 'center', justifyContent: 'center', borderRadius: 10},
    placeSummaryText: {flex: 1},
    placeName: {color: '#2f3e2f', fontSize: 16, fontWeight: '800'},
    placeCategory: {color: '#8b624c', fontSize: 11, fontWeight: '700', marginTop: 2},
    placeDescription: {color: '#667064', fontSize: 12, lineHeight: 16, marginTop: 5},
    placeMeta: {flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 9},
    placeMetaText: {color: '#667064', fontSize: 11, flex: 1},
    placeDistance: {color: '#2d4a3e', fontSize: 11, fontWeight: '800'},
    placeContact: {color: '#667064', fontSize: 11, marginTop: 5},
    placeActions: {flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10},
    placeAction: {minHeight: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 10, paddingHorizontal: 10},
    detailsAction: {flex: 1, flexDirection: 'row', gap: 3, backgroundColor: '#2d4a3e'},
    detailsActionText: {color: '#fffdf8', fontSize: 12, fontWeight: '800'},
    iconAction: {minWidth: 58, minHeight: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#f4f0e8', paddingHorizontal: 7},
    iconActionText: {color: '#46564a', fontSize: 9, fontWeight: '700', marginTop: 2},
    detailsBackdrop: {flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(22, 35, 28, 0.48)'},
    detailsModal: {maxHeight: '88%', borderTopLeftRadius: 22, borderTopRightRadius: 22, backgroundColor: '#fffdf8', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 28},
    detailsHeader: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12},
    detailsEyebrow: {color: '#71866a', fontSize: 10, fontWeight: '800', letterSpacing: 1.1},
    detailsImage: {width: '100%', height: 210, borderRadius: 14, backgroundColor: '#e8eee2', marginBottom: 16},
    detailsName: {color: '#2f3e2f', fontSize: 24, fontWeight: '800'},
    detailsCategory: {color: '#8b624c', fontSize: 13, fontWeight: '700', marginTop: 4},
    detailsDescription: {color: '#586254', fontSize: 15, lineHeight: 22, marginTop: 14},
    detailsLocation: {flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 16},
    detailsLocationText: {color: '#667064', fontSize: 13},
    detailsDistance: {color: '#2d4a3e', fontSize: 13, fontWeight: '700', marginTop: 8},
    detailsContact: {color: '#667064', fontSize: 13, marginTop: 8},
    detailsActions: {flexDirection: 'row', gap: 10, marginTop: 20},
    detailsSecondaryAction: {minHeight: 48, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, borderColor: '#ded6ca', borderWidth: 1, borderRadius: 12},
    detailsSecondaryText: {color: '#46564a', fontSize: 13, fontWeight: '700'},
    detailsPrimaryAction: {minHeight: 48, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, borderRadius: 12, backgroundColor: '#2d4a3e'},
    detailsPrimaryText: {color: '#fffdf8', fontSize: 13, fontWeight: '800'},
    mapHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
    mapEyebrow: { color: '#71866a', fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 3 },
    mapTitle: { color: '#2f3e2f', fontSize: 17, fontWeight: '800' },
    compass: { color: '#61785b', fontSize: 12, fontWeight: '800' },
    mapSurface: { height: 235, overflow: 'hidden', position: 'relative', backgroundColor: '#dbe8d4', borderColor: '#c5d8bc', borderRadius: 14, borderWidth: 1 },
    mapContour: { position: 'absolute', borderColor: '#c0d4b7', borderRadius: 120, borderWidth: 1, transform: [{ rotate: '-22deg' }] },
    contourOne: { width: 340, height: 120, top: 38, left: -85 },
    contourTwo: { width: 300, height: 100, top: 105, left: 80 },
    roadLine: { position: 'absolute', backgroundColor: '#f4e6c7', borderColor: '#c99c68', borderRadius: 8, borderWidth: 2 },
    roadLineNorth: { width: 270, height: 5, top: 75, left: 15, transform: [{ rotate: '-17deg' }] },
    roadLineSouth: { width: 280, height: 5, top: 157, left: 22, transform: [{ rotate: '13deg' }] },
    roadLineWest: { width: 180, height: 5, top: 120, left: 28, transform: [{ rotate: '72deg' }] },
    mapPin: { position: 'absolute', alignItems: 'center', transform: [{ translateX: -8 }, { translateY: -8 }] },
    pinDot: { width: 13, height: 13, borderRadius: 7, backgroundColor: '#b86b48', borderColor: '#fff8ed', borderWidth: 2 },
    pinLabel: { color: '#50664a', fontSize: 10, fontWeight: '800', marginTop: 3 },
    regionLabel: { position: 'absolute', right: 18, bottom: 24, color: '#a7bea0', fontSize: 23, fontWeight: '900', letterSpacing: 3 },
    mapNote: { position: 'absolute', left: 14, bottom: 16, color: '#759296', fontSize: 10, fontStyle: 'italic', transform: [{ rotate: '-18deg' }] },
    mapFooter: { flexDirection: 'row', gap: 8, marginTop: 10 },
    mapFooterText: { color: '#607359', fontSize: 11, fontWeight: '600' },
    notice: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff8e9', borderColor: '#eed9aa', borderRadius: 14, borderWidth: 1, padding: 12, marginBottom: 22 },
    noticeIcon: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#d7a94d', color: '#fff', fontSize: 14, fontWeight: '800', lineHeight: 22, marginRight: 9, textAlign: 'center' },
    noticeText: { flex: 1, color: '#6f5b36', fontSize: 12, lineHeight: 18 },
    sectionTitle: { color: '#2f3e2f', fontSize: 21, fontWeight: '800', marginBottom: 11 },
    routeCard: { flexDirection: 'row', backgroundColor: '#fffdf8', borderColor: '#e8dccb', borderRadius: 15, borderWidth: 1, marginBottom: 11, overflow: 'hidden' },
    routeAccent: { width: 6 },
    routeBody: { flex: 1, padding: 14 },
    routeHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    routeName: { color: '#2f3e2f', fontSize: 16, fontWeight: '800' },
    routeArrow: { color: '#6d7f61', fontSize: 22, fontWeight: '700' },
    routeCities: { color: '#b06748', fontSize: 12, fontWeight: '800', marginTop: 4 },
    routeDescription: { color: '#667064', fontSize: 13, lineHeight: 18, marginTop: 8 },
    routeMeta: { flexDirection: 'row', gap: 18, marginTop: 11 },
    routeMetaText: { color: '#687763', fontSize: 12, fontWeight: '700' },
    tipsSection: { backgroundColor: '#314a2b', borderRadius: 17, marginTop: 10, padding: 16 },
    tipsTitle: { color: '#fff', fontSize: 18, fontWeight: '800', marginBottom: 9 },
    tip: { color: '#d8e4cf', fontSize: 13, lineHeight: 21 },
});
