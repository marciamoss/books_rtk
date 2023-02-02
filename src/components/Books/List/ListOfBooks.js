import React, { useEffect, useState } from "react";
import { useSearchBooksQuery, useFetchUserQuery } from '../../../store';
import { useSelector } from 'react-redux';
import createBookObject from "../../../utils/createBookObject";
import Button from "../../Button";
import ExpandablePanel from '../../ExpandablePanel';
import { GiBookCover } from 'react-icons/gi';
import Skeleton from '../../Skeleton';

const ListOfBooks = ({bookTitle, author, authUserId, userAdded}) => {
    const [saveNa, setSaveNa] = useState('');
    const [saveButton, setSaveButton] = useState('');
    const [saveButtonCn, setSaveButtonCn] = useState('');
    const {data, error, isFetching} = useSearchBooksQuery({bookTitle, author});

    const { refetch } = useFetchUserQuery(authUserId);

    const {signedIn} = useSelector((state) => {
        return {
            signedIn: state.authData.signedIn
        };
    });

    useEffect(() => {
        const checkUser  = async () => {
            try{
                const inDb =  (await refetch(authUserId).unwrap());
                if(inDb.length>0 || userAdded) {
                    setSaveNa('');
                    setSaveButtonCn('float-left mr-3');
                    setSaveButton(<Button className="font-bold text-black border-0 mt-3 mb-2 bg-blue-200">Save</Button>);
                }else {
                    setSaveNa("**Save functionality not available for this login at this time**")
                }
            } catch (error) {setSaveNa("**Save functionality not available for this login at this time**")};
        };
        if (signedIn) {
            checkUser();
        } else {
            setSaveNa("");
            setSaveButton("");
            setSaveButtonCn('mb-2');
        }
    },[signedIn, refetch, authUserId, userAdded])

    let content;
    if (isFetching) {
        content = <Skeleton className="h-10 w-1/2 container" times={10} />;
    } else {
        content = (data?.items?.length > 0) ? data?.items?.map((book) => {
            const bookObject = createBookObject(book);
            return (
                <div className="container w-1/2" key={bookObject.id}>
                    <div className="flex">
                        <div className="w-1/10 mb-3">
                            {!bookObject.bookimg ? <GiBookCover className="w-20 h-fit mr-5"/>
                            : <img className="w-20 h-fit mr-5" src={bookObject.bookimg} alt="NoImageAvailable"/>}
                        </div>
                        <div className="w-4/5 mb-3">
                            <span className="text-lg font-bold">
                                <h1 className="font-bold text-xl underline">{bookObject.title} {bookObject.authors}</h1>
                                    <Button className={`${saveButtonCn} mt-3 font-bold text-black border-0 bg-gray-300`}>
                                        <a href={bookObject.booklink} target="_blank" rel="noreferrer">Buy</a>
                                    </Button>
                                    {saveButton}
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
            error ? <div className="text-center mt-28 text-red-600 font-extrabold text-2xl">Error fetching data... "{error.data.error.message}"</div>
        :   !(data?.items) ? <div className="text-center mt-28 text-red-800 font-extrabold text-2xl">No books found for this title</div> : '';
    }
    return <div className="mt-20">
        {saveNa ? <div className="container italic underline text-center text-red-800 text-xl font-bold w-1/2 mb-10">{saveNa}</div> : ''}
        {content}
    </div>
};

export default ListOfBooks;
