import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/btton"
import { login } from "../../api/authApi"
import { useState } from "react"
import axios from "axios"
import { Link } from "react-router"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store/store"
import { setCredentials } from "../../features/auth/authSlice"
import { useNavigate } from "react-router"
import LoginImage from "../../assets/images/login.jpg"
import BgLogin from "../../assets/images/bg-login.jpg"

export const Login = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const result = await login(formData)

            dispatch(setCredentials({
                user: result.data.user,
                accessToken: result.data.accessToken
            }))

            setFormData({
                email: "",
                password: ""
            })

            console.log(result)

            navigate("/home")
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message;

                console.error(message ?? "Login failed");
            } else {
                console.error("An unexpected error occurred");
            }
        }
    }

    return (
        <div className="relative min-h-screen flex justify-center items-center p-6 overflow-hidden">
            <img
                src={BgLogin}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-cream/93"></div>

            <div className="relative flex w-full max-w-5xl min-h-150 shadow-2xl rounded-xl overflow-hidden">
                {/* Image */}
                <div className="w-1/2">
                    <img
                        src={LoginImage}
                        alt="Login"
                        className="w-full h-full object-cover scale-105"
                    />
                </div>

                {/* Form */}
                <form
                    onSubmit={handleLogin}
                    className="bg-white p-6 px-14 flex flex-col gap-12 w-1/2 justify-center"
                >
                    <div>
                        <h1 className="text-[2.5rem] font-bold">Login</h1>
                        <h4>Good food is just a few clicks away. Sign in to continue your journey.</h4>
                    </div>


                    <div className="flex flex-col gap-4">
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            className="p-3 py-3 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-roast focus:border-transparent"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            className="p-3 py-3 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-roast focus:border-transparent"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <p className="text-[0.85rem] text-muted-foreground text-right">
                            forgot your password? <Link to="/forgot-password" className="text-roast font-semibold">Reset it</Link>
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button
                            name="Submit"
                            type="submit"
                            className="bg-roast text-cream rounded-lg p-1.5"
                        />

                        <div className="flex w-full items-center gap-2">
                            <div className="flex-1 border-t border-roast"></div>
                            <p className="text-center">or</p>
                            <div className="flex-1 border-t border-roast"></div>
                        </div>

                        <Button
                            name="Google"
                            // type="submit"
                            className="bg-roast text-cream rounded-lg p-1.5"
                        />
                    </div>

                    <p className="text-center text-sm">
                        Don't have an account? <Link to="/register" className="text-roast font-semibold">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}