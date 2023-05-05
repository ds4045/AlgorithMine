import { FC } from 'react';
import styles from '../personal_cabinet.module.css';
import { Descriptions, Divider } from 'antd';
import { FormattedMessage } from 'react-intl';
import MapComponent from '../../UI/MapComponent';
import { ReactComponent as TelegramIcon } from '../../../assets/svg/telegram.svg';
import { ReactComponent as WhatsappIcon } from '../../../assets/svg/whatsapp.svg';

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
            <a href="https://www.whatsapp.com/" target="blank">
              <WhatsappIcon className={styles.contacts_icon} />
            </a>
          </Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id="pc.contacts.messengers" />}>
            <a href="https://telegram.org/" target="blank">
              <TelegramIcon className={styles.contacts_icon} />
            </a>
          </Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id="pc.contacts.email" />}>
            123@123.ru
          </Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id="pc.contacts.address" />}>
            <FormattedMessage id="pc.company_address" />
          </Descriptions.Item>
        </Descriptions>
        <MapComponent />
      </div>
    </div>
  );
};

export default Contacts;
