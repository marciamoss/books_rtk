import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authDataInfo } from "../store";

function useCheckUser(authUserId) {
  const dispatch = useDispatch();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const localAuthUserId = localStorage.getItem("books_rtk")
    ? JSON.parse(localStorage.getItem("books_rtk"))
    : "";

  useEffect(() => {
    if (!localAuthUserId?.authUserId && authUserId) {
      dispatch(authDataInfo({ showAutoLogout: true }));
    }
    if (authUserId && localAuthUserId?.authUserId === authUserId) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [authUserId, localAuthUserId, dispatch]);
  return [userLoggedIn];
}
export default useCheckUser;
