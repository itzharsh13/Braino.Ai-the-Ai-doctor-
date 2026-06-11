import requests
import json
import sys

url = "http://localhost:8000/api/chat"
headers = {"Content-Type": "application/json"}

# Test 1: Simple message
print("=" * 50)
print("Test 1: Simple emotional message")
print("=" * 50)
data1 = {"message": "I feel a bit lost today", "language": "English"}
try:
    response = requests.post(url, headers=headers, json=data1)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")

print("\n" + "=" * 50)
print("Test 2: Symptom description")
print("=" * 50)
# Test 2: Symptom message
data2 = {"message": "My chest hurts and I can't breathe well when I'm stressed", "language": "English"}
try:
    response = requests.post(url, headers=headers, json=data2)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
