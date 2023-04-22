import { Button, Checkbox, Radio, Select } from 'antd';
import { ChangeEvent, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import styles from './admin.module.css';
import { FieldType, Item } from '../../../types/types';
import ItemFormField from './ItemFormField';
import { allMakers, validateSwitchFormItem } from '../../../helpers/validateSwitchFormItem';
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
  const [inStock, setInStock] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [valueSection, setValueSection] = useState('Asic');
  const [valueMaker, setValueMaker] = useState('WhatsMiner');
  const reqFields: FieldType[] = [
    {
      field: 'title',
      value: item?.title ?? '',
      type: 'string',
      error: validateSwitchFormItem('title', item?.title ?? ''),
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
    setValueSection(item?.section ?? 'Asic');
    setValueMaker(item?.maker ?? 'WhatsMiner');
    setInStock(item?.inStock ?? false);
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
  const submit = async () => {
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
      section: valueSection,
      maker: valueMaker,
      optional,
      id: item?.id ?? nanoid(),
      sku: item?.sku ?? randomSku(),
      inStock: item?.inStock ?? inStock,
      reviews: item?.reviews ?? [],
    };
    await addNewDataForDBWithId(newItem, 'items', setIsLoading, alertSuccess, alertError);
    setRequiredFields(reqFields);
    setOptionalFields(optFields);
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
      <div className={styles.section_radio}>
        Section:
        <Radio.Group onChange={(e) => setValueSection(e.target.value)} value={valueSection}>
          <Radio value={'Asic'}>Asic</Radio>
          <Radio value={'Accessories'}>Accessories</Radio>
          <Radio value={'GPU'}>GPU</Radio>
        </Radio.Group>
      </div>
      <Select
        className={styles.select_maker}
        value={valueMaker}
        onChange={(value) => setValueMaker(value)}
        options={allMakers}
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
        className={styles.btn_120}
        onClick={() => {
          setIsShowOptional((prev) => !prev);
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
      <Button
        className={styles.btn_120}
        onClick={submit}
        disabled={checkSubmit()}
        loading={isLoading}>
        {item?.title ? 'Изменить' : 'Создать'}
      </Button>
    </div>
  );
};

export default ItemForm;
