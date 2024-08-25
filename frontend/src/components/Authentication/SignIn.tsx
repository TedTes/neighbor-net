import React, { useState } from "react";

type SignInProps = {
  onSignIn: (email: string, password: string) => void;
  errorMessage?: string;
};

export const SignIn: React.FC<SignInProps> = ({ onSignIn, errorMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = () => {
    if (email.trim() === "" || password.trim() === "") {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    onSignIn(email, password);
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <div className="sign-in-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignIn}>Sign In</button>
        {error && <p className="error-message">{error}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};
