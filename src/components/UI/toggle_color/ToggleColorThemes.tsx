import { Dispatch, FC, SetStateAction } from 'react';
import styles from './toggle_color_themes.module.css';
type ToggleColorThemesProps = {
  setDarkThemes: Dispatch<SetStateAction<boolean>>;
  darkThemes: boolean;
};

const ToggleColorThemes: FC<ToggleColorThemesProps> = ({ setDarkThemes, darkThemes }) => {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        className={styles.input}
        checked={darkThemes}
        onChange={() => setDarkThemes((prev) => !prev)}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleColorThemes;
