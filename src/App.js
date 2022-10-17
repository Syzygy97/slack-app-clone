import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import SideBar from "./components/sideBar";
import NotFoundPage from "./pages/not-found-page";
import WelcomePage from "./pages/welcome-page";
import SignUpPage from "./pages/sign-up-page";
import MainPage from "./pages/main-page";
import SignInPage from "./pages/sign-in-page";
import Modals from "./components/modals";

function App() {
  const navigate = useNavigate();
  const toMainPage = (e) => {
    e.preventDefault();
    navigate("/main");
  };
  const toSignUpPage = (e) => {
    e.preventDefault();
    navigate("/register");
  };
  const toSignInPage = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const toLandingPage = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="App">
      {/* <div className="add-channel-modal">
        <Modals />
      </div> */}
      <div className="quick-navigation">
        <h5 onClick={toMainPage}>Main Page</h5>
        <h5 onClick={toSignUpPage}>Sign Up</h5>
        <h5 onClick={toSignInPage}>Sign In</h5>
        <h5 onClick={toLandingPage}>Landing Page</h5>
      </div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/sideBar" element={<SideBar />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
