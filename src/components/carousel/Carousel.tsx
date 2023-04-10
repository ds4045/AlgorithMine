import { Carousel as CarouselComponent, Button } from 'antd';
import styles from './carousel.module.css';
import { carouselData } from './utilsCarousel';

function Carousel() {
  return (
    <CarouselComponent autoplay>
      {carouselData.map((item, index) => (
        <div key={index} className={styles.wrapper}>
          <div className={styles.pos_absolute}>
            <h1>{item.title}</h1>
            <Button type="default" className={styles.pos_absolute_btn}>
              {item.button}
            </Button>
          </div>
          <div
            style={{ backgroundImage: `url(${item.image})` }}
            className={styles.carousel_image}
          />
        </div>
      ))}
    </CarouselComponent>
  );
}

export default Carousel;
