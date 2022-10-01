import React, { useContext} from 'react'; 
import {Header } from '../../components/header';
import {View, Text, ScrollView, Alert} from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { TextIconButton } from '../../constants/TextIconButton';
import { getId } from '../../services/AsyncStorageService';
import moment from 'moment';
import { CartContext } from './CartContext';
export const DeliveryStatus = ({navigation, route}) =>{
    const [pid, setPId] = React.useState();
    const [tok, setTok] = React.useState();
    const [payerId, setPayerId] = React.useState();
    const [userId, setUserId] = React.useState();
    const {setItemCount, Total, productId,cartId,arr,idRec,setPrice} = useContext(CartContext)
    React.useEffect(()=>{
        RetriveId()
        const {paymentId, token, PayerID} = route.params;
        setPId(paymentId)
        setTok(token)
        setPayerId(PayerID)
    })
    const RetriveId = async() =>{
        const id = await getId()
        if(id) {
            setUserId(id)
        }
     }
     function homeFnc(){
        navigation.replace("Home")
     }
     function endFunctioN()
     {
        return (Alert.alert("Congratulations! Your order is its way"))
        
     }
     function clearFunction() {
      
        Total(0)
        setItemCount(0)
        setPrice(0)
        while(arr.length > 0) {
            arr.pop();
        }
        while(idRec.length > 0) {
            idRec.pop();
        }
        while(cartId.length >0){
            cartId.pop();
        }
        
     }
    const addData= ()=>{
        fetch('http://192.168.0.105:8000/api/user/payment', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentId:pid,
            token:tok,
            payerId:payerId,
            userId:userId,
          })
      })
      
          .then((response) => response.json())
          .then((responseData) => {
              console.log(
                  "POST Response",
                  "Response Body -> " + JSON.stringify(responseData) + endFunctioN() + clearFunction()
                  + homeFnc()
              )
          })
          .catch(error => console.log(error.toString()))

      }
    
      function renderFooter(){
        return(<View
            style={{
                paddingBottom:SIZES.padding,
                paddingHorizontal:SIZES.padding,
                flexDirection:'row',
            }}>
              
          <View style={{flex:2}}>
         <TextIconButton 
         label="Click here to confirm Order"
         containerStyle={{
             flex:1,
             marginLeft:SIZES.radius*4,
             borderRadius:SIZES.base,
             backgroundColor:COLORS.red,
             width:200,
             height:40,
         }}
         labelStyle={{
             color:COLORS.white,
             fontWeight:'bold'
         }}
         onPress={()=>addData()}
         />
          </View>
          </View>)
        }
    function renderHeader(){
        return(<Header 
          
         title="DELIVERY STATUS"
         titleStyle={{
            fontWeight:'bold',
            fontSize:19,
            color:COLORS.blue
        }}
         containerStyle={{
            height:50,
            marginHorizontal:9,
            marginTop:30,
         backgroundColor:COLORS.white,
         alignSelf:'center',   
    }}
        
         />)
        }
function renderInfo()
{
    return(<View style={{
        marginTop:SIZES.radius,
        paddingHorizontal:SIZES.padding,

    }}>
         <Text style={{
       textAlign:'center',
       color:COLORS.blue,
       fontSize:15,
       fontWeight:'bold',
   }}>You have paid Successfully!</Text>
   <Text style={{
       textAlign:'center',
       color:COLORS.blue,
       fontSize:15,
       fontWeight:'bold',
   }}>Estimated Delivery</Text>
   
   <Text style={{
       textAlign:'center',
       color:COLORS.blue,
       fontSize:20,
       paddingTop:5,
       fontWeight:'bold',
   }}>{moment().format('Do MMMM YYYY /h:mm')}</Text>
    </View>)
}
function renderTrackOrder(){
    return(
    <View style={{
        marginTop:SIZES.padding,
        paddingVertical:SIZES.padding,
        alignItems:'center',
    }}>
       
    </View>)
}

    return(<View style={{
        flex:1,
        backgroundColor:COLORS.white,
        paddingHorizontal:SIZES.padding,
    }}>

     {renderHeader()}
      {renderInfo()}
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
       {renderTrackOrder()}
       {renderFooter()}
      </ScrollView>
     
    </View>)
}