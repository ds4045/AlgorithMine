import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PostType } from '../types/types';
export type AllPostsState = {
  posts: PostType[];
  searchedPosts: PostType[];
};
const initialState: AllPostsState = {
  posts: [],
  searchedPosts: [],
};

export const postsSlice = createSlice({
  name: 'allposts',
  initialState,
  reducers: {
    addPostToStore: (state, action: PayloadAction<PostType>) => {
      state.posts.push(action.payload);
      state.searchedPosts.push(action.payload);
    },
    pushAllPosts: (state, action: PayloadAction<Array<PostType>>) => {
      state.posts = action.payload;
      state.searchedPosts = action.payload;
    },
    searchPost: (state, action: PayloadAction<string>) => {
      state.searchedPosts = state.posts.filter((el) =>
        el.title.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
    sortPost: (state, action: PayloadAction<Array<PostType>>) => {
      state.searchedPosts = action.payload;
    },
    replacePost: (
      state,
      action: PayloadAction<{
        id: string;
        post: PostType;
      }>,
    ) => {
      state.posts = state.posts.map((el) =>
        el.id === action.payload.id ? action.payload.post : el,
      );
    },
  },
});

export const { addPostToStore, pushAllPosts, searchPost, sortPost, replacePost } =
  postsSlice.actions;
export default postsSlice.reducer;
