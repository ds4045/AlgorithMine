import { Carousel as CarouselComponent, Button } from 'antd';
import styles from './carousel.module.css';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

function Carousel() {
  const navigate = useNavigate();
  const carouselData = [
    {
      title: (
        <p className={styles.quiz_title} style={{ background: 'transparent' }}>
          <FormattedMessage id="carousel.delivery" />
        </p>
      ),
      image: 'https://www.jde.ru/img/mainimg/service_china.jpg',
      button: (
        <div onClick={() => navigate('/delivery')}>
          <FormattedMessage id="catalog.card.btn_more" />
        </div>
      ),
    },
    {
      title: (
        <p className={styles.quiz_title} style={{ background: 'transparent' }}>
          <FormattedMessage id="carousel.calculator" />
        </p>
      ),
      image: 'https://delen.ru/wp-content/uploads/2018/11/nutrennjaja-norma-rentabelnosti-jeto.jpg',
      button: (
        <div onClick={() => navigate('/calculator')}>
          <FormattedMessage id="carousel.btn_calc" />
        </div>
      ),
    },
    {
      title: (
        <p className={styles.quiz_title}>
          <FormattedMessage id="carousel.quiz" />
        </p>
      ),
      image:
        'https://phonoteka.org/uploads/posts/2021-05/1621568834_24-phonoteka_org-p-kviz-fon-30.jpg',
      button: (
        <div onClick={() => navigate('/quiz')}>
          <FormattedMessage id="carousel.btn_quiz" />
        </div>
      ),
    },
  ];
  return (
    <CarouselComponent autoplay>
      {carouselData.map((item, index) => (
        <div key={index} className={styles.wrapper}>
          <div className={styles.pos_absolute}>
            {item.title}
            <Button type="primary" className={styles.pos_absolute_btn}>
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
