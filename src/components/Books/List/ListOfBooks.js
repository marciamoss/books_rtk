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
            <div className="flex">
                <div className="w-1/10 mb-3">
                    {!bookObject.bookimg ? <GiBookCover className="w-20 h-fit mr-5"/>
                    : <img className="w-20 h-fit mr-5" src={bookObject.bookimg} alt="NoImageAvailable"/>}
                </div>
                <div className="w-4/5 mb-3">
                    <span className="text-black text-lg text-bold">
                        <h1 className="text-bold text-xl underline">{bookObject.title} {bookObject.authors}</h1>
                            <Button className={`${signedIn ? 'float-left mr-3' : 'mb-2'} mt-3 font-bold text-black border-0 bg-gray-300`}>
                                <a href={bookObject.booklink} target="_blank" rel="noreferrer">Buy</a>
                            </Button>
                            {signedIn ? 
                                <Button className="font-bold text-black border-0 mt-3 mb-2 bg-blue-200">Save</Button>
                                : ''}
                            {bookObject.synopsis ? <p className="text-bold">{bookObject.synopsis}</p> : ''}
                    </span>
                </div>
            </div>
        </div>
      );
};

export default ListOfBooks;
