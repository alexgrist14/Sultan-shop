import {ReactElement, useContext, useEffect, useState} from "react";
import {ShoppingCartContext} from "../../context/ShoppingCartContext";
import OrderMessage from "../OrderMessage";
import Breadcrumbs from "../Breadcrumbs";
import BreadCrumbMobile from "../BreadCrumbMobile";
import ShoppingCartItem from "./Item";

const ShoppingCart = (): ReactElement => {
    const {
        productsInCart,
        setProductsInCart,
        productsToBuy,
        setProductsToBuy,
        totalCost,
        isSmallScreen
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

    return (
        <>
            <div data-testid="cart-main" className='shopping-cart__container'>
                <OrderMessage showOrderMessage={showOrderMessage} onClose={handleCloseMessage}/>
                <div className='shopping-cart__content'>
                    {
                        isSmallScreen ?
                            <BreadCrumbMobile/>
                             :
                            <Breadcrumbs items={[{path:"",title:"Корзина"}]}/>
                    }
                    <h2 className='shopping-cart__title'>Корзина</h2>
                    <div className='shopping-cart__products'>
                        {
                            productsToBuy.length > 0 ? productsToBuy.map((item, index) => {
                                    return (<ShoppingCartItem key={index} item={item}/>)
                                }) : (
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