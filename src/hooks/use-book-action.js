import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setBookSliceData,
  resetAlertPopup,
  useSaveUserBookMutation,
  useFetchUserBooksQuery,
} from "../store";

function useBookAction(authUserId) {
  const dispatch = useDispatch();
  const [saveUserBook, saveUserBookResult] = useSaveUserBookMutation();
  const [previouslySaved, setPreviouslySaved] = useState(false);
  useFetchUserBooksQuery(authUserId);

  const { savedBooks, savedId, saveFailId, deleteFailId } = useSelector(
    (state) => state.book
  );
  const saveBook = (book) => {
    if (
      JSON.parse(localStorage.getItem("books_rtk"))?.authUserId &&
      JSON.parse(localStorage.getItem("books_rtk"))?.authUserId === authUserId
    ) {
      if (savedBooks.filter((s) => s.id === book.id).length > 0) {
        setPreviouslySaved(true);
        dispatch(setBookSliceData({ savedId: book.id }));
      } else {
        saveUserBook({ ...book, ...{ userId: authUserId } });
      }
    }
  };

  const resetAlert = useCallback(
    (id) =>
      setTimeout(() => {
        setPreviouslySaved(false);
        dispatch(resetAlertPopup(id));
      }, 1500),
    [dispatch]
  );

  useEffect(() => {
    if (savedId) {
      resetAlert({ savedId });
    }
    if (saveFailId) {
      resetAlert({ saveFailId });
    }
    if (deleteFailId) {
      resetAlert({ deleteFailId });
    }
  }, [savedId, saveFailId, deleteFailId, dispatch, resetAlert]);

  return [saveBook, previouslySaved, saveUserBookResult];
}

export default useBookAction;
