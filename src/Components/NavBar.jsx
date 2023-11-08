import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <h1>
                <Link to ="/games">Games</Link>
            </h1>
            <button>
                <Link to="/games/new">Add Games</Link>
            </button>
        </nav>
    )
}