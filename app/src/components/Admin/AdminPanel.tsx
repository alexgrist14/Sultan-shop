import {ReactElement, useEffect, useState} from "react";
import IProduct from "../../types/IProduct";
import productsData from "../../data/products.json";
import {Link} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import AdminPanelItem from "./Item";

const AdminPanel = (): ReactElement => {
    const [products, setProducts] = useState<IProduct[]>(JSON.parse(localStorage.getItem('products') || '[]'));

    useEffect(() => {
        window.addEventListener('storage', (event) => {
            if (event.key === 'products') {
                if (!event.newValue) {
                    toast('Localstorage пуст. Данные загружены из JSON', {hideProgressBar: true})
                    setProducts(productsData.products);
                }
            }
        });
        if (products.length === 0) {
            setProducts(productsData.products);
            localStorage.setItem('products', JSON.stringify(productsData.products));
        }
    }, [products])

    return (
        <div className='admin-panel__container'>
            <Breadcrumbs items={[{path:'',title:'Админ панель'}]}/>
            <Link className='add-item' to="/add-item">Добавить товар</Link>
            <div className='admin-panel__items-container'>
                {
                    products.length && products.map((item,index)=>{
                        return <AdminPanelItem key={index} item={item} products={products} setProducts={setProducts} index={index}/>
                    })
                }
            </div>
            <ToastContainer position="top-center" autoClose={100}/>
        </div>
    )
}

export default AdminPanel