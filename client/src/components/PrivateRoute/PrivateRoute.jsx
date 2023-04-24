import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  return state?.logged ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
