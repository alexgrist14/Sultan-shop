import {ReactElement, useContext, useEffect, useState} from "react";
import {CheckoutProduct, ShoppingCartContext} from "../context/ShoppingCartContext";
import weightIcon from "../assets/images/weight_icon.svg";
import volumeIcon from "../assets/images/volume_icon.svg";
import deleteIcon from "../assets/images/delete_icon.svg";
import {Link} from "react-router-dom";
import OrderMessage from "./OrderMessage";

const ShoppingCart = (): ReactElement => {
    const {
        productsInCart,
        setProductsInCart,
        productsToBuy,
        setProductsToBuy,
        totalCost
    } = useContext(ShoppingCartContext);

    const [showOrderMessage, setShowOrderMessage] = useState(false);

    useEffect(() => {
        const storedData = localStorage.getItem('productsToBuy')
        if (storedData) {
            setProductsToBuy(JSON.parse(storedData))
        }
    }, []);

    useEffect(() => {
        if (productsToBuy.length !== 0) {
            localStorage.setItem('productsToBuy', JSON.stringify(productsToBuy));
            localStorage.setItem('cartCount', (productsInCart).toString());
        }
    }, [productsInCart, productsToBuy])

    const handleOpenOrderMessage = (): void => {
        setProductsInCart(0);
        setProductsToBuy([]);
        localStorage.setItem('productsToBuy', '[]');
        localStorage.setItem('cartCount', '0');
        setShowOrderMessage(true)
    }

    const handleCloseMessage = (): void => {
        setShowOrderMessage(false)
    }

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
            localStorage.setItem('productsToBuy', JSON.stringify(prevState.filter(item => item !== product)));
            return prevState.filter(item => item !== product);
        })
        setProductsInCart(prevState => {
            localStorage.setItem('cartCount', (prevState - product.amount).toString());
            return prevState - product.amount;
        });
    }

    return (
        <>
            <div className='shopping-cart__container'>
                <OrderMessage showOrderMessage={showOrderMessage} onClose={handleCloseMessage}/>

                <div className='shopping-cart__content'>
                    <ul className='breadcrumbs'>
                        <li><Link className='link' to="/">Главная</Link></li>
                        <div className='dashed-border'></div>
                        <li className='cart-crumb'>
                            <div>Корзина</div>
                        </li>
                    </ul>
                    <h2 className='shopping-cart__title'>Корзина</h2>
                    <div className='shopping-cart__products'>
                        {
                            productsToBuy.length > 0 ? productsToBuy.map((item) => {
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
                                })
                                : (
                                    <>
                                        Корзина пуста. Перейдите в каталог чтобы выбрать товары.
                                    </>
                                )

                        }
                        {
                            productsToBuy.length > 0 ?
                                <div className='ordering'>
                                    <div className='ordering-btn' onClick={handleOpenOrderMessage}>Оформить заказ</div>
                                    <div className='ordering-total-cost'>{totalCost} ₸</div>
                                </div>
                                : ''
                        }

                    </div>
                </div>
            </div>

        </>
    )
}

export default ShoppingCart