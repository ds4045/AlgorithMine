import { FC, useState } from 'react';

import { Button, Modal } from 'antd';
import UserContactsInputs from './UserContactsInputs';
import { FormattedMessage } from 'react-intl';
import useAlert from '../../hooks/useAlert';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { validateName, validatePhoneNumber } from '../../helpers/validate';
import { useNavigate } from 'react-router-dom';
import { addOrderToDB } from '../../firbase/addOrderToDB';
import { AddedCartItems } from '../../redux/cartSlice';

type ConfirmOrderProps = {
  totalPrice: number;
  items: AddedCartItems[];
};
export type InputValueType = {
  phone: string;
  name: string;
};
export type InputErrorType = {
  phone: boolean;
  name: boolean;
};
const ConfirmOrder: FC<ConfirmOrderProps> = ({ totalPrice, items }) => {
  const navigate = useNavigate();
  const me = useAppSelector((state) => state.auth.login);
  const [alertSuccess, alertError, contextHolder] = useAlert();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [value, setValue] = useState<InputValueType>({
    phone: me?.phone ?? '',
    name: me?.name ?? '',
  });
  const dispatch = useAppDispatch();
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
      await addOrderToDB(
        me?.id ?? 'guest' + Date.now(),
        items,
        totalPrice,
        value.name,
        value.phone,
        dispatch,
        me ?? undefined,
      );
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
      navigate('/cart/success');
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
      <Button type="primary" onClick={showModal} disabled={!totalPrice}>
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
