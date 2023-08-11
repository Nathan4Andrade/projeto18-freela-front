import { Link } from "react-router-dom";
import styled from "styled-components";

function Navbar() {
  return (
    <NavContainer>
      <Link to={`/home`}>
        <Logo>Catwalk</Logo>
      </Link>
    </NavContainer>
  );
}

export default Navbar;

const NavContainer = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #fff0b5;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  a {
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
