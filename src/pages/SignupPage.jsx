import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;

  function signup(e) {
    e.preventDefault();
    const signupInfo = {
      email,
      name,
      cpf,
      telephone,
      password,
      confirmPassword,
    };
    axios
      .post(`${URL}/signup`, signupInfo)
      .then((resp) => {
        console.log(resp.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
  }

  return (
    <PageContainer>
      <h1>Catwalk</h1>
      <form onSubmit={signup}>
        <input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="CPF"
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <input
          placeholder="Telephone"
          type="number"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button>
          <span>Signup</span>
        </button>
      </form>
      <Link to={`/login`}>Primeira vez? Cadastre-se!</Link>
    </PageContainer>
  );
}

const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    max-width: 327px;
    > p {
      color: #ff7676;
      text-align: center;
    }
  }
  button {
    :disabled {
      background-color: grey;
    }
  }
`;
