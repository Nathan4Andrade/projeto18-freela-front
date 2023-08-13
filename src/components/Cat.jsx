/* eslint-disable react/prop-types */
import styled from "styled-components";

export default function Cat(props) {
  const { name, image, breed, age } = props;

  return (
    <SCCat>
      <img src={image} alt={name} />
      <Info>
        <div>
          <h2>{name}</h2>
          <p>{breed} </p>
        </div>
        <div>
          <p>{age} meses</p>
          <p>Detalhes →</p>
        </div>
      </Info>
    </SCCat>
  );
}

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;

  > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
    font-size: 18px;
    h2 {
      font-weight: 500;
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

const SCCat = styled.div`
  padding-top: 16px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  img {
    width: 262px;
    height: 327px;
    object-fit: cover;
  }
`;
