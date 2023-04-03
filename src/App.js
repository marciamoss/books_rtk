import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookSearch from "./components/Books/Search/BookSearch";
import { useInitAuth } from "./hooks";

const App = () => {
  useInitAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookSearch />} />
      </Routes>
    </Router>
  );
};

export default App;
