import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBookSliceData, authDataInfo } from "../../../store";
import "./BookSearch.css";
import ListOfBooks from "../List/ListOfBooks";
import Button from "../../Button";
import SidePanel from "../Saved/SidePanel";
import Header from "../../../components/Header/Header";
import MessageModal from "../../../components/Message/MessageModal";
import { useCheckUser } from "../../../hooks";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { MdOutlineSearchOff, MdOutlineSearch } from "react-icons/md";

const BookSearch = () => {
  const dispatch = useDispatch();
  const { authUserId, userName, email, showAutoLogout, showAutoLogin } =
    useSelector((state) => state.authData);
  const [userLoggedIn] = useCheckUser(authUserId);
  const { bookTitle, author, showList, listFetching } = useSelector(
    (state) => state.book
  );
  const [hidePanel, setHidePanel] = useState("invisible");
  const [disablePanel, setDisablePanel] = useState(true);
  useEffect(() => {
    if (userLoggedIn) {
      setHidePanel("visible");
      setDisablePanel(false);
    } else {
      setHidePanel("invisible");
      setDisablePanel(true);
    }
  }, [userLoggedIn]);

  const showBooks = (event) => {
    event.preventDefault();
    if (bookTitle) {
      dispatch(setBookSliceData({ showList: true }));
    }
  };

  return (
    <main className="min-h-screen w-full">
      <Header userLoggedIn={userLoggedIn} />
      <div className="flex flex-col">
        <div className="p-2">
          <button
            disabled={disablePanel}
            className={`${hidePanel} max-[640px]:text-sm text-lime-900 font-bold text-lg float-right`}
            onClick={() => dispatch(setBookSliceData({ sliderOpen: true }))}
          >
            <div className="flex animate-bounce">
              <BsChevronDoubleLeft size={40} />
              <p className="self-center">Open Sesame</p>
            </div>
          </button>
        </div>
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
              className="mt-2 float-right border-0 mr-0"
              type="submit"
              disabled={!bookTitle}
              loading={listFetching}
            >
              {bookTitle ? (
                <MdOutlineSearch className="text-lime-900 text-3xl" />
              ) : (
                <MdOutlineSearchOff className="text-slate-200 text-3xl" />
              )}
            </Button>
            {showList ? (
              <ListOfBooks
                authUserId={authUserId}
                userLoggedIn={userLoggedIn}
              />
            ) : (
              ""
            )}
          </form>
        </div>
        <SidePanel hidePanel={hidePanel} userLoggedIn={userLoggedIn} />
      </div>
      {showAutoLogout ? (
        <MessageModal
          showModal={showAutoLogout}
          dispatchType={() => {
            dispatch(setBookSliceData({ sliderOpen: false }));
            dispatch(authDataInfo({ showAutoLogout: false }));
          }}
          message={`You have been logged out from another session on this window, Sign In again to continue`}
          modalColor={"bg-orange-900"}
        />
      ) : (
        ""
      )}
      {showAutoLogin ? (
        <MessageModal
          showModal={showAutoLogin}
          dispatchType={() => dispatch(authDataInfo({ showAutoLogin: false }))}
          message={`You have previously logged into this application using
            ${email ? email : userName}
           on this window, Sign out if you want to use a different account`}
          modalColor={"bg-green-900"}
        />
      ) : (
        ""
      )}
    </main>
  );
};

export default BookSearch;
