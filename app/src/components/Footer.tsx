import {ReactElement, useContext} from "react";
import companyLogo from '../assets/images/sultan-logo_white.png';
import arrowBtn from '../assets/images/arrow-right.svg';
import visaLogo from '../assets/images/Visa.png';
import masterCardLogo from '../assets/images/mastercard.png';
import downloadIcon from '../assets/images/download_icon.svg';
import telegramIcon from '../assets/images/logos_telegram.png';
import whatsAppIcon from '../assets/images/whatsapp.png';
import {ShoppingCartContext} from "../context/ShoppingCartContext";

const Footer = (): ReactElement => {
    const {isSmallScreen} = useContext(ShoppingCartContext);
    return (
        <footer className='footer'>
            <div className='footer-content__company-description'>
                <div className='footer-header'>
                    <div className='company-logo'><img src={companyLogo} alt="company_logo"/></div>
                    {
                        isSmallScreen &&
                        <div className='footer-links__downloads-btn'>
                            <div className='btn-text'>Прайс-лист</div>
                            <div className='btn-img'><img src={downloadIcon} alt="download_icon"/></div>
                        </div>
                    }
                </div>

                <p>Компания «Султан» — снабжаем розничные магазины товарами{!isSmallScreen &&<br/>}
                    "под ключ" в Кокчетаве и Акмолинской области
                </p>
                <div className='sales-subscribe'>
                    <h4 className='sales-subscribe__title'>Подпишись на скидки и акции</h4>
                    <div className='mail-input'>
                        <div className='mail-placeholder'>Введите ваш E-mail</div>
                        <div className='mail-submit'><img src={arrowBtn} alt="arrow"/></div>
                    </div>
                </div>
            </div>
            <div className='footer-links__container'>
                <div className='footer-links__menu'>
                    <h3 className='footer-links__menu-title'>Меню сайта:</h3>
                    <ul className='footer-links__menu-list'>
                        <li className='footer-links__menu-list__item'>О компании</li>
                        <li className='footer-links__menu-list__item'>Доставка и оплата</li>
                        <li className='footer-links__menu-list__item'>Возврат</li>
                        <li className='footer-links__menu-list__item'>Контакты</li>
                    </ul>
                </div>
                <div className='footer-links__categories'>
                    <h3 className='footer-links__categories-title'>Категории:</h3>
                    <ul className='footer-links__categories-list'>
                        <li className='footer-links__categories-list__item'>Бытовая химия</li>
                        <li className='footer-links__categories-list__item'>Косметика и гигиена</li>
                        <li className='footer-links__categories-list__item'>Товары для дома</li>
                        <li className='footer-links__categories-list__item'>Товары для детей и мам</li>
                        <li className='footer-links__categories-list__item'>Посуда</li>
                    </ul>
                </div>
                <div className='footer-links__downloads'>
                    {
                        !isSmallScreen &&
                        <>
                            <h3 className='footer-links__downloads-title'>Скачать прайс-лист:</h3>
                            <div className='footer-links__downloads-btn'>
                                <div className='btn-text'>Прайс-лист</div>
                                <div className='btn-img'><img src={downloadIcon} alt="download_icon"/></div>
                            </div>
                        </>
                    }
                    <div className='footer-links__downloads-socials'>
                        <h4 className='socials-title'>Связь в мессенджерах:</h4>
                        <div className='socials-links'>
                            <div className='whatsapp'><img src={whatsAppIcon} alt="whatsapp"/></div>
                            <div className='telegram'><img src={telegramIcon} alt="telegram"/></div>
                        </div>
                    </div>
                </div>
                <div className='footer-links__contacts'>
                    <h3 className='footer-links__contacts-title'>Контакты:</h3>
                    <div className='footer-links__contacts-number'>
                        <span className='number'>+7 (777) 490-00-91</span>
                        <span className='schedule'>время работы: 9:00-20:00</span>
                        <span className='order-callback'>Заказать звонок</span>
                    </div>
                    <div className='footer-links__contacts-mail'>
                        opt.sultan@mail.ru
                        <span>На связи в любое время</span>
                    </div>
                    <div className='footer-links__contacts-payments'>
                        <div className='visa'><img src={visaLogo} alt="visa"/></div>
                        <div className='mastercard'><img src={masterCardLogo} alt="mastercard"/></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer