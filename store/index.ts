import {configureStore} from "@reduxjs/toolkit";

import statsByDayReducer from './slices/stats/statsByDaySlice';
import searchReducer from './slices/search/searchSlice';

export const store = configureStore({
    reducer: {
        statsByDayReducer,
        searchReducer
    }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
