from enum import Enum

from pydantic import BaseModel, Field, field_validator


class TaskStatus(str, Enum):
    # Valeurs de statut autorisees pour une tache.
    todo = "todo"
    in_progress = "in_progress"
    done = "done"


class Task(BaseModel):
    # Représente une tâche complète stockée côté serveur.
    id: int
    title: str
    status: TaskStatus = TaskStatus.todo


class TaskCreate(BaseModel):
    # Données nécessaires quand on crée une tâche.
    title: str = Field(min_length=1, max_length=200)


class TaskStatusUpdate(BaseModel):
    # Donnees acceptees pour changer le statut d'une tache.
    status: TaskStatus

    @field_validator("status", mode="before")
    @classmethod
    def normalize_status(cls, value: str) -> str:
        # Permet d'ecrire "in progress" ou "IN_PROGRESS" sans erreur.
        if isinstance(value, str):
            return value.strip().lower().replace(" ", "_")
        return value
