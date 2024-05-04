import { configureStore } from "@reduxjs/toolkit";
import notebooksReducer from "./reducers/notebooks"

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, notebooksReducer);

export const store = configureStore({
    reducer: {
        notebooks: persistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store);