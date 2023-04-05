import React, {ReactElement, useEffect, useState} from "react";
import productsData from "../data/products.json";
import arrowIcon from '../assets/images/arrow_orange.svg';
import Product from "./Product";
import ReactPaginate from "react-paginate";
import IProduct from "../types/IProduct";
import {SortBy} from "../types/globalTypes";
import {ToastContainer} from "react-toastify";

interface FilteredProducts {
    maxPrice: string,
    minPrice: string,
    productsPerPage: number,
    producers: string[],
    selectedCategory: string[],
    sortBy: SortBy
}

const ProductsList = ({
                          productsPerPage,
                          maxPrice,
                          minPrice,
                          producers,
                          selectedCategory,
                          sortBy
                      }: FilteredProducts): ReactElement => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [localStorageProducts, setLocalStorageProducts] = useState<IProduct[]>([]);
    const [currentItems, setCurrentItems] = useState<IProduct[]>([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const localStorageProducts = JSON.parse(localStorage.getItem('products') || '[]') as IProduct[]
        if (!localStorage.getItem('products') || localStorageProducts.length === 0) {
            setLocalStorageProducts(productsData.products);
            localStorage.setItem('products', JSON.stringify(productsData.products));
        } else {
            const storedProducts = localStorage.getItem('products');
            if (storedProducts) {
                setLocalStorageProducts(JSON.parse(storedProducts) as IProduct[]);
            }
        }
    }, []);

    useEffect(() => {
        if (localStorageProducts.length > 0) {
            const filteredProducts =  getLocalstorageFilteredProducts();
            sortProducts(filteredProducts);
            setProducts(filteredProducts);
        }
    }, [minPrice, maxPrice, producers, sortBy, selectedCategory]);

    const getLocalstorageFilteredProducts = ():IProduct[] =>{
        return localStorageProducts.filter((item) => {
            if (selectedCategory.length && !item.category.some(val => selectedCategory.includes(val))) {
                return false;
            }
            const isPriceInRange = +item.price >= +minPrice && +item.price <= +maxPrice;
            const isProducerIncluded = producers.length === 0 || producers.includes(item.producer);

            return isPriceInRange && isProducerIncluded;
        });
    }

    const sortProducts = (filteredProducts:IProduct[]) =>{
        switch (sortBy) {
            case 'name-desc':
                filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price-asc':
                filteredProducts.sort((a, b) => +a.price - +b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => +b.price - +a.price);
                break;
            default:
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    useEffect(() => {
        const endOffset = itemOffset + productsPerPage;
        setCurrentItems(products.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(products.length / productsPerPage));
    }, [itemOffset, productsPerPage, products])

    const handlePageClick = (event: {selected: number}) => {
        const newOffset = (event.selected * productsPerPage) % products.length;
        setItemOffset(newOffset);
    };

    const renderCurrentItems = ():JSX.Element[] =>{
        return currentItems.map((prod,i) => <Product product={prod} key={i}/>)
    }

    return (

        <div className='catalog-products__container'>
            <div className='catalog-products__list'>
                {currentItems.length > 0 ? renderCurrentItems()
                    : (
                        <p>Извините, товары не найдены.</p>
                    )
                }
            </div>
            <ReactPaginate
                breakLabel='...'
                nextLabel={<img src={arrowIcon} alt=""/>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                containerClassName='pages'
                activeClassName='page-active'
                pageLinkClassName='page'
                previousLabel={<img src={arrowIcon} alt=""/>}
            />
            <div className='catalog-products__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa
                vestibulum duis.
                Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis. Nunc elit,
                dignissim sed nulla ullamcorper enim, malesuada.
            </div>
            <ToastContainer position="top-center" autoClose={1000}/>
        </div>
    )
}

export default ProductsList