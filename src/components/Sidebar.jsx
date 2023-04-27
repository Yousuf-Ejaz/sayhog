import { Link } from "react-router-dom";
import brandImg from "/new_logo_sahyog.png";
function Sidebar() {
	return (
		<div>
			{/* Sidebar Toggle */}
			<div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
				<div className="flex items-center py-4">
					{/* Navigation Toggle */}
					<button
						type="button"
						className="text-gray-500 hover:text-gray-600"
						data-hs-overlay="#application-sidebar"
						aria-controls="application-sidebar"
						aria-label="Toggle navigation"
					>
						<span className="sr-only">Toggle Navigation</span>
						<svg
							className="w-5 h-5"
							width={20}
							height={20}
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
							/>
						</svg>
					</button>
					{/* End Navigation Toggle */}
					{/* Breadcrumb */}
					<ol
						className="ml-3 flex items-center whitespace-nowrap min-w-0"
						aria-label="Breadcrumb"
					>
						<li className="flex items-center text-sm text-gray-800 dark:text-gray-400">
							Application Layout
							<svg
								className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-400 dark:text-gray-600"
								width={20}
								height={20}
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
									stroke="currentColor"
									strokeWidth={2}
									strokeLinecap="round"
								/>
							</svg>
						</li>
						<li
							className="text-sm font-semibold text-gray-800 truncate dark:text-gray-400"
							aria-current="page"
						>
							Dashboard
						</li>
					</ol>
					{/* End Breadcrumb */}
				</div>
			</div>
			{/* End Sidebar Toggle */}
			{/* Sidebar */}
			<div
				id="application-sidebar"
				className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 bg-white  pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700"
			>
				<div className="px-6 flex items-center">
					<img width={28} height={28} src={brandImg} alt="sahyog" />
					<a
						className="flex-none text-sm font-bold dark:text-white text-[#FF5F01]"
						href="#"
						aria-label="Sahyog"
					>
						Sahyog
					</a>
				</div>
				<nav
					className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
					data-hs-accordion-always-open=""
				>
					<ul className="space-y-1.5">
						<li>
							<Link
								className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm  rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-white"
								to="/"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									width={20}
									height={20}
									className="text-[#99A3BF]"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								Create Job Post
							</Link>
						</li>

						<li>
							<Link
								className="text-[#3F4452] flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300"
								to="/workersList"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									width={20}
									height={20}
									className="text-[#99A3BF]"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
									/>
								</svg>
								Search for Workers
							</Link>
						</li>

						<li>
							<Link
								className="text-[#3F4452] flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300"
								to="/jobPostList"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									width={20}
									height={20}
									className="text-[#99A3BF]"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
									/>
								</svg>
								My Jobs
							</Link>
						</li>
						<li>
							<a
								className="text-[#3F4452] flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300"
								href="#"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									width={20}
									height={20}
									className="text-[#99A3BF]"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
									/>
								</svg>
								Messages
							</a>
						</li>
						<li>
							<a
								className="text-[#3F4452] flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300"
								href="#"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									width={20}
									height={20}
									className="text-[#99A3BF]"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								Settings
							</a>
						</li>
						<li>
							<a
								className="text-[#3F4452] flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300"
								href="#"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									width={20}
									height={20}
									className="text-[#99A3BF]"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
									/>
								</svg>
								Support
							</a>
						</li>
					</ul>
				</nav>
			</div>
			{/* End Sidebar */}
		</div>
	);
}
export default Sidebar;
