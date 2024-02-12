import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, SafeAreaView, Image, TouchableOpacity, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
 
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
    width: '100%',
    height: '100%',
  },
});



// export default function App() {
//   const [markerPosition, setMarkerPosition] = useState({ x: 0, y: 0 });

//   function handlePress(evt) {
//     const x = evt.nativeEvent.locationX;
//     const y = evt.nativeEvent.locationY;
//     setMarkerPosition({ x, y });
//     console.log(`x coord = ${x}`);
//     console.log(`y coord = ${y}`);
//   }

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         onLayout={({ nativeEvent }) => {
//           console.log(nativeEvent.layout)
//         }}
//         onPress={evt => handlePress(evt)}
//       >
//         <ImageBackground
//           source={require('./assets/Diagrams/x600.jpg')}
//           style={styles.image}
//         >
//           <View style={[styles.marker, { top: markerPosition.y, left: markerPosition.x }]} />
//         </ImageBackground>
//       </TouchableOpacity>
//     </View>
//   );
// }

export default function App() {

  return (
    <MapView
      style={{ flex: 1 }}
      showsUserLocation={true}
      initialRegion={{
        latitude: 51.31154,
        longitude: -0.65553,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      mapType='hybrid'
      // disable points of interest
      showsPointsOfInterest={false}
    >
      {/* <Marker
        coordinate={{ latitude: region.latitude, longitude: region.longitude }}
        title="My Marker"
        description="Some description"
      /> */}
    </MapView>
  );
}