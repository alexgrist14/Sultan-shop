import {ReactElement} from "react";
import weightIcon from '../assets/images/weight_icon.svg';
import volumeIcon from '../assets/images/volume_icon.svg';
import cartIcon from '../assets/images/cart_white_icon.svg';
import IProduct from "../types/IProduct";
import {useNavigate} from 'react-router-dom'
interface IProducts{
    product:IProduct
}

const Product = ({product}:IProducts):ReactElement =>{
    const navigate = useNavigate();
    const handleClick =()=>{
        navigate(`/product-card/${product.barcode}`)
    }
    return (
        <div className='product'>
            <div className='product-image'><img src={product.url} alt="product_image"/></div>
            <div className='product-weight'>
                <div className='type-img'><img src={product.weightType === 'г' ? weightIcon : volumeIcon} alt="volume_icon"/></div>
                <span className='weight'>{product.size}</span>
                <span className='type'> {product.weightType}</span>
            </div>
            <div className='product-name' onClick={handleClick}>
                <p><span className='name'>{product.name} </span>{product.description}</p>
            </div>
            <div className='product-details'>
                <div className='product-details__barcode'>Штрихкод: <span className='barcode'>{product.barcode}</span></div>
                <div className='product-details__producer'>Производитель: <span className='producer'>{product.producer}</span></div>
                <div className='product-details__brand'>Бренд: <span className='brand'>{product.brand}</span></div>
            </div>
            <div className='product-acquire'>
                <div className='product-price'>{product.price} ₸</div>
                <button className='product-cart__btn'>
                    <div className='btn-text'>В корзину</div>
                    <div className='btn-img'><img src={cartIcon} alt="cart_icon"/></div>
                </button>
            </div>
        </div>
    );
}

export default Product