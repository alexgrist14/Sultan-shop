import {Dispatch, SetStateAction, useState, createContext, FC, ReactNode} from "react";
import {CheckoutProduct, IProduct} from "../types/IProduct";

type ShoppingCartContextContextType = {
    productsInCart: number;
    setProductsInCart: Dispatch<SetStateAction<number>>;
    productsToBuy: CheckoutProduct[];
    setProductsToBuy: Dispatch<SetStateAction<CheckoutProduct[]>>;
    totalCost: number;
    setTotalCost: Dispatch<SetStateAction<number>>;
    isSmallScreen: boolean;
    setIsSmallScreen: Dispatch<SetStateAction<boolean>>;
};

type ShoppingCartProviderProps = {
    children: ReactNode
}


export const getProductByBarCode = (data:IProduct[], barcode: string | undefined): IProduct | undefined => {
    return data.find((product: IProduct) => product.barcode === barcode);
}

export const ShoppingCartContext = createContext<ShoppingCartContextContextType>({
    productsInCart: 0,
    setProductsInCart: ()=>{},
    productsToBuy: [],
    setProductsToBuy: ()=>{},
    totalCost: 0,
    setTotalCost: ()=>{},
    isSmallScreen: false,
    setIsSmallScreen: ()=>{},
});


export const ShoppingCartProvider:FC<ShoppingCartProviderProps> = ({children}) =>{
    const [productsInCart, setProductsInCart] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [productsToBuy, setProductsToBuy] = useState<CheckoutProduct[]>([]);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    return(
        <ShoppingCartContext.Provider value ={{productsInCart,setProductsInCart,productsToBuy,setProductsToBuy,totalCost,setTotalCost,isSmallScreen,setIsSmallScreen}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
