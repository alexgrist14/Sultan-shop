import {Dispatch, ReactElement, SetStateAction, useState} from "react";
import searchIcon from "../assets/images/search_icon.svg";
import ProducersFilter from "./ProducersFilter";

interface CatalogParametersProducerProps{
    setProducersFilterList: Dispatch<SetStateAction<string[]>>,
}

const CatalogParametersProducer = ({setProducersFilterList}:CatalogParametersProducerProps):ReactElement =>{
    const [producerSearchValue, setProducerSearchValue] = useState('');

    const updateProducersFilterList = (producers: string[]): void => {
        setProducersFilterList(producers);
    }

    return (
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
    )
}

export default CatalogParametersProducer