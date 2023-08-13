import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import Footer from "../components/Footer";

export default function AddCatPage() {
  const [token, setToken] = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [age, setAge] = useState();
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
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(config);
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
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log(err.response.data));
  }

  return (
    <PageContainer>
      <h1>Adicionar novo gato</h1>
      <form onSubmit={addCat}>
        <input
          placeholder="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="URL da Imagem"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <input
          placeholder="Idade (em meses)"
          type="number"
          value={age}
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
