import { FC, ReactNode, useState } from 'react';
import { validateSwitchFormItem } from '../../../helpers/validateSwitchFormItem';
import styles from './admin.module.css';
import { Button, Input, Radio } from 'antd';
import { nanoid } from 'nanoid';
import { getCurrentDate } from '../../../helpers/getCurrentDate';
import { addDataForDB } from '../../../firbase/firebaseAPI';
import { PostType } from '../../../types/types';

type PostFormProps = {
  alertSuccess: (text: ReactNode) => void;
  alertError: (text: ReactNode) => void;
};

const PostForm: FC<PostFormProps> = ({ alertSuccess, alertError }) => {
  const [valueRadio, setValueRadio] = useState<'post' | 'news'>('post');
  const initialState = {
    value: '',
    error: false,
  };
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(initialState);
  const [image, setImage] = useState(initialState);
  const [text, setText] = useState(initialState);
  const checkSubmit = () => title.error && image.error && text.error;
  const submit = async () => {
    if (!checkSubmit()) {
      alertError('Заполните обязательные поля');
      return;
    }
    try {
      setLoading(true);
      const newPost: PostType = {
        id: nanoid(),
        date: getCurrentDate(),
        like: [],
        viewing: 0,
        section: valueRadio,
        title: title.value,
        image: image.value,
        text: text.value,
      };
      await addDataForDB('posts', newPost);
      setTitle(initialState);
      setImage(initialState);
      setText(initialState);
      alertSuccess('Пост добавлен');
    } catch (err) {
      console.log(err);
      alertError('Ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.request_wrapper}>
      <h4 className={styles.title}>Новый пост</h4>
      <div className={styles.radio_btn}>
        section:
        <Radio.Group
          onChange={(e) => {
            setValueRadio(e.target.value);
          }}
          value={valueRadio}>
          <Radio value={'news'}>News</Radio>
          <Radio value={'post'}>Post</Radio>
        </Radio.Group>
      </div>
      <div className={styles.inpWrapper}>
        <Input
          width={400}
          required
          addonBefore="title"
          allowClear
          value={title.value}
          onChange={(e) => {
            setTitle({
              error: validateSwitchFormItem('title', e.target.value),
              value: e.target.value,
            });
          }}
          status={!title.error ? 'error' : ''}
        />
        <label className={styles.label}>{!title.error && 'Недоступное значение'}</label>
      </div>
      <div className={styles.inpWrapper}>
        <Input
          width={400}
          required
          addonBefore="image"
          allowClear
          value={image.value}
          onChange={(e) => {
            setImage({
              error: validateSwitchFormItem('image', e.target.value),
              value: e.target.value,
            });
          }}
          status={!image.error ? 'error' : ''}
        />
        <label className={styles.label}>{!image.error && 'Недоступное значение'}</label>
      </div>
      <div className={styles.inpWrapper}>
        <Input.TextArea
          allowClear
          required
          value={text.value}
          onChange={(e) => {
            setText({
              error: validateSwitchFormItem('text', e.target.value),
              value: e.target.value,
            });
          }}
          status={!text.error ? 'error' : ''}
          placeholder="text"
        />
        <label className={styles.label}>{!text.error && 'Недоступное значение'}</label>
      </div>
      <Button
        className={styles.btn_submit}
        onClick={submit}
        loading={loading}
        disabled={!checkSubmit()}>
        Создать пост
      </Button>
    </div>
  );
};

export default PostForm;
