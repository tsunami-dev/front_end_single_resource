import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function GameNewForm() {
  const navigate = useNavigate();
  const [game, setGame] = useState({
    name: "",
    rating: "",
    price: "",
    type: "",
    genre: "",
    year: "",
    isBanned: false
  });

  const addGame = () => {
    const gameData = {
      name: game.name,
      esrb_rating: game.rating,
      price: game.price,
      game_type: game.type,
      genre: game.genre,
      release_year: game.year,
      is_banned: game.isBanned
    };
    try {
      fetch(`${API}/games`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameData)
      })
        .then((res) => res.json())
        .then(() => navigate("/games"));
    } catch (error) {
      return error;
    }
  };

  const handleTextChange = (e) => {
    const { id, value } = e.target;
    setGame({ ...game, [id]: value });
  };

  const handleCheckboxChange = () => {
    setGame({ ...game, isBanned: !game.isBanned });
  };

  const handleRatingChange = (e) => {
    const { value } = e.target;
    // If the selected value is the same as the current value, set it to an empty string
    const ratingValue = value === game.rating ? "" : value;
    setGame({ ...game, rating: ratingValue });
  };

  const handleTypeChange = (e) => {
    const { value } = e.target;
    // If the selected value is the same as the current value, set it to an empty string
    const typeValue = value === game.type ? "" : value;
    setGame({ ...game, type: typeValue });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addGame();
    resetForm();
  };

  function resetForm() {
    setGame({
      name: "",
      rating: "",
      price: "",
      type: "",
      genre: "",
      year: "",
      isBanned: false
    });
  }

  return (
    <div className="New">
      <h2 className="returnheader">Add New Game: </h2>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="name">Game Name: </label>
        <input
          id="name"
          value={game.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Game..."
          required
        />
        <fieldset>
          <div className="radio">
            <legend>ESRB Rating: </legend>
            <label>
              <input
                name="rating"
                value="E"
                type="radio"
                checked={game.rating === "E"}
                onChange={handleRatingChange}
              />
              Everyone
            </label>
            <label>
              <input
                name="rating"
                value="E10+"
                type="radio"
                checked={game.rating === "E10+"}
                onChange={handleRatingChange}
              />
              Everyone 10+
            </label>
            <label>
              <input
                name="rating"
                value="T"
                type="radio"
                checked={game.rating === "T"}
                onChange={handleRatingChange}
              />
              Teen
            </label>
            <label>
              <input
                name="rating"
                value="M"
                type="radio"
                checked={game.rating === "M"}
                onChange={handleRatingChange}
              />
              Mature 17+
            </label>
            <label>
              <input
                name="rating"
                value="AO"
                type="radio"
                checked={game.rating === "AO"}
                onChange={handleRatingChange}
              />
              Adults Only 18+
            </label>
            <label>
              <input
                name="rating"
                value="RP"
                type="radio"
                checked={game.rating === "RP"}
                onChange={handleRatingChange}
              />
              Rating Pending
            </label>
            <label>
              <input
                name="rating"
                value="Null"
                type="radio"
                checked={game.rating === " "}
                onChange={handleRatingChange}
              />
              Unknown
            </label>
          </div>
        </fieldset>
        <label htmlFor="price">Price: </label>
        <input
          id="price"
          value={game.price}
          type="number"
          min="0.00"
          step="0.01"
          max="999.99"
          onChange={handleTextChange}
          placeholder="Enter price..."
        />
        <fieldset>
          <div className="radio">
            <legend>Game Type: </legend>
            <label>
              <input
                name="type"
                value="First-person"
                type="radio"
                checked={game.type === "First-person"}
                onChange={handleTypeChange}
              />
              First-person
            </label>
            <label>
              <input
                name="type"
                value="Third-person"
                type="radio"
                checked={game.type === "Third-person"}
                onChange={handleTypeChange}
              />
              Third-person
            </label>
            <label>
              <input
                name="type"
                value="Open world"
                type="radio"
                checked={game.type === "Open world"}
                onChange={handleTypeChange}
              />
              Open world
            </label>
            <label>
              <input
                name="type"
                value="Null"
                type="radio"
                checked={game.type === ""}
                onChange={handleTypeChange}
              />
              Unknown
            </label>
          </div>
        </fieldset>
        <br />
        <br />
        <h4 className="select">Genre: </h4>
        <select value={game.genre} id="genre" onChange={handleTextChange}>
          <option value=""></option>
          <option value="Action game">Action Game</option>
          <option value="Action-adventure game">Action-Adventure Game</option>
          <option value="Adventure game">Adventure Game</option>
          <option value="Board Games">Board Game</option>
          <option value="Educational game">Educational Game</option>
          <option value="Fighting game">Fighting Game</option>
          <option value="First-person shooter">First-Person Shooter</option>
          <option value="Platformer">Platformer</option>
          <option value="Race game">Race Game</option>
          <option value="Real-time strategy">Real-Time Strategy</option>
          <option value="Role-playing game">Role-Playing Game</option>
          <option value="Sandbox">Sandbox</option>
          <option value="Shooter">Shooter</option>
          <option value="Simulation video game">Simulation Video Game</option>
          <option value="Strategy game">Strategy Game</option>
        </select>
        <br />
        <br />
        <label htmlFor="year">Year Released: </label>
        <input
          id="year"
          value={game.year}
          type="text"
          onChange={handleTextChange}
          placeholder="Release year..."
        />
        <label htmlFor="isBanned">Banned Game: </label>
        <input
          id="isBanned"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={game.isBanned}
        />
        <br />
        <button type="submit">Add To Inventory!</button>
      </form>
      <br />
      <Link to={`/games`}>
        <button>Back To Games!</button>
      </Link>
    </div>
  );
}

export default GameNewForm;
