import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateTweet from "./pages/CreateTweet";
import CreateUser from "./pages/CreateUser";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-tweet" element={<CreateTweet />} />
        <Route path="/create-user" element={<CreateUser />} />
      </Routes>
    </>
  );
}

export default App;
