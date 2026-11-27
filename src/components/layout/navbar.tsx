// import { Button } from "../../components/ui/btton"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/store"
import { logout } from "../../features/auth/authSlice"
import { useNavigate, Link } from "react-router"
import { logout as logoutApi } from "../../api/authApi"
import UserDropdown from "./userDropdown"

export const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const accessToken = useSelector(
        (state: RootState) => state.auth.accessToken
    )

    const avatar = useSelector(
        (state: RootState) => state.auth.user?.avatar
    )

    const isAuthenticated = Boolean(accessToken)

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
        <nav className="navbar flex justify-between items-center p-4 bg-sand border-b border-espresso/20">
            <div className="logo">
                <h1 className="font-serif text-2xl font-bold text-espresso">Bandung Bites</h1>
            </div>
            <div className="nav-links flex space-x-4">
                {isAuthenticated ? (
                    <div className="flex items-center space-x-4">
                        <Link to="/cart" className="text-espresso hover:text-amber">Cart</Link>
                        <Link to="/favorites" className="text-espresso hover:text-amber">Favorites</Link>
                        <UserDropdown avatar={avatar || ""} onLogout={handleLogout} />
                    </div>
                ) : (
                    <>
                        <Link
                            to="/register"
                            className="text-roast border border-roast rounded-md py-2 px-4 hover:text-white hover:bg-roast/95 hover:border-roast/95 transition duration-300 ease-in-out"
                        >
                            Register
                        </Link>
                        <Link
                            to="/login"
                            className="bg-roast text-white rounded-md py-2 px-4 hover:bg-roast/95 transition duration-300 ease-in-out"
                        >
                            Login
                        </Link>
                    </>
                )}

            </div>
        </nav>
    )
}