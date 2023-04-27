import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import JobPostList from "./pages/JobPostList";
import WorkersList from "./pages/workersList";
import WorkerProfile from "./pages/workerProfile";
import EmployerProfile from "./pages/employerProfile";
import JobDetails from "./pages/jobDetails";

import("preline");
function App() {
	return (
		<div className="text-[#3F4452] bg-[#FAFBFD] h-fit">
			<Router>
				<Routes>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/forgotpassword"
						element={<ForgotPassword />}
					/>
					<Route path="/" element={<Homepage />} />
					<Route path="/jobpostlist" element={<JobPostList />} />
					<Route path="/workerslist" element={<WorkersList />} />
					<Route path="/worker/:id" element={<WorkerProfile />} />
					<Route path="/employer/:id" element={<EmployerProfile />} />
					<Route path="/job/:id" element={< JobDetails/>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
