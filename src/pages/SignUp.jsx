import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";
import ErrorToast from "../components/ErrorToast";
import { useDispatch, useSelector } from "react-redux";
import { OAuthLogin, register } from "../actions/userActions";

function SignUp() {
	const [message, setMessage] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [category, setCategory] = useState("worker");

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const location = useLocation();

	const userSignUp = useSelector((state) => state.userSignUp);
	const { loading, error, userInfo } = userSignUp;

	const redirect = location.search ? location.search.split("=")[1] : "/";

	useEffect(() => {
		if (userInfo) {
			createUser();
			navigate(redirect);
		}
	}, [userInfo, redirect, navigate]);

	const supabase = createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_KEY
	);

	const createUser = () => {
		const createEmployer = async () => {
			const { error } = await supabase.from("EmployerProfile").insert([
				{
					email: userInfo.user.email,
					userId: userInfo.user.id,
				},
			]);
			if (error) setMessage(error.toString().split(":")[1]);
		};

		const createWorker = async () => {
			const { error } = await supabase.from("workerProfile").insert([
				{
					email: userInfo.user.email,
					userId: userInfo.user.id,
				},
			]);
			if (error) setMessage(error.toString().split(":")[1]);
		};

		if (category === "employer") createEmployer();
		else createWorker();
		console.log("created");
	};
	const oAuthClickHandler = async (e) => {
		e.preventDefault();

		dispatch(OAuthLogin());
	};

	const submitHandler = async (e) => {
		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
			setTimeout(() => setMessage(""), 5000);
			return;
		}
		e.preventDefault();
		dispatch(register(email, password));
	};

	return (
		<div className="h-screen">
			<div className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
				<div className="w-full max-w-md mx-auto p-6 ">
					<div className="my-auto bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700 ">
						<div className="p-4 sm:p-7">
							<div className="text-center">
								<h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
									Sign up
								</h1>
								<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
									Already have an account?&nbsp;
									<Link
										className="text-[#FFB038] decoration-2 hover:underline font-medium"
										to="/login"
									>
										Sign in here
									</Link>
								</p>
							</div>

							<div className="mt-5">
								<button
									type="button"
									className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:border  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#FFB038] transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
									onClick={oAuthClickHandler}
								>
									<svg
										className="w-4 h-auto"
										width="46"
										height="47"
										viewBox="0 0 46 47"
										fill="none"
									>
										<path
											d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
											fill="#4285F4"
										/>
										<path
											d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
											fill="#34A853"
										/>
										<path
											d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
											fill="#FBBC05"
										/>
										<path
											d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
											fill="#EB4335"
										/>
									</svg>
									Sign up with Google
								</button>

								<div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
									Or
								</div>
								{message && <ErrorToast error={message} />}

								<form onSubmit={submitHandler}>
									<div className="grid gap-y-4">
										<div>
											<label
												htmlFor="email"
												className="block text-sm mb-2 dark:text-white"
											>
												Email address
											</label>
											<div className="relative">
												<input
													type="email"
													id="email"
													name="email"
													className="py-3 px-4 block w-full border-gray-200 border   rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 "
													required
													aria-describedby="email-error"
													value={email}
													onChange={(e) =>
														setEmail(e.target.value)
													}
												/>
												<div className="hidden absolute inset-y-0 right-0  items-center pointer-events-none pr-3">
													<svg
														className="h-5 w-5 text-red-500"
														width="16"
														height="16"
														fill="currentColor"
														viewBox="0 0 16 16"
														aria-hidden="true"
													>
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
													</svg>
												</div>
											</div>
											<p
												className="hidden text-xs text-red-600 mt-2"
												id="email-error"
											>
												Please include a valid email
												address so we can get back to
												you
											</p>
										</div>

										<div>
											<label
												htmlFor="password"
												className="block text-sm mb-2 dark:text-white"
											>
												Password
											</label>
											<div className="relative">
												<input
													type="password"
													id="password"
													name="password"
													className="py-3 px-4 block w-full border-gray-200 border   rounded-md text-sm  focus:border-[#FF5F01] focus:ring-[#FF5F01] focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
													required
													aria-describedby="password-error"
													value={password}
													onChange={(e) =>
														setPassword(
															e.target.value
														)
													}
												/>
												<div className="hidden absolute inset-y-0 right-0  items-center pointer-events-none pr-3">
													<svg
														className="h-5 w-5 text-red-500"
														width="16"
														height="16"
														fill="currentColor"
														viewBox="0 0 16 16"
														aria-hidden="true"
													>
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
													</svg>
												</div>
											</div>
											<p
												className="hidden text-xs text-red-600 mt-2"
												id="password-error"
											>
												8+ characters required
											</p>
										</div>

										<div>
											<label
												htmlFor="confirm-password"
												className="block text-sm mb-2  dark:text-white"
											>
												Confirm Password
											</label>
											<div className="relative">
												<input
													type="password"
													id="confirm-password"
													name="confirm-password"
													className="py-3 px-4 block w-full border-gray-200 border   rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
													required
													aria-describedby="confirm-password-error"
													value={confirmPassword}
													onChange={(e) =>
														setConfirmPassword(
															e.target.value
														)
													}
												/>
												<div className="hidden absolute inset-y-0 right-0  items-center pointer-events-none pr-3">
													<svg
														className="h-5 w-5 text-red-500"
														width="16"
														height="16"
														fill="currentColor"
														viewBox="0 0 16 16"
														aria-hidden="true"
													>
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
													</svg>
												</div>
											</div>
											<p
												className="hidden text-xs text-red-600 mt-2"
												id="confirm-password-error"
											>
												Password does not match the
												password
											</p>
										</div>

										<div className="grid sm:grid-cols-2 gap-2">
											<label
												htmlFor="hs-radio-in-form"
												className="flex p-3  w-full bg-white border border-gray-200 rounded-md text-sm focus:border-border-[#FF5F01] focus:ring-border-[#FF5F01] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 "
											>
												<input
													type="radio"
													name="hs-radio-in-form"
													className="shrink-0 mt-0.5 border-gray-200 rounded-full focus:ring-transparent text-[#FF5F01] pointer-events-none focus:outline-none focus:ring-border-[#FF5F01] dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-border-[#FF5F01] dark:checked:border-border-[#FF5F01] dark:focus:ring-offset-gray-800"
													id="hs-radio-in-form"
													defaultChecked="true"
													value={category}
													onChange={(e) =>
														setCategory("worker")
													}
												/>
												<span className="text-sm text-gray-500 ml-3 dark:text-gray-400">
													Worker
												</span>
											</label>
											<label
												htmlFor="hs-radio-checked-in-form"
												className="flex p-3  w-full bg-white border border-gray-200 rounded-md text-sm focus:outline-none active:outline-none focus:border-border-[#FF5F01] focus:ring-border-[#FF5F01] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
											>
												<input
													type="radio"
													name="hs-radio-in-form"
													className="shrink-0 mt-0.5 border-gray-200 rounded-full focus:ring-transparent text-[#FF5F01] pointer-events-none focus:outline-none focus:ring-border-[#FF5F01] dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-border-[#FF5F01] dark:checked:border-border-[#FF5F01] dark:focus:ring-offset-gray-800"
													id="hs-radio-checked-in-form"
													defaultChecked=""
													value={category}
													onChange={(e) =>
														setCategory("employer")
													}
												/>
												<span className="text-sm text-gray-500 ml-3 dark:text-gray-400">
													Employer
												</span>
											</label>
										</div>

										<div className="flex items-center">
											<div className="flex">
												<input
													id="remember-me"
													name="remember-me"
													type="checkbox"
													className="shrink-0 mt-0.5 border-gray-200 rounded text-[#FFB038] pointer-events-none focus:ring-[#FF5F01] dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-[#FF5F01] dark:checked:border-[#FF5F01] dark:focus:ring-offset-gray-800"
												/>
											</div>
											<div className="ml-3">
												<label
													htmlFor="remember-me"
													className="text-sm dark:text-white"
												>
													I accept the{" "}
													<a
														className="text-[#FFB038] decoration-2 hover:underline font-medium"
														href="#"
													>
														Terms and Conditions
													</a>
												</label>
											</div>
										</div>
										<button
											type="submit"
											className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#FF5F01] text-white hover:bg-[#FFB038] focus:outline-none focus:ring-2 focus:ring-[#FF5F01] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
										>
											Sign up
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default SignUp;
