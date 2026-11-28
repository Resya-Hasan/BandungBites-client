import type { InputHTMLAttributes, ReactNode } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    icon?: ReactNode;
    iconStyle?: string;
}

export const Input = ({ label, error, id, icon, iconStyle, className = "", ...props }: InputProps) => {
    return (
        <div className="flex flex-col gap-2 mb-1">
            <label htmlFor={id}>{label}</label>
            <label htmlFor={id} className={`flex items-center gap-3  ${className}`}>
                {icon && <div className={` ${iconStyle}`}>{icon}</div>}

                <input
                    {...props}
                    id={id}
                    className={`outline-none`}
                />
            </label>

            {error && <p>{error}</p>}
        </div>
    )
}