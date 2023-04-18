import React from 'react';
import styles from './main_logo_bottuon.module.css';

const MainLogoButton: React.FC = () => {
  return (
    <button data-text="Awesome" className={styles.button}>
      <span className="actual-text">&nbsp;ALGORITHMINE&nbsp;</span>
      <span className={styles.hover_text} aria-hidden="true">
        &nbsp;ALGORITHMINE&nbsp;
      </span>
    </button>
  );
};

export default MainLogoButton;
