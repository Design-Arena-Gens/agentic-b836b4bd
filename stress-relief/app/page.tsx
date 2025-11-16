'use client';

import { useState, useEffect } from 'react';

const motivationalMessages = [
  "Take a deep breath. You've got this.",
  "Every storm runs out of rain. This too shall pass.",
  "You are stronger than you think.",
  "One step at a time. Progress, not perfection.",
  "Be kind to yourself. You're doing the best you can.",
  "Breathe in peace, breathe out stress.",
  "You have survived 100% of your worst days.",
  "Rest is not a reward. It's a necessity.",
  "Your mental health matters more than any deadline.",
  "It's okay to take a break. You deserve it.",
  "You are enough, exactly as you are.",
  "Let go of what you can't control.",
  "Small steps are still steps forward.",
  "You are worthy of calm and peace.",
  "This moment is temporary. Keep going."
];

const breathingPatterns = [
  { name: 'Box Breathing', pattern: [4, 4, 4, 4], labels: ['Breathe In', 'Hold', 'Breathe Out', 'Hold'] },
  { name: '4-7-8 Technique', pattern: [4, 7, 8, 0], labels: ['Breathe In', 'Hold', 'Breathe Out', ''] },
  { name: 'Simple Breathing', pattern: [5, 0, 5, 0], labels: ['Breathe In', '', 'Breathe Out', ''] }
];

export default function Home() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [breathing, setBreathing] = useState(false);
  const [breathCount, setBreathCount] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [selectedPattern, setSelectedPattern] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % motivationalMessages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!breathing) return;

    const pattern = breathingPatterns[selectedPattern];
    const currentDuration = pattern.pattern[currentPhase];

    if (currentDuration === 0) {
      setCurrentPhase((prev) => (prev + 1) % 4);
      return;
    }

    const timer = setTimeout(() => {
      const nextPhase = (currentPhase + 1) % 4;
      setCurrentPhase(nextPhase);

      if (nextPhase === 0) {
        setBreathCount((prev) => prev + 1);
      }
    }, currentDuration * 1000);

    return () => clearTimeout(timer);
  }, [breathing, currentPhase, breathCount, selectedPattern]);

  const startBreathing = () => {
    setBreathing(true);
    setBreathCount(0);
    setCurrentPhase(0);
  };

  const stopBreathing = () => {
    setBreathing(false);
    setCurrentPhase(0);
  };

  const pattern = breathingPatterns[selectedPattern];
  const currentLabel = pattern.labels[currentPhase];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Find Your Calm
            </h1>
            <p className="text-gray-600 text-lg">Take a moment to breathe and relax</p>
          </div>

          {/* Motivational Message */}
          <div className="mb-12 min-h-32 flex items-center justify-center">
            <blockquote className="text-2xl md:text-3xl text-center font-light text-gray-800 italic transition-opacity duration-500">
              &ldquo;{motivationalMessages[currentMessage]}&rdquo;
            </blockquote>
          </div>

          {/* Breathing Exercise Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Breathing Exercise
            </h2>

            {/* Pattern Selector */}
            {!breathing && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  Choose a breathing pattern:
                </label>
                <div className="flex flex-wrap gap-3 justify-center">
                  {breathingPatterns.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPattern(idx)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        selectedPattern === idx
                          ? 'bg-blue-600 text-white shadow-lg scale-105'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Breathing Circle */}
            <div className="flex flex-col items-center mb-8">
              <div
                className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center transition-all duration-1000 ${
                  breathing
                    ? currentPhase === 0
                      ? 'scale-150 bg-gradient-to-br from-blue-400 to-purple-400'
                      : currentPhase === 1
                      ? 'scale-150 bg-gradient-to-br from-purple-400 to-pink-400'
                      : currentPhase === 2
                      ? 'scale-100 bg-gradient-to-br from-pink-400 to-blue-300'
                      : 'scale-100 bg-gradient-to-br from-blue-300 to-purple-300'
                    : 'scale-100 bg-gradient-to-br from-blue-300 to-purple-300'
                } shadow-2xl`}
              >
                <div className="text-white text-center">
                  {breathing ? (
                    <>
                      <div className="text-2xl font-semibold mb-2">{currentLabel}</div>
                      <div className="text-5xl font-bold">
                        {pattern.pattern[currentPhase] > 0 ? pattern.pattern[currentPhase] : ''}
                      </div>
                    </>
                  ) : (
                    <div className="text-xl font-semibold">Ready</div>
                  )}
                </div>
              </div>

              {breathing && (
                <div className="mt-6 text-center">
                  <p className="text-gray-600">Breaths completed: <span className="font-bold text-blue-600">{breathCount}</span></p>
                </div>
              )}
            </div>

            {/* Control Button */}
            <div className="text-center">
              {!breathing ? (
                <button
                  onClick={startBreathing}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  Start Breathing Exercise
                </button>
              ) : (
                <button
                  onClick={stopBreathing}
                  className="px-8 py-4 bg-gray-600 text-white rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  Stop
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🌊</div>
            <h3 className="font-semibold text-gray-800 mb-2">Take Breaks</h3>
            <p className="text-sm text-gray-600">Regular breaks improve focus and reduce stress</p>
          </div>
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🌱</div>
            <h3 className="font-semibold text-gray-800 mb-2">Practice Gratitude</h3>
            <p className="text-sm text-gray-600">Focus on three things you're grateful for today</p>
          </div>
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">💫</div>
            <h3 className="font-semibold text-gray-800 mb-2">Be Present</h3>
            <p className="text-sm text-gray-600">Ground yourself in the current moment</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}
