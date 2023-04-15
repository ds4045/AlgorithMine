import { FC, useState } from 'react';

import { Button, Modal } from 'antd';
import UserContactsInputs from './UserContactsInputs';
import { FormattedMessage } from 'react-intl';
import useAlert from '../../hooks/useAlert';
import { useAppSelector } from '../../redux/hooks';
import { validateName, validatePhoneNumber } from '../../helpers/validate';

type ConfirmOrderProps = {
  totalPrice: number;
};
export type InputValueType = {
  phone: string;
  name: string;
};
export type InputErrorType = {
  phone: boolean;
  name: boolean;
};
const ConfirmOrder: FC<ConfirmOrderProps> = ({ totalPrice }) => {
  const me = useAppSelector((state) => state.auth.login);
  const [alertSuccess, alertError, contextHolder] = useAlert();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [value, setValue] = useState<InputValueType>({
    phone: me?.phone ?? '',
    name: me?.name ?? '',
  });

  const [error, setError] = useState<InputErrorType>({
    phone: me?.phone ? validatePhoneNumber(me.phone) : false,
    name: me?.name ? validateName(me.name) : false,
  });
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    if (error.name && error.phone) {
      setConfirmLoading(true);
      setTimeout(() => {
        setConfirmLoading(false);
        handleCancel();
        alertSuccess(<FormattedMessage id="cart.alert_success_order" />);
        setValue({
          name: '',
          phone: '',
        });
        setError({
          name: false,
          phone: false,
        });
      }, 1000);
    } else alertError(<FormattedMessage id="cart.alert_error_order" />);
  };

  const handleCancel = () => {
    setOpen(false);
    setValue({
      name: '',
      phone: '',
    });
    setError({
      name: false,
      phone: false,
    });
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showModal}>
        <FormattedMessage id="cart.order_now" />
      </Button>
      <Modal
        title={
          <span>
            <FormattedMessage id="cart.order_confirm" />
            {totalPrice}$
          </span>
        }
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <UserContactsInputs value={value} setValue={setValue} error={error} setError={setError} />
      </Modal>
    </>
  );
};

export default ConfirmOrder;
