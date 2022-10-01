
import React, { useContext } from 'react';
import { WebView } from 'react-native-webview';
import { CartContext } from './CartContext';
export const Payment = ({navigation}) => {
const {priceContext, count} = useContext(CartContext)
const amt = ((priceContext * count) + 10.00)
    const stateChng  = (navState) =>{
        const { url, title } = navState ;
        if(title == "PayPal Sucess"){
           console.log("url",url);
           let spliturl = url.split('?');
           // console.log("spliturl",spliturl);
           let splitotherhalf = spliturl[1].split('&');
           console.log("splitotherhalf",splitotherhalf);
           let paymentId = splitotherhalf[0].replace("paymentId=","");
           let token = splitotherhalf[1].replace("token=","");
           let PayerID = splitotherhalf[2].replace("PayerID=","");
           navigation.replace('DeliveryStatus',{paymentId:paymentId,token:token,PayerID:PayerID})
           //console.log("paymentId", paymentId);
           //console.log("token", token);
           ///console.log("PayerID", PayerID);
        }
    }
    
    return(<>
      <WebView 
     startInLoadingState={true}
     onNavigationStateChange={stateChng}
     source={{ uri: 'http://192.168.0.105:9000/pay/'+ amt }} />
    </>)
}