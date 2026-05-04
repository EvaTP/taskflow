from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.tasks import router as tasks_router

app = FastAPI(
    title="Taskflow API",
    version="0.1.0",
    description="API simple de gestion de taches pour apprendre FastAPI.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Taskflow backend is running"}


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(tasks_router)
