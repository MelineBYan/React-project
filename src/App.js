import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import ToDo from "./components/pages/ToDo/ToDo";
import Contact from "./components/pages/Contact/Contact";
import About from "./components/pages/About/About";
import SingleTaskWithRedux from "./components/pages/SingleTask/SingleTaskWithRedux/SingleTaskWithRedux";
import SingleTaskContextProvider from "./Context/Providers/SingleTaskContextProvider";
import Error from "./components/pages/Error/Error";

const App = (props) => {
  const { errorMessage, successMessage } = props;
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
      component: SingleTaskWithRedux,
      exact: true,
    },
    {
      path: "/error/:type",
      component: Error,
      exact: true,
    },
  ];

  useEffect(() => {
    errorMessage &&
      toast.error(`🦄 ${errorMessage}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }, [errorMessage]);

  useEffect(() => {
    successMessage &&
      toast.success(`🦄 ${successMessage}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }, [successMessage]);

  const pagesJSX = pages.map((page, idx) => (
    <Route
      key={idx}
      path={page.path}
      render={
        idx !== 3
          ? (props) => <page.component {...props} />
          : (props) => (
              <SingleTaskContextProvider>
                <page.component {...props} />
              </SingleTaskContextProvider>
            )
      }
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
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  errorMessage: state.globalReducer.errorMessage,
  successMessage: state.globalReducer.successMessage,
});

export default connect(mapStateToProps, null)(App);
