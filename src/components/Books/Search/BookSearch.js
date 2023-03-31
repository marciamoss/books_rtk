import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBookSliceData } from "../../../store";
import "./BookSearch.css";
import ListOfBooks from "../List/ListOfBooks";
import Button from "../../Button";
import SidePanel from "../Saved/SidePanel";
import { useCheckUser } from "../../../hooks";
import { BsSearch } from "react-icons/bs";

const BookSearch = ({ authUserId, userAdded }) => {
  const dispatch = useDispatch();
  const { userInDb } = useCheckUser(authUserId, userAdded);
  const { bookTitle, author, showList, listFetching } = useSelector(
    (state) => state.book
  );

  const showBooks = (event) => {
    event.preventDefault();
    if (bookTitle) {
      dispatch(setBookSliceData({ showList: true }));
    }
  };

  return (
    <main className="min-h-screen w-full">
      <div className="flex">
        <div className="w-3/4 form container">
          <form
            className="max-[640px]:text-sm text-lg font-bold"
            onSubmit={showBooks}
          >
            <h2 className="max-[640px]:text-sm text-lg mt-3 font-bold">
              Find Books
            </h2>
            <input
              className="input w-full mt-1 rounded-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
              placeholder="Book Title (Required)"
              value={bookTitle}
              onChange={(event) =>
                dispatch(
                  setBookSliceData({
                    bookTitle: event.target.value,
                    showList: false,
                  })
                )
              }
            />
            <input
              className="input w-full mt-3 rounded-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
              placeholder="Author(optional)"
              value={author}
              onChange={(event) =>
                dispatch(
                  setBookSliceData({
                    author: event.target.value,
                    showList: false,
                  })
                )
              }
            />
            <Button
              className="mt-2 float-right border-0"
              type="submit"
              loading={listFetching}
            >
              <BsSearch size={25} />
            </Button>
            {showList ? (
              <ListOfBooks
                bookTitle={bookTitle}
                author={author}
                authUserId={authUserId}
                userAdded={userAdded}
              />
            ) : (
              ""
            )}
          </form>
        </div>
        <SidePanel userId={authUserId} userInDb={userInDb} />
      </div>
    </main>
  );
};

export default BookSearch;
