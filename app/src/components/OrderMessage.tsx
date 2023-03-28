import {FC} from "react";
import orderIcon from '../assets/images/order-icon.svg';
import closeIcon from '../assets/images/close_icon.svg';

interface OrderMessageProps{
    onClose: ()=> void;
    showOrderMessage: boolean,
}

const OrderMessage: FC<OrderMessageProps> = ({onClose,showOrderMessage})=>{
    return (
        <div className={`order-overlay ${showOrderMessage && 'active'}`}>
            <div className='order-modal'>
                <div className='order-modal__icon'><img src={orderIcon} alt="order_icon"/></div>
                <h2>Спасибо за заказ</h2>
                <p>Наш менеджер свяжется с вами в ближайшее время</p>
                <button className='close-btn' onClick={onClose}><img src={closeIcon} alt="close_icon"/></button>
            </div>
        </div>
    )
}

export default OrderMessage;