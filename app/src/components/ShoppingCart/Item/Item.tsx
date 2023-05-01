import { ReactElement, useContext } from "react";
import weightIcon from "../../../assets/images/weight_icon.svg";
import volumeIcon from "../../../assets/images/volume_icon.svg";
import deleteIcon from "../../../assets/images/delete_icon.svg";
import { ShoppingCartContext } from "../../../context/ShoppingCartContext";
import { CheckoutProduct } from "../../../types/IProduct";
import { setLocalStorageItem } from "../../../Utils/localStorageUtils";
import styles from "./Item.module.scss";

interface ShoppingCartItemProps {
  item: CheckoutProduct;
}

const ShoppingCartItem = ({ item }: ShoppingCartItemProps): ReactElement => {
  const { setProductsInCart, productsToBuy, setProductsToBuy } =
    useContext(ShoppingCartContext);

  const handleDecrement = (product: CheckoutProduct): void => {
    setProductsToBuy(
      productsToBuy.map((item) => {
        if (product.barcode === item.barcode && item.amount > 1) {
          return { ...item, amount: item.amount - 1 };
        } else return item;
      })
    );
    setProductsInCart((prevState) => {
      return prevState > 1 ? prevState - 1 : prevState;
    });
  };

  const handleIncrement = (product: CheckoutProduct): void => {
    setProductsToBuy(
      productsToBuy.map((item) => {
        if (product.barcode === item.barcode) {
          return { ...item, amount: item.amount + 1 };
        } else return item;
      })
    );
    setProductsInCart((prevState) => prevState + 1);
  };

  const handleDeleteProduct = (product: CheckoutProduct): void => {
    setProductsToBuy((prevState) => {
      setLocalStorageItem(
        "productsToBuy",
        prevState.filter((item) => item !== product)
      );
      return prevState.filter((item) => item !== product);
    });
    setProductsInCart((prevState) => {
      setLocalStorageItem("cartCount", prevState - product.amount);
      return prevState - product.amount;
    });
  };

  return (
    <div>
      <div className={styles.border}></div>
      <div className={styles.item}>
        <div className={styles.img}>
          <div>
            <img src={item.url} alt="product_image" />
          </div>
        </div>
        <div className={styles.description}>
          <div className={styles.description__weight}>
            <div className={styles.description__weight_img}>
              <img
                src={item.weightType === "г" ? weightIcon : volumeIcon}
                alt="weight_icon"
              />
            </div>
            <div className="product-description__weight-size">{item.size}</div>
            <div className="product-description__weight-type">
              {item.weightType}
            </div>
          </div>
          <div className={styles.description__name}>
            {item.name} {item.description}
          </div>
          <p className={styles.description__text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis
            vulputate feugiat massa vestibulum duis.
          </p>
        </div>
        <div className={styles.count}>
          <div
            className={styles.count__decrement}
            onClick={() => {
              handleDecrement(item);
            }}
          >
            -
          </div>
          <div className={styles.count__quantity}>{item.amount}</div>
          <div
            className={styles.count__increment}
            onClick={() => {
              handleIncrement(item);
            }}
          >
            +
          </div>
        </div>
        <div className={styles.total}>
          {(+item.price * item.amount).toFixed(2)}
          <span> ₸</span>
        </div>
        <div className={styles.dashed__border}></div>
        <button
          className={styles.delete__btn}
          onClick={() => handleDeleteProduct(item)}
        >
          <img src={deleteIcon} alt="delete_icon" />
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
