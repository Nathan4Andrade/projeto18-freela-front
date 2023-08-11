import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

export default function CatPage() {
  const [cat, setCat] = useState([]);
  const [token, setToken] = useContext(AuthContext);
  const navigate = useNavigate();

  const { idCat } = useParams();
  console.log(idCat);
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!token) {
      const localUserToken = JSON.parse(localStorage.getItem("token"));

      if (localUserToken) {
        setToken(localUserToken);
        // eslint-disable-next-line no-unused-vars
        const config = {
          headers: {
            Authorization: `Bearer ${localUserToken}`,
          },
        };
      } else {
        navigate("/");
      }
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(config);
      axios
        .get(`${apiURL}/cats/${idCat}`, config)
        .then((resp) => {
          console.log(resp.data);
          setCat(resp.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [apiURL, idCat, navigate, setToken, token]);

  return (
    <PageContainer>
      <SCCat>
        <img src={cat.image} alt={cat.name} />
        <Info>
          <div>
            <h2>{cat.name}</h2>
            <p>{cat.breed} </p>
          </div>
          <div>
            <p>{cat.age} meses</p>
            <p>{cat.description}</p>
            <p>Tutor: {cat.owner} </p>
            <p>Contato: {cat.ownerTelephone} </p>
          </div>
        </Info>
      </SCCat>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;

  > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
    font-size: 18px;
    h2 {
      font-weight: 500;
    }
  }
  > div:nth-child(2) {
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;
    font-size: 14px;
  }
`;

const SCCat = styled.div`
  padding-top: 16px;
  padding-bottom: 48px;
  display: flex;
  flex-direction: column;
  img {
    width: 262px;
    height: 327px;
    object-fit: cover;
  }
`;
