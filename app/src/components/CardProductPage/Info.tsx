import {Dispatch, ReactElement, SetStateAction} from "react";
import polygonIcon from "../../assets/images/polygon.svg";
import {CheckoutProduct} from "../../context/ShoppingCartContext";

interface ProductCardPageInfoProps{
    productCard: CheckoutProduct | undefined,
    isDescrOpen: boolean,
    setIsDescrOpen: Dispatch<SetStateAction<boolean>>,
}

const ProductCardPageInfo = ({productCard,isDescrOpen,setIsDescrOpen}:ProductCardPageInfoProps): ReactElement =>{
    return (
        <>
            <div className='part-info'>
                <div className='producer'>Производитель: <span>{productCard?.producer}</span></div>
                <div className='producer'>Бренд: <span>{productCard?.brand}</span></div>
                <div className='producer'>Артикул: <span>{productCard?.barcode}</span></div>
                <div className='producer'>Штрихкод: <span>{productCard?.barcode}</span></div>
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
        </>
    )
}

export default ProductCardPageInfo