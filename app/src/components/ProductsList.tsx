import React, {ReactElement, useEffect, useState} from "react";
import productsData from "../data/products.json";
import arrowIcon from '../assets/images/arrow_orange.svg';
import Product from "./Product";
import ReactPaginate from "react-paginate";
import IProduct from "../types/IProduct";
import {SortBy} from "../types/globalTypes";

interface FilteredProducts{
    maxPrice:string,
    minPrice:string,
    productsPerPage: number,
    producers: string[],
    selectedCategory: string,
    sortBy: SortBy
}
const ProductsList = ({productsPerPage,maxPrice,minPrice,producers,selectedCategory,sortBy}:FilteredProducts):ReactElement =>{
    const [products,setProducts] = useState<IProduct[]>([]);
    const [currentItems, setCurrentItems] = useState<IProduct[]>([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    useEffect(()=>{
        const filteredProducts = productsData.products.filter((item) =>{
            if(selectedCategory && !item.category.includes(selectedCategory)){
                return false
            }
            const isPriceInRange = +item.price >= +minPrice && +item.price <= +maxPrice;
            const isProducerIncluded = producers.length === 0 || producers.includes(item.producer);
            return isPriceInRange && isProducerIncluded;
        });
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

        setProducts(filteredProducts);

    },[productsData,minPrice,maxPrice,producers,sortBy,selectedCategory]);

    useEffect(()=>{
        const endOffset = itemOffset + productsPerPage;
        setCurrentItems(products.slice(itemOffset,endOffset));
        setPageCount(Math.ceil(products.length / productsPerPage));
    },[itemOffset,productsPerPage,products])

    const handlePageClick = (event:any) => {
        const newOffset = (event.selected * productsPerPage) % products.length;
        setItemOffset(newOffset);
    };
    return (

            <div className='catalog-products__container'>
                <div className='catalog-products__list'>
                    {currentItems.length > 0 ?(currentItems.map(prod=>{
                        return(
                            <Product product={prod}/>
                        )
                    }))
                    :(
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
                    Nullam interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis.
                    Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.
                </div>

            </div>
    )
}

export default ProductsList