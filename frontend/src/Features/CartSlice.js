import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    count: JSON.parse(localStorage.getItem("count")) || 0,
   quantity: JSON.parse(localStorage.getItem("quantity")) || 1,
   totalbill : JSON.parse(localStorage.getItem("totalbill")) || 0,
   
    responseStatus: "",
    responseMessage: ""
};
export const paymentdetailsdone = createAsyncThunk(
  "cart/paymentdetails",
  async (paymentDetails , { rejectWithValue}) => {
    
    const token = localStorage.getItem("token");
    console.log("Cart Code Paymet data",paymentDetails)
    const headers = {
      "Content-Type": "application/json",
      token: token,
    };
    console.log("Token Slice", token);
    console.log("user id", paymentDetails);
    try {
      const response = await axios.post(
        `http://localhost:4000/payment/pay`,
        paymentDetails,
        { headers }
      );
      console.log("response", response.data);
   
    localStorage.removeItem("cart");
    localStorage.removeItem("count");
    localStorage.removeItem("quantity");
window.location.reload();
       
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const cartSlice = createSlice({
    name: "cart",

    initialState,
    reducers: {
       
        addToCart: (state, action) => {
          const product = action.payload;
          const existingProduct = state.cart.find((item) => item._id === product._id);
    
          if (!existingProduct) {
            state.cart.push({ ...product, quantity: 1 }); 
            state.count += 1;
          } else {
            existingProduct.quantity += 1;
            state.count += 1;
          }
    
          localStorage.setItem("cart", JSON.stringify(state.cart));
          localStorage.setItem("count", JSON.stringify(state.count));
        },
    
        incrementQuantity: (state, action) => {
          const item = action.payload;
          const productIndex = state.cart.findIndex((p) => p._id === item._id);
    
          if (productIndex !== -1) {
            state.cart[productIndex].quantity += 1;
            state.count += 1;
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("count", JSON.stringify(state.count));
          }
        },
            decrementQuantity: (state, action) => {
              const item = action.payload;
              const productIndex = state.cart.findIndex((p) => p._id === item._id);
        
              if (productIndex !== -1 && state.cart[productIndex].quantity > 1) {
                state.cart[productIndex].quantity -= 1; 
                state.count -= 1;
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("count", JSON.stringify(state.count));
              }
            },

         selectCartCount : (state) => {
            return state.cart.reduce((total, item) => total + item.quantity, 0);
          },
          removeFromCart: (state, action) => {
            const idProduct = action.payload;
            state.cart = state.cart.filter((item) => item._id !== idProduct._id );
      
          state.count -= 1;
            
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("count", JSON.stringify(state.count));
          },
          clearlocal: (state) => {
            state.cart = [];
            state.count = 0;
            state.quantity = 1;

            localStorage.removeItem("cart");
           localStorage.removeItem("count");
            localStorage.removeItem("quantity");
          },
         totalbillCount: (state,action) => {
               state.totalbill = action.payload;

         }

          
    }
});

export const { addToCart, selectCartCount, clearlocal, incrementQuantity, decrementQuantity ,removeFromCart,totalbillCount,postpay } = cartSlice.actions;
export default cartSlice.reducer;

