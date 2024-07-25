import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../redux/auth/slice.js";
import userReducer from "../redux/users/slice.js";
import newsReducer from "../redux/blog/slice.js";
import faqReducer from "../redux/faq/slice.js";
import downloadReducer from "../redux/download/slice.js";
import typeReducer from "../redux/memos/type/slice.js";
import memoReducer from "../redux/memos/memo/slice.js";
import videoReducer from "../redux/video/slice.js";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {api} from "./operations.js";
import isRejectedErrorMiddleware from "../components/Utils/errorMiddleware.js";

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['tfa'],
};

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: persistReducer(authPersistConfig, authReducer),
        user: userReducer,
        news: newsReducer,
        faq: faqReducer,
        download: downloadReducer,
        type: typeReducer,
        memo: memoReducer,
        video: videoReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(api.middleware, isRejectedErrorMiddleware),
    devTools: true,
});

export const persistor = persistStore(store);
