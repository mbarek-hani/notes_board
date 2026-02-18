import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string; // Added label prop
  isLoading?: boolean;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
}

const Button = ({
  label,
  isLoading,
  variant = "primary",
  icon,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`auth-btn btn-${variant}`}
      disabled={isLoading}
      {...props}
    >
      {/* Show Spinner if loading, otherwise show Icon if provided */}
      {isLoading ? <Loader2 className="spinner" size={20} /> : icon}

      {/* Render the label text */}
      {isLoading ? "Processing..." : label}
    </button>
  );
};

export default Button;
