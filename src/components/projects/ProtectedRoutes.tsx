import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

export const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn.value);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export const UnprotectedRoute = () => {
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn.value);
  return !isLoggedIn ? <Outlet /> : <Navigate to="/edit" replace />;
};
