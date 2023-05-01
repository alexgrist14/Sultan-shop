import { ReactElement, useContext } from "react";
import downloadIcon from "../../../assets/images/download_icon.svg";
import whatsAppIcon from "../../../assets/images/whatsapp.png";
import telegramIcon from "../../../assets/images/logos_telegram.png";
import { ShoppingCartContext } from "../../../context/ShoppingCartContext";
import styles from "./Downloads.module.scss";

const FooterDownloads = (): ReactElement => {
  const { isSmallScreen } = useContext(ShoppingCartContext);

  return (
    <div className={styles.links__downloads}>
      {!isSmallScreen && (
        <>
          <h3 className={styles.links__downloads_title}>Скачать прайс-лист:</h3>
          <div className={styles.links__downloads_btn}>
            <div className={styles.text}>Прайс-лист</div>
            <div className={styles.img}>
              <img src={downloadIcon} alt="download_icon" />
            </div>
          </div>
        </>
      )}
      <div className={styles.links__downloads_socials}>
        <h4 className={styles.title}>Связь в мессенджерах:</h4>
        <div className={styles.links}>
          <div className={styles.icon}>
            <img src={whatsAppIcon} alt="whatsapp" />
          </div>
          <div className={styles.icon}>
            <img src={telegramIcon} alt="telegram" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterDownloads