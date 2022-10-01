import React, {useContext, useState} from 'react'
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
import { CartContext } from './Cart/CartContext';
import axios from 'axios';
export const TryRest = ({navigation, route}) => {
    const [product, setProduct] = useState([]); ///detail of the product on which I have clicked on
const [set, setState]  = useState();
const [array, setArray] =useState([]);
let sum = parseInt(product.prod_price);
let sub = 0;
const [count2, setItemCount2] = useState(1);
const Total2 = () =>{
    for (const value of array) {
        sum += value;
      }
      
   }
   const getCount2 = () =>{
    setItemCount2(count2+1)
   }
   const delCount2 = () =>{
    setItemCount2(count2-1)
   }
   const Sub2 = (price) =>{
  
  console.log(sub)
    }
    
React.useEffect(()=>{
    let { item, price} = route.params;
     setProduct(item)
     
  },[])
  const {getCount, count, delCount, Total,setItemCount,
    setPrice,Sub,
    priceContext,arr,deleteValues, productId} = useContext(CartContext); 
     
     const updateData= (price, id)=>{
        fetch(`${constants.URL}/api/user/cart/${productId}/update/`, {
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cart_no_of_items:count2+1,
            cart_total :sum,
            prod_id:id
          })
      })
          .then((response) => response.json())
          .then((responseData) => {
              console.log(
                  "PUT Response",
                  "Response Body -> " + JSON.stringify(responseData)
              )
          })
          .catch(error => console.log(error.toString()))
      }
      const updateData2= (price, id)=>{
        const minus = array.pop()
        console.log(minus , "Price removed")
        for (const value of array) {
         sub += value;
       }
        fetch(`${constants.URL}/api/user/cart/${productId}/update/`, {
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cart_no_of_items:count2-1,
            cart_total :sub,
            prod_id:id
          })
      })
          .then((response) => response.json())
          .then((responseData) => {
              console.log(
                  "PUT Response",
                  "Response Body -> " + JSON.stringify(responseData)
              )
          })
          .catch(error => console.log(error.toString()))
      }
      
  const DeleteData= ()=>{
  if(count!=0) {
    axios.delete(`http://192.168.0.105:8000/api/user/cart/${productId}/destroy/`)
        .then(() => setState( 'Delete successful' ));
        deleteValues() 
        Alert.alert("You have no items in the cart")
        setItemCount(0)
        setPrice(0)
        setTimeout(()=>{
            navigation.navigate('Home') 
        }, 1000)
        
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
                               if(count!=1) 
                               {
                                delCount()
                                delCount2()
                                updateData2()
                                Sub2(price)
                                Sub(price, product.id)
                               }
                               else {
                               DeleteData()
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
                                setArray(prevState => [...prevState, price]);
                                Total2()
                                getCount2()
                                updateData(price, product.id)
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