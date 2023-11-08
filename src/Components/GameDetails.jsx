import {useState, useEffect } from "react";
import {Link, useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function GameDetails() {
    const [game, setGame] = useState({ name: ""});
    let navigate = useNavigate();
    let { index } = useParams();

useEffect(() => {
    const fetchGame = async () => {
        try {
            fetch(`${API}/games/${index}`)
            .then(res => res.json())
            .then(res => {
                setGame(res)
            })
        } catch (error) {
          return error
        }
    }
    fetchGame()
}, [index])
}