import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/btton"
import { register } from "../../api/authApi"
import { useState } from "react"
import axios from "axios"
import { Link } from "react-router"

export const Register = () => {
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

            console.log(result)
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message;

                console.error(message ?? "Register failed");
            } else {
                console.error("An unexpected error occurred");
            }
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <form
                onSubmit={handleRegister}
                className="bg-white p-6 shadow-lg rounded-xl flex flex-col gap-4 w-100 justify-center"
            >
                <h1 className="text-[2.5rem] text-center">Register</h1>

                <Input
                    label="Name"
                    name="name"
                    type="name"
                    placeholder="Enter your name"
                    autoComplete="name"
                    className="p-2"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="p-2"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="password"
                    className="p-2"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <Button
                    name="Submit"
                    type="submit"
                    className="bg-roast text-cream rounded-lg p-1.5"
                />

                <p className="text-center text-sm">
                    Already have an account? <Link to="/login" className="text-roast font-semibold">Login</Link>
                </p>
            </form>
        </div>
    )
}