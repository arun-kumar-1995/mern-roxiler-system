import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AppLayout from "./layouts/AppLayout";
import Loader from "./components/common/Loader";

const Home = lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
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
  );
};

export default App;
