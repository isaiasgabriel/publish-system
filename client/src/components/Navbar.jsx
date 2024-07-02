import { Link } from "react-router-dom";
import "./CSS/Navbar.css";

export default function navbar() {
  return (
    <nav>
      <Link to="/Home">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Cadastro</Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
}
