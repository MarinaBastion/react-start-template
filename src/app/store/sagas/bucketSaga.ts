import { takeLatest, put, call, select, takeEvery } from 'redux-saga/effects';
import {deleteFromBucket, addToBucket,bucketListSelectors, ProductBucket } from '../bucket';
import { increase, countSelectors ,ItemCount} from '../count';
import { useSelector } from 'react-redux';



type BucketSelector = {
  products :ProductBucket[]
}

export function* handleDelete(action: any) { 
  const productCart = (yield select(bucketListSelectors.get)) as BucketSelector;
  let cp = productCart.products.find(c => c.id === action.payload.id)
  if (!(cp == undefined) ){
    yield put(deleteFromBucket(action.payload));
  }

}
export function* handleAdd(action: any) { 
  const productCart = (yield select(bucketListSelectors.get)) as BucketSelector;
  let cp = productCart.products.find(c => c.id === action.payload.id)
  if ( cp  ){
    yield put(increase(action.payload));

  }
  // else
  // {
  //  // yield put(addToBucket(action.payload));
  //   //yield put(increase(action.payload));
  // }

}
// Watcher saga
export function* bucketSaga() {
  // Listen for the loginUser action and call the handleLogin saga when dispatched
  yield takeLatest(deleteFromBucket.type, handleDelete);
  yield takeLatest(addToBucket.type, handleAdd);

}

export default bucketSaga;