import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// import "../public/styles.css"
import Login from "./pages/Login";
import Register from "./pages/Register";
import ToDo from "./pages/ToDo";
// import Error from "./pages/Error";

const App = () => {
  return (//<h1> hi there </h1>
    <Router>
      <Switch>
        <Route exact path = "/" component = {Login} />
        <Route exact path = "/register" component = {Register} />
        <Route exact path = "/todo" component = {ToDo} />
        {/* <Route path="*" component={Error} /> */}
      </Switch>
    </Router>
  );
}
export default App;