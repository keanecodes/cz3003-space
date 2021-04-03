// Framework
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

// Data handling 
import { RecoilRoot } from "recoil";

import './index.css';
import Container from "./components/Container";
import Topics from "./components/Topics";
// import reportWebVitals from './reportWebVitals';

const hist = createBrowserHistory()

ReactDOM.render(
  <RecoilRoot>
    <Router history={hist}>
      <Switch>
        <Route
          path="/"
          render={props => {
            return <Container {...props}/>;
          }}
        />
      </Switch>
      <Route render={() => <Redirect to="/" />} />
    </Router>
  </RecoilRoot>
    // <Topics/>
  ,document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();