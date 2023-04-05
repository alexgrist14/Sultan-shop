import {ReactElement, useContext} from "react";
import downloadIcon from "../../assets/images/download_icon.svg";
import whatsAppIcon from "../../assets/images/whatsapp.png";
import telegramIcon from "../../assets/images/logos_telegram.png";
import {ShoppingCartContext} from "../../context/ShoppingCartContext";

const FooterDownloads = (): ReactElement => {
    const {isSmallScreen} = useContext(ShoppingCartContext);

    return (
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
    )
}

export default FooterDownloads