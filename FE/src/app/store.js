import { configureStore } from '@reduxjs/toolkit';
import storeReducers from '../features/user/userSlice';
import cartReducers from '~/features/cart/cartSlice';
export const store = configureStore({
    reducer: { storeReducers, cartReducers },
});
