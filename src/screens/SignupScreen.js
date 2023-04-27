import React, { useRef, useState } from "react";
import "./SignupScreen.css";
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignupScreen = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const authUser = await createUserWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        );
        console.log(authUser);
      } else {
        const authUser = await signInWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        );
        console.log(authUser);
      }
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="signupScreen">
      <form onSubmit={handleSubmit}>
        <h1>{isSignUp ? "Sign Up" : "Login"}</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button type="submit">
          {isSignUp ? "Sign Up" : "Login"}
        </button>
        <h4>
          <span className="signupScreen__gray">
            {isSignUp ? "Already have an account?" : "New to Netflix?"}{" "}
          </span>
          <span
            className="signupScreen__link"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Sign Up Now."}
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignupScreen;