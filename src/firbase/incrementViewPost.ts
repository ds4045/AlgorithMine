import { PostType } from '../types/types';
import { updateForFirestore } from './firebaseAPI';

export const incrementViewPost = async (post: PostType) => {
  await updateForFirestore('posts', post.id, 'viewing', post.viewing + 1);
};
