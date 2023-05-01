import { ReactElement } from "react";
import styles from "./Navigation.module.scss";

const FooterNavigation = (): ReactElement => {
  return (
    <>
      <div className={styles.menu}>
        <h3 className={styles.menu__title}>Меню сайта:</h3>
        <ul className={styles.menu__list}>
          <li>О компании</li>
          <li>Доставка и оплата</li>
          <li>Возврат</li>
          <li>Контакты</li>
        </ul>
      </div>
      <div className={styles.categories}>
        <h3 className={styles.categories__title}>Категории:</h3>
        <ul className={styles.categories__list}>
          <li>Бытовая химия</li>
          <li>Косметика и гигиена</li>
          <li>Товары для дома</li>
          <li>Товары для детей и мам</li>
          <li>Посуда</li>
        </ul>
      </div>
    </>
  );
};

export default FooterNavigation;
