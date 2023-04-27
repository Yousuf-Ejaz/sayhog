import {
	EMPLOYER_CREATE_FAILURE,
	EMPLOYER_CREATE_REQUEST,
	EMPLOYER_CREATE_SUCCESS,
	EMPLOYER_PROFILE_FAILURE,
	EMPLOYER_PROFILE_REQUEST,
	EMPLOYER_PROFILE_SUCCESS,
} from "../constants/employerConstants";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_KEY
);

export const createEmployer = (email, userId) => async (dispatch) => {
	try {
		dispatch({ type: EMPLOYER_CREATE_REQUEST });
		const { error } = await supabase.from("EmployerProfile").insert([
			{
				email,
				userId,
			},
		]);
		if (error) throw new Error(error.toString().split(":")[1]);

		const { data, error: getDataError } = await supabase
			.from("EmployerProfile")
			.select("*")
			.eq("email", email);
      
		if (getDataError)
			throw new Error(getDataError.toString().split(":")[1]);

		dispatch({ type: EMPLOYER_CREATE_SUCCESS, payload: data });
	} catch (error) {
		console.log(error);
		dispatch({
			type: EMPLOYER_CREATE_FAILURE,
			payload: error,
		});
	}
};
export const getEmployerProfile = (email) => async (dispatch) => {
	try {
		dispatch({ type: EMPLOYER_PROFILE_REQUEST });
		const { data, error } = await supabase
			.from("EmployerProfile")
			.select("*")
			.eq("email", email);
		if (error) throw new Error(error.toString().split(":")[1]);

		dispatch({ type: EMPLOYER_PROFILE_SUCCESS, payload: data });
	} catch (error) {
		console.log(error);
		dispatch({
			type: EMPLOYER_PROFILE_FAILURE,
			payload: error,
		});
	}
};
