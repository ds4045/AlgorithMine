import styles from './footer.module.css';
import { FaBitcoin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>©2023</span>
      <span className={styles.footer_span}>
        Made by
        <span className={styles.author}>ds4045</span>
        <FaBitcoin className={styles.footer_icon} />
      </span>
    </footer>
  );
};

export default Footer;
