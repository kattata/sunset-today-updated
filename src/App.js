import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import Location from "./pages/location/Location";
import "./styles/main.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/city/:city">
            <Location />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
