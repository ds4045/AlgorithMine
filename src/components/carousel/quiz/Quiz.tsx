import React, { useState } from 'react';
import { Button, notification, Steps, theme } from 'antd';
import styles from '../carousel.module.css';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
import Question from './Question';
import UserContactsInputs from '../../cart/UserContactsInputs';
import { InputErrorType, InputValueType } from '../../cart/ConfirmOrder';
import { validateName, validatePhoneNumber } from '../../../helpers/validate';
import { useAppSelector } from '../../../redux/hooks';

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const me = useAppSelector((state) => state.auth.login);
  const [value, setValue] = useState<InputValueType>({
    phone: me?.phone ?? '',
    name: me?.name ?? '',
  });
  const [error, setError] = useState<InputErrorType>({
    phone: me?.phone ? validatePhoneNumber(me.phone) : false,
    name: me?.name ? validateName(me.name) : false,
  });
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
          <UserContactsInputs value={value} setValue={setValue} error={error} setError={setError} />
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
    marginTop: 16,
    height: 280,
  };
  const [api, contextHolder] = notification.useNotification();

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
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              <FormattedMessage id="quiz.next" />
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                if (error.name && error.phone) {
                  forStart();
                  openNotification();
                }
              }}
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
