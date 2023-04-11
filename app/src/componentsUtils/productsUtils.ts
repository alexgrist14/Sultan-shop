import {IProduct} from "../types/IProduct";
import {SortBy} from "../types/globalTypes";
import {MutableRefObject} from "react";

export const getLocalstorageFilteredProducts = (localStorageProducts: IProduct[], selectedCategory: string[], minPrice: string, maxPrice: string, producers: string[]): IProduct[] => {
    return localStorageProducts.filter(({category, price, producer}) => {
        if (selectedCategory.length && !category.some(value => selectedCategory.includes(value))) {
            return false;
        }
        const isPriceInRange = +price >= +minPrice && +price <= +maxPrice;
        const isProducerIncluded = producers.length === 0 || producers.includes(producer);

        return isPriceInRange && isProducerIncluded;
    });
}

export const sortProducts = (filteredProducts: IProduct[], sortBy: SortBy): void => {
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

export const scrollToTop = (elementRef: MutableRefObject<HTMLDivElement | null>): void => {
    elementRef.current?.scrollIntoView({behavior: "smooth"});
}
