import "./CSS/Login.css";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Login";
  }, []);

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data: responseData } = await axios.post("/login", {
        email,
        password,
      });

      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setData({ email: "", password: "" });
        toast.success("Usuário logado com sucesso");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      toast.error("Erro ao realizar login.");
    }
  };

  return (
    <div className="login">
      <form onSubmit={loginUser} className="login-container">
        <div className="login-fields">
          <label>Email</label>
          <input
            type="email"
            placeholder="Insira o email..."
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Insira a senha..."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
