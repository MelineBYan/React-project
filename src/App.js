import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ToDo from "./components/pages/ToDo/ToDo";
import Contact from "./components/pages/Contact/Contact";
import About from "./components/pages/About/About";

function App() {
  return (
    <div className="bg-secondary justify-content-center align-items-center min-vh-100 text-light">
      <Navbar />
      <Switch>
        <Route path="/" component={ToDo} exact />
        <Route path="/contact" component={Contact} exact />
        <Route path="/about" component={About} exact />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
