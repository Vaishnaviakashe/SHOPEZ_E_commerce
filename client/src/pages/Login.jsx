import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await login(email.trim(), password);
      const destination = location.state?.from || (data.user.role === "admin" ? "/admin" : "/");
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card-new" onSubmit={handleSubmit}>
        <div className="auth-icon"><LockKeyhole size={20} /></div>
        <div className="section-label">WELCOME BACK</div>
        <h1>Sign in.</h1>
        <p>Access your SHOPEZ account and orders.</p>

        {error && <div className="form-error">{error}</div>}

        <label>
          Email
          <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label>
          Password
          <input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        <button className="primary-cta full" disabled={loading}>
          {loading ? "SIGNING IN..." : <>SIGN IN <ArrowRight size={17} /></>}
        </button>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
