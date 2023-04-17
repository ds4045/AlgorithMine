import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styles from './button_scroll_up.module.css';

const ButtonScrollUp = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.scrollTo(0, 0);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {showButton && (
        <button className={styles.scroll_to_top} onClick={handleClick}>
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default ButtonScrollUp;
