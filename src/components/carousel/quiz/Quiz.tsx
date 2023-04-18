import React, { useState } from 'react';
import { Button, notification, Steps, theme } from 'antd';
import styles from '../carousel.module.css';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
import Question from './Question';
import { InputErrorType, InputValueType } from '../../cart/ConfirmOrder';
import { validateEmail, validateName, validatePhoneNumber } from '../../../helpers/validate';
import { useAppSelector } from '../../../redux/hooks';
import { addLeadToDB } from '../../../firbase/addLeadToDB';
import { QuizType } from '../../../types/types';
import Lead from '../../UI/lead/Lead';

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [quiz, setQuiz] = useState<QuizType>({
    answer1: 0,
    answer2: 0,
    answer3: 0,
  });
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
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
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const forStart = () => {
    setCurrent(0);
  };
  const steps = [
    {
      title: '1/4',
      content: (
        <Question
          setQuiz={setQuiz}
          answer="answer1"
          title={<FormattedMessage id="quiz.question1" />}
          variants={[
            <FormattedMessage id="quiz.question1.answer1" />,
            <FormattedMessage id="quiz.question1.answer2" />,
            <FormattedMessage id="quiz.question1.answer3" />,
          ]}
        />
      ),
    },
    {
      title: '2/4',
      content: (
        <Question
          answer="answer2"
          setQuiz={setQuiz}
          title={<FormattedMessage id="quiz.question2" />}
          variants={[
            <FormattedMessage id="quiz.question2.answer1" />,
            <FormattedMessage id="quiz.question2.answer2" />,
            <FormattedMessage id="quiz.question2.answer3" />,
          ]}
        />
      ),
    },
    {
      title: '3/4',
      content: (
        <Question
          answer="answer3"
          setQuiz={setQuiz}
          title={<FormattedMessage id="quiz.question3" />}
          variants={[
            <FormattedMessage id="quiz.question3.answer1" />,
            <FormattedMessage id="quiz.question3.answer2" />,
          ]}
        />
      ),
    },
    {
      title: '4/4',
      content: (
        <div className={styles.send_request}>
          <p className={styles.send_request_text}>{<FormattedMessage id="quiz.question4" />}</p>
          <Lead value={value} setValue={setValue} error={error} setError={setError} />
        </div>
      ),
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    height: 350,
  };
  const [api, contextHolder] = notification.useNotification();
  const submitHandler = async () => {
    if (error.name && error.phone) {
      setIsLoading(true);
      await addLeadToDB(value.phone, value.email, value.name, quiz);
      setIsLoading(false);
      forStart();
      openNotification();
      setValue(initialStateValue);
      setError(initialStateError);
    }
  };
  const openNotification = () => {
    api.open({
      message: <FormattedMessage id="quiz.promo" />,
      description: 'new10',
      icon: <SmileOutlined className={styles.btn_promo_icon} />,
    });
  };

  return (
    <div className={styles.quiz_wrapper}>
      {contextHolder}
      <div className={styles.quiz_inner}>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div className={styles.btn_group}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              <FormattedMessage id="quiz.next" />
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              loading={isLoading}
              type="primary"
              onClick={submitHandler}
              className={styles.btn_quiz}>
              <FormattedMessage id="quiz.done" />
            </Button>
          )}
          {current > 0 && (
            <Button className={styles.btn_quiz} onClick={() => prev()}>
              <FormattedMessage id="quiz.prev" />
            </Button>
          )}
          <Button className={styles.btn_quiz} onClick={() => navigate(-1)}>
            <FormattedMessage id="auth.btn_back" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
