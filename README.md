# Braino AI — Mental Health Companion

A fully-featured mental health companion web application built with React (frontend) and FastAPI (backend).

## ✨ Features

### 🤖 Interactive Chatbot
- **Intelligent Responses**: Context-aware conversations that adapt based on user input
- **Voice Input/Output**: Full speech-to-text and text-to-speech capabilities
- **Multi-language Support**: English, Hindi
- **Crisis Detection**: Automatic detection of crisis keywords and helpful resources
- **Emotion Recognition**: Smart responses based on detected emotions (anxiety, sadness, stress, etc.)

### 🔐 User Authentication
- **Email Verification**: Secure signup with email verification codes
- **User Accounts**: Track user progress and statistics
- **Session Management**: Persistent login with localStorage

### 📱 Full Voice Assistance
- **Microphone Input**: Speak to the chatbot with speech-to-text
- **Voice Responses**: Listen to bot responses with text-to-speech
- **Voice Settings**: Enable/disable voice, adjust language
- **Real-time Transcription**: See interim results while speaking

### 😊 Mood Tracking
- **Daily Mood Logging**: Track your emotional state
- **Mood Analytics**: View mood distribution and trends
- **Offline Support**: Sync data when connection is available

### 🎮 Wellness Tools
- **Reminders**: Set wellness reminders for activities
- **Mind Games**: Interactive games for mental wellness
- **Mental Health Resources**: Comprehensive database of 150+ common mental health problems with solutions

## 🚀 Getting Started

### Prerequisites
- Python 3.8+ (backend)
- Node.js 16+ (frontend)
- npm or yarn (frontend package manager)

### Installation & Setup

#### 1. Backend Setup
```powershell
cd C:\AnchorAI\backend
.\venv_new\Scripts\Activate.ps1

# Install dependencies (if needed)
pip install -r requirements.txt

# Set up environment variables
# Create a .env file with:
# GEMINI_API_KEY=your_api_key_here (optional)
# EMAIL_ADDRESS=your_email@gmail.com (for email verification)
# EMAIL_PASSWORD=your_email_password (for email verification)

# Start the backend server
uvicorn backend.main:app --reload
```

#### 2. Frontend Setup
```powershell
cd C:\Braino.Ai\Braino.Ai-main\frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

#### 3. Quick Start (Recommended)
```powershell
# Run the helper script from the project root
powershell -ExecutionPolicy Bypass -File C:\Braino.Ai\Braino.Ai-main\start.ps1
```

## 📖 How to Use

### 1. **Create an Account**
- Click "Login / Sign up" in the navbar
- Click "Sign up" and fill in your details
- Check your email for the verification code
- Enter the code to verify your email

### 2. **Start Chatting**
- Click "Chat Now" to open the chat interface
- Type your message or click the microphone to speak
- Enable voice output by clicking the speaker icon to hear responses

### 3. **Use Voice Assistance**
- **Speaking**: Click the microphone icon to start listening
- **Listening**: Speak clearly and the app will transcribe your words
- **Voice Response**: Enable the speaker icon to hear Braino AI's responses
- **Language**: Change the language in chat settings

### 4. **Track Your Mood**
- Go to "Mood Tracker" in the navbar
- Log your current mood
- View your mood trends and analytics

### 5. **Access Resources**
- Click "Resources" to view mental health information
- Search for specific problems or symptoms
- Get curated solutions and coping strategies

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/verify-email` - Verify email with code
- `POST /api/auth/login` - Login user
- `POST /api/auth/resend-verification` - Resend verification code

### Chat
- `POST /api/chat` - Send message and get response

### User
- `GET /api/user/status` - Get user stats and progress

### Resources
- `GET /api/resources` - Get mental health resources
- `GET /api/resources/categories` - Get resource categories

## 📊 Backend Structure

```
backend/
├── main.py              # FastAPI app setup and routes
├── chat.py              # Chat logic with fallback responses
├── auth.py              # Email verification and authentication
├── models.py            # Data models (Pydantic)
├── state.py             # User state management
├── mood_tracker.py      # Mood tracking endpoints
├── routine.py           # Routine/habit endpoints
├── resources.py         # Mental health resources
├── mental_health_resources.py  # Resource database (150+ entries)
└── moods.json           # Mood data persistence
```

## 🎨 Frontend Structure

```
frontend/src/
├── components/
│   ├── ChatInterface.jsx        # Main chat component with voice
│   ├── AuthModal.jsx            # Login/signup modal
│   ├── Navbar.jsx               # Navigation bar
│   ├── Hero.jsx                 # Landing page hero
│   ├── Features.jsx             # Features section
│   ├── MoodTracker.jsx          # Mood tracking
│   ├── WellnessTools.jsx        # Wellness reminders
│   ├── MindGames.jsx            # Interactive games
│   └── MentalHealthResources.jsx # Resources page
├── utils/
│   └── voiceUtils.js            # Voice/speech utilities
└── App.jsx                      # Main app component
```

## 🔧 Configuration

### Email Verification Setup

For email verification to work, you need to set up environment variables:

**For Gmail:**
1. Enable "Less secure app access" in your Google Account
2. Or use an App Password if 2FA is enabled
3. Set environment variables in `.env`:
```
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

**For Other Email Providers:**
Modify the SMTP settings in `auth.py` accordingly.

### API Keys (Optional)
```
GEMINI_API_KEY=your_gemini_api_key
```

If no API key is provided, the app uses intelligent fallback responses.

## 🧠 How the Chatbot Works

1. **Input Processing**: User message is received and logged
2. **Detection**: Check for crisis keywords and inner critic patterns
3. **Response Generation**: Use Gemini AI or fallback to intelligent context-aware responses
4. **Output**: Send response to user and optionally speak it aloud
5. **Tracking**: Log mood, update user stats, and persist data

### Fallback Response System
If the API is unavailable, the bot uses intelligent keyword-based responses for:
- Greetings (hi, hello, hey)
- Anxiety and panic
- Sadness and depression
- Stress and overwhelm
- Sleep issues
- Loneliness
- Self-doubt
- Anger and frustration
- And many more...

## 🔒 Security Notes

⚠️ **Current Implementation:**
- Email passwords stored in environment variables (not encrypted)
- User passwords stored in memory (not hashed)
- No database persistence

⚠️ **For Production:**
- Hash passwords using `bcrypt` or similar
- Use a proper database (PostgreSQL, MongoDB, etc.)
- Implement JWT tokens for session management
- Use environment-based secrets management
- Enable HTTPS/SSL
- Implement rate limiting
- Add CORS validation

## 📱 Browser Compatibility

- Speech Recognition: Chrome, Edge, Safari (some versions)
- Speech Synthesis: All modern browsers
- For best experience, use Chrome or Edge on desktop

## 🐛 Troubleshooting

### Voice Input Not Working
- Ensure you're using a browser that supports Web Speech API (Chrome/Edge)
- Check microphone permissions
- Restart the browser

### Email Not Sending
- Verify email credentials in `.env`
- Check Gmail app password setup
- Look at console logs for error details

### Chat Not Responding
- Check backend is running (`http://localhost:8000`)
- Verify API configuration in `config.js`
- Check browser console for error messages

## 📈 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Advanced NLP for better emotion detection
- [ ] Integration with professional therapists
- [ ] Video counseling support
- [ ] Mobile app (React Native)
- [ ] AI-powered progress tracking
- [ ] Community support groups
- [ ] Prescription reminders

## 📝 Notes

- Mood data is stored in `backend/moods.json`
- For production, replace with a proper database
- LocalStorage key for moods: `brainoai_unsynced_moods`

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is for educational and mental health support purposes.

## ⚠️ Disclaimer

Braino AI is **not** a replacement for professional mental health care. If you are experiencing a mental health crisis, please contact a mental health professional or call the National Suicide Prevention Lifeline: **988** (US).

# Braino.Ai-the-Ai-doctor-
# Braino.Ai-the-Ai-doctor-
