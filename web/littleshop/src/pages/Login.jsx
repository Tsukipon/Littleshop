import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";
import Popup from "../components/Popup";
const BACKEND_LOGIN_URL = `http://localhost:${process.env.REACT_APP_AGGREGATOR_PORT}/login`;
//localStorage.clear()

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setShowPopUp] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const popupHandler = (e) => {
    return new Promise((resolve) => {
      setShowPopUp(!e);
      setTimeout(() => {
        setShowPopUp(false);
        resolve()
      }, 2000);
    })
  };

  const loginBackEnd = async () => {
    try {
      console.log(BACKEND_LOGIN_URL)

      // if (!token) {
      const request = await axios.post(BACKEND_LOGIN_URL, {
        email: email,
        password: password,
      });
      console.log(request.status);
      if (request.status === 200) {
        if (localStorage.getItem("token")) {
          console.log("token", localStorage.getItem("token"))
          //localStorage.removeItem("token")
          localStorage.clear()
          // if (localStorage.getItem("account")) {
          //   localStorage.removeItem("account")
          // }
        }
        localStorage.setItem("token", request.data.token);
        //localStorage.setItem("role", request.data.role);
        //localStorage.setItem("password",password);
        setPopupTitle("LittleShop account management information");
        setPopupContent("You have successfully logged in  !");
        localStorage.setItem("account",JSON.stringify())
        await popupHandler();
        navigate("/");
        window.location.reload();

      }
      // } else {
      //   setPopupTitle("LittleShop account management information");
      //   setPopupContent("You are already logged in !");
      //   await popupHandler();
      //   navigate("/");
      // }
    }
    catch (error) {
      console.log(error);
    };
  }
  return (
    <div>
      <Navbar />
      <Popup trigger={popup} title={popupTitle} value={popupContent} />
      <div className="Login">
        <h1 className="title-form">Login</h1>
        <label>email</label>
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value.toLowerCase());
          }}
        ></input>
        <label>password</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input><br />
        <button className="login-button" onClick={loginBackEnd}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
