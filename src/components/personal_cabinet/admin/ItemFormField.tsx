import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import styles from './admin.module.css';
import { Input } from 'antd';
import { FieldType } from '../../../types/types';

type ItemFormFieldProps = {
  field: string;
  onChangeHandlerField: (
    e: ChangeEvent<HTMLInputElement>,
    field: string,
    set: Dispatch<SetStateAction<FieldType[]>>,
  ) => void;
  error: boolean;
  value: string | number;
  type: string;
  required: boolean;
  set: Dispatch<SetStateAction<FieldType[]>>;
};

const ItemFormField: FC<ItemFormFieldProps> = ({
  type,
  field,
  value,
  onChangeHandlerField,
  error,
  required,
  set,
}) => {
  return (
    <div className={styles.inpWrapper}>
      <Input
        width={400}
        required={required}
        type={type}
        min={0}
        addonBefore={field}
        allowClear
        value={value}
        onChange={(e) => onChangeHandlerField(e, field, set)}
        status={required && !error ? 'error' : ''}
      />
      <label className={styles.label}>{required ? !error && 'Недоступное значение' : null}</label>
    </div>
  );
};

export default ItemFormField;
