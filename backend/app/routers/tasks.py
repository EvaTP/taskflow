from fastapi import APIRouter, status

from app.schemas.task import Task, TaskCreate, TaskStatusUpdate, TaskTitleUpdate
from app.services.task_store import task_store

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("", response_model=list[Task])
def list_tasks() -> list[Task]:
    # GET /tasks -> retourne toutes les taches.
    return task_store.list_tasks()


@router.post("", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate) -> Task:
    # POST /tasks -> cree une nouvelle tache.
    return task_store.create_task(payload)


@router.patch("/{task_id}/status", response_model=Task)
def update_task_status(task_id: int, payload: TaskStatusUpdate) -> Task:
    # PATCH /tasks/{task_id}/status -> change le statut.
    return task_store.update_status(task_id=task_id, status=payload.status)


@router.patch("/{task_id}", response_model=Task)
def update_task_title(task_id: int, payload: TaskTitleUpdate) -> Task:
    # PATCH /tasks/{task_id} -> modifie le titre.
    return task_store.update_title(task_id=task_id, title=payload.title)


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int) -> None:
    # DELETE /tasks/{task_id} -> supprime une tache.
    task_store.delete_task(task_id=task_id)
