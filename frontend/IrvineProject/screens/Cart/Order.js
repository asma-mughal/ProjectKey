import React,{useContext, useState} from 'react'; 
import {View, Text, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { Header } from '../../components/header';
import {icons, SIZES, constants } from '../../constants';
import { COLORS, dummyData} from '../../constants';
import { CardItem } from '../../components/CardItem';
import { IconButton } from '../../components/iconButton';
import { FooterTotal } from '../../components/footerTotal';
import { CartContext } from './CartContext';
import { FormInput } from '../../components/formInput';
import { getId } from '../../services/AsyncStorageService';
export const OrderDelivery =({navigation, route}) =>{
    const [selectedCard, setSelectedCard] = useState(true);
    const [address, setAddress] = React.useState('');
    const [userId, setUserId] = React.useState();
    React.useEffect(()=>{
        RetriveId()
    })
    
    const RetriveId = async() =>{
        const id = await getId()
        if(id) {
            setUserId(id)
        }
     }
     function isEnable() {
        return productId!="" && userId!="" && priceContext!="" && address!=""
       }
        
    const {count, productId ,priceContext,arr } = useContext(CartContext);
        console.log(count , " Count")
        console.log(priceContext, " PriceContext")
        console.log(userId, "UserId")
        console.log(arr, "products")
        
        const addData= ()=>{

            fetch(`${constants.URL}/api/user/detail`, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                User_Id:userId,
                Product_Id:arr.toString(),
                address:address,
                product_quantity:count,
                total_bill:(priceContext * count) + 10.00,
              })
          })
          
              .then((response) => response.json())
              .then((responseData) => {
                  console.log(
                      "POST Response",
                      "Response Body -> " + JSON.stringify(responseData)
                  )
              })
              .catch(error => console.log(error.toString()))
          }

    function condition() {
        return userId!="" && productId!="" && priceContext!="" 
    }      
        
 function renderHeader(){
     return(<Header 
     
     title="CHECK OUT"
     titleStyle={{
        fontWeight:'bold',
        fontSize:19,
    }}
     containerStyle={{
        height:50,
        marginHorizontal:SIZES.padding,
        marginTop:30,
        right:20,
    backgroundColor:COLORS.white,
        
    }}
     leftComponent={
        <IconButton 
        icon={icons.back}
        containerStyle={{
            width:50,
            height:50,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:COLORS.white,
        }}
      iconStyle={{
          tintColor:COLORS.black
      }}
      onPress={()=>navigation.goBack()}
        />
    }
     />)
 }
  function renderFooter(){
    return(<View
        style={{
            paddingBottom:SIZES.padding,
            paddingHorizontal:SIZES.padding,
            backgroundColor:COLORS.primary,

        }}>
       <TouchableOpacity style={{
      backgroundColor:isEnable()? COLORS.red:COLORS.gray,
      alignItems:'center',
      justifyContent:'center',
      paddingHorizontal:10,
      paddingVertical:10,
      width:'98%',
      alignSelf:'center',
      borderRadius:8,
      
      }}
      disabled={isEnable()?false:true}
      onPress={()=>{addData()
      Alert.alert("You are proceeding to checkout")
      setTimeout(() => {
        selectedCard.name === 'PayPal' ? ( navigation.replace("Paypal", {count, priceContext}) ):
        
        (navigation.replace('Stripe'))
       
        }, 2000);
    }}
      >
      <Text style={{
          fontWeight:'bold',
          fontSize:15,
          color:COLORS.white,
      }}>Place Your Order</Text>
      </TouchableOpacity> 
      </View>)
    }
 function renderCards() {
     return(<View>
{dummyData.myCards.map((item, index)=>{
    return(
    <CardItem 
    key={`MyCard-${item.id}`}
    item={item}
    isSelected={`${selectedCard.key}-${selectedCard.id}` == `MyCard-${item.id}`}

    onPress={()=>setSelectedCard({...item, key:"MyCard"})}
    />)
})}
     </View>)
 }

 function renderDeliveryAddress(){
       return(<View
        style={{
            marginTop:SIZES.padding,
        }}>
       <Text style={{
           fontSize:15,
           fontWeight:'bold',
           color:COLORS.blue
       }}>Delivery Address</Text>
       <View style={{
           flexDirection:'row',
           alignItems:'center',
           marginTop:SIZES.radius,
           paddingVertical:SIZES.radius/2,
           borderWidth:2,
           borderRadius:SIZES.radius,
           borderColor:COLORS.lightGray3,
       }}>
       <Image 
       source={icons.location1}
       style={{
           width:35,
           height:35,
       }}
       />
       <FormInput 
           label=""
           value={address}
           onChange= {(value) => {
           setAddress(value)
          }}
          containerStyle={{
            
            
          }}
          inputContainerStyle={{ 
            width:296,
            top:-15,  
          }}
          appendComponent={
            <View    style={{
                justifyContent:'center'
            }}>
              

                </View>
        }
      
           />
       </View>
        </View>)
   }
  
    return (<View
     style={{
         flex:1,
         backgroundColor:COLORS.white,
     }}>


       
        {renderHeader()} 
        {
            condition() ? (<>
            <ScrollView 
        contentContainerStyle={{
            flexGrow:1,
            marginTop:SIZES.radius,
            paddingHorizontal:SIZES.padding,
            paddingBottom:SIZES.radius,
        }}
        >
            
        {renderCards()}
          {renderDeliveryAddress()}
       <View style={{
        paddingTop:145,
       }}>
       <FooterTotal 
        subtotal={priceContext}
        shippingFee={10.00}
        total={(priceContext * count)+10.00}
        />
        </View>
        
          {renderFooter()}
        </ScrollView>
            </>):(

                Alert.alert("Some error occured.Try login Again")
            )
        }
        
        </View>)
}