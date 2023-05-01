import {Dispatch, ReactElement, SetStateAction} from "react";
import {IProduct} from "../../types/IProduct";
import {setLocalStorageItem} from "../../Utils/localStorageUtils";

interface ItemRightFieldsProps {
    item: IProduct,
    handleInputChange: (index: number, field: keyof IProduct, value: string) => void,
    index: number,
    products: IProduct[],
    setProducts: Dispatch<SetStateAction<IProduct[]>>,
}

const ItemRightFields = ({
                             item,
                             handleInputChange,
                             index,
                             products,
                             setProducts
                         }: ItemRightFieldsProps): ReactElement => {

    const handlePriceChange = (index: number, field: keyof IProduct, value: string) => {
        const updatedProducts: IProduct[] = [...products];
        const reg = /^-?\d*(\.\d*)?$/;

        if ((!isNaN(Number(value)) && reg.test(value)) || value === '' || value === '-') {
            updatedProducts[index][field] = value as string & string[];
            setProducts(updatedProducts);
            setLocalStorageItem('products', updatedProducts)
        }
    }

    return (
        <div className='admin-panel__item-fields__right'>
            <label>
                <h3>Штрихкод:</h3>
                <input type='text' name={item.barcode} value={item.barcode} onChange={(e) => {
                    handleInputChange(index, 'barcode', e.target.value)
                }}></input>
            </label>
            <label>
                <h3>Производитель:</h3>
                <input type='text' name={item.barcode} value={item.producer} onChange={(e) => {
                    handleInputChange(index, 'producer', e.target.value)
                }}></input>
            </label>
            <label>
                <h3>Бренд:</h3>
                <input type='text' name={item.brand} value={item.brand} onChange={(e) => {
                    handleInputChange(index, 'brand', e.target.value)
                }}></input>
            </label>
            <label>
                <h3>Описание:</h3>
                <input type='text' name={item.barcode} value={item.description} onChange={(e) => {
                    handleInputChange(index, 'description', e.target.value)
                }}></input>
            </label>
            <label>
                <h3>Цена:</h3>
                <input type='text' inputMode="numeric" name={item.barcode} value={item.price}
                       onChange={(e) => {
                           handlePriceChange(index, 'price', e.target.value)
                       }}></input>
            </label>
        </div>
    )
}

export default ItemRightFields