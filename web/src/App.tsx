import { Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";
import NotesProvider from "./contexts/NotesContext";

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
		</div>
	);
}

export default App;
