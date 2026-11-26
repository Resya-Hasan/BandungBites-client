import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/btton"
import { login } from "../../api/authApi"
import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store/store"
import { setCredentials } from "../../features/auth/authSlice"
import toast from "react-hot-toast"

export const LoginForm = () => {
    const [fieldErrors, setFieldErrors] = useState<{
        email?: string;
        password?: string;
    }>({});

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

            toast.success(result.message);

            navigate("/home")
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const response = err.response?.data;

                if (response?.errors) {
                    const errors: Record<string, string> = {};

                    response.errors.forEach(
                        (error: { field: string; message: string }) => {
                            errors[error.field] = error.message;
                        }
                    )
                    setFieldErrors(errors);
                }
            } else {
                console.error("An unexpected error occurred");
            }
        }
    }

    return (
        < form
            onSubmit={handleLogin}
            className="bg-white h-full py-6 px-14 flex flex-col gap-4 justify-center overflow-y-auto"
        >
            <div>
                <h1 className="text-[2.5rem] font-bold">Login</h1>
                <h4>Good food is just a few clicks away. Sign in to continue your journey.</h4>
            </div>


            <div className="flex flex-col gap-1">
                <Input
                    label="Email"
                    name="email"
                    type="name"
                    placeholder="Enter your email"
                    autoComplete="email"
                    className={`p-3 py-3 border 
                        ${fieldErrors.email ? "border-red-500" : "border-muted"} rounded-lg focus:outline-none focus:ring-2 
                        ${fieldErrors.email ? "focus:ring-red-500" : "focus:ring-roast"} focus:border-transparent`}
                    value={formData.email}
                    onChange={handleChange}
                    // required
                />
                {fieldErrors.email && (
                    <p className="text-red-500 text-sm">{fieldErrors.email}</p>
                )}

                <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={`p-3 py-3 border 
                        ${fieldErrors.password ? "border-red-500" : "border-muted"} rounded-lg focus:outline-none focus:ring-2 
                        ${fieldErrors.password ? "focus:ring-red-500" : "focus:ring-roast"} focus:border-transparent`}
                    value={formData.password}
                    onChange={handleChange}
                    // required
                />

                {fieldErrors.password && (
                    <p className="text-red-500 text-sm">{fieldErrors.password}</p>
                )}

                <p className="text-[0.85rem] text-muted-foreground text-right mt-0.5">
                    forgot your password? <Link to="/forgot-password" className="text-roast font-semibold">Reset it</Link>
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <Button
                    name="Login"
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
        </form >
    )
}