import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, UserRoundPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await register(name.trim(), email.trim(), password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card-new" onSubmit={handleSubmit}>
        <div className="auth-icon"><UserRoundPlus size={20} /></div>
        <div className="section-label">JOIN SHOPEZ</div>
        <h1>Create account.</h1>
        <p>Start building your collection today.</p>

        {error && <div className="form-error">{error}</div>}

        <label>
          Full name
          <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label>
          Email
          <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label>
          Password
          <input type="password" placeholder="At least 6 characters" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        <button className="primary-cta full" disabled={loading}>
          {loading ? "CREATING..." : <>CREATE ACCOUNT <ArrowRight size={17} /></>}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
