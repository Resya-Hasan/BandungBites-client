import {Navigate, Outlet} from "react-router"
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const ProtectedRoute = () => {
    const accessToken = useSelector(
        (state: RootState) => state.auth.accessToken
    )

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute