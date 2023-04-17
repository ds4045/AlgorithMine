import { Input, Radio, RadioChangeEvent } from 'antd';
import { Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import styles from '../carousel.module.css';
import { FormattedMessage } from 'react-intl';
import { QuizType } from '../../../types/types';

type QuestionProps = {
  title: ReactNode;
  variants: ReactNode[];
  setQuiz: Dispatch<SetStateAction<QuizType>>;
  answer: string;
};

const Question: FC<QuestionProps> = ({ title, variants, setQuiz, answer }) => {
  const [value, setValue] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    setInputValue('');
  };
  useEffect(() => {
    setQuiz((prev) => ({ ...prev, [answer]: inputValue ? inputValue : value }));
  }, [inputValue, setQuiz, answer, value]);
  return (
    <div className={styles.quiz_question}>
      <p className={styles.title_question}>{title}</p>
      <Radio.Group onChange={onChange} value={value} className={styles.radio_btn}>
        {variants.map((el, ind) => (
          <Radio defaultChecked key={ind} className={styles.radio_btn_checkbox} value={ind}>
            {el}
          </Radio>
        ))}
        <Radio value={variants.length} className={styles.radio_btn_checkbox}>
          <FormattedMessage id="quiz.question.your_choice" />
          {value === variants.length ? (
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={styles.inp_question}
            />
          ) : null}
        </Radio>
      </Radio.Group>
    </div>
  );
};

export default Question;
