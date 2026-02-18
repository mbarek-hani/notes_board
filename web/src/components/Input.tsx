import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

const Input = ({ label, icon, ...props }: InputProps) => {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <div className="input-wrapper">
        {icon && <div className="input-icon">{icon}</div>}
        <input className="auth-input" {...props} />
      </div>
    </div>
  );
};

export default Input;
