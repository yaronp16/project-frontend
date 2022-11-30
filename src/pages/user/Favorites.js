import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Places from "../../components/homeComponents/Places";

function Favorites() {
    const [favorites, setFavorites] = useState([])

    const apiEndpoint = "http://localhost:8000/api/favorites"
    
    const { placeId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const apiCall = async () => {

            try {
                const storedToken = localStorage.getItem("authToken");
                const res = await axios.get(
                    apiEndpoint,
                    { headers: { Authorization: `Bearer ${storedToken}` } }
                )
                setFavorites(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        apiCall()
    }, []);


    const deleteFavorite = async (favoriteID) => {

        try {
            const storedToken = localStorage.getItem("authToken");
            const res = await axios.delete(apiEndpoint + "/" + favoriteID, { headers: { Authorization: `Bearer ${storedToken}` } })
            const response = await axios.get(
                apiEndpoint,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            setFavorites(response.data)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1> My favorites </h1>
            {favorites && favorites.map((fav) => {
                return (
                    <div key={fav._id}>
                        <Places key={fav._id} place={fav.place} />
                        <button onClick={event => deleteFavorite(fav._id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Favorites
