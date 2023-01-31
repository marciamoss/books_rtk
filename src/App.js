import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import BookSearch from "./components/Books/Search/BookSearch";

const App = () => {
    const {authUserId} = useSelector((state) => {
        return {
            authUserId: state.authData.authUserId
        };
    });
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<BookSearch authUserId={authUserId}/>} />
            </Routes>
        </Router>
    );
}

export default App;