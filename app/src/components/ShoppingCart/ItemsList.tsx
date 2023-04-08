import {Dispatch, ReactElement, SetStateAction, useContext} from "react";
import ShoppingCartItem from "./Item";
import {ShoppingCartContext} from "../../context/ShoppingCartContext";

interface ShoppingCartItemsListProps {
    setShowOrderMessage: Dispatch<SetStateAction<boolean>>
}

const ShoppingCartItemsList = ({setShowOrderMessage}:ShoppingCartItemsListProps): ReactElement => {
    const {
        setProductsInCart,
        productsToBuy,
        setProductsToBuy,
        totalCost,
    } = useContext(ShoppingCartContext);

    const handleOpenOrderMessage = (): void => {
        setProductsInCart(0);
        setProductsToBuy([]);
        localStorage.setItem('productsToBuy', '[]');
        localStorage.setItem('cartCount', '0');
        setShowOrderMessage(true)
    }

    return (
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
    )
}

export default ShoppingCartItemsList