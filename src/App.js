import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useFetchUserQuery } from "./store";
import Header from "./components/Header/Header";
import BookSearch from "./components/Books/Search/BookSearch";
import { useAddUser, useInitAuth } from "./hooks";

const App = () => {
  const { authUserId, userAdded } = useSelector((state) => {
    return {
      authUserId: state.authData.authUserId,
      userAdded: state.userData.userAdded,
    };
  });
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
