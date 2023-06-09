import {ReactElement, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import productsData from "../../data/products.json";
import {getProductByBarCode, ShoppingCartContext} from "../../context/ShoppingCartContext";
import {CheckoutProduct} from "../../types/IProduct";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import BreadCrumbMobile from "../Breadcrumbs/BreadCrumbMobile";
import ProductCardCharacteristics from "./Characteristics";
import ProductCardPageInfo from "./Info";
import ProductCardInfoPurchase from "./InfoPurchase";
import ProductCardWeight from "./Weight";
import {getLocalStorageItem, setLocalStorageItem} from "../../Utils/localStorageUtils";

const CardProductPage = (): ReactElement => {
    const {productsInCart, productsToBuy, setProductsToBuy, isSmallScreen,} = useContext(ShoppingCartContext);
    const [isDescrOpen, setIsDescrOpen] = useState(true);
    const [isCharacteristicsOpen, setIsCharacteristicsOpen] = useState(true);
    const [productCard, setProductCard] = useState<CheckoutProduct>();
    const {barcode} = useParams();

    useEffect(() => {
        if (!localStorage.getItem('products')) {
            setProductCard(getProductByBarCode(productsData.products, barcode) as CheckoutProduct);
        } else {
            setProductCard(getProductByBarCode(getLocalStorageItem('products') as CheckoutProduct[], barcode) as CheckoutProduct);
        }
    }, [])

    useEffect(() => {
        setProductsToBuy(getLocalStorageItem('productsToBuy') as CheckoutProduct[])
    }, []);

    useEffect(() => {
        if (isSmallScreen) {
            setIsDescrOpen(false);
            setIsCharacteristicsOpen(false);
        } else {
            setIsDescrOpen(true);
            setIsCharacteristicsOpen(true);
        }
    }, [isSmallScreen])

    useEffect(() => {
        if (productsToBuy.length !== 0) {
            setLocalStorageItem('productsToBuy',productsToBuy);
            setLocalStorageItem('cartCount',productsInCart);
        }
    }, [productsToBuy, productsInCart]);

    return (
        <div data-testid='card-page' className='product-card__container'>
            <div className='product-card__wrapper'>
                {
                    isSmallScreen ?
                        <BreadCrumbMobile/>
                        :
                        <Breadcrumbs items={[{path: '/', title: "Каталог"}, {
                            path: '',
                            title: `${productCard?.name} ${productCard?.description}`
                        }]}/>
                }
                <div className='product-card__content'>
                    <div className='product-card__img'>
                        <img className='img' src={productCard?.url} alt="product_image"/>
                    </div>
                    <div className='product-card__info'>
                        <h4 className='product-card__info-stock'>В наличии</h4>
                        <h2 className='product-card__info-name'>
                            <span>{productCard?.name}</span> {productCard?.description}</h2>
                        {
                            !isSmallScreen && <ProductCardWeight productCard={productCard}/>
                        }
                        <ProductCardInfoPurchase productCard={productCard}/>
                        <div className='product-card__info-features'>
                            <ProductCardPageInfo productCard={productCard} setIsDescrOpen={setIsDescrOpen}
                                                 isDescrOpen={isDescrOpen}/>
                            <div className='dashed-border'></div>
                            <ProductCardCharacteristics isCharacteristicsOpen={isCharacteristicsOpen}
                                                        setIsCharacteristicsOpen={setIsCharacteristicsOpen}
                                                        productCard={productCard}/>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={1000}/>
        </div>
    )
}

export default CardProductPage