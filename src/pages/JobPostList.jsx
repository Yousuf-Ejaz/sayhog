import { createClient } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function JobPostList() {
	const supabase = createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_KEY
	);
	const [jobPosts, setJobPosts] = useState([]);

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

	const [payRate_ll, setPayRateLL] = useState(10);
	const [payRate_ul, setPayRateUL] = useState(100);

	const handlePayRateLLChange = (event) => {
		setPayRateLL(event.target.value);
	};

	const handlePayRateULChange = (event) => {
		setPayRateUL(event.target.value);
	};
	const [type, setType] = useState("partTime");
	useEffect(() => {
		async function fetchJobPosts() {
			let { data: jobPostsData, error } = await supabase
				.from("jobPost")
				.select("*")
				.eq("type", type);
			// .in("skills", [filters.skills])
			// .in("languages", filters.languages);

			// .gte("startDate", filters.date[0])
			// .lte("dueDate", filters.date[1])
			// .gte("hourlyRate_ll", filters.payRate[0])
			// .lte("hourlyRate_ul", filters.payRate[1]);

			if (error) {
				console.log(error);
			} else {
				let filteredData = jobPostsData.filter(
					(obj) =>
						obj.hourlyRate_ll > payRate_ll &&
						obj.hourlyRate_ul < payRate_ul
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
				// console.log(jobPostsData);
				setJobPosts(filteredData);
			}
		}
		fetchJobPosts();
	}, [filters, type, payRate_ll, payRate_ul, inputSkills, inputLanguage]);

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
			<Header title={"Search Jobs"} />
			{/* ========== MAIN CONTENT ========== */}
			<Sidebar />
			{/* Content */}
			<div className="w-full lg:pl-72">
				{/* End Content */}
				{/* ========== END MAIN CONTENT ========== */}

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
							<h3 className="text-md font-medium mb-2">
								Pay Rate
							</h3>
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
									id="payRate_ll"
									name="payRate_ll"
									min="10"
									max={payRate_ul}
									className="py-1 px-2 block w-full border-gray-200 border   rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
									step="3"
									value={payRate_ll}
									onChange={handlePayRateLLChange}
								/>
								<input
									type="range"
									id="payRate_ul"
									name="payRate_ul"
									min={payRate_ll}
									className="py-1 px-2 block w-full border-gray-200 border   rounded-md text-sm focus:border-[#FF5F01] focus:ring-[#FF5F01] focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
									max="100"
									step="3"
									value={payRate_ul}
									onChange={handlePayRateULChange}
								/>
							</div>
							<p className="text-xs text-gray-500">
								₹{payRate_ll} - ₹{payRate_ul}
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
						<h2 className="text-lg font-medium mb-4">Job Posts</h2>

						<div className="grid grid-cols-1 gap-4 overflow-y-auto">
							{jobPosts &&
								jobPosts.map((job) => {
									console.log(job);
									return (
										<Link
											className="flex flex-col gap-2 border p-4 rounded-lg bg-white shadow-md "
											key={job.id}
											to={`/job/${job.id}`}
										>
											<div className="flex flex-row gap-2 flex-wrap content-center font-medium">
												<div className="flex content-center flex-wrap">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth={1.5}
														stroke="currentColor"
														className="w-4 h-4"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
														/>
													</svg>
												</div>
												{job.endTime} AM
											</div>
											<div className="text-xl font-extrabold flex justify-between">
												<div>{job.jobTitle}</div>
												<div className="text-lg font-medium font- text-[#FF5F01] ">
													₹{job.hourlyRate_ul}/hr
												</div>
											</div>
											<div className="text-sm flex gap-1 text-gray-400 font-semibold">
												<div className="flex content-center flex-wrap ">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth={1.5}
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
												{job.location}, {job.address}
											</div>
											<div className="text-sm text-gray-700">
												{job.jobDescription}
											</div>
											<div className=" flex border-b-2 border-gray-200 py-2 ">
												<div className="bg-[#ff5e012a] text-[#ff5e01] px-5 py-2 rounded-md font-semibold text-sm basis-5 ">
													{job.skills}
												</div>
											</div>
											<div className="flex flex-row gap-2 ">
												<img
													className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white dark:ring-gray-800"
													src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
													alt="Image Description"
												/>
												<div className="flex flex-col grow justify-between ">
													<div className="font-bold text-lg">
														{job.companyName}
													</div>
													<div className="text-sm text-gray-500">
														{job.type === "fullTime"
															? "Full Time"
															: "Part Time"}
													</div>
												</div>

												<button className="inline-flex justify-center items-center gap-x-3 text-center bg-[#FF5F01] hover:bg-[#FFB038] border border-transparent text-sm lg:text-base text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5F01] focus:ring-offset-2 focus:ring-offset-white transition py-1 px-4 dark:focus:ring-offset-gray-800">
													<a href="https://chatspot-prod.onrender.com/">
														Send a Message
													</a>
												</button>
											</div>
										</Link>
										// <Link
										// 	key={job.id}
										// 	className="border p-4 rounded-lg"
										// 	to={`/job/${job.id}`}
										// >
										// 	<h3 className="text-md font-medium mb-2">
										// 		{job.jobTitle}
										// 	</h3>
										// 	<p className="text-sm text-gray-500">
										// 		{job.jobDescription}
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

export default JobPostList;
