import {
	WORKER_CREATE_FAILURE,
	WORKER_CREATE_REQUEST,
	WORKER_CREATE_SUCCESS,
  WORKER_PROFILE_FAILURE,
  WORKER_PROFILE_REQUEST,
  WORKER_PROFILE_SUCCESS,
} from "../constants/workerConstants";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_KEY
);

export const createWorker = (email, userId) => async (dispatch) => {
	try {
		dispatch({ type: WORKER_CREATE_REQUEST });
		const { error } = await supabase.from("workerProfile").insert([
			{
				email,
				userId,
			},
		]);
		if (error) throw new Error(error.toString().split(":")[1]);

		const { data, error: getDataError } = await supabase
			.from("workerProfile")
			.select("*")
			.eq("email", email);

		if (getDataError)
			throw new Error(getDataError.toString().split(":")[1]);
		dispatch({ type: WORKER_CREATE_SUCCESS, payload: data });
	} catch (error) {
		console.log(error);
		dispatch({
			type: WORKER_CREATE_FAILURE,
			payload: error,
		});
	}
};
export const getWorkerProfile = (email) => async (dispatch) => {
	try {
		dispatch({ type: WORKER_PROFILE_REQUEST });
		const { data, error } = await supabase
			.from("workerProfile")
			.select("*")
			.eq("email", email);
		if (error) throw new Error(error.toString().split(":")[1]);

		dispatch({ type: WORKER_PROFILE_SUCCESS, payload: data });
	} catch (error) {
		console.log(error);
		dispatch({
			type: WORKER_PROFILE_FAILURE,
			payload: error,
		});
	}
};
