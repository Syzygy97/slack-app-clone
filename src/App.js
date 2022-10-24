import "./App.css";
import { Route, Routes } from "react-router-dom";
import SideBar from "./components/sideBar";
import NotFoundPage from "./pages/not-found-page";
import LandingPage from "./pages/landing-page";
import SignUpPage from "./pages/sign-up-page";
import MainPage from "./pages/main-page";
import SignInPage from "./pages/sign-in-page";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main/*" element={<MainPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/sideBar" element={<SideBar />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
