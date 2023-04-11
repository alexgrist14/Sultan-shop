import {ReactElement, useEffect, useRef, useState} from "react";
import productsData from "../../data/products.json";
import arrowIcon from '../../assets/images/arrow_orange.svg';
import Product from "./Product";
import ReactPaginate from "react-paginate";
import {IProduct} from "../../types/IProduct";
import {SortBy} from "../../types/globalTypes";
import {ToastContainer} from "react-toastify";
import {getLocalstorageFilteredProducts, scrollToTop, sortProducts} from "../../componentsUtils/productsUtils";
import {getLocalStorageItem, setLocalStorageItem} from "../../componentsUtils/localStorageUtils";

interface ProductsListProps {
    maxPrice: string,
    minPrice: string,
    productsPerPage: number,
    producers: string[],
    selectedCategory: string[],
    sortBy: SortBy,
}

const ProductsList = ({
                          productsPerPage,
                          maxPrice,
                          minPrice,
                          producers,
                          selectedCategory,
                          sortBy,
                      }: ProductsListProps): ReactElement => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [localStorageProducts, setLocalStorageProducts] = useState<IProduct[]>([]);
    const [currentItems, setCurrentItems] = useState<IProduct[]>([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const topElementRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const localStorageProductsJson = localStorage.getItem('products') || '[]';
        const localStorageProducts = JSON.parse(localStorageProductsJson) as IProduct[];

        if (localStorageProducts.length === 0) {
            setLocalStorageProducts(productsData.products);
            setLocalStorageItem('products',productsData.products);
        } else {
            const storedProducts = getLocalStorageItem('products');
            setLocalStorageProducts(storedProducts ?? []);
        }
    }, []);

    useEffect(() => {
        if (localStorageProducts.length > 0) {
            const filteredProducts = getLocalstorageFilteredProducts(localStorageProducts,selectedCategory,minPrice,maxPrice,producers);
            sortProducts(filteredProducts,sortBy);
            setProducts(filteredProducts);
        }
    }, [minPrice, maxPrice, producers, sortBy, selectedCategory]);

    useEffect(() => {
        const endOffset = itemOffset + productsPerPage;
        setCurrentItems(products.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(products.length / productsPerPage));
    }, [itemOffset, productsPerPage, products])

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * productsPerPage) % products.length;
        setItemOffset(newOffset);
    };

    const renderCurrentItems = (): JSX.Element[] => {
        return currentItems.map((prod, i) => <Product product={prod} key={i}/>)
    }

    return (

        <div ref={topElementRef} className='catalog-products__container'>
            <div className='catalog-products__list'>
                {currentItems.length > 0 ? renderCurrentItems()
                    : (
                        <p>Извините, товары не найдены.</p>
                    )
                }
            </div>
            <ReactPaginate
                onClick={()=> scrollToTop(topElementRef)}
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
                Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis. Nunc
                elit,
                dignissim sed nulla ullamcorper enim, malesuada.
            </div>
            <ToastContainer position="top-center" autoClose={1000}/>
        </div>
    )
}

export default ProductsList