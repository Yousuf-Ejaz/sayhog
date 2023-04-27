import { createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CreateJob from "../components/CreateJob";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../actions/userActions";
import { useLocation, useNavigate } from "react-router-dom";
import { getEmployerProfile } from "../actions/employerActions";
import { getWorkerProfile } from "../actions/workerActions";

function Homepage() {
	const supabase = createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_KEY
	);
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const location = useLocation();
	const navigate = useNavigate();

	const redirect = location.search ? location.search.split("=")[1] : "/";

	useEffect(() => {
		if (!userInfo) {
			navigate(redirect);
		}
	}, [userInfo, redirect, navigate]);

	return (
		<>
			<Header title={"Create Job Post"} />
			{/* ========== MAIN CONTENT ========== */}
			<Sidebar />
			{/* Content */}
			<div className="w-full lg:pl-72">
				<CreateJob />
			</div>
			{/* End Content */}
			{/* ========== END MAIN CONTENT ========== */}
		</>
	);
}
export default Homepage;
