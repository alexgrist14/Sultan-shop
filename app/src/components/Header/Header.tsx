import { ReactElement, useContext, useEffect } from "react";
import priceIcon from "../../assets/images/download_icon.svg";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "./Menu/Menu";
import HeaderCart from "./Cart/Cart";
import HeaderLogo from "./Logo/Logo";
import HeaderActions from "./Actions/Actions";
import HeaderCallback from "./Callback/Callback";
import { getLocalStorageItem } from "../../Utils/localStorageUtils";
import styles from "./Header.module.scss";

const Header = (): ReactElement => {
  const {
    productsInCart,
    setProductsInCart,
    productsToBuy,
    setTotalCost,
    setProductsToBuy,
    isSmallScreen,
    setIsSmallScreen,
  } = useContext(ShoppingCartContext);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("cartCount")) {
      setProductsInCart(0);
    } else {
      handleShoppingCart();
    }
  }, []);

  const handleShoppingCart = (): void => {
    const count = localStorage.getItem("cartCount");
    if (count) {
      setProductsToBuy(getLocalStorageItem("productsToBuy"));
      setTotalCost(
        productsToBuy.reduce((total, product) => {
          const price = parseFloat(product.price);
          const amount = product.amount;
          return +(total + price * amount).toFixed(2);
        }, 0)
      );
      setProductsInCart(JSON.parse(count));
    }
  };

  useEffect(() => {
    if (productsToBuy.length > 0) {
      setTotalCost(
        productsToBuy.reduce((total, product) => {
          const price = parseFloat(product.price);
          const amount = product.amount;
          return +(total + price * amount).toFixed(2);
        }, 0)
      );
    } else setTotalCost(0);
  }, [productsInCart, productsToBuy]);

  const handleRedirectToCart = (): void => {
    navigate("/shopping-cart");
  };

  return (
    <header className={styles.header}>
      <HeaderMenu />
      <div className={styles.actions}>
        <div className={styles.actions__container}>
          <HeaderLogo handleClick={handleRedirectToCart} />
          <HeaderActions />
          <div className={styles.second__actions}>
            <HeaderCallback />
            <div className={styles.border}></div>
            <div className={styles.price__btn}>
              <div className={styles.title}>Прайс-лист</div>
              <div className={styles.btn}>
                <img src={priceIcon} alt="price_icon" />
              </div>
            </div>
            <div className={styles.border}></div>
            {!isSmallScreen && (
              <HeaderCart handleClick={handleRedirectToCart} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
