import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

import { AiFillHeart } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { MdHeartBroken } from "react-icons/md";
import formatAge from "../components/formatAge";
import formatPhoneNumber from "../components/formatPhoneNumber";
import Footer from "../components/Footer";

export default function CatPage() {
  const [cat, setCat] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [token, setToken] = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const { idCat } = useParams();

  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!token) {
      const localUserToken = JSON.parse(localStorage.getItem("token"));

      if (localUserToken) {
        setToken(localUserToken);
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

      axios
        .get(`${apiURL}/cats/${idCat}`, config)
        .then((resp) => {
          setCat(resp.data);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setErrorMessage(err.response.data.message);
          }
          console.log(err.response.data.message);
        });
      axios
        .get(`${apiURL}/favorites`, config)
        .then((resp) => {
          setFavorites(resp.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    }
  }, [apiURL, idCat, navigate, setToken, token]);

  function back() {
    navigate("/");
  }

  function addToFavorite() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${apiURL}/favorites/${idCat}`, null, config)
      .then((resp) => {
        navigate("/favorites");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
  function removeFromFavorites() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`${apiURL}/favorites/${idCat}`, config)
      .then((resp) => {
        navigate("/favorites");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
    <PageContainer>
      {!errorMessage ? (
        <>
          <SCCat>
            <CatImage src={cat.image} alt={cat.name} />
            <Info>
              <div>
                <h2>{cat.name}</h2>
                <p>{cat.breed} </p>
              </div>
              <div>
                <p>{formatAge(cat.age)}</p>
                <p>{cat.description}</p>
              </div>
              <OwnerInfo>
                <ProfilePicture src={cat.ownerImage} alt={cat.owner} />
                <div>
                  <p>Tutor(a):</p>
                  <p>
                    <span>{cat.owner} </span>
                  </p>
                  <p>Contato: </p>
                  <p>
                    <span>{formatPhoneNumber(cat.ownerTelephone)}</span>
                  </p>
                </div>
              </OwnerInfo>
            </Info>
          </SCCat>
          <SCAddToFavorite>
            <Line />
            <Back onClick={back}>
              <BiArrowBack />
            </Back>

            {favorites.some((f) => cat.id === f.catId) ? (
              <Button onClick={removeFromFavorites}>
                <span>Remover dos favoritos</span>
                <MdHeartBroken />
              </Button>
            ) : (
              <Button onClick={addToFavorite}>
                <span>Favoritar</span>
                <AiFillHeart />
              </Button>
            )}
          </SCAddToFavorite>
        </>
      ) : (
        <>
          <h1>Erro 404: {errorMessage}</h1>
          <Footer />
        </>
      )}
    </PageContainer>
  );
}

const Back = styled.button`
  width: 48px;
  height: 48px;
  padding: 0px;
  font-size: 25px;
  color: #000;
  background-color: #fff;
  margin-bottom: -4px;
`;

const Button = styled.button`
  display: flex;
  height: 48px;
  max-width: 300px;
  padding: 12px 24px;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  width: 70%;

  background-color: #000;
`;
const Line = styled.div`
  position: absolute;
  top: 0;
  border-top: 0.1px solid #000;

  width: 80%;
  align-self: stretch;
`;

const SCAddToFavorite = styled.div`
  width: 100vw;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  background-color: #ffffff;
  flex-direction: row;
`;
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 262px;
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
`;

const CatImage = styled.img`
  width: 262px;
  height: 327px;
  object-fit: cover;
`;

const OwnerInfo = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  gap: 15px;
  span {
    font-weight: 500;
  }
`;

const ProfilePicture = styled.img`
  object-fit: cover;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  padding-bottom: 10px;
`;
