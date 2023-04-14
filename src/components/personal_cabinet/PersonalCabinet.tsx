import Menu from './Menu';
import Settings from './settings/Settings';
import { FC, ReactNode, useEffect, useState } from 'react';
import Orders from './orders/Orders';
import Reviews from './reviews/Reviews';
import { UserFirestoreDB } from '../../types/types';
import Favorites from './favorites/Favorites';
import Contacts from './contacts/Contacts';
export type ActualPageType = 'settings' | 'orders' | 'reviews' | 'favorites' | 'contacts';
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
      case 'contacts':
        setRenderPage(<Contacts me={me} />);
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
