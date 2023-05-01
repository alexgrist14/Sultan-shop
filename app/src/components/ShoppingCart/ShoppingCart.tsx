import { ReactElement, useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import OrderMessage from "../OrderMessage";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import BreadCrumbMobile from "../Breadcrumbs/BreadCrumbMobile";
import ShoppingCartItemsList from "./ItemsList/ItemsList";
import styles from "./ShoppingCart.module.scss";

const ShoppingCart = (): ReactElement => {
  const { productsInCart, productsToBuy, setProductsToBuy, isSmallScreen } =
    useContext(ShoppingCartContext);

  const [showOrderMessage, setShowOrderMessage] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("productsToBuy");
    if (storedData) {
      setProductsToBuy(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (productsToBuy.length !== 0) {
      localStorage.setItem("productsToBuy", JSON.stringify(productsToBuy));
      localStorage.setItem("cartCount", productsInCart.toString());
    }
  }, [productsInCart, productsToBuy]);

  const handleCloseMessage = (): void => {
    setShowOrderMessage(false);
  };

  return (
    <div data-testid="cart-main" className={styles.container}>
      <OrderMessage
        showOrderMessage={showOrderMessage}
        onClose={handleCloseMessage}
      />
      <div className={styles.content}>
        {isSmallScreen ? (
          <BreadCrumbMobile />
        ) : (
          <Breadcrumbs items={[{ path: "", title: "Корзина" }]} />
        )}
        <h2 className={styles.title}>Корзина</h2>
        <ShoppingCartItemsList setShowOrderMessage={setShowOrderMessage} />
      </div>
    </div>
  );
};

export default ShoppingCart