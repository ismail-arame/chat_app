import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createFilter from "redux-persist-transform-filter";

// Slices
import userSlice from "./features/userSlice";

// Storage
// import storage from "redux-persist/lib/storage"; //doesn't work anymore instead use the code below
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import chatSlice from "./features/chatSlice";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// saveUserOnlyFilter
const saveUserOnlyFilter = createFilter("user", ["user"]);

// Persist Config
const persistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["user"],
  transforms: [saveUserOnlyFilter],
};

const rootReducer = combineReducers({
  user: userSlice,
  chat: chatSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ************************* Without PERSIST *************************
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userSlice from "./features/userSlice";

// const rootReducer = combineReducers({
//   user: userSlice,
// });

// export const store = configureStore({
//   reducer: rootReducer,
//   devTools: process.env.NODE_ENV !== "production",
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
