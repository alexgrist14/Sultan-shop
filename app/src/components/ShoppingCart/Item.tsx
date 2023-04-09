import {ReactElement, useContext} from "react";
import weightIcon from "../../assets/images/weight_icon.svg";
import volumeIcon from "../../assets/images/volume_icon.svg";
import deleteIcon from "../../assets/images/delete_icon.svg";
import {CheckoutProduct, ShoppingCartContext} from "../../context/ShoppingCartContext";
import {setLocalStorageItem} from "../../componentsUtils/localStorageUtils";

interface ShoppingCartItemProps {
    item: CheckoutProduct,
}

const ShoppingCartItem = ({item}: ShoppingCartItemProps): ReactElement => {
    const {setProductsInCart, productsToBuy, setProductsToBuy} = useContext(ShoppingCartContext);

    const handleDecrement = (product: CheckoutProduct): void => {
        setProductsToBuy(productsToBuy.map((item) => {
            if ((product.barcode === item.barcode) && item.amount > 1) {
                return {...item, amount: item.amount - 1};
            } else return item;
        }))
        setProductsInCart(prevState => {
            return prevState > 1 ? prevState - 1 : prevState
        });
    }

    const handleIncrement = (product: CheckoutProduct): void => {
        setProductsToBuy(productsToBuy.map((item) => {
            if (product.barcode === item.barcode) {
                return {...item, amount: item.amount + 1};
            } else return item;
        }))
        setProductsInCart(prevState => prevState + 1);
    }

    const handleDeleteProduct = (product: CheckoutProduct): void => {
        setProductsToBuy(prevState => {
            setLocalStorageItem('productsToBuy',prevState.filter(item => item !== product));
            return prevState.filter(item => item !== product);
        })
        setProductsInCart(prevState => {
            setLocalStorageItem('cartCount',prevState - product.amount);
            return prevState - product.amount;
        });
    }

    return (
        <>
            <div className='dashed-border'></div>
            <div className='shopping-cart__products-item'>
                <div className='product-img'>
                    <div><img src={item.url} alt="product_image"/></div>
                </div>
                <div className='product-description'>
                    <div className='product-description__weight'>
                        <div className='product-description__weight-img'><img
                            src={item.weightType === 'г' ? weightIcon : volumeIcon}
                            alt="weight_icon"/></div>
                        <div className='product-description__weight-size'>{item.size}</div>
                        <div
                            className='product-description__weight-type'>{item.weightType}</div>
                    </div>
                    <div className='product-description__name'>
                        {item.name} {item.description}
                    </div>
                    <p className='product-description__text'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam interdum ut justo, vestibulum sagittis iaculis iaculis.
                        Quis mattis vulputate feugiat massa vestibulum duis.
                    </p>
                </div>
                <div className='product-count'>
                    <div className='product-count__decrement' onClick={() => {
                        handleDecrement(item)
                    }}>-
                    </div>
                    <div className='product-count__quantity'>{item.amount}</div>
                    <div className='product-count__increment' onClick={() => {
                        handleIncrement(item)
                    }}>+
                    </div>
                </div>
                <div className='product-total-cost'>{(+item.price * item.amount).toFixed(2)}<span> ₸</span>
                </div>
                <div className='dashed-border'></div>
                <button className='product-delete__btn'
                        onClick={() => handleDeleteProduct(item)}><img src={deleteIcon}
                                                                       alt="delete_icon"/>
                </button>
            </div>
        </>
    )
}

export default ShoppingCartItem