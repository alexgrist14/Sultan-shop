import {ReactElement, useContext} from "react";
import {ShoppingCartContext} from "../context/ShoppingCartContext";
import weightIcon from "../assets/images/weight_icon.svg";
import volumeIcon from "../assets/images/volume_icon.svg";
import deleteIcon from "../assets/images/delete_icon.svg";
import {useNavigate} from "react-router-dom";

const ShoppingCart = ():ReactElement =>{
    const {productsInCart, setProductsInCart,productsToBuy,setProductsToBuy} = useContext(ShoppingCartContext);
    const navigate = useNavigate();
    const handleClick = (e:any):void =>{
        e.preventDefault();
        navigate('/');
    }
    return (
        <>
            <div className='shopping-cart__container'>
                <div className='shopping-cart__content'>
                    <ul className='breadcrumbs'>
                        <li><a href="/" onClick={handleClick}>Главная</a></li>
                        <div className='dashed-border'></div>
                        <li className='cart-crumb'>
                            <div>Корзина</div>
                        </li>
                    </ul>
                    <h2 className='shopping-cart__title'>Корзина</h2>
                    <div className='shopping-cart__products'>
                        {
                           productsToBuy && productsToBuy.map((item)=>{
                                return (
                                    <div className='shopping-cart__products-item'>
                                        <div className='product-img'><div><img src={item.url} alt="product_image"/></div></div>
                                        <div className='product-description'>
                                            <div className='product-description__weight'>
                                                <div className='product-description__weight-img'><img src={item.weightType === 'г' ? weightIcon : volumeIcon} alt="weight_icon"/></div>
                                                <div className='product-description__weight-size'>{item.size}</div>
                                                <div className='product-description__weight-type'>{item.weightType}</div>
                                            </div>
                                            <div className='product-description__name'>
                                                {item.name} {item.description}
                                            </div>
                                            <p className='product-description__text'>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Nullam interdum ut justo, vestibulum sagittis iaculis iaculis.
                                                Quis mattis vulputate feugiat massa vestibulum duis.
                                            </p>
                                        </div>
                                        <div className='product-count'>
                                            <div className='product-count__decrement'>-</div>
                                            <div className='product-count__quantity'>1</div>
                                            <div className='product-count__increment'>+</div>
                                        </div>
                                        <div className='product-total-cost'>{item.price} ₸</div>
                                        <div className='dashed-border'></div>
                                        <button className='product-delete__btn'><img src={deleteIcon} alt="delete_icon"/></button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default ShoppingCart