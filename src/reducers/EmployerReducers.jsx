import {
	EMPLOYER_CREATE_FAILURE,
	EMPLOYER_CREATE_REQUEST,
	EMPLOYER_CREATE_SUCCESS,
	EMPLOYER_PROFILE_FAILURE,
	EMPLOYER_PROFILE_REQUEST,
	EMPLOYER_PROFILE_SUCCESS,
} from "../constants/employerConstants";

export const createEmployerReducer = (state = {}, action) => {
	switch (action.type) {
		case EMPLOYER_CREATE_REQUEST:
			return { loading: true };

		case EMPLOYER_CREATE_SUCCESS:
			return { loading: false, userInfo: action.payload };

		case EMPLOYER_CREATE_FAILURE:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
export const employerProfileReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case EMPLOYER_PROFILE_REQUEST:
			return { ...state, loading: true };

		case EMPLOYER_PROFILE_SUCCESS:
			return { loading: false, user: action.payload };

		case EMPLOYER_PROFILE_FAILURE:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
