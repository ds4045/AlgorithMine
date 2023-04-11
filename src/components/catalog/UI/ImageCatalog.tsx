import { FC } from 'react';
import { Image } from 'antd';

type ImageCatalogProps = {
  visible: any;
  setVisible: any;
};

const ImageCatalog: FC<ImageCatalogProps> = ({ visible, setVisible }) => {
  return (
    <>
      <Image
        preview={{ visible: false }}
        width={300}
        height={200}
        src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp"
        onClick={() => setVisible(true)}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
          <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
          <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default ImageCatalog;
