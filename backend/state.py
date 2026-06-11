from typing import List, Dict
from datetime import datetime

class UserManager:
    def __init__(self):
        self.points = 0
        self.level = 1
        self.mood_history: List[Dict] = []
        self.last_interaction = None

    def add_points(self, amount: int):
        self.points += amount
        # Simple leveling logic: Level up every 100 points
        new_level = (self.points // 100) + 1
        if new_level > self.level:
            self.level = new_level
            return True # Leveled up
        return False

    def log_mood(self, mood: str):
        self.mood_history.append({
            "mood": mood,
            "timestamp": datetime.now().isoformat()
        })
        # Keep only last 10 moods
        if len(self.mood_history) > 10:
            self.mood_history.pop(0)

    def get_status(self):
        return {
            "points": self.points,
            "level": self.level,
            "mood_history": self.mood_history
        }

# Global instance for simplicity in this demo
user_manager = UserManager()
