import { useEffect } from "react"
import { getMe } from "../../api/authApi"
import axios from "axios"

const Profile = () => {
    const fetchProfile = async () => {
        try {
            const response = await getMe()
            console.log(response)
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data.message);
            }
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    return (
        <div>
            <h1>Profile</h1>
            <button onClick={fetchProfile}>
                Test Get Profile
            </button>
        </div>
    )
}

export default Profile