import {Dispatch, ReactElement, SetStateAction, useContext, useState} from "react";
import arrowIcon from "../../assets/images/arrow_mobile.svg";
import CatalogLeftFilters from "./LeftFilters";
import CatalogSortProducts from "./SortProducts";
import {ShoppingCartContext} from "../../context/ShoppingCartContext";
import {SortBy} from "../../types/globalTypes";
import CatalogParametersProducer from "./ParametersProducer";
import CatalogParametersPrice from "./ParametersPrice";

interface CatalogParametersProps {
    setProducersFilterList: Dispatch<SetStateAction<string[]>>,
    minPrice: string,
    maxPrice: string,
    setMinPrice: Dispatch<SetStateAction<string>>,
    setMaxPrice: Dispatch<SetStateAction<string>>,
    handleSelectCategory: (item: string) => void,
    selectedCategory: string[],
    sortBy: SortBy,
    setSortBy: Dispatch<SetStateAction<SortBy>>,
}

const CatalogParameters = ({
                               setProducersFilterList,
                               minPrice,
                               maxPrice,
                               setMinPrice,
                               setMaxPrice,
                               handleSelectCategory,
                               selectedCategory,
                               sortBy, setSortBy
                           }: CatalogParametersProps): ReactElement => {
    const [showFilters, setShowFilters] = useState(false);
    const {isSmallScreen} = useContext(ShoppingCartContext);

    return (
        <div className='catalog-filter__parameters'>
            <div className='catalog-header'>
                <h3 className='catalog-filter__parameters-title'>Подбор по параметрам</h3>
                {isSmallScreen && <div className={`show-filters-btn ${showFilters ? 'rotate' : ''}`}
                                       onClick={() => setShowFilters(!showFilters)}><img src={arrowIcon}
                                                                                         alt=""/></div>}
            </div>
            <div className={`catalog-filter__parameters-container ${showFilters && 'show'}`}>
                <CatalogParametersPrice maxPrice={maxPrice} minPrice={minPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}/>
                <CatalogParametersProducer setProducersFilterList={setProducersFilterList}/>
            </div>
            <CatalogLeftFilters handleSelectCategory={handleSelectCategory} selectedCategory={selectedCategory}/>
            {
                isSmallScreen &&
                <CatalogSortProducts sortBy={sortBy} setSortBy={setSortBy}/>
            }
        </div>
    )
}

export default CatalogParameters