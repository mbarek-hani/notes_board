import { Mail, Lock, LogIn, StickyNote } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import "./auth.css";

const LoginPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon-circle">
            <StickyNote size={28} color="#fff" />
          </div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Login to access your workspace</p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: "flex", flexDirection: "column", gap: "5px" }}
        >
          <Input
            label="Email Address"
            placeholder="user@example.com"
            type="email"
            icon={<Mail size={18} />}
          />
          <Input
            label="Password"
            placeholder="••••••••"
            type="password"
            icon={<Lock size={18} />}
          />
          <Button label="Sign In" type="submit" icon={<LogIn size={18} />} />
        </form>

        <div className="divider">
          <span>Or</span>
        </div>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register" className="auth-link">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
