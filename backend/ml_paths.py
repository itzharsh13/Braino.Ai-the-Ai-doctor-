import os
from pathlib import Path

# Project root: BrainoAi/ (parent of backend/)
BACKEND_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BACKEND_DIR.parent

MODEL_DIR = Path(os.environ.get("MODEL_DIR", PROJECT_ROOT / "trained model"))


def model_file(name: str) -> Path:
    return MODEL_DIR / name
