import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, logout } from "../actions/userActions";

function Header({title}) {
	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const getUser = async () => {
		dispatch(getUserDetails());
	};

	async function signout() {
		dispatch(logout());
	}
	const signOutHandler = async (e) => {
		e.preventDefault();
		signout();
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-[#FAFBFD]  text-sm py-2.5 sm:py-4 lg:pl-64 dark:bg-gray-800 dark:border-gray-700">
			<nav
				className="flex basis-full items-center w-full mx-auto p-4 sm:px-6 md:px-8"
				aria-label="Global"
			>
				<div className="mr-5 lg:mr-0 lg:hidden ">
					<a
						className="flex-none text-xl font-semibold dark:text-white "
						href="#"
						aria-label="Sahyog"
					>
						Sahyog
					</a>
				</div>
				<div className="w-full flex items-center justify-end ml-auto sm:justify-between sm:gap-x-3 sm:order-3">
					<div className="sm:hidden">
						<button
							type="button"
							className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
						>
							<svg
								className="w-3.5 h-3.5"
								xmlns="http://www.w3.org/2000/svg"
								width={16}
								height={16}
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
							</svg>
						</button>
					</div>
					<div className="hidden sm:block">
						<label htmlFor="icon" className="sr-only">
							Search
						</label>
						<div className="relative text-3xl font-bold text-[#3F4452] px-5 sm:px-12 lg:px-19">
							{title}
						</div>
					</div>
					<div className="flex flex-row items-center justify-end gap-2">
						<button
							type="button"
							className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
						>
							<svg
								className="w-3.5 h-3.5"
								xmlns="http://www.w3.org/2000/svg"
								width={16}
								height={16}
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
							</svg>
						</button>
						<button
							type="button"
							className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
							data-hs-offcanvas="#hs-offcanvas-right"
						>
							<svg
								className="w-3.5 h-3.5"
								xmlns="http://www.w3.org/2000/svg"
								width={16}
								height={16}
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z" />
								<path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
							</svg>
						</button>
						<div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
							<button
								id="hs-dropdown-with-header"
								type="button"
								className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
							>
								<img
									className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white dark:ring-gray-800"
									src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
									alt="Image Description"
								/>
							</button>
							<div
								className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700"
								aria-labelledby="hs-dropdown-with-header"
							>
								<div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
									<p className="text-sm text-gray-500 dark:text-gray-400">
										Signed in as
									</p>
									<p className="text-sm font-medium text-gray-800 dark:text-gray-300">
										{user.email}
									</p>
								</div>
								<div className="mt-2 py-2 first:pt-0 last:pb-0">
									<a
										className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
										onClick={signOutHandler}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											width={20}
											height={20}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
											/>
										</svg>
										Sign Out
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
export default Header;
