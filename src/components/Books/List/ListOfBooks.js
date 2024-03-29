import React from "react";
import { useSelector } from "react-redux";
import { useSearchBooksQuery } from "../../../store";
import { useBookAction, useSetSearchResults } from "../../../hooks";
import createBookObject from "../../../utils/createBookObject";
import Button from "../../Button";
import ExpandablePanel from "../../ExpandablePanel";
import { GiBookCover } from "react-icons/gi";
import { RiBookMarkFill } from "react-icons/ri";
import { AiFillShopping } from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";
import Skeleton from "../../Skeleton";

const ListOfBooks = ({ authUserId, userLoggedIn }) => {
  const { bookTitle, author, savedId, saveFailId, searchResults } = useSelector(
    (state) => state.book
  );
  const { data, error, isFetching } = useSearchBooksQuery({
    bookTitle,
    author,
  });
  const [saveBook, previouslySaved, saveUserBookResult] =
    useBookAction(authUserId);
  useSetSearchResults(data);

  let content;
  if (isFetching) {
    content = <Skeleton className="h-10 w-full container" times={10} />;
  } else if (searchResults.length === 0 && data?.items?.length > 0) {
    content = (
      <div className="text-center mt-28 text-green-800 font-extrabold text-2xl">
        All the books for this title have been saved, Search for a new book
      </div>
    );
  } else {
    content =
      searchResults.length > 0 ? (
        searchResults.map((book) => {
          const bookObject = createBookObject(book);
          return (
            <div className="container w-full" key={bookObject.id}>
              {savedId === bookObject.id || saveFailId === bookObject.id ? (
                <div
                  className={`flex items-center ${
                    saveFailId ? "bg-red-600" : "bg-green-500"
                  } text-white text-lg font-bold px-4 py-3" role="alert"`}
                >
                  <FaInfoCircle />
                  {saveFailId ? (
                    <p className="ml-1">Save Action Failed At This Time!</p>
                  ) : (
                    <p className="ml-1">
                      {previouslySaved
                        ? `Previously Bookmarked ${bookObject.title}`
                        : `Bookmarked ${bookObject.title}`}
                    </p>
                  )}
                </div>
              ) : (
                ""
              )}
              <div className="flex">
                <div className="w-1/10 mb-1 p-1">
                  {!bookObject.bookimg ? (
                    <GiBookCover className="w-20 h-20 mr-5" />
                  ) : (
                    <img
                      className="w-20 h-20 mr-1"
                      src={bookObject.bookimg}
                      alt="NoImageAvailable"
                    />
                  )}
                </div>
                <div className="w-4/5 mb-1">
                  <span className="max-[640px]:text-sm text-lg font-bold">
                    <h1 className="font-bold max-[640px]:text-sm text-lg text-left underline">
                      {bookObject.title} {bookObject.authors}
                    </h1>
                    <a
                      className="float-left border-0 mb-1 mr-2 mt-1 px-0 pt-0 pb-0 h-fit"
                      href={bookObject.booklink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <AiFillShopping size={25} />
                    </a>
                    <Button
                      onClick={() => saveBook(bookObject)}
                      disabled={!userLoggedIn}
                      loading={
                        bookObject.id ===
                          saveUserBookResult?.originalArgs?.id &&
                        saveUserBookResult.isLoading
                      }
                      className={`${
                        userLoggedIn ? "visible" : "invisible"
                      } border-0 mb-1 mt-1 px-0 pt-0 pb-0 h-fit`}
                    >
                      <RiBookMarkFill size={25} />
                    </Button>
                    <ExpandablePanel
                      header={<div className="font-bold">Synopsis</div>}
                    >
                      {bookObject.synopsis ? (
                        <p>{bookObject.synopsis}</p>
                      ) : (
                        "Not Available"
                      )}
                    </ExpandablePanel>
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : error ? (
        <div className="text-center mt-28 text-red-600 font-extrabold text-2xl">
          Error searching books...
        </div>
      ) : !data?.items ? (
        <div className="text-center mt-28 text-red-800 font-extrabold text-2xl">
          No books found for this title
        </div>
      ) : (
        ""
      );
  }
  return <div className="mt-20">{content}</div>;
};

export default ListOfBooks;
