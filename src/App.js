import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { SignIn } from "./SignIn/SignIn";
import { MainPage } from "./MainPage/MainPage";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  function logout() {
    setAuthenticated(false);
  }
  function login() {
    setAuthenticated(true);
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element=
          {authenticated === true ? <MainPage logout={logout} /> : <SignIn login={login} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
