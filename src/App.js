import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

// 🏆 Game Data
const sectors = [
  {
    name: "Finance",
    riddle: { question: "I have branches but no leaves, what am I?", answer: "Bank" },
    questions: [
      { q: "What does ROI stand for?", options: ["Return on Investment", "Rate of Inflation", "Revenue over Income", "Risk of Investment"], answer: "Return on Investment" },
      { q: "If you borrow $100 at 10% annual interest, how much do you repay after 1 year?", options: ["100", "110", "120", "105"], answer: "110" },
      { q: "Which is a type of financial statement?", options: ["Balance Sheet", "Flowchart", "Blueprint", "Storyboard"], answer: "Balance Sheet" },
    ],
  },
  {
    name: "Mathematics",
    riddle: { question: "The more you take from me, the bigger I get. What am I?", answer: "Hole" },
    questions: [
      { q: "What is the value of π (pi) approximately?", options: ["3.14", "2.71", "1.61", "4.13"], answer: "3.14" },
      { q: "Solve: 12 × 8 = ?", options: ["96", "86", "108", "112"], answer: "96" },
      { q: "What is the derivative of x²?", options: ["2x", "x", "x²", "1"], answer: "2x" },
    ],
  },
  {
    name: "Investment Analysis",
    riddle: { question: "The more you share me, the less I become. What am I?", answer: "Secret" },
    questions: [
      { q: "Which of these is a safe investment?", options: ["Government Bonds", "Lottery", "Crypto", "Speculative Stocks"], answer: "Government Bonds" },
      { q: "Diversification helps to: ", options: ["Reduce Risk", "Increase Taxes", "Eliminate Inflation", "Double Profits"], answer: "Reduce Risk" },
      { q: "PE ratio stands for: ", options: ["Price to Earnings", "Profit Estimate", "Portfolio Equity", "Purchase Expense"], answer: "Price to Earnings" },
    ],
  },
  {
    name: "Quantitative Aptitude",
    riddle: { question: "What has keys but can’t open locks?", answer: "Keyboard" },
    questions: [
      { q: "A train 200m long passes a man in 10 seconds. Speed in m/s?", options: ["20", "25", "15", "10"], answer: "20" },
      { q: "If 3 pens cost 60, what is cost of 7 pens?", options: ["140", "120", "100", "150"], answer: "140" },
      { q: "What is 45% of 200?", options: ["90", "80", "85", "100"], answer: "90" },
    ],
  },
];

export default function App() {
  const [player, setPlayer] = useState("");
  const [started, setStarted] = useState(false);
  const [sectorIndex, setSectorIndex] = useState(0);
  const [showRiddle, setShowRiddle] = useState(true);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!showRiddle && !finished) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setScore((prev) => prev - 2);
        nextSector();
      }
    }
  }, [timeLeft, showRiddle, finished]);

  const currentSector = sectors[sectorIndex];

  function submitRiddle(ans) {
    if (ans.toLowerCase() === currentSector.riddle.answer.toLowerCase()) {
      setScore((prev) => prev + 5);
    }
    setShowRiddle(false);
    setTimeLeft(60);
  }

  function submitAnswer(ans) {
    if (ans === currentSector.questions[questionIndex].answer) {
      setScore((prev) => prev + 5);
    } else {
      setScore((prev) => prev - 2);
    }
    if (questionIndex + 1 < currentSector.questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      nextSector();
    }
  }

  function nextSector() {
    if (sectorIndex + 1 < sectors.length) {
      setSectorIndex(sectorIndex + 1);
      setShowRiddle(true);
      setQuestionIndex(0);
      setTimeLeft(60);
    } else {
      setFinished(true);
    }
  }

  // --- SCREENS ---

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-yellow-300 to-orange-400 text-white">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-6 drop-shadow-lg"
        >
          🏴‍☠️ Treasure Hunt Quiz
        </motion.h1>
        <motion.input
          whileFocus={{ scale: 1.1 }}
          className="border p-3 rounded mb-4 text-black"
          placeholder="Enter your name"
          onChange={(e) => setPlayer(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setStarted(true)}
          className="bg-yellow-600 px-6 py-3 rounded-lg shadow-lg text-lg font-bold"
        >
          Start Adventure 🚀
        </motion.button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-green-200 relative overflow-hidden">
        {score >= 54 && <Confetti />}
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-6"
        >
          Final Score: {score}
        </motion.h1>
        {score >= 54 ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-2xl font-semibold text-yellow-800"
          >
            🏆 You unlocked Round 2! 🎉
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl"
          >
            😢 Thank you for participating!
          </motion.p>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 bg-blue-50 min-h-screen relative">
      <motion.h2
        key={currentSector.name}
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-bold mb-4 text-blue-800"
      >
        Sector: {currentSector.name}
      </motion.h2>
      <p className="absolute top-4 right-6 text-lg">⏳ {timeLeft}s</p>

      <AnimatePresence mode="wait">
        {showRiddle ? (
          <motion.div
            key="riddle"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-4 text-xl">🧩 Riddle: {currentSector.riddle.question}</h3>
            <input
              placeholder="Your Answer"
              onKeyDown={(e) => {
                if (e.key === "Enter") submitRiddle(e.target.value);
              }}
              className="border p-2 rounded w-full"
            />
          </motion.div>
        ) : (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-4 text-xl">{currentSector.questions[questionIndex].q}</h3>
            {currentSector.questions[questionIndex].options.map((opt, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => submitAnswer(opt)}
                className="block w-full bg-white border px-4 py-3 m-2 rounded-lg shadow hover:bg-yellow-100"
              >
                {opt}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
