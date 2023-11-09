import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Select from "react-dropdown-select";

const API = import.meta.env.VITE_API_URL;

function GameNewForm() {
  const navigate = useNavigate();
  //   const [selectOption, setSelectOption] = useState("");
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

  //   const handleSelectChange = (e) => {
  //     setSelectOption(e.target.value);
  //   };

  const handleCheckboxChange = () => {
    setGame({ ...game, isBanned: !game.isBanned });
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
      <h1 className="returnheader">Add New Game</h1>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="name">Game Name:</label>
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
            <legend
              htmlFor="rating"
              value={game.rating}
              onChange={handleTextChange}
            >
              ESRB Rating:
            </legend>
            <label>
              <input name="rating" value="E" type="radio" checked /> Everyone
            </label>
            <label>
              <input name="rating" value="E10+" type="radio" /> Everyone 10+
            </label>
            <label>
              <input name="rating" value="T" type="radio" /> Teen
            </label>
            <label>
              <input name="rating" value="M" type="radio" /> Mature 17+
            </label>
            <label>
              <input name="rating" value="AO" type="radio" /> Adults Only 18+
            </label>
            <label>
              <input name="rating" value="RP" type="radio" /> Rating Pending
            </label>
          </div>
        </fieldset>
        <label htmlFor="price">Price:</label>
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
            <legend
              htmlFor="type"
              value={game.type}
              onChange={handleTextChange}
            >
              Game Type:
            </legend>
            <label>
              <input name="type" value="First-person" type="radio" checked />{" "}
              First-person
            </label>
            <label>
              <input name="type" value="Third-person" type="radio" />{" "}
              Third-person
            </label>
            <label>
              <input name="type" value="Open world" type="radio" /> Open world
            </label>
          </div>
        </fieldset>
        <br />
        <br />
        <h4 className="select">Genre:</h4>
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
        <label htmlFor="year">Year Released:</label>
        <input
          id="year"
          value={game.year}
          type="text"
          onChange={handleTextChange}
          placeholder="Release year..."
        />
        <label htmlFor="isBanned">Banned Game:</label>
        <input
          id="isBanned"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={game.isBanned}
        />
        <br />
        <button type="submit">Lets get this on file!</button>
      </form>
      <br />
      <Link to={`/games/${index}`}>
        <button>Maybe next time!</button>
      </Link>
    </div>
  );
}

export default GameNewForm;
