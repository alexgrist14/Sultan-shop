import {ChangeEvent, FormEvent, ReactElement, useEffect, useRef, useState} from "react";
import IProduct from "../../types/IProduct";
import {filterTypes} from "../../types/globalTypes";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

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
    const formRef = useRef<HTMLFormElement | null>(null);
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

    const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
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
            <Breadcrumbs items={[{path: '/admin-panel', title: 'Админ панель'}, {path: '', title: "Добавить товар"}]}/>
            <form className='add-form' ref={formRef} onSubmit={(e) => {
                handleFormSubmit(e);
                notifyDefault();
            }}>
                <div className='admin-panel__item-fields'>
                    <div className='admin-panel__item-fields__left'>
                        <label>
                            <h3>Url изображения:</h3>
                            <input type='text' name='url' onChange={handleInputChange}></input>
                        </label>
                        <label>
                            <h3>Название:</h3>
                            <input type='text' name='name' onChange={handleInputChange}></input>
                        </label>
                        <label>
                            <h3>Тип размера:</h3>
                            <select value={selectedWeight} onChange={handleWeightTypeChange} id="" required={true}>
                                <option value="г">г</option>
                                <option value="мл">мл</option>
                            </select>
                        </label>
                        <label>
                            <h3>Размер:</h3>
                            <input name='size' onChange={handleInputChange} type='text' placeholder="Только цифры"
                                   pattern="[0-9]*" required={true}/>
                        </label>
                    </div>
                    <div className='admin-panel__item-fields__right'>
                        <label>
                            <h3>Штрихкод:</h3>
                            <input name='barcode' onChange={handleInputChange} type='text' placeholder="Только цифры"
                                   pattern="[0-9]*" required={true}/>
                        </label>
                        <label>
                            <h3>Производитель:</h3>
                            <input name='producer' onChange={handleInputChange} type='text' required={true}/>
                        </label>
                        <label>
                            <h3>Бренд:</h3>
                            <input name='brand' onChange={handleInputChange} type='text' required={true}/>
                        </label>
                        <label>
                            <h3>Описание:</h3>
                            <input name='description' onChange={handleInputChange} type='text' required={true}/>
                        </label>
                        <label>
                            <h3>Цена:</h3>
                            <input name='price' placeholder='Только цифры' value={priceValue} onChange={(e) => {
                                handleInputChange(e);
                                parser(e)
                            }} type='text' required={true}/>
                        </label>
                    </div>
                    <label>
                        <h3>Категории: </h3>
                        <textarea readOnly={true} value={selectedCategory}
                                  placeholder='Выберите из списка категорию (поле не может быть пустым)'
                                  required={true}/>
                    </label>
                    <div className='filter-types__container'>
                        {
                            filterTypes.map(filterType => (
                                <div key={filterType} className='filter-types__item'>
                                    <input className='filter-types__item-checkbox' type="checkbox" name={filterType}
                                           value={filterType}
                                           onChange={handleCategoryChange}/>
                                    <span className='filter-types__item-name'>{filterType}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <button type='submit' className='add-btn button is-primary'>Добавить товар</button>
            </form>
            <ToastContainer position="top-center" autoClose={1000}/>
        </div>
    )
}

export default AddItemForm