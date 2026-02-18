import { Mail, Lock, User, UserPlus, StickyNote } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon-circle">
            <StickyNote size={22} color="#fff" />
          </div>
          <h2 className="auth-title">Get Started</h2>
          <p className="auth-subtitle">
            Create a free account to sync your notes
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: "flex", flexDirection: "column", gap: "5px" }}
        >
          <Input
            label="Full Name"
            placeholder="John Doe"
            type="text"
            icon={<User size={18} />}
          />
          <Input
            label="Email Address"
            placeholder="user@example.com"
            type="email"
            icon={<Mail size={18} />}
          />
          <Input
            label="Password"
            placeholder="Create a password"
            type="password"
            icon={<Lock size={18} />}
          />
          <Input
            label="Confirm Password"
            placeholder="Repeat password"
            type="password"
            icon={<Lock size={18} />}
          />
          <Button
            label="Create Account"
            type="submit"
            icon={<UserPlus size={18} />}
          />
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
