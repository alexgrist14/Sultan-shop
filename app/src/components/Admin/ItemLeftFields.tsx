import {ReactElement} from "react";
import {IProduct} from "../../types/IProduct";

interface ItemLeftFieldsProps {
    item: IProduct,
    handleInputChange: (index: number, field: keyof IProduct, value: string) => void,
    index: number
}

const ItemLeftFields = ({item, handleInputChange, index}: ItemLeftFieldsProps): ReactElement => {
    return (
        <div className='admin-panel__item-fields__left'>
            <label>
                <h3>Url изображения:</h3>
                <input type='text' name={item.barcode} value={item.url} onChange={(e) => {
                    handleInputChange(index, 'url', e.target.value)
                }}></input>
            </label>
            <label>
                <h3>Название:</h3>
                <input type='text' name={item.barcode} value={item.name} onChange={(e) => {
                    handleInputChange(index, 'name', e.target.value)
                }}></input>
            </label>
            <label>
                <h3>Тип размера:</h3>
                <select value={item.weightType} onChange={(e) => {
                    handleInputChange(index, 'weightType', e.target.value)
                }} required={true}>
                    <option value="г">г</option>
                    <option value="мл">мл</option>
                </select>
            </label>
            <label>
                <h3>Размер:</h3>
                <input type='text' name={item.barcode} value={item.size} onChange={(e) => {
                    handleInputChange(index, 'size', e.target.value)
                }}></input>
            </label>
        </div>
    )
}

export default ItemLeftFields