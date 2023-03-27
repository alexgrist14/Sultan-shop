import {ReactElement, useState} from "react";
import {useParams} from "react-router-dom";
import IProduct from "../types/IProduct";
import productsData from "../data/products.json";
import weightIcon from "../assets/images/weight_icon.svg";
import volumeIcon from "../assets/images/volume_icon.svg";
import cartIcon from "../assets/images/cart_white_icon.svg";
import shareIcon from "../assets/images/share_icon.svg";
import downloadIcon from "../assets/images/black_download.svg";
import polygonIcon from "../assets/images/polygon.svg";

const CardProductPage = ():ReactElement =>{
    const [countProducts, setCountProducts] = useState('1');
    const {barcode} = useParams();

    const getProductByBarCode= (barcode:string | undefined):IProduct | undefined =>{
        return productsData.products.find((product: IProduct) => product.barcode === barcode);
    }
    const product: IProduct | undefined = getProductByBarCode(barcode);

    return (
        <div className='product-card__container'>
            <div className='product-card__wrapper'>
            <ul className='breadcrumbs'>
                <li><a href="/">Главная</a></li>
                <div className='dashed-border'></div>
                <li><a href="/" onClick={(e)=>{e.preventDefault(); window.location.href= '/'}}>Каталог</a></li>
                <div className='dashed-border'></div>
                <li className='product-name__link'><div>{product?.name} {product?.description}</div></li>
            </ul>
            <div className='product-card__content'>
                <div className='product-card__img'>
                    <img className='img' src={product?.url} alt="product_image"/>
                </div>
                <div className='product-card__info'>
                    <h4 className='product-card__info-stock'>В наличии</h4>
                    <h2 className='product-card__info-name'><span>{product?.name}</span> {product?.description}</h2>
                    <div className='product-card__info-weight'>
                        <div className='type-img'>
                            <img src={product?.weightType === 'г' ? weightIcon : volumeIcon} alt="volume_icon"/>
                        </div>
                        <div className='weight'>{product?.size}</div>
                        <div className='type'> {product?.weightType}</div>
                    </div>
                    <div className='product-card__info-purchase'>
                        <div className='price'>{product?.price} ₸</div>
                        <div className='count-products'>
                            <button className='less'>-</button>
                            <div className='count'>{countProducts}</div>
                            <button className='more'>+</button>
                        </div>
                        <button className='to-cart__btn'>
                            <div>В корзину</div>
                            <div><img src={cartIcon} alt=""/></div>
                        </button>
                    </div>
                    <div className='product-card__info-additional__btn'>
                        <div className='links'><img src={shareIcon} alt="share_icon"/></div>
                        <div className='ad'><div>При покупке от <span>10 000 ₸</span> бесплатная <br/> доставка по Кокчетаву и области</div></div>
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
                            <h3 className='description-title'>Описание <img src={polygonIcon} alt=""/></h3>
                            <p className='description-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis.
                                Quis mattis vulputate feugiat massa vestibulum duis. Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis.
                                Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.
                            </p>
                        </div>
                        <div className='dashed-border'></div>
                        <div className='characteristics'>
                            <h3 className='characteristics-title'>Характеристики <img src={polygonIcon} alt=""/></h3>
                            <div className='characteristics-content'>
                                <div>Назначение: <span>{product?.name}</span></div>
                                <div>Тип: <span>{product?.name}</span></div>
                                <div>Производитель: <span>{product?.producer}</span></div>
                                <div>Бренд: <span>{product?.brand}</span></div>
                                <div>Артикул: <span>{product?.barcode}</span></div>
                                <div>Штрихкод: <span>{product?.barcode}</span></div>
                                <div>Вес: <span>{product?.size}  {product?.weightType}</span></div>
                                <div>Объем: <span>{product?.size} {product?.weightType}</span></div>
                                <div>Кол-во в коробке: <span>{product?.size} {product?.weightType}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default CardProductPage