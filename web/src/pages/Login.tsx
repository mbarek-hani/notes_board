import { Mail, Lock, LogIn, StickyNote } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";

const LoginPage = () => {
	const { login } = useAuthContext();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
	) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	}

	async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log(formData);
		await login(formData);
	}

	return (
		<div className="auth-container">
			<div className="auth-card">
				<div className="auth-header">
					<div className="auth-icon-circle">
						<StickyNote size={22} color="#fff" />
					</div>
					<h2 className="auth-title">Welcome Back</h2>
					<p className="auth-subtitle">Login to access your workspace</p>
				</div>

				<form
					onSubmit={handleSubmit}
					style={{ display: "flex", flexDirection: "column", gap: "5px" }}
				>
					<Input
						label="Email Address"
						placeholder="user@example.com"
						name="email"
						value={formData.email}
						type="email"
						icon={<Mail size={18} />}
						onChange={handleChange}
					/>
					<Input
						label="Password"
						placeholder="••••••••"
						name="password"
						value={formData.password}
						type="password"
						icon={<Lock size={18} />}
						onChange={handleChange}
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
