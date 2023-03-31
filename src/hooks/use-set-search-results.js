import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBookSliceData } from "../store";
import uniqby from "lodash.uniqby";

function useSetSearchResults(data) {
  const dispatch = useDispatch();
  const { savedBooks } = useSelector((state) => state.book);
  useEffect(() => {
    if (data?.items) {
      dispatch(setBookSliceData({ searchResults: uniqby(data?.items, "id") }));
    }
  }, [data?.items, dispatch]);

  useEffect(() => {
    if (savedBooks.length === 0 && data?.items) {
      dispatch(setBookSliceData({ searchResults: uniqby(data?.items, "id") }));
    }
  }, [data?.items, savedBooks, dispatch]);
}
export default useSetSearchResults;
