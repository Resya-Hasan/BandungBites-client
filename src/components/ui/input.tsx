import type { InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
}

export const Input = ({ label, error, id, className = "", ...props }: InputProps) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={id}>{label}</label>

            <input
                {...props}
                id={id}
                className={`border rounded-lg ${className}`}
            />

            {error && <p>{error}</p>}
        </div>
    )
}