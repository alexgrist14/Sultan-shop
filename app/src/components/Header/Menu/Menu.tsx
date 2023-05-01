import locationIcon from "../../../assets/images/location_icon.svg";
import mailIcon from "../../../assets/images/mail_icon.svg";
import {ReactElement} from "react";
import styles from "./Menu.module.scss";

const HeaderMenu = (): ReactElement =>{
    return (
        <div className={styles.container}>
            <div className={styles.details}>
                <div className={styles.details_location}>
                    <div className={styles.image}><img src={locationIcon} alt="location_icon"/></div>
                    <div className={styles.location_address}>
                        г. Кокчетав, ул. Ж. Ташенова 129Б
                        <span>(Рынок Восточный)</span>
                    </div>
                </div>
                <div className={styles.border}></div>
                <div className={styles.mail}>
                    <div className={styles.image}><img src={mailIcon} alt="mail_icon"/></div>
                    <div className={styles.mail_address}>
                        opt.sultan@mail.ru
                        <span>На связи в любое время</span>
                    </div>
                </div>
            </div>
            <nav className={styles.navigation}>
                <ul className={styles.list}>
                    <li className={styles.item}>О компании</li>
                    <div className={styles.dashed_border}></div>
                    <li className={styles.item}>Доставка и оплата</li>
                    <div className={styles.dashed_border}></div>
                    <li className={styles.item}>Возврат</li>
                    <div className={styles.dashed_border}></div>
                    <li className={styles.item}>Контакты</li>
                </ul>
            </nav>
        </div>
    )
}

export default HeaderMenu