// reducers/index.js

import { combineReducers } from 'redux';
import authReducer from './auth';
import profile from './userProfile';
// 他のreducerがあればここにインポート

export default combineReducers({
  auth: authReducer,
  profile,
  // 他のreducerがあればここに追加
});
