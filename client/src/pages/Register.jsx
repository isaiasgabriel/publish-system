import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./CSS/Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    document.title = "Cadastro";
  }, []);

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = data;
    try {
      const { data: responseData } = await axios.post("/register", {
        name,
        email,
        password,
        role,
      });

      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setData({
          name: "",
          email: "",
          password: "",
          role: "",
        });
        toast.success("Registrado com sucesso");
        navigate("/login");
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      toast.error("Erro ao cadastrar usuário");
    }
  };

  return (
    <div className="register">
      <form onSubmit={registerUser} className="register-container">
        <div className="register-fields">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Insira o seu nome..."
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Insira o seu email..."
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label>Senha</label>
          <input
            type="password"
            placeholder="Insira a sua senha..."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <label>Função</label>
          <input
            type="text"
            placeholder="Insira a sua função..."
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
          />
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}
