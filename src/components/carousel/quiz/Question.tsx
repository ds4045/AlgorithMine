import { Input, Radio, RadioChangeEvent } from 'antd';
import { FC, ReactNode, useState } from 'react';
import styles from '../carousel.module.css';
import { FormattedMessage } from 'react-intl';

type QuestionProps = {
  title: ReactNode;
  variants: ReactNode[];
};

const Question: FC<QuestionProps> = ({ title, variants }) => {
  const [value, setValue] = useState(0);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.quiz_question}>
      <p className={styles.title_question}>{title}</p>
      <Radio.Group onChange={onChange} value={value} className={styles.radio_btn}>
        {variants.map((el, ind) => (
          <Radio className={styles.radio_btn_checkbox} value={ind}>
            {el}
          </Radio>
        ))}
        <Radio value={variants.length} className={styles.radio_btn_checkbox}>
          <FormattedMessage id="quiz.question.your_choice" />
          {value === variants.length ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
        </Radio>
      </Radio.Group>
    </div>
  );
};

export default Question;
