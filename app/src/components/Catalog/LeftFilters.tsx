import {Fragment, ReactElement} from "react";
import {filterTypes} from "../../types/globalTypes";

interface CatalogLeftFiltersProps{
    handleSelectCategory: (item: string) => void,
    selectedCategory: string[],
}

const CatalogLeftFilters = ({handleSelectCategory,selectedCategory}:CatalogLeftFiltersProps):ReactElement =>{
    return (
        <>
            {
                filterTypes.map((item,index) => {
                    return (
                        <Fragment key={index}>
                            <div
                                 className={`catalog-filter_types ${selectedCategory.includes(item) ? 'selected-category' : ''}`}
                                 onClick={() => handleSelectCategory(item)}>
                                <h2 className='catalog-filter__types-title'>{item}</h2>
                            </div>
                            <div key={item} className='dashed-border'></div>
                        </Fragment>
                    )
                })
            }
        </>
    )
}

export default CatalogLeftFilters