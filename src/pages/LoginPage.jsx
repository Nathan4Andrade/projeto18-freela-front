/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [token, setToken] = useContext(AuthContext);

  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const localToken = JSON.parse(localStorage.getItem("token"));
    if (localToken) {
      navigate("/home");
    }
  }, [navigate]);

  function login(e) {
    e.preventDefault();
    const loginInfo = {
      email,
      password,
    };
    axios
      .post(`${apiURL}/signin`, loginInfo)
      .then((resp) => {
        setToken(resp.data.token);
        localStorage.setItem("token", JSON.stringify(resp.data.token));
        navigate("/home");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setErrorMessage("Senha ou e-mail incorretos");
        } else {
          console.log(err.response.data);
        }
      });
  }

  return (
    <LoginContainer>
      <h1>Catwalk</h1>
      <form onSubmit={login}>
        <input
          placeholder="E-mail"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <Error>{errorMessage}</Error>}
        <button>
          <span>Login</span>
        </button>
      </form>
      <Link to={`/signup`}>First time? Signup!</Link>
    </LoginContainer>
  );
}

const LoginContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    max-width: 327px;
  }
  button {
    margin-bottom: 10px;
    div {
      justify-content: center;
    }
  }

  h1 {
    text-align: center;
    padding-bottom: 80px;
  }
`;

const Error = styled.p`
  color: red;
`;
