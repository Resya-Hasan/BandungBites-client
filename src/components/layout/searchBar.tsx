// components/layout/SearchBar.tsx
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router"
import { CiSearch } from "react-icons/ci"
import { Input } from "../ui/input"
import { getAllMenuItems } from "../../api/menuItemApi"

type MenuItem = {
    _id: string
    name_id: string
    name_en: string
    imageUrl: string | null
    price: number
    category: { _id: string; name_id: string }
}

export const SearchBar = () => {
    const [search, setSearch] = useState("")
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!search.trim()) {
            setMenuItems([])
            setOpen(false)
            return
        }

        let cancelled = false
        const timeout = setTimeout(async () => {
            setLoading(true)
            try {
                const result = await getAllMenuItems(search)
                if (cancelled) return
                setMenuItems(result.data)
                setOpen(true)
            } catch (error) {
                console.error(error)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }, 500)

        return () => {
            cancelled = true
            clearTimeout(timeout)
        }
    }, [search])

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
        document.addEventListener("mousedown", onClick)
        document.addEventListener("keydown", onKey)
        return () => {
            document.removeEventListener("mousedown", onClick)
            document.removeEventListener("keydown", onKey)
        }
    }, [])

    const reset = () => {
        setOpen(false)
        setSearch("")
    }

    return (
        <div ref={ref} className="relative">
            <Input
                label=""
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => search.trim() && setOpen(true)}
                className="border border-espresso/20 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-amber"
                icon={<CiSearch />}
                iconStyle="text-espresso text-xl"
            />

            <div
                className={`absolute left-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-80 max-h-96 overflow-y-auto rounded-md bg-white shadow-lg border border-espresso/10 z-50
                transition-all duration-200 ease-out origin-top
                ${open
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}`}
            >
                {loading ? (
                    <p className="px-4 py-3 text-sm text-espresso/60">Searching...</p>
                ) : menuItems.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-espresso/60">No results for "{search}"</p>
                ) : (
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item._id}>
                                <Link
                                    to={`/menu/${item._id}`}
                                    onClick={reset}
                                    className="flex items-center gap-3 px-4 py-2 hover:bg-sand"
                                >
                                    {item.imageUrl && (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name_id}
                                            className="w-12 h-12 rounded object-cover shrink-0"
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-espresso font-medium truncate">{item.name_id}</p>
                                        <p className="text-xs text-espresso/60 truncate">{item.category.name_id}</p>
                                    </div>
                                    <p className="text-sm text-roast shrink-0">
                                        Rp {item.price.toLocaleString("id-ID")}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}