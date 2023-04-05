import {ReactElement, useContext} from "react";
import cartIcon from "../../assets/images/cart_icon.svg";
import {ShoppingCartContext} from "../../context/ShoppingCartContext";

interface HeaderCartProps {
    handleClick: () => void,
}

const HeaderCart = ({handleClick}: HeaderCartProps): ReactElement => {
    const {productsInCart, totalCost} = useContext(ShoppingCartContext);

    return (
        <div className='header-actions__cart' onClick={handleClick}>
            <div className='cart-icon'>
                <img src={cartIcon} alt="cart-icon"/>
                {
                    productsInCart > 0 ?
                        <div className='count-products'>
                            {productsInCart}
                        </div> : ''
                }
            </div>
            <div className='total-cost'>
                <h4>Корзина </h4>
                <span className='cost'>{totalCost} ₸</span>
            </div>
        </div>
    )
}

export default HeaderCart