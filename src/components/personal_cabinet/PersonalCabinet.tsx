import { useCurrentUser } from '../../hooks/useCurrentUser';
// import styles from './personal_cabinet.module.css';
import Menu from './Menu';
import Settings from './Settings';
import { ReactNode, useEffect, useState } from 'react';
import Orders from './Orders';
import Reviews from './Reviews';
export type ActualPageType = 'settings' | 'orders' | 'reviews';
const PersonalCabinet = () => {
  const me = useCurrentUser();
  const [actualPage, setActualPage] = useState<ActualPageType>('settings');
  const [renderPage, setRenderPage] = useState<ReactNode>(<Settings me={me} />);

  useEffect(() => {
    switch (actualPage) {
      case 'orders':
        setRenderPage(<Orders me={me} />);
        break;
      case 'reviews':
        setRenderPage(<Reviews me={me} />);
        break;
      case 'settings':
        setRenderPage(<Settings me={me} />);
        break;
      default:
        break;
    }
  }, [actualPage, me]);
  return (
    <>
      <Menu setActualPage={setActualPage} />
      {renderPage}
    </>
  );
};

export default PersonalCabinet;
