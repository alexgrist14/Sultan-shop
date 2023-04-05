import {ReactElement} from "react";
import consultant from "../../assets/images/Consultant_picture.png";

const HeaderCallback = (): ReactElement => {
    return (
        <div className='header-actions__callback'>
            <div className='content'>
                <span className='number'>+7 (777) 490-00-91</span>
                <span className='schedule'>время работы: 9:00-20:00</span>
                <span className='order-callback'>Заказать звонок</span>
            </div>
            <div className='callback-img'>
                <img src={consultant} alt="consultant"/>
            </div>
        </div>
    )
}

export default HeaderCallback