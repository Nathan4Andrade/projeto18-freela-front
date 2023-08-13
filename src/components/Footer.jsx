import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import { FaCat, FaPaw } from "react-icons/fa";


function Footer() {
  return (
    <FooterContainer>
      <Line />
      <Option>
        <Link to="/cats/me">
          <FaCat />
        </Link>
      </Option>
      <Option>
        <Link to="/home">
          <FaPaw />
        </Link>
      </Option>
      <Option>
        <Link to="/favorites">
          <AiFillHeart />
        </Link>
      </Option>
    </FooterContainer>
  );
}

export default Footer;

const Line = styled.div`
  position: absolute;
  top: 0;
  border-top: 0.1px solid #000;

  width: 80%;
  align-self: stretch;
`;

const Option = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100px;

  img {
    width: 40px;
  }

  a {
    color: #000;
    font-size: 30px;
    margin-bottom: -4px;
  }

  :hover {
    cursor: pointer;
  }
`;
const FooterContainer = styled.footer`
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
