"""Quick script to verify MongoDB connection and insert a sample verification doc.
Run: python backend/scripts/test_mongo.py
"""
from db import get_collection
from datetime import datetime, timedelta


def run_test():
    try:
        users = get_collection("users")
        verif = get_collection("verifications")
        print("Connected to collections:", users.name, verif.name)

        email = "test.user@example.com"
        doc = {
            "email": email,
            "code": "000000",
            "expires_at": datetime.utcnow() + timedelta(minutes=30),
            "password": "password123",
            "username": "testuser"
        }

        verif.update_one({"email": email}, {"$set": doc}, upsert=True)
        print(f"Inserted/updated verification for {email}")

    except Exception as e:
        print("MongoDB test failed:", e)


if __name__ == '__main__':
    run_test()
