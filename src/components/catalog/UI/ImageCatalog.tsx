import { Dispatch, FC, SetStateAction, memo } from 'react';
import { Image } from 'antd';
import styles from '../catalog.module.css';
type ImageCatalogProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  images: string[];
};
const ImageCatalog: FC<ImageCatalogProps> = ({ visible, setVisible, images }) => {
  return (
    <>
      <Image
        className={styles.card_image}
        preview={{ visible: false }}
        width={300}
        height={200}
        src={images[0]}
        onClick={() => setVisible(true)}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
          {images.map((el, ind) => (
            <Image src={el} key={ind} />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default memo(ImageCatalog);
