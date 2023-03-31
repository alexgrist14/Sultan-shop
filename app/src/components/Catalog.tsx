import {ChangeEvent, ReactElement, useContext, useEffect, useState} from "react";
import polygonIcon from '../assets/images/polygon.svg';
import searchIcon from '../assets/images/search_icon.svg';
import arrowIcon from '../assets/images/arrow_mobile.svg';
import ProductsList from "./ProductsList";
import ProducersFilter from "./ProducersFilter";
import {filterTypes, SortBy} from "../types/globalTypes";
import {Link, useNavigate} from "react-router-dom";
import {ShoppingCartContext} from "../context/ShoppingCartContext";

const Catalog = (): ReactElement => {
    const [minPrice, setMinPrice] = useState('0');
    const [maxPrice, setMaxPrice] = useState('10000');
    const [producerSearchValue, setProducerSearchValue] = useState('');
    const [producersFilterList, setProducersFilterList] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<SortBy>('name-asc');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const {isSmallScreen} = useContext(ShoppingCartContext);

    const navigate = useNavigate();

    const updateProducersFilterList = (producers: string[]): void => {
        setProducersFilterList(producers);
    }

    const handleInputMinChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setMinPrice(parser(event.target.value));
    }

    const handleInputMaxChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setMaxPrice(parser(event.target.value));
    }

    const handleRedirect = (event: any): void => {
        event.preventDefault();
        navigate('/');
    }

    const handleSelectCategory = (item: string): void => {
        if (selectedCategory === item)
            setSelectedCategory('');
        else
            setSelectedCategory(item);
    }

    const parser = (inputValue: string): string => {
        const outputString: string = inputValue.replace(/\D/g, '');
        if (outputString === '') {
            return '0';
        } else if (outputString === '' || (outputString.charAt(0) !== '0' && parseInt(outputString) > 0)) {
            return outputString;
        }
        return '';
    }

    return (
        <section className='catalog'>
            <div className='catalog-container'>
                {
                    isSmallScreen ?
                        <Link to='/' className='back-content'>
                            <div className='back-btn'>
                                <img src={arrowIcon} alt="arrow_icon"/>
                            </div>
                            <span>Назад</span>
                        </Link>
                        :
                        <ul className='breadcrumbs'>
                            <li><a href="/" onClick={handleRedirect}>Главная</a></li>
                            <div className='dashed-border'></div>
                            <li><a href="/" onClick={handleRedirect}>Каталог</a></li>
                        </ul>
                }
                <div className='catalog-header'>
                    <h2>Каталог</h2>
                    {
                        !isSmallScreen && <div className='catalog-sort'>
                            <div>Сортировка:</div>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)}
                                    className='sort-type' name="orderBy" id="">
                                <option value="name-asc">Название</option>
                                <option value="name-desc"><p>Название <br/> (по убыванию)</p></option>
                                <option value="price-asc">Цена</option>
                                <option value="price-desc">Цена(по убыванию)</option>
                                <img src={polygonIcon} alt="polygon"/>
                            </select>
                        </div>
                    }
                </div>
                <div className='catalog-goods__types'>
                    {
                        filterTypes.map((item) => {
                            return (
                                <div
                                    className={`catalog-goods__types-item ${selectedCategory === item ? 'selected-category' : ''}`}
                                    onClick={() => handleSelectCategory(item)} key={item}>
                                    <div>
                                        {item}
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
                <div className='catalog-content__container'>
                    <div className='catalog-filter'>
                        <div className='catalog-filter__parameters'>
                            <div className='catalog-header'>
                                <h3 className='catalog-filter__parameters-title'>Подбор по параметрам</h3>
                                {isSmallScreen && <div className={`show-filters-btn ${showFilters ? 'rotate' : ''}`}
                                                       onClick={() => setShowFilters(!showFilters)}><img src={arrowIcon}
                                                                                                         alt=""/></div>}
                            </div>
                            <div className={`catalog-filter__parameters-container ${showFilters && 'show'}`}>
                                <div className='catalog-filter__price'>
                                    <h4>Цена<span>₸</span></h4>
                                    <div className='catalog-filter__price-range'>
                                        <input className='min' value={minPrice} onChange={handleInputMinChange}/>-<input
                                        className='max' value={maxPrice} onChange={handleInputMaxChange}/>
                                    </div>
                                </div>
                                <div className='catalog-filter__producer'>
                                    <h3 className='catalog-filter__producer-title'>Производитель</h3>
                                    <div className='catalog-filter__producer-search'>
                                        <div>
                                            <input type="text" value={producerSearchValue}
                                                   onChange={(e) => setProducerSearchValue(e.target.value)}
                                                   placeholder='Поиск...'/>
                                            <div className='search-btn'>
                                                <img src={searchIcon} alt="search_icon"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='catalog-filter__producer-checkboxes'>
                                        <ProducersFilter searchValue={producerSearchValue}
                                                         updateProducersFilterList={updateProducersFilterList}/>
                                    </div>
                                    <div className='dashed-border'></div>
                                </div>
                            </div>
                            {filterTypes.map((item) => {
                                return (
                                    <>
                                        <div key={item}
                                             className={`catalog-filter_types ${selectedCategory === item ? 'selected-category' : ''}`}
                                             onClick={() => handleSelectCategory(item)}>
                                            <h2 className='catalog-filter__types-title'>{item}</h2></div>
                                        <div className='dashed-border'></div>
                                    </>
                                )
                            })}
                            {
                                isSmallScreen && <div className='catalog-sort'>
                                    <div>Сортировка:</div>
                                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)}
                                            className='sort-type' name="orderBy" id="">
                                        <option value="name-asc">Название</option>
                                        <option value="name-desc"><p>Название <br/> (по убыванию)</p></option>
                                        <option value="price-asc">Цена</option>
                                        <option value="price-desc">Цена(по убыванию)</option>
                                        <img src={polygonIcon} alt="polygon"/>
                                    </select>
                                </div>
                            }
                        </div>
                        <ProductsList sortBy={sortBy} selectedCategory={selectedCategory} maxPrice={maxPrice}
                                      minPrice={minPrice}
                                      producers={producersFilterList} productsPerPage={15}/>
                    </div>
                </div>
            </div>
            {
                !isSmallScreen &&
                <div className='admin-panel'>
                    <Link className='admin-link' to='/admin-panel'>Админ панель</Link>
                </div>
            }

        </section>
    );
}

export default Catalog