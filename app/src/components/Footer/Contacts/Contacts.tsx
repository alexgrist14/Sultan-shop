import { ReactElement } from "react";
import visaLogo from "../../../assets/images/Visa.png";
import masterCardLogo from "../../../assets/images/mastercard.png";
import styles from "./Contacts.module.scss";

const FooterContacts = (): ReactElement => {
  return (
    <div className={styles.links__contacts}>
      <h3 className={styles.links__contacts_title}>Контакты:</h3>
      <div className={styles.links__contacts_number}>
        <span className={styles.number}>+7 (777) 490-00-91</span>
        <span className={styles.schedule}>время работы: 9:00-20:00</span>
        <span className={styles.order}>Заказать звонок</span>
      </div>
      <div className={styles.links__contacts_mail}>
        opt.sultan@mail.ru
        <span>На связи в любое время</span>
      </div>
      <div className={styles.links__contacts_payments}>
        <div className={styles.visa}>
          <img src={visaLogo} alt="visa" />
        </div>
        <div className={styles.mastercard}>
          <img src={masterCardLogo} alt="mastercard" />
        </div>
      </div>
    </div>
  );
};

export default FooterContacts;
