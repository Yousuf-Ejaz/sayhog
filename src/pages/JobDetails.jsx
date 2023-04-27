import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function JobDetails() {
	const supabase = createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_KEY
	);
	const [jobDesc, setJobDesc] = useState("");
	const getJob = async () => {
		let { data: jobDetail, error } = await supabase
			.from("jobPost")
			.select("*")
			.eq("id", params.id);
		setJobDesc([...jobDetail][0]);
		console.log(jobDetail);
	};
	const [employerProfile, setEmployerProfile] = useState("");
	const getEmployer = async (id) => {
		let { data: EmployerProfile, error } = await supabase
			.from("EmployerProfile")
			.select("*")
			.eq("id", id);
		setEmployerProfile([...EmployerProfile][0]);
		console.log(employerProfile);
	};

	useEffect(() => {
		getJob();
		getEmployer(jobDesc.created_by);
	}, []);
	const params = useParams();

	function formatDate(date) {
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		const currentDate = new Date(date);
		const day = currentDate.getDate();
		const month = currentDate.getMonth();
		const year = currentDate.getFullYear();

		const formattedDate = `${day} ${months[month]} ${year}`;
		return formattedDate;
	}

	return (
		<>
			<Header title={""} />
			{/* ========== MAIN CONTENT ========== */}
			<Sidebar />
			{/* Content */}
			<div className="w-full lg:pl-72 pb-10">
				<Link to="/jobPostList" className="flex items-center gap-2 ">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
						/>
					</svg>
					Back
				</Link>
				<div className="mt-6 flex ">
					<div className="w-4/6 flex flex-col gap-2 border p-6 rounded-lg bg-white shadow-md">
						{jobDesc && (
							<div className="flex flex-col gap-2">
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
									{jobDesc.endTime} AM
								</div>
								<div className="text-xl font-extrabold flex justify-between">
									<div>{jobDesc.jobTitle}</div>
									<div className="text-lg font-medium font- text-[#FF5F01] ">
										₹{jobDesc.hourlyRate_ul}/hr
									</div>
								</div>
								<div className=" flex justify-between border-b-2 border-gray-400 py-2">
									<div className="text-gray-400 font-semibold">
										{jobDesc.companyName}
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
										{jobDesc.location}, {jobDesc.address}
									</div>
								</div>

								<div className="font-medium italic text-gray-400">
									JOB ID: {jobDesc.id}
								</div>
								<div className="font-medium">
									CREATED AT: {formatDate(jobDesc.created_at)}
								</div>
								<div className="text-base ">
									{jobDesc.jobDescription}
								</div>
								<div className="text-base text-gray-700 border-b-2 border-gray-400 py-2 ">
									Your Responsibilities:
									<br />
									One of the main responsibilities of an
									office cleaner is to clean and sanitize the
									office space. This includes tasks such as
									dusting, sweeping, mopping, vacuuming, and
									sanitizing surfaces like desks, chairs,
									floors, windows, and restrooms. They are
									also responsible for emptying and disposing
									of trash and recyclables in designated
									containers, ensuring proper waste
									segregation and following established
									recycling protocols.
									<br />
									The office cleaner takes care of restroom
									maintenance by cleaning and disinfecting
									restroom facilities. They restock supplies
									such as soap, toilet paper, and paper towels
									to ensure a hygienic and pleasant restroom
									environment for everyone. Additionally, they
									clean and polish furniture, fixtures, and
									equipment, removing smudges, stains, and
									marks to maintain a professional appearance
									throughout the office.
								</div>
								<div className="flex justify-between border-b-2 border-gray-400 py-2">
									<div className="font-medium flex flex-col gap-1">
										<div>Type of Job</div>
										<div>
											{jobDesc.type === "fullTime"
												? "Full Time"
												: "Part Time"}
										</div>
									</div>
									<div className="font-medium flex flex-col gap-1">
										<div>Skills</div>
										<div className="bg-[#ff5e012a] text-[#ff5e01] px-5 py-2 rounded-md font-semibold text-sm">
											{jobDesc.skills}
										</div>
									</div>
									<div className="font-medium flex flex-col gap-1">
										<div>Languages</div>
										<div>{jobDesc.languages}</div>
									</div>
								</div>
								<div className="flex justify-center gap-2 py-2">
									<button className="border py-1 px-3 rounded-lg bg-white shadow-md">
										Decline
									</button>
									<button className="py-1 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#FF5F01] text-white hover:bg-[#FFB038] focus:outline-none focus:ring-2 focus:ring-[#FF5F01] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
										Accept{" "}
									</button>
								</div>
								<Link
									to={`/employer/${employerProfile.id}`}
									className="text-sm text-gray-400 italic"
								>
									Created By: {jobDesc.created_by}
								</Link>
							</div>
						)}
					</div>
					<div className="w-2/6"></div>
				</div>
			</div>
			{/* End Content */}
			{/* ========== END MAIN CONTENT ========== */}
		</>
	);
}
export default JobDetails;
