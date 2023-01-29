import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useSearchBooksMutation } from '../../../store';
import "./BookSearch.css";
import ListOfBooks from "../List/ListOfBooks";
import Button from "../../Button";

const BookSearch = () => {
    const [bookTitle, setbookTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [searchBooks, results] = useSearchBooksMutation();

    const fetchBooks = (event) => {
        event.preventDefault();
        if(bookTitle) {
            searchBooks({bookTitle, author});
        }
    }

    const renderedResults = (results?.data?.items?.length > 0) ? results?.data?.items?.map((book) => (
        <ListOfBooks book={book} key={book.id}></ListOfBooks>
    )) : '';

    return (
        <>
        <div className="form container">
            <div>
                <h2 className="text-2xl mt-3 text-center font-bold">Find Books</h2>
                <form className="text-2xl text-center font-bold" onSubmit={fetchBooks}>
                    <input className="input w-full mt-1 rounded-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
                        placeholder="Book Title (Required)"
                        value={bookTitle}
                        onChange={(e) => setbookTitle(e.target.value)}
                    />
                    <input className="input w-full mt-3 rounded-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
                        placeholder="Author(optional)"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    <Button className="mt-2 float-right text-black bg-blue-500" type="submit" loading={results.isLoading}>
                        Submit
                    </Button>
                </form>
            </div>
        </div>
        {results.isError ?
            <div className="text-center mt-28 text-red-600 font-extrabold text-2xl">Error fetching data... "{results.error.data.error.message}"</div>
        :''}
        <div className="mt-28">{renderedResults}</div>
        </>
    )
}

export default BookSearch;