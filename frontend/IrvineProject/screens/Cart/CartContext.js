import React, {createContext, useState} from 'react';
export const CartContext = createContext();

export  function CartProvider(props) {
   const [count, setItemCount] = useState(0);
   const [priceContext, setPrice] = useState(0);
   const [productId, setProductid] =useState();
   const [userId, setUserId] = useState(0);
   const [detail, setDetail ] =React.useState(0);
   const [arr, setArr] = useState([]);
   const [cartId, setCartId] =useState([]);
   const [idRec, setIdRec] = useState([]);
   const [address, setAddress] = useState('');
    const getCount = () =>{
    setItemCount(count+1)
   }
   const AddressRecord = (addr) =>{
    setAddress(addr)
   }
   const delCount = () =>{
    setItemCount(count-1)
   }
   const Total = (price) =>{
    setPrice((priceContext) + price);
    
   }
   const Sub = (price, id) =>{
    setPrice(priceContext - price );
    console.log(id )
    }
   const productContext = (id) =>{
    setProductid(id)
   }
   const User = (id) =>{
    setUserId(id)
    
   }
   const GetUserdetail = (id) =>{
   setDetail(id)
   }
   const storeValues = (id) =>{
    setArr(prevState => [...prevState, id]);
   }
   const storeId = (id) =>{
    setIdRec(prevState => [...prevState, id])
   }
   const findId = (id) =>{
    const found = idRec.find(element => element === id);
    if(found) {
        return true;
    }
    else {
        return false;
    }
   }
   const filterId = (id) =>{
    const filteredArray = idRec.slice(id)
    setIdRec(filteredArray)
   }
   const cartRecord = (id) =>{
    setCartId(prevState => [...prevState, id]);
   }
   const DeleteRecord = () =>{
    const deletedId = cartId.pop()
    return deletedId;
   }
   const deleteValues = () =>{
   arr.pop()
   }
    return(
    <CartContext.Provider value={{getCount, count, delCount, Total, priceContext,Sub,
      GetUserdetail, productContext, productId,cartId,filterId,
     User, userId,storeValues,arr,deleteValues,cartRecord,DeleteRecord,findId,storeId,idRec, 
     setItemCount,setPrice
    }}>
        {props.children}
    </CartContext.Provider>
    )
}