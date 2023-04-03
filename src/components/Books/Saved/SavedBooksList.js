import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useFetchUserBooksQuery,
  useDeleteUserBookMutation,
} from "../../../store";
import Skeleton from "../../Skeleton";
import { GiBookCover } from "react-icons/gi";
import ExpandablePanel from "../../ExpandablePanel";
import ConfirmModal from "../../ConfirmModal";
import Button from "../../Button";
import { BiTrash, BiShoppingBag } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";

const SavedBooksList = () => {
  const { deleteFailId } = useSelector((state) => state.book);
  const { authUserId } = useSelector((state) => state.authData);
  const { data, error, isFetching } = useFetchUserBooksQuery(authUserId);
  const [deleteUserBook] = useDeleteUserBookMutation();

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [current, setCurrent] = useState("");

  const deletBook = (book) => {
    setCurrent(book);
    setDeleteConfirm(true);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-10 w-full" times={5} />;
  } else {
    content =
      data?.length > 0 ? (
        data?.map((bookObject) => {
          return (
            <div className="container w-full" key={bookObject.id}>
              {deleteFailId === bookObject.id ? (
                <div
                  className="flex items-center bg-red-600 text-white text-lg font-bold px-4 py-3"
                  role="alert"
                >
                  <FaInfoCircle />
                  <p className="ml-1">Delete Action Failed At This Time!</p>
                </div>
              ) : (
                ""
              )}
              <div className="flex">
                <div className="w-1/10 mb-1 p-1">
                  {!bookObject.bookimg ? (
                    <GiBookCover className="w-10 h-10 mr-5" />
                  ) : (
                    <img
                      className="w-10 h-10 mr-1"
                      src={bookObject.bookimg}
                      alt="NoImageAvailable"
                    />
                  )}
                </div>
                <div className="w-4/5 mb-1">
                  <span className="text-sm">
                    <h1 className="text-sm text-left underline">
                      {bookObject.title} {bookObject.authors}
                    </h1>
                    <a
                      className="float-left border-0 mr-2 mb-1 mt-1 px-0 pt-0 pb-0 h-fit"
                      href={bookObject.booklink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <BiShoppingBag size={25} />
                    </a>
                    <Button
                      onClick={() => deletBook(bookObject)}
                      className={`border-0 mb-1 mt-1 px-0 pt-0 pb-0 h-fit`}
                    >
                      <BiTrash size={25} />
                    </Button>
                    <ExpandablePanel header={<div>Synopsis</div>}>
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
          Error fetching user books..."
        </div>
      ) : data?.length === 0 ? (
        <div className="text-center mt-28 text-red-800 font-extrabold text-2xl">
          You haven't save any books yet
        </div>
      ) : (
        ""
      );
  }

  return (
    <div>
      {deleteConfirm ? (
        <ConfirmModal
          setDeleteConfirm={setDeleteConfirm}
          deleteUserBook={deleteUserBook}
          book={current}
          confirmMessage={`Delete Confirmation on "${current.title}"?`}
        />
      ) : (
        ""
      )}
      {content}
    </div>
  );
};

export default SavedBooksList;
