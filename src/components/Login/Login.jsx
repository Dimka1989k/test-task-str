import "./Login.styles.css";
import iconGoogle from "../../assets/icon-google.png";
import elipse from "../../assets/ellipse-login.png";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import { useGoogleLogin } from "@react-oauth/google";

export default function Login({ onLoginSuccess }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          onLoginSuccess(res.data); 
          localStorage.setItem("accessToken", user.access_token);
          navigate("/"); 
        })
        .catch((err) => console.log(err));
    }
  }, [user, onLoginSuccess, navigate]);

  return (
    <section className="container-login">
      <div className="container-login-all">
        <div className="frame"></div>
        <div className="welcome">
          <div className="elipse-login">
            <img className="elipse-img"src={elipse} alt="elipse" />
          </div>
          <h1 className="heading">Welcome to Starzen</h1>
          <p className="text-login">Sign in to connect with expert specialists</p>
          <button className="btn-google" onClick={login}>
            <div className="container-img-btn">
              <img
                src={iconGoogle}
                alt="iconGoogle"                
              />
            </div>
            Sign in with Google
          </button>
          <p className="text-login">
            By signing in, you agree to our <br />
            Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </section>
  );
}