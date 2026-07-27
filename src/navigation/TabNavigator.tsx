import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AboutUsScreen } from '../view/AboutUsScreen';
import { HistoryScreen } from '../view/HistoryScreen';
import { TourismScreen } from '../view/TourismScreen';

import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {

    /**
     * 
     * Tab Navigator is a React component that sets up a bottom tab navigation structure for the Syunik App. It uses the createBottomTabNavigator function from the @react-navigation/bottom-tabs library to create a tab navigator with three screens: AboutUsScreen, HistoryScreen, and TourismScreen. Each screen is associated with a tab in the navigation bar, and the component also defines custom icons for each tab using Ionicons. The TabNavigator component is wrapped in a NavigationContainer to manage the navigation state and linking.
     */


  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            const icons: Record<keyof TabParamList, string> = {
              About: 'information-circle-outline',
              History: 'time-outline',
              Tourism: 'earth-outline',
            };
            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="About">
          {({ navigation }) => (
            <AboutUsScreen
              onBack={() => navigation.goBack()}
              onOpenTourism={() => navigation.navigate('Tourism')}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="History">
          {({ navigation }) => (
            <HistoryScreen
              onBack={() => navigation.goBack()}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Tourism">
          {({ navigation }) => (
            <TourismScreen
              onBack={() => navigation.goBack()}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}