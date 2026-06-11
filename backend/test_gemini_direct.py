import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment
load_dotenv()

# Configure
api_key = os.getenv("GEMINI_API_KEY")
print(f"API Key: {api_key[:20]}..." if api_key else "No API key")

if api_key:
    genai.configure(api_key=api_key)
    
    # List available models
    print("\n=== Available Models ===")
    try:
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f"- {m.name}")
    except Exception as e:
        print(f"Error listing models: {e}")
    
    # Try different model names
    model_names = [
        'gemini-pro',
        'models/gemini-pro',
        'gemini-1.5-pro',
        'models/gemini-1.5-pro',
        'gemini-1.5-flash',
        'models/gemini-1.5-flash'
    ]
    
    for model_name in model_names:
        try:
            print(f"\n=== Testing: {model_name} ===")
            model = genai.GenerativeModel(model_name)
            response = model.generate_content("Say hello in one sentence")
            print(f"✓ SUCCESS! Response: {response.text}")
            break
        except Exception as e:
            print(f"✗ Failed: {type(e).__name__}: {str(e)[:100]}")
else:
    print("No API key found")
