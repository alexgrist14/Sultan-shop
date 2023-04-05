import {ReactElement, useContext} from "react";
import companyLogo from "../../assets/images/sultan-logo_white.png";
import downloadIcon from "../../assets/images/download_icon.svg";
import arrowBtn from "../../assets/images/arrow-right.svg";
import {ShoppingCartContext} from "../../context/ShoppingCartContext";

const FooterDescription = (): ReactElement => {
    const {isSmallScreen} = useContext(ShoppingCartContext);

    return (
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
            <p>Компания «Султан» — снабжаем розничные магазины товарами{!isSmallScreen && <br/>}
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
    )
}

export default FooterDescription