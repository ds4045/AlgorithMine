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
  alertSuccess,
  alertError,
) => {
  let favorites;
  if (!user) alert('Something went wrong!');
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
  if (isAuth && user?.id) {
    if (user.favorites.some((el) => el.id === item.id) && alertError)
      return alertError(<FormattedMessage id="catalog.added_favorites_error" />);
    else {
      const resUpdate = await updateForFirestore('users', user.id, 'favorites', favorites);
      resUpdate &&
        alertSuccess &&
        alertSuccess(<FormattedMessage id="catalog.added_favorites_success" />);
      const resUsers = await fetchSingleUser(dispatch, user.id);
      return resUpdate && !!resUsers;
    }
  }
};
