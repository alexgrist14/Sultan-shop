import { ReactElement, useContext } from "react";
import companyLogo from "../../../assets/images/sultan-logo_white.png";
import downloadIcon from "../../../assets/images/download_icon.svg";
import arrowBtn from "../../../assets/images/arrow-right.svg";
import { ShoppingCartContext } from "../../../context/ShoppingCartContext";
import styles from "./Description.module.scss";

const FooterDescription = (): ReactElement => {
  const { isSmallScreen } = useContext(ShoppingCartContext);

  return (
    <div className={styles.content__company_description}>
      <div className={styles.footer__header}>
        <div className={styles.company__logo}>
          <img src={companyLogo} alt="company_logo" />
        </div>
        {isSmallScreen && (
          <div className={styles.links__downloads_btn}>
            <div className={styles.text}>Прайс-лист</div>
            <div className={styles.img}>
              <img src={downloadIcon} alt="download_icon" />
            </div>
          </div>
        )}
      </div>
      <p>
        Компания «Султан» — снабжаем розничные магазины товарами
        {!isSmallScreen && <br />}
        "под ключ" в Кокчетаве и Акмолинской области
      </p>
      <div className={styles.sales__subscribe}>
        <h4 className={styles.sales__subscribe__title}>
          Подпишись на скидки и акции
        </h4>
        <div className={styles.mail__input}>
          <div className={styles.mail__placeholder}>Введите ваш E-mail</div>
          <div className={styles.mail__submit}>
            <img src={arrowBtn} alt="arrow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterDescription;
