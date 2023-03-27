import {Dispatch, ReactElement, SetStateAction, useState,createContext} from "react";
import IProduct from "../types/IProduct";

type ShoppingCartContextContextType = {
    productsInCart: number;
    setProductsInCart: Dispatch<SetStateAction<number>>;
    productsToBuy: IProduct[];
    setProductsToBuy: Dispatch<SetStateAction<IProduct[]>>;
};


export const ShoppingCartContext = createContext<ShoppingCartContextContextType>({
    productsInCart: 0,
    setProductsInCart: ()=>{},
    productsToBuy: [],
    setProductsToBuy: ()=>{},
});


export const ShoppingCartProvider = ({children} :any) :ReactElement =>{
    const [productsInCart, setProductsInCart] = useState(0);
    const [productsToBuy, setProductsToBuy] = useState<IProduct[]>([]);

    return(
        <ShoppingCartContext.Provider value ={{productsInCart,setProductsInCart,productsToBuy,setProductsToBuy}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
