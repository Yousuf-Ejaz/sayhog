import {
	WORKER_CREATE_FAILURE,
	WORKER_CREATE_REQUEST,
	WORKER_CREATE_SUCCESS,
	WORKER_PROFILE_FAILURE,
	WORKER_PROFILE_REQUEST,
	WORKER_PROFILE_SUCCESS,
} from "../constants/workerConstants";

export const createWorkerReducer = (state = {}, action) => {
	switch (action.type) {
		case WORKER_CREATE_REQUEST:
			return { loading: true };

		case WORKER_CREATE_SUCCESS:
			return { loading: false, userInfo: action.payload };

		case WORKER_CREATE_FAILURE:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
export const workerProfileReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case WORKER_PROFILE_REQUEST:
			return { ...state, loading: true };

		case WORKER_PROFILE_SUCCESS:
			return { loading: false, user: action.payload };

		case WORKER_PROFILE_FAILURE:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
