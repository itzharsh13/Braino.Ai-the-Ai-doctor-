# 📧 Email Verification Setup Guide

## Quick Summary

**Email verification is OPTIONAL**. The app works perfectly in **dev mode** where verification codes are printed to console.

For production or to send real emails, follow the setup below.

## 🎯 Dev Mode (Default - No Setup Needed)

When you sign up without email configuration:
- Verification codes print to browser console
- Look for: `[DEV MODE] Verification code for user@email.com: 123456`
- Copy and paste the code into the app
- Everything works the same!

## 📬 Enable Real Email Sending

### Step 1: Create .env File

Create a file named `.env` in `C:\AnchorAI\backend\` folder:

```env
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
GEMINI_API_KEY=sk-proj-xxxx (optional)
```

### Step 2: Get Your App Password (Gmail)

**If you have 2FA enabled (recommended):**

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** in the left sidebar
3. Scroll down to **App passwords**
4. Select **Mail** and **Windows Computer**
5. Google will generate a 16-character password
6. Copy this and paste into `.env` as `EMAIL_PASSWORD`

**If you DON'T have 2FA enabled:**

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** in the left sidebar
3. Scroll to **Less secure app access**
4. Turn it ON
5. Use your regular Gmail password in `.env`

### Step 3: Test It

1. Save the `.env` file
2. Restart the backend server
3. Create a new account with a real email
4. Check your email inbox (and spam folder)
5. You should receive the verification email!

## 🔧 Using Other Email Providers

### Outlook/Hotmail

```env
EMAIL_ADDRESS=your_email@outlook.com
EMAIL_PASSWORD=your_app_password
```

Then update `auth.py` line 45:
```python
with smtplib.SMTP_SSL("smtp-mail.outlook.com", 465) as server:
```

### Yahoo Mail

```env
EMAIL_ADDRESS=your_email@yahoo.com
EMAIL_PASSWORD=your_app_password
```

Then update `auth.py` line 45:
```python
with smtplib.SMTP_SSL("smtp.mail.yahoo.com", 465) as server:
```

### Custom SMTP Server

Edit `auth.py` `send_verification_email()` function:

```python
def send_verification_email(email: str, code: str) -> bool:
    try:
        sender_email = os.getenv("EMAIL_ADDRESS")
        sender_password = os.getenv("EMAIL_PASSWORD")
        
        if not sender_password:
            print(f"[DEV MODE] Verification code for {email}: {code}")
            return True
        
        # Your custom SMTP configuration
        with smtplib.SMTP_SSL("your-smtp-server.com", 465) as server:
            server.login(sender_email, sender_password)
            # ... rest of code
```

## 🔐 Security Best Practices

### ✅ Do This:
- Use app-specific passwords (not your main password)
- Store credentials in `.env` (never commit to git)
- Add `.env` to `.gitignore`
- Use environment variables in production
- Regenerate passwords regularly

### ❌ Don't Do This:
- Hardcode credentials in code
- Use your main Gmail password
- Commit `.env` to version control
- Share credentials in messages/emails
- Use same password for everything

## 📝 .env File Template

```env
# Email Configuration (Optional)
EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=xxxx_xxxx_xxxx_xxxx

# AI Configuration (Optional)
GEMINI_API_KEY=sk-proj-your-key-here

# Database (Future Use)
# DATABASE_URL=postgresql://user:pass@localhost/braino_ai
```

## 🧪 Testing Email Verification

### Test Without Setup (Dev Mode)
```
1. Click "Login / Sign up"
2. Click "Sign up"
3. Fill in username, email, password
4. Click "Sign up"
5. Look at browser console (F12)
6. Find: [DEV MODE] Verification code for your_email: 123456
7. Copy the code
8. Paste into verification input
9. Done! ✓
```

### Test With Gmail Setup
```
1. Follow Gmail setup steps above
2. Create .env file in backend/
3. Restart backend server
4. Sign up with real email
5. Check email inbox
6. Find email from Braino AI
7. Copy code from email
8. Paste into app
9. Done! ✓
```

## 📧 Email Template

Users will receive an HTML email like:

```
========================================
        BRAINO AI - VERIFY EMAIL
========================================

Welcome to Braino AI

Thank you for signing up for Braino AI, your 
personal mental health companion.

To verify your email and complete your registration, 
please use the code below:

         123456

This code will expire in 30 minutes.

========================================

If you didn't sign up, please ignore this email.

Best regards,
Braino AI Team
```

## ⏰ Verification Code Details

- **Format**: 6-digit number
- **Expiry**: 30 minutes
- **Resendable**: Yes (click "Resend Code")
- **Attempts**: Unlimited
- **Timeout**: Auto-cleared after 30 min

## 🔍 Troubleshooting

### Email not sending?

**Check 1: Backend Logs**
```
Look for error message when signing up
Note exact error text
```

**Check 2: Gmail App Password**
```
Is it exactly 16 characters with spaces?
Copy it again carefully
No extra characters at start/end
```

**Check 3: .env File**
```
Is it in C:\AnchorAI\backend\ ?
Not in frontend folder
File extension is .env (not .txt)
Credentials have no extra spaces
```

**Check 4: Backend Restart**
```
Stop the backend server (Ctrl+C)
Wait 2 seconds
Start it again
.env changes only apply on restart
```

**Check 5: Gmail Security**
```
Is app password turned on?
Is Less secure access enabled (if no 2FA)?
Try regenerating the app password
```

### Code not arriving in email?

1. Check spam/junk folder
2. Wait a few seconds
3. Click "Resend Code" button
4. Try a different email address
5. Check backend console for errors

### "Invalid verification code" error?

1. Make sure code is exactly 6 digits
2. Check code hasn't expired (30 min)
3. No extra spaces in code
4. Click "Resend Code" to get new one

## 🎓 How It Works (Technical)

1. **Signup**: User enters email, password, username
2. **Code Generation**: Random 6-digit code created
3. **Code Storage**: Stored in memory with 30-min timer
4. **Email Sending**: Uses SMTP to send HTML email
5. **User Verification**: User enters code
6. **Validation**: Code checked against stored value
7. **Account Creation**: User record created in memory
8. **Code Cleanup**: Code deleted after verification

## 📊 Current Storage

⚠️ **Important**: Currently uses in-memory storage
- Data lost when backend restarts
- Only good for development
- For production: use database (PostgreSQL/MongoDB)

## 🚀 Production Deployment

For production, modify:

1. **Use Database**:
```python
from sqlalchemy import create_engine
# Replace in-memory dicts with database models
```

2. **Use Email Service**:
```python
# Instead of SMTP, use:
import sendgrid  # SendGrid
import boto3     # AWS SES
import mailgun   # Mailgun
```

3. **Hash Passwords**:
```python
from bcrypt import hashpw, checkpw
# Hash passwords before storing
```

4. **Use JWT Tokens**:
```python
from jwt import encode, decode
# Session tokens instead of localStorage
```

## ✨ Summary

| Mode | Setup | Verification Codes | Works |
|------|-------|-------------------|-------|
| Dev | None | Console | ✅ Yes |
| Gmail | .env file | Email | ✅ Yes |
| Other | .env + auth.py | Email | ✅ Yes |
| Production | Database | Secure Email Service | ✅ Yes |

**Recommended**: Start in dev mode, upgrade to Gmail when ready!

## 📞 Still Need Help?

1. Check backend logs (terminal output)
2. Check browser console (F12)
3. Review code comments in `backend/auth.py`
4. Check Python `smtplib` documentation

Happy verifying! 📧✨
