import {ReactElement} from "react";
import FooterDescription from "./Description";
import FooterNavigation from "./Navigation";
import FooterDownloads from "./Downloads";
import FooterContacts from "./Contacts";

const Footer = (): ReactElement => {

    return (
        <footer className='footer'>
            <FooterDescription/>
            <div className='footer-links__container'>
                <FooterNavigation/>
                <FooterDownloads/>
                <FooterContacts/>
            </div>
        </footer>
    );
}

export default Footer