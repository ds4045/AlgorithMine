import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle={<FormattedMessage id="not_found.text" />}
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          <FormattedMessage id="auth.btn_back" />
        </Button>
      }
    />
  );
};

export default NotFound;
