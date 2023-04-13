// import styles from './personal_cabinet.module.css';
import Menu from './Menu';
import Settings from './Settings';
import { FC, ReactNode, useEffect, useState } from 'react';
import Orders from './Orders';
import Reviews from './Reviews';
import { UserFirestoreDB } from '../../types/types';
import Favorites from './Favorites';
export type ActualPageType = 'settings' | 'orders' | 'reviews' | 'favorites';
type PersonalCabinetProps = {
  me: UserFirestoreDB | null;
};
const PersonalCabinet: FC<PersonalCabinetProps> = ({ me }) => {
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
      case 'favorites':
        setRenderPage(<Favorites me={me} />);
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
