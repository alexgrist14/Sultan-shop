import {ChangeEvent, FormEvent, ReactElement, useEffect, useRef, useState} from "react";
import IProduct from "../types/IProduct";
import {filterTypes} from "../types/globalTypes";
import {Link} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddItemForm = (): ReactElement => {
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [selectedWeight, setSelectedWeight] = useState('г');
    const [products, setProducts] = useState<IProduct[]>(JSON.parse(localStorage.getItem('products') || '[]'));
    const [priceValue, setPriceValue] = useState('');
    const [product, setProduct] = useState<IProduct>({
        url: '',
        name: '',
        weightType: '',
        size: '',
        barcode: '',
        brand: '',
        description: '',
        producer: '',
        price: '',
        category: selectedCategory,
    });
    const formRef = useRef<HTMLFormElement>(null);
    const notifyDefault = () => toast("Товар успешно добавлен.", {hideProgressBar: true});
    const parser = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        const reg = /^-?\d*(\.\d*)?$/;

        if ((!isNaN(Number(value)) && reg.test(value)) || value === '' || value === '-') {
            setPriceValue(value);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value,
            ['category']: selectedCategory,
        }));
    };

    const handleWeightTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const weightType = event.target.value;
        setSelectedWeight(weightType);
    }

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const category = event.target.value;
        setSelectedCategory(selectedCategory => {
            if (!selectedCategory.includes(category))
                return selectedCategory.concat(category)
            return selectedCategory.filter(item => category !== item)
        });
    };

    useEffect(() => {
        setProduct(prevState => ({
            ...prevState,
            ['weightType']: selectedWeight,
            ['category']: selectedCategory,
        }));
    }, [selectedWeight, selectedCategory]);

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        localStorage.setItem('products', JSON.stringify([...products, product]));
        formRef.current?.reset();
        setPriceValue('');
        setSelectedCategory([]);
    }

    return (
        <div className='add-item__container'>
            <ul className='breadcrumbs-admin'>
                <li><Link className='link' to="/">Главная</Link></li>
                <div className='dashed-border'></div>
                <li><Link className='link' to="/admin-panel">Админ панель</Link></li>
                <div className='dashed-border'></div>
                <li className='cart-crumb'>
                    <div>Добавить товар</div>
                </li>
            </ul>
            <form className='add-form' ref={formRef} onSubmit={(e) => {
                handleFormSubmit(e);
                notifyDefault();
            }}>
                <table className='admin-panel__table'>
                    <thead>
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
                    </thead>
                    <tbody>
                    <tr className='product-edit_card'>
                        <td className='url'>
                            <input name='url' onChange={handleInputChange} type='text' required={true}/>
                        </td>
                        <td className='name'>
                            <input name='name' onChange={handleInputChange} type='text' required={true}/>
                        </td>
                        <td className='weight'>
                            <select value={selectedWeight} onChange={handleWeightTypeChange} id="" required={true}>
                                <option value="г">г</option>
                                <option value="мл">мл</option>
                            </select>
                        </td>
                        <td className='size'>
                            <input name='size' onChange={handleInputChange} type='text' placeholder="Только цифры"
                                   pattern="[0-9]*" required={true}/>
                        </td>
                        <td className='barcode'>
                            <input name='barcode' onChange={handleInputChange} type='text' placeholder="Только цифры"
                                   pattern="[0-9]*" required={true}/>
                        </td>
                        <td className='producer'>
                            <input name='producer' onChange={handleInputChange} type='text' required={true}/>
                        </td>
                        <td className='brand'>
                            <input name='brand' onChange={handleInputChange} type='text' required={true}/>
                        </td>
                        <td className='description'>
                            <input name='description' onChange={handleInputChange} type='text' required={true}/>
                        </td>
                        <td className='price'>
                            <input name='price' placeholder='Только цифры' value={priceValue} onChange={(e) => {
                                handleInputChange(e);
                                parser(e)
                            }} type='text' required={true}/>
                        </td>
                        <td className='category'>
                            <textarea readOnly={true} value={selectedCategory}
                                      placeholder='Выберите из списка категорию чтобы её добавить, выберите её ещё раз чтобы убрать (поле не может быть пустым)'
                                      required={true}/>
                            <select value={selectedCategory} name='category' onChange={handleCategoryChange}>
                                <option value="">Выберите тип ухода</option>
                                {filterTypes.map(filterType => (
                                    <option key={filterType} value={filterType}>
                                        {filterType}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button type='submit' className='add-btn button is-primary'>Добавить товар</button>
            </form>
            <ToastContainer position="top-center" autoClose={1000}/>
        </div>
    )
}

export default AddItemForm