import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function GameDetails() {
  const [game, setGame] = useState({ name: "" });
  let navigate = useNavigate();
  let { index } = useParams();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        fetch(`${API}/games/${index}`)
          .then((res) => res.json())
          .then((res) => {
            setGame(res);
          });
      } catch (error) {
        return error;
      }
    };
    fetchGame();
  }, [index]);

  const handleDelete = () => {
    fetch(`${API}/games/${index}`, { method: "DELETE" }).then(() =>
      navigate(`/games`)
    );
  };

  return (
    <div className="game-details">
      <div className="game-container">
        {game ? (
          <div>
            <h1>{game.name}</h1>
            <p>Game Type: {game.game_type}</p>
            <p>Genre: {game.genre}</p>
            <p>Year of Release: {game.release_year}</p>
            <p>ESRB Rating: {game.esrb_rating}</p>
            <p>Is Banned: {game.is_banned}</p>
            <p>Price: ${game.price}</p>
            <div>
              <Link to={`/games/${index}/edit`}>Edit Game Info</Link>
              <button onClick={handleDelete}>Delete Game</button>
            </div>
          </div>
        ) : (
          <div className="no-game-alert">
            <div>No Game Information Available Here!</div>
            <div>
              <Link to="/games">Please select from available games.</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameDetails;
