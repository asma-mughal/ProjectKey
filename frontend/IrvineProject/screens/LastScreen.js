import React from 'react'
import {Text, Button, View} from 'react-native';
export const LastScreen = ({navigation}) => {
 function functionEnd () {
    setTimeout(()=>{
    navigation.navigate('SignIn')
    },1000)
  }
  return (
    <View style={{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }}>
   <Button
   onPress={()=>navigation.navigate('SignIn')} title="Exit here"  />
      
       </View>
  )
}

