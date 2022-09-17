import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import Home from './views/Home/home';
import Quiz from './views/Quiz/quiz';

export default function App() {

	return (
		<>
			<Router>
				<Routes>
					<Route path="" element={<Home />} />
					<Route path="quiz" element={<Quiz />} />
				</Routes>
			</Router>
		</>

	);
}
