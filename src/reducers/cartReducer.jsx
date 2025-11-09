
export const cartReducer=(state,{type,payload})=>{
  switch(type){
    case 'ADD_TO_CART':
        return{
            ...state,
            cart:[...state.cart,payload.product]
        }
    case 'REMOVE_FROM_CART':
        return{
          ...state,
          cart:state.cart.filter(({id})=>id!==payload.product.id)
        }
    case 'ADD_TO_WISHLIST':
       return{
        ...state,
        wishlist:[...state.wishlist,payload.product]
       }
    case 'REMOVE_FROM_WISHLIST':
      return{
        ...state,
        wishlist:state.wishlist.filter(({id})=>id !==payload.product.id)
      }
    default:
        return state
  }
}