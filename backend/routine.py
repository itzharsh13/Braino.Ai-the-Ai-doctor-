from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class RoutineRequest(BaseModel):
    problem: str

class Task(BaseModel):
    time: str
    activity: str

class RoutineResponse(BaseModel):
    routine: List[Task]

@router.post("/suggest", response_model=RoutineResponse)
async def suggest_routine(request: RoutineRequest):
    problem = request.problem.lower()
    
    if "anxiety" in problem:
        routine = [
            Task(time="08:00 AM", activity="Morning Grounding Meditation (10 mins)"),
            Task(time="10:00 AM", activity="Drink a glass of water"),
            Task(time="12:00 PM", activity="Deep Breathing Exercise (5 mins)"),
            Task(time="03:00 PM", activity="Short Walk outside (15 mins)"),
            Task(time="06:00 PM", activity="Digital Detox (30 mins)"),
            Task(time="09:00 PM", activity="Journaling: Write down 3 worries and let them go")
        ]
    elif "sleep" in problem:
        routine = [
            Task(time="07:00 AM", activity="Wake up at consistent time & get sunlight"),
            Task(time="12:00 PM", activity="Limit caffeine after this time"),
            Task(time="06:00 PM", activity="Light dinner, avoid heavy meals"),
            Task(time="08:00 PM", activity="Dim lights and avoid blue light"),
            Task(time="09:00 PM", activity="Reading or calming music (no screens)"),
            Task(time="10:00 PM", activity="Bedtime relaxation technique")
        ]
    elif "focus" in problem:
        routine = [
            Task(time="08:00 AM", activity="Plan top 3 tasks for the day"),
            Task(time="09:00 AM", activity="Deep Work Session 1 (45 mins)"),
            Task(time="10:00 AM", activity="Stretch Break (10 mins)"),
            Task(time="11:00 AM", activity="Deep Work Session 2 (45 mins)"),
            Task(time="02:00 PM", activity="Review progress and adjust plan"),
            Task(time="05:00 PM", activity="Clear workspace for tomorrow")
        ]
    else:
        # Default balanced routine
        routine = [
            Task(time="08:00 AM", activity="Morning Stretch and Hydrate"),
            Task(time="12:00 PM", activity="Mindful Lunch Break"),
            Task(time="03:00 PM", activity="Movement Break"),
            Task(time="06:00 PM", activity="Connect with a friend or family"),
            Task(time="09:00 PM", activity="Reflect on the day")
        ]
    
    return RoutineResponse(routine=routine)
