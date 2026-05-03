import json
from pathlib import Path

from fastapi import HTTPException

from app.schemas.task import Task, TaskCreate, TaskStatus


class TaskStore:
    """
    Stockage simple dans un fichier JSON.
    - Pas de base SQL, ideal pour debuter.
    - Les donnees restent apres redemarrage du serveur.
    """

    def __init__(self, file_path: Path) -> None:
        self._file_path = file_path
        self._tasks: dict[int, Task] = {}
        self._next_id = 1
        self._load_from_file()

    def _load_from_file(self) -> None:
        if not self._file_path.exists():
            self._save_to_file()
            return

        with self._file_path.open("r", encoding="utf-8") as f:
            content = json.load(f)

        tasks = [Task(**item) for item in content]
        self._tasks = {task.id: task for task in tasks}
        self._next_id = max(self._tasks.keys(), default=0) + 1

    def _save_to_file(self) -> None:
        data = [task.model_dump() for task in self.list_tasks()]
        with self._file_path.open("w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=True, indent=2)

    def list_tasks(self) -> list[Task]:
        return list(self._tasks.values())

    def create_task(self, payload: TaskCreate) -> Task:
        task = Task(id=self._next_id, title=payload.title)
        self._tasks[task.id] = task
        self._next_id += 1
        self._save_to_file()
        return task

    def update_status(self, task_id: int, status: TaskStatus) -> Task:
        task = self._tasks.get(task_id)
        if task is None:
            raise HTTPException(status_code=404, detail="Task not found")

        updated_task = task.model_copy(update={"status": status})
        self._tasks[task_id] = updated_task
        self._save_to_file()
        return updated_task

    def delete_task(self, task_id: int) -> None:
        if task_id not in self._tasks:
            raise HTTPException(status_code=404, detail="Task not found")
        del self._tasks[task_id]
        self._save_to_file()


task_store = TaskStore(
    file_path=Path(__file__).resolve().parents[2] / "data" / "tasks.json"
)
