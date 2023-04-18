import React from 'react';
import styles from './main_logo_bottuon.module.css';
import { FormattedMessage } from 'react-intl';

const MainLogoButton: React.FC = () => {
  return (
    <button data-text="Awesome" className={styles.button}>
      <span className="actual-text">
        &nbsp;
        <FormattedMessage id="logo.algorithm" />
        &nbsp;
      </span>
      <span className={styles.hover_text} aria-hidden="true">
        &nbsp;
        <FormattedMessage id="logo.algorithm" />
        &nbsp;
      </span>
    </button>
  );
};

export default MainLogoButton;
