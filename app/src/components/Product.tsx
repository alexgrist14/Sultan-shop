import {ReactElement, useContext, useEffect} from "react";
import weightIcon from '../assets/images/weight_icon.svg';
import volumeIcon from '../assets/images/volume_icon.svg';
import cartIcon from '../assets/images/cart_white_icon.svg';
import IProduct from "../types/IProduct";
import {useNavigate} from 'react-router-dom'
import {getProductByBarCode, ShoppingCartContext} from "../context/ShoppingCartContext";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProducts {
    product: IProduct
}

const Product = ({product}: IProducts): ReactElement => {
    const {productsInCart, setProductsInCart, productsToBuy, setProductsToBuy} = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (productsToBuy.length !== 0) {
            localStorage.setItem('productsToBuy', JSON.stringify(productsToBuy));
            localStorage.setItem('cartCount', (productsInCart).toString());
        }
    }, [productsToBuy])

    const handleToCart = (): void => {
        setProductsInCart(productsInCart + 1);
        if (!product) {
            return;
        }
        if (getProductByBarCode(productsToBuy, product.barcode)) {
            setProductsToBuy(productsToBuy.map((item) => {
                if (item.barcode === product.barcode) {
                    return {...item, amount: item.amount + 1}
                } else return item;
            }))
        } else {
            setProductsToBuy(prevState => [...prevState, {...product, amount: 1}]);
        }

        toast('Товар добавлен в корзину.', {hideProgressBar: true});
    }

    const handleClick = () => {
        navigate(`/product-card/${product.barcode}`)
    }
    return (
        <div data-testid="product" className='product'>
            <div className='product-image'><img src={product.url} alt="product_image"/></div>
            <div className='product-weight'>
                <div className='type-img'><img src={product.weightType === 'г' ? weightIcon : volumeIcon}
                                               alt="volume_icon"/></div>
                <span className='weight'>{product.size}</span>
                <span className='type'>{` ${product.weightType}`}</span>
            </div>
            <div className='product-name' onClick={handleClick}>
                <p><span className='name'>{product.name} </span>{product.description}</p>
            </div>
            <div className='product-details'>
                <div className='product-details__barcode'>Штрихкод: <span className='barcode'>{product.barcode}</span>
                </div>
                <div className='product-details__producer'>Производитель: <span
                    className='producer'>{product.producer}</span></div>
                <div className='product-details__brand'>Бренд: <span className='brand'>{product.brand}</span></div>
            </div>
            <div className='product-acquire'>
                <div className='product-price'>{product.price} ₸</div>
                <button data-testid='cart-btn' className='product-cart__btn' onClick={handleToCart}>
                    <div className='btn-text'>В корзину</div>
                    <div className='btn-img'><img src={cartIcon} alt="cart_icon"/></div>
                </button>
            </div>
        </div>
    );
}

export default Product