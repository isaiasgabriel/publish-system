import PropTypes from "prop-types";
import "./CSS/DisplayUserInfo.css";

const DisplayUserInfo = ({ user }) => {
  return (
    <div className="display-user-info">
      <div className="user-info">
        <h2>Olá!👋 {user.name}!</h2>
        <h3>{user.email}</h3>
        <h4>{user.role}</h4>
      </div>
    </div>
  );
};

DisplayUserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default DisplayUserInfo;
