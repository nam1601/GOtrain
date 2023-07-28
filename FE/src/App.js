import { Fragment, createContext, useEffect, useState } from 'react';
import { getAllProduct } from './services/services';
import Product from './component/Product';
import Cart from './component/Cart';
import { useSelector } from 'react-redux';
import { selectStore, getAll } from './features/user/userSlice';
import { useDispatch } from 'react-redux';
function App() {
    const store = useSelector(selectStore);
    const dispatch = useDispatch();
    // const [listProduct, setListProduct] = useState([]);
    useEffect(() => {
        dispatch(getAll());
    }, [dispatch]);
    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         const response = await getAllProduct();
    //         setListProduct(response);
    //     };
    //     fetchProduct();
    // }, []);
    return (
        <div className="App">
            <div className="yellow-background"></div>
            <Product listProduct={store} />
            <Cart />
        </div>
    );
}
export default App;
