import { Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import NotesProvider from "./contexts/NotesContext";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/notes"
          element={
            <NotesProvider>
              <Notes />
            </NotesProvider>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
    </>
  );
}

export default App;
