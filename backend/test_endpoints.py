#!/usr/bin/env python3
import requests
import json
import sys

print("=" * 60)
print("TEST 1: GET /api/user/status")
print("=" * 60)
try:
    r = requests.get('http://localhost:8000/api/user/status', timeout=10)
    print(f"Status Code: {r.status_code}")
    print(f"Response Body:\n{r.text}")
    if r.status_code == 200:
        print(f"Parsed JSON:\n{json.dumps(r.json(), indent=2)}")
except Exception as e:
    print(f"ERROR: {type(e).__name__}: {e}")

print("\n" + "=" * 60)
print("TEST 2: POST /api/chat/ - Anxious message")
print("=" * 60)
try:
    payload = {"message": "I feel very anxious and worried", "language": "English"}
    r = requests.post('http://localhost:8000/api/chat/', json=payload, timeout=20)
    print(f"Status Code: {r.status_code}")
    print(f"Response Body:\n{r.text}")
    if r.status_code == 200:
        print(f"Parsed JSON:\n{json.dumps(r.json(), indent=2)}")
except Exception as e:
    print(f"ERROR: {type(e).__name__}: {e}")

print("\n" + "=" * 60)
print("TEST 3: GET /api/resources")
print("=" * 60)
try:
    r = requests.get('http://localhost:8000/api/resources', timeout=10)
    print(f"Status Code: {r.status_code}")
    text = r.text
    if len(text) > 500:
        text = text[:500] + f"\n... (truncated, total {len(text)} chars)"
    print(f"Response Body:\n{text}")
except Exception as e:
    print(f"ERROR: {type(e).__name__}: {e}")

print("\n" + "=" * 60)
print("TEST 4: POST /api/routine/suggest - Anxiety routine")
print("=" * 60)
try:
    payload = {"problem": "anxiety"}
    r = requests.post('http://localhost:8000/api/routine/suggest', json=payload, timeout=10)
    print(f"Status Code: {r.status_code}")
    text = r.text
    if len(text) > 500:
        text = text[:500] + f"\n... (truncated)"
    print(f"Response Body:\n{text}")
    if r.status_code == 200:
        print(f"Parsed JSON:\n{json.dumps(r.json(), indent=2)}")
except Exception as e:
    print(f"ERROR: {type(e).__name__}: {e}")

print("\n" + "=" * 60)
print("All tests completed")
print("=" * 60)
