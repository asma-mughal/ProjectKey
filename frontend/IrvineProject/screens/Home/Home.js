import React, { useContext } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Platform, ActivityIndicator
} from "react-native";
import { getToken, storeId, storeCheck, getCheck } from '../../services/AsyncStorageService'
import { useGetLoggedUserQuery } from '../../services/userAuthApi'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../../features/userSlice'
import { setUserAccessToken } from '../../features/authSlice';
import {  SIZES, COLORS, constants } from '../../constants';
import { CartContext } from "../Cart/CartContext";
import axios from 'axios';

export const Home = ({route, navigation}) => {
    const [isloading, setIsLoading] = React.useState(true);
    const [token, setToken] = React.useState({})

    const {getCount,  Total,productContext,storeValues} = useContext(CartContext);
    function myfunction(){
        setTimeout(() => {
          setIsLoading(false)
          }, 5000);
      }
    
    const dispatch = useDispatch()
    React.useEffect(() => {
      (async () => {
        const token = await getToken()
        if (token) {
          const { access, refresh } = JSON.parse(token)
          setToken({
            "access": access,
            "refresh": refresh
          })
          dispatch(setUserAccessToken({ access_token: access }))
        }
       

      })();
    }, [])
    const { data, isSuccess } = useGetLoggedUserQuery(token.access)
    React.useEffect(() => {
      if (isSuccess) {
        dispatch(setUserInfo({ id:data.id , email: data.email, name: data.name,}))  
        IdStorage(data.id)      
        }
    })
     //console.log()
    const IdStorage = async (id) => { 
    await storeId(id.toString())
    }

    const [category, setCategory] = React.useState([]);
    React.useEffect(()=>{
      async function getAllCategory()
      {
        try{
         const catge= await axios.get(`${constants.URL}/api/user/product`)
         setCategory(catge.data);
        }catch(error){
         console.log(error)
        }
      }
      getAllCategory()
    
    }, [])
    const addData= (price, id)=>{
        fetch('http://192.168.0.105:8000/api/user/cart', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cart_no_of_items:1,
            cart_total : price,
            prod_id: id
          })
      })
          .then((response) => response.json())
          .then((responseData) => {
              console.log(
                  "POST Response",
                  "Response Body -> " + JSON.stringify(responseData) +
                  JSON.stringify(responseData.id) +productContext(responseData.id) 
                 +storeValues(id) 
              )
          })
          .catch(error => console.log(error.toString()))
      }
    function renderHeader() {
        
        return (
            <View style={{ flexDirection: 'row', height: 50, 
            
            top:Platform.OS=='ios'?0:30, }}>
             <View style={{ flex: 1, 
                alignItems:'center' }}>
            
            </View>
            </View>
        )
    }
   
    function renderRestaurantList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding,
                backgroundColor:COLORS.white, }}  
               
            >
               
                {/* Image */}
                <View
                      style={{
                        elevation:4,
                        borderRadius:10,
                        marginBottom:SIZES.padding,
                        backgroundColor:COLORS.white,
                   }}
                >
                    
                    <Image
                         source={{uri: item.prod_image}}
                         resizeMode="contain"
                         style={{
                             width: "100%",
                             height: 200,
                             borderRadius: SIZES.radius
                         }}
                     />
                    
                </View>

                {/* Restaurant Info */}
                <View
                     style={{  
                        marginTop:Platform.OS==='ios'? SIZES.marginBottom:10,
                    flexDirection:'row',
                    }}
                >
                   
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10
                        }}
                    >
                        
                    
                        {/* Price */}
                       <Text style={{
                        color:COLORS.blue,
                        fontSize:15,
                       }}>${item.prod_price
                       }</Text>
                       
                       <TouchableOpacity style={{
    backgroundColor:COLORS.primary,
    paddingHorizontal:10,
    paddingVertical:10,
    width:'50%',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:'35%',
    bottom:10,
    borderRadius:8,
    }}
    onPress={() => {
        let price = parseInt(item.prod_price)
        addData(price, item.id)
        getCount()
        Total(price)
        navigation.navigate("Try", {item} )}}
    >
    <Text style={{
        fontWeight:'bold',
        fontSize:15,
        color: COLORS.blue
    }}> Add Item</Text>
    </TouchableOpacity> 
                    </View>
                    
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={category}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
        )
    }
    
    
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <View style={{
               top: Platform.OS === 'ios' ? 0 : 10,
                padding:SIZES.padding,
                paddingLeft:45,
            }}>
            <Text style={{
                fontWeight:'bold',
                fontSize:30,
                color:COLORS.blue
            }}>Offers</Text>
            </View>
            {isloading ? (
    <>
    <View style={{
      marginTop:90,
    }}>
       <ActivityIndicator size="small" color={COLORS.red}/>
    </View>
  {
   myfunction()
}
    </>
  ) : ( 
    <>
      {renderRestaurantList()}
      
    </>
  )
  }
         
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default Home;