import {ReactElement, useContext} from "react";
import menuIcon from "../../assets/images/menu_icon.svg";
import sultanLogo from "../../assets/images/sultan_logo.png";
import cartIcon from "../../assets/images/cart_icon.svg";
import {ShoppingCartContext} from "../../context/ShoppingCartContext";
import {Link} from "react-router-dom";

interface HeaderLogoProps {
    handleClick: () => void,
}

const HeaderLogo = ({handleClick}: HeaderLogoProps): ReactElement => {
    const {productsInCart, isSmallScreen} = useContext(ShoppingCartContext);
    return (
        <div className='header-actions__logo'>
            {
                isSmallScreen &&
                <div className='menu-btn'>
                    <img src={menuIcon} alt="menu_icon"/>
                </div>
            }
            <Link to='/'><img className='sultan-logo' src={sultanLogo} alt="sultan_logo"/></Link>
            {
                isSmallScreen &&
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
                </div>
            }
        </div>
    )
}

export default HeaderLogo