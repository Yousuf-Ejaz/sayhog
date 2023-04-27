import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EmployerProfile() {
	const supabase = createClient(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_KEY
	);
	const params = useParams();
	const [employerProfile, setEmployerProfile] = useState("");
	const getEmployer = async () => {
		let { data: EmployerProfile, error } = await supabase
			.from("EmployerProfile")
			.select("id", params.id);
		setEmployerProfile([...EmployerProfile][0]);
	};
	useEffect(() => {
		getEmployer();
	}, []);

	return <div>{employerProfile.id}</div>;
}
export default EmployerProfile;
