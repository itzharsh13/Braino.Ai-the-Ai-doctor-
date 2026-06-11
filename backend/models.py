from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str
    language: str = "English"
    emotion: str | None = None
    emotion_confidence: float | None = None

class ChatResponse(BaseModel):
    response: str

class CrisisLocation(BaseModel):
    latitude: float
    longitude: float
