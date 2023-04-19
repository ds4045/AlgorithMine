import { Dispatch, FC, SetStateAction, useState } from 'react';
import Lead from '../UI/lead/Lead';
import { useAppSelector } from '../../redux/hooks';
import { validateEmail, validateName, validatePhoneNumber } from '../../helpers/validate';
import { InputErrorType, InputValueType } from '../cart/ConfirmOrder';
import { Modal } from 'antd';
import { FormattedMessage } from 'react-intl';
import { addLeadToDB } from '../../firbase/addLeadToDB';
type GetLeadProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
};

const GetLead: FC<GetLeadProps> = ({ isModalOpen, setIsModalOpen }) => {
  const me = useAppSelector((state) => state.auth.login);
  const initialStateValue = {
    phone: me?.phone ?? '',
    name: me?.name ?? '',
    email: me?.email ?? '',
  };
  const initialStateError = {
    phone: me?.phone ? validatePhoneNumber(me.phone) : false,
    name: me?.name ? validateName(me.name) : false,
    email: me?.email ? validateEmail(me.email) : false,
  };
  const [value, setValue] = useState<InputValueType>(initialStateValue);
  const [error, setError] = useState<InputErrorType>(initialStateError);
  const [isLoading, setIsLoading] = useState(false);
  const handleOk = async () => {
    if (error.name && error.phone && error.email) {
      setIsLoading(true);
      await addLeadToDB(value.phone, value.email, value.name);
      setIsLoading(false);
      setIsModalOpen(false);
      setValue(initialStateValue);
      setError(initialStateError);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} confirmLoading={isLoading}>
      <div>
        <p>
          <FormattedMessage id="app.get_lead" />
        </p>
        <Lead value={value} setValue={setValue} error={error} setError={setError} />
      </div>
    </Modal>
  );
};

export default GetLead;
