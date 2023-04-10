import React, { Dispatch, FC, SetStateAction } from 'react';
import styles from './toggle_color_themes.module.css';
type ToggleColorThemesProps = {
  setDarkThemes: Dispatch<SetStateAction<boolean>>;
};

const ToggleColorThemes: FC<ToggleColorThemesProps> = ({ setDarkThemes }) => {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        className={styles.input}
        onChange={() => setDarkThemes((prev) => !prev)}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleColorThemes;
