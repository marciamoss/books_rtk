import React from "react";
import { useFetchBooksQuery } from '../../../store';
import Skeleton from '../../Skeleton';
import { GiBookCover } from 'react-icons/gi';
import ExpandablePanel from '../../ExpandablePanel';

const SavedBooksList = ({userId}) => {
    const {data, error, isFetching} = useFetchBooksQuery(userId);

    let content;
    if (isFetching) {
        content = <Skeleton className="h-10 w-full" times={5} />;
    } else {
        content = (data?.length > 0) ? data?.map((bookObject) => {
            return (
                <div className="container w-full" key={bookObject.id}>
                    <div className="flex">
                        <div className="w-1/10 mb-3">
                            {!bookObject.bookimg ? <GiBookCover className="w-10 h-fit mr-5"/>
                            : <img className="w-10 h-fit mr-5" src={bookObject.bookimg} alt="NoImageAvailable"/>}
                        </div>
                        <div className="w-4/5 mb-3">
                            <span className="text-sm">
                                <h1 className="text-sm text-left underline">{bookObject.title} {bookObject.authors}</h1>
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
        error ? <div className="text-center mt-28 text-red-600 font-extrabold text-2xl">Error fetching user books..."</div>
        :   (data?.length === 0) ? <div className="text-center mt-28 text-red-800 font-extrabold text-2xl">You haven't save any books yet</div> : '';
    }

    return (
        <div>{content}</div>
    )
}

export default SavedBooksList;
