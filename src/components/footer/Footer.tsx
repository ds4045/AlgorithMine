import { Divider } from 'antd';
import styles from './footer.module.css';
import { GithubOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <>
      <Divider />
      <footer className={styles.footer}>
        <span className={styles.year}>©2023</span>
        <span className={styles.footer_span}>
          Made by
          <span className={styles.author}>ds4045</span>
          <a href="https://github.com/ds4045" target="blank">
            <GithubOutlined className={styles.footer_icon} />
          </a>
        </span>
      </footer>
    </>
  );
};

export default Footer;
