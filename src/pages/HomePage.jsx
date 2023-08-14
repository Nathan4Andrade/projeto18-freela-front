import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import Cat from "../components/Cat";
import Footer from "../components/Footer";

export default function HomePage() {
  const [cats, setCats] = useState([]);
  const [token, setToken] = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
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

      axios
        .get(`${apiURL}/cats`, config)
        .then((resp) => {
          setCats(resp.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [apiURL, navigate, setToken, token]);

  const filteredCats = cats.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer>
      <input
        type="text"
        placeholder="Digite sua busca..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery ? (
        filteredCats.map((cat) => (
          <Link key={cat.id} to={`/cats/${cat.id}`}>
            <Cat
              name={cat.name}
              age={cat.age}
              breed={cat.breed}
              description={cat.description}
              image={cat.image}
            />
          </Link>
        ))
      ) : cats.length > 0 ? (
        cats.map((cat) => (
          <Link key={cat.id} to={`/cats/${cat.id}`}>
            <Cat
              name={cat.name}
              age={cat.age}
              breed={cat.breed}
              description={cat.description}
              image={cat.image}
            />
          </Link>
        ))
      ) : (
        <h1>Sem gatos disponíveis no momento :/</h1>
      )}
      <Line />
      <SiteInfo>
        <h1>Catwalk</h1>
        <p>
          Empresa especializada no agenciamento de gatos para campanhas
          audiovisuais e impressas.
        </p>
      </SiteInfo>

      <Footer />
    </PageContainer>
  );
}
const SiteInfo = styled.div`
  padding-bottom: 70px;
  p {
    font-size: 14px;
  }
`;
const Line = styled.div`
  margin: 30px 0;
  border-top: 0.1px solid #000;
  align-self: stretch;
`;

const PageContainer = styled.section`
  display: flex;
  max-width: 262px;
  flex-direction: column;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  input {
    border-radius: 8px;
    background: #fff;
    border: none;
  }
`;
