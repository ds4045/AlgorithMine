import { FC } from 'react';
import styles from './aboutUs.module.css';
import Contacts from '../personal_cabinet/contacts/Contacts';
import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import VideoPlayer from '../videoPlayer/VideoPlayer';
import { FormattedMessage } from 'react-intl';

const AboutUs: FC = () => {
  return (
    <div className={styles.layout}>
      <img
        className={styles.banner}
        src="https://s1.hostingkartinok.com/uploads/images/2023/04/daa71dd3a58e462739e3fac40ab45af0.jpg"
        alt="ALGORITHMINE.jpg"
      />
      <div className={styles.content}>
        <div className={styles.content_div}>
          <p>
            <FormattedMessage id="about_us.we" />
          </p>
          <p>
            <FormattedMessage id="about_us.we2" />
          </p>

          <div className={styles.history}>
            <div className={styles.Header_Wrapper}>
              <h2>
                <FormattedMessage id="about_us.history" />
              </h2>
            </div>

            <div className={styles.timeline_div}>
              <Timeline
                style={{ fontSize: '20px' }}
                mode="alternate"
                items={[
                  {
                    color: 'green',
                    label: '2017',
                    children: <FormattedMessage id="about_us.history_2017" />,
                    style: { left: 0, padding: 0 },
                  },
                  {
                    color: 'green',
                    label: '2018',
                    children: <FormattedMessage id="about_us.history_2018" />,
                  },
                  {
                    color: 'green',
                    label: '2019',
                    children: <FormattedMessage id="about_us.history_2019" />,
                  },
                  {
                    color: 'green',
                    label: '2020',
                    children: <FormattedMessage id="about_us.history_2020" />,
                  },
                  {
                    color: 'green',
                    label: '2021',
                    children: <FormattedMessage id="about_us.history_2021" />,
                  },
                  {
                    color: 'green',
                    label: '2022',
                    children: <FormattedMessage id="about_us.history_2022" />,
                  },
                  {
                    color: 'green',
                    label: '2023',
                    dot: <ClockCircleOutlined className="timeline-clock-icon" />,
                    children: <FormattedMessage id="about_us.history_2023" />,
                  },
                ]}
              />
            </div>
          </div>
          <div className={styles.wrapper_video}>
            <VideoPlayer videoId="186251146" width="800px" height="400px" autoplay />
          </div>
          <p>
            <FormattedMessage id="about_us.p1" />
          </p>
          <p>
            <FormattedMessage id="about_us.p2" />
          </p>
          <p>
            <FormattedMessage id="about_us.p3" />
          </p>
          <div className={styles.wrapper_div}>
            <ul>
              <li>
                <FormattedMessage id="about_us.li1" />
              </li>
              <li>
                <FormattedMessage id="about_us.li2" />
              </li>
              <li>
                <FormattedMessage id="about_us.li3" />
              </li>
              <li>
                <FormattedMessage id="about_us.li4" />
              </li>
              <li>
                <FormattedMessage id="about_us.li5" />
              </li>
              <li>
                <FormattedMessage id="about_us.li6" />
              </li>
            </ul>
          </div>
          <p>
            <FormattedMessage id="about_us.p4" />
          </p>
          <p>
            <FormattedMessage id="about_us.p5" />
          </p>
          <p>
            <FormattedMessage id="about_us.p6" />
          </p>
          <p>
            <FormattedMessage id="about_us.p7" />
          </p>
        </div>
      </div>
      <Contacts />
    </div>
  );
};

export default AboutUs;
