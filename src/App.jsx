import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import { styled } from "styled-components";
import AuthContext from "./contexts/AuthContext";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";

function App() {
  const [token, setToken] = useState("");
  return (
    <PagesContainer>
      <AuthContext.Provider value={[token, setToken]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
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
  padding-top: 25px;
  padding-bottom: 25px;
`;