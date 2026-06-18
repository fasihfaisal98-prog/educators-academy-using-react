import { useState } from "react";

// ─── Icons ───────────────────────────────────────────────────────────────────

const EyeIcon = ({ open }) =>
  open ? (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const IdIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
  </svg>
);

// ─── Input Field ─────────────────────────────────────────────────────────────

function InputField({ label, id, type = "text", icon, value, onChange, placeholder, error, rightEl }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-9 pr-${rightEl ? "10" : "3"} py-2.5 text-sm rounded-xl border bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-150 ${
            error
              ? "border-red-300 focus:ring-red-200 text-red-800"
              : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-400 text-gray-800"
          }`}
        />
        {rightEl && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightEl}</span>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onSwitch, onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!form.email) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(form.email); }, 1200);
  }

  return (
    <>
      <div className="text-center mb-7">
        <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900">Student Login</h1>
        <p className="text-sm text-gray-400 mt-1">Welcome back! Sign in to continue.</p>
      </div>

      <InputField
        label="Email address"
        id="login-email"
        type="email"
        icon={<MailIcon />}
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="you@example.com"
        error={errors.email}
      />

      <InputField
        label="Password"
        id="login-password"
        type={showPw ? "text" : "password"}
        icon={<LockIcon />}
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        placeholder="••••••••"
        error={errors.password}
        rightEl={
          <button type="button" onClick={() => setShowPw(!showPw)}
            className="text-gray-400 hover:text-gray-600 transition-colors">
            <EyeIcon open={showPw} />
          </button>
        }
      />

      <div className="flex justify-end mb-5">
        <button className="text-xs text-indigo-500 hover:text-indigo-700 font-medium transition-colors">
          Forgot password?
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-70 text-white font-semibold text-sm shadow-md shadow-indigo-100 transition-all duration-150 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Signing in…
          </>
        ) : "Log in as Student"}
      </button>

      <p className="text-center text-sm text-gray-400 mt-5">
        Don't have an account?{" "}
        <button onClick={onSwitch} className="text-indigo-600 font-semibold hover:underline">
          Sign up
        </button>
      </p>
    </>
  );
}

// ─── Signup Screen ────────────────────────────────────────────────────────────

function SignupScreen({ onSwitch, onSuccess }) {
  const [form, setForm] = useState({ name: "", studentId: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.studentId.trim()) e.studentId = "Student ID is required.";
    if (!form.email) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
    if (!form.confirm) e.confirm = "Please confirm your password.";
    else if (form.confirm !== form.password) e.confirm = "Passwords do not match.";
    return e;
  }

  function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(form.name); }, 1200);
  }

  return (
    <>
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900">Create Student Account</h1>
        <p className="text-sm text-gray-400 mt-1">Register to get started.</p>
      </div>

      <InputField label="Full name" id="name" icon={<UserIcon />}
        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="John Smith" error={errors.name} />

      <InputField label="Student ID" id="studentId" icon={<IdIcon />}
        value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}
        placeholder="e.g. STU-2024-001" error={errors.studentId} />

      <InputField label="Email address" id="signup-email" type="email" icon={<MailIcon />}
        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="you@example.com" error={errors.email} />

      <InputField label="Password" id="signup-password" type={showPw ? "text" : "password"} icon={<LockIcon />}
        value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
        placeholder="Min. 6 characters" error={errors.password}
        rightEl={
          <button type="button" onClick={() => setShowPw(!showPw)}
            className="text-gray-400 hover:text-gray-600 transition-colors">
            <EyeIcon open={showPw} />
          </button>
        }
      />

      <InputField label="Confirm password" id="confirm" type={showPw ? "text" : "password"} icon={<LockIcon />}
        value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        placeholder="Re-enter password" error={errors.confirm} />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 active:scale-95 disabled:opacity-70 text-white font-semibold text-sm shadow-md shadow-violet-100 transition-all duration-150 flex items-center justify-center gap-2 mt-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Creating account…
          </>
        ) : "Sign Up"}
      </button>

      <p className="text-center text-sm text-gray-400 mt-5">
        Already have an account?{" "}
        <button onClick={onSwitch} className="text-violet-600 font-semibold hover:underline">
          Log in
        </button>
      </p>
    </>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({ name, isNew, onReset }) {
  return (
    <div className="text-center py-10">
      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
        <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">
        {isNew ? "Account Created!" : "Welcome back!"}
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        {isNew
          ? `Hi ${name}, your student account is ready.`
          : `Signed in successfully as ${name}.`}
      </p>
      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 active:scale-95 transition-all"
      >
        ← Back to login
      </button>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function StudentAuth() {
  const [screen, setScreen] = useState("login"); // "login" | "signup" | "success"
  const [successInfo, setSuccessInfo] = useState({ name: "", isNew: false });

  function handleLoginSuccess(email) {
    setSuccessInfo({ name: email, isNew: false });
    setScreen("success");
  }

  function handleSignupSuccess(name) {
    setSuccessInfo({ name, isNew: true });
    setScreen("success");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Tab switcher — only show on login/signup */}
        {screen !== "success" && (
          <div className="flex bg-white rounded-2xl p-1 shadow-sm border border-gray-100 mb-4">
            <button
              onClick={() => setScreen("login")}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                screen === "login"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setScreen("signup")}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                screen === "signup"
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-50 border border-gray-100 p-6">
          {screen === "login" && (
            <LoginScreen
              onSwitch={() => setScreen("signup")}
              onSuccess={handleLoginSuccess}
            />
          )}
          {screen === "signup" && (
            <SignupScreen
              onSwitch={() => setScreen("login")}
              onSuccess={handleSignupSuccess}
            />
          )}
          {screen === "success" && (
            <SuccessScreen
              name={successInfo.name}
              isNew={successInfo.isNew}
              onReset={() => setScreen("login")}
            />
          )}
        </div>

        <p className="text-center text-xs text-gray-300 mt-4">
          Student Portal · Admission System
        </p>
      </div>
    </div>
  );
}