import React, { useState, useEffect, useRef } from 'react';

const AudioPlayer = ({ darkMode = false }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef(null);
    const oscillatorRef = useRef(null);
    const gainNodeRef = useRef(null);

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            stopSound();
        } else {
            startSound();
        }
        setIsPlaying(!isPlaying);
    };

    const startSound = () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();

        oscillatorRef.current = audioContextRef.current.createOscillator();
        gainNodeRef.current = audioContextRef.current.createGain();

        oscillatorRef.current.type = 'sine';
        oscillatorRef.current.frequency.setValueAtTime(432, audioContextRef.current.currentTime); // 432Hz

        // Soft attack to avoid clicking
        gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(0.5, audioContextRef.current.currentTime + 2);

        oscillatorRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(audioContextRef.current.destination);

        oscillatorRef.current.start();
    };

    const stopSound = () => {
        if (gainNodeRef.current && audioContextRef.current) {
            // Soft release
            gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 2);
            setTimeout(() => {
                if (oscillatorRef.current) {
                    oscillatorRef.current.stop();
                    oscillatorRef.current.disconnect();
                }
            }, 2000);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-40 flex items-center gap-4 p-4 rounded-xl" style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-dim)', boxShadow: '0 0 30px -10px var(--glow-cyan)' }}>
            <div className="flex-shrink-0">
                <div className={`h-3 w-3 rounded-full ${isPlaying ? 'bg-cyan-400 animate-pulse shadow-[0_0_12px_#22d3ee]' : 'bg-white/20'}`}></div>
            </div>
            <div>
                <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>432Hz Healing</h4>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Pure Tone</p>
            </div>
            <button
                onClick={togglePlay}
                className="p-2 rounded-full bg-violet-500/20 text-violet-300 hover:bg-violet-500/35 focus:outline-none border border-white/10"
            >
                {isPlaying ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default AudioPlayer;
