import React from "react";
import { useSelector } from 'react-redux';
import createBookObject from "../../../utils/createBookObject";
import Button from "../../Button";

const ListOfBooks = ({book}) => {
    const bookObject = createBookObject(book);
    const {signedIn} = useSelector((state) => {
        return {
            signedIn: state.authData.signedIn,
        };

    });
    return (
        <div className="container">
            <ul className="mb-8 space-y-4 text-left text-gray-500 dark:text-gray-400">
                <li className="flex items-center space-x-3">
                    <img className="inline h-25 w-20" src={bookObject.bookimg} alt="NoImageAvailable"/>
                    <span className="text-black text-lg text-bold">
                        <h1 className="text-bold text-2xl underline">{bookObject.title} {bookObject.authors}</h1>
                            <Button className={`${signedIn ? 'float-left mr-3' : 'mb-2'} mt-3 font-bold text-black border-0 bg-gray-300`}>
                                <a href={bookObject.booklink} target="_blank" rel="noreferrer">Buy</a>
                            </Button>
                            {signedIn ? 
                                <Button className="font-bold text-black border-0 mt-3 mb-2 bg-blue-500">Save</Button>
                            : ''}
                        <p className="text-bold text-xl">{bookObject.synopsis}</p>
                    </span>
                </li>
            </ul>
        </div>
      );
};

export default ListOfBooks;
