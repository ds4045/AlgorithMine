import { Button, Input, Space } from 'antd';
import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { FieldsUserType } from '../../types/types';

export type InputFieldProps = {
  value: string;
  isLoading: boolean;
  onChangeHandler: any;
  changeFieldOnDB: any;
  type: FieldsUserType;
  intlId: string;
  placeholder: string;
};

const InputField: FC<InputFieldProps> = ({
  value,
  isLoading,
  onChangeHandler,
  changeFieldOnDB,
  placeholder,
  intlId,
  type,
}) => {
  const change = <FormattedMessage id="pc.btn_change" />;
  return (
    <Space.Compact>
      <Input
        addonBefore={<FormattedMessage id={intlId} />}
        value={value}
        onChange={(e) => onChangeHandler(e, type)}
        placeholder={placeholder}
        disabled={isLoading}
      />
      <Button type="primary" onClick={() => changeFieldOnDB(type)} loading={isLoading}>
        {change}
      </Button>
    </Space.Compact>
  );
};

export default InputField;
