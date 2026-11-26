import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/btton"
import { register } from "../../api/authApi"
import { useState } from "react"
import axios from "axios"
import { Link } from "react-router"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { setCredentials } from "../../features/auth/authSlice"

export const RegisterForm = () => {
    const [fieldErrors, setFieldErrors] = useState<{
        name?: string;
        email?: string;
        password?: string;
    }>({});

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
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

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const result = await register(formData)

            setFormData({
                name: "",
                email: "",
                password: ""
            })

            dispatch(setCredentials({
                user: result.data.user,
                accessToken: result.data.accessToken
            }))

            toast.success(result.message);
            navigate("/home");
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
        <form
            onSubmit={handleRegister}
            className="bg-white h-full py-6 px-14 flex flex-col gap-4 justify-center overflow-y-auto"
        >
            <div>
                <h1 className="text-[2.5rem] font-bold">Register</h1>
                <h4>Create an account and start ordering.</h4>
            </div>

            <div className="flex flex-col gap-2">

                <Input
                    label="Name"
                    name="name"
                    type="name"
                    placeholder="Enter your name"
                    autoComplete="name"
                    className={`p-3 py-3 border 
                        ${fieldErrors.name ? "border-red-500" : "border-muted"} rounded-lg focus:outline-none focus:ring-2 
                        ${fieldErrors.name ? "focus:ring-red-500" : "focus:ring-roast"} focus:border-transparent`}
                    value={formData.name}
                    onChange={handleChange}
                    // required
                />
                {fieldErrors.name && (
                    <p className="text-red-500 text-sm">{fieldErrors.name}</p>
                )}

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
                    autoComplete="password"
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
            </div>

            <div className="flex flex-col gap-2">
                <Button
                    name="Register"
                    type="submit"
                    className="bg-roast text-cream rounded-lg p-1.5"
                />
            </div>

            <p className="text-center text-sm">
                Already have an account? <Link to="/login" className="text-roast font-semibold">Login</Link>
            </p>
        </form>
    )
}