import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function WorkerProfile() {
	const supabase = createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_KEY
	);
	const params = useParams();
	const [workerProfile, setWorkerProfile] = useState("");
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
	const getWorker = async () => {
		let { data: workerProfile, error } = await supabase
			.from("workerProfile")
			.select("*")
			.eq("id", params.id);
		setWorkerProfile([...workerProfile][0]);
	};
	useEffect(() => {
		getWorker();
	}, []);

	return (
		<div>
			<>
				<Header title={""} />
				{/* ========== MAIN CONTENT ========== */}
				<Sidebar />
				{/* Content */}
				<div className="w-full lg:pl-72 pb-10">
					<Link
						to="/workersList"
						className="flex items-center gap-2 "
					>
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
							{workerProfile && (
								<div className="flex flex-col gap-2">
									<div className="flex flex-row gap-2 ">
										<img
											className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white dark:ring-gray-800"
											src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
											alt="Image Description"
										/>
										<div className="flex flex-col grow ">
											<div className="font-bold text-lg">
												{workerProfile.name}
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
												{workerProfile.city},{" "}
												{workerProfile.state}
											</div>
										</div>
										<div className="text-[#FF5F01] font-light text-sm">
											<button className="inline-flex justify-center items-center gap-x-3 text-center bg-[#FF5F01] hover:bg-[#FFB038] border border-transparent text-sm lg:text-base text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5F01] focus:ring-offset-2 focus:ring-offset-white transition py-1 px-4 dark:focus:ring-offset-gray-800 font-light">
												Send a Message
											</button>
										</div>
									</div>
									<div className="flex flex-row gap-2 justify-between   ">
										<div className="flex flex-row gap-2 ">
											<div className="font-bold text-sm text-gray-400 border-r-2 border-gray-200 pr-2">
												Rating{" "}
												<span className="text-[#FF5F01] font-bold">
													{workerProfile.rating}
												</span>
											</div>
											<div className="font-bold text-sm text-gray-400">
												Bookings{" "}
												<span className="text-[#FF5F01] font-bold">
													{workerProfile.bookings}
												</span>
											</div>
										</div>
										<div className="text-gray-400 font-semibold">
											{workerProfile.type === "fullTime"
												? "Full Time"
												: "Part Time"}
										</div>
									</div>
									<div className="text-sm text-gray-700 py-8 border-b-2 border-gray-200 ">
										{workerProfile.description}
									</div>
									<div className="flex py-3 border-b-2 border-gray-200 gap-2 ">
										<div className="flex content-center flex-wrap">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-6 h-6 text-gray-400	"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
												/>
											</svg>
										</div>
										<div className="w-1/6 text-gray-400 flex content-center flex-wrap">
											Skills
										</div>
										<div className="bg-[#ff5e012a] text-[#ff5e01] px-5 py-1.5 rounded-md font-semibold text-sm">
											{workerProfile.skills}
										</div>
									</div>
									<div className="flex py-3 border-b-2 border-gray-200 gap-2">
										<div className="flex content-center flex-wrap ">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-6 h-6 text-gray-400"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
												/>
											</svg>
										</div>
										<div className="w-1/6 text-gray-400">
											Age
										</div>
										<div className=" font-semibold text-sm">
											{workerProfile.age}
										</div>
									</div>
									<div className="flex py-3 border-b-2 border-gray-200 gap-2 ">
										<div className="flex content-center flex-wrap">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-6 h-6 text-gray-400"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
												/>
											</svg>
										</div>
										<div className="w-1/6 text-gray-400">
											Languages
										</div>
										<div className=" font-semibold text-sm">
											{workerProfile.languages}
										</div>
									</div>
									<div className="flex py-3 border-b-2 border-gray-200  gap-2">
										<div className="flex content-center flex-wrap">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-6 h-6 text-gray-400"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
												/>
											</svg>
										</div>
										<div className="w-1/6 text-gray-400">
											Education
										</div>
										<div className=" font-semibold text-sm">
											{workerProfile.education}
										</div>
									</div>
									<div className="flex py-3 border-b-2 border-gray-200 gap-2">
										<div>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-6 h-6 text-gray-400"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
												/>
											</svg>
										</div>
										<div className="w-1/6 text-gray-400">
											Work
										</div>
										<div className=" font-semibold text-sm">
											{workerProfile.previousWork}
										</div>
									</div>
									<div className="flex py-3 gap-2 ">
										<div>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-6 h-6 text-gray-400"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
												/>
											</svg>
										</div>
										<div className="w-1/6 text-gray-400">
											Phone Number
										</div>
										<div className=" font-semibold text-sm">
											{workerProfile.phoneNumber}
										</div>
									</div>
								</div>
							)}
						</div>
						<div className="w-2/6"></div>
					</div>
				</div>
				{/* End Content */}
				{/* ========== END MAIN CONTENT ========== */}
			</>
		</div>
	);
}
export default WorkerProfile;
