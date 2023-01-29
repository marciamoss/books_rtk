import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useSearchBooksMutation, setBookTitle } from '../../../store';
import "./BookSearch.css";
import ListOfBooks from "../List/ListOfBooks";
import Button from "../../Button";

const BookSearch = () => {
    const dispatch = useDispatch();
    const [searchBooks, results] = useSearchBooksMutation();
    const {bookTitle, author, searchResults} = useSelector((state) => {
        return {
            bookTitle: state.book.bookTitle,
            author: state.book.author,
            searchResults: state.book.searchResults,
        };
    });

    const fetchBooks = (event) => {
        event.preventDefault();
        if(bookTitle) {
            searchBooks({bookTitle, author});
        }
    }

    useEffect(() => {
        if(results?.data?.items) {
            dispatch(setBookTitle({searchResults: results?.data?.items}))
        }
    }, [results, dispatch]);

    const renderedResults = (searchResults.length > 0) ? searchResults.map((book) => (
        <ListOfBooks book={book} key={book.id}></ListOfBooks>
    )) : '';

    return (
        <>
        <div className="form container w-1/2">
            <div>
                <h2 className="text-2xl mt-3 text-center font-bold">Find Books</h2>
                <form className="text-2xl text-center font-bold" onSubmit={fetchBooks}>
                    <input className="input w-full mt-1 rounded-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
                        placeholder="Book Title (Required)"
                        value={bookTitle}
                        onChange={(event)=>dispatch(setBookTitle({bookTitle: event.target.value}))}
                    />
                    <input className="input w-full mt-3 rounded-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
                        placeholder="Author(optional)"
                        value={author}
                        onChange={(event) => dispatch(setBookTitle({author: event.target.value}))}
                    />
                    <Button className="mt-2 float-right text-black bg-blue-300" type="submit" loading={results.isLoading}>
                        Submit
                    </Button>
                </form>
            </div>
        </div>
        {results.isError ?
            <div className="text-center mt-28 text-red-600 font-extrabold text-2xl">Error fetching data... "{results.error.data.error.message}"</div>
        :''}
        <div className="mt-28 container w-1/2">{renderedResults}</div>
        </>
    )
}

export default BookSearch;