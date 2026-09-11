import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { HeaderBack } from '../components/HeaderBack';
import { citiesData } from '../data/citiesData';

import MapView, { UrlTile, Marker } from 'react-native-maps';

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

const mapBounds = {
    minLatitude: 38.84,
    maxLatitude: 39.56,
    minLongitude: 45.98,
    maxLongitude: 46.46,
};

export function RoadScreen({ onBack }: RoadScreenProps) {
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

                {/*  Map of Syunik */}
                <View style={styles.mapCard}>
                    <MapView
                        style={styles.nativeMap}
                        initialRegion={{
                            latitude: 39.5,
                            longitude: 46.3,
                            latitudeDelta: 0.5,
                            longitudeDelta: 0.5,
                        }}>
                        <UrlTile
                            urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                            maximumZ={19}
                            flipY={false}
                        />
                        <Marker
                            coordinate={{ latitude: 39.3794, longitude: 46.2501 }}
                            title="Tatev Monastery"
                            description="9th-century monastery"
                        />
                    </MapView>
                </View>

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
    mapCard: { backgroundColor: '#eef3e9', borderColor: '#d4e1cd', borderRadius: 18, borderWidth: 1, padding: 14, marginBottom: 14 },
    nativeMap: { width: '100%', height: 360, borderRadius: 14 },
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
