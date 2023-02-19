import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLogInMutation, authDataInfo } from "../store";

function useInitAuth() {
  const dispatch = useDispatch();
  const [logIn] = useLogInMutation();

  useEffect(() => {
    logIn({ authDataInfo, initialRender: true });
  }, [dispatch, logIn]);
}

export default useInitAuth;
