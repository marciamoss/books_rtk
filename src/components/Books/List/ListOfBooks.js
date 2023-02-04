import React from "react";
import { useSearchBooksQuery, useSaveUserBookMutation } from '../../../store';
import {useCheckUser} from '../../../hooks';
import createBookObject from "../../../utils/createBookObject";
import Button from "../../Button";
import ExpandablePanel from '../../ExpandablePanel';
import { GiBookCover } from 'react-icons/gi';
import Skeleton from '../../Skeleton';

const ListOfBooks = ({bookTitle, author, authUserId, userAdded}) => {
    const {userInDb} = useCheckUser(authUserId, userAdded);
    const {data, error, isFetching} = useSearchBooksQuery({bookTitle, author});
    const [saveUserBook] = useSaveUserBookMutation();
    const saveBook = (book) => {
        saveUserBook({...book, ...{userId: authUserId}});
    }
    let content;
    if (isFetching) {
        content = <Skeleton className="h-10 w-full container" times={10} />;
    } else {
        content = (data?.items?.length > 0) ? data?.items?.map((book) => {
            const bookObject = createBookObject(book);
            return (
                <div className="container w-full" key={bookObject.id}>
                    <div className="flex">
                        <div className="w-1/10 mb-3">
                            {!bookObject.bookimg ? <GiBookCover className="w-20 h-fit mr-5"/>
                            : <img className="w-20 h-fit mr-5" src={bookObject.bookimg} alt="NoImageAvailable"/>}
                        </div>
                        <div className="w-4/5 mb-3">
                            <span className="max-[640px]:text-sm text-lg font-bold">
                                <h1 className="font-bold max-[640px]:text-sm text-lg text-left underline">{bookObject.title} {bookObject.authors}</h1>
                                    <Button className={`${userInDb ? 'float-left mr-3' : 'mb-2'} mt-3 font-bold text-black border-0 bg-gray-300`}>
                                        <a href={bookObject.booklink} target="_blank" rel="noreferrer">Buy</a>
                                    </Button>
                                    {userInDb ? <Button onClick={()=>saveBook(bookObject)} className="font-bold text-black border-0 mt-3 mb-2 bg-blue-200">Save</Button> : ''}
                                    <ExpandablePanel header={<div className="font-bold">Synopsis</div>}>
                                        {bookObject.synopsis ? <p>{bookObject.synopsis}</p> : 'Not Available'}
                                    </ExpandablePanel>
                            </span>
                        </div>
                    </div>
                </div>
            );
        })
        :
            error ? <div className="text-center mt-28 text-red-600 font-extrabold text-2xl">Error searching books...</div>
        :   !(data?.items) ? <div className="text-center mt-28 text-red-800 font-extrabold text-2xl">No books found for this title</div> : '';
    }
    return <div className="mt-20">
        {content}
    </div>
};

export default ListOfBooks;
