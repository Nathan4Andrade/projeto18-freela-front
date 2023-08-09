/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useContext(AuthContext);

  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const localToken = JSON.parse(localStorage.getItem("token"));
    if (localToken) {
      navigate("/");
    }
  }, [navigate]);

  function login(e) {
    e.preventDefault();
    const loginInfo = {
      email,
      password,
    };
    axios
      .post(`${URL}/signin`, loginInfo)
      .then((resp) => {
        console.log(resp);
        setToken(resp.data);
        localStorage.setItem("token", JSON.stringify(resp.data));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
    return true;
  }

  return (
    <LoginContainer>
      <h1>Catwalk</h1>
      <form onSubmit={login}>
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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
    div {
      justify-content: center;
    }
  }

  h1 {
    text-align: center;
    padding-bottom: 80px;
  }
`;
