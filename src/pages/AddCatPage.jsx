import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import Footer from "../components/Footer";
import iconUser from "../assets/cat.png";

export default function AddCatPage() {
  const [token, setToken] = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [age, setAge] = useState(0);
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");

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
      // eslint-disable-next-line no-unused-vars
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
  }, [apiURL, navigate, setToken, token]);

  function addCat(e) {
    e.preventDefault();

    const newCat = {
      name,
      age,
      breed,
      description,
      image,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${apiURL}/cats/new`, newCat, config)
      .then(() => {
        console.log("Adicionando novo gato");
        navigate("/");
      })
      .catch((err) => alert(err.response.data.message));
  }

  return (
    <PageContainer>
      <h1>Adicionar novo gato</h1>
      <form onSubmit={addCat}>
        <ProfilePicture htmlFor="image">
          <img src={image ? image : iconUser} alt="icon" />
        </ProfilePicture>
        <input
          placeholder="URL da Imagem"
          id="image"
          name="image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <input
          placeholder="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Idade (em meses)"
          type="number"
          value={age > 0 ? age : ""}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          placeholder="Raça"
          type="text"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
        />
        <input
          placeholder="Descrição"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button>
          <span>Adicionar</span>
        </button>
      </form>
      <Footer />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 262px;
  h1 {
    font-size: 25px;
  }
  form {
    padding-bottom: 20px;
  }
  input {
    border-radius: 8px;
    background: #fff;
    border: none;
  }
`;
const ProfilePicture = styled.label`
  width: 262px;
  height: 327px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #707070;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  span {
    > p {
      padding-top: 5px;
      font-size: 10px;
    }
  }
`;
