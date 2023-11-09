import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch(`${API}/games`)
          .then((res) => res.json())
          .then((res) => {
            setGames(res);
          });
      } catch (error) {
        return error;
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-games">
      <h1>Games Inventory:</h1>
      <table>
        <thead>
          <tr>
            <th>Game Name</th>
            <th>ESRB Rating</th>
            <th>Price</th>
            <th>Game Type</th>
            <th>Genre</th>
            <th>Year Released</th>
            <th>Is Banned</th>
          </tr>
        </thead>
        <tbody>
          {games.map((item) => (
            <tr key={item.id} className="Game">
              <td>
                <Link to={`/games/${item.id}`}>{item.name}</Link>
              </td>
              <td>{item.esrb_rating}</td>
              <td>{item.price}</td>
              <td>{item.game_type}</td>
              <td>{item.genre}</td>
              <td>{item.release_year}</td>
              <td>{item.is_banned}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Games;
