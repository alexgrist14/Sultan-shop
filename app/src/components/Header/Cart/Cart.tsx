import { ReactElement, useContext } from "react";
import cartIcon from "../../../assets/images/cart_icon.svg";
import { ShoppingCartContext } from "../../../context/ShoppingCartContext";
import styles from "./Cart.module.scss";

interface HeaderCartProps {
  handleClick: () => void;
}

const HeaderCart = ({ handleClick }: HeaderCartProps): ReactElement => {
  const { productsInCart, totalCost } = useContext(ShoppingCartContext);

  return (
    <div
      className={styles.container}
      data-testid="cart-link"
      onClick={handleClick}
    >
      <div className={styles.icon}>
        <img src={cartIcon} alt="cart-icon" />
        {productsInCart > 0 ? (
          <div data-testid="cart-products" className={styles.count}>
            {productsInCart}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.total}>
        <h4>Корзина </h4>
        <span className={styles.cost}>{totalCost} ₸</span>
      </div>
    </div>
  );
};

export default HeaderCart