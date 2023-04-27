import React, { useState } from "react";
import "./LoginScreen.css";
import SignupScreen from "./SignupScreen";


const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false);


  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img
          className="loginScreen__logo"
          src="/netflixLogo.png"
          alt=""
          onClick={() => setSignIn(false)}
        />
        <button className="loginScreen__button" onClick={() => setSignIn(true)}>
          Sign In
        </button>
        <div className="loginScreen__gradient" />
        <div className="loginScreen__body">
          {signIn ? (
            <SignupScreen />
          ) : (
            <>
              <h1>Unlimited films, TV Programmes and More.</h1>
              <h2>Watch Anywhere. Cancel at any time.</h2>
              <h3>
                Ready to watch? Enter your email to create or restart your
                membership.
              </h3>
          <div className="loginScreen__input">
            <form>
              <input type="email" placeholder="Email Address" />
              <button
                className="loginScreen__getStarted"
                onClick={() => setSignIn(true)}
                >
                Get Started
              </button>
            </form>
          </div>
                  </>
                )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
