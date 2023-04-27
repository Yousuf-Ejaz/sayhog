import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./output.css";
import "./App.css";
import("preline");
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />
	</Provider>
);
