import {
	USER_DETAILS_FAILURE,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_LOGIN_FAILURE,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_OAUTHLOGIN_FAILURE,
	USER_OAUTHLOGIN_REQUEST,
	USER_OAUTHLOGIN_SUCCESS,
	USER_SIGNUP_FAILURE,
	USER_SIGNUP_REQUEST,
	USER_SIGNUP_SUCCESS,
	USER_UPDATE_PROFILE_FAILURE,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

export const userSignUpReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_SIGNUP_REQUEST:
			return { loading: true };

		case USER_SIGNUP_SUCCESS:
			return { loading: false, userInfo: action.payload };

		case USER_SIGNUP_FAILURE:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
export const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return { ...state, loading: true };

		case USER_DETAILS_SUCCESS:
			return { loading: false, user: action.payload };

		case USER_DETAILS_FAILURE:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
export const userUpdateProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UPDATE_PROFILE_REQUEST:
			return { loading: true };

		case USER_UPDATE_PROFILE_SUCCESS:
			return { loading: false, userInfo: action.payload };

		case USER_UPDATE_PROFILE_FAILURE:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
export const userLoginReducer = (state = { userInfo: [] }, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };

		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };

		case USER_LOGIN_FAILURE:
			return { loading: false, error: action.payload };

		case USER_LOGOUT:
			return {};

		default:
			return state;
	}
};
export const userOAuthLoginReducer = (state = { userInfo: [] }, action) => {
	switch (action.type) {
		case USER_OAUTHLOGIN_REQUEST:
			return { loading: true };

		case USER_OAUTHLOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };

		case USER_OAUTHLOGIN_FAILURE:
			return { loading: false, error: action.payload };

		case USER_LOGOUT:
			return {};

		default:
			return state;
	}
};
