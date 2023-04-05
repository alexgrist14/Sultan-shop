import {ReactElement} from "react";

const FooterNavigation = (): ReactElement => {
    return (
        <>
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
        </>
    )
}

export default FooterNavigation