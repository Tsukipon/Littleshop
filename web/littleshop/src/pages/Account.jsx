import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../style/Account.css";
import Popup from "../components/Popup";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../utils/functions";

const BACKEND_DELETE_ACCOUNT_URL = `http://localhost:${process.env.REACT_APP_AGGREGATOR_PORT}/deactivate`;
const SYNC_ACCOUNT_BACKEND_URL = `http://localhost:${process.env.REACT_APP_AGGREGATOR_PORT}/syncAccount`;

const Account = () => {
  const navigate = useNavigate();
  const initialAccount = localStorage.getItem("account") === undefined ? JSON.parse(localStorage.getItem("account")) : {};
  const [account, setAccount] = useState(initialAccount);
  const [popup, setShowPopUp] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [popupTitle, setPopupTitle] = useState("");


  useEffect(() => {
    // if (!localStorage.getItem("token")) {
    //   setPopupTitle("LittleShop account management information");
    //   setPopupContent("You are currently not logged in !");
    //   popupHandler().then(() => {
    //     navigate("/login");
    //   });
    // }
    if (!account || Object.keys(account).length === 0) {
      console.log("##############")

      axios
        .get(SYNC_ACCOUNT_BACKEND_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          localStorage.setItem(
            "account",
            JSON.stringify(response.data.response)
          );
          setAccount(response.data.response);
          console.log(response.data.response)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const popupHandler = (e) => {
    return new Promise((resolve, reject) => {
      setShowPopUp(!e);
      setTimeout(() => {
        setShowPopUp(false);
        resolve();
      }, 2000);
    });
  };
  const deleteAccount = async () => {
    try {
      console.log(account)
      const request = await axios.put(
        BACKEND_DELETE_ACCOUNT_URL,
        {
          password: account.password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(request.status);
      if (request.status === 200) {
        setPopupTitle("LittleShop account management information");
        setPopupContent(
          `Your account has been successfully deleted ${account.username} !`
        );
        await popupHandler();
        navigate("/");
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="account-img">
        <img
          src={require("../images/star.png")}
          alt="standard profile"
          width="350"
          height="350"
        />
      </div>
      <h2>PROFILE</h2>
      <div className="account-details">
        <Popup trigger={popup} title={popupTitle} value={popupContent} />
        <p>
          <b>Email:</b> {account.email}
        </p>
        <p>
          <b>Username:</b> {account.username}
        </p>
        <p>
          <b>Firstname:</b> {account.firstname}
        </p>
        <p>
          <b>Lastname:</b> {account.lastname}
        </p>
        <p>
          <b>Birthdate:</b>{" "}
          {account.birthdate
            ? account.birthdate.split("T")[0]
            : account.birthdate}
        </p>
        <button className="delete-account" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
};
export default Account;
