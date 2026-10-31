import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
    const accessToken = useSelector(
        (state: RootState) => state.auth.accessToken
    )

    if (accessToken) {
        return <Navigate to="/home" replace />
    }
    
    return <Outlet />
}

export default PublicRoute