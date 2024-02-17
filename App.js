import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, Pressable, SafeAreaView, Image, TouchableOpacity, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import MapView, { Camera } from 'react-native-maps';
import {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { enableScreens } from 'react-native-screens'
import * as Sentry from "@sentry/react-native";
import * as Updates from 'expo-updates';

Sentry.init({
  dsn: "https://7f438716c157c385347e8d0e18ca4253@o4504266723688448.ingest.sentry.io/4506763251286016",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

enableScreens()

const Drawer = createDrawerNavigator();

const Stack = createSharedElementStackNavigator();

function MapStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <Stack.Screen name="Map" component={MScreen} sharedElements={(route, otherRoute, showing) => {
            const { item } = route.params;
            return [`map`];
          }}/>
    </Stack.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{drawerType: 'front'}}>
      <Drawer.Screen name="Menu" component={MapStack} options={{ headerShown: false}}/>
      <Drawer.Screen name="Article" component={Card} />
    </Drawer.Navigator>
  );
}

let x600 = Image.resolveAssetSource(require('./assets/Diagrams/x600.jpg').uri);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  marker: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  container: {
    flex: 1,
  },
  map: {
    height: '78%',
    borderRadius: 20,
  },
  map2: {
    height: '100%',
    borderRadius: 20,
  }
});

function MScreen({ navigation }) {
  return (
    <View style={styles.map2}>
      <SharedElement id={`map`}>
      <MapView
      // on press, expand r
      // format the map as a card
        showsUserLocation={true}
        initialRegion={{
          latitude: 51.31154,
          longitude: -0.65553,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        rotateEnabled={true}
        mapType='hybrid'
        // disable points of interest
        showsPointsOfInterest={false}
        onPress={() => navigation.navigate('Map')}
      >
      </MapView>
      </SharedElement>
    </View>
  );
}

function Card() {
  const [markerPosition, setMarkerPosition] = useState({ x: 0, y: 0 });

  function handlePress(evt) {
    const x = evt.nativeEvent.locationX;
    const y = evt.nativeEvent.locationY;
    setMarkerPosition({ x, y });
    console.log(`x coord = ${x}`);
    console.log(`y coord = ${y}`);
  }

  return (
    <View >
      <TouchableOpacity
        onLayout={({ nativeEvent }) => {
          console.log(nativeEvent.layout)
        }}
        onPress={evt => handlePress(evt)}
      >
        <ImageBackground
          source={require('./assets/Diagrams/x600.jpg')}
          style={styles.image}
        >
          <View style={[styles.marker, { top: markerPosition.y, left: markerPosition.x }]} />
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

function Home({ navigation }) {
  return (
    <View >
      <SharedElement id={`map`}>
      <MapView
      // on press, expand r
      // format the map as a card
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: 51.31154,
          longitude: -0.65553,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        rotateEnabled={true}
        mapType='hybrid'
        // disable points of interest
        showsPointsOfInterest={false}
        onPress={() => navigation.navigate('Map')}
      >
      </MapView>
      </SharedElement>
    </View>
  );
}

// export the drawer navigator
export default Sentry.wrap(function App(){
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  )
})