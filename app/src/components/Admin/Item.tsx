import {ChangeEvent, Dispatch, ReactElement, SetStateAction, useState} from "react";
import IProduct from "../../types/IProduct";
import {filterTypes} from "../../types/globalTypes";
import deleteIcon from "../../assets/images/delete_icon.svg";
import {toast} from "react-toastify";
import ItemLeftFields from "./ItemLeftFields";
import ItemRightFields from "./ItemRightFields";

interface AdminPanelItemProps{
    item: IProduct,
    products: IProduct[],
    setProducts: Dispatch<SetStateAction<IProduct[]>>
    index: number,

}

const AdminPanelItem = ({item,products,setProducts,index}:AdminPanelItemProps): ReactElement =>{
    const [isOpen, setIsOpen] = useState(false);
    const notifyDelete = () => toast("Товар удалён.", {hideProgressBar: true});

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleInputChange = (index: number, field: keyof IProduct, value: string) => {
        const updatedProducts: IProduct[] = [...products];
        updatedProducts[index][field] = value as string & string[];
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    }

    const handleCategoryChange = (index: number, field: keyof IProduct, event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const updatedProducts:any = [...products];
        if (updatedProducts[index][field].includes(value) && updatedProducts[index][field].length === 1)
            return;
        else if (updatedProducts[index][field].includes(value)) {
            updatedProducts[index][field].splice(updatedProducts[index][field].indexOf(value), 1)
        } else {
            updatedProducts[index][field].push(value);
        }

        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const handleDelete = (item: IProduct): void => {
        setProducts(prevState => prevState.filter(product => product !== item));
        localStorage.setItem('products', JSON.stringify(products.filter(product => product !== item)));
    }

    return (
        <div className='admin-panel__item'>
            <div className='admin-panel__item-preview'>
                <div className='admin-panel__item-img'><img src={item.url} alt="item"/></div>
                <div className='admin-panel__item-title'>
                    <h2 onClick={toggleOpen}>{item.name} {item.description}</h2>
                    <div className='delete-btn' onClick={() => {
                        handleDelete(item);
                        notifyDelete();
                    }}><img src={deleteIcon} alt="delete_icon"/></div>
                </div>
            </div>
            {isOpen && (
                <div className='admin-panel__item-fields'>
                    <ItemLeftFields item={item} handleInputChange={handleInputChange} index={index}/>
                    <ItemRightFields item={item} handleInputChange={handleInputChange} index={index} products={products} setProducts={setProducts}/>
                    <label  >
                        <h3>Категории: </h3>
                        <textarea readOnly={true} value={item.category} required={true}/>
                    </label>
                        <div className='filter-types__container'>
                            {
                                filterTypes.map(filterType=>(
                                    <div key={filterType} className='filter-types__item'>
                                        <input className='filter-types__item-checkbox' type="checkbox" name={filterType} value={filterType}
                                               onChange={(e)=>{handleCategoryChange(index,'category',e)}} checked={item.category.includes(filterType)}/>
                                        <span className='filter-types__item-name'>{filterType}</span>
                                    </div>
                                ))
                            }
                        </div>
                </div>
            )
            }

        </div>
    )
}

export default AdminPanelItem