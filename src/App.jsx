import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Register from "./components/auth/Register";

const App = () => {
  return (
    <div>
      <Header />
      {/* <Home /> */}
      <Register />
      <Footer />
    </div>
  );
};

export default App;
