import {ReactElement} from "react";
import {filterTypes} from "../types/globalTypes";

interface CatalogTopFiltersProps{
    handleSelectCategory: (item:string)=>void,
    selectedCategory: string[],
}

const CatalogTopFilters = ({handleSelectCategory,selectedCategory}:CatalogTopFiltersProps):ReactElement =>{
    return (
        <div className='catalog-goods__types'>
            {
                filterTypes.map((item) => {
                    return (
                        <div
                            className={`catalog-goods__types-item ${selectedCategory.includes(item) ? 'selected-category' : ''}`}
                            onClick={() => handleSelectCategory(item)} key={item}>
                            <div>
                                {item}
                            </div>
                        </div>

                    )
                })
            }
        </div>
    )
}

export default CatalogTopFilters