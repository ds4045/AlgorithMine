import { Button, Checkbox } from 'antd';
import { ChangeEvent, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import styles from './admin.module.css';
import { FieldType, Item } from '../../../types/types';
import ItemFormField from './ItemFormField';
import { validateSwitchFormItem } from '../../../helpers/validateSwitchFormItem';
import { nanoid } from 'nanoid';
import { randomSku } from '../../../helpers/randomSku';
import { addNewDataForDBWithId } from '../../../firbase/firebaseAPI';
type ItemFormProps = {
  item: Item | null;
  alertSuccess: (text: ReactNode) => void;
  alertError: (text: ReactNode) => void;
};

const ItemForm: FC<ItemFormProps> = ({ item, alertSuccess, alertError }) => {
  const [showOptional, setIsShowOptional] = useState(false);
  const [inStock, setInStock] = useState(item?.inStock ?? false);
  const [isLoading, setIsLoading] = useState(false);
  const reqFields: FieldType[] = [
    {
      field: 'title',
      value: item?.title ?? '',
      type: 'string',
      error: validateSwitchFormItem('title', item?.title ?? ''),
    },
    {
      field: 'maker',
      value: item?.maker ?? '',
      type: 'string',
      error: validateSwitchFormItem('maker', item?.maker ?? ''),
    },
    {
      field: 'section',
      value: item?.section ?? '',
      type: 'string',
      error: validateSwitchFormItem('section', item?.section ?? ''),
    },
    {
      field: 'images',
      value: item?.images[0] ?? '',
      type: 'string',
      error: validateSwitchFormItem('images', item?.images[0] ?? ''),
    },
    {
      field: 'description',
      value: item?.description ?? '',
      type: 'string',
      error: validateSwitchFormItem('description', item?.description ?? ''),
    },
    {
      field: 'descriptionRU',
      value: item?.descriptionRU ?? '',
      type: 'string',
      error: validateSwitchFormItem('descriptionRU', item?.descriptionRU ?? ''),
    },
    {
      field: 'price',
      value: item?.price ?? 0,
      type: 'number',
      error: validateSwitchFormItem('price', item?.price ?? 0),
    },
  ];
  const optFields: FieldType[] = [
    {
      field: 'hashrate',
      value: item?.optional?.hashrate ?? 0,
      type: 'number',
      error: validateSwitchFormItem('hashrate', item?.optional?.hashrate ?? 0),
    },
    {
      field: 'payback',
      value: item?.optional?.payback ?? 0,
      type: 'number',
      error: validateSwitchFormItem('payback', item?.optional?.profit ?? 0),
    },
    {
      field: 'profit',
      value: item?.optional?.profit ?? 0,
      type: 'number',
      error: validateSwitchFormItem('profit', item?.optional?.profit ?? 0),
    },
    {
      field: 'expenditure',
      value: item?.optional?.expenditure ?? 0,
      type: 'number',
      error: validateSwitchFormItem('expenditure', item?.optional?.expenditure ?? 0),
    },
    {
      field: 'currency',
      value: item?.optional?.currency ?? '',
      type: 'string',
      error: validateSwitchFormItem('currency', item?.optional?.currency ?? ''),
    },
  ];
  const [requiredFields, setRequiredFields] = useState(reqFields);
  const [optionalFields, setOptionalFields] = useState(optFields);
  useEffect(() => {
    setRequiredFields(reqFields);
    setOptionalFields(optFields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onChangeHandlerField = (
    e: ChangeEvent<HTMLInputElement>,
    field: string,
    set: Dispatch<SetStateAction<FieldType[]>>,
  ) => {
    set((prev) =>
      prev.map((el) =>
        el.field === field
          ? {
              field,
              value: e.target.value,
              type: el.type,
              error: validateSwitchFormItem(field, e.target.value),
            }
          : el,
      ),
    );
  };

  const checkSubmit = () => requiredFields.some((el) => !el.error);
  const submit = () => {
    if (checkSubmit()) {
      alertError('Заполните обязательные поля');
      return;
    }
    let required: any = {};
    for (let i = 0; i < requiredFields.length; i++) {
      if (requiredFields[i].field === 'images')
        required[requiredFields[i].field] = [requiredFields[i].value];
      else required[requiredFields[i].field] = requiredFields[i].value;
    }
    let optional: any = {};
    for (let i = 0; i < optionalFields.length; i++) {
      if (optionalFields[i].value) optional[optionalFields[i].field] = optionalFields[i].value;
    }
    const newItem: Item = {
      ...required,
      optional,
      id: item?.id ?? nanoid(),
      sku: item?.sku ?? randomSku(),
      inStock: item?.inStock ?? inStock,
      reviews: item?.reviews ?? [],
    };
    setRequiredFields(reqFields);
    setOptionalFields(optFields);
    addNewDataForDBWithId(newItem, 'items', setIsLoading, alertSuccess, alertError);
  };
  return (
    <div className={styles.request_wrapper}>
      <h4 className={styles.title}>
        {item?.title ? `Редактирование товара ${item.title}` : 'Создание нового товара'}
      </h4>
      inStock:
      <Checkbox
        className={styles.checkbox}
        checked={inStock}
        onChange={(e) => setInStock(e.target.checked)}
      />
      {requiredFields.map((el, ind) => (
        <ItemFormField
          key={ind}
          value={el.value}
          field={el.field}
          required
          error={el.error}
          type={el.type}
          onChangeHandlerField={onChangeHandlerField}
          set={setRequiredFields}
        />
      ))}
      <Button
        onClick={() => {
          setIsShowOptional(true);
        }}>
        Optional
      </Button>
      {showOptional &&
        optionalFields.map((el, ind) => (
          <ItemFormField
            set={setOptionalFields}
            key={ind}
            value={el.value}
            field={el.field}
            required={false}
            error={el.error}
            type={el.type}
            onChangeHandlerField={onChangeHandlerField}
          />
        ))}
      <Button onClick={submit} disabled={checkSubmit()} loading={isLoading}>
        Изменить
      </Button>
    </div>
  );
};

export default ItemForm;
