import Menu from './Menu';
import Settings from './settings/Settings';
import { FC, ReactNode, useEffect, useState } from 'react';
import Orders from './orders/Orders';
import ReviewsPC from './reviews/ReviewsPC';
import { UserFirestoreDB } from '../../types/types';
import Favorites from './favorites/Favorites';
import Contacts from './contacts/Contacts';
import Admin from './admin/Admin';
export type ActualPageType = 'settings' | 'orders' | 'reviews' | 'favorites' | 'contacts' | 'admin';
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
        setRenderPage(<ReviewsPC me={me} />);
        break;
      case 'settings':
        setRenderPage(<Settings me={me} />);
        break;
      case 'favorites':
        setRenderPage(<Favorites me={me} />);
        break;
      case 'admin':
        if (me?.isAdmin) setRenderPage(<Admin me={me} />);
        break;
      case 'contacts':
        setRenderPage(<Contacts />);
        break;
      default:
        break;
    }
  }, [actualPage, me]);
  return (
    <>
      <Menu setActualPage={setActualPage} me={me} />
      {renderPage}
    </>
  );
};

export default PersonalCabinet;
