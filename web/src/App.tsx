import { Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";
import NotesProvider from "./contexts/NotesContext";
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<div id="app">
			<Routes>
				<Route
					path="/notes"
					element={
						<NotesProvider>
							<Notes />
						</NotesProvider>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
			<ToastContainer
				position="top-right"
				theme="dark"
				toastStyle={{
					backgroundColor: "#555",
					color: "#fff",
				}}
			/>
		</div>
	);
}

export default App;
