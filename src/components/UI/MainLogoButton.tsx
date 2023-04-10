import React from 'react';
import styles from './main_logo_bottuon.module.css';

const MainLogoButton: React.FC = () => {
  return (
    <button data-text="Awesome" className={styles.button}>
      <span className="actual-text">&nbsp;imining&nbsp;</span>
      <span className={styles.hover_text} aria-hidden="true">
        &nbsp;imining&nbsp;
      </span>
    </button>
  );
};

export default MainLogoButton;
