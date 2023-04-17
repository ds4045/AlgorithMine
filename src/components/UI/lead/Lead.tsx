import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { ConfigProvider, Input } from 'antd';
import styles from './lead.module.css';
import { InputErrorType, InputValueType } from '../../cart/ConfirmOrder';
import { FormattedMessage } from 'react-intl';
import { validateEmail, validateName, validatePhoneNumber } from '../../../helpers/validate';

type PhoneNumberInputType = {
  value: InputValueType;
  error: InputErrorType;
  setValue: Dispatch<SetStateAction<InputValueType>>;
  setError: Dispatch<SetStateAction<InputErrorType>>;
};

const UserContactsInputs: FC<PhoneNumberInputType> = ({ value, error, setError, setValue }) => {
  const onChangeHandlerPhone = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({ ...prev, phone: e.target.value }));
    setError((prev) => ({ ...prev, phone: validatePhoneNumber(e.target.value) }));
  };
  const onChangeHandlerName = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({ ...prev, name: e.target.value }));
    setError((prev) => ({ ...prev, name: validateName(e.target.value) }));
  };
  const onChangeHandlerEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({ ...prev, email: e.target.value }));
    setError((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'green',
        },
      }}>
      <div className={styles.request_wrapper}>
        <div className={styles.inpWrapper}>
          <Input
            addonBefore={<FormattedMessage id="cart.inp_phone" />}
            allowClear
            placeholder="+7(123)-456-78-90"
            value={value.phone}
            onChange={onChangeHandlerPhone}
            status={!error.phone ? 'error' : ''}
          />
          <label className={styles.label}>
            {!error.phone && <FormattedMessage id="cart.error_phone" />}
          </label>
        </div>
        <div className={styles.inpWrapper}>
          <Input
            addonBefore={<FormattedMessage id="cart.inp_email" />}
            allowClear
            placeholder="example@gmail.com"
            value={value.email}
            onChange={onChangeHandlerEmail}
            status={!error.email ? 'error' : ''}
          />
          <label className={styles.label}>
            {!error.email && <FormattedMessage id="cart.error_email" />}
          </label>
        </div>
        <div className={styles.inpWrapper}>
          <Input
            addonBefore={<FormattedMessage id="cart.inp_name" />}
            allowClear
            placeholder="..."
            value={value.name}
            onChange={onChangeHandlerName}
            status={!error.name ? 'error' : ''}
          />
          <label className={styles.label}>
            {!error.name && <FormattedMessage id="cart.error_name" />}
          </label>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default UserContactsInputs;
