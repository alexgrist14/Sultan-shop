import {ReactElement, useContext, useState} from "react";
import arrowIcon from '../assets/images/arrow_mobile.svg';
import ProductsList from "./ProductsList";
import {SortBy} from "../types/globalTypes";
import {Link, useNavigate} from "react-router-dom";
import {ShoppingCartContext} from "../context/ShoppingCartContext";
import CatalogTopFilters from "./CatalogTopFilters";
import CatalogHeader from "./CatalogHeader";
import CatalogParameters from "./CatalogParameters";

const Catalog = (): ReactElement => {
    const [minPrice, setMinPrice] = useState('0');
    const [maxPrice, setMaxPrice] = useState('10000');
    const [producersFilterList, setProducersFilterList] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<SortBy>('name-asc');
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const {isSmallScreen} = useContext(ShoppingCartContext);

    const navigate = useNavigate();

    const handleRedirect = (event: any): void => {
        event.preventDefault();
        navigate('/');
    }

    const handleSelectCategory = (item: string): void => {
        if (selectedCategory.includes(item))
            setSelectedCategory(prevState => prevState.filter(category => category !== item));
        else
            setSelectedCategory([...selectedCategory, item])
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
                <CatalogHeader isSmallScreen={isSmallScreen} sortBy={sortBy} setSortBy={setSortBy}/>
                <CatalogTopFilters handleSelectCategory={handleSelectCategory} selectedCategory={selectedCategory}/>
                <div className='catalog-content__container'>
                    <div className='catalog-filter'>
                        <CatalogParameters setProducersFilterList={setProducersFilterList} sortBy={sortBy}
                                           selectedCategory={selectedCategory}
                                           handleSelectCategory={handleSelectCategory} minPrice={minPrice}
                                           maxPrice={maxPrice} setMaxPrice={setMaxPrice} setMinPrice={setMinPrice}
                                           setSortBy={setSortBy}/>
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