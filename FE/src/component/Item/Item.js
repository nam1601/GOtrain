import styles from './Item.module.scss';

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import check from '~/asset/image/check.png';

import { addCart, checkItemInCart } from '~/services/services';
import { useSelector } from 'react-redux';
import { addToCart } from '~/features/cart/cartSlice';
import { useDispatch } from 'react-redux';
const cx = classNames.bind(styles);
function Product({ product }) {
    const dispatch = useDispatch();
    const [isHave, setIsHave] = useState(false);
    useEffect(() => {
        const check = async () => {
            const res = await checkItemInCart(product.id);
            setIsHave(res.isHave);
        };
        check();
    }, []);
    const handleAddCart = async () => {
        try {
            // await addCart(product.id, 1, product.price);
            setIsHave(true);
            let idItem = product.id;
            let price = product.price;
            let quantity = 1;
            dispatch(addToCart({ idItem, quantity, price }));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={cx('product_item')} key={product.id}>
            <div
                className={cx('product__post')}
                style={{ backgroundColor: `${product.color}` }}
            >
                <img src={product.image} alt={product.id} />
            </div>
            <h3>{product.name}</h3>
            <p className={cx('product__desc')}>{product.description}</p>
            <div className={cx('product__add')}>
                <span>${product.price}</span>

                {isHave ? (
                    <button className={cx('have')}>
                        <img src={check} alt="check" />
                    </button>
                ) : (
                    <button onClick={() => handleAddCart()}>Add to cart</button>
                )}
            </div>
        </div>
    );
}

export default Product;
