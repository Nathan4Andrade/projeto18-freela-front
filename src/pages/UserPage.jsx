import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const [user, setUser] = useState([]);
  const [token, setToken] = useContext(AuthContext);
  const navigate = useNavigate();

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let config;
    if (!token) {
      const localUserToken = JSON.parse(localStorage.getItem("token"));

      if (localUserToken) {
        setToken(localUserToken);
        // eslint-disable-next-line no-unused-vars
        config = {
          headers: {
            Authorization: `Bearer ${localUserToken}`,
          },
        };
      } else {
        navigate("/");
      }
    } else {
      config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
    console.log(config);

    axios
      .get(`${apiURL}/user`, config)
      .then((resp) => {
        console.log(resp.data);
        setUser(resp.data);
      })
      .catch((err) => {
        err.response.data;
      });
  }, [setToken, token, setUser, apiURL, navigate]);

  function formatPhoneNumber(phoneNumber) {
    if (phoneNumber) {
      // Remove qualquer caractere não numérico do número de telefone

      // Verifica se o número de telefone possui o tamanho correto
      if (phoneNumber.length !== 10) {
        return phoneNumber; // Retorna o número não formatado se o tamanho for incorreto
      }

      // Formata o número de telefone no formato desejado: (99) 99999-9999
      const formattedPhoneNumber =
        phoneNumber.length === 10
          ? `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
              2,
              6
            )}-${phoneNumber.slice(6)}`
          : `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
              2,
              7
            )}-${phoneNumber.slice(7)}`;

      return formattedPhoneNumber;
    }
  }

  function logout() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <PageContainer>
      <ProfilePicture src={user.image} alt={user.name} />
      <h2>{user.name}</h2>
      <h2>{user.email}</h2>
      <h2>{formatPhoneNumber(user.telephone)}</h2>
      <button onClick={logout}>Sair da conta</button>
      <Footer />
    </PageContainer>
  );
}
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 262px;
  align-items: center;
  gap: 20px;
  button {
    background-color: #821c0d;
  }
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 200px;
  height: 200px;
  object-fit: cover;
`;
