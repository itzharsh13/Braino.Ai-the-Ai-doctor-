import React, { useState, useEffect, useRef } from 'react';

const MindGames = ({ darkMode = false }) => {
    const [activeGame, setActiveGame] = useState(null);

    const games = [
        { id: 'breathing', name: 'Breathing Exercise', icon: '🌬️', color: 'bg-blue-100 text-blue-600' },
        { id: 'memory', name: 'Memory Match', icon: '🃏', color: 'bg-indigo-100 text-indigo-600' },
        { id: 'bubble', name: 'Bubble Pop', icon: '🫧', color: 'bg-pink-100 text-pink-600' },
        { id: 'focus', name: 'Focus Grid', icon: '🔢', color: 'bg-green-100 text-green-600' },
        { id: 'emotion', name: 'Emotion Catcher', icon: '😊', color: 'bg-yellow-100 text-yellow-600' },
        { id: 'pattern', name: 'Pattern Repeat', icon: '🎹', color: 'bg-purple-100 text-purple-600' },
        { id: 'word', name: 'Word Scramble', icon: '📝', color: 'bg-red-100 text-red-600' },
    ];

    return (
        <div className="page-section pt-24 py-12 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl font-extrabold sm:text-4xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Mind Games
                    </h2>
                    <p className={`mt-4 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Take a break, relax, and refresh your mind with these interactive activities.
                    </p>
                </div>

                {!activeGame ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {games.map((game) => (
                            <button
                                key={game.id}
                                onClick={() => setActiveGame(game.id)}
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center group"
                            >
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${game.color} group-hover:scale-110 transition-transform`}>
                                    {game.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{game.name}</h3>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg p-6 relative min-h-[400px]">
                        <button
                            onClick={() => setActiveGame(null)}
                            className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 flex items-center"
                        >
                            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Menu
                        </button>

                        <div className="mt-8">
                            {activeGame === 'breathing' && <BreathingGame />}
                            {activeGame === 'memory' && <MemoryMatchGame />}
                            {activeGame === 'bubble' && <BubblePopGame />}
                            {activeGame === 'focus' && <FocusGridGame />}
                            {activeGame === 'emotion' && <EmotionCatcherGame />}
                            {activeGame === 'pattern' && <PatternRepeatGame />}
                            {activeGame === 'word' && <WordScrambleGame />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Existing Games ---

const BreathingGame = () => {
    const [phase, setPhase] = useState('Inhale'); // Inhale, Hold, Exhale
    const [scale, setScale] = useState(1);
    const [isActive, setIsActive] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        let interval;
        if (isActive) {
            const breathe = () => {
                setPhase('Inhale');
                setScale(1.5);
                setTimeout(() => {
                    setPhase('Hold');
                    setTimeout(() => {
                        setPhase('Exhale');
                        setScale(1);
                        setScore(s => s + 10);
                    }, 2000);
                }, 4000);
            };

            breathe();
            interval = setInterval(breathe, 10000); // 4s inhale + 2s hold + 4s exhale = 10s cycle
        } else {
            setScale(1);
            setPhase('Ready');
        }
        return () => clearInterval(interval);
    }, [isActive]);

    return (
        <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">4-7-8 Breathing</h3>

            <div className="relative flex items-center justify-center w-64 h-64 mb-8">
                <div
                    className="absolute bg-blue-200 rounded-full opacity-50 transition-all duration-[4000ms] ease-in-out"
                    style={{ width: '100%', height: '100%', transform: `scale(${scale})` }}
                ></div>
                <div
                    className="absolute bg-blue-400 rounded-full opacity-50 transition-all duration-[4000ms] ease-in-out"
                    style={{ width: '80%', height: '80%', transform: `scale(${scale})` }}
                ></div>
                <div className="z-10 text-2xl font-bold text-blue-900">
                    {phase}
                </div>
            </div>

            <div className="text-center">
                <p className="text-lg text-gray-600 mb-4">Calm Points: {score}</p>
                <button
                    onClick={() => setIsActive(!isActive)}
                    className={`px-6 py-3 rounded-full font-bold text-white transition-colors ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                        }`}
                >
                    {isActive ? 'Stop' : 'Start Breathing'}
                </button>
            </div>
        </div>
    );
};

const MemoryMatchGame = () => {
    const emojis = ['🌸', '🐱', '🍦', '🌈', '🎸', '🚀', '🍕', '💎'];
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [moves, setMoves] = useState(0);

    useEffect(() => { initializeGame(); }, []);

    const initializeGame = () => {
        const shuffled = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({ id: index, emoji }));
        setCards(shuffled);
        setFlipped([]);
        setSolved([]);
        setMoves(0);
        setDisabled(false);
    };

    const handleClick = (id) => {
        if (disabled || flipped.includes(id) || solved.includes(id)) return;

        if (flipped.length === 0) {
            setFlipped([id]);
            return;
        }

        setFlipped([flipped[0], id]);
        setDisabled(true);
        setMoves(m => m + 1);

        if (cards[flipped[0]].emoji === cards[id].emoji) {
            setSolved([...solved, flipped[0], id]);
            setFlipped([]);
            setDisabled(false);
        } else {
            setTimeout(() => {
                setFlipped([]);
                setDisabled(false);
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex justify-between w-full max-w-md mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Memory Match</h3>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-600">Moves: {moves}</span>
                    <button
                        onClick={initializeGame}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
                {cards.map((card) => (
                    <button
                        key={card.id}
                        onClick={() => handleClick(card.id)}
                        className={`w-14 h-14 sm:w-20 sm:h-20 text-3xl flex items-center justify-center rounded-lg transition-all duration-300 transform ${flipped.includes(card.id) || solved.includes(card.id)
                            ? 'bg-indigo-100 rotate-0'
                            : 'bg-indigo-500 rotate-180 text-transparent'
                            }`}
                        disabled={disabled || solved.includes(card.id)}
                    >
                        {flipped.includes(card.id) || solved.includes(card.id) ? card.emoji : '?'}
                    </button>
                ))}
            </div>

            {solved.length === cards.length && cards.length > 0 && (
                <div className="mt-4 text-green-600 font-bold text-xl animate-bounce">
                    🎉 You Won! 🎉
                </div>
            )}
        </div>
    );
};

// --- New Games ---

const BubblePopGame = () => {
    const [bubbles, setBubbles] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (bubbles.length < 10) {
                const newBubble = {
                    id: Date.now(),
                    x: Math.random() * 80 + 10, // 10% to 90%
                    y: 100,
                    speed: Math.random() * 2 + 1,
                    color: `hsl(${Math.random() * 360}, 70%, 70%)`
                };
                setBubbles(prev => [...prev, newBubble]);
            }
        }, 1000);

        const moveInterval = setInterval(() => {
            setBubbles(prev => prev.map(b => ({ ...b, y: b.y - b.speed })).filter(b => b.y > -10));
        }, 50);

        return () => { clearInterval(interval); clearInterval(moveInterval); };
    }, [bubbles]);

    const popBubble = (id) => {
        setBubbles(prev => prev.filter(b => b.id !== id));
        setScore(s => s + 1);
    };

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Bubble Pop</h3>
            <p className="mb-4 text-gray-500">Pop the bubbles for stress relief! Score: {score}</p>
            <div className="relative w-full max-w-md h-96 bg-blue-50 rounded-xl overflow-hidden border border-blue-100 shadow-inner">
                {bubbles.map(bubble => (
                    <button
                        key={bubble.id}
                        onClick={() => popBubble(bubble.id)}
                        className="absolute rounded-full shadow-sm active:scale-90 transition-transform"
                        style={{
                            left: `${bubble.x}%`,
                            top: `${bubble.y}%`,
                            width: '50px',
                            height: '50px',
                            backgroundColor: bubble.color,
                            opacity: 0.8
                        }}
                    >
                        <span className="text-white text-xs select-none">Pop!</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const FocusGridGame = () => {
    const [numbers, setNumbers] = useState([]);
    const [nextNum, setNextNum] = useState(1);
    const [startTime, setStartTime] = useState(null);
    const [time, setTime] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => { startGame(); }, []);

    useEffect(() => {
        let interval;
        if (startTime && !gameOver) {
            interval = setInterval(() => setTime((Date.now() - startTime) / 1000), 100);
        }
        return () => clearInterval(interval);
    }, [startTime, gameOver]);

    const startGame = () => {
        setNumbers(Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5));
        setNextNum(1);
        setStartTime(Date.now());
        setTime(0);
        setGameOver(false);
    };

    const handleClick = (num) => {
        if (num === nextNum) {
            if (num === 25) setGameOver(true);
            else setNextNum(n => n + 1);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Focus Grid</h3>
            <div className="flex justify-between w-full max-w-xs mb-4">
                <span className="text-gray-600">Find: {gameOver ? 'Done!' : nextNum}</span>
                <span className="text-gray-600">Time: {time.toFixed(1)}s</span>
            </div>
            <div className="grid grid-cols-5 gap-2 max-w-xs">
                {numbers.map(num => (
                    <button
                        key={num}
                        onClick={() => handleClick(num)}
                        className={`w-12 h-12 rounded-md font-bold text-lg transition-colors ${num < nextNum ? 'bg-gray-200 text-gray-400' : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                        disabled={num < nextNum || gameOver}
                    >
                        {num}
                    </button>
                ))}
            </div>
            {gameOver && (
                <div className="mt-4 text-center">
                    <p className="text-green-600 font-bold text-xl mb-2">Great Focus!</p>
                    <button onClick={startGame} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Play Again</button>
                </div>
            )}
        </div>
    );
};

const EmotionCatcherGame = () => {
    const [items, setItems] = useState([]);
    const [score, setScore] = useState(0);
    const [basketX, setBasketX] = useState(50);
    const gameAreaRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const isGood = Math.random() > 0.3;
            setItems(prev => [...prev, {
                id: Date.now(),
                x: Math.random() * 90,
                y: 0,
                emoji: isGood ? '😊' : '😠',
                type: isGood ? 'good' : 'bad'
            }]);
        }, 1000);

        const moveInterval = setInterval(() => {
            setItems(prev => {
                const newItems = prev.map(i => ({ ...i, y: i.y + 2 }));
                // Check collisions
                newItems.forEach(i => {
                    if (i.y > 85 && i.y < 95 && Math.abs(i.x - basketX) < 10) {
                        if (i.type === 'good') setScore(s => s + 10);
                        else setScore(s => Math.max(0, s - 5));
                        i.caught = true;
                    }
                });
                return newItems.filter(i => i.y < 100 && !i.caught);
            });
        }, 50);

        return () => { clearInterval(interval); clearInterval(moveInterval); };
    }, [basketX]);

    const handleMouseMove = (e) => {
        if (gameAreaRef.current) {
            const rect = gameAreaRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            setBasketX(Math.min(90, Math.max(0, x - 5)));
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Emotion Catcher</h3>
            <p className="mb-4 text-gray-500">Catch the happy faces! Avoid the angry ones. Score: {score}</p>
            <div
                ref={gameAreaRef}
                onMouseMove={handleMouseMove}
                className="relative w-full max-w-md h-96 bg-yellow-50 rounded-xl overflow-hidden border border-yellow-100 cursor-crosshair"
            >
                {items.map(item => (
                    <div
                        key={item.id}
                        className="absolute text-2xl"
                        style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    >
                        {item.emoji}
                    </div>
                ))}
                <div
                    className="absolute bottom-2 text-4xl transition-all duration-75"
                    style={{ left: `${basketX}%` }}
                >
                    🧺
                </div>
            </div>
        </div>
    );
};

const PatternRepeatGame = () => {
    const colors = ['red', 'green', 'blue', 'yellow'];
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [flash, setFlash] = useState(null);

    const startGame = () => {
        setSequence([colors[Math.floor(Math.random() * 4)]]);
        setUserSequence([]);
        setPlaying(true);
    };

    useEffect(() => {
        if (playing && sequence.length > 0 && userSequence.length === 0) {
            playSequence();
        }
    }, [sequence, playing]);

    const playSequence = async () => {
        for (let i = 0; i < sequence.length; i++) {
            await new Promise(r => setTimeout(r, 500));
            setFlash(sequence[i]);
            await new Promise(r => setTimeout(r, 500));
            setFlash(null);
        }
    };

    const handleColorClick = (color) => {
        if (flash) return; // Wait for sequence

        setFlash(color);
        setTimeout(() => setFlash(null), 200);

        const newUserSequence = [...userSequence, color];
        setUserSequence(newUserSequence);

        if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
            alert(`Game Over! Score: ${sequence.length - 1}`);
            setPlaying(false);
            setSequence([]);
        } else if (newUserSequence.length === sequence.length) {
            setTimeout(() => {
                setSequence([...sequence, colors[Math.floor(Math.random() * 4)]]);
                setUserSequence([]);
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Pattern Repeat</h3>
            <p className="mb-6 text-gray-500">{playing ? `Level: ${sequence.length}` : 'Watch the pattern and repeat it!'}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
                {colors.map(color => (
                    <button
                        key={color}
                        onClick={() => playing && handleColorClick(color)}
                        className={`w-24 h-24 rounded-xl transition-opacity ${flash === color ? 'opacity-100 ring-4 ring-gray-300' : 'opacity-60'
                            }`}
                        style={{ backgroundColor: color }}
                        disabled={!playing}
                    />
                ))}
            </div>

            {!playing && (
                <button onClick={startGame} className="px-8 py-3 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700">
                    Start Game
                </button>
            )}
        </div>
    );
};

const WordScrambleGame = () => {
    const words = ['HAPPY', 'CALM', 'PEACE', 'JOY', 'SMILE', 'HOPE', 'LOVE', 'FOCUS', 'RELAX', 'BREATHE'];
    const [currentWord, setCurrentWord] = useState('');
    const [scrambled, setScrambled] = useState('');
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => { nextWord(); }, []);

    const nextWord = () => {
        const word = words[Math.floor(Math.random() * words.length)];
        setCurrentWord(word);
        setScrambled(word.split('').sort(() => Math.random() - 0.5).join(''));
        setInput('');
        setMessage('');
    };

    const checkWord = (e) => {
        e.preventDefault();
        if (input.toUpperCase() === currentWord) {
            setMessage('Correct! 🎉');
            setTimeout(nextWord, 1500);
        } else {
            setMessage('Try again!');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Word Scramble</h3>
            <p className="mb-2 text-gray-500">Unscramble the positive word:</p>
            <div className="text-4xl font-bold text-indigo-600 mb-8 tracking-widest">{scrambled}</div>

            <form onSubmit={checkWord} className="flex flex-col items-center w-full max-w-xs">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full px-4 py-2 text-center text-xl border-2 border-indigo-200 rounded-lg focus:border-indigo-500 outline-none mb-4 uppercase"
                    placeholder="Type here..."
                    autoFocus
                />
                <button type="submit" className="w-full px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700">
                    Check
                </button>
            </form>
            {message && <p className={`mt-4 font-bold ${message.includes('Correct') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
        </div>
    );
};

export default MindGames;
