import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setBookSliceData } from '../../../store';
import "./BookSearch.css";
import ListOfBooks from "../List/ListOfBooks";
import Button from "../../Button";
import SidePanelControl from "../Saved/SidePanelControl";
import {useCheckUser} from '../../../hooks';

const BookSearch = ({authUserId, userAdded}) => {
    const dispatch = useDispatch();
    const {userInDb} = useCheckUser(authUserId, userAdded);
    const {bookTitle, author, showList, listFetching} = useSelector((state) => {
        return {
            bookTitle: state.book.bookTitle,
            author: state.book.author,
            showList: state.book.showList,
            listFetching: state.book.listFetching
        };
    });

    const fetchBooks = (event) => {
        event.preventDefault();
        if(bookTitle) {
            dispatch(setBookSliceData({showList: true}));
        }
    }

    return (
        <main className="min-h-screen w-full">
            <div className="flex">
                <div className="w-3/4 form container">
                {/* <> */}
                    {/* <div className="form container w-1/2"> */}
                        {/* <div> */}
                            <form className="text-2xl text-center font-bold" onSubmit={fetchBooks}>
                                <h2 className="text-2xl mt-3 text-center font-bold">Find Books</h2>
                                <input className="input w-full mt-1 rounded-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
                                    placeholder="Book Title (Required)"
                                    value={bookTitle}
                                    onChange={(event)=>dispatch(setBookSliceData({bookTitle: event.target.value, showList: false}))}
                                />
                                <input className="input w-full mt-3 rounded-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
                                    placeholder="Author(optional)"
                                    value={author}
                                    onChange={(event) => dispatch(setBookSliceData({author: event.target.value, showList: false}))}
                                />
                                <Button className="mt-2 float-right text-black bg-blue-300" type="submit" loading={listFetching}>
                                    Submit
                                </Button>
                                {(showList) ? <ListOfBooks bookTitle={bookTitle} author={author} authUserId={authUserId} userAdded={userAdded}/> : ''}
                            </form>
                </div>
                {authUserId && (userInDb || userAdded) ? <SidePanelControl/> : ''}
            </div>
        </main>
    )
}

export default BookSearch;