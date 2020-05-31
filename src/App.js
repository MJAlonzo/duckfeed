import React from "react";
import { Route } from "react-router-dom";

import Form from "./modules/form/Form";
import Dashboard from "./modules/dashboard/Dashboard";

function App() {
  return (
    <>
      <Route exact path="/" component={Form} />
      <Route path="/dashboard" component={Dashboard} />
    </>
  );
}

export default App;
