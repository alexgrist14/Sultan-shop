import locationIcon from "../../assets/images/location_icon.svg";
import mailIcon from "../../assets/images/mail_icon.svg";
import {ReactElement} from "react";

const HeaderMenu = (): ReactElement =>{
    return (
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
    )
}

export default HeaderMenu