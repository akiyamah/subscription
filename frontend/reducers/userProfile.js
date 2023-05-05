// （frontend/actions/userProfile.js）から状態情報を受け取り管理する。
// frontend/reducers/userProfile.js


import { 
  //プロフィール取得
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,

  //プロフィール更新
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
} from '../actions/types';

const initialState = {
  userId: [],
  user_profile: null,
  gender: [],
  purpose: [],
  hobby: [],
  occupation: [],
  annualIncome: [],
  prefecture: [],
  city: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        userId: payload.userId,
        user_profile: payload.user_profile,
        gender: payload.gender,
        purpose: payload.purpose,
        hobby: payload.hobby,
        occupation: payload.occupation,
        annualIncome: payload.annualIncome,
        prefecture: payload.prefecture,
        city: payload.city,
        loading: false,
      };
    case GET_PROFILE_ERROR:
      return {
        ...state,
        error: payload,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user_profile: payload,
        loading: false,
      };
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
