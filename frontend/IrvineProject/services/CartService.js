import { constants } from "../constants"

export const CartService = async(id, price, setCart, cart) =>{
    const cartDetail =await fetch(`${constants.URL}/api/user/cart/detail`)
    const response = await cartDetail.json();
   return response;
}
