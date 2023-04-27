import {
	USER_LOGOUT,
	USER_LOGIN_FAILURE,
	USER_SIGNUP_REQUEST,
	USER_SIGNUP_SUCCESS,
	USER_SIGNUP_FAILURE,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAILURE,
	USER_DETAILS_FAILURE,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_REQUEST,
	USER_OAUTHLOGIN_REQUEST,
	USER_OAUTHLOGIN_SUCCESS,
	USER_OAUTHLOGIN_FAILURE,
} from "../constants/userConstants";
import { USER_LOGIN_SUCCESS } from "../constants/userConstants";
import { USER_LOGIN_REQUEST } from "../constants/userConstants";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_KEY
);

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) throw new Error(error.toString().split(":")[1]);

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		console.log(error);
		dispatch({
			type: USER_LOGIN_FAILURE,
			payload: error,
		});
	}
};
export const OAuthLogin = () => async (dispatch) => {
	try {
		dispatch({ type: USER_OAUTHLOGIN_REQUEST });
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
		});

		if (error) throw new Error(error.toString().split(":")[1]);

		dispatch({ type: USER_OAUTHLOGIN_SUCCESS, payload: data });

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		console.log(error);
		dispatch({
			type: USER_OAUTHLOGIN_FAILURE,
			payload: error,
		});
	}
};

export const logout = () => async (dispatch) => {
	localStorage.removeItem("userInfo");
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.toString().split(":")[1]);

	dispatch({ type: USER_LOGOUT });
};

export const register = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_SIGNUP_REQUEST });
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});
		if (error) throw new Error(error.toString().split(":")[1]);
		dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_SIGNUP_FAILURE,
			payload: error,
		});
	}
};
export const getUserDetails = () => async (dispatch) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST });

		const {
			data: { user },
		} = await supabase.auth.getUser();

		dispatch({ type: USER_DETAILS_SUCCESS, payload: user });
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
export const updateUserProfile = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

		const { data, error } = await supabase.auth.updateUser({
			email,
			password,
		});

		if (error) throw new Error(error.toString().split(":")[1]);

		dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAILURE,
			payload: error,
		});
	}
};
