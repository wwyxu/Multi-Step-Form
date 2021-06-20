import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Register from "./views/register";

toast.configure();

const App = () => {
  return (
      <BrowserRouter>
        <div className="container-fluid">
          <div className="row no-gutters">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => <Register {...props} />}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
