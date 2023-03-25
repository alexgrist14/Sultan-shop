import {ChangeEvent, ReactElement, useState} from "react";
import polygonIcon from '../assets/images/polygon.svg';
import searchIcon from '../assets/images/search_icon.svg';
import ProductsList from "./ProductsList";
import CatalogTypes from "./CatalogTypes";

const Catalog = ():ReactElement=>{
    const [minPrice,setMinPrice] = useState('0');
    const [maxPrice,setMaxPrice] = useState('10000');
    const handleInputMinChange = (event:ChangeEvent<HTMLInputElement>)=>{
        setMinPrice(parser(event.target.value));
    }
    const handleInputMaxChange = (event:ChangeEvent<HTMLInputElement>)=>{
        setMaxPrice(parser(event.target.value));
    }
    const parser =(inputValue:string):string =>{
        const outputString:string = inputValue.replace(/\D/g, '');
        if(outputString ===''){
            return '0';
        }
        else if(outputString === '' || (outputString.charAt(0) !== '0' && parseInt(outputString) > 0)){
            return outputString;
        }
        return '';
    }
    const filterTypes = [
        'Уход за телом',
        'Уход за руками',
        'Уход за за ногами',
        'Уход за лицом',
        'Уход за волосами',
        'Средства для загара',
        'Средства для бритья',
        'Подарочные наборы',
        'Гигиеническая продукция',
        'Гигиена полости рта',
        'Бумажная продукция'
    ];

    return (
        <section className='catalog'>
            <div className='catalog-container'>
                <ul className='breadcrumbs'>
                    <li><a href="./">Главная</a></li>
                    <div className='dashed-border'></div>
                    <li><a href="./">Каталог</a></li>
                </ul>
                <div className='catalog-header'>
                    <h2>Каталог</h2>
                    <div className='catalog-sort'>
                        <div>Сортировка:</div>
                        <span className='sort-type'>Название</span>
                        <div><img src={polygonIcon} alt="polygon"/></div>
                    </div>
                </div>
                <CatalogTypes/>
                <div className='catalog-content__container'>
                    <div className='catalog-filter'>
                        <div className='catalog-filter__parameters'>
                            <h3 className='catalog-filter__parameters-title'>Подбор по параметрам</h3>
                            <div className='catalog-filter__price'>
                                <h4>Цена<span>₸</span></h4>
                                <div className='catalog-filter__price-range'>
                                    <input className='min' value={minPrice} onChange={handleInputMinChange} />-<input className='max' value={maxPrice} onChange={handleInputMaxChange}/>
                                </div>
                            </div>
                            <div className='catalog-filter__producer'>
                                <h3 className='catalog-filter__producer-title'>Производитель</h3>
                                <div className='catalog-filter__producer-search'>
                                    <div>
                                        <input type="text" placeholder='Поиск...'/>
                                        <div className='search-btn'>
                                            <img src={searchIcon} alt="search_icon"/>
                                        </div>

                                    </div>
                                </div>
                                <div className='catalog-filter__producer-checkboxes'>
                                    <div><input type="checkbox"/> <span className='producer'>Grifon</span> <span className='count'>(56)</span></div>
                                    <div><input type="checkbox"/> <span className='producer'>Boyscout</span> <span className='count'>(66)</span></div>
                                    <div><input type="checkbox"/> <span className='producer'>Paclan</span> <span className='count'>(166)</span></div>
                                    <div><input type="checkbox"/> <span className='producer'>Булгари Грин</span> <span className='count'>(21)</span></div>
                                    <div className='show-all'><span>Показать все</span> <div><img src={polygonIcon} alt="polygon_icob"/></div></div>
                                </div>
                                <div className='dashed-border'></div>
                                {filterTypes.map((item)=>{
                                    return(
                                        <>
                                            <div className='catalog-filter_types'><h2 className= 'catalog-filter__types-title'>{item}</h2></div>
                                            <div className='dashed-border'></div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                        <ProductsList productsPerPage={15}/>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Catalog