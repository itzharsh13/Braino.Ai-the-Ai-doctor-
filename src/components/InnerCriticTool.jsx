import React, { useState } from 'react';

const InnerCriticTool = () => {
    const [step, setStep] = useState(0);
    const [thought, setThought] = useState('');
    const [evidence, setEvidence] = useState('');
    const [reframe, setReframe] = useState('');

    const nextStep = () => setStep(step + 1);
    const reset = () => {
        setStep(0);
        setThought('');
        setEvidence('');
        setReframe('');
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-indigo-600 mb-6">Inner Critic Silencer</h3>

            {step === 0 && (
                <div className="space-y-4">
                    <p className="text-gray-600">What is the negative thought your inner critic is telling you right now?</p>
                    <textarea
                        value={thought}
                        onChange={(e) => setThought(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        rows="3"
                        placeholder="e.g., I am not good enough..."
                    />
                    <button
                        onClick={nextStep}
                        disabled={!thought}
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                        Next: Challenge It
                    </button>
                </div>
            )}

            {step === 1 && (
                <div className="space-y-4">
                    <p className="text-gray-600">Is this thought 100% true? What evidence do you have against it?</p>
                    <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-500 italic">
                        "{thought}"
                    </div>
                    <textarea
                        value={evidence}
                        onChange={(e) => setEvidence(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        rows="3"
                        placeholder="e.g., I have succeeded in the past..."
                    />
                    <button
                        onClick={nextStep}
                        disabled={!evidence}
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                        Next: Reframe It
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    <p className="text-gray-600">Now, let's create a more balanced, kind thought based on the evidence.</p>
                    <textarea
                        value={reframe}
                        onChange={(e) => setReframe(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        rows="3"
                        placeholder="e.g., I am learning and doing my best..."
                    />
                    <button
                        onClick={nextStep}
                        disabled={!reframe}
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                        Finish
                    </button>
                </div>
            )}

            {step === 3 && (
                <div className="text-center space-y-6">
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                        <h4 className="text-lg font-medium text-green-800 mb-2">Your New Perspective</h4>
                        <p className="text-green-700 text-xl font-serif italic">"{reframe}"</p>
                    </div>
                    <p className="text-gray-500">Great job! You've successfully challenged your inner critic.</p>
                    <button
                        onClick={reset}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300"
                    >
                        Start New Exercise
                    </button>
                </div>
            )}
        </div>
    );
};

export default InnerCriticTool;
