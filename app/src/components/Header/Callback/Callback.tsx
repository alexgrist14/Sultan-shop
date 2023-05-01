import { ReactElement } from "react";
import consultant from "../../../assets/images/Consultant_picture.png";
import styles from "./Callback.module.scss";

const HeaderCallback = (): ReactElement => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.number}>+7 (777) 490-00-91</span>
        <span className={styles.schedule}>время работы: 9:00-20:00</span>
        <span className={styles.order}>Заказать звонок</span>
      </div>
      <div className={styles.img}>
        <img src={consultant} alt="consultant" />
      </div>
    </div>
  );
};

export default HeaderCallback;