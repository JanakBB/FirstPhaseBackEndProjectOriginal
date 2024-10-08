import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const {userInfo} = useSelector(state => state.auth);
    return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/signin" />
}

export default AdminRoute;
