import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import ErrorToast from "./ErrorToast";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../actions/userActions";
import { getEmployerProfile } from "../actions/employerActions";
import { useNavigate } from "react-router-dom";

function CreateJob() {
	const supabase = createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_KEY
	);

	const [jobTitle, setJobTitle] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [address, setAddress] = useState("");
	const [jobDescription, setJobDescription] = useState("");
	const [jobLocation, setJobLocation] = useState("");
	const [jobType, setJobType] = useState("");
	const [hourlyRatell, setHourlyRatell] = useState("");
	const [hourlyRateul, setHourlyRateul] = useState("");
	const [startDate, setStartDate] = useState(
		new Date(Date.now()).toISOString().slice(0, 10)
	);
	const [endDate, setEndDate] = useState(
		new Date(Date.now()).toISOString().slice(0, 10)
	);
	const [startTime, setStartTime] = useState("00:00");
	const [endTime, setEndTime] = useState("00:00");
	const [skills, setSkills] = useState("");
	const [languages, setLanguages] = useState("");
	const [message, setMessage] = useState("");

	const [employer, setEmployer] = useState("");

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const employerProfile = useSelector((state) => state.employerProfile);
	const {
		loading: loadingEmployer,
		error: errorEmployer,
		user: EmployerData,
	} = employerProfile;

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const getUser = async () => {
		dispatch(getUserDetails());
		// console.log(userInfo.user.id);
		getUserProfile(userInfo.user.email);
	};

	const getUserProfile = async (email) => {
		const { data, error } = await supabase
			.from("EmployerProfile")
			.select("*")
			.eq("email", email);
		console.log(data);
		if (error) setMessage(error.toString().split(":")[1]);
		setEmployer(data);
		console.log(data[0].id);
	};

	useEffect(() => {
		getUser();
	}, []);

	const skillsArray = skills.split(",");
	skillsArray.forEach((skill) => skill.trim());
	const languagesArray = languages.split(",");
	languagesArray.forEach((language) => language.trim());

	const publishHandler = async (e) => {
		e.preventDefault();
		console.log(employer[0].id);
		console.log(jobType);

		const { data, error } = await supabase.from("jobPost").insert([
			{
				created_by: employer[0].id,
				location: jobLocation,
				address: address,
				jobTitle: jobTitle,
				companyName: companyName,
				jobDescription: jobDescription,
				type: jobType,
				skills: skillsArray,
				hourlyRate_ll: hourlyRatell,
				hourlyRate_ul: hourlyRateul,
				languages: languagesArray,
				startDate: startDate,
				dueDate: endDate,
				startTime: startTime,
				endTime: endTime,
			},
		]);
		if (error) setMessage(error.message);
		else console.log(data);

		navigate("/jobPostList");
	};

	return (
		<>
			{message && <ErrorToast error={message} />}
			{/* Hire Us */}
			<div className="max-w-[85rem] px-4  sm:px-6 lg:px-8  mx-auto">
				{/* Grid */}
				<div className="grid  items-center gap-12">
					{/* End Col */}
					<div className="relative">
						{/* Card */}
						<div className="flex flex-col  rounded-xl px-4 pb-4 sm:pb-6 lg:pb-10 sm:px-6 lg:px-10 ">
							<form onSubmit={publishHandler}>
								<div className="mt-6 grid gap-4 lg:gap-6">
									{/* Grid */}
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
										<div>
											<label
												htmlFor="hs-firstname-hire-us-1"
												className="block text-xs pb-2.5 text-gray-700 font-medium dark:text-white"
											>
												Job Title
											</label>
											<input
												type="text"
												name="hs-firstname-hire-us-1"
												id="hs-firstname-hire-us-1"
												className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
												value={jobTitle}
												onChange={(e) =>
													setJobTitle(e.target.value)
												}
											/>
										</div>
										<div>
											<label
												htmlFor="hs-lastname-hire-us-1"
												className="block text-xs pb-2.5 text-gray-700 font-medium dark:text-white"
											>
												Name of Company
											</label>
											<input
												type="text"
												name="hs-lastname-hire-us-1"
												id="hs-lastname-hire-us-1"
												className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
												value={companyName}
												onChange={(e) =>
													setCompanyName(
														e.target.value
													)
												}
											/>
										</div>
									</div>
									{/* End Grid */}
									{/* Grid */}
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
										<div>
											<label
												htmlFor="hs-firstname-hire-us-1"
												className="block text-xs pb-2.5 text-gray-700 font-medium dark:text-white"
											>
												Location
											</label>
											<input
												type="text"
												name="hs-firstname-hire-us-1"
												id="hs-firstname-hire-us-1"
												className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
												value={jobLocation}
												onChange={(e) =>
													setJobLocation(
														e.target.value
													)
												}
											/>
										</div>
										<div>
											<label
												htmlFor="hs-lastname-hire-us-1"
												className="block text-xs pb-2.5 text-gray-700 font-medium dark:text-white"
											>
												Address
											</label>
											<input
												type="text"
												name="hs-lastname-hire-us-1"
												id="hs-lastname-hire-us-1"
												className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
												value={address}
												onChange={(e) =>
													setAddress(e.target.value)
												}
											/>
										</div>
									</div>
									{/* End Grid */}
									{/* Grid */}
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
										<label
											htmlFor="hs-lastname-hire-us-1"
											className="block text-xs  text-gray-700 font-medium dark:text-white"
										>
											<span className="pb-2.5 inline-block">
												Type of Work
											</span>
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
														value={jobType}
														onChange={(e) =>
															setJobType(
																"partTime"
															)
														}
													/>
													<span className="text-sm text-gray-500 ml-3 dark:text-gray-400">
														Part Time
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
														value={jobType}
														onChange={(e) =>
															setJobType(
																"fullTime"
															)
														}
													/>
													<span className="text-sm text-gray-500 ml-3 dark:text-gray-400">
														Full Time
													</span>
												</label>
											</div>
										</label>
										<div>
											<label
												htmlFor="hs-lastname-hire-us-1"
												className="block text-xs  text-gray-700 font-medium dark:text-white"
											>
												<span className="pb-2.5 inline-block">
													Hourly Rate
												</span>
												<div className="grid sm:grid-cols-2 gap-2">
													<div>
														<input
															type="text"
															name="hs-lastname-hire-us-1"
															id="hs-lastname-hire-us-1"
															className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
															value={hourlyRatell}
															onChange={(e) =>
																setHourlyRatell(
																	e.target
																		.value
																)
															}
														/>
													</div>
													<div>
														<input
															type="text"
															name="hs-lastname-hire-us-1"
															id="hs-lastname-hire-us-1"
															className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
															value={hourlyRateul}
															onChange={(e) =>
																setHourlyRateul(
																	e.target
																		.value
																)
															}
														/>
													</div>
												</div>
											</label>
										</div>
									</div>
									{/* End Grid */}
									{/* Grid */}
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
										<div>
											<label
												htmlFor="hs-lastname-hire-us-1"
												className="block text-sm  text-[#FF5F01] font-semibold dark:text-white"
											>
												<span className="pb-0.5 inline-block">
													Date
												</span>
												<div className="grid sm:grid-cols-2 gap-2">
													<div>
														<label
															htmlFor="hs-lastname-hire-us-1"
															className="block text-xs  text-gray-700 font-medium dark:text-white"
														>
															<span className="pb-2.5 inline-block">
																Start Date
															</span>
															<input
																type="date"
																name="hs-lastname-hire-us-1"
																id="hs-lastname-hire-us-1"
																className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
																value={
																	startDate
																}
																onChange={(e) =>
																	setStartDate(
																		e.target
																			.value
																	)
																}
															/>
														</label>
													</div>
													<div>
														<label
															htmlFor="hs-lastname-hire-us-1"
															className="block text-xs pb-2.5 text-gray-700 font-medium dark:text-white"
														>
															<span className="pb-2.5 inline-block">
																End Date
															</span>
															<input
																type="date"
																name="hs-lastname-hire-us-1"
																id="hs-lastname-hire-us-1"
																className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
																value={endDate}
																onChange={(e) =>
																	setEndDate(
																		e.target
																			.value
																	)
																}
															/>
														</label>
													</div>
												</div>
											</label>
										</div>
										<div>
											<label
												htmlFor="hs-lastname-hire-us-1"
												className="block text-sm  text-[#FF5F01] font-semibold dark:text-white"
											>
												<span className="pb-0.5 inline-block">
													Time
												</span>
												<div className="grid sm:grid-cols-2 gap-2">
													<div>
														<label
															htmlFor="hs-lastname-hire-us-1"
															className="block text-xs  text-gray-700 font-medium dark:text-white"
														>
															<span className="pb-2.5 inline-block">
																Start Time
															</span>
															<input
																type="time"
																name="hs-lastname-hire-us-1"
																id="hs-lastname-hire-us-1"
																className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
																value={
																	startTime
																}
																onChange={(e) =>
																	setStartTime(
																		e.target
																			.value
																	)
																}
															/>
														</label>
													</div>
													<div>
														<label
															htmlFor="hs-lastname-hire-us-1"
															className="block text-xs  text-gray-700 font-medium dark:text-white"
														>
															<span className="pb-2.5 inline-block">
																End time
															</span>
															<input
																type="time"
																name="hs-lastname-hire-us-1"
																id="hs-lastname-hire-us-1"
																className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
																value={endTime}
																onChange={(e) =>
																	setEndTime(
																		e.target
																			.value
																	)
																}
															/>
														</label>
													</div>
												</div>
											</label>
										</div>
									</div>
									{/* End Grid */}
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
										<div>
											<label
												htmlFor="hs-work-email-hire-us-1"
												className="block text-xs pb-2.5 text-gray-700 font-medium dark:text-white"
											>
												Skills
											</label>
											<input
												type="text"
												name="hs-work-email-hire-us-1"
												id="hs-work-email-hire-us-1"
												autoComplete="email"
												className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
												value={skills}
												onChange={(e) =>
													setSkills(e.target.value)
												}
											/>
										</div>
										<div>
											<label
												htmlFor="hs-work-email-hire-us-1"
												className="block text-xs pb-2.5 text-gray-700 font-medium dark:text-white"
											>
												Languages
											</label>
											<input
												type="text"
												name="hs-work-email-hire-us-1"
												id="hs-work-email-hire-us-1"
												autoComplete="email"
												className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
												value={languages}
												onChange={(e) =>
													setLanguages(e.target.value)
												}
											/>
										</div>
									</div>

									<div>
										<label
											htmlFor="hs-about-hire-us-1"
											className="block text-xs pb-2.5 text-gray-700 font-medium dark:text-white"
										>
											Job Description
										</label>
										<textarea
											id="hs-about-hire-us-1"
											name="hs-about-hire-us-1"
											rows={4}
											className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
											value={jobDescription}
											onChange={(e) =>
												setJobDescription(
													e.target.value
												)
											}
										/>
									</div>
								</div>
								{/* End Grid */}
								{/* Checkbox */}
								<div className="mt-3 flex">
									<div className="flex">
										<input
											id="remember-me"
											name="remember-me"
											type="checkbox"
											className="shrink-0 mt-1.5 border-gray-200 rounded text-[#FF5F01] pointer-events-none focus:ring-[#FF5F01] dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-[#FF5F01] dark:checked:border-[#FF5F01] dark:focus:ring-offset-gray-800"
										/>
									</div>
									<div className="ml-3">
										<label
											htmlFor="remember-me"
											className="text-sm text-gray-600 dark:text-gray-400"
										>
											I agree to the Terms and Conditions
										</label>
									</div>
								</div>
								{/* End Checkbox */}
								<div className="mt-6 grid">
									<button
										type="submit"
										className="inline-flex justify-center items-center gap-x-3 text-center bg-[#FF5F01] hover:bg-[#FFB038] border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5F01] focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800"
									>
										Publish
									</button>
								</div>
							</form>
						</div>
						{/* End Card */}
					</div>
					{/* End Col */}
				</div>
				{/* End Grid */}
			</div>
			{/* End Hire Us */}
		</>
	);
}
export default CreateJob;
