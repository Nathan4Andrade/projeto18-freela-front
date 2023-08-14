import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdAddCircle } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import iconUser from "../assets/cat.png";

function Navbar() {
  const [user, setUser] = useState({ image: iconUser });
  const [token, setToken] = useContext(AuthContext);
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
  }, [apiURL, setToken, token]);

  return (
    <>
      {!user.name ? (
        <></>
      ) : (
        <NavContainer>
          <div>
            <Link to={`/me`}>
              <ProfilePicture src={user.image} alt={user.name} />
            </Link>

            <Link to={`/home`}>
              <Logo>Catwalk</Logo>
            </Link>
            <Link to="/add">
              <MdAddCircle />
            </Link>
          </div>
        </NavContainer>
      )}
    </>
  );
}

export default Navbar;

const NavContainer = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  div {
    width: 100%;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  background: #fff0b5;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  a {
    font-size: 30px;
    text-decoration: none;
  }
`;

const Logo = styled.div`
  font-family: "Archivo Black";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 49px;
  color: #000;
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;
