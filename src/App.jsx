import { Routes, Route } from "react-router-dom";
import JobTracker from "./components/JobTracker/JobTracker";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<JobTracker />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
