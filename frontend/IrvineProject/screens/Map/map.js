import * as React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; 
import { StyleSheet, View, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {COLORS,constants,icons} from '../../constants';
export const Map = () =>{

const [pin, setPin] = React.useState({
  latitude: 51.509865,
      longitude:-0.118092,
})
const [region, setRegion] = React.useState({
  latitude: 51.509865,
      longitude:-0.118092,
})
const link =
 "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-51.509865,-0.118092&radius=500&types=food&name=harbour&key=AIzaSyCAp6Ir10MUtYgi5xxOj40bfMXC3icJcbI";
return(  
  <>
  
   <View style={styles.container}>
      
   
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude:  51.509865,
         longitude:-0.118092,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     />
     <View style={{
      position:'absolute',
      width:'90%',
      backgroundColor:'white',
      shadowColor:'black',
      shadowOffset:{width:2,height:2},
      shadowOpacity:0.5,
      shadowRadius:4,
      elevation:4,
      padding:8,
      borderRadius:8,
      top:40,
     }}>
     <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {

      }}
      query={{
        key: constants.GOOGLE_API_KEY,
        language: 'en',
      }}
       styles={{
        
      }}
    />
    </View>
   </View>
   </>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });