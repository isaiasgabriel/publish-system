import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import axios from "axios";
import { UserContextProvider } from "../context/userContext";

//Pages:
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateArticle from "./pages/CreateArticle";
import Article from "./pages/Article";
import Home from "./pages/Home";

axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{ duration: 2000 }}
      />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-article" element={<CreateArticle />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
