import { FC } from 'react';
import styles from '../personal_cabinet.module.css';
import { Descriptions, Divider } from 'antd';
import { FormattedMessage } from 'react-intl';
import MapComponent from '../../UI/MapComponent';
import { ReactComponent as TelegramIcon } from '../../../assets/svg/telegram.svg';
import { ReactComponent as WhatsappIcon } from '../../../assets/svg/whatsapp.svg';
import { Link } from 'react-router-dom';

type ContactsProps = {};

const Contacts: FC<ContactsProps> = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.personal_data}>
        <Divider plain>
          <FormattedMessage id="pc.btn_contacts" />
        </Divider>
        <Descriptions title={<FormattedMessage id="pc.btn_our_contacts" />} layout="horizontal">
          <Descriptions.Item label={<FormattedMessage id="cart.phone" />}>
            1810000000
          </Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id="pc.contacts.messengers" />}>
            <Link to="https://www.whatsapp.com/" target="blank">
              <WhatsappIcon className={styles.contacts_icon} />
            </Link>
            <Link to="https://telegram.org/" target="blank">
              <TelegramIcon className={styles.contacts_icon} />
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id="pc.contacts.email" />}>
            123@123.ru
          </Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id="pc.contacts.address" />} span={5}>
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>
        <MapComponent />
      </div>
    </div>
  );
};

export default Contacts;
