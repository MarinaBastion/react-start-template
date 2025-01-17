import {  AnyAction,configureStore, ThunkAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { count } from './count';
import { token } from './token';
import { auth } from './auth';
import { bucketList } from './bucket';
import { sagas } from './sagas';
//import { register, registerSlice } from "./register"
import { serverApi } from "../features/api/ServerApi"
import { setupListeners } from '@reduxjs/toolkit/query';
import {thunk,withExtraArgument} from 'redux-thunk';
import {registerThunk} from "./registerThunk"
import {profileThunk} from "./profileThunk"
import { rtkQueryErrorLogger } from './middleware/errorMiddleware';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    count,
    token,
    auth,
    bucketList,
    registerThunk,
    profileThunk,
    [serverApi.reducerPath]: serverApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk:{extraArgument:{url: 'http://19429ba06ff2.vps.myjino.ru/api/',
    version: '1',}}}).concat(sagaMiddleware).concat(serverApi.middleware).concat(rtkQueryErrorLogger),
});

sagaMiddleware.run(sagas);
setupListeners(store.dispatch);
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ExtraParams = { url: string; version: string };
//export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, ExtraParams, AnyAction>;
