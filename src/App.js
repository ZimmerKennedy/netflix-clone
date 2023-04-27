import React, { useEffect, Suspense, useState } from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./screens/ProfileScreen";
import LoadingPage from "./LoadingPage";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, [dispatch]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Suspense fallback={<LoadingPage />}>
          <>
            {!user ? (
              <LoginScreen />
            ) : (
              <Routes>
                <Route exact path="/" element={<LoginScreen />} />
                <Route exact path="/home" element={<HomeScreen />} />
                <Route exact path="/profile" element={<ProfileScreen />} />
              </Routes>
            )}
          </>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;