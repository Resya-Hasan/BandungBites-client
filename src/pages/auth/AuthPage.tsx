import { useLocation } from "react-router"
import LoginImage from "../../assets/images/login.jpg"
import BgLogin from "../../assets/images/bg-login.jpg"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"

export const AuthPage = () => {
    const { pathname } = useLocation()
    const isRegister = pathname === "/register"

    return (
        <div className="relative min-h-screen flex justify-center items-center p-6 overflow-hidden">
            <img src={BgLogin} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-cream/93" />

            {/* container: tinggi harus fixed (h-150), karena children absolute */}
            <div className="relative w-full max-w-5xl h-150 shadow-2xl rounded-xl overflow-hidden bg-white">

                {/* Image panel: geser ke kanan saat register */}
                <div
                    className={`hidden sm:block absolute top-0 left-0 w-1/2 h-full z-10 transition-transform duration-700 ease-in-out
                    ${isRegister ? "translate-x-full" : "translate-x-0"}`}
                >
                    <img src={LoginImage} alt="" className="w-full h-full object-cover scale-105" />
                </div>

                {/* Login form: awalnya di kanan, geser ke kiri + fade saat register */}
                <div
                    inert={isRegister}
                    className={`absolute top-0 left-0 w-full sm:left-1/2 sm:w-1/2 h-full transition-all duration-700 ease-in-out
                    ${isRegister ? "opacity-0 pointer-events-none md:-translate-x-full" : "opacity-100"}`}
                >
                    <LoginForm />
                </div>

                {/* Register form: awalnya di kiri, tapi digeser ke kanan & hidden saat login */}
                <div
                    inert={!isRegister}
                    className={`absolute top-0 left-0 w-full sm:w-1/2 h-full transition-all duration-700 ease-in-out
                    ${isRegister ? "opacity-100" : "opacity-0 pointer-events-none md:translate-x-full"}`}
                >
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}