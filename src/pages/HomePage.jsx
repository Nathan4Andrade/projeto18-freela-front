import { Link } from "react-router-dom";
import styled from "styled-components";

export default function HomePage() {
  return (
    <PageContainer>
      <Link to={`/login`}>Já tem conta? Login!</Link>
      <Link to={`/signup`}>Primeira vez? Cadastre-se!</Link>
    </PageContainer>
  );
}

const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
`;
