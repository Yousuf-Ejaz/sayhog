// import { createClient } from "@supabase/supabase-js";
// import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";

// function WorkersList() {
// 	const supabase = createClient(
// 		import.meta.env.VITE_SUPABASE_URL,
// 		import.meta.env.VITE_SUPABASE_KEY
// 	);
// 	const [workers, setWorkers] = useState([]);
// 	const jobList = useRef([]);
// 	const [filters, setFilters] = useState({
// 		availability: {
// 			hourly: false,
// 			partTime: false,
// 			fullTime: false,
// 		},

// 		payRate: [10, 100],
// 		date: [1, 29],
// 		skills: "",
// 		languages: "",
// 	});

// 	useEffect(() => {
// 		async function fetchWorkers() {
// 			let { data: workersData, error } = await supabase
// 				.from("workerProfile")
// 				.select("*");
// 			// .eq("type", `${filters.availability.hourly ? "hourly" : ""}`)
// 			// .eq("type", `${filters.availability.partTime ? "partTime" : ""}`)
// 			// .eq("type", `${filters.availability.fullTime ? "fullTime" : ""}`)

// 			// .gte("startDate", filters.date[0])
// 			// .lte("dueDate", filters.date[1])
// 			// .gte("hourlyRate_ll", filters.payRate[0])
// 			// .lte("hourlyRate_ul", filters.payRate[1]);
// 			// .like("skills", `%${filters.skills}%`)
// 			// .like("languages", `%${filters.languages}%`);

// 			if (error) {
// 				console.log(error);
// 			} else {
// 				setWorkers([...workersData]);

// 				console.log(workersData);
// 			}
// 		}
// 		fetchWorkers();
// 	}, [filters]);

// 	const handleAvailabilityChange = (event) => {
// 		const { name, checked } = event.target;
// 		setFilters((prevState) => ({
// 			...prevState,
// 			availability: {
// 				...prevState.availability,
// 				[name]: checked,
// 			},
// 		}));
// 	};

// 	const handleDateChange = (event, newValue) => {
// 		setFilters((prevState) => ({
// 			...prevState,
// 			date: newValue,
// 		}));
// 	};

// 	const handlePayRateChange = (event, newValue) => {
// 		setFilters((prevState) => ({
// 			...prevState,
// 			payRate: newValue,
// 		}));
// 	};

// 	const handleSkillsChange = (event) => {
// 		const { value } = event.target;
// 		setFilters((prevState) => ({
// 			...prevState,
// 			skills: value,
// 		}));
// 	};
// 	const handleLanguagesChange = (event) => {
// 		const { value } = event.target;
// 		setFilters((prevState) => ({
// 			...prevState,
// 			languages: value,
// 		}));
// 	};

// 	return (
// 		<div className="flex flex-row justify-between w-full">
// 			<div className="flex flex-col w-1/3 border-r border-gray-200 px-4 py-6">
// 				<h2 className="text-lg font-medium mb-4">Filters</h2>
// 				<div className="mb-4">
// 					<h3 className="text-md font-medium mb-2">Availability</h3>
// 					<label className="inline-flex items-center">
// 						<input
// 							type="checkbox"
// 							className="form-checkbox h-5 w-5 text-indigo-600"
// 							name="hourly"
// 							checked={filters.availability.hourly}
// 							onChange={handleAvailabilityChange}
// 						/>
// 						<span className="ml-2 text-sm">Hourly</span>
// 					</label>
// 					<label className="inline-flex items-center">
// 						<input
// 							type="checkbox"
// 							className="form-checkbox h-5 w-5 text-indigo-600"
// 							name="partTime"
// 							checked={filters.availability.partTime}
// 							onChange={handleAvailabilityChange}
// 						/>
// 						<span className="ml-2 text-sm">Part Time</span>
// 					</label>
// 					<label className="inline-flex items-center">
// 						<input
// 							type="checkbox"
// 							className="form-checkbox h-5 w-5 text-indigo-600"
// 							name="fullTime"
// 							checked={filters.availability.fullTime}
// 							onChange={handleAvailabilityChange}
// 						/>
// 						<span className="ml-2 text-sm">Full Time</span>
// 					</label>
// 				</div>
// 				<div className="mb-4">
// 					<h3 className="text-md font-medium mb-2">Date</h3>
// 					<input
// 						type="range"
// 						min="10"
// 						max="30"
// 						step="1"
// 						value={filters.date}
// 						onChange={handleDateChange}
// 					/>
// 					<p className="text-xs text-gray-500">
// 						{filters.date[0]} - {filters.date[1]}
// 					</p>
// 				</div>
// 				<div className="mb-4">
// 					<h3 className="text-md font-medium mb-2">Pay Rate</h3>
// 					<input
// 						type="range"
// 						min="10"
// 						max="100"
// 						step="1"
// 						value={filters.payRate}
// 						onChange={handlePayRateChange}
// 					/>
// 					<p className="text-xs text-gray-500">
// 						${filters.payRate[0]} - ${filters.payRate[1]}
// 					</p>
// 				</div>
// 				<div>
// 					<h3 className="text-md font-medium mb-2">Skills</h3>
// 					<input
// 						type="text"
// 						className="py-3 px-4 block w-full border-gray-200 border   rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
// 						value={filters.skills}
// 						onChange={handleSkillsChange}
// 					/>
// 				</div>
// 				<div>
// 					<h3 className="text-md font-medium mb-2">Languages</h3>
// 					<input
// 						type="text"
// 						className="py-3 px-4 block w-full border-gray-200 border   rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
// 						value={filters.languages}
// 						onChange={handleLanguagesChange}
// 					/>
// 				</div>
// 			</div>
// 			<div className="flex flex-col w-2/3 px-4 py-6">
// 				<h2 className="text-lg font-medium mb-4">Workers</h2>

// 				<div className="grid grid-cols-3 gap-4">
// 					{workers &&
// 						workers.map((worker) => {
// 							console.log(worker.email);
// 							return (
// 								<Link
// 									key={worker.id}
// 									className="border p-4 rounded-lg"
// 									to={`/worker/${worker.id}`}
// 								>
// 									<h3 className="text-md font-medium mb-2">
// 										{worker.id}
// 									</h3>
// 									<p className="text-sm text-gray-500">
// 										{worker.email}
// 									</p>
// 								</Link>
// 							);
// 						})}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default WorkersList;

import { createClient } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function WorkersList() {
	const supabase = createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_KEY
	);
	const [jobPosts, setJobPosts] = useState([]);
	const [workersData, setWorkersData] = useState([]);
	const [inputSkills, setInputSkills] = useState("Nanny");
	const [inputLanguage, setInputLanguage] = useState("Hindi");

	const handleSkillsChange = (event) => {
		setInputSkills(event.target.value);
	};
	const handleLanguageChange = (event) => {
		setInputLanguage(event.target.value);
	};

	const [filters, setFilters] = useState({
		availability: {
			hourly: false,
			partTime: false,
			fullTime: false,
		},

		payRate: [10, 100],
		date: [1, 29],
		skills: "",
		languages: "",
	});

	const [age_ll, setAge_ll] = useState(10);
	const [age_ul, setAge_ul] = useState(100);

	const handleAgeLLChange = (event) => {
		setAge_ll(event.target.value);
	};

	const handleAgeULChange = (event) => {
		setAge_ul(event.target.value);
	};
	const [type, setType] = useState("partTime");
	useEffect(() => {
		async function fetchWorkers() {
			let { data: workersData, error } = await supabase
				.from("workerProfile")
				.select("*");
			// .eq("type", `${filters.availability.hourly ? "hourly" : ""}`)
			// .eq("type", `${filters.availability.partTime ? "partTime" : ""}`)
			// .eq("type", `${filters.availability.fullTime ? "fullTime" : ""}`)

			// .gte("startDate", filters.date[0])
			// .lte("dueDate", filters.date[1])
			// .gte("hourlyRate_ll", filters.payRate[0])
			// .lte("hourlyRate_ul", filters.payRate[1]);
			// .like("skills", `%${filters.skills}%`)
			// .like("languages", `%${filters.languages}%`);

			if (error) {
				console.log(error);
			} else {
				console.log(workersData);
				let filteredData = workersData.filter(
					(obj) => obj.age > age_ll && obj.age < age_ul
				);
				console.log(inputSkills);

				filteredData = filteredData.filter((item) =>
					inputSkills
						.split(" ")
						.every((skill) => item.skills.includes(skill))
				);

				filteredData = filteredData.filter((item) =>
					inputLanguage
						.split(" ")
						.every((language) => item.languages.includes(language))
				);

				console.log(filteredData);
				// console.log(workersData);
				setWorkersData(filteredData);
			}
		}
		fetchWorkers();
	}, [filters, type, age_ll, age_ul, inputSkills, inputLanguage]);

	const handleDateChange = (event, newValue) => {
		setFilters((prevState) => ({
			...prevState,
			date: newValue,
		}));
	};

	// const handlePayRateChange = (event, newValue) => {
	// 	setFilters((prevState) => ({
	// 		...prevState,
	// 		payRate: newValue,
	// 	}));
	// };

	// const handleSkillsChange = (event) => {
	// 	const { value } = event.target;
	// 	setFilters((prevState) => ({
	// 		...prevState,
	// 		skills: value,
	// 	}));
	// };
	const handleLanguagesChange = (event) => {
		const { value } = event.target;
		setFilters((prevState) => ({
			...prevState,
			languages: value,
		}));
	};

	const handleTypeChange = (event) => {
		const newOption = event.target.value;
		setType(newOption === type ? null : newOption);
		console.log(newOption);
	};

	return (
		<div className="flex flex-col h-screen">
			<Header title="Search for Workers" />
			{/* ========== MAIN CONTENT ========== */}
			<Sidebar />
			{/* Content */}
			<div className="w-full lg:pl-72">
				<div className="flex flex-row justify-between w-full">
					<div className="flex flex-col w-1/3 border-r border-gray-200 px-4 py-6">
						<h2 className="text-lg font-medium mb-4">Filters</h2>
						<div className="mb-4">
							<h3 className="text-md font-medium mb-2">
								Availability
							</h3>

							<div className="grid sm:grid-cols-2 gap-2">
								<label
									htmlFor="partTime"
									className="flex p-3 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-border-[#FF5F01] focus:ring-border-[#FF5F01] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
								>
									<input
										type="radio"
										name="availability"
										className="shrink-0 mt-0.5 border-gray-200 rounded-full focus:ring-transparent text-[#FF5F01] pointer-events-none focus:outline-none focus:ring-border-[#FF5F01] dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-border-[#FF5F01] dark:checked:border-border-[#FF5F01] dark:focus:ring-offset-gray-800"
										id="partTime"
										value="partTime"
										checked={type === "partTime"}
										onChange={handleTypeChange}
									/>
									<span className="text-sm text-gray-500 ml-3 dark:text-gray-400">
										Part Time
									</span>
								</label>
								<label
									htmlFor="fullTime"
									className="flex p-3 w-full bg-white border border-gray-200 rounded-md text-sm focus:outline-none active:outline-none focus:border-border-[#FF5F01] focus:ring-border-[#FF5F01] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
								>
									<input
										type="radio"
										name="availability"
										className="shrink-0 mt-0.5 border-gray-200 rounded-full focus:ring-transparent text-[#FF5F01] pointer-events-none focus:outline-none focus:ring-border-[#FF5F01] dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-border-[#FF5F01] dark:checked:border-border-[#FF5F01] dark:focus:ring-offset-gray-800"
										id="fullTime"
										value="fullTime"
										checked={type === "fullTime"}
										onChange={handleTypeChange}
									/>
									<span className="text-sm text-gray-500 ml-3 dark:text-gray-400">
										Full Time
									</span>
								</label>
							</div>
						</div>
						{/* <div className="mb-4">
					<h3 className="text-md font-medium mb-2">Date</h3>
					<input
						type="range"
						min="10"
						max="30"
						step="1"
						value={filters.date}
						onChange={handleDateChange}
					/>
					<p className="text-xs text-gray-500">
						{filters.date[0]} - {filters.date[1]}
					</p>
				</div> */}
						<div className="mb-4">
							<h3 className="text-md font-medium mb-2">Age</h3>
							{/* <input
						type="range"
						min="10"
						max="100"
						step="1"
						value={filters.payRate}
						onChange={handlePayRateChange}
					/>
					<p className="text-xs text-gray-500">
						${filters.payRate[0]} - ${filters.payRate[1]}
					</p> */}
							{/* <div>
						<input
							type="range"
							id="payRate"
							name="payRate"
							min="10"
							max="100"
							step="5"
							value={payRate}
							onChange={handlePayRateChange}
						/>
						<p className="text-xs text-gray-500">
							${filters.payRate[0]} - ${filters.payRate[1]}
						</p>{" "}
					</div> */}
							<div className="flex flex-row gap-2">
								<input
									type="range"
									id="age_ll"
									name="age_ll"
									min="10"
									max={age_ul}
									step="3"
									value={age_ll}
									className="py-1 px-2 block w-full border-gray-200 border   rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
									onChange={handleAgeLLChange}
								/>
								<input
									type="range"
									id="age_ul"
									name="age_ul"
									min={age_ll}
									max="100"
									step="3"
									value={age_ul}
									className="py-1 px-2 block w-full border-gray-200 border   rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 "
									onChange={handleAgeULChange}
								/>
							</div>
							<p className="text-xs text-gray-500">
								{age_ll} - {age_ul}
							</p>{" "}
						</div>
						<div>
							<h3 className="text-md font-medium mb-2">Skills</h3>
							<input
								type="text"
								className="py-3 px-4 block w-full border-gray-200 border   rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
								value={inputSkills}
								onChange={handleSkillsChange}
							/>
						</div>
						<div>
							<h3 className="text-md font-medium mb-2">
								Languages
							</h3>
							<input
								type="text"
								className="py-3 px-4 block w-full border-gray-200 border   rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
								value={inputLanguage}
								onChange={handleLanguageChange}
							/>
						</div>
					</div>
					<div className="flex flex-col w-2/3 px-4 py-6 mx-10 overflow-y-auto">
						<h2 className="text-lg font-medium mb-4">
							Worker Profiles
						</h2>
						<div className="grid grid-cols-1 gap-4">
							{workersData &&
								workersData.map((worker) => {
									console.log(worker);
									return (
										<Link
											className="flex flex-col gap-3 border p-4 rounded-lg bg-white shadow-md"
											key={worker.id}
											to={`/worker/${worker.id}`}
										>
											<div className="flex flex-row gap-2 ">
												<img
													className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white dark:ring-gray-800"
													src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
													alt="Image Description"
												/>
												<div className="flex flex-col grow ">
													<div className="font-bold text-lg">
														{worker.name}
													</div>

													<div className="text-sm flex gap-1 text-gray-400 font-semibold">
														<div className="flex align-middle ">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
																stroke="currentColor"
																className="block w-4 h-4"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
																/>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
																/>
															</svg>
														</div>
														{worker.city},{" "}
														{worker.state}
													</div>
												</div>
												<div className="text-[#FF5F01] font-bold text-lg">
													Age: {worker.age}
												</div>
											</div>
											<div className="flex flex-row gap-2 justify-between border-b-2 border-gray-200  ">
												<div className="flex flex-row gap-2 ">
													<div className="font-bold text-sm text-gray-400 border-r-2 border-gray-200 pr-2">
														Rating{" "}
														<span className="text-[#FF5F01] font-bold">
															{worker.rating}
														</span>
													</div>
													<div className="font-bold text-sm text-gray-400">
														Bookings{" "}
														<span className="text-[#FF5F01] font-bold">
															{worker.bookings}
														</span>
													</div>
												</div>
												<div>
													{worker.type === "fullTime"
														? "Full Time"
														: "Part Time"}
												</div>
											</div>
											<div className="text-sm text-gray-700">
												{worker.description}
											</div>
											<div className="flex flex-row gap-2 justify-between ">
												<div className="bg-[#ff5e012a] text-[#ff5e01] px-5 py-2 rounded-md font-semibold text-sm">
													{worker.skills}
												</div>

												<button className="inline-flex justify-center items-center gap-x-3 text-center bg-[#FF5F01] hover:bg-[#FFB038] border border-transparent text-sm lg:text-base text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5F01] focus:ring-offset-2 focus:ring-offset-white transition py-1 px-4 dark:focus:ring-offset-gray-800">
													Send a Message
												</button>
											</div>
										</Link>
										// <Link
										// 	key={worker.id}
										// 	className="border p-4 rounded-lg"
										// 	to={`/worker/${worker.id}`}
										// >
										// 	<h3 className="text-md font-medium mb-2">
										// 		{worker.id}
										// 	</h3>
										// 	<p className="text-sm text-gray-500">
										// 		{worker.email}
										// 	</p>
										// </Link>
									);
								})}

							{/* {jobPosts &&
						jobPosts.map((jobPost) => (
							<div
								key={jobPost.id}
								className="border p-4 rounded-lg"
							>
								<h3 className="text-md font-medium mb-2">
									{jobPost.JobTitle}
								</h3>
								<p className="text-sm text-gray-500">
									{jobPost.JobDescription}
								</p>
							</div>
						))} */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WorkersList;
