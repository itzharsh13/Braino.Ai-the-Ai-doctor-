from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

# Read MONGO_URL from env, default to localhost
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")

try:
    client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)
    # Trigger server selection to raise early if connection fails
    client.server_info()
    db = client.get_database("braino_ai")
    def get_db():
        return db

    def get_collection(name: str):
        return db[name]

    print(f"MongoDB connected: {MONGO_URL}")
except Exception as e:
    # If connection fails, provide placeholders that raise informative errors
    print(f"Warning: Could not connect to MongoDB at {MONGO_URL}: {e}")
    db = None

    def get_db():
        raise RuntimeError("MongoDB not connected")

    def get_collection(name: str):
        raise RuntimeError("MongoDB not connected")
