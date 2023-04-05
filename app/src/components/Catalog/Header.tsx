import {Dispatch, ReactElement, SetStateAction} from "react";
import {SortBy} from "../../types/globalTypes";
import CatalogSortProducts from "./SortProducts";

interface CatalogHeaderProps{
    isSmallScreen: boolean,
    sortBy: SortBy,
    setSortBy: Dispatch<SetStateAction<SortBy>>,

}

const CatalogHeader = ({isSmallScreen,sortBy,setSortBy}:CatalogHeaderProps):ReactElement =>{
    return (
        <div className='catalog-header'>
            <h2>Каталог</h2>
            {
                !isSmallScreen &&
                <CatalogSortProducts sortBy={sortBy} setSortBy={setSortBy}/>
            }
        </div>
    )
}

export default CatalogHeader