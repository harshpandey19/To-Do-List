import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {

  const logout = async() => {
      try {
          await axios.post("/users/logout");
          window.location = "/";
      }
      catch(err) {
          console.log(err);
      }
  }

    return <div className="text-center">
    <nav className="navbar navbar-expand-md navbar-light text-white fixed-top" id="bar">
      <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
        <span className="navbar-toggler-icon"> </span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav">
        <Link to="/">
          <span 
            className={"nav-item nav-link active expand "}> 
            Login 
          </span>
        </Link>
        <Link to="/Register">
          <span 
            className={"nav-item nav-link active expand "}>
            Register
          </span>
        </Link>
        <Link to={"/todo"}>
          <span 
            className={"nav-item nav-link active expand "}>
            ToDo-List
          </span>
        </Link>
          <span 
            onClick={logout} 
            className={"nav-item nav-link active expand"}> 
            Logout 
          </span>
        </div>
      </div>
    </nav>
  </div>
}

export default Navbar;