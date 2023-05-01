import { Dispatch, ReactElement, SetStateAction, useContext } from "react";
import ShoppingCartItem from "../Item/Item";
import { ShoppingCartContext } from "../../../context/ShoppingCartContext";
import { setLocalStorageItem } from "../../../Utils/localStorageUtils";
import styles from "./ItemsList.module.scss";

interface ShoppingCartItemsListProps {
  setShowOrderMessage: Dispatch<SetStateAction<boolean>>;
}

const ShoppingCartItemsList = ({
  setShowOrderMessage,
}: ShoppingCartItemsListProps): ReactElement => {
  const { setProductsInCart, productsToBuy, setProductsToBuy, totalCost } =
    useContext(ShoppingCartContext);

  const handleOpenOrderMessage = (): void => {
    setProductsInCart(0);
    setProductsToBuy([]);
    setLocalStorageItem("productsToBuy", []);
    setLocalStorageItem("cartCount", 0);
    setShowOrderMessage(true);
  };

  return (
    <div className={styles.products}>
      {productsToBuy.length > 0 ? (
        productsToBuy.map((item, index) => {
          return <ShoppingCartItem key={index} item={item} />;
        })
      ) : (
        <div>Корзина пуста. Перейдите в каталог чтобы выбрать товары.</div>
      )}
      {productsToBuy.length > 0 && (
        <div className={styles.ordering}>
          <div className={styles.btn} onClick={handleOpenOrderMessage}>
            Оформить заказ
          </div>
          <div className={styles.total}>{totalCost} ₸</div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartItemsList;
