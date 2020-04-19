import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import "./app.styles.scss";

import Members from "./Members/Members";
import MemberDetails from "./MemberDetails/MemberDetails";

const App = () => {
  const history = useHistory();
  return (
    <div className="app">
      <header className="header">
        <span style={{ cursor: "pointer" }} onClick={() => history.push("/")}>
          Congress List
        </span>
      </header>
      <div className="container">
        <Switch>
          <Route path="/member/:id" component={MemberDetails} />
          <Route path="/" component={Members} />
          <Redirect to="/" />
        </Switch>
      </div>
      <footer className="footer">
        Developed by Federico Villa for Leniolabs Challenge
      </footer>
    </div>
  );
};

export default App;
