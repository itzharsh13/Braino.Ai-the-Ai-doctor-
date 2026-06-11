from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
import json
import os

router = APIRouter()

# Persist moods to a JSON file so entries survive restarts.
DATA_FILE = os.path.join(os.path.dirname(__file__), "moods.json")

# In-memory cache
mood_entries = []
next_id = 1

def load_moods():
    global mood_entries, next_id
    if not os.path.exists(DATA_FILE):
        mood_entries = []
        next_id = 1
        return
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            raw = json.load(f)
        # parse timestamps
        for e in raw:
            if isinstance(e.get("timestamp"), str):
                e["timestamp"] = datetime.fromisoformat(e["timestamp"])
        mood_entries = raw
        if mood_entries:
            next_id = max(e["id"] for e in mood_entries) + 1
        else:
            next_id = 1
    except Exception:
        mood_entries = []
        next_id = 1

def save_moods():
    # convert datetimes to isoformat
    serializable = []
    for e in mood_entries:
        item = dict(e)
        if isinstance(item.get("timestamp"), datetime):
            item["timestamp"] = item["timestamp"].isoformat()
        serializable.append(item)
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(serializable, f, indent=2)


class MoodEntry(BaseModel):
    mood: str  # 'very_sad', 'sad', 'neutral', 'happy', 'very_happy'
    intensity: int  # 1-10 scale
    notes: Optional[str] = None
    timestamp: Optional[datetime] = None


class MoodResponse(BaseModel):
    id: int
    mood: str
    intensity: int
    notes: Optional[str]
    timestamp: datetime


@router.post("/api/mood/log")
async def log_mood(entry: MoodEntry):
    """Log a new mood entry"""
    global next_id
    if not entry.mood in ['very_sad', 'sad', 'neutral', 'happy', 'very_happy']:
        raise HTTPException(status_code=400, detail="Invalid mood value")

    if entry.intensity < 1 or entry.intensity > 10:
        raise HTTPException(status_code=400, detail="Intensity must be between 1 and 10")

    mood_entry = {
        "id": next_id,
        "mood": entry.mood,
        "intensity": entry.intensity,
        "notes": entry.notes,
        "timestamp": entry.timestamp or datetime.now()
    }
    next_id += 1

    mood_entries.append(mood_entry)
    try:
        save_moods()
    except Exception:
        # If saving fails, ignore but keep entry in memory
        pass
    return mood_entry


@router.get("/api/mood/history")
async def get_mood_history():
    """Get all mood entries"""
    return sorted(mood_entries, key=lambda x: x['timestamp'], reverse=True)


@router.get("/api/mood/today")
async def get_today_moods():
    """Get mood entries from today"""
    today = datetime.now().date()
    today_moods = [
        entry for entry in mood_entries
        if entry['timestamp'].date() == today
    ]
    return sorted(today_moods, key=lambda x: x['timestamp'], reverse=True)


@router.get("/api/mood/stats")
async def get_mood_stats():
    """Get mood statistics"""
    if not mood_entries:
        return {
            "total_entries": 0,
            "average_intensity": 0,
            "most_common_mood": None,
            "mood_distribution": {}
        }

    mood_counts = {}
    total_intensity = 0

    for entry in mood_entries:
        mood = entry['mood']
        mood_counts[mood] = mood_counts.get(mood, 0) + 1
        total_intensity += entry['intensity']

    return {
        "total_entries": len(mood_entries),
        "average_intensity": round(total_intensity / len(mood_entries), 2),
        "most_common_mood": max(mood_counts, key=mood_counts.get),
        "mood_distribution": mood_counts
    }


@router.delete("/api/mood/{entry_id}")
async def delete_mood(entry_id: int):
    """Delete a mood entry"""
    global mood_entries
    mood_entries = [e for e in mood_entries if e['id'] != entry_id]
    try:
        save_moods()
    except Exception:
        pass
    return {"message": "Mood entry deleted"}
