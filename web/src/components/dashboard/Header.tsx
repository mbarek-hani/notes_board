import { initialsFromEmail } from "../../utils";
import { Link } from "react-router-dom";

type HeaderProps = {
  email?: string;
  fetchData: () => Promise<void>;
};

function Header({ email, fetchData }: HeaderProps) {
  const currentInitials = initialsFromEmail(email);
  return (
    <div className="topHeader">
      <div className="topHeader-left-side">
        <h1 style={{ margin: 0, fontSize: 22, letterSpacing: 0.2 }}>
          Dashboard
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Link to="/notes">
          <button className="btn btn-primary">Notes</button>
        </Link>
        <button
          type="button"
          className="btn dashboard-btn-secondary"
          onClick={fetchData}
        >
          Refresh
        </button>

        <div title={email || "Guest"} className="userBadge">
          {currentInitials}
        </div>
      </div>
    </div>
  );
}

export default Header;
