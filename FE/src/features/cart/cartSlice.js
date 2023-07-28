import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
    getAllCart,
    deleteItem,
    updateQuantityItem,
    addCart,
    getInfo,
} from '~/services/services';
const initialState = {
    data: [],
    totalPrice: 0,
    status: 'idle',
    error: null,
};
export const getAllInCart = createAsyncThunk(
    'cart/getAll',
    async (credentials) => {
        const response = await getAllCart();
        return response;
    },
);
export const removeFromCart = createAsyncThunk(
    'store/removeFromCart',
    async (idItem, { getState }) => {
        try {
            // Gọi API để xóa khỏi cart
            await deleteItem(idItem);

            // Sau khi xóa thành công, cập nhật lại dữ liệu từ state
            const state = getState();
            const newData = state.cartReducers.data.filter(
                (item) => item.idItem !== idItem,
            );

            // Tính lại tổng totalPrice
            const totalPrice = newData.reduce(
                (total, item) => total + item.totalPrice,
                0,
            );

            // Trả về dữ liệu mới sau khi xóa
            return { data: newData, totalPrice };
        } catch (error) {
            // Xử lý lỗi nếu có
            console.log(error);
            throw error; // Nếu muốn truyền lỗi cho UI
        }
    },
);
export const updateQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async ({ idItem, quantity, price, action }, { getState }) => {
        try {
            console.log('idItem: ', idItem);
            let newQuantity = quantity + action;
            if (newQuantity < 0) {
                newQuantity = 0;
            }
            const newTotalPrice = newQuantity * price;
            await updateQuantityItem(idItem, newQuantity, newTotalPrice);

            const state = getState();
            const newData = state.cartReducers.data.map((item) => {
                if (item.idItem === idItem) {
                    return {
                        ...item,
                        quantity: newQuantity,
                        totalPrice: newTotalPrice,
                    };
                }
                return item;
            });

            const totalPrice = newData.reduce(
                (total, item) => total + item.totalPrice,
                0,
            );

            return { data: newData, totalPrice };
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
);
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ idItem, quantity = 1, price }, { getState }) => {
        try {
            await addCart(idItem, quantity, price);
            const res = await getInfo(idItem);
            const state = getState();

            // const existingItem = state.cartReducers.data.find(
            //     (item) => item.idItem === idItem,
            // );
            const newItem = res.data;
            console.log('newitem: ', newItem);
            const newData = [...state.cartReducers.data, newItem];
            const totalPrice = newData
                .reduce((total, item) => total + item.totalPrice, 0)
                .toFixed(2);
            return { data: newData, totalPrice };
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
);
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllInCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllInCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                const price = action.payload.reduce(
                    (total, item) => total + item.totalPrice,
                    0,
                );
                state.totalPrice = price.toFixed(2);
            })
            .addCase(getAllInCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            })
            .addCase(removeFromCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload.data;
                const price = action.payload.data.reduce(
                    (total, item) => total + item.totalPrice,
                    0,
                );
                state.totalPrice = price.toFixed(2);
                console.log(state.data);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            })
            .addCase(updateQuantity.pending, (state) => {
                state.status = 'loading';
            })

            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload.data;
                state.totalPrice = action.payload.totalPrice.toFixed(2);
            })

            .addCase(updateQuantity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            })
            .addCase(addToCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload);
                state.data = action.payload.data;

                state.totalPrice = action.payload.totalPrice;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            });
    },
});

export const selectCart = (state) => {
    return state.cartReducers;
};

export default cartSlice.reducer;
