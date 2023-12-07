import { Routes, Route } from "react-router-dom";
import JobTracker from "./components/JobTracker/JobTracker";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Header from "./components/Header/Header";
import Landing from "./pages/Landing/Landing";
import Protected from "./components/ProtectedRoute/Protected";
import Anonymous from "./components/ProtectedRoute/Anonymous";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tracker" element={<Protected />}>
          <Route path="/tracker" element={<JobTracker />} />
        </Route>

        <Route element={<Anonymous />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
