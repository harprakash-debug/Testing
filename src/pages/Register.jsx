const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@300;400;500;600;700&family=Outfit:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .rg-root {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 480px;
    font-family: 'Outfit', sans-serif;
    background: #0d0d14;
  }

  /* ── Left decorative panel ── */
  .rg-left {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px;
  }

  .rg-left-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 60% at 20% 20%, rgba(99,102,241,0.28) 0%, transparent 65%),
      radial-gradient(ellipse 50% 70% at 80% 80%, rgba(236,72,153,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 60% 10%, rgba(16,185,129,0.12) 0%, transparent 55%);
  }

  .rg-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 44px 44px;
  }

  .rg-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.18;
  }
  .rg-blob-1 { width:360px; height:360px; background:#6366f1; top:-80px; left:-80px; }
  .rg-blob-2 { width:280px; height:280px; background:#ec4899; bottom:60px; right:40px; }
  .rg-blob-3 { width:200px; height:200px; background:#10b981; top:45%; left:55%; }

  .rg-brand {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .rg-brand-icon {
    width: 40px; height: 40px;
    border-radius: 10px;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    display: flex; align-items: center; justify-content: center;
  }

  .rg-brand-name {
    font-family: 'Syne', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.01em;
  }

  .rg-hero {
    position: relative;
    z-index: 2;
  }

  .rg-hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 20px;
    border: 1px solid rgba(99,102,241,0.4);
    background: rgba(99,102,241,0.1);
    font-size: 0.7rem;
    color: rgba(164,165,255,0.9);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .rg-hero-tag-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #818cf8;
    animation: blink 1.8s ease-in-out infinite;
  }

  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

  .rg-hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.2rem, 4vw, 3.4rem);
    font-weight: 700;
    color: #fff;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: 18px;
  }

  .rg-hero-title span {
    background: linear-gradient(135deg, #818cf8, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .rg-hero-desc {
    font-size: 0.88rem;
    color: rgba(255,255,255,0.38);
    line-height: 1.7;
    max-width: 380px;
    margin-bottom: 40px;
  }

  .rg-features {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .rg-feat {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .rg-feat-icon {
    width: 34px; height: 34px;
    border-radius: 8px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .rg-feat-text {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.5);
  }

  .rg-footer-left {
    position: relative;
    z-index: 2;
    font-size: 0.7rem;
    color: rgba(255,255,255,0.18);
    letter-spacing: 0.05em;
  }

  /* ── Right form panel ── */
  .rg-right {
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 52px 44px;
    overflow-y: auto;
    position: relative;
  }

  .rg-right::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(99,102,241,0.3), rgba(236,72,153,0.2), transparent);
  }

  .rg-form-eye {
    font-size: 0.62rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #a5b4fc;
    margin-bottom: 10px;
    font-weight: 500;
  }

  .rg-form-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.9rem;
    font-weight: 700;
    color: #0d0d14;
    letter-spacing: -0.02em;
    margin-bottom: 4px;
  }

  .rg-form-sub {
    font-size: 0.8rem;
    color: #9ca3af;
    margin-bottom: 36px;
  }

  .rg-form-sub a {
    color: #6366f1;
    text-decoration: none;
    font-weight: 500;
  }

  /* Row for side-by-side fields */
  .rg-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .rg-field {
    margin-bottom: 18px;
  }

  .rg-label {
    display: block;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #6b7280;
    margin-bottom: 7px;
  }

  .rg-input-wrap {
    position: relative;
  }

  .rg-input-icon {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: #d1d5db;
    pointer-events: none;
    display: flex;
    align-items: center;
  }

  .rg-input {
    width: 100%;
    padding: 11px 14px 11px 38px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.85rem;
    color: #111827;
    background: #fafafa;
    outline: none;
    transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
  }

  .rg-input:focus {
    border-color: #6366f1;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
  }

  .rg-input::placeholder { color: #d1d5db; }

  .rg-input.no-icon { padding-left: 14px; }

  /* Gender / select */
  .rg-select {
    width: 100%;
    padding: 11px 32px 11px 14px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.85rem;
    color: #6b7280;
    background: #fafafa url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 12px center;
    appearance: none;
    outline: none;
    cursor: pointer;
    transition: border-color 0.15s;
  }
  .rg-select:focus { border-color: #6366f1; }

  /* Terms checkbox */
  .rg-terms {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 24px;
    margin-top: 4px;
  }

  .rg-terms input[type="checkbox"] {
    width: 16px; height: 16px;
    margin-top: 1px;
    accent-color: #6366f1;
    flex-shrink: 0;
    cursor: pointer;
  }

  .rg-terms-text {
    font-size: 0.76rem;
    color: #9ca3af;
    line-height: 1.5;
  }

  .rg-terms-text a { color: #6366f1; text-decoration: none; font-weight: 500; }

  /* Submit button */
  .rg-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 16px rgba(99,102,241,0.3);
    margin-bottom: 18px;
  }
  .rg-btn:hover { opacity: 0.92; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(99,102,241,0.35); }
  .rg-btn:active { transform: translateY(0); }

  /* Divider */
  .rg-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
  }
  .rg-div-line { flex: 1; height: 1px; background: #f3f4f6; }
  .rg-div-text { font-size: 0.7rem; color: #d1d5db; letter-spacing: 0.1em; }

  /* Social buttons */
  .rg-socials {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 28px;
  }

  .rg-social-btn {
    padding: 10px 14px;
    border: 1.5px solid #e5e7eb;
    border-radius: 10px;
    background: #fff;
    font-family: 'Outfit', sans-serif;
    font-size: 0.76rem;
    color: #6b7280;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
    font-weight: 500;
  }
  .rg-social-btn:hover { border-color: #c7d2fe; color: #4338ca; background: #f5f3ff; }

  /* Password strength */
  .rg-strength {
    margin-top: 6px;
    display: flex;
    gap: 4px;
    align-items: center;
  }
  .rg-strength-bar {
    flex: 1;
    height: 3px;
    border-radius: 99px;
    background: #e5e7eb;
  }
  .rg-strength-bar.fill-1 { background: #ef4444; }
  .rg-strength-bar.fill-2 { background: #f59e0b; }
  .rg-strength-bar.fill-3 { background: #10b981; }
  .rg-strength-label { font-size: 0.62rem; color: #9ca3af; margin-left: 4px; }

  .rg-login-row {
    text-align: center;
    font-size: 0.78rem;
    color: #9ca3af;
  }
  .rg-login-row a { color: #6366f1; font-weight: 600; text-decoration: none; }

  @media (max-width: 860px) {
    .rg-root { grid-template-columns: 1fr; }
    .rg-left { display: none; }
    .rg-right { padding: 40px 28px; }
  }
`;

export default function Register() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="rg-root">

        {/* ── Left Panel ── */}
        <div className="rg-left">
          <div className="rg-left-bg" />
          <div className="rg-grid" />
          <div className="rg-blob rg-blob-1" />
          <div className="rg-blob rg-blob-2" />
          <div className="rg-blob rg-blob-3" />

          {/* Brand */}
          <div className="rg-brand">
            <div className="rg-brand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <span className="rg-brand-name">Nexora</span>
          </div>

          {/* Hero */}
          <div className="rg-hero">
            <div className="rg-hero-tag">
              <span className="rg-hero-tag-dot" />
              Now in Early Access
            </div>
            <div className="rg-hero-title">
              Build the future<br />with <span>Nexora</span>
            </div>
            <div className="rg-hero-desc">
              Join thousands of creators and developers who use Nexora to ship faster, collaborate smarter, and build what matters.
            </div>
            <div className="rg-features">
              {[
                { icon: "⚡", text: "Lightning-fast onboarding in under 2 minutes" },
                { icon: "🔒", text: "Enterprise-grade security and privacy by default" },
                { icon: "🌐", text: "Collaborate with teams across the globe" },
              ].map((f, i) => (
                <div className="rg-feat" key={i}>
                  <div className="rg-feat-icon">{f.icon}</div>
                  <span className="rg-feat-text">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rg-footer-left">© 2026 Nexora Inc. All rights reserved.</div>
        </div>

        {/* ── Right Form Panel ── */}
        <div className="rg-right">
          <div className="rg-form-eye">Get started free</div>
          <div className="rg-form-title">Create account</div>
          <div className="rg-form-sub">
            Already have one? <a href="#">Sign in</a>
          </div>

          {/* Social buttons */}
          <div className="rg-socials">
            <button className="rg-social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="rg-social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>

          <div className="rg-divider">
            <div className="rg-div-line" />
            <span className="rg-div-text">or register with email</span>
            <div className="rg-div-line" />
          </div>

          {/* Name row */}
          <div className="rg-row">
            <div className="rg-field">
              <label className="rg-label">First Name</label>
              <div className="rg-input-wrap">
                <span className="rg-input-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <input className="rg-input" type="text" placeholder="John" />
              </div>
            </div>
            <div className="rg-field">
              <label className="rg-label">Last Name</label>
              <div className="rg-input-wrap">
                <span className="rg-input-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <input className="rg-input" type="text" placeholder="Doe" />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="rg-field">
            <label className="rg-label">Email Address</label>
            <div className="rg-input-wrap">
              <span className="rg-input-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
              <input className="rg-input" type="email" placeholder="john@example.com" />
            </div>
          </div>

          {/* Phone + Gender row */}
          <div className="rg-row">
            <div className="rg-field">
              <label className="rg-label">Phone</label>
              <div className="rg-input-wrap">
                <span className="rg-input-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <input className="rg-input" type="tel" placeholder="+91 00000 00000" />
              </div>
            </div>
            <div className="rg-field">
              <label className="rg-label">Gender</label>
              <select className="rg-select">
                <option value="" disabled selected>Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="rg-field">
            <label className="rg-label">Password</label>
            <div className="rg-input-wrap">
              <span className="rg-input-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input className="rg-input" type="password" placeholder="Min. 8 characters" />
            </div>
            {/* Strength bars */}
            <div className="rg-strength">
              <div className="rg-strength-bar fill-2" />
              <div className="rg-strength-bar fill-2" />
              <div className="rg-strength-bar" />
              <div className="rg-strength-bar" />
              <span className="rg-strength-label">Medium</span>
            </div>
          </div>

          {/* Confirm password */}
          <div className="rg-field">
            <label className="rg-label">Confirm Password</label>
            <div className="rg-input-wrap">
              <span className="rg-input-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </span>
              <input className="rg-input" type="password" placeholder="Re-enter password" />
            </div>
          </div>

          {/* Terms */}
          <div className="rg-terms">
            <input type="checkbox" defaultChecked />
            <span className="rg-terms-text">
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>. I consent to receiving product updates and newsletters.
            </span>
          </div>

          {/* Submit */}
          <button className="rg-btn">Create My Account →</button>

          <div className="rg-login-row">
            Already have an account? <a href="#">Sign in here</a>
          </div>
        </div>
      </div>
    </>
  );
}