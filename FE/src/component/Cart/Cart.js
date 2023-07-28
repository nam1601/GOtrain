import styles from './Cart.module.scss';

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import nikeLogo from '~/asset/image/nike.png';
import minus from '~/asset/image/minus.png';
import plus from '~/asset/image/plus.png';
import trash from '~/asset/image/trash.png';

import { useSelector } from 'react-redux';
import {
    selectCart,
    getAllInCart,
    removeFromCart,
    updateQuantity,
} from '~/features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);
function Cart() {
    const listCart = useSelector(selectCart);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllInCart());
    }, [dispatch]);
    // useEffect(() => {

    // }, [listCart]);
    // const [listCart, setListCart] = useState([]);
    // const [totalPriceSum, setTotalPriceSum] = useState(0);
    // useEffect(() => {
    //     const fetchCart = async () => {
    //         const res = await getAllCart();
    //         setListCart(res);
    //     };
    //     fetchCart();
    // }, []);
    // const calculateTotalPriceSum = () => {
    //     const sum = listCart.reduce(
    //         (total, cart) => total + cart.totalPrice,
    //         0,
    //     );

    //     return sum.toFixed(2);
    // };
    // useEffect(() => {
    //     // Mỗi khi listCart thay đổi, tính lại tổng totalPrice

    //     const sum = calculateTotalPriceSum();
    //     setTotalPriceSum(sum);
    // }, [listCart]);
    const handleDelete = async (idItem) => {
        await dispatch(removeFromCart(idItem));
    };
    const handleUpdateQuantity = async (id, quantity, price, action) => {
        try {
            let idItem = id;
            dispatch(updateQuantity({ idItem, quantity, price, action }));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('block')}></div>
            <div className={cx('cart__header')}>
                <img src={nikeLogo} alt="nike-logo" />
                <div className={cx('header__title')}>
                    <h4>Your cart</h4>
                    <div>${listCart.totalPrice}</div>
                </div>
            </div>
            <div className={cx('content-wrapper')}>
                <div className={cx('content')}>
                    {listCart.data.map((cart) => (
                        <div className={cx('cart_item')} key={cart.id}>
                            <div className={cx('cart__post')}>
                                <div
                                    className={cx('cart__circle')}
                                    style={{
                                        backgroundColor: `${cart.Store.color}`,
                                    }}
                                ></div>
                                <img
                                    src={cart.Store.image}
                                    alt={cart.Store.id}
                                />
                            </div>
                            <div className={cx('cart_item__info')}>
                                <h3>{cart.Store.name}</h3>
                                <h3 className={cx('item__price')}>
                                    ${cart.Store.price}
                                </h3>
                                <div className={cx('cart__action')}>
                                    <div className={cx('item__quantity')}>
                                        <button
                                            onClick={() =>
                                                handleUpdateQuantity(
                                                    cart.idItem,
                                                    cart.quantity,
                                                    cart.Store.price,
                                                    -1,
                                                )
                                            }
                                        >
                                            <img src={minus} alt="decrease" />
                                        </button>
                                        <div className={cx('quantity')}>
                                            {cart.quantity}
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleUpdateQuantity(
                                                    cart.idItem,
                                                    cart.quantity,
                                                    cart.Store.price,
                                                    1,
                                                )
                                            }
                                        >
                                            <img src={plus} alt="increase" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleDelete(cart.idItem)
                                        }
                                        className={cx('delete__btn')}
                                    >
                                        <img src={trash} alt="trash" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Cart;
