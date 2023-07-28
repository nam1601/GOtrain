import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getAllProduct } from '~/services/services';
const initialState = {
    data: [],
    status: 'idle',
    error: null,
};
export const getAll = createAsyncThunk('store/getAll', async (credentials) => {
    const response = await getAllProduct();
    return response;
});

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                // Lưu thông tin người dùng vào localStorage
            })
            .addCase(getAll.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            });
    },
});

export const selectStore = (state) => {
    return state.storeReducers.data;
};

export default storeSlice.reducer;
