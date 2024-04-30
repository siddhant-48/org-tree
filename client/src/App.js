import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Services from "./core/Services";
import About from "./core/About";
import Home from "./core/Home";
import Signup from "./core/Signup";
import Signin from "./core/Signin";
import Details from "./core/Details";
import Update from "./components/Update";
import Test from "./components/Test";
import Display from "./toast/Display";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDisplay, setUserDisplay] = useState({
    email: "",
    _id: "",
    phone: "",
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("http://localhost:5000/userEmail", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: window.localStorage.getItem("token") }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user email");
        }

        const data = await response.json();
        setUserDisplay(data.user);
        setIsLoggedIn(true); //login true
        console.log(data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
        setIsLoggedIn(false); //login false
      }
    }
    fetchUser();
  }, []);
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          {/* {isLoggedIn ? (
            <Route path="/services" element={<Services />} />
          ) : null} */}
          <Route
            path="/services"
            element={isLoggedIn ? <Services /> : <div>
              <Display />
            </div>}
          />
          <Route
            path="/about"
            element={isLoggedIn ? <Test /> : <div>
              <Display />
            </div>}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/details" element={<Details />} />
          <Route path="/details/:id" element={<Update />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
