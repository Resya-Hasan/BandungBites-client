import { Button } from "../../components/ui/btton"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store/store"
import { logout } from "../../features/auth/authSlice"
import { useNavigate } from "react-router"
import { logout as logoutApi } from "../../api/authApi"

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const handleLogout = async () => {
        try {
            await logoutApi()
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            dispatch(logout())
            navigate("/login")
        }
    }

    return (
        <div>
            <h1>Home</h1>
            <Button name="Log Out" className="bg-red-500 text-white hover:bg-red-600" onClick={handleLogout} />
        </div>
    )
}

export default Home