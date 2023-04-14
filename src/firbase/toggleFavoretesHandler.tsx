import { FormattedMessage } from 'react-intl';
import { updateForFirestore } from './firebaseAPI';
import { toggleFavoritesHandlerType } from '../types/types';
import { fetchSingleUser } from '../api/fetchUsers';

export const toggleFavoritesHandler: toggleFavoritesHandlerType = async (
  type,
  item,
  user,
  isAuth,
  dispatch,
  setIsLoading,
  alertError,
) => {
  let favorites;
  if (!user || !isAuth) return alertError(<FormattedMessage id="catalog.favorites.check_login" />);
  switch (type) {
    case 'add': {
      favorites = [...user.favorites, item];
      break;
    }
    case 'delete': {
      favorites = [...user.favorites.filter((el) => el.id !== item.id)];
      break;
    }
    default:
      return alert('Something went wrong!');
  }
  try {
    setIsLoading(true);
    await updateForFirestore('users', user.id, 'favorites', favorites);
    await fetchSingleUser(dispatch, user.id);
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
};
