import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useFetchUserQuery } from "./store";
import Header from "./components/Header/Header";
import BookSearch from "./components/Books/Search/BookSearch";
import { useAddUser, useInitAuth } from "./hooks";

const App = () => {
  const { authUserId } = useSelector((state) => state.authData);
  const { userAdded } = useSelector((state) => state.userData);
  useInitAuth();
  useFetchUserQuery(authUserId);
  useAddUser();

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<BookSearch authUserId={authUserId} userAdded={userAdded} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
