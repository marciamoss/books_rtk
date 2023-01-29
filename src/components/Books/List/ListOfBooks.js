import React from "react";
import { useSelector } from 'react-redux';
import createBookObject from "../../../utils/createBookObject";
import Button from "../../Button";
import { GiBookCover } from 'react-icons/gi';

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
                {!bookObject.bookimg ? <GiBookCover className="align-middle float-left max-w-full w-20 h-fit mr-5"/> : <img className="align-middle float-left max-w-full w-20 h-fit mr-5" src={bookObject.bookimg} alt="NoImageAvailable"/>}
                <li className="flex items-left space-x-6">
                    <span className="text-black text-lg text-bold">
                        <h1 className="text-bold text-xl underline">{bookObject.title} {bookObject.authors}</h1>
                            <Button className={`${signedIn ? 'float-left mr-3' : 'mb-2'} mt-3 font-bold text-black border-0 bg-gray-300`}>
                                <a href={bookObject.booklink} target="_blank" rel="noreferrer">Buy</a>
                            </Button>
                            {signedIn ? 
                                <Button className="font-bold text-black border-0 mt-3 mb-2 bg-blue-200">Save</Button>
                            : ''}
                        <p className="text-bold">{bookObject.synopsis}</p>
                    </span>
                </li>
            </ul>
        </div>
      );
};

export default ListOfBooks;
