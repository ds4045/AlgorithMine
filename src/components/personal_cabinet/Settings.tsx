import { ChangeEvent, FC, useEffect, useState } from 'react';
import { FieldsUserType, UserTemplatesPCLoadingType } from '../../types/types';
import { updateForFirestoreDB } from '../../helpers/firestoreDBUsers';
import styles from './personal_cabinet.module.css';
import defaultImage from '../../assets/defaultImage.jpeg';
import useAlert from '../../hooks/useAlert';
import InputField from './InputField';
type SettingsProps = {
  me: any;
};

const Settings: FC<SettingsProps> = ({ me }) => {
  const [alertSuccess, alertError, contextHolder] = useAlert();
  const [isLoading, setIsLoading] = useState<UserTemplatesPCLoadingType>({
    image: false,
    name: false,
    surname: false,
    age: false,
    city: false,
    phone: false,
  });
  const [fields, setFields] = useState({
    image: '',
    name: '',
    surname: '',
    age: '',
    city: '',
    phone: '',
  });
  useEffect(() => {
    if (me?.id)
      setFields({
        image: me.image,
        name: me.name,
        surname: me.surname,
        age: me.age,
        city: me.city,
        phone: me.phone,
      });
  }, [me]);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, field: FieldsUserType) => {
    if (field === 'age') {
      const age = Number(e.target.value);
      age > 0 && setFields((prev) => ({ ...prev, age: age.toString() }));
    } else setFields((prev) => ({ ...prev, [field]: e.target.value }));
  };
  const changeFieldOnDB = (field: FieldsUserType) => {
    if (me?.id) {
      updateForFirestoreDB(me.id, field, fields[field], setIsLoading, alertSuccess, alertError);
    }
  };
  const inputs = [
    {
      type: 'image',
      intlId: 'pc.inp_image',
      placeholder: 'https://',
      value: fields.image,
      isLoading: isLoading.image,
    },
    {
      type: 'name',
      intlId: 'pc.inp_name',
      placeholder: '',
      value: fields.name,
      isLoading: isLoading.name,
    },
    {
      type: 'surname',
      intlId: 'pc.inp_surname',
      placeholder: '',
      value: fields.surname,
      isLoading: isLoading.surname,
    },
    {
      type: 'city',
      intlId: 'pc.inp_city',
      placeholder: '',
      value: fields.city,
      isLoading: isLoading.city,
    },

    {
      type: 'age',
      intlId: 'pc.inp_age',
      placeholder: '',
      value: fields.age,
      isLoading: isLoading.age,
    },
    {
      type: 'phone',
      intlId: 'pc.inp_phone',
      placeholder: '',
      value: fields.phone,
      isLoading: isLoading.phone,
    },
  ];

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <div className={styles.personal_data}>
        <h2 className={styles.title_email}>{me?.email}</h2>
        <img className={styles.img} src={me?.image || defaultImage} alt="" />
        <div className={styles.inp_wrapper}>
          {inputs.map((inp, ind) => (
            <InputField
              key={ind}
              value={inp.value}
              isLoading={inp.isLoading}
              onChangeHandler={onChangeHandler}
              changeFieldOnDB={changeFieldOnDB}
              placeholder={inp.placeholder}
              intlId={inp.intlId}
              type={inp.type as FieldsUserType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
