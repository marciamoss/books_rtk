import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLogInMutation, authDataInfo } from "../store";
const keys = require("../keys.js");

function useInitAuth() {
  const dispatch = useDispatch();
  const [logIn] = useLogInMutation();
  const { token, authUserId, userName, email } = localStorage.getItem(
    "books_rtk"
  )
    ? JSON.parse(localStorage.getItem("books_rtk"))
    : "";

  useEffect(() => {
    if (authUserId) {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: keys.gAuth.clientId,
          auto_select: false,
        });
      }
      dispatch(
        authDataInfo({
          signedIn: true,
          token,
          authUserId,
          email,
          userName,
          showError: false,
          errorMessage: null,
        })
      );
    } else {
      logIn({ authDataInfo, initialRender: true });
    }
  }, [dispatch, logIn, token, authUserId, email, userName]);
}

export default useInitAuth;
