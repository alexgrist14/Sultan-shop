import {ReactElement} from "react";
import weightIcon from "../../assets/images/weight_icon.svg";
import volumeIcon from "../../assets/images/volume_icon.svg";
import {CheckoutProduct} from "../../types/IProduct";

interface ProductCardWeightProps{
    productCard: CheckoutProduct | undefined
}

const ProductCardWeight = ({productCard}:ProductCardWeightProps):ReactElement =>{
    return (
        <div className='product-card__info-weight'>
            <div className='type-img'>
                <img src={productCard?.weightType === 'г' ? weightIcon : volumeIcon} alt="volume_icon"/>
            </div>
            <div className='weight'>{productCard?.size}</div>
            <div className='type'> {productCard?.weightType}</div>
        </div>
    )
}

export default ProductCardWeight