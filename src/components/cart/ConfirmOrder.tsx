import { FC, useCallback, useMemo, useState } from 'react';

import { Button, Modal } from 'antd';
import { FormattedMessage } from 'react-intl';
import useAlert from '../../hooks/useAlert';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { validateEmail, validateName, validatePhoneNumber } from '../../helpers/validate';
import { useNavigate } from 'react-router-dom';
import { addOrderToDB } from '../../firbase/addOrderToDB';
import { AddedCartItems } from '../../redux/cartSlice';
import Lead from '../UI/lead/Lead';

type ConfirmOrderProps = {
  totalPrice: number;
  items: AddedCartItems[];
};
export type InputValueType = {
  phone: string;
  name: string;
  email: string;
};
export type InputErrorType = {
  phone: boolean;
  name: boolean;
  email: boolean;
};
const ConfirmOrder: FC<ConfirmOrderProps> = ({ totalPrice, items }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [alertSuccess, alertError, contextHolder] = useAlert();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const me = useAppSelector((state) => state.auth.login);
  const initialStateValue = useMemo(
    () => ({
      phone: me?.phone ?? '',
      name: me?.name ?? '',
      email: me?.email ?? '',
    }),
    [me?.email, me?.name, me?.phone],
  );
  const initialStateError = useMemo(
    () => ({
      phone: me?.phone ? validatePhoneNumber(me.phone) : false,
      name: me?.name ? validateName(me.name) : false,
      email: me?.email ? validateEmail(me.email) : false,
    }),
    [me?.email, me?.name, me?.phone],
  );
  const [value, setValue] = useState<InputValueType>(initialStateValue);
  const [error, setError] = useState<InputErrorType>(initialStateError);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = useCallback(() => {
    setOpen(false);
    setValue(initialStateValue);
    setError(initialStateError);
  }, [initialStateError, initialStateValue]);
  const handleOk = useCallback(async () => {
    if (error.name && error.phone && error.email) {
      setConfirmLoading(true);
      addOrderToDB(
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
      setValue(initialStateValue);
      setError(initialStateError);
      navigate('/cart/success');
    } else alertError(<FormattedMessage id="cart.alert_error_order" />);
  }, [
    alertError,
    alertSuccess,
    dispatch,
    error.email,
    error.name,
    error.phone,
    handleCancel,
    initialStateError,
    initialStateValue,
    items,
    me,
    navigate,
    totalPrice,
    value.name,
    value.phone,
  ]);

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
            {totalPrice}₽
          </span>
        }
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <Lead value={value} setValue={setValue} error={error} setError={setError} />
      </Modal>
    </>
  );
};

export default ConfirmOrder;
