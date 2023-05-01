import { ReactElement, useContext } from "react";
import menuIcon from "../../../assets/images/menu_icon.svg";
import sultanLogo from "../../../assets/images/sultan_logo.png";
import cartIcon from "../../../assets/images/cart_icon.svg";
import { ShoppingCartContext } from "../../../context/ShoppingCartContext";
import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";

interface HeaderLogoProps {
  handleClick: () => void;
}

const HeaderLogo = ({ handleClick }: HeaderLogoProps): ReactElement => {
  const { productsInCart, isSmallScreen } = useContext(ShoppingCartContext);

  return (
    <div className={styles.container}>
      {isSmallScreen && (
        <div className={styles.menu__btn}>
          <img src={menuIcon} alt="menu_icon" />
        </div>
      )}
      <Link to="/">
        <img className={styles.logo} src={sultanLogo} alt="sultan_logo" />
      </Link>
      {isSmallScreen && (
        <div className={styles.cart} onClick={handleClick}>
          <div className={styles.icon}>
            <img src={cartIcon} alt="cart-icon" />
            {productsInCart > 0 ? (
              <div className={styles.count}>{productsInCart}</div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderLogo