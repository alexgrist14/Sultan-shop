import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import IProduct from "../types/IProduct";
import productsData from "../data/products.json";
import {Link} from "react-router-dom";
import deleteIcon from '../assets/images/delete_icon.svg';
import {filterTypes} from "../types/globalTypes";

const AdminPanel = (): ReactElement => {
    const [products, setProducts] = useState<IProduct[]>(JSON.parse(localStorage.getItem('products') || '[]'));


    useEffect(()=>{
        if(products.length === 0){
            setProducts(productsData.products);
        }
    },[])

    const handleInputChange = (index: number, field: keyof IProduct, value: string) => {
        const updatedProducts:any = [...products];
        updatedProducts[index][field] = value;
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    }

    const handleCategoryChange = (index: number, field: keyof IProduct, event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        const updatedProducts:any = [...products];
        console.log(updatedProducts[index][field].length);
        if(updatedProducts[index][field].includes(value) && updatedProducts[index][field].length === 1)
            return;
        else if(updatedProducts[index][field].includes(value)){
            updatedProducts[index][field].splice(updatedProducts[index][field].indexOf(value),1)
        }
        else{
            updatedProducts[index][field].push(value);
        }
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        event.target.value = '';
    };

    const handleDelete = (item: IProduct): void => {
        setProducts(prevState => prevState.filter(product => product !== item));
        localStorage.setItem('products', JSON.stringify(products.filter(product => product !== item)));
    }

    return (
            <div className='admin-panel__container'>
                <ul className='breadcrumbs-admin'>
                    <li><Link className='link' to="/">Главная</Link></li>
                    <div className='dashed-border'></div>
                    <li className='cart-crumb'>
                        <div>Админ панель</div>
                    </li>
                </ul>
                <div className='add-item'><Link to="/add-item">Добавить товар</Link></div>
                <table className='admin-panel__table'>
                    <tr>
                        <th>Url</th>
                        <th>Name</th>
                        <th>Weight Type</th>
                        <th>Size</th>
                        <th>Barcode</th>
                        <th>Producer</th>
                        <th>Brand</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                    </tr>
                    {
                        products.length !== 0 ? products.map((item, index) => {
                            return (
                                <tr className='product-edit_card' key={index}>
                                    <td className='url'>
                                        <input type='text' name={item.barcode} value={item.url} onChange={(e) => {
                                            handleInputChange(index, 'url', e.target.value)
                                        }}></input>
                                    </td>
                                    <td className='name'>
                                        <input type='text' name={item.barcode} value={item.name} onChange={(e) => {
                                            handleInputChange(index, 'name', e.target.value)
                                        }}></input>
                                    </td>
                                    <td className='weight'>
                                        <select value={item.weightType} onChange={(e) => {handleInputChange(index, 'weightType', e.target.value)}} required={true}>
                                            <option value="г">г</option>
                                            <option value="мл">мл</option>
                                        </select>
                                        {/*<input type='text' name={item.barcode} value={item.weightType} onChange={(e) => {*/}
                                        {/*    handleInputChange(index, 'weightType', e.target.value)*/}
                                        {/*}}></input>*/}
                                    </td>
                                    <td className='size'>
                                        <input type='text' name={item.barcode} value={item.size} onChange={(e) => {
                                            handleInputChange(index, 'size', e.target.value)
                                        }}></input>
                                    </td>
                                    <td className='barcode'>
                                        <input type='text' name={item.barcode} value={item.barcode} onChange={(e) => {
                                            handleInputChange(index, 'barcode', e.target.value)
                                        }}></input>
                                    </td>
                                    <td className='producer'>
                                        <input type='text' name={item.barcode} value={item.producer} onChange={(e) => {
                                            handleInputChange(index, 'producer', e.target.value)
                                        }}></input>
                                    </td>
                                    <td className='brand'>
                                        <input type='text' name={item.brand} value={item.brand} onChange={(e) => {
                                            handleInputChange(index, 'brand', e.target.value)
                                        }}></input>
                                    </td>
                                    <td className='description'>
                                        <input type='text' name={item.barcode} value={item.description} onChange={(e) => {
                                            handleInputChange(index, 'description', e.target.value)
                                        }}></input>
                                    </td>
                                    <td className='price'>
                                        <input type='text' name={item.barcode} value={item.price} onChange={(e) => {
                                            handleInputChange(index, 'price', e.target.value)
                                        }}></input>
                                    </td>
                                    <td className='category'>
                                        <textarea value={item.category} placeholder='Выберите из списка категорию чтобы её добавить, выберите её ещё раз чтобы убрать (поле не может быть пустым)' required={true}/>
                                        <select  name='category' onChange={(e) => {handleCategoryChange(index, 'category', e)}}>
                                            <option value="">Выберите тип ухода</option>
                                            {filterTypes.map(filterType =>(
                                                <option key = {filterType} value={filterType}>
                                                    {filterType}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className='delete-btn' onClick={() => {
                                        handleDelete(item)
                                    }}><img src={deleteIcon} alt="delete_icon"/></td>
                                </tr>

                            )
                        }) : ''
                    }
                </table>
            </div>
    )
}

export default AdminPanel