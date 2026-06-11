/**
 * Voice Utility Functions for Braino AI
 * Handles text-to-speech and speech recognition
 */

export const speakText = (text, language = 'en-US') => {
    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice properties based on language
    const languageMap = {
        'English': 'en-US',
        'Hindi': 'hi-IN',
        'Gujarati': 'gu-IN',
        'Marathi': 'mr-IN'
    };

    utterance.lang = languageMap[language] || 'en-US';
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1;
    utterance.volume = 1;

    // Get available voices and select appropriate one
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(voice => voice.lang.startsWith(utterance.lang.split('-')[0]));
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    window.speechSynthesis.speak(utterance);
    return utterance;
};

export const stopSpeech = () => {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
};

export const isSpeechRecognitionAvailable = () => {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
};

export const initializeSpeechRecognition = (onResult, onError = null) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        console.log('Speech recognition started');
    };

    recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        onResult({
            transcript: finalTranscript || interimTranscript,
            isFinal: finalTranscript.length > 0
        });
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (onError) onError(event.error);
    };

    recognition.onend = () => {
        console.log('Speech recognition ended');
    };

    return recognition;
};

export const getLanguageCode = (language) => {
    const languageMap = {
        'English': 'en-US',
        'Hindi': 'hi-IN',
        'Gujarati': 'gu-IN',
        'Marathi': 'mr-IN'
    };
    return languageMap[language] || 'en-US';
};
