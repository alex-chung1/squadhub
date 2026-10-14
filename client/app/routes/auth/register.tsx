import { useState } from "react";
import { Link, useNavigate } from "react-router";
import type { ChangeEvent, SubmitEvent } from "react";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error || result?.message || "Unable to create your account.",
        );
      }

      navigate("/login");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to create your account.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-form">
      {/* Heading */}
      <div className="auth-form-header">
        <p className="auth-eyebrow">JOIN THE SQUAD</p>

        <h2 className="auth-form-title">Create your account</h2>

        <p className="auth-form-description">
          Build your squad. Balance teams. Play better.
        </p>
      </div>

      {/* Registration form */}
      <form onSubmit={handleSubmit} className="auth-form-fields">
        {/* Name */}
        <div className="auth-field">
          <label htmlFor="name" className="auth-label">
            Full name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={loading}
            className="auth-input"
          />
        </div>

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
              placeholder="At least 8 characters"
              autoComplete="new-password"
              minLength={8}
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

        {/* Confirm password */}
        <div className="auth-field">
          <label htmlFor="confirmPassword" className="auth-label">
            Confirm password
          </label>

          <div className="auth-password-wrapper">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
              className="auth-input auth-password-input"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((previous) => !previous)}
              className="auth-password-toggle"
              aria-label={
                showConfirmPassword
                  ? "Hide confirmation password"
                  : "Show confirmation password"
              }
              aria-pressed={showConfirmPassword}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Error */}
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
              Creating account...
            </>
          ) : (
            <>
              Create account
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </form>

      {/* Login link */}
      <p className="auth-switch">
        Already have an account?{" "}
        <Link to="/login" className="auth-switch-link">
          Log in
        </Link>
      </p>
    </div>
  );
}
