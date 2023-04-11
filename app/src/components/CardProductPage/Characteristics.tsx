import {Dispatch, ReactElement, SetStateAction} from "react";
import polygonIcon from "../../assets/images/polygon.svg";
import {CheckoutProduct} from "../../types/IProduct";


interface ProductCardCharacteristicsProps{
    isCharacteristicsOpen:boolean,
    setIsCharacteristicsOpen: Dispatch<SetStateAction<boolean>>,
    productCard: CheckoutProduct | undefined,
}

const ProductCardCharacteristics = ({isCharacteristicsOpen,setIsCharacteristicsOpen,productCard}:ProductCardCharacteristicsProps): ReactElement =>{
    return (
        <div className='characteristics'>
            <h3 className={`characteristics-title ${!isCharacteristicsOpen ? 'rotate-img' : ''}`}
                onClick={() => setIsCharacteristicsOpen(prevState => !prevState)}>Характеристики <img
                src={polygonIcon} alt=""/></h3>
            <div className={`characteristics-content ${isCharacteristicsOpen ? 'open' : 'close'}`}>
                <div>Назначение: <span>{productCard?.name}</span></div>
                <div>Тип: <span>{productCard?.name}</span></div>
                <div>Производитель: <span>{productCard?.producer}</span></div>
                <div>Бренд: <span>{productCard?.brand}</span></div>
                <div>Артикул: <span>{productCard?.barcode}</span></div>
                <div>Штрихкод: <span>{productCard?.barcode}</span></div>
                <div>Вес: <span>{productCard?.size} {productCard?.weightType}</span></div>
                <div>Объем: <span>{productCard?.size} {productCard?.weightType}</span></div>
                <div>Кол-во в коробке: <span>{productCard?.size} {productCard?.weightType}</span></div>
            </div>
        </div>
    )
}

export default ProductCardCharacteristics