import {ReactElement, useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import productsData from "../data/products.json";
import weightIcon from "../assets/images/weight_icon.svg";
import volumeIcon from "../assets/images/volume_icon.svg";
import cartIcon from "../assets/images/cart_white_icon.svg";
import shareIcon from "../assets/images/share_icon.svg";
import downloadIcon from "../assets/images/black_download.svg";
import polygonIcon from "../assets/images/polygon.svg";
import {getProductByBarCode, ShoppingCartContext} from "../context/ShoppingCartContext";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import arrowIcon from "../assets/images/arrow_mobile.svg";

const CardProductPage = (): ReactElement => {
    const [countProducts, setCountProducts] = useState(1);
    const {
        productsInCart,
        setProductsInCart,
        productsToBuy,
        setProductsToBuy,
        isSmallScreen,
        setIsSmallScreen
    } = useContext(ShoppingCartContext);
    const [isDescrOpen, setIsDescrOpen] = useState(true);
    const [isCharacteristicsOpen, setIsCharacteristicsOpen] = useState(true);

    const {barcode} = useParams();
    let product: any = [];
    if (!localStorage.getItem('products')) {
        product = getProductByBarCode(productsData.products, barcode);
    } else {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            product = getProductByBarCode(JSON.parse(storedProducts), barcode);
        }
    }

    useEffect(() => {
        const storedData = localStorage.getItem('productsToBuy')
        if (storedData) {
            setProductsToBuy(JSON.parse(storedData))
        }
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
            localStorage.setItem('productsToBuy', JSON.stringify(productsToBuy));
            localStorage.setItem('cartCount', (productsInCart).toString());
        }
    }, [productsToBuy, productsInCart]);

    const handleDecrement = (): void => {
        if (countProducts > 1)
            setCountProducts(countProducts - 1);
    }

    const handleCart = (): void => {
        if (!product) {
            return;
        }
        setProductsInCart(productsInCart + countProducts);

        if (getProductByBarCode(productsToBuy, barcode)) {
            setProductsToBuy(productsToBuy.map((item) => {
                if (item.barcode === barcode) {
                    return {...item, amount: item.amount + countProducts}
                } else return item;
            }));
        } else {
            setProductsToBuy(prevState => [...prevState, {...product, amount: countProducts}]);
        }
        toast('Товар добавлен в корзину.', {hideProgressBar: true});
    }

    return (
        <div className='product-card__container'>
            <div className='product-card__wrapper'>
                {
                    isSmallScreen ?
                        <Link to="/" className='back-content'>
                            <div className='back-btn'>
                                <img src={arrowIcon} alt="arrow_icon"/>
                            </div>
                            <span>Назад</span>
                        </Link> :
                        <ul className='breadcrumbs'>
                            <li><Link to="/">Главная</Link></li>
                            <div className='dashed-border'></div>
                            <li><Link to="/">Каталог</Link></li>
                            <div className='dashed-border'></div>
                            <li className='product-name__link'>
                                <div>{product?.name} {product?.description}</div>
                            </li>
                        </ul>
                }
                <div className='product-card__content'>
                    <div className='product-card__img'>
                        <img className='img' src={product?.url} alt="product_image"/>
                    </div>
                    <div className='product-card__info'>
                        <h4 className='product-card__info-stock'>В наличии</h4>
                        <h2 className='product-card__info-name'><span>{product?.name}</span> {product?.description}</h2>
                        {
                            !isSmallScreen &&
                            <div className='product-card__info-weight'>
                                <div className='type-img'>
                                    <img src={product?.weightType === 'г' ? weightIcon : volumeIcon} alt="volume_icon"/>
                                </div>
                                <div className='weight'>{product?.size}</div>
                                <div className='type'> {product?.weightType}</div>
                            </div>
                        }
                        <div className='product-card__info-purchase'>
                            <div className='price'>{product?.price} ₸</div>
                            <div className='count-products'>
                                <button className='less' onClick={handleDecrement}>-</button>
                                <div className='count'>{countProducts}</div>
                                <button className='more' onClick={() => {
                                    setCountProducts(countProducts + 1)
                                }}>+
                                </button>
                            </div>
                            <button className='to-cart__btn' onClick={handleCart}>
                                <div>В корзину</div>
                                <div><img src={cartIcon} alt=""/></div>
                            </button>
                            <div className='links'><img src={shareIcon} alt="share_icon"/></div>
                            <div className='ad'>
                                <div>При покупке от <span>10 000 ₸</span> бесплатная <br/> доставка по Кокчетаву и
                                    области
                                </div>
                            </div>
                            <div className='price-list'>
                                <div>Прайс-лист</div>
                                <div><img src={downloadIcon} alt="download_icon"/></div>
                            </div>
                        </div>
                        <div className='product-card__info-features'>
                            <div className='part-info'>
                                <div className='producer'>Производитель: <span>{product?.producer}</span></div>
                                <div className='producer'>Бренд: <span>{product?.brand}</span></div>
                                <div className='producer'>Артикул: <span>{product?.barcode}</span></div>
                                <div className='producer'>Штрихкод: <span>{product?.barcode}</span></div>
                            </div>
                            <div className='description'>
                                <h3 className={`description-title ${!isDescrOpen ? 'rotate-img' : ''}`}
                                    onClick={() => setIsDescrOpen(prevState => !prevState)}>Описание <img
                                    src={polygonIcon} alt=""/></h3>
                                <p className={`description-text ${isDescrOpen ? 'open' : 'close'}`}>Lorem ipsum dolor
                                    sit amet, consectetur adipiscing elit.
                                    Nullam interdum ut justo, vestibulum sagittis iaculis iaculis.
                                    Quis mattis vulputate feugiat massa vestibulum duis. Faucibus consectetur aliquet
                                    sed pellentesque consequat consectetur congue mauris venenatis.
                                    Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.
                                </p>
                            </div>
                            <div className='dashed-border'></div>
                            <div className='characteristics'>
                                <h3 className={`characteristics-title ${!isCharacteristicsOpen ? 'rotate-img' : ''}`}
                                    onClick={() => setIsCharacteristicsOpen(prevState => !prevState)}>Характеристики <img
                                    src={polygonIcon} alt=""/></h3>
                                <div className={`characteristics-content ${isCharacteristicsOpen ? 'open' : 'close'}`}>
                                    <div>Назначение: <span>{product?.name}</span></div>
                                    <div>Тип: <span>{product?.name}</span></div>
                                    <div>Производитель: <span>{product?.producer}</span></div>
                                    <div>Бренд: <span>{product?.brand}</span></div>
                                    <div>Артикул: <span>{product?.barcode}</span></div>
                                    <div>Штрихкод: <span>{product?.barcode}</span></div>
                                    <div>Вес: <span>{product?.size} {product?.weightType}</span></div>
                                    <div>Объем: <span>{product?.size} {product?.weightType}</span></div>
                                    <div>Кол-во в коробке: <span>{product?.size} {product?.weightType}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={1000}/>
        </div>
    )
}

export default CardProductPage