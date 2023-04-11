import { MenuProps } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

export const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link to="/catalog">
        <FormattedMessage id="header.catalog_asic" />
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link to="/">
        <FormattedMessage id="header.catalog_accessories" />
      </Link>
    ),
  },
  {
    key: '3',
    label: (
      <Link to="/">
        <FormattedMessage id="header.catalog_videocards" />
      </Link>
    ),
  },
];
