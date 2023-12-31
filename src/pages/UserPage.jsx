import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import formatPhoneNumber from "../components/formatPhoneNumber";

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

    axios
      .get(`${apiURL}/user`, config)
      .then((resp) => {
        setUser(resp.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [setToken, token, setUser, apiURL, navigate]);

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
