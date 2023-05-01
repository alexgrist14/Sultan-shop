import { ReactElement, useContext } from "react";
import darkCatalogLogo from "../../../assets/images/dark_caralog_icon.svg";
import catalogLogo from "../../../assets/images/canalog_logo.svg";
import darkSearchIcon from "../../../assets/images/dark_search_icon.svg";
import searchIcon from "../../../assets/images/search_icon.svg";
import { ShoppingCartContext } from "../../../context/ShoppingCartContext";
import styles from "./Actions.module.scss";

const HeaderActions = (): ReactElement => {
  const { isSmallScreen } = useContext(ShoppingCartContext);

  return (
    <div className={styles.container}>
      <div className={styles.catalog__btn}>
        <button>
          <span>Каталог</span>{" "}
          <img
            src={isSmallScreen ? darkCatalogLogo : catalogLogo}
            alt="catalog_logo"
          />
        </button>
      </div>
      <div className={styles.search__field}>
        <div className={styles.placeholder}>Поиск...</div>
        <div className={styles.btn}>
          <img
            src={isSmallScreen ? darkSearchIcon : searchIcon}
            alt="search_icon"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderActions;