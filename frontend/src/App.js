import React, { Fragment, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AppLayout from "./layouts/AppLayout"
const Home = lazy(() => import("./pages/Home"));



const App = () => {
  return (
    <Fragment>
      <Suspense fallback={true}>
        <Router>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <AppLayout>
                  <Home />
                </AppLayout>
              }
            />
          </Routes>
        </Router>
      </Suspense>
    </Fragment>
  );
};

export default App;
