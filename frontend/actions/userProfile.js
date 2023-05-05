// バックエンドとAPI通信する処理をコールして状態とリターンをreducerへ返す処理。
// frontend/actions/userProfile.js

// 連携するNext.jsのAPI
// frontend/pages/api/account/updateUserProfile.js
// frontend/pages/api/account/getUserProfile.js

// frontend/reducers/profile.js

import { 
  //認証チェック　
  SET_AUTH_LOADING, 
  REMOVE_AUTH_LOADING, 

  //プロフィール取得
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,

  //プロフィール更新
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
} from './types';


//プロフィール取得
export const getProfile = () => async (dispatch) => {
  dispatch({type: SET_AUTH_LOADING,})

  console.log('actions/profile.js getProfile called')

  try {
    const res = await fetch(`/api/account/getUserProfile`, { method: 'GET' });
    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: GET_PROFILE_ERROR,
        payload: { msg: 'プロフィール情報取得に失敗しました' },
      });
    }
  } catch (err) {
    dispatch({
      type: GET_PROFILE_ERROR,
      payload: { msg: 'プロフィール情報取得に失敗しました' },
    });
  }
  dispatch({type: REMOVE_AUTH_LOADING,})
}


// プロフィール更新
export const updateUserProfile = (userProfile) => async (dispatch) => {
  dispatch({ type: SET_AUTH_LOADING });

  console.log('actions/profile.js updateUserProfile called');

  // userProfileオブジェクトの内容をログに出力
  console.log('userProfile:', userProfile);

  try {
    const res = await fetch(`/api/account/updateUserProfile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userProfile),
    });
    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: userProfile,
      });
    } else {
      dispatch({
        type: UPDATE_PROFILE_ERROR,
        payload: { msg: 'プロフィール情報更新に失敗しました' },
      });
    }
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_ERROR,
      payload: { msg: 'プロフィール情報更新に失敗しました' },
    });
  }
  dispatch({ type: REMOVE_AUTH_LOADING });
};
