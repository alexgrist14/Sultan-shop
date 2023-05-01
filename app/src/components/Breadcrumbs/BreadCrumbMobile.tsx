import {ReactElement} from "react";
import arrowIcon from "../../assets/images/arrow_mobile.svg";
import {Link} from "react-router-dom";
import styles from "./BreadCrumbMobile.module.scss";

const BreadCrumbMobile = (): ReactElement =>{
    return (
        <Link to="/" className={styles.content}>
            <div className={styles.btn}>
                <img src={arrowIcon} alt="arrow_icon"/>
            </div>
            <span>Назад</span>
        </Link>
    )
}

export default BreadCrumbMobile