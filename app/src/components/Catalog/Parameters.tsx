import {ChangeEvent, Dispatch, ReactElement, SetStateAction, useContext, useState} from "react";
import arrowIcon from "../../assets/images/arrow_mobile.svg";
import CatalogLeftFilters from "./LeftFilters";
import CatalogSortProducts from "./SortProducts";
import {ShoppingCartContext} from "../../context/ShoppingCartContext";
import {SortBy} from "../../types/globalTypes";
import CatalogParametersProducer from "./ParametersProducer";

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

    const handleInputMinChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setMinPrice(parser(event.target.value));
    }

    const handleInputMaxChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setMaxPrice(parser(event.target.value));
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
                        <input className='min' value={minPrice} onChange={handleInputMinChange}/>-<input data-testid='maxPrice' className='max' value={maxPrice} onChange={handleInputMaxChange}/>
                    </div>
                </div>
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