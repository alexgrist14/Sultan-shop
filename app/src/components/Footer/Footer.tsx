import { ReactElement } from "react";
import FooterDescription from "./Description/Description";
import FooterNavigation from "./Navigation/Navigation";
import FooterDownloads from "./Downloads/Downloads";
import FooterContacts from "./Contacts/Contacts";
import styles from "./Footer.module.scss";

const Footer = (): ReactElement => {
  return (
    <footer className={styles.footer}>
      <FooterDescription />
      <div className={styles.links__container}>
        <FooterNavigation />
        <FooterDownloads />
        <FooterContacts />
      </div>
    </footer>
  );
};

export default Footer;
