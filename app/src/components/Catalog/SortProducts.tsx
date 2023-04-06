import {Dispatch, ReactElement, SetStateAction} from "react";
import {SortBy} from "../../types/globalTypes";

interface CatalogSortProductsProps{
    sortBy: SortBy,
    setSortBy: Dispatch<SetStateAction<SortBy>>,
}

const CatalogSortProducts = ({sortBy,setSortBy}:CatalogSortProductsProps):ReactElement =>{
    return (
        <div className='catalog-sort'>
            <div>Сортировка:</div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)}
                    className='sort-type' name="orderBy" id="">
                <option value="name-asc">Название</option>
                <option value="name-desc">Название (по убыванию)</option>
                <option value="price-asc">Цена</option>
                <option value="price-desc">Цена(по убыванию)</option>
            </select>
        </div>
    )
}

export default CatalogSortProducts