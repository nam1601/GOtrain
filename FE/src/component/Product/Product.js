import styles from './Product.module.scss';

import classNames from 'classnames/bind';

import nikeLogo from '~/asset/image/nike.png';
import Item from '../Item';
const cx = classNames.bind(styles);
function Product({ listProduct }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('block')}></div>
            <div className={cx('product__header')}>
                <img src={nikeLogo} alt="nike-logo" />
                <h4>Our Product</h4>
            </div>
            <div className={cx('content-wrapper')}>
                <div className={cx('content')}>
                    {listProduct.map((product) => (
                        <Item product={product} key={product.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Product;
