import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from './slices/userSlice';


// Configuration for persisting the Redux state
const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["user"], // Specify which reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializability checks for Redux Persist
        }),
});

// Enable Redux Persist
export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;