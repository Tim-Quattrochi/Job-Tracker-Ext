import { Navigate, Outlet } from "react-router-dom";
import { APP_NAME } from "../../config/constants";

const Anonymous = () => {
  const item = JSON.parse(localStorage.getItem(APP_NAME));
  const token = item?.accessToken;

  return token ? <Navigate to="/tracker" replace /> : <Outlet />;
};

export default Anonymous;
