import {ReactElement} from "react";
import polygonIcon from '../assets/images/polygon.svg';
import searchIcon from '../assets/images/search_icon.svg';
import ProductsList from "./ProductsList";
import CatalogTypes from "./CatalogTypes";

const Catalog = ():ReactElement=>{
    const filterTypes = [
        'Уход за телом',
        'Уход за руками',
        'Уход за за ногами',
        'Уход за лицом',
        'Уход за волосами',
        'Средства для загара',
        'Средства для бритья',
        'Подарочные наборы',
        'Гигиеническая продукция',
        'Гигиена полости рта',
        'Бумажная продукция'
    ];

    return (
        <section className='catalog'>
            <div className='catalog-container'>
                <ul className='breadcrumbs'>
                    <li><a href="./">Главная</a></li>
                    <div className='dashed-border'></div>
                    <li><a href="./">Каталог</a></li>
                </ul>
                <div className='catalog-header'>
                    <h2>Каталог</h2>
                    <div className='catalog-sort'>
                        <div>Сортировка:</div>
                        <span className='sort-type'>Название</span>
                        <div><img src={polygonIcon} alt="polygon"/></div>
                    </div>
                </div>
                <CatalogTypes/>
                <div className='catalog-content__container'>
                    <div className='catalog-filter'>
                        <div className='catalog-filter__parameters'>
                            <h3 className='catalog-filter__parameters-title'>Подбор по параметрам</h3>
                            <div className='catalog-filter__price'>
                                <h4>Цена<span>₸</span></h4>
                                <div className='catalog-filter__price-range'>
                                    <div className='min'>0</div>-<div className='max'>10 000</div>
                                </div>
                            </div>
                            <div className='catalog-filter__producer'>
                                <h3 className='catalog-filter__producer-title'>Производитель</h3>
                                <div className='catalog-filter__producer-search'>
                                    <div>
                                        <input type="text" placeholder='Поиск...'/>
                                        <div className='search-btn'>
                                            <img src={searchIcon} alt="search_icon"/>
                                        </div>

                                    </div>
                                </div>
                                <div className='catalog-filter__producer-checkboxes'>
                                    <div><input type="checkbox"/> <span className='producer'>Grifon</span> <span className='count'>(56)</span></div>
                                    <div><input type="checkbox"/> <span className='producer'>Boyscout</span> <span className='count'>(66)</span></div>
                                    <div><input type="checkbox"/> <span className='producer'>Paclan</span> <span className='count'>(166)</span></div>
                                    <div><input type="checkbox"/> <span className='producer'>Булгари Грин</span> <span className='count'>(21)</span></div>
                                    <div className='show-all'><span>Показать все</span> <div><img src={polygonIcon} alt="polygon_icob"/></div></div>
                                </div>
                                <div className='dashed-border'></div>
                                {filterTypes.map((item)=>{
                                    return(
                                        <>
                                            <div className='catalog-filter_types'><h2 className= 'catalog-filter__types-title'>{item}</h2></div>
                                            <div className='dashed-border'></div>
                                        </>

                                    )
                                })}
                                {/*<div className='catalog-filter_types'><h2 className= 'catalog-filter__types-title'>Уход за телом</h2></div>*/}
                                {/*<div className='dashed-border'></div>*/}
                                {/*<div className='catalog-filter_types'><h2 className= 'catalog-filter__types-title'>Уход за руками</h2></div>*/}
                                {/*<div className='dashed-border'></div>*/}
                                {/*<div className='catalog-filter_types'><h2 className= 'catalog-filter__types-title'>Уход за за ногами</h2></div>*/}
                                {/*<div className='dashed-border'></div>*/}
                                {/*<div className='catalog-filter_types'><h2 className= 'catalog-filter__types-title'>Уход за лицом</h2></div>*/}
                                {/*<div className='dashed-border'></div>*/}
                                {/*<div className='catalog-filter_types'><h2 className= 'catalog-filter__types-title'>Уход за волосами</h2></div>*/}
                                {/*<div className='dashed-border'></div>*/}
                                {/*<div className='catalog-filter_types'><h2 className= 'catalog-filter__types-title'>Средства для загара</h2></div>*/}
                                {/*<div className='dashed-border'></div>*/}
                                {/*<div className='catalog-filter_types'><h2 className= 'catalog-filter__types-title'>Средства для бритья</h2></div>*/}
                                {/*<div className='dashed-border'></div>*/}
                                {/*<div className='catalog-filter_types'><h2 className= 'catalog-filter__types-title'>Подарочные наборы</h2></div>*/}
                                {/*<div className='dashed-border'></div>*/}
                                {/*<div className='catalog-filter_types'><h2 className= 'catalog-filter__types-title'>Гигиеническая продукция</h2></div>*/}
                                {/*<div className='dashed-border'></div>*/}
                                {/*<div className='catalog-filter_types'><h2 className= 'catalog-filter__types-title'>Гигиена полости рта</h2></div>*/}
                                {/*<div className='dashed-border'></div>*/}
                                {/*<div className='catalog-filter_types'><h2 className= 'catalog-filter__types-title'>Бумажная продукция</h2></div>*/}

                            </div>
                        </div>
                        <ProductsList productsPerPage={15}/>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Catalog