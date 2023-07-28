import axios from 'axios';
import * as httpRequest from '~/utils/httpRequest';
export const getAllProduct = async () => {
    try {
        const res = await httpRequest.get('products');
        return res.shoes;
    } catch (error) {
        console.log(error);
    }
};
export const getAllCart = async () => {
    try {
        const res = await httpRequest.get('products-cart');
        return res.shoes;
    } catch (error) {
        console.log(error);
    }
};
export const deleteItem = async (id) => {
    console.log('log from delete: ', id);
    try {
        const res = await axios.delete('http://localhost:8081/api/v1/product', {
            data: { id },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const updateQuantityItem = async (id, quantity, totalPrice) => {
    console.log('log from delete: ', id, quantity, totalPrice);
    try {
        const res = await axios.put(
            'http://localhost:8081/api/v1/product/quantity',
            {
                id,
                quantity,
                totalPrice,
            },
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const checkItemInCart = async (id) => {
    try {
        const res = await httpRequest.get('product/check', { params: { id } });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const addCart = async (id, quantity, totalPrice) => {
    try {
        await axios.post('http://localhost:8081/api/v1/product', {
            id,
            quantity,
            totalPrice,
        });
    } catch (error) {
        console.log(error);
    }
};
export const getInfo = async (idItem) => {
    try {
        const res = await httpRequest.get('product/info', {
            params: { idItem },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
