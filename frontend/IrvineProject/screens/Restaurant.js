import React, { useContext } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image, Alert
} from "react-native";import {FooterTotal } from '../components/footerTotal';
import { Header } from '../components/header';
import {IconButton } from '../components/iconButton';
import { icons, COLORS, SIZES, constants } from '../constants';
import { CartContext } from "./Cart/CartContext";
import axios from 'axios';

export const Restaurant = ({ route, navigation }) => {
const [product, setProduct] = React.useState([]); ///detail of the product on which I have clicked on
const [cartid, setId] = React.useState();
const [set, setState]  = React.useState();

const [toggle, setToggle] = React.useState(false)
React.useEffect(()=>{
    let { item} = route.params;
     setProduct(item)
  }, [])
//console.log(cartDetail)

  const {getCount, count, delCount, Total,  priceContext, Sub,arr,
    productContext,deleteValues,cartRecord,
     storeValues, DeleteRecord, findId,storeId,idRec,filterId,productId,cartId} = useContext(CartContext); 
    const addData= (price, id)=>{
    fetch(`${constants.URL}/api/user/cart`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart_no_of_items:1,
        cart_total : price,
        prod_id:id
      })
  })
      .then((response) => response.json())
      .then((responseData) => {
          console.log(
              "POST Response",
              "Response Body -> " + JSON.stringify(responseData) +
              JSON.stringify(responseData.id) + setId(responseData.id)+cartRecord(responseData.id)+  
               +productContext(product.id) 
              +storeValues(product.id) +storeId(product.id)
          )
      })
      .catch(error => console.log(error.toString()))
  }
  const DeleteData= ()=>{
  if(count!=0) {
    const cartId = DeleteRecord();
    axios.delete(`http://192.168.0.105:8000/api/user/cart/${cartId}/destroy/`)
        .then(() => setState( 'Delete successful' ));
        deleteValues() 
      }
  }
    function renderHeader() {
            return(<Header
            title="DETAILS"
            titleStyle={{
                fontWeight:'bold',
                fontSize:19,
                color:COLORS.blue
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
            onPress={()=>navigation.navigate('Home')}
              />
          }
            />)
        }
      
    function renderFoodInfo() {
        return(
            <>
            <View
                        style={{ alignItems: 'center' }}
        >
            <View style={{ height: SIZES.height * 0.35 }}>
                {/* Food Image */}
                <Image
                    source={{uri:product.prod_image}}                   
                    style={{
                        width: SIZES.width,
                        height: "100%"
                    }}
                />
                </View>
                <View style={{
                                position:'absolute',
                                bottom:-20,
                                width:SIZES.width,
                                height:50,
                                justifyContent:'center',
                                flexDirection:'row'
                            }}>
                        <TouchableOpacity
                        style={{
                            width:50,
                            backgroundColor:COLORS.primary,
                            alignItems:'center',
                            justifyContent:'center',
                            borderTopLeftRadius:25,
                            borderBottomLeftRadius:25,
                        }}
                        onPress= {()=>{
                            if(count==0) {
                                Alert.alert("you have No Items in cart")
                            }
                            else {
                                    let price = parseInt(product.prod_price)
                                    if(findId(product.id))
                                    {
                                        Alert.alert("Id found")
                                        filterId(product.id)
                                         DeleteData(cartid)
                                         delCount()
                                         Sub(price, product.id)
                                    }
                                    else {
                                       Alert.alert("This product doesnot found")
                                    }
                                   


                               
                            }
                           
                        }}
                        >
                            <Text style={{
                                fontSize:30,
                            }}>-</Text>
                        </TouchableOpacity>
                        <View style={{
                            width:50,
                            backgroundColor:COLORS.primary,
                            alignItems:'center',
                            justifyContent:'center',
                        }}>
                            <Text style={{
                             fontSize:25  
                            }}>{count}</Text>
                        </View>
                        <TouchableOpacity
                        style={{
                            width:50,
                            backgroundColor:COLORS.primary,
                            alignItems:'center',
                            justifyContent:'center',
                            borderTopRightRadius:25,
                            borderBottomRightRadius:25,
                        }}
                        onPress={
                            ()=>{
                                
                                let price = parseInt(product.prod_price)
                                addData(price, product.id)
                                getCount()
                                Total(price)
                            }}
                        >
                            <Text style={{
                                fontSize:30,
                            }}>+</Text>
                        </TouchableOpacity>
                            </View>

                            </View>
                            
                            <View style={{
                                alignItems:'center', 
                                paddingTop:20,
                                paddingBottom:20,
                            }}>
                                <Text style={{
                                    fontSize:23,
                                    color:COLORS.blue,
                                    fontWeight:'bold',
                                    padding:5,
                                }}>{product.prod_title}</Text>
                                <Text style={{
                                    fontSize:20,
                                    color:COLORS.red,
                                    padding:5,
                                    fontWeight:'bold'
                                }}>RRP : <Text style={{
                                    color:COLORS.blue, 
                                    fontSize:18,
                                    fontWeight:'bold'
                                }}>{product.prod_price}</Text></Text>
                               <Text style={{
                                    fontSize:20,
                                    color:COLORS.red,
                                    padding:5,
                                }}>Offers Includes : <Text style={{
                                    color:COLORS.blue, 
                                    fontSize:15,
                                    
                                }}>{product.prod_description}</Text>
                                </Text>
                            </View>
                            </>

        )
    }

    
function renderOrder() {
    return(<View>
        <View
        style={{
            backgroundColor:COLORS.primary,
            borderTopLeftRadius:40,
            borderTopRightRadius:40,
        }}
        >
         <View
         style={{
             flexDirection:'row',
             justifyContent:'space-between',
             paddingVertical:SIZES.padding*1,
             paddingHorizontal:SIZES.padding*2.5,
             borderBottomColor:COLORS.lightGray2,
             borderBottomWidth:1,
         }}
         >
        <Text style={{
            fontSize:17,
            color:COLORS.blue
        }}>Items in the Cart</Text>
        <Text style={{
            fontSize:15,
            color:COLORS.blue
        }}>{count}</Text>
</View>
<FooterTotal 
subtotal={count==0? 0:priceContext}
shippingFee={10.00}
total={count==0?0:priceContext+10}

/>

<TouchableOpacity style={{
    backgroundColor:count==0?COLORS.lightGray1: COLORS.red,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:10,
    paddingVertical:10,
    width:'90%',
    alignSelf:'center',
    borderRadius:8,
    }}
    disabled = {count==0? true:false}
    onPress={()=>{navigation.navigate("Order" ,{product} , {arr}
    )}}
    >
    <Text style={{
        fontWeight:'bold',
        fontSize:15,
        color: COLORS.blue
    }}>Place your Order</Text>
    </TouchableOpacity> 
</View>
<View style={{backgroundColor:COLORS.primary}}>
<Text style={{
    color:'transparent'
}}>helow</Text> 
</View>       
    </View>)
}
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFoodInfo()}
            {renderOrder()}
   </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    }
})

export default Restaurant;