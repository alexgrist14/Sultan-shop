import {ReactElement, useContext, useState} from "react";
import ProductsList from "../ProductsList";
import {SortBy} from "../../types/globalTypes";
import {Link} from "react-router-dom";
import {ShoppingCartContext} from "../../context/ShoppingCartContext";
import CatalogTopFilters from "./TopFilters";
import CatalogHeader from "./Header";
import CatalogParameters from "./Parameters";
import Breadcrumbs from "../Breadcrumbs";
import BreadCrumbMobile from "../BreadCrumbMobile";

const Catalog = (): ReactElement => {
    const [minPrice, setMinPrice] = useState('0');
    const [maxPrice, setMaxPrice] = useState('10000');
    const [producersFilterList, setProducersFilterList] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<SortBy>('name-asc');
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const {isSmallScreen} = useContext(ShoppingCartContext);

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
                        <BreadCrumbMobile/>
                        :
                        <Breadcrumbs items={[{path:'/',title:"Каталог"}]}/>
                }
                <CatalogHeader isSmallScreen={isSmallScreen} sortBy={sortBy} setSortBy={setSortBy}/>
                <CatalogTopFilters handleSelectCategory={handleSelectCategory} selectedCategory={selectedCategory}/>
                <div className='catalog-content__container'>
                    <div className='catalog-filter'>
                        <CatalogParameters setProducersFilterList={setProducersFilterList}
                                           sortBy={sortBy}
                                           selectedCategory={selectedCategory}
                                           handleSelectCategory={handleSelectCategory}
                                           minPrice={minPrice}
                                           maxPrice={maxPrice}
                                           setMaxPrice={setMaxPrice}
                                           setMinPrice={setMinPrice}
                                           setSortBy={setSortBy}/>
                        <ProductsList sortBy={sortBy}
                                      selectedCategory={selectedCategory}
                                      maxPrice={maxPrice}
                                      minPrice={minPrice}
                                      producers={producersFilterList}
                                      productsPerPage={15}/>
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