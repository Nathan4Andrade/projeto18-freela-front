import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import Cat from "../components/Cat";

export default function HomePage() {
  const [cats, setCats] = useState([]);
  const [token, setToken] = useContext(AuthContext);

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
      console.log(config);
      axios
        .get(`${apiURL}/cats`, config)
        .then((resp) => {
          console.log(resp.data);
          setCats(resp.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [apiURL, navigate, setToken, token]);

  return (
    <PageContainer>
      {cats.map((cat) => (
        <Link key={cat.id} to={`/cats/${cat.id}`}>
          <Cat
            name={cat.name}
            age={cat.age}
            breed={cat.breed}
            description={cat.description}
            image={cat.image}
          />
        </Link>
      ))}
    </PageContainer>
  );
}

const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
`;


