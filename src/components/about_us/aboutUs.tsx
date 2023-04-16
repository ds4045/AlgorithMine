import { Button } from 'antd';
import React from 'react';
// import styles from './aboutUs.module.css';
import { useNavigate } from 'react-router-dom';

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate('/')}>Back</Button>
    </>
  );
};

export default AboutUs;
