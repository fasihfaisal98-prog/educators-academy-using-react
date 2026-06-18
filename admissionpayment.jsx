import { useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const FEE_BREAKDOWN = [
  { label: "Admission Fee",       amount: 5000 },
  { label: "Tuition Fee",         amount: 45000 },
  { label: "Library Fee",         amount: 2000 },
  { label: "Laboratory Fee",      amount: 3000 },
  { label: "Sports & Activities", amount: 1500 },
];
const TOTAL = FEE_BREAKDOWN.reduce((s, f) => s + f.amount, 0);

const PROGRAMS = [
  "BS Computer Science",
  "BS Software Engineering",
  "BS Information Technology",
  "BBA (Business Administration)",
  "BS Electrical Engineering",
  "BS Civil Engineering",
];

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Credit / Debit Card",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    id: "bank",
    label: "Bank Transfer",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
  {
    id: "easypaisa",
    label: "EasyPaisa / JazzCash",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n) {
  return "PKR " + n.toLocaleString();
}

function formatCard(val) {
  return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(val) {
  const d = val.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
}

// ─── Reusable Input ───────────────────────────────────────────────────────────

function Field({ label, id, children, error }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function Input({ id, className = "", ...props }) {
  return (
    <input
      id={id}
      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-slate-800 transition-all duration-150 placeholder-slate-400 ${className}`}
      {...props}
    />
  );
}

function Select({ id, children, ...props }) {
  return (
    <select
      id={id}
      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-slate-800 transition-all duration-150"
      {...props}
    >
      {children}
    </select>
  );
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepBar({ step }) {
  const steps = ["Student Info", "Fee Summary", "Payment", "Confirm"];
  return (
    <div className="flex items-center justify-between mb-8 px-1">
      {steps.map((s, i) => {
        const idx = i + 1;
        const done = step > idx;
        const active = step === idx;
        return (
          <div key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                done ? "bg-emerald-500 text-white" :
                active ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                "bg-slate-100 text-slate-400"
              }`}>
                {done ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : idx}
              </div>
              <span className={`text-xs mt-1 font-medium hidden sm:block ${active ? "text-blue-600" : done ? "text-emerald-500" : "text-slate-400"}`}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mt-[-12px] rounded-full transition-all duration-500 ${done ? "bg-emerald-400" : "bg-slate-100"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1: Student Info ─────────────────────────────────────────────────────

function StudentInfo({ data, onChange, onNext }) {
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!data.name.trim())    e.name    = "Full name is required.";
    if (!data.sid.trim())     e.sid     = "Student ID is required.";
    if (!data.cnic.trim())    e.cnic    = "CNIC is required.";
    if (!data.email.trim())   e.email   = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = "Enter a valid email.";
    if (!data.phone.trim())   e.phone   = "Phone number is required.";
    if (!data.program)        e.program = "Select a program.";
    if (!data.session.trim()) e.session = "Session / Year is required.";
    return e;
  }

  function handleNext() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onNext();
  }

  const f = (k) => ({ value: data[k], onChange: (ev) => onChange(k, ev.target.value) });

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-1">Student Information</h2>
      <p className="text-sm text-slate-400 mb-6">Enter your details as on your admission form.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name" id="name" error={errors.name}>
          <Input id="name" placeholder="Muhammad Ali" {...f("name")} />
        </Field>
        <Field label="Student ID" id="sid" error={errors.sid}>
          <Input id="sid" placeholder="STU-2024-001" {...f("sid")} />
        </Field>
        <Field label="CNIC / B-Form No." id="cnic" error={errors.cnic}>
          <Input id="cnic" placeholder="42101-1234567-8" {...f("cnic")} />
        </Field>
        <Field label="Email Address" id="email" error={errors.email}>
          <Input id="email" type="email" placeholder="student@email.com" {...f("email")} />
        </Field>
        <Field label="Phone Number" id="phone" error={errors.phone}>
          <Input id="phone" placeholder="+92 300 1234567" {...f("phone")} />
        </Field>
        <Field label="Academic Session" id="session" error={errors.session}>
          <Input id="session" placeholder="Fall 2024" {...f("session")} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Program Applied For" id="program" error={errors.program}>
            <Select id="program" {...f("program")}>
              <option value="">— Select program —</option>
              {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
            </Select>
          </Field>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button onClick={handleNext}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md shadow-blue-100 transition-all duration-150">
          Continue to Fee Summary
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: Fee Summary ──────────────────────────────────────────────────────

function FeeSummary({ student, onNext, onBack }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-1">Fee Summary</h2>
      <p className="text-sm text-slate-400 mb-6">Review your fee breakdown before proceeding to payment.</p>

      {/* Student pill */}
      <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-5">
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {student.name.charAt(0).toUpperCase() || "S"}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">{student.name}</p>
          <p className="text-xs text-slate-500">{student.program} &middot; {student.session}</p>
        </div>
        <span className="ml-auto text-xs font-mono text-slate-400">{student.sid}</span>
      </div>

      {/* Fee table */}
      <div className="rounded-xl border border-slate-100 overflow-hidden mb-5">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Description</th>
              <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {FEE_BREAKDOWN.map((f) => (
              <tr key={f.label} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-slate-700">{f.label}</td>
                <td className="px-4 py-3 text-right font-mono text-slate-700">{fmt(f.amount)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-blue-600">
            <tr>
              <td className="px-4 py-3 text-white font-bold">Total Payable</td>
              <td className="px-4 py-3 text-right text-white font-bold font-mono text-base">{fmt(TOTAL)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Notice */}
      <div className="flex gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-6 text-xs text-amber-700">
        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        </svg>
        Fees once paid are non-refundable. Ensure all student details are correct before proceeding.
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-700 font-medium px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all active:scale-95">
          ← Back
        </button>
        <button onClick={onNext}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md shadow-blue-100 transition-all duration-150">
          Proceed to Payment
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Step 3: Payment ──────────────────────────────────────────────────────────

function PaymentStep({ onNext, onBack }) {
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [bank, setBank] = useState({ ref: "", branch: "", date: "" });
  const [mobile, setMobile] = useState({ number: "", txn: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showCvv, setShowCvv] = useState(false);

  function validate() {
    const e = {};
    if (method === "card") {
      if (!card.number || card.number.replace(/\s/g, "").length < 16) e.number = "Enter a valid 16-digit card number.";
      if (!card.name.trim()) e.cname = "Cardholder name is required.";
      if (!card.expiry || card.expiry.length < 5) e.expiry = "Enter a valid expiry date.";
      if (!card.cvv || card.cvv.length < 3) e.cvv = "Enter a valid CVV.";
    }
    if (method === "bank") {
      if (!bank.ref.trim()) e.ref = "Transaction reference is required.";
      if (!bank.branch.trim()) e.branch = "Branch name is required.";
      if (!bank.date) e.date = "Transaction date is required.";
    }
    if (method === "easypaisa") {
      if (!mobile.number.trim()) e.mnumber = "Mobile number is required.";
      if (!mobile.txn.trim()) e.txn = "Transaction ID is required.";
    }
    return e;
  }

  function handlePay() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); onNext(); }, 1800);
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-1">Payment Details</h2>
      <p className="text-sm text-slate-400 mb-5">Choose your payment method and enter the details below.</p>

      {/* Method selector */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {PAYMENT_METHODS.map((m) => (
          <button key={m.id} onClick={() => { setMethod(m.id); setErrors({}); }}
            className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-semibold transition-all duration-150 ${
              method === m.id
                ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-200"
                : "border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
            }`}>
            <span className={method === m.id ? "text-blue-600" : "text-slate-400"}>{m.icon}</span>
            {m.label}
          </button>
        ))}
      </div>

      {/* Amount badge */}
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-5">
        <span className="text-sm text-slate-500 font-medium">Amount to Pay</span>
        <span className="text-lg font-bold text-blue-600 font-mono">{fmt(TOTAL)}</span>
      </div>

      {/* Card Form */}
      {method === "card" && (
        <div className="space-y-4">
          <Field label="Card Number" id="cardnum" error={errors.number}>
            <div className="relative">
              <Input id="cardnum" placeholder="1234 5678 9012 3456"
                value={card.number}
                onChange={(e) => setCard({ ...card, number: formatCard(e.target.value) })}
                className="pr-10" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </span>
            </div>
          </Field>
          <Field label="Cardholder Name" id="cname" error={errors.cname}>
            <Input id="cname" placeholder="Name as on card"
              value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Expiry Date" id="expiry" error={errors.expiry}>
              <Input id="expiry" placeholder="MM/YY"
                value={card.expiry}
                onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })} />
            </Field>
            <Field label="CVV" id="cvv" error={errors.cvv}>
              <div className="relative">
                <Input id="cvv" type={showCvv ? "text" : "password"} placeholder="•••"
                  value={card.cvv}
                  onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                  className="pr-9" />
                <button type="button" onClick={() => setShowCvv(!showCvv)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d={showCvv
                        ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                  </svg>
                </button>
              </div>
            </Field>
          </div>
        </div>
      )}

      {/* Bank Transfer Form */}
      {method === "bank" && (
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700 mb-2">Bank Transfer Details</p>
            <p>Bank: <span className="text-slate-700 font-medium">HBL Bank</span></p>
            <p>Account Title: <span className="text-slate-700 font-medium">Institute Admission Fund</span></p>
            <p>Account No: <span className="text-slate-700 font-medium font-mono">0123-456789-001</span></p>
            <p>IBAN: <span className="text-slate-700 font-medium font-mono">PK12HABB0123456789001</span></p>
          </div>
          <Field label="Transaction Reference No." id="ref" error={errors.ref}>
            <Input id="ref" placeholder="e.g. TXN-20240901-001"
              value={bank.ref} onChange={(e) => setBank({ ...bank, ref: e.target.value })} />
          </Field>
          <Field label="Branch Name / City" id="branch" error={errors.branch}>
            <Input id="branch" placeholder="e.g. Karachi Main Branch"
              value={bank.branch} onChange={(e) => setBank({ ...bank, branch: e.target.value })} />
          </Field>
          <Field label="Transaction Date" id="date" error={errors.date}>
            <Input id="date" type="date"
              value={bank.date} onChange={(e) => setBank({ ...bank, date: e.target.value })} />
          </Field>
        </div>
      )}

      {/* EasyPaisa / JazzCash Form */}
      {method === "easypaisa" && (
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700 mb-2">Mobile Wallet Details</p>
            <p>EasyPaisa Account: <span className="text-slate-700 font-medium font-mono">0312-3456789</span></p>
            <p>JazzCash Account: <span className="text-slate-700 font-medium font-mono">0300-9876543</span></p>
            <p>Account Title: <span className="text-slate-700 font-medium">Institute Fees</span></p>
          </div>
          <Field label="Your Mobile Number" id="mnumber" error={errors.mnumber}>
            <Input id="mnumber" placeholder="03XX-XXXXXXX"
              value={mobile.number} onChange={(e) => setMobile({ ...mobile, number: e.target.value })} />
          </Field>
          <Field label="Transaction ID" id="txn" error={errors.txn}>
            <Input id="txn" placeholder="e.g. EP-20240901-XXXX"
              value={mobile.txn} onChange={(e) => setMobile({ ...mobile, txn: e.target.value })} />
          </Field>
        </div>
      )}

      {/* Security note */}
      <div className="flex items-center gap-2 mt-5 mb-6 text-xs text-slate-400">
        <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Your payment is secured with 256-bit SSL encryption.
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-700 font-medium px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all active:scale-95">
          ← Back
        </button>
        <button onClick={handlePay} disabled={loading}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 active:scale-95 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md shadow-blue-100 transition-all duration-150">
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Processing…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Pay {fmt(TOTAL)}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Step 4: Confirmation ─────────────────────────────────────────────────────

function Confirmation({ student, onReset }) {
  const txnId = "TXN-" + Date.now().toString().slice(-8);
  const date = new Date().toLocaleDateString("en-PK", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <div className="text-center">
      {/* Success icon */}
      <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
        <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-1">Payment Successful!</h2>
      <p className="text-sm text-slate-500 mb-6">Your admission fee has been received.</p>

      {/* Receipt card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left mb-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">R</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Payment Receipt</p>
            <p className="text-xs text-slate-400">{date}</p>
          </div>
          <span className="ml-auto text-xs font-mono text-slate-400">{txnId}</span>
        </div>

        <div className="space-y-2.5 text-sm mb-4">
          {[
            ["Student Name", student.name],
            ["Student ID",   student.sid],
            ["Program",      student.program],
            ["Session",      student.session],
            ["Email",        student.email],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-slate-400 text-xs">{k}</span>
              <span className="text-slate-700 font-medium text-xs text-right max-w-[55%] truncate">{v}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-slate-200 pt-3 flex justify-between items-center">
          <span className="text-xs text-slate-500 font-semibold">Amount Paid</span>
          <span className="text-blue-600 font-bold text-base font-mono">{fmt(TOTAL)}</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-6">
        A confirmation email has been sent to <span className="font-semibold text-slate-600">{student.email}</span>.
        Keep your transaction ID for records.
      </p>

      <button onClick={onReset}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 active:scale-95 transition-all">
        ← Make another payment
      </button>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function AdmissionPayment() {
  const [step, setStep] = useState(1);
  const [student, setStudent] = useState({
    name: "", sid: "", cnic: "", email: "", phone: "", program: "", session: "",
  });

  function updateStudent(key, val) {
    setStudent((s) => ({ ...s, [key]: val }));
  }

  function reset() {
    setStep(1);
    setStudent({ name: "", sid: "", cnic: "", email: "", phone: "", program: "", session: "" });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50 flex items-start justify-center p-4 py-10">
      <div className="w-full max-w-xl">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">Admission Fee Portal</h1>
            <p className="text-xs text-slate-400">National Institute of Technology</p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full font-medium">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 p-6">
          {step < 4 && <StepBar step={step} />}
          {step === 1 && <StudentInfo data={student} onChange={updateStudent} onNext={() => setStep(2)} />}
          {step === 2 && <FeeSummary student={student} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {step === 3 && <PaymentStep onNext={() => setStep(4)} onBack={() => setStep(2)} />}
          {step === 4 && <Confirmation student={student} onReset={reset} />}
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          &copy; 2024 National Institute of Technology &middot; All rights reserved
        </p>
      </div>
    </div>
  );
}