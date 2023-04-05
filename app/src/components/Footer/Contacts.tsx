import {ReactElement} from "react";
import visaLogo from "../../assets/images/Visa.png";
import masterCardLogo from "../../assets/images/mastercard.png";

const FooterContacts = (): ReactElement => {
    return (
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
    )
}

export default FooterContacts