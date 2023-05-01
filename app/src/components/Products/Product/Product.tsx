import {ReactElement, useContext, useEffect} from "react";
import weightIcon from '../../../assets/images/weight_icon.svg';
import volumeIcon from '../../../assets/images/volume_icon.svg';
import cartIcon from '../../../assets/images/cart_white_icon.svg';
import {IProduct} from "../../../types/IProduct";
import {useNavigate} from 'react-router-dom'
import {getProductByBarCode, ShoppingCartContext} from "../../../context/ShoppingCartContext";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {setLocalStorageItem} from "../../../Utils/localStorageUtils";
import styles from "./Product.module.scss";

interface IProducts {
    product: IProduct
}

const Product = ({product}: IProducts): ReactElement => {
    const {productsInCart, setProductsInCart, productsToBuy, setProductsToBuy} = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (productsToBuy.length !== 0) {
            setLocalStorageItem('productsToBuy', productsToBuy);
            setLocalStorageItem('cartCount', productsInCart);
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

    const handleRedirectToCardPage = () => {
        navigate(`/product-card/${product.barcode}`)
    }

    return (
        <div data-testid="product" className={styles.product}>
            <div className={styles.image}><img src={product.url} alt="product_image"/></div>
            <div className={styles.weight}>
                <div className={styles.img_type}><img src={product.weightType === 'г' ? weightIcon : volumeIcon}
                                               alt="volume_icon"/></div>
                <span className={styles.size}>{product.size}</span>
                <span>{` ${product.weightType}`}</span>
            </div>
            <div data-testid='product-name' className={styles.name} onClick={handleRedirectToCardPage}>
                <p><span className={styles.text}>{product.name} </span>{product.description}</p>
            </div>
            <div className={styles.details}>
                <div className={styles.details__barcode}>Штрихкод: <span>{product.barcode}</span>
                </div>
                <div className={styles.details__producer}>Производитель: <span>{product.producer}</span></div>
                <div className={styles.details__brand}>Бренд: <span>{product.brand}</span></div>
            </div>
            <div className={styles.acquire}>
                <div className={styles.price}>{product.price} ₸</div>
                <button data-testid='cart-btn' className={styles.cart__btn} onClick={handleToCart}>
                    <div>В корзину</div>
                    <div><img src={cartIcon} alt="cart_icon"/></div>
                </button>
            </div>
        </div>
    );
}

export default Product