import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { count } from './count';
import { token } from './token';
import { auth } from './auth';
import { bucketList } from './bucket';
import { sagas } from './sagas';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    count,
    token,
    auth,
    bucketList
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
