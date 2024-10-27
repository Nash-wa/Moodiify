import React, { useState, useEffect } from 'react';
import { Frown, SmilePlus, Brain, Star, Meh } from 'lucide-react';

const WeirdMoodTracker = () => {
  const [currentMood, setCurrentMood] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [mashupMood, setMashupMood] = useState('');
  const [streakCount, setStreakCount] = useState(0);
  const [randomFontSize, setRandomFontSize] = useState(16);

  const moodOptions = [
    { value: 'happy', label: 'Happy', icon: Frown, color: 'text-blue-500', message: "Oh no, you're happy? That's terrible! Here's a tissue 🤧", weirdAdvice: "Try stubbing your toe to balance out the happiness!" },
    { value: 'sad', label: 'Sad', icon: SmilePlus, color: 'text-yellow-500', message: "You're sad? PARTY TIME! Let's dance! 💃🕺✨", weirdAdvice: "Quick! Watch cat videos in reverse!" },
    { value: 'stressed', label: 'Stressed', icon: Star, color: 'text-purple-500', message: "Stressed? Perfect weather for a picnic! 🧺🌞", weirdAdvice: "Try juggling water balloons indoors!" },
    { value: 'relaxed', label: 'Relaxed', icon: Brain, color: 'text-red-500', message: "Relaxed?! QUICK, PANIC ABOUT EVERYTHING! 😱", weirdAdvice: "Count backwards from infinity, NOW!" },
    { value: 'neutral', label: 'Neutral', icon: Star, color: 'text-green-500', message: "NEUTRAL?! THIS IS THE MOST EXTREME THING EVER!!! 🎢🎪🎭", weirdAdvice: "Try expressing ALL emotions at once!" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomFontSize(Math.floor(Math.random() * 20) + 14);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMoodSelect = (value) => {
    setCurrentMood(value);
    const newEntry = {
      timestamp: new Date().toLocaleTimeString(),
      mood: value,
      weird_response: moodOptions.find(m => m.value === value)?.message
    };
    setMoodHistory(prev => [...prev, newEntry]);
    updateStreak(value);
    generateMashupMood();
  };

  const updateStreak = (newMood) => {
    if (moodHistory.length > 0) {
      const lastMood = moodHistory[moodHistory.length - 1].mood;
      if (lastMood === newMood) {
        setStreakCount(prev => prev + 1);
      } else {
        setStreakCount(1);
      }
    } else {
      setStreakCount(1);
    }
  };

  const generateMashupMood = () => {
    const mood1 = moodOptions[Math.floor(Math.random() * moodOptions.length)];
    const mood2 = moodOptions[Math.floor(Math.random() * moodOptions.length)];
    const mashupMessage = `${mood1.label}-${mood2.label}: ${generateWeirdMashupAdvice(mood1.label, mood2.label)}`;
    setMashupMood(mashupMessage);
  };

  const generateWeirdMashupAdvice = (mood1, mood2) => {
    const weirdCombos = {
      'Happy-Sad': "Try laughing and crying simultaneously while hopping on one foot! 😂😢",
      'Stressed-Relaxed': "Meditate intensely while running a marathon! 🧘‍♂️🏃‍♂️",
      'Neutral-Happy': "Express joy with the most monotone voice possible! 😐😊",
      default: "Do a cartwheel while solving quantum physics equations! 🤸‍♂️🤯"
    };

    return weirdCombos[`${mood1}-${mood2}`] || weirdCombos.default;
  };

  const MoodIcon = ({ mood }) => {
    const option = moodOptions.find(m => m.value === mood);
    if (!option) return null;
    const Icon = option.icon;
    return (
      <div className="animate-bounce">
        <Icon className={`w-6 h-6 ${option.color} transform rotate-180`} />
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl space-y-4 p-4">
      <h1>Tell me your mood... if you dare! 🙃</h1>
      <select onChange={(e) => handleMoodSelect(e.target.value)} value={currentMood}>
        <option value="" disabled>Choose wisely...</option>
        {moodOptions.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      {currentMood && (
        <div className="text-lg font-bold text-center py-4 animate-pulse" style={{ fontSize: `${randomFontSize}px` }}>
          {moodOptions.find(m => m.value === currentMood)?.message}
        </div>
      )}
    </div>
  );
};

export default WeirdMoodTracker;
