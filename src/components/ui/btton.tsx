import type { ButtonHTMLAttributes } from "react";

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    name: string;
}

export const Button = ({ name, className = "", ...props }: buttonProps) => {
    return (
        <button
            {...props}
            className={`${className}`}
        >
            {name}
        </button>
    )
}