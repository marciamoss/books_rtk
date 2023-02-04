import React from "react";
import { useSearchBooksQuery, useSaveUserBookMutation } from '../../../store';
import {useCheckUser} from '../../../hooks';
import createBookObject from "../../../utils/createBookObject";
import Button from "../../Button";
import ExpandablePanel from '../../ExpandablePanel';
import { GiBookCover } from 'react-icons/gi';
import { RiBookMarkFill } from 'react-icons/ri';
import { AiFillShopping } from 'react-icons/ai';
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
                        <div className="w-1/10 mb-1 p-1">
                            {!bookObject.bookimg ? <GiBookCover className="w-20 h-25 mr-5"/>
                            : <img className="w-20 h-25 mr-1" src={bookObject.bookimg} alt="NoImageAvailable"/>}
                        </div>
                        <div className="w-4/5 mb-1">
                            <span className="max-[640px]:text-sm text-lg font-bold">
                                <h1 className="font-bold max-[640px]:text-sm text-lg text-left underline">{bookObject.title} {bookObject.authors}</h1>
                                    <a className="float-left border-0 mb-1 mr-2 mt-1 px-0 pt-0 pb-0 h-fit" href={bookObject.booklink} target="_blank" rel="noreferrer"><AiFillShopping size={25}/></a>
                                    <Button onClick={()=>saveBook(bookObject)} disabled={`${userInDb ? false : true}`} className={`${userInDb ? 'visible':'invisible'} border-0 mb-1 mt-1 px-0 pt-0 pb-0 h-fit`}><RiBookMarkFill size={25}/></Button>
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
