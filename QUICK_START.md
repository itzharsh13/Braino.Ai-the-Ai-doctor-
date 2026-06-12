# 🚀 Quick Start Guide - Braino AI

## ⚡ Get Running in 2 Minutes

### Option 1: Automatic (Recommended)
```powershell
cd C:\Braino.Ai\Braino.Ai-main
powershell -ExecutionPolicy Bypass -File start.ps1
```

This will automatically start both backend and frontend!

### Option 2: Manual Setup

**Terminal 1 - Backend:**
```powershell
cd C:\AnchorAI\backend
.\venv_new\Scripts\Activate.ps1
uvicorn backend.main:app --reload
```

**Terminal 2 - Frontend:**
```powershell
cd C:\Braino.Ai\Braino.Ai-main\frontend
npm install
npm run dev
```

## 📱 Access the App

Once running, open your browser:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🎯 Try These Features

### 1. 📝 Create an Account (Optional)
- Click "Login / Sign up" 
- Create account with any email
- Enter verification code (shown in console or emailed)
- Login with your credentials

### 2. 💬 Chat with Braino AI
- Click "Chat Now"
- Type: "hii" or "hello"
- Watch it respond appropriately!

### 3. 🎤 Use Voice Features
- Click the microphone icon
- Say: "I'm feeling anxious"
- Click speaker icon to hear response
- Try different emotions:
  - "I'm sad"
  - "I feel stressed"
  - "I'm lonely"
  - "I can't sleep"

### 4. 🌍 Switch Languages
- Open chat settings
- Change language to Hindi/Gujarati/Marathi
- Voice will respond in selected language

### 5. 😊 Track Your Mood
- Click "Mood Tracker" in navbar
- Log your current mood
- See your mood trends

## 📧 Email Verification (Optional Setup)

To enable actual email sending:

1. Create `.env` file in `C:\AnchorAI\backend\`:
```env
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
```

2. For Gmail:
   - Go to myaccount.google.com
   - Security → App passwords (if 2FA enabled)
   - Generate app password
   - Use that password above

Without .env setup, verification codes print to console (perfect for testing!)

## 🤖 Chatbot Examples

Try these conversations:

```
User: Hi there!
Bot: Hi there! 👋 I'm Braino AI, your mental health companion...

User: I'm feeling overwhelmed
Bot: Stress can be exhausting. Is there one small thing...

User: I can't sleep
Bot: Trouble sleeping is so frustrating. Have you tried...

User: I feel like I'm failing
Bot: Self-doubt is common, but it doesn't define your worth...
```

## 🎨 UI Features

### Navbar
- **Braino AI** Logo (click to go home)
- **Features** - Overview of app
- **Wellness Tools** - Reminders and activities
- **Mood Tracker** - Log and view moods
- **Mind Games** - Interactive games
- **Resources** - 150+ mental health solutions
- **Dark Mode** Toggle
- **Login / Sign up** (before auth)
- **Chat Now** Button

### Chat Interface
- 💬 **Message Input** - Type to chat
- 🎤 **Microphone** - Click to speak (red when listening)
- 🔊 **Speaker** - Click to hear responses (animated when playing)
- ⚙️ **Settings** - Voice options, language, clear chat
- ❌ **Close** - Exit chat

## ⚡ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Enter | Send message |
| Shift+Enter | New line in message |
| Ctrl+L | Clear chat (via settings) |

## 🐛 Troubleshooting

### "Address already in use" error?
```powershell
# Kill the existing process
Get-Process python | Stop-Process
# Then restart
```

### Voice not working?
- Use Chrome or Edge browser
- Check microphone permissions
- Try a different browser
- Restart browser

### Email not sending?
- Check .env credentials
- Use app-specific password (not Gmail password)
- Check console for error details
- Use dev mode (codes print to console)

### Chat not responding?
- Ensure backend is running (http://localhost:8000)
- Check browser console for errors
- Try refreshing the page
- Check backend logs for errors

## 📊 What's New vs Original

| Feature | Status |
|---------|--------|
| Interactive Chatbot | ✅ NEW - Better responses |
| Voice Input | ✅ ENHANCED - More reliable |
| Voice Output | ✅ ENHANCED - Multi-language |
| User Auth | ✅ NEW - Email verification |
| Email Verification | ✅ NEW - 6-digit codes |
| Better UI Feedback | ✅ ENHANCED - Visual indicators |
| Mood Tracker | ✅ Keep existing |
| Wellness Tools | ✅ Keep existing |
| Resources | ✅ Keep existing (150+ items) |

## 💡 Tips

- 🎤 **Voice works best** in quiet environment
- 📱 **Use Chrome** for best voice support
- 💬 **Be specific** in chat for better responses
- 🌙 **Try dark mode** for night time use
- 📝 **Save verification code** for later signup

## 🎓 Learning Resources

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Tailwind CSS](https://tailwindcss.com/)

## 📞 Need Help?

1. Check IMPLEMENTATION_SUMMARY.md for detailed info
2. Check backend console for errors
3. Check browser DevTools (F12) for client errors
4. Review the code comments in source files

## ✨ Enjoy!

You now have a fully functional mental health companion with:
- 🤖 Smart, emotion-aware chatbot
- 🎤 Full voice support
- 🔐 Secure user authentication
- 📱 Beautiful, responsive UI
- 🌍 Multi-language support

Happy chatting! 💙
