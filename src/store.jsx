import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
	userDetailsReducer,
	userLoginReducer,
	userOAuthLoginReducer,
	userSignUpReducer,
	userUpdateProfileReducer,
} from "./reducers/UserReducers";
import { createEmployerReducer, employerProfileReducer } from "./reducers/EmployerReducers";
import { createWorkerReducer, workerProfileReducer } from "./reducers/WorkerReducers";

const reducer = combineReducers({
	userLogin: userLoginReducer,
	userSignUp: userSignUpReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userOAuthLogin: userOAuthLoginReducer,
	createEmployer: createEmployerReducer,
	employerProfile: employerProfileReducer,
	createWorker: createWorkerReducer,
	workerProfile: workerProfileReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
	userSignUp: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
