import {ReactElement, useEffect, useState} from "react";
import productsData from "../data/products.json";
import arrowIcon from '../assets/images/arrow_orange.svg';
import Product from "./Product";
import ReactPaginate from "react-paginate";
import IProduct from "../types/IProduct";

interface ProductsPerPage{
    productsPerPage: number
}

const ProductsList = ({productsPerPage}:ProductsPerPage):ReactElement =>{
    const products = productsData.products;
    const [currentItems, setCurrentItems] = useState<IProduct[]>([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    useEffect(()=>{
        const endOffset = itemOffset + productsPerPage;
        setCurrentItems(products.slice(itemOffset,endOffset));
        setPageCount(Math.ceil(products.length / productsPerPage));
    },[itemOffset,productsPerPage])

    const handlePageClick = (event:any) => {
        const newOffset = (event.selected * productsPerPage) % products.length;
        setItemOffset(newOffset);
    };
    return (
            <div className='catalog-products__container'>
                <div className='catalog-products__list'>
                    {currentItems.map(prod=>{
                        return(
                            <Product product={prod}/>
                        )
                    })}
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