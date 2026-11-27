// UserDropdown.tsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";

type Props = {
    avatar: string;
    onLogout: () => void;
};

export default function UserDropdown({ avatar, onLogout }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        document.addEventListener("mousedown", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    return (
        <div ref={ref} className="relative mt-1">
            <button
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={open}
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-amber"
            >
                <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
            </button>

            <div
                role="menu"
                className={`absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-sand shadow-xl border border-espresso/10 
                transition-all duration-200 ease-out
                ${open
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}`}
            >
                <Link
                    to="/profile"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-espresso hover:bg-sand-dark rounded-t-md"
                >
                    Profile
                </Link>
                <button
                    role="menuitem"
                    onClick={() => {
                        setOpen(false);
                        onLogout();
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-sand-dark rounded-b-md cursor-pointer"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}