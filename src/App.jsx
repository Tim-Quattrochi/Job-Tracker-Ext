import { Routes, Route } from "react-router-dom";
import JobTracker from "./components/JobTracker/JobTracker";
import Login from "./pages/Login/Login";
import logo from "./assets/logo.svg";

function App() {
  return (
    <div className="">
      <img
        src={logo}
        width="275px"
        alt=""
        style={{ marginTop: "10px", marginLeft: "15px" }}
      />
      <Routes>
        <Route path="/" element={<JobTracker />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
