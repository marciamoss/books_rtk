import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validRoute } from "../store";

function useCheckRoute() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(
      validRoute({
        validRoute: ["/"].filter((r) => r === location.pathname).length > 0,
      })
    );
  }, [dispatch, location.pathname]);
}
export default useCheckRoute;
