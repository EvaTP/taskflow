# Taskflow backend (FastAPI)

## 1) Activer l'environnement virtuel

Depuis le dossier `backend`:

```bash
source .venv/bin/activate
```

## 2) Lancer l'API en mode dev

```bash
uvicorn app.main:app --reload
```

## 3) Vérifier que tout fonctionne

- API: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- Docs Swagger: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- Docs Redoc: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

## Endpoints disponibles

- `GET /` -> message de bienvenue
- `GET /health` -> verifier que le serveur repond
- `GET /tasks` -> lister toutes les taches
- `POST /tasks` -> creer une tache
- `PATCH /tasks/{task_id}/status` -> changer le statut (`todo`, `in_progress`, `done`)
- `DELETE /tasks/{task_id}` -> supprimer une tache

## Exemple de creation de tache (Swagger)

Dans `POST /tasks`, clique sur `Try it out`, puis envoie:

```json
{
  "title": "Apprendre FastAPI"
}
```

Puis teste:

1. `GET /tasks`
2. `PATCH /tasks/1/status` avec `{ "status": "in_progress" }`
3. `DELETE /tasks/1`

## Structure du projet

```text
backend/
  app/
    main.py              # entree de l'application FastAPI
    routers/
      tasks.py           # routes HTTP (les endpoints)
    services/
      task_store.py      # logique metier + stockage fichier JSON
    schemas/
      task.py            # modeles de donnees (validation)
  data/
    tasks.json           # stockage persistant des taches
```

Note: les donnees sont dans `data/tasks.json`, elles restent apres redemarrage.
