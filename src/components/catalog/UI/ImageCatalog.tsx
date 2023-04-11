import { FC } from 'react';
import { Image } from 'antd';

type ImageCatalogProps = {
  visible: any;
  setVisible: any;
  images: string[];
};

const ImageCatalog: FC<ImageCatalogProps> = ({ visible, setVisible, images }) => {
  console.log(images);
  return (
    <>
      <Image
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

export default ImageCatalog;
