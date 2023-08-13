import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import { RiDeleteBack2Fill } from "react-icons/ri";

import Footer from "../components/Footer";

export default function MyCatsPage() {
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
        .get(`${apiURL}/cats/me`, config)
        .then((resp) => {
          console.log(resp.data);
          setCats(resp.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }, [apiURL, navigate, setToken, token]);

  function updateCatAvailability(catId, newAvailability) {
    const updatedCats = cats.map((cat) => {
      if (cat.id === catId) {
        return { ...cat, available: newAvailability };
      }
      return cat;
    });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(`${apiURL}/cats/${catId}`, { available: newAvailability }, config)
      .then(() => {
        setCats(updatedCats);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
  function deleteCat(catId) {
    if (window.confirm("Tem certeza que quer deletar este item?")) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(config);
      axios
        .delete(`${apiURL}/cats/${catId}`, config)
        .then((resp) => {
          console.log(resp.data);
          navigate("/");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  }
  return (
    <PageContainer>
      {cats.map((cat) => (
        <SCCat key={cat.id}>
          <Link to={`/cats/${cat.id}`}>
            <img src={cat.image} alt={cat.name} />
          </Link>
          <Info>
            <div>
              <h2>{cat.name}</h2>
              <p>{cat.age} meses</p>
            </div>
            <div>
              <button
                onClick={() => updateCatAvailability(cat.id, !cat.available)}>
                {cat.available ? (
                  <Available>Disponível</Available>
                ) : (
                  <NotAvailable>Indisponível</NotAvailable>
                )}
              </button>
            </div>
          </Info>
          <TrashButton onClick={() => deleteCat(cat.id)}>
            <RiDeleteBack2Fill />
          </TrashButton>
        </SCCat>
      ))}
      <Footer />
    </PageContainer>
  );
}

const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const Available = styled.span`
  color: #2b820d;
`;
const NotAvailable = styled.span`
  color: #821c0d;
`;

const SCCat = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 24px;
  gap: 24px;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;
const TrashButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5px;
  color: #821c0d;

  font-size: 30px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  button {
    display: flex;
    height: 32px;
    width: 120px;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: 12px;
  }
  > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
    align-items: flex-start;
    align-self: stretch;
    h2 {
      font-weight: 500;
      font-size: 18px;
    }
    p {
      font-size: 14px;
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
