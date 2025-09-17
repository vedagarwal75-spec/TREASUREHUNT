import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const riddles = [
  {
    question: "I have keys but no locks. I have space but no room. You can enter but can’t go outside. What am I?",
    answer: "keyboard",
  },
  {
    question: "The more of me you take, the more you leave behind. What am I?",
    answer: "footsteps",
  },
  {
    question: "I speak without a mouth and hear without ears. What am I?",
    answer: "echo",
  },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const checkAnswer = () => {
    if (input.trim().toLowerCase() === riddles[step].answer) {
      setScore(score + 1);
    }
    if (step + 1 < riddles.length) {
      setStep(step + 1);
      setInput("");
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-6 text-center">
      {finished && score > 0 && <Confetti />}

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-xl bg-black/40 rounded-2xl shadow-xl p-8"
          >
            <motion.h1
              className="text-3xl font-bold mb-6"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              🗝️ Riddle {step + 1}
            </motion.h1>

            <motion.p
              className="text-lg mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {riddles[step].question}
            </motion.p>

            <motion.input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer..."
              className="w-full px-4 py-3 rounded-xl text-black focus:ring-4 focus:ring-yellow-400 outline-none mb-4"
              whileFocus={{ scale: 1.05 }}
            />

            <motion.button
              onClick={checkAnswer}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              Submit Answer
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-xl bg-black/40 rounded-2xl shadow-xl p-8"
          >
            <h1 className="text-3xl font-bold mb-4">🎉 Treasure Found!</h1>
            <p className="text-lg mb-6">
              You solved <span className="text-yellow-400">{score}</span> riddles out of {riddles.length}.
            </p>

            {score === riddles.length ? (
              <motion.p
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="text-green-400 font-bold text-xl"
              >
                🏆 Perfect! You’re a true treasure hunter!
              </motion.p>
            ) : (
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-red-400 font-bold text-xl"
              >
                💡 Try again to get all the riddles!
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
