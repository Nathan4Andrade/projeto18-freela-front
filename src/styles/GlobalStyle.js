import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
    }
    body {
        background-color: #FFF0B5;
    }
    h1 {
        font-family: 'Archivo Black';
        font-size: 34px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%; /* 54.4px */
        letter-spacing: -0.34px;
    }
    button {
        outline: none;
        border: none;
        font-size: 20px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        width: 100%;
        padding: 12px 24px;
        justify-content: center;
        align-items: center;
        gap: 8px;
        border-radius: 100px;
        background: #000;
    }
    input {
        font-size: 18px;
        font-weight: 500;
        line-height: 160%; /* 28.8px */
        letter-spacing: -0.18px;
        width: calc(100% - 30px);
        outline: none;
        border: none;
        border-bottom: 1px solid #000;
        padding: 15px;
        margin: 1px;
        background: none;
        :focus {
            border: 2px solid #ffb6b6;
            margin: 0px;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 32px;
        width: 100%;
        border-radius: 5px;
    }
    a {
        color: #000;
        text-decoration: none;
    }
`;

export default GlobalStyle;
