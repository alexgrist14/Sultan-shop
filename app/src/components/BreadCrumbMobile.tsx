import {ReactElement} from "react";
import arrowIcon from "../assets/images/arrow_mobile.svg";
import {Link} from "react-router-dom";

const BreadCrumbMobile = (): ReactElement =>{
    return (
        <Link to="/" className='back-content'>
            <div className='back-btn'>
                <img src={arrowIcon} alt="arrow_icon"/>
            </div>
            <span>Назад</span>
        </Link>
    )
}

export default BreadCrumbMobile