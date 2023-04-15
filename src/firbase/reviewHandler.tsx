import { ReviewHandler, ReviewItemType } from '../types/types';
import { nanoid } from 'nanoid';
import { getCurrentDate } from '../helpers/getCurrentDate';
import { FormattedMessage } from 'react-intl';
import { updateForFirestore } from './firebaseAPI';
import { addReviewItem } from '../redux/itemsSlice';
import { addReviewUser } from '../redux/authSlice';
import { fetchSingleUser } from '../api/fetchUsers';
import { fetchSingleItem } from '../api/fetchItems';

export const reviewHandler: ReviewHandler = async (
  type,
  me,
  isAuth,
  itemID,
  reviews,
  reviewForm,
  setReviewForm,
  dispatch,
  setIsOpen,
  setIsLoading,
  alertSuccess,
  alertError,
  idReview,
) => {
  let resUser, resItem, allUserReviewsItemID;
  const review: ReviewItemType = {
    ...reviewForm,
    id: nanoid(),
    date: getCurrentDate(),
    author: me?.name || '',
    image:
      me?.image ||
      'https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.jpg',
  };
  setReviewForm({ rate: 0, value: '' });
  setIsOpen(false);

  if (!isAuth) {
    return alertError(<FormattedMessage id="catalog.reviews.check_login" />);
  }
  if (me?.reviews) allUserReviewsItemID = Object.keys(me.reviews);
  if (allUserReviewsItemID?.includes(itemID) && type === 'add') {
    return alertError(<FormattedMessage id="catalog.reviews.check_added" />);
  }
  if (!reviewForm.value.trim())
    return alertError(<FormattedMessage id="catalog.reviews.check_added_empty_string" />);

  let newAllItemReviews;
  let newAllUserReviews;
  switch (type) {
    case 'add': {
      newAllItemReviews = [...reviews, review];
      newAllUserReviews = { ...me?.reviews, [itemID]: review };
      break;
    }
    case 'delete': {
      newAllItemReviews = reviews.filter((el) => el.id !== idReview);
      newAllUserReviews = { ...me?.reviews };
      delete newAllUserReviews[itemID];
      break;
    }
    case 'change': {
      newAllItemReviews = reviews.map((el) => (el.id === idReview ? review : el));
      newAllUserReviews = { ...me?.reviews };
      newAllUserReviews[itemID] = review;
      break;
    }
    default:
      return;
  }
  resItem = await updateForFirestore(
    'items',
    itemID,
    'reviews',
    newAllItemReviews,
    setIsLoading,
    alertSuccess,
    alertError,
    'add_review',
  );
  if (me?.id) {
    resUser = await updateForFirestore(
      'users',
      me.id,
      'reviews',
      newAllUserReviews,
      setIsLoading,
      alertSuccess,
      alertError,
    );
  }
  if (resItem && resUser) {
    dispatch(
      addReviewItem({
        itemID,
        reviews: newAllItemReviews,
      }),
    );
    fetchSingleItem(dispatch, itemID);
    dispatch(addReviewUser(newAllUserReviews));
    fetchSingleUser(dispatch, me.id);
  }
};
