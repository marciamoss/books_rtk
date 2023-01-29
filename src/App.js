import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import BookSearch from "./components/Books/Search/BookSearch";

const App = () => {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<BookSearch/>} />
            </Routes>
        </Router>
    );
}

export default App;