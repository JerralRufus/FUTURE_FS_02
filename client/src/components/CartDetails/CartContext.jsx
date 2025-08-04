import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product_title !== action.payload),
      };
    case 'DECREASE_QUANTITY':
      const existingItem = state.cart.find(item => item.product_title === action.payload);
      if (existingItem && existingItem.quantity > 1) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product_title === action.payload ? { ...item, quantity: item.quantity - 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          cart: state.cart.filter(item => item.product_title !== action.payload),
        };
      }
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      if (!isAuthenticated) return;
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
          headers: { 'x-auth-token': token },
        });
        dispatch({ type: 'SET_CART', payload: res.data });
      } catch (error) {
        console.error("Failed to fetch cart", error);
        dispatch({ type: 'CLEAR_CART' }); 
      }
    };

    if (isAuthenticated) {
      fetchCart();
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [isAuthenticated]); 

  const addToCart = async (item) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/cart/add`, item, {
        headers: { 'x-auth-token': token },
      });
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
        headers: { 'x-auth-token': token },
      });
      dispatch({ type: 'SET_CART', payload: res.data });
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const removeFromCart = async (productTitle) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart/remove/${productTitle}`, {
        headers: { 'x-auth-token': token },
      });
      dispatch({ type: 'REMOVE_FROM_CART', payload: productTitle });
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  };

  const decreaseQuantity = async (productTitle) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart/remove/${productTitle}`, {
        headers: { 'x-auth-token': token },
      });
      dispatch({ type: 'DECREASE_QUANTITY', payload: productTitle });
    } catch (error) {
      console.error("Failed to decrease quantity", error);
    }
  };

  const clearCartFrontend = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

  return (
        <CartContext.Provider value={{
            cart: state.cart,
            addToCart,
            removeFromCart,
            decreaseQuantity,
            clearCartFrontend 
        }}>
            {children}
        </CartContext.Provider>
    );
};