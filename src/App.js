import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ToDo from "./components/pages/ToDo/ToDo";
import Contact from "./components/pages/Contact/Contact";
import About from "./components/pages/About/About";
import SingleTask from "./components/pages/SingleTask/SingleTask";
import Error from "./components/pages/Error/Error";

function App() {
  const pages = [
    {
      path: "/",
      component: ToDo,
      exact: true,
    },
    {
      path: "/contact",
      component: Contact,
      exact: true,
    },
    {
      path: "/about",
      component: About,
      exact: true,
    },
    {
      path: "/task/:id",
      component: SingleTask,
      exact: true,
    },
    {
      path: "/error/:type",
      component: Error,
      exact: true,
    },
  ];

  const pagesJSX = pages.map((page, idx) => (
    <Route
      key={idx}
      path={page.path}
      component={page.component}
      exact={page.exact}
    />
  ));
  return (
    <div className="bg-secondary justify-content-center align-items-center min-vh-100 text-light">
      <Navbar />
      <Switch>
        {pagesJSX}
        <Redirect to="/error/404" />
      </Switch>
    </div>
  );
}

export default App;
