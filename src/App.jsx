import { Routes, Route } from "react-router-dom";
import JobTracker from "./components/JobTracker/JobTracker";
import Login from "./pages/Login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<JobTracker />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
