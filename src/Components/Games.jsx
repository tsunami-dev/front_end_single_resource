import { useState, useEffect } from "react";
import Game from "./Game";

const API = import.meta.env.VITE_API_URL;

function Games () {
    const [games, setGames] = useState ([]);

        useEffect(() =>{
        const fetchData = async () => {
            try{
                fetch(`${API}/games`)
                    .then(res => res.json())
                    .then(res => {
                        setGames(res)
                    })
            } catch (error) {
              return error
            }
        }
        fetchData()
    },  [])

    return (
        <div className="Games">
            <section>
                <table>
                    <thead>
                        <tr>
                            <th>Banned</th>
                            <th>Game Name</th>
                            <th>Rating</th>
                            <th>price</th>
                            <th>type</th>
                            <th>genre</th>
                            <th>year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game) =>{
                            return <Game key={game.id} game={game} />
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default Games;
