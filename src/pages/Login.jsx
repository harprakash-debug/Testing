import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../services/api'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validationForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = "Please Enter the Email"
        }
        if (!password) {
            newErrors.password = "Please Enter the Password"
        }
        setErrors(newErrors)

        return Object.keys(newErrors).length == 0;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validationForm()) {
            return;
        }
        try {
            const response = await api.post('auth/login', {
                email,
                password
            });
            localStorage.setItem('token', response.data.access_token)
            navigate("/")
        } catch (error) {
            const newErrors = {};
            if (error.response?.status === 422) {
                newErrors.error = error.response.data.error;
            } else if (error.response?.status === 401) {
                newErrors.error = "Invalid email or password";
            } else {
                newErrors.error = "Server error";
            }

            setErrors(newErrors);
        }

    }
    return (
        <div style={{
            minHeight: "100vh",
            background: "#f5f0eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Jost', sans-serif",
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400&family=Jost:wght@300;400;500&display=swap');
        .login-input { width:100%; border:none; border-bottom:1.5px solid #e8e2db; padding:10px 0; font-family:'Jost',sans-serif; font-size:0.9rem; color:#1a1a1a; background:transparent; outline:none; }
        .login-input::placeholder { color:#ccc; font-weight:300; }
        .login-input:focus { border-bottom-color:#c9a96e; }
        .btn-main { width:100%; padding:14px; background:#1a1a1a; color:#f5f0eb; border:none; border-radius:2px; font-family:'Jost',sans-serif; font-size:0.72rem; letter-spacing:0.28em; text-transform:uppercase; cursor:pointer; }
        .btn-main:hover { background:#333; }
        .btn-google { width:100%; padding:13px; background:transparent; color:#888; border:1.5px solid #e8e2db; border-radius:2px; font-family:'Jost',sans-serif; font-size:0.72rem; letter-spacing:0.12em; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:10px; }
        .btn-google:hover { border-color:#c9a96e; color:#555; }
        .link-gold { color:#c9a96e; text-decoration:none; font-weight:500; }
        .forgot-link { font-size:0.68rem; color:#bbb; text-decoration:none; letter-spacing:0.06em; }
        .forgot-link:hover { color:#c9a96e; }
      `}</style>

            <div style={{ width: 420, background: "#fff", borderRadius: 2, boxShadow: "0 24px 80px rgba(0,0,0,0.10)", overflow: "hidden" }}>
                {/* Gold bar */}
                <div style={{ height: 4, background: "linear-gradient(90deg,#c9a96e,#e8c99a,#c9a96e)" }} />

                <div style={{ padding: "52px 48px 48px" }}>
                    <form onSubmit={handleSubmit}>
                        {/* Logo */}
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <rect x="1" y="1" width="30" height="30" rx="2" stroke="#c9a96e" strokeWidth="1.5" />
                                <path d="M8 16 L16 8 L24 16 L16 24 Z" stroke="#c9a96e" strokeWidth="1.2" fill="none" />
                                <circle cx="16" cy="16" r="3" fill="#c9a96e" />
                            </svg>
                            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 400, color: "#1a1a1a", letterSpacing: "0.08em" }}>Aurelia</span>
                        </div>

                        {/* Heading */}
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.2, marginBottom: 6 }}>
                            Welcome<br />back.
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "#aaa", fontWeight: 300, letterSpacing: "0.05em", marginBottom: 36 }}>
                            Sign in to your account
                        </div>

                        {/* Email */}
                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#999", marginBottom: 8, fontWeight: 500 }}>Email Address</label>
                            <input className="login-input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />

                            <span>{errors.email && errors.email}</span>
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: 12 }}>
                            <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#999", marginBottom: 8, fontWeight: 500 }}>Password</label>
                            <input className="login-input" type="password" placeholder="••••••••" value={password} onChange={(e) => setPasword(e.target.value)} />
                        </div>
                        <span>{errors.password && errors.password}</span>


                        {/* Forgot */}
                        <div style={{ textAlign: "right", marginBottom: 32 }}>
                            <a className="forgot-link" href="#">Forgot password?</a>
                        </div>

                        <span>{errors.error && errors.error}</span>

                        <button className="btn-main" type="submit">Sign In</button>
                    </form>
                    {/* Divider */}
                    <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "20px 0" }}>
                        <div style={{ flex: 1, height: 1, background: "#ede8e0" }} />
                        <span style={{ fontSize: "0.65rem", color: "#ccc", letterSpacing: "0.15em" }}>or</span>
                        <div style={{ flex: 1, height: 1, background: "#ede8e0" }} />
                    </div>

                    <button className="btn-google">
                        <svg width="16" height="16" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <div style={{ marginTop: 32, textAlign: "center", fontSize: "0.72rem", color: "#bbb", fontWeight: 300 }}>
                        Don't have an account? <a className="link-gold" href="#">Create one</a>
                    </div>
                </div>
            </div>
        </div>
    );
}