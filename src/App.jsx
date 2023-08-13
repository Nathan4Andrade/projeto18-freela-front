import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import { styled } from "styled-components";
import AuthContext from "./contexts/AuthContext";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import CatPage from "./pages/CatPage";
import MyCatsPage from "./pages/MyCatsPage";
import AddCatPage from "./pages/AddCatPage";

function App() {
  const [token, setToken] = useState("");
  return (
    <PagesContainer>
      <AuthContext.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/cats/:idCat" element={<CatPage />} />
            <Route path="/cats/me" element={<MyCatsPage />} />
            <Route path="/add" element={<AddCatPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </PagesContainer>
  );
}

export default App;

const PagesContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: calc(100vw - 50px);
  padding-top: 80px;
  padding-bottom: 70px;
`;
