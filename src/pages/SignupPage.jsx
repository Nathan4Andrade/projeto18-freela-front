import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import iconUser from "../assets/cat.png";

export default function SignupPage() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;

  function signup(e) {
    e.preventDefault();
    console.log(image);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", image);
    formData.append("cpf", cpf);
    formData.append("telephone", telephone);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    /* 
    const signupInfo = {
      image,
      email,
      name,
      cpf,
      telephone,
      password,
      confirmPassword,
    }; */
    console.log(formData);
    axios
      .post(`${apiURL}/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log(resp.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  return (
    <PageContainer>
      <h1>Catwalk</h1>
      <form onSubmit={signup}>
        <ProfilePicture htmlFor="image">
          {image ? (
            <img src={URL.createObjectURL(image)} alt="icon" />
          ) : (
            <span>
              <img src={iconUser} alt="icon" />
              <p>Set Profile Picture</p>
            </span>
          )}
        </ProfilePicture>

        <input
          name="image"
          id="image"
          accept="image/*"
          type="file"
          placeholder="Profile picture"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="CPF"
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <input
          placeholder="Telephone"
          type="number"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button>
          <span>Signup</span>
        </button>
      </form>
      <Link to={`/login`}>Already have an account? Login!</Link>
    </PageContainer>
  );
}

const ProfilePicture = styled.label`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #707070;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  span {
    > p {
      padding-top: 5px;
      font-size: 10px;
    }
  }
`;

const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    padding-top: 30px;
    max-width: 327px;
    > p {
      color: #ff7676;
      text-align: center;
    }
  }
  button {
    :disabled {
      background-color: grey;
    }
  }
  input[type="file"] {
    display: none;
  }
`;
