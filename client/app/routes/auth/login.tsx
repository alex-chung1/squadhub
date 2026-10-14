import { useState } from "react";
import { Link, useNavigate } from "react-router";
import type { ChangeEvent, SubmitEvent } from "react";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error || result?.message || "Invalid email or password.",
        );
      }

      navigate("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to log in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-form">
      {/* Heading */}
      <div className="auth-form-header ">
        <h2 className="auth-form-title text-center">WELCOME BACK</h2>
      </div>

      {/* Login form */}
      <form onSubmit={handleSubmit} className="auth-form-fields">
        {/* Email */}
        <div className="auth-field">
          <label htmlFor="email" className="auth-label">
            Email address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
            className="auth-input"
          />
        </div>

        {/* Password */}
        <div className="auth-field">
          <label htmlFor="password" className="auth-label">
            Password
          </label>

          <div className="auth-password-wrapper">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="auth-input auth-password-input"
            />

            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              className="auth-password-toggle"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div role="alert" className="auth-error">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="squad-button-primary auth-submit"
        >
          {loading ? (
            <>
              <span className="auth-spinner" aria-hidden="true" />
              Signing in...
            </>
          ) : (
            <>
              Log in
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </form>

      {/* Registration */}
      <p className="auth-switch">
        New to SquadHub?{" "}
        <Link to="/register" className="auth-switch-link">
          Create an account
        </Link>
      </p>
    </div>
  );
}
