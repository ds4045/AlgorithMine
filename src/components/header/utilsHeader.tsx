import { MenuProps } from 'antd';
import { FormattedMessage } from 'react-intl';

export const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        <FormattedMessage id="header.catalog_asic" />
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        <FormattedMessage id="header.catalog_accessories" />
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        <FormattedMessage id="header.catalog_videocards" />
      </a>
    ),
  },
];
