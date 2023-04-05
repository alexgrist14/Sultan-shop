import {ReactElement, useContext, useState} from "react";
import cartIcon from "../../assets/images/cart_white_icon.svg";
import shareIcon from "../../assets/images/share_icon.svg";
import downloadIcon from "../../assets/images/black_download.svg";
import {CheckoutProduct, getProductByBarCode, ShoppingCartContext} from "../../context/ShoppingCartContext";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";

interface ProductCardInfoPurchaseProps{
    productCard: CheckoutProduct | undefined,
}

const ProductCardInfoPurchase = ({productCard}:ProductCardInfoPurchaseProps): ReactElement =>{
    const {productsInCart, setProductsInCart, productsToBuy, setProductsToBuy} = useContext(ShoppingCartContext);
    const [countProducts, setCountProducts] = useState(1);
    const {barcode} = useParams();

    const handleDecrement = (): void => {
        if (countProducts > 1)
            setCountProducts(countProducts - 1);
    }

    const handleCart = (): void => {
        if (!productCard) {
            return;
        }
        setProductsInCart(productsInCart + countProducts);
        if (getProductByBarCode(productsToBuy, barcode)) {
            setProductsToBuy(productsToBuy.map((item) => {
                if (item.barcode === barcode) {
                    return {...item, amount: item.amount + countProducts}
                } else return item;
            }));
        } else {
            setProductsToBuy(prevState => [...prevState, {...productCard, amount: countProducts}] as CheckoutProduct[]);
        }
        toast('Товар добавлен в корзину.', {hideProgressBar: true});
    }

    return (
        <div className='product-card__info-purchase'>
            <div className='price'>{productCard?.price} ₸</div>
            <div className='count-products'>
                <button className='less' onClick={handleDecrement}>-</button>
                <div className='count'>{countProducts}</div>
                <button className='more' onClick={() => {
                    setCountProducts(countProducts + 1)
                }}>+
                </button>
            </div>
            <button className='to-cart__btn' onClick={handleCart}>
                <div>В корзину</div>
                <div><img src={cartIcon} alt=""/></div>
            </button>
            <div className='links'><img src={shareIcon} alt="share_icon"/></div>
            <div className='ad'>
                <div>При покупке от <span>10 000 ₸</span> бесплатная <br/> доставка по Кокчетаву и
                    области
                </div>
            </div>
            <div className='price-list'>
                <div>Прайс-лист</div>
                <div><img src={downloadIcon} alt="download_icon"/></div>
            </div>
        </div>
    )
}

export default ProductCardInfoPurchase