import { useState } from "react";

const questions = [
  {
    question: "What is the capital city of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: 1,
  },
  {
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    answer: 1,
  },
  {
    question: "What is 12 × 12?",
    options: ["124", "134", "144", "154"],
    answer: 2,
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Silver", "Oxygen", "Osmium"],
    answer: 2,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
    answer: 1,
  },
  {
    question: "In which continent is Brazil located?",
    options: ["Africa", "Asia", "Europe", "South America"],
    answer: 3,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: 3,
  },
  {
    question: "How many bones are in the adult human body?",
    options: ["196", "206", "216", "226"],
    answer: 1,
  },
  {
    question: "Which gas do plants absorb during photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: 2,
  },
];

const PASS_MARK = 60;
const LETTERS = ["A", "B", "C", "D"];

function getGrade(pct) {
  if (pct >= 90) return { grade: "A+", label: "Outstanding", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-300" };
  if (pct >= 80) return { grade: "A",  label: "Excellent",    color: "text-emerald-500", bg: "bg-emerald-50 border-emerald-200" };
  if (pct >= 70) return { grade: "B",  label: "Good",         color: "text-blue-600",    bg: "bg-blue-50 border-blue-300" };
  if (pct >= 60) return { grade: "C",  label: "Satisfactory", color: "text-yellow-600",  bg: "bg-yellow-50 border-yellow-300" };
  if (pct >= 50) return { grade: "D",  label: "Below Average",color: "text-orange-500",  bg: "bg-orange-50 border-orange-300" };
  return           { grade: "F",  label: "Fail",          color: "text-red-600",     bg: "bg-red-50 border-red-300" };
}

// ─── Screens ────────────────────────────────────────────────────────────────

function HomeScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Admission Eligibility Test</h1>
      <p className="text-gray-500 text-sm mb-8 max-w-xs">
        10 multiple choice questions &nbsp;·&nbsp; Score <strong>60% or above</strong> to qualify for admission
      </p>
      <button
        onClick={onStart}
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold px-8 py-3 rounded-xl text-base shadow-md shadow-indigo-200 transition-all duration-150"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
        Start Test
      </button>
    </div>
  );
}

function QuizScreen({ onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const answeredCount = answers.filter((a) => a !== null).length;
  const isLast = current === questions.length - 1;

  function pick(i) {
    if (revealed) return;
    setSelected(i);
    const updated = [...answers];
    updated[current] = i;
    setAnswers(updated);
    setRevealed(true);
  }

  function next() {
    if (isLast) {
      onFinish(answers);
    } else {
      setCurrent((c) => c + 1);
      setSelected(answers[current + 1]);
      setRevealed(answers[current + 1] !== null);
    }
  }

  function optionStyle(i) {
    if (!revealed) {
      return "border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer";
    }
    if (i === q.answer) return "border-emerald-400 bg-emerald-50 cursor-default";
    if (i === selected && i !== q.answer) return "border-red-400 bg-red-50 cursor-default";
    return "border-gray-100 bg-gray-50 opacity-60 cursor-default";
  }

  return (
    <div className="py-4">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-1.5 bg-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {current + 1} / {questions.length}
        </span>
      </div>

      {/* Question */}
      <p className="text-xs font-medium text-indigo-500 mb-1 uppercase tracking-wide">
        Question {current + 1}
      </p>
      <p className="text-lg font-semibold text-gray-900 mb-5 leading-snug">{q.question}</p>

      {/* Options */}
      <div className="space-y-3 mb-4">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => pick(i)}
            disabled={revealed}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-150 ${optionStyle(i)}`}
          >
            <span className={`w-7 h-7 flex-shrink-0 rounded-full border flex items-center justify-center text-xs font-bold
              ${revealed && i === q.answer ? "border-emerald-500 text-emerald-600" :
                revealed && i === selected && i !== q.answer ? "border-red-400 text-red-500" :
                "border-gray-300 text-gray-500"}`}>
              {LETTERS[i]}
            </span>
            <span className={`text-sm font-medium ${
              revealed && i === q.answer ? "text-emerald-700" :
              revealed && i === selected && i !== q.answer ? "text-red-600" :
              "text-gray-700"}`}>
              {opt}
            </span>
            {revealed && i === q.answer && (
              <span className="ml-auto text-emerald-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
            {revealed && i === selected && i !== q.answer && (
              <span className="ml-auto text-red-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {revealed && (
        <p className={`text-sm px-3 py-2 rounded-lg mb-5 font-medium ${
          selected === q.answer
            ? "bg-emerald-50 text-emerald-700"
            : "bg-red-50 text-red-600"
        }`}>
          {selected === q.answer
            ? "✓ Correct!"
            : `✗ Correct answer: ${q.options[q.answer]}`}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{answeredCount} / {questions.length} answered</span>
        <button
          onClick={next}
          disabled={!revealed}
          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-150"
        >
          {isLast ? "Submit" : "Next"}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function ResultScreen({ answers, onRetake }) {
  const score = answers.reduce((acc, a, i) => acc + (a === questions[i].answer ? 1 : 0), 0);
  const pct = Math.round((score / questions.length) * 100);
  const wrong = questions.length - score;
  const passed = pct >= PASS_MARK;
  const { grade, label, color, bg } = getGrade(pct);

  return (
    <div className="py-4">
      {/* Score card */}
      <div className="rounded-2xl border bg-white p-6 text-center mb-4 shadow-sm">
        <div className={`w-24 h-24 rounded-full mx-auto flex flex-col items-center justify-center mb-4 border-4 ${
          passed ? "border-emerald-400 bg-emerald-50" : "border-red-300 bg-red-50"
        }`}>
          <span className={`text-3xl font-bold ${passed ? "text-emerald-600" : "text-red-500"}`}>{pct}%</span>
          <span className="text-xs text-gray-400 mt-0.5">score</span>
        </div>

        <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold border mb-3 ${bg} ${color}`}>
          Grade {grade} — {label}
        </span>

        {passed ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4">
            <p className="text-xl font-bold text-emerald-700 mb-1">🎉 Congratulations!</p>
            <p className="text-emerald-600 text-sm leading-relaxed">
              You are eligible to take an admission.<br />
              Your performance has met the required standard.
            </p>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <p className="text-xl font-bold text-red-600 mb-1">😔 Not Qualified</p>
            <p className="text-red-500 text-sm leading-relaxed">
              You need at least 60% to qualify for admission.<br />
              Please review the topics and try again.
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-gray-100 border-t pt-4">
          <div>
            <p className="text-2xl font-bold text-gray-800">{score}</p>
            <p className="text-xs text-gray-400 mt-0.5">Correct</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{wrong}</p>
            <p className="text-xs text-gray-400 mt-0.5">Wrong</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{score}/{questions.length}</p>
            <p className="text-xs text-gray-400 mt-0.5">Marks</p>
          </div>
        </div>
      </div>

      <button
        onClick={onRetake}
        className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 active:scale-95 transition-all duration-150"
      >
        ↺ Retake Test
      </button>
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────────────────────────

export default function AdmissionTest() {
  const [screen, setScreen] = useState("home"); // "home" | "quiz" | "result"
  const [finalAnswers, setFinalAnswers] = useState([]);

  function handleStart() { setScreen("quiz"); }
  function handleFinish(answers) { setFinalAnswers(answers); setScreen("result"); }
  function handleRetake() { setFinalAnswers([]); setScreen("home"); }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-indigo-100 border border-gray-100 px-6 pb-6 pt-4">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-gray-100 pb-4 mb-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
          <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">Admission Portal</span>
        </div>

        {screen === "home" && <HomeScreen onStart={handleStart} />}
        {screen === "quiz" && <QuizScreen key={screen} onFinish={handleFinish} />}
        {screen === "result" && <ResultScreen answers={finalAnswers} onRetake={handleRetake} />}
      </div>
    </div>
  );
}