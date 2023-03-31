import {ReactElement, useContext, useEffect, useState} from "react";
import locationIcon from '../assets/images/location_icon.svg';
import mailIcon from '../assets/images/mail_icon.svg';
import sultanLogo from '../assets/images/sultan_logo.png';
import catalogLogo from '../assets/images/canalog_logo.svg';
import darkCatalogLogo from '../assets/images/dark_caralog_icon.svg';
import searchIcon from '../assets/images/search_icon.svg';
import darkSearchIcon from '../assets/images/dark_search_icon.svg';
import consultant from '../assets/images/Consultant_picture.png';
import priceIcon from '../assets/images/download_icon.svg';
import cartIcon from '../assets/images/cart_icon.svg';
import menuIcon from '../assets/images/menu_icon.svg';
import {ShoppingCartContext} from "../context/ShoppingCartContext";
import {useNavigate} from "react-router-dom";

const Header = (): ReactElement => {
    const {
        productsInCart,
        setProductsInCart,
        productsToBuy,
        totalCost,
        setTotalCost,
        setProductsToBuy,
        isSmallScreen,
        setIsSmallScreen
    } = useContext(ShoppingCartContext);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 600);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!localStorage.getItem('cartCount')) {
            setProductsInCart(0);
        } else {
            const count = localStorage.getItem('cartCount');
            if (count) {
                const storedData = localStorage.getItem('productsToBuy')
                if (storedData) {
                    setProductsToBuy(JSON.parse(storedData))
                }
                setTotalCost(productsToBuy.reduce((total, product) => {
                    const price = parseFloat(product.price);
                    const amount = product.amount;
                    return +(total + (price * amount)).toFixed(2);
                }, 0))
                setProductsInCart(JSON.parse(count));
            }
        }
    }, [])

    useEffect(() => {
        if (productsToBuy.length > 0) {
            setTotalCost(productsToBuy.reduce((total, product) => {
                const price = parseFloat(product.price);
                const amount = product.amount;
                return +(total + (price * amount)).toFixed(2);
            }, 0))
        } else setTotalCost(0)

    }, [productsInCart, productsToBuy])

    const navigate = useNavigate();

    const handleClick = (): void => {
        navigate('/shopping-cart');
    }

    return (
        <header className='header'>
            <div className='header-menu'>
                <div className='header-menu__details'>
                    <div className='header-menu__details-location'>
                        <div className='location-image'><img src={locationIcon} alt="location_icon"/></div>
                        <div className='location-address'>
                            г. Кокчетав, ул. Ж. Ташенова 129Б
                            <span>(Рынок Восточный)</span>
                        </div>
                    </div>
                    <div className='dashed-border'></div>
                    <div className='header-menu__details-mail'>
                        <div className='mail-image'><img src={mailIcon} alt="mail_icon"/></div>
                        <div className='mail-address'>
                            opt.sultan@mail.ru
                            <span>На связи в любое время</span>
                        </div>
                    </div>
                </div>
                <nav className='navigation'>
                    <ul className='navigation-list'>
                        <li className='navigation-list__item'>О компании</li>
                        <div className='dashed-border'></div>
                        <li className='navigation-list__item'>Доставка и оплата</li>
                        <div className='dashed-border'></div>
                        <li className='navigation-list__item'>Возврат</li>
                        <div className='dashed-border'></div>
                        <li className='navigation-list__item'>Контакты</li>
                    </ul>
                </nav>
            </div>
            <div className='header-actions'>
                <div className='header-actions__container'>
                    <div className='header-actions__logo'>
                        {
                            isSmallScreen &&
                            <div className='menu-btn'>
                                <img src={menuIcon} alt="menu_icon"/>
                            </div>
                        }
                        <img className='sultan-logo' src={sultanLogo} alt="sultan_logo"/>
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
                    <div className='first-actions__container'>
                        <div className='header-actions__catalog-btn'>
                            <button><span>Каталог</span> <img src={isSmallScreen ? darkCatalogLogo : catalogLogo}
                                                              alt="catalog_logo"/></button>
                        </div>
                        <div className='header-actions__search-field'>
                            <div className='search-placeholder'>Поиск...</div>
                            <div className='search-btn'><img src={isSmallScreen ? darkSearchIcon : searchIcon}
                                                             alt="search_icon"/></div>
                        </div>
                    </div>
                    <div className='second-actions__container'>
                        <div className='header-actions__callback'>
                            <div className='content'>
                                <span className='number'>+7 (777) 490-00-91</span>
                                <span className='schedule'>время работы: 9:00-20:00</span>
                                <span className='order-callback'>Заказать звонок</span>
                            </div>
                            <div className='callback-img'>
                                <img src={consultant} alt="consultant"/>
                            </div>
                        </div>
                        <div className='dashed-border'></div>
                        <div className='header-actions__price-btn'>
                            <div className='price-title'>Прайс-лист</div>
                            <div className='price-btn'><img src={priceIcon} alt="price_icon"/></div>
                        </div>
                        <div className='dashed-border'></div>
                        {
                            !isSmallScreen &&
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
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;