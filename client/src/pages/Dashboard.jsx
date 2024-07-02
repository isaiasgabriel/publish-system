import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import "./CSS/Dashboard.css";
import DisplayUserInfo from "../components/DisplayUserInfo";
import { Link } from "react-router-dom";
import ActivityList from "../components/ActivityList";

export default function Dashboard() {
  const { user, fetchUser } = useContext(UserContext);

  useEffect(() => {
    document.title = "Dashboard";
    fetchUser();
  }, [fetchUser]);

  if (!user) {
    return null;
  }

  if (user.role === "autor") {
    return (
      <div className="dashboard-container">
        <DisplayUserInfo user={user} />
        <Link to="/create-article" className="dashboard-button">
          Criar artigo
        </Link>
        <ActivityList />
      </div>
    );
  }

  if (user.role === "administrador") {
    return (
      <div className="dashboard-container">
        <DisplayUserInfo user={user} />
        <ActivityList />
      </div>
    );
  }

  if (user.role === "avaliador") {
    return (
      <div className="dashboard-container">
        <DisplayUserInfo user={user} />
        <ActivityList />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <DisplayUserInfo user={user} />
    </div>
  );
}
