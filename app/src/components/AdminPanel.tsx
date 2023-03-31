import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import IProduct from "../types/IProduct";
import productsData from "../data/products.json";
import {Link} from "react-router-dom";
import deleteIcon from '../assets/images/delete_icon.svg';
import {filterTypes} from "../types/globalTypes";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AdminPanelProps {
    isOpen: boolean;
    onToggle: () => void;
}

const AdminPanel = ({isOpen, onToggle}: AdminPanelProps): ReactElement => {
    const [products, setProducts] = useState<IProduct[]>(JSON.parse(localStorage.getItem('products') || '[]'));
    const notifyDelete = () => toast("Товар удалён.", {hideProgressBar: true});

    useEffect(() => {
        if (!isOpen)
            onToggle();
        return () => onToggle();
    }, [isOpen])

    useEffect(() => {
        window.addEventListener('storage', (event) => {
            if (event.key === 'products') {
                if (!event.newValue) {
                    toast('Localstorage пуст. Данные загружены из JSON', {hideProgressBar: true})
                    setProducts(productsData.products);
                }
            }
        });
        if (products.length === 0) {
            setProducts(productsData.products);
            localStorage.setItem('products', JSON.stringify(productsData.products));
        }
    }, [products])

    const handleInputChange = (index: number, field: keyof IProduct, value: string) => {
        const updatedProducts: IProduct[] = [...products];
        updatedProducts[index][field] = value as any;
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    }

    const handlePriceChange = (index: number, field: keyof IProduct, value: string) => {
        const updatedProducts: IProduct[] = [...products];
        const reg = /^-?\d*(\.\d*)?$/;
        if ((!isNaN(Number(value)) && reg.test(value)) || value === '' || value === '-') {
            updatedProducts[index][field] = value as any;
            setProducts(updatedProducts);
            localStorage.setItem('products', JSON.stringify(updatedProducts));
        }
    }

    const handleCategoryChange = (index: number, field: keyof IProduct, event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        const updatedProducts: any = [...products];
        if (updatedProducts[index][field].includes(value) && updatedProducts[index][field].length === 1)
            return;
        else if (updatedProducts[index][field].includes(value)) {
            updatedProducts[index][field].splice(updatedProducts[index][field].indexOf(value), 1)
        } else {
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
            <Link className='add-item' to="/add-item">Добавить товар</Link>
            <table className='admin-panel__table'>
                <thead>
                <tr>
                    <th>Url</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Barcode</th>
                    <th>Producer</th>
                    <th>Brand</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                {
                    products.length && products.map((item, index) => {
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
                                    <select value={item.weightType} onChange={(e) => {
                                        handleInputChange(index, 'weightType', e.target.value)
                                    }} required={true}>
                                        <option value="г">г</option>
                                        <option value="мл">мл</option>
                                    </select>
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
                                    <input type='text' inputMode="numeric" name={item.barcode} value={item.price}
                                           onChange={(e) => {
                                               handlePriceChange(index, 'price', e.target.value)
                                           }}></input>
                                </td>
                                <td className='category'>
                                    <textarea readOnly={true} value={item.category}
                                              placeholder='Выберите из списка категорию чтобы её добавить, выберите её ещё раз чтобы убрать (поле не может быть пустым)'
                                              required={true}/>
                                    <select name='category' onChange={(e) => {
                                        handleCategoryChange(index, 'category', e)
                                    }}>
                                        <option value="">Выберите тип ухода</option>
                                        {filterTypes.map(filterType => (
                                            <option key={filterType} value={filterType}>
                                                {filterType}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className='delete-btn' onClick={() => {
                                    handleDelete(item);
                                    notifyDelete();
                                }}><img src={deleteIcon} alt="delete_icon"/></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <ToastContainer position="top-center" autoClose={100}/>
        </div>
    )
}

export default AdminPanel