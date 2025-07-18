import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-hot-toast'

const initialState={

cart: localStorage.getItem("cart")
? JSON.parse(localStorage.getItem("cart"))
: [],
total: localStorage.getItem("total")
? JSON.parse(localStorage.getItem("total"))
: 0,
totalItems: localStorage.getItem("totalItems")
? JSON.parse(localStorage.getItem("totalItems"))
: 0,
}


const cartSlice=createSlice({
name:"cart",
initialState:initialState,
reducers:{
  setTotalItems(state,value){
    state.token=value.payload;
  },
  removeFromCart:(state,action)=>{
    const courseId = action.payload
    const index = state.cart.findIndex((item) => item._id === courseId)
    if(index>=0){
      state.totalItems--
      state.total -= state.cart[index].price
      state.cart.splice(index, 1)
      // Update to localstorage
      localStorage.setItem("cart", JSON.stringify(state.cart))
      localStorage.setItem("total", JSON.stringify(state.total))
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
      // show toast
      toast.success("Course removed from cart")
    }
  },
  resetCart: (state) => {
    state.cart = []
    state.total = 0
    state.totalItems = 0
    // Update to localstorage
    localStorage.removeItem("cart")
    localStorage.removeItem("total")
    localStorage.removeItem("totalItems")
  },
}
})
export const {setTotalItems,resetCart,removeFromCart}=cartSlice.actions;
export default cartSlice.reducer