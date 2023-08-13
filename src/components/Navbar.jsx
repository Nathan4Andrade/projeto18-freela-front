import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdAddCircle } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  return (
    <NavContainer>
      <div>
        <GiHamburgerMenu />
        <Link to={`/home`}>
          <Logo>Catwalk</Logo>
        </Link>
        <Link to="/add">
          <MdAddCircle />
        </Link>
      </div>
    </NavContainer>
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
