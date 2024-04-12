import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Create from "./Create";
import Emotion from "./Emotion";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Router>
		<Routes>
			<Route path="" element={<App />} />
			<Route path="/create" element={<Create />} exact />
			<Route path="/:id" element={<Emotion />} />
		</Routes>
	</Router>
);
